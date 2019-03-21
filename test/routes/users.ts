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
        // start service instance
        serviceInstance = new ServiceInstance()
        serviceInstance.listen()
    })

    mocha.describe('GET /users', (): void => {
        mocha.it('Should get every user', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users')
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    res.body.should.be.jsonSchema({
                        type: 'array',
                        items: {
                            type: 'object',
                            required: ['userId', 'username', 'playername'],
                            properties: {
                                userId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                username: {
                                    type: 'string',
                                },
                                playername: {
                                    type: 'string',
                                },
                            },
                        },
                    })
                    done()
                })
        })
        mocha.it('Should 400 when getting every user with query parameters', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users')
                .query({ badParam: 123 })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(400)
                    done()
                })
        })
    })

    mocha.describe('GET /users/:userId', (): void => {
        mocha.it('Should get a specific user', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users/123456')
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    res.body.should.be.jsonSchema({
                        type: 'object',
                        required: ['userId',
                            'username',
                            'playername',
                            'level',
                            'currentXp',
                            'maxXp',
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
                            username: {
                                type: 'string',
                            },
                            playername: {
                                type: 'string',
                            },
                            level: {
                                type: 'number',
                                minimum: 1,
                                maximum: 100, // TODO: what's the max?
                            },
                            currentXp: {
                                type: 'number',
                                minimum: 0,
                            },
                            max: {
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
                    done()
                })
        })
        mocha.it('Should 400 when getting an user with a string as user ID', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users/bad')
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(400)
                    done()
                })
        })
        mocha.it('Should 404 when getting a non existing user', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users/404')
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(404)
                    done()
                })
        })
    })

    mocha.describe('POST /users/signup', (): void => {
        mocha.it('Should create a new user', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users/signup')
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
                    done()
                })
        })
        mocha.it('Should 400 when creating a new user with bad query parameters', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users/signup')
                .send({
                    badparam: 'testuser',
                    ugly: 'TestingUser',
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(400)
                    done()
                })
        })
        mocha.it('Should 409 when creating a new user with an existing username/playername',
            (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users/signup')
                .send({
                    username: 'testuser',
                    playername: 'TestingUser',
                    password: '222222',
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(409)
                    done()
                })
        })
    })

    // TODO: create a new user then test it
    mocha.describe('PUT /users/login', (): void => {
        mocha.it('Should login an user', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .put('/users/login')
                .send({
                    username: 'testuser',
                    password: '222222',
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    res.body.should.be.jsonSchema({
                        type: 'object',
                        required: ['userId', 'username', 'playername'],
                        properties: {
                            userId: {
                                type: 'number',
                                minimum: 1,
                            },
                            username: {
                                type: 'string',
                            },
                            playername: {
                                type: 'string',
                            },
                        },
                    })
                    done()
                })
        })
        mocha.it('Should 400 when logging in an user with a bad query',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/users/login')
                    .send({
                        uuuuser: 'yes\n\r\t',
                        aeiou: 6789,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 401 when logging in an user with bad credentials',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/users/login')
                    .send({
                        username: 'baduser',
                        password: 'badpassword',
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(401)
                        done()
                    })
            })
    })

    mocha.describe('PUT /users/logout', (): void => {
        mocha.it('Should logout an user', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .put('/users/logout')
                .send({
                    userId: 123,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    done()
                })
        })
        mocha.it('Should 400 when logging out an user with a bad query',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/users/login')
                    .send({
                        uuuuser: 'bad\s\n\o\r\t',
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
    })

    mocha.after((): void => {
        serviceInstance.stop()
    })
})
