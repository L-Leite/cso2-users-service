[cso2-users-service](../README.md) > ["routes/inventory"](../modules/_routes_inventory_.md) > [InventoryRoute](../classes/_routes_inventory_.inventoryroute.md)

# Class: InventoryRoute

handles requests to /users/:userId/inventory

## Hierarchy

**InventoryRoute**

## Index

### Constructors

* [constructor](_routes_inventory_.inventoryroute.md#constructor)

### Methods

* [onDeleteInventory](_routes_inventory_.inventoryroute.md#ondeleteinventory)
* [onGetInventory](_routes_inventory_.inventoryroute.md#ongetinventory)
* [onGetInventoryBuyMenu](_routes_inventory_.inventoryroute.md#ongetinventorybuymenu)
* [onGetInventoryCosmetics](_routes_inventory_.inventoryroute.md#ongetinventorycosmetics)
* [onGetInventoryLoadout](_routes_inventory_.inventoryroute.md#ongetinventoryloadout)
* [onPostInventory](_routes_inventory_.inventoryroute.md#onpostinventory)
* [onPostInventoryBuyMenu](_routes_inventory_.inventoryroute.md#onpostinventorybuymenu)
* [onPostInventoryCosmetics](_routes_inventory_.inventoryroute.md#onpostinventorycosmetics)
* [onPostInventoryLoadout](_routes_inventory_.inventoryroute.md#onpostinventoryloadout)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new InventoryRoute**(app: *`express.Express`*): [InventoryRoute](_routes_inventory_.inventoryroute.md)

*Defined in [routes/inventory.ts:50](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/routes/inventory.ts#L50)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| app | `express.Express` |

**Returns:** [InventoryRoute](_routes_inventory_.inventoryroute.md)

___

## Methods

<a id="ondeleteinventory"></a>

### `<Private>` onDeleteInventory

▸ **onDeleteInventory**(req: *`express.Request`*, res: *`express.Response`*, next: *`express.NextFunction`*): `void`

*Defined in [routes/inventory.ts:146](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/routes/inventory.ts#L146)*

called when a DELETE request to /users/:userId/inventory is done deletes an item in an user's invetory returns 200 if deleted successfully returns 400 if the request is malformed returns 404 if the user doesn't exist

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |
| next | `express.NextFunction` |  the next request handler |

**Returns:** `void`

___
<a id="ongetinventory"></a>

### `<Private>` onGetInventory

▸ **onGetInventory**(req: *`express.Request`*, res: *`express.Response`*, next: *`express.NextFunction`*): `void`

*Defined in [routes/inventory.ts:77](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/routes/inventory.ts#L77)*

called when a GET request to /users/:userId/inventory is done returns an user's inventory items returns 200 if successful returns 400 if the request is malformed returns 404 if the user doesn't exist

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |
| next | `express.NextFunction` |  the next request handler |

**Returns:** `void`

___
<a id="ongetinventorybuymenu"></a>

### `<Private>` onGetInventoryBuyMenu

▸ **onGetInventoryBuyMenu**(req: *`express.Request`*, res: *`express.Response`*, next: *`express.NextFunction`*): `void`

*Defined in [routes/inventory.ts:328](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/routes/inventory.ts#L328)*

called when a GET request to /users/:userId/inventory/buymenu is done gets an user's buy menu returns 200 if successful returns 400 if the request is malformed returns 404 if the user doesn't exist

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |
| next | `express.NextFunction` |  the next request handler |

**Returns:** `void`

___
<a id="ongetinventorycosmetics"></a>

### `<Private>` onGetInventoryCosmetics

▸ **onGetInventoryCosmetics**(req: *`express.Request`*, res: *`express.Response`*, next: *`express.NextFunction`*): `void`

*Defined in [routes/inventory.ts:177](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/routes/inventory.ts#L177)*

called when a GET request to /users/:userId/inventory/cosmetics is done gets the currently equipped user's cosmetics returns 200 if successful returns 400 if the request is malformed returns 404 if the user doesn't exist

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |
| next | `express.NextFunction` |  the next request handler |

**Returns:** `void`

___
<a id="ongetinventoryloadout"></a>

### `<Private>` onGetInventoryLoadout

▸ **onGetInventoryLoadout**(req: *`express.Request`*, res: *`express.Response`*, next: *`express.NextFunction`*): `void`

*Defined in [routes/inventory.ts:253](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/routes/inventory.ts#L253)*

called when a GET request to /users/:userId/inventory/loadout is done gets an user's loadout returns 200 if successful returns 400 if the request is malformed returns 404 if the user doesn't exist

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |
| next | `express.NextFunction` |  the next request handler |

**Returns:** `void`

___
<a id="onpostinventory"></a>

### `<Private>` onPostInventory

▸ **onPostInventory**(req: *`express.Request`*, res: *`express.Response`*, next: *`express.NextFunction`*): `void`

*Defined in [routes/inventory.ts:116](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/routes/inventory.ts#L116)*

called when a POST request to /users/:userId/inventory is done adds an item to an user's inventory returns 200 if added successfully returns 400 if the request is malformed returns 404 if the user doesn't exist

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |
| next | `express.NextFunction` |  the next request handler |

**Returns:** `void`

___
<a id="onpostinventorybuymenu"></a>

### `<Private>` onPostInventoryBuyMenu

▸ **onPostInventoryBuyMenu**(req: *`express.Request`*, res: *`express.Response`*, next: *`express.NextFunction`*): `void`

*Defined in [routes/inventory.ts:444](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/routes/inventory.ts#L444)*

called when a POST request to /users/:userId/inventory/buymenu is done sets an user's sub buy menu returns 200 if set successfully returns 400 if the request is malformed returns 404 if the user doesn't exist

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |
| next | `express.NextFunction` |  the next request handler |

**Returns:** `void`

___
<a id="onpostinventorycosmetics"></a>

### `<Private>` onPostInventoryCosmetics

▸ **onPostInventoryCosmetics**(req: *`express.Request`*, res: *`express.Response`*, next: *`express.NextFunction`*): `void`

*Defined in [routes/inventory.ts:216](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/routes/inventory.ts#L216)*

called when a POST request to /users/:userId/inventory/cosmetics is done sets an user's equipped cosmetics returns 200 if set successfully returns 400 if the request is malformed returns 404 if the user doesn't exist

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |
| next | `express.NextFunction` |  the next request handler |

**Returns:** `void`

___
<a id="onpostinventoryloadout"></a>

### `<Private>` onPostInventoryLoadout

▸ **onPostInventoryLoadout**(req: *`express.Request`*, res: *`express.Response`*, next: *`express.NextFunction`*): `void`

*Defined in [routes/inventory.ts:292](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/routes/inventory.ts#L292)*

called when a POST request to /users/:userId/inventory/cosmetics is done sets an user's equipped cosmetics returns 200 if set successfully returns 400 if the request is malformed returns 404 if the user doesn't exist

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |
| next | `express.NextFunction` |  the next request handler |

**Returns:** `void`

___

