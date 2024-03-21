/**
 * This module creates the Sequelize to the database and
 * exports all the models.
 */
import Sequelize from 'sequelize';
import { getConfig } from '../../config';
import * as pg from 'pg';
import storyDataModel from './storydata';
import { createTunnel } from 'tunnel-ssh';

const dataModels = [storyDataModel];

const highlight = require('cli-highlight').highlight;

const ca =
  '-----BEGIN CERTIFICATE-----\
MIIEQTCCAqmgAwIBAgIULQBJVAhuzPymBXcBAbAwYrX4zUEwDQYJKoZIhvcNAQEM\
BQAwOjE4MDYGA1UEAwwvOWE5NGM5MDItYTQyNC00MTUxLTg3ZDktYzFkZWU4ODBj\
OTlhIFByb2plY3QgQ0EwHhcNMjQwMzA5MTczMzEzWhcNMzQwMzA3MTczMzEzWjA6\
MTgwNgYDVQQDDC85YTk0YzkwMi1hNDI0LTQxNTEtODdkOS1jMWRlZTg4MGM5OWEg\
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKdSGV1q\
uzwvvIhgWGq8zYlYFX5U5xKiQzFKD/+5YQ6acLkFGHXrXh4n1IrFauZ9Iz42qiGi\
+WbJyyW1z4NT6ixMiUCKTHGmsYRTmsvmjkTgk1AT9Qaray/ybVdCybeCHbjM7dS7\
cpewZ1wWrvrT4Pla6r+w5lPpUalpxjgY2odgjaQXwdDP2HXDyPN6114zvjf90sF2\
vkV3d7ITejzTC5j8PqTuk3LynCXXxqwC7G4eFjbcgIh8o4V92hkqbf6quVRrV85z\
s5kIdFz1UrhfjCFOKKqjFzt3ZGx2Lkyvg04Eiomm9jzdJSDUVSLtfgynqY9fqlta\
zhKU9HtLDFa+M5nC/RNlYNHxVuRmxnsMkE+ZjOgMy336fQyTN8YiJyEOZ65uBQS4\
8quQE9B4qW4bshVNEJYTImBZ/TJilV+0GoABq3DkBRYFUncDsed9dOdamOs/eI1M\
AhOjFoJQv1DZWxQhgOAnz7QnF2G5YTeTJrxFdHUBBG41tNSpj3OHIL3uuQIDAQAB\
oz8wPTAdBgNVHQ4EFgQUgD/+EwTxD43zVKHNd1F2G+N5Sm0wDwYDVR0TBAgwBgEB\
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBACRadhI3SRYMGt1J\
WNOlJEEddYTiyHdg1tGIwBMWcyqhbG3NZolJqb4W20414es7X/+eCBBQT9oZe2Ey\
6IdgHGsgxhm/r7GBboL13e3qUBQZaXlV8InYEtYmJ+jg2yG++6ZTv2RdlGwM7Awn\
xW91zMzd70UDJq2iB9Q4DkJlVO/tiZv9R5cBq7d8MCwupwm/+YY+7/jCAuj6xgcU\
SbSNHyP3ouQgKa5xTTM4aL4CTQySWP+6EDqI876j+ksVrtInUO9FTJwY79TKwveJ\
eZDoFoez3ThjqqBJZ0LzHmHOjsH+l8YNc4Vhk+OzLhmXf/sRxJN67oI2gR6KMGHA\
0LTMo8WDvG2uc/IiMQuuq9NLStTZddBZhpTAFvAv4gYR/PX83SWV4W0V0RDzTJR6\
spQbe+vFZxgVzZZWVIVrLvawfJRu8voC57bnINskT65gJIsNUnvES0ybAIwZZ6oi\
/m6/NZfKfsYQuiBI1buOwNngVLzrOeSQ12i1FpCtynHf7Vfylg==\
-----END CERTIFICATE-----';

async function models() {
  const config = getConfig();

  const database = {} as any;

  const tunnelOptions = {
    autoClose: true,
  };

  const sshOptions = {
    host: config.SSH_SERVER,
    port: config.SSH_PORT,
    username: config.SSH_USER,
    password: config.SSH_PASSWORD,
  };

  // Here is where the magic happens...
  const serverOptions = {};

  // Note that the forwarding options does not define the srcAddr and srcPort here.
  // to use the server configuration.
  const forwardOptions = {
    srcAddr: '127.0.0.1',
    srcPort: config.DATABASE_PORT,
    dstAddr: '146.190.122.42',
    dstPort: config.DATABASE_PORT,
  };

  let [server, conn] = await createTunnel(tunnelOptions, serverOptions, sshOptions, forwardOptions);

  // Example how to get the server port information.
  console.log('server listen on', server?.address());

  let sequelize = new (<any>Sequelize)(config.DATABASE_DATABASE, config.DATABASE_USERNAME, config.DATABASE_PASSWORD, {
    host: '127.0.0.1',
    port: config.DATABASE_PORT,
    dialect: config.DATABASE_DIALECT,
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false, // This line will fix new error
        ca: ca,
      },
    },
    logging:
      config.DATABASE_LOGGING === 'true'
        ? (log) =>
            console.log(
              highlight(log, {
                language: 'sql',
                ignoreIllegals: true,
              }),
            )
        : false,
  });

  dataModels.forEach((dataModel) => {
    const model = dataModel(sequelize);
    database[model.name] = model;
  });

  Object.keys(database).forEach(function (modelName) {
    if (database[modelName].associate) {
      database[modelName].associate(database);
    }
  });

  database.sequelize = sequelize;
  database.Sequelize = Sequelize;

  return database;
}

export default models;
