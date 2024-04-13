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

const seedUsers = async () => {
    try {
        await User.bulkCreate(userData);
        console.log('Users seeded successfully');
    } catch (err) {
        console.error(err);
    }
};

module.exports = seedUsers;