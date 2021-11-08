import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import Mongoose from '@ioc:Adonis/Addons/Mongoose';

export enum LogType {
  MOVE = 'MOVE',
  ATTACK = 'ATTACK',
  COLONIZE = 'COLONIZE',
  VALIDATE_TRIAL = 'VALIDATE_TRIAL',
  VALIDATE_CHALLENGE = 'VALIDATE_CHALLENGE',
}

@modelOptions({
  existingMongoose: Mongoose,
  schemaOptions: { collection: 'logs' },
})
class Logger {
  @prop({ required: true, enum: LogType })
  public type: LogType;

  @prop({ required: true })
  public playerUuid: string;

  @prop({ required: true })
  public log: Object;

  @prop({ required: true, default: new Date() })
  public date: Date;
}

export default getModelForClass(Logger);
