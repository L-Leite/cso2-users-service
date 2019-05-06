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
* [setupDb](_serviceinstance_.serviceinstance.md#setupdb)
* [setupRoutes](_serviceinstance_.serviceinstance.md#setuproutes)
* [stop](_serviceinstance_.serviceinstance.md#stop)
* [checkEnvVars](_serviceinstance_.serviceinstance.md#checkenvvars)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ServiceInstance**(): [ServiceInstance](_serviceinstance_.serviceinstance.md)

*Defined in [serviceinstance.ts:42](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/serviceinstance.ts#L42)*

**Returns:** [ServiceInstance](_serviceinstance_.serviceinstance.md)

___

## Properties

<a id="app"></a>

###  app

**● app**: *`express.Express`*

*Defined in [serviceinstance.ts:41](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/serviceinstance.ts#L41)*

___
<a id="server"></a>

### `<Private>` server

**● server**: *`Server`*

*Defined in [serviceinstance.ts:42](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/serviceinstance.ts#L42)*

___

## Methods

<a id="applyconfigs"></a>

### `<Private>` applyConfigs

▸ **applyConfigs**(): `void`

*Defined in [serviceinstance.ts:99](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/serviceinstance.ts#L99)*

apply configurations to the service

**Returns:** `void`

___
<a id="isdevenv"></a>

### `<Private>` isDevEnv

▸ **isDevEnv**(): `boolean`

*Defined in [serviceinstance.ts:127](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/serviceinstance.ts#L127)*

are we in a development environment

**Returns:** `boolean`
true if so, false if not

___
<a id="listen"></a>

###  listen

▸ **listen**(): `void`

*Defined in [serviceinstance.ts:60](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/serviceinstance.ts#L60)*

start the service

**Returns:** `void`

___
<a id="setupdb"></a>

### `<Private>` setupDb

▸ **setupDb**(): `void`

*Defined in [serviceinstance.ts:77](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/serviceinstance.ts#L77)*

setup the database connection

**Returns:** `void`

___
<a id="setuproutes"></a>

### `<Private>` setupRoutes

▸ **setupRoutes**(): `void`

*Defined in [serviceinstance.ts:119](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/serviceinstance.ts#L119)*

setup the service's API routes

**Returns:** `void`

___
<a id="stop"></a>

###  stop

▸ **stop**(): `void`

*Defined in [serviceinstance.ts:69](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/serviceinstance.ts#L69)*

stop the service instance

**Returns:** `void`

___
<a id="checkenvvars"></a>

### `<Static>``<Private>` checkEnvVars

▸ **checkEnvVars**(): `void`

*Defined in [serviceinstance.ts:23](https://github.com/Ochii/cso2-users-service/blob/87c816a/src/serviceinstance.ts#L23)*

check if the required environment variables are set on start throws an error if one is missing

**Returns:** `void`

___

