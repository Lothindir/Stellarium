import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import neo4j from 'neo4j-driver';
import neo4jDriver from '@ioc:Adonis/Addons/Neo4j';

export default class PlayersController {
  public async index({ response }: HttpContextContract) {
    let session = neo4jDriver.session({ defaultAccessMode: neo4j.session.READ });
    const result = await session.readTransaction((txc) =>
      txc.run(
        'MATCH (p:Player)-[PART_OF]->(c:Crew)-[BELONGS_TO]->(f:Federation) RETURN p.uuid as uuid, p.username as username, c.name as crew, f.name as federation'
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
    response.status(200).json(records);
  }

  public async show({ request, response }: HttpContextContract) {
    const uuid = request.param('id');
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
    if (records.length !== 0) response.status(200).json(records);
    else response.status(404).json({ message: 'Player not found', uuid: uuid });
  }
}
