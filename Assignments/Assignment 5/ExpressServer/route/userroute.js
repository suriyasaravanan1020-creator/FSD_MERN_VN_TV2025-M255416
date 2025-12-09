const express =require("express");
const userController =require("../controller/usercontroller");
const usercontroller = require("../controller/usercontroller");
const customMiddleware =require("../middleware/customMiddleware");
const router =express.Router();


router.get("/get-user",customMiddleware,usercontroller.getuser);
router.post("/create-user",customMiddleware,userController.createuser);
router.put("/up-user/:id",customMiddleware,userController.updateuser);
router.delete("/del-user/:id",customMiddleware,usercontroller.deleteuser);



module.exports=router;
