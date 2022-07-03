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

module.exports = {
  newSale,
};