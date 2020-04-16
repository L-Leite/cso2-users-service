import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiJson from 'chai-json-schema'
import mocha from 'mocha'
import superagent from 'superagent'

// add the src directory to the module search path
import { addPath } from 'app-module-path'
addPath(__dirname + '/../../src')

import { ServiceInstance } from 'serviceinstance'

import { USER_MAX_LEVEL } from 'entities/user'

// setup chai
chai.should()
chai.use(chaiHttp)
chai.use(chaiJson)

const userSchema = {
    type: 'object',
    required: [
        'userId',
        'userName',
        'playerName',

        'points',
        'cash',
        'mpoints',

        'level',
        'curExp',
        'maxExp',
        'vipLevel',
        'vipXp',

        'rank',
        'rankFrame',

        'playedMatches',
        'wins',
        'secondsPlayed',

        'kills',
        'deaths',
        'assists',
        'headshots',
        'accuracy',

        'avatar',
        'unlockedAvatars',

        'netCafeName',

        'clanName',
        'clanMark',

        'worldRank',

        'titleId',
        'unlockedTitles',
        'signature',

        'unlockedAchievements',

        'skillHumanCurXp',
        'skillHumanMaxXp',
        'skillHumanPoints',
        'skillZombieCurXp',
        'skillZombieMaxXp',
        'skillZombiePoints',
    ],
    properties: {
        userId: {
            type: 'number',
            minimum: 1,
        },
        userName: {
            type: 'string',
        },
        playerName: {
            type: 'string',
        },

        points: {
            type: 'number',
        },
        cash: {
            type: 'number',
        },
        mpoints: {
            type: 'number',
        },

        level: {
            type: 'number',
            minimum: 1,
            maximum: USER_MAX_LEVEL,
        },
        curExp: {
            type: 'number',
            minimum: 0,
        },
        maxExp: {
            type: 'number',
            minimum: 0,
        },
        vipLevel: {
            type: 'number',
        },
        vipXp: {
            type: 'number',
        },

        rank: {
            type: 'number',
        },
        rankFrame: {
            type: 'number',
        },

        playedMatches: {
            type: 'number',
            minimum: 0,
        },
        wins: {
            type: 'number',
            minimum: 0,
        },
        secondsPlayed: {
            type: 'number',
            minimum: 0,
        },

        kills: {
            type: 'number',
            minimum: 0,
        },
        deaths: {
            type: 'number',
            minimum: 0,
        },
        assists: {
            type: 'number',
            minimum: 0,
        },
        headshots: {
            type: 'number',
            minimum: 0,
        },
        accuracy: {
            type: 'number',
            minimum: 0,
        },

        avatar: {
            type: 'number',
        },
        unlockedAvatars: {
            type: 'array',
            minItems: 128,
            maxItems: 128,
            items: {
                type: 'number'
            }
        },

        netCafeName: {
            type: 'string',
        },

        clanName: {
            type: 'string',
        },
        clanMark: {
            type: 'number',
        },

        worldRank: {
            type: 'number',
        },

        titleId: {
            type: 'number',
        },
        unlockedTitles: {
            type: 'array',
            minItems: 128,
            maxItems: 128,
            items: {
                type: 'number'
            }
        },
        signature: {
            type: 'string',
        },

        bestGamemode: {
            type: 'number',
        },
        bestMap: {
            type: 'number',
        },

        unlockedAchievements: {
            type: 'array',
            minItems: 128,
            maxItems: 128,
            items: {
                type: 'number'
            }
        },

        skillHumanCurXp: {
            type: 'number',
        },
        skillHumanMaxXp: {
            type: 'number',
        },
        skillHumanPoints: {
            type: 'number',
        },
        skillZombieCurXp: {
            type: 'number',
        },
        skillZombieMaxXp: {
            type: 'number',
        },
        skillZombiePoints: {
            type: 'number',
        },
    },
}

