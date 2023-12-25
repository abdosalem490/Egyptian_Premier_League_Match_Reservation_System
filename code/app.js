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
const { Server } = require('socket.io');


// import files from same project
const userRoutes = require('./routes/users');
const matchRoutes = require('./routes/matches');
const stadiumRoutes = require('./routes/stadiums');
const User = require('./models/user');
const { createServer } = require('node:http');

// connect to the database (mongodb)
mongoose.connect(process.env.DB_URL);

// utilities from the dependencies
const app = express();  // to use express server utilities
const server = createServer(app);
const io = new Server(server);

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
app.use(passport.initialize()); // init passport on every route call.
app.use(passport.session());    // allow passport to use "express-session".

// middleware for storing data
app.use(async (req, res, next) => {
    if (req.user) {
        res.locals.io = io;
        const user = await User.findById(req.user.id).populate([
            {
                path: 'reservedSeats',
                populate: [{
                    path: 'match',
                    populate: [{ path: 'matchVenue' }]
                }]
            }
        ]);
        res.locals.current_user = user;
        const unapprovedUsers = await User.find({ isApproved: false });
        res.locals.notificationNum = unapprovedUsers.length;
    } else {
        res.locals.current_user = null;
    }
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// routes
app.use('/', userRoutes);
app.use('/matches', matchRoutes);
app.use('/stadiums', stadiumRoutes);
app.get('/', (req, res) => {
    res.render('home');
});

// passport config
passport.use(new LocalStrategy(User.authenticate()));   // for normal authentication
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// handle any non-existent page
app.get('*', (req, res, next) => {
    res.send('page not found');
    next();
})


io.on('connection', (socket) => {

});

// begin listening to the ports
server.listen(process.env.PORT_NUM, () => {
    console.log(`Begun Listening to port ${process.env.PORT_NUM}`)
});