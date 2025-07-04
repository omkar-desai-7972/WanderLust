const Listing = require('./models/listing.js')
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const Review=require("./models/review.js");
module.exports.isLogggedIn=(req,res,next)=>{
    //when isLoggedIn middleware triggers the following req.session.redirectUrl it saves originalUrl 
    //from req.originalUrl
    req.session.redirectUrl=req.originalUrl;
    if(!req.isAuthenticated()){
        req.flash("error","You Must be Logged-in");
        return res.redirect("/login")
    }
    next();
}


module.exports.saveRedirectUrl=(req,res,next)=>{
//res.locals saves above mentioned originalUrl becoz on passport is authentiacte 
//triggers it resets all the session so save in locals
    if( req.session.redirectUrl){
        res.locals.redirectUrl= req.session.redirectUrl;
    }
    next()
}


module.exports.isOwner=async (req,res,next)=>{
    const { id } = req.params;
    const listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to edit")
        return  res.redirect(`/listings/${id}`);
    }
    next();
}



module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);            
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}


module.exports.isReviewAuthor=async (req,res,next)=>{
    const { id,reviewId } = req.params;
    const review=await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review");
        return  res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);            
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}
