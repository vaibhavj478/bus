const express = require("express");
const connectDB = require("./config/database");
const unirest = require("unirest");
const dotenv  = require("dotenv").config()


const { Booking } = require("./model");
const port =  process.env.PORT ||  8080;

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let apiKey = `vpIOdc693aYMsQmowbEkHtehr8AgxyW7PRNuGJzZn2qlDFL0UCUY6XHLIP7Crm45d9hReNKBGiSO2ukF`;

app.get("/", async (req, res) => {
  try {


    res.status(200).send({
      success: true,
      message: "home",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "error",
    });
  }
});

app.get("/ticket/:id" , async(req,res)=>{

  try {
    
   
    let data  = await Booking.findById(req.params.id);

   
    res.status(201).json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

app.post("/bookings", async (req, res) => {
  try {
    // Create a new booking instance using the request body
    const newBooking = new Booking(req.body);
    // Save the booking to the database
    const savedBooking = await newBooking.save();

    console.log(req.body)
    var response =  unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

    response.headers({
      "authorization": apiKey
    });
    
    response.form({
      "message": `http://localhost:3000/qr-code/${savedBooking._id}`,
      "language": "english",
      "route": "q",
      "numbers": savedBooking.mobile
    });
    
    response.end(function (res) {
  
      if (res.error) throw new Error(res.error);
   
    });
    
    res.status(201).json(savedBooking);

  } catch (error) {
  
    res.status(500).json({ error: error.message });
  }
});

app.get("/booked-seats" , async(req,res)=>{

  try {

    let allBookedSeats  =  await Booking.find({}, 'seatNumber');
 
   

    let seats = [];


     allBookedSeats.forEach((el,ind)=>{

      seats = [...seats , ...el.seatNumber];

     })


    res.status(200).send({
      success:true , 
      seats
    })
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});



app.listen(port, async () => {
  try {
    // Uncomment the line below if you want to connect to a database
    await connectDB();
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log(error.message);
  }
});
