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

### Methods

* [applyConfigs](_serviceinstance_.serviceinstance.md#applyconfigs)
* [isDevEnv](_serviceinstance_.serviceinstance.md#isdevenv)
* [listen](_serviceinstance_.serviceinstance.md#listen)
* [setupRoutes](_serviceinstance_.serviceinstance.md#setuproutes)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ServiceInstance**(): [ServiceInstance](_serviceinstance_.serviceinstance.md)

*Defined in serviceinstance.ts:16*

**Returns:** [ServiceInstance](_serviceinstance_.serviceinstance.md)

___

## Properties

<a id="app"></a>

###  app

**● app**: *`express.Express`*

*Defined in serviceinstance.ts:16*

___

## Methods

<a id="applyconfigs"></a>

### `<Private>` applyConfigs

▸ **applyConfigs**(): `void`

*Defined in serviceinstance.ts:38*

apply configurations to the service

**Returns:** `void`

___
<a id="isdevenv"></a>

### `<Private>` isDevEnv

▸ **isDevEnv**(): `boolean`

*Defined in serviceinstance.ts:67*

are we in a development environment?

**Returns:** `boolean`
true if so, false if not

___
<a id="listen"></a>

###  listen

▸ **listen**(): `void`

*Defined in serviceinstance.ts:30*

start the service

**Returns:** `void`

___
<a id="setuproutes"></a>

### `<Private>` setupRoutes

▸ **setupRoutes**(): `void`

*Defined in serviceinstance.ts:58*

setup the service's API routes

**Returns:** `void`

___

