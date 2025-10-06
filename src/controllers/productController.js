const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');


exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


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


exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Cek apakah produk ada
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Hapus record dari database
    await prisma.product.delete({
      where: { id: Number(id) },
    });

    // Kalau produk punya foto, hapus juga dari folder uploads
    if (product.fotoProduct) {
      const filePath = path.join(__dirname, '..', product.fotoProduct);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.warn('⚠️ Gagal hapus file (mungkin sudah tidak ada):', err.message);
        } else {
          console.log('🗑️ File foto dihapus:', filePath);
        }
      });
    }

    res.json({ message: 'Product deleted successfully (file + DB)' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
