const express = require('express');
const cors = require('cors');
const db = require('./databaseAdapter');
const { port } = require('./envConfig');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.post('/api/addProject', async (req, res) => {
  try {
    const { projectName, companyName, description } = req.body;
    await db.addProject(projectName, companyName, description);
    res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: `Add project failed: ${err.message}`
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
      message: `Update project failed: ${err.message}`
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
      message: `Delete project failed: ${err.message}`
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
      message: `Projects query failed: ${err.message}`
    });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const user = req.query?.user;
    const projects = await (user
      ? db.getProjectsByUser(user)
      : db.getAllProjects());
    res.status(200).send({ projects });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: `Projects query failed: ${err.message}`
    });
  }
});

const start = () => {
  app.listen(port, () => {
    console.log(`successfully listening on port ${port}`);
  });
};

module.exports = { start };
