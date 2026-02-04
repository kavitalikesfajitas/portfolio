#!/bin/bash
# Script to import existing AWS resources into Terraform

set -e

echo "=== Importing Existing AWS Resources ==="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Import CloudFront Distribution
echo -e "${YELLOW}1. Importing CloudFront Distribution...${NC}"
terraform import aws_cloudfront_distribution.main E1AVBG5DDIC9WX
echo -e "${GREEN}✓ CloudFront distribution imported${NC}"
echo ""

# 2. Import CloudFront Origin Access Control (if it exists)
echo -e "${YELLOW}2. Importing CloudFront Origin Access Control...${NC}"
echo "You'll need to get the OAC ID from AWS Console or CLI"
echo "Run: aws cloudfront list-origin-access-controls"
echo "Then: terraform import aws_cloudfront_origin_access_control.main <OAC_ID>"
echo ""

# 3. Import Route53 Hosted Zone
echo -e "${YELLOW}3. Importing Route53 Hosted Zone...${NC}"
echo "Get the hosted zone ID from Route53 console"
echo "Then: terraform import aws_route53_zone.main <HOSTED_ZONE_ID>"
echo ""

# 4. Import ACM Certificate
echo -e "${YELLOW}4. Importing ACM Certificate...${NC}"
echo "Get the certificate ARN from ACM console (must be in us-east-1)"
echo "Then: terraform import -var-file=terraform.tfvars 'aws_acm_certificate.cert' <CERTIFICATE_ARN>"
echo ""

# 5. Import S3 Bucket (if not already imported)
echo -e "${YELLOW}5. Importing S3 Bucket...${NC}"
echo "terraform import aws_s3_bucket.site <BUCKET_NAME>"
echo ""

# 6. Import DNS Records
echo -e "${YELLOW}6. Importing DNS Records...${NC}"
echo "These will need to be imported individually:"
echo "terraform import aws_route53_record.root <ZONE_ID>_livingkavitaloca.com_A"
echo "terraform import aws_route53_record.www <ZONE_ID>_www.livingkavitaloca.com_A"
echo "terraform import aws_route53_record.mx <ZONE_ID>_livingkavitaloca.com_MX"
echo "terraform import aws_route53_record.txt <ZONE_ID>_livingkavitaloca.com_TXT"
echo ""

echo -e "${GREEN}=== Import Instructions Ready ===${NC}"
echo "Execute the commands above one by one after gathering the necessary IDs"
