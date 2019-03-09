[cso2-users-service](../README.md) > ["api/usersroute"](../modules/_api_usersroute_.md) > [UsersRoute](../classes/_api_usersroute_.usersroute.md)

# Class: UsersRoute

handles requests to /users

## Hierarchy

**UsersRoute**

## Index

### Constructors

* [constructor](_api_usersroute_.usersroute.md#constructor)

### Methods

* [onGetUsers](_api_usersroute_.usersroute.md#ongetusers)
* [onGetUsersUserId](_api_usersroute_.usersroute.md#ongetusersuserid)
* [onPostSignup](_api_usersroute_.usersroute.md#onpostsignup)
* [onPutLogin](_api_usersroute_.usersroute.md#onputlogin)
* [onPutLogout](_api_usersroute_.usersroute.md#onputlogout)
* [getNumOfParams](_api_usersroute_.usersroute.md#getnumofparams)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new UsersRoute**(app: *`express.Express`*): [UsersRoute](_api_usersroute_.usersroute.md)

*Defined in api/usersroute.ts:11*

**Parameters:**

| Name | Type |
| ------ | ------ |
| app | `express.Express` |

**Returns:** [UsersRoute](_api_usersroute_.usersroute.md)

___

## Methods

<a id="ongetusers"></a>

### `<Private>` onGetUsers

▸ **onGetUsers**(req: *`express.Request`*, res: *`express.Response`*, next: *`express.NextFunction`*): `void`

*Defined in api/usersroute.ts:35*

called when a GET request to /users is done returns every users' id and name returns 200 if successful returns 400 if the request is malformed

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |
| next | `express.NextFunction` |  the next request handler |

**Returns:** `void`

___
<a id="ongetusersuserid"></a>

### `<Private>` onGetUsersUserId

▸ **onGetUsersUserId**(req: *`express.Request`*, res: *`express.Response`*, next: *`express.NextFunction`*): `void`

*Defined in api/usersroute.ts:71*

called when a GET request to /users/:userId is done returns an user's information returns 200 if successful returns 400 if the request is malformed returns 404 if the user cannot be found

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |
| next | `express.NextFunction` |  the next request handler |

**Returns:** `void`

___
<a id="onpostsignup"></a>

### `<Private>` onPostSignup

▸ **onPostSignup**(req: *`express.Request`*, res: *`express.Response`*, next: *`express.NextFunction`*): `void`

*Defined in api/usersroute.ts:115*

called when a POST request to /users/signup is done creates a new user according to the sender's parameters returns 201 if the user was created returns 400 if the request is malformed returns 409 if the user already exists

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |
| next | `express.NextFunction` |  the next request handler |

**Returns:** `void`

___
<a id="onputlogin"></a>

### `<Private>` onPutLogin

▸ **onPutLogin**(req: *`express.Request`*, res: *`express.Response`*, next: *`express.NextFunction`*): `void`

*Defined in api/usersroute.ts:147*

called when a PUT request to /users/login is done logs in an user with the credentials the sender provided returns 200 if the login was sucessfull returns 400 if the request is malformed returns 401 if the credentials are invalid

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |
| next | `express.NextFunction` |  the next request handler |

**Returns:** `void`

___
<a id="onputlogout"></a>

### `<Private>` onPutLogout

▸ **onPutLogout**(req: *`express.Request`*, res: *`express.Response`*, next: *`express.NextFunction`*): `void`

*Defined in api/usersroute.ts:183*

called when a PUT request to /users/logout is done logs in an user with the credentials the sender provided returns 200 if logged out sucessfully returns 400 if the request is malformed returns 404 if the user doesn't exist

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |
| next | `express.NextFunction` |  the next request handler |

**Returns:** `void`

___
<a id="getnumofparams"></a>

### `<Static>``<Private>` getNumOfParams

▸ **getNumOfParams**(req: *`express.Request`*): `number`

*Defined in api/usersroute.ts:9*

**Parameters:**

| Name | Type |
| ------ | ------ |
| req | `express.Request` |

**Returns:** `number`

___

