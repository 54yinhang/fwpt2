/**
 * Created by bang on 2016/2/19.
 */
angular.module('FWPT')
    .factory('ElectronicFileService', function ($http, $state, $stateParams,$q) {

        return {
            getModifyList: function () {
                var deferred = $q.defer();
                $http({
                    method:'GET',
                    url:'../assets/electronicFile.json'
                })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function () {
                        alert("连接服务器失败");
                    });
                return deferred.promise;
            },
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
                if(catefory=='modifyList'){
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
                if(catefory=='unpushList'){
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
                        alert("删除成功");
                    })
                    .error(function(){
                        alert("删除失败");
                    })
            },
            push:function(pushData){
                $http({
                    method:'POST',
                    url:'',
                    data:deleteData
                })
                    .success(function(data){
                        alert("上报成功");
                    })
                    .error(function(){
                        alert("上报失败");
                    })
            }
        };
    });