angular.module('FWPT')
	.factory('ListService',function($http,$q){
		return {
			getKnowledges : function(){
				var defer = $q.defer();
				$http({
					method:'GET',
					//url:'../assets/knowledgeList.json'
					url:'http://192.168.1.68:8081/lab2/fwpt/msgService/getMsg.do?bj=5&start=1&limit=5'
				})
				.success(function(data){
					defer.resolve(data.result);
				})
				.error(function(){
					console.log('获取知识库列表失败');
				});
				return defer.promise;
			}
		}
	})
	.factory('KnowDetailService',function($http,$q,$stateParams){
		return {
			getDetails : function(){
				var xxid = $stateParams.xxid;
				var defer = $q.defer();
				$http({
					method:'GET',
					//url:'../assets/knowledgeData/knowledgeDetail01.json'
					url:'http://192.168.1.68:8081/lab2/fwpt/msgService/getMsgDetail.do?xxid='+xxid
				})
				.success(function(data){
					defer.resolve(data.result[0]);
						console.log(data.result);
				})
				.error(function(){
					console.log('获取知识库详细信息失败');
				});
				return defer.promise;
			}
		}
	});
