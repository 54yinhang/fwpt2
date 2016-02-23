angular.module('FWPT')
	.controller('KnowledgeCtrl',['$scope','ListService',function($scope,ListService){
		ListService.getKnowledges().then(function(data){
			$scope.knowledges = data
		});
	}])

	.controller('DataCtrl',['$scope','ListService',function($scope,ListService){
		ListService.getDatas().then(function(data){
			$scope.datas = data
		});
	}])

	.controller('ListCtrl',['$scope','$http','$stateParams','ListService',function($scope,$http,$stateParams,ListService){
		/*通知公告、知识库list页面设置默认值，暂设为通知公告*/
		//$scope.state = 'notice';
		if($stateParams.state == 'knowledge'){
			$scope.knowledgeClass = true;
			$scope.noticeClass = false;
			$scope.state = $stateParams.state;
		}else if($stateParams.state == 'notice'){
			$scope.knowledgeClass = false;
			$scope.noticeClass = true;
			$scope.state = $stateParams.state;
		}

		$scope.showNotice = function(){
			$scope.state = 'notice';
			$scope.knowledgeClass = false;
			$scope.noticeClass = true;
		};
		$scope.showKnowledge = function(){
			$scope.state = 'knowledge';
			$scope.knowledgeClass = true;
			$scope.noticeClass = false;
		};
		/**
		 * *****************************************************************
		 * 分页调用----开始
		 */
		$scope.paginationConf = {
			currentPage: 1,      //当前页，默认为1
			totalItems: 50,      //数据总数量，默认为50
			itemsPerPage: 10,   //默认当前页显示的数据数量
			pagesLength: 10,    //分页条的长度
			perPageOptions: [10,20,30],    //当前显示的数据可选数量
			onChange: function(){
				$scope.setPagingFilter();
			},
			dataCountDisplay:true,         //选择显示当前页显示的数据数量
			jumpOrNot:true           //是否选择跳转
		};
		//设置分页数据
		$scope.setPagingData = function(data, currentPage, itemsPerPage){
			var pageData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
			$scope.knowledgeDatas = pageData;
			$scope.paginationConf.totalItems = data.length;
			if (!$scope.$$phase) {
				$scope.$apply();
			}
		};
		//当前页显示数量改变时，如果搜索框仍有关键字
		$scope.setPagingFilter = function(){
			ListService.getKnowledgeDatas().then(function(data){
				$scope.setPagingData(data, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
			});
		};
		/**
		 * ***********************************************************************
		 * 分页调用---结束
		 */

	}])
	
	.controller('KnowDetailCtrl',['$scope','ListService',function($scope,ListService){
		ListService.getKnowledgeDatas().then(function(data){
			$scope.knowledgeDatas = data
		});
	}])

	.controller('ContentCtrl',['$scope','KnowDetailService',function($scope,KnowDetailService){
		KnowDetailService.getDetails().then(function(data){
			$scope.details = data;
			$('#content').append($scope.details.nr);
		});
	}]);
