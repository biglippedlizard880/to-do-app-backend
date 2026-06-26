const express = require("express");
const todoRoutes = require("./routes/todoRoutes.js");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", todoRoutes);
require("dotenv").config();
const connectDb = require("./config/db.js");
const dns = require("dns");
// Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const PORT = process.env.PORT || 5000;
connectDb();
app.get("/",(req,res)=>{
    console.log("Todo Api is running");
    res.send("Todo api is running");
})
app.listen(PORT,()=>{
    console.log(`Server is running and live on the port http://localhost:${PORT}`);
})