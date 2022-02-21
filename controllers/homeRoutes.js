const router = require('express').Router()
const { Comment, Post, User } = require('.././models')
const withAuth = require('../utils/auth')
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
      include: [{ model: Post }],
    })
    
    const loggedIn = req.session.logged_in
    // render all posts on main page -->
    res.render('dashboard', {
      loggedIn,
      userData,
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

// router.get('/dashboard', withAuth, async (req,res) => {
//     try {
//         const loggedIn = req.session.logged_in
//         try {
//             const userData = await User.findByPk(req.session.user_id,
//                 {
//                 attributes: { exclude: ['password'] },
//                 include:
//                 [{ model: Post }],
//               });

//             const user = userData.get({plain: true})
//               console.log(user)
//             res.render('dashboard', {
//                 ...user,
//                 loggedIn,
//             })
//             // render the current user's posts
//         } catch (err) {
//             res.status(400).json(err);
//         }

//     } catch (err) {
//         res.status(400).json(err)
//     }
// })
module.exports = router
