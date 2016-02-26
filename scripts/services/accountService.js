/**
 * Created by Administrator on 2016/02/18.
 */

angular.module('FWPT')
    .factory('AccountService', function($http, $state, $stateParams,$location,$rootScope) {
        window.sessionStorage.setItem("islogin", "false");
        $http.get('http://localhost:8080/rap/fwpt/msgService/code.do' ).success(function(data){
            //请求验证码
            //可以删除
            //window.sessionStorage.setItem("key", "value");

        }).error(function(data,status,headers,config) {
            // 当响应以错误状态返回时调用
            console.log("获取验证码错误");
        });

        var current_user;
        return {

            sendLogin: function(user) {
                $.ajax({
                    url: 'http://localhost:8080/rap/fwpt/msgService/fwptLogin.do',
                    type: 'POST',
                    // dataType: 'json',
                    data: {'j_username':user.userName, 'j_password':user.passowrd,'j_verificationcode':user.code},
                    success:function(data){
                        window.sessionStorage.setItem("islogin", "true");
                        $state.go('account',$stateParams);
                        $(".reLogin").css("display","none");
                        $(".reloginClose").css("display","none");
                    }});//要该  这里是jquery的请求
                $state.go('account',$stateParams);
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

        var TodoTaskSumjson={};//登录成功后保存返回各消息的数目
        //var TodoTaskSumarray=[];
        var TodoTaskSumrjson={};//作为返回值返回到控制器


        var TodoTasklistjson={};
        return {
            //改为从后端取数
            getTodoTaskSum: function () {
                $http({
                    method:'GET',
                    url:'http://localhost:8080/rap/szcz/dagl/daCount.do'

                }).success(function(data){
                    TodoTaskSumjson=data ;
                    for(i=0;i<TodoTaskSumjson.result.length;i++){
                            switch (TodoTaskSumjson.result[i].FL){
                                case 1:
                                    TodoTaskSumrjson.wdxx=TodoTaskSumjson.result[i].COUNT;
                                    //我的未读消息
                                    break;
                                //2,我未完成的报表填报任务 3,我的请求（未处理）,4,我的请求（未处理），暂时不用
                                case 5 :
                                    TodoTaskSumrjson.whddp=TodoTaskSumjson.result[i].COUNT;
                                    //我的电子凭证（财政未核对）
                                    break;
                                case 6 :
                                    TodoTaskSumrjson.thddp=TodoTaskSumjson.result[i].COUNT;
                                    // 我的电子凭证（被退回）
                                    break;
                                case 7 :
                                    TodoTaskSumrjson.hdwcdp=TodoTaskSumjson.result[i].COUNT;
                                    //我的电子凭证（已核对未查看）
                                    break;
                            }
                    }
                }).error(function(data,status,headers,config) {
                    // 当响应以错误状态返回时调用
                    console.log("获取用户数据失败！");
                });
                return TodoTaskSumrjson;
            },
            getTodoTask: function(category) {
                switch(category){
                    case "wdxx"://我的未读消息
                        var TodoTasklistrjson=[];
                        $http({
                                    method:'GET',
                                    url:'http://localhost:8080/rap/szcz/xxgl/xxts/queryXxtsInterface.do',
                                }).success(function(data){
                                    TodoTasklistjson=data;
                                    for(i=0;i<TodoTasklistjson.result.length;i++) {
                                        var k = {};
                                        k.lx = "消息推送";//类型
                                        k.fqr = TodoTasklistjson.result[i].creator;//发起人
                                        k.mc = TodoTasklistjson.result[i].bt;//名称
                                        k.zt = TodoTasklistjson.result[i].dqzt = 0 ? "未查看" : "已查看";//消息状态
                                        k.fqsj = TodoTasklistjson.result[i].creationDate;//发起时间
                                        k.jssj = TodoTasklistjson.result[i].nowTimestamp;//结束时间
                                        k.id = TodoTasklistjson.result[i].id;//消息类型
                                        TodoTasklistrjson.push(k);
                                    }
                                }).error(function(data,status,headers,config) {
                                    // 当响应以错误状态返回时调用
                                    console.log("login failed");
                                });
                        $(".flrrightinfo>h5>span").html("我的未读消息");
                        return TodoTasklistrjson;
                    //break;
                    //case "wtbb"://我未完成的报表填报任务
                    //    $(".flrrightinfo>h5>span").html("我未完成的报表填报任务");
                    //    return jsondata.wtbb;
                    ////break;
                    //case "wqq":// 我的请求（未处理）
                    //    $(".flrrightinfo>h5>span").html(" 我的请求（未处理）");
                    //    return jsondata.wqq;
                    ////break;
                    //case "ckqq"://我的请求（已处理未查看）
                    //    $http({
                    //        method:'GET',
                    //        url:'http://192.168.0.111:8080/rap/szcz/dagl/queryDa.do?condition&spzt=2',
                    //        params:{
                    //            'condition':'',
                    //            'spzt':2
                    //
                    //        }
                    //    }).success(function(data){
                    //        console.log(data);
                    //
                    //    }).error(function(data,status,headers,config) {
                    //        // 当响应以错误状态返回时调用
                    //        console.log("login failed");
                    //    });
                    //    $(".flrrightinfo>h5>span").html("我的请求（已处理未查看）");
                    //    return {};
                    ////break;
                    case "whddp":// 我的电子凭证（财政未核对）
                        $("table tr td:eq(5)").html("");
                        var TodoTasklistrjson=[];
                        $http({
                            method:'GET',
                            url:'http://localhost:8080/rap/szcz/dagl/queryDa.do?condition&spzt=0',
                        }).success(function(data){
                            TodoTasklistjson=data;
                            for(i=0;i<TodoTasklistjson.result.length;i++){
                                var k={};
                                k.lx="电子凭证";
                                k.fqr= TodoTasklistjson.result[i].creator;
                                k.mc=TodoTasklistjson.result[i].mc;
                                k.zt="财政未核对";
                                k.fqsj=TodoTasklistjson.result[i].creationDate;
                                k.id=TodoTasklistjson.result[i].id;
                                TodoTasklistrjson.push(k);
                            }
                            //TodoTasklistjson.result[i].creator//发起人
                            //TodoTasklistjson.result[i].mc//名称
                            //TodoTasklistjson.result[i].creationDate//发起时间
                            //nowTimestamp//到期时间
                            //id//操作

                        }).error(function(data,status,headers,config) {
                            // 当响应以错误状态返回时调用
                            console.log("login failed");
                        });

                        $(".flrrightinfo>h5>span").html("我的电子凭证（财政未核对）");
                        return TodoTasklistrjson;
                    //break;
                    case "thddp"://我的电子凭证（被退回）
                        var TodoTasklistrjson=[];
                        $http({
                            method:'GET',
                            url:'http://localhost:8080/rap/szcz/dagl/queryDa.do?condition&spzt=9',
                        }).success(function(data){
                            TodoTasklistjson=data;
                            for(i=0;i<TodoTasklistjson.result.length;i++){
                                var k={};
                                k.lx="电子凭证";
                                k.fqr= TodoTasklistjson.result[i].creator;
                                k.mc=TodoTasklistjson.result[i].mc;
                                k.zt="被退回";
                                k.fqsj=TodoTasklistjson.result[i].creationDate;
                                k.jssj=TodoTasklistjson.result[i].nowTimestamp;
                                k.id=TodoTasklistjson.result[i].id;
                                TodoTasklistrjson.push(k);
                            }
                        }).error(function(data,status,headers,config) {
                            // 当响应以错误状态返回时调用
                            console.log("login failed");
                        });

                        $(".flrrightinfo>h5>span").html("我的电子凭证（被退回）");
                        return TodoTasklistrjson;
                        //break;
                    //break;
                    case "hdwcdp"://我的电子凭证（已核对未查看）
                        var TodoTasklistrjson=[];
                        $http({
                            method:'GET',
                            url:'http://localhost:8080/rap/szcz/dagl/queryDa.do?condition&spzt=2',
                        }).success(function(data){
                            TodoTasklistjson=data;
                            for(i=0;i<TodoTasklistjson.result.length;i++){
                                var k={};
                                k.lx="电子凭证";
                                k.fqr= TodoTasklistjson.result[i].creator;
                                k.mc=TodoTasklistjson.result[i].mc;
                                k.zt="已核对未查看";
                                k.fqsj=TodoTasklistjson.result[i].creationDate;
                                k.jssj=TodoTasklistjson.result[i].nowTimestamp;
                                k.id=TodoTasklistjson.result[i].id;
                                TodoTasklistrjson.push(k);
                            }
                            //TodoTasklistjson.result[i].creator//发起人
                            //TodoTasklistjson.result[i].mc//名称
                            //TodoTasklistjson.result[i].creationDate//发起时间
                            //nowTimestamp//到期时间
                            //id//操作

                        }).error(function(data,status,headers,config) {
                            // 当响应以错误状态返回时调用
                            console.log("login failed");
                        });

                        $(".flrrightinfo>h5>span").html("我的电子凭证（已核对未查看）");
                        return TodoTasklistrjson;
                    //break;
                }
            },
            getTodoList:function() {
                var TodoTaskListjson={};
                $http({
                    method:'GET',
                    url:'http://localhost:8080/rap/szcz/xxgl/xxts/queryXxtsDetail.do?id='+$stateParams.id
                }).success(function(data){
                    TodoTaskListjson.caption=data.result.bt;
                    $(".minmessagebox>p").append(data.result.nr);
                }).error(function(data,status,headers,config) {
                    // 当响应以错误状态返回时调用
                    console.log("获取消息详情失败");
                });
                return TodoTaskListjson;

            },
            getTodoListdd:function(){
                var TodoTaskListddjson={};
                $http({
                    method:'GET',
                    url:'http://localhost:8080/rap/szcz/dagl/daDetail.do?id='+$stateParams.id
                }).success(function(data){
                    TodoTaskListddjson.ysdwmc=data.result.ysdwmc;
                    TodoTaskListddjson.ssny=data.result.ssny;
                    TodoTaskListddjson.zflh=data.result.zflh;
                }).error(function(data,status,headers,config) {
                    // 当响应以错误状态返回时调用
                    console.log("获取凭证详情失败");
                });
                return TodoTaskListddjson;
        }}
    });