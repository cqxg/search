module.exports = {
    'env': {
        'node': true,
        'es6': true,
        "browser": true
    },
    'extends': 'eslint:recommended',
    'rules': {
        'indent': [2, 4],
        'semi': [2, 'always'],
        'brace-style': [2, '1tbs'],
        'no-unused-vars': [1],
        'no-console': [0]
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
    }
};