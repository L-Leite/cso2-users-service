[cso2-users-service](../README.md) > ["log/loginstance"](../modules/_log_loginstance_.md) > [LogInstance](../classes/_log_loginstance_.loginstance.md)

# Class: LogInstance

sets up and stores the winston logger

## Hierarchy

**LogInstance**

## Index

### Properties

* [logger](_log_loginstance_.loginstance.md#logger)

### Methods

* [debug](_log_loginstance_.loginstance.md#debug)
* [error](_log_loginstance_.loginstance.md#error)
* [info](_log_loginstance_.loginstance.md#info)
* [init](_log_loginstance_.loginstance.md#init)
* [warn](_log_loginstance_.loginstance.md#warn)

---

## Properties

<a id="logger"></a>

### `<Static>``<Private>` logger

**● logger**: *`Logger`*

*Defined in [log/loginstance.ts:59](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/log/loginstance.ts#L59)*

___

## Methods

<a id="debug"></a>

### `<Static>` debug

▸ **debug**(message: *`string`*): `void`

*Defined in [log/loginstance.ts:11](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/log/loginstance.ts#L11)*

log a debug type message

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| message | `string` |  the message to log |

**Returns:** `void`

___
<a id="error"></a>

### `<Static>` error

▸ **error**(message: *`string`*): `void`

*Defined in [log/loginstance.ts:19](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/log/loginstance.ts#L19)*

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

*Defined in [log/loginstance.ts:27](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/log/loginstance.ts#L27)*

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

*Defined in [log/loginstance.ts:42](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/log/loginstance.ts#L42)*

setup winston logger

**Returns:** `void`

___
<a id="warn"></a>

### `<Static>` warn

▸ **warn**(message: *`string`*): `void`

*Defined in [log/loginstance.ts:35](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/log/loginstance.ts#L35)*

log a warning type message

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| message | `string` |  the message to log |

**Returns:** `void`

___

