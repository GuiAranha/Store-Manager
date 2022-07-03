const conn = require('./connection');

const newSale = async (saleId, productId, quantity) => {
  const [data] = await conn.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
    [saleId, productId, quantity],
  );
  const result = {
    id: data.insertId,
  };
  return result;
};

const createSales = async () => {
  const [row] = await conn.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );

  return {
    id: row.insertId,
  };
};

module.exports = {
  newSale,
  createSales,
};
