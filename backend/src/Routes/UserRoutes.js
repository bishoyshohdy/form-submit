const express = require('express'); 
const router = express.Router();
const {createUser, upload, getAllUsers} = require('../Controllers/UserController');

router.route('/')
.post(upload.fields([
    { name: 'technology', maxCount: 1 },
    { name: 'businessModel', maxCount: 1 },
  ]), createUser);

router.get('/', getAllUsers);


module.exports = router;
