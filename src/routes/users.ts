import express from 'express'

import { LogInstance } from 'log/loginstance'

/**
 * handles requests to /users
 */
export class UsersRoute {

  constructor(app: express.Express) {
    app.route('/users')
      .get(this.onGetUsers)
    app.route('/users/:userId')
      .get(this.onGetUsersUserId)
    app.route('/users/signup')
      .post(this.onPostSignup)
    app.route('/users/login')
      .put(this.onPutLogin)
    app.route('/users/logout')
      .put(this.onPutLogout)
  }

  /**
   * called when a GET request to /users is done
   * returns every users' id and name
   * returns 200 if successful
   * returns 400 if the request is malformed
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private onGetUsers(req: express.Request, res: express.Response, next: express.NextFunction): void {
    LogInstance.info(`GET request to /users`)

    // return bad request if there are parameters in the request
    // TODO: is this needed?
    if (Object.keys(req.query).length !== 0) {
      return res.status(400).end()
    }

    const sampleResponse = [
      {
        userId: 123,
        username: 'gamer',
        playername: 'VeryGoodGamer',
      },
      {
        userId: 456,
        username: 'ilovecso2',
        playername: 'ReallyLikeCSO2',
      },
    ]

    // return OK
    res.status(200).json(sampleResponse)
  }

  /**
   * called when a GET request to /users/:userId is done
   * returns an user's information
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 404 if the user cannot be found
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private onGetUsersUserId(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.info(`GET request to /users/${reqUserId}`)

    // return bad request if the userId isn't a number
    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    /*if (cant find user) {
      return res.status(404).end()
    }*/

    const sampleResponse = {
      userId: reqUserId,
      username: 'gamer',
      playername: 'VeryGoodGamer',
      level: 25,
      currentXp: 32100,
      maxXp: 45000,
      wins: 230,
      losses: 215,
      kills: 1521,
      deaths: 1324,
      assists: 540,
    }

    // return OK
    res.status(200).json(sampleResponse)
  }

  /**
   * called when a POST request to /users/signup is done
   * creates a new user according to the sender's parameters
   * returns 201 if the user was created
   * returns 400 if the request is malformed
   * returns 409 if the user already exists
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private onPostSignup(req: express.Request, res: express.Response, next: express.NextFunction): void {
    LogInstance.info(`POST request to /users/signup`)

    const userName: string = req.body.username
    const playerName: string = req.body.playername
    const password: string = req.body.password

    // return bad request if the required body params arent present
    if (userName == null
      || playerName == null
      || password == null) {
      return res.status(400).end()
    }

    /*if (user already exists) {
      return res.status(409).end()
    }*/

    const sampleResponse = {
      userId: 654321,
    }

    // return created
    res.status(201).json(sampleResponse)
  }

  /**
   * called when a PUT request to /users/login is done
   * logs in an user with the credentials the sender provided
   * returns 200 if the login was sucessfull
   * returns 400 if the request is malformed
   * returns 401 if the credentials are invalid
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private onPutLogin(req: express.Request, res: express.Response, next: express.NextFunction): void {
    LogInstance.info(`PUT request to /users/login`)

    const userName: string = req.body.username
    const password: string = req.body.password

    // return bad request if the required body params arent present
    if (userName == null
      || password == null) {
      return res.status(400).end()
    }

    /*if (wrong credentials) {
      return res.status(401).end()
    }*/

    const sampleResponse = {
      userId: 123,
      username: userName,
      playername: 'VeryGoodGamer',
    }

    // return OK
    res.status(200).json(sampleResponse)
  }

  /**
   * called when a PUT request to /users/logout is done
   * logs in an user with the credentials the sender provided
   * returns 200 if logged out sucessfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private onPutLogout(req: express.Request, res: express.Response, next: express.NextFunction): void {
    LogInstance.info(`PUT request to /users/login`)

    const userId: number = Number(req.body.userId)

    // return bad request if the required body params arent present
    if (isNaN(userId) === true) {
      return res.status(400).end()
    }

    // return OK
    res.status(200).end()
  }
}
