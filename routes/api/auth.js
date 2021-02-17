const express = require('express');
const auth = require('../../middleware/auth');
const Supplier = require('../../models/supplier');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('config');

// @route    GET api/auth
// @desc     Get supplier by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.supplier.id).select(
      '-password'
    );
    res.json(supplier);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    POST api/auth
// @desc     Authenticate supplier and get token [LOGIN]
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please enter your registered mail id').isEmail(),
    check('password', 'Please enter the correct password').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let supplier = await Supplier.findOne({ email });
      if (!supplier) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, supplier.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        supplier: {
          id: supplier.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server Error' });
    }
  }
);

module.exports = router;
