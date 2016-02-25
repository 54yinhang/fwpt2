/**
 * Created by bang on 2016/2/19.
 */
angular.module('FWPT')
    .factory('ElectronicFileService', function ($http, $state, $stateParams,$q) {

        return {
            getList: function (category) {
                var deferred = $q.defer();
                //根据不同菜单选项，获取相应列表数据
                //“电子档案”与“查看档案”选项，获得所有列表数据
                if(category=='allList' || !category){
                    $http({
                        method:'GET',
                        url:'http://localhost:8080/rap/szcz/dagl/queryDa.do?condition&spzt=100'
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                        })
                        .error(function () {
                            alert("连接服务器失败")
                        });
                    return deferred.promise;
                }
                if(category=='modifyList'){
                    $http({
                        method:'GET',
                        url:'http://localhost:8080/rap/szcz/dagl/queryDa.do?condition&spzt=101',
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                        })
                        .error(function () {
                            alert("连接服务器失败")
                        });
                    return deferred.promise;
                }
                if(category=='unpushList'){
                    $http({
                        method:'GET',
                        url:'http://localhost:8080/rap/szcz/dagl/queryDa.do?condition&spzt=101'
                    })
                        .success(function (data) {
                            deferred.resolve(data);
                        })
                        .error(function () {
                            alert("连接服务器失败")
                        });
                    return deferred.promise;
                }
            },
            deleteFile:function(id,spzt){
                $http({
                    method:'POST',
                    url:'http://localhost:8080/rap/szcz/dagl/deleteDa.do',
                    data:{id:id,spzt:spzt}
                })
                    .success(function(data){
                        console.log(data.successMsg);
                    })
                    .error(function(){
                        console.log("删除失败");
                    })
            },
            pushFile:function(id){
                $http({
                    method:'POST',
                    url:'http://localhost:8080/rap/szcz/dagl/fqsp.do',
                    data:{id:id}
                })
                    .success(function(data){
                        console.log(data.successMsg);
                    })
                    .error(function(){
                        console.log("上报失败");
                    })
            },
            getOne:function(){
                //console.log($stateParams.id);
                var deferred = $q.defer();
                $http({
                    method:'POST',
                    url:'http://localhost:8080/rap/szcz/dagl/daDetail.do',
                    data:{id:$stateParams.id}
                })
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(){
                        console.log("连接服务器失败")
                    })
                return deferred.promise;
            },
            sendAddFile:function(ysdwmc,ssny,zflh,ms){
                var deferred = $q.defer();
                $http({
                    method:'POST',
                    url:'http://localhost:8080/rap/szcz/dagl/daAdd.do',
                    data:{ysdwmc:ysdwmc,ssny:ssny,zflh:zflh,ms:ms}
                })
                    .success(function(data){
                        alert("保存成功");
                        deferred.resolve(data);
                    })
                    .error(function(data){
                        alert("连接服务器失败");
                    })
                return deferred.promise;
            },
            queryFiles: function (condition) {
                var deferred = $q.defer();
                console.log(condition);
                $http({
                    method:'GET',
                    url:'http://localhost:8080/rap/szcz/dagl/queryDa.do?condition='+condition+'&spzt=100'
                })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function () {
                        console.log("连接服务器失败");
                    })
                return deferred.promise;
            }
        };
    });