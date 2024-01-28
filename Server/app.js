/* eslint-disable no-undef */
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const multer = require("multer");
const { connectDb } = require("./database/mongoConnector");
const { makeJsonResponse } = require("./utils/response");
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const { isAuthenticated } = require('./app/middlewares/auth/isAuthenticated')
const flash = require('connect-flash');
const { isExcludedUrl } = require('./utils/urlMatchCheck');
const cors = require('cors');

const app = express();
app.use(cors());
app.use((req, res, next) => {
  let activeMenu = '';
  if (req.originalUrl.startsWith('/admin')) {
    res.locals.request = req;
    activeMenu = req.path;
    res.locals.activeMenu = activeMenu;
  }
  next();
});


//routes

//Admin Routes

const authRoutes = require('./routes/api/admin/adminAuthRoutes')
const userAuthRoutes = require('./routes/api/user/auth/userAuthRoutes')
const basicConfig = require('./routes/admin/basicConfig/basicConfRoutes')
const adminDashboardRoutes = require('./routes/api/admin/dashboardRoutes')
const adminContinentRoutes = require('./routes/api/admin/continentsRoutes')

// General Routes
const genralDetails = require("./routes/genaralRuotes")


app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const store = new MongoDBStore({
  uri: process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/ente-anagamaly',
  collection: 'sessions'
});

store.on('error', function (error) {
  console.log(error);
});


// Set up session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: true,
  saveUninitialized: true,
  store: store
}));
app.use(flash());

// Set up passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(csrf());
app.use(passport.authenticate('session'));
app.use(function (req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
});
app.use(function (err, req, res, next) {
  const url = req.url;
  const isExcludedUrlCheck = isExcludedUrl(url)
  if (!isExcludedUrlCheck) {
    res.locals.csrfToken = req.csrfToken();
  }
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('uploads'));
app.use(express.static(path.join(__dirname, "public")));
app.use('/public', express.static(__dirname + '/public', {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

connectDb();
// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// Admin Routes
app.use("/api/admin",authRoutes);
app.use("/api/admin/dashboard",adminDashboardRoutes)
app.use("/api/user",userAuthRoutes);
app.use("/",basicConfig);
app.use("/api/admin/continents",adminContinentRoutes)

app.use('/country_flags', express.static(path.join(__dirname, 'public/assets/images/country_flags')));


// General Routes

app.use("/", genralDetails)

app.use(express.static('public'))






// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  const httpStatusCode = 403;
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page

  if (err instanceof multer.MulterError) {
    console.log("MULTER ERROR " + JSON.stringify(err));
  }

  // res.status(err.status || 500);
  // res.render('error');
  const response = makeJsonResponse(err?.message, {}, {}, httpStatusCode, false);
  res.status(httpStatusCode).json(response);
});

const port = process.env.APP_PORT || 3000;

// List all routes
const routes = [];
app._router.stack.forEach(middleware => {
  if (middleware.route) {
    // Routes registered directly on the app object
    routes.push(middleware.route.path);
  } else if (middleware.name === 'router') {
    // Routes added using a router object
    middleware.handle.stack.forEach(handler => {
      const route = handler.route;
      routes.push(route.path);
    });
  }
});




console.log(routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
