angular.module('FWPT')
	.controller('FillReportController',['$scope','$state','$stateParams','FillReportService',function($scope,$state,$stateParams,FillReportService){
		/**
		 * *****************************************************************
		 * 分页调用----开始
		 */
		$scope.paginationConf = {
			currentPage: 1,      //当前页，默认为1
			totalItems: 50,      //数据总数量，默认为50
			itemsPerPage: 10,   //默认当前页显示的数据数量
			pagesLength: 10,    //分页条的长度
			perPageOptions: [10, 20, 30, 40, 50],    //当前显示的数据可选数量
			onChange: function(){
			},
			dataCountDisplay:true,         //选择显示当前页显示的数据数量
			jumpOrNot:true           //是否选择跳转
		};
		//设置分页数据
		$scope.setPagingData = function(data, currentPage, itemsPerPage){
			var pageData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
			$scope.tbxxMsg = pageData;
			$scope.paginationConf.totalItems = data.length;
			if (!$scope.$$phase) {
				$scope.$apply();
			}
		};
		//当前页显示数量改变时，如果搜索框仍有关键字
		$scope.setPagingFilter = function(text){
			if(text){
				FillReportService.getTbxx().then(function(objMsg){
					var data = objMsg.filter(function(item){
						return JSON.stringify(item).toLowerCase().indexOf(text) != -1;
					});
					$scope.setPagingData(data, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
				});
			}else{
				FillReportService.getTbxx().then(function(objMsg){
					$scope.setPagingData(objMsg, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
				});
			}
		};
		/**
		 * ***********************************************************************
		 * 分页调用---结束
		 */

		//监控当前页和当前页显示数量的改变情况
		$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', function(){
			$scope.setPagingFilter($scope.searchText);
		},true);

		//搜索
	    $scope.searchQuery = function(){
			$scope.setPagingFilter($scope.searchText);
	    };
	}])