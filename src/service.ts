#!/usr/bin/env node

'use strict'

// add the src directory to the module search path
import 'app-module-path/register'

import { ServiceInstance } from 'serviceinstance'

let instance: ServiceInstance = null

/**
 * start a service instance
 */
async function startService() {
  instance = new ServiceInstance()
  await instance.listen()
}

startService()

process.on('SIGINT', () => {
  instance.stop()
}).on('SIGTERM', () => {
  instance.stop()
})
