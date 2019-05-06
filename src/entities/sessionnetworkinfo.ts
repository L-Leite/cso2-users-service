import * as typegoose from 'typegoose'

/**
 * an user's session network information
 */
export class SessionNetworkInfo {
    @typegoose.prop({ default: '0.0.0.0', required: true })
    public ipAddress: string
    @typegoose.prop({ default: 0, min: 0, max: 65535, required: true })
    public clientPort: number
    @typegoose.prop({ default: 0, min: 0, max: 65535, required: true })
    public serverPort: number
    @typegoose.prop({ default: 0, min: 0, max: 65535, required: true })
    public tvPort: number
}
