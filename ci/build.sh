#!/usr/bin/env bash

SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

# init db
createdb -O cso2
psql cso2 < $SCRIPTPATH/../config/db/users.sql
psql cso2 < $SCRIPTPATH/../config/db/inventories.sql
psql cso2 < $SCRIPTPATH/../config/db/inventory/buymenues.sql
psql cso2 < $SCRIPTPATH/../config/db/inventory/cosmetics.sql
psql cso2 < $SCRIPTPATH/../config/db/inventory/loadouts.sql
new_oid=$(psql cso2 -c "SELECT oid FROM pg_type WHERE typname = 'inventoryitem';" | sed -n 3p | tr -d ' ')
echo "export const INVENTORY_ITEM_OID = $new_oid" > $SCRIPTPATH/../src/config/inventory_item_oid.ts

# use the CI database user
sed -i -e "s/username: 'cso2_user'/username: 'postgres'/g" $SCRIPTPATH/../src/config/db.ts
sed -i -e "s/password: 'cso2'/\/\/ password: 'cso2'/g" $SCRIPTPATH/../src/config/db.ts

# transpile source code
npx gulp build