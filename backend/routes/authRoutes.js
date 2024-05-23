
    

const express = require('express');
const router = express.Router();
const path = require ("path");
const app = express();

const { register,login } = require('../controllers/authController');





router.post('/signup', register);
router.post('/login', login);


// router.get('/logout', logout);

module.exports = router; 