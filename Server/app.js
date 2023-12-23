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

const app = express();

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

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const adminAuthRouter = require("./routes/admin/auth/adminAuth");
const adminDashboardRouter = require("./routes/admin/dashboard/dashboardRoutes");
const adminBasicConfig = require("./routes/admin/basicConfig/basicConfRoutes");
const adminForgotPassword = require("./routes/admin/auth/forgotPassword/adminForgotPasswordRoute");
const adminChangePassword = require("./routes/admin/settings/changePassword/changePasswordRoutes");
const adminFeedback = require("./routes/admin/feedback/feedbackRouter");
const adminAppDetails = require("./routes/admin/appDetails/adminAppDetailRouter");
const adminComingSoon = require("./routes/admin/comingSoon/comingSoonRouter");
const adminAdvertisement = require('./routes/admin/advertisement/advertisementRouter')
const adminCategory = require('./routes/admin/category/categoryRouter')
const adminManageCategory = require('./routes/admin/settings/category/categoryManageRoutes')

// API routes V1
const appDetails = require("./routes/api/appDetails/appDetailsRouter");
const feedback = require("./routes/api/feedback/feedbackController");
const advertisement = require('./routes/api/advertisement/advertisementRoute');
const home = require('./routes/api/home/homeRouter');

// API routes V2
const appDetailsV2 = require("./routes/api_v2/appDetails/appDetailsRouter");
const feedbackV2 = require("./routes/api_v2/feedback/feedbackController");
const advertisementV2 = require('./routes/api_v2/advertisement/advertisementRoute');
const homeV2 = require('./routes/api_v2/home/homeRouter');

// General Routes
const genralDetails = require("./routes/genaralRuotes")

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
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

app.use("/admin", adminAuthRouter);
app.use("/admin/dashboard", isAuthenticated, adminDashboardRouter);
app.use("/admin/basic-config", adminBasicConfig);
app.use("/admin/forgot-password", adminForgotPassword);
app.use("/admin/settings/change-password", isAuthenticated, adminChangePassword);
app.use("/admin/feedback", isAuthenticated, adminFeedback);
app.use("/admin/app-details", isAuthenticated, adminAppDetails);
app.use("/admin/coming-soon", isAuthenticated, adminComingSoon);
app.use("/admin/advertisements", isAuthenticated, adminAdvertisement)
app.use("/admin/category", isAuthenticated, adminCategory);
app.use("/admin/settings/category", isAuthenticated, adminManageCategory);


// API Routes V1

app.use("/api/app-details", appDetails);
app.use("/api/feedback", feedback);
app.use("/api/advertisement", advertisement);
app.use("/api/home", home)

// API Routes V2

app.use("/api/v2/app-details", appDetailsV2);
app.use("/api/v2/feedback", feedbackV2);
app.use("/api/v2/advertisement", advertisementV2);
app.use("/api/v2/home", homeV2)

// General Routes

app.use("/", genralDetails)

app.use(express.static('public'))






// catch 404 and forward to error handler
app.use(function (req, res, next) {

  if (req.user) {
    res.redirect('/admin/coming-soon')
  }
  res.redirect('/admin/login')
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
