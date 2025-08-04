
const express = require('express');
const router = express.Router();

const { getAllTodos, getTodoById, saveTodo, updateTodo, deleteTodo } = require('../Controller/todos.controller');
// url/todos

router.get('/', getAllTodos)

router.get('/:id', getTodoById)

router.post('/', saveTodo)

router.patch('/:id', updateTodo)

router.delete('/:id', deleteTodo)

module.exports = router;
