
const userModel = require('../Model/users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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


exports.login = async (req, res) => {

    let { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'You Must Provide Email And Password' });
        }

        let user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'Not Found This User' })
        }

        let isValid = await bcrypt.compare(password, user.password) // boolean
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid Email Or Password' })
        }

        let token = jwt.sign({ id: user._id, email: user.email , role: user.role }, process.env.TOKEN_SECRT, { expiresIn: '7h' });
        res.status(200).json({ message: 'success', token });
    } catch (error) {
        res.status(400).json({ message: 'fail' })
    }

}