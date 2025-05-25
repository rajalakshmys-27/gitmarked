module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true  // This will allow process and other Node.js globals
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off'
  },
  globals: {
    process: 'readonly',  // Explicitly allow process as a global variable
    __FIREBASE_CONFIG__: 'readonly'
  }
}
