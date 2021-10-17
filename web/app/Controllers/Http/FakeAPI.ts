import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class FakeAPI {
    public async genericCall({ request, auth, response }: HttpContextContract) {
        try {
            const api = request.input('api');
            switch(api) {
                case "GetVisiblePlanets":
                    return {
                        galaxies: [
                            { name: 'Theotar', prod: '2 2 5 2', def: '53', dist: '324' },
                            { name: 'Mutune', prod: '1 3 2 1', def: '33', dist: '498' }
                        ]
                    };
                case "GetShip":
                    return {
                        ship: {
                            pa: 55,
                            carb: {curr: 625, max: 1000},
                            recharge: 100,
                            equipements: [
                              {name: 'Blaster', effect: 'Attaque +6', cost: 'Equipé'},
                              {name: 'Canon ionic', effect: 'Attaque +33', cost: 'Equipé'},
                              {name: 'Pompe à proton', effect: 'Carburant +26', cost: '8 2 6'},
                              {name: 'Panneau stellaire', effect: 'Recharge +12', cost: '2 3 4'},
                            ]
                          }
                    };
                default:
                    return {
                        Error: [
                            { name: 'error', reason: 'wrongAPI' }
                        ]
                    };
            }
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                status: 'error',
                message: 'Identifiants invalides'
            })
        }

    }
}