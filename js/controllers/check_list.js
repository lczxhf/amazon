app.controller('check_list', ['$scope','az','tips',function($scope,az,tips) {
  az.check_list({
      token:getCookie('token'),
      page:1,
      per_page:50
  },function(data){
      $scope.data = data.data;
      $scope.token = getCookie('token')
      for (var i = 0; i < $scope.data.length; i++) {
        $scope.data[i].done_time = 0
        var relations = $scope.data[i].check_with_takopet_relations
        for (var j = 0; j < relations.length; j++) {
           if(relations[j].task_operate_relation.status == 3){
             $scope.data[i].done_time++
           }
        }

      }
  });
  $scope.host = HOST
  $scope.getStatus = function(status){
    switch (status) {
      case 1:
        return "正在排队"
      case 2:
        return "正在执行"
      case 3:
        return "已完成"
      default:
        return "未知"
    }
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
