# DBproject - IMDb2
###### NTU DB project: MEAN

IMDb2, Internet Movies Database 2, is the website which stores the movies, TV shows, and people data. The source of the data is come from [IMDb](http://www.imdb.com/), which is the well-known online movies database. We use their open data to build this website for practicing and studying. The rights of all the data is belong to the original owner.


We use M.E.A.N. to build the one-page application. M.E.A.N. stands for ``MongoDB``, ``Express.JS``, ``Angular.JS``, and ``Node.JS``. [MongoDB](http://www.mongodb.org/) is a NO-SQL database, We store the data in the database named ``mydb`` on the site [MongoLab](https://mongolab.com/home), which is an online MongoDB database. You can connect to our database in shell with following command:
```
mongo ds031691.mongolab.com:31691/mydb -u usr -p usr
```
The user account is read-only, you can use MongoDB commands to access the database.

We have 15 tables(_called 'collection' in MongoDB_), The following is the table name for detail.
* ACT_MOVIE
* ACT_TV
* AWARD
* AWARD_MOVIE
* AWARD_PEOPLE
* AWARD_TV
* DIRECT_TV
* MOVIE_GENRES
* MOVIES
* PEOPLE
* TV
* TV_DETAIL
* TV_GENRES
* WRITE_MOVIES
* WRITE_TV

Our task is to generate 15 tables in SQL, thus we perform the normalize version of our database. In practice, we won't normalize the tables since MongoDB is not a relational database, we would de-normalize them instead.
