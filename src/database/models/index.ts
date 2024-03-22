/**
 * This module creates the Sequelize to the database and
 * exports all the models.
 */
import * as pg from 'pg';
import { Sequelize } from 'sequelize';
import { getConfig } from '../../config';
import storyDataModel from './storydata';

const dataModels = [storyDataModel];

const highlight = require('cli-highlight').highlight;

async function models() {
  const config = getConfig();

  const database = {} as any;

  if (config.DATABASE_HOST === undefined) {
    return null;
  }

  let sequelize = new (<any>Sequelize)(config.DATABASE_DATABASE, config.DATABASE_USERNAME, config.DATABASE_PASSWORD, {
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        ssl: true,
        rejectUnauthorized: false,
        ca: config.SSL_CERT,
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
