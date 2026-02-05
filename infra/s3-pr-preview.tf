# S3 bucket for PR preview deployments
resource "aws_s3_bucket" "pr_preview" {
  bucket = var.pr_preview_bucket_name
}

resource "aws_s3_bucket_public_access_block" "pr_preview" {
  bucket = aws_s3_bucket.pr_preview.id
  # Block public ACLs - public access is controlled via bucket policy only
  block_public_acls  = true
  ignore_public_acls = true
  # Allow public bucket policy for static website hosting
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_versioning" "pr_preview" {
  bucket = aws_s3_bucket.pr_preview.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "pr_preview" {
  bucket = aws_s3_bucket.pr_preview.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Enable static website hosting for PR previews
resource "aws_s3_bucket_website_configuration" "pr_preview" {
  bucket = aws_s3_bucket.pr_preview.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

# Bucket policy to allow public read access for PR previews
resource "aws_s3_bucket_policy" "pr_preview" {
  bucket = aws_s3_bucket.pr_preview.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.pr_preview.arn}/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.pr_preview]
}

# Lifecycle rule to automatically delete old PR previews after 7 days
resource "aws_s3_bucket_lifecycle_configuration" "pr_preview" {
  bucket = aws_s3_bucket.pr_preview.id

  rule {
    id     = "delete-old-pr-previews"
    status = "Enabled"

    filter {}

    expiration {
      days = 7
    }

    noncurrent_version_expiration {
      noncurrent_days = 1
    }

    abort_incomplete_multipart_upload {
      days_after_initiation = 1
    }
  }
}
