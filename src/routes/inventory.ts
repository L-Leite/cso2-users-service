import express from 'express'

import { LogInstance } from 'log/LogInstance'

interface InventoryItem {
  itemId: number,
  ammount: number
}

interface InventoryCosmetics {
  ctItem: number,
  terItem: number,
  headItem: number,
  gloveItem: number,
  backItem: number,
  stepsItem: number,
  cardItem: number,
  sprayItem: number,
}

interface InventoryLoadout {
  loadoutNum: number,
  primary: number,
  secondary: number,
  melee: number,
  hegrenade: number,
  flash: number,
  smoke: number,
}

interface InventorySubBuyMenu {
  index: number,
  weapons: number[],
}

interface InventoryBuyMenu {
  pistols: InventorySubBuyMenu,
  shotguns: InventorySubBuyMenu,
  smgs: InventorySubBuyMenu,
  rifles: InventorySubBuyMenu,
  snipers: InventorySubBuyMenu,
  machineguns: InventorySubBuyMenu,
  melees: InventorySubBuyMenu,
  equipment: InventorySubBuyMenu,
}

/**
 * handles requests to /users/:userId/inventory
 */
export class InventoryRoute {
  constructor(app: express.Express) {
    app.route('/users/:userId/inventory')
      .get(this.onGetInventory)
      .post(this.onPostInventory)
      .delete(this.onDeleteInventory)
    app.route('/users/:userId/inventory/cosmetics')
      .get(this.onGetInventoryCosmetics)
      .post(this.onPostInventoryCosmetics)
    app.route('/users/:userId/inventory/loadout')
      .get(this.onGetInventoryLoadout)
      .post(this.onPostInventoryLoadout)
    app.route('/users/:userId/inventory/buymenu')
      .get(this.onGetInventoryBuyMenu)
      .post(this.onPostInventoryBuyMenu)
  }

  /**
   * called when a GET request to /users/:userId/inventory is done
   * returns an user's inventory items
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private onGetInventory(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.info(`GET request to /users/${reqUserId}/inventory from ${req.ip}`)

    // return bad request if the userid is invalid
    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    /*if (cant find user) {
      return res.status(404).end()
    }*/

    const sampleResponse: InventoryItem[] = [
      {
        itemId: 100,
        ammount: 3,
      },
      {
        itemId: 200,
        ammount: 1,
      },
    ]

