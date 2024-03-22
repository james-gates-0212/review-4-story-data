/**
 * This module creates the Sequelize to the database and
 * exports all the models.
 */
import Sequelize from 'sequelize';
import { getConfig } from '../../config';
import storyDataModel from './storydata';
import { createTunnel } from 'tunnel-ssh';

const dataModels = [storyDataModel];

const highlight = require('cli-highlight').highlight;

async function models() {
  const config = getConfig();

  const database = {} as any;

  if (config.DATABASE_HOST === undefined) {
    return null;
  }

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
  const serverOptions = {
    host: '127.0.0.1',
    port: config.DATABASE_PORT,
  };

  // Note that the forwarding options does not define the srcAddr and srcPort here.
  // to use the server configuration.
  const forwardOptions = {
    srcAddr: config.SSH_SERVER,
    srcPort: config.DATABASE_PORT,
    dstAddr: config.DATABASE_HOST,
    dstPort: config.DATABASE_PORT,
  };

  const useSSHTunnel = (config.USE_SSH_TUNNEL || '').toLowerCase() === 'true';
  const useSSL = (config.USE_SSL || '').toLowerCase() === 'true';

  let [server, conn] = useSSHTunnel ? await createTunnel(tunnelOptions, serverOptions, sshOptions, forwardOptions) : [];

  // Example how to get the server port information.
  console.log('server listen on', server?.address());

  let sequelize = new (<any>Sequelize)(config.DATABASE_DATABASE, config.DATABASE_USERNAME, config.DATABASE_PASSWORD, {
    host: useSSHTunnel ? '127.0.0.1' : config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    dialect: config.DATABASE_DIALECT,
    ...(useSSHTunnel || useSSL
      ? {
          dialectOptions: {
            ssl: {
              require: true, // This will help you. But you will see nwe error
              rejectUnauthorized: false, // This line will fix new error
              ca: config.SSL_CERT,
            },
          },
        }
      : {}),
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
