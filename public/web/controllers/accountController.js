var myApp = angular.module("app.account", []);

myApp.controller('LoginController', function($scope, $location, $rootScope, accountService, urlService, userService) {
    // Parameter Start
    // Parameter End

    // Function Start
    $scope.init = function() {
        $('#preloading').css("display", "none");
        accountService.getUserInfo().then(function(resolve){
            console.log(resolve);
            if(resolve != null){
                window.location.href = urlService.server()+"/profile";
            }
        }).catch(function(reject){
        })
    };

    $scope.login = function(provider){
        $('#preloading').css("display", "block");
        accountService.login(provider).then(function(){
            accountService.getUser().then(function(resolve){
                console.log(resolve);
                if(resolve != null){
                    userService.updateInfo().then(function(){
                        $('#preloading').css("display", "none");
                        window.location.href = urlService.server()+"/profile";
                    }).catch(function(reject){
                        $('#preloading').css("display", "none");
                        console.log(reject);
                        Materialize.toast('Cannot login err:03', 4000); 
                    })
                } else {
                    $('#preloading').css("display", "none");
                    console.log(reject);
                    Materialize.toast('Cannot login err:03', 4000); 
                }
            }).catch(function(reject){
                $('#preloading').css("display", "none");
                console.log(reject);
                Materialize.toast('Cannot login err:02', 4000); 
            })
        }).catch(function(reject){
            $('#preloading').css("display", "none");
            console.log(reject);
            Materialize.toast('Cannot login err:01', 4000); 
        })
    }
    // Function End

    // Directive Start
    // Directive End
    $scope.init();
});


myApp.controller('ProfileController', function($scope, $location, urlService, accountService, userService) {
    // Parameter Start
    $scope.name = "";
    $scope.email = "";
    $scope.photoURL = "";
    $scope.show = {
        main : false,
        preloading : true,
    }

    // Parameter End

    // Function Start
    $scope.init = function(){
        const messaging = firebase.messaging();
        messaging.requestPermission().then(function(){
            messaging.getToken().then(function(currentToken) {
                console.log(currentToken);
            })
            .catch(function(err) {
                console.log('An error occurred while retrieving token. ', err);
                showToken('Error retrieving Instance ID token. ', err);
                setTokenSentToServer(false);
            });
        })
        .catch(function(err){
        }); 
         accountService.getUserInfo().then(function(resolve){
            console.log(resolve);
            $scope.name = resolve.displayName;
            $scope.email = resolve.email;
            $scope.photoURL = resolve.photoURL;
            $scope.show.preloading = false;
            $scope.show.main = true;
        }).catch(function(reject){
        })

    };

    // Function End

    // Directive Start
    $scope.header = {
        delegates: {
        },
        configs: {
        },
    };
    // Directive End
    $scope.init();
});
