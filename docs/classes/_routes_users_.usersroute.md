[cso2-users-service](../README.md) > ["routes/users"](../modules/_routes_users_.md) > [UsersRoute](../classes/_routes_users_.usersroute.md)

# Class: UsersRoute

handles requests to /users

## Hierarchy

**UsersRoute**

## Index

### Constructors

* [constructor](_routes_users_.usersroute.md#constructor)

### Methods

* [onGetUsers](_routes_users_.usersroute.md#ongetusers)
* [onGetUsersUserId](_routes_users_.usersroute.md#ongetusersuserid)
* [onPostSignup](_routes_users_.usersroute.md#onpostsignup)
* [onPutLogin](_routes_users_.usersroute.md#onputlogin)
* [onPutLogout](_routes_users_.usersroute.md#onputlogout)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new UsersRoute**(app: *`express.Express`*): [UsersRoute](_routes_users_.usersroute.md)

*Defined in [routes/users.ts:8](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/routes/users.ts#L8)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| app | `express.Express` |

**Returns:** [UsersRoute](_routes_users_.usersroute.md)

___

## Methods

<a id="ongetusers"></a>

### `<Private>` onGetUsers

▸ **onGetUsers**(req: *`express.Request`*, res: *`express.Response`*, next: *`express.NextFunction`*): `void`

*Defined in [routes/users.ts:32](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/routes/users.ts#L32)*

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

*Defined in [routes/users.ts:68](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/routes/users.ts#L68)*

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

*Defined in [routes/users.ts:110](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/routes/users.ts#L110)*

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

*Defined in [routes/users.ts:146](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/routes/users.ts#L146)*

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

*Defined in [routes/users.ts:182](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/routes/users.ts#L182)*

called when a PUT request to /users/logout is done logs in an user with the credentials the sender provided returns 200 if logged out sucessfully returns 400 if the request is malformed returns 404 if the user doesn't exist

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |
| next | `express.NextFunction` |  the next request handler |

**Returns:** `void`

___

