const salesRoute = require('express').Router();
const salesController = require('../controllers/salesController');

salesRoute.post('/', salesController.newSale);
salesRoute.get('/', salesController.getSales);
salesRoute.get('/:id', salesController.getSaleById);

module.exports = salesRoute;
