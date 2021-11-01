import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import Mongoose from '@ioc:Adonis/Addons/Mongoose';
import { StellarObjectType, Resources } from './StellarObject';

@modelOptions({
  existingMongoose: Mongoose,
  schemaOptions: { collection: 'templates' },
  options: { allowMixed: Severity.ALLOW },
})
export class StellarObjectTemplate {
  @prop({ required: true })
  public type: StellarObjectType;

  @prop({ required: true })
  public resources: Resources | number;

  @prop()
  public planetType: string;
}

export default getModelForClass(StellarObjectTemplate);
