const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch products'});
    }
};

exports.getProductsById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id: Number(id) }
        });

        if (!product) return res.status(404).json({ error: 'Product not found' });

        res.json(product);

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const {nameProduct, jenisProduct, } = req.body;
        const file = req.file;
        const fotoProduct = file? '/uploads/' + file.filename:null;
        console.log(fotoProduct,nameProduct,jenisProduct);

        const product = await prisma.product.create({
            data: {nameProduct, jenisProduct, fotoProduct}
        });
        res.status(201).json(product);
    }   catch (error) {
        res.status(500).json({error: 'Failed to create product'});
    }
};




