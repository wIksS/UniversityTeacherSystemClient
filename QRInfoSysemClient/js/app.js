'use strict';

var app = angular.module('QRInfoApp',['ngRoute'])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.
            when('/', {
                templateUrl: '../views/partials/home.html',
                controller:'LoginCtrl'
            }).
            when('/teachers/:id', {
                templateUrl: '../views/partials/teacher-details.html',
                controller: 'TeacherDetailsCtrl'
            }).
            when('/teachers/:id/:qrcode', {
                templateUrl: '../views/partials/teacher-details.html',
                controller:'TeacherDetailsCtrl'
            }).
            when('/register', {
                templateUrl: '../views/partials/register.html',
                controller:'RegisterCtrl'
            }).
            when('/admin', {
                templateUrl: '../views/partials/admin-panel.html',
                controller:'LoginCtrl'
            })
    }])
    .value('toastr',toastr)
    .constant('baseUrl', 'http://univeritysystemserver.apphb.com');//'http://localhost:6364');//'http://qrinfosystemserver.apphb.com/');
