# used by github actions
output "bucket_name" {
  value = aws_s3_bucket.site.bucket
}

output "github_role_arn" {
  value = aws_iam_role.github_deploy.arn
}