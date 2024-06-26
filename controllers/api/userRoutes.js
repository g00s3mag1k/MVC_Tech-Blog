const router = require('express').Router();
const { User, Blogpost, Comment } = require('../../models');

// Get all users (excluding password)
router.get('/', (req, res) => {
    User.findAll({ attributes: { exclude: ['password'] } })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get a specific user by ID
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
        include: [
            { model: Blogpost, attributes: ['id', 'title', 'content'] },
            { model: Comment, attributes: ['id', 'comment_text'], include: { model: Blogpost, attributes: ['title'] } },
            { model: Blogpost, attributes: ['title'] }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create a new user
router.post('/', (req, res) => {
    User.create({ username: req.body.username, password: req.body.password })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Update a user by ID
router.put('/:id', (req, res) => {
    User.update(req.body, { individualHooks: true, where: { id: req.params.id } })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete a user by ID
router.delete('/:id', (req, res) => {
    User.destroy({ where: { id: req.params.id } })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// User login route
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that username!'});
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
  
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
      
            res.json({ user: dbUserData, message: 'You are logged in!' });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// User logout route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;