import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import { Mongoose } from 'mongoose';

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class MongooseProvider {
  constructor(protected app: ApplicationContract) {}

  public mongoose: Mongoose;

  public register() {
    this.mongoose = new Mongoose();
    this.mongoose.set('bufferCommands', false);
    const Env = this.app.container.resolveBinding('Adonis/Core/Env');

    this.mongoose
      .connect(Env.get('MONGO_URI'), {
        user: Env.get('MONGO_USER'),
        pass: Env.get('MONGO_PASSWORD'),
        keepAlive: true,
      })
      .then(() => {
        this.app.container.singleton('Adonis/Addons/Mongoose', () => this.mongoose);
        console.log('Created Mongoose driver');
        let namesList: string[] = [];
        this.mongoose.connection.db.listCollections().toArray(function (err, names) {
          if (names !== undefined) {
            for (let i = 0; i < names.length; i++) {
              // gets only the name and adds it to a list
              const nameOnly = names[i].name;
              namesList.push(nameOnly);
            }
            console.log('Collections: ', namesList);
          } else console.log('No collections');
          if (err) console.log(err);
        });
      })
      .catch((err) => console.error(err));
  }

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    await this.app.container.use('Adonis/Addons/Mongoose').disconnect();
  }
}
