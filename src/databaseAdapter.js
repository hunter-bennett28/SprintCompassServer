const admin = require('firebase-admin');
const serviceAccount = require('./firebaseSetup/sprint-compass-firebase-adminsdk-key');
const { projectsCollection } = require('./envConfig');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Adds a new project to the projects collection with a randomly generated id
const addProject = async (projectName, companyName = '', description = '') => {
  const ref = db.collection(projectsCollection).doc(); // empty doc for random id
  await ref.set({
    projectName,
    companyName,
    description
  });
};

module.exports = {
  addProject
};
