if(process.env.NODE_ENV != "production"){
    require('dotenv').config({path: "../.env"});
}
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbURL = process.env.ATLASDB_URL;
async function main() {
    await mongoose.connect(dbURL);
}
main().then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err)
});

const initDB = async () => {
    await Listing.deleteMany({});
    for(let i = 0; i < initData.data.length; i++){
        let response = await geocodingClient.forwardGeocode({
            query: initData.data[i].location+", "+initData.data[i].country,
            limit: 1
        }).send();
        let geometry = response.body.features[0].geometry;
        console.log(geometry);
        initData.data[i].owner = "6578a597aa406485b8997529";
        initData.data[i].geometry = geometry;
    }
    await Listing.insertMany(initData.data);
    console.log("Data was initalized");
}

initDB();
