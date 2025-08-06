
const express = require('express');
const router = express.Router();

const { getAllTodos, getTodoById, saveTodo, updateTodo, deleteTodo } = require('../Controller/todos.controller');

const { auth, restrictTo } = require('../Middlewares/auth.middleware')

// url/todos

router.get('/', getAllTodos)

router.get('/:id', getTodoById)

router.post('/', auth, restrictTo('user' , 'admin'), saveTodo) // admin | user

router.patch('/:id', auth, restrictTo('admin'), updateTodo) // admin

router.delete('/:id', auth, restrictTo('admin'), deleteTodo) // admin


// router.route('/').get(getAllTodos).post(saveTodo)



module.exports = router;
