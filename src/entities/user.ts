import * as typegoose from '@typegoose/typegoose'

import { UserVars } from 'entities/uservars'

import { HashContainer } from 'hash'

export const USER_MAX_LEVEL: number = 99

/**
 * represents an user and its data
 */
export class User {
    /**
     * retrieve every user in the db
     * @param colOffset the index where the collection should begin
     * @param colLength the collection's length
     * @returns a promise with the users
     */
    public static async getAllUsers(colOffset: number, colLength: number): Promise<User[]> {
        return UserModel.find({}).skip(colOffset).limit(colLength)
            .exec()
    }

    /**
     * retrieve an user's information by its ID
     * @param userId the target's user ID
     * @returns the target user, null if not
     */
    public static async getUserById(userId: number): Promise<User> {
        return UserModel.findOne({ userId })
            .exec()
    }

    /**
     * retrieve an user's information by its username
     * @param userName the target's user name
     * @returns the target user if found, null if not
     */
    public static async getUserByName(userName: string): Promise<User> {
        return UserModel.findOne({ userName })
            .exec()
    }

    /**
     * is an user's name or ingame player name already taken?
     * @param userName the target's user name
     * @param playerName the target's ingame player name
     * @returns true if so, false if not
     */
    public static async isTaken(userName: string, playerName: string): Promise<boolean> {
        const target: User = await UserModel.findOne({ $or: [{ userName }, { playerName }] })
            .exec()
        return target != null
    }

    /**
     * set an user's information properties
     * @param userId the target user's ID
     * @param updatedUser the new user information properties
     * @returns true if updated sucessfully, false if not
     */
    public static async set(userId: number, updatedUser: any): Promise<boolean> {
        const res =
            await UserModel.updateOne({ userId }, { $set: updatedUser })
                .exec()
        return res.ok === 1 && res.n === 1
    }

    /**
     * create a new user in the db
     * @param userName the new user's name
     * @param playerName the new user's ingame player name
     * @param password the new user's password
     * @returns a promise with the new created user
     */
    public static async createUser(userName: string, playerName: string,
                                   password: string): Promise<User> {
        const [nextUserId, passwordHash]: [number, HashContainer] = await Promise.all([
            UserVars.getNextUserId(),
            HashContainer.create(password),
        ])

        const newUserReq = new UserModel({
            userId: nextUserId,
            userName,
            playerName,
            password: passwordHash.build(),
        })

        const [newUser]: [User, boolean] = await Promise.all([
            newUserReq.save(),
            UserVars.setNextUserId(nextUserId + 1),
        ])

        return newUser
    }

    /**
     * delete an user by its ID
     * @param userId the target's user ID
     * @returns a promise with the target user
     */
    public static async removeUserById(userId: number): Promise<boolean> {
        const res: { ok?: number; n?: number; } = await UserModel.deleteOne({ userId })
            .exec()

        // return true if deleted only one document (val.n) with success (val.ok)
        return res.ok === 1 && res.n === 1
    }

    /**
     * validate an user's credentials
     * @param userName the user's name
     * @param password the user's password
     * @return a promise with the logged in user's ID
     */
    public static async validateCredentials(userName: string, password: string): Promise<number> {
        const user: User = await UserModel.findOne({ userName })
            .exec()

        if (user == null) {
            return 0
        }

        const targetHash: HashContainer = await HashContainer.from(user.password)
        const inputHash: HashContainer = await targetHash.cloneSettings(password)

        if (targetHash.compare(inputHash) === false) {
            return 0
        }

        return user.userId
    }

    @typegoose.prop({ index: true, required: true, unique: true })
    public userId: number
    @typegoose.prop({ lowercase: true, required: true, unique: true })
    public userName: string
    @typegoose.prop({ index: true, required: true, unique: true })
    public playerName: string
    @typegoose.prop({ required: true })
    public password: string

    @typegoose.prop({ default: 10000, required: true })
    public points: number
    @typegoose.prop({ default: 5000, required: true })
    public cash: number
    @typegoose.prop({ default: 30000, required: true })
    public mpoints: number

    @typegoose.prop({ default: 1, max: USER_MAX_LEVEL, required: true })
    public level: number
    @typegoose.prop({ default: 0, required: true })
    public curExp: number
    @typegoose.prop({ default: 1000, required: true  })
    public maxExp: number
    @typegoose.prop({ default: 1, min: 0, max: 7, required: true })
    public vipLevel: number

    @typegoose.prop({ default: 0, required: true })
    public rank: number

    @typegoose.prop({ default: 0, required: true })
    public rankFrame: number

    @typegoose.prop({ default: 0, required: true })
    public playedMatches: number
    @typegoose.prop({ default: 0, required: true })
    public wins: number
    @typegoose.prop({ default: 0, required: true  })
    public losses: number
    @typegoose.prop({ default: 0, required: true })
    public secondsPlayed: number

    @typegoose.prop({ default: 0, required: true })
    public kills: number
    @typegoose.prop({ default: 0, required: true  })
    public deaths: number
    @typegoose.prop({ default: 0, required: true  })
    public assists: number
    @typegoose.prop({ default: 0, required: true })
    public headshots: number
    @typegoose.prop({ default: 100, required: true })
    public accuracy: number


    @typegoose.prop({ default: 1005, required: true })
    public avatar: number

    @typegoose.arrayProp({
        default: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
        items: Number, required: true
    })
    public unlockedAvatars: number[]

    @typegoose.prop({ default: '', required: true })
    public netCafeName: string

    @typegoose.prop({ default: '', required: true })
    public clanName: string
    @typegoose.prop({ default: 0, min: 0, max: 7, required: true })
    public clanMark: number

    @typegoose.prop({ default: 0, required: true })
    public worldRank: number


    @typegoose.prop({ default: 0, required: true })
    public titleId: number
    @typegoose.arrayProp({
        default: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
        items: Number, required: true
    })
    public unlockedTitles: number[]
    @typegoose.prop({ default: '', required: true })
    public signature: string


    @typegoose.prop({ default: 0, required: true })
    public bestGamemode: number
    @typegoose.prop({ default: 0, required: true })
    public bestMap: number

    @typegoose.arrayProp({
        default: [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
        items: Number, required: true
    })
    public unlockedAchievements: number[]

    @typegoose.prop({ default: 0, required: true })
    public skillHumanCurXp: number
    @typegoose.prop({ default: 0, required: true })
    public skillHumanMaxXp: number
    @typegoose.prop({ default: 0, required: true })
    public skillHumanPoints: number
    @typegoose.prop({ default: 0, required: true })
    public skillZombieCurXp: number
    @typegoose.prop({ default: 0, required: true })
    public skillZombieMaxXp: number
    @typegoose.prop({ default: 0, required: true })
    public skillZombiePoints: number
}

const UserModel = typegoose.getModelForClass(User)
