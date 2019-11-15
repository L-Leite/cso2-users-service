import express from 'express'

import { LogInstance } from 'log/loginstance'

import { User } from 'entities/user'
import { ISetSessionInfoBody, UserSession } from 'entities/usersession'

/**
 * handles requests to /users/session
 */
export class UsersSessionRoute {
  constructor(app: express.Express) {
    app.route('/users/session/all')
      .delete(this.onDeleteAllSessions)
    app.route('/users/session')
      .get(this.onGetSession)
      .post(this.onPostSession)
      .put(this.onPutSession)
      .delete(this.onDeleteSession)
  }

  /**
   * called when a DELETE request to /users/sessions/all is done
   * deletes all saved user sessions
   * returns 200 if logged out sucessfully
   * returns 404 if the session wasn't found
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onDeleteAllSessions(req: express.Request, res: express.Response): Promise<void> {
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
   * called when a GET request to /users/session is done
   * gets an user session by its owning user's ID
   * returns 200 if the session was found
   * returns 400 if the request is malformed
   * returns 404 if the session wasn't found
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onGetSession(req: express.Request, res: express.Response): Promise<void> {
    const userId: number = Number(req.body.userId)

    if (isNaN(userId)) {
      return res.status(400).end()
    }

    try {
      const session: UserSession = await UserSession.getByUserId(userId)

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
   * called when a POST request to /users/session is done
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
   * called when a PUT request to /users/session is done
   * updates an user's session data
   * returns 200 if the session was updated
   * returns 400 if the request is malformed
   * returns 404 if the session wasn't found
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onPutSession(req: express.Request, res: express.Response): Promise<void> {
    const reqSession: ISetSessionInfoBody = req.body

    if (isNaN(reqSession.userId)) {
      return res.status(400).end()
    }

    try {
      const wasUpdated: boolean = await UserSession.set(reqSession.userId, reqSession)

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
   * called when a DELETE request to /users/session is done
   * deletes an user's session
   * returns 200 if logged out sucessfully
   * returns 400 if the request is malformed
   * returns 404 if the session wasn't found
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onDeleteSession(req: express.Request, res: express.Response): Promise<void> {
    const userId: number = Number(req.body.userId)

    if (isNaN(userId)) {
      return res.status(400).end()
    }

    try {
      const wasDeleted: boolean = await UserSession.deleteByUserId(userId)
      if (wasDeleted) {
        return res.status(200).end()
      } else {
        LogInstance.warn(`Tried to delete user's ${userId} session but failed.`)
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }
}
