const { Blogpost } = require('../models');

const postData = [
    {
        title: 'Node.js',
        content: 'I really loved learning about Node.js.',
        user_id: 1
    },
    {
        title: 'Why MVC?',
        content: 'MVC allows developers to maintain true separation of concerns.',
        user_id: 2
    },
    {
        title: 'Authentication vs. Authorization',
        content: 'The difference where authentication is confirming your own identity, authorization means being allowed access to systems.',
        user_id: 3
    }
];

const seedPosts = async () => {
    try {
        await Blogpost.bulkCreate(postData);
        console.log('Posts seeded successfully');
    } catch (err) {
        console.error(err);
    }
};

module.exports = seedPosts;