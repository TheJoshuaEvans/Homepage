import * as dotenv from 'dotenv';
dotenv.config();

// Configs defined externally so they can be used to generate other configs
const PREFIX = process.env.PREFIX || '';
const HOMEPAGE_DOMAIN_NAME = process.env.HOMEPAGE_DOMAIN_NAME || 'thejoshuaevans.com';
const HOMEPAGE_HOST_NAME = process.env.HOMEPAGE_HOST_NAME || (PREFIX && (PREFIX + '.')) + HOMEPAGE_DOMAIN_NAME;

/**
 * Configurations that are needed by CDK to perform deployments
 */
const cdkConfig = {
  /**
   * @type {string}
   * Prefix to apply to named resources, such as subdomains, for differentiate environments
   */
  PREFIX,

  /**
   * @type {string}
   * Domain name to be used by the homepage. Used to find the Route53 hosted zone to use
   */
  HOMEPAGE_DOMAIN_NAME,

  /**
   * @type {string}
   * The full hostname of the homepage, including the prefix as a subdomain
   */
  HOMEPAGE_HOST_NAME,

  /**
   * @type {string}
   * Hostname of the homepage with "www." prepended to it
   */
  HOMEPAGE_HOST_WWW_NAME: process.env.HOMEPAGE_HOST_WWW_NAME || 'www.' + HOMEPAGE_HOST_NAME,

  /**
   * @type {string}
   * Name of the homepage stack
   */
  HOMEPAGE_STACK_NAME: process.env.HOMEPAGE_STACK_NAME || 'TheJoshuaEvansHomepage',
};

export default cdkConfig;
