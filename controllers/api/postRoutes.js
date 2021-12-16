const router = require('express').Router();
const { Comments, PostComments, Posts, User } = require('../../models');
const { post } = require('./commentRoutes');

// route to create post
router.post('/', async (req, res) => {
    try {
        const postData = await Posts.create(req.body);
        res.status(200).json(postData);

    } catch (err) {
        res.status(400).json(err);
    }
});

// route to edit post
router.put('/:id', async (req, res) => {
    try {
        const postData = await Posts.update(req.body.data, {
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
router.delete('/:id', async (req,res) => {
    try {
        const postData = await Posts.destroy({
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

// route to get a single post with post id and include its comments
router.get('/:id', async (req, res) => {
    try {
        const postData = await Posts.findByPk(req.params.id, {
            include: [{model: Comments, through: PostComments, as: 'post_comments'}]
        });

        if(!postData) {
            return res.status(404).json({ message: 'Post ID not Found.' });
        };

        const post = postData.get({ plain: true })

        // render post page and comments --> 
        // res.render('blog', { post })
        res.status(200).json(postData);

    } catch (err) {
        res.status(400).json(err)
    }
})

// route to get all posts from all users for main page
router.get('/', async (req, res) => {
    try {
        const postData = User.findAll({
            include: [{model: Posts}]
        });

        // map function to seperate data
        const posts = postData.map((blog) =>
            blog.get({plain: true})
        )

        // render all posts on main page --> 
        // res.render('main', { posts })
        res.status(200).json(postData);

    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
