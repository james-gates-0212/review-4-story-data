/**
 * Abstracts some basic Sequelize operations.
 * See https://sequelize.org/v5/index.html to learn how to customize it.
 */
export default class SequelizeRepository {
  /**
   * Cleans the database.
   */
  static async cleanDatabase(database) {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('Clean database only allowed for test!');
    }

    await database.sequelize.sync({ force: true });
  }

  /**
   * Creates a database transaction.
   */
  static async createTransaction(database) {
    return database.sequelize.transaction();
  }

  /**
   * Commits a database transaction.
   */
  static async commitTransaction(transaction) {
    return transaction.commit();
  }

  /**
   * Rolls back a database transaction.
   */
  static async rollbackTransaction(transaction) {
    return transaction.rollback();
  }
}
