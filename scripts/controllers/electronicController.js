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
            //全选
            $scope.selectAll = function($event){
                var checkbox = $event.target;
                if(checkbox.checked){
                    for(var i=0;i<$scope.listData.length;i++){
                        $scope.listData[i].selected = true;
                    }
                }else{
                    for(var i=0;i<$scope.listData.length;i++){
                        $scope.listData[i].selected = false;
                    }
                }
            }
            //单选
            $scope.setSelected = function($event,index){
                var checkbox = $event.target;
                if(checkbox.checked){
                    $scope.listData[index].selected = true;
                }else{
                    $scope.listData[index].selected = false;
                }
            }
            //将选好的删除条目上传服务器
            $scope.push = function(){
                var selected = {};
                for(var i=0;i<$scope.listData.length;i++){
                    if($scope.listData[i].selected = true){
                        selected.push($scope.listData[i]);
                    }
                }
                ElectronicFileService.push($scope.selected);
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
                    for(var i=0;i<$scope.listData.length;i++){
                        $scope.listData[i].selected = false;
                    }
                }
            );
            //全选
            $scope.selectAll = function($event){
                var checkbox = $event.target;
                if(checkbox.checked){
                    for(var i=0;i<$scope.listData.length;i++){
                        $scope.listData[i].selected = true;
                    }
                }else{
                    for(var i=0;i<$scope.listData.length;i++){
                        $scope.listData[i].selected = false;
                    }
                }
            }
            //单选
            $scope.setSelected = function($event,index){
                var checkbox = $event.target;
                if(checkbox.checked){
                    $scope.listData[index].selected = true;
                }else{
                    $scope.listData[index].selected = false;
                }
            }
            //将选好的上报条目上传服务器
            $scope.push = function(){
                var selected = {};
                for(var i=0;i<$scope.listData.length;i++){
                    if($scope.listData[i].selected = true){
                        selected.push($scope.listData[i]);
                    }
                }
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
            //获得单个详细数据
            ElectronicFileService.getOne($stateParams.id).then(
                function(data){
                    $scope.data = data;
                }
            );
        }
    ])
function toggle($event){
    $(".manage").toggle();
    $($event.target).toggleClass("on");
}

