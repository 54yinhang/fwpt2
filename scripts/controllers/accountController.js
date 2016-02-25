/**
 * Created by Administrator on 2016/02/18.
 */
angular.module('FWPT')
    .controller('AccountController',['$scope','$state','$stateParams','$rootScope','AccountService', function($scope, $state, $stateParams,$rootScope, AccountService) {
        //$rootScope.displayName=AccountService.getCurrentUser().displayName;
        $scope.sendLogin = function(user) {
            AccountService.sendLogin(user);

        };
    }])
    .controller('TodoTaskController',['$scope','$state','$stateParams','TodoTaskService', 'AccountService',function($scope,$state,$stateParams,TodoTaskService,AccountService) {
        if($state.includes('account.todoTask')) {
            $scope.taskInfos = TodoTaskService.getTodoTask($stateParams.category);
        }
        else {
            $scope.taskSum = TodoTaskService.getTodoTaskSum();
        }
        $scope.reLogin=function(){
            $scope.sendLogin = function(user) {
                AccountService.sendLogin(user);
            };
            $(".reLogin").css("display","block");
            $(".reloginClose").css("display","block");
            $(".reloginClose").click(function(){
                $(".reLogin").css("display","none");
                $(".reloginClose").css("display","none");
            })
        }

    }]);