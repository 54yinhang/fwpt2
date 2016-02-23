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
                onChange: function(){
                    $scope.setPagingFilter();
                },
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
            $scope.setPagingFilter = function(){
                ElectronicFileService.getList($stateParams.category).then(
                    function(data){
                        console.log(data.result);
                        $scope.setPagingData(data.result, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
                        for(var i=0;i<$scope.listData.length;i++){
                            $scope.listData[i].selected = false;
                        }
                    }
                );
            }

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
                onChange: function(){
                    $scope.setPagingFilter();
                },
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
            $scope.setPagingFilter = function(){
                ElectronicFileService.getList($stateParams.category).then(
                    function(data){
                        $scope.setPagingData(data, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
                        for(var i=0;i<$scope.listData.length;i++){
                            $scope.listData[i].selected = false;
                        }
                    }
                );
            }
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
    .controller('ElectronicFileModifyController',['$scope','$state','$stateParams','ElectronicFileService','$http',
        function($scope, $state, $stateParams, ElectronicFileService, $http){
            //分页
            $scope.paginationConf = {
                currentPage: 1,      //当前页，默认为1
                totalItems: 50,      //数据总数量，默认为50
                itemsPerPage: 7,   //默认当前页显示的数据数量
                pagesLength: 10,    //分页条的长度
                perPageOptions: [7, 14, 21],    //当前显示的数据可选数量
                onChange: function(){
                    $scope.setPagingFilter();
                },
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

            var uploader = WebUploader.create({
                swf: 'Uploader.swf',
                //server: 'http://localhost:8080/ifugle-rap/szcz/dagl/qtDaSbFjSc.do',
                server:'',
                pick: '#picker',
                //paste: 'document.body',
                accept:{
                    title: 'png,jpg,doc,pdf',
                    extensions: 'png,jpg,doc,pdf',
                    mimeType: '*'
                },
                resize: false,
                duplicate:true
            });
            // 当有文件被添加进队列的时候
            uploader.on( 'fileQueued', function( file ) {

                $("#list").css('display','block').append('<label class="alert-info docInfo">'+file.name+'</label>');

            });
            $scope.upInfo={};
            /***************************上传前的表单验证***********************************/
            $("#ctlBtn").click(function(){
                console.log(123);
                if(uploader.getFiles().length){
                    uploader.upload();
                }else{
                    $('#list').css('display','block').html("<p class='alert-danger'>上传文件不能为空</p>").fadeOut(2300,function(){
                        $(this).text('');
                    });
                }
            });
            /***************************重新上传失败附件*********************************/
            $('#reupload').click(function(){
                $.each(uploader.getFiles('error'),function(i,item){
                    uploader.upload(item);
                });
            });
            /***************************上传前发送的数据***********************************/
            $scope.items = [];
            uploader.on('uploadBeforeSend',function(block, data){
                var file = block.file;

                data.fl = 1;
                data.daid = '$scope.daId';//$scope.daId;
                data.wjid = (new Date()).getTime();
                data.name = file.name;
                data.type = file.type;
                data.size = file.size;
                data.status = 1;
            });
            /***************************上传成功***********************************/
            function getNowFormatDate()
            {
                var day = new Date();
                var Year = 0;
                var Month = 0;
                var Day = 0;
                var CurrentDate = "";
                Year= day.getFullYear();//ie火狐下都可以
                Month= day.getMonth()+1;
                Day = day.getDate();
                CurrentDate += Year + "-";
                if (Month >= 10 )
                {
                    CurrentDate += Month + "-";
                }
                else
                {
                    CurrentDate += "0" + Month + "-";
                }
                if (Day >= 10 )
                {
                    CurrentDate += Day ;
                }
                else
                {
                    CurrentDate += "0" + Day ;
                }
                return CurrentDate;
            }
            $scope.success = true;
            uploader.on( 'uploadSuccess', function( file, res ) {
                console.log($scope.upInfo);
                $scope.items.push({
                    docId:$scope.docId,
                    cName:'当前登录用户的单位',
                    docSize:file.size,
                    upTime:2000,
                    upPerson:'当前登录用户'
                });
                $scope.$apply();
                $scope.success = $scope.success && res;
                //console.log($scope.items.length);
                //console.log($scope.items);
            });
            /*************************上传结束***************************************/
            uploader.on('uploadFinished',function(){
                console.log('上传结束');
                if(uploader.getFiles('error')==[]){
                    $('#reupload').css('display','block');
                }else{
                    $("#list").css('display','block').html("<p class='alert-success'>所有文件上传成功</p>").fadeOut(2300,function(){
                        $(this).text('');
                    });
                }
            });
        }
    ])
    .controller('addFileController',['$scope','$state','$stateParams','ElectronicFileService','$http',
        function($scope, $state, $stateParams, ElectronicFileService,$http){
    		$scope.addFile = {};
            ElectronicFileService.getList($stateParams.category).then(
                function(data){
                    $scope.addFile.result = data.result;
                }
            );
            $scope.saveAddFile = function(){
                $scope.fileData = {
                    ysdwmc:$scope.addFile.ysdwmc,
                    ssny:$scope.addFile.ssny,
                    zflh:$scope.addFile.zflh,
                    ms:$scope.addFile.ms
                };
//                console.log(JSON.stringify($scope.fileData));
//                ElectronicFileService.sendAddFile($scope.fileData);
                ElectronicFileService.sendAddFile($scope.addFile.ysdwmc,$scope.addFile.ssny,$scope.addFile.zflh,$scope.addFile.ms,$scope.addFile.result);
            }
            /***************************上传组件初始化***********************************/
            var uploader = WebUploader.create({
                swf: 'Uploader.swf',
                //server: 'http://localhost:8080/ifugle-rap/szcz/dagl/qtDaSbFjSc.do',
                server:'',
                pick: '#picker',
                //paste: 'document.body',
                accept:{
                    title: 'png,jpg,doc,pdf',
                    extensions: 'png,jpg,doc,pdf,docx',
                    mimeType: '*'
                },
                resize: false,
                duplicate:true
            });
            // 当有文件被添加进队列的时候
            uploader.on( 'fileQueued', function( file ) {

                $("#list").css('display','block').append('<label class="alert-info docInfo">'+file.name+'</label>');

            });
            $scope.upInfo={};
            /***************************上传前的表单验证***********************************/
            $("#ctlBtn").click(function(){
                console.log(123);
                if(uploader.getFiles().length){
                    uploader.upload();
                }else{
                    $('#list').css('display','block').html("<p class='alert-danger'>上传文件不能为空</p>").fadeOut(2300,function(){
                        $(this).text('');
                    });
                }
            });
            /***************************重新上传失败附件*********************************/
            $('#reupload').click(function(){
                $.each(uploader.getFiles('error'),function(i,item){
                    uploader.upload(item);
                });
            });
            /***************************上传前发送的数据***********************************/
            $scope.items = [];
            uploader.on('uploadBeforeSend',function(block, data){
                var file = block.file;

                data.fl = 1;
                data.daid = '$scope.addFile.result';//$scope.daId;
                data.wjid = (new Date()).getTime();
                $scope.docId = data.wjid;
                data.name = file.name;
                data.type = file.type;
                data.size = file.size;
                data.status = 1;
            });
            /***************************上传成功***********************************/

            function getNowFormatDate()
            {
                var day = new Date();
                var Year = 0;
                var Month = 0;
                var Day = 0;
                var CurrentDate = "";
                Year= day.getFullYear();//ie火狐下都可以
                Month= day.getMonth()+1;
                Day = day.getDate();
                CurrentDate += Year + "-";
                if (Month >= 10 )
                {
                    CurrentDate += Month + "-";
                }
                else
                {
                    CurrentDate += "0" + Month + "-";
                }
                if (Day >= 10 )
                {
                    CurrentDate += Day ;
                }
                else
                {
                    CurrentDate += "0" + Day ;
                }
                return CurrentDate;
            }

            $scope.success = true;
            uploader.on( 'uploadSuccess', function( file, res ) {

                $scope.items.push({
                    docId:$scope.docId,
                    cName:'当前登录用户的单位',
                    docSize:file.size,
                    upTime:getNowFormatDate(),
                    upPerson:'当前登录用户'
                });
                console.log($scope.items);
                $scope.$apply();
                $scope.success = $scope.success && res;
                //console.log($scope.items.length);
                //console.log($scope.items);
            });
            /*************************上传结束***************************************/
            uploader.on('uploadFinished',function(){
                if(uploader.getFiles('error')==[]){
                    $('#reupload').css('display','block');
                }else{
                    $("#list").css('display','block').html("<p class='alert-success'>所有文件上传成功</p>").fadeOut(2300,function(){
                        $(this).text('');
                    });
                }
            });
            /***************************删除附件***********************************/
            $scope.delDoc = function(doc){
                var transform = function(data){
                    return $.param(data);
                };
                $http.post('http://localhost:8080/rap/szcz/xxgl/xxts/deleteAttachment.do',{id:doc,cratorId:'登录者id'},{
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transform
                }).success(function(data,status){
                    if(data.success){
                        angular.forEach($scope.items, function(value, key){
                            if(value['docId'] == doc)
                                $scope.items.splice(key, 1);
                        });
                    }
                }).error(function(){
                    angular.forEach($scope.items, function(value, key){
                        if(value['docId'] == doc)
                            $("#list").css('display','block').html("<p class='alert-success'>'文件'+value['docName']+'删除失败！'</p>").fadeOut(2300,function(){
                                $(this).text('');
                            });
                    });
                });
            };
        }])
