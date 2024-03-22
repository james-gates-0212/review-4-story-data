import moment from 'moment';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

const safeString = (values) => (Array.isArray(values) ? values.join(', ') : values.toString());

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

  static async update(storyid, data, { database, transaction }) {
    let record = await database.storydata.findOne({
      where: {
        storyid,
      },
      transaction,
    });

    if (!record) {
      throw new Error('Could not find');
    }

    record = await database.storydata.update(
      {
        keywords: safeString(data.keywords),
        locations: safeString(data.locations),
        settings: safeString(data.settings),
        eras: safeString(data.eras),
        dateupdated: moment(),
      },
      {
        where: {
          storyid,
        },
        transaction,
      },
    );

    return record;
  }
}

export default StoryDataRepository;
