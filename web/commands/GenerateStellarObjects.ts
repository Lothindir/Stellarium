import { BaseCommand, args, flags } from '@adonisjs/core/build/standalone';
import { Resources } from '../app/Models/StellarObject';
import axios from 'axios';
import neo4j from 'neo4j-driver';

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

  private readonly MAX_RESSOURCE_PER_OBJECT = 15;
  private readonly NAMES_BUFFER = 50;

  private objNumber: number = 0;
  private objCoords: Set<[number, number]>;

  private planetNames;
  private meteorNames;
  private oasisNames;
  private planetNamesIndex = this.NAMES_BUFFER;
  private meteorNamesIndex = this.NAMES_BUFFER;
  private oasisNamesIndex = this.NAMES_BUFFER;

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
      let objectIndex = 0;
      this.objCoords = new Set();

      const { default: StellarObject, StellarObjectType } = await import(
        '../app/Models/StellarObject'
      );
      const { default: StellarObjectTemplate } = await import(
        '../app/Models/StellarObjectTemplate'
      );
      const { default: neo4jDriver } = await import('@ioc:Adonis/Addons/Neo4j');

      let session = neo4jDriver.session({ defaultAccessMode: neo4j.session.READ });

      await StellarObject.deleteMany().exec();
      await session.writeTransaction((txc) => {
        txc.run('MATCH (c:Colony) DETACH DELETE c');
      });
      this.logger.info('Emptied database');

      const result = await session.readTransaction((txc) =>
        txc.run('MATCH (c:Crew) RETURN c.name as crew')
      );
      const crews = result.records.map((r) => {
        return r.get('crew');
      });

      /** Generate Homeworlds */
      if (crews.length === 0) {
        this.logger.warning('No homeplanet created beacause no crews were found');
        console.log(crews);
      } else {
        let gaiaTemplate = await StellarObjectTemplate.findOne({
          type: StellarObjectType.PLANET,
          planetType: 'Gaïa',
        }).exec();
        if (gaiaTemplate === null)
          this.logger.error("No Gaïa template found. Cannot generate crew's homeworlds");
        else {
          let endDate = new Date();
          endDate.setMonth(endDate.getMonth() + 3);

          for (let i = 0; i < crews.length; i++, objectIndex++) {
            let homeworld = new StellarObject();
            let homeworldName = `${crews[i]} Homeworld`;
            await homeworld
              .createPlanet(
                objectIndex,
                homeworldName,
                this.generateCoords(),
                gaiaTemplate.resources as Resources,
                gaiaTemplate.planetType,
                crews[i],
                endDate
              )
              .then(async () => {
                this.logger
                  .action('CREATED')
                  .succeeded(`Planet: ${homeworld.name}, coordinates: ${homeworld.coordinates}`);
                await session.writeTransaction((txc) =>
                  txc.run(
                    'MATCH (s:Ship)<-[OWNS]-(c:Crew) WHERE c.name = $name SET s.planet = $planet RETURN s',
                    { name: crews[i], planet: objectIndex }
                  )
                );
              })
              .catch((err) => {
                this.logger
                  .action('CREATED')
                  .failed(`Planet: ${homeworld.name}, coordinates: ${homeworld.coordinates}`, err);
              });
          }
        }
      }

      /** Generate other stellar objects */
      let planetTemplates = await StellarObjectTemplate.find({
        type: StellarObjectType.PLANET,
      })
        .where('planetType')
        .ne('Gaïa')
        .exec();
      this.logger.info(`Retrieved ${planetTemplates.length} planet templates:`);

      for (let i = 0; i < this.objNumber; i++, objectIndex++) {
        const objectTypeChoice = Math.random();

        /** Retreive and buffer names */
        if (this.planetNamesIndex >= this.NAMES_BUFFER) {
          let planetsResponse = await axios.get(
            'https://story-shack-cdn-v2.glitch.me/generators/planet-name-generator?count=50'
          );
          this.planetNames = planetsResponse.data.data;
          this.planetNamesIndex = 0;
        }
        if (this.meteorNamesIndex >= this.NAMES_BUFFER) {
          let meteorResponse = await axios.get(
            'https://story-shack-cdn-v2.glitch.me/generators/meteor-name-generator?count=50'
          );
          this.meteorNames = meteorResponse.data.data;
          this.meteorNamesIndex = 0;
        }
        if (this.oasisNamesIndex >= this.NAMES_BUFFER) {
          let oasisResponse = await axios.get(
            'https://story-shack-cdn-v2.glitch.me/generators/oasis-name-generator?count=50'
          );
          this.oasisNames = oasisResponse.data.data;
          this.oasisNamesIndex = 0;
        }

        /** Generate objects */
        if (objectTypeChoice < this.PLANET_THRESHOLD) {
          let planet = new StellarObject();
          let planetTypeChoice = this.getRandomInt(0, planetTemplates.length);
          let planetName = this.planetNames[this.planetNamesIndex++].name;

          await planet
            .createPlanet(
              objectIndex,
              planetName,
              this.generateCoords(),
              planetTemplates[planetTypeChoice].resources as Resources,
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
          let cometName = this.meteorNames[this.meteorNamesIndex++].name;
          await comet
            .createComet(
              objectIndex,
              cometName,
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
          let asteroidName = this.meteorNames[this.meteorNamesIndex++].name;
          await asteroid
            .createAsteroid(
              objectIndex,
              asteroidName,
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
          let gasCloudName = this.oasisNames[this.oasisNamesIndex++].name;
          await gasCloud
            .createGasCloud(
              objectIndex,
              gasCloudName,
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
    let coords: [number, number];
    do {
      coords = [this.getRandomInt(-180, 180), this.getRandomInt(-90, 90)];
    } while (this.objCoords.has(coords));
    this.objCoords.add(coords);
    return coords;
  }
}
