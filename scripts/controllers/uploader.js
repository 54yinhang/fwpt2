/**
 * Created by ww on 2016/2/23.
 */
angular.module('FWPT')
    .controller('docList',['$scope','$http',function($scope,$http){
        /****************************************************************/
        var uploader = WebUploader.create({
            swf: 'Uploader.swf',
            server: 'server.php',
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
        $("#ctlBtn").click(function(){
            if($scope.upInfo.cName&&$scope.upInfo.year&&$scope.upInfo.payNum){
                uploader.upload();
            }else{
                if(!$scope.upInfo.cName){
                    $('#list').css('display','block').html("<p class='alert-danger'>单位名称为必填项</p>").fadeOut(2300,function(){
                        $(this).text('');
                    });
                }else if(!$scope.upInfo.year){
                    $('#list').css('display','block').html("<p class='alert-danger'>年度为必填项</p>").fadeOut(2300,function(){
                        $(this).text('');
                    });
                }else{
                    $('#list').css('display','block').html("<p class='alert-danger'>支付令号为必填项</p>").fadeOut(2300,function(){
                        $(this).text('');
                    });
                }
            }
        });
        $('#reupload').click(function(){
            //console.log(uploader.getFiles('error'));
            $.each(uploader.getFiles('error'),function(i,item){
                uploader.upload(item);
                //$( '#'+item.id ).find('.progress').fadeIn();
            });
        });
        $scope.items = [];
        uploader.on('uploadBeforeSend',function(block, data){

            data.docId = (new Date()).getTime();
            $scope.docId = data.docId;
            data.cName = $scope.upInfo.cName;
            data.year = $scope.upInfo.year;
            data.payNum = $scope.upInfo.payNum;
        });

        uploader.on( 'uploadSuccess', function( file, res ) {
            if(res){
                console.log($scope.upInfo);
                $scope.items.push({
                    docId:$scope.docId,
                    cName:$scope.upInfo.cName,
                    docSize:file.size
                });
                $scope.$apply();
                console.log($scope.items.length);
                console.log($scope.items);
            }


        });
        /****************************************************************/
        uploader.on('uploadFinished',function(){
            if(uploader.getFiles('error')==[]){
                $('#reupload').css('display','block');
            }else{
                $("#list").css('display','block').html("<p class='alert-success'>所有文件上传成功</p>").fadeOut(2300,function(){
                    $(this).text('');
                });
            }
        });
        $scope.delDoc = function(doc){
            var transform = function(data){
                return $.param(data);
            };
            $http.post('del.php',{docId:doc},{
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform
            }).success(function(data,status){
                angular.forEach($scope.items, function(value, key){
                    if(value['docId'] == doc)
                        $scope.items.splice(key, 1);
                });
            }).error(function(){
                console.log('文件'+doc+'删除失败！');
            });
        };
    }])