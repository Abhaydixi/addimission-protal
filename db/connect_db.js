const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/addimission"

const connectDB = () => {
    // For local DB
    return mongoose.connect(url)


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