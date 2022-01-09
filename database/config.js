// Imports the Google Cloud client library
const { Spanner } = require('@google-cloud/spanner');

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const dbConnection = async () => {
  const projectId = process.env.PROJECTID;
  const instanceId = process.env.INSTANCEID;
  const databaseId = process.env.DATABASEID;

  // Creates a client
  const spanner = new Spanner({
    projectId: projectId,
  });
}
module.exports = {
  dbConnection
}