var app = angular.module('app', ['firebase', 'ngRoute', 'app.account', 'app.service', 'app.factory']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: './web/views/login.html',
        controller: 'LoginController',

    }).when('/profile', {
        templateUrl: './web/views/profile.html',
        controller: 'ProfileController',
        resolve: {
          function(permission){
             permission.check();
          },
        },
    })
}]);

app.run(function () {
    var config = {
        apiKey: "AIzaSyBQ8t_DXQc5MSlAsfe_3TUJTYRXhnVE40I",
        authDomain: "realtime-shop.firebaseapp.com",
        databaseURL: "https://realtime-shop.firebaseio.com",
        projectId: "realtime-shop",
        storageBucket: "realtime-shop.appspot.com",
        messagingSenderId: "493967644576"
    };
    firebase.initializeApp(config);
});

app.service('permission', function ($location, urlService) {
    return {
        check: function () {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user != null) {
                } else {
                    //$location.path('/');
                    window.location.href = urlService.server()+"/";
                }
            });
        }
    };
});




