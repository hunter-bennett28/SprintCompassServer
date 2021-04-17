const express = require('express');
const db = require('./src/databaseAdapter');
const port = process.env.PORT || 5000;
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static('public'));

app.post('/api/addProject', async (req, res) => {
  try {
    await db.addProject(
      req.body.projectName,
      req.body.teamName,
      req.body.description,
      req.body.startDate,
      req.body.hoursPerPoint,
      req.body.totalPoints,
      req.body.totalCost,
      req.body.members
    );
    res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: `Add project failed: ${err.message}`,
    });
  }
});

app.post('/api/updateProject', async (req, res) => {
  try {
    const { updatedData } = req.body;
    await db.updateProject(updatedData);
    res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: `Update project failed: ${err.message}`,
    });
  }
});

app.delete('/api/deleteProject', async (req, res) => {
  try {
    const { projectName } = req.query;
    const results = await db.deleteProject(projectName);
    res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: `Delete project failed: ${err.message}`,
    });
  }
});

app.get('/api/projectExists', async (req, res) => {
  try {
    const { projectName } = req.query;
    const exists = await db.checkProjectExists(projectName);
    res.status(200).send({ exists });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: `Projects query failed: ${err.message}`,
    });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const user = req.query?.user;
    const projects = await (user ? db.getProjectsByUser(user) : db.getAllProjects());
    res.status(200).send({ projects });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: `Projects query failed: ${err.message}`,
    });
  }
});

app.post('/api/addSprintByProjectName', async (req, res) => {
  try {
    const { projectName, sprint } = req.body;
    await db.addSprintByProjectName(projectName, sprint);
    res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: `Add sprint failed: ${err.message}`,
    });
  }
});

app.get('/api/getSprintsByProjectName', async (req, res) => {
  try {
    const { projectName } = req.query;
    const result = await db.getSprintsByProjectName(projectName);
    res.status(200).send({ result });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: `Sprints query failed: ${err.message}`,
    });
  }
});

app.post('/api/updateSprint', async (req, res) => {
  try {
    const { updatedData } = req.body;
    await db.updateSprint(updatedData);
    res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: `Update project failed: ${err.message}`,
    });
  }
});

// Allow all valid paths
app.get('/login', (_, res) => res.sendFile(`${__dirname}/public/index.html`));
app.get('/home', (_, res) => res.sendFile(`${__dirname}/public/index.html`));
app.get('/productbacklog', (_, res) => res.sendFile(`${__dirname}/public/index.html`));
app.get('/projectdetails', (_, res) => res.sendFile(`${__dirname}/public/index.html`));
app.get('/members', (_, res) => res.sendFile(`${__dirname}/public/index.html`));
app.get('/sprintselection', (_, res) => res.sendFile(`${__dirname}/public/index.html`));
app.get('/sprintretrospective', (_, res) => res.sendFile(`${__dirname}/public/index.html`));
app.get('/members', (_, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => {
  console.log(`successfully listening on port ${port} - env: ${process.env.NODE_ENV}`);
});
