# Infrastructure for livingkavitaloca.com

This Terraform configuration sets up the complete infrastructure for the livingkavitaloca.com website, including:

- **S3 Bucket**: Static site hosting storage
- **CloudFront**: CDN distribution with SSL/TLS
- **Route53**: DNS hosting with all necessary records
- **ACM**: SSL/TLS certificate for HTTPS
- **IAM**: GitHub Actions deployment role

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
       │ Origin Access Control
       ▼
┌─────────────────────┐
│    S3 Bucket        │
│  (Private Access)   │
└─────────────────────┘
```

## DNS Records

The following DNS records are automatically created:

1. **A Record (Root)**: `livingkavitaloca.com` → CloudFront Distribution
2. **A Record (WWW)**: `www.livingkavitaloca.com` → CloudFront Distribution
3. **MX Records**: Google Workspace email configuration
4. **TXT Record**: SPF record for email verification
5. **CNAME Records**: ACM certificate validation (auto-created)

## Prerequisites

1. AWS Account with appropriate permissions
2. Terraform Cloud account (or configure local backend)
3. Domain registered (livingkavitaloca.com)
4. AWS CLI configured

## Initial Setup

### 1. Import Existing Resources (if applicable)

If you already have these resources in AWS, import them first:

```bash
# Import the S3 bucket
terraform import aws_s3_bucket.site your-bucket-name

# Import the hosted zone (if it exists)
terraform import aws_route53_zone.main Z0123456789ABC
```

### 2. Initialize Terraform

```bash
cd infra
terraform init
```

### 3. Plan the Changes

```bash
terraform plan
```

### 4. Apply the Configuration

```bash
terraform apply
```

## Important Notes

### Certificate Creation

- The ACM certificate **must** be created in `us-east-1` region for CloudFront
- Certificate validation uses DNS validation via Route53
- The validation process is automatic but may take 5-30 minutes

### First-Time Deployment

When deploying for the first time:

1. **Apply the infrastructure** (this will create the hosted zone)
2. **Update your domain's nameservers** at your registrar to use the AWS nameservers
   - Get nameservers from: `terraform output name_servers`
3. **Wait for DNS propagation** (can take up to 48 hours, typically much faster)
4. **Apply again** to create certificate validation records

### Nameserver Update

After the first apply, update your domain registrar with these nameservers:

```bash
terraform output name_servers
```

Example output:

```
[
  "ns-923.awsdns-51.net",
  "ns-1295.awsdns-33.org",
  "ns-1992.awsdns-57.co.uk",
  "ns-327.awsdns-40.com"
]
```

## Variables

The following variables can be configured in Terraform Cloud or via `terraform.tfvars`:

| Variable        | Description              | Default                |
| --------------- | ------------------------ | ---------------------- |
| `aws_region`    | AWS region for resources | `us-east-1`            |
| `bucket_name`   | S3 bucket name           | Required               |
| `domain_name`   | Domain name              | `livingkavitaloca.com` |
| `github_owner`  | GitHub org/user          | Required               |
| `github_repo`   | GitHub repository name   | Required               |
| `github_branch` | Branch allowed to deploy | `main`                 |

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

## Deployment

GitHub Actions can deploy to this infrastructure using the IAM role:

```yaml
- name: Configure AWS Credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
    aws-region: us-east-1

- name: Deploy to S3
  run: |
    aws s3 sync ./out s3://${{ secrets.BUCKET_NAME }} --delete

- name: Invalidate CloudFront Cache
  run: |
    aws cloudfront create-invalidation \
      --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
      --paths "/*"
```

## Troubleshooting

### Certificate Stuck in "Pending Validation"

1. Check that nameservers are correctly set at your registrar
2. Verify DNS propagation: `dig NS livingkavitaloca.com`
3. Check validation records exist: `dig _validation.livingkavitaloca.com CNAME`

### 403 Forbidden from CloudFront

1. Verify S3 bucket policy allows CloudFront OAC
2. Check that files exist in S3
3. Verify CloudFront origin configuration

### Email Not Working

1. Verify MX records: `dig livingkavitaloca.com MX`
2. Check SPF record: `dig livingkavitaloca.com TXT`
3. Ensure Google Workspace is properly configured

## Cost Estimate

Approximate monthly costs (us-east-1):

- Route53 Hosted Zone: $0.50/month
- S3 Storage: ~$0.02/GB/month
- CloudFront: First 1TB free, then ~$0.085/GB
- ACM Certificate: Free
- Data Transfer: Variable based on traffic

**Estimated total**: probably less than $5/month

## Security

- S3 bucket is private with CloudFront OAC (Origin Access Control)
- HTTPS enforced via CloudFront
- GitHub Actions uses OIDC (no long-lived credentials)
- IAM role has least-privilege access

## Maintenance

### Updating DNS Records

Edit `route53.tf` and apply:

```bash
terraform apply
```

### Rotating Secrets

No secrets are stored in this configuration. GitHub Actions uses OIDC.

### Updating TLS Certificate

ACM automatically renews certificates if DNS validation records remain intact.

## Clean Up

To destroy all resources:

```bash
terraform destroy
```

**Warning**: This will delete:

- S3 bucket and all contents
- CloudFront distribution
- Route53 hosted zone and all records
- ACM certificate
- IAM roles and policies
