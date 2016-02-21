/**
 * Created by Administrator on 2016/02/16.
 */
'use strict';
angular.module("FWPT")
    .directive('loginForm', function() {
        return {
            scope: {
                onLogin: '&'
            },
            templateUrl: 'account/loginForm.html',
            link: function(scope, ele, attrs) {
                scope.submitLogin = function() {
                    scope.onLogin({user: scope.loginUser});
                }
            }
        }
    });