import crypto from 'crypto'
import pify from 'pify'

export const HASH_PASSWORD_VERSION: number = 1

/**
 * hashes a password with PBKDF2
 * @param password the password to be hashed
 * @param iterations the number of iterations to perform
 * @param salt the hash's salt
 * @returns a string with a string format version, salt, iterations and hash respectively
 */
async function generatePasswordHash(password: string, iterations: number, salt: string): Promise<Buffer> {
    return await pify(crypto.pbkdf2)(password, salt, iterations, 64, 'sha512')
}

/**
 * creates a string with the hash of a password and its salt
 * it has the string format version, salt, iterations and hash respectively, separated by colons
 * example: {version number}:{salt}:{iterations}:{hash}
 * @param password the password to be hashed
 * @returns a string with a string format version, salt, iterations and hash respectively
 */
export async function buildPasswordHash(password: string): Promise<string> {
    const salt: string = crypto.randomBytes(16).toString('hex')
    const iterations: number = 100000

    const derivedKey: Buffer = await generatePasswordHash(password, iterations, salt)
    return HASH_PASSWORD_VERSION + ':' + salt + ':' + iterations + ':' + derivedKey.toString('hex')
}

export async function comparePasswordHashes(password: string, targetHash: string): Promise<boolean> {
    const parsedArray: string[] = targetHash.split(':')

    if (parsedArray.length !== 4) {
        throw new Error('The target\'s hash length ' + parsedArray.length + ' is invalid ')
    }

    const passwordVersion: number = Number(parsedArray[0])

    if (passwordVersion !== HASH_PASSWORD_VERSION) {
        throw new Error('The target\'s hash version ' + passwordVersion
            + ' is different from ours ' + HASH_PASSWORD_VERSION)
    }

    const salt: string = parsedArray[1]
    const iterations: number = Number(parsedArray[2])
    const hash: Buffer = Buffer.from(parsedArray[3], 'hex')

    const sourceHash: Buffer = await generatePasswordHash(password, iterations, salt)
    return crypto.timingSafeEqual(sourceHash, hash)
}
