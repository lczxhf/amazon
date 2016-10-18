angular.module('app')
  .directive('setNgAnimate', ['$animate', function ($animate) {
    return {
        link: function ($scope, $element, $attrs) {
            $scope.$watch( function() {
                return $scope.$eval($attrs.setNgAnimate, $scope);
            }, function(valnew, valold){
                $animate.enabled(!!valnew, $element);
            });
        }
    };
  }])
    .directive('checkboxchange',function(){
        return{
            restrict:'A',
            link:function(scope,Element,attr){
                Element.bind('click',function(){
                    console.log(scope.title)
                    var data = scope.title;
                    if(data == false){
                        checkTrue();
                    }else{
                        checkFalse();
                    }
                })
                function checkTrue(){
                    Element.attr('src','img/check2.png');
                }

                function checkFalse(){
                    Element.attr('src','img/check1.png');
                }
            }
        }
    })