import express from 'express'

import { SessionCounter } from 'entities/sessioncounter'

/**
 * handles requests to /ping
 */
export class PingRoute {
  constructor(app: express.Express) {
    app.route('/ping')
      .get(this.onGetPing)
  }

  /**
   * called when a GET request to /ping is done
   * tells the requester that we are alive
   * returns 200
   * @param req the request data
   * @param res the response data
   */
  private onGetPing(req: express.Request, res: express.Response): void {
    const pingReply = {
      sessions: SessionCounter.Get(),
      uptime: process.uptime(),
    }

    return res.status(200).json(pingReply).end()
  }
}
