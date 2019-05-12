import express from 'express'

import { buildPasswordHash } from 'hash'
import { LogInstance } from 'log/loginstance'

import { ISetUserRequest as ISetUserBody, User } from 'entities/user'
import { ISetSessionInfoBody, UserSession } from 'entities/usersession'

/**
 * handles requests to /users
 */
export class UsersRoute {
  constructor(app: express.Express) {
    app.route('/users')
      .get(this.onGetUsers)
      .post(this.onPostUsers)
    app.route('/users/session/all')
      .delete(this.onDeleteAllSessions)
    app.route('/users/session')
      .get(this.onGetSession)
      .post(this.onPostSession)
      .put(this.onPutSession)
      .delete(this.onDeleteSession)
    app.route('/users/:userId')
      .get(this.onGetUsersById)
      .put(this.onPutUsersById)
      .delete(this.onDeleteUserById)
    app.route('/users/byname/:username')
      .get(this.onGetUsersByName)
    app.route('/ping')
      .get(this.onGetPing)
  }

  /**
   * called when a GET request to /users is done
   * returns every users' id and name
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onGetUsers(req: express.Request, res: express.Response): Promise<void> {
    LogInstance.info('GET request to /users')

    try {
      const users: User[] = await User.getAllUsers()

      // return OK
      return res.status(200).json(users).end()
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
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
   * called when a POST request to /users is done
   * creates a new user
   * returns 201 if the user was created
   * returns 400 if the request is malformed
   * returns 409 if the user already exists
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onPostUsers(req: express.Request, res: express.Response): Promise<void> {
    LogInstance.info('POST request to /users')

    const userName: string = req.body.username
    const playerName: string = req.body.playername
    const password: string = req.body.password

    if (userName == null
      || playerName == null
      || password == null) {
      return res.status(400).end()
    }

    try {
      const hashedPassword: string = await buildPasswordHash(password)
      const newUser: User = await User.createUser(userName, playerName, hashedPassword)
      return res.status(201).json({ userId: newUser.userId }).end()
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
   * called when a GET request to /users/:userId is done
   * returns an user's information
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 404 if the user cannot be found
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onGetUsersById(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.info(`GET request to /users/${reqUserId}`)

    // return bad request if the userId isn't a number
    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const user: User = await User.getUserById(reqUserId)

      // if the user isn't found
      if (user == null) {
        return res.status(404).end()
      }

      // return OK
      return res.status(200).json(user).end()
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a PUT request to /users/:userId is done
   * updates an user's data
   * returns 200 if the data was updated successfully
   * returns 400 if the request is malformed
   * returns 404 if the user wasn't found
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onPutUsersById(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.info(`PUT request to /users/${reqUserId}`)

    const reqUser: ISetUserBody = req.body

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const wasUpdated: boolean = await User.set(reqUserId, reqUser)

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
   * called when a DELETE request to /users/:userId is done
   * deletes an user by its userId
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 404 if the user cannot be found
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onDeleteUserById(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.info(`DELETE request to /users/${reqUserId}`)

    // return bad request if the userId isn't a number
    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const deleted: boolean = await User.removeUserById(reqUserId)

      if (deleted === true) {
        // return OK
        return res.status(200).end()
      } else {
        // if the user isn't found
        return res.status(404).end()
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
    LogInstance.info('GET request to /users/session')

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
    LogInstance.info('POST request to /users/session')

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
    LogInstance.info('PUT request to /users/session')

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
    LogInstance.info('PUT request to /users/session')

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

  /**
   * called when a GET request to /users/byname/:username is done
   * returns an user's information by their username
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 404 if the user cannot be found
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onGetUsersByName(req: express.Request, res: express.Response): Promise<void> {
    const reqUsername: string = req.params.username

    LogInstance.info(`GET request to /users/byname/${reqUsername}`)

    // return bad request if the userId isn't a number
    if (reqUsername == null) {
      return res.status(400).end()
    }

    try {
      const user: User = await User.getUserByName(reqUsername)

      // if the user isn't found
      if (user == null) {
        return res.status(404).end()
      }

      // return OK
      return res.status(200).json(user).end()
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a GET request to /ping is done
   * tells the requester that we are alive
   * returns 200
   * @param req the request data
   * @param res the response data
   */
  private async onGetPing(req: express.Request, res: express.Response): Promise<void> {
    const pingReply = {
      sessions: await UserSession.count(),
      uptime: process.uptime(),
    }

    return res.status(200).json(pingReply).end()
  }
}
