const conn = require('./connection');

const newSale = async (saleId, productId, quantity) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?,?,?)';
  const [data] = await conn.execute(query, [saleId, productId, quantity]);
  const result = {
    id: data.insertId,
  };
  return result;
};

const createSales = async () => {
  const query = 'INSERT INTO sales (date) VALUES (NOW())';
  const [row] = await conn.execute(query);

  return {
    id: row.insertId,
  };
};

const getSales = async () => {
  const query = `SELECT saleProduct.sale_id AS saleId, sale.date,
    saleProduct.product_id AS productId, saleProduct.quantity
    FROM StoreManager.sales AS sale
    INNER JOIN StoreManager.sales_products AS saleProduct
    ON sale.id = saleProduct.sale_id ORDER BY saleProduct.sale_id, saleProduct.product_id`;
  const [data] = await conn.execute(query);
  return data;
};

const getSaleById = async (id) => {
  const query = `SELECT saleProduct.sale_id AS sale_id, sale.date,
    saleProduct.product_id AS productId, saleProduct.quantity
    FROM StoreManager.sales AS sale
    INNER JOIN StoreManager.sales_products AS saleProduct
    ON sale.id = saleProduct.sale_id
    WHERE sale.id = ?
    ORDER BY saleProduct.sale_id, saleProduct.product_id`;
  const [data] = await conn.execute(query, [id]);
  return data;
};

module.exports = {
  newSale,
  createSales,
  getSales,
  getSaleById,
};
