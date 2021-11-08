import { Model, Field } from 'neo4j-node-ogm';
import Role from './Role';
import Crew from './Crew';

export default class Player extends Model {
  constructor(values) {
    const labels = ['Player'];
    const attributes = {
      username: Field.String({
        required: true,
      }),
      email: Field.String({
        required: true,
        max_length: 255,
      }),
      password: Field.Hash(),
      role: Field.Relationship({
        labels: ['HAS_ROLE'],
        target: Role,
      }),
      crew: Field.Relationship({
        labels: ['PART_OF'],
        target: Crew,
      }),
    };
    super(values, labels, attributes);
  }
}
