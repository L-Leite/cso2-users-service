import * as typegoose from '@typegoose/typegoose'

import { DefaultInventoryItems } from 'entities/inventory/defaultitems'
import { InventoryItem } from 'entities/inventory/item'

/**
 * holds items to give to new users
 */
export class DefaultInventory {
    /**
     * setup the DefaultInventory table
     */
    public static async initialize(): Promise<void> {
        const entries: DefaultInventory[] = await DefaultInventoryModel.find()

        if (entries.length === 0) {
            await this.create()
        }
    }

    /**
     * get an user's inventory items
     * @param userId the owning user's ID
     * @returns a promise to the user's inventory items
     */
    public static async get(): Promise<DefaultInventory> {
        return await DefaultInventoryModel.findOne()
            .exec()
    }

    public static async create(): Promise<DefaultInventory> {
        const defaultInv = new DefaultInventoryModel({
            items: DefaultInventoryItems,
            ctItem: 1047,
            terItem: 1048,
            headItem: 0,
            gloveItem: 0,
            backItem: 0,
            stepsItem: 0,
            cardItem: 0,
            sprayItem: 42001,
            primary: [5336, 5285, 5206],
            secondary: [5356, 5294, 5356],
            melee: [5330, 5231, 5365],
            hegrenade: [4, 4, 4],
            flash: [23, 23, 23],
            smoke: [8, 8, 8],
            pistols: [5280, 5279, 5337, 5356, 5294, 5360, 5262, 103, 106],
            shotguns: [5130, 5293, 5306, 5261, 5242, 5264, 5265, 5230, 137],
            smgs: [5251, 5295, 5238, 5320, 5285, 5347, 5310, 162, 105],
            rifles: [46, 45, 5296, 5184, 5355, 113, 102, 161, 157],
            snipers: [5133, 5118, 5206, 5241, 5225, 146, 125, 160, 163],
            machineguns: [5125, 5314, 5260, 87, 5332, 5366, 5276, 5233, 159],
            melees: [79, 5232, 84, 5221, 5304, 5330, 5253, 5231, 5353],
            equipment: [36, 37, 23, 4, 8, 34, 0, 0, 0],
        })
        return await defaultInv.save()
    }

    // inventory
    @typegoose.prop({ required: true })
    public items: InventoryItem[]

    // cosmetics
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

    // loadouts
    @typegoose.prop()
    public primary: number[]
    @typegoose.prop()
    public secondary: number[]
    @typegoose.prop()
    public melee: number[]
    @typegoose.prop()
    public hegrenade: number[]
    @typegoose.prop()
    public flash: number[]
    @typegoose.prop()
    public smoke: number[]

    // buy menu
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

const DefaultInventoryModel = typegoose.getModelForClass(DefaultInventory)
