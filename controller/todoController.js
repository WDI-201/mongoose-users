// client's request -> (server) apps.js -> router ./routes/todos.js-> controller todoController.js -> model (database)Todo.js-> controller todoController.js-> client response
const Todo = require("../model/Todo");

const getAllTodos = async (req, res) => {
	try {
		const todos = await Todo.find({});
		res.status(200).json({ success: true, data: todos });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

const createTodo = async (req, res) => {
	try {
		const newTodo = await new Todo(req.body);
		const saveTodo = await newTodo.save();
		res.status(200).json({ success: true, data: saveTodo });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get route all todo's based on priority
const getTodosByPriority = async (req, res) => {
	try {
		const todos = await Todo.find({ priority: req.params.priority });
		if (todos.length === 0)
			return res
				.status(400)
				.json({ success: false, message: "No todo with this priority" });
		res.status(200).json({ success: true, data: todos });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
// Create a put route, to update our todos
const updateTodo = async (req, res) => {
	try {
		const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body);
		res.status(200).json({ success: true, message: "Todo updated" });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};
// Delete route
const deleteTodo = async (req, res) => {
	try {
		const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id });
		res
			.status(200)
			.json({ success: true, message: "Todo deleted", data: deletedTodo });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

module.exports = {
	getAllTodos,
	createTodo,
	getTodosByPriority,
	updateTodo,
	deleteTodo,
};
