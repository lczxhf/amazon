/**
 * Created by Administrator on 2016/10/10.
 */
app.controller('login', ['$scope','$http','az', '$compile','$location',function($scope,$http,az,$compile,$location) {
        // $scope.name = 'wells@amazon.com';
        // $scope.password = 'amazon';
    $scope.name = null;
    $scope.password = null;
        $scope.login = function(){
        az.login({
            username:$scope.name,
            password:$scope.password
        },function(data){
            if(data.code == '401'){
                $scope.msg = '用户名或密码错误';
            }else{
                Setcookie ('token',data.token );

            }
        })
    }

    function Setcookie (name, value) {
        //设置名称为name,值为value的Cookie
        var expdate = new Date();  
        var expireDays=30; //初始化时间
        expdate.setTime(expdate.getTime() +expireDays*24*3600*1000);   //时间
        document.cookie = name+"="+value+";expires="+expdate.toGMTString()+";path=/";

        $location.path('/app/dashboard-v1');
        //即document.cookie= name+"="+value+";path=/";   时间可以不要，但路径(path)必须要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！~
    }

    function getCookie(c_name)
    {
        if (document.cookie.length>0)
        {
            c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1)
            {
                c_start=c_start + c_name.length+1
                c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
    }

}])