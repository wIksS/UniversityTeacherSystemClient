/**
 * Created by Виктор on 2.10.2014 г..
 */
app.controller('RegisterTeacherCtrl',['$scope','$location','auth','identity','notifier','teacherService','baseUrl','currentTeacher', function($scope,$location,auth,identity,notifier,teacherService,baseUrl,currentTeacher) {
    $scope.isLogged = identity.isLogged();
    if(!$scope.isLogged){
        //$location.path('/unauthorized');
    }

    $scope.$on('$routeChangeStart', function (next, current) {
        $scope.isLogged = identity.isLogged();
    });


    $scope.register = function(teacher){
        var user = identity.getUser();
        if(!user.token){
            notifier.error('You must be logged in to register teachers');
            return;
        }
        teacher.identity = user.token;
        if (((teacher.Phone | 0) < 0 ) && teacher.Phone) {
            notifier.error('Phone cannot be negative');
            return;
        }
        teacherService.register(teacher)
            .then(function(data){
                notifier.success("Successfuly registered teacher");
                $scope.isRegistered = true;
                currentTeacher.setTeacher(data);
            },function(err){
                notifier.error(err.message);
            });
    }
    $scope.generate = function(){
        var teacher = currentTeacher.getTeacher();
        var user = identity.getUser();
        var url = 'http://qrinfosystem.apphb.com/#' + '/teachers/' + teacher.Id;
        var input = {identity:user.token,id:teacher.Id};
        teacherService.generateQRCode(input)
            .then(function(data){
                url += '/' + data.Code;
                new QRCode(document.getElementById("qrcode"),url);
            },function(err){
                notifier.error(err.message);
            })
    }
    $scope.isRegistered = false;
}]);