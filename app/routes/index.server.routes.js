var mongoose = require('mongoose');
var bodyParser = require('body-parser');
module.exports = function(app) {

	/*-----------------------schemas START-----------------------*/
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

	var TVShowSchema = new mongoose.Schema({
		Show_Id: String,
		Title: String,
		Season: String,
		Length: Number,
		Img_Src: String,
		Country: String,
		Language: String,
		Start_Year: String,
		End_Year: String,
		Rating: Number,
		Description: String
	})

	var TVShowDetailSchema = new mongoose.Schema({
		Show_Id: String,
		Title: String,
		Release_Date: String,
		Season: String,
		Rating: Number,
		Episode: String,
		Img_Src: String,
		Description: String
	})

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
		Award_Name: String,
		Img_Src: String,
		Description: String
	});

	var awardMovieSchema = new mongoose.Schema({
		Movie_Id: String,
		Award_Id: String,
		Type: String,//ex.best male actor
		Year: String

	});

	var awardPeopleSchema = new mongoose.Schema({
		People_Id: String,
		Award_Id: String,
		Category: String,//ex.best male actor
		Type: String,
		Year: String
	});

	var awardTVSchema = new mongoose.Schema({
		Show_Id: String,
		Award_Id: String,
		Category: String,//ex.best TV show
		Type: String,
		Year: String
	});

	var actTVShowSchema = new mongoose.Schema({
		Show_Id: String,
		People_Id: String,
		Character: String
	});

	var Direct_TVSchema = new mongoose.Schema({
		People_Id: String,
		Show_Id: String,
		Episodes: Number
	})

	var Write_MovieSchema = new mongoose.Schema({
		People_Id: String,
		Movie_Id: String,
	})

	var Write_TVShowSchema = new mongoose.Schema({
		People_Id: String,
		Show_Id: String
	})

	var Movie_GenresSchema = new mongoose.Schema({
		Movie_Id: String,
		Genre: String,
	})

	var TV_GenresSchema = new mongoose.Schema({
		Show_Id: String,
		Genre: String,
	})

