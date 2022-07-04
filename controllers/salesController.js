const salesServices = require('../services/salesService');

const newSale = async (req, res, next) => {
  const sales = req.body;
  try {
    const data = await salesServices.newSale(sales);

    if (data.code) {
      return res.status(data.code).json({ message: data.message });
    }
    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const getSales = async (req, res, next) => {
  try {
    const data = await salesServices.getSales();

    if (data.code) {
      return res.status(data.code).json({ message: data.message });
    }
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getSaleById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await salesServices.getSaleById(id);

    if (data.code) {
      return res.status(data.code).json({ message: data.message });
    }
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  newSale,
  getSales,
  getSaleById,
};