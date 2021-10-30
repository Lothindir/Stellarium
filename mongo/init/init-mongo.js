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
      required: ["id", "coordinates", "type"],
    },
  },
});
db.stellarObjects.createIndex({ id: 1 }, { unique: true });
db.stellarObjects.createIndex({ coordinates: "2d" });
db.stellarObjects.createIndex({ coordinates: 1 }, { unique: false });

db.createCollection("infrastructure", { capped: false });

db.createCollection("challenges", { capped: false }); // Défis
db.challenges.createIndex({ id: 1 }, { unique: true });

db.createCollection("trials", { capped: false }); // Épreuves

db.createCollection("logs", { capped: false });
