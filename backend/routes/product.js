import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.post('/', async(req, res) => {
  const product = req.body;
  if(!product.name || !product.price || !product.image) {
    return res.status(400).json({message: 'Name and price are required'});
  }

  const newProduct=new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({success:true, data: newProduct});
  }
  catch (error) {
    console.error("Error creating product:",error.message);
    res.status(500).json({message: 'Server error'});
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    if (!product) {
        return res.status(404).json({message: 'Product not found'});
    }
    res.status(200).json({success: true, data: product});
    } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({message: 'Server error'});
    }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
        return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({success: true, data: product});
    } catch (error) {
        console.error("Error deleting product:", error.message);
        res.status(500).json({message: 'Server error'});
    }
});

router.get('/', async (_req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({success: true, data: products});
  }
  catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({message: 'Server error'});
}
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({message: 'Product not found'});
    }
    res.status(200).json({success: true, data: product});
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({message: 'Server error'});
  }
});

export default router;