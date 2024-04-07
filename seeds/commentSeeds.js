const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "Break yourself, fool!",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Kick it on the Red Bull's buddy.",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "I'm just here for the comments, lol.",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = async () => {
    try {
        await Comment.bulkCreate(commentData);
        console.log('Comments seeded successfully');
    } catch (err) {
        console.error(err);
    }
};

module.exports = seedComments;


// const { Comment } = require('../models');

// const commentData = [
//   {
//     comment_text: "Break yourself, fool!",
//     user_id: 1,
//     post_id: 1
//   },
//   {
//     comment_text: "Kick it on the Red Bull's buddy.",
//     user_id: 2,
//     post_id: 2
//   },
//   {
//     comment_text: "I'm just here for the comments, lol.",
//     user_id: 3,
//     post_id: 3
//   }
// ];

// const seedComments = () => Comment.bulkCreate(commentData);

// module.exports = seedComments;