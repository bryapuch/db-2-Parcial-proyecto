// Imports the Google Cloud client library

const { Spanner } = require('@google-cloud/spanner');
let database = null;

const dbConnection = function () {

  if (database === null) {

    const spanner = new Spanner({
      projectId: process.env.PROJECTID,
      credentials: {
        "type": process.env.CREDENTIALS_TYPE,
        "project_id": process.env.CREDENTIALS_PROJECT_ID,
        "private_key_id": process.env.CREDENTIALS_PRIVATE_KEY_ID,
        "private_key": process.env.CREDENTIALS_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": process.env.CREDENTIALS_CLIENT_EMAIL,
        "client_id": process.env.CREDENTIALS_CLIENT_ID,
        "auth_uri": process.env.CREDENTIALS_AUTH_URI,
        "token_uri": process.env.CREDENTIALS_TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.CREDENTIALS_AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.CREDENTIALS_CLIENT_X509_CERT_URL
      }
    });

    const instance = spanner.instance(process.env.INSTANCEID);
    database = instance.database(process.env.DATABASEID);

  }

  return database;

}

module.exports = dbConnection;