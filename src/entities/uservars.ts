import * as typegoose from 'typegoose'

import { LogInstance } from 'log/loginstance'

/**
 * a document that stores global user variables
 */
export class UserVars extends typegoose.Typegoose {
    /**
     * setup the uservars table
     */
    public static setupDoc(): void {
        UserVarsModel.find().then((entries: UserVars[]) => {
            // create the document if it does not exist
            if (entries.length === 0) {
                this.createDoc()
            }
        }).catch((reason) => {
            LogInstance.error('Failed to query GlobalInfo document')
            LogInstance.error(reason)
            process.exit(2)
        })
    }

    public static getInstance(): Promise<UserVars> {
        return UserVarsModel.findOne({})
            .exec()
    }

    public static getAndIncrementNextUserId(): Promise<number> {

        return new Promise<number>((resolve: (val: number) => void,
                                    reject: (reason?: any) => void) => {
            UserVars.getInstance()
                .then((vars: UserVars) => {
                    const nextUserId: number = vars.nextUserId++
                    UserVarsModel.updateOne({}, vars)
                        .exec()
                        .catch(reject)
                    resolve(nextUserId)
                })
                .catch(reject)
        })
    }

    /**
     * create a new document
     */
    private static createDoc(): void {
        const newInfo = new UserVarsModel({ nextUserId: 1 })
        newInfo.save()
    }

    @typegoose.prop()
    public nextUserId?: number
}

const UserVarsModel = new UserVars().getModelForClass(UserVars)
