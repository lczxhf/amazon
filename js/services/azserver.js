/**
 * Created by mac on 2016/10/6.
 */
angular.module('app').factory('Request', ['$http', '$q', function ($http, $q) {
        window.HOST = "45.34.18.226"
        var apiUrl = 'http://'+HOST+':3000/api/mobile/';
        var get = function (path, params) {
            var deferred = $q.defer();
            $http({method: 'GET', responseType: 'json', url:apiUrl + path, params: params}).then(function (response) {
                deferred.resolve(response.data);
            }, function (response) {
                deferred.reject({status: response.status, msg: response.statusText});
            });
            return deferred.promise;
        };
        var post = function (path, data) {
            var deferred = $q.defer();
            var transform = function (data) {
                return $.param(data);
            }
            $http({
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform,
                method: 'POST',
                responseType: 'json',
                url:apiUrl + path,
                data: data
            }).then(function (response) {
                deferred.resolve(response.data);
            }, function (response) {
                deferred.reject({status: response.status, msg: response.statusText});
            });
            return deferred.promise;
        };
        var postfile =  function(data){
            var deferred = $q.defer();

            $.ajax({
                url: apiUrl+"/v1/tasks/batch_upload",
                type: "POST",
                processData: false,
                contentType: false,
                data: data,
                success: function(data) {
                    deferred.resolve(data);

                    // console.log(data);
                    // if(data.message == 'Row 2: Key has already been taken'){
                    //     alert('商品ID重复')
                    // }else if(data.code=='200'){
                    //     alert('商品批量上传成功')
                    // }else{
                    //     alert('商品上传出错')
                    // }
                    // setProgress(progress, 100, "上传成功");
                    // $('#barber_img').val(data.file_path);
                    // $('#show_baber_img').attr('src',data.file_path+"<%= image_size %>");
                }
            })
            return deferred.promise;
        }
        return {
            get: get,
            post: post,
            postfile:postfile
        }
    }])
    .factory('az', ['Request', function (Request) {
        var productList = function (params, callback) {
            Request.get("v1/products", params).then(function (data) {
                callback(data);
            }, function (data) {
                callback(data)
            });
        }
        var AddproductList = function (params, callback) {
            Request.post("v1/products/new", params).then(function (data) {
                callback(data);
            }, function (data) {
                callback(data)
            });
        }
        var addcategories = function (params, callback) {
            Request.post("v1/categories/new", params).then(function (data) {
                callback(data);
            }, function (data) {
                callback(data)
            });
        }

        var categories = function (params, callback) {
            Request.get("/v1/categories", params).then(function (data) {
                callback(data);
            }, function (data) {
                callback(data)
            });
        }

        var addtask = function (params, callback) {
            Request.post("v1/tasks/new", params).then(function (data) {
                callback(data);
            }, function (data) {
                callback(data)
            });
        }

        var task = function (params, callback) {
            Request.get("v1/tasks", params).then(function (data) {
                callback(data);
            }, function (data) {
                callback(data)
            });
        }

        var execute = function (params, callback) {
            Request.post("v1/tasks/exec", params).then(function (data) {
                callback(data);
            }, function (data) {
                callback(data)
            });
        }

        var get_operates = function (params, callback){
          Request.get("v1/tasks/"+params.id, params).then(function (data) {
              callback(data);
          }, function (data) {
              callback(data)
          });
        }

        var login = function (params, callback) {
            Request.post("v1/authentications/token", params).then(function (data) {
                callback(data);
            }, function (data) {
                callback(data)
            });
        }
        var taskRelations = function (params, callback) {
            Request.get("v1/task_operate_relations", params).then(function (data) {
                callback(data);
            }, function (data) {
                callback(data)
            });
        }

        var batch_exec = function (params, callback) {
            Request.post("v1/checks/batch_exec", params).then(function (data) {
                callback(data);
            }, function (data) {
                callback(data)
            });
        }

        var check_exec = function (params, callback) {
            Request.post("v1/checks/batch_exec", params).then(function (data) {
                callback(data);
            }, function (data) {
                callback(data)
            });
        }

        var check_list = function (params, callback) {
            Request.get("v1/checks", params).then(function (data) {
                callback(data);
            }, function (data) {
                callback(data)
            });
        }

        var tasking = function (params, callback) {
            Request.get("v1/task_operate_relations/executing", params).then(function (data) {
                callback(data);
            }, function (data) {
                callback(data)
            });
        }
        var delete_task = function (params, callback) {
            Request.post("v1/tasks/"+params.id,Object.assign(params,{"_method":"delete"})).then(function (data) {
                callback(data);
            }, function (data) {
                callback(data)
            });
        }

        var edit_task = function(params, callback){
          Request.post("v1/tasks/"+params.id,Object.assign(params,{"_method":"put"})).then(function (data) {
              callback(data);
          }, function (data) {
              callback(data)
          });
        }

        var taskList_by_product = function(params, callback){
          Request.get("v1/products/"+params.id+"/tasks",params).then(function (data) {
              callback(data);
          }, function (data) {
              callback(data)
          });
        }

        var task_excuted = function(params, callback){
          Request.get("v1/task_operate_relations/executed",params).then(function (data) {
              callback(data);
          }, function (data) {
              callback(data)
          });
        }


        //var modellist = function (params, callback) {
        //    Request.post("admin/api/model.php", params).then(function (data) {
        //        callback(data);
        //    }, function (data) {
        //        callback(data)
        //    });
        //}
        //var modeltype = function (params, callback) {
        //    Request.post("admin/api/model.php", params).then(function (data) {
        //        callback(data);
        //    }, function (data) {
        //        callback(data)
        //    });
        //}
        //var dingdanlist = function (params, callback) {
        //    Request.post("admin/api/apply.php", params).then(function (data) {
        //        callback(data);
        //    }, function (data) {
        //        callback(data)
        //    });
        //}
        //var comment = function (params, callback) {
        //    Request.post("admin/api/comment.php", params).then(function (data) {
        //        callback(data);
        //    }, function (data) {
        //        callback(data)
        //    });
        //}
        //var feedback = function (params, callback) {
        //    Request.post("admin/api/feedback.php", params).then(function (data) {
        //        callback(data);
        //    }, function (data) {
        //        callback(data)
        //    });
        //}
        return {
            productList: productList,
            AddproductList:AddproductList,
            addcategories:addcategories,
            categories:categories,
            addtask:addtask,
            task:task,
            execute:execute,
            get_operates:get_operates,
            login:login,
            taskRelations:taskRelations,
            batch_exec:batch_exec,
            check_exec:check_exec,
            check_list:check_list,
            tasking:tasking,
            delete_task:delete_task,
            edit_task:edit_task,
            taskList_by_product:taskList_by_product,
            task_excuted:task_excuted

        }
    }])
    .factory('tips', function () {
        var blackTips = function (mianinfo) {
            mianinfo.div =  mianinfo.useObject;
            if(typeof(mianinfo.useObject)=="undefined"){
                mianinfo.div =  $("body");
            }
            $(".blackTips").remove();
            var templte = '<div class="blackTips">' + mianinfo.text + '</div>';

            mianinfo.div.append(templte);
            $(".blackTips").css({
                left: mianinfo.divLeft + "%",
                top: mianinfo.divTop + "%"
            });
            setTimeout(function () {
                $(".blackTips").remove();
            }, 2000);
        };
        return {
            blackTips: blackTips
        }
    })
