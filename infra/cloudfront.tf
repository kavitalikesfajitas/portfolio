# CloudFront Origin Access Control for S3
# Note: Currently using legacy OAI - uncomment and update after import if needed
# resource "aws_cloudfront_origin_access_control" "main" {
#   name                              = "s3-oac-${var.bucket_name}"
#   description                       = "OAC for ${var.bucket_name}"
#   origin_access_control_origin_type = "s3"
#   signing_behavior                  = "always"
#   signing_protocol                  = "sigv4"
# }

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
  }

  # Serve custom 404 page for missing routes
  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 60
  }

  # S3 returns 403 for missing objects when using OAI
  custom_error_response {
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404.html"
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
