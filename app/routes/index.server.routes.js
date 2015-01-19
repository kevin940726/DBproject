var mongoose = require('mongoose');
var bodyParser = require('body-parser');
module.exports = function(app) {
    //var index = require('../controllers/index.server.controller');

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

	var peopleSchema = new mongoose.Schema({
		People_Id: String,
		People_Name: String,
		Birth_Date: String,
		Country: String,
		Img_Src: String,
		Description: String
	});

	var actMovieSchema = new mongoose.Schema({
		Movie_Id: String,
		People_Id: String,
		Character: String
	});

	var awardSchema = new mongoose.Schema({
		Award_Id: String,
		Award_Name: String
	});

	var awardMovieSchema = new mongoose.Schema({
		Movie_Id: String,
		Award_Id: String,
		Type: String,
		Year: String
	});

	var awardPeopleSchema = new mongoose.Schema({
		People_Id: String,
		Award_Id: String,
		Type: String,
		Year: String,
		Category: String
	});

	var awardTVSchema = new mongoose.Schema({
		Show_Id: String,
		Award_Id: String,
		Type: String,
		Year: String
	});

	app.use(bodyParser.urlencoded());

	var Movies = mongoose.model('Movies', movieSchema, 'MOVIES');
	var People = mongoose.model('People', peopleSchema, 'PEOPLE');
	var ActMovie = mongoose.model('ActMovie', actMovieSchema, 'ACT_MOVIE');
	var Award = mongoose.model('Award', awardSchema, 'AWARD');
	var AwardMovie = mongoose.model('AwardMovie', awardMovieSchema, 'AWARD_MOVIE');
	var AwardPeople = mongoose.model('AwardPeople', awardPeopleSchema, 'AWARD_PEOPLE');
	var AwardTV = mongoose.model('AwardTV', awardTVSchema, 'AWARD_TV');
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

	//--------------------------------PEOPLE-----------------------------
	//GET METHOD OF PEOPLE.
	app.get('/api/people', function(req, res){
		return People.find(function(err, people){
			if(!err){
				return res.send(people);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY ID OF PEOPLE.
	app.get('/api/people/:id', function(req, res){
		return People.findOne({People_Id: req.params.id}, function(err, people){
			if(!err){
				return res.send(people);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	// POST to CREATE OF PEOPLE
	app.post('/api/people', function (req, res) {
	  var person;
	  console.log("POST: ");
	  console.log(req.body);
	  person = new People({
	  	People_Id: req.body.People_Id,
		People_Name: req.body.People_Name,
		Birth_Date: req.body.Birth_Date,
		Country: req.body.Country,
		Img_Src: req.body.Img_Src,
		Description: req.body.Description
	  });
	  person.save(function (err) {
	    if (!err) {
	      return console.log("created");
	    } else {
	      return console.log(err);
	    }
	  });
	  return res.send(person);
	});

	// remove a single person
	app.delete('/api/people/:id', function (req, res) {
	  return People.findOne({People_Id: req.params.id}, function (err, person) {
	  	console.log(person);
	    return person.remove(function (err) {
	      if (!err) {
	        console.log("removed");
	        return res.send('');
	      } else {
	        console.log(err);
	      }
	    });
	  });
	});

	// Single person update
	app.put('/api/people/:id', function (req, res) {
	  return People.findOne({People_Id: req.params.id}, function (err, person) {
	  	person.People_Id = req.body.People_Id;
		person.People_Name = req.body.People_Name;
		person.Birth_Date = req.body.Birth_Date;
		person.Country = req.body.Country;
		person.Img_Src = req.body.Img_Src;
		person.Description = req.body.Description;
	    return person.save(function (err) {
	      if (!err) {
	        console.log("updated");
	      } else {
	        console.log(err);
	      }
	      return res.send(person);
	    });
	  });
	});

	//--------------------------------ACT_MOVIE-----------------------------
	//GET METHOD OF ACT_MOVIE.
	app.get('/api/actMovie', function(req, res){
		return ActMovie.find(function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY MOVIE ID OF ACT_MOVIE.
	app.get('/api/actMovie/:id', function(req, res){
		return ActMovie.find({Movie_Id: req.params.id}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY MOVIE ID OF ACT_MOVIE.
	app.get('/api/actMovie/:mid/:pid', function(req, res){
		return ActMovie.findOne({Movie_Id: req.params.mid, People_Id: req.params.pid}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//POST to CREATE ACT_MOVIE
	app.post('/api/actMovie', function (req, res) {
	  var doc;
	  console.log("POST: ");
	  console.log(req.body);
	  doc = new ActMovie({
	  	Movie_Id: req.body.Movie_Id,
	  	People_Id: req.body.People_Id,
		Character: req.body.Character
	  });
	  doc.save(function (err) {
	    if (!err) {
	      return console.log("created");
	    } else {
	      return console.log(err);
	    }
	  });
	  return res.send(doc);
	});

	//remove a single doc from ACT_MOVIE
	app.delete('/api/actMovie/:mid/:pid', function (req, res) {
	  return ActMovie.findOne({Movie_Id: req.params.mid, People_Id: req.params.pid}, function (err, doc) {
	  	console.log(doc);
	    return doc.remove(function (err) {
	      if (!err) {
	        console.log("removed");
	        return res.send('');
	      } else {
	        console.log(err);
	      }
	    });
	  });
	});

	//Single act update
	app.put('/api/actMovie/:mid/:pid', function (req, res) {
	  return ActMovie.findOne({Movie_Id: req.params.mid, People_Id: req.params.pid}, function (err, doc) {
	  	doc.Movie_Id = req.body.Movie_Id;
	  	doc.People_Id = req.body.People_Id;
		doc.Character = req.body.Character;
	    return doc.save(function (err) {
	      if (!err) {
	        console.log("updated");
	      } else {
	        console.log(err);
	      }
	      return res.send(doc);
	    });
	  });
	});

	//--------------------------------AWARD_MOVIE-----------------------------
	//GET METHOD OF AWARD_MOVIE.
	app.get('/api/awardMovie', function(req, res){
		return AwardMovie.find(function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY MOVIE ID OF AWARD_MOVIE.
	app.get('/api/awardMovie/:id', function(req, res){
		return AwardMovie.find({Movie_Id: req.params.id}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY ID
	app.get('/api/awardMovie/:mid/:aid/:y', function(req, res){
		return AwardMovie.findOne({Movie_Id: req.params.mid, Award_Id: req.params.aid, Year: req.params.y}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//POST to CREATE AWARD_MOVIE
	app.post('/api/awardMovie', function (req, res) {
	  var doc;
	  console.log("POST: ");
	  console.log(req.body);
	  doc = new AwardMovie({
	  	Movie_Id: req.body.Movie_Id,
	  	Award_Id: req.body.Award_Id,
		Type: req.body.Type,
		Year: req.body.Year
	  });
	  doc.save(function (err) {
	    if (!err) {
	      return console.log("created");
	    } else {
	      return console.log(err);
	    }
	  });
	  return res.send(doc);
	});

	//remove a single doc from AWARD_MOVIE
	app.delete('/api/awardMovie/:mid/:aid/:y', function (req, res) {
	  return AwardMovie.findOne({Movie_Id: req.params.mid, Award_Id: req.params.aid, Year: req.params.y}, function (err, doc) {
	  	console.log(doc);
	    return doc.remove(function (err) {
	      if (!err) {
	        console.log("removed");
	        return res.send('');
	      } else {
	        console.log(err);
	      }
	    });
	  });
	});

	//Single award update
	app.put('/api/awardMovie/:mid/:aid/:y', function (req, res) {
	  return AwardMovie.findOne({Movie_Id: req.params.mid, Award_Id: req.params.aid, Year: req.params.y}, function (err, doc) {
	  	doc.Movie_Id = req.body.Movie_Id;
	  	doc.Award_Id = req.body.Award_Id;
	  	doc.Type = req.body.Type;
		doc.Year = req.body.Year;
	    return doc.save(function (err) {
	      if (!err) {
	        console.log("updated");
	      } else {
	        console.log(err);
	      }
	      return res.send(doc);
	    });
	  });
	});



	//--------------------------------AWARD-----------------------------
	//GET METHOD.
	app.get('/api/award', function(req, res){
		return Award.find(function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY ID
	app.get('/api/award/:id', function(req, res){
		return Award.find({Award_Id: req.params.id}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//POST to CREATE
	app.post('/api/award', function (req, res) {
	  var doc;
	  console.log("POST: ");
	  console.log(req.body);
	  doc = new Award({
	  	Award_Id: req.body.Award_Id,
		Award_Name: req.body.Award_Name
	  });
	  doc.save(function (err) {
	    if (!err) {
	      return console.log("created");
	    } else {
	      return console.log(err);
	    }
	  });
	  return res.send(doc);
	});

	//remove a single doc 
	app.delete('/api/award/:id', function (req, res) {
	  return Award.findOne({Award_Id: req.params.id}, function (err, doc) {
	  	console.log(doc);
	    return doc.remove(function (err) {
	      if (!err) {
	        console.log("removed");
	        return res.send('');
	      } else {
	        console.log(err);
	      }
	    });
	  });
	});

	//Single update
	app.put('/api/award/:id', function (req, res) {
	  return Award.findOne({Award_Id: req.params.id}, function (err, doc) {
	  	doc.Award_Id = req.body.Award_Id;
	  	doc.Award_Name = req.body.Award_Name;
	    return doc.save(function (err) {
	      if (!err) {
	        console.log("updated");
	      } else {
	        console.log(err);
	      }
	      return res.send(doc);
	    });
	  });
	});


	//--------------------------------AWARD_PEOPLE-----------------------------
	//GET METHOD.
	app.get('/api/awardPeople', function(req, res){
		return AwardPeople.find(function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY ID
	app.get('/api/awardPeople/:id', function(req, res){
		return AwardPeople.find({People_Id: req.params.id}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY ID
	app.get('/api/awardPeople/:pid/:aid/:y/:c', function(req, res){
		return AwardPeople.findOne({People_Id: req.params.pid, Award_Id: req.params.aid, Year: req.params.y, Category: req.params.c}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//POST to CREATE
	app.post('/api/awardPeople', function (req, res) {
	  var doc;
	  console.log("POST: ");
	  console.log(req.body);
	  doc = new AwardPeople({
	  	People_Id: req.body.People_Id,
	  	Award_Id: req.body.Award_Id,
		Type: req.body.Type,
		Year: req.body.Year,
		Category: req.body.Category
	  });
	  doc.save(function (err) {
	    if (!err) {
	      return console.log("created");
	    } else {
	      return console.log(err);
	    }
	  });
	  return res.send(doc);
	});

	//remove a single doc
	app.delete('/api/awardPeople/:pid/:aid/:y/:c', function (req, res) {
	  return AwardPeople.findOne({People_Id: req.params.pid, Award_Id: req.params.aid, Year: req.params.y, Category: req.params.c}, function (err, doc) {
	  	console.log(doc);
	    return doc.remove(function (err) {
	      if (!err) {
	        console.log("removed");
	        return res.send('');
	      } else {
	        console.log(err);
	      }
	    });
	  });
	});

	//Single update
	app.put('/api/awardPeople/:pid/:aid/:y/:c', function (req, res) {
	  return AwardPeople.findOne({People_Id: req.params.pid, Award_Id: req.params.aid, Year: req.params.y, Category: req.params.c}, function (err, doc) {
	  	doc.People_Id = req.body.People_Id;
	  	doc.Award_Id = req.body.Award_Id;
	  	doc.Type = req.body.Type;
		doc.Year = req.body.Year;
		doc.Category = req.body.Category;
	    return doc.save(function (err) {
	      if (!err) {
	        console.log("updated");
	      } else {
	        console.log(err);
	      }
	      return res.send(doc);
	    });
	  });
	});


	//--------------------------------AWARD_TV-----------------------------
	//GET METHOD.
	app.get('/api/awardTV', function(req, res){
		return AwardTV.find(function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY TV SHOW ID.
	app.get('/api/awardTV/:id', function(req, res){
		return AwardTV.find({Show_Id: req.params.id}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET SINGLE BY SHOW ID, AWARD ID, YEAR.
	app.get('/api/awardTV/:tid/:aid/:y', function(req, res){
		return AwardTV.findOne({Show_Id: req.params.tid, Award_Id: req.params.aid, Year: req.params.y}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//POST to CREATE
	app.post('/api/awardTV', function (req, res) {
	  var doc;
	  console.log("POST: ");
	  console.log(req.body);
	  doc = new AwardTV({
	  	Show_Id: req.body.Show_Id,
	  	Award_Id: req.body.Award_Id,
		Type: req.body.Type,
		Year: req.body.Year
	  });
	  doc.save(function (err) {
	    if (!err) {
	      return console.log("created");
	    } else {
	      return console.log(err);
	    }
	  });
	  return res.send(doc);
	});

	//remove a single doc
	app.delete('/api/awardPeople/:tid/:aid/:y', function (req, res) {
	  return AwardTV.findOne({Show_Id: req.params.tid, Award_Id: req.params.aid, Year: req.params.y}, function (err, doc) {
	  	console.log(doc);
	    return doc.remove(function (err) {
	      if (!err) {
	        console.log("removed");
	        return res.send('');
	      } else {
	        console.log(err);
	      }
	    });
	  });
	});

	//Single update
	app.put('/api/awardPeople/:tid/:aid/:y', function (req, res) {
	  return AwardTV.findOne({Show_Id: req.params.tid, Award_Id: req.params.aid, Year: req.params.y}, function (err, doc) {
	  	doc.Show_Id = req.body.Show_Id;
	  	doc.Award_Id = req.body.Award_Id;
	  	doc.Type = req.body.Type;
		doc.Year = req.body.Year;
	    return doc.save(function (err) {
	      if (!err) {
	        console.log("updated");
	      } else {
	        console.log(err);
	      }
	      return res.send(doc);
	    });
	  });
	});

	app.get('*', function(req, res) {
		res.render('index');
	});
};