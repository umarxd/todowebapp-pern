const pool = require("../db")

const getTodos = async(req, res) => {
    try {
        // get todo name and description for a specified user id
        const user = await pool.query(
        "SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
        [req.user.id]
      )

      if(user.rows[0].todo_id === null){
          res.json([])
      }else{
        res.json(user.rows)
      }
      
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }
}

const createTodo = async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
        "INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *",
        [req.user.id, description]
    )

    res.json(newTodo.rows[0])
    } catch (error) {
        console.error(err.message)
    }
}

const deleteTodo = async(req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query(
        "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
        [id, req.user.id]
        );

        if (deleteTodo.rows.length === 0) {
            return res.json("This todo is not yours")
        }

        res.json("Todo was deleted")
    } catch (error) {
        console.error(err.message)
    }
}


module.exports = {getTodos, createTodo, deleteTodo}