const mongoose = require("mongoose");

const matchShema =  mongoose.Schema({
TeamOne: String,
TeamTwo :String,
ScoreOne : Number,
ScoreTwo : Number
});

// make model match in db
const match = mongoose.model("Match", matchShema);

module.exports = match;