const router = require('express').Router();
const { Posts, User } = require('../../models')

// route to create user
router.post('/', async (req, res) => {
    try {
        const userData = User.create(req.body);
        res.status(200).json(userData);

    } catch (err) {
        res.status(400).json(err)
    }
})

// route to delete user
router.delete('/:id', async (req, res) => {
    try {
        const userData = User.destroy(req.params.id);
        res.status(200).json(userData);

    } catch  (err) {
        res.status(400).json(err);
    }
})

// route to get all posts through user id
router.get('/:id', async (req, res) => {
    try {
        const userData = User.findByPk(req.params.id, {
            include: [{model: Posts}]
        });
        res.status(200).json(userData);

    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;