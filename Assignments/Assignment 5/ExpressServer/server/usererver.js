const mongoose = require("mongoose");
const express = require("express");
const router = require("../route/userroute");

const app= express();
app.use(express.json());
app.use("/user",router);

mongoose.connect("mongodb+srv://jeevanantham:merncluster1@cluster1.zamvmwt.mongodb.net/?appName=Cluster1")
.then((res)=>{
  console.log("connected");
  
})
.catch((error)=>{
console.log(error);

})

app.listen(9000,()=>{
    console.log(`http://localhost:${9000}`);
    
})