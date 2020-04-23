import * as typegoose from '@typegoose/typegoose'

import { DefaultInventory } from 'entities/inventory/defaultinventory'

export interface ISetBuyMenuBody {
    pistols: number[],
    shotguns: number[],
    smgs: number[],
    rifles: number[],
    snipers: number[],
    machineguns: number[],
    melees: number[],
    equipment: number[],
}

/**
 * an user's ingame buy menu
 */
export class InventoryBuyMenu {
    /**
     * get an user's buy menu
     * @param userId the owning user's ID
     * @returns a promise to the user's buy menu
     */
    public static async get(loadoutNum: number, userId: number): Promise<InventoryBuyMenu> {
        return await InventoryBuyMenuModel.findOne({ ownerId: userId })
            .exec()
    }

    /**
     * create a buy menu for an user
     * @param userId the owner's user ID
     * @returns a promise to the user's new buy menu
     */
    public static async create(userId: number): Promise<InventoryBuyMenu> {
        const defaultItems: DefaultInventory = DefaultInventory.get()
        const newBuyMenu = new InventoryBuyMenuModel({
            ownerId: userId,
            pistols: defaultItems.pistols,
            shotguns: defaultItems.shotguns,
            smgs: defaultItems.smgs,
            rifles: defaultItems.rifles,
            snipers: defaultItems.snipers,
            machineguns: defaultItems.machineguns,
            melees: defaultItems.melees,
            equipment: defaultItems.equipment,
        })
        return await newBuyMenu.save()
    }

    /**
     * set an user's buy menu
     * @param updatedBuyMenu the updated buy menu
     * @param userId the owning user's ID
     * @returns a promise that returns true if the buy menu was updated sucessfully,
     *          false if it wasn't (the user doesn't exist)
     */
    public static async set(updatedBuyMenu: ISetBuyMenuBody,
        userId: number): Promise<boolean> {
        const res =
            await InventoryBuyMenuModel.updateOne(
                { ownerId: userId },
                { $set: updatedBuyMenu })
                .exec()
        return res.ok === 1 && res.n === 1
    }

    /**
     * delete a buy menu by its owner user ID
     * @param userId the owner's user ID
     * @returns a promise returning true if deleted successfully, or false if not
     */
    public static async remove(userId: number): Promise<boolean> {
        const res = await InventoryBuyMenuModel.deleteOne({ ownerId: userId })
            .exec()
        return res.ok === 1 && res.n === 1
    }

    @typegoose.prop({ index: true, required: true, unique: true })
    public ownerId: number
    @typegoose.prop()
    public pistols: number[]
    @typegoose.prop()
    public shotguns: number[]
    @typegoose.prop()
    public smgs: number[]
    @typegoose.prop()
    public rifles: number[]
    @typegoose.prop()
    public snipers: number[]
    @typegoose.prop()
    public machineguns: number[]
    @typegoose.prop()
    public melees: number[]
    @typegoose.prop()
    public equipment: number[]
}

export const InventoryBuyMenuModel = typegoose.getModelForClass(InventoryBuyMenu)
