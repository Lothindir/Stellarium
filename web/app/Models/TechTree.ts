import { Model, Field } from 'neo4j-node-ogm';

export class TechStart extends Model {
  constructor(values) {
    const label = ['TechStart'];
    const attributes = {
      uid: Field.String({
        required: true,
        valid: ['C', 'P', 'M', 'E'],
      }),
    };
    super(values, label, attributes);
  }
}

export default class TechTree extends Model {
  constructor(values) {
    const label = ['TechTree'];
    const attributes = {};
    super(values, label, attributes);
  }
}
