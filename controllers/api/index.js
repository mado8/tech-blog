const router = require('express').Router();
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');

router.use('/comments', commentRoutes);
router.use('/post', postRoutes);
router.use('/', userRoutes);

module.exports = router;