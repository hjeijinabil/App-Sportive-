const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Importer les routes
const authRoutes = require('../routes/authRoutes');

// Configurer Express
app.use(bodyParser.json());
app.use('/users', authRoutes);

// Configuration de la base de données pour les tests
beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/Sport', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

// Ne pas supprimer la base de données après chaque test
// afterEach(async () => {
//     await mongoose.connection.db.dropDatabase();
// });

describe('Test de l\'API d\'authentification', () => {

    it('devrait inscrire un nouvel utilisateur', async () => {
        const response = await request(app)
            .post('/users/signup')
            .send({
                email: 'testuser@example.com',
                password: 'password123',
                userName: 'TestUser',
                fullName: 'Test User',
                phoneNumber: '1234567890',
                gender: 'male',
                role: 'user'
            });

        expect(response.status).toBe(200); // Vérifier que le code de statut est 200
        expect(response.body.msg).toBe('Registered successfully'); // Vérifier le message de succès
    });

    it('devrait connecter un utilisateur avec les bons identifiants', async () => {
        // Inscrire un utilisateur d'abord
        await request(app)
            .post('/users/signup')
            .send({
                email: 'testuser@example.com',
                password: 'password123',
                userName: 'TestUser',
                fullName: 'Test User',
                phoneNumber: '1234567890',
                gender: 'male',
                role: 'user'
            });

        // Essayer de se connecter avec les bons identifiants
        const response = await request(app)
            .post('/users/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(200); // Vérifier que le code de statut est 200
        expect(response.body.msg).toBe('Welcome'); // Vérifier le message de bienvenue
        expect(response.body.token).toBeDefined(); // Vérifier que le token est renvoyé
    });

    it('devrait échouer la connexion avec un mot de passe incorrect', async () => {
        // Inscrire un utilisateur d'abord
        await request(app)
            .post('/users/signup')
            .send({
                email: 'testuser@example.com',
                password: 'password123',
                userName: 'TestUser',
                fullName: 'Test User',
                phoneNumber: '1234567890',
                gender: 'male',
                role: 'user'
            });

        // Essayer de se connecter avec un mot de passe incorrect
        const response = await request(app)
            .post('/users/login')
            .send({
                email: 'testuser@example.com',
                password: 'wrongpassword'
            });

        expect(response.status).toBe(401); // Vérifier que le code de statut est 401
        expect(response.body.msg).toBe('Please check your Password'); // Vérifier le message d'erreur
    });

    it('devrait échouer la connexion avec un email non enregistré', async () => {
        // Essayer de se connecter avec un email qui n'existe pas
        const response = await request(app)
            .post('/users/login')
            .send({
                email: 'nonexistentuser@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(401);  // Vérifier que le code de statut est 401
        expect(response.body.msg).toBe('Please check your Password');  // Vérifier le message d'erreur
    });

    it('devrait échouer l\'inscription avec un email déjà existant', async () => {
        // Inscrire un utilisateur d'abord
        await request(app)
            .post('/users/signup')
            .send({
                email: 'testuser@example.com',
                password: 'password123',
                userName: 'TestUser',
                fullName: 'Test User',
                phoneNumber: '1234567890',
                gender: 'male',
                role: 'user'
            });

        // Essayer de s'inscrire avec le même email
        const response = await request(app)
            .post('/users/signup')
            .send({
                email: 'testuser@example.com',
                password: 'password123',
                userName: 'NewUser',
                fullName: 'New User',
                phoneNumber: '0987654321',
                gender: 'female',
                role: 'user'
            });

        expect(response.status).toBe(400); // Vérifier que le code de statut est 400 (Bad Request)
        expect(response.body.msg).toBe('Email already exists'); // Vérifier le message d'erreur
    });

});
