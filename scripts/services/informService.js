angular.module('FWPT')
    .factory('InformService',function($http,$q){
        return {
            getInformTops: function(){
                var defer = $q.defer();
                $http({
                    method:'GET',
                    //url:'../assets/informList.json'})
                    //url:'http://192.168.1.88:8082/ifugle-rap/fwpt/msgService/getMsg.do?bj=1&start=1&limit=4'})
                    url:'http://localhost:8080/lab2/fwpt/msgService/getMsg.do?bj=1&start=1&limit=4'})
                    .success(function(data){
                        defer.resolve(data.result);
                    })
                    .error(function(){
                        console.log('获取通知公告置顶列表失败');
                    });
                return defer.promise;
            }
        }
    }).factory('InformListService',function($http,$q){
        return{
            getInformList:function(){
                var defer=$q.defer();
                $http({
                    method:'GET',
                    //url:'../assets/informList.json'})
                    //url:'http://192.168.1.88:8082/ifugle-rap/fwpt/msgService/getMsg.do?bj=2&start=1&limit=5'})
                    url:'http://192.168.1.68:8081/lab2/fwpt/msgService/getMsg.do?bj=2&start=1&limit=50'})
                    .success(function(data){
                        //console.log("获取通知公告列表成功");
                        defer.resolve(data.result);
                    })
                    .error(function(){
                        console.log("获取通知公告列表失败");
                    });
                return defer.promise;
            }
        }
    }).factory('InformDetailService',function($http,$q,$stateParams){
        return{
            getInformDetails:function(){
                var defer=$q.defer();
                var listId=$stateParams.listId;
                $http({
                    method:'GET',
                    //url:'../assets/informListMessage/informList'+listId+'.json'})
                    //url:'http://192.168.1.88:8082/ifugle-rap/fwpt/msgService/getMsgDetail.do?xxid='+listId+''})
                    url:'http://192.168.1.68:8081/lab2/fwpt/msgService/getMsgDetail.do?xxid='+listId})
                    .success(function(data){
                        //console.log("获取公告详情成功");
                        defer.resolve(data.result[0]);
                    })
                    .error(function(){
                        console.log("获取公告详情失败");
                    });
                return defer.promise;
            }
        }
    })