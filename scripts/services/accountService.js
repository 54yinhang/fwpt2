/**
 * Created by Administrator on 2016/02/18.
 */

angular.module('FWPT')
    .factory('AccountService', function($http, $state, $stateParams,$location) {
        $http.get('http://192.168.0.111:8080/rap/fwpt/msgService/code.do' ).success(function(data){
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
                    url: 'http://192.168.0.111:8080/rap/fwpt/msgService/fwptLogin.do',
                    type: 'GET',
                    // dataType: 'json',
                    data: {'j_username':user.userName, 'j_password':user.passowrd,'j_verificationcode':user.code},
                    success:function(data){

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


        var TodoTasklistjson=
        {"result":[{"id":118,"creatorId":1990200033,"creator":"开发_陈海浪","creationDate":"2016-02-22 16:01:40","modifierId":1990200033,"modifier":"开发_陈海浪","modificationDate":"2016-02-22 16:01:40","revision":null,"syncFlag":null,"nodeId":330100,"code":"118","mc":"118其他档案",
            "flId":1000300002,"ms":null,"approvalId":null,"appTodoId":null,"approvalHistoryId":null,
            "ssny":20160222,"ysdwbm":null,"ysdwmc":"spring_16_01","zflh":"20160222","zt":1,"hbbm":null,"spr":null,
            "spzt":0,"spps":null,"spsj":null,"deptId":33010100,"userName":"开发_陈海浪","userPrefixId":102
            ,"userPrefixIdWithDate":102160223,"userDeptId":33010100,"appUserId":1990200033,"nowDate":"2016-02-23"
            ,"nowTime":"14:43:25","userNodeId":330100,"userFullName":"开发_陈海浪","userDeptName":"杭州市地方税务局",
            "userParentDeptId":33010000,"userRootDeptId":33010000,"userBranchDeptId":33010100,"userTrunkDeptId":33010100,
            "userQueryDeptId":33010000,"userPublicDeptId":33990200,"userQueryDeptIdFrom":33010000,"userQueryDeptIdTo":33019999,
            "nowTimestamp":"2016-02-23 14:43:25"},{"id":119,"creatorId":1990200033,
            "creator":"开发_陈海浪","creationDate":"2016-02-22 16:17:31","modifierId":1990200033,
            "modifier":"开发_陈海浪","modificationDate":"2016-02-22 16:17:31","revision":null,"syncFlag":null,
            "nodeId":330100,"code":"119","mc":"119其他档案","flId":1000300002,"ms":null,"approvalId":null,"appTodoId":null,
            "approvalHistoryId":null,"ssny":20160222,"ysdwbm":null,"ysdwmc":"spring_16_17","zflh":"20160222","zt":1,
            "hbbm":null,"spr":null,"spzt":0,"spps":null,"spsj":null,"deptId":33010100,"userName":"开发_陈海浪",
            "userPrefixId":102,"userPrefixIdWithDate":102160223,"userDeptId":33010100,"appUserId":1990200033,
            "nowDate":"2016-02-23","nowTime":"14:43:25","userNodeId":330100,"userFullName":"开发_陈海浪",
            "userDeptName":"杭州市地方税务局","userParentDeptId":33010000,"userRootDeptId":33010000,
            "userBranchDeptId":33010100,"userTrunkDeptId":33010100,"userQueryDeptId":33010000,
            "userPublicDeptId":33990200,"userQueryDeptIdFrom":33010000,"userQueryDeptIdTo":33019999,
            "nowTimestamp":"2016-02-23 14:43:25"},{"id":122,"creatorId":1990200033,
            "creator":"开发_陈海浪","creationDate":"2016-02-22 18:07:16","modifierId":1990200033,"modifier":"开发_陈海浪","modificationDate":"2016-02-22 18:43:18","revision":null,"syncFlag":null,"nodeId":330100,"code":"122","mc":"122其他档案","flId":1000300002,"ms":null,"approvalId":null,"appTodoId":null,"approvalHistoryId":null,"ssny":2016,"ysdwbm":null,"ysdwmc":"spring_18_01","zflh":"20160222","zt":1,"hbbm":null,"spr":null,"spzt":0,"spps":null,"spsj":null,"deptId":33010100,"userName":"开发_陈海浪","userPrefixId":102,"userPrefixIdWithDate":102160223,"userDeptId":33010100,"appUserId":1990200033,"nowDate":"2016-02-23","nowTime":"14:43:25","userNodeId":330100,"userFullName":"开发_陈海浪","userDeptName":"杭州市地方税务局","userParentDeptId":33010000,"userRootDeptId":33010000,"userBranchDeptId":33010100,"userTrunkDeptId":33010100,"userQueryDeptId":33010000,"userPublicDeptId":33990200,"userQueryDeptIdFrom":33010000,"userQueryDeptIdTo":33019999,"nowTimestamp":"2016-02-23 14:43:25"}],"success":true}
        ;
        return {
            //改为从后端取数
            getTodoTaskSum: function () {
                $http({
                    method:'GET',
                    url:'http://192.168.0.111:8080/rap/szcz/dagl/daCount.do'

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
                        $(".flrrightinfo>h5>span").html("我的未读消息");
                        return {}
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
                        var TodoTasklistrjson=[];
                        $http({
                            method:'GET',
                            url:'http://192.168.0.111:8080/rap/szcz/dagl/queryDa.do?condition&spzt=0',
                        }).success(function(data){
                            for(i=0;i<TodoTasklistjson.result.length;i++){
                                var k={};
                                k.lx="电子凭证";
                                k.fqr= TodoTasklistjson.result[i].creator;
                                k.mc=TodoTasklistjson.result[i].mc;
                                k.zt="财政未核对";
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
                            console.log(data);

                        }).error(function(data,status,headers,config) {
                            // 当响应以错误状态返回时调用
                            console.log("login failed");
                        });

                        $(".flrrightinfo>h5>span").html("我的电子凭证（财政未核对）");
                        return TodoTasklistrjson;
                    //break;
                    case "thddp"://我的电子凭证（被退回）
                        $http({
                            method:'GET',
                            url:'http://192.168.0.111:8080/rap/szcz/dagl/queryDa.do?condition&spzt=9',
                        }).success(function(data){

                            console.log(data);

                        }).error(function(data,status,headers,config) {
                            // 当响应以错误状态返回时调用
                            console.log("login failed");
                        });
                        $(".flrrightinfo>h5>span").html("我的电子凭证（被退回）");
                        return {};
                    //break;
                    case "hdwcdp"://我的电子凭证（已核对未查看）
                        $http({
                            method:'GET',
                            url:'http://192.168.0.111:8080/rap/szcz/dagl/queryDa.do?condition&spzt=2',
                        }).success(function(data){

                            console.log(data);

                        }).error(function(data,status,headers,config) {
                            // 当响应以错误状态返回时调用
                            console.log("login failed");
                        });
                        $(".flrrightinfo>h5>span").html("我的电子凭证（已核对未查看）");
                        return jsondata.hdwcdp;
                    //break;
                }
            }
        }
    });