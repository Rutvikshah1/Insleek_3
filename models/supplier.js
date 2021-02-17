const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  numberOfProducts: {
    type: Number,
    default: 0,
  },
  GST: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  aboutCompany: {
    type: String,
    required: true,
  },
  niche: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  companyImage: {
    type: String,
  },
  usersVisited: {
    type: Number,
    default: 0,
    expires: 60 * 60 * 24,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Supplier = mongoose.model('supplier', SupplierSchema);
