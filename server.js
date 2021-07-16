const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.CON_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use('/devis',require('./api/controllers/devisController'))
app.use('/client',require('./api/controllers/clientController'))
app.listen(5000, ()=>{console.log('listening on port 5000')});