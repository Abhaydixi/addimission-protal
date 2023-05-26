const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/addimission"
const live_URL = 'mongodb+srv://dixitabhay633:rudra1234@cluster1.d8nmtdf.mongodb.net/addmissionportel?retryWrites=true&w=majority'

const connectDB = () => {
    // For local DB
    return mongoose.connect(live_URL)


        // For cloud DB
        // return mongoose.connect(database)

        .then(() => {
            console.log("Connected Succeessfully")
        })
        .catch((erorr) => {
            console.log(error)
        })
}

module.exports = connectDB