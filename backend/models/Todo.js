const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todoSchema=new Schema({
 task:{
 type: String,
 required: true,
 },
 status:{
 type: String,
 required: true,
 }
},{timestamps: true});
module.exports = mongoose.model("TodoSchema",todoSchema);