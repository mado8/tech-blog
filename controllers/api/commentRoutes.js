const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// route to add comment
router.post('/', withAuth, async (req, res) => {
    try {
        // console.log("------------------ req body ------------------")
        // console.log(req.body)
        // console.log(req.session.username)
        // console.log("------------------ req body ------------------")
        
        const commentData = await Comment.create({
            body: req.body.body,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        });
        console.log(commentData)
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err)
    }
})

// route to edit comment using comment id
router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {id: req.params.id}
        });
        res.status(200).json(commentData);

    } catch (err) {
        res.status(400).json(err)
    }
})

// route to delete comment using comment id
router.delete('/:id', withAuth , async (req, res) => {
    try {
        const commentData = await Comment.destroy({
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

module.exports = router;