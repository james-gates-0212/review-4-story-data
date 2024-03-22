import { databaseInit } from '@/database/databaseConnection';
import SequelizeRepository from '@/database/repositories/SequelizeRepository';
import StoryDataRepository from '@/database/repositories/StoryDataRepository';

export default class StoryDataService {
  database;

  async init() {
    this.database = await databaseInit();
  }

  async findFirst() {
    if (!this.database) {
      await this.init();
    }

    if (!this.database) {
      return false;
    }

    return await StoryDataRepository.findFirst({ database: this.database, transaction: undefined });
  }

  async updateTags(storyid, data) {
    if (!this.database) {
      await this.init();
    }

    if (!this.database) {
      return false;
    }

    const transaction = await SequelizeRepository.createTransaction(this.database);

    try {
      const record = await StoryDataRepository.update(storyid, data, {
        database: this.database,
        transaction,
      });

      await SequelizeRepository.commitTransaction(transaction);

      return record;
    } catch (error) {
      console.error(error);
      await SequelizeRepository.rollbackTransaction(transaction);

      return false;
    }
  }
}
