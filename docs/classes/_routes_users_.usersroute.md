[cso2-users-service](../README.md) > ["routes/users"](../modules/_routes_users_.md) > [UsersRoute](../classes/_routes_users_.usersroute.md)

# Class: UsersRoute

handles requests to /users

## Hierarchy

**UsersRoute**

## Index

### Constructors

* [constructor](_routes_users_.usersroute.md#constructor)

### Methods

* [onDeleteSession](_routes_users_.usersroute.md#ondeletesession)
* [onDeleteUserById](_routes_users_.usersroute.md#ondeleteuserbyid)
* [onGetPing](_routes_users_.usersroute.md#ongetping)
* [onGetSession](_routes_users_.usersroute.md#ongetsession)
* [onGetUsers](_routes_users_.usersroute.md#ongetusers)
* [onGetUsersById](_routes_users_.usersroute.md#ongetusersbyid)
* [onGetUsersByName](_routes_users_.usersroute.md#ongetusersbyname)
* [onPostSession](_routes_users_.usersroute.md#onpostsession)
* [onPostUsers](_routes_users_.usersroute.md#onpostusers)
* [onPutSession](_routes_users_.usersroute.md#onputsession)
* [onPutUsersById](_routes_users_.usersroute.md#onputusersbyid)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new UsersRoute**(app: *`express.Express`*): [UsersRoute](_routes_users_.usersroute.md)

*Defined in [routes/users.ts:12](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/routes/users.ts#L12)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| app | `express.Express` |

**Returns:** [UsersRoute](_routes_users_.usersroute.md)

___

## Methods

<a id="ondeletesession"></a>

### `<Private>` onDeleteSession

▸ **onDeleteSession**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in [routes/users.ts:317](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/routes/users.ts#L317)*

called when a DELETE request to /users/session is done deletes an user's session returns 200 if logged out sucessfully returns 400 if the request is malformed returns 404 if the session wasn't found returns 500 if an internal error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="ondeleteuserbyid"></a>

### `<Private>` onDeleteUserById

▸ **onDeleteUserById**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in [routes/users.ts:173](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/routes/users.ts#L173)*

called when a DELETE request to /users/:userId is done deletes an user by its userId returns 200 if successful returns 400 if the request is malformed returns 404 if the user cannot be found returns 500 if an internal error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="ongetping"></a>

### `<Private>` onGetPing

▸ **onGetPing**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in [routes/users.ts:383](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/routes/users.ts#L383)*

called when a GET request to /ping is done tells the requester that we are alive returns 200

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="ongetsession"></a>

### `<Private>` onGetSession

▸ **onGetSession**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in [routes/users.ts:209](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/routes/users.ts#L209)*

called when a GET request to /users/session is done gets an user session by its owning user's ID returns 200 if the session was found returns 400 if the request is malformed returns 404 if the session wasn't found returns 500 if an internal error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="ongetusers"></a>

### `<Private>` onGetUsers

▸ **onGetUsers**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in [routes/users.ts:41](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/routes/users.ts#L41)*

called when a GET request to /users is done returns every users' id and name returns 200 if successful returns 400 if the request is malformed returns 500 if an internal error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="ongetusersbyid"></a>

### `<Private>` onGetUsersById

▸ **onGetUsersById**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in [routes/users.ts:102](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/routes/users.ts#L102)*

called when a GET request to /users/:userId is done returns an user's information returns 200 if successful returns 400 if the request is malformed returns 404 if the user cannot be found returns 500 if an internal error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="ongetusersbyname"></a>

### `<Private>` onGetUsersByName

▸ **onGetUsersByName**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in [routes/users.ts:350](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/routes/users.ts#L350)*

called when a GET request to /users/byname/:username is done returns an user's information by their username returns 200 if successful returns 400 if the request is malformed returns 404 if the user cannot be found returns 500 if an internal error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="onpostsession"></a>

### `<Private>` onPostSession

▸ **onPostSession**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in [routes/users.ts:243](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/routes/users.ts#L243)*

called when a POST request to /users/session is done creates a new user session with the user's credentials returns status 201 and the session if the session was created returns 400 if the request is malformed returns 401 if the credentials are invalid returns 409 if a session already exists returns 500 if an internal error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="onpostusers"></a>

### `<Private>` onPostUsers

▸ **onPostUsers**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in [routes/users.ts:65](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/routes/users.ts#L65)*

called when a POST request to /users is done creates a new user returns 201 if the user was created returns 400 if the request is malformed returns 409 if the user already exists returns 500 if an internal error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="onputsession"></a>

### `<Private>` onPutSession

▸ **onPutSession**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in [routes/users.ts:284](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/routes/users.ts#L284)*

called when a PUT request to /users/session is done updates an user's session data returns 200 if the session was updated returns 400 if the request is malformed returns 404 if the session wasn't found returns 500 if an internal error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="onputusersbyid"></a>

### `<Private>` onPutUsersById

▸ **onPutUsersById**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in [routes/users.ts:138](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/routes/users.ts#L138)*

called when a PUT request to /users/:userId is done updates an user's data returns 200 if the data was updated successfully returns 400 if the request is malformed returns 404 if the user wasn't found returns 500 if an internal error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___

