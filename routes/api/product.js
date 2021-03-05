const express = require('express');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();
const Product = require('../../models/product');
const Supplier = require('../../models/supplier');
const auth = require('../../middleware/auth');
const fs = require('fs');
const path = require('path');

// @route    POST api/product/
// @desc     Add New Product
// @access   Private
router.post(
  '/create',
  [
    auth,
    check('title', 'Please enter product name').not().isEmpty(),
    check('description', 'Please enter product description').not().isEmpty(),
    check('price', 'Please enter product price').not().isEmpty(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, price, image, requiredQty } = req.body;

    try {
      const product = new Product({
        title,
        description,
        price,
        image,
        requiredQty,
        supplier: req.supplier.id,
      });
      await product.save();
      res.json(product);

      //Update number of product count
      let supplier = await Supplier.findById(req.supplier.id);
      supplier.numberOfProducts = supplier.numberOfProducts + 1;
      supplier = await Supplier.findOneAndUpdate(
        { _id: req.supplier.id },
        { $set: supplier },
        { new: true }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @route    GET api/product/item/:id
// @desc     Get Product By ID
// @access   Public
router.get('/item/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'No product found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    GET api/product/list
// @desc     Get All Products By Supplier ID
// @access   Public
router.get('/:slug', async (req, res) => {
  try {
    const products = await Product.find({ supplier: req.params.slug });
    if (products.length === 0) {
      return res.status(404).json({ msg: 'No products found' });
    }
    res.json(products);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No products found' });
    }
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    GET api/product/:keyword
// @desc     Get All Products By Search
// @access   Public
router.get('/products/:keyword', async (req, res) => {
  const keyword = req.params.keyword
    ? {
        title: { $regex: req.params.keyword, $options: 'i' },
      }
    : {};

  try {
    const products = await Product.find({ ...keyword });
    if (products.length === 0) {
      return res.status(404).json({ msg: 'No products found' });
    }
    res.json(products);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No products found' });
    }
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    DELETE api/product/delete/:id
// @desc     Delete Product By Product ID
// @access   Private
router.delete('/delete/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    //Update number of product
    let supplier = await Supplier.findById(product.supplier);
    supplier.numberOfProducts = supplier.numberOfProducts - 1;
    supplier = await Supplier.findOneAndUpdate(
      { _id: product.supplier },
      { $set: supplier },
      { new: true }
    );

    await product.remove();
    fs.unlinkSync(
      path.join(
        path.dirname(__dirname),
        `../client/public/uploads/${product.image}`
      )
    );

    res.json({ msg: 'Product has been deleted successfully' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    DELETE api/product/delete-all/:id
// @desc     Delete All Product By Supplier ID
// @access   Private
router.delete('/delete-all/:id', auth, async (req, res) => {
  try {
    const products = await Product.findOne({ supplier: req.params.id });
    if (products.length === 0) {
      return res.status(404).json({ msg: 'No products found' });
    }
    await products.remove();
    res.json({ msg: 'Products have been removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No products found' });
    }
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    POST api/product/:id/reviews
// @desc     Write review
// @access   Private
router.post('/:id/reviews', async (req, res) => {
  const { rating, comment, user } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === user.user._id.toString()
      );
      if (alreadyReviewed) {
        return res.status(400).json({ msg: 'Product already reviewed!' });
      }
    }

    const review = {
      name: user.user.firstName,
      rating: Number(rating),
      comment: comment,
      user: user.user,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ msg: 'Review Added' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No products found' });
    }
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    POST api/product/update-product/:id
// @desc     Update product by its ID
// @access   Private
router.post('/update-product/:id', auth, async (req, res) => {
  const { title, description, requiredQty, price } = req.body;

  try {
    let product = await Product.findById(req.params.id);

    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (requiredQty) product.requiredQty = requiredQty;

    product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: product },
      { new: true }
    );

    return res.json(product);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