mocha.describe('Users', (): void => {
    let serviceInstance: ServiceInstance

    mocha.before(async (): Promise<void> => {
        serviceInstance = new ServiceInstance()
        await serviceInstance.listen()
    })

    // test user creation first since other tests depend on it
    mocha.describe('POST /users', (): void => {
        let createdUserId: number = 0

        mocha.it('Should create a new user', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users')
                .send({
                    username: 'testuser',
                    playername: 'TestingUser',
                    password: '222222',
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(201)
                    res.body.should.be.jsonSchema(userSchema)
                    createdUserId = res.body.userId
                    return done()
                })
        })
        mocha.it('Should 400 when creating a new user with bad query parameters', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users')
                .send({
                    badparam: 'testuser',
                    ugly: 'TestingUser',
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(400)
                    return done()
                })
        })
        mocha.it('Should 409 when creating a new user with an existing username/playername',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/users')
                    .send({
                        username: 'testuser',
                        playername: 'TestingUser',
                        password: '222222',
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(409)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/users/' + createdUserId)
                .send()
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('GET /users', (): void => {
        let firstUserId: number = 0
        let secondUserId: number = 0

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users')
                .send({
                    username: 'testuser',
                    playername: 'TestingUser',
                    password: '222222',
                }).then((res: superagent.Response) => {
                    firstUserId = res.body.userId
                    chai.request(serviceInstance.app)
                        .post('/users')
                        .send({
                            username: 'gamer',
                            playername: 'cso2player',
                            password: '123456',
                        }).then((res2: superagent.Response) => {
                            secondUserId = res2.body.userId
                            return done()
                        })
                })
        })

        mocha.it('Should get every user', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users')
                .query({
                    offset: 0,
                    length: 50,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    res.body.should.be.jsonSchema({
                        type: 'array',
                        minItems: 2,
                        items: userSchema,
                    })
                    return done()
                })
        })

        mocha.it('Should get the first user', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users')
                .query({
                    offset: 0,
                    length: 1,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    res.body.should.be.jsonSchema({
                        type: 'array',
                        minItems: 1,
                        maxItems: 1,
                        items: userSchema,
                    })
                    return done()
                })
        })

        mocha.it('Should get the second user', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users')
                .query({
                    offset: 1,
                    length: 1,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    res.body.should.be.jsonSchema({
                        type: 'array',
                        minItems: 1,
                        maxItems: 1,
                        items: userSchema,
                    })
                    return done()
                })
        })

        mocha.it('Should 400 when getting an user page without query params', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users')
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(400)
                    return done()
                })
        })

        mocha.it('Should 413 when requesting for an oversized users page', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users')
                .query({
                    offset: 0,
                    length: 101,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(413)
                    return done()
                })
        })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/users/' + firstUserId)
                .send()
                .then(() => {
                    chai.request(serviceInstance.app)
                        .delete('/users/' + secondUserId)
                        .send()
                        .then(() => {
                            return done()
                        })
                })

        })
    })

    mocha.describe('GET /users/:userId', (): void => {
        let createdUserId: number = 0

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users')
                .send({
                    username: 'testuser',
                    playername: 'TestingUser',
                    password: '222222',
                }).then((res: superagent.Response) => {
                    createdUserId = res.body.userId
                    return done()
                })
        })

        mocha.it('Should get a specific user', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users/' + createdUserId)
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    res.body.should.be.jsonSchema(userSchema)
                    return done()
                })
        })

        mocha.it('Should 400 when getting an user with a string as user ID', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users/bad')
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(400)
                    return done()
                })
        })

        mocha.it('Should 404 when getting a non existing user', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users/404')
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(404)
                    return done()
                })
        })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/users/' + createdUserId)
                .send()
                .then(() => {
                    return done()
                })
        })
    })

    mocha.describe('PUT /users/:userId', (): void => {
        let createdUser: number = 0

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users')
                .send({
                    username: 'testuser',
                    playername: 'TestingUser',
                    password: '222222',
                }).then((res: superagent.Response) => {
                    createdUser = res.body.userId
                    return done()
                })
        })

        mocha.it('Should change an user\'s data',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/users/' + createdUser)
                    .send({
                        wins: 16,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Check if the user\'s data was changed successfully',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/users/' + createdUser)
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        res.body.should.be.jsonSchema(userSchema)
                        chai.expect(res.body.wins).equal(16)
                        return done()
                    })
            })
        mocha.it('Should 400 when updated an user\'s data slots with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/users/bad')
                    .send({
                        kills: 300,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when changing an unexisting user\'s data',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/users/404/')
                    .send({
                        deaths: 11,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/users/' + createdUser)
                .send()
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('DELETE /users/:userId', (): void => {
        let firstUser: number = 0
        let secondUser: number = 0

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users')
                .send({
                    username: 'testuser',
                    playername: 'TestingUser',
                    password: '222222',
                }).then((res: superagent.Response) => {
                    firstUser = res.body.userId
                    chai.request(serviceInstance.app)
                        .post('/users')
                        .send({
                            username: 'gamer',
                            playername: 'cso2player',
                            password: '123456',
                        }).then((res2: superagent.Response) => {
                            secondUser = res2.body.userId
                            return done()
                        })
                })
        })

        mocha.it('Should delete an user',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/users/' + firstUser)
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Should 404 when getting the deleted user',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/users/' + firstUser)
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })
        mocha.it('Should 404 when deleting a non existing user',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/404')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })
        mocha.it('Should 400 when deleting an user with a string as user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/users/bad')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/users/' + secondUser)
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('GET /users/byname/:username', (): void => {
        let createdUserId: number = 0

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users')
                .send({
                    username: 'testuser',
                    playername: 'TestingUser',
                    password: '222222',
                }).then((res: superagent.Response) => {
                    createdUserId = res.body.userId
                    return done()
                })
        })

        mocha.it('Should get a specific user by its username', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users/byname/testuser')
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    res.body.should.be.jsonSchema(userSchema)
                    return done()
                })
        })
        mocha.it('Should 400 when getting an user without an username', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users/byname/')
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(400)
                    return done()
                })
        })
        mocha.it('Should 404 when getting a non existing user', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users/byname/idontexist')
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(404)
                    return done()
                })
        })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/users/' + createdUserId)
                .send()
                .then(() => {
                    return done()
                })
        })
    })

    mocha.describe('POST /users/auth/login and /users/auth/logout', (): void => {
        let createdUserId: number = 0

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users')
                .send({
                    username: 'testuser',
                    playername: 'TestingUser',
                    password: '222222',
                }).then((res: superagent.Response) => {
                    createdUserId = res.body.userId
                    return done()
                })
        })

        mocha.it('Should authenticate an user', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users/auth/login')
                .send({
                    username: 'testuser',
                    password: '222222',
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    res.body.should.be.jsonSchema({
                        type: 'object',
                        required: [
                            'userId',
                        ],
                        properties: {
                            userId: {
                                type: 'number',
                            },
                        },
                    })
                    res.body.userId.should.be.equal(createdUserId)
                    return done()
                })
        })

        mocha.it('Should log user out', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users/auth/logout')
                .send({
                    userId: createdUserId
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    return done()
                })
        })

        mocha.it('Should 400 when authenticating with a bad query', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users/auth/login')
                .send({
                    uuuuser: 'yes\n\r\t',
                    aeiou: 6789,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(400)
                    return done()
                })
        })
        mocha.it('Should 401 when authenticating with bad user credentials', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users/auth/login')
                .send({
                    username: 'baduser',
                    password: 'badpassword',
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(401)
                    return done()
                })
        })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/users/' + createdUserId)
                .send()
                .then(() => {
                    return done()
                })
        })
    })

    mocha.after(async (): Promise<void> => {
        await serviceInstance.stop()
    })
})
