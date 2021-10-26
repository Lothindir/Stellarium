import { prop, getModelForClass, index, modelOptions, Ref } from '@typegoose/typegoose';
import Mongoose from '@ioc:Adonis/Addons/Mongoose';

export class PlanetResources {
  @prop({ default: 0 })
  public Water: number;

  @prop({ default: 0 })
  public Metal: number;

  @prop({ default: 0 })
  public Plant: number;

  @prop({ default: 0 })
  public Energy: number;
}

@modelOptions({ schemaOptions: { _id: false } })
export class Coordinates {
  @prop({ default: 'Point' })
  public type: String;

  @prop({ required: true })
  public coordinates: [Number, Number];
}

export enum StellarObjectType {
  PLANET,
  GAS_CLOUD,
  COMET,
  SPACE_DEBRIS,
}

@index({ coordinates: '2dsphere' })
@modelOptions({ existingMongoose: Mongoose, schemaOptions: { collection: 'stellarObjects' } })
class StellarObject {
  @prop({ required: true, unique: true, index: true })
  public uuid: number;

  @prop({ required: true, _id: false, unique: true })
  public coordinates: Coordinates;

  @prop({ default: StellarObjectType.PLANET })
  public type: StellarObjectType;

  @prop({ ref: () => PlanetResources, _id: false })
  public resources?: Ref<PlanetResources>;

  public colony_uuid?: number;
}

export default getModelForClass(StellarObject);

/*export model(
  'Planet',
  new Schema({
    id: Number,
    planet_type: String,
    resources_types: PlanetResources,
    coordinates: { x: Number, y: Number },
    colony_uuid: String,
  })
);*/
