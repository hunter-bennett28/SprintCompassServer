const { app } = require('./firebaseConfig');

const registerUser = async (email, pass) => {
  try {
    return await app.auth().createUserWithEmailAndPassword(email, pass);
  } catch (err) {
    console.log(`Unable to register user: ${err.message}`);
    return null;
  }
};

const signInUser = async (email, pass) => {
  try {
    return await app.auth().signInWithEmailAndPassword(email, pass);
  } catch (err) {
    console.log(`Unable to log user in: ${err.message}`);
    return null;
  }
};

module.exports = { registerUser, signInUser };
