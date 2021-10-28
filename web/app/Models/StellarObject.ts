import {
  prop,
  getModelForClass,
  index,
  modelOptions,
  Severity,
  DocumentType,
} from '@typegoose/typegoose';
import Mongoose from '@ioc:Adonis/Addons/Mongoose';

@modelOptions({ schemaOptions: { _id: false } })
export class PlanetResources {
  @prop({ default: 0 })
  public water: number;

  @prop({ default: 0 })
  public metal: number;

  @prop({ default: 0 })
  public biomass: number;

  @prop({ default: 0 })
  public energy: number;
}

@modelOptions({ schemaOptions: { _id: false }, options: { allowMixed: Severity.ALLOW } })
export class Coordinates {
  @prop({ default: 'Point' })
  public type: String;

  @prop({ required: true })
  public coordinates: [Number, Number];

  public static getJSON(coordinates: [number, number]) {
    return { type: 'Point', coordinates: coordinates };
  }
}

export enum StellarObjectType {
  PLANET = 'Planète',
  GAS_CLOUD = 'Nuage de gaz',
  COMET = 'Comète',
  ASTEROID = 'Astéroïde',
  SPACE_DEBRIS = 'Débris',
}

/*
 * Retourne toutes les planètes (dejà visitées) + alliées + possédées + visibles [avec distance]
 */

@index({ coordinates: '2d' })
@modelOptions({
  existingMongoose: Mongoose,
  schemaOptions: { collection: 'stellarObjects', id: false },
  options: { allowMixed: Severity.ALLOW },
})
export class StellarObject {
  @prop({ required: true, unique: true, index: true })
  public id: number;

  @prop({ required: true })
  public name: string;

  @prop({ required: true, unique: true })
  public coordinates: [number, number];

  @prop({ default: StellarObjectType.PLANET })
  public type: StellarObjectType;

  @prop({ _id: false })
  public resources?: PlanetResources | number;

  @prop({ type: String })
  public planetType?: string;

  @prop({ type: String })
  public colonyUuid?: number;

  private createObject(id: number, name: string, coordinates: [number, number]) {
    this.id = id;
    this.name = name;
    this.coordinates = coordinates;
  }

  private createSmallObject(
    this: DocumentType<StellarObject>,
    id: number,
    name: string,
    coordinates: [number, number],
    type: StellarObjectType,
    resources: number
  ) {
    this.createObject(id, name, coordinates);
    this.type = type;
    this.resources = resources;
  }

  public async createPlanet(
    this: DocumentType<StellarObject>,
    id: number,
    name: string,
    coordinates: [number, number],
    resources: PlanetResources,
    planetType: string
  ) {
    this.type = StellarObjectType.PLANET;
    this.createObject(id, name, coordinates);
    this.resources = resources;
    this.planetType = planetType;
    await this.save();
  }

  public async createComet(
    this: DocumentType<StellarObject>,
    id: number,
    name: string,
    coordinates: [number, number],
    resources: number
  ) {
    this.createSmallObject(id, name, coordinates, StellarObjectType.COMET, resources);
    await this.save();
  }

  public async createAsteroid(
    this: DocumentType<StellarObject>,
    id: number,
    name: string,
    coordinates: [number, number],
    resources: number
  ) {
    this.createSmallObject(id, name, coordinates, StellarObjectType.ASTEROID, resources);
    await this.save();
  }

  public async createGasCloud(
    this: DocumentType<StellarObject>,
    id: number,
    name: string,
    coordinates: [number, number],
    resources: number
  ) {
    this.createSmallObject(id, name, coordinates, StellarObjectType.GAS_CLOUD, resources);
    await this.save();
  }
}

export default getModelForClass(StellarObject);
