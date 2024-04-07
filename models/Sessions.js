const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Session = sequelize.define('Session', {
  sid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  expires: {
    type: DataTypes.DATE
  },
  data: {
    type: DataTypes.TEXT
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
});

module.exports = Session;