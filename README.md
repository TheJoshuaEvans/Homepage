# Homepage
My personal homepage!

This project requires the following technologies
- [Node.js v18](https://nodejs.org/en/)
- [AWS CLI](https://aws.amazon.com/cli/)
- [Docker](https://www.docker.com)

# Deployment
This webpage is powered by CloudFront and S3 via CloudFormation... via CDK. To deploy locally follow these steps:
1. Ensure your local [AWS CLI](https://aws.amazon.com/cli/) is properly configured
2. Set the `AWS_ACCOUNT_ID` and `HOMEPAGE_DOMAIN_NAME` envar to your own values (or modify the [config](config/aws.config.js) [files](config/cdk.config.js))
3. Run `npm run deploy:bootstrap` to bootstrap the AWS environment
4. Run `npm run deploy:homepage` to deploy the homepage!

Once deployed, it should be available at the set domain!

# Testing
Run `npm run server` to initialize a test server that hosts the documents in [public](public/) directory

A Docker environment is also available that can be activated by running `npm run docker:up`. Run `npm run docker:down` to fully tear down the environment

# Project Details
This is an experiment with the capabilities of modern HTML / JS / CSS. No framework, just the core. Should be fun!

The `public` folder's contents will be copied to the hosting S3 bucket and distributed as if it is a simple html server. ECMA 6 should be used to separate JS files. Backwards compatibility is not a priority and isn't considered

If using NVM to manage your Nodejs version, run `nvm use` to automatically set up the correct Nodejs version for the project

# Commands
| Command | Description |
| ------- | ----------- |
| `server` | Run a local test server for hosting html files |
| `docker:up` | Initialize the docker dev server |
| `docker:down` | Tear down the docker dev server |
| `deploy:bootstrap` | Bootstrap the AWS account for advanced CDK functionality |
| `deploy:homepage` | Deploy the Homepage stack to the AWS account currently configured in the AWS API |
