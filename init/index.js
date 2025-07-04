const mongoose = require('mongoose');
const initData=require('../init/data.js')
const Listing=require('../models/listing.js')
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => { console.log("database connected succesfully") })
    .catch((err) => { console.log(err) });

async function main() {
    await mongoose.connect(MONGO_URL);
}

async function initdb() {
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'6761b7790cf5da2ff7f37e75'}))
    await Listing.insertMany(initData.data);
    console.log("data inserted successfuly");
}
initdb();