import express from 'express'
import { MongoError } from 'mongodb'

import { LogInstance } from 'log/loginstance'

import { InventoryCosmetics, ISetCosmeticsBody } from 'entities/inventory/cosmetics'

/**
 * handles requests to /inventory/:userId/cosmetics
 */
export class InventoryCosmeticsRoute {
  constructor(app: express.Express) {
    app.route('/inventory/:userId/cosmetics')
      .get(this.onGetInventoryCosmetics)
      .post(this.onPostInventoryCosmetics)
      .put(this.onPutInventoryCosmetics)
      .delete(this.onDeleteInventoryCosmetics)
  }

  /**
   * called when a GET request to /inventory/:userId/cosmetics is done
   * gets the currently equipped user's cosmetics
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onGetInventoryCosmetics(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`GET request to /inventory/${reqUserId}/cosmetics`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const cosmetics: InventoryCosmetics = await InventoryCosmetics.get(reqUserId)
      if (cosmetics != null) {
        return res.status(200).json(cosmetics).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a POST request to /inventory/:userId/cosmetics is done
   * create cosmetic slots for an user
   * returns 201 if created successfully
   * returns 400 if the request is malformed
   * returns 409 if the user already has cosmetic slots
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onPostInventoryCosmetics(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`POST request to /inventory/${reqUserId}/cosmetics`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const newCosmetics: InventoryCosmetics = await InventoryCosmetics.create(reqUserId)
      return res.status(201).json(newCosmetics).end()
    } catch (error) {
      if (error instanceof MongoError) {
        // 11000 is the duplicate key error code
        if (error.code === 11000) {
          LogInstance.warn(`Tried to create cosmetic slots for an existing user (userId: ${reqUserId}`)
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
  private async onPutInventoryCosmetics(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)
    const reqCosmetics: ISetCosmeticsBody = req.body

    LogInstance.debug(`PUT request to /inventory/${reqUserId}/cosmetics`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const wasUpdated: boolean = await InventoryCosmetics.set(reqCosmetics, reqUserId)
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
   * called when a DELETE request to /inventory/:userId/cosmetics is done
   * deletes an user's cosmetics slots
   * returns 200 if deleted successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onDeleteInventoryCosmetics(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`DELETE request to /inventory/${reqUserId}/cosmetics`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const wasDeleted: boolean = await InventoryCosmetics.remove(reqUserId)
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
