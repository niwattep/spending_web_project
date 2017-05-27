var app = angular.module("app", ["ngRoute"]);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/static/views/list.html",
            controller: "mainController"
        }).when("/add", {
            templateUrl: "/static/views/add.html",
            controller: "addController"
        }).when("/edit/:id", {
            templateUrl: "/static/views/edit.html",
            controller: "editController"
        });
}]);

app.controller("mainController", [
    '$scope', "$http",
    function ($scope, $http) {
        $scope.account = {};

        $http.get("http://localhost:3000/api/").success(function (data) {
            $scope.account = data[0];
        }).error(function (res) {
            console.log(res);
        });
    }
]);

app.controller("addController", [
    "$scope", "$http",
    function ($scope, $http) {
        $scope.transaction = {}

        $scope.saveForm = function () {
            $http.post("/api/", $scope.transaction).success(function (res) {
                console.log(res)
                alert(res);
            }).error(function (res) {
                console.error(res);
                alert(res);
            })
        }
    }
])

app.controller("editController", [
    "$scope", "$http", "$routeParams",
    function ($scope, $http, $routeParams) {
        $scope.account = {};
        $scope.transactions = [];
        $scope.transaction = {};

        $http.get("/api/").success(function (data) {
            $scope.account = data[0];
            console.log($scope.account);
            console.log($scope.account.username);
            console.log($scope.account.transactions);
            $scope.transactions = $scope.account.transactions;
            console.log($scope.transactions);

            $scope.transaction = $scope.transactions[$routeParams.id];
            console.log($scope.transaction);
        }).error(function (res) {
            console.log(res);
        });

        $scope.saveData = function () {
            $http.post('/api/' + $scope.transaction._id, $scope.transaction).success(function (res) {
                console.log(res);
                alert(res);
            }).error(function (res) {
                console.error(res);
                alert(res);
            });
        }

        $scope.removeData = function () {
            $http.delete("/api/" + $scope.transaction._id).success(function (res) {
                console.log(res);
                alert(res);
            }).error(function (res) {
                console.error(res);
                alert(res);
            })
        }
    }
]);