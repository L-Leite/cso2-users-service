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

mocha.describe('User Sessions', (): void => {
    let serviceInstance: ServiceInstance

    mocha.before((): void => {
        serviceInstance = new ServiceInstance()
        serviceInstance.listen()
    })

    mocha.describe('POST /sessions', (): void => {
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
                .post('/sessions')
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
                .post('/sessions')
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
                .post('/sessions')
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
                .post('/sessions')
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
                .delete('/sessions')
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

    mocha.describe('GET /sessions', (): void => {
        let targetUser: number = 0
        let targetUser2: number = 0

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
                        .post('/sessions')
                        .send({
                            username: 'testuser',
                            password: '222222',
                        })
                        .then((res2: superagent.Response): void => {
                            chai.request(serviceInstance.app)
                                .post('/users')
                                .send({
                                    username: 'testuser2',
                                    playername: 'Testing User Again',
                                    password: '222222',
                                }).then((res3: superagent.Response) => {
                                    targetUser2 = res3.body.userId
                                    chai.request(serviceInstance.app)
                                        .post('/sessions')
                                        .send({
                                            username: 'testuser2',
                                            password: '222222',
                                        })
                                        .then((res24: superagent.Response): void => {
                                            return done()
                                        })
                                })
                        })
                })
        })

        mocha.it('Should get every session', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/sessions')
                .query({
                    offset: 0,
                    length: 50,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    res.body.should.be.jsonSchema({
                        type: 'array',
                        minItems: 2,
                        items: {
                            type: 'object',
                            required: [
                                'sessionId',
                                'userId',
                                'externalNet',
                                'internalNet',
                                'currentChannelServerIndex',
                                'currentChannelIndex',
                                'currentRoomId',
                            ],
                            properties: {
                                sessionId: {
                                    type: 'string',
                                },
                                userId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                externalNet: {
                                    type: 'object',
                                    required: [
                                        'ipAddress',
                                        'clientPort',
                                        'serverPort',
                                        'tvPort',
                                    ],
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
                                    type: 'object',
                                    required: [
                                        'ipAddress',
                                        'clientPort',
                                        'serverPort',
                                        'tvPort',
                                    ],
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
                        },
                    })
                    return done()
                })
        })

        mocha.it('Should get the first session', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/sessions')
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
                        items: {
                            type: 'object',
                            required: [
                                'sessionId',
                                'userId',
                                'externalNet',
                                'internalNet',
                                'currentChannelServerIndex',
                                'currentChannelIndex',
                                'currentRoomId',
                            ],
                            properties: {
                                sessionId: {
                                    type: 'string',
                                },
                                userId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                externalNet: {
                                    type: 'object',
                                    required: [
                                        'ipAddress',
                                        'clientPort',
                                        'serverPort',
                                        'tvPort',
                                    ],
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
                                    type: 'object',
                                    required: [
                                        'ipAddress',
                                        'clientPort',
                                        'serverPort',
                                        'tvPort',
                                    ],
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
                        },
                    })
                    return done()
                })
        })

        mocha.it('Should get the second user', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/sessions')
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
                        items: {
                            type: 'object',
                            required: [
                                'sessionId',
                                'userId',
                                'externalNet',
                                'internalNet',
                                'currentChannelServerIndex',
                                'currentChannelIndex',
                                'currentRoomId',
                            ],
                            properties: {
                                sessionId: {
                                    type: 'string',
                                },
                                userId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                externalNet: {
                                    type: 'object',
                                    required: [
                                        'ipAddress',
                                        'clientPort',
                                        'serverPort',
                                        'tvPort',
                                    ],
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
                                    type: 'object',
                                    required: [
                                        'ipAddress',
                                        'clientPort',
                                        'serverPort',
                                        'tvPort',
                                    ],
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
                        },
                    })
                    return done()
                })
        })

        mocha.it('Should 400 when getting an user page without query params', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/sessions')
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(400)
                    return done()
                })
        })

        mocha.it('Should 413 when requesting for an oversized users page', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/sessions')
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
                .delete('/sessions')
                .then(() => {
                    chai.request(serviceInstance.app)
                        .delete('/users/' + targetUser)
                        .then(() => {
                            chai.request(serviceInstance.app)
                                .delete('/users/' + targetUser2)
                                .then(() => {
                                    return done()
                                })
                        })
                })
        })
    })

    mocha.describe('DELETE /sessions', (): void => {
        let targetUser: number = 0
        let targetUser2: number = 0

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
                        .post('/sessions')
                        .send({
                            username: 'testuser',
                            password: '222222',
                        })
                        .then((res2: superagent.Response): void => {
                            chai.request(serviceInstance.app)
                                .post('/users')
                                .send({
                                    username: 'testuser2',
                                    playername: 'Testing User Again',
                                    password: '222222',
                                }).then((res3: superagent.Response) => {
                                    targetUser2 = res3.body.userId
                                    chai.request(serviceInstance.app)
                                        .post('/sessions')
                                        .send({
                                            username: 'testuser2',
                                            password: '222222',
                                        })
                                        .then((res24: superagent.Response): void => {
                                            return done()
                                        })
                                })
                        })
                })
        })

        mocha.it('Should delete an user\'s session', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/sessions')
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    return done()
                })
        })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/users/' + targetUser)
                .then(() => {
                    chai.request(serviceInstance.app)
                        .delete('/users/' + targetUser2)
                        .then(() => {
                            return done()
                        })
                })
        })
    })

    mocha.describe('GET /sessions/:ownerId', (): void => {
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
                        .post('/sessions')
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
                .get('/sessions/' + createdUserId)
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
                .get('/sessions/' + 'bad')
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(400)
                    return done()
                })
        })

        mocha.it('Should 404 when getting a non existing session', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/sessions/' + 404)
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(404)
                    return done()
                })
        })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/sessions')
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

    mocha.describe('PUT /sessions/:ownerId', (): void => {
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
                        .post('/sessions')
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
                    .put('/sessions/' + createdUserId)
                    .send({
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
                    .get('/sessions/' + createdUserId)
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
                    .put('/sessions/' + 'bad')
                    .send({
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
                    .put('/sessions/' + 404)
                    .send({
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
                .delete('/sessions/' + createdUserId)
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

    mocha.describe('DELETE /sessions/:ownerId', (): void => {
        let targetUserId: number = 0

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users')
                .send({
                    username: 'testuser',
                    playername: 'TestingUser',
                    password: '222222',
                }).then((res: superagent.Response) => {
                    targetUserId = res.body.userId
                    chai.request(serviceInstance.app)
                        .post('/sessions')
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
                .delete('/sessions/' + targetUserId)
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    return done()
                })
        })

        mocha.it('Should 404 when deleting the deleted session', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/sessions/' + targetUserId)
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(404)
                    return done()
                })
        })

        mocha.it('Should 404 when deleting a non existing session', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/sessions/' + targetUserId)
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
                .delete('/sessions/' + 'bad\r\n')
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(400)
                    return done()
                })
        })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/sessions/' + targetUserId)
                .then(() => {
                    chai.request(serviceInstance.app)
                        .delete('/users/' + targetUserId)
                        .send()
                        .then(() => {
                            return done()
                        })
                })
        })
    })

    mocha.after(async () => {
        await serviceInstance.stop()
    })
})
