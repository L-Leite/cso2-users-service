#!/usr/bin/env bash

# print tools versions
echo 'NodeJS version:'
node --version

echo 'npm version:'
npm --version

# use node 10 by default so npm can be updated
nvm use 10

# update npm to latest version
npm -g i npm

# install dependencies
npm ci