const express = require('express');
const bcrypt = require('bcryptjs');
const Supplier = require('../../models/supplier');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();
const fs = require('fs');
const path = require('path');

//For sending mail
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rutvikshah245@gmail.com',
    pass: 'rutvik6997',
  },
});

// @route    POST api/supplier
// @desc     Register New Supplier
// @access   Public
router.post(
  '/',
  [
    check('firstName', 'Please enter your first name')
      .not()
      .isEmpty()
      .isAlpha(),
    check('lastName', 'Please enter your last name').not().isEmpty().isAlpha(),
    check('aboutCompany', 'Please Briefly tell us about your brand')
      .not()
      .isEmpty(),
    check('email', 'Please enter the valid mail address').not().isEmpty(),
    check('companyName', 'Please enter your company name').not().isEmpty(),
    check('city', 'Please enter your city name').not().isEmpty(),
    check('state', 'Please select your state name').not().isEmpty(),
    check('niche', 'Please select your niche category').not().isEmpty(),
    check('phone', 'Please enter the valid phone number')
      .isLength({
        max: 10,
        min: 10,
      })
      .isInt(),
    check('GST', 'Please enter the valid GST number')
      .isLength({
        max: 15,
        min: 15,
      })
      .isAlphanumeric(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      GST,
      city,
      aboutCompany,
      website,
      niche,
      state,
      companyName,
      companyImage,
    } = req.body;

    try {
      let supplier = await Supplier.findOne({ email });
      if (supplier) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      supplier = new Supplier({
        firstName,
        lastName,
        email,
        password,
        aboutCompany,
        phone,
        state,
        city,
        niche,
        GST,
        website,
        companyName,
        companyImage,
      });

      // Password Hashing
      const salt = await bcrypt.genSalt(10);
      supplier.password = await bcrypt.hash(password, salt);

      await supplier.save();

      const payload = {
        supplier: {
          id: supplier.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      //sending mail confirmation
      const mailOptions = {
        from: 'rutvikshah245@gmail.com',
        to: `${email}`,
        subject: 'Sending email from MERN app',
        html:
          '<table border=1><tr><td><h1>Welcome to insleek.com</h1></td></tr><tr><td><h1>send from localhost</h1></td></tr></table>',
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @route    GET api/supplier
// @desc     Get All Suppliers By City Name
// @access   Public
router.get('/state/:state', async (req, res) => {
  const state = req.params.state
    ? {
        state: { $regex: req.params.state, $options: 'i' },
      }
    : {};
  try {
    const suppliers = await Supplier.find({ ...state }).select(
      '-password -GST -date'
    );
    if (suppliers.length === 0) {
      return res.status(404).json({ msg: 'No supplier found for this state' });
    }
    res.json(suppliers);
  } catch (err) {
    console.error(err);
    return res.status(500).json('Server Error');
  }
});

// @route    GET api/supplier
// @desc     Get All Suppliers By Niche
// @access   Public
router.get('/niche/:niche', async (req, res) => {
  const niche = req.params.niche
    ? {
        niche: { $regex: req.params.niche, $options: 'i' },
      }
    : {};

  try {
    const suppliers = await Supplier.find({ ...niche }).select(
      '-password -GST -date'
    );
    if (suppliers.length === 0) {
      return res.status(404).json({ msg: 'No suppliers found for this niche' });
    }
    res.json(suppliers);
  } catch (err) {
    console.error(err);
    return res.status(500).json('Server Error');
  }
});

// @route    GET api/supplier
// @desc     Get Supplier By ID
// @access   Public
router.get('/search/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ msg: 'No supplier found' });
    }
    res.json(supplier);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

//Increment Profile Visit Count
router.get('/count/:id', async (req, res) => {
  try {
    let supplier = await Supplier.findById(req.params.id);

    supplier.usersVisited = supplier.usersVisited + 1;

    supplier = await Supplier.findOneAndUpdate(
      { _id: req.params.id },
      { $set: supplier },
      { new: true }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    GET api/supplier
// @desc     Get All Suppliers [Admin]
// @access   Private
router.get('/find-all/suppliers', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    if (suppliers.length === 0) {
      return res.status(404).json({ msg: 'No supplier found' });
    }
    res.json(suppliers);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    DELETE api/supplier
// @desc     Delete Supplier By ID
// @access   Private
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ msg: 'Supplier not found' });
    }

    await supplier.remove();
    res.json({ msg: 'Supplier has been removed!' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    POST api/supplier
// @desc     Update Supplier By ID
// @access   Private
router.post('/update-profile/:id', auth, async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    GST,
    city,
    aboutCompany,
    website,
    niche,
    companyName,
    companyImage,
    state,
  } = req.body;

  try {
    let supplier = await Supplier.findById(req.params.id);
    const profileFields = {};
    profileFields.supplier = req.params.id;
    if (firstName) profileFields.firstName = firstName;
    if (lastName) profileFields.lastName = lastName;
    if (email) profileFields.email = email;
    if (phone) profileFields.phone = phone;
    if (GST) profileFields.GST = GST;
    if (city) profileFields.city = city;
    if (state) profileFields.state = state;
    if (aboutCompany) profileFields.aboutCompany = aboutCompany;
    if (website) profileFields.website = website;
    if (niche) profileFields.niche = niche;
    if (companyName) profileFields.companyName = companyName;
    if (companyImage) profileFields.companyImage = companyImage;

    //DELETING IMAGE IF UPDATED WITH NEW ONE
    if (
      supplier.companyImage !== profileFields.companyImage &&
      supplier.companyImage !== 'default.jpg' &&
      profileFields.companyImage !== 'default.jpg'
    ) {
      fs.unlinkSync(
        path.join(
          path.dirname(__dirname),
          `../client/public/uploads/${supplier.companyImage}`
        )
      );
    }

    supplier = await Supplier.findOneAndUpdate(
      { _id: req.params.id },
      { $set: profileFields },
      { new: true }
    );

    return res.json(supplier);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});
module.exports = router;
