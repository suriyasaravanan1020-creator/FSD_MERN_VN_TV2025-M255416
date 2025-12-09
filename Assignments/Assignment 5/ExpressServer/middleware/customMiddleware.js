const customMiddleware =(req,res,next)=>{
    let verify =false;
    if(!verify){
        res.send("user not verified");
        return ;
    }
    next();
};
module.exports=customMiddleware;