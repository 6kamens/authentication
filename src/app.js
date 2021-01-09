const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(helmet());

const port = process.env.PORT || 5000;
const connectionString = process.env.DB_CONNECTION || "";


app.use('/api',routes);

app.get('/',(req,res)=>{
    res.send('authentication server is running');
});


mongoose.connect(connectionString,{useNewUrlParser:true},(err)=>{
    if(err){
        console.log(`error connect db : ${err}`);
    }else{
        app.listen(port,()=>{
            console.log(`app running port ${port}`);
        });
    }
});


