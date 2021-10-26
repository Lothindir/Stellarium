// @ts-nocheck
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import neo4j from 'neo4j-driver';
import neo4jDriver from '@ioc:Adonis/Addons/Neo4j';
import Federation from '../../Models/Federation';

export default class FederationsController {
  public async index({ response }: HttpContextContract) {
    let session = neo4jDriver.session({ defaultAccessMode: neo4j.session.READ });
    const result = await session.readTransaction((txc) => txc.run('MATCH (f:Federation) RETURN f.name as name'));

    const records = result.records.map(r => {
      return r.get('name');
    });
    response.json(records);
  }

  public async show(/*{ request, response }: HttpContextContract*/) {
    let session = neo4jDriver.session({ defaultAccessMode: neo4j.session.READ });
    const result = await session.readTransaction((txc) => txc.run('MATCH (f:Federation) RETURN f'));
    console.log(result);
  }
}
