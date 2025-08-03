const express = require('express');
const fs = require('fs');

const app = express();

// custom middleware
// app.use(function(req , res , next){
//     console.log('inside custom middleware...');
//      next();
// })

// middleware
app.use(express.json());


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

app.get('/todos' , (req , res)=>{
    fs.readFile('./data.json' , {encoding: 'utf-8'} , (error , data)=>{
        // res.send()   // content-type = 'aplication/text'
        res.status(200).json({message: 'Success' , data: data})      // content-type = 'aplication/json'
    })
})

app.get('/todos/:id' , (req , res)=>{
    let {id} = req.params;
    fs.readFile('./data.json' , {encoding: 'utf-8'} , (error , data )=>{
         let todos = JSON.parse(data)
         let todo = todos.find((todo)=> todo.id == id )
         if (!todo) {
            return res.status(404).json({message: 'there is no todo '})
         }
         res.status(200).json({message: 'success' , data: todo})
    })
})


app.post('/todos' , (req , res)=>{

    console.log(req.body)

     let todo = req.body;

    fs.readFile('./data.json' , {encoding: 'utf-8'} , (error , data)=>{
         let todos = JSON.parse(data);
         todos.push(todo);
         fs.writeFile('./data.json' , JSON.stringify(todos) , ()=>{
            res.status(201).json({message: 'Success' , data: todo});
         })
    })

})

app.patch('/todos/:id' , (req , res)=>{
    let { id } = req.params;
    let newTodo = req.body;
    console.log(newTodo)
    fs.readFile('./data.json' , {encoding: 'utf-8'} , (error, data)=>{
        let todos = JSON.parse(data);
        let todo  = todos.find((todo) => todo.id == id );
        if(!todo){
            return res.status(404).json({message: 'Todo Is Not Found'})
        }
        Object.assign( todo, newTodo);
        // let updatedTodo = {...todo , ...newTodo}
        // todos[todos.indexOf(todo)] = updatedTodo
        fs.writeFile('./data.json' , JSON.stringify(todos) , ()=>{
            res.status(201).json({message: 'Todo Updated Successfully' , data: todo})
        })
    })

})

app.delete('/todos/:id' , (req , res)=>{
    let {id} = req.params;
    fs.readFile('./data.json' , {encoding: "utf-8"} , (error , data)=>{
        let todos = JSON.parse(data);
         let filtedTodos = todos.filter((todo) => todo.id != id);
         fs.writeFile('./data.json' , JSON.stringify(filtedTodos) , ()=>{
            res.status(204).json();
         })
    })
})


// users => get , getById , post  , patch , delete


const port = 3333;
app.listen( port, ()=>{
    console.log(`Listining Successfully on port =>  ${port}`)
})



/**
 * REstful API => aplication programing interface
 * endPoint => todos
 */