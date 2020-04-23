import { DefaultInventoryItems } from 'entities/inventory/defaultitems'
import { InventoryItem } from 'entities/inventory/item'

/**
 * holds items to give to new users
 */
export class DefaultInventory {

    private static instance: DefaultInventory = null

    /**
     * get an user's default inventory items
     */
    public static get(): DefaultInventory {
        if (DefaultInventory.instance == null) {
            DefaultInventory.instance = new DefaultInventory()
            DefaultInventory.InitDefault()
        }

        return DefaultInventory.instance
    }

    private static InitDefault(): void {
        DefaultInventory.instance.items = DefaultInventoryItems
        DefaultInventory.instance.ctItem = 1047
        DefaultInventory.instance.terItem = 1048
        DefaultInventory.instance.headItem = 0
        DefaultInventory.instance.gloveItem = 0
        DefaultInventory.instance.backItem = 0
        DefaultInventory.instance.stepsItem = 0
        DefaultInventory.instance.cardItem = 0
        DefaultInventory.instance.sprayItem = 42001
        DefaultInventory.instance.primary = [5336, 5285, 5206]
        DefaultInventory.instance.secondary = [5356, 5294, 5356]
        DefaultInventory.instance.melee = [5330, 5231, 5365]
        DefaultInventory.instance.hegrenade = [4, 4, 4]
        DefaultInventory.instance.flash = [23, 23, 23]
        DefaultInventory.instance.smoke = [8, 8, 8]
        DefaultInventory.instance.pistols = [5280, 5279, 5337, 5356, 5294, 5360, 5262, 103, 106]
        DefaultInventory.instance.shotguns = [5130, 5293, 5306, 5261, 5242, 5264, 5265, 5230, 137]
        DefaultInventory.instance.smgs = [5251, 5295, 5238, 5320, 5285, 5347, 5310, 162, 105]
        DefaultInventory.instance.rifles = [46, 45, 5296, 5184, 5355, 113, 102, 161, 157]
        DefaultInventory.instance.snipers = [5133, 5118, 5206, 5241, 5225, 146, 125, 160, 163]
        DefaultInventory.instance.machineguns = [5125, 5314, 5260, 87, 5332, 5366, 5276, 5233, 159]
        DefaultInventory.instance.melees = [79, 5232, 84, 5221, 5304, 5330, 5253, 5231, 5353]
        DefaultInventory.instance.equipment = [36, 37, 23, 4, 8, 34, 0, 0, 0]
    }

    // inventory
    public items: InventoryItem[]

    // cosmetics
    public ctItem: number
    public terItem: number
    public headItem: number
    public gloveItem: number
    public backItem: number
    public stepsItem: number
    public cardItem: number
    public sprayItem: number

    // loadouts
    public primary: number[]
    public secondary: number[]
    public melee: number[]
    public hegrenade: number[]
    public flash: number[]
    public smoke: number[]

    // buy menu
    public pistols: number[]
    public shotguns: number[]
    public smgs: number[]
    public rifles: number[]
    public snipers: number[]
    public machineguns: number[]
    public melees: number[]
    public equipment: number[]
}
