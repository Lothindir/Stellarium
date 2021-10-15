mongoimport --db=stellarium --collection=infrastructure --jsonArray --file=docker-entrypoint-initdb.d/data/infrastructure.json

# Challenges
mongoimport --db=stellarium --collection=challenges --jsonArray --file=docker-entrypoint-initdb.d/data/challenges/culture.json
mongoimport --db=stellarium --collection=challenges --jsonArray --file=docker-entrypoint-initdb.d/data/challenges/military.json
mongoimport --db=stellarium --collection=challenges --jsonArray --file=docker-entrypoint-initdb.d/data/challenges/production.json