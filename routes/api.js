const express = require('express');
const router = express.Router();
const { listBooks,addBook,getBook,newBook,updBook,sellBook,delBook,purBook,restBook } = require('../controllers/bookController');
const {addAuthor,updAuthor,delAuthor}= require('../controllers/authorController');
const {addGenre}= require('../controllers/genreController');
const{addUser}= require('../controllers/userController');
const{addOrder,listOrders}= require('../controllers/orderController');


router.get('/books', listBooks);
router.post('/books/add', addBook);
router.post('/books', getBook);
router.post('/books/update', updBook);
router.post('/books/delete', delBook);
router.post('/books/restock', restBook);
router.post('/books/purchase', purBook);

router.post('/author/add',addAuthor)
router.post('/author/upd',updAuthor)
router.post('/author/del',delAuthor)

router.post('/genre/add',addGenre)

router.post('/user/add',addUser)

router.post('/order/add',addOrder)
router.get('/order/add',listOrders)
module.exports = router;
