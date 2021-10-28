import { prop, getModelForClass, index, modelOptions, Severity } from '@typegoose/typegoose';
import Mongoose from '@ioc:Adonis/Addons/Mongoose';
import { StellarObjectType, PlanetResources } from './StellarObject';

@index({ coordinates: '2dsphere' })
@modelOptions({
  existingMongoose: Mongoose,
  schemaOptions: { collection: 'templates' },
  options: { allowMixed: Severity.ALLOW },
})
export class StellarObjectTemplate {
  @prop({ required: true })
  public type: StellarObjectType;

  @prop({ required: true })
  public resources: PlanetResources | number;

  @prop()
  public planetType: string;
}

export default getModelForClass(StellarObjectTemplate);
