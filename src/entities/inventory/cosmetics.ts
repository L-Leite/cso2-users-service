import * as typegoose from '@typegoose/typegoose'

import { DefaultInventory } from 'entities/inventory/defaultinventory'

export interface ISetCosmeticsBody {
    ctItem?: number
    terItem?: number
    headItem?: number
    gloveItem?: number
    backItem?: number
    stepsItem?: number
    cardItem?: number
    sprayItem?: number
}

/**
 * stores an user's equipped cosmetic items
 */
export class InventoryCosmetics {
    /**
     * get an user's equipped cosmetics
     * @param userId the owning user's ID
     * @returns a promise to the user's cosmetics
     */
    public static async get(userId: number): Promise<InventoryCosmetics> {
        return await InventoryCosmeticsModel.findOne({ ownerId: userId })
            .exec()
    }

    /**
     * create an user's inventory
     * @param userId the owner's user ID
     * @returns a promise to the user's inventory items
     */
    public static async create(userId: number): Promise<InventoryCosmetics> {
        const defaultItems: DefaultInventory = DefaultInventory.get()
        const newCosmetics = new InventoryCosmeticsModel({
            ownerId: userId,
            ctItem: defaultItems.ctItem,
            terItem: defaultItems.terItem,
            headItem: defaultItems.headItem,
            gloveItem: defaultItems.gloveItem,
            backItem: defaultItems.backItem,
            stepsItem: defaultItems.stepsItem,
            cardItem: defaultItems.cardItem,
            sprayItem: defaultItems.sprayItem,
        })
        return await newCosmetics.save()
    }

    /**
     * set an user's equipped cosmetics
     * @param updatedCosmetics the new cosmetics
     * @param userId the owning user's ID
     * @returns a promise that returns true if the cosmetics were updated sucessfully,
     *          false if it weren't (the user doesn't exist)
     */
    public static async set(updatedCosmetics: ISetCosmeticsBody,
        userId: number): Promise<boolean> {
        const res =
            await InventoryCosmeticsModel.updateOne(
                { ownerId: userId }, { $set: updatedCosmetics })
                .exec()
        return res.ok === 1 && res.n === 1
    }

    /**
     * delete a buy menu by its owner user ID
     * @param userId the owner's user ID
     * @returns a promise returning true if deleted successfully, or false if not
     */
    public static async remove(userId: number): Promise<boolean> {
        const res = await InventoryCosmeticsModel.deleteOne({ ownerId: userId })
            .exec()
        return res.ok === 1 && res.n === 1
    }

    @typegoose.prop({ index: true, required: true, unique: true })
    public ownerId: number
    @typegoose.prop({ required: true })
    public ctItem: number
    @typegoose.prop({ required: true })
    public terItem: number
    @typegoose.prop({ required: true })
    public headItem: number
    @typegoose.prop({ required: true })
    public gloveItem: number
    @typegoose.prop({ required: true })
    public backItem: number
    @typegoose.prop({ required: true })
    public stepsItem: number
    @typegoose.prop({ required: true })
    public cardItem: number
    @typegoose.prop({ required: true })
    public sprayItem: number
}

export const InventoryCosmeticsModel = typegoose.getModelForClass(InventoryCosmetics)
