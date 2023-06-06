const mongoose = require("mongoose");


const bookSchema = mongoose.Schema({
    bookname: { type: String, required: true },
    author: { type: String, required: true },
    bookImage: {data:Buffer, contentType: String}

}, {
    versionKey: false,
    timestamps: true,
})



const Book = mongoose.model("book", bookSchema); // 

module.exports = Book;