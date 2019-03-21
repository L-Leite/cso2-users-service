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

mocha.describe('User\'s inventory', (): void => {
    let serviceInstance: ServiceInstance

    mocha.before((): void => {
        // start service instance
        serviceInstance = new ServiceInstance()
        serviceInstance.listen()
    })

    mocha.describe('GET /users/:userId/inventory', (): void => {
        mocha.it('Should get an user\'s inventory items', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users/123456/inventory')
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    res.body.should.be.jsonSchema({
                        type: 'array',
                        items: {
                            type: 'object',
                            required: ['itemId', 'ammount'],
                            properties: {
                                itemId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                ammount: {
                                    type: 'number',
                                    minimum: 1,
                                },
                            },
                        },
                    })
                    done()
                })
        })
        mocha.it('Should 400 when getting an user\'s inventory items with a string as user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/users/bad/inventory')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 404 when getting an user\'s inventory items with a non existing user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/users/404/inventory')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        done()
                    })
            })
    })

    mocha.describe('POST /users/:userId/inventory', (): void => {
        mocha.it('Should create an item in the user\'s inventory', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users/123456/inventory')
                .send({
                    itemId: 10092,
                    ammount: 1,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    done()
                })
        })
        mocha.it('Should 400 when creating an item in the user\'s inventory with invalid params',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/users/123456/inventory')
                    .send({
                        broken: 'yes',
                        params: 'bad',
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 400 when creating an item in the user\'s inventory with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/users/fake/inventory')
                    .send({
                        itemId: 10092,
                        ammount: 1,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 400 when creating an item in the user\'s inventory with both '
            + 'invalid params and an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/users/fake/inventory')
                    .send({
                        broken: 'yes',
                        params: 'bad',
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 404 when creating an item in the user\'s inventory with an non existing user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/users/404/inventory')
                    .send({
                        itemId: 10092,
                        ammount: 1,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        done()
                    })
            })
    })

    mocha.describe('DELETE /users/:userId/inventory', (): void => {
        mocha.it('Should delete an item in the user\'s inventory', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/users/123456/inventory')
                .send({
                    itemId: 10092,
                    ammount: 1,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    done()
                })
        })
        mocha.it('Should 400 when deleting an item in the user\'s inventory with invalid params',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/users/123456/inventory')
                    .send({
                        broken: 'yes',
                        params: 'bad',
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 400 when deleting an item in the user\'s inventory with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/users/fake/inventory')
                    .send({
                        itemId: 10092,
                        ammount: 1,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 400 when deleting an item in the user\'s inventory with both '
            + 'invalid params and an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/users/fake/inventory')
                    .send({
                        broken: 'yes',
                        params: 'bad',
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 404 when deleting an item in the user\'s inventory with an non existing user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/users/404/inventory')
                    .send({
                        itemId: 10092,
                        ammount: 1,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        done()
                    })
            })
    })

    mocha.describe('GET /users/:userId/inventory/cosmetics', (): void => {
        mocha.it('Should get an user\'s currently equipped cosmetics', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users/123456/inventory/cosmetics')
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    res.body.should.be.jsonSchema({
                        type: 'object',
                        required: ['ctItem',
                            'terItem',
                            'headItem',
                            'gloveItem',
                            'backItem',
                            'stepsItem',
                            'cardItem',
                            'sprayItem',
                        ],
                        properties: {
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
                                minimum: 1,
                            },
                            gloveItem: {
                                type: 'number',
                                minimum: 1,
                            },
                            backItem: {
                                type: 'number',
                                minimum: 1,
                            },
                            stepsItem: {
                                type: 'number',
                                minimum: 1,
                            },
                            cardItem: {
                                type: 'number',
                                minimum: 1,
                            },
                            sprayItem: {
                                type: 'number',
                                minimum: 1,
                            },
                        },
                    })
                    done()
                })
        })
        mocha.it('Should 400 when getting an user\'s currently equipped cosmetics with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/users/bad/inventory/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 404 when getting an user\'s currently equipped cosmetics with a non existing user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/users/404/inventory/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        done()
                    })
            })
    })

    mocha.describe('POST /users/:userId/inventory/cosmetics', (): void => {
        mocha.it('Should set the user\'s equipped cosmetics', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users/123456/inventory/cosmetics')
                .send({
                    ctItem: 1033,
                    terItem: 1034,
                    headItem: 10062,
                    gloveItem: 30018,
                    backItem: 20042,
                    stepsItem: 40016,
                    cardItem: 60001,
                    sprayItem: 42003,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    done()
                })
        })
        mocha.it('Should 400 when setting the user\'s equipped cosmetics with invalid params',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/users/123456/inventory/cosmetics')
                    .send({
                        broken: 'yes',
                        params: 'bad',
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 400 when setting the user\'s equipped cosmetics with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/users/fake/inventory/cosmetics')
                    .send({
                        ctItem: 1033,
                        terItem: 1034,
                        headItem: 10062,
                        gloveItem: 30018,
                        backItem: 20042,
                        stepsItem: 40016,
                        cardItem: 60001,
                        sprayItem: 42003,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 400 when setting the user\'s equipped cosmetics with both '
            + 'invalid params and an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/users/fake/inventory/cosmetics')
                    .send({
                        broken: 'yes',
                        params: 'bad',
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 404 when setting the user\'s equipped cosmetics with an non existing user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/users/404/inventory/cosmetics')
                    .send({
                        ctItem: 1033,
                        terItem: 1034,
                        headItem: 10062,
                        gloveItem: 30018,
                        backItem: 20042,
                        stepsItem: 40016,
                        cardItem: 60001,
                        sprayItem: 42003,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        done()
                    })
            })
    })

    mocha.describe('GET /users/:userId/inventory/loadout', (): void => {
        mocha.it('Should get an user\'s specific loadout items', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users/123456/inventory/loadout')
                .send({
                    loadoutNum: 0,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    res.body.should.be.jsonSchema({
                        type: 'object',
                        required: ['loadoutNum',
                            'primary',
                            'secondary',
                            'melee',
                            'hegrenade',
                            'flash',
                            'smoke',
                        ],
                        properties: {
                            loadoutNum: {
                                type: 'number',
                                minimum: 0,
                                maximum: 2,
                            },
                            primary: {
                                type: 'number',
                                minimum: 1,
                            },
                            secondary: {
                                type: 'number',
                                minimum: 1,
                            },
                            melee: {
                                type: 'number',
                                minimum: 1,
                            },
                            hegrenade: {
                                type: 'number',
                                minimum: 1,
                            },
                            flash: {
                                type: 'number',
                                minimum: 1,
                            },
                            smoke: {
                                type: 'number',
                                minimum: 1,
                            },
                        },
                    })
                    done()
                })
        })
        mocha.it('Should 400 when getting an user\'s specific loadout items with a bad user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/users/bad/inventory/loadout')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 404 when getting an user\'s specific loadout items with a non existing user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/users/404/inventory/loadout')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        done()
                    })
            })
    })

    mocha.describe('POST /users/:userId/inventory/loadout', (): void => {
        mocha.it('Should set the user\'s specific loadout items', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users/123456/inventory/loadout')
                .send({
                    loadoutNum: 0,
                    primary: 5218,
                    secondary: 5288,
                    melee: 84,
                    hegrenade: 4,
                    flash: 23,
                    smoke: 8,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    done()
                })
        })
        mocha.it('Should 400 when setting the user\'s specific loadout items with invalid params',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/users/123456/inventory/loadout')
                    .send({
                        broken: 'yes',
                        params: 'bad',
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 400 when setting the user\'s specific loadout items with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/users/fake/inventory/loadout')
                    .send({
                        loadoutNum: 0,
                        primary: 5218,
                        secondary: 5288,
                        melee: 84,
                        hegrenade: 4,
                        flash: 23,
                        smoke: 8,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 400 when setting the user\'s specific loadout items with both '
            + 'invalid params and an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/users/fake/inventory/loadout')
                    .send({
                        broken: 'yes',
                        params: 'bad',
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 404 when setting the user\'s specific loadout items with an non existing user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/users/404/inventory/loadout')
                    .send({
                        loadoutNum: 0,
                        primary: 5218,
                        secondary: 5288,
                        melee: 84,
                        hegrenade: 4,
                        flash: 23,
                        smoke: 8,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        done()
                    })
            })
    })

    mocha.describe('GET /users/:userId/inventory/buymenu', (): void => {
        mocha.it('Should get an user\'s buy menu items', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .get('/users/123456/inventory/buymenu')
                .send({
                    loadoutNum: 0,
                })
                .end((err: Error, res: superagent.Response): void => {
                    res.should.be.status(200)
                    res.body.should.be.jsonSchema({
                        type: 'object',
                        required: ['pistols',
                            'shotguns',
                            'smgs',
                            'rifles',
                            'snipers',
                            'machineguns',
                            'melees',
                            'equipment',
                        ],
                        properties: {
                            pistols: {
                                type: 'array',
                                items: {
                                    type: 'number',
                                    minimum: 1,
                                },
                            },
                            shotguns: {
                                type: 'array',
                                items: {
                                    type: 'number',
                                    minimum: 1,
                                },
                            },
                            smgs: {
                                type: 'array',
                                items: {
                                    type: 'number',
                                    minimum: 1,
                                },
                            },
                            rifles: {
                                type: 'array',
                                items: {
                                    type: 'number',
                                    minimum: 1,
                                },
                            },
                            snipers: {
                                type: 'array',
                                items: {
                                    type: 'number',
                                    minimum: 1,
                                },
                            },
                            machineguns: {
                                type: 'array',
                                items: {
                                    type: 'number',
                                    minimum: 1,
                                },
                            },
                            melees: {
                                type: 'array',
                                items: {
                                    type: 'number',
                                    minimum: 1,
                                },
                            },
                            equipment: {
                                type: 'array',
                                items: {
                                    type: 'number',
                                    minimum: 1,
                                },
                            },
                        },
                    })
                    done()
                })
        })
        mocha.it('Should 400 when getting an user\'s buy menu items with a bad user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/users/bad/inventory/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 404 when getting an user\'s buy menu items with a non existing user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/users/404/inventory/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        done()
                    })
            })
    })

    mocha.describe('POST /users/:userId/inventory/buymenu', (): void => {
        mocha.it('Should set the user\'s buy sub menu items', (done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/users/123456/inventory/buymenu')
                .send({
                    index: 2,
                    weapons: [
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
                    done()
                })
        })
        mocha.it('Should 400 when setting the user\'s buy sub menu items with invalid params',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/users/123456/inventory/buymenu')
                    .send({
                        broken: 'yes',
                        params: 'bad',
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 400 when setting the user\'s buy sub menu items with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/users/fake/inventory/buymenu')
                    .send({
                        index: 2,
                        weapons: [
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
                        done()
                    })
            })
        mocha.it('Should 400 when setting the user\'s buy sub menu items with both '
            + 'invalid params and an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/users/fake/inventory/buymenu')
                    .send({
                        broken: 'yes',
                        params: 'bad',
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        done()
                    })
            })
        mocha.it('Should 404 when setting the user\'s buy sub menu items with an non existing user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/users/404/inventory/buymenu')
                    .send({
                        index: 2,
                        weapons: [
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
                        done()
                    })
            })
    })

    mocha.after((): void => {
        serviceInstance.stop()
    })
})
