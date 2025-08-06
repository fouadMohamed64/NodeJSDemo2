
const todosModel = require('../Model/todos.model')

exports.getAllTodos = async (req, res) => {
    let todos = await todosModel.find().populate('userId', '-_id -password -__v')
    res.status(200).json({ message: 'Success', data: todos })
}

exports.getTodoById = async (req, res) => {
    let { id } = req.params;
    try {
        let todo = await todosModel.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'there is no todo ' })
        }
        res.status(200).json({ message: 'success', data: todo })
    } catch (error) {
        res.status(400).json({ message: 'fail' })
    }
}

exports.saveTodo = async (req, res) => {
    let newTodo = req.body;
    try {
        const todo = await todosModel.create(newTodo);
        res.status(201).json({ message: 'Created Succssfully', data: todo })
    } catch (error) {
        res.status(400).json({ message: 'fail ' })
    }
}

exports.updateTodo = async (req, res) => {
    let { id } = req.params;
    let newTodo = req.body;
    try {
        const updatedTodo = await todosModel.findByIdAndUpdate(id, { $set: newTodo }, { new: true });
        if (!updatedTodo) return res.status(404).json({ message: 'Todo Is Not Found' });
        res.status(201).json({ message: 'updated successfully', data: updatedTodo })
    } catch (error) {
        res.status(400).json({ message: 'fail' })
    }

}

exports.deleteTodo = async (req, res) => {
    let { id } = req.params;
    try {
        let todo = await todosModel.findByIdAndDelete(id)
        if (!todo) return res.status(404).json({ message: 'Todo Is Not Found' })
        res.status(204).json()
    } catch (error) {
        res.status(400).json({ message: 'fail' })
    }
}

exports.viewAllTodos = async (req, res) => {
    let todos = await todosModel.find();
    res.render('todos', { todos });
}