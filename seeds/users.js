const { User } = require('../models')

const users = [{
    id: 1,
    name: '',
    email: '',
    password: '',
},
{
    id: 2,
    name: '',
    email: '',
    password: '',
},
{
    id: 3,
    name: '',
    email: '',
    password: '',
},
{
    id: 4,
    name: '',
    email: '',
    password: '',
},
];

const user = () => User.bulkCreate(users);

module.exports = user;