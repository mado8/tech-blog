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

// route to get all of the logged in user's posts through user id
router.get('/:id', async (req, res) => {
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
      // Find the user who matches the posted e-mail address
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      // Verify the posted password with the password store in the database
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      // Create session variables based on the logged in user
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      }); 
    } catch (err) {
        res.status(500).json(err)
    }
});

// route to destroy session
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      // Remove the session variables
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;