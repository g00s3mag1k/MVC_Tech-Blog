const { User } = require('../models');

const userData = [
  {
    username: 'g00s3',
    password: 'test1'
    
  },
  {
    username: 'TwisTed',
    password: 'test2'
  },
  {
    username: 'Scyk1k',
    password: 'test3'
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;

// const { User } = require('../models')

// const users = [{
//     id: 1,
//     name: '',
//     email: '',
//     password: '',
// },
// {
//     id: 2,
//     name: '',
//     email: '',
//     password: '',
// },
// {
//     id: 3,
//     name: '',
//     email: '',
//     password: '',
// },
// {
//     id: 4,
//     name: '',
//     email: '',
//     password: '',
// },
// ];

// const user = () => User.bulkCreate(users);

// module.exports = user;