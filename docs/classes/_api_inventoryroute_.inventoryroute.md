[cso2-users-service](../README.md) > ["api/inventoryroute"](../modules/_api_inventoryroute_.md) > [InventoryRoute](../classes/_api_inventoryroute_.inventoryroute.md)

# Class: InventoryRoute

handles requests to /users/:userId/inventory

## Hierarchy

**InventoryRoute**

## Index

### Constructors

* [constructor](_api_inventoryroute_.inventoryroute.md#constructor)

### Methods

* [onDeleteInventory](_api_inventoryroute_.inventoryroute.md#ondeleteinventory)
* [onGetInventory](_api_inventoryroute_.inventoryroute.md#ongetinventory)
* [onGetInventoryBuyMenu](_api_inventoryroute_.inventoryroute.md#ongetinventorybuymenu)
* [onGetInventoryCosmetics](_api_inventoryroute_.inventoryroute.md#ongetinventorycosmetics)
* [onGetInventoryLoadout](_api_inventoryroute_.inventoryroute.md#ongetinventoryloadout)
* [onPostInventory](_api_inventoryroute_.inventoryroute.md#onpostinventory)
* [onPostInventoryBuyMenu](_api_inventoryroute_.inventoryroute.md#onpostinventorybuymenu)
* [onPostInventoryCosmetics](_api_inventoryroute_.inventoryroute.md#onpostinventorycosmetics)
* [onPostInventoryLoadout](_api_inventoryroute_.inventoryroute.md#onpostinventoryloadout)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new InventoryRoute**(app: *`express.Express`*): [InventoryRoute](_api_inventoryroute_.inventoryroute.md)

*Defined in api/inventoryroute.ts:50*

**Parameters:**

| Name | Type |
| ------ | ------ |
| app | `express.Express` |

**Returns:** [InventoryRoute](_api_inventoryroute_.inventoryroute.md)

___

## Methods

<a id="ondeleteinventory"></a>

### `<Private>` onDeleteInventory

▸ **onDeleteInventory**(req: *`express.Request`*, res: *`express.Response`*, next: *`express.NextFunction`*): `void`

*Defined in api/inventoryroute.ts:146*

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

*Defined in api/inventoryroute.ts:77*

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

*Defined in api/inventoryroute.ts:315*

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

*Defined in api/inventoryroute.ts:177*

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

*Defined in api/inventoryroute.ts:246*

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

*Defined in api/inventoryroute.ts:116*

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

*Defined in api/inventoryroute.ts:455*

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

*Defined in api/inventoryroute.ts:216*

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

*Defined in api/inventoryroute.ts:285*

called when a POST request to /users/:userId/inventory/cosmetics is done sets an user's equipped cosmetics returns 200 if set successfully returns 400 if the request is malformed returns 404 if the user doesn't exist

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |
| next | `express.NextFunction` |  the next request handler |

**Returns:** `void`

___

