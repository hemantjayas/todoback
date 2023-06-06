const express = require('express');
const connect = require('./configs/db');

const PORT = process.env.PORT || 8000;
const app = express()
var cors = require('cors')
const bookcontroller = require("./controllers/bookcontroller");




// middlewares
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}))


// routes
app.use('/books', bookcontroller);


app.listen(PORT, async () => {
    await connect()
    console.log(`listening on port ${PORT}`)
})  


