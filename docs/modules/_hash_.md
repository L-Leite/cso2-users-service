[cso2-users-service](../README.md) > ["hash"](../modules/_hash_.md)

# External module: "hash"

## Index

### Variables

* [HASH_PASSWORD_VERSION](_hash_.md#hash_password_version)

### Functions

* [buildPasswordHash](_hash_.md#buildpasswordhash)
* [comparePasswordHashes](_hash_.md#comparepasswordhashes)
* [generatePasswordHash](_hash_.md#generatepasswordhash)

---

## Variables

<a id="hash_password_version"></a>

### `<Const>` HASH_PASSWORD_VERSION

**● HASH_PASSWORD_VERSION**: *`number`* = 1

*Defined in [hash.ts:4](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/hash.ts#L4)*

___

## Functions

<a id="buildpasswordhash"></a>

###  buildPasswordHash

▸ **buildPasswordHash**(password: *`string`*): `Promise`<`string`>

*Defined in [hash.ts:24](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/hash.ts#L24)*

creates a string with the hash of a password and its salt it has the string format version, salt, iterations and hash respectively, separated by colons example: {version number}:{salt}:{iterations}:{hash}

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| password | `string` |  the password to be hashed |

**Returns:** `Promise`<`string`>
a string with a string format version, salt, iterations and hash respectively

___
<a id="comparepasswordhashes"></a>

###  comparePasswordHashes

▸ **comparePasswordHashes**(password: *`string`*, targetHash: *`string`*): `Promise`<`boolean`>

*Defined in [hash.ts:32](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/hash.ts#L32)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| password | `string` |
| targetHash | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="generatepasswordhash"></a>

###  generatePasswordHash

▸ **generatePasswordHash**(password: *`string`*, iterations: *`number`*, salt: *`string`*): `Promise`<`Buffer`>

*Defined in [hash.ts:13](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/hash.ts#L13)*

hashes a password with PBKDF2

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| password | `string` |  the password to be hashed |
| iterations | `number` |  the number of iterations to perform |
| salt | `string` |  the hash's salt |

**Returns:** `Promise`<`Buffer`>
a string with a string format version, salt, iterations and hash respectively

___

