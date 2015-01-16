var crud = angular.module('crud');

crud.controller('crudCtrl', function($scope, $http){
  $http.get('/api').success(function(data){
    $scope.res = data;
  });
});

