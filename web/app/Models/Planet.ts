import { Schema, model } from '@ioc:Adonis/Addons/Mongoose'

enum Resources {
  Water,
  Metal,
  Plant,
  Energy
}

export default model('Planet',
  new Schema({
    id: Number,
    planet_type: String,
    resources_types: Resources,
    coordinates: { x: Number, y: Number },
    colony_uuid: String,
  })
)