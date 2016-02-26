angular.module('FWPT')
	.factory('ListService',function($http,$q){
		return {
			getKnowledgeDatas : function(){
				var defer = $q.defer();
				$http({
					method:'GET',
					url:'/rap/fwpt/msgService/getMsg.do?bj=5&start=1&limit=50'
				})
					.success(function(data){
						defer.resolve(data.result);
					})
					.error(function(){
						console.log('获取资料下载列表失败');
					});
				return defer.promise;
			},
			getKnowledges : function(){
				var defer = $q.defer();
				$http({
					method:'GET',
					//url:'../assets/knowledgeList.json'
					url:'/rap/fwpt/msgService/getMsg.do?bj=5&start=1&limit=10'
				})
				.success(function(data){
					defer.resolve(data.result);
				})
				.error(function(){
					console.log('获取知识库列表失败');
				});
				return defer.promise;
			},
			getDatas : function(){
				var defer = $q.defer();
				$http({
					method:'GET',
					url:'/rap/fwpt/msgService/getMsg.do?bj=5&start=11&limit=20'
				})
					.success(function(data){
						defer.resolve(data.result);
					})
					.error(function(){
						console.log('获取资料下载列表失败');
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
					url:'/rap/fwpt/msgService/getMsgDetail.do?xxid='+xxid
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
