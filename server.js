
// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
// scraping tools
const request = require('request');
const cheerio = require('cheerio');

// models needed
const Articles = require('./models/articles.js');
const Comments = require('./models/notes.js');

// imports routes
const routes = require('./controllers/article_controllers.js');

// sets mongoose to leverage Promises
mongoose.Promise = Promise;

// sets port
var port = process.env.PORT || 3000;
;
// initializes express
const app = express();

// logs requests to the console
app.use(logger('dev'));

// parses data
app.use(bodyParser.urlencoded({
  	extended: false
}));

// makes public a static dir
app.use(express.static(process.cwd() + '/public'));

// sets default view engine to handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

let mongoConfig = 'mongodb://localhost/mongoNew'

mongoose.connect(mongoConfig, { useNewUrlParser: true });
// saves our mongoose connection to db
let db = mongoose.connection;

// shows any mongoose errors
db.on('error', function(error) {
  	console.log('Mongoose Error: ', error);
});

// logs a success message once logged in to the db through mongoose
db.once('open', function() {
  	console.log('Mongoose connection successful.');
});

// handles routes
app.use('/', routes);

// listens on port
app.listen(port, function() {
	console.log(`Listening on ' + ${port}`);
});