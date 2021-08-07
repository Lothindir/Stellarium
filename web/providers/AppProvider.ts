import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    const Auth = this.app.container.resolveBinding('Adonis/Addons/Auth')
    const Hash = this.app.container.resolveBinding('Adonis/Core/Hash')

    const { Neo4JAuthProvider } = await import('./Neo4JAuthProvider')

    Auth.extend('provider', 'neo4j', (_, __, config) => {
      return new Neo4JAuthProvider(config, Hash)
    })

  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
