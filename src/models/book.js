const {express} =require("express");
const mongoose = require("mongoose");
const BooklistSchema = new mongoose.Schema({
    Book:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
})

const Book = mongoose.model('Book', BooklistSchema);
module.exports = Book;