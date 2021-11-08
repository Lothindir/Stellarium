import { Model, Field } from 'neo4j-node-ogm';
import Federation from './Federation';

export default class Crew extends Model {
  constructor(values) {
    const label = ['Crew'];
    const attributes = {
      name: Field.String({
        required: true,
      }),
      federation: Field.Relationship({
        labels: ['PART_OF'],
        target: Federation,
      }),
      colonisationPoints: Field.Integer({
        default: 0,
      }),
      sciencePoints: Field.Integer({
        default: 0,
      }),
      militaryPoints: Field.Integer({
        default: 0,
      }),
      economyPoints: Field.Integer({
        default: 0,
      }),
    };
    super(values, label, attributes);
  }
}
