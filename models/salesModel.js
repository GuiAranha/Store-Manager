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

const getSales = async () => {
  const [data] = await conn.execute(
    `SELECT saleProduct.sale_id AS saleId, sale.date,
    saleProduct.product_id AS productId, saleProduct.quantity
    FROM StoreManager.sales AS sale
    INNER JOIN StoreManager.sales_products AS saleProduct
    ON sale.id = saleProduct.sale_id ORDER BY saleProduct.sale_id, saleProduct.product_id`,
  );
  return data;
};

const getSaleById = async (id) => {
  const [data] = await conn.execute(
    `SELECT saleProduct.sale_id AS sale_id, sale.date,
    saleProduct.product_id AS productId, saleProduct.quantity
    FROM StoreManager.sales AS sale
    INNER JOIN StoreManager.sales_products AS saleProduct
    ON sale.id = saleProduct.sale_id
    WHERE sale.id = ?
    ORDER BY saleProduct.sale_id, saleProduct.product_id`,
    [id],
  );
  return data;
};

module.exports = {
  newSale,
  createSales,
  getSales,
  getSaleById,
};
