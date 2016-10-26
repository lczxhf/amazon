/**
 * Created by mac on 2016/10/4.
 */
app.controller('task', ['$scope','$http','az', '$compile','Request', 'tips','az',function($scope,$http,az,$compile,Request,tips,az) {
  if(localStorage.taskList){
    $scope.dataes = JSON.parse(localStorage.taskList)
    $scope.itemID = []
    $scope.product_selected = localStorage.select_product_id
    for(var i=0;i< $scope.dataes.length;i++){
        $scope.itemID.push( $scope.dataes[i].id);
    }
  }else{
    az.task({
        token:getCookie('token'),
        page:1,
        per_page:10000
    },function(data){
        $scope.dataes = data.data;
        $scope.itemID = [];
        $scope.product_selected = 0
        for(var i=0;i< data.data.length;i++){
            $scope.itemID.push( data.data[i].id);
        }
    });
  }
    az.productList({
        token:getCookie('token'),
        page:1,
        per_page:10000
    },function(data){
        $scope.products = data.data
        $scope.products.unshift({id:0,alias_name:"全部商品"})
    });

    var  check_num = $scope.check_num = [];
    $scope.click_box = function(item,check_num){
        var idx = check_num.indexOf(item.id);
        if (idx > -1) {
            check_num.splice(idx, 1);
            $scope.title = false;
        }
        else {
            check_num.push(item.id);
            $scope.title = true;
        }
        console.log($scope.check_num)
    }


    $scope.exists = function (item, check_num) {
        return check_num.indexOf(item.id) > -1;
    };
    //全選
    $scope.toggleAll = function() {
        if ($scope.check_num.length === $scope.dataes.length) {
            $scope.check_num = [];
            $('.Allcheckbox').attr('src','img/check1.png')

        } else if ($scope.check_num.length === 0 || $scope.check_num.length > 0) {
            $scope.check_num = $scope.itemID.slice(0);
            $('.Allcheckbox').attr('src','img/check2.png')
        }
        console.log($scope.check_num)
    };


    //批量任务检测
    $scope.batch_exec = function(){
        az.batch_exec({
            token:getCookie('token'),
            task_ids:$scope.check_num
        },function(data){
            if(data.code == '200'){
                tips.blackTips({
                    text: '任务批量检测成功',
                    divTop:50
                });
            }else{
                tips.blackTips({
                    text: '任务批量检测失败',
                    divTop:50
                });
            }
        })
    }

    $scope.selectModel = 0
    $scope.product_change = function(){
      console.log($scope.selectModel)
      if($scope.selectModel == 0){
        localStorage.removeItem("taskList")
        localStorage.removeItem("select_product_id")
        window.location.reload()
      }else{
        az.taskList_by_product({
            token:getCookie('token'),
            id:$scope.selectModel
        },function(data){
          if(data.code == '200'){
            tips.blackTips({
                text: '请求成功',
                divTop:50
            });
              localStorage.taskList = JSON.stringify(data.data)
              localStorage.select_product_id = $scope.selectModel
              window.location.reload()
          }else{
              tips.blackTips({
                  text: '请求失败',
                  divTop:50
              });
          }
        })
      }
    }

    $scope.show_edit_box = function(id,index){
      document.getElementsByClassName("btn-edit")[0].setAttribute("data-id",id)
      document.getElementsByClassName("btn-edit")[0].setAttribute("data-index",index)
      document.getElementsByClassName("task-edit")[0].style.display = "block"
      document.getElementById("start_page").value = ""
      document.getElementById("operate_times").value = ""
    }

    $scope.save_edit = function(){
      var id = document.getElementsByClassName("btn-edit")[0].getAttribute("data-id")
      var start_page = document.getElementById("start_page").value
      var operate_times = document.getElementById("operate_times").value
      var index = document.getElementsByClassName("btn-edit")[0].getAttribute("data-index")
      var params =  {}
      if(start_page> 0){
        params.start_page = start_page
      }
      if(operate_times>0){
        params.operate_times = operate_times
      }
      az.edit_task(Object.assign({
          token:getCookie('token'),
          id:id
      },params),function(data){
          if(data.code == '200'){
              document.getElementsByClassName("task-edit")[0].style.display = "none"
              var tr = document.getElementsByClassName("task-tr")[index]
              tr.childNodes[9].innerHTML = operate_times
              tr.childNodes[23].innerHTML = start_page
              localStorage.removeItem("taskList")
              tips.blackTips({
                  text: '修改成功',
                  divTop:50
              });
          }else{
              tips.blackTips({
                  text: '修改失败',
                  divTop:50
              });
          }
      })
    }

    $scope.show_operate_ul = function(index,event){
        var ul = document.getElementsByClassName("operate-ul")[index]
        if(ul.style.display == "block"){
          ul.style.display = "none"
          event.stopPropagation();
          document.body.removeEventListener("click",$scope.methods_addr)
        }else{
          var all_ul = document.getElementsByClassName("operate-ul")
          for (var i = 0; i < all_ul.length; i++) {
            all_ul[i].style.display = "none"
          }
          ul.style.display = "block"
          event.stopPropagation();
          $scope.methods_addr = $scope.show_operate_ul.bind(null,index,event)
          document.body.addEventListener("click",$scope.methods_addr)
        }

    }

    $scope.delete_task = function(id,index){
      if(confirm("是否确定要删除任务")){
      az.delete_task({
        token:getCookie('token'),
        id:id
      },function(data){
          if(data.code == '200'){
              var tr = document.getElementsByClassName("task-tr")[index]
              tr.style.display = "none"
              localStorage.removeItem("taskList")
              tips.blackTips({
                  text: '删除成功',
                  divTop:50
              });
          }else{
              tips.blackTips({
                  text: '删除失败',
                  divTop:50
              });
          }
      })
    }
  }
    //单个任务 检测
    $scope.check_exec = function(num){
        az.check_exec({
            token:getCookie('token'),
            task_id:num
        },function(data){
            console.log(data);
            if(data.code == '200'){
                tips.blackTips({
                    text: '任务检测成功',
                    divTop:50
                });
             }else{
                tips.blackTips({
                    text: '任务检测失败',
                    divTop:50
                });
            }
        })
    }

    $scope.show_detail = function(id){
      az.get_operates({
          token:getCookie('token'),
          id:id
      },function(data){
          console.log(data);
          if(data.code == '200'){
              tips.blackTips({
                  text: '请求成功',
                  divTop:50
              });
              $scope.task_operate_relations = data.data.task_operate_relations
              document.getElementsByClassName("tasklist-detail-box")[0].style.display = "block";
          }else{
              tips.blackTips({
                  text: '请求失败',
                  divTop:50
              });
          }

      })
    }

    $scope.hideBox = function(name){
      document.getElementsByClassName(name)[0].style.display = "none";
    };

    $scope.show_operate = function(index){
      var box = document.getElementsByClassName("tasklist-operate-box")[0]
      box.style.display = "block";
      // box.style.height = document.getElementsByClassName("tasklist-detail-box")[0].clientHeight+"px"

      $scope.operates = $scope.task_operate_relations[index].operates
    }

    $scope.clickUpload = function(){
        console.log(124);
            var fd = new FormData($(".J-sandbox")[0]);
            fd.append('token',getCookie('token'))
            // fd.append("task[file]", $("#image_file").get(0).files[0]);
            // setProgress(progress, 0, "开始上传");
            // setProgress(progress, 50, "50%");
            // console.log(fd);
        Request.postfile(fd,"/v1/tasks/batch_upload").then(function(data){
            if(data.code=='200'){
                tips.blackTips({
                    text: '批量任务添加成功',
                    divTop:50
                });
            }else if(data.code=='400'||data.message=='Row 2: Key has already been taken'){
                tips.blackTips({
                    text: '批量上传任务信息重复',
                    divTop:50
                });
            }else {
                tips.blackTips({
                    text: '批量任务添加失败',
                    divTop:50
                });
            }
        });

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

    $scope.execute = function(data){
      if(confirm("是否确定要执行任务")){
        az.execute({
            token:getCookie('token'),
            task_id:data
        },function(data){
            console.log(data);
            if(data.code == '200'){
                tips.blackTips({
                    text: '任务执行成功',
                    divTop:50
                });
            }else{
                tips.blackTips({
                    text: '任务执行失败',
                    divTop:50
                });
            }
        })
      }
    }
    //数据重置
    $scope.resert = function(data,msg){ //数据重置
        if (data.data==undefined) {
            $(".xuanzheyaoping_info").remove();
            $scope.registeredList = null;
            $(".registereseach_main .mk-table-default tbody").remove();
            var font = msg;
            var wrap = '<div class="xuanzheyaoping_info">' + font + '</div>';
            $(".registereseach_main").append(wrap);
        } else {
            $(".xuanzheyaoping_info").remove();
            $scope.registeredList = data.data.Entity;
            $scope.totalcount = data.data.TotalCount;
            $scope.totalpage = data.data.TotalPage;
        }
    };

    ////滚动加载
    $scope.pageindex = 1;
    var $scrollEle = $('#registereseach_wrap');
    var isLoading = false;
    var preTop = 0;
    $scrollEle.on('scroll',function(){
        var top = $scrollEle.scrollTop();
        console.log(top);
        if(isLoading||preTop>top){
            preTop = top;
            return false;
        }

        var scrollheight = $scrollEle[0].scrollHeight;
        var height = $scrollEle.outerHeight();
        console.log(height);
        console.log(scrollheight);
        if ( scrollheight <= (top + height+2)) {
            isLoading = true;
            preTop = top;
            $scope.pageindex++;

            az.productList({
                page: $scope.pageindex,
                per_page: 20
            }, function (data) {
                var dates = data.data;
                console.log(dates);
                if (dates != undefined) {
                    for (var i = 0; i < dates.length; i++) {
                        var ul = '<tr>';
                        var li1 = '<td >' + dates[i].id + '</td>';
                        var li2 = '<td >' + dates[i].asin + '</td>';
                        var li3 = '<td  title=' + dates[i].HZXM + '>' + dates[i].alias_name + "</td>";
                        var li4 = '<td class="xz-lenght97">' + dates[i].brand + "</td>";
                        var li5 = '<td class="xz-lenght97">' + dates[i].created_at + "</td>";
                        var ulend = "</tr>"
                        str = ul + li1 + li2 + li3 + li4 + li5 + ulend;
                        $(".registereseach_main table tbody").append($compile(str)($scope));


                        //var Wheight = $('#registereseach_wrap')[0].scrollHeight;
                        //var h = $('#registereseach_wrap').outerHeight();
                        //console.log(Wheight,h);
                        //if(Wheight > h){
                        //    $('.comeback').css('display','block')
                        //}else{
                        //    $('.comeback').css('display','none')
                        //
                        //}
                    }
                } else {
                    $scope.resert(data, "暂无产品信息");

                }
            });
        };
    });
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

}]);
//angular.module('app.directives', []).directive('checkboxchange',function(){
//    return{
//        restrict:'A',
//        link:function(scope,Element,attr){
//            console.log('fuck');
//            //var name = $(Element.children()[0]).attr('name');
//            //var data = $(Element.children()[0]).attr('data');
//            //scope.initCheckbox[name] = function(){
//            //    if(data == 'true'){
//            //        checkTrue();
//            //
//            //    }else{
//            //        checkFalse();
//            //    }
//            //};
//            //Element.bind('click',function(){
//            //    var data = $(Element.children()[0]).attr('data');
//            //    var val = attr.num;
//            //    if(data == 'false'){
//            //        checkTrue();
//            //    }else{
//            //        checkFalse();
//            //    }
//            //})
//            //function checkTrue(){
//            //    Element.children()[0].src = "images/home_checkbox2.png";
//            //    $(Element.children()[0]).attr('data','true');
//            //}
//            //
//            //function checkFalse(){
//            //    Element.children()[0].src = "images/home_checkbox1.png";
//            //    $(Element.children()[0]).attr('data','false');
//            //}
//        }
//    }
//})
