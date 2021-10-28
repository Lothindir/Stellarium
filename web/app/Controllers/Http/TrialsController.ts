import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class TrialsController {
  public async index({ request, response }): HttpContextContract {
    let query = request.qs();
    response.status(200).json({ message: 'Défi validé', id: query.chall });
  }
}
