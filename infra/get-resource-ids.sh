#!/bin/bash
# Script to gather all necessary resource IDs for importing

set -e

echo "==================================="
echo "Gathering AWS Resource IDs"
echo "==================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DOMAIN="livingkavitaloca.com"
CF_DIST_ID="E1AVBG5DDIC9WX"

# 1. CloudFront Distribution Details
echo -e "${YELLOW}1. CloudFront Distribution${NC}"
echo "   Distribution ID: ${CF_DIST_ID}"
aws cloudfront get-distribution --id ${CF_DIST_ID} --query 'Distribution.{DomainName:DomainName,Status:Status,Origins:Origins}' --output table 2>/dev/null || echo "   ⚠️  Failed to fetch CloudFront details"
echo ""

# 2. CloudFront Origin Access Control
echo -e "${YELLOW}2. CloudFront Origin Access Controls${NC}"
OAC_ID=$(aws cloudfront list-origin-access-controls --query 'OriginAccessControlList.Items[0].Id' --output text 2>/dev/null)
if [ ! -z "$OAC_ID" ] && [ "$OAC_ID" != "None" ]; then
    echo "   OAC ID: ${OAC_ID}"
    echo -e "${BLUE}   Import command: terraform import aws_cloudfront_origin_access_control.main ${OAC_ID}${NC}"
else
    echo "   ℹ️  No OAC found (might be using legacy OAI)"
fi
echo ""

# 3. Route53 Hosted Zone
echo -e "${YELLOW}3. Route53 Hosted Zone${NC}"
ZONE_ID=$(aws route53 list-hosted-zones-by-name --dns-name ${DOMAIN} --query 'HostedZones[0].Id' --output text 2>/dev/null | cut -d'/' -f3)
if [ ! -z "$ZONE_ID" ] && [ "$ZONE_ID" != "None" ]; then
    echo "   Zone ID: ${ZONE_ID}"
    echo "   Domain: ${DOMAIN}"
    echo -e "${BLUE}   Import command: terraform import aws_route53_zone.main ${ZONE_ID}${NC}"
    
    # List all DNS records
    echo ""
    echo "   DNS Records:"
    aws route53 list-resource-record-sets --hosted-zone-id ${ZONE_ID} --query 'ResourceRecordSets[*].{Name:Name,Type:Type,TTL:TTL}' --output table 2>/dev/null || echo "   ⚠️  Failed to list records"
else
    echo "   ⚠️  Hosted zone not found"
fi
echo ""

# 4. ACM Certificate (us-east-1 for CloudFront)
echo -e "${YELLOW}4. ACM Certificate (us-east-1)${NC}"
CERT_ARN=$(aws acm list-certificates --region us-east-1 --query "CertificateSummaryList[?DomainName=='${DOMAIN}'].CertificateArn" --output text 2>/dev/null)
if [ ! -z "$CERT_ARN" ] && [ "$CERT_ARN" != "None" ]; then
    echo "   Certificate ARN: ${CERT_ARN}"
    echo "   Status:"
    aws acm describe-certificate --region us-east-1 --certificate-arn ${CERT_ARN} --query 'Certificate.{Status:Status,Subject:SubjectAlternativeNames}' --output table 2>/dev/null || echo "   ⚠️  Failed to describe certificate"
    echo -e "${BLUE}   Import command: terraform import aws_acm_certificate.cert ${CERT_ARN}${NC}"
else
    echo "   ⚠️  No certificate found in us-east-1"
fi
echo ""

# 5. S3 Buckets
echo -e "${YELLOW}5. S3 Buckets${NC}"
echo "   Looking for buckets containing 'kavita' or 'living':"
aws s3 ls 2>/dev/null | grep -iE '(kavita|living)' || echo "   ⚠️  No matching buckets found"
echo ""

# 6. IAM Role
echo -e "${YELLOW}6. IAM Role (github-deploy-site)${NC}"
ROLE_NAME="github-deploy-site"
ROLE_ARN=$(aws iam get-role --role-name ${ROLE_NAME} --query 'Role.Arn' --output text 2>/dev/null)
if [ ! -z "$ROLE_ARN" ] && [ "$ROLE_ARN" != "None" ]; then
    echo "   Role ARN: ${ROLE_ARN}"
    echo -e "${BLUE}   Import command: terraform import aws_iam_role.github_deploy ${ROLE_NAME}${NC}"
else
    echo "   ℹ️  Role not found (will be created)"
fi
echo ""

# 7. OIDC Provider
echo -e "${YELLOW}7. GitHub OIDC Provider${NC}"
OIDC_ARN=$(aws iam list-open-id-connect-providers --query "OpenIDConnectProviderList[?contains(Arn, 'token.actions.githubusercontent.com')].Arn" --output text 2>/dev/null)
if [ ! -z "$OIDC_ARN" ] && [ "$OIDC_ARN" != "None" ]; then
    echo "   OIDC ARN: ${OIDC_ARN}"
    echo -e "${BLUE}   Import command: terraform import aws_iam_openid_connect_provider.github ${OIDC_ARN}${NC}"
else
    echo "   ℹ️  OIDC provider not found (will be created)"
fi
echo ""

# Summary of import commands
echo -e "${GREEN}==================================="
echo "Summary: Copy these commands to import.sh"
echo "===================================${NC}"
echo ""

if [ ! -z "$ZONE_ID" ] && [ "$ZONE_ID" != "None" ]; then
    cat > import-commands.sh << EOF
#!/bin/bash
# Generated import commands
# Review and execute these commands one by one

# CloudFront
terraform import aws_cloudfront_distribution.main ${CF_DIST_ID}

# CloudFront OAC
${OAC_ID:+terraform import aws_cloudfront_origin_access_control.main ${OAC_ID}}

# Route53 Hosted Zone
terraform import aws_route53_zone.main ${ZONE_ID}

# Route53 Records
terraform import aws_route53_record.root ${ZONE_ID}_${DOMAIN}_A
terraform import aws_route53_record.www ${ZONE_ID}_www.${DOMAIN}_A
terraform import aws_route53_record.mx ${ZONE_ID}_${DOMAIN}_MX
terraform import aws_route53_record.txt ${ZONE_ID}_${DOMAIN}_TXT

# ACM Certificate (if exists)
${CERT_ARN:+terraform import aws_acm_certificate.cert ${CERT_ARN}}

# IAM (if exists)
${ROLE_ARN:+terraform import aws_iam_role.github_deploy ${ROLE_NAME}}
${OIDC_ARN:+terraform import aws_iam_openid_connect_provider.github ${OIDC_ARN}}

# S3 Bucket (replace BUCKET_NAME with your actual bucket)
# terraform import aws_s3_bucket.site BUCKET_NAME
# terraform import aws_s3_bucket_public_access_block.site BUCKET_NAME
# terraform import aws_s3_bucket_versioning.site BUCKET_NAME
# terraform import aws_s3_bucket_server_side_encryption_configuration.site BUCKET_NAME
# terraform import aws_s3_bucket_policy.site BUCKET_NAME
EOF

    chmod +x import-commands.sh
    echo "✅ Import commands saved to: import-commands.sh"
    echo ""
    echo "Next steps:"
    echo "1. Review import-commands.sh"
    echo "2. Fill in your S3 bucket name"
    echo "3. Run: cd infra && terraform init"
    echo "4. Execute import commands one by one"
else
    echo "⚠️  Missing required resources. Please check AWS console."
fi

echo ""
echo "==================================="
