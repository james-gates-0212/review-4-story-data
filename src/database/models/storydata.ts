import { DataTypes } from 'sequelize';

export default function model(sequelize) {
  const storydata = sequelize.define(
    'storydata',
    {
      storyid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      catid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 1024],
        },
      },
      authorname: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 1024],
        },
      },
      description: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 1024],
        },
      },
      tagsfromauthor: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 1024],
        },
      },
      keywords: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 1024],
        },
      },
      newkeywords: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 1024],
        },
      },
      locations: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 1024],
        },
      },
      settings: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 1024],
        },
      },
      eras: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 1024],
        },
      },
      title: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 1024],
        },
      },
      option1: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      option2: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      option3: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      option4: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      option5: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      option6: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      dateupdated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      indexes: [],
      timestamps: false,
    },
  );

  return storydata;
}
