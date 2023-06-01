const express = require("express");
const router = express.Router();
const {
	updateTodo,
	getAllTodos,
	createTodo,
	getTodosByPriority,
	deleteTodo,
} = require("../controller/todoController");

router.get("/all-todos", getAllTodos);
router.post("/new-todo", createTodo);
router.get("/todo-by-priority/:priority", getTodosByPriority);
router.put("/update-todo/:id", updateTodo);
router.delete("/delete-todo/:id", deleteTodo);

module.exports = router;
