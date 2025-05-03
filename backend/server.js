const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json()); 
app.use(cors()); 



mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); 
  });


app.use('/api/owners', require('./routes/ownerRoutes')); 
app.use('/api/public', require('./routes/publicRoutes')); 
app.use('/api/auth', require('./routes/authroutes')); 
app.use('/api/service',require('./routes/servicereq'));
app.use('/api/feedback',require('./routes/feedback'));
app.use('/api/ser',require('./routes/service1'));
app.use('/api/ser1',require('./routes/service2'));




app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));