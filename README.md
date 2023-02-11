# Homepage
My personal homepage!

# Deployment
This webpage is powered by CloudFront and S3 via CloudFormation... via CDK. To deploy locally follow these steps:
1. Ensure your local [AWS CLI](https://aws.amazon.com/cli/) is properly configured
2. Set the `AWS_ACCOUNT_ID` and `HOMEPAGE_DOMAIN_NAME` envar to your own values (or modify the [configs](config/aws.config.js) [files](config/cdk.config.js))
3. Run `npm run deploy:bootstrap` to bootstrap the AWS environment
4. Run `npm run deploy:homepage` to deploy the homepage!

Once deployed, it should be available at the set domain!

# Testing
Run `npm run server` to initialize a test server that hosts the documents in [public](public/) directory

# Project Details
This is an experiment with the capabilities of modern HTML / JS / CSS. No framework, just the core. Should be fun!

The `public` folder's contents will be copied to the hosting S3 bucket and distributed as if it is a simple html server. ECMA 6 should be used to separate JS files. Backwards compatibility is not a priority and isn't considered 
