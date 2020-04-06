import express from 'express'

import { LogInstance } from 'log/loginstance'

import { User } from 'entities/user'
import { SessionCounter } from 'entities/sessioncounter'

/**
 * handles requests to /users
 */
export class UsersRoute {
  constructor(app: express.Express) {
    app.route('/users')
      .get(this.onGetAllUsers)
      .post(this.onPostUsers)
    app.route('/users/:userId')
      .get(this.onGetUsersById)
      .put(this.onPutUsersById)
      .delete(this.onDeleteUserById)
    app.route('/auth/login')
      .post(this.onPostLogin)
    app.route('/auth/logout')
      .post(this.onPostLogout)
    app.route('/users/byname/:username')
      .get(this.onGetUsersByName)
  }

  /**
   * called when a GET request to /users is done
   * returns every user by page
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 413 if the requested page is too large
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onGetAllUsers(req: express.Request, res: express.Response): Promise<void> {
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
      const users: User[] = await User.getAllUsers(colOffset, colLength)

      // return OK
      return res.status(200).json(users).end()
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a POST request to /users is done
   * creates a new user
   * returns 201 if the user was created with the new user data
   * returns 400 if the request is malformed
   * returns 409 if the user already exists
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onPostUsers(req: express.Request, res: express.Response): Promise<void> {
    const userName: string = req.body.username
    const playerName: string = req.body.playername
    const password: string = req.body.password

    if (userName == null
      || playerName == null
      || password == null) {
      return res.status(400).end()
    }

    try {
      const userExists: boolean = await User.isTaken(userName, playerName)

      if (userExists === true) {
        LogInstance.warn('Tried to create an existing user ' + userName + ' (' + playerName + ')')
        return res.status(409).end()
      }

      const newUser: User = await User.createUser(userName, playerName, password)

      return res.status(201).json(newUser).end()
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
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

    if (isNaN(reqUserId)
      || req.body == null) {
      return res.status(400).end()
    }

    try {
      const wasUpdated: boolean = await User.set(reqUserId, req.body)

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
   * called when a POST request to /auth/login is done
   * checks if the user credentials are valid
   * returns 200 if the credentials are valid
   * returns 400 if the request is malformed
   * returns 401 if the credentials are invalid
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private async onPostLogin(req: express.Request, res: express.Response): Promise<void> {
    const userName: string = req.body.username
    const password: string = req.body.password

    if (userName == null
      || password == null) {
      return res.status(400).end()
    }

    try {
      const loggedUserId: number = await User.validateCredentials(userName, password)

      if (loggedUserId != null) {
        SessionCounter.Increment()
        return res.status(200).json({ userId: loggedUserId }).end()
      } else {
        return res.status(401).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a POST request to /auth/logout is done
   * logs an user out
   * returns 200 if the user was logged out
   * returns 400 if the request is malformed
   * returns 404 if the use does not exist
   * returns 500 if an internal error occured
   * @param req the request data
   * @param res the response data
   */
  private onPostLogout(req: express.Request, res: express.Response): void {
    const userId: string = req.body.userId

    if (userId == null) {
      return res.status(400).end()
    }

    try {
      // TODO: do anything with this maybe?
      SessionCounter.Decrement()
      return res.status(200).json().end()
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
}
