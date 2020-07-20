#!/usr/bin/env bash

# init db
PGPASSWORD=Password12!
./config/init_db.sh

# transpile source code
npx gulp build