import BaseMigration from '@ioc:Zakodium/Mongodb/Migration';
import Planet from 'App/Models/Planet';

export default class PlanetsMigration extends BaseMigration {
  public up(): void {
    this.createCollection(Planet.collectionName);
    this.createIndex(Planet.collectionName, 'id');
    this.createIndex(Planet.collectionName, 'colony_uuid')
  }
}
