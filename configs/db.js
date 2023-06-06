const mongoose = require('mongoose');


const connect = async () => {
    const connectionparams = {
        useNewURlParser: true,
        useUnifiedTopology: true,
    };
    try {
         await mongoose.connect("mongodb+srv://hemantjayas:hemant123@cluster0.nxotwiq.mongodb.net/");
         console.log("connected to database successfully")

    } catch (error) {
        console.log("could not connected to database ", error.message)
    }
}

module.exports = connect