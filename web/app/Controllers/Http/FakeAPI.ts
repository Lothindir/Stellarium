import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class FakeAPI {
  public async genericCall({ request, auth, response }: HttpContextContract) {
    try {
        const api = request.input('api');
        return response.status(355).json({
            status: 'error',
            message: api
        })
        const user = auth.user
        if (api == "GetVisiblePlanets")
        {
            return response.json({
                galaxies: [{ name: 'Theotar', prod: '2 2 5 2', def: '53', dist: '324' }, { name: 'Theotar', prod: '2 2 5 2', def: '53', dist: '324' }]
            })
        }
    } catch (error) {
        console.error(error);
        return response.status(400).json({
            status: 'error',
            message: 'Identifiants invalides'
        })
    }
    
  }
}