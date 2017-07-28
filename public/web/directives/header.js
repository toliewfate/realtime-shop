app.directive('header', function () {
    return {
        restrict: 'E',
        templateUrl: "./web/views/layout/header.html",
        scope: {
          delegates: '=?',
          invokes: '=?',
          configs: '=?',
        },
        controller: ['$scope', '$filter', 'urlService', 'accountService', function ($scope, $filter, urlService, accountService) {

            // Start Parameter
            $scope.link = {
                profile: "",
                map: "",
                find: "",
                select: "",
            }
            // End Parameter

            // Start Function
            $scope.init = function(){
                $scope.link.select = urlService.server()+"/select";
                $scope.link.list = urlService.server()+"/list";
                $scope.link.profile = urlService.server()+"/profile";
                $scope.link.about = urlService.server()+"/about";
                $scope.link.map = urlService.server()+"/map";
            }

            $scope.logout = function(){
                accountService.logout().then(function(){
                    window.location.href = urlService.server()+"/";
                })
            }

            // End Function

            // Start Directive
            $scope.invokes= {
            }
            // End Directive
            $scope.init();
        }]
    }
});
