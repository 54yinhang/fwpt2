/**
 * Created by bang on 2016/2/19.
 */
angular.module('FWPT')
    .controller('ElectronicFileController',['$scope','$state','$stateParams','ElectronicFileService',
        function($scope, $state, $stateParams, ElectronicFileService) {
             ElectronicFileService.getModifyList().then(
                 function (data) {
                     $scope.datas = data;
                 }
            );
            //根据传入的菜单选项标识category获取相应菜单列表数据
            ElectronicFileService.getList($stateParams.category).then(
                function(data){
                    $scope.listData = data;
                }
            );
    }])
