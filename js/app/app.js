var app = angular.module('MyTutorialApp', []).config(function($routeProvider){
	$routeProvider.when("/login", {
		templateUrl: 'login.html',
		controller: "LoginController"
	});

	$routeProvider.when("/home", {
		templateUrl: "home.html",
		controller: "HomeController"
	})

	$routeProvider.otherwise({ 
		redirectTo: "/login" 
	});
});

app.factory("AuthenticationService", ["$location", function($location){
	return {
		login: function(credentials){
			if(credentials.username === "hello" && credentials.password === "haha"){
				//alert("Username must ne subham");
				$location.path("/home");
			}
		},
		logout: function(){
			$location.path("/login");
		}
	};
}]);

app.controller("LoginController", ["$scope", "AuthenticationService", function($scope, AuthenticationService){
	$scope.credentials = { username: "", password: "" };

	$scope.login = function(){
		AuthenticationService.login($scope.credentials);
	};
}]);

app.controller("HomeController", ["$scope", "AuthenticationService", function($scope, AuthenticationService){
	$scope.title = "Home";
	$scope.message = "Mouse over the images to see the description";

	$scope.logout = function(){
		AuthenticationService.logout();
	};
}]);

app.directive("showMessageWhenHovered", function(){
	return {
		restrict: "A",
		link: function(scope, element, attributes){
			var originalMessage = scope.message;
			element.bind("mouseover", function(){
				scope.message = attributes.hovermessage;
				console.log(attributes);
				scope.$apply();
			});

			element.bind("mouseout", function(){
				scope.message = originalMessage;
				scope.$apply();
			});
		}
	};
});