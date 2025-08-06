const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const swagger = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json')

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
dotenv.config();

app.use('/todos', todosRoutes);
app.use('/users', usersRoutes);



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




app.use(express.static('./Static'));
app.set('view engine' , 'pug');
app.set('views' , './View');

app.use('/api-docs' , swagger.serve , swagger.setup(swaggerDocs));

app.use('/' , function(req, res ,next){
    res.status(404).json({message: `ther is no endPoint In this name ${req.url}`})
})

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







// 123456   => dkfjfr34984hfdf34890dkfjd

// 1234567   => dkfjfr34984dfdfdhfdf34890dkfjd