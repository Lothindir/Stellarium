import { Schema, model } from '@ioc:Adonis/Addons/Mongoose';

export enum PlanetResources {
  Water,
  Metal,
  Plant,
  Energy,
}

export default model(
  'Planet',
  new Schema({
    id: Number,
    planet_type: String,
    resources_types: PlanetResources,
    coordinates: { x: Number, y: Number },
    colony_uuid: String,
  })
);
