import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Env from '@ioc:Adonis/Core/Env';
import crypto from 'crypto';
import Logger, { LogType } from '../../Models/Logger';
import neo4j from 'neo4j-driver';
import neo4jDriver from '@ioc:Adonis/Addons/Neo4j';

export default class TrialsController {
  private const readonly TRIALS_NUMBER = 200;

  public async index({ auth, request, response }: HttpContextContract) {
    if (auth.isAuthenticated && auth.user !== undefined) {
      let uuid = auth.user.uuid;
      let session = neo4jDriver.session({ defaultAccessMode: neo4j.session.READ });
      const result = await session.readTransaction((txc) =>
        txc.run(
          'MATCH (p:Player)-[PART_OF]->(c:Crew) WHERE p.uuid = $uuid RETURN c.name as crew',
          { uuid: uuid }
        )
      );
      const crewName = result.records[0].get('crew');

      const query = request.qs();
      const trialNumber = query.chall;
      const trialResponse = query.qr;

      if (trialNumber === undefined)
        return response.status(404).json({ message: 'Trial number not provided' });
      if (trialNumber > this.TRIALS_NUMBER)
        return response.status(404).json({ message: 'Trial number not valid' });
      if (trialResponse === undefined)
        return response.status(404).json({ message: 'Trial response not provided' });

      var shasum = crypto.createHash('sha1');
      var challengeIDString = trialNumber.toString().padStart(3, '0');
      shasum.update(challengeIDString + Env.get('HASH_SECRET'));
      var computedResponse = shasum.digest('hex').slice(-6).toUpperCase();
      if (computedResponse !== trialResponse)
        return response.status(404).json({ message: 'Trial response is not valid' });
      else {
        const trials = await Logger.find({
          type: LogType.VALIDATE_TRIAL,
          log: {
            trialId: trialNumber,
            crew: crewName
          }
        });
        if(trials.length !== 0) return response.status(403).json({message: 'Trial already validated'})

        Logger.create({
          type: LogType.VALIDATE_TRIAL,
          playerUuid: uuid,
          log: {
            trialId: trialNumber,
            crew: crewName
          },
        });
        return response.status(200).json({ message: 'Défi validé', id: query.chall });
      }
    } else return response.unauthorized();
  }
}
