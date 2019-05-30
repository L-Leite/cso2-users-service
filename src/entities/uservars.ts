import * as typegoose from 'typegoose'

const DEFAULT_NEXTUSERID_VALUE: number = 1

/**
 * a document that stores global user variables
 */
export class UserVars extends typegoose.Typegoose {
    /**
     * setup the uservars table
     */
    public static async initialize(): Promise<void> {
        const entries: UserVars[] = await UserVarsModel.find()

        if (entries.length === 0) {
            this.createDoc()
        }
    }

    /**
     * get the next available user ID
     * @returns the next user ID
     */
    public static async getNextUserId(): Promise<number> {
        const vars: UserVars = await this.getInstance()
        return vars.nextUserId
    }

    /**
     * sets the next available user ID
     * @param newNextUserID the next user ID
     * @returns true if set successfully, false if not
     */
    public static async setNextUserId(newNextUserID: number): Promise<boolean> {
        const vars: UserVars = await this.getInstance()
        vars.nextUserId = newNextUserID
        const res = await UserVarsModel.updateOne({}, vars)
            .exec()
        return res.ok === 1 && res.n === 1
    }

    /**
     * get the uservars document
     * @returns the uservars document
     */
    private static async getInstance(): Promise<UserVars> {
        return UserVarsModel.findOne({})
            .exec()
    }

    /**
     * create a new document
     */
    private static async createDoc(): Promise<void> {
        const newInfo = new UserVarsModel({ nextUserId: DEFAULT_NEXTUSERID_VALUE })
        await newInfo.save()
    }

    @typegoose.prop()
    public nextUserId?: number
}

const UserVarsModel = new UserVars().getModelForClass(UserVars)
