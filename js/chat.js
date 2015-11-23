var chat = angular.module('chat',[]);

chat.factory('chatFactory',['$http', function ($http){
	return {
		'getChatList' : function(){
			return $http.get("data/chatList.json");//['Sujoy Saha', 'Payel Das'];
		}
	}
}]);
	
chat.controller('chatController', function($scope, chatFactory){
	$scope.users = [];
	$scope.searchedUsers = [];
	chatFactory.getChatList()
		.success(function(data){
			$scope.users = $scope.searchedUsers = data.users;
		});

	$scope.findName = function(){
		if($scope.chatBoxSearchText == null
			|| $.trim($scope.chatBoxSearchText) == ''
			|| $scope.chatBoxSearchText == undefined ){
				$scope.searchedUsers = $scope.users;
		}

		var results = [];
  		for (var i = 0; i < $scope.users.length; i++) {
    		if ($scope.users[i].indexOf($scope.chatBoxSearchText) == 0) {
      			results.push($scope.users[i]);
    		}
  		}
  		$scope.searchedUsers = results;
	}
});

(function($){
        $(window).load(function(){
            $(".chatNameList").mCustomScrollbar({
            	theme:"dark-thick"
            });
            /*$(".content").mCustomScrollbar({
            	theme:"dark-thick",
            	callbacks:{
      				onTotalScrollOffset: 10000
				}
            })*/
            $(".content").scrollTop($(".content")[0].scrollHeight);

            $('#chat-ip-1').keypress(function (e) {
 	 		if (e.which == 13) {
    			alert("HIT");
    			return false;    //<---- Add this line
  			}
			});
        });
    })(jQuery);
