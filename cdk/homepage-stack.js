import path from 'path';
import url from 'url';

import CDK from 'aws-cdk-lib';

// CDK imports
import CertificateManager from 'aws-cdk-lib/aws-certificatemanager';
import CloudFront from 'aws-cdk-lib/aws-cloudfront';
import CloudFrontOrigins from 'aws-cdk-lib/aws-cloudfront-origins';
import Route53 from 'aws-cdk-lib/aws-route53';
import Route53Targets from 'aws-cdk-lib/aws-route53-targets';
import S3 from 'aws-cdk-lib/aws-s3';
import S3Deployment from 'aws-cdk-lib/aws-s3-deployment';

import cdkConfig from '../config/cdk.config.js';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

class HomepageStack extends CDK.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // |---- Setup ----|
    // Import the hosted zone
    const hostedZone = Route53.HostedZone.fromLookup(this, 'HomepageHostedZone', {
      domainName: cdkConfig.HOMEPAGE_DOMAIN_NAME,
    });

    // |---- Certificate Manager ----|
    // Create the certificate for the homepage
    const homepageCertificate = new CertificateManager.Certificate(this, 'HomepageCertificate', {
      domainName: cdkConfig.HOMEPAGE_HOST_NAME,
      subjectAlternativeNames: [cdkConfig.HOMEPAGE_HOST_WWW_NAME],
      hostedZone: hostedZone,
      validation: CertificateManager.CertificateValidation.fromDns(),
    });

    // |---- S3 ----|
    // Bucket that contains the homepage resources
    const homepageResourceBucket = new S3.Bucket(this, 'HomepageResourceBucket', {
      encryption: S3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: S3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: CDK.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Automatic resource deployment
    new S3Deployment.BucketDeployment(this, 'WebsiteDeployment', {
      sources: [S3Deployment.Source.asset(path.join(dirname, '../public'))],
      destinationBucket: homepageResourceBucket,
    });

    // |---- CloudFront ----|
    // Distribution for web files
    const originAccessIdentity = new CloudFront.OriginAccessIdentity(this, 'OriginAccessIdentity');
    homepageResourceBucket.grantRead(originAccessIdentity);
    const homepageDistribution = new CloudFront.Distribution(this, 'HomepageDistribution', {
      certificate: homepageCertificate,
      defaultBehavior: {
        origin: new CloudFrontOrigins.S3Origin(homepageResourceBucket, {originAccessIdentity}),

        // TODO: Enable caching when initial development is completed
        cachePolicy: CloudFront.CachePolicy.CACHING_DISABLED,
      },
      defaultRootObject: 'index.html',
      domainNames: [cdkConfig.HOMEPAGE_HOST_NAME, cdkConfig.HOMEPAGE_HOST_WWW_NAME],
    });

    // |---- Route53 ----|
    // Create the A record for the distribution
    new Route53.ARecord(this, 'HomepageARecord', {
      recordName: cdkConfig.HOMEPAGE_HOST_NAME,
      target: Route53.RecordTarget.fromAlias(new Route53Targets.CloudFrontTarget(homepageDistribution)),
      zone: hostedZone,
    });

    // Create CNAME record for the "www." version
    new Route53.CnameRecord(this, 'HomepageCNAMERecord', {
      recordName: cdkConfig.HOMEPAGE_HOST_WWW_NAME,
      domainName: cdkConfig.HOMEPAGE_HOST_NAME,
      zone: hostedZone,
    });

    // |---- Tags ----|
    // Add the project name to all resources so resource costs can be isolated
    CDK.Tags.of(this).add('tje:project', 'homepage');

    // |---- Custom Outputs ----|
    new CDK.CfnOutput(this, 'HomepageCertificateArn', {value: homepageCertificate.certificateArn});
    new CDK.CfnOutput(this, 'HomepageDistributionDomain', {value: `https://${homepageDistribution.domainName}`});
    new CDK.CfnOutput(this, 'HomepageResourceBucketName', {value: homepageResourceBucket.bucketName});
    new CDK.CfnOutput(this, 'HomepageUrl', {value: `https://${cdkConfig.HOMEPAGE_HOST_NAME}`});
  }
}

export default HomepageStack;
