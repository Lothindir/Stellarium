import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import neo4j, { Driver } from 'neo4j-driver';

export default class Neo4JProvider {
  driver: Driver;

  constructor(protected app: ApplicationContract) {}

  public register() {
    const Env = this.app.container.resolveBinding('Adonis/Core/Env');

    this.driver = neo4j.driver(
      'bolt://' + Env.get('NEO4J_HOST') + ':7687',
      neo4j.auth.basic(
        Env.get('NEO4J_USER'),
        Env.get('NEO4J_PASSWORD')
      )
    );

    this.app.container.singleton('Adonis/Addons/Neo4j', () => this.driver);
    console.log('Created Neo4j driver');
    
  }

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    await this.app.container.use('Adonis/Addons/Neo4j').close();
  }
}
