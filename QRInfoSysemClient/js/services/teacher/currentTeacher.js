/**
 * Created by Виктор on 4.10.2014 г..
 */
app.factory('currentTeacher',function() {
    var teacher ={};
    return{
        getTeacher:function(){
            return teacher;
        },
        setTeacher:function(newTeacher){
            teacher = newTeacher;
            return teacher;
        }
    }
});
