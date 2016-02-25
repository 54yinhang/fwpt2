angular.module('FWPT', [
    'ui.bootstrap','ui.utils','ui.router','ngAnimate'
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
                }
            }
        })
        .state('account.todoTask.list', {
            url:'/:category',
            views: {
                '': {
                    templateUrl: 'account/todoTaskList.html',
                    controller: 'TodoTaskController'
                }
            }
        })
        .state('account.todoTask.list.detail',
        {
            url:'/:id',
            views:{
                '@account.todoTask':{
                    //templateUrl: 'account/record-check-detail.html',
                    templateUrl:function($routeParams){
                        console.log($routeParams.category);
                        if($routeParams.category="wdxx"){//根据不同的参数跳转不同的界面
                            return  'account/messageForm.html';

                        }else{
                            return 'account/record-check-detail.html';
                        }
                    },
                    controller: 'TodoTaskController'
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
            templateUrl: 'report/list.html',
            controller: 'FillReportController'
        })
        .state('report',{
            url: '/report',
            templateUrl: 'portal/anonymous.html'
        })
        .state('about',{
            url: '/about',
            templateUrl: 'portal/anonymous.html'
        })



        /* electronicFile*/
        .state('electronic',{
            url:'/electronic:category',
            views: {
                '': {
                    templateUrl:'electronicFile/menu.html',
                    controller:'ElectronicFileMenuController'
                },
                'list@electronic':{
                    templateUrl:'electronicFile/list.html',
                    controller:'ElectronicFileController'
                }
            }
        })
        .state('electronic.modifyList',{
            url:'/modifyList:category',
            views:{
                'list':{
                    templateUrl:'electronicFile/modifyList.html',
                    controller:'ElectronicFileModifyController'
                }
            }
        })
        .state('electronic.unpushList',{
            url:'/unpushList:category',
            views:{
                'list':{
                    templateUrl:'electronicFile/unpushList.html',
                    controller:'ElectronicFilePushController'
                }
            }
        })
        .state('electronic.allList',{
            url:'/allList:category',
            views:{
                'list':{
                    templateUrl:'electronicFile/allList.html',
                    controller:'ElectronicCheckFileController'
                }
            }
        })
        .state('electronic.getFile',{
            url:'/getFile:id',
            views:{
                'list':{
                    templateUrl:'electronicFile/getFile.html',
                    controller:'ElectronicFileShowOneController'
                }
            }
        })
        .state('electronic.addFile',{
            url:'/addFile',
            views:{
                'list':{
                    templateUrl:'electronicFile/addFile.html',
                    controller:'addFileController'
                }
            }
        })
        .state('electronic.modifyFile',{
            url:'/modifyFile:id',
            views:{
                'list':{
                    templateUrl:'electronicFile/modifyFile.html',
                    controller:'ElectronicFileModifyOneController'
                }
            }
        })
        /* electronicFile*/

        /*knowledgeData*/
        .state('list',{
            url:'/list/:state',
            templateUrl:'knowledgeData/list.html'
        })
        .state('knowledgeDetail',{
            url:'/knowledgeDetail',
            views:{
                '@':{
                    templateUrl: 'knowledgeData/knowledgeDetail.html',
                    controller:'KnowDetailCtrl'
                }
            }
        })
        .state('knowledgeDetail.detail',{
            url:'/detail:xxid',
            views:{
                'detail':{
                    templateUrl:'knowledgeData/knowledgeContent.html',
                    controller:'ContentCtrl'
                }
            }
        })
        /*knowledgeData*/
        /*inform_notice*/
        .state('informDetail',{
            url:'/informDetail',
            views: {
                '@': {
                    templateUrl:'inform/inform.html',
                    controller:'informDetailCtrl'
                }
            }
        })
        .state('informDetail.detail',{
            url:'/:listId',
            views:{
                'Detail':{
                    templateUrl:'inform/informDetail.html' ,
                    controller:'DetailCtrl'
                }
            }
        })
        /*inform_notice*/
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
