import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');
    const rememberMe = !!request.input('rememberMe');

        try {
            await auth.attempt(email, password, rememberMe);
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                status: 'error',
                message: 'Identifiants invalides'
            })
        }
    return response.json(auth.user);
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();
    response.ok('Disconnected');
  }
}