import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class PlayersController {
  public async index({ response }: HttpContextContract) {}

  public async show({ request, response }: HttpContextContract) {}
}
