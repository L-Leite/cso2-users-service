import * as typegoose from '@typegoose/typegoose'

/**
 * represents an inventory item
 */
export class InventoryItem {

    @typegoose.prop({ min: 1, required: true })
    public itemId: number
    @typegoose.prop({ default: 1, min: 1, required: true })
    public ammount: number

    /**
     * create an inventory item
     * @param itemId the item's id
     * @param ammount  the ammount of items
     */
    constructor(itemId: number, ammount: number = 1) {
        this.itemId = itemId
        this.ammount = ammount
    }
}
