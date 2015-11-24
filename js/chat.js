var chat = angular.module('chat',[]);

chat.directive( 'compileData', function ( $compile ) {
  return {
    scope: true,
    link: function ( scope, element, attrs ) {

      var elmnt;

      attrs.$observe( 'template', function ( myTemplate ) {
        if ( angular.isDefined( myTemplate ) ) {
          // compile the provided template against the current scope
          elmnt = $compile( myTemplate )( scope );

            //element.html(""); // dummy "clear"

          element.append( elmnt );
        }
      });
    }
  };
});

chat.factory('chatFactory',['$http', function ($http){
	return {
		'getChatList' : function(){
			return $http.get("data/chatList.json");//['Sujoy Saha', 'Payel Das'];
		}
	}
}]);
	
chat.controller('chatController', function($scope, $compile, chatFactory){
	$scope.users = [];
	$scope.searchedUsers = [];
	chatFactory.getChatList()
		.success(function(data){
			console.log(data.users);
			$scope.users = $scope.searchedUsers = data.users;
		});

	$scope.addChatBox = function(id, right, name){
		var chatBoxHtml = '<div id="'+id+'" class="chatbox" style="right:'+right+'px">'+
				'<div class="topbar">'+
					'<label>'+name+'</label>'+
					'<div class="close" ng-click="closeChatbox('+id+')">X</div>'+
				'</div>'+
				'<div class="content">'+
					'<div class="myMsg">This is my message. this is myMsg.</div>'+
					'<div class="yourMsg">This is your message. this is yourMsg.</div>'+
					'<div class="myMsg">This is my message. this is myMsg.</div>'+
					'<div class="yourMsg">This is your message. this is yourMsg.</div>'+
					'<div class="myMsg">This is my message. this is myMsg.</div>'+
					'<div class="yourMsg">This is your message. this is yourMsg.</div>'+
					'<div class="myMsg">This is my message. this is myMsg.</div>'+
					'<div class="yourMsg">This is your message. this is yourMsg.</div>'+
					'<div class="myMsg">This is my message. this is myMsg.</div>'+
					'<div class="yourMsg">This is your message. this is yourMsg.</div>'+
					'<div class="myMsg">This is my message. this is myMsg.</div>'+
					'<div class="yourMsg">This is your message. this is yourMsg.</div>'+
					'<div class="myMsg">This is my message. this is myMsg.</div>'+
					'<div class="yourMsg">This is your message. this is yourMsg.</div>'+
					'<div class="myMsg">This is my message. this is myMsg.</div>'+
					'<div class="yourMsg">This is your message. this is yourMsg.</div>'+
				'</div>'+
				'<textarea style="font-size:12px;resize:none;" rows="1" class="form-control" placeholder="Type Your Message"></textarea>'+
			'</div>';
			return chatBoxHtml;
	}

	$scope.findName = function(){
		if($scope.chatBoxSearchText == null
			|| $.trim($scope.chatBoxSearchText) == ''
			|| $scope.chatBoxSearchText == undefined ){
				$scope.searchedUsers = $scope.users;
		}
		var results = [];
  		for (var i = 0; i < $scope.users.length; i++) {
    		if ($scope.users[i].name.indexOf($scope.chatBoxSearchText) == 0) {
      			results.push($scope.users[i]);
    		}
  		}
  		$scope.searchedUsers = results;
	}

	// Chat Box Controll box
	$scope.chatManager = [];

	$scope.openChatBox = function(id){
		alert($('#'+id).attr('data-chat-id'));
		var chatBoxObject = {name:$('#'+id).attr('data-chat-name'),
							id:$('#'+id).attr('data-chat-id')}
		$scope.chatManager.push(chatBoxObject);
		var id = $scope.chatManager[$scope.chatManager.length - 1].id;
		var name = $scope.chatManager[$scope.chatManager.length - 1].name;
		var right = $scope.chatManager.length * 260;
		//alert($scope.addChatBox(id, 530, name));
		$scope.addedChatBox = $scope.addChatBox(id, right, name);
		//$compile(e)($scope);
		//$('.chatBoxContainer').append(e);
		$(".content").scrollTop($(".content")[0].scrollHeight);
		//alert(id);
	}

	$scope.closeChatbox = function(id){
		alert("IN");
		$('#'+id).remove();
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
