# Guide to Import Existing AWS Infrastructure

This guide will help you import your existing AWS resources into Terraform without disrupting your live website.

## Overview

You currently have these resources running in AWS:

- ✅ CloudFront Distribution: `E1AVBG5DDIC9WX`
- ✅ Route53 Hosted Zone for `livingkavitaloca.com`
- ✅ ACM Certificate for SSL/TLS
- ✅ S3 Bucket for static hosting
- ✅ DNS Records (A, MX, TXT, CNAME)

Instead of creating new resources, we'll import these into Terraform state.

## Prerequisites

1. AWS CLI configured with appropriate credentials
2. Terraform installed
3. Access to your AWS account

## Step 1: Get Resource IDs

Run these commands to gather the necessary IDs:

```bash
# Get CloudFront distribution details
aws cloudfront get-distribution --id E1AVBG5DDIC9WX

# Get Route53 hosted zone ID
aws route53 list-hosted-zones-by-name --dns-name livingkavitaloca.com

# Get S3 bucket name
aws s3 ls | grep kavita

# Get ACM certificate ARN (in us-east-1)
aws acm list-certificates --region us-east-1

# Get CloudFront Origin Access Control ID
aws cloudfront list-origin-access-controls
```

## Step 2: Create terraform.tfvars

Create a file `infra/terraform.tfvars` with your values:

```hcl
aws_region    = "us-west-2"
bucket_name   = "your-actual-bucket-name"
domain_name   = "livingkavitaloca.com"
github_owner  = "your-github-username"
github_repo   = "portfolio"
github_branch = "main"
```

## Step 3: Initialize Terraform

```bash
cd infra
terraform init
```

## Step 4: Import Resources One by One

### 4.1 Import S3 Bucket

```bash
terraform import aws_s3_bucket.site YOUR_BUCKET_NAME
```

### 4.2 Import Route53 Hosted Zone

```bash
# Replace Z0123456789ABC with your actual hosted zone ID
terraform import aws_route53_zone.main Z0123456789ABC
```

### 4.3 Import ACM Certificate

```bash
# Replace arn:aws:acm:... with your actual certificate ARN
# Note: Use the provider alias for us-east-1
terraform import 'module.aws.aws_acm_certificate.cert' arn:aws:acm:us-east-1:250328915800:certificate/YOUR-CERT-ID
```

Or if that doesn't work:

```bash
terraform import aws_acm_certificate.cert arn:aws:acm:us-east-1:250328915800:certificate/YOUR-CERT-ID
```

### 4.4 Import CloudFront Distribution

```bash
terraform import aws_cloudfront_distribution.main E1AVBG5DDIC9WX
```

### 4.5 Import CloudFront Origin Access Control

```bash
# Get the OAC ID first
aws cloudfront list-origin-access-controls

# Then import it
terraform import aws_cloudfront_origin_access_control.main YOUR_OAC_ID
```

### 4.6 Import DNS Records

For each DNS record, use this format:
`terraform import aws_route53_record.RESOURCE_NAME ZONE_ID_RECORD_NAME_TYPE`

```bash
# Get your hosted zone ID first (from step 4.2)
ZONE_ID="Z0123456789ABC"

# Import A record for root domain
terraform import aws_route53_record.root ${ZONE_ID}_livingkavitaloca.com_A

# Import A record for www
terraform import aws_route53_record.www ${ZONE_ID}_www.livingkavitaloca.com_A

# Import MX records
terraform import aws_route53_record.mx ${ZONE_ID}_livingkavitaloca.com_MX

# Import TXT record
terraform import aws_route53_record.txt ${ZONE_ID}_livingkavitaloca.com_TXT

# Import CNAME records for ACM validation
# List all records in your hosted zone to find the validation CNAMEs
aws route53 list-resource-record-sets --hosted-zone-id $ZONE_ID

# Import each ACM validation CNAME (these will have long random names)
# terraform import 'aws_route53_record.cert_validation_auto["livingkavitaloca.com"]' ${ZONE_ID}_<validation_name>_CNAME
```

### 4.7 Import S3 Bucket Configurations

```bash
# Import bucket public access block
terraform import aws_s3_bucket_public_access_block.site YOUR_BUCKET_NAME

# Import bucket versioning
terraform import aws_s3_bucket_versioning.site YOUR_BUCKET_NAME

# Import bucket encryption
terraform import aws_s3_bucket_server_side_encryption_configuration.site YOUR_BUCKET_NAME

# Import bucket policy
terraform import aws_s3_bucket_policy.site YOUR_BUCKET_NAME
```

### 4.8 Import IAM Resources

```bash
# Import OIDC provider for GitHub
terraform import aws_iam_openid_connect_provider.github arn:aws:iam::250328915800:oidc-provider/token.actions.githubusercontent.com

# Import IAM role
terraform import aws_iam_role.github_deploy github-deploy-site

# Import IAM policy
terraform import aws_iam_policy.s3_deploy arn:aws:iam::250328915800:policy/s3-deploy-site

# Import policy attachments
terraform import aws_iam_role_policy_attachment.admin github-deploy-site/arn:aws:iam::aws:policy/AdministratorAccess
terraform import aws_iam_role_policy_attachment.attach github-deploy-site/arn:aws:iam::250328915800:policy/s3-deploy-site
```

## Step 5: Verify Import

After importing, run:

```bash
terraform plan
```

This should show:

- ✅ **No changes** if everything matches perfectly
- ⚠️ **Minor changes** that need to be reviewed and adjusted

## Step 6: Adjust Configuration (if needed)

If `terraform plan` shows differences, you may need to adjust the Terraform configuration to match your existing resources.

Common adjustments:

1. Update CloudFront settings in `cloudfront.tf`
2. Adjust cache behaviors
3. Match origin settings exactly

## Step 7: Apply (if needed)

Once `terraform plan` shows no changes or only acceptable changes:

```bash
terraform apply
```

## Option 2: Fresh Start (Alternative)

If you prefer to start fresh:

1. Delete existing CloudFront distribution (takes time)
2. Run `terraform apply` to create new resources
3. Update DNS to point to new CloudFront

⚠️ **This will cause downtime!**

## Troubleshooting

### Provider Configuration Error

If you get an error about provider configuration with ACM:

```hcl
# In providers.tf, ensure you have:
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
```

### Import Fails with "Resource Not Found"

- Double-check the resource ID
- Ensure you're in the correct AWS region
- Verify your AWS credentials have permission to access the resource

### State Conflicts

If you get state conflicts:

```bash
# Remove the resource from state and try again
terraform state rm aws_cloudfront_distribution.main
```

## Next Steps

After successful import:

1. ✅ All infrastructure is now in Terraform
2. ✅ You can make changes via code
3. ✅ CI/CD can manage infrastructure
4. ✅ Everything is version controlled

## Rollback Plan

If something goes wrong:

1. Your existing AWS resources are **not modified** by imports
2. You can delete the Terraform state file
3. Your live site continues running normally
4. You can try the import process again

## Questions?

- Check CloudFront distribution details: `aws cloudfront get-distribution --id E1AVBG5DDIC9WX`
- View Terraform state: `terraform state list`
- See resource details: `terraform state show aws_cloudfront_distribution.main`
