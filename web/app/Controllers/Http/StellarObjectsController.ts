import StellarObject from '../../Models/StellarObject';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class StellarObjectsController {
  public async index({ response }: HttpContextContract) {
    await StellarObject.find({})
      .exec()
      .then((planets) => response.status(200).json(planets))
      .catch((err) => {
        console.log(err);
        response.status(500).json({ error: err });
      });
  }

  public async show({ request, response }: HttpContextContract) {
    const objectUuid = request.param('uuid');
    await StellarObject.findOne({ uuid: objectUuid }, '-_id -_v')
      .exec()
      .then((obj) => {
        if (obj) {
          response.status(200).json(obj);
        } else {
          response.status(404).json({ message: 'Stellar object not found', uuid: objectUuid });
        }
      });
  }

  public async store({ request, response }: HttpContextContract) {
    const planetUuid = request.input('uuid');
    const planetCoordinates = request.input('coordinates');

    await StellarObject.create({ uuid: planetUuid, coordinates: planetCoordinates })
      .then((planet) => {
        console.log(planet);
        response.status(201).json(planet);
      })
      .catch((err) => {
        console.log(err);
        response.status(500).json({ error: err });
      });
  }
}
