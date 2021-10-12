db.createUser({
    user: 'stellarium',
    pwd: 'asvd',
    roles: [{
        role: 'readWrite',
        db: 'stellarium'
    }]
});

db = new Mongo().getDB('stellarium');

db.createCollection('planets', { capped: false });
db.planets.createIndex({ uuid: 1 });
db.planets.createIndex({ coordinates: '2d' });
db.planets.createIndex({ colony_uuid: 1 });

db.createCollection('infrastructure', { capped: false });

db.createCollection('challenges', { capped: false }); // Défis
db.createCollection('trials', { capped: false }); // Épreuves