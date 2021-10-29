import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import neo4j from 'neo4j-driver';
import neo4jDriver from '@ioc:Adonis/Addons/Neo4j';
import StellarObject, { StellarObjectType } from 'App/Models/StellarObject';
import Mongoose from '@ioc:Adonis/Addons/Mongoose';

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
    }
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
    }
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
        txc.run('MATCH (p:Player)-[PART_OF]->(c:Crew) WHERE p.uuid = $uuid RETURN c.name as name', {
          uuid: uuid,
        })
      );
      const crewName = crewNameResult.records[0].get('name');

      if (query.owned !== undefined) {
        const ownedPlanets = await StellarObject.find(
          {
            type: StellarObjectType.PLANET,
            colony: { $exists: true },
          },
          '-_id -__v -colony._id'
        )
          .where('colony.owner')
          .equals(crewName)
          .exec();
        jsonResponse.set('owned', ownedPlanets);
      }

      if (query.allied !== undefined) {
        const alliedPlanets = await StellarObject.find(
          { type: StellarObjectType.PLANET, colony: { $exists: true } },
          '-_id -__v -colony._id'
        )
          .where('colony.owner')
          .in(alliedCrews)
          .exec();
        jsonResponse.set('allied', alliedPlanets);
      }

      if (query.attackable !== undefined) {
        const attackablePlanets = await StellarObject.find(
          {
            'type': StellarObjectType.PLANET,
            'colony': { $exists: true },
            'colony.owner': { $nin: alliedCrews },
            'colony.shieldEndTime': { $lt: new Date().toISOString() },
            'coordinates': {
              $near: {
                $geometry: {
                  type: 'Point',
                  coordinates: [0, 0],
                },
              },
            },
          },
          '-_id -__v -colony._id'
        )
          /*.where('colony.owner')
          .nin(alliedCrews)*/
          .exec();
        jsonResponse.set('attackable', attackablePlanets);
      }

      if (query.colonizable !== undefined) {
        let shipResult = await session.readTransaction((txc) =>
          txc.run(
            'MATCH (s:Ship)<-[OWNS]-(:Crew)<-[PART_OF]-(p:Player) WHERE p.uuid = $uuid RETURN s.planet as planet',
            { uuid: uuid }
          )
        );
        let currentPlanetId = shipResult.records[0].get('planet');
        let currentPlanet = await StellarObject.findOne({ id: currentPlanetId }).exec();

        let distances = await StellarObject.aggregate([
          {
            $geoNear: {
              near: currentPlanet!.coordinates,
              distanceField: 'distance',
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
        jsonResponse.set('colonizable', distances);
      }
      let json = Object.fromEntries(jsonResponse);
      response.status(200).json(json);
    }
  }
}
