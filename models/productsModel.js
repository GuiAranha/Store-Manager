const conn = require('./connection');

const getProducts = async () => {
  const query = 'SELECT * FROM products';
  const [data] = await conn.execute(query);
  return data;
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [data] = await conn.execute(query, [id]);
  return data;
};

const newProduct = async (name) => {
  const query = 'INSERT INTO products (name) VALUES (?)';
  const [data] = await conn.execute(query, [name]);
  const result = {
    id: data.insertId,
    name,
  };
  return result;
};

const updateProduct = async (id, name) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  const [data] = await conn.execute(query, [name, id]);
  return data;
};

module.exports = {
  getProducts,
  getProductById,
  newProduct,
  updateProduct,
};
