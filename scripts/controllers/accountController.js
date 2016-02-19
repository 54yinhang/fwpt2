/**
 * Created by Administrator on 2016/02/18.
 */
angular.module('FWPT')
    .controller('AccountController',['$scope','$state','$stateParams','AccountService', function($scope, $state, $stateParams, AccountService) {
        $scope.sendLogin = function(user) {
            AccountService.sendLogin(user);

        };
    }])
    .controller('TodoTaskController',['$scope','$state','$stateParams','TodoTaskService', 'AccountService',function($scope,$state,$stateParams,TodoTaskService,AccountService) {
        $scope.displayName=AccountService.getCurrentUser().displayName;
        if($state.includes('account.todoTask')) {
            $scope.taskInfos = TodoTaskService.getTodoTask($stateParams.category);

        } else {
            $scope.taskSum = TodoTaskService.getTodoTaskSum();
        }
        $scope.reLogin=function(){
            $scope.sendLogin = function(user) {
                AccountService.sendLogin(user);

            };
            $(".reLofin").css("display","block");
        }
    }]);