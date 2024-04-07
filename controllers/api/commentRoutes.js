const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments
router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentData => res.status(200).json(dbCommentData))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// Get a specific comment by ID
router.get('/:id', (req, res) => {
    Comment.findOne({
        where: { id: req.params.id }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.status(200).json(dbCommentData);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Create a new comment
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
        .then(dbCommentData => res.status(201).json(dbCommentData))
        .catch(err => {
            console.error(err);
            res.status(400).json({ error: 'Bad Request' });
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

// Update a comment
router.put('/:id', withAuth, (req, res) => {
    Comment.update(
        { comment_text: req.body.comment_text },
        { where: { id: req.params.id } }
    )
    .then(dbCommentData => {
        if (dbCommentData[0] === 0) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.status(200).json(dbCommentData);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Delete a comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: { id: req.params.id }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.status(204).json(dbCommentData);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;


// const router = require('express').Router();
// const { Comment } = require('../../models');
// const withAuth = require('../../utils/auth');


// router.get('/', (req, res) => {
//     Comment.findAll({})
//         .then(dbCommentData => res.json(dbCommentData))
//         .catch(err => {
//             console.log(err); 
//             res.status(500).json(err); 
//         })
// });

// router.get('/:id', (req, res) => {
//     Comment.findAll({
//             where: { 
//                 id: req.params.id}
//         })
//         .then(dbCommentData => res.json(dbCommentData))
//         .catch(err => {
//             console.log(err); 
//             res.status(500).json(err); 
//         })
// });


// router.post('/', withAuth, (req, res) => {
//     if (req.session) {
//     Comment.create({
//         comment_text: req.body.comment_text, 
//         post_id: req.body.post_id,
//         user_id: req.session.user_id,
//     })
//         .then(dbCommentData => res.json(dbCommentData))
//         .catch(err => {
//             console.log(err);
//             res.status(400).json(err);
//         })
//     }
// });


// router.put('/:id', withAuth, (req, res) => {
//     Comment.update({
//         comment_text: req.body.comment_text
//       },
//       {
//         where: {
//           id: req.params.id
//         }
//     }).then(dbCommentData => {
//         if (!dbCommentData) {
//             res.status(404).json({ message: 'No comment found with this id' });
//             return;
//         }
//         res.json(dbCommentData);
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });


// router.delete('/:id', withAuth, (req, res) => {
//     Comment.destroy({
//         where: {
//             id: req.params.id 
//         }
//     }).then(dbCommentData => {
//         if (!dbCommentData) {
//             res.status(404).json({ message: 'No comment found with this id' });
//             return;
//         }
//         res.json(dbCommentData);
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });


// module.exports = router;