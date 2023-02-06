import * as dotenv from 'dotenv';
dotenv.config();

/**
 * AWS configurations
 */
const awsConfig = {
  /**
   * @type {string}
   * ID of the AWS account to deploy resources. Explicitly defining this value prevents
   * deploying stacks to the wrong account on accident
   */
  AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID || '586396805575',

  /**
   * @type {string}
   * Region to deploy resources
   */
  AWS_STACK_REGION: process.env.AWS_STACK_REGION || 'us-east-1',
};

export default awsConfig;
