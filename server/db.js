const mongoose = require('mongoose');


    MONGO_INITDB_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME || 'calendario-db-user',
    MONGO_INITDB_ROOT_PASSWORD = process.env.MONGO_INITDB_ROOT_USERNAME || '123!123_',
    MONGO_HOSTNAME = process.env.MONGO_HOSTNAME || 'localhost',
    MONGO_PORT = process.env.MONGO_PORT || 27017, 
    MONGO_DB = process.env.MONGO_DB || 'calendariodb'


    const url = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
    console.log(url);
const options = {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true
  };
mongoose.connect(url, options)
.then(()=>{ console.log(`${MONGO_DB} is connected`)})
.catch((err)=>{ console.error(err); });
