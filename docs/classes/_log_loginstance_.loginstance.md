[cso2-users-service](../README.md) > ["log/loginstance"](../modules/_log_loginstance_.md) > [LogInstance](../classes/_log_loginstance_.loginstance.md)

# Class: LogInstance

sets up and stores the winston logger

## Hierarchy

**LogInstance**

## Index

### Properties

* [logger](_log_loginstance_.loginstance.md#logger)

### Methods

* [error](_log_loginstance_.loginstance.md#error)
* [info](_log_loginstance_.loginstance.md#info)
* [init](_log_loginstance_.loginstance.md#init)
* [warn](_log_loginstance_.loginstance.md#warn)

---

## Properties

<a id="logger"></a>

### `<Static>``<Private>` logger

**● logger**: *`Logger`*

*Defined in [log/loginstance.ts:55](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/log/loginstance.ts#L55)*

___

## Methods

<a id="error"></a>

### `<Static>` error

▸ **error**(message: *`string`*): `void`

*Defined in [log/loginstance.ts:13](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/log/loginstance.ts#L13)*

log a error type message

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| message | `string` |  the message to log |

**Returns:** `void`

___
<a id="info"></a>

### `<Static>` info

▸ **info**(message: *`string`*): `void`

*Defined in [log/loginstance.ts:22](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/log/loginstance.ts#L22)*

log a information type message

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| message | `string` |  the message to log |

**Returns:** `void`

___
<a id="init"></a>

### `<Static>` init

▸ **init**(): `void`

*Defined in [log/loginstance.ts:38](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/log/loginstance.ts#L38)*

setup winston logger

**Returns:** `void`

___
<a id="warn"></a>

### `<Static>` warn

▸ **warn**(message: *`string`*): `void`

*Defined in [log/loginstance.ts:31](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/log/loginstance.ts#L31)*

log a warning type message

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| message | `string` |  the message to log |

**Returns:** `void`

___

