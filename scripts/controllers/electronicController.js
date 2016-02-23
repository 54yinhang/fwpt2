/**
 * Created by bang on 2016/2/19.
 */
angular.module('FWPT')
    .controller('ElectronicFileController',['$scope','$state','$stateParams','ElectronicFileService',
        function($scope, $state, $stateParams, ElectronicFileService) {
            //分页
            $scope.paginationConf = {
                currentPage: 1,      //当前页，默认为1
                totalItems: 50,      //数据总数量，默认为50
                itemsPerPage: 7,   //默认当前页显示的数据数量
                pagesLength: 10,    //分页条的长度
                perPageOptions: [7, 14, 21],    //当前显示的数据可选数量
                //onChange: function(){
                //    $scope.setPagingFilter($scope.searchText);
                //},
                dataCountDisplay:true,         //选择显示当前页显示的数据数量
                jumpOrNot:true           //是否选择跳转
            };
            //设置分页数据
            $scope.setPagingData = function(data, currentPage, itemsPerPage){
                var pageData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
                $scope.listData = pageData;
                $scope.paginationConf.totalItems = data.length;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };
            //根据传入的菜单选项标识category获取相应菜单列表数据
            ElectronicFileService.getList($stateParams.category).then(
                function(data){
                    $scope.setPagingData(data, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
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
            $scope.toggle = true;
            $scope.ulToggle = false;
            $scope.tag = function(){
                if($scope.toggle){
                    return $scope.toggle = false;
                    $scope.ulToggle = true;
                }else{
                    return $scope.toggle = true;
                    $scope.ulToggle = false;
                }
            }
            //新增按钮发送请求

    }])
    .controller('ElectronicFilePushController',['$scope','$state','$stateParams','ElectronicFileService',
        function ($scope, $state, $stateParams, ElectronicFileService) {
            //分页
            $scope.paginationConf = {
                currentPage: 1,      //当前页，默认为1
                totalItems: 50,      //数据总数量，默认为50
                itemsPerPage: 7,   //默认当前页显示的数据数量
                pagesLength: 10,    //分页条的长度
                perPageOptions: [7, 14, 21],    //当前显示的数据可选数量
                //onChange: function(){
                //    $scope.setPagingFilter($scope.searchText);
                //},
                dataCountDisplay:true,         //选择显示当前页显示的数据数量
                jumpOrNot:true           //是否选择跳转
            };
            //设置分页数据
            $scope.setPagingData = function(data, currentPage, itemsPerPage){
                var pageData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
                $scope.listData = pageData;
                $scope.paginationConf.totalItems = data.length;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };
            //根据传入的菜单选项标识category获取相应菜单列表数据
            ElectronicFileService.getList($stateParams.category).then(
                function(data){
                    $scope.setPagingData(data, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
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
            //分页
            $scope.paginationConf = {
                currentPage: 1,      //当前页，默认为1
                totalItems: 50,      //数据总数量，默认为50
                itemsPerPage: 7,   //默认当前页显示的数据数量
                pagesLength: 10,    //分页条的长度
                perPageOptions: [7, 14, 21],    //当前显示的数据可选数量
                //onChange: function(){
                //    $scope.setPagingFilter($scope.searchText);
                //},
                dataCountDisplay:true,         //选择显示当前页显示的数据数量
                jumpOrNot:true           //是否选择跳转
            };
            //设置分页数据
            $scope.setPagingData = function(data, currentPage, itemsPerPage){
                var pageData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
                $scope.listData = pageData;
                $scope.paginationConf.totalItems = data.length;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };
            //根据传入的菜单选项标识category获取相应菜单列表数据
            ElectronicFileService.getList($stateParams.category).then(
                function(data){
                    $scope.setPagingData(data, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
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
    .controller('addFileController',['$scope','$state','$stateParams','ElectronicFileService',
        function($scope, $state, $stateParams, ElectronicFileService){
            $scope.addFile = {};
            ElectronicFileService.getList($stateParams.category).then(
                function(data){
                    console.log(data.result);
                    $scope.addFile.result = data.result;
                }
            );
            $scope.saveAddFile = function(){
                $scope.fileData = {
                    sydwmc:$scope.addFile.ysdwmc,
                    ssny:$scope.addFile.ssny,
                    zflh:$scope.addFile.zflh,
                    ms:$scope.addFile.ms
                }
                ElectronicFileService.sendAddFile($scope.fileData);
            }
        }])


