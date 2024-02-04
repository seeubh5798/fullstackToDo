const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://shubham:{passwordhere}@cluster0.pavfvgo.mongodb.net/ToDoFullStack").then(()=>{
    console.log("DB Connection established");
})

const ToDoSchema = new mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
});

const ToDo = mongoose.model('ToDos', ToDoSchema);


module.exports = {ToDo};