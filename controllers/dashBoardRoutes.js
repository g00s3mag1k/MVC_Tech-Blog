const router = require('express').Router();
const { Blogpost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Dashboard route to display user's posts
router.get('/', withAuth, (req, res) => {
    Blogpost.findAll({
        where: { user_id: req.session.user_id },
        attributes: ['id', 'title', 'content'],
        include: [
            { model: Comment, attributes: ['id', 'comment_text', 'post_id', 'user_id'], include: { model: User, attributes: ['username'] } },
            { model: User, attributes: ['username'] }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Edit post route to display the edit form for a specific post
router.get('/edit/:id', withAuth, (req, res) => {
    Blogpost.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'title', 'content'],
        include: [
            { model: User, attributes: ['username'] },
            { model: Comment, attributes: ['id', 'comment_text', 'post_id', 'user_id'], include: { model: User, attributes: ['username'] } }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', { post, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// New post route to display the form for creating a new post
router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router;


// const router = require('express').Router();
// const sequelize = require('../config/connection');
// const { Blogpost, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');

// router.get('/', withAuth, (req, res) => {
//     Blogpost.findAll({
//       where: {
//         user_id: req.session.user_id
//       },
//       attributes: ['id', 'title', 'content', 'created_at'],
//       include: [
//         {
//           model: Comment,
//           attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//           include: {
//             model: User,
//             attributes: ['username']
//           }
//         },
//         {
//           model: User,
//           attributes: ['username']
//         }
//       ]
//     })
//       .then(dbPostData => {
//         const posts = dbPostData.map(post => post.get({ plain: true }));
//         res.render('dashboard', { posts, loggedIn: true });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

// router.get('/edit/:id', withAuth, (req, res) => {
//     Blogpost.findOne({
//         where: {
//           id: req.params.id
//         },
//         attributes: ['id', 'title','content','created_at'],
//         include: [
//           {
//             model: User,
//             attributes: ['username']
//           },
//           {
//             model: Comment,
//             attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//             include: {
//               model: User,
//               attributes: ['username']
//             }
//           }
//         ]
//       })
//         .then(dbPostData => {
//           if (!dbPostData) {
//             res.status(404).json({ message: 'No post found with this id' });
//             return;
//           }
//             const post = dbPostData.get({ plain: true });
//             res.render('edit-post', { post, loggedIn: true });
//         })
//         .catch(err => {
//           console.log(err);
//           res.status(500).json(err);
//         });
// })

// router.get('/new', (req, res) => {
//     res.render('new-post');
// });

// module.exports = router;