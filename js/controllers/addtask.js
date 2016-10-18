/**
 * Created by mac on 2016/10/4.
 */
app.controller('addtask', ['$scope','az','tips',function($scope,az,tips) {


    $scope.is_register = function(data){
        $scope.is_register_num = data;
    }
    $scope.is_disguise = function(data){
        $scope.is_disguise_num = data;
    }
    $scope.is_add_cart = function(data){
        $scope.is_add_cart_num = data;
    }
    $scope.is_add_wishlist = function(data){
        $scope.is_add_wishlist_num = data;
    }
    $scope.is_click_advert = function(data){
        $scope.is_click_advert = data;
    }
    $scope.add = function(){
        az.addtask({
            token:getCookie('token'),
            product_id:$scope.product_id,
            category_id:$scope.category_id,
            key:$scope.key,
            operate_times:$scope.operate_times,
            is_register:$scope.is_register_num,
            is_disguise:$scope.is_disguise_num,
            is_add_cart:$scope.is_add_cart_num,
            is_add_wishlist:$scope.is_add_wishlist_num,
            max_page:$scope.max_page,
            start_page:$scope.start_page,
            remark:$scope.remark,
            is_click_advert:$scope.is_click_advert
        },function(data){
            if(data.code=='200'){
                tips.blackTips({
                    text: '任务添加成功',
                    divTop:50
                });
            }else if(data.code=='400'||data.message=='Row 2: Key has already been taken'){
                tips.blackTips({
                    text: '任务信息重复',
                    divTop:50
                });
            }else if (data.error=="category_id is invalid"){
                tips.blackTips({
                    text: '分类ID信息填写错误',
                    divTop:50
                });
            }else if(data.error=="category_id is invalid, operate_times is invalid"){
                tips.blackTips({
                    text: '分类ID信息填写错误，执行时间格式错误',
                    divTop:50
                });
            }else if(data.error='operate_times is invalid'){
                tips.blackTips({
                    text: '执行时间格式错误',
                    divTop:50
                });
            }else if(data.error="Product must exist && Category must exist"){
                tips.blackTips({
                    text: '商品和分类不存在',
                    divTop:50
                });
            }else{
                tips.blackTips({
                    text: '任务添加失败',
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
