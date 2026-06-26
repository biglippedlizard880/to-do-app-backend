const mongoose = require("mongoose");
const connectDB =()=>{
  mongoose.connect(process.env.MONGO_URI)
 .then(()=>{
    console.log("Db connected successfully");
 })
 .catch((error)=>{
    console.log("Had an error connecting with the db");
    console.log(error);
 })
}
module.exports =connectDB