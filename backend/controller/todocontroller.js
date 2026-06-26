const TodoSchema = require("../models/Todo.js");
//Get the list of all the tasks 
const getalltasks = async(req,res)=>{
    try{
    const list =await TodoSchema.find();
    if(!list||list.length===0){
        return res.status(200).json({
            success:false,
            message:"No data found"
        })
    }
           res.status(200).json({
            success:true,
            message:list
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

};
//GET a task by its id
const gettaskbyid=async(req,res)=>{
    try{
    const {id}=req.params;
    const list = await TodoSchema.findById(id);
    if(!list){
        return res.status(404).json({
            success:false,
            message:"No such task exists"
        })
    }
    res.status(200).json({
        success:true,
        message:list
    })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
//Delete a task by id
const deletetask=async(req,res)=>{
    try{
    const {id}=req.params;
    const list = await TodoSchema.findById(id);
    if(!list){
        return res.status(404).json({
        success:false,
        message:"Task does not exist"
        })
    }
    await TodoSchema.findByIdAndDelete(id);
    res.status(200).json({
        success:true,
        message:"Task executed successfully"
    })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
//POST a task 
const addtask=async(req,res)=>{
    try{
    const {data}=req.body;
    const list=await TodoSchema.create(data);
    res.status(200).json({
        success:true,
        message:"Element added successfully",
        data:list
    })
    }
    catch(error){
            return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
//PUT a task
const updatetask=async(req,res)=>{
    try{
    const {data}=req.body;
    const {id}=req.params;
    const list = await TodoSchema.findById(id);
    if(!list){
        return res.status(404).json({
            success:false,
            message:""
        })
    }
    const updatedTask = await TodoSchema.findByIdAndUpdate(
            id,
            data,
            {new:true}
        );
    res.status(200).json({
        success:true,
        message:"Updated successfully",
        data:updatedTask
    })
    }
catch(error){
            return res.status(500).json({
            success:false,
            message:error.message
})
}
}
module.exports={
    getalltasks,
    gettaskbyid,
    deletetask,
    addtask,
    updatetask
}