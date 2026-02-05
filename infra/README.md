# Infrastructure for livingkavitaloca.com

This Terraform configuration manages the complete infrastructure for the livingkavitaloca.com website.

## Infrastructure Components

### Production

- **S3 Bucket**: Static site hosting storage
- **CloudFront**: CDN distribution with SSL/TLS
- **Route53**: DNS hosting with all necessary records
- **ACM Certificate**: SSL/TLS for HTTPS
- **IAM Roles**: GitHub Actions OIDC deployment permissions

### Development

- **PR Preview S3 Bucket**: Isolated bucket for PR preview deployments with auto-cleanup

## Architecture

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ HTTPS (livingkavitaloca.com)
       ▼
┌─────────────────────┐
│  CloudFront (CDN)   │
│  + SSL Certificate  │
└──────┬──────────────┘
       │
       │ Origin Access Identity (OAI)
       ▼
┌─────────────────────┐
│    S3 Bucket        │
│  (Private Access)   │
└─────────────────────┘
```

## DNS Records

The following DNS records are managed by Terraform:

- **A Record (Root)**: `livingkavitaloca.com` → CloudFront Distribution
- **A Record (WWW)**: `www.livingkavitaloca.com` → CloudFront Distribution
- **MX Records**: Google Workspace email configuration
- **TXT Record**: SPF record for email verification

## Project History

This infrastructure was **initially created manually via AWS Console** for the original [livingkavitaloca.com website](https://github.com/kavitalikesfajitas/website) (TypeScript/React static site). The configuration has been imported into Terraform to enable:

- **Infrastructure as Code**: Version-controlled infrastructure changes
- **CI/CD Integration**: Automated deployments via GitHub Actions
- **Consistency**: Reproducible infrastructure configuration
- **Collaboration**: Team-friendly infrastructure management

All existing AWS resources were imported without modification, maintaining zero downtime during the migration to this new portfolio repository.

## Prerequisites

- AWS Account with appropriate permissions
- Terraform Cloud account (for remote state storage)
- Domain registered: `livingkavitaloca.com`
- GitHub repository with Actions enabled

## State Management

Terraform state is stored remotely in **Terraform Cloud**:

- **Organization**: `kavitalikesfajitas`
- **Workspace**: `livingkavitaloca-website-infra`

### Why Terraform Cloud?

We use Terraform Cloud for remote state storage (instead of S3 or local state) because:

1. **No Bootstrap Required**: Avoids the chicken-and-egg problem of creating S3/DynamoDB for state before having state
2. **Built-in State Locking**: No need to set up DynamoDB tables for state locks
3. **Secure by Default**: State encryption and access controls without additional configuration
4. **CI/CD Integration**: GitHub Actions can access state using `TF_TOKEN_app_terraform_io` secret
5. **Free Tier**: Sufficient for small teams and personal projects
6. **State History**: Automatic versioning and rollback capabilities

Configuration in `providers.tf`:

```hcl
terraform {
  cloud {
    organization = "kavitalikesfajitas"
    workspaces {
      name = "livingkavitaloca-website-infra"
    }
  }
}
```

## Configuration

### Required Variables

| Variable                 | Description                  | Default                | Source in CI                          |
| ------------------------ | ---------------------------- | ---------------------- | ------------------------------------- |
| `aws_region`             | AWS region for resources     | `us-east-1`            | `${{ vars.AWS_REGION }}`              |
| `bucket_name`            | S3 bucket name (production)  | Required               | `${{ vars.S3_BUCKET_NAME }}`          |
| `pr_preview_bucket_name` | S3 bucket name (PR previews) | Required               | `${{ vars.PR_PREVIEW_BUCKET_NAME }}`  |
| `domain_name`            | Domain name                  | `livingkavitaloca.com` | `${{ vars.DOMAIN_NAME }}` (optional)  |
| `github_owner`           | GitHub org/user              | Required               | `${{ github.repository_owner }}`      |
| `github_repo`            | GitHub repository name       | Required               | `${{ github.event.repository.name }}` |

### GitHub Repository Variables

Set these in your repository: **Settings** → **Secrets and variables** → **Actions** → **Variables**

- `AWS_REGION` = `us-east-1`
- `AWS_ROLE_ARN` = `arn:aws:iam::250328915800:role/github-deploy-site`
- `S3_BUCKET_NAME` = `livingkavitaloca.com`
- `PR_PREVIEW_BUCKET_NAME` = `livingkavitaloca-pr-previews`
- `DOMAIN_NAME` = `livingkavitaloca.com` (optional, has default)

## Outputs

After applying, the following outputs are available:

```bash
terraform output bucket_name              # S3 bucket name
terraform output github_role_arn          # IAM role ARN for GitHub Actions
terraform output hosted_zone_id           # Route53 hosted zone ID
terraform output name_servers             # Route53 nameservers
terraform output cloudfront_distribution_id  # CloudFront distribution ID
terraform output cloudfront_domain_name   # CloudFront domain
terraform output certificate_arn          # ACM certificate ARN
```

## CI/CD Deployment

### Infrastructure Changes

Infrastructure changes are managed through GitHub Actions:

1. **Pull Requests**: Run `terraform plan` to preview changes
2. **Main Branch**: Automatically applies changes on merge (when enabled)

Workflow: `.github/workflows/ci-terraform.yml`

### Application Deployment

Static site deployment workflow:

```yaml
- name: Configure AWS Credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: ${{ vars.AWS_ROLE_ARN }}
    aws-region: ${{ vars.AWS_REGION }}

