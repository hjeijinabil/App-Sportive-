const User = require("../Models/user")
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
const express = require("express");
const session = require ("express-session");
const { StatusCodes } = require('http-status-codes');
const { log } = require("util");
const multer = require("multer");
const path = require ("path");
const app = express();
const secretKey = "your-secret-key";
// confi encodage data
app.use(
    session({
        secret: secretKey,
        resave: false,
        saveUninitialized: true
    })
);// Middleware to check and validate JWT



 
  
 
  
 
const register = async (req, res) => {
  
    try {
        // Vérifiez si l'email existe déjà dans la base de données
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            // Retourner un statut 400 si l'email existe déjà
            return res.status(400).json({ msg: 'Email already exists' });
        }

        // Créer un nouvel utilisateur avec le mot de passe haché
        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            userName: req.body.userName,
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
            role: req.body.role, // Correction: "gender" répété auparavant

            // avatar: `http://localhost:3000/images/${req.file.filename}` si vous avez une image de profil
        });

        // Sauvegardez l'utilisateur dans la base de données
        await newUser.save();
        
        // Retourner un message de succès
        res.json({ msg: 'Registered successfully' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ msg: 'Internal server error' });  // Statut 500 en cas d'erreur serveur
    }
};

 



const login = async (req, res) => {
    let user = req.body;

    // Check if the email exists
    const doc = await User.findOne({ email: user.email })
        // Email not found
        if (!doc) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Please check your Password" });
        }
    

        // Compare passwords
        const pwdResult = await doc.comparePassword(user.password);
        // Passwords do not match
        if (!pwdResult) {
return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Please check your Password" });
        }

        let userToSend = {
            userName: doc.userName,
            fullName: doc.fullName,
            id: doc._id,
            email: doc.email,
            gender: doc.gender,
            phoneNumber: doc.phoneNumber,
            role: doc.role
        };
        console.log(userToSend)

        const token = jwt.sign(userToSend, secretKey, { expiresIn: '24h' });
        console.log("Token  : ",token);

        res.json({ msg: "Welcome", token: token });
}


module.exports = {
    register,
    login
  };
  