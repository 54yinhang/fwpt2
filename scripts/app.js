angular.module('FWPT', [
    'ui.bootstrap','ui.utils','ui.router','ngAnimate','pagination'
])

.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider,   $urlRouterProvider) {
    /* Add New States Above */
    //$urlRouterProvider.when('/:category', '/todoTask/:category')
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home',{
            url: '/home',
            templateUrl: 'portal/anonymous.html'
        })
        /* account */
        .state('account',{
            url:'/account',
            templateUrl: 'portal/account.html'
        })
        .state('account.todoTask', {
            url:'/todoTask',
            views: {
                '@': {
                    templateUrl: 'account/todoTask.html',
                    controller: 'TodoTaskController'
                    /*controller: ['$scope', '$stateParams', '$state',
                        function (  $scope,   $stateParams,   $state ) {
                            if($stateParams.category == "wdxx" || !$stateParams.category) {
                                $scope.taskInfos = [{lx:1,fqr:2,mc:3,zt:4,fqsj:5,jssj:6,cz:7,id:'查看'},{lx:1,fqr:2,mc:3,zt:4,fqsj:5,jssj:6,cz:7,id:'查看'}]
                            } else {
                                $scope.taskInfos = [{lx:1,fqr:2,mc:3,zt:4,fqsj:5,jssj:6,cz:7,id:'查看'}]
                            }
                        }]*/
                }
            }
        })
        .state('account.todoTask.list', {
            url:'/:category',
            views: {
                '': {
                    templateUrl: 'account/todoTaskList.html',
                    controller: 'TodoTaskController'
                    /*controller: ['$scope', '$stateParams', '$state',
                        function (  $scope,   $stateParams,   $state ) {
                            if($stateParams.category == "wdxx" || !$stateParams.category) {
                                $scope.taskInfos = [{lx:1,fqr:2,mc:3,zt:4,fqsj:5,jssj:6,cz:7,id:'查看'},{lx:1,fqr:2,mc:3,zt:4,fqsj:5,jssj:6,cz:7,id:'查看'}]
                            } else {
                                $scope.taskInfos = [{lx:1,fqr:2,mc:3,zt:4,fqsj:5,jssj:6,cz:7,id:'查看'}]
                            }
                        }]*/
                }
            }
        })
        //.state('todoTask.detail')
        /* account */


        .state('archives',{
            url: '/archives',
            templateUrl: 'portal/anonymous.html'
        })
        .state('fillReport',{
            url: '/fillReport',
            templateUrl: 'portal/anonymous.html'
        })
        .state('report',{
            url: '/report',
            templateUrl: 'portal/anonymous.html'
        })
        .state('about',{
            url: '/about',
            templateUrl: 'portal/anonymous.html'
        })
}])
.run(function($rootScope, config, $state, $stateParams) {
    //全局配置常量使用
    $rootScope.config = config;
    //全局可访问路由
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
