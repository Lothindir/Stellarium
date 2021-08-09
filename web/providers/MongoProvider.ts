import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { Mongoose } from 'mongoose'

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
export default class MongoProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    const mongoose = new Mongoose();
    const Env = this.app.container.resolveBinding('Adonis/Core/Env');

    mongoose.connect('mongodb://localhost/' + Env.get('MONGO_DB'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    this.app.container.singleton('Adonis/Addons/Mongoose', () => mongoose);
    console.log('Created Mongoose driver');
    
  }

  public async boot () {
    // All bindings are ready, feel free to use them
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    await this.app.container.use('Adonis/Addons/Mongoose').disconnect();
  }
}
