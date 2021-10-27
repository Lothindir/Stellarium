import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import neo4j from 'neo4j-driver';
import neo4jDriver from '@ioc:Adonis/Addons/Neo4j';

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
}
