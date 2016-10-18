/**
 * Created by mac on 2016/10/4.
 */
app.controller('productList', ['$scope','$http','az', '$compile',function($scope,$http,az,$compile) {
        az.productList({
            token:getCookie('token'),
            page:1,
        per_page:10000
        },function(data){
            $scope.data = data.data;
            // if(dates!=undefined){
            // }else{
            //     $scope.resert(data,"暂无产品信息");
            //
            // }
        });
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

   //数据重置
   // $scope.resert = function(data,msg){ //数据重置
   //    if (data.data==undefined) {
   //       $(".xuanzheyaoping_info").remove();
   //       $scope.registeredList = null;
   //       $(".registereseach_main .mk-table-default tbody").remove();
   //       var font = msg;
   //       var wrap = '<div class="xuanzheyaoping_info">' + font + '</div>';
   //       $(".registereseach_main").append(wrap);
   //    } else {
   //       $(".xuanzheyaoping_info").remove();
   //       $scope.registeredList = data.data.Entity;
   //       $scope.totalcount = data.data.TotalCount;
   //       $scope.totalpage = data.data.TotalPage;
   //    }
   // };

   ////滚动加载
   //  $scope.pageindex = 1;
   // var $scrollEle = $('#registereseach_wrap');
   // var isLoading = false;
   // var preTop = 0;
   // $scrollEle.on('scroll',function(){
   //    var top = $scrollEle.scrollTop();
   //     console.log(top);
   //    if(isLoading||preTop>top){
   //       preTop = top;
   //       return false;
   //    }
   //
   //    var scrollheight = $scrollEle[0].scrollHeight;
   //    var height = $scrollEle.outerHeight();
   //     console.log(height);
   //     console.log(scrollheight);
   //    if ( scrollheight <= (top + height+2)) {
   //        isLoading = true;
   //        preTop = top;
   //        $scope.pageindex++;
   //
   //        az.productList({
   //            page: $scope.pageindex,
   //            per_page: 20
   //        }, function (data) {
   //            $scope.data = data.data;
   //            console.log(dates);
   //            if (dates != undefined) {
                  // for (var i = 0; i < dates.length; i++) {
                  //     var ul = '<tr>';
                  //     var li1 = '<td >' + dates[i].id + '</td>';
                  //     var li2 = '<td >' + dates[i].asin + '</td>';
                  //     var li3 = '<td  title=' + dates[i].HZXM + '>' + dates[i].alias_name + "</td>";
                  //     var li4 = '<td class="xz-lenght97">' + dates[i].brand + "</td>";
                  //     var li5 = '<td class="xz-lenght97">' + dates[i].created_at + "</td>";
                  //     var ulend = "</tr>"
                  //     str = ul + li1 + li2 + li3 + li4 + li5 + ulend;
                  //     $(".registereseach_main table tbody").append($compile(str)($scope));


                      //var Wheight = $('#registereseach_wrap')[0].scrollHeight;
                      //var h = $('#registereseach_wrap').outerHeight();
                      //console.log(Wheight,h);
                      //if(Wheight > h){
                      //    $('.comeback').css('display','block')
                      //}else{
                      //    $('.comeback').css('display','none')
                      //
                      //}
                  // }
//               } else {
//                   $scope.resert(data, "暂无产品信息");
//
//               }
//           });
//       };
// });
   //
   //
   ////返回顶部
   //$scope.top = function(){
   //   $("#registereseach_wrap").animate({scrollTop:0}, 200);
   //}
   ////去到底部
   //$scope.bottom = function(){
   //   var h = $('#registereseach_wrap table').height();
   //   console.log(h);
   //   $('#registereseach_wrap').animate({scrollTop:h}, 200);
   //}


    // $scope.data = data;
    // $scope.content =  data[0];
    //
    //
    // $scope.list = function(num){
    //     $scope.content=$scope.data[num];
    // }
    //
    // ng-repeat = "name in data"
    // ng-repeat="list in content"



}]);