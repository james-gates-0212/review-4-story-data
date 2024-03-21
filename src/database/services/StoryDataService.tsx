import { databaseInit } from '@/database/databaseConnection';
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

    return await StoryDataRepository.findFirst({ database: this.database, transaction: undefined });
  }
}