- name: Deploy to S3
  run: aws s3 sync ./out s3://${{ vars.S3_BUCKET_NAME }} --delete

- name: Invalidate CloudFront Cache
  run: |
    aws cloudfront create-invalidation \
      --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
      --paths "/*"
```

Workflow: `.github/workflows/ci-living-kavita-loca.yml`

## Troubleshooting

### DNS Issues

```bash
# Check nameservers
dig NS livingkavitaloca.com

# Check A records
dig livingkavitaloca.com
dig www.livingkavitaloca.com

# Check MX records
dig MX livingkavitaloca.com

# Check SPF record
dig TXT livingkavitaloca.com
```

### CloudFront 403 Errors

1. Verify S3 bucket policy allows CloudFront OAI access
2. Check files exist in S3 bucket
3. Verify CloudFront origin configuration
4. Check CloudFront distribution status

### Email Issues

1. Verify MX records are correctly configured
2. Check SPF record exists and is valid
3. Ensure Google Workspace is properly set up

## Cost Estimate

### Production Infrastructure

Approximate monthly costs (us-east-1):

- **Route53 Hosted Zone**: $0.50/month
- **S3 Storage**: ~$0.023/GB/month
- **CloudFront**: $0.085/GB (after free tier)
- **ACM Certificate**: Free
- **Data Transfer**: Variable based on traffic

**Production total**: < $5/month for typical small site traffic

### PR Preview Infrastructure

Additional costs for PR preview deployments:

- **S3 Storage**: ~$0.01/month (10 PRs × 50 MB each)
- **PUT Requests**: ~$0.25/month (deployments)
- **GET Requests**: ~$0.004/month (testing)
- **Data Transfer**: $0/month (within free tier)
- **Lifecycle Management**: Free (auto-cleanup after 7 days)

**PR Preview total**: ~$0.26 - $0.50/month

### Combined Total

**~$5.50/month** with active PR previews

## Why Not Vercel?

This portfolio qualifies for Vercel's free Hobby tier ($0/month), which includes:

- Automatic PR previews with HTTPS
- Zero configuration
- Global edge network
- Better developer experience

**So why AWS?** This setup is intentionally over-engineered as a learning exercise in:

- Infrastructure as Code (Terraform)
- AWS services (S3, CloudFront, Route53, IAM)
- CI/CD pipelines (GitHub Actions)
- Cost optimization strategies

The ~$5.50/month cost is essentially paying for hands-on DevOps experience that's valuable for career growth.

## Security

**Production:**

- **S3 Bucket**: Private access only via CloudFront Origin Access Identity (OAI)
- **HTTPS**: Enforced via CloudFront with ACM certificate
- **GitHub Actions**: OIDC authentication (no long-lived credentials)
- **IAM**: Least-privilege access with scoped permissions

**PR Previews:**

- **S3 Bucket**: Public read access for HTTP testing (no sensitive data)
- **Automatic Cleanup**: Previews auto-delete after 7 days
- **Isolated**: Separate bucket from production

## Local Development

For local testing or manual changes:

```bash
# Initialize Terraform
cd infra
terraform init

# Plan changes
terraform plan \
  -var="bucket_name=livingkavitaloca.com" \
  -var="pr_preview_bucket_name=livingkavitaloca-pr-previews" \
  -var="github_owner=kavitalikesfajitas" \
  -var="github_repo=portfolio"

# Apply changes (use with caution)
terraform apply
```

**Note**: Production changes should go through CI/CD.

## Maintenance

### DNS Updates

Edit `route53.tf` and commit to trigger CI/CD pipeline.

### Certificate Renewal

ACM automatically renews certificates - no action required.

### Secrets Management

No long-lived secrets required. GitHub Actions uses OIDC for AWS authentication.

# Development Infrastructure

### Setup

The PR preview infrastructure (`s3-pr-preview.tf`) creates a separate S3 bucket for hosting PR previews:

**Features:**

- Public website hosting for direct HTTP access
- Automatic cleanup after 7 days
- Isolated from production
- Each PR gets its own prefix: `pr-[number]/`

**Configuration:**

1. Set the `pr_preview_bucket_name` variable:

   ```bash
   terraform plan -var="pr_preview_bucket_name=livingkavitaloca-pr-previews"
   ```

2. Add GitHub Actions variable:
   - **Settings** → **Secrets and variables** → **Actions** → **Variables**
   - `PR_PREVIEW_BUCKET_NAME` = `livingkavitaloca-pr-previews`

**Deployment:**

The workflow `.github/workflows/ci-pr-preview.yml` automatically deploys on PR creation/updates:

```bash
aws s3 sync out s3://$PR_PREVIEW_BUCKET_NAME/pr-$PR_NUMBER/ --delete
```

**Preview URL format:** `http://[bucket].s3-website-[region].amazonaws.com/pr-[number]/`
