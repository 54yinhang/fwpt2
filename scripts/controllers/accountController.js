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
        $scope.safeout=function(){//安全退出
            window.sessionStorage.setItem("islogin", "false");
            console.log(1);
            $state.go('home',$stateParams);
        };
        $scope.reLogin=function(){ //重新登录
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
        $scope.tasklist=TodoTaskService.getTodoList();//我的未读消息详情
        $scope.todotaskdd=TodoTaskService.getTodoListdd();//电子凭证详情
    }]);