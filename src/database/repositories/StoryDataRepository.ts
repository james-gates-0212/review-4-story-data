import Sequelize from 'sequelize';

const Op = Sequelize.Op;

class StoryDataRepository {
  static async findFirst({ database, transaction }) {
    const record = await database.storydata.findOne({
      where: {
        dateupdated: null,
      },
      order: [['storyid', 'asc']],
      transaction,
    });

    if (!record) {
      throw new Error('Could not find');
    }

    return record;
  }
}

export default StoryDataRepository;
