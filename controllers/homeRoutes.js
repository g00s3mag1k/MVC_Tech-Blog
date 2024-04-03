const router = require('express').Router();
const sequelize = require('./');
const { Blogpost, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Blogpost.findAll({
      attributes: ['id', 'post_contents', 'title', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_contents', 'user_id', 'post_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', {
          posts,  
          loggedIn: req.session.loggedIn,
          username: req.session.username
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard', {username: req.session.username});
      return;
    }
    res.render('login');
  });

   router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('signup');
  });

  router.get('/post/:id', (req, res) => {
    Blogpost.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'post_contents', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_contents', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }

        const post = dbPostData.get({ plain: true });
        res.render('single-post', {
          post,
          loggedIn: req.session.loggedIn,
          username: req.session.username
        });
        
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;