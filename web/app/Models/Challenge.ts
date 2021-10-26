import Mongoose, { Schema } from '@ioc:Adonis/Addons/Mongoose';

interface Challenge {
  id: string;
  description: string;
}

const schema = new Schema<Challenge>({
  id: { type: String, required: true },
  description: { type: String, required: true },
});

export default Mongoose.model('Challenge', schema, 'challenges');
