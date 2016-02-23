/**
 * Created by Administrator on 2016/02/18.
 */

angular.module('FWPT')
    .factory('AccountService', function($http, $state, $stateParams,$location) {
        $http.get('http://192.168.1.88:8082/ifugle-rap/fwpt/msgService/code.do' ).success(function(data){
            //console.log(data);
            window.sessionStorage.setItem("key", "value");

        }).error(function(data,status,headers,config) {
            // 当响应以错误状态返回时调用
            console.log("获取验证码错误");
        });

        var current_user;
        return {

            sendLogin: function(user) {
                $.ajax({
                    url: 'http://192.168.1.88:8082/ifugle-rap/fwpt/msgService/fwptLogin.do',
                    type: 'GET',
                    // dataType: 'json',
                    data: {'j_username':user.userName, 'j_password':user.passowrd,'j_verificationcode':user.code},
                    success:function(data){
                        console.log(1);
                    }})
            //}).success(function(data,status,headers,config) {
            //        // 当相应准备就绪时调用
            //        current_user = data;
            //        console.log(data);
            //        //console.log(current_user.displayName);
            //        // 不合适的跳转，应该控制器中操作
            //
            //
            //        $state.go('account',$stateParams);
            //        $(".reLogin").css("display","none");
            //        $(".reloginClose").css("display","none");
            //
            //    }).error(function(data,status,headers,config) {
            //        // 当响应以错误状态返回时调用
            //        console.log("login failed");
            //    });
            },
            sendLogout: function() {
                current_user = null;
            },
            isLogin: function() {
                return current_user && current_user.hasOwnProperty("id") && current_user.id;
            },
            getCurrentUser: function() {
                return current_user;
            }
        };
    })
    .factory('TodoTaskService', function($http, $state, $stateParams) {
        $http({
            method:'GET',
            url:'http://localhost:8080/ifugle-rap/szcz/dagl/daCount.do'

        }).success(function(data){
            console.log(data);
            //jsondata=data;

        }).error(function(data,status,headers,config) {
            // 当响应以错误状态返回时调用
            console.log("login failed");
        });
        var jsondata={};
        var userjson={};
        $http({
            method:'GET',
            url:'../assets/testjson.json'

        }).success(function(data){
            jsondata=data;

        }).error(function(data,status,headers,config) {
            // 当响应以错误状态返回时调用
            console.log("login failed");
        });
        $http({
            method:'GET',
            url:'../assets/account.user.json'

        }).success(function(data){
            userjson=data;

        }).error(function(data,status,headers,config) {
            // 当响应以错误状态返回时调用
            console.log("login failed");
        });
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
                switch(category){
                    case "wdxx"://我的未读消息
                        $(".flrrightinfo>h5>span").html("我的未读消息");
                        return jsondata.wdxx;
                    //break;
                    case "wtbb"://我未完成的报表填报任务
                        $(".flrrightinfo>h5>span").html("我未完成的报表填报任务");
                        return jsondata.wtbb;
                    //break;
                    case "wqq":// 我的请求（未处理）
                        $(".flrrightinfo>h5>span").html(" 我的请求（未处理）");
                        return jsondata.wqq;
                    //break;
                    case "ckqq"://我的请求（已处理未查看）
                        $(".flrrightinfo>h5>span").html("我的请求（已处理未查看）");
                        return jsondata.ckqq;
                    //break;
                    case "whddp":// 我的电子凭证（财政未核对）
                        $(".flrrightinfo>h5>span").html("我的电子凭证（财政未核对）");
                        return jsondata.whddp;
                    //break;
                    case "thddp"://我的电子凭证（被退回）
                        $(".flrrightinfo>h5>span").html("我的电子凭证（被退回）");
                        return jsondata.thddp;
                    //break;
                    case "hdwcdp"://我未完成的报表填报任务
                        $(".flrrightinfo>h5>span").html("我未完成的报表填报任务");
                        return jsondata.hdwcdp;
                    //break;
                }


                //if(category == "wdxx" || !category) {
                //    return [{lx:1,fqr:2,mc:3,zt:4,fqsj:5,jssj:6,cz:7,id:'查看'},{lx:1,fqr:2,mc:3,zt:4,fqsj:5,jssj:6,cz:7,id:'查看'}];
                //} else {
                //    return [{lx:1,fqr:2,mc:3,zt:4,fqsj:5,jssj:6,cz:7,id:'查看'}];
                //}
            }
        }
    });