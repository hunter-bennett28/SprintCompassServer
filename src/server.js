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
    res.status(500).send({
      message: `Add project failed: ${err.message}`
    });
  }
});

const start = () => {
  app.listen(port, () => {
    console.log(`successfully listening on port ${port}`);
  });
};

module.exports = { start };
