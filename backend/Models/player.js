const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
    numberr : Number,
   name: String,
   position: String,
   age: Number,
   id: Number,
   team:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
   }

 


});


// create model
const player = mongoose.model("Player", playerSchema);
//exportation
module.exports = player;