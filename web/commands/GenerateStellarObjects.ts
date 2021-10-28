import { BaseCommand, args, flags } from '@adonisjs/core/build/standalone';
import { PlanetResources } from '../app/Models/StellarObject';
import axios from 'axios';

export default class GenerateStellarObjects extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'generate:stellarobjects';

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Generates and seeds the database with stellar objects';

  @args.string({
    name: 'Objects number',
    description: 'The number of objects to generate. Must be greater than 10.',
    required: true,
  })
  public numberOfObjects: string;

  @flags.boolean({ alias: 'i', description: 'Enable interactive mode' })
  public interactive: boolean;

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  };

  public static aliases = ['generate:mongo'];

  private readonly PLANET_THRESHOLD = 0.8;
  private readonly COMET_THRESHOLD = 0.85;
  private readonly ASTEROID_THRESHOLD = 0.9;
  private readonly GAS_CLOUD_THRESHOLD = 0.97;

  private readonly GALAXY_SIZE_RATIO = 20;
  private readonly MAX_RESSOURCE_PER_OBJECT = 15;

  private objNumber: number = 0;
  private objCoords: Map<number, number>;

  public async run() {
    this.objNumber = Number(this.numberOfObjects);
    if (isNaN(this.objNumber)) {
      this.logger.error('The objects number is not a number');
      return;
    } else if (this.objNumber < 1) {
      this.logger.error('The object number must be greater than 1');
      return;
    }

    if (this.interactive) {
      this.logger.error('Interactive mode is not implemented yet');
    } else {
      const { default: StellarObject, StellarObjectType } = await import(
        '../app/Models/StellarObject'
      );
      const { default: StellarObjectTemplate } = await import(
        '../app/Models/StellarObjectTemplate'
      );

      await StellarObject.deleteMany().exec();
      this.logger.info('Emptied database');

      let planetTemplates = await StellarObjectTemplate.find({ type: StellarObjectType.PLANET })
        .where('planetType')
        .ne('Gaïa')
        .exec();
      this.logger.info(`Retrieved ${planetTemplates.length} planet templates:`);

      for (let i = 0; i < this.objNumber; i++) {
        const objectTypeChoice = Math.random();
        if (objectTypeChoice < this.PLANET_THRESHOLD) {
          let planet = new StellarObject();
          let planetTypeChoice = this.getRandomInt(0, planetTemplates.length);
          let planetName = await axios.get(
            'https://story-shack-cdn-v2.glitch.me/generators/planet-name-generator'
          );
          //let coords = this.generateCoords();
          //if (objectsCoords.includes(coords))
          await planet
            .createPlanet(
              i,
              planetName.data.data.name,
              this.generateCoords(),
              planetTemplates[planetTypeChoice].resources as PlanetResources,
              planetTemplates[planetTypeChoice].planetType
            )
            .then(() => {
              this.logger
                .action('CREATED')
                .succeeded(
                  `Planet: ${planet.name}, coordinates: ${planet.coordinates}, type: ${planet.planetType}`
                );
            })
            .catch((err) => {
              this.logger.action('CREATED').failed(`Planet: ${planet.name}`, err);
            });
        } else if (objectTypeChoice < this.COMET_THRESHOLD) {
          let comet = new StellarObject();
          let cometName = await axios.get(
            'https://story-shack-cdn-v2.glitch.me/generators/meteor-name-generator'
          );
          await comet
            .createComet(
              i,
              cometName.data.data.name,
              this.generateCoords(),
              this.getRandomInt(0, this.MAX_RESSOURCE_PER_OBJECT)
            )
            .then(() => {
              this.logger
                .action('CREATED')
                .succeeded(
                  `Comet: ${comet.name}, coordinates: ${comet.coordinates}, resources: ${comet.resources} water`
                );
            })
            .catch((err) => {
              this.logger.action('CREATED').failed(`Comet: ${comet.name}`, err);
            });
        } else if (objectTypeChoice < this.ASTEROID_THRESHOLD) {
          let asteroid = new StellarObject();
          let asteroidName = await axios.get(
            'https://story-shack-cdn-v2.glitch.me/generators/meteor-name-generator'
          );
          await asteroid
            .createAsteroid(
              i,
              asteroidName.data.data.name,
              this.generateCoords(),
              this.getRandomInt(0, this.MAX_RESSOURCE_PER_OBJECT)
            )
            .then(() => {
              this.logger
                .action('CREATED')
                .succeeded(
                  `Asteroid: ${asteroid.name}, coordinates: ${asteroid.coordinates}, resources: ${asteroid.resources} metal`
                );
            })
            .catch((err) => {
              this.logger.action('CREATED').failed(`Asteroid: ${asteroid.name}`, err);
            });
        } else if (objectTypeChoice < this.GAS_CLOUD_THRESHOLD) {
          let gasCloud = new StellarObject();
          let gasCloudName = await axios.get(
            'https://story-shack-cdn-v2.glitch.me/generators/oasis-name-generator'
          );
          await gasCloud
            .createGasCloud(
              i,
              gasCloudName.data.data.name,
              this.generateCoords(),
              this.getRandomInt(0, this.MAX_RESSOURCE_PER_OBJECT)
            )
            .then(() => {
              this.logger
                .action('CREATED')
                .succeeded(
                  `Gas cloud: ${gasCloud.name}, coordinates: ${gasCloud.coordinates}, resources: ${gasCloud.resources} fuel`
                );
            })
            .catch((err) => {
              this.logger.action('CREATED').failed(`Gas cloud: ${gasCloud.name}`, err);
            });
        }
      }
    }
  }

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  private generateCoords(): [number, number] {
    let coords;
    // do {
    coords = [this.getRandomInt(-180, 180), this.getRandomInt(-180, 180)];
    // } while (!this.objCoords.contains(coords));
    return coords;
  }
}
