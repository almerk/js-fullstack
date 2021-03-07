require('dotenv').config({ path: '../.env' })
const MongoClient = require("mongodb").MongoClient;;

const {
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
  } = process.env;

const url = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
const options = {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true
  };

let dbClient;
module.exports.connect = (onSuccess, onError) => {
  new MongoClient(url, options).connect(function(err, client){
  
    if(err){
       console.error('DB connection error', err);
       return onError(err);
    }
    console.log(`${MONGO_DB} connected succesfully`);
    console.log('----------------------------------');
    dbClient = client;
    return onSuccess(client);
  });
}
module.exports.disconnect = () => {
  dbClient.close();
  console.log('\tdb connection closed')
}
