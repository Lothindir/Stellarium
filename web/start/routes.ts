/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.post('/login', 'AuthController.login');
Route.get('/logout', 'AuthController.logout').middleware('auth');

Route.get('/stellarobjects', 'StellarObjectsController.index');
Route.get('/stellarobjects/:uuid', 'StellarObjectsController.show');
Route.post('/stellarobjects', 'StellarObjectsController.store');

Route.get('/challenges', 'ChallengesController.index').as('challenges.index');
Route.get('/challenges/:id', 'ChallengesController.show').as('challenges.show');

Route.resource('federations', 'FederationsController')
  .apiOnly()
  .middleware({
    store: ['adminAuth'],
    update: ['adminAuth'],
    destroy: ['adminAuth'],
  });

Route.resource('crews', 'CrewsController')
  .apiOnly()
  .middleware({
    store: ['adminAuth'],
    update: ['adminAuth'],
    destroy: ['adminAuth'],
  });

Route.resource('players', 'PlayersController')
  .only(['index', 'show', 'update'])
  .middleware({ update: ['adminAuth'] });

Route.get('/game/player', 'GameController.player').middleware('auth');
Route.get('/game/crew', 'GameController.crew').middleware('auth');
