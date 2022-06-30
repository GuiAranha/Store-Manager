const productsRoute = require('express').Router();
const productsController = require('../controllers/productsController');

productsRoute.get('/', productsController.getProducts);
productsRoute.get('/:id', productsController.getProductById);
productsRoute.post('/', productsController.newProduct);

module.exports = productsRoute;
