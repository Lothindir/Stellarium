import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class FakeAPI {
  public async genericCall({ request, auth, response }: HttpContextContract) {
    try {
      const api = request.input('api');
      const planets = [
        {
          id: '0',
          name: 'Theotar',
          planetOwnerID: 21,
          production: { metal: 2, energy: 3, biomass: 2, water: 5 },
          defenseLevel: 2,
          distance: 324,
          accessible: false,
          isAttackable: true,
          isColonizable: false,
          isAlly: false,
        },
        {
          id: '1',
          name: 'Mutune',
          planetOwnerID: 13,
          production: { metal: 1, energy: 3, biomass: 2, water: 1 },
          defenseLevel: 1,
          distance: 10,
          accessible: true,
          isAttackable: true,
          isColonizable: false,
          isAlly: false,
        },
        {
          id: '2',
          name: 'Xolmilia',
          planetOwnerID: 0,
          production: { metal: 1, energy: 2, biomass: 0, water: 2 },
          defenseLevel: 0,
          distance: 3389,
          accessible: false,
          isAttackable: true,
          isColonizable: true,
          isAlly: false,
        },
        {
          id: '3',
          name: 'Bulezuno',
          planetOwnerID: 1,
          production: { metal: 2, energy: 2, biomass: 2, water: 2 },
          defenseLevel: 3,
          distance: 0,
          accessible: true,
          isAttackable: false,
          isColonizable: false,
          isAlly: true,
        },
        {
          id: '4',
          name: 'Lamoahiri',
          planetOwnerID: 14,
          production: { metal: 1, energy: 3, biomass: 2, water: 1 },
          defenseLevel: 4,
          distance: 39,
          accessible: true,
          isAttackable: false,
          isColonizable: false,
          isAlly: false,
        },
      ];
      switch (api) {
        case 'GetVisiblePlanetsNew':
          return {
            planets: planets.concat(planets).concat(planets).concat(planets).concat(planets),
          };
        case 'GetVisiblePlanets':
          return {
            galaxies: [
              { name: 'Theotar', prod: '2 2 5 2', def: '53', dist: '324' },
              { name: 'Mutune', prod: '1 3 2 1', def: '33', dist: '498' },
              { name: 'Xolmilia', prod: '2 2 1 4', def: '23', dist: '3389' },
              { name: 'Bulezuno', prod: '3 2 1 2', def: '12', dist: '0' },
              { name: 'Lamoahiri', prod: '2 2 2 2', def: '42', dist: '39' },
              { name: 'Mutune', prod: '1 3 2 1', def: '33', dist: '498' },
              { name: 'Xolmilia', prod: '2 2 1 4', def: '23', dist: '3389' },
              { name: 'Bulezuno', prod: '3 2 1 2', def: '12', dist: '0' },
              { name: 'Lamoahiri', prod: '2 2 2 2', def: '42', dist: '39' },
            ],
          };
        case 'GetShip':
          return {
            ship: {
              pa: 3,
              carb: { curr: 625, max: 1000 },
              recharge: 100,
              equipements: [
                { name: 'Blaster', effect: 'Attaque +6', cost: 'Equipé' },
                { name: 'Canon ionic', effect: 'Attaque +33', cost: 'Equipé' },
                { name: 'Pompe à proton', effect: 'Carburant +26', cost: '8 2 6' },
                { name: 'Panneau stellaire', effect: 'Recharge +12', cost: '2 3 4' },
              ],
            },
          };
        case 'AttackOrColonize': {
          const planetID = request.input('planetID');
          // Different types of response depending on planet ID
          switch (planetID) {
            case '1':
              return {
                result: {
                  type: 'combat',
                  actionSuccessful: true,
                  outcome: 'victory',
                },
              };
            case '2':
              return {
                result: {
                  type: 'combat',
                  actionSuccessful: true,
                  outcome: 'defeat',
                },
              };
            case '3':
              return {
                result: {
                  type: 'colonization',
                  actionSuccessful: true,
                  outcome: 'colonized',
                },
              };
            default:
              return {
                result: {
                  type: 'error',
                  actionSuccessful: false,
                  error: 'fuel',
                },
              };
          }
        }
        case 'Move': {
          const planetID = request.input('planetID');
          // Different types of response depending on planet ID
          switch (planetID) {
            case '1':
              return {
                move: {
                  actionSuccessful: true,
                  outcome: 'moved',
                },
              };
            default:
              return {
                move: {
                  actionSuccessful: false,
                  outcome: 'fuel',
                },
              };
          }
        }
        case 'FreeMove': {
          const planetID = request.input('planetID');
          // Always authorized to move
          const firstTime = true
          const planetFromTrial = true
          if (firstTime && planetFromTrial) {
            return {
              move: {
                actionSuccessful: true,
                outcome: 'moved',
              },
            };
          } else {
            return {
              move: {
                actionSuccessful: false,
                outcome: 'cheaterShouldBeBanned',
              },
            }
          }
        }
        case 'Improve': {
          const planetID = request.input('planetID');
          const buildingType = request.input('buildingType');
          switch (planetID) {
            case '1':
              return {
                building: {
                  actionSuccessful: true,
                  buildingType: buildingType,
                  outcome: 'built',
                },
              };
            default:
              return {
                building: {
                  actionSuccessful: false,
                  buildingType: buildingType,
                  outcome: 'resources',
                },
              };
          }
        }
        case 'UpgradeShip': {
          const upgradeType = request.input('upgradeType');
          switch (upgradeType) {
            case 'weapons':
              return {
                shipUpgrade: {
                  actionSuccessful: true,
                  upgradeType: upgradeType,
                  upgradeName: 'Canon à rotation',
                },
              };
            case 'maxFuel':
              return {
                shipUpgrade: {
                  actionSuccessful: true,
                  upgradeType: upgradeType,
                  upgradeName: 'Truc pour mettre du carburant',
                },
              };
            case 'fuelRecharge':
              return {
                shipUpgrade: {
                  actionSuccessful: false,
                  upgradeType: upgradeType,
                  error: 'Ressources insuffisantes',
                },
              };
            default:
              return {
                shipUpgrade: {
                  actionSuccessful: false,
                  upgradeType: upgradeType,
                  error: 'unknown',
                },
              };
          }
        }
        case 'ValidateTrial': {
          const trialNumber = request.input('trialNumber');
          const trialResponse = request.input('trialResponse');
          const SECRET = 'test';
          var crypto = require('crypto');
          var shasum = crypto.createHash('sha1');
          var trialIDString = trialNumber.toString().padStart(3, '0');
          shasum.update(trialIDString + SECRET);
          var computedResponse = shasum.digest('hex').slice(-6).toUpperCase();
          var result = computedResponse === trialResponse;
          const chooseRandomly = Math.random()
          if (chooseRandomly < 0.33) {
            return {
              trialValidation: {
                actionSuccessful: result,
                planet: { 
                  id: 12,
                  coordinates: [25, 72],
                  type: "Planète",
                  planetType: "Tundra",
                  colony: {
                    owner: "Crew2"
                  }
                }
              },
            };
          } else if (chooseRandomly < 0.66) {
            return {
              trialValidation: {
                actionSuccessful: result,
                planet: { 
                  id: 12,
                  coordinates: [25, 72],
                  type: "Planète",
                  planetType: "Gaïa",
                }
              },
            };            
          } else {
            return {
              trialValidation: {
                actionSuccessful: result,
                planet: { 
                  id: 12,
                  coordinates: [25, 72],
                  type: "Comète",
                  resources: {
                    water: 10,
                    metal : 10,
                    energy: 10,
                    biomass: 10
                  }
                }
              },
            };
          }
        }
        // Get the scoreboard -> all federations score for each "jauge"
        case 'GetScoreBoard': {
          return {
            scoreBoard: [
              {
                federationID: 1,
                federationName: 'Arystar',
                federationMilitary: { score: 435, rank: 1 },
                federationCulture: { score: 435, rank: 1 },
                federationProduction: { score: 435, rank: 1 },
                federationEconomics: { score: 435, rank: 1 },
              },
              {
                federationID: 2,
                federationName: 'Bugtar',
                federationMilitary: { score: 435, rank: 1 },
                federationCulture: { score: 435, rank: 1 },
                federationProduction: { score: 435, rank: 1 },
                federationEconomics: { score: 435, rank: 1 },
              },
              {
                federationID: 3,
                federationName: 'Conmar',
                federationMilitary: { score: 435, rank: 1 },
                federationCulture: { score: 435, rank: 1 },
                federationProduction: { score: 435, rank: 1 },
                federationEconomics: { score: 435, rank: 1 },
              },
              {
                federationID: 4,
                federationName: 'D',
                federationMilitary: { score: 435, rank: 1 },
                federationCulture: { score: 435, rank: 1 },
                federationProduction: { score: 435, rank: 1 },
                federationEconomics: { score: 435, rank: 1 },
              },
              {
                federationID: 5,
                federationName: 'E',
                federationMilitary: { score: 435, rank: 1 },
                federationCulture: { score: 435, rank: 1 },
                federationProduction: { score: 435, rank: 1 },
                federationEconomics: { score: 435, rank: 1 },
              },
              {
                federationID: 6,
                federationName: 'F',
                federationMilitary: { score: 435, rank: 1 },
                federationCulture: { score: 435, rank: 1 },
                federationProduction: { score: 435, rank: 1 },
                federationEconomics: { score: 435, rank: 1 },
              },
              {
                federationID: 7,
                federationName: 'G',
                federationMilitary: { score: 435, rank: 1 },
                federationCulture: { score: 435, rank: 1 },
                federationProduction: { score: 435, rank: 1 },
                federationEconomics: { score: 435, rank: 1 },
              },
              {
                federationID: 8,
                federationName: 'H',
                federationMilitary: { score: 435, rank: 1 },
                federationCulture: { score: 435, rank: 1 },
                federationProduction: { score: 435, rank: 1 },
                federationEconomics: { score: 435, rank: 1 },
              },
              {
                federationID: 9,
                federationName: 'I',
                federationMilitary: { score: 435, rank: 1 },
                federationCulture: { score: 435, rank: 1 },
                federationProduction: { score: 435, rank: 1 },
                federationEconomics: { score: 435, rank: 1 },
              },
              {
                federationID: 10,
                federationName: 'J',
                federationMilitary: { score: 435, rank: 1 },
                federationCulture: { score: 435, rank: 1 },
                federationProduction: { score: 435, rank: 1 },
                federationEconomics: { score: 435, rank: 1 },
              },
            ],
          };
        }
        // Get the scores of the crews in a federation
        case 'GetCrewScores': {
          const federationID = 1;
          return {
            crewScores: [
              {
                crewID: 1,
                federationID: federationID,
                military: { score: 435, rank: 1 },
                culture: { score: 435, rank: 1 },
                production: { score: 435, rank: 1 },
                economics: { score: 435, rank: 1 },
              },
              {
                crewID: 2,
                federationID: federationID,
                military: { score: 435, rank: 3 },
                culture: { score: 435, rank: 3 },
                production: { score: 435, rank: 45 },
                economics: { score: 435, rank: 7 },
              },
              {
                crewID: 3,
                federationID: federationID,
                military: { score: 435, rank: 2 },
                culture: { score: 435, rank: 5 },
                production: { score: 435, rank: 34 },
                economics: { score: 435, rank: 6 },
              },
            ],
          };
        }
        case 'GetCrewInfo': {
          // Add ID to resources and research domains?
          const crewID = 1;
          const maxChallenges = 455;
          const maxTrials = 200; // Changing when they are disclosed
          const maxCulture = 21;
          const maxMilitary = 9;
          const maxProduction = 21;
          const maxExploration = 9;
          return {
            crewInfo: {
              crewID: crewID,
              resources: [
                { name: 'biomass', amount: 45 },
                { name: 'energy', amount: 57 },
                { name: 'metal', amount: 78 },
                { name: 'water', amount: 99 },
              ],
              activities: {
                challenges: { done: 2, max: maxChallenges },
                trials: { done: 43, max: maxTrials },
              },
              challenges : [
                { id: "CC0", isValidated: true, isValidable: false},
                { id: "CC1", isValidated: true, isValidable: false},
                { id: "CC2", isValidated: true, isValidable: true}, // Through federation
                { id: "CC3", isValidated: false, isValidable: true},
                { id: "CC4", isValidated: false, isValidable: true},
                { id: "CC5", isValidated: false, isValidable: true},
                { id: "CC6", isValidated: false, isValidable: true}, // Through federation
                { id: "CC7", isValidated: false, isValidable: false},
                { id: "CC8", isValidated: false, isValidable: false},
                { id: "CC9", isValidated: false, isValidable: false},
                { id: "CC10", isValidated: false, isValidable: false},
                { id: "CC11", isValidated: false, isValidable: false},
                { id: "CC12", isValidated: false, isValidable: false},
                { id: "CC13", isValidated: false, isValidable: false},
                { id: "CC14", isValidated: false, isValidable: false},
                { id: "CC15", isValidated: false, isValidable: false},
                { id: "CC16", isValidated: false, isValidable: false},
                { id: "CC17", isValidated: false, isValidable: false},
                { id: "CC18", isValidated: false, isValidable: false},
                { id: "CC19", isValidated: false, isValidable: false},
                { id: "CC20", isValidated: false, isValidable: false},
                { id: "CE0", isValidated: true, isValidable: false},
                { id: "CE1", isValidated: true, isValidable: false},
                { id: "CE2", isValidated: true, isValidable: true}, // Through federation
                { id: "CE3", isValidated: false, isValidable: true}, 
                { id: "CE4", isValidated: false, isValidable: true},
                { id: "CE5", isValidated: false, isValidable: false},
                { id: "CE6", isValidated: false, isValidable: false},
                { id: "CE7", isValidated: false, isValidable: false},
                { id: "CE8", isValidated: false, isValidable: false},
                { id: "CM0", isValidated: true, isValidable: false},
                { id: "CM1", isValidated: true, isValidable: false},
                { id: "CM2", isValidated: true, isValidable: true}, // Through federation
                { id: "CM3", isValidated: false, isValidable: true}, 
                { id: "CM4", isValidated: false, isValidable: true},
                { id: "CM5", isValidated: false, isValidable: false},
                { id: "CM6", isValidated: false, isValidable: false},
                { id: "CM7", isValidated: false, isValidable: false},
                { id: "CM8", isValidated: false, isValidable: false},
                { id: "CP0", isValidated: true, isValidable: false},
                { id: "CP1", isValidated: true, isValidable: false},
                { id: "CP2", isValidated: true, isValidable: true}, // Through federation
                { id: "CP3", isValidated: true, isValidable: true}, // Through federation
                { id: "CP4", isValidated: false, isValidable: true},
                { id: "CP5", isValidated: false, isValidable: true},
                { id: "CP6", isValidated: false, isValidable: true},
                { id: "CP7", isValidated: false, isValidable: true},
                { id: "CP8", isValidated: false, isValidable: false},
                { id: "CP9", isValidated: false, isValidable: false},
                { id: "CP10", isValidated: false, isValidable: false},
                { id: "CP11", isValidated: false, isValidable: false},
                { id: "CP12", isValidated: false, isValidable: false},
                { id: "CP13", isValidated: false, isValidable: false},
                { id: "CP14", isValidated: false, isValidable: false},
                { id: "CP15", isValidated: false, isValidable: false},
                { id: "CP16", isValidated: false, isValidable: false},
                { id: "CP17", isValidated: false, isValidable: false},
                { id: "CP18", isValidated: false, isValidable: false},
                { id: "CP19", isValidated: false, isValidable: false},
                { id: "CP20", isValidated: false, isValidable: false}
              ],
              research: [
                { name: 'military', displayName: 'Militaire', numberDone: 4, max: maxMilitary },
                {
                  name: 'exploration',
                  displayName: 'Exploration',
                  numberDone: 3,
                  max: maxExploration,
                },
                {
                  name: 'production',
                  displayName: 'Production',
                  numberDone: 4,
                  max: maxProduction,
                },
                { name: 'culture', displayName: 'Culture', numberDone: 4, max: maxCulture },
              ],
            },
          };
        }
        case 'GetCrewInfos': {
          // Add ID to resources and research domains?
          const crewID = 1;
          const maxChallenges = 455;
          const maxTrials = 200; // Changing when they are disclosed
          const maxCulture = 21;
          const maxMilitary = 9;
          const maxProduction = 21;
          const maxExploration = 9;
          return {
            crewInfos: {
              crewID: crewID,
              resources: [
                { name: 'biomass', amount: 45 },
                { name: 'energy', amount: 57 },
                { name: 'metal', amount: 78 },
                { name: 'water', amount: 99 },
              ],
              activities: {
                challenges: { done: 2, max: maxChallenges },
                trials: { done: 43, max: maxTrials },
              },
              research: [
                { name: 'military', displayName: 'Militaire', numberDone: 4, max: maxMilitary },
                {
                  name: 'exploration',
                  displayName: 'Exploration',
                  numberDone: 3,
                  max: maxExploration,
                },
                {
                  name: 'production',
                  displayName: 'Production',
                  numberDone: 4,
                  max: maxProduction,
                },
                { name: 'culture', displayName: 'Culture', numberDone: 4, max: maxCulture },
              ],
            },
          };
        }
        case 'GetPlanet': {
          // Add ID to resources and research domains?
          var planetID = Number(request.input('planetID'));
          if (planetID > 4) {
            planetID = 0;
          }
          return {
            planet: planets[planetID],
          };
        }
        default:
          return {
            Error: [{ name: 'error', reason: 'wrongAPI' }],
          };
      }
    } catch (error) {
      console.error(error);
      return response.status(400).json({
        status: 'error',
        message: 'Mauvais paramètres !',
      });
    }
  }
}
