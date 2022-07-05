const conn = require('./connection');

const getProducts = async () => {
  const [data] = await conn.execute('SELECT * FROM products');
  return data;
};

const getProductById = async (id) => {
  const [data] = await conn.execute('SELECT * FROM products WHERE id = ?', [id]);
  return data;
};

const newProduct = async (name) => {
  const [data] = await conn.execute('INSERT INTO products (name) VALUES (?)', [name]);
  const result = {
    id: data.insertId,
    name,
  };
  return result;
};

const updateProduct = async (id, name) => {
  const [data] = await conn.execute('UPDATE products SET name = ? WHERE id = ?', [name, id]);
  return data;
};

module.exports = {
  getProducts,
  getProductById,
  newProduct,
  updateProduct,
};
