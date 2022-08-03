const joi = require('joi');
const productsModel = require('../models/productsModel');

const getProducts = async () => {
  const data = await productsModel.getProducts();
  return data;
};

const getProductById = async (id) => {
  const data = await productsModel.getProductById(id);
  return data;
};

const productSchema = joi.object({
  name: joi.string().required().min(5),
});

const newProduct = async (name) => {
  if (!name) return { code: 400, message: '"name" is required' };

  const { error } = productSchema.validate({ name });

  if (error) {
    return { code: 422, message: error.message };
  }

  const data = await productsModel.newProduct(name);
  return data;
};

const updateProduct = async (id, name) => {
  if (!name) return { code: 400, message: '"name" is required' };

  const { error } = productSchema.validate({ name });

  if (error) {
    return { code: 422, message: error.message };
  }

  const data = await productsModel.getProductById(id);

  if (data.length === 0) {
    return {
      code: 404,
      message: 'Product not found',
    };
  }

  await productsModel.updateProduct(id, name);
  return ({ id, name });
};

module.exports = {
  getProducts,
  getProductById,
  newProduct,
  updateProduct,
};
