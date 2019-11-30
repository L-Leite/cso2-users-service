import express from 'express'

import { LogInstance } from 'log/loginstance'

import { User } from 'entities/user'
import { UserSession } from 'entities/usersession'

/**
 * handles requests to /sessions
 */
export class SessionsRoute {
  constructor(app: express.Express) {
    app.route('/sessions')
      .get(this.onGetAllSessions)
      .post(this.onPostSession)
      .delete(this.onDeleteSessions)
    app.route('/sessions/:ownerId')
      .get(this.onGetSessionById)
      .put(this.onPutSessionById)
      .delete(this.onDeleteSessionById)
  }

  /**
   * called when a GET request to /sessions is done
   * returns all sessions by page
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 413 if the requested page is too large
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onGetAllSessions(req: express.Request, res: express.Response): Promise<void> {
    const colOffset: number = Number(req.query.offset)
    const colLength: number = Number(req.query.length)

    if (isNaN(colOffset) === true
      || isNaN(colLength) === true) {
      return res.status(400).end()
    }

    const MAX_COLUMN_LENGTH: number = 100

    if (colLength > MAX_COLUMN_LENGTH) {
      return res.status(413).end()
    }

    try {
      const sessions: UserSession[] = await UserSession.getAll(colOffset, colLength)
      return res.status(200).json(sessions).end()
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a POST request to /sessions is done
   * creates a new user session with the user's credentials
   * returns status 201 and the session if the session was created
   * returns 400 if the request is malformed
   * returns 401 if the credentials are invalid
   * returns 409 if a session already exists
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onPostSession(req: express.Request, res: express.Response): Promise<void> {
    const userName: string = req.body.username
    const password: string = req.body.password

    if (userName == null
      || password == null) {
      return res.status(400).end()
    }

    try {
      const loggedUserId: number = await User.validateCredentials(userName, password)

      if (loggedUserId !== 0) {
        // logged in successfully
        const session: UserSession = await UserSession.create(loggedUserId)
        return res.status(201).json(session).end()
      } else {
        return res.status(401).end()
      }
    } catch (error) {
      if (error === 409) {
        res.status(409).end()
      } else {
        LogInstance.error(error)
        return res.status(500).end()
      }
    }
  }

  /**
   * called when a DELETE request to /sessions is done
   * deletes all saved user sessions
   * returns 200 if logged out sucessfully
   * returns 404 if the session wasn't found
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onDeleteSessions(req: express.Request, res: express.Response): Promise<void> {
    try {
      const wasDeleted: boolean = await UserSession.deleteAll()
      if (wasDeleted) {
        return res.status(200).end()
      } else {
        return res.status(500).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a GET request to /sessions/:ownerId is done
   * gets an user session by its owning user's ID
   * returns 200 if the session was found
   * returns 400 if the request is malformed
   * returns 404 if the session wasn't found
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onGetSessionById(req: express.Request, res: express.Response): Promise<void> {
    const ownerId: number = Number(req.params.ownerId)

    if (isNaN(ownerId)) {
      return res.status(400).end()
    }

    try {
      const session: UserSession = await UserSession.getByUserId(ownerId)

      if (session !== null) {
        return res.status(200).json(session).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a PUT request to /sessions/:ownerId is done
   * updates an user's session data
   * returns 200 if the session was updated
   * returns 400 if the request is malformed
   * returns 404 if the session wasn't found
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onPutSessionById(req: express.Request, res: express.Response): Promise<void> {
    const ownerId: number = Number(req.params.ownerId)

    if (isNaN(ownerId) === true
      || req.body == null) {
      return res.status(400).end()
    }

    try {
      const wasUpdated: boolean = await UserSession.set(ownerId, req.body)

      if (wasUpdated) {
        return res.status(200).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a DELETE request to /sessions/:ownerId is done
   * deletes an user's session
   * returns 200 if logged out sucessfully
   * returns 400 if the request is malformed
   * returns 404 if the session wasn't found
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onDeleteSessionById(req: express.Request, res: express.Response): Promise<void> {
    const ownerId: number = Number(req.params.ownerId)

    if (isNaN(ownerId) === true) {
      return res.status(400).end()
    }

    try {
      const wasDeleted: boolean = await UserSession.deleteByUserId(ownerId)
      if (wasDeleted) {
        return res.status(200).end()
      } else {
        LogInstance.warn(`Tried to delete user's ${ownerId} session but failed.`)
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }
}
