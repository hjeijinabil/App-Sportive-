const mongoose = require("mongoose");

const teamShema =  mongoose.Schema({
Name: String,
Foundation :String,
 Owner: String,
 players:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
    }
 ]
});

// make model match in db
const team = mongoose.model("Team", teamShema);

module.exports = team;