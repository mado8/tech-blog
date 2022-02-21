const router = require('express').Router()
const { Comment, Post, User } = require('.././models')
const withAuth = require('../utils/auth')
const { post } = require('./api')
// route to get all posts from all users for main page

router.get('/login', async (req, res) => {
  try {
    res.render('login')
  } catch (err) {
    res.error(err)
  }
})

router.get('/signup', async (req, res) => {
  try {
    res.render('signup')
  } catch (err) {
    res.error(err)
  }
})

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.render('home')
    })
  } else {
    res.status(204).end()
  }
})

router.get('/home', async (req, res) => {
  try {
    const postData = await Post.findAll({ include: [User] })
    // map function to seperate data
    const post = postData.map((blog) => blog.get({ plain: true }))

    const loggedIn = req.session.logged_in
    // render all posts on main page -->
    res.render('home', {
      post,
      loggedIn,
    })
    // res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err)
  }
})

router.get('/dashboard', withAuth , async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {id: req.session.user_id},
      attributes: { exclude: ['password'] },
    })
    const postData = await Post.findAll({
      where: {user_id: req.session.user_id}
    })
    console.log(userData)
    
    const post = postData.map((blog) => blog.get({ plain: true }))

    console.log(post)
    const loggedIn = req.session.logged_in
    // render all posts on main page -->
    res.render('dashboard', {
      loggedIn,
      userData,
      post,
      name: req.session.username
    })
    // res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err)
  }
})

router.get('/create', withAuth, async (req, res) => {
    try {
      res.render('newpost')
    } catch (err) {
      res.error(err)
    }
  })

// route to get a single post with post id and include its comments
router.get('/post/:id', withAuth , async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {
          include: [User],
      });
      const commentData = await Comment.findAll({
          where: {post_id: req.params.id},
          include: [User]
      })

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

// route to get a single post with post id and include its comments
router.get('/edit/:id', withAuth , async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {
          include: [User],
      });
      const commentData = await Comment.findAll({
          where: {post_id: req.params.id},
          include: [User]
      })

      if(!postData) {
          return res.status(404).json({ message: 'Post ID not Found.' });
      };

      const loggedIn = req.session.logged_in

      const post = postData.get({ plain: true });

      const comments = commentData.map((comment) => comment.get({plain:true}))

      console.log(comments)
      // render post page and comments --> 
      res.render('mypost', { 
          loggedIn,
          post,
          comments,
       })
      // res.status(200).json(postData);

  } catch (err) {
      res.status(400).json(err)
  }
})

module.exports = router
