import { BaseCommand, args, flags } from '@adonisjs/core/build/standalone';
import { PlanetResources } from '../app/Models/StellarObject';
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

  private readonly GALAXY_SIZE_RATIO = 20;
  private readonly MAX_RESSOURCE_PER_OBJECT = 15;

  private objNumber: number = 0;
  private objCoords: Set<[number, number]>;

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
          for (let i = 0; i < crews.length; i++, objectIndex++) {
            let homeworld = new StellarObject();
            let homeworldName = `${crews[i]} Homeworld`;
            await homeworld
              .createPlanet(
                objectIndex,
                homeworldName,
                this.generateCoords(),
                gaiaTemplate.resources as PlanetResources,
                gaiaTemplate.planetType
              )
              .then(async () => {
                await session
                  .writeTransaction((txc) => {
                    txc.run(
                      `MATCH (c:Crew)-[:OWNS]->(s:Ship) WHERE c.name = "${crews[i]}"
                        SET s.planet = ${objectIndex}
                        CREATE (colony:Colony) SET colony.planet_id = ${objectIndex} 
                        CREATE (c)-[r:OWNS]->(colony) 
                        RETURN colony`
                    );
                  })
                  .catch((err) => {
                    this.logger.error(err);
                  });

                this.logger
                  .action('CREATED')
                  .succeeded(`Planet: ${homeworld.name}, coordinates: ${homeworld.coordinates}`);
              })
              .catch((err) => {
                this.logger
                  .action('CREATED')
                  .failed(`Planet: ${homeworld.name}, coordinates: ${homeworld.coordinates}`, err);
              });
          }
        }
      }

      let planetTemplates = await StellarObjectTemplate.find({
        type: StellarObjectType.PLANET,
      })
        .where('planetType')
        .ne('Gaïa')
        .exec();
      this.logger.info(`Retrieved ${planetTemplates.length} planet templates:`);

      for (let i = 0; i < this.objNumber; i++, objectIndex++) {
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
              objectIndex,
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
              objectIndex,
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
              objectIndex,
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
              objectIndex,
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
    let coords: [number, number];
    do {
      coords = [this.getRandomInt(-180, 180), this.getRandomInt(-180, 180)];
    } while (this.objCoords.has(coords));
    this.objCoords.add(coords);
    return coords;
  }
}
