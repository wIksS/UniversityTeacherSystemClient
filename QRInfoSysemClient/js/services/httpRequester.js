/**
 * Created by Виктор on 28.9.2014 г..
 */

app.factory('httpRequester',['$http','$q', function($http,q){
    return{
        request: function httpRequest(request) {
            var deffered = q.defer();
            $http(request)
                .success(function (data) {
                    deffered.resolve(data);
                })
                .error(function (err) {
                    deffered.reject(err);
                });

            return deffered.promise;
        }
    }
}])