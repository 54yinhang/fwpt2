/**
 * Created by bang on 2016/2/19.
 */
angular.module('FWPT')
    .controller('ElectronicFileController',['$scope','$state','$stateParams','ElectronicFileService',
        function($scope, $state, $stateParams, ElectronicFileService) {

            //根据传入的菜单选项标识category获取相应菜单列表数据
            ElectronicFileService.getList($stateParams.category).then(
                function(data){
                    $scope.listData = data;
                }
            );
            //删除档案数组
            $scope.selected = [];
            //根据checkbox的勾选情况对删除档案数组进行增删
            $scope.updateSelections = function ($event, id) {
                var checkbox = $event.target;
                var action = (checkbox.checked?'add':'remove');
                if(action=='add' && $scope.selected.indexOf(id)==-1){
                    $scope.selected.push(id);
                }
                if(action=='remove' && $scope.selected.indexOf(id)!=-1){
                    $scope.selected.splice($scope.selected.indexOf(id),1);
                }
            }
            //删除档案
            $scope.delete = function(){
                ElectronicFileService.delete($scope.selected);
                ElectronicFileService.getList($stateParams.category).then(
                    function(data){
                        $scope.listData = data;
                    }
                );
            }
    }])
    .controller('ElectronicFilePushController',['$scope','$state','$stateParams','ElectronicFileService',
        function ($scope, $state, $stateParams, ElectronicFileService) {
            //根据传入的菜单选项标识category获取相应菜单列表数据
            ElectronicFileService.getList($stateParams.category).then(
                function(data){
                    $scope.listData = data;
                }
            );
            //上报档案数组
            $scope.selected = [];
            //根据checkbox的勾选情况对上报档案数组进行增删
            $scope.updateSelections = function ($event, id) {
                var checkbox = $event.target;
                var action = (checkbox.checked?'add':'remove');
                if(action=='add' && $scope.selected.indexOf(id)==-1){
                    $scope.selected.push(id);
                }
                if(action=='remove' && $scope.selected.indexOf(id)!=-1){
                    $scope.selected.splice($scope.selected.indexOf(id),1);
                }
            }
            //上报档案
            $scope.push = function(){
                ElectronicFileService.push($scope.selected);
                ElectronicFileService.getList($stateParams.category).then(
                    function(data){
                        $scope.listData = data;
                    }
                );
            }
        }
    ])
    .controller('ElectronicFileModifyController',['$scope','$state','$stateParams','ElectronicFileService',
        function($scope, $state, $stateParams, ElectronicFileService){
            //根据传入的菜单选项标识category获取相应菜单列表数据
            ElectronicFileService.getList($stateParams.category).then(
                function(data){
                    $scope.listData = data;
                }
            );
            ElectronicFileService.getOne($stateParams.id).then(
                function(data){
                    $scope.data = data;
                }
            );
        }
    ])


