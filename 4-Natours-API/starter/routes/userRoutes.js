const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

//middleware for specific params only
// router.param('id', (req, res, next, val) => {
//   console.log('tour id is', val);
//   next();
// });

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
