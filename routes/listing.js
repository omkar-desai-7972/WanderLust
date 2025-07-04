const express = require("express");
const app = express();
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require('../models/listing.js')
const { isLogggedIn, isOwner, validateListing } = require("../middleware.js");

const listingsController = require("../controllers/listings.js");
const multer=require('multer');

const {storage}=require("../cloudConfig.js");
const upload=multer({storage})


router.route("/")
    .get( wrapAsync(listingsController.index))
    .post( upload.single('listing[image]'),isLogggedIn, validateListing, wrapAsync(listingsController.createListing))

//New Route   keep it above the /:id 
router.get("/new", isLogggedIn, listingsController.renderNewForm);

router.route("/:id")
      .get( wrapAsync(listingsController.showListing))
      .put(isLogggedIn, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingsController.updateListing))
      .delete( isLogggedIn, isOwner, wrapAsync(listingsController.destroyListing))



//Edit Route
router.get("/:id/edit", isLogggedIn, isOwner, wrapAsync(listingsController.renderEditForm))


module.exports = router;
















//Index Route
// router.get("/", wrapAsync(listingsController.index));

// // #Method 2: using joi validation ,it is not mongoose schema validation,it is server-side validation
// router.post("/", isLogggedIn, validateListing, wrapAsync(listingsController.createListing));



// //New Route
// router.get("/new", isLogggedIn, listingsController.renderNewForm);


// //show Route
// router.get("/:id", wrapAsync(listingsController.showListing));


// //Edit Route
// router.get("/:id/edit", isLogggedIn, isOwner, wrapAsync(listingsController.renderEditForm));

// //Update Route

// router.put("/:id", isLogggedIn, isOwner, validateListing, wrapAsync(listingsController.updateListing));

// //delete route
// router.delete("/:id", isLogggedIn, isOwner, wrapAsync(listingsController.destroyListing));


// module.exports = router;