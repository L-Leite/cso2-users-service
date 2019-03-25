import bodyParser from 'body-parser'
import express from 'express'
import helmet from 'helmet'
import http from 'http'
import morgan from 'morgan'

import { LogInstance } from 'log/loginstance'
import { MorganToWinstonStream } from 'log/morgan2winston'

import { InventoryRoute } from 'routes/inventory'
import { UsersRoute } from 'routes/users'

/**
 * the service's entrypoint
 */
export class ServiceInstance {
  public app: express.Express
  private server: http.Server

  constructor() {
    this.app = express()

    this.applyConfigs()
    this.setupRoutes()

    this.app.set('port', process.env.PORT)
  }

  /**
   * start the service
   */
  public listen(): void {
    this.server = this.app.listen(this.app.get('port'))
    LogInstance.info('Started user service')
  }

  public stop(): void {
    this.server.close()
  }

  /**
   * apply configurations to the service
   */
  private applyConfigs(): void {
    // set the log format according to the current environment
    const morganLogFormat: string = this.isDevEnv() ? 'dev' : 'common'

    // use morgan as middleware, and pass the logs to winston
    this.app.use(
      morgan(morganLogFormat, { stream: new MorganToWinstonStream() }),
    )

    // parse json
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))

    // setup helmet
    this.app.use(helmet({ frameguard: false }))
  }

  /**
   * setup the service's API routes
   */
  private setupRoutes(): void {
    const users: UsersRoute = new UsersRoute(this.app)
    const inventory: InventoryRoute = new InventoryRoute(this.app)
  }

  /**
   * are we in a development environment?
   * @returns true if so, false if not
   */
  private isDevEnv(): boolean {
    return process.env.NODE_ENV === 'development'
  }
}
