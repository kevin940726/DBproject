var port = 1337;
var express = require('./config/express');
var mongoose = require('mongoose');
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
	return Movies.findOne({Movie_Id: req.params.id}, function(err, movie){
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
  	Movie_Id: req.body.Movie_Id,
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

// remove a single product
app.delete('/api/movies/:id', function (req, res) {
  return Movies.findOne({Movie_Id: req.params.id}, function (err, movie) {
  	console.log(movie);
    return movie.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});

// Single update
app.put('/api/movies/:id', function (req, res) {
  return Movies.findOne({Movie_Id: req.params.id}, function (err, movie) {
  	movie.Movie_Id = req.body.Movie_Id;
	movie.Movie_Title = req.body.Movie_Title;
	movie.Release_Date = req.body.Release_Date;
	movie.Duration = req.body.Duration;
	movie.Rating = req.body.Rating;
	movie.Director = req.body.Director;
	movie.Img_Src = req.body.Img_Src;
	movie.Description = req.body.Description;
	movie.Country = req.body.Country;
	movie.Language = req.body.Language;
	movie.Company = req.body.Company;
    return movie.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(movie);
    });
  });
});

