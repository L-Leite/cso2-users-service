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

mocha.describe('User\'s loadout', (): void => {
    let serviceInstance: ServiceInstance

    mocha.before(async (): Promise<void> => {
        // start service instance
        serviceInstance = new ServiceInstance()
        await serviceInstance.listen()
    })

    mocha.describe('POST /inventory/:userId/loadout', (): void => {
        mocha.it('Should create new loadouts for an user',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/123456/loadout')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(201)
                        res.body.should.be.jsonSchema({
                            type: 'array',
                            minItems: 3,
                            maxItems: 3,
                            uniqueItems: true,
                            items: {
                                type: 'object',
                                required: [
                                    'ownerId',
                                    'loadoutNum',
                                    'primary',
                                    'secondary',
                                    'melee',
                                    'hegrenade',
                                    'flash',
                                    'smoke',
                                ],
                                properties: {
                                    ownerId: {
                                        type: 'number',
                                        minimum: 1,
                                    },
                                    loadoutNum: {
                                        type: 'number',
                                        minimum: 0,
                                        maximum: 2,
                                    },
                                    primary: {
                                        type: 'number',
                                    },
                                    secondary: {
                                        type: 'number',
                                    },
                                    melee: {
                                        type: 'number',
                                    },
                                    hegrenade: {
                                        type: 'number',
                                    },
                                    flash: {
                                        type: 'number',
                                    },
                                    smoke: {
                                        type: 'number',
                                    },
                                },
                            },
                        })
                        return done()
                    })
            })
        mocha.it('Should 400 when creating new loadouts for an user with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/bad/loadout')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 409 when creating a loadouts while they already exist',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/123456/loadout')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(409)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/loadout')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('GET /inventory/:userId/loadout', (): void => {
        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/123456/loadout')
                .then(() => {
                    return done()
                })

        })

        mocha.it('Should get an user\'s loadout',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/123456/loadout')
                    .send({
                        loadoutNum: 0,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'loadoutNum',
                                'primary',
                                'secondary',
                                'melee',
                                'hegrenade',
                                'flash',
                                'smoke',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                loadoutNum: {
                                    type: 'number',
                                    minimum: 0,
                                    maximum: 2,
                                },
                                primary: {
                                    type: 'number',
                                },
                                secondary: {
                                    type: 'number',
                                },
                                melee: {
                                    type: 'number',
                                },
                                hegrenade: {
                                    type: 'number',
                                },
                                flash: {
                                    type: 'number',
                                },
                                smoke: {
                                    type: 'number',
                                },
                            },
                        })
                        return done()
                    })
            })
        mocha.it('Should 400 when getting an user\'s loadout with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/bad/loadout')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when getting an user\'s loadout with a non existing user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/404/loadout')
                    .send({
                        loadoutNum: 0,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/loadout')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('PUT /inventory/:userId/loadout', (): void => {
        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/123456/loadout')
                .then(() => {
                    return done()
                })
        })

        mocha.it('Should change an user\'s loadout',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/123456/loadout')
                    .send({
                        loadoutNum: 0,
                        primary: 52180,
                        hegrenade: 532468,
                        flash: 33214,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Check if the loadout was changed successfully',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/123456/loadout')
                    .send({
                        loadoutNum: 0,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'loadoutNum',
                                'primary',
                                'secondary',
                                'melee',
                                'hegrenade',
                                'flash',
                                'smoke',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                loadoutNum: {
                                    type: 'number',
                                    minimum: 0,
                                    maximum: 2,
                                },
                                primary: {
                                    type: 'number',
                                },
                                secondary: {
                                    type: 'number',
                                },
                                melee: {
                                    type: 'number',
                                },
                                hegrenade: {
                                    type: 'number',
                                },
                                flash: {
                                    type: 'number',
                                },
                                smoke: {
                                    type: 'number',
                                },
                            },
                        })
                        chai.expect(res.body.primary).equal(52180)
                        chai.expect(res.body.hegrenade).equal(532468)
                        chai.expect(res.body.flash).equal(33214)
                        return done()
                    })
            })
        mocha.it('Should 400 when changing a loadout with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/bad/loadout')
                    .send({
                        primary: 52180,
                        hegrenade: 532468,
                        flash: 33214,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 400 when changing a loadout with an invalid loadout slot',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/bad/loadout')
                    .send({
                        loadoutNum: 3,
                        primary: 52180,
                        hegrenade: 532468,
                        flash: 33214,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when changing an unexisting loadout cosmetic slots',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/456789/loadout')
                    .send({
                        loadoutNum: 0,
                        primary: 52180,
                        hegrenade: 532468,
                        flash: 33214,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/loadout')
                .then(() => {
                    return done()
                })
        })
    })

    mocha.describe('DELETE /inventory/:userId/loadout', (): void => {
        const firstOwner: number = 123456
        const secondOwner: number = 654321

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/' + firstOwner + '/loadout')
                .then(() => {
                    chai.request(serviceInstance.app)
                        .post('/inventory/' + secondOwner + '/loadout')
                        .then(() => {
                            return done()
                        })
                })
        })

        mocha.it('Should delete an user\'s loadouts',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/' + firstOwner + '/loadout')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Should 404 when getting a deleted loadout',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/404/loadout')
                    .send({
                        loadoutNum: 0,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })
        mocha.it('Should 400 when deleting a loadouts with a string as owner ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/bad/loadout')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when deleting loadouts with a non existing owner ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/404/loadout')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/' + secondOwner + '/loadout')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.after(async (): Promise<void> => {
        await serviceInstance.stop()
    })
})
