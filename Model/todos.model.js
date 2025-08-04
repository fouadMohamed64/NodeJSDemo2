const mongoose = require('mongoose');

const todosSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [2 , 'You must provide more than 2 chars' ],
        maxLength: 30 
    },
    status: {
        type: String,
        enum: ['Todo' , 'In-Progress' , 'Done'],
        default: 'Todo'
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }
});

const todosModel = mongoose.model('todo' , todosSchema);
module.exports = todosModel;