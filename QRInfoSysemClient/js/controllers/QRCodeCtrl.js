/**
 * Created by Виктор on 3.10.2014 г..
 */

app.controller('QRCodeCtrl',['$scope','$location','$routeParams','auth','identity','notifier','teacherService','baseUrl', function($scope,$location,$routeParams,auth,identity,notifier,teacherService,baseUrl) {
    $scope.isLogged = identity.isLogged();
    if(!$scope.isLogged){
        $location.path('/unauthorized');
    }

    $scope.generate = function(id){
        var user = identity.getUser();
        var url = 'http://qrinfosystem.apphb.com/#' + '/teachers/' + $routeParams.id;
        var input = {identity:user.token,id:$routeParams.id};
        teacherService.generateQRCode(input)
            .then(function(data){
                url += '/' + data.Code;
                new QRCode(document.getElementById("qrcode"),url);
            },function(err){
                notifier.error(err.message);
            })
    }
}]);