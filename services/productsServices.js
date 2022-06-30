const productsModel = require('../models/productsModel');

const getProducts = async () => {
  const data = await productsModel.getProducts();
  return data;
};

const getProductById = async (id) => {
  const data = await productsModel.getProductById(id);
  return data;
};

const newProduct = async (name) => {
  if (!name) return { code: 400, message: '"name" is required' };

  if (name.length < 5) {
    return { code: 422, message: '"name" length must be at least 5 characters long' };
  }

  const data = await productsModel.newProduct(name);
  return data;
};

module.exports = {
  getProducts,
  getProductById,
  newProduct,
};
