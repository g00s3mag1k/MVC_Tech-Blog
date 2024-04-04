const { User } = require('../models');

const userData = [
  {
    username: 'g00s3',
    email: 'g00s3@email.com',
    password: 'test1'
    
  },
  {
    username: 'TwisTed',
    email: 'TwisTed@email.com',
    password: 'test2'
  },
  {
    username: 'Scyk1k',
    email: 'Scyk1k@email.com',
    password: 'test3'
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;