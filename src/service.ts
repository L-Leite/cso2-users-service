#!/usr/bin/env node

'use strict'

// add the src directory to the module search path
import 'app-module-path/register'

import { ServiceInstance } from 'serviceinstance'

/**
 * start a service instance
 */
async function startService() {
  const instance: ServiceInstance = new ServiceInstance()
  instance.listen()
}

startService()
