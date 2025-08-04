
const userModel = require('../Model/users.model')

exports.getAllUsers = async (req, res) => {
    try {
        let users = await userModel.find();
        res.status(200).json({ message: 'success', data: users })
    } catch (error) {
        res.status(400).json({ message: 'fail' })
    }
}

exports.getUserById = async (req, res) => {
    let { id } = req.params;
    try {
        let user = await userModel.findOne({ _id: id });
        if (!user) return res.status(404).json({ message: 'there is no user' })
        res.status(200).json({ message: 'success', data: user })
    } catch (error) {
        res.status(400).json({ message: 'fail' })
    }
}

exports.saveUser = async (req, res) => {
    let newUser = req.body;
    try {
        let user = await userModel.create(newUser);
        res.status(201).json({ message: 'success', data: user })
    } catch (error) {
        // console.log(error)
        res.status(400).json({ message: 'fail' })
    }
}

exports.updateUser = async (req, res) => {
    let { id } = req.params;
    let updates = req.body;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(id, { $set: updates }, { new: true })
        if (!updatedUser) return res.status(404).json({ message: 'there is no user' })
        res.status(201).json({ message: 'success', data: updatedUser })
    } catch (error) {
        res.status(400).json({ message: 'fail' })
    }
}

exports.deleteUser = async (req, res) => {
    let { id } = req.params;
    try {
        let user = await userModel.findByIdAndDelete(id)
        if (!user) return res.status(404).json({ message: 'there no user ' })
        res.status(204).json()
    } catch (error) {
        res.status(400).json()
    }
}