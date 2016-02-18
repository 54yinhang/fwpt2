/**
 * Created by Administrator on 2016/02/18.
 */
angular.module('FWPT')
    .factory('AccountService', function($http, $state, $stateParams) {
        var current_user;
        return {
            getCurrentUser: function() {
                return current_user;
            },
            sendLogin: function(user) {
                $http({
                    method:'POST',
                    url:'../assets/account.user.json',// /userName/user.userName/passowrd/user.password
                    params:{userName:user.userName, password:user.password}
                }).success(function(data,status,headers,config) {
                    // 当相应准备就绪时调用
                    current_user = data;
                    // 不合适的跳转，应该控制器中操作
                    $state.go('account',$stateParams);
                }).error(function(data,status,headers,config) {
                    // 当响应以错误状态返回时调用
                    console.log("login failed");
                });
            },
            sendLogout: function() {
                current_user = null;
            },
            isLogin: function() {
                return current_user && current_user.hasOwnProperty("id") && current_user.id;
            }
        };
    })
    .factory('TodoTaskService', function($http, $state, $stateParams) {
        return {
            //改为从后端取数
            getTodoTaskSum: function () {
                return {
                    wdxx: 9,
                    wtbb: 11,
                    wqq: 13,
                    ckqq: 32,
                    whddp: 12,
                    thddp: 33,
                    hdwcdp: 0
                }
            },
            getTodoTask: function(category) {
                if(category == "wdxx" || !category) {
                    return [{lx:1,fqr:2,mc:3,zt:4,fqsj:5,jssj:6,cz:7,id:'查看'},{lx:1,fqr:2,mc:3,zt:4,fqsj:5,jssj:6,cz:7,id:'查看'}];
                } else {
                    return [{lx:1,fqr:2,mc:3,zt:4,fqsj:5,jssj:6,cz:7,id:'查看'}];
                }
            }
        }
    });