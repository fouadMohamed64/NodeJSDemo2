
const express = require('express');
const router = express.Router();

const {getAllUsers , getUserById , saveUser , updateUser , deleteUser} = require('../Controller/users.controller')

router.get('/' , getAllUsers);
router.get('/:id' , getUserById);
router.post('/' , saveUser);
router.patch('/:id' , updateUser);
router.delete('/:id' , deleteUser)

module.exports = router;