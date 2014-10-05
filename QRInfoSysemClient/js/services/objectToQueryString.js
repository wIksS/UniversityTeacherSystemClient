/**
 * Created by Виктор on 29.9.2014 г..
 */
/**
 * Created by Виктор on 29.9.2014 г..
 */
app.factory('objectToQueryString',[function(){
    return{
        parse:function (obj) {
            var p = [];
            for (var key in obj) {
                if(key != 'identity') {
                    p.push(key + '=' + obj[key]);
                }
            }
            return p.join('&');
        }
    }
}]);