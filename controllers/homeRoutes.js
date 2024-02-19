const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    Post.findAll({
        include: [{
            model: User,
            attributes: ['username'],
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    ],
    })
    .then(data => {
        const posts = data.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts, loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/posts/:id', async (req, res) => {
    try {
       const postData = await Blogpost.findByPk(req.params.id, {
        include: [{
            model: User,
            attributes: ['username'],
        }],
       });
    const posts = postData.get({ plain: true });
    
       // Do something with postData
    } catch (error) {
       // Handle error
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;