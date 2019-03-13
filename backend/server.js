import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);
import path from 'path';

const app = express();

// connect to database 
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', () => console.log('Connection to database established'));

app.use('/assets', express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));


//page not found handler
app.use((req, res) => {
  res.send('404 not found')
});

//error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status = err.status || 500;
  res.send(err.message);
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening at port ' + listener.address().port);
});

