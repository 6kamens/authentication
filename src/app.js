const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const passport = require('./passport');
const mongoose = require('mongoose');
const routes = require('./routes');
const session = require('express-session');

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
  }));

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5000;
const connectionString = process.env.DB_CONNECTION || "";

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('authentication server is running');
});


mongoose.connect(connectionString, {
    useNewUrlParser: true
}, (err) => {
    if (err) {
        console.log(`error connect db : ${err}`);
    } else {
        app.listen(port, () => {
            console.log(`app running port ${port}`);
        });
    }
});