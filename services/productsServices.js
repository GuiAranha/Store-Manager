const productsModel = require('../models/productsModel');

const getProducts = async () => {
  const data = await productsModel.getProducts();
  return data;
};

const getProductById = async (id) => {
  const data = await productsModel.getProductById(id);
  return data;
};

module.exports = {
  getProducts,
  getProductById,
};
