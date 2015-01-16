var index = angular.module('index', ['ngRoute']);

index.factory('themovie', function(){
	var saved = {};
	return {
	set: function(data){
		saved = data;
	},
	get: function(){
		return saved;
	}};
});

index.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			title: 'IMDb2 - Internet Movies Database 2',
			templateUrl : 'partials/view.html',
			controller  : 'mainCtrl'
		})
		.when('/movieList', {
			title: 'Movies List - IMDb2',
			templateUrl : 'partials/movieList.html',
			controller  : 'MoviesListCtrl'
		})
		.when('/movies', {
      title: ' - IMDb2',
			templateUrl : 'partials/movies.html',
			controller  : 'MoviesCtrl'
		})
		.otherwise({
			title: 'IMDb2 - Internet Movies Database 2',
			templateUrl : 'partials/view.html',
			controller  : 'mainCtrl'
		});
  $locationProvider.html5Mode(true);
}]);

index.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

index.controller('mainCtrl', function($scope, $http) {
  $http.get('/api/movies/1').success(function(data){
    $scope.res = data;
  });
});

index.filter('startFrom', function() {
    return function(input, start) {
    	if (!input || !input.length) return;
    	return input.slice(start);
  	};
});

index.controller('MoviesListCtrl', function ($scope, $http, $window, themovie) {
	$http.get('/api/movies').success(function(data) {
    	$scope.movies = data;
	});
	$scope.submitmovie = function(data){
		themovie.set(data);
	};
	$scope.currentPage = 0;
	$scope.pageSize = 25;
	$scope.numberOfPages = function(){
		if (!$scope.movies || !$scope.movies.length) return;
		return Math.floor($scope.movies.length/$scope.pageSize)+1;
	};
	$scope.getNumber = function(num) {
	    return new Array(num);   
	};
	$scope.pageClass = function(page){
		return page == $scope.currentPage ? 'active' : '';
	};
	$scope.changePage = function(page){
		$scope.currentPage = page;
	};
  $scope.submitForm = function() {
    $http({
      method: 'POST',
      url: 'api/movies',
      data: $.param({
        Movie_Id: $scope.form.MovieId,
        Movie_Title: $scope.form.MovieTitle,
        Release_Date: $scope.form.ReleaseDate,
        Duration: $scope.form.Duration,
        Rating: $scope.form.Rating,
        Director: $scope.form.Director,
        Img_Src: $scope.form.ImgSrc,
        Description: $scope.form.Description,
        Country: $scope.form.Country,
        Language: $scope.form.Language,
        Company: $scope.form.Company
      }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function() {
      $window.location.href = '/movieList';
    });
  }             
});


index.controller('MoviesCtrl', function ($rootScope, $scope, $http, $window, $location, themovie) {
	$http.get('/api/movies').success(function(data) {
		$scope.movies = data;
  	$scope.moviesNum = $scope.movies.length;

  	if (themovie.get().Movie_Id != undefined) $scope.movie = themovie.get();
  	else{
  		var rand = Math.floor((Math.random()*$scope.moviesNum));
  		$scope.movie = $scope.movies[rand];
  	}
    $rootScope.title = $scope.movie.Movie_Title + " - IMDb2";
    $scope.formset($scope.movie);
    $http.get('api/actMovie/'+$scope.movie.Movie_Id).success(function(data) {
      $scope.acts = data;
    });
    $http.get('api/people/').success(function(data) {
      $scope.people = data;
    });
	});	

	$scope.changemovie = function(data, operator){
		var id = data.Movie_Id*1;
		if (operator == 0) id = Math.floor(Math.random()*$scope.moviesNum);
		else if (id == 0 && operator == -1) id = $scope.movies.length;
		else if (id == $scope.movies.length-1 && operator == 1) id = -1;
		$rootScope.title = $scope.movies[id + operator].Movie_Title + " - IMDb2";
    $scope.formset($scope.movies[id + operator]);
    $http.get('api/actMovie/'+$scope.movies[id + operator].Movie_Id).success(function(data) {
      $scope.acts = data;
    });
    return $scope.movies[id + operator]; 	
  };
  $scope.removeMovie = function(data) {
    var id = data.Movie_Id;
    $http({
      method: 'DELETE',
      url: 'api/movies/'+id,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function() {
      $location.path("/movieList");
    });
  };
  $scope.formset = function(data) {
    $scope.form = {
      MovieId: data.Movie_Id,
      MovieTitle: data.Movie_Title,
      ReleaseDate: data.Release_Date,
      Duration: data.Duration,
      Rating: data.Rating,
      Director: data.Director,
      ImgSrc: data.Img_Src,
      Description: data.Description,
      Country: data.Country,
      Language: data.Language,
      Company: data.Company
    };
  };
  $scope.updateMovie = function(data) {
    var id = data.Movie_Id;
    $http({
      method: 'PUT',
      url: 'api/movies/'+id,
      data: $.param({
        Movie_Id: $scope.form.MovieId,
        Movie_Title: $scope.form.MovieTitle,
        Release_Date: $scope.form.ReleaseDate,
        Duration: $scope.form.Duration,
        Rating: $scope.form.Rating,
        Director: $scope.form.Director,
        Img_Src: $scope.form.ImgSrc,
        Description: $scope.form.Description,
        Country: $scope.form.Country,
        Language: $scope.form.Language,
        Company: $scope.form.Company
      }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function() {
      $window.location.href = '/movies';
    })
  }; 
});


