/**
 * Created by Виктор on 29.9.2014 г..
 */
app.controller('HomeCtrl',['$scope','$location','auth','identity','notifier', function($scope,$location,auth,identity,notifier) {
    $scope.isLogged = identity.isLogged();
    $scope.$on('$routeChangeStart', function (next, current) {
        $scope.isLogged = identity.isLogged();
    });

}]);