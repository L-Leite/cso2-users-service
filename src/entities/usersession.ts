import * as typegoose from 'typegoose'
import uuid from 'uuid/v4'

import { SessionNetworkInfo } from 'entities/sessionnetworkinfo'

enum HolepunchType {
    Client = 0,
    Server = 256,
    SourceTV = 512,
}

export interface ISetSessionInfoBody {
    userId: number
    externalNet?: {
        ipAddress?: string
        clientPort?: number
        serverPort?: number
        tvPort?: number,
    }
    internalNet?: {
        ipAddress?: string
        clientPort?: number
        serverPort?: number
        tvPort?: number,
    }
    currentChannelServerIndex?: number
    currentChannelIndex?: number
    currentRoomId?: number
}

/**
 * Handles an user's session information
 */
@typegoose.index({ sessionId: 1, userId: 1 }, { unique: true })
export class UserSession extends typegoose.Typegoose {
    /**
     * retrieve an user's session by its session ID
     * @param sessionId the target session's ID
     * @returns the requested UserSession, if found. otherwise it will return a null object
     */
    public static async get(sessionId: string): Promise<UserSession> {
        return UserSessionModel.findOne({ sessionId })
            .exec()
    }

    /**
     * retrieve an user's session by its owning user's ID
     * @param userId the owning user's ID
     * @returns the requested UserSession, if found. otherwise it will return a null object
     */
    public static async getByUserId(userId: number): Promise<UserSession> {
        return UserSessionModel.findOne({ userId })
            .exec()
    }

    /**
     * set an user's session information properties
     * @param userId the owning user's ID
     * @param updatedSession the new session information properties
     * @returns true if updated sucessfully, false if not
     */
    public static async set(userId: number, updatedSession: ISetSessionInfoBody): Promise<boolean> {
        const res =
            await UserSessionModel.updateOne({ userId }, { $set: updatedSession })
                .exec()
        return res.ok === 1 && res.n === 1
    }

    /**
     * retrieve the number of sessions in the database
     * @returns the number of sessions in the database
     */
    public static async count(): Promise<number> {
        return UserSessionModel.countDocuments()
            .exec()
    }

    /**
     * creates a new user session
     * @param userId the target user's ID
     * @returns the new UserSession object
     */
    public static async create(userId: number): Promise<UserSession> {
        // check if a session already exists
        const lookupSession: UserSession = await UserSessionModel.findOne({ userId })
            .exec()

        if (lookupSession != null) {
            throw 409
        }

        const newSession = new UserSessionModel({ sessionId: uuid(), userId })
        return newSession.save()
    }

    /**
     * delete a session by its ID
     * @param sessionId the to be removed session's ID
     * @returns true if deleted successfully, false if not
     */
    public static async delete(sessionId: string): Promise<boolean> {
        const res: { ok?: number; n?: number; } = await UserSessionModel.deleteOne({ sessionId })
            .exec()

        // return true if deleted only one document (val.n) with success (val.ok)
        return res.ok === 1 && res.n === 1
    }

    /**
     * delete a session by its owning user's ID
     * @param userId the owner's user ID
     * @returns true if deleted successfully, false if not
     */
    public static async deleteByUserId(userId: number): Promise<boolean> {
        const res: { ok?: number; n?: number; } = await UserSessionModel.deleteOne({ userId })
            .exec()

        // return true if deleted only one document (val.n) with success (val.ok)
        return res.ok === 1 && res.n === 1
    }

    /**
     * delete every session saved in the database
     * @returns true if deleted successfully, false if not
     */
    public static async deleteAll(): Promise<boolean> {
        const res: { ok?: number; } = await UserSessionModel.remove({})
            .exec()

        return res.ok === 1
    }

    @typegoose.prop({ required: true })
    public sessionId: string
    @typegoose.prop({ min: 1, required: true })
    public userId: number

    @typegoose.prop({ default: new SessionNetworkInfo(), required: true })
    public externalNet: SessionNetworkInfo
    @typegoose.prop({ default: new SessionNetworkInfo(), required: true })
    public internalNet: SessionNetworkInfo

    @typegoose.prop({ default: 0, required: true })
    public currentChannelServerIndex: number
    @typegoose.prop({ default: 0, required: true })
    public currentChannelIndex: number

    @typegoose.prop({ default: 0, required: true })
    public currentRoomId: number

    public setCurrentChannelIndex(channelServerIndex: number, channelIndex: number): void {
        this.currentChannelServerIndex = channelServerIndex
        this.currentChannelIndex = channelIndex
    }

    public updateHolepunch(portId: number, localPort: number,
                           externalPort: number): number {
        switch (portId) {
            case HolepunchType.Client:
                this.internalNet.clientPort = localPort
                this.externalNet.clientPort = externalPort
                return 0
            case HolepunchType.Server:
                this.internalNet.serverPort = localPort
                this.externalNet.serverPort = externalPort
                return 1
            case HolepunchType.SourceTV:
                this.internalNet.tvPort = localPort
                this.externalNet.tvPort = externalPort
                return 2
            default:
                return -1
        }
    }
}

const UserSessionModel = new UserSession().getModelForClass(UserSession)