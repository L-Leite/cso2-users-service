[cso2-users-service](../README.md) > ["entities/user"](../modules/_entities_user_.md) > [User](../classes/_entities_user_.user.md)

# Class: User

represents an user and its data

## Hierarchy

 `Typegoose`

**↳ User**

## Index

### Properties

* [assists](_entities_user_.user.md#assists)
* [avatar](_entities_user_.user.md#avatar)
* [curExp](_entities_user_.user.md#curexp)
* [deaths](_entities_user_.user.md#deaths)
* [kills](_entities_user_.user.md#kills)
* [level](_entities_user_.user.md#level)
* [losses](_entities_user_.user.md#losses)
* [maxExp](_entities_user_.user.md#maxexp)
* [password](_entities_user_.user.md#password)
* [playerName](_entities_user_.user.md#playername)
* [rank](_entities_user_.user.md#rank)
* [userId](_entities_user_.user.md#userid)
* [userName](_entities_user_.user.md#username)
* [vipLevel](_entities_user_.user.md#viplevel)
* [wins](_entities_user_.user.md#wins)

### Methods

* [getModelForClass](_entities_user_.user.md#getmodelforclass)
* [setModelForClass](_entities_user_.user.md#setmodelforclass)
* [createUser](_entities_user_.user.md#createuser)
* [getAllUsers](_entities_user_.user.md#getallusers)
* [getUserById](_entities_user_.user.md#getuserbyid)
* [getUserByName](_entities_user_.user.md#getuserbyname)
* [removeUserById](_entities_user_.user.md#removeuserbyid)
* [set](_entities_user_.user.md#set)
* [validateCredentials](_entities_user_.user.md#validatecredentials)

---

## Properties

<a id="assists"></a>

###  assists

**● assists**: *`number`*

*Defined in [entities/user.ts:155](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L155)*

___
<a id="avatar"></a>

###  avatar

**● avatar**: *`number`*

*Defined in [entities/user.ts:137](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L137)*

___
<a id="curexp"></a>

###  curExp

**● curExp**: *`number`*

*Defined in [entities/user.ts:139](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L139)*

___
<a id="deaths"></a>

###  deaths

**● deaths**: *`number`*

*Defined in [entities/user.ts:153](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L153)*

___
<a id="kills"></a>

###  kills

**● kills**: *`number`*

*Defined in [entities/user.ts:151](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L151)*

___
<a id="level"></a>

###  level

**● level**: *`number`*

*Defined in [entities/user.ts:135](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L135)*

___
<a id="losses"></a>

###  losses

**● losses**: *`number`*

*Defined in [entities/user.ts:149](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L149)*

___
<a id="maxexp"></a>

###  maxExp

**● maxExp**: *`number`*

*Defined in [entities/user.ts:141](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L141)*

___
<a id="password"></a>

###  password

**● password**: *`string`*

*Defined in [entities/user.ts:133](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L133)*

___
<a id="playername"></a>

###  playerName

**● playerName**: *`string`*

*Defined in [entities/user.ts:131](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L131)*

___
<a id="rank"></a>

###  rank

**● rank**: *`number`*

*Defined in [entities/user.ts:143](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L143)*

___
<a id="userid"></a>

###  userId

**● userId**: *`number`*

*Defined in [entities/user.ts:127](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L127)*

___
<a id="username"></a>

###  userName

**● userName**: *`string`*

*Defined in [entities/user.ts:129](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L129)*

___
<a id="viplevel"></a>

###  vipLevel

**● vipLevel**: *`number`*

*Defined in [entities/user.ts:145](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L145)*

___
<a id="wins"></a>

###  wins

**● wins**: *`number`*

*Defined in [entities/user.ts:147](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L147)*

___

## Methods

<a id="getmodelforclass"></a>

###  getModelForClass

▸ **getModelForClass**<`T`>(t: *`T`*, __namedParameters?: *`object`*): `Model`<`InstanceType`<`this`>> & `this` & `T`

*Inherited from Typegoose.getModelForClass*

*Defined in /home/ochii/projects/cso2-users-service/node_modules/typegoose/lib/typegoose.d.ts:18*

**Type parameters:**

#### T 
**Parameters:**

**t: `T`**

**`Optional` __namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| existingConnection | `Connection` |
| existingMongoose | `"mongoose"` |
| schemaOptions | `SchemaOptions` |

**Returns:** `Model`<`InstanceType`<`this`>> & `this` & `T`

___
<a id="setmodelforclass"></a>

###  setModelForClass

▸ **setModelForClass**<`T`>(t: *`T`*, __namedParameters?: *`object`*): `Model`<`InstanceType`<`this`>> & `this` & `T`

*Inherited from Typegoose.setModelForClass*

*Defined in /home/ochii/projects/cso2-users-service/node_modules/typegoose/lib/typegoose.d.ts:19*

**Type parameters:**

#### T 
**Parameters:**

**t: `T`**

**`Optional` __namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| existingConnection | `Connection` |
| existingMongoose | `"mongoose"` |
| schemaOptions | `SchemaOptions` |

**Returns:** `Model`<`InstanceType`<`this`>> & `this` & `T`

___
<a id="createuser"></a>

### `<Static>` createUser

▸ **createUser**(userName: *`string`*, playerName: *`string`*, password: *`string`*): `Promise`<[User](_entities_user_.user.md)>

*Defined in [entities/user.ts:71](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L71)*

create a new user in the db

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userName | `string` |  the new user's name |
| playerName | `string` |  the new user's ingame player name |
| password | `string` |  the new user's password |

**Returns:** `Promise`<[User](_entities_user_.user.md)>
a promise with the new created user

___
<a id="getallusers"></a>

### `<Static>` getAllUsers

▸ **getAllUsers**(): `Promise`<[User](_entities_user_.user.md)[]>

*Defined in [entities/user.ts:26](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L26)*

retrieve every user in the db

**Returns:** `Promise`<[User](_entities_user_.user.md)[]>
a promise with the users

___
<a id="getuserbyid"></a>

### `<Static>` getUserById

▸ **getUserById**(userId: *`number`*): `Promise`<[User](_entities_user_.user.md)>

*Defined in [entities/user.ts:36](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L36)*

retrieve an user's information by its ID

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userId | `number` |  the target's user ID |

**Returns:** `Promise`<[User](_entities_user_.user.md)>
the target user, null if not

___
<a id="getuserbyname"></a>

### `<Static>` getUserByName

▸ **getUserByName**(userName: *`string`*): `Promise`<[User](_entities_user_.user.md)>

*Defined in [entities/user.ts:46](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L46)*

retrieve an user's information by its username

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userName | `string` |  the target's user name |

**Returns:** `Promise`<[User](_entities_user_.user.md)>
the target user if found, null if not

___
<a id="removeuserbyid"></a>

### `<Static>` removeUserById

▸ **removeUserById**(userId: *`number`*): `Promise`<`boolean`>

*Defined in [entities/user.ts:97](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L97)*

delete an user by its ID

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userId | `number` |  the target's user ID |

**Returns:** `Promise`<`boolean`>
a promise with the target user

___
<a id="set"></a>

### `<Static>` set

▸ **set**(userId: *`number`*, updatedUser: *[ISetUserRequest](../interfaces/_entities_user_.isetuserrequest.md)*): `Promise`<`boolean`>

*Defined in [entities/user.ts:57](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L57)*

set an user's information properties

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userId | `number` |  the target user's ID |
| updatedUser | [ISetUserRequest](../interfaces/_entities_user_.isetuserrequest.md) |  the new user information properties |

**Returns:** `Promise`<`boolean`>
true if updated sucessfully, false if not

___
<a id="validatecredentials"></a>

### `<Static>` validateCredentials

▸ **validateCredentials**(userName: *`string`*, password: *`string`*): `Promise`<`number`>

*Defined in [entities/user.ts:111](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/user.ts#L111)*

validate an user's credentials

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userName | `string` |  the user's name |
| password | `string` |  the user's password |

**Returns:** `Promise`<`number`>
a promise with the logged in user's ID

___

