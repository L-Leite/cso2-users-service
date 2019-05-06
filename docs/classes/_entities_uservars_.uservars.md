[cso2-users-service](../README.md) > ["entities/uservars"](../modules/_entities_uservars_.md) > [UserVars](../classes/_entities_uservars_.uservars.md)

# Class: UserVars

a document that stores global user variables

## Hierarchy

 `Typegoose`

**↳ UserVars**

## Index

### Properties

* [nextUserId](_entities_uservars_.uservars.md#nextuserid)

### Methods

* [getModelForClass](_entities_uservars_.uservars.md#getmodelforclass)
* [setModelForClass](_entities_uservars_.uservars.md#setmodelforclass)
* [createDoc](_entities_uservars_.uservars.md#createdoc)
* [getAndIncrementNextUserId](_entities_uservars_.uservars.md#getandincrementnextuserid)
* [getInstance](_entities_uservars_.uservars.md#getinstance)
* [setupDoc](_entities_uservars_.uservars.md#setupdoc)

---

## Properties

<a id="nextuserid"></a>

### `<Optional>` nextUserId

**● nextUserId**: *`number`*

*Defined in [entities/uservars.ts:55](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/uservars.ts#L55)*

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
<a id="createdoc"></a>

### `<Static>``<Private>` createDoc

▸ **createDoc**(): `void`

*Defined in [entities/uservars.ts:49](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/uservars.ts#L49)*

create a new document

**Returns:** `void`

___
<a id="getandincrementnextuserid"></a>

### `<Static>` getAndIncrementNextUserId

▸ **getAndIncrementNextUserId**(): `Promise`<`number`>

*Defined in [entities/uservars.ts:30](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/uservars.ts#L30)*

**Returns:** `Promise`<`number`>

___
<a id="getinstance"></a>

### `<Static>` getInstance

▸ **getInstance**(): `Promise`<[UserVars](_entities_uservars_.uservars.md)>

*Defined in [entities/uservars.ts:25](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/uservars.ts#L25)*

**Returns:** `Promise`<[UserVars](_entities_uservars_.uservars.md)>

___
<a id="setupdoc"></a>

### `<Static>` setupDoc

▸ **setupDoc**(): `void`

*Defined in [entities/uservars.ts:12](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/entities/uservars.ts#L12)*

setup the uservars table

**Returns:** `void`

___

