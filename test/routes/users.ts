import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiJson from 'chai-json-schema'
import mocha from 'mocha'
import superagent from 'superagent'

// add the src directory to the module search path
import { addPath } from 'app-module-path'
addPath(__dirname + '/../../src')

import { ServiceInstance } from 'serviceinstance'

// setup chai
chai.should()
chai.use(chaiHttp)
chai.use(chaiJson)

mocha.describe('Users', (): void => {
    let serviceInstance: ServiceInstance

    mocha.before((): void => {
        serviceInstance = new ServiceInstance()
        serviceInstance.listen()
    })

    mocha.describe('GET /ping', (): void => {
        mocha.it('Should get the service\'s status', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/ping')
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    res.body.should.be.jsonSchema({
                        type: 'object',
                        required: ['sessions', 'uptime'],
                        properties: {
                            sessions: {
                                type: 'number',
                                minimum: 0,
                            },
                            uptime: {
                                type: 'number',
                                minimum: 0,
                            },
                        },
                    })
                    return done()
                })
        })
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
                    res.body.should.be.jsonSchema({
                        type: 'object',
                        required: ['userId'],
                        properties: {
                            userId: {
                                type: 'number',
                                minimum: 1,
                            },
                        },
                    })
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
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    res.body.should.be.jsonSchema({
                        type: 'array',
                        items: {
                            type: 'object',
                            required: ['userId', 'userName', 'playerName'],
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
                            },
                        },
                    })
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
                    res.body.should.be.jsonSchema({
                        type: 'object',
                        required: ['userId',
                            'userName',
                            'playerName',
                            'level',
                            'avatar',
                            'curExp',
                            'maxExp',
                            'rank',
                            'vipLevel',
                            'wins',
                            'losses',
                            'kills',
                            'deaths',
                            'assists'],
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
                            level: {
                                type: 'number',
                                minimum: 1,
                                maximum: 255, // TODO: what's the max?
                            },
                            avatar: {
                                type: 'number',
                            },
                            curExp: {
                                type: 'number',
                                minimum: 0,
                            },
                            maxExp: {
                                type: 'number',
                                minimum: 0,
                            },
                            rank: {
                                type: 'number',
                            },
                            vipLevel: {
                                type: 'number',
                            },
                            wins: {
                                type: 'number',
                                minimum: 0,
                            },
                            losses: {
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
                        },
                    })
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
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: ['userId',
                                'userName',
                                'playerName',
                                'level',
                                'curExp',
                                'maxExp',
                                'wins',
                                'losses',
                                'kills',
                                'deaths',
                                'assists'],
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
                                level: {
                                    type: 'number',
                                    minimum: 1,
                                    maximum: 100, // TODO: what's the max?
                                },
                                curExp: {
                                    type: 'number',
                                    minimum: 0,
                                },
                                maxExp: {
                                    type: 'number',
                                    minimum: 0,
                                },
                                wins: {
                                    type: 'number',
                                    minimum: 0,
                                },
                                losses: {
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
                            },
                        })
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
                    res.body.should.be.jsonSchema({
                        type: 'object',
                        required: ['userId',
                            'userName',
                            'playerName',
                            'level',
                            'avatar',
                            'curExp',
                            'maxExp',
                            'rank',
                            'vipLevel',
                            'wins',
                            'losses',
                            'kills',
                            'deaths',
                            'assists'],
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
                            level: {
                                type: 'number',
                                minimum: 1,
                                maximum: 255, // TODO: what's the max?
                            },
                            avatar: {
                                type: 'number',
                            },
                            curExp: {
                                type: 'number',
                                minimum: 0,
                            },
                            maxExp: {
                                type: 'number',
                                minimum: 0,
                            },
                            rank: {
                                type: 'number',
                            },
                            vipLevel: {
                                type: 'number',
                            },
                            wins: {
                                type: 'number',
                                minimum: 0,
                            },
                            losses: {
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
                        },
                    })
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

    mocha.describe('POST /users/session', (): void => {
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

        mocha.it('Should create an user session', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users/session')
                .send({
                    username: 'testuser',
                    password: '222222',
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(201)
                    res.body.should.be.jsonSchema({
                        type: 'object',
                        required: ['sessionId',
                            'userId',
                            'externalNet',
                            'internalNet',
                            'currentChannelServerIndex',
                            'currentChannelIndex',
                            'currentRoomId'],
                        properties: {
                            sessionId: {
                                type: 'string',
                            },
                            userId: {
                                type: 'number',
                                minimum: 1,
                            },
                            externalNet: {
                                properties: {
                                    ipAddress: {
                                        type: 'string',
                                    },
                                    clientPort: {
                                        type: 'number',
                                        minimum: 0,
                                        maximum: 65535,
                                    },
                                    serverPort: {
                                        type: 'number',
                                        minimum: 0,
                                        maximum: 65535,
                                    },
                                    tvPort: {
                                        type: 'number',
                                        minimum: 0,
                                        maximum: 65535,
                                    },
                                },
                            },
                            internalNet: {
                                properties: {
                                    ipAddress: {
                                        type: 'string',
                                    },
                                    clientPort: {
                                        type: 'number',
                                        minimum: 0,
                                        maximum: 65535,
                                    },
                                    serverPort: {
                                        type: 'number',
                                        minimum: 0,
                                        maximum: 65535,
                                    },
                                    tvPort: {
                                        type: 'number',
                                        minimum: 0,
                                        maximum: 65535,
                                    },
                                },
                            },
                            currentChannelServerIndex: {
                                type: 'number',
                            },
                            currentChannelIndex: {
                                type: 'number',
                            },
                            currentRoomId: {
                                type: 'number',
                            },
                        },
                    })
                    res.body.userId.should.be.equal(createdUserId)
                    return done()
                })
        })
        mocha.it('Should 409 when creating a session when another one already exists', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users/session')
                .send({
                    username: 'testuser',
                    password: '222222',
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(409)
                    return done()
                })
        })
        mocha.it('Should 400 when creating a session bad query', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users/session')
                .send({
                    uuuuser: 'yes\n\r\t',
                    aeiou: 6789,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(400)
                    return done()
                })
        })
        mocha.it('Should 401 when creating a session with bad user credentials', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users/session')
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
                .delete('/users/session')
                .send({
                    userId: createdUserId,
                })
                .then(() => {
                    chai.request(serviceInstance.app)
                        .delete('/users/' + createdUserId)
                        .send()
                        .then(() => {
                            return done()
                        })
                })
        })
    })

    mocha.describe('GET /users/session', (): void => {
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
                    chai.request(serviceInstance.app)
                        .post('/users/session')
                        .send({
                            username: 'testuser',
                            password: '222222',
                        }).then((res2: superagent.Response) => {
                            return done()
                        })
                })
        })

        mocha.it('Should get an user\'s session', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users/session')
                .send({
                    userId: createdUserId,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    res.body.should.be.jsonSchema({
                        type: 'object',
                        required: ['sessionId',
                            'userId',
                            'externalNet',
                            'internalNet',
                            'currentChannelServerIndex',
                            'currentChannelIndex',
                            'currentRoomId'],
                        properties: {
                            sessionId: {
                                type: 'string',
                            },
                            userId: {
                                type: 'number',
                                minimum: 1,
                            },
                            externalNet: {
                                properties: {
                                    ipAddress: {
                                        type: 'string',
                                    },
                                    clientPort: {
                                        type: 'number',
                                        minimum: 0,
                                        maximum: 65535,
                                    },
                                    serverPort: {
                                        type: 'number',
                                        minimum: 0,
                                        maximum: 65535,
                                    },
                                    tvPort: {
                                        type: 'number',
                                        minimum: 0,
                                        maximum: 65535,
                                    },
                                },
                            },
                            internalNet: {
                                properties: {
                                    ipAddress: {
                                        type: 'string',
                                    },
                                    clientPort: {
                                        type: 'number',
                                        minimum: 0,
                                        maximum: 65535,
                                    },
                                    serverPort: {
                                        type: 'number',
                                        minimum: 0,
                                        maximum: 65535,
                                    },
                                    tvPort: {
                                        type: 'number',
                                        minimum: 0,
                                        maximum: 65535,
                                    },
                                },
                            },
                            currentChannelServerIndex: {
                                type: 'number',
                            },
                            currentChannelIndex: {
                                type: 'number',
                            },
                            currentRoomId: {
                                type: 'number',
                            },
                        },
                    })
                    return done()
                })
        })
        mocha.it('Should 400 when getting an user\'s session with a string as user ID', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users/session')
                .send({
                    userId: 'bad',
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(400)
                    return done()
                })
        })
        mocha.it('Should 404 when getting a non existing session', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users/session')
                .send({
                    userId: 404,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(404)
                    return done()
                })
        })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/users/session')
                .send({
                    userId: createdUserId,
                })
                .then(() => {
                    chai.request(serviceInstance.app)
                        .delete('/users/' + createdUserId)
                        .send()
                        .then(() => {
                            return done()
                        })
                })
        })
    })

    mocha.describe('PUT /users/session', (): void => {
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
                    chai.request(serviceInstance.app)
                        .post('/users/session')
                        .send({
                            username: 'testuser',
                            password: '222222',
                        }).then((res2: superagent.Response) => {
                            return done()
                        })
                })
        })

        mocha.it('Should change an user\'s session data',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/users/session')
                    .send({
                        userId: createdUserId,
                        externalNet: {
                            clientPort: 32145,
                        },
                        currentRoomId: 323,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Check if the session\'s data was changed successfully',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/users/session')
                    .send({
                        userId: createdUserId,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: ['sessionId',
                                'userId',
                                'externalNet',
                                'internalNet',
                                'currentChannelServerIndex',
                                'currentChannelIndex',
                                'currentRoomId'],
                            properties: {
                                sessionId: {
                                    type: 'string',
                                },
                                userId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                externalNet: {
                                    properties: {
                                        ipAddress: {
                                            type: 'string',
                                        },
                                        clientPort: {
                                            type: 'number',
                                            minimum: 0,
                                            maximum: 65535,
                                        },
                                        serverPort: {
                                            type: 'number',
                                            minimum: 0,
                                            maximum: 65535,
                                        },
                                        tvPort: {
                                            type: 'number',
                                            minimum: 0,
                                            maximum: 65535,
                                        },
                                    },
                                },
                                internalNet: {
                                    properties: {
                                        ipAddress: {
                                            type: 'string',
                                        },
                                        clientPort: {
                                            type: 'number',
                                            minimum: 0,
                                            maximum: 65535,
                                        },
                                        serverPort: {
                                            type: 'number',
                                            minimum: 0,
                                            maximum: 65535,
                                        },
                                        tvPort: {
                                            type: 'number',
                                            minimum: 0,
                                            maximum: 65535,
                                        },
                                    },
                                },
                                currentChannelServerIndex: {
                                    type: 'number',
                                },
                                currentChannelIndex: {
                                    type: 'number',
                                },
                                currentRoomId: {
                                    type: 'number',
                                },
                            },
                        })
                        chai.expect(res.body.externalNet.clientPort).equal(32145)
                        chai.expect(res.body.currentRoomId).equal(323)
                        return done()
                    })
            })
        mocha.it('Should 400 when updating a session with a string as the user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/users/session')
                    .send({
                        userId: 'bad',
                        externalNet: {
                            clientPort: 32145,
                        },
                        currentRoomId: 323,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when changing an unexisting session\'s data',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/users/session/')
                    .send({
                        userId: 404,
                        externalNet: {
                            clientPort: 32145,
                        },
                        currentRoomId: 323,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/users/session')
                .send({
                    userId: createdUserId,
                })
                .then(() => {
                    chai.request(serviceInstance.app)
                        .delete('/users/' + createdUserId)
                        .send()
                        .then(() => {
                            return done()
                        })
                })

        })
    })

    mocha.describe('DELETE /users/session', (): void => {
        let targetUser: number = 0

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users')
                .send({
                    username: 'testuser',
                    playername: 'TestingUser',
                    password: '222222',
                }).then((res: superagent.Response) => {
                    targetUser = res.body.userId
                    chai.request(serviceInstance.app)
                        .post('/users/session')
                        .send({
                            username: 'testuser',
                            password: '222222',
                        })
                        .then((res2: superagent.Response): void => {
                            return done()
                        })
                })
        })

        mocha.it('Should delete an user\'s session', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/users/session')
                .send({
                    userId: targetUser,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    return done()
                })
        })
        mocha.it('Should 404 when deleting the deleted session', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/users/session')
                .send({
                    userId: targetUser,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(404)
                    return done()
                })
        })
        mocha.it('Should 404 when deleting a non existing session', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/users/session')
                .send({
                    userId: 404,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(404)
                    return done()
                })
        })
        mocha.it('Should 400 when deleting a session with a bad query', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/users/session')
                .send({
                    uuuuser: 'bad\s\n\o\r\t',
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(400)
                    return done()
                })
        })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/users/session')
                .send({
                    userId: targetUser,
                })
                .then(() => {
                    chai.request(serviceInstance.app)
                        .delete('/users/' + targetUser)
                        .send()
                        .then(() => {
                            return done()
                        })
                })
        })
    })

    mocha.after((): void => {
        serviceInstance.stop()
    })
})
