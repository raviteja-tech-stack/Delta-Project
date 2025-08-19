const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const Mongo_Url = "mongodb://127.0.0.1:27017/wanderLust";

main()
  .then(() => {
    console.log("Connection Succesfull");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(Mongo_Url);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "688e40fe13484f5fb8b4648a",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};

initDB();
