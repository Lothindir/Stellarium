import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import neo4j from 'neo4j-driver';
import neo4jDriver from '@ioc:Adonis/Addons/Neo4j';
import StellarObject, { StellarObjectType } from 'App/Models/StellarObject';

export default class GameController {
  public async player({ auth, response }: HttpContextContract) {
    if (auth.isAuthenticated && auth.user !== undefined) {
      let uuid = auth.user.uuid;
      let session = neo4jDriver.session({ defaultAccessMode: neo4j.session.READ });
      const result = await session.readTransaction((txc) =>
        txc.run(
          'MATCH (p:Player)-[PART_OF]->(c:Crew)-[BELONGS_TO]->(f:Federation) WHERE p.uuid = $uuid RETURN p.uuid as uuid, p.username as username, c.name as crew, f.name as federation',
          { uuid: uuid }
        )
      );
      const records = result.records.map((r) => {
        return {
          uuid: r.get('uuid'),
          username: r.get('username'),
          crew: r.get('crew'),
          federation: r.get('federation'),
        };
      });
      if (records.length !== 0) response.status(200).json(records[0]);
      else response.status(404).json({ message: 'Player not found', uuid: uuid });
    } else return response.unauthorized();
  }

  public async crew({ auth, response }: HttpContextContract) {
    if (auth.isAuthenticated && auth.user !== undefined) {
      let uuid = auth.user.uuid;
      let session = neo4jDriver.session({ defaultAccessMode: neo4j.session.READ });
      const result = await session.readTransaction((txc) =>
        txc.run('MATCH (p:Player)-[PART_OF]->(c:Crew) WHERE p.uuid = $uuid RETURN c.name as crew', {
          uuid: uuid,
        })
      );
      const records = result.records.map((r) => {
        return {
          crew: r.get('crew'),
        };
      });
      if (records.length !== 0) response.status(200).json(records[0]);
      else response.status(404).json({ message: 'Player not found', uuid: uuid });
    } else return response.unauthorized();
  }

  public async planets({ auth, request, response }: HttpContextContract) {
    if (auth.isAuthenticated && auth.user !== undefined) {
      let uuid = auth.user.uuid;
      let query = request.qs();
      let jsonResponse = new Map<string, object>();
      let session = neo4jDriver.session({ defaultAccessMode: neo4j.session.READ });

      const alliedCrewsResult = await session.readTransaction((txc) => {
        return txc.run('MATCH (p:Player)-[*]-(c:Crew) WHERE p.uuid = $uuid RETURN c.name as name', {
          uuid: uuid,
        });
      });
      const alliedCrews = alliedCrewsResult.records.map((r) => r.get('name'));

      const crewNameResult = await session.readTransaction((txc) =>
        txc.run(
          'MATCH (p:Player)-[PART_OF]->(c:Crew)-[OWNS]->(s:Ship) WHERE p.uuid = $uuid RETURN c.name as name, s.planet as planet, s.currentFuel as fuel',
          {
            uuid: uuid,
          }
        )
      );
      const crewName = crewNameResult.records[0].get('name');
      const currentFuel = crewNameResult.records[0].get('fuel').low;
      const currentPlanetId = crewNameResult.records[0].get('planet');
      console.log(currentPlanetId);
      const currentPlanet = await StellarObject.findOne({ id: currentPlanetId }).exec();

      if (query.owned !== undefined) {
        let ownedPlanets = await StellarObject.aggregate([
          {
            $geoNear: {
              near: currentPlanet!.coordinates,
              distanceField: 'distance',
              query: {
                'type': StellarObjectType.PLANET,
                'colony': { $exists: true },
                'colony.owner': crewName,
              },
            },
          },
          {
            $project: {
              '_id': 0,
              '__v': 0,
              'colony._id': 0,
            },
          },
        ]);
        jsonResponse.set('owned', ownedPlanets);
      }

      if (query.allied !== undefined) {
        let alliedPlanets = await StellarObject.aggregate([
          {
            $geoNear: {
              near: currentPlanet!.coordinates,
              distanceField: 'distance',
              query: {
                'type': StellarObjectType.PLANET,
                'colony': { $exists: true },
                'colony.owner': {
                  $in: alliedCrews,
                  $ne: crewName,
                },
              },
            },
          },
          {
            $project: {
              '_id': 0,
              '__v': 0,
              'colony._id': 0,
            },
          },
        ]);
        jsonResponse.set('allied', alliedPlanets);
      }

      if (query.attackable !== undefined) {
        let attackablePlanets = await StellarObject.aggregate([
          {
            $geoNear: {
              near: currentPlanet!.coordinates,
              distanceField: 'distance',
              maxDistance: currentFuel,
              query: {
                'type': StellarObjectType.PLANET,
                'colony': { $exists: true },
                'colony.owner': { $nin: alliedCrews },
                'colony.shieldEndTime': { $lt: new Date().toISOString() },
              },
            },
          },
          {
            $project: {
              '_id': 0,
              '__v': 0,
              'colony._id': 0,
            },
          },
        ]);
        jsonResponse.set('attackable', attackablePlanets);
      }

      if (query.colonizable !== undefined) {
        let colonizablePlanets = await StellarObject.aggregate([
          {
            $geoNear: {
              near: currentPlanet!.coordinates,
              distanceField: 'distance',
              maxDistance: currentFuel,
              query: {
                type: StellarObjectType.PLANET,
                colony: { $exists: false },
              },
            },
          },
          {
            $project: {
              _id: 0,
              __v: 0,
            },
          },
        ]);
        jsonResponse.set('colonizable', colonizablePlanets);
      }
      let json = Object.fromEntries(jsonResponse);
      response.status(200).json(json);
    } else return response.unauthorized();
  }

