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

mocha.describe('User\'s cosmetics', (): void => {
    let serviceInstance: ServiceInstance

    mocha.before(async (): Promise<void> => {
        // start service instance
        serviceInstance = new ServiceInstance()
        await serviceInstance.listen()
    })

    mocha.describe('POST /inventory/:userId/cosmetics', (): void => {
        mocha.it('Should create new user\'s cosmetics slots',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/123456/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(201)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'ctItem',
                                'terItem',
                                'headItem',
                                'gloveItem',
                                'backItem',
                                'stepsItem',
                                'cardItem',
                                'sprayItem',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                ctItem: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                terItem: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                headItem: {
                                    type: 'number',
                                },
                                gloveItem: {
                                    type: 'number',
                                },
                                backItem: {
                                    type: 'number',
                                },
                                stepsItem: {
                                    type: 'number',
                                },
                                cardItem: {
                                    type: 'number',
                                },
                                sprayItem: {
                                    type: 'number',
                                },
                            },
                        })
                        return done()
                    })
            })
        mocha.it('Should 400 when creating new user\'s cosmetics slots with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/bad/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 409 when creating a new inventory with an existing userId',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/123456/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(409)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/cosmetics')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('GET /inventory/:userId/cosmetics', (): void => {
        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/123456/cosmetics')
                .then(() => {
                    return done()
                })

        })

        mocha.it('Should get an user\'s currently equipped cosmetics',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/123456/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'ctItem',
                                'terItem',
                                'headItem',
                                'gloveItem',
                                'backItem',
                                'stepsItem',
                                'cardItem',
                                'sprayItem',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                ctItem: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                terItem: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                headItem: {
                                    type: 'number',
                                },
                                gloveItem: {
                                    type: 'number',
                                },
                                backItem: {
                                    type: 'number',
                                },
                                stepsItem: {
                                    type: 'number',
                                },
                                cardItem: {
                                    type: 'number',
                                },
                                sprayItem: {
                                    type: 'number',
                                },
                            },
                        })
                        return done()
                    })
            })
        mocha.it('Should 400 when getting an user\'s currently equipped cosmetics with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/bad/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when getting an user\'s currently equipped cosmetics with a non existing user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/404/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/cosmetics')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('PUT /inventory/:userId/cosmetics', (): void => {
        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/123456/cosmetics')
                .then(() => {
                    return done()
                })
        })

        mocha.it('Should change an user\'s cosmetics slots',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/123456/cosmetics')
                    .send({
                        headItem: 10046,
                        gloveItem: 30009,
                        sprayItem: 42009,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Check if the cosmetic slots were changed successfully',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/123456/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'ctItem',
                                'terItem',
                                'headItem',
                                'gloveItem',
                                'backItem',
                                'stepsItem',
                                'cardItem',
                                'sprayItem',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                ctItem: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                terItem: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                headItem: {
                                    type: 'number',
                                },
                                gloveItem: {
                                    type: 'number',
                                },
                                backItem: {
                                    type: 'number',
                                },
                                stepsItem: {
                                    type: 'number',
                                },
                                cardItem: {
                                    type: 'number',
                                },
                                sprayItem: {
                                    type: 'number',
                                },
                            },
                        })
                        chai.expect(res.body.headItem).equal(10046)
                        chai.expect(res.body.gloveItem).equal(30009)
                        chai.expect(res.body.sprayItem).equal(42009)
                        return done()
                    })
            })
        mocha.it('Should 400 when creating new user\'s cosmetics slots with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/bad/cosmetics')
                    .send({
                        headItem: 10046,
                        gloveItem: 30009,
                        sprayItem: 42009,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when changing an unexisting user\'s cosmetic slots',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/876543/cosmetics')
                    .send({
                        headItem: 10046,
                        gloveItem: 30009,
                        sprayItem: 42009,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/cosmetics')
                .then(() => {
                    return done()
                })
        })
    })

    mocha.describe('DELETE /inventory/:userId/cosmetics', (): void => {
        const firstOwner: number = 123456
        const secondOwner: number = 654321

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/' + firstOwner + '/cosmetics')
                .then(() => {
                    chai.request(serviceInstance.app)
                        .post('/inventory/' + secondOwner + '/cosmetics')
                        .then(() => {
                            return done()
                        })
                })

        })

        mocha.it('Should delete an user inventory',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/' + firstOwner + '/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Should 404 when getting the deleted inventory',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/404/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })
        mocha.it('Should 400 when deleting an inventory with a string as owner ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/bad/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when deleting a non existing inventory',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/404/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/' + secondOwner + '/cosmetics')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.after(async (): Promise<void> => {
        await serviceInstance.stop()
    })
})
