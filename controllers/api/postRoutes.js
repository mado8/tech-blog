const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const formatDate = require('../../utils/helpers')
const withAuth = require('../../utils/auth');

// route to get a single post with post id and include its comments
router.get('/:id', withAuth , async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [User],
        });
        const commentData = await Comment.findAll({
            where: {post_id: req.params.id},
            include: [User]
        })

        req.session.post_id = req.params.id;

        if(!postData) {
            return res.status(404).json({ message: 'Post ID not Found.' });
        };

        const loggedIn = req.session.logged_in

        const post = postData.get({ plain: true });

        const comments = commentData.map((comment) => comment.get({plain:true}))

        console.log(comments)
        // render post page and comments --> 
        res.render('post', { 
            loggedIn,
            post,
            comments,
         })
        // res.status(200).json(postData);

    } catch (err) {
        res.status(400).json(err)
    }
})

// route to create post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create(req.body);
        res.status(200).json(postData);

    } catch (err) {
        res.status(400).json(err);
    }
});

// route to edit post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(req.body.data, {
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
