import { Model, Field } from 'neo4j-node-ogm';

export default class Federation extends Model {
  constructor(values) {
    const label = ['Federation'];
    const attributes = {
      name: Field.String({
        required: true,
      }),
    };
    super(values, label, attributes);
  }
}
