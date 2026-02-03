variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "us-west-2"
}

variable "bucket_name" {
  description = "S3 bucket for the static site"
  type        = string
}

variable "github_owner" {
  description = "GitHub org or user that owns the repo"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository name"
  type        = string
}

variable "github_branch" {
  description = "Branch allowed to deploy"
  type        = string
  default     = "main"
}