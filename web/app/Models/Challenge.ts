import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import Mongoose from '@ioc:Adonis/Addons/Mongoose';

@modelOptions({ existingMongoose: Mongoose, schemaOptions: { collection: 'challenges' } })
export class Challenge {
  @prop({ required: true, index: true, unique: true })
  public id: string;

  @prop({ required: true })
  public description: string;
}

export default getModelForClass(Challenge);
