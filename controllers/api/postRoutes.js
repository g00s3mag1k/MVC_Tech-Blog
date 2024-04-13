const router = require('express').Router();
const { Blogpost, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// Get all blog posts
router.get('/', (req, res) => {
    Blogpost.findAll({
        attributes: ['id', 'title', 'content'],
        order: [['DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => res.status(200).json(dbPostData.reverse()))
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Get a specific blog post by ID
router.get('/:id', (req, res) => {
    Blogpost.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'content', 'title'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.status(200).json(dbPostData);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Create a new blog post
router.post('/', withAuth, (req, res) => {
    Blogpost.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.status(201).json(dbPostData))
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Update a blog post
router.put('/:id', withAuth, (req, res) => {
    Blogpost.update({
        title: req.body.title,
        content: req.body.content
    }, {
        where: { id: req.params.id }
    })
    .then(dbPostData => {
        if (!dbPostData[0]) {
            res.status(404).json({ message: 'No post found!' });
            return;
        }
        res.status(200).json(dbPostData);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Delete a blog post
router.delete('/:id', withAuth, (req, res) => {
    Blogpost.destroy({
        where: { id: req.params.id }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(204).json(dbPostData);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;