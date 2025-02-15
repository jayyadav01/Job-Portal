const mongoose = require("mongoose");

const ConnectDB = async (url) => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to the Database");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = ConnectDB;