  public async ship({ auth, response }: HttpContextContract) {
    if (auth.isAuthenticated && auth.user !== undefined) {
      let uuid = auth.user.uuid;
      let session = neo4jDriver.session({ defaultAccessMode: neo4j.session.READ });
      const shipResult = await session.readTransaction((txc) =>
        txc.run(
          `MATCH (p:Player)-[PART_OF]->(Crew)-[OWNS]->(s:Ship) WHERE p.uuid = $uuid
           RETURN s.name as name, s.attackPower as ap, s.currentFuel as cf, s.maxFuel as mf, s.rechargeFuelRate as frr, s.equipped as equipped`,
          { uuid: uuid }
        )
      );
      let shipRecord = shipResult.records[0];
      let ship = {
        name: shipRecord.get('name'),
        pa: shipRecord.get('ap').low,
        carb: {
          curr: shipRecord.get('cf').low,
          max: shipRecord.get('mf').low,
        },
        recharge: shipRecord.get('frr').low,
        equipements: shipRecord.get('equipped'),
      };
      response.status(200).json(ship);
    }
  }

  public async move({ auth, request, response }: HttpContextContract) {
    if (auth.isAuthenticated && auth.user !== undefined) {
      let uuid = auth.user.uuid;
      let session = neo4jDriver.session({ defaultAccessMode: neo4j.session.READ });
      const result = await session.readTransaction((txc) =>
        txc.run(
          `MATCH (p:Player)-[PART_OF]->(c:Crew)-[OWNS]->(s:Ship) WHERE p.uuid = $uuid
           RETURN s.currentFuel as fuel, s.planet as planet, c.name as name`,
          { uuid: uuid }
        )
      );
      let currentFuel = result.records[0].get('fuel').low;
      let currentPlanetId = result.records[0].get('planet').low;
      console.log(currentPlanetId);
      const crewName = result.records[0].get('name');
      const targetPlanetId = request.input('planetID');
      if (targetPlanetId === undefined) {
        return response.status(404).json({ reason: 'No id was provided' });
      }

      const currentPlanet = await StellarObject.findOne(
        { id: currentPlanetId },
        '-_id -__v'
      ).exec();
      if (currentPlanet === null) return response.internalServerError('Current planet is invalid');
      const targetPlanets = await StellarObject.aggregate([
        {
          $geoNear: {
            near: currentPlanet.coordinates,
            distanceField: 'distance',
            maxDistance: currentFuel,
          },
        },
        {
          $match: {
            id: targetPlanetId,
          },
        },
      ]);
      // const targetPlanet = await StellarObject.findOne({ id: targetPlanetId }).exec();
      const planets = await StellarObject.find({ id: targetPlanetId })
        .where('coordinates')
        .near({ center: currentPlanet.coordinates, distanceField: 'dist' })
        .exec();
      console.log(targetPlanets);
      if (targetPlanets.length === 0)
        return response.status(404).json({ reason: 'Invalid target id', id: targetPlanetId });
      if (targetPlanets[0].distance > currentFuel)
        return response.status(404).json({
          reason: 'Not enough fuel',
          distance: targetPlanets[0].distance,
          currentFuel: currentFuel,
        });
      currentFuel -= targetPlanets[0].distance;
      // await session.writeTransaction((txc) =>
      //   txc.run(
      //     'MATCH (c:Crew)-[OWNS]->(s:Ship) WHERE c.name = $name SET s.currentFuel = $fuel, s.planet = $planet',
      //     { name: crewName, fuel: currentFuel, planet: targetPlanetId }
      //   )
      // );

      response.status(200).json({ outcome: 'Moved', id: targetPlanetId });
    } else return response.unauthorized();
  }
}
