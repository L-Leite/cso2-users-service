import * as typegoose from '@typegoose/typegoose'

import { DefaultInventory } from 'entities/inventory/defaultinventory'
import { InventoryItem } from 'entities/inventory/item'

/**
 * represents an user's inventory
 */
export class Inventory {
    /**
     * get an user's inventory items
     * @param userId the owning user's ID
     * @returns a promise to the user's inventory items
     */
    public static async get(userId: number): Promise<Inventory> {
        return await InventoryModel.findOne({ ownerId: userId })
            .exec()
    }

    /**
     * create an user's inventory
     * @param userId the owner's user ID
     * @returns a promise to the user's inventory items
     */
    public static async create(userId: number): Promise<Inventory> {
        const defaultItems: DefaultInventory = DefaultInventory.get()
        const newInventory = new InventoryModel({ ownerId: userId, items: defaultItems.items })
        return await newInventory.save()
    }

    /**
     * delete an inventory by its owner user ID
     * @param userId the owner's user ID
     * @returns a promise returning true if deleted successfully, or false if not
     */
    public static async remove(userId: number): Promise<boolean> {
        const res = await InventoryModel.deleteOne({ ownerId: userId })
            .exec()
        // return true if deleted only one document (val.n) with success (val.ok)
        return res.ok === 1 && res.n === 1
    }

    /**
     * add an item to an user's inventory
     * @param itemId the item's ID
     * @param itemAmmount the ammount of items
     * @param userId the owning user's ID
     * @returns a promise that returns true if the item was added sucessfully,
     *          false if it wasn't (the user doesn't exist)
     */
    public static async addItem(itemId: number, itemAmmount: number,
        userId: number): Promise<boolean> {
        const newItem = new InventoryItem(itemId, itemAmmount)
        const res =
            await InventoryModel.updateOne(
                { ownerId: userId }, { $push: { items: newItem } })
                .exec()
        return res.ok === 1 && res.n === 1
    }

    /**
     * remove an item from an user's inventory
     * if itemAmmount IS provided, it will decrement the item's ammount by that value
     * -- if the resulting ammount is zero or less than zero, the item will be deleted
     * if itemAmmount is NOT provided, the item will be completely removed from the inventory
     * @param itemId the ID of the item to delete
     * @param userId the owning user's ID
     * @param itemAmmount the ammount of items to delete (default: null)
     * @returns a promise that returns true if anything was altered, false if not
     */
    public static async removeItem(itemId: number, userId: number,
        itemAmmount?: number): Promise<boolean> {
        if (itemAmmount) {
            const inv: Inventory = await Inventory.get(userId)

            const targetItem: InventoryItem = inv.items.find((item: InventoryItem) => {
                return item.itemId === itemId
            })

            const newAmmount: number = targetItem.ammount - itemAmmount

            if (newAmmount > 0) {
                // just decrement the ammount if we have enough item quantity
                return await Inventory.updateItemQuantity(itemId, newAmmount, userId)
            } else {
                // delete the item if the ammount is zero or less
                return await Inventory.removeItemInternal(itemId, userId)
            }
        } else {
            // just delete the item if no ammount is provided
            return await Inventory.removeItemInternal(itemId, userId)
        }
    }

    /**
     * remove an item from an user's inventory
     * @param itemId the ID of the item to delete
     * @param ownerId the owning user's ID
     * @returns a promise that returns true if deleted successfully, false if not
     */
    private static async removeItemInternal(itemId: number, ownerId: number): Promise<boolean> {
        const res = await InventoryModel.updateOne({ ownerId }, { $pull: { items: itemId } })
            .exec()
        return res.ok === 1 && res.n === 1
    }

    /**
     * update an item's quantity in an user's inventory
     * @param itemId the ID of the item to delete
     * @param newAmmount the new item's quantity
     * @param ownerId the owning user's ID
     * @returns a promise that returns true if updated successfully, false if not
     */
    private static async updateItemQuantity(itemId: number, newAmmount: number,
        ownerId: number): Promise<boolean> {
        const res = await InventoryModel.updateOne(
            { ownerId, 'items.itemId': itemId },
            { $set: { 'items.$.ammount': newAmmount } })
            .exec()
        return res.ok === 1 && res.n === 1
    }

    @typegoose.prop({ index: true, required: true, unique: true })
    public ownerId: number
    @typegoose.prop({ required: true })
    public items?: InventoryItem[]
}

const InventoryModel = typegoose.getModelForClass(Inventory)
