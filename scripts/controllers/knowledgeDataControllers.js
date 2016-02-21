angular.module('FWPT')
	.controller('KnowledgeCtrl',['$scope','ListService',function($scope,ListService){
//		$http.get("../assets/knowledgeList.json")
//		.success(function(data){
//			$scope.knowledges = data;
//		})
//		.error(function(){
//			console.log('获取数据失败');
//		});
		$scope.knowledges = ListService.getKnowledges().then(function(data){
			$scope.knowledges = data
		});
	}])
	
	.controller('ListCtrl',['$scope','$http','ListService',function($scope,$http,ListService){
		/*通知公告、知识库list页面设置默认值*/
		$scope.state = 'knowledge';
		
		$scope.knowledges = ListService.getKnowledges().then(function(data){
			$scope.knowLists = data
		});
		
		$scope.showNotice = function(){
			$scope.state = 'notice';
		};
		$scope.showKnowledge = function(){
			$scope.state = 'knowledge';
		};
		
		/*通知公告*/
		$http.get("../assets/tpl.json").success(function(data){
	        $scope.listDetail=data.splice(0,8);
		    }).error(function(){
		        console.log("通知公告列表获取数据失败")
		});
	}])
	
	.controller('KnowDetailCtrl',['$scope','KnowDetailService',function($scope,KnowDetailService){
		
		$scope.details = KnowDetailService.getDetails().then(function(data){
			$scope.details = data;
		});
	}]);
