const express=require("express");
const router=express.Router({mergeParams:true});
const {reviewSchema}=require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require('../models/review.js')
const Listing = require('../models/listing.js');
const { isLogggedIn, isReviewAuthor, validateReview } = require("../middleware.js");


const reviewController=require("../controllers/reviews.js");



//Reviews
//Post Route
router.post("/",isLogggedIn,validateReview,wrapAsync(reviewController.createReview))

//DELETE
//REVIEW ROUTE

router.delete("/:reviewId",isLogggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));


module.exports=router;