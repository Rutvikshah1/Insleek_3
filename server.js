const express = require('express');
const connectDB = require('./config/db');
const app = express();
const dotenv = require('dotenv');
const chalk = require('chalk');
const path = require('path');

dotenv.config();
// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('API Running'));
app.use('/api/supplier', require('./routes/api/supplier'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/chat', require('./routes/api/chat'));
app.use('/api/order', require('./routes/api/order'));
app.use('/api/product', require('./routes/api/product'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/authUser', require('./routes/api/authUser'));
app.use('/api/upload', require('./routes/api/upload'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.yellow(`Listening on PORT ${PORT}`)}`
  );
});
