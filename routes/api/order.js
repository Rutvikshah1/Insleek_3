const express = require('express');
const router = express.Router();
const Order = require('../../models/order');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rutvikshah245@gmail.com',
    pass: 'rutvik6997',
  },
});

// @route    POST api/order/
// @desc     Add New Order
// @access   Private
router.post('/', async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    GSTPrice,
    supplier,
    shippingPrice,
    totalPrice,
    user,
    customerInfo,
  } = req.body;

  try {
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        GSTPrice,
        shippingPrice,
        user: user,
        supplier: supplier,
        totalPrice,
        customerInfo,
      });

      const createdOrder = await order.save();

      //sending mail confirmation
      // const mailOptions = {
      //   from: 'rutvikshah245@gmail.com',
      //   to: `${email}`,
      //   subject: 'Order placed successfully',
      //   html:
      //     '<table border=1><tr><td><h1>Welcome to insleek.com</h1></td></tr><tr><td><h1>send from localhost</h1></td></tr></table>',
      // };

      // transporter.sendMail(mailOptions, function (error, info) {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //   }
      // });

      res.status(201).json(createdOrder);
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    GET api/order/:id
// @desc     Get Order By ID
// @access   Private

router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'firstName lastName phone'
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order Not Found!');
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    GET api/order/myorders/:id
// @desc     Get Loggedin user orders By user ID
// @access   Private
router.get('/myorders/:id', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id })
      .populate('user', 'firstName lastName phone')
      .sort({
        createdAt: -1,
      });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    GET api/order/supplier/:id
// @desc     Get all orders by sullierID
// @access   Private
router.get('/supplier/:id', async (req, res) => {
  try {
    const orders = await Order.find({ supplier: req.params.id })
      .populate('user', 'firstName lastName phone')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

router.post('/update-product-status/:id', async (req, res) => {
  const value = req.body.value;

  try {
    let order = await Order.findById(req.params.id);

    if (order) order.orderStatus = value;

    order = await Order.findOneAndUpdate(
      { _id: req.params.id },
      { $set: order },
      { new: true }
    );

    return res.json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
