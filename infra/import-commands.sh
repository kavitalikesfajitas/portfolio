#!/bin/bash
# Generated import commands for livingkavitaloca.com infrastructure
# Review and execute these commands one by one

# CloudFront
terraform import aws_cloudfront_distribution.main E1AVBG5DDIC9WX

# Route53 Hosted Zone
terraform import aws_route53_zone.main Z005086287MVBVYGLHHM

# Route53 Records
terraform import aws_route53_record.root Z005086287MVBVYGLHHM_livingkavitaloca.com_A
terraform import aws_route53_record.www Z005086287MVBVYGLHHM_www.livingkavitaloca.com_A
terraform import aws_route53_record.mx Z005086287MVBVYGLHHM_livingkavitaloca.com_MX
terraform import aws_route53_record.txt Z005086287MVBVYGLHHM_livingkavitaloca.com_TXT

# ACM Certificate
terraform import aws_acm_certificate.cert arn:aws:acm:us-east-1:250328915800:certificate/a94dd15d-c8d5-4bc8-ad76-66c741739f9b

# IAM Resources
terraform import aws_iam_role.github_deploy github-deploy-site
terraform import aws_iam_openid_connect_provider.github arn:aws:iam::250328915800:oidc-provider/token.actions.githubusercontent.com

# S3 Bucket
terraform import aws_s3_bucket.site livingkavitaloca.com
terraform import aws_s3_bucket_public_access_block.site livingkavitaloca.com
terraform import aws_s3_bucket_versioning.site livingkavitaloca.com
terraform import aws_s3_bucket_server_side_encryption_configuration.site livingkavitaloca.com
terraform import aws_s3_bucket_policy.site livingkavitaloca.com
