angular.module('FWPT')
	.factory('FillReportService',function($http, $state, $stateParams,$q){
		return {
			getTbxx: function(){
				var deferred = $q.defer();
				$http({
					method: 'get',
					url: '../assets/report.fillreport.json'
				}).success(function(data){
					deferred.resolve(data);
				}).error(function(data){
					console.log('操作失败');
				});
				return deferred.promise;
			}
		}
	})