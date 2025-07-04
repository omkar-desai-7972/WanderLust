const express=require("express");
const app=express();
const users=require("./user.js")
const posts=require("./post.js");
const session=require('express-session');
const flash=require('connect-flash')
const path = require('path');
const { date } = require("joi");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



const sessionOptions={
    secret:"omkarSuperSecret",
    resave :false,
    saveUninitialized:true,
    cookie: { 
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}

app.use(session(sessionOptions))

app.use(flash());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})

app.get("/register",(req,res)=>{
     const {name="anonymous"}=req.query;
     req.session.name=name;
    //  console.log(req.session.name)
    if(name==="anonymous")
    {
       req.flash("error","User is not registered");
    }
    else{
       req.flash("success","User registered successfully"); 
    }
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
    // res.locals.success=req.flash("success");
    // res.locals.error=req.flash("error");
    res.render("flash.ejs",{name:req.session.name})
})


app.listen(3080,()=>{
    console.log("serever is listenng on 3080");

})












// const cookieParser=require("cookie-parser");

// app.use(cookieParser("secretcode"));


// app.get("/getSignedCookie",(req,res)=>{
//    res.cookie("made-in","India",{signed:true});
//    res.send("Cookie is signed")
// })

// app.get("/verify",(req,res)=>{
//     //  console.log(req.cookies); it give inly unsigned cookies and signed cookies give empty object {}
//     console.log(req.signedCookies)
//     res.send("cookie is verified")
// })


// app.get("/om",(req,res)=>{
//     res.send("cookie is created");
// })
// app.get("/",(req,res)=>{
//     res.send("Hi,I'm root");
// })



// app.get("/omkar",(req,res)=>{
//     let {omkar="patil"}=req.cookies;
//     res.send(`Hii my name is omkar ${omkar}`)
// })

// app.use("/",users);
 
// app.use("/posts",posts);



