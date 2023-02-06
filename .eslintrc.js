module.exports = {
  'env': {
    'node': true,
    'es2020': true,
    'jest': true,
  },
  'parserOptions': {
    'sourceType': 'module',
  },
  'extends': 'eslint:recommended',
  'rules': {
    'indent': [ 'error', 2 ],
    'linebreak-style': [ 'error', 'unix' ],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'always' ],
    'prefer-const': [ 'error' ],
    'eol-last': [ 'error', 'always' ],
    'comma-dangle': [ 'error', 'always-multiline'],
  },
};
