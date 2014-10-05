/**
 * Created by Виктор on 27.9.2014 г..
 */

app.factory('identity',function() {
    return{
        loginUser:function(user){
            sessionStorage.setItem('token',user.access_token);
            sessionStorage.setItem('username',user.userName)
        },
        getUser:function(){
            var user = {
                username:sessionStorage.getItem('username'),
                token:sessionStorage.getItem('token')
            };

            return user;
        },
        logoutUser:function(){
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('username');
        },
        isLogged:function(){
            return !!sessionStorage.getItem('username');
        }
    }
});