# Infrastructure Changelog

## 2026-02-03 - Initial Terraform Configuration

### Added

- **Complete Terraform configuration** for livingkavitaloca.com infrastructure
- **CloudFront distribution** (`cloudfront.tf`) - CDN with SSL/TLS
- **Route53 hosted zone** (`route53.tf`) - DNS management with A, MX, and TXT records
- **ACM certificate** (`acm.tf`) - SSL/TLS certificate in us-east-1
- **S3 bucket** (`s3.tf`) - Static site storage with versioning and encryption
- **IAM roles** (`iam.tf`) - GitHub Actions OIDC authentication
- **Terraform Cloud** remote state management

### Infrastructure Details

#### Resources Managed

- 1 CloudFront Distribution (E1AVBG5DDIC9WX)
- 1 Route53 Hosted Zone (Z005086287MVBVYGLHHM)
- 1 ACM Certificate (us-east-1)
- 1 S3 Bucket (livingkavitaloca.com)
- 2 IAM Roles (github-deploy-site, OIDC provider)
- 4 Route53 DNS Records (A root, A www, MX, TXT)

#### Architecture

```
Browser → Route53 → CloudFront (HTTPS) → S3 (Private via OAI)
```

### Configuration

- **State**: Terraform Cloud (`kavitalikesfajitas/livingkavitaloca-website-infra`)
- **Region**: us-west-2 (S3, IAM), us-east-1 (ACM for CloudFront)
- **CI/CD**: GitHub Actions with OIDC authentication

### Migration Notes

This infrastructure was **originally created manually via AWS Console** for the [original livingkavitaloca.com website](https://github.com/kavitalikesfajitas/website) (TypeScript/React). All existing AWS resources were imported into Terraform state to enable Infrastructure as Code for this new portfolio repository:

- No infrastructure changes during import
- Only added tags and IAM policies
- Site remained online throughout process
- CloudFront uses existing Origin Access Identity (OAI)
- Terraform Cloud chosen for state management (no S3 bootstrap required)

### Next Steps

1. Run `terraform apply` to finalize import (adds tags, creates IAM policy)
2. Enable CI/CD auto-apply in `.github/workflows/ci-terraform.yml`
3. All future infrastructure changes via pull requests
