const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  projectsCollection: process.env.PROJECTSCOLLECTION,
  sprintsCollection: process.env.SPRINTSCOLLECTION
};
