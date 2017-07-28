var myApp = angular.module("app.service", []);

myApp.service('accountService', accountService);
myApp.service('urlService', urlService);
myApp.service('userService', userService);
function accountService($q) {
     return {
        login: function(provider) {
            var defer = $q.defer();
            if (provider == 'facebook') {
                provider = new firebase.auth.FacebookAuthProvider();
            } else if (provider == 'google') {
                provider = new firebase.auth.GoogleAuthProvider();
            }else {
                provider = new firebase.auth.FacebookAuthProvider();
            }
            firebase.auth().signInWithPopup(provider).then((result) => {
                defer.resolve(result);
            })
            .catch((error) => {
                defer.reject(error);
            })
            return defer.promise;
        },
        getUserInfo: function() {
            var defer = $q.defer();
            this.getUser().then((user) => {
                var info = (user == null ? null : user.providerData[0]);
                defer.resolve(info);
            }).catch((error) => {
                defer.reject(error);
            })
            return defer.promise;
        },
        getUser: function() {
            var defer = $q.defer();
            this.onAuthStageChange().then((user) => {
                defer.resolve(user);
            })
            .catch((error) => {
                defer.reject(error);
            })
            return defer.promise;
        },
        onAuthStageChange: function() {
            return new Promise((resolve, reject) => {
                var listenEvent = firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        resolve(user);
                        listenEvent();
                    } else {
                        resolve(null);
                        listenEvent();
                    }
                })
            })
        },
    };
}

function urlService($location) {
    return {
        server: function() {
            return $location.protocol() + '://'+ $location.host() + ':' + $location.port() + '/#!';
        },
    };
}

function userService($q, accountService) {
    return {
        updateInfo: function() {
            var defer = $q.defer();
            accountService.getUserInfo().then((userInfo) => {
                var updates = {};
                updates[userInfo.uid + '/displayName'] = userInfo.displayName;
                updates[userInfo.uid + '/photoURL'] = userInfo.photoURL;
                updates[userInfo.uid + '/email'] = userInfo.email;
                firebase.database().ref('users/').update(updates).then((result) => {
                    defer.resolve(result);
                }).catch((error) => {
                    defer.reject(error);
                });
            }).catch((error) => {
                defer.reject(error);
            });
            return defer.promise;
        },
    };
}