const mongoose =  require('mongoose');

const MongoConnect = async()=>{
  await mongoose.connect("mongodb+srv://amshen:amshen123@sampledb.jdmqkj0.mongodb.net/FoodAid",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  },(err)=>{
    // console.log(err)
    console.info("MONGO DB CONNECTED");
    
  })
}

// var connection = mongoose.connection;
// export {connection}

module.exports  = MongoConnect;