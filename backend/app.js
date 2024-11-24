// importation express
const express = require ('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const axios = require("axios");
const cors = require('cors');
const authRouter = require("./routes/authRoutes")

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', authRouter);
//mongoose.connect('mongodb+srv://wajdibejaoui26:1234@cluster0.azs73u3.mongodb.net/AppSport?retryWrites=true&w=majority')

mongoose.connect('mongodb://localhost:27017/Sport', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoCreate: true // Ajout de l'option autoCreate
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Erreur de connexion à la base de données:', error);
});

db.once('open', () => {
  console.log('Connexion réussie à la base de données');
});

// Gérer la fermeture de la connexion en cas d'arrêt de l'application (optionnel)
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Fermeture de la connexion à la base de données suite à l\'arrêt de l\'application');
    process.exit(0);
  });
});



//creation app


//configuration
// Middleware de configuration CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PATCH, PUT");
    
    // Autoriser les informations d'identification (si nécessaire)
    res.setHeader("Access-Control-Allow-Credentials", "true");
    
    // Définir la durée maximale pour les requêtes de pré-vérification (preflight) (en secondes)
    res.setHeader("Access-Control-Max-Age", "86400");

    // Gérer les requêtes de pré-vérification
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});



// configuer body-parser pour structurer la reponse de be de format json
app.use(bodyParser.json());
// configurer  le body-parser le req recu
app.use(bodyParser.urlencoded({extended :true}))

//importation models
const User = require('./Models/user');
const Match = require('./Models/match');
const Player = require('./Models/player');

const Team = require('./Models/team');
//bl search match
app.post("/search", async (req,res)=>
{
  console.log("here teeam",req.body);
   MatchSearchOne = await Match.find({TeamOne: req.body.team})
  MatchSearchTwo = await Match.find({TeamTwo: req.body.team})
  const mergedResults = [...MatchSearchOne, ...MatchSearchTwo];

  console.log("metch",mergedResults);

  if(!mergedResults){
    res.json({msg:"error"});
  }
  else{
  console.log("here match search", mergedResults);
  res.json({matchSearch:mergedResults});}

})
app.get("/use",(req,res)=>{

res.send("hello wrld");})
// Bl add match
app.post("/teams",(req,res)=>{
  console.log("here teams", req.body);
  teamToSend=({
    Name: req.body.Name,
    Foundation : req.body.Foundation,
    Owner : req.body.Owner
  })
  let team = new Team(teamToSend);
  team.save();
  res.json({msg:"added"});
});
//bl add playeer
app.post("/players", async (req, res) => {
  console.log("here players", req.body);

  const { tId, name, age, position, number } = req.body;

  try {
    // Find the team by ID
    const team = await Team.findById(tId);
    if (!team) {
      return res.status(404).json({ msg: "Team not found" });
    }

    // Create the new player object
    let playerToSend = new Player({
      name: name,
      age: age,
      position: position,
      number: number, // Correct the typo here
      team: team._id
    });

    console.log("player to send", playerToSend);

    // Save the player to the database
    const savedPlayer = await playerToSend.save();
    
    // Add the player to the team's player list
    team.players.push(savedPlayer);

    // Save the updated team
    await team.save();

    return res.status(201).json({ msg: "Player added successfully" });

  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ msg: "Error processing request" });
  }
});

//bl getall players
app.get("/players",(req,res)=>{
  Player.find().then(
    (doc)=>{
      console.log("here get all plaeyrs", doc);
      res.json({PLayerTab: doc});
    }
  );
});
//bl getall teams
app.get("/teams",(req,res)=>{
  Team.find().then(
    (doc)=>{
      console.log("here teams", doc);
      res.json({TeamTab: doc});
    }
  );
});

//BL of add match
app.post("/matches", (req , res)=>{
  
  let matches = new Match(req.body);
matches.save();
  res.json({msg:"add match succses"})

});
//BL of GEtALL matches
app.get("/matches",(req, res) =>{
  console.log("here into bl of getallmatches");
  Match.find().then(
    (docs) =>
    {
      console.log("here the matches " , docs);
      res.json({ T : docs})
    }
  );


  //BL of getMatchesById
  app.get("/matches/:id",(req,res) =>{
    console.log("BL of getMatchesById");
    Match.findById(req.params.id).then(
      (doc) =>{
        console.log("here matchesById", doc);
        res.json({matchedFind : doc})
      }
    )
  })

});
//Bl of delete match
app.delete("/matches/:id",(req,res)=>{
  console.log("bl of delete match");
  Match.deleteOne({_id :req.params.id}).then((deleteResponse) =>{
    if(deleteResponse.deletedCount == 1){
      res.json({msg:"delete success "})
    }else{
      res.json({msg:"echec "})
    }
  
  })
})
// Bl of update match
app.put("/matches",(req, res)=>{
  console.log("BL od update match");
  Match.updateOne({_id:req.body._id},req.body).then(
    (updateMatch) =>{
      console.log("updated match", updateMatch);
      if(updateMatch.nModified == 1){
        res.json({msg:"update match success"})
      }
    }
  )
})

// Bl of weather
app.post("/weather", (req, res) => {
  const apiKey = "8db018b35ab6451a1aba55f816591479"; // Utilisez une variable d'environnement pour stocker la clé API
  const city = req.body.City;
console.log("here city",city);
  if (!city) {
    return res.status(400).json({ error: 'Veuillez fournir le nom de la ville dans la requête.' });
  }

  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then((apiResult) => {

      console.log("here result", apiResult);
      const result = {
      
        temperature: apiResult.data.main.temp,
        humidity: apiResult.data.main.humidity,
        pressure: apiResult.data.main.pressure,
        speed: apiResult.data.wind.speed,
        icon: `https://openweathermap.org/img/wn/${apiResult.data.weather[0].icon}@2x.png`,
      };
      res.json({ resultApi: result });
    })
    .catch((error) => {
      console.error('Erreur lors de la requête vers OpenWeatherMap:', error.message);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données météorologiques.' });
    });
});




















//exportation
module.exports = app;