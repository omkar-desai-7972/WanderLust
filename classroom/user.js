const express=require("express");
const  router=express.Router();

//Index-users
router.get("/users",(req,res)=>{
    res.send("Get for users")
})

//Show-users
router.get("/users/:id",(req,res)=>{
    res.send("Get for Show users")
})

//POST-users
router.post("/users",(req,res)=>{
    res.send("post for users")
})

//DELETE-users
router.delete("/users/:id",(req,res)=>{
    res.send("delete for users id")
})

module.exports=router;