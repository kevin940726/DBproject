var index = angular.module('index', ['ngRoute']);

/*index.factory('themovie', function(){
	var saved = {};
	return {
	set: function(data){
		saved = data;
	},
	get: function(){
		return saved;
	}};
});*/

index.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			title: 'IMDb2 - Internet Movies Database 2',
			templateUrl : 'partials/view.html',
			controller  : 'mainCtrl'
		})
		.when('/movies', {
			title: 'Movies List - IMDb2',
			templateUrl : 'partials/movieList.html',
			controller  : 'MoviesListCtrl'
		})
		.when('/movies/:id', {
      title: ' - IMDb2',
			templateUrl : 'partials/movies.html',
			controller  : 'MoviesCtrl'
		})
    .when('/tvshow', {
      title: 'TV Show List- IMDb2',
      templateUrl : 'partials/tvshowList.html',
      controller  : 'TVShowCtrl'
    })
		.otherwise({
			redirectTo: '/'
		});
  $locationProvider.html5Mode(true);
}]);

index.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

index.controller('mainCtrl', function($scope, $http, $location) {
  $scope.isActive = function(locationPath) {
    if ($location.path().match(locationPath)) return true;
    else return false;
  }
});

index.filter('startFrom', function() {
    return function(input, start) {
    	if (!input || !input.length) return;
    	return input.slice(start);
  	};
});

index.controller('MoviesListCtrl', function ($scope, $http, $window) {
	$http.get('/api/movies').success(function(data) {
    	$scope.movies = data;
	});
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
      $window.location.href = '/movies';
    });
  }             
});


index.controller('MoviesCtrl', function ($rootScope, $scope, $http, $window, $location, $routeParams) {
	$http.get('/api/movies').success(function(data) {
    $scope.total = data.length;
  });
  $http.get('/api/movies/'+$routeParams.id).success(function(data) {
    if (data.length !== 0) $scope.movie = data;
    else $location.path("/movies");

    $rootScope.title = $scope.movie.Movie_Title + " - IMDb2";
    $scope.formset($scope.movie);
    $http.get('api/actMovie/'+$scope.movie.Movie_Id).success(function(data) {
      $scope.acts = data;
    });
    $http.get('api/people/').success(function(data) {
      $scope.people = data;
    });
	});	
  $scope.randomMovie = function(data) {
    var rand = Math.floor((Math.random()*data));
    while (rand === $routeParams.id*1){
      rand = Math.floor((Math.random()*data));
    }
    $location.path("/movies/"+rand);
    return rand;
  };
  $scope.removeMovie = function(data) {
    var id = data.Movie_Id;
    $http({
      method: 'DELETE',
      url: 'api/movies/'+id,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function() {
      $location.path("/movies");
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
    $scope.form2 = {
      PoepleId: data.People_Id,
      Character: data.Character
    }
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
      $window.location.href = '/movies/'+id;
    })
  }; 
  $scope.updateAct = function() {
    var mid = $routeParams.id;
    var pid = $scope.form2.PeopleId;
    $http.get('api/actMovie/'+mid+'/'+pid).success(function(data) {
      if (data.length !== 0) {
        $http({
          method: 'PUT',
          url: 'api/actMovie/'+mid+'/'+pid,
          data: $.param({
            Movie_Id: mid,
            People_Id: pid,
            Character: $scope.form2.Character
          }),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function() {
          $window.location.href = '/movies/'+mid;
        });
      }
      else {
        $http({
          method: 'POST',
          url: 'api/actMovie/',
          data: $.param({
            Movie_Id: mid,
            People_Id: pid,
            Character: $scope.form2.Character
          }),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function() {
          $window.location.href = '/movies/'+mid;
        });
      }
    });
  };
  $scope.deleteAct = function(data) {
    var mid = data.Movie_Id;
    var pid = data.People_Id;
    $http({
      method: 'DELETE',
      url: 'api/actMovie/'+mid+'/'+pid,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function() {
      $window.location.href = '/movies/'+mid;
    });
  }
});

index.controller('TVshowListCtrl', function ($scope, $http, $window) {
  $http.get('/api/tvshows').success(function(data) {
      $scope.tvshow = data;
  });
  $scope.currentPage = 0;
  $scope.pageSize = 25;
  $scope.numberOfPages = function(){
    if (!$scope.tvshow || !$scope.tvshow.length) return;
    return Math.floor($scope.tvshow.length/$scope.pageSize)+1;
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
      url: 'api/tvshows',
      data: $.param({
        TVshow_Id: $scope.form.TVshowId,
        TVshow_Title: $scope.form.TVshowTitle,
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
      $window.location.href = '/tvshows';
    });
  }             
});


