const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const routes= require('./routes/index');
require('dotenv').config();
const app = express();

mongoose.connect('mongodb://localhost:27017/ecommerce',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDb'))
.catch(() => console.error('Error connecting to MongoDb',err));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api',routes);
app.get('/ecom', (req, res) => {
  res.send('Welcome to Ecom!');
});
app.use(express.urlencoded({extended: true}));
const PORT=process.env.PORT || 5001;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
