const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: Number,
  fullName: String,
  userName: String,
  phoneNumber: Number,
  gender: String,
  password: String,
  confirmPassword: String,
  email: String,
  role: String,
});

userSchema.pre('save', async function () {
  if (this.password) {
    console.log('[INFO] Hashing the password before saving.');
    this.password = await bcrypt.hash(this.password, 10);
    console.log('[SUCCESS] Password hashed successfully.');
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  console.log(`[INFO] Comparing candidate password: ${candidatePassword}`);
  const isMatch = bcrypt.compareSync(candidatePassword, this.password);
  if (isMatch) {
    console.log('[SUCCESS] Password matches.');
  } else {
    console.log('[FAILURE] Password does not match.');
  }
  return isMatch;
};

// create model
const user = mongoose.model('User', userSchema);
// exportation
module.exports = user;
