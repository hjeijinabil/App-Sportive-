const mongoose = require('mongoose');
const User = require('../Models/user');
const bcrypt = require('bcrypt');

describe('User Model - Hash and Compare Password', () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Disconnect database
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Clear the User collection after each test
    await User.deleteMany({});
  });

  it('should hash the password before saving', async () => {
    const userData = {
      fullName: 'Test User',
      userName: 'TestUser',
      phoneNumber: 1234567890,
      gender: 'male',
      password: 'plainpassword',
      email: 'testuser@example.com',
      role: 'user',
    };

    console.log('[TEST] Starting test for password hashing.');
    const user = new User(userData);
    await user.save();

    console.log('[TEST] Verifying that the password is hashed.');
    expect(user.password).not.toBe(userData.password); // Password should not be plain text
    const isHashed = await bcrypt.compare(userData.password, user.password);
    expect(isHashed).toBe(true); // Verify that hashing was successful
    console.log('[SUCCESS] Password hashing test passed.');
  });

  it('should correctly compare a candidate password with the stored password', async () => {
    const userData = {
      fullName: 'Test User',
      userName: 'TestUser',
      phoneNumber: 1234567890,
      gender: 'male',
      password: 'mypassword',
      email: 'testuser@example.com',
      role: 'user',
    };

    console.log('[TEST] Starting test for password comparison.');
    const user = new User(userData);
    await user.save();

    console.log('[TEST] Verifying password comparison with correct password.');
    const isMatch = await user.comparePassword('mypassword');
    expect(isMatch).toBe(true); // Password should match

    console.log('[TEST] Verifying password comparison with incorrect password.');
    const isNotMatch = await user.comparePassword('wrongpassword');
    expect(isNotMatch).toBe(false); // Wrong password should not match

    console.log('[SUCCESS] Password comparison test passed.');
  });
});
