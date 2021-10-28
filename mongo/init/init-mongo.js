db = new Mongo().getDB("stellarium");

db.createUser({
  user: "stellarium",
  pwd: "asvd",
  roles: [
    {
      role: "readWrite",
      db: "stellarium",
    },
  ],
});

db.createCollection("templates", { capped: false });

db.createCollection("stellarObjects", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["uuid", "coordinates", "type"],
    },
  },
});
db.stellarObjects.createIndex({ uuid: 1 }, { unique: true });
db.stellarObjects.createIndex({ coordinates: "2dsphere" }, { unique: true });
db.stellarObjects.createIndex({ colony_uuid: 1 });

db.createCollection("infrastructure", { capped: false });

db.createCollection("challenges", { capped: false }); // Défis
db.challenges.createIndex({ id: 1 }, { unique: true });

db.createCollection("trials", { capped: false }); // Épreuves
