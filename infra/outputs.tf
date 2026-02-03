# used by github actions
output "github_role_arn" {
  value = aws_iam_role.github_deploy.arn
}