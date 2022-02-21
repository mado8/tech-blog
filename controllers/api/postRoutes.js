const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const formatDate = require('../../utils/helpers')
const withAuth = require('../../utils/auth');

// route to create post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.session.user_id
        });
        res.status(200).json(postData);

    } catch (err) {
        res.status(400).json(err);
    }
});

// route to edit post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            body: req.body.body,
        }, 
        {where: {id: req.params.id}}
        );

        if(!postData) {
            return res.status(404).json({ message: 'Post ID not Found.' });
        }

        res.status(200).json(postData);

    } catch (err) {
        res.status(400).json(err);
    }
})

// route to delete post
router.delete('/:id', withAuth,  async (req,res) => {
    try {
        const postData = await Post.destroy({
            where: {id: req.params.id}
        });

        if(!postData) {
            return res.status(404).json({ message: 'Post ID not Found.' });
        }

        res.status(200).json(postData);

    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
