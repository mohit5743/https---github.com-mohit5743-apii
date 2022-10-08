const {express} =require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const bookListSchema = new mongoose.Schema({
    _id: {
            type: String,
            default: function () {
                return new ObjectId().toString()
        }
    },
    Book:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
})

const Book = mongoose.model('Book',bookListSchema);
module.exports = Book;