require('./modals/User');
require('./modals/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb://saurabh:password1@ds257732.mlab.com:57732/tracker';
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex: true
});

mongoose.connection.on('connected', ()=>{
    console.log('Connected to Mongoose instance');
});

mongoose.connection.on('error', (err)=>{
    console.error('Error connecting to mongoose', err);
})

app.get('/', requireAuth, (req,res) =>{
    res.send(`Your eamil is ${req.user.email}`);
});

app.listen(3000, ()=>{
    console.log('Listening on Port 3000');
})