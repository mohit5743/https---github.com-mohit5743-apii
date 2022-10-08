const express =require("express")

const router =new express.Router();

const bookController= require("../controller/booksControllers");

//Get a list of all books
router.get('/', bookController.getAllBook);

//Create a new book
router.post('/', bookController.createNewBook);

//Get a book by id
router.get('/:id', bookController.findBookById);

//Update a book by id
router.patch('/:id', bookController.updateABook);

//Delete a book by id

router.delete('/:id', bookController.deleteABook);
module.exports= router;