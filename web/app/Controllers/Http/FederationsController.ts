import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import neo4j from 'neo4j-driver';
import neo4jDriver from '@ioc:Adonis/Addons/Neo4j';

export default class FederationsController {
  public async list({response}: HttpContextContract) {
    let session = neo4jDriver.session();
    const result = await session.readTransaction(txc =>
      txc.run('MATCH (f:Federation) RETURN f')
    )

    const records = result.records
    response.json(records)
  }
}
