/**
 * Created by mac on 2016/10/4.
 */
app.controller('AddClassfy', ['$scope','az','tips', function($scope,az,tips) {
    $scope.add = function(){
        az.addcategories({
            token:getCookie('token'),
            name:$scope.name,
            parent_id:$scope.parent_id
        },function(data){
            console.log(data);
            if(data.code=='200'){
                tips.blackTips({
                    text: '分类添加成功',
                    divTop:50
                });
            }else if(data.code=='400'||data.message=="Name 该分类已经存在"){
                tips.blackTips({
                    text: '该分类已存在',
                    divTop:50
                });
            }else{
                tips.blackTips({
                    text: '分类添加失败',
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