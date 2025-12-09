
const model =require("../model/usermodel");
const createuser =async(req,res)=>{
try {
    const add =await model.create(req.body);
    res.send({msg:"created",add})
} catch (error) {
    res.send({msg:"error from creation :",error})
    
}

}

const getuser =async(req,res)=>{
try {
    const add =await model.find();
    res.send({msg:"lsit of user",add})
} catch (error) {
    res.send({msg:"error from view user :",error})
    
}
}
const updateuser =async(req,res)=>{
try {

    const id=req.params.id;
    const add =await model.findOneAndUpdate({_id:id},req.body,{new:true});
    res.send({msg:"updated",add})
} catch (error) {
    res.send({msg:"error from view user :",error})
    
}
}
const deleteuser =async(req,res)=>{
try {
    const id =req.params.id;
    const add =await model.findByIdAndDelete({_id:id})
    res.send({msg:"deleted",add})
} catch (error) {
    res.send({msg:"error from view user :",error})
    
}
}
const usercontroller={createuser,getuser ,updateuser,deleteuser};
module.exports=usercontroller;

