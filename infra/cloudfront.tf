# CloudFront Origin Access Control for S3
# Note: Currently using legacy OAI - uncomment and update after import if needed
# resource "aws_cloudfront_origin_access_control" "main" {
#   name                              = "s3-oac-${var.bucket_name}"
#   description                       = "OAC for ${var.bucket_name}"
#   origin_access_control_origin_type = "s3"
#   signing_behavior                  = "always"
#   signing_protocol                  = "sigv4"
# }

# CloudFront Function to append index.html to directory requests.
# S3 (via OAI) doesn't auto-resolve /path/ to /path/index.html like S3 website hosting does.
# CloudFront's default_root_object only applies to the root (/), not subdirectories.
# See: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-add-index.html
resource "aws_cloudfront_function" "rewrite_uri" {
  name    = "rewrite-uri-to-index-html"
  runtime = "cloudfront-js-2.0"
  comment = "Append index.html to URIs ending with /"
  publish = true
  code    = <<-EOF
    async function handler(event) {
      var request = event.request;
      var uri = request.uri;

      // If URI ends with '/', append index.html
      if (uri.endsWith('/')) {
        request.uri += 'index.html';
      }
      // If URI doesn't have a file extension, add trailing slash + index.html
      else if (!uri.includes('.')) {
        request.uri += '/index.html';
      }

      return request;
    }
  EOF
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "main" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases             = [var.domain_name, "www.${var.domain_name}"]
  price_class         = "PriceClass_All"

  origin {
    domain_name = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id   = "${var.bucket_name}.s3.us-east-1.amazonaws.com"

    s3_origin_config {
      origin_access_identity = "origin-access-identity/cloudfront/EKE9IL6S8DPXC"
    }
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "${var.bucket_name}.s3.us-east-1.amazonaws.com"
    cache_policy_id        = "658327ea-f89d-4fab-a63d-7e88639e58f6" # Managed-CachingOptimized
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.rewrite_uri.arn
    }
  }

  # Serve custom 404 page for missing routes
  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404/index.html"
    error_caching_min_ttl = 60
  }

  # S3 returns 403 for missing objects when using OAI
  custom_error_response {
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404/index.html"
    error_caching_min_ttl = 60
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = {
    Name        = var.domain_name
    Environment = "production"
  }
}

# S3 bucket policy to allow CloudFront OAI access
resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id

  policy = jsonencode({
    Version = "2012-10-17"
    Id      = "Policy1639076644274"
    Statement = [
      {
        Sid    = "2"
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity EKE9IL6S8DPXC"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.site.arn}/*"
      }
    ]
  })
}
