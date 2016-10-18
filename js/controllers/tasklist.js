/**
 * Created by Administrator on 2016/10/11.
 */
app.controller('taskRelations', ['$scope','$http','az', '$compile','Request', 'tips','$stateParams',function($scope,$http,az,$compile,Request,tips,$stateParams) {
    az.taskRelations({
        token:getCookie('token'),
        page:1,
        per_page:1000
    },function(data){
        $scope.data = data.data;
         $scope.content =  data.data[$stateParams.index];
         $scope.list = function(num){
             $scope.content=$scope.data[num];
         };
        //
        // ng-repeat = "name in data"
        // ng-repeat="list in content"
        $scope.hideBox = function(name){
          document.getElementsByClassName(name)[0].style.display = "none";
        };
        $scope.show_detail = function(index){
          document.getElementsByClassName("tasklist-detail-box")[0].style.display = "block";
          $scope.task_operate_relations = $scope.content.tasks[index].task_operate_relations
        }

        $scope.show_operate = function(index){
          var box = document.getElementsByClassName("tasklist-operate-box")[0]
          box.style.display = "block";
          box.style.height = document.getElementsByClassName("tasklist-detail-box")[0].clientHeight+"px"

          $scope.operates = $scope.task_operate_relations[index].operates
        }

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


}])
