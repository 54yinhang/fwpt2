angular.module('FWPT')
	.factory('ListService',function($http,$q){
		return {
			getKnowledges : function(){
				var defer = $q.defer();
				$http({
					method:'GET',
					url:'../assets/knowledgeList.json'
				})
				.success(function(date){
					defer.resolve(date);
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
				var knowId = $stateParams.knowId;
				var defer = $q.defer();
				$http({
					method:'GET',
					url:'../assets/knowledgeData/knowledgeDetail'+knowId+'.json'
				})
				.success(function(date){
					defer.resolve(date);
				})
				.error(function(){
					console.log('获取知识库详细信息失败');
				});
				return defer.promise;
			}
		}
	});
