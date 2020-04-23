import * as typegoose from '@typegoose/typegoose'

import { DefaultInventory } from 'entities/inventory/defaultinventory'

const MAX_LOADOUTS = 3

export interface ISetLoadoutBody {
    loadoutNum: number
    primary?: number
    secondary?: number
    melee?: number
    hegrenade?: number
    flash?: number
    smoke?: number
}

/**
 * stores an user's loadout items at a slot
 */
@typegoose.index({ ownerId: 1, loadoutNum: 1 }, { unique: true })
export class InventoryLoadout {
    /**
     * get an user's loadout
     * @param loadoutNum the loadout's index number
     * @param userId the owning user's ID
     * @returns a promise to the user's loadout
     */
    public static async get(loadoutNum: number, userId: number): Promise<InventoryLoadout> {
        return await InventoryLoadoutModel.findOne({ ownerId: userId, loadoutNum })
            .exec()
    }

    /**
     * create loadouts for an user
     * @param userId the owner's user ID
     * @returns a promise to the user's inventory items
     */
    public static async create(userId: number): Promise<InventoryLoadout[]> {
        const newLoadoutPromises: Promise<InventoryLoadout>[] = []
        const defaultItems: DefaultInventory = DefaultInventory.get()

        for (let i = 0; i < MAX_LOADOUTS; i++) {
            const newLoadoutModel = new InventoryLoadoutModel({
                ownerId: userId,
                loadoutNum: i,
                primary: defaultItems.primary[i],
                secondary: defaultItems.secondary[i],
                melee: defaultItems.melee[i],
                hegrenade: defaultItems.hegrenade[i],
                flash: defaultItems.flash[i],
                smoke: defaultItems.smoke[i],
            })
            newLoadoutPromises.push(newLoadoutModel.save())
        }

        return await Promise.all(newLoadoutPromises)
    }

    /**
     * set an user's loadout
     * @param updatedLoadout the updated loadout
     * @param userId the owning user's ID
     * @returns a promise that returns true if the loadout was updated sucessfully,
     *          false if it wasn't (the user doesn't exist)
     */
    public static async set(updatedLoadout: ISetLoadoutBody,
        userId: number): Promise<boolean> {
        const res =
            await InventoryLoadoutModel.updateOne(
                { ownerId: userId, loadoutNum: updatedLoadout.loadoutNum },
                { $set: updatedLoadout })
                .exec()
        return res.ok === 1 && res.n === 1
    }

    /**
     * delete any loadouts by its owner user ID
     * @param userId the owner's user ID
     * @returns a promise returning true if deleted successfully, or false if not
     */
    public static async remove(userId: number): Promise<boolean> {
        const res = await InventoryLoadoutModel.deleteMany({ ownerId: userId })
            .exec()
        return res.ok === 1 && res.n === 3
    }

    @typegoose.prop({ required: true })
    public ownerId: number
    @typegoose.prop({ min: 0, max: 2, required: true })
    public loadoutNum: number
    @typegoose.prop()
    public primary?: number
    @typegoose.prop()
    public secondary?: number
    @typegoose.prop()
    public melee?: number
    @typegoose.prop()
    public hegrenade?: number
    @typegoose.prop()
    public flash?: number
    @typegoose.prop()
    public smoke?: number
}

export const InventoryLoadoutModel = typegoose.getModelForClass(InventoryLoadout)
