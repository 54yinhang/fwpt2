angular.module('FWPT')
    .controller('InformController',['$scope','InformService', function($scope,InformService) {
            $scope.informTops = InformService.getInformTops().then(function(data){
                $scope.informTops = data;
                //置顶处的消息<4个时，隐藏“+查看更多”：
                if($scope.informTops.length>=4){
                    $scope.loadMore=true;
                }else{
                    $scope.loadMore=false;
                }
                //无置顶消息时，显示结果判断如下：
                $scope.noThing=true;
                if($scope.informTops.length<1){
                    $scope.noThing=false;
                }else{
                    $scope.noThing=true;
                }
            });
    }]).controller('informDetailCtrl',['$scope','InformListService',function($scope,InformListService){
            $scope.informList=InformListService.getInformList().then(function(data){
                $scope.informList=data;
            })

    }]).controller('DetailCtrl',['$scope','InformDetailService',function($scope,InformDetailService){
        $scope.InformDetail=InformDetailService.getInformDetails().then(function(data){
            $scope.InformDetail=data;
        })
    }]).controller('ListInformCtrl',['$scope','InformListService',function($scope,InformListService){
        $scope.informList=InformListService.getInformList().then(function(data){
            $scope.informList=data;
        })
        //通知公告分页
        $scope.paginationConf = {
            currentPage: 1,      //当前页，默认为1
            totalItems: 50,      //数据总数量，默认为50
            itemsPerPage: 10,   //默认当前页显示的数据数量
            pagesLength: 10,    //分页条的长度
            perPageOptions: [10, 20, 30],    //当前显示的数据可选数量
            onChange: function(){
                $scope.setPagingFilter();
            },
            dataCountDisplay:true,         //选择显示当前页显示的数据数量
            jumpOrNot:true           //是否选择跳转
        };
        //设置分页数据
        $scope.setPagingData = function(data, currentPage, itemsPerPage){
            var pageData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
            $scope.informList = pageData;
            $scope.paginationConf.totalItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        //当前页显示数量改变时
        $scope.setPagingFilter = function(){
            InformListService.getInformList().then(function(objMsg){
                $scope.setPagingData(objMsg, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
            });
        };
        /*通知公告分页结束*/
    }])
