import express from 'express'
import { MongoError } from 'mongodb'

import { LogInstance } from 'log/loginstance'

import { InventoryLoadout } from 'entities/inventory/loadout'

/**
 * handles requests to /inventory/:userId/loadout
 */
export class InventoryLoadoutRoute {
  constructor(app: express.Express) {
    app.route('/inventory/:userId/loadout')
      .get(this.onGetInventoryLoadout)
      .post(this.onPostInventoryLoadout)
      .put(this.onPutInventoryLoadout)
      .delete(this.onDeleteInventoryLoadout)
  }

  /**
   * called when a GET request to /inventory/:userId/loadout is done
   * gets an user's loadout
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onGetInventoryLoadout(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)
    const reqLoadoutNum: number = Number(req.body.loadoutNum)

    LogInstance.debug(`GET request to /inventory/${reqUserId}/loadout`)

    if (isNaN(reqUserId) || isNaN(reqLoadoutNum)) {
      return res.status(400).end()
    }

    try {
      const loadout: InventoryLoadout = await InventoryLoadout.get(reqLoadoutNum, reqUserId)
      if (loadout != null) {
        return res.status(200).json(loadout).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a POST request to /inventory/:userId/loadout is done
   * create loadouts for an user
   * returns 201 if created successfully
   * returns 400 if the request is malformed
   * returns 409 if the user already has loadouts
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onPostInventoryLoadout(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`POST request to /inventory/${reqUserId}/loadout`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const newLoadouts: InventoryLoadout[] = await InventoryLoadout.create(reqUserId)
      return res.status(201).json(newLoadouts).end()
    } catch (error) {
      if (error instanceof MongoError) {
        // 11000 is the duplicate key error code
        if (error.code === 11000) {
          LogInstance.warn(`Tried to create loadouts for an existing user (userId: ${reqUserId}`)
          return res.status(409).end()
        }
      }
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a PUT request to /inventory/:userId/cosmetics is done
   * sets an user's equipped cosmetics
   * returns 200 if set successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onPutInventoryLoadout(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)
    const reqLoadout: InventoryLoadout = req.body

    LogInstance.debug(`PUT request to /inventory/${reqUserId}/loadout`)

    if (isNaN(reqUserId) || isNaN(reqLoadout.loadoutNum) == null) {
      return res.status(400).end()
    }

    try {
      const wasUpdated: boolean = await InventoryLoadout.set(req.body, reqUserId)
      if (wasUpdated === true) {
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
   * called when a DELETE request to /inventory/:userId/loadout is done
   * deletes an user's loadouts
   * returns 200 if deleted successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onDeleteInventoryLoadout(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`DELETE request to /inventory/${reqUserId}/loadout`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const wasDeleted: boolean = await InventoryLoadout.remove(reqUserId)
      if (wasDeleted === true) {
        return res.status(200).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }
}
