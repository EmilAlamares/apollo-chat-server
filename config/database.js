const mongoose = require("mongoose")
const mongo_uri = process.env.MONGO_URI

const connectDatabase = async() => {
    try{
        const conn = await mongoose.connect(mongo_uri)
        console.log(`Sucessfully connected to: ${conn.connection.host}`)
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = {connectDatabase}