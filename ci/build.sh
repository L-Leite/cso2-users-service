#!/usr/bin/env bash

# init db
./config/init_db.sh

# transpile source code
npx gulp build