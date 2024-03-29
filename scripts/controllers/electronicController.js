/**
 * Created by bang on 2016/2/19.
 */
angular.module('FWPT')

    .controller('ElectronicFileController', ['$scope', '$state', '$modal', '$stateParams', 'ElectronicFileService',
        function ($scope, $state, $modal, $stateParams, ElectronicFileService) {
            $scope.queryFlag = false;
            //分页
            $scope.paginationConf = {
                currentPage: 1,      //当前页，默认为1
                totalItems: 50,      //数据总数量，默认为50
                itemsPerPage: 7,   //默认当前页显示的数据数量
                pagesLength: 10,    //分页条的长度
                perPageOptions: [7, 14, 21],    //当前显示的数据可选数量
                onChange: function () {
                    $scope.setPagingFilter($scope.queryText);
                },
                dataCountDisplay: true,         //选择显示当前页显示的数据数量
                jumpOrNot: true           //是否选择跳转
            };
            //设置分页数据
            $scope.setPagingData = function (data, currentPage, itemsPerPage) {
                var pageData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
                $scope.listData = pageData;
                $scope.paginationConf.totalItems = data.length;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };
            //根据传入的菜单选项标识category获取相应菜单列表数据
            $scope.setPagingFilter = function (text) {
                //查询按钮未点击
                if(!text){
                    ElectronicFileService.getList($stateParams.category).then(
                        function (data) {
                            $scope.setPagingData(data.result, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
                            //for(var i=0;i<$scope.listData.length;i++){
                            //    $scope.listData[i].selected = false;
                            //}
                        }
                    );
                }
                //查询按钮被点击且查询输入框不为空
                if($scope.queryFlag){
                    ElectronicFileService.queryFiles(text).then(
                        function (data) {
                            $scope.setPagingData(data.result, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
                        })
                }
            }
            //删除事件
            $scope.deleteFile = function (id, spzt) {
                if (spzt == 0 || spzt == 9) {
                    var modalInstance = $modal.open({
                        templateUrl: 'electronicFile/confirmDelete.html',
                        controller: 'DeleteConfirmController',
                        resolve: {
                            id: function () {
                                return id;
                            }
                        }
                    });
                    modalInstance.result.then(function (text) {
                        console.log(text);
                    })
                } else {
                    alert("档案审批中，无法删除");
                }
            }
            //查询按钮点击事件
            $scope.queryFiles = function () {
                $scope.queryFlag = true;
                $scope.setPagingFilter($scope.queryText);
            }


            ////全选
            //$scope.selectAll = function($event){
            //    var checkbox = $event.target;
            //    if(checkbox.checked){
            //        for(var i=0;i<$scope.listData.length;i++){
            //            $scope.listData[i].selected = true;
            //        }
            //    }else{
            //        for(var i=0;i<$scope.listData.length;i++){
            //            $scope.listData[i].selected = false;
            //        }
            //    }
            //}
            ////单选
            //$scope.setSelected = function($event,index){
            //    var checkbox = $event.target;
            //    if(checkbox.checked){
            //        $scope.listData[index].selected = true;
            //    }else{
            //        $scope.listData[index].selected = false;
            //    }
            //}
            ////将选好的删除条目上传服务器
            //$scope.push = function(){
            //    var selected = {};
            //    for(var i=0;i<$scope.listData.length;i++){
            //        if($scope.listData[i].selected = true){
            //            selected.push($scope.listData[i]);
            //        }
            //    }
            //    ElectronicFileService.push($scope.selected);
            //    ElectronicFileService.getList($stateParams.category).then(
            //        function(data){
            //            $scope.listData = data;
            //        }
            //    );
            //}

            //新增按钮发送请求

        }])
    //删除按钮弹出框controller
    .controller('DeleteConfirmController', ['$scope', '$modalInstance', 'id', 'ElectronicFileService',
        function ($scope, $modalInstance, id, ElectronicFileService) {
            $scope.id = id;
            $scope.confirm = function () {
                ElectronicFileService.deleteFile(id);
                $modalInstance.close('删除成功');
                window.location.reload();
            }
        }])
    .controller('ElectronicFileMenuController', ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            $scope.toggle = true;
            $scope.tag = function () {
                if ($scope.toggle) {
                    return $scope.toggle = false;
                } else {
                    return $scope.toggle = true;
                }
            }
            $scope.toggle1 = true;
            $scope.tag1 = function () {
                if ($scope.toggle1) {
                    return $scope.toggle1 = false;
                } else {
                    return $scope.toggle1 = true;
                }
            }
        }])
    .controller('ElectronicFilePushController', ['$scope', '$state', '$stateParams', '$modal', 'ElectronicFileService',
        function ($scope, $state, $stateParams, $modal, ElectronicFileService) {
            //分页
            $scope.paginationConf = {
                currentPage: 1,      //当前页，默认为1
                totalItems: 50,      //数据总数量，默认为50
                itemsPerPage: 7,   //默认当前页显示的数据数量
                pagesLength: 10,    //分页条的长度
                perPageOptions: [7, 14, 21],    //当前显示的数据可选数量
                onChange: function () {
                    $scope.setPagingFilter($scope.queryText);
                },
                dataCountDisplay: true,         //选择显示当前页显示的数据数量
                jumpOrNot: true           //是否选择跳转
            };
            //设置分页数据
            $scope.setPagingData = function (data, currentPage, itemsPerPage) {
                var pageData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
                $scope.listData = pageData;
                $scope.paginationConf.totalItems = data.length;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };
            //根据传入的菜单选项标识category获取相应菜单列表数据
            $scope.setPagingFilter = function (text) {
                //查询按钮未点击
                if(!text){
                    ElectronicFileService.getList($stateParams.category).then(
                        function (data) {
                            $scope.setPagingData(data.result, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
                            //for(var i=0;i<$scope.listData.length;i++){
                            //    $scope.listData[i].selected = false;
                            //}
                        }
                    );
                }
                //查询按钮被点击且查询输入框不为空
                if($scope.queryFlag){
                    ElectronicFileService.queryPushFiles(text).then(
                        function (data) {
                            $scope.setPagingData(data.result, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
                        })
                }
            }
            //$scope.setPagingFilter = function (text) {
            //    ElectronicFileService.getList($stateParams.category).then(
            //        function (data) {
            //            $scope.setPagingData(data.result, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
            //            //for (var i = 0; i < $scope.listData.length; i++) {
            //            //    $scope.listData[i].toggle = false;
            //            //}
            //            //for(var i=0;i<$scope.listData.length;i++){
            //            //    $scope.listData[i].selected = false;
            //            //}
            //        }
            //    );
            //}
            $scope.pushFile = function (id) {
                var modalConfirm = $modal.open({
                    templateUrl: 'electronicFile/confirm.html',
                    controller: 'PushConfirmController',
                    resolve: {
                        id: function () {
                            return id;
                        }
                    }
                });
                modalInstance.result.then(function (text) {
                    console.log(text);
                })
            }
            //查询按钮点击事件
            $scope.queryFiles = function () {
                $scope.queryFlag = true;
                $scope.setPagingFilter($scope.queryText);
            }
            //$scope.pushFile = function (id) {
            //    ElectronicFileService.pushFile(id);
            //
            //}
            //通过指令来弹出控制框
            //$scope.pushToggle = function(index){
            //  if($scope.listData[index].toggle){
            //    $scope.listData[index].toggle = false;
            //  }else{
            //    $scope.listData[index].toggle = true;
            //  }
            //}
            ////全选
            //$scope.selectAll = function($event){
            //    var checkbox = $event.target;
            //    if(checkbox.checked){
            //        for(var i=0;i<$scope.listData.length;i++){
            //            $scope.listData[i].selected = true;
            //        }
            //    }else{
            //        for(var i=0;i<$scope.listData.length;i++){
            //            $scope.listData[i].selected = false;
            //        }
            //    }
            //}
            ////单选
            //$scope.setSelected = function($event,index){
            //    var checkbox = $event.target;
            //    if(checkbox.checked){
            //        $scope.listData[index].selected = true;
            //    }else{
            //        $scope.listData[index].selected = false;
            //    }
            //}
            ////将选好的上报条目上传服务器
            //$scope.push = function(){
            //    var selected = {};
            //    for(var i=0;i<$scope.listData.length;i++){
            //        if($scope.listData[i].selected = true){
            //            selected.push($scope.listData[i]);
            //        }
            //    }
            //    ElectronicFileService.getList($stateParams.category).then(
            //            function(data){
            //                $scope.listData = data;
            //            }
            //    );
            //}
        }
    ])
    //上报按钮弹出框controller
    .controller('PushConfirmController', ['$scope', '$modalInstance', 'id', 'ElectronicFileService',
        function ($scope, $modalInstance, id, ElectronicFileService) {
            $scope.id = id;
            $scope.confirm = function () {
                ElectronicFileService.pushFile(id);
                $modalInstance.close('上报成功');
                window.location.reload();
            }
        }])

    .controller('ElectronicFileModifyController', ['$scope', '$state', '$stateParams', 'ElectronicFileService', '$http',
        function ($scope, $state, $stateParams, ElectronicFileService, $http) {
            //分页
            $scope.paginationConf = {
                currentPage: 1,      //当前页，默认为1
                totalItems: 50,      //数据总数量，默认为50
                itemsPerPage: 7,   //默认当前页显示的数据数量
                pagesLength: 10,    //分页条的长度
                perPageOptions: [7, 14, 21],    //当前显示的数据可选数量
                onChange: function () {
                    $scope.setPagingFilter($scope.queryText);
                },
                dataCountDisplay: true,         //选择显示当前页显示的数据数量
                jumpOrNot: true           //是否选择跳转
            };
            //设置分页数据
            $scope.setPagingData = function (data, currentPage, itemsPerPage) {
                var pageData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
                $scope.listData = pageData;
                $scope.paginationConf.totalItems = data.length;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };
            $scope.setPagingFilter = function (text) {
                //查询按钮未点击
                if(!text){
                    ElectronicFileService.getList($stateParams.category).then(
                        function (data) {
                            $scope.setPagingData(data.result, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
                            //for(var i=0;i<$scope.listData.length;i++){
                            //    $scope.listData[i].selected = false;
                            //}
                        }
                    );
                }
                //查询按钮被点击且查询输入框不为空
                if($scope.queryFlag){
                    ElectronicFileService.queryPushFiles(text).then(
                        function (data) {
                            $scope.setPagingData(data.result, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
                        })
                }
            }
            //查询按钮点击事件
            $scope.queryFiles = function () {
                $scope.queryFlag = true;
                $scope.setPagingFilter($scope.queryText);
            }
        }
    ])
    .controller('ElectronicFileModifyOneController', ['$scope', '$state', '$modal', '$stateParams', 'ElectronicFileService','$http',
        function ($scope, $state, $modal, $stateParams, ElectronicFileService, $http) {
            //保存并上报
            $scope.saveAndPush = function (){
                //保存
                ElectronicFileService.saveModify($scope.oneData.ysdwmc, $scope.oneData.ssny, $scope.oneData.zflh, $scope.oneData.ms, $scope.oneData.id).then(
                    function(data){
                        if(data.success){
                            var modalInstance = $modal.open({
                                templateUrl: 'electronicFile/confirm.html',
                                controller: 'PushConfirmController',
                                resolve: {
                                    id: function () {
                                        return $scope.oneData.id;
                                    }
                                }
                            });
                            modalInstance.result.then(function (text) {
                                console.log(text);
                            })
                        }
                    }
                );
            }
            //保存修改文档
            $scope.saveModify = function () {
                ElectronicFileService.saveModify($scope.oneData.ysdwmc, $scope.oneData.ssny, $scope.oneData.zflh, $scope.oneData.ms, $scope.oneData.id).then(
                  function(data){
                    console.log("保存成功");
                  }
                );
            }
            //获得单个详细数据
            //console.log(456);
            ElectronicFileService.getOne($stateParams.id).then(
                function (data) {
                    //console.log(data);
                    //console.log(123);
                    $scope.oneData = data.result;
                    console.log($scope.oneData.id);
                    $scope.items = [];
                    console.log('查看');
                    $http.get('/rap/szcz/dagl/queryAttachment.do?daid='+$scope.oneData.id)
                        .success(function (data, status) {
                            angular.forEach(data.result, function (value, key) {
                                $scope.items.push({
                                    docId: value.id,
                                    cName: value.userDeptName,
                                    docName: value.label,
                                    docSize: value.fileSize,
                                    upTime: value.creationDate,
                                    upPerson: value.creator
                                });
                                $scope.$apply();
                            })
                        }).error(function (data) {
                            console.log(data);
                            console.log('查看出错！');
                        })
                    var uploader = WebUploader.create({
                        swf: '../scripts/controllers/Uploader.swf',
                        server: '/rap/szcz/dagl/qtDaSbFjSc.do',
                        //server:'',
                        pick: '#picker',
                        formData:{
                            daid:$scope.oneData.id,
                            fl : 1
                        },
                        accept:{
                            title: 'png,jpg,doc,pdf',
                            extensions: 'png,jpg,doc,pdf,docx',
                            mimeType: '*'
                        },
                        resize: false,
                        duplicate: true
                    });
                    // 当有文件被添加进队列的时候
                    uploader.on('fileQueued', function (file) {

                        $("#list").css('display', 'block').append('<label class="alert-info docInfo">' + file.name + '</label>');

                    });
                    $scope.upInfo = {};
                    /***************************上传前的表单验证***********************************/
                    $("#ctlBtn").click(function () {
                        //console.log(ElectronicFileService.getNowFormatDate());
                        if (uploader.getFiles().length) {
                            uploader.upload();
                        } else {
                            $('#list').css('display', 'block').html("<p class='alert-danger'>上传文件不能为空</p>").fadeOut(2300, function () {
                                $(this).text('');
                            });
                        }
                    });

                    /***************************重新上传失败附件*********************************/
                    $('#reupload').click(function(){
                        angular.forEach(uploader.getFiles('error'),function(item,i){
                            uploader.upload(item);
                        });
                    });
                    /***************************上传前发送的数据***********************************/
                        //$scope.items = [];
                    uploader.on('uploadBeforeSend', function (block, data, header) {
                        header.enctype = "multipart/form-data";
                    });
                    /***************************上传成功***********************************/

                    $scope.success = true;
                    uploader.on('uploadSuccess', function (file, res) {
                        console.log(res);
                        console.log(res.success);
                        console.log(res.successMsg);
                        $scope.items.push({
                            docId: res.successMsg,
                            cName: window.sessionStorage.getItem("dwmc"),
                            docName: file.name,
                            docSize: file.size,
                            upTime: ElectronicFileService.getNowFormatDate(),
                            upPerson: window.sessionStorage.getItem("fullname")
                        });
                        $scope.$apply();
                        $scope.success = $scope.success && res.success;
                        //console.log($scope.items.length);
                        //console.log($scope.items);
                    });
                    /*************************上传结束***************************************/
                    uploader.on('uploadFinished',function(){
                        if(!$scope.success){
                            $('#reupload').css('display','block');
                            $("#list").css('display','block').html("<p class='alert-success'>附件上传失败</p>").fadeOut(2300,function(){
                                $(this).text('');
                            });
                        }else{
                            $("#list").css('display','block').html("<p class='alert-success'>所有文件上传成功</p>").fadeOut(2300,function(){
                                $(this).text('');
                            });
                        }
                    });
                    /***************************删除附件***********************************/
                    $scope.delDoc = function (doc) {
                        $http.post('/rap/szcz/xxgl/xxts/deleteAttachment.do', {
                            id: doc,
                            creatorId: 1990200032
                        })
                            .success(function (data, status) {
                                if (data.success) {
                                    angular.forEach($scope.items, function (value, key) {
                                        if (value['docId'] == doc)
                                            $scope.items.splice(key, 1);
                                    });
                                } else {
                                    angular.forEach($scope.items, function (value, key) {
                                        if (value['docId'] == doc)
                                            $("#list").css('display', 'block').html("<p class='alert-success'>附件<b>[" + value['docName'] + "]</b>删除失败！</p>").fadeOut(2300, function () {
                                                $(this).text('');
                                            });
                                    });
                                }
                            }).error(function () {
                                angular.forEach($scope.items, function (value, key) {
                                    if (value['docId'] == doc)
                                        $("#list").css('display', 'block').html("<p class='alert-success'>附件<b>[" + value['docName'] + "]</b>删除失败！</p>").fadeOut(2300, function () {
                                            $(this).text('');
                                        });
                                });
                            });
                    };
                }
            );

        }])
    .controller('ElectronicFileShowOneController', ['$scope', '$state', '$stateParams', 'ElectronicFileService','$http',
        function ($scope, $state, $stateParams, ElectronicFileService, $http) {
            //获得单个详细数据
            ElectronicFileService.getOne($stateParams.id).then(
                function (data) {
                    $scope.oneData = data.result;
                    console.log($scope.oneData.id);
                    $scope.items = [];
                    console.log('查看');
                    $http.get('/rap/szcz/dagl/queryAttachment.do?daid='+$scope.oneData.id)
                        .success(function (data, status) {
                            angular.forEach(data.result, function (value, key) {
                                $scope.items.push({
                                    docId: value.id,
                                    cName: value.userDeptName,
                                    docName: value.label,
                                    docSize: value.fileSize,
                                    upTime: value.creationDate,
                                    upPerson: value.creator
                                });
                                $scope.$apply();
                            })
                        }).error(function (data) {
                            console.log(data);
                            console.log('查看出错！');
                        })
                }
            );

        }])
    .controller('addFileController', ['$scope', '$state', '$stateParams', 'ElectronicFileService', '$http',
        function ($scope, $state, $stateParams, ElectronicFileService, $http) {
            $scope.addFile = {};
            $scope.btn = {};
            $scope.saveAddFile = function () {
                $scope.fileData = {
                    ysdwmc: $scope.addFile.ysdwmc,
                    ssny: $scope.addFile.ssny,
                    zflh: $scope.addFile.zflh,
                    ms: $scope.addFile.ms
                };
                ElectronicFileService.sendAddFile($scope.addFile.ysdwmc, $scope.addFile.ssny, $scope.addFile.zflh, $scope.addFile.ms).then(
                    function (data) {
                        if (data.success) {
                            $state.go('electronic.modifyFile', {id: data.result});
                        }
                        //if (data.success) {
                        //    $scope.btn.switch = false;
                        //    $scope.btn.id = data.successMsg;
                        //} else {
                        //    $scope.btn.switch = true;
                        //}
                    }
                );
            }
            ///***************************上传组件初始化***********************************/
            //var uploader = WebUploader.create({
            //    swf: '../scripts/controllers/Uploader.swf',
            //    server: '/rap/szcz/dagl/qtDaSbFjSc.do',
            //    //server:'',
            //    pick: '#picker',
            //    formData:{
            //      daid:123,
            //        fl : 1
            //    },
            //    accept:{
            //        title: 'png,jpg,doc,pdf',
            //        extensions: 'png,jpg,doc,pdf,docx',
            //        mimeType: '*'
            //    },
            //    resize: false,
            //    duplicate: true
            //});
            //// 当有文件被添加进队列的时候
            //uploader.on('fileQueued', function (file) {
            //
            //    $("#list").css('display', 'block').append('<label class="alert-info docInfo">' + file.name + '</label>');
            //
            //});
            //$scope.upInfo = {};
            ///***************************上传前的表单验证***********************************/
            //$("#ctlBtn").click(function () {
            //    //console.log(ElectronicFileService.getNowFormatDate());
            //    if (uploader.getFiles().length) {
            //        uploader.upload();
            //    } else {
            //        $('#list').css('display', 'block').html("<p class='alert-danger'>上传文件不能为空</p>").fadeOut(2300, function () {
            //            $(this).text('');
            //        });
            //    }
            //});
            //
            ////$("#cBtn").click(function () {
            ////    console.log('查看');
            ////    $http.get('/rap/szcz/dagl/queryAttachment.do?daid=123')
            ////        .success(function (data, status) {
            ////            angular.forEach(data.result, function (value, key) {
            ////                $scope.items.push({
            ////                    docId: value.id,
            ////                    cName: value.userDeptName,
            ////                    docName: value.label,
            ////                    docSize: value.fileSize,
            ////                    upTime: value.creationDate,
            ////                    upPerson: value.creator
            ////                });
            ////                $scope.$apply();
            ////            })
            ////        }).error(function (data) {
            ////            console.log(data);
            ////            console.log('查看出错！');
            ////        })
            ////});
            ///***************************重新上传失败附件*********************************/
            //$('#reupload').click(function(){
            //    angular.forEach(uploader.getFiles('error'),function(item,i){
            //        uploader.upload(item);
            //    });
            //});
            ///***************************上传前发送的数据***********************************/
            //$scope.items = [];
            //uploader.on('uploadBeforeSend', function (block, data, header) {
            //    header.enctype = "multipart/form-data"
            //    //    var file = block.file;
            //    //
            //    //    data.fl = 1;
            //    //    data.daid = 123;//$scope.daId;
            //    //data.wjid = (new Date()).getTime();
            //    //$scope.docId = data.wjid;
            //    //data.name = file.name;
            //    //data.type = file.type;
            //    //data.size = file.size;
            //    //data.status = 1;
            //    //    delete data.key;
            //});
            ///***************************上传成功***********************************/
            //
            //$scope.success = true;
            //uploader.on('uploadSuccess', function (file, res) {
            //    console.log(res);
            //    console.log(res.success);
            //    console.log(res.successMsg);
            //    $scope.items.push({
            //        docId: res.successMsg,
            //        cName: '当前登录用户的单位',
            //        docName: file.name,
            //        docSize: file.size,
            //        upTime: ElectronicFileService.getNowFormatDate(),
            //        upPerson: '当前登录用户'
            //    });
            //    $scope.$apply();
            //    $scope.success = $scope.success && res.success;
            //    //console.log($scope.items.length);
            //    //console.log($scope.items);
            //});
            ///*************************上传结束***************************************/
            //uploader.on('uploadFinished',function(){
            //    if(!$scope.success){
            //        $('#reupload').css('display','block');
            //        $("#list").css('display','block').html("<p class='alert-success'>附件上传失败</p>").fadeOut(2300,function(){
            //            $(this).text('');
            //        });
            //    }else{
            //        $("#list").css('display','block').html("<p class='alert-success'>所有文件上传成功</p>").fadeOut(2300,function(){
            //            $(this).text('');
            //        });
            //    }
            //});
            ///***************************删除附件***********************************/
            //$scope.delDoc = function (doc) {
            //    $http.post('/rap/szcz/xxgl/xxts/deleteAttachment.do', {
            //        id: doc,
            //        creatorId: 1990200032
            //    })
            //        .success(function (data, status) {
            //            if (data.success) {
            //                angular.forEach($scope.items, function (value, key) {
            //                    if (value['docId'] == doc)
            //                        $scope.items.splice(key, 1);
            //                });
            //            } else {
            //                angular.forEach($scope.items, function (value, key) {
            //                    if (value['docId'] == doc)
            //                        $("#list").css('display', 'block').html("<p class='alert-success'>附件<b>[" + value['docName'] + "]</b>删除失败！</p>").fadeOut(2300, function () {
            //                            $(this).text('');
            //                        });
            //                });
            //            }
            //        }).error(function () {
            //            angular.forEach($scope.items, function (value, key) {
            //                if (value['docId'] == doc)
            //                    $("#list").css('display', 'block').html("<p class='alert-success'>附件<b>[" + value['docName'] + "]</b>删除失败！</p>").fadeOut(2300, function () {
            //                        $(this).text('');
            //                    });
            //            });
            //        });
            //};
        }])
    .controller('ElectronicCheckFileController', ['$scope', '$state', '$stateParams', 'ElectronicFileService',
        function ($scope, $state, $stateParams, ElectronicFileService) {
            //分页
            $scope.paginationConf = {
                currentPage: 1,      //当前页，默认为1
                totalItems: 50,      //数据总数量，默认为50
                itemsPerPage: 7,   //默认当前页显示的数据数量
                pagesLength: 10,    //分页条的长度
                perPageOptions: [7, 14, 21],    //当前显示的数据可选数量
                onChange: function () {
                    $scope.setPagingFilter($scope.queryText);
                },
                dataCountDisplay: true,         //选择显示当前页显示的数据数量
                jumpOrNot: true           //是否选择跳转
            };
            //设置分页数据
            $scope.setPagingData = function (data, currentPage, itemsPerPage) {
                var pageData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
                $scope.listData = pageData;
                $scope.paginationConf.totalItems = data.length;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };
            //根据传入的菜单选项标识category获取相应菜单列表数据
            $scope.setPagingFilter = function (text) {
                //查询按钮未点击
                if(!text){
                    ElectronicFileService.getList($stateParams.category).then(
                        function (data) {
                            $scope.setPagingData(data.result, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
                            //for(var i=0;i<$scope.listData.length;i++){
                            //    $scope.listData[i].selected = false;
                            //}
                        }
                    );
                }
                //查询按钮被点击且查询输入框不为空
                if($scope.queryFlag){
                    ElectronicFileService.queryFiles(text).then(
                        function (data) {
                            $scope.setPagingData(data.result, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
                        })
                }
            }
            //查询按钮点击事件
            $scope.queryFiles = function () {
                $scope.queryFlag = true;
                $scope.setPagingFilter($scope.queryText);
            }
        }])
