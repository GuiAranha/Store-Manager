const productsService = require('../services/productsServices');

const getProducts = async (req, res, next) => {
  try {
    const data = await productsService.getProducts();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [data] = await productsService.getProductById(id);
    if (!data) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const newProduct = async (req, res, next) => {
  const { name } = req.body;
  try {
    const data = await productsService.newProduct(name);
    if (data.code) {
      return res.status(data.code).json({ message: data.message });
    }
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const data = await productsService.updateProduct(id, name);
    if (data.code) {
      return res.status(data.code).json({ message: data.message });
    }
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  newProduct,
  updateProduct,
};
