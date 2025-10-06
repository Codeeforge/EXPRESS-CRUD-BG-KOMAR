const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ GET all products
exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// ✅ GET by ID
exports.getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// ✅ CREATE product
exports.createProduct = async (req, res) => {
  try {
    const { nameProduct, jenisProduct } = req.body;
    const file = req.file;
    const fotoProduct = file ? '/uploads/' + file.filename : null;

    const product = await prisma.product.create({
      data: { nameProduct, jenisProduct, fotoProduct },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// ✏️ UPDATE product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nameProduct, jenisProduct } = req.body;
    const file = req.file;

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const fotoProduct = file ? '/uploads/' + file.filename : product.fotoProduct;

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: { nameProduct, jenisProduct, fotoProduct },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// ❌ DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

