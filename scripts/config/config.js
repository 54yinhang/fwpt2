/**
 * Created by Administrator on 2016/02/16.
 */
'use strict';
var myapp=angular.module('FWPT');
myapp.config(function($httpProvider){
    $httpProvider.defaults.transformRequest = function(obj){
        var str = [];
        for(var p in obj){
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    }

    $httpProvider.defaults.headers.post = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

});
//angular传参不一样，重写传参，支持跨域
myapp.constant('config',{
    appinfo: {
        title : '温州数字财政服务平台',
        support : '@ifugle.com',
        recordUrl : 'http://www.miitbeian.gov.cn/',
        recordStr : '浙IPC888888888号-8',
        copyright : '版权所有：温州市财政局'
    }
})