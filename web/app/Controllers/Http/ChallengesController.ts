import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Challenge from '../../Models/Challenge';

export default class ChallengesController {
  public async index({ response }: HttpContextContract) {
    await Challenge.find()
      .exec()
      .then((res) => {
        console.log(res);
        response.status(200).json(
          res.map((el) => {
            return { id: el.id, description: el.description };
          })
        );
      })
      .catch((err) => {
        console.log(err);
        response.status(500).json({ error: err });
      });
  }

  public async show({ request, response }: HttpContextContract) {
    const challengeId = request.param('id');
    await Challenge.findOne({ id: challengeId }, '-_id id description')
      .exec()
      .then((challenge) => {
        if (challenge) {
          response.status(200).json(challenge);
        } else {
          response.status(404).json({ message: 'Challenge not found', id: challengeId });
        }
      })
      .catch((err) => {
        console.log(err);
        response.status(500).json({ error: err });
      });
  }
}
