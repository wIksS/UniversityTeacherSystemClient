/**
 * Created by Виктор on 2.10.2014 г..
 */
app.controller('TeacherDetailsCtrl',['$scope','$location','$routeParams','auth','identity','notifier','teacherService', function($scope,$location,$routeParams,auth,identity,notifier,teacherService) {
    $scope.isLogged = identity.isLogged();

    $scope.$on('$routeChangeStart', function (next, current) {
        $scope.isLogged = identity.isLogged();
    });

    teacherService.getTeacherDetails({id:$routeParams.id,qrcode:$routeParams.qrcode})
        .then(function(data){
            console.log(data);
            $scope.teacher = data;
        },function(err){
            notifier.error(err.message);
        });

    var qrcode = $routeParams.qrcode || 'frompc';
    teacherService.getTeacherShedule({id:$routeParams.id,qrcode:qrcode})
        .then(function(data){
            $scope.shedule = data;
            $('#calendar').fullCalendar({
                dayClick: function(date, jsEvent, view) {
                    $('#calendar')
                        .fullCalendar('gotoDate',date);
                    $('#calendar')
                        .fullCalendar('changeView','agendaDay');
                },
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,basicWeek, agendaDay',
                    ignoreTimezone: false
                },
                events:$scope.shedule,
                timeFormat: 'H(:mm)'
            });
        },function(err){
            notifier.error(err.message);
        });
}]);