const {express} =require("express");
const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const BooklistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author:{
        type:String,
        required:true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    },
    { timestamps: true }
);

const Book = mongoose.model('Book', BooklistSchema);
module.exports = Book;