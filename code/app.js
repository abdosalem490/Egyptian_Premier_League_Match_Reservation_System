require('dotenv').config();

// import packages
const express = require('express'); // Node.js framework to create a server and accept requests
const mongoose = require('mongoose'); // for mongo database
const mongoSanitize = require('express-mongo-sanitize');    // to protect against injections
const passport = require('passport');   // Authentication package for Node.js
const LocalStrategy = require('passport-local');
const session = require('express-session'); // To save information in session and use it 
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');
const ejsMate = require('ejs-mate');    // To render HTML pages for login and profile
const flash = require('connect-flash');
const methodOverride = require('method-override');

// import files from same project
const userRoutes = require('./routes/users');
const matchRoutes = require('./routes/matches');
const User = require('./models/user');

// connect to the database (mongodb)
mongoose.connect(process.env.DB_URL);

// utilities from the dependencies
const app = express();  // to use express server utilities


// to render pages 
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// configuration
const store = new MongoDBStore({
    uri: process.env.DB_URL,
    collection: 'mySessions'
});
const sessionConfig = {
    store,      // this is where the session is stored
    name: 'session',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // after a week
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
}


// middlewares
app.use(express.urlencoded({ extended: true }));  // to parse coming POST and PUT requests
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(mongoSanitize());
app.use(flash());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());


// routes

app.use('/', userRoutes);
app.use('/matches', matchRoutes);
app.get('/', (req, res) => {
    res.render('home');
});

// passport config
passport.use(new LocalStrategy(User.authenticate()));   // for normal authentication
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// begin listening to the ports
app.listen(process.env.PORT_NUM, () => {
    console.log(`Begun Listening to port ${process.env.PORT_NUM}`)
});