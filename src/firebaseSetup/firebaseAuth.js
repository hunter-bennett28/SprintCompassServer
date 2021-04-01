const { app } = require('./firebaseConfig');
const auth = require('firebase/auth');

const registerUser = async (email, pass) => {
  try {
    const credentials = await app
      .auth()
      .createUserWithEmailAndPassword(email, pass);
    //const { user } = credentials;
    console.log('registered. user credentials: ', credentials);
    return credentials;
  } catch (err) {
    console.log(`Unable to register user: ${err.message}`);
    return null;
  }
};

const signInUser = async (email, pass) => {
  try {
    const credentials = await app
      .auth()
      .signInWithEmailAndPassword(email, pass);
    //const { user } = credentials;
    console.log('signed in. user credentials: ', credentials);
    return credentials;
  } catch (err) {
    console.log(`Unable to log user in: ${err.message}`);
    return null;
  }
};

module.exports = { registerUser, signInUser };
