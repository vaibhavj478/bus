
// Define Booking schema
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  seatNumber: {
    type: [Number], // Making seatNumber an array of numbers
    required: true,
  },
  travelDate: {
    type: Date,
    required: true,
  },

  isScaned: {
    type: Boolean,
    default: false, // Set default value to false
    required: true,
  },
  // Add more booking details as needed
});



// Create models for each schema

const Booking = mongoose.model('Booking', bookingSchema);

// Export the models
module.exports = { Booking };
