import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class FakeAPI {
    public async genericCall({ request, auth, response }: HttpContextContract) {
        return {
            galaxies: [
                { name: 'Theotar', prod: '2 2 5 2', def: '53', dist: '324' },
                { name: 'Mutune', prod: '1 3 2 1', def: '33', dist: '498' }
            ]
        };

        try {
            const api = request.input('api');
            if (api === "GetVisiblePlanets") {
                return response.json({
                    galaxies: [
                        { name: 'Theotar', prod: '2 2 5 2', def: '53', dist: '324' },
                        { name: 'Mutune', prod: '1 3 2 1', def: '33', dist: '498' }
                    ]
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