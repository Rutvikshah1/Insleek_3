const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const chalk = require('chalk');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`${chalk.green('✓')} ${chalk.green('MongoDB Connected!')}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
