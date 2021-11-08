CALL apoc.import.csv([
    {fileName: 'file:/players.csv', labels: ['Player']},
    {fileName: 'file:/crews.csv', labels: ['Crew']},
    {fileName: 'file:/federations.csv', labels: ['Federation']},
    {fileName: 'file:/ships.csv', labels: ['Ship']}
],
[
    {fileName: 'file:/part_of.csv', type: 'PART_OF'},
    {fileName: 'file:/belongs_to.csv', type: 'BELONGS_TO'},
    {fileName: 'file:/owns.csv', type: 'OWNS'}
],{delimiter: ';', arrayDelimiter: '|'});
MATCH (n) WHERE n:Player OR n:Crew OR n:Federation REMOVE n.id;