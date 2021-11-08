import { Model, Field } from 'neo4j-node-ogm';

export default class Role extends Model {
  constructor(values) {
    const labels = ['Role'];
    const attributes = {
      key: Field.String({
        required: true,
        valid: ['ADMIN', 'PLAYER'],
        set: (value) => {
          return value.toUpperCase();
        },
      }),
    };
    super(values, labels, attributes);
  }
}
