const express = require("express")
const {authorize} = require('../middleware/authorize')
const {getTodos, createTodo, deleteTodo} = require('../controllers/todoController')

const router = express.Router()

//all todos 
router.get('/', authorize, getTodos)

//create a todo
router.post('/create', authorize, createTodo)

//delete a todo
router.delete('/delete/:id', authorize, deleteTodo)


module.exports = router