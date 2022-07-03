const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const validateSales = (sale) => {
  const hasQuantity = sale.some((item) => !item.quantity);
  const isQuantityPositive = sale.some((item) => item.quantity <= 0);
  const hasID = sale.some((item) => !item.productId);
  
  if (isQuantityPositive) {
    return {
      code: 422,
      message: '"quantity" must be greater than or equal to 1',
    };
  }
  
  if (hasQuantity) return { code: 400, message: '"quantity" is required' };
  if (hasID) return { code: 400, message: '"productId" is required' };
  return { status: 'OK' };
};

const newSale = async (sale) => {
  const isSaleValidate = validateSales(sale);
  if (!isSaleValidate.status) return isSaleValidate;

  const allProducts = await Promise.all(
    sale.map((item) => productsModel.getProductById(item.productId)),
  );
  const existId = allProducts.some((item) => item.length === 0);
  if (existId) return { code: 404, message: 'Product not found' };

  const data = await salesModel.createSales();

  await Promise.all(
    sale.map((item) =>
      salesModel.newSale(data.id, item.productId, item.quantity)),
  );

  return {
    id: data.id,
    itemsSold: [...sale],
  };
};

module.exports = {
  newSale,
};