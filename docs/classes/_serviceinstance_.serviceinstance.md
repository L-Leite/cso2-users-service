[cso2-users-service](../README.md) > ["serviceinstance"](../modules/_serviceinstance_.md) > [ServiceInstance](../classes/_serviceinstance_.serviceinstance.md)

# Class: ServiceInstance

the service's entrypoint

## Hierarchy

**ServiceInstance**

## Index

### Constructors

* [constructor](_serviceinstance_.serviceinstance.md#constructor)

### Properties

* [app](_serviceinstance_.serviceinstance.md#app)
* [server](_serviceinstance_.serviceinstance.md#server)

### Methods

* [applyConfigs](_serviceinstance_.serviceinstance.md#applyconfigs)
* [isDevEnv](_serviceinstance_.serviceinstance.md#isdevenv)
* [listen](_serviceinstance_.serviceinstance.md#listen)
* [setupRoutes](_serviceinstance_.serviceinstance.md#setuproutes)
* [stop](_serviceinstance_.serviceinstance.md#stop)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ServiceInstance**(): [ServiceInstance](_serviceinstance_.serviceinstance.md)

*Defined in [serviceinstance.ts:18](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/serviceinstance.ts#L18)*

**Returns:** [ServiceInstance](_serviceinstance_.serviceinstance.md)

___

## Properties

<a id="app"></a>

###  app

**● app**: *`express.Express`*

*Defined in [serviceinstance.ts:17](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/serviceinstance.ts#L17)*

___
<a id="server"></a>

### `<Private>` server

**● server**: *`Server`*

*Defined in [serviceinstance.ts:18](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/serviceinstance.ts#L18)*

___

## Methods

<a id="applyconfigs"></a>

### `<Private>` applyConfigs

▸ **applyConfigs**(): `void`

*Defined in [serviceinstance.ts:44](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/serviceinstance.ts#L44)*

apply configurations to the service

**Returns:** `void`

___
<a id="isdevenv"></a>

### `<Private>` isDevEnv

▸ **isDevEnv**(): `boolean`

*Defined in [serviceinstance.ts:73](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/serviceinstance.ts#L73)*

are we in a development environment?

**Returns:** `boolean`
true if so, false if not

___
<a id="listen"></a>

###  listen

▸ **listen**(): `void`

*Defined in [serviceinstance.ts:32](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/serviceinstance.ts#L32)*

start the service

**Returns:** `void`

___
<a id="setuproutes"></a>

### `<Private>` setupRoutes

▸ **setupRoutes**(): `void`

*Defined in [serviceinstance.ts:64](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/serviceinstance.ts#L64)*

setup the service's API routes

**Returns:** `void`

___
<a id="stop"></a>

###  stop

▸ **stop**(): `void`

*Defined in [serviceinstance.ts:37](https://github.com/Ochii/cso2-users-service/blob/53e53f9/src/serviceinstance.ts#L37)*

**Returns:** `void`

___

