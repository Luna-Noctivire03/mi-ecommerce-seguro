const productos = require("../models/productos");

const getProductos = (req, res) => {
  res.json(productos);
};

module.exports = { getProductos };