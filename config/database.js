const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Replace 'your_database_url' with your actual MongoDB connection string
    const dbUrl = 'mongodb+srv://vaibhav_j143:9414725512rubY.@cluster0.p53xw.mongodb.net/bus_book?retryWrites=true&w=majority';

    await mongoose.connect(dbUrl, {
    
    });

    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1); // Exit the process with an error code
  }
};

module.exports = connectDB;
