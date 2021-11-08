import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import Mongoose from '@ioc:Adonis/Addons/Mongoose';

@modelOptions({ schemaOptions: { _id: false } })
export class ProductionInfrastructureLevels {
  @prop({ required: true })
  public level: number;

  @prop({ required: true })
  public productionPerHour: number;
}

@modelOptions({ schemaOptions: { _id: false } })
export class Resources {
  @prop({ required: true })
  public water: number;

  @prop({ required: true })
  public metal: number;

  @prop({ required: true })
  public biomass: number;

  @prop({ required: true })
  public energy: number;
}

@modelOptions({
  existingMongoose: Mongoose,
  schemaOptions: { collection: 'infrastructure', id: false },
  options: { allowMixed: Severity.ALLOW },
})
export class Infrastructure {
  @prop({ required: true, index: true })
  public type: string;

  @prop({ required: true })
  public description: string;

  @prop({ required: true })
  public cost: Resources;

  @prop()
  public production: Resources;

  @prop()
  public levels?: ProductionInfrastructureLevels[];
}

export default getModelForClass(Infrastructure);
