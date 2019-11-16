#!/usr/bin/env bash

# use the current node version set in the environment variable
nvm use $CURRENT_NODE_VERSION

# update npm to latest version
npm -g i npm

# print tools versions
echo 'NodeJS version:'
node --version

echo 'npm version:'
npm --version

# install dependencies
npm ci