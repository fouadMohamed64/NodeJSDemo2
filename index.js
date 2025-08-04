const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const todosRoutes = require('./Routes/todos.routes');
const usersRoutes = require('./Routes/users.routes')

// custom middleware
// app.use(function(req , res , next){
//     console.log('inside custom middleware...');
//      next();
// })

// middleware
app.use(express.json());
app.use(cors());

app.use('/todos', todosRoutes);
app.use('/users', usersRoutes);
app.use('/' , function(req, res ,next){
    res.status(404).json({message: `ther is no endPoint In this name ${req.url}`})
})


// hello => hello world

// app.get('/hello' , (req, res)=>{
//     // console.dir(req , {depth: null})
//     // console.dir(res , {depth: null})
//     res.send('hello world')
// })

// first match first win
// app.get('/todos' , (req ,res)=>{
//     res.send('there is not todos')
// })



// users => get , getById , post  , patch , delete




app.use(express.static('./Static'))

mongoose.connect('mongodb://127.0.0.1:27017/NTIFive2')
    .then(()=> console.log('Connect to DB Successfully'))
    .catch((error)=> console.log('There is error in connection'))

const port = 3333;
app.listen(port, () => {
    console.log(`Listining Successfully on port =>  ${port}`)
})



/**
 * REstful API => aplication programing interface
 * endPoint => todos
 */