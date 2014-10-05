/**
 * Created by Виктор on 4.10.2014 г..
 */
/**
 * Created by Виктор on 2.10.2014 г..
 */
app.controller('TeacherCtrl',['$scope','$location','auth','identity','notifier','teacherService','currentTeacher', function($scope,$location,auth,identity,notifier,teacherService,currentTeacher) {
    $scope.isLogged = identity.isLogged();

    $scope.$on('$routeChangeStart', function (next, current) {
        $scope.isLogged = identity.isLogged();
    });

    teacherService.getTeachers()
        .then(function(data){
            $scope.teachers = data;
        },function(err){
            notifier.error(err.message);
        });

    $scope.showTeacher = function(id){
        $location.path('/teachers/' + id);
    }
    $scope.isLogged = identity.isLogged();

    $scope.delete = function (id) {
        var user = identity.getUser();
        teacherService.deleteTeacher({ id: id, identity: user.token })
            .then(function (data) {
                notifier.success("Successfuly deleted teacher");
            }, function (err) {
                notifier.error(err.message);
            });
    }

    $scope.getShedule = function(teacher) {
        var user = identity.getUser();
        teacherService.getTeacherSheduleAdmin({id: teacher.Id, identity:user.token})
            .then(function (data) {
                currentTeacher.setTeacher(teacher);
                $scope.shedule = data;
                $('#calendar').fullCalendar({
                    dayClick: function (date, jsEvent, view) {
                        $('#calendar')
                            .fullCalendar('gotoDate', date);
                        $('#calendar')
                            .fullCalendar('changeView', 'agendaDay');
                    },
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,basicWeek, agendaDay',
                        ignoreTimezone: false
                    },
                    events: $scope.shedule,
                    timeFormat: 'H(:mm)'
                });
            }, function (err) {
                notifier.error(err.message);
            });
    };
}]);