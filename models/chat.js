const mongoose = require('mongoose');

const messagesSchema = mongoose.Schema(
  {
    message: {
      type: String,
    },
    side: {
      type: String,
    },
    userHasRead: {
      type: Boolean,
    },
    supplierHasRead: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const ChatSchema = new mongoose.Schema(
  {
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'supplier',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    message: [messagesSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = Chat = mongoose.model('chat', ChatSchema);
