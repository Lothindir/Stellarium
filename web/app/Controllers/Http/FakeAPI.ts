import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class FakeAPI {
    public async genericCall({ request, auth, response }: HttpContextContract) {
        try {
            const api = request.input('api');
            switch (api) {
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
                            carb: { curr: 625, max: 1000 },
                            recharge: 100,
                            equipements: [
                                { name: 'Blaster', effect: 'Attaque +6', cost: 'Equipé' },
                                { name: 'Canon ionic', effect: 'Attaque +33', cost: 'Equipé' },
                                { name: 'Pompe à proton', effect: 'Carburant +26', cost: '8 2 6' },
                                { name: 'Panneau stellaire', effect: 'Recharge +12', cost: '2 3 4' },
                            ]
                        }
                    };
                case "AttackOrColonize": {
                    const planetID = request.input('planetID');
                    // Different types of response depending on planet ID
                    switch (planetID) {
                        case "1":
                            return {
                                result: {
                                    type: 'combat',
                                    actionSuccessful: true,
                                    outcome: 'victory'
                                }
                            }
                        case "2":
                            return {
                                result: {
                                    type: 'combat',
                                    actionSuccessful: true,
                                    outcome: 'defeat'
                                }
                            }
                        case "3":
                            return {
                                result: {
                                    type: 'colonization',
                                    actionSuccessful: true,
                                    outcome: 'colonized'
                                }
                            }
                        default:
                            return {
                                type: 'error',
                                actionSuccessful: false,
                                outcome: 'fuel'
                            }
                    }
                }
                case "Move": {
                    const planetID = request.input('planetID');
                    // Different types of response depending on planet ID
                    switch (planetID) {
                        case "1":
                            return {
                                move: {
                                    actionSuccessful: true,
                                    outcome: 'moved'
                                }
                            }
                        default:
                            return {
                                move: {
                                    actionSuccessful: false,
                                    outcome: 'fuel'
                                }
                            }
                    }
                }
                case "Improve": {
                    const planetID = request.input('planetID');
                    const buildingType = request.input('buildingType');
                    switch (planetID) {
                        case 1:
                            return {
                                building: {
                                    actionSuccessful: true,
                                    buildingType: buildingType,
                                    outcome: 'built'
                                }
                            }
                        default:
                            return {
                                building: {
                                    actionSuccessful: false,
                                    buildingType: buildingType,
                                    outcome: 'resources'
                                }
                            }
                    }
                }
                case "UpgradeShip": {
                    const upgradeType = request.input('upgradeType');
                    switch (upgradeType) {
                        case "weapons":
                            return {
                                shipUpgrade: {
                                    actionSuccessful: true,
                                    upgradeType: upgradeType,
                                    upgradeName: 'Canon à rotation'
                                }
                            }
                        case "maxFuel":
                            return {
                                shipUpgrade: {
                                    actionSuccessful: true,
                                    upgradeType: upgradeType,
                                    upgradeName: 'Truc pour mettre du carburant'
                                }
                            }
                        case "fuelRecharge":
                            return {
                                shipUpgrade: {
                                    actionSuccessful: false,
                                    upgradeType: upgradeType,
                                    error: 'Ressources insuffisantes'
                                }
                            }
                        default:
                            return {
                                shipUpgrade: {
                                    actionSuccessful: false,
                                    upgradeType: upgradeType,
                                    error: 'unknown'
                                }
                            }
                    }
                }
                case "ValidateChallenge": {
                    const challengeNumber = request.input('challengeNumber');
                    const challengeResponse = request.input('challengeResponse');
                    const SECRET = "test"
                    var crypto = require('crypto')
                    var shasum = crypto.createHash('sha1')
                    var challengeIDString = challengeNumber.toString().padStart(3, '0')
                    shasum.update(challengeIDString + SECRET)
                    var computedResponse = shasum.digest('hex').slice(-6).toUpperCase()
                    var result = (computedResponse === challengeResponse)
                    return {
                        challengeValidation: {
                            actionSuccessful: result
                        }
                    }
                }
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
                message: 'Mauvais paramètres !'
            })
        }

    }
}