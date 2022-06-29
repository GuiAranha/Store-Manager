const conn = require('./connection');

const getProducts = async () => {
  const [data] = await conn.execute('SELECT * FROM products');
  return data;
};

const getProductById = async (id) => {
  const [data] = await conn.execute('SELECT * FROM products WHERE id = ?', [id]);
  return data;
};

module.exports = {
  getProducts,
  getProductById,
};
