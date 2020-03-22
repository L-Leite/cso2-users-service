import express from 'express'
import { MongoError } from 'mongodb'

import { LogInstance } from 'log/loginstance'

import { Inventory } from 'entities/inventory/inventory'

/**
 * handles requests to /inventory/:userId
 */
export class InventoryRoute {
  constructor(app: express.Express) {
    app.route('/inventory/:userId')
      .get(this.onGetInventory)
      .post(this.onPostInventory)
      .delete(this.onDeleteInventory)
    app.route('/inventory/:userId/item')
      .put(this.onPutInventoryItem)
      .delete(this.onDeleteInventoryItem)
  }

  /**
   * called when a GET request to /inventory/:userId is done
   * returns an user's inventory items
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onGetInventory(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`GET request to /inventory/${reqUserId}`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const userInv: Inventory = await Inventory.get(reqUserId)

      if (userInv != null) {
        return res.status(200).json(userInv).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a POST request to /inventory/:userId is done
   * create an inventory for an user
   * returns 201 if created successfully
   * returns 400 if the request is malformed
   * returns 409 if the user already has an inventory
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onPostInventory(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`POST request to /inventory/${reqUserId}`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const newInventory: Inventory = await Inventory.create(reqUserId)
      return res.status(201).json(newInventory).end()
    } catch (error) {
      if (error instanceof MongoError) {
        // 11000 is the duplicate key error code
        if (error.code === 11000) {
          LogInstance.warn(`Tried to create inventory for an existing user (userId: ${reqUserId}`)
          return res.status(409).end()
        }
      }
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a DELETE request to /inventory/:userId is done
   * deletes an user's invetory, cosmetics, loadouts and buy menu
   * returns 200 if deleted successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onDeleteInventory(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`DELETE request to /inventory/${reqUserId}`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const wasDeleted: boolean = await Inventory.remove(reqUserId)
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

  /**
   * called when a PUT request to /inventory/:userId/item is done
   * adds an item to an user's inventory
   * returns 200 if added successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onPutInventoryItem(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)
    const reqItemId: number = req.body.itemId
    const reqItemAmmount: number = req.body.ammount

    LogInstance.debug(`PUT request to /inventory/${reqUserId}/item`)

    if (isNaN(reqUserId)
      || isNaN(reqItemId)
      || isNaN(reqItemAmmount)) {
      return res.status(400).end()
    }

    try {
      const wasAdded: boolean = await Inventory.addItem(reqItemId, reqItemAmmount, reqUserId)

      if (wasAdded === true) {
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
   * called when a DELETE request to /inventory/:userId/item is done
   * deletes an item from an user's invetory
   * returns 200 if deleted successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onDeleteInventoryItem(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)
    const reqItemId: number = req.body.itemId
    const reqItemAmmount: number = req.body.ammount

    LogInstance.debug(`DELETE request to /inventory/${reqUserId}/item`)

    if (isNaN(reqUserId)
      || reqItemId == null) {
      return res.status(400).end()
    }

    try {
      const wasDeleted: boolean = await Inventory.removeItem(reqItemId, reqUserId, reqItemAmmount)
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
