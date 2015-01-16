var port = 1337;
var express = require('./config/express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var app = express();

app.listen(port);
module.exports = app;
console.log('Server running at http://localhost:' + port);

var movieSchema = new mongoose.Schema({
	Movie_Id: String,
	Movie_Title: String,
	Release_Date: String,
	Duration: Number,
	Rating: Number,
	Director: String,
	Img_Src: String,
	Description: String,
	Country: String,
	Language: String,
	Company: String
});

var testingSchema = new mongoose.Schema({
	_id: Number,
	testa: String,
	testb: String,
	testc: String
});

app.use(bodyParser.urlencoded());

var Movies = mongoose.model('Movies', movieSchema, 'MOVIES');
var testing = mongoose.model('testing', testingSchema);
mongoose.connect('mongodb://kai:kai41@ds031691.mongolab.com:31691/mydb');

//GET METHOD.
app.get('/api/movies', function(req, res){
	return Movies.find(function(err, movie){
		if(!err){
			return res.send(movie);
		}
		else{
			return res.send("Error!");
		}
	});
});

//GET METHOD BY ID.
app.get('/api/movies/:id', function(req, res){
	return Movies.findOne({Movie_Id: "1"}, function(err, movie){
		if(!err){
			return res.send(movie);
		}
		else{
			return res.send("Error!");
		}
	});
});

// POST to CREATE
app.post('/api/movies', function (req, res) {
  var movie;
  console.log("POST: ");
  console.log(req.body);
  movie = new Movies({
  	_id: req.body.id,
	Movie_Title: req.body.Movie_Title,
	Release_Date: req.body.Release_Date,
	Duration: req.body.Duration,
	Rating: req.body.Rating,
	Director: req.body.Director,
	Img_Src: req.body.Img_Src,
	Description: req.body.Description,
	Country: req.body.Country,
	Language: req.body.Language,
	Company: req.body.Company
  });
  movie.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(movie);
});