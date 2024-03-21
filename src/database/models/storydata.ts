import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const storydata = sequelize.define('storydata', {
    storyid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255],
      },
    },
    authorname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255],
      },
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255],
      },
    },
    tagsfromauthor: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255],
      },
    },
    keywords: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255],
      },
    },
    newkeywords: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255],
      },
    },
    locations: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255],
      },
    },
    settings: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255],
      },
    },
    eras: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255],
      },
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255],
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
  });

  return storydata;
}
