#!/usr/bin/env node

import * as cdk from 'aws-cdk-lib';
import HomepageStack from '../cdk/homepage-stack.js';

import awsConfig from '../config/aws.config.js';
import cdkConfig from '../config/cdk.config.js';

const env = {account: awsConfig.AWS_ACCOUNT_ID, region: awsConfig.AWS_STACK_REGION};
console.log(cdkConfig.PREFIX ?
  `Prefix: ${cdkConfig.PREFIX}` :
  'Warning: No prefix provided, deploying production!',
);

const app = new cdk.App();
new HomepageStack(
  app, 'HomepageStack',
  {stackName: cdkConfig.PREFIX + cdkConfig.HOMEPAGE_STACK_NAME, env},
);
