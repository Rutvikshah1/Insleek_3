const express = require('express');
const router = express.Router();
const Chat = require('../../models/chat');

// @route    POST api/chat
// @desc     Write new message
// @access   Private
router.post('/', async (req, res) => {
  const { supplier, user, message } = req.body;

  try {
    let chat = [];
    chat = await Chat.find({ user, supplier })
      .populate('user', 'firstName lastName')
      .populate('supplier', 'companyName');

    if (chat.length !== 0) {
      chat[0].message.push(message);
      chat = await Chat.findOneAndUpdate(
        { user, supplier },
        { $mod: chat[0].message },
        { new: true }
      );
      chat.message.push(message);
      await chat.save();
    } else {
      chat = new Chat({
        supplier,
        user,
      });
      chat.message.push(message);

      await chat.save();
    }

    res.status(201).send(chat);
  } catch (err) {
    console.error(err.message);
  }
});

// @route    POST api/chat/user-message-read
// @desc     Update message user read
// @access   Private
router.post('/user-message-read', async (req, res) => {
  const { supplier, user } = req.body;

  try {
    chat = await Chat.updateMany(
      { user, supplier, 'message.userHasRead': false },
      { $set: { 'message.$[elem].userHasRead': true } },
      { arrayFilters: [{ 'elem.userHasRead': false }], multi: true }
    );

    res.status(201).json(chat);
  } catch (err) {
    console.error(err.message);
  }
});

// @route    post api/chat/supplier-message-read
// @desc     Update message supplier read
// @access   Private
router.post('/supplier-message-read', async (req, res) => {
  const { supplier, user } = req.body;

  try {
    chat = await Chat.updateMany(
      { user, supplier, 'message.supplierHasRead': false },
      { $set: { 'message.$[elem].supplierHasRead': true } },
      { arrayFilters: [{ 'elem.supplierHasRead': false }], multi: true }
    );

    res.status(201).json(chat);
  } catch (err) {
    console.error(err.message);
  }
});

// @route    POST api/chat/user-chats/:id
// @desc     Get all chats by user ID
// @access   Private
router.get('/user-chats/:id', async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.params.id })
      .sort({ updatedAt: -1 })
      .populate('user', 'firstName lastName')
      .populate('supplier', 'companyName');
    res.status(201).json(chats);
  } catch (err) {
    console.error(err.message);
  }
});

// @route    POST api/chat/supplier-chats/:id
// @desc     Get all chats by supplier ID
// @access   Private
router.get('/supplier-chats/:id', async (req, res) => {
  try {
    const chats = await Chat.find({ supplier: req.params.id })
      .sort({ updatedAt: -1 })
      .populate('user', 'firstName lastName')
      .populate('supplier', 'companyName');

    res.status(201).json(chats);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
