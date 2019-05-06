[cso2-users-service](../README.md) > ["entities/usersession"](../modules/_entities_usersession_.md) > [UserSession](../classes/_entities_usersession_.usersession.md)

# Class: UserSession

Handles an user's session information

## Hierarchy

 `Typegoose`

**↳ UserSession**

## Index

### Properties

* [currentChannelIndex](_entities_usersession_.usersession.md#currentchannelindex)
* [currentChannelServerIndex](_entities_usersession_.usersession.md#currentchannelserverindex)
* [currentRoomId](_entities_usersession_.usersession.md#currentroomid)
* [externalNet](_entities_usersession_.usersession.md#externalnet)
* [internalNet](_entities_usersession_.usersession.md#internalnet)
* [sessionId](_entities_usersession_.usersession.md#sessionid)
* [userId](_entities_usersession_.usersession.md#userid)

### Methods

* [getModelForClass](_entities_usersession_.usersession.md#getmodelforclass)
* [setCurrentChannelIndex](_entities_usersession_.usersession.md#setcurrentchannelindex)
* [setModelForClass](_entities_usersession_.usersession.md#setmodelforclass)
* [updateHolepunch](_entities_usersession_.usersession.md#updateholepunch)
* [count](_entities_usersession_.usersession.md#count)
* [create](_entities_usersession_.usersession.md#create)
* [delete](_entities_usersession_.usersession.md#delete)
* [deleteByUserId](_entities_usersession_.usersession.md#deletebyuserid)
* [get](_entities_usersession_.usersession.md#get)
* [getByUserId](_entities_usersession_.usersession.md#getbyuserid)
* [set](_entities_usersession_.usersession.md#set)

---

## Properties

<a id="currentchannelindex"></a>

###  currentChannelIndex

**● currentChannelIndex**: *`number`*

*Defined in [entities/usersession.ts:135](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/usersession.ts#L135)*

___
<a id="currentchannelserverindex"></a>

###  currentChannelServerIndex

**● currentChannelServerIndex**: *`number`*

*Defined in [entities/usersession.ts:133](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/usersession.ts#L133)*

___
<a id="currentroomid"></a>

###  currentRoomId

**● currentRoomId**: *`number`*

*Defined in [entities/usersession.ts:138](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/usersession.ts#L138)*

___
<a id="externalnet"></a>

###  externalNet

**● externalNet**: *[SessionNetworkInfo](_entities_sessionnetworkinfo_.sessionnetworkinfo.md)*

*Defined in [entities/usersession.ts:128](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/usersession.ts#L128)*

___
<a id="internalnet"></a>

###  internalNet

**● internalNet**: *[SessionNetworkInfo](_entities_sessionnetworkinfo_.sessionnetworkinfo.md)*

*Defined in [entities/usersession.ts:130](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/usersession.ts#L130)*

___
<a id="sessionid"></a>

###  sessionId

**● sessionId**: *`string`*

*Defined in [entities/usersession.ts:123](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/usersession.ts#L123)*

___
<a id="userid"></a>

###  userId

**● userId**: *`number`*

*Defined in [entities/usersession.ts:125](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/usersession.ts#L125)*

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
<a id="setcurrentchannelindex"></a>

###  setCurrentChannelIndex

▸ **setCurrentChannelIndex**(channelServerIndex: *`number`*, channelIndex: *`number`*): `void`

*Defined in [entities/usersession.ts:140](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/usersession.ts#L140)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| channelServerIndex | `number` |
| channelIndex | `number` |

**Returns:** `void`

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
<a id="updateholepunch"></a>

###  updateHolepunch

▸ **updateHolepunch**(portId: *`number`*, localPort: *`number`*, externalPort: *`number`*): `number`

*Defined in [entities/usersession.ts:145](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/usersession.ts#L145)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| portId | `number` |
| localPort | `number` |
| externalPort | `number` |

**Returns:** `number`

___
<a id="count"></a>

### `<Static>` count

▸ **count**(): `Promise`<`number`>

*Defined in [entities/usersession.ts:73](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/usersession.ts#L73)*

retrieve the number of sessions in the database

**Returns:** `Promise`<`number`>
the number of sessions in the database

___
<a id="create"></a>

### `<Static>` create

▸ **create**(userId: *`number`*): `Promise`<[UserSession](_entities_usersession_.usersession.md)>

*Defined in [entities/usersession.ts:83](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/usersession.ts#L83)*

creates a new user session

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userId | `number` |  the target user's ID |

**Returns:** `Promise`<[UserSession](_entities_usersession_.usersession.md)>
the new UserSession object

___
<a id="delete"></a>

### `<Static>` delete

▸ **delete**(sessionId: *`string`*): `Promise`<`boolean`>

*Defined in [entities/usersession.ts:101](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/usersession.ts#L101)*

delete a session by its ID

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| sessionId | `string` |  the to be removed session's ID |

**Returns:** `Promise`<`boolean`>
true if deleted successfully, false if not

___
<a id="deletebyuserid"></a>

### `<Static>` deleteByUserId

▸ **deleteByUserId**(userId: *`number`*): `Promise`<`boolean`>

*Defined in [entities/usersession.ts:114](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/usersession.ts#L114)*

delete a session by its owning user's ID

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userId | `number` |  the owner's user ID |

**Returns:** `Promise`<`boolean`>
true if deleted successfully, false if not

___
<a id="get"></a>

### `<Static>` get

▸ **get**(sessionId: *`string`*): `Promise`<[UserSession](_entities_usersession_.usersession.md)>

*Defined in [entities/usersession.ts:41](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/usersession.ts#L41)*

retrieve an user's session by its session ID

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| sessionId | `string` |  the target session's ID |

**Returns:** `Promise`<[UserSession](_entities_usersession_.usersession.md)>
the requested UserSession, if found. otherwise it will return a null object

___
<a id="getbyuserid"></a>

### `<Static>` getByUserId

▸ **getByUserId**(userId: *`number`*): `Promise`<[UserSession](_entities_usersession_.usersession.md)>

*Defined in [entities/usersession.ts:51](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/usersession.ts#L51)*

retrieve an user's session by its owning user's ID

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userId | `number` |  the owning user's ID |

**Returns:** `Promise`<[UserSession](_entities_usersession_.usersession.md)>
the requested UserSession, if found. otherwise it will return a null object

___
<a id="set"></a>

### `<Static>` set

▸ **set**(userId: *`number`*, updatedSession: *[ISetSessionInfoBody](../interfaces/_entities_usersession_.isetsessioninfobody.md)*): `Promise`<`boolean`>

*Defined in [entities/usersession.ts:62](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/usersession.ts#L62)*

set an user's session information properties

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userId | `number` |  the owning user's ID |
| updatedSession | [ISetSessionInfoBody](../interfaces/_entities_usersession_.isetsessioninfobody.md) |  the new session information properties |

**Returns:** `Promise`<`boolean`>
true if updated sucessfully, false if not

___

