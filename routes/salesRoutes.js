const salesRoute = require('express').Router();
const salesController = require('../controllers/salesController');

salesRoute.post('/', salesController.newSale);

module.exports = salesRoute;
