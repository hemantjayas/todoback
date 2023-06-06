const express = require('express')
const Book = require('../models/book')
const router = express.Router();
const multer = require("multer");
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})


const upload = multer({
    storage: storage
})




router.post("/", upload.single("bookCover"), async (req, res) => {
    try {

        const bookpost = await Book({
            bookname: req.body.bookname,
            author: req.body.author,
            bookImage: {
                data: fs.readFileSync('uploads/', req.file.filename),
                contentType: 'image/png'
            }
        });

        bookpost.save()

        res.status(201).send(bookpost)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const bookpost = await Book.find().lean().exec();
        res.send(bookpost);

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

});

router.put("/:_id/", async (req, res) => {
    try {
        const updatedbook = await Book.findByIdAndUpdate(req.params._id, { bookname: req.body.bookname, author: req.body.author }, { new: true })

        if (!updatedbook) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.send(updatedbook)
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

});
router.delete("/:_id", async (req, res) => {
    try {
        const bookpost = await Book.findByIdAndDelete({ _id: req.params._id })
        res.send(bookpost);

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

});











module.exports = router;