const express = require('express');
const bodyParser = require('body-parser');
const { createTodo , updateTodo} = require('./types');
const app = express();
const { ToDo } = require('./db')
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());


app.post('/todo' , async (req ,res)=>{

    const payLoad = req.body;
    const parsedPayload = createTodo.safeParse(payLoad);

    if(!parsedPayload.success){
        res.status(411).json({
            message : " wrong payload"
        });
        return ;
    }
    // console.log(parsedPayload)
    
    // put it in mongodb
    parsedPayload.data['completed'] = false;
    const dbSave = await ToDo.create(parsedPayload.data);

    res.json({
        message :"Created successfully",
        todo : dbSave
    })

});

app.get('/todos' ,  async (req , res)=>{
    const todos = await ToDo.find({});

    res.json({
        todos : todos
    })
});


app.put('/completed/:id' , async (req,res)=>{
    const id = req.params.id;
    // console.log(typeof id)
    const parsedId = updateTodo.safeParse(id);
    if(!parsedId.success){
        res.status(411).json({
            message : " wrong payload"
        });
        return ;
    }
    const resp = await ToDo.updateOne({
        _id : id
    },
    {
        completed : true
    })
    res.json({
        "message" : "marked as complete  successfully"
    })

    // update it in mongodb
})





app.listen(3000 , ()=>{
    console.log("server runninf on port 3000")
})