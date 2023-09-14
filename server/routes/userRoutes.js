const express = require('express');
const router = express.Router();
const {
  createNewUser,
  login,
  deleteUser,
} = require('../controllers/userControllers');

router.post('/createNewUser', createNewUser);
router.post('/login', login);
router.delete('/delete', deleteUser);
// router.put('/updateUser', updateUser);

module.exports = router;