    // return OK
    res.status(200).json(sampleResponse)
  }

  /**
   * called when a POST request to /users/:userId/inventory is done
   * adds an item to an user's inventory
   * returns 200 if added successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private onPostInventory(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const reqUserId: number = Number(req.params.userId)
    const reqItem: InventoryItem = req.body

    LogInstance.info(`POST request to /users/${reqUserId}/inventory from ${req.ip}`)

    // return bad request if the userid or the body are invalid
    if (isNaN(reqUserId)
      || reqItem.ammount == null) {
      return res.status(400).end()
    }

    /*if (cant find user) {
      return res.status(404).end()
    }*/

    // return OK
    res.status(200).end()
  }

  /**
   * called when a DELETE request to /users/:userId/inventory is done
   * deletes an item in an user's invetory
   * returns 200 if deleted successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private onDeleteInventory(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const reqUserId: number = Number(req.params.userId)
    const reqItem: InventoryItem = req.body

    LogInstance.info(`DELETE request to /users/${reqUserId}/inventory from ${req.ip}`)

    // return bad request if the userid or the body are invalid
    if (isNaN(reqUserId)
      || reqItem.itemId == null
      || reqItem.ammount == null) {
      return res.status(400).end()
    }

    /*if (cant find user) {
      return res.status(404).end()
    }*/

    // return OK
    res.status(200).end()
  }

  /**
   * called when a GET request to /users/:userId/inventory/cosmetics is done
   * gets the currently equipped user's cosmetics
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private onGetInventoryCosmetics(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.info(`GET request to /users/${reqUserId}/inventory/cosmetics from ${req.ip}`)

    // return bad request if the userid or the body are invalid
    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    /*if (cant find user) {
      return res.status(404).end()
    }*/

    const sampleResponse: InventoryCosmetics = {
      ctItem: 1033,
      terItem: 1034,
      headItem: 10062,
      gloveItem: 30018,
      backItem: 20042,
      stepsItem: 40016,
      cardItem: 60001,
      sprayItem: 42003,
    }

    // return OK
    res.status(200).json(sampleResponse)
  }

  /**
   * called when a POST request to /users/:userId/inventory/cosmetics is done
   * sets an user's equipped cosmetics
   * returns 200 if set successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private onPostInventoryCosmetics(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const reqUserId: number = Number(req.params.userId)
    const reqCosmetics: InventoryCosmetics = req.body

    LogInstance.info(`POST request to /users/${reqUserId}/inventory/cosmetics from ${req.ip}`)

    // return bad request if the userid or the body are invalid
    if (isNaN(reqUserId)
      || reqCosmetics == null) {
      return res.status(400).end()
    }

    /*if (cant find user) {
      return res.status(404).end()
    }*/

    // return OK
    res.status(200).end()
  }

  /**
   * called when a GET request to /users/:userId/inventory/loadout is done
   * gets an user's loadout
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private onGetInventoryLoadout(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const reqUserId: number = Number(req.params.userId)
    const reqLoadoutNum: number = Number(req.body.loadoutNum)

    LogInstance.info(`GET request to /users/${reqUserId}/inventory/loadout from ${req.ip}`)

    // return bad request if the userid or the body are invalid
    if (isNaN(reqUserId) || isNaN(reqLoadoutNum)) {
      return res.status(400).end()
    }

    /*if (cant find user) {
      return res.status(404).end()
    }*/

    const sampleResponse: InventoryLoadout = {
      loadoutNum: reqLoadoutNum,
      primary: 5218,
      secondary: 5288,
      melee: 84,
      hegrenade: 4,
      flash: 23,
      smoke: 8,
    }

    // return OK
    res.status(200).json(sampleResponse)
  }

  /**
   * called when a POST request to /users/:userId/inventory/cosmetics is done
   * sets an user's equipped cosmetics
   * returns 200 if set successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private onPostInventoryLoadout(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const reqUserId: number = Number(req.params.userId)
    const reqLoadout: InventoryLoadout = req.body

    LogInstance.info(`POST request to /users/${reqUserId}/inventory/loadout from ${req.ip}`)

    // return bad request if the userid or the body are invalid
    if (isNaN(reqUserId)
      || reqLoadout == null) {
      return res.status(400).end()
    }

    /*if (cant find user) {
      return res.status(404).end()
    }*/

    // return OK
    res.status(200).end()
  }

  /**
   * called when a GET request to /users/:userId/inventory/buymenu is done
   * gets an user's buy menu
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private onGetInventoryBuyMenu(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.info(`GET request to /users/${reqUserId}/inventory/buymenu from ${req.ip}`)

    // return bad request if the userid is invalid
    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    /*if (cant find user) {
      return res.status(404).end()
    }*/

    const sampleResponse: InventoryBuyMenu = {
      pistols: {
        index: 0,
        weapons: [
          5271,
          5245,
          5358,
          5288,
          106,
          5119,
          5121,
          5360,
          5294,
        ],
      },
      shotguns: {
        index: 1,
        weapons: [
          5130,
          5181,
          5157,
          5282,
          5286,
          5343,
          5264,
          5265,
          5230,
        ],
      },
      smgs: {
        index: 2,
        weapons: [
          5251,
          5295,
          162,
          5132,
          5346,
          5320,
          5287,
          5321,
          5310,
        ],
      },
      rifles: {
        index: 3,
        weapons: [
          5136,
          5142,
          45,
          46,
          5218,
          5240,
          5259,
          5309,
          5370,
        ],
      },
      snipers: {
        index: 4,
        weapons: [
          5133,
          5118,
          5216,
          86,
          5338,
          5241,
          5225,
          5369,
          5244,
        ],
      },
      machineguns: {
        index: 5,
        weapons: [
          5125,
          5289,
          5226,
          5332,
          5352,
          5363,
          5311,
          5260,
          5234,
        ],
      },
      melees: {
        index: 6,
        weapons: [
          5353,
          5362,
          5330,
          5303,
          5304,
          5305,
          5365,
          5231,
          5232,
        ],
      },
      equipment: {
        index: 7,
        weapons: [
          36,
          37,
          23,
          4,
          7,
          34,
        ],
      },
    }

    // return OK
    res.status(200).json(sampleResponse)
  }

  /**
   * called when a POST request to /users/:userId/inventory/buymenu is done
   * sets an user's sub buy menu
   * returns 200 if set successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private onPostInventoryBuyMenu(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const reqUserId: number = Number(req.params.userId)
    const reqLoadout: InventorySubBuyMenu = req.body

    LogInstance.info(`POST request to /users/${reqUserId}/inventory/loadout from ${req.ip}`)

    // return bad request if the userid or the body are invalid
    if (isNaN(reqUserId)
      || reqLoadout == null) {
      return res.status(400).end()
    }

    /*if (cant find user) {
      return res.status(404).end()
    }*/

    // return OK
    res.status(200).end()
  }
}
