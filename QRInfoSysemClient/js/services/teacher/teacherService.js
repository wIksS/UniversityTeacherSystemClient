/**
 * Created by Виктор on 2.10.2014 г..
 */
app.factory('teacherService',['$http','$q','baseUrl','httpRequester','objectToQueryString',function($http,q,baseUrl,httpRequester,objectToQueryString) {
    var url = baseUrl + '/api';

    return {
        getTeachers: function (identity) {
            return httpRequester.request({
                method: 'GET',
                url: url + '/teachers'
            });
        },
        register: function (teacher) {
            debugger;
            return httpRequester.request({
                method: 'POST',
                url: url + '/teachers',
                data: teacher,
                headers: {
                    'Authorization': 'Bearer ' + teacher.identity
                }
            });
        },
        deleteTeacher: function (teacher) {
            return httpRequester.request({
                method: 'DELETE',
                url: url + '/teachers/' + teacher.id,
                data: teacher,
                headers: {
                    'Authorization': 'Bearer ' + teacher.identity
                }
            });
        },
        getTeacherDetails:function(input){
            return httpRequester.request({
                method: 'GET',
                url: url + '/teachers/' + input.id//d + '?qrcode=' + input.qrcode
            });
        },
        updateShedule:function(shedule){
            return httpRequester.request({
                method: 'POST',
                url: url + '/shedule',
                data: shedule,
                headers: {
                    'Authorization': 'Bearer ' + shedule.identity
                }
            });
        },
        getTeacherShedule: function (input) {
            return httpRequester.request({
                method: 'GET',
                url: url + '/shedule?id=' + input.id + '&code=' + input.qrcode
            });
        },
        getTeacherSheduleAdmin:function(input){
            return httpRequester.request({
                method: 'GET',
                url: url + '/shedule?id=' + input.id+'&code=admin',
                headers: {
                    'Authorization': 'Bearer ' + input.identity
                }
            });
        },        generateQRCode:function(input){
            return httpRequester.request({
                method: 'POST',
                url: url + '/QRCode/' + input.id,
                headers: {
                    'Authorization': 'Bearer ' + input.identity
                }
            });
        }
    }
}]);