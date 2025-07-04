const express=require('express');
const router=express.Router();

//posts


//Index-posts
router.get("/",(req,res)=>{
    res.send("Get for posts")
})

//Show-users
router.get("/:id",(req,res)=>{
    res.send("Get for Show posts")
})

//POST-users
router.post("/",(req,res)=>{
    res.send("post for posts")
})

//DELETE-users
router.delete("/:id",(req,res)=>{
    res.send("delete for posts id")
})


module.exports=router;