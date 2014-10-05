/**
 * Created by Виктор on 2.10.2014 г..
 */
app.controller('SheduleCtrl', ['$scope', '$location', '$routeParams', 'auth', 'identity', 'notifier', 'teacherService', 'currentTeacher', function ($scope, $location, $routeParams, auth, identity, notifier, teacherService, currentTeacher) {
    $scope.isLogged = identity.isLogged();
    if (!$scope.isLogged) {
        //$location.path('/unauthorized');
    }
    var from;
    var to;

    $('#from-hour-picker').timepicker();
    $('#from-hour-picker').change(function () {
        from = this.value;
    });

    $('#to-hour-picker').timepicker();
    $('#to-hour-picker').change(function () {
        to = this.value;
    });

    $scope.updateShedule = function (shedule) {
        if (!$scope.year) {
            notifier.error('You must select day');
        }
        var user = identity.getUser();
        if (!user.token) {
            notifier.error('You must be logged in to register teachers');
        }
        shedule.identity = user.token;
        shedule.StartDate = $scope.year + ' ' + from;
        shedule.EndDate = $scope.year + ' ' + to;
        var teacher = currentTeacher.getTeacher();
        if (!teacher || teacher == {}) {
            shedule.TeacherId = $routeParams.id;
        }
        else {
            shedule.TeacherId = teacher.Id;
        }
        teacherService.updateShedule(shedule)
            .then(function (data) {
                notifier.success('Successfuly updated shedule');
            }, function (err) {
                notifier.error(err.message);
            });
    }

    $('#mydate').glDatePicker({
        onClick: function (target, cell, date, data) {
            $scope.year = date.getFullYear() + '-' +
                ((date.getMonth() | 0) + 1) + '-' +
                date.getDate();
        }
    });
}]);