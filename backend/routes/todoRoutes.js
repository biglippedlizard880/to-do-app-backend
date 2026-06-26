const express = require("express");
const app=express.Router();
const {getalltasks,gettaskbyid,deletetask,addtask,updatetask}=require("../controller/todocontroller");
//Get all the tasks
app.get("/todos",getalltasks);
//Get task by id
app.get("/todos/:id",gettaskbyid);
//Delete task by id
app.delete("/todos/:id",deletetask);
//Post task 
app.post("/todos",addtask);
//Update task by id
app.put("/todos/:id",updatetask)
module.exports=app;