if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

const Review = require("./models/review.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Ejs mate it include like partials and includes in ejs
app.engine("ejs", ejsMate);
//for parsing the data from form

app.use(express.urlencoded({ extended: true }));

//for put and delete request
app.use(methodOverride("_method"));

//static files
app.use(express.static(path.join(__dirname, "/public")));

main()
  .then(() => {
    console.log("database connected succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

//requiring router
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const users = require("./routes/user.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const session = require("express-session");
const flash = require("connect-flash");

const sessionOptions = {
  secret: "omkarSuperSecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// app.get("/register",async (req,res)=>{
//     const fakeUser=new User({
//         email:"omkar@gmail.com",
//         username:"omk",
//     })

//     let registeredUser= await User.register(fakeUser,"hello");
//    res.send(registeredUser);
//    console.log(registeredUser);
// })

app.get("/", (req, res) => {
  res.redirect("/listings");
});
//#Use router object

app.use("/listings", listings);

app.use("/listings/:id/reviews", reviews);

app.use("/", users);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", { err });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

// const { error } = require('console');
// const listing = new Listing({
//         title: "taj",
//         description: 'it is a good hotel',
//         price: '20000',
//         location: 'mumbai',
//         country: 'india',
//     })
//     listing.save()
//         .then((res) => { console.log(res) })
//         .catch((err) => { console.log(err) });

//     res.send("data successfully inserted");
// })

//create route

//Using try-catch it handles asynchronous error

// app.post("/listings",async (req,res,next)=>{
//     try{
//    // let listing=req.body.listing;
//    let newListing=new Listing(req.body.listing);
//    await newListing.save();
//    res.redirect("/listings");
//     }catch(err){
//          next(err);
//         }

// })

//using wrapAsync

//1 st Method code looks messy an task becomes tedious instead  we use joi for schema validation

// app.post("/listings",wrapAsync(async (req, res, next) => {
//     // let listing=req.body.listing;
//     if(!req.body.listing){
//         throw new ExpressError(400,"Send Valid Data for Listing")
//     }
//     let newListing = new Listing(req.body.listing);
//     if(!newListing.title){
//         new ExpressError(400,"Title is missing");
//     }
//     if(!newListing.description){
//         new ExpressError(400,"Description is missing");
//     }
//     if(!newListing.location){
//         new ExpressError(400,"Location is missing");
//     }
//     await newListing.save();
//     res.redirect("/listings");
// })
// );

// This middleware function handles the error that contains err in parameter if it not found it will be passed to the next middleware function
