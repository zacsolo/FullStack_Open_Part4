require('dotenv').config();

let PORT = process.env.PORT;
let MONGO_URI = process.env.MONGO_URI;

module.exports = {
  MONGO_URI,
  PORT,
};

/*-- This is where we store the envoriment variables
instead of in index.js
They can be accessed as config.MONGO_URI and config.PORT*/
