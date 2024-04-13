const router = require('express').Router();
const { Blogpost, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Blogpost.findAll({
        attributes: ['id', 'content', 'title'],
        include: [
            { model: Comment, attributes: ['id', 'comment_text', 'user_id', 'post_id'], include: { model: User, attributes: ['username'] } },
            { model: User, attributes: ['username'] }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn, username: req.session.username });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    } else {
        res.render('signup');
    }
});

router.get('/post/:id', (req, res) => {
    Blogpost.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'title', 'content'],
        include: [
            { model: Comment, attributes: ['id', 'comment_text', 'post_id', 'user_id'], include: { model: User, attributes: ['username'] } },
            { model: User, attributes: ['username'] }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render('single-post', { post, loggedIn: req.session.loggedIn, username: req.session.username });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/posts-comments/:id', (req, res) => {
    Blogpost.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'title', 'content'],
        include: [
            { model: Comment, attributes: ['id', 'user_id', 'post_id', 'comment_text'], include: { model: User, attributes: ['username'] } },
            { model: User, attributes: ['username'] }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render('posts-comments', { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;