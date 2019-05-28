import * as typegoose from 'typegoose'

import { UserVars } from 'entities/uservars'

import { HashContainer } from 'hash'

export interface ISetUserRequest {
    password?: string
    level?: number
    curExp?: number
    maxExp?: number
    wins?: number
    losses?: number
    kills?: number
    deaths?: number
    assists?: number
}

/**
 * represents an user and its data
 */
export class User extends typegoose.Typegoose {
    /**
     * retrieve every user in the db
     * @returns a promise with the users
     */
    public static async getAllUsers(): Promise<User[]> {
        return UserModel.find({})
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
     * set an user's information properties
     * @param userId the target user's ID
     * @param updatedUser the new user information properties
     * @returns true if updated sucessfully, false if not
     */
    public static async set(userId: number, updatedUser: ISetUserRequest): Promise<boolean> {
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
        // check if an user with the same username or playername already exists
        const lookupUser: User = await UserModel.findOne({ $or: [{ userName }, { playerName }] })
            .exec()

        if (lookupUser != null) {
            throw 409
        }

        const nextUserId: number = await UserVars.getAndIncrementNextUserId()
        const newUser = new UserModel({
            userId: nextUserId,
            userName,
            playerName,
            password,
        })

        return newUser.save()
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

        if (user != null) {
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
    @typegoose.prop({ default: 1, required: true })
    public level: number
    @typegoose.prop({ default: 1005, required: true })
    public avatar: number
    @typegoose.prop({ default: 0, required: true })
    public curExp: number
    @typegoose.prop({ default: 1000, required: true  })
    public maxExp: number
    @typegoose.prop({ default: 0, required: true })
    public rank: number
    @typegoose.prop({ default: 1, required: true })
    public vipLevel: number
    @typegoose.prop({ default: 1, min: 0, max: 7, required: true })
    public wins: number
    @typegoose.prop({ default: 0, required: true  })
    public losses: number
    @typegoose.prop({ default: 0, required: true  })
    public kills: number
    @typegoose.prop({ default: 0, required: true  })
    public deaths: number
    @typegoose.prop({ default: 0, required: true  })
    public assists: number
}

const UserModel = new User().getModelForClass(User)
