const request = require('supertest');
const app = require('../app'); // Importer l'application Express
const mongoose = require('mongoose');

// Configuration pour éviter les problèmes avec MongoDB
beforeAll(async () => {
  // Connecter une base de données en mémoire (par exemple, via MongoDB Memory Server)
  await mongoose.connect('mongodb://localhost:27017/Sport', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Fermer la connexion MongoDB après les tests
  await mongoose.connection.close();
});

// Tests pour la route "/use"
describe('GET /use', () => {
  it('should return a simple hello world message', async () => {
    const res = await request(app).get('/use');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('hello wrld');
  });
});

// Tests pour la route "/teams" (POST)
describe('POST /teams', () => {
  it('should add a team and return success message', async () => {
    const teamData = {
      Name: 'Test Team',
      Foundation: '2020',
      Owner: 'Test Owner',
    };

    const res = await request(app).post('/teams').send(teamData);
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe('added');
  });
});

// Tests pour la route "/players" (GET)
describe('GET /players', () => {
  it('should return all players', async () => {
    const res = await request(app).get('/players');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('PLayerTab');
    expect(Array.isArray(res.body.PLayerTab)).toBe(true);
  });
});

// Tests pour la route "/matches" (POST)
describe('POST /matches', () => {
  it('should add a match and return success message', async () => {
    const matchData = {
      TeamOne: 'Team A',
      TeamTwo: 'Team B',
      date: '2024-11-24',
    };

    const res = await request(app).post('/matches').send(matchData);
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe('add match succses');
  });
});

// Tests pour la météo "/weather" (POST)
// describe('POST /weather', () => {
//   it('should return weather data for a valid city', async () => {
//     const weatherData = { City: 'Paris' };

//     const res = await request(app).post('/weather').send(weatherData);
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty('resultApi');
//     expect(res.body.resultApi).toHaveProperty('temperature');
//     expect(res.body.resultApi).toHaveProperty('humidity');
//   });

//   it('should return an error for a missing city', async () => {
//     const res = await request(app).post('/weather').send({});
//     expect(res.statusCode).toBe(400);
//     expect(res.body.error).toBe('Veuillez fournir le nom de la ville dans la requête.');
//   });
// });
