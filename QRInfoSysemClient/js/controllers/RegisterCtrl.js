app.controller('RegisterCtrl',['$scope','$location','auth','identity','notifier',function($scope,$location,auth,identity,notifier){
    $scope.register = function(user){
        auth.register(user)
            .then(function(data){
                notifier.success('Successful registration !');
                $location.path('/');
                auth.login({
                    username:user.email,
                    password:user.password
                });
            },function(err){
                notifier.error(err.message);
                notifier.error('Password must be 6 digits or more!');
            });
    }
}])