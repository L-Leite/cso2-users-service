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

mocha.describe('User\'s buy menu', (): void => {
    let serviceInstance: ServiceInstance

    mocha.before(async (): Promise<void> => {
        // start service instance
        serviceInstance = new ServiceInstance()
        await serviceInstance.listen()
    })

    mocha.describe('POST /inventory/:userId/buymenu', (): void => {
        mocha.it('Should create a new buymenu for an user',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/123456/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(201)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'pistols',
                                'shotguns',
                                'smgs',
                                'rifles',
                                'snipers',
                                'machineguns',
                                'melees',
                                'equipment',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'integer',
                                    minimum: 1,
                                },
                                pistols: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                shotguns: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                smgs: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                rifles: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                snipers: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                machineguns: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                melees: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                equipment: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                            },
                        })
                        return done()
                    })
            })
        mocha.it('Should 400 when creating a new buymenu for an user with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/bad/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 409 when creating a buymenu while it already exists',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/123456/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(409)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/buymenu')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('GET /inventory/:userId/buymenu', (): void => {
        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/123456/buymenu')
                .then(() => {
                    return done()
                })

        })

        mocha.it('Should get an user\'s buy menu',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/123456/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'pistols',
                                'shotguns',
                                'smgs',
                                'rifles',
                                'snipers',
                                'machineguns',
                                'melees',
                                'equipment',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'integer',
                                    minimum: 1,
                                },
                                pistols: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                shotguns: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                smgs: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                rifles: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                snipers: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                machineguns: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                melees: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                equipment: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                            },
                        })
                        return done()
                    })
            })
        mocha.it('Should 400 when getting an user\'s buy menu with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/bad/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when getting an user\'s buy menu with a non existing user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/404/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/buymenu')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('PUT /inventory/:userId/buymenu', (): void => {
        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/123456/buymenu')
                .then(() => {
                    return done()
                })
        })

        mocha.it('Should change an user\'s buy menu',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/123456/buymenu')
                    .send({
                        smgs: [
                            5251,
                            5295,
                            162,
                            5132,
                            5346,
                            5320,
                            5287,
                            5321,
                            5310,
                        ],
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Check if the buy menu was changed successfully',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/123456/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'pistols',
                                'shotguns',
                                'smgs',
                                'rifles',
                                'snipers',
                                'machineguns',
                                'melees',
                                'equipment',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'integer',
                                    minimum: 1,
                                },
                                pistols: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                shotguns: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                smgs: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                rifles: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                snipers: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                machineguns: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                melees: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                equipment: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                            },
                        })
                        chai.expect(res.body.smgs).to.deep.equal([
                            5251,
                            5295,
                            162,
                            5132,
                            5346,
                            5320,
                            5287,
                            5321,
                            5310,
                        ])
                        return done()
                    })
            })
        mocha.it('Should 400 when changing a buy menu with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/bad/buymenu')
                    .send({
                        smgs: [
                            5251,
                            5295,
                            162,
                            5132,
                            5346,
                            5320,
                            5287,
                            5321,
                            5310,
                        ],
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when changing an non existing buy menu',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/456789/buymenu')
                    .send({
                        smgs: [
                            5251,
                            5295,
                            162,
                            5132,
                            5346,
                            5320,
                            5287,
                            5321,
                            5310,
                        ],
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/buymenu')
                .then(() => {
                    return done()
                })
        })
    })

    mocha.describe('DELETE /inventory/:userId/buymenu', (): void => {
        const firstOwner: number = 123456
        const secondOwner: number = 654321

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/' + firstOwner + '/buymenu')
                .then(() => {
                    chai.request(serviceInstance.app)
                        .post('/inventory/' + secondOwner + '/buymenu')
                        .then(() => {
                            return done()
                        })
                })

        })

        mocha.it('Should delete an user\'s buy menu',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/' + firstOwner + '/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Should 404 when getting a deleted buy menu',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/404/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })
        mocha.it('Should 400 when deleting a buy menu with a string as the owner\'s ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/bad/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when deleting a buy menu with a non existing owner ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/404/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/' + secondOwner + '/buymenu')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.after(async (): Promise<void> => {
        await serviceInstance.stop()
    })
})
