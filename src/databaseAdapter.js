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
    description,
    productBacklog: []
  });
};

const updateProject = async (data) => {
  const doc = await db
    .collection(projectsCollection)
    .where('projectName', '==', data.projectName)
    .get();
  return doc.update(data);
};

const deleteProject = async (name) => {
  return await db
    .collection(projectsCollection)
    .where('projectName', '==', projectName)
    .delete();
};

const checkProjectExists = async (projectName) => {
  const results = await db
    .collection(projectsCollection)
    .where('projectName', '==', projectName)
    .get();
  return Boolean(results.docs.length);
};

const getProjectsByUsername = async (userName) => {};

// TO BE REPLACED WITH GETBYUSENAME WHEN USERS IMPLEMENTED
const getAllProjects = async () => {
  const { docs } = await db.collection(projectsCollection).get();
  return docs.map((doc) => doc.data());
};

module.exports = {
  addProject,
  updateProject,
  deleteProject,
  checkProjectExists,
  getAllProjects
};
