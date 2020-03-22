#!/usr/bin/env bash

# install and use the current node version set in the environment variable
nvm install $CURRENT_NODE_VERSION
nvm use $CURRENT_NODE_VERSION

# update npm to latest version
npm -g i npm

# print tools versions
echo 'NodeJS version:'
node --version

echo 'npm version:'
npm --version

echo 'yarn version:'
yarn --version

# install dependencies
yarn install