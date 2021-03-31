const admin = require('firebase-admin');
const serviceAccount = require('./firebaseSetup/sprint-compass-firebase-adminsdk-key');
const { projectsCollection, sprintsCollection } = require('./envConfig');
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
  const { docs } = await db
    .collection(projectsCollection)
    .where('projectName', '==', data.oldName || data.projectName)
    .limit(1)
    .get();
  data.oldName && delete data.oldName;
  return docs[0].ref.update(data);
};

const deleteProject = async (projectName) => {
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

const getProjectsByUser = async (user) => {
  const { docs } = await db.collection(projectsCollection).get();
  const docObjects = docs.map((doc) => doc.data());
  return docObjects.filter((doc) =>
    doc.members?.find((member) => member.email === user)
  );
};

//Fetch a project ID
const getProjectIdByName = async (projectName) => {
  let { docs } = await db
    .collection(projectsCollection)
    .where('projectName', '==', projectName)
    .get();

  //Will select the last (only) document with that name
  return docs.map((doc) => doc.id);
};

const addSprintByProjectName = async (projectName, sprint) => {
  let projectId = await getProjectIdByName(projectName);

  const ref = db.collection(sprintsCollection).doc(); // empty doc for random id
  await ref.set({
    projectId,
    userStories: sprint.userStories,
    iteration: sprint.iteration
  });
};

const getSprintsByProjectName = async (projectName) => {
  let projectId = await getProjectIdByName(projectName);

  //Select the sprints with the given id
  let { docs } = await db
    .collection(sprintsCollection)
    .where('projectId', '==', `${projectId}`) //Selects different if its raw string vs variable
    .get();

  return docs.map((doc) => doc.data());
};

const updateSprint = async (updatedData) => {
  const { docs } = await db
    .collection(sprintsCollection)
    .where('projectId', '==', updatedData.projectId)
    .where('iteration', '==', updatedData.sprint.iteration)
    .limit(1)
    .get();

  return docs[0].ref.update(updatedData);
};

module.exports = {
  addProject,
  updateProject,
  deleteProject,
  checkProjectExists,
  getAllProjects,
  getProjectsByUser,
  addSprintByProjectName,
  getSprintsByProjectName,
  updateSprint
};
