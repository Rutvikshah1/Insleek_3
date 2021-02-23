const User = require('../../models/user');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rutvikshah245@gmail.com',
    pass: 'rutvik6997',
  },
});

// @route    POST api/user
// @desc     Register New User
// @access   Public
router.post(
  '/user-register',
  [
    check('firstName', 'Please enter your first name').isAlpha(),
    check('lastName', 'Please enter your last name').isAlpha(),
    check('email', 'Please enter the valid mail address').not().isEmpty(),
    check('phone', 'Please enter the valid phone number')
      .isLength({
        max: 10,
        min: 10,
      })
      .isInt(),
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

    const { firstName, lastName, email, phone, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({ firstName, lastName, email, phone });

      // Password Hashing
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
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

      //Sending mail confirmation
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

module.exports = router;
