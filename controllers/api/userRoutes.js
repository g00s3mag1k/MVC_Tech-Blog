const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


// router.get('/', (req, res) => {
//     User.findAll({
//         attributes: { exclude: ['password']}
//     })
//     .then( - => res.json( - ))
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

// router.get('/:id', (req, res) => {
//     User.findOne({
//         attributes: { exclude: ['password']},
//         where: {
//             id: req.params.id
//         },
//         include: [{
//             model: Post,
//             attributes: ['id', 'title', 'post_text', 'created_at']
//         },
//         {
//             model: Comment,
//             attributes: ['id', 'comment_text', 'created_at'],
//             include: {
//                 model: Post,
//                 attributes: ['title']
//             }
//         },
//     ]
//     })
//     .then( - => {
//         if(!-) {
//             res.status(404).json({ message: 'User not found with assosciated id'});
//             return;
//         }
//         res.json( - );
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

module.exports = router;