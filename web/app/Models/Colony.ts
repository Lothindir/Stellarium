import { prop, getModelForClass, modelOptions, Severity, Ref } from '@typegoose/typegoose';
import Mongoose from '@ioc:Adonis/Addons/Mongoose';
import { Resources } from './StellarObject';
import { Infrastructure } from './Infrastructure';

@modelOptions({
  existingMongoose: Mongoose,
  schemaOptions: { collection: 'colonies', id: false },
  options: { allowMixed: Severity.ALLOW },
})
class Colony {
  @prop({ required: true, index: true, unique: true })
  public id: number;

  @prop({ required: true })
  public owner: string;

  @prop()
  public resources?: Resources;

  @prop({ ref: () => Infrastructure, _id: false })
  public infrastructure?: Ref<Infrastructure>[];
}

//export default getModelForClass(Colony);
