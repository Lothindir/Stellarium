#!/bin/bash
echo $(mongoimport --db=stellarium --collection=infrastructure --jsonArray --file=docker-entrypoint-initdb.d/data/infrastructure.json)
echo $(mongoimport --db=stellarium --collection=templates --jsonArray --file=/docker-entrypoint-initdb.d/data/stellarObjects.json)
# Challenges
echo $(mongoimport --db=stellarium --collection=challenges --jsonArray --file=/docker-entrypoint-initdb.d/data/challenges/culture.json)
echo $(mongoimport --db=stellarium --collection=challenges --jsonArray --file=/docker-entrypoint-initdb.d/data/challenges/military.json)
echo $(mongoimport --db=stellarium --collection=challenges --jsonArray --file=/docker-entrypoint-initdb.d/data/challenges/production.json)