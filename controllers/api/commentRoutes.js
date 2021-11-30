const router = require('express').Router();
const { Comments, PostComments, Posts, User } = require('../../models')

// route to add comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comments.create(req.body);
        res.status(200).json(commentData);

    } catch (err) {
        res.status(400).json(err)
    }
})

// route to edit comment using comment id
router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comments.update(req.body, {
            where: {id: req.params.id}
        });
        res.status(200).json(commentData);

    } catch (err) {
        res.status(400).json(err)
    }
})

// route to delete comment using comment id
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comments.destroy({
            where: {id: req.params.id}
        });
        res.status(200).json(commentData)

    } catch (err) {
        res.status(400).json(err)
    }
})

// -- future development --

// create route to get all comments using user id
// create route to get single comment using id and return its corresponding post as well