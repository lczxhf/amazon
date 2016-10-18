/**
 * Created by mac on 2016/10/4.
 */
app.controller('AddproductList', ['$scope','az','tips', function($scope,az,tips) {
    $scope.add = function(){
        az.AddproductList({
            token:getCookie('token'),
            asin:$scope.asin,
            alias_name:$scope.alias_name,
            brand:$scope.brand
        },function(data){
            if(data.code=='200'){
                tips.blackTips({
                    text: '商品添加成功',
                    divTop:50
                });
            }else if(data.code=='400'||data.message=='Asin 该商品asin已经存在'){
                tips.blackTips({
                    text: 'Asin 该商品asin已经存在',
                    divTop:50
                });
            }else{
                tips.blackTips({
                    text: '商品添加失败',
                    divTop:50
                });
            }
        })
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
}]);