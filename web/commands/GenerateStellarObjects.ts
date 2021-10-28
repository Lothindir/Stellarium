import { BaseCommand, args, flags } from '@adonisjs/core/build/standalone';

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

  public async run() {
    const objNumber = Number(this.numberOfObjects);
    if (isNaN(objNumber)) {
      this.logger.error('The objects number is not a number');
    }

    if (this.interactive) {
      this.logger.error('Interactive mode is not implemented yet');
    } else {
      const { default: StellarObject } = await import('../app/Models/StellarObject');
      let gaiaPlanet = StellarObject.;
    }
  }
}
