# used by github actions
output "bucket_name" {
  value = aws_s3_bucket.site.bucket
}

output "github_role_arn" {
  value = aws_iam_role.github_deploy.arn
}

# Route53 outputs
output "hosted_zone_id" {
  description = "The hosted zone ID"
  value       = aws_route53_zone.main.zone_id
}

output "name_servers" {
  description = "The name servers for the hosted zone"
  value       = aws_route53_zone.main.name_servers
}

output "hosted_zone_name" {
  description = "The hosted zone domain name"
  value       = aws_route53_zone.main.name
}

# CloudFront outputs
output "cloudfront_distribution_id" {
  description = "The CloudFront distribution ID"
  value       = aws_cloudfront_distribution.main.id
}

output "cloudfront_domain_name" {
  description = "The CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.main.domain_name
}

# ACM outputs
output "certificate_arn" {
  description = "The ARN of the ACM certificate"
  value       = aws_acm_certificate.cert.arn
}

# PR Preview bucket outputs
output "pr_preview_bucket_name" {
  description = "The name of the PR preview S3 bucket"
  value       = aws_s3_bucket.pr_preview.bucket
}

output "pr_preview_website_endpoint" {
  description = "The website endpoint for the PR preview bucket"
  value       = aws_s3_bucket_website_configuration.pr_preview.website_endpoint
}