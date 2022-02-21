const router = require('express').Router();
const { Comment, PostComment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// route to create user
router.post('/user', async (req, res) => {
    try {
      const userData = await User.findOne({where: {username: req.body.username}});
      if(userData){
        res.status(400).json({ message:'User already exists please login'});
        return;
      }
        const userCreateData = await User.create(req.body);

        req.session.save(() => {
          req.session.user_id = userCreateData.id;
          req.session.logged_in = true;
          req.session.username = req.body.username;
          res.status(200).json(userCreateData);
        });
    } catch (err) {
        res.status(400).json(err)
    }
})

// route to delete user
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const userData = User.destroy({
          where: {
            id: req.params.id,
          },
        });
        if (!userData) {
          res.status(404).json({ message: 'No user with this id!' });
          return;
        }
        res.status(200).json(`user number ${req.params.id} has been deleted`);
    } catch  (err) {
        res.status(400).json(err);
    }
})

// route to get all of the logged in user's posts through user id
router.get('/user/:id', withAuth , async (req, res) => {
    try {
        const userData = User.findByPk(req.params.id, {
            include: [{model: Posts}],
            exclude: [{model: User}]
        });

        // render the current user's posts
        res.status(200).json(userData);

    } catch (err) {
        res.status(400).json(err);
    }
})

// route to check login credentials and start session if they exist
router.post('/login', async (req, res) => {
    try {
      console.log('You made it to the login page!')
      // Find the user who matches the posted e-mail address
      const userData = await User.findOne({ where: { username: req.body.username } });
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
      console.log(userData)
      // Verify the posted password with the password store in the database
      const validPassword = await userData.checkPassword(req.body.password);

      console.log(validPassword)
      
      if (!validPassword) {
        res
          .status(404)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      // Create session variables based on the logged in user
      req.session.save(() => {
        req.session.username = userData.username
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.status(200).json({ user: userData, message: 'You are now logged in!' });
      }); 
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;