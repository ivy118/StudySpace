const mongoose = require("mongoose");
const { ServerApiVersion } = require("mongodb");

/*
1. Need to change the user SQL table to have an extra column that stores all the hashed conversation tables in mongoDB?
2. Implement all the routes 
*/

require("dotenv").config();

const mongoDBName = process.env.MONGODB_NAME;
const uri = process.env.MONGODB_URI;
const mongoDBPool = mongoose.createConnection(uri, { dbName: mongoDBName, useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = mongoDBPool;
