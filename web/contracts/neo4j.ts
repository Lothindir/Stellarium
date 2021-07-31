declare module '@ioc:Adonis/Addons/Neo4j' {
    import { Driver } from 'neo4j-driver';

    const neo4jDriver: Driver;
    export default neo4jDriver;
}