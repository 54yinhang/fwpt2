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
                        url:'../assets/electronicFile.json'
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
                        url:'http://localhost:8080/rap/szcz/dagl/queryDa.do'
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
                        url:'../assets/electronicFile.json'
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
            delete:function(deleteData){
                $http({
                    method:'POST',
                    url:'',
                    data:deleteData
                })
                    .success(function(data){
                        console.log("删除成功");
                    })
                    .error(function(){
                        alert("删除失败");
                    })
            },
            push:function(pushData){
                $http({
                    method:'POST',
                    url:'',
                    data:pushData
                })
                    .success(function(data){
                        console.log("上报成功");
                    })
                    .error(function(){
                        alert("上报失败");
                    })
            },
            getOne:function(id){
                var deferred = $q.defer();
                $http({
                    method:'POST',
                    url:'',
                    data:id
                })
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(){
                        alert("获取数据失败");
                    })
                return deferred.promise;
            },
            sendAddFile:function(ysdwmc,ssny,zflh,ms){
                $http({
                    method:'POST',
                    url:'http://localhost:8080/rap/szcz/dagl/daAdd.do',
                    data:{ysdwmc:ysdwmc,ssny:ssny,zflh:zflh,ms:ms}
                })
                    .success(function(data){
                        alert("保存成功");
                    })
                    .error(function(data){
                        alert("连接服务器失败");
                    })

            }
        };
    });