/*-----------------------schemas END-----------------------*/

	app.use(bodyParser.urlencoded());

	var Movies = mongoose.model('Movies', movieSchema, 'MOVIES');
	var People = mongoose.model('People', peopleSchema, 'PEOPLE');
	var TVShow = mongoose.model('TVShow', TVShowSchema, 'TV');
	var TVShowDetail = mongoose.model('TVShowDetail', TVShowDetailSchema, 'TV_DETAIL');
	var ActMovie = mongoose.model('ActMovie', actMovieSchema, 'ACT_MOVIE');
	var ActTVShow = mongoose.model('ActTVShow', actTVShowSchema, 'ACT_TV');
	var DirectTV = mongoose.model('DirectTV', Direct_TVSchema, 'DIRECT_TV');
	var WriteMovie = mongoose.model('WriteMovie', Write_MovieSchema, 'WRITE_MOVIE');
	var WriteTV = mongoose.model('WriteTV', Write_TVShowSchema, 'WRITE_TV');
	var MovieGenre = mongoose.model('MovieGenre', Movie_GenresSchema, 'MOVIE_GENRES');
	var TVGenres = mongoose.model('TVGenres', TV_GenresSchema, 'TV_GENRES');
	var Award = mongoose.model('Award', awardSchema, 'AWARD');
	var AwardMovie = mongoose.model('AwardMovie', awardMovieSchema, 'AWARD_MOVIE');
	var AwardPeople = mongoose.model('AwardPeople', awardPeopleSchema, 'AWARD_PEOPLE');
	var AwardTV = mongoose.model('AwardTV', awardTVSchema, 'AWARD_TV');

	mongoose.connect('mongodb://kai:kai41@ds031691.mongolab.com:31691/mydb');


	//--------------------------------MOVIE START-----------------------------
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
	      return console.log("created a new movie!");
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
	//--------------------------------MOVIE END-----------------------------

	//--------------------------------TV START-----------------------------
	//GET METHOD.
	app.get('/api/tvshow', function(req, res){
		return TVShow.find(function(err, tvshow){
			if(!err){
				return res.send(tvshow);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY ID.
	app.get('/api/tvshow/:id', function(req, res){
		return TVShow.findOne({Show_Id: req.params.id}, function(err, tvshow){
			if(!err){
				return res.send(tvshow);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	// POST to CREATE
	app.post('/api/tvshow', function (req, res) {
	  var tvshow;
	  console.log("POST: ");
	  console.log(req.body);
	  tvshow = new TVShow({
	  	Show_Id: req.body.Show_Id,
		Title: req.body.Title,
		Season: req.body.Season,
		Length: req.body.Length,
		Img_Src: req.body.Img_Src,
		Description: req.body.Description,
		Country: req.body.Country,
		Language: req.body.Language,
		Start_Year:req.body.Start_Year,
		End_Year: req.body.End_Year,
		Rating: req.body.Rating,
	  });
	  tvshow.save(function (err) {
	    if (!err) {
	      return console.log("created a new TV Show!");
	    } else {
	      return console.log(err);
	    }
	  });
	  return res.send(tvshow);
	});

	// remove a single product Q:WHERE DOES THE ORANGE VARIABLE tvshow COME FROM?
	app.delete('/api/tvshow/:id', function (req, res) {
	  return TVShow.findOne({Show_Id: req.params.id}, function (err, tvshow) {
	  	console.log(tvshow);
	    return tvshow.remove(function (err) {
	      if (!err) {
	        console.log("removed a TV Show");
	        return res.send('');
	      } else {
	        console.log(err);
	      }
	    });
	  });
	});

	// Single update
	app.put('/api/tvshow/:id', function (req, res) {
	  return TVShow.findOne({Show_Id: req.params.id}, function (err, tvshow) {
	  	tvshow.Show_Id = req.body.Show_Id;
		tvshow.Title = req.body.Title;
		tvshow.Season = req.body.Season;
		tvshow.Length = req.body.Length;
		tvshow.Img_Src = req.body.Img_Src;
		tvshow.Description = req.body.Description;
		tvshow.Country = req.body.Country;
		tvshow.Language = req.body.Language;
		tvshow.Rating = req.body.Rating;
		tvshow.Start_Year = req.body.Start_Year;
		tvshow.End_Year = req.body.End_Year;
		
	    return tvshow.save(function (err) {
	      if (!err) {
	        console.log("updated");
	      } else {
	        console.log(err);
	      }
	      return res.send(tvshow);
	    });
	  });
	});
	//--------------------------------TV END-----------------------------

	//--------------------------------TV DETAIL START-----------------------------
	//GET METHOD.
	app.get('/api/tvshowdetail', function(req, res){
		return TVShowDetail.find(function(err, tvshowdetail){
			if(!err){
				return res.send(tvshowdetail);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY ID.
	app.get('/api/tvshowdetail/:sid', function(req, res){
		return TVShowDetail.find({Show_Id: req.params.sid}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY ID.
	app.get('/api/tvshowdetail/:sid/:nid/:eid', function(req, res){
		return TVShowDetail.findOne({Show_Id: req.params.sid, Season: req.params.nid, Episode: req.params.eid}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	// POST to CREATE
	app.post('/api/tvshowdetail', function (req, res) {
	  var tvshowdetail;
	  console.log("POST: ");
	  console.log(req.body);
	  tvshowdetail = new TVShowDetail({
	  	Show_Id: req.body.Show_Id,
		Title: req.body.Title,
		Season: req.body.Season,
		Release_Date: req.body.Release_Date,
		Rating: req.body.Rating,
		Episode: req.body.Episode,
		Img_Src: req.body.Img_Src,
		Description: req.body.Description
	  });
	  tvshowdetail.save(function (err) {
	    if (!err) {
	      return console.log("created a new TV Show Detail!");
	    } else {
	      return console.log(err);
	    }
	  });
	  return res.send(tvshowdetail);
	});

	// remove a single product Q:WHERE DOES THE ORANGE VARIABLE tvshow COME FROM?
	app.delete('/api/tvshowdetail/:sid/:nid/:eid', function (req, res) {
	  return TVShowDetail.findOne({Show_Id: req.params.sid, Season: req.params.nid, Episode: req.params.eid}, function (err, tvshowdetail) {
	  	console.log(tvshowdetail);
	    return tvshowdetail.remove(function (err) {
	      if (!err) {
	        console.log("removed a TV Show Detail");
	        return res.send('');
	      } else {
	        console.log(err);
	      }
	    });
	  });
	});

	// Single update
	app.put('/api/tvshowdetail/:sid/:nid/:eid', function (req, res) {
	  return TVShowDetail.findOne({Show_Id: req.params.sid, Season: req.params.nid, Episode: req.params.eid}, function (err, tvshowdetail) {
	  	tvshowdetail.Show_Id = req.body.Show_Id;
		tvshowdetail.Title = req.body.Title;
		tvshowdetail.Season = req.body.Season;
		
		tvshowdetail.Release_Date = req.body.Release_Date;
		
		tvshowdetail.Rating = req.body.Rating;
		tvshowdetail.Episode= req.body.Episode;
		tvshowdetail.Img_Src = req.body.Img_Src;
		tvshowdetail.Description = req.body.Description;
		
	    return tvshowdetail.save(function (err) {
	      if (!err) {
	        console.log("updated");
	      } else {
	        console.log(err);
	      }
	      return res.send(tvshowdetail);
	    });
	  });
	});

	//--------------------------------TV DETAIL END-----------------------------


	//--------------------------------PEOPLE START-----------------------------
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
	//--------------------------------PEOPLE START-----------------------------


	//--------------------------------ACT_MOVIE START-----------------------------
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
	//--------------------------------ACT_MOVIE END-----------------------------

	//--------------------------------AWARD_MOVIE START-----------------------------
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
	//--------------------------------AWARD_MOVIE END-----------------------------


	//--------------------------------AWARD START-----------------------------
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
		Award_Name: req.body.Award_Name,
		Img_Src: req.body.Img_Src,
		Description: req.body.Description
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
	  	doc.Img_Src = req.body.Img_Src;
	  	doc.Description = req.body.Description;
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
	//--------------------------------AWARD END-----------------------------

	//--------------------------------AWARD_PEOPLE START-----------------------------
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
	//--------------------------------AWARD_PEOPLE END-----------------------------

	//--------------------------------AWARD_TV START-----------------------------
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
	  	Category: req.body.Category,
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
	app.delete('/api/awardTV/:tid/:aid/:y', function (req, res) {
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
	app.put('/api/awardTV/:tid/:aid/:y', function (req, res) {
	  return AwardTV.findOne({Show_Id: req.params.tid, Award_Id: req.params.aid, Year: req.params.y}, function (err, doc) {
	  	doc.Show_Id = req.body.Show_Id;
	  	doc.Award_Id = req.body.Award_Id;
	  	doc.Category = req.body.Category;
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


	//--------------------------------AWARD_TV END-----------------------------

	//--------------------------------ACT_TV START-----------------------------
	//GET METHOD OF ACT_TV.
	app.get('/api/actTVShow', function(req, res){
		return ActTVShow.find(function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY MOVIE ID OF ACT_TV.
	app.get('/api/actTVShow/:sid', function(req, res){
		return ActTVShow.find({Show_Id: req.params.sid}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY MOVIE ID OF ACT_TV.
	app.get('/api/actTVShow/:sid/:pid', function(req, res){
		return ActTVShow.findOne({Show_Id: req.params.sid, People_Id: req.params.pid}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//POST to CREATE ACT_TV
	app.post('/api/actTVShow', function (req, res) {
	  var doc;
	  console.log("POST: ");
	  console.log(req.body);
	  doc = new ActTVShow({
	  	Show_Id: req.body.Show_Id,
	  	People_Id: req.body.People_Id,
		Character: req.body.Character
	  });
	  doc.save(function (err) {
	    if (!err) {
	      return console.log("created an new actTVShow");
	    } else {
	      return console.log(err);
	    }
	  });
	  return res.send(doc);
	});

	//remove a single doc from ACT_TV
	app.delete('/api/actTVShow/:sid/:pid', function (req, res) {
	  return ActTVShow.findOne({Show_Id: req.params.sid, People_Id: req.params.pid}, function (err, doc) {
	  	console.log(doc);
	    return doc.remove(function (err) {
	      if (!err) {
	        console.log("removed an actTVShow");
	        return res.send('');
	      } else {
	        console.log(err);
	      }
	    });
	  });
	});

	//Single act update
	app.put('/api/actTVShow/:mid/:pid', function (req, res) {
	  return ActTVShow.findOne({Show_Id: req.params.sid, People_Id: req.params.pid}, function (err, doc) {
	  	doc.Show_Id = req.body.Show_Id;
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
	//--------------------------------ACT_TV END-----------------------------

	//--------------------------------DirectTV START-----------------------------
	//GET METHOD OF DirectTV.
	app.get('/api/directTV', function(req, res){
		return DirectTV.find(function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	// GET METHOD BY PEOPLE ID OF DirectTV
	app.get('/api/directTV/show/:sid', function(req, res){
		return DirectTV.find({Show_Id: req.params.sid}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY MOVIE ID OF DirectTV.
	app.get('/api/directTV/:pid/:sid', function(req, res){
		return DirectTV.findOne({People_Id: req.params.pid, Show_Id: req.params.sid} ,  function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	

	// GET METHOD BY PEOPLE ID OF DirectTV
	app.get('/api/directTV/:pid', function(req, res){
		return DirectTV.find({People_Id: req.params.pid}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});
	//POST to CREATE DIRECT_TV
	app.post('/api/directTV', function (req, res) {
	  var doc;
	  console.log("POST: ");
	  console.log(req.body);
	  doc = new DirectTV({
	  	People_Id: req.body.People_Id,
	  	Show_Id: req.body.Show_Id,
	  	Episodes: req.body.Episodes
	  });
	  doc.save(function (err) {
	    if (!err) {
	      return console.log("created an new directTV");
	    } else {
	      return console.log(err);
	    }
	  });
	  return res.send(doc);
	});

	//remove a single doc from DIRECT_TV
	app.delete('/api/directTV/:sid/:pid', function (req, res) {
	  return DirectTV.findOne({Show_Id: req.params.sid, People_Id: req.params.pid}, function (err, doc) {
	  	console.log(doc);
	    return doc.remove(function (err) {
	      if (!err) {
	        console.log("removed an directTV");
	        return res.send('');
	      } else {
	        console.log(err);
	      }
	    });
	  });
	});

	//Single act update
	app.put('/api/directTV/:sid/:pid', function (req, res) {
	  return DirectTV.findOne({Show_Id: req.params.sid, People_Id: req.params.pid}, function (err, doc) {
	  	doc.People_Id = req.body.People_Id;
	  	doc.Show_Id = req.body.Show_Id;
	  	doc.Episodes = req.body.Episodes;
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

	//--------------------------------DirectTV END-----------------------------

	//--------------------------------WriteMovie START-----------------------------
	//GET METHOD OF WriteMovie.
	app.get('/api/writeMovie', function(req, res){
		return WriteMovie.find(function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY PEOPLE ID OF WriteMovie
	app.get('/api/writeMovie/byPeople/:pid', function(req, res){
		return WriteMovie.find({People_Id: req.params.pid}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY MOVIE ID OF WriteMovie.
	app.get('/api/writeMovie/:mid', function(req, res){
		return WriteMovie.find({Movie_Id: req.params.mid}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY MOVIE ID OF WriteMovie.
	app.get('/api/writeMovie/:mid/:pid', function(req, res){
		return WriteMovie.findOne({Movie_Id: req.params.mid, People_Id: req.params.pid}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});
	
	//POST to CREATE WriteMovie
	app.post('/api/writeMovie', function (req, res) {
	  var doc;
	  console.log("POST: ");
	  console.log(req.body);
	  doc = new WriteMovie({
	  	People_Id: req.body.People_Id,
	  	Movie_Id: req.body.Movie_Id
	  });
	  doc.save(function (err) {
	    if (!err) {
	      return console.log("created an new writeMovie");
	    } else {
	      return console.log(err);
	    }
	  });
	  return res.send(doc);
	});

	//remove a single doc from WriteMovie
	app.delete('/api/writeMovie/:mid/:pid', function (req, res) {
	  return WriteMovie.findOne({Movie_Id: req.params.mid, People_Id: req.params.pid}, function (err, doc) {
	  	console.log(doc);
	    return doc.remove(function (err) {
	      if (!err) {
	        console.log("removed an writeMovie");
	        return res.send('');
	      } else {
	        console.log(err);
	      }
	    });
	  });
	});

	//Single act update
	app.put('/api/writeMovie/:mid/:pid', function (req, res) {
	  return WriteMovie.findOne({Movie_Id: req.params.mid, People_Id: req.params.pid}, function (err, doc) {
	  	doc.People_Id = req.body.People_Id;
	  	doc.Movie_Id = req.body.Movie_Id;
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
	//--------------------------------WriteMovie END-----------------------------
	
	//--------------------------------WriteTV START-----------------------------
	//GET METHOD OF WriteTV.
	app.get('/api/writeTV', function(req, res){
		return WriteTV.find(function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY PEOPLE ID OF WriteTV
	app.get('/api/writeTV/byPeople/:pid', function(req, res){
		return WriteTV.find({People_Id: req.params.pid}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY TVShow ID OF WriteTV.
	app.get('/api/writeTV/:sid', function(req, res){
		return WriteTV.find({Show_Id: req.params.sid}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY TVShow ID OF WriteTV.
	app.get('/api/writeTV/:sid/:pid', function(req, res){
		return WriteTV.findOne({Show_Id: req.params.sid, People_Id: req.params.pid}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});
	
	//POST to CREATE WriteTV
	app.post('/api/writeTV', function (req, res) {
	  var doc;
	  console.log("POST: ");
	  console.log(req.body);
	  doc = new WriteTV({
	  	People_Id: req.body.People_Id,
	  	Show_Id: req.body.Show_Id
	  });
	  doc.save(function (err) {
	    if (!err) {
	      return console.log("created an new writeTV");
	    } else {
	      return console.log(err);
	    }
	  });
	  return res.send(doc);
	});

	//remove a single doc from WriteTV
	app.delete('/api/writeTV/:sid/:pid', function (req, res) {
	  return WriteTV.findOne({Show_Id: req.params.sid, People_Id: req.params.pid}, function (err, doc) {
	  	console.log(doc);
	    return doc.remove(function (err) {
	      if (!err) {
	        console.log("removed an writeTV");
	        return res.send('');
	      } else {
	        console.log(err);
	      }
	    });
	  });
	});

	//Single act update
	app.put('/api/writeTV/:sid/:pid', function (req, res) {
	  return WriteTV.findOne({Show_Id: req.params.sid, People_Id: req.params.pid}, function (err, doc) {
	  	doc.People_Id = req.body.People_Id;
	  	doc.Show_Id = req.body.Show_Id;
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
	//--------------------------------WriteTV END-----------------------------


	//--------------------------------MovieGenre START-----------------------------
	//GET METHOD OF WriteTV.
	app.get('/api/moviegenres', function(req, res){
		return MovieGenre.find(function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY MOVIE ID OF Moviegenres.
	app.get('/api/moviegenres/:mid', function(req, res){
		return MovieGenre.find({Movie_Id: req.params.mid}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY MOVIE ID OF Moviegenres.
	app.get('/api/moviegenres/:mid/:gid', function(req, res){
		return MovieGenre.findOne({Movie_Id: req.params.mid, Genre: req.params.gid}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//POST to CREATE Moviegenres
	app.post('/api/moviegenres', function (req, res) {
	  var doc;
	  console.log("POST: ");
	  console.log(req.body);
	  doc = new MovieGenre({
	  	Movie_Id: req.body.Movie_Id,
	  	Genre: req.body.Genre
	  });
	  doc.save(function (err) {
	    if (!err) {
	      return console.log("created an new moviegenres");
	    } else {
	      return console.log(err);
	    }
	  });
	  return res.send(doc);
	});

	//remove a single doc from Moviegenres
	app.delete('/api/moviegenres/:mid/:gid', function (req, res) {
	  return MovieGenre.findOne({Movie_Id: req.params.mid, Genre: req.params.gid}, function (err, doc) {
	  	console.log(doc);
	    return doc.remove(function (err) {
	      if (!err) {
	        console.log("removed an moviegenres");
	        return res.send('');
	      } else {
	        console.log(err);
	      }
	    });
	  });
	});

	//Single act update
	app.put('/api/moviegenres/:mid/:gid', function (req, res) {
	  return MovieGenre.findOne({Movie_Id: req.params.mid, Genre: req.params.gid}, function (err, doc) {
	  	doc.Movie_Id = req.body.Movie_Id;
	  	doc.Genre = req.body.Genre;
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
	//--------------------------------Moviegenres END-----------------------------

	//--------------------------------TVGenre START-----------------------------
	//GET METHOD OF TVGenre.
	app.get('/api/TVgenres', function(req, res){
		return TVGenres.find(function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY MOVIE ID OF TVgenres.
	app.get('/api/TVgenres/:sid', function(req, res){
		return TVGenres.find({Show_Id: req.params.sid}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//GET METHOD BY MOVIE ID OF TVgenres.
	app.get('/api/TVgenres/:sid/:gid', function(req, res){
		return TVGenres.findOne({Show_Id: req.params.sid, Genre: req.params.gid}, function(err, doc){
			if(!err){
				return res.send(doc);
			}
			else{
				return res.send("Error!");
			}
		});
	});

	//POST to CREATE TVgenres
	app.post('/api/TVgenres', function (req, res) {
	  var doc;
	  console.log("POST: ");
	  console.log(req.body);
	  doc = new TVGenres({
	  	Show_Id: req.body.Show_Id,
	  	Genre: req.body.Genre
	  });
	  doc.save(function (err) {
	    if (!err) {
	      return console.log("created an new TVgenres");
	    } else {
	      return console.log(err);
	    }
	  });
	  return res.send(doc);
	});

	//remove a single doc from TVgenres
	app.delete('/api/TVgenres/:sid/:gid', function (req, res) {
	  return TVGenres.findOne({Show_Id: req.params.sid, Genre: req.params.gid}, function (err, doc) {
	  	console.log(doc);
	    return doc.remove(function (err) {
	      if (!err) {
	        console.log("removed an TVgenres");
	        return res.send('');
	      } else {
	        console.log(err);
	      }
	    });
	  });
	});

	//Single act update
	app.put('/api/TVgenres/:sid/:gid', function (req, res) {
	  return TVGenres.findOne({Show_Id: req.params.sid, Genre: req.params.gid}, function (err, doc) {
	  	doc.Show_Id = req.body.Show_Id;
	  	doc.Genre = req.body.Genre;
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
	//--------------------------------TVgenres END-----------------------------	

	app.get('*', function(req, res) {
		res.render('index');
	});


};