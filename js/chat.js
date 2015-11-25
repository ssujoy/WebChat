var chat = angular.module('chat',[]);

chat.directive('compileChatbox', function ($compile) {
	return {
    	scope: true,
    	link: function (scope, element, attrs) {
      		var e;
      		attrs.$observe('template', function (chatboxTemplate) {
        		if (angular.isDefined(chatboxTemplate)) {
          			e = $compile(chatboxTemplate)(scope);
            		//element.html("");
         	 		element.append(e);
        		}
      		});
    	}
  	};
});

chat.factory('chatFactory',['$http', function ($http){
	return {
		'getChatList' : function(){
			return $http.get("data/chatList.json");
		}
	}
}]);
	
chat.controller('chatController', function($scope, $compile, chatFactory){
	$scope.users = [];
	$scope.searchedUsers = [];
	$scope.addedChatBox = "";
	chatFactory.getChatList()
		.success(function(data){
			console.log(data.users);
			$scope.users = $scope.searchedUsers = data.users;
		});

	$scope.addChatBox = function(id, name){
		var chatBoxHtml = '<div id="'+id+'" class="chatbox">'+
				'<div class="topbar">'+
					'<label>'+name+'</label>'+
					'<div class="close" ng-click="closeChatbox('+id+')">X</div>'+
				'</div>'+
				'<div class="content">{{hello}}'+
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
		}else{
			$scope.searchedUsers = 
			$.grep( $scope.users, function( val, index ) {
	  			return val.name.toLowerCase().indexOf($scope.chatBoxSearchText.toLowerCase()) == 0;
			});
  		}
	}

	function removeChatManager(id){
		var result = [];
		for(var i = 0; i< $scope.chatManager.length ; i++){
			if($scope.chatManager[i].id != id){
				result.push($scope.chatManager[i]);
			}
		}
		$scope.chatManager = result;
	}

	function isChatboxOpen(id){
		for(var i = 0; i< $scope.chatManager.length ; i++){
			if($scope.chatManager[i].id == id){
				return true;
			}
		}
		return false;
	}

	function isChatboxMaxNumber(){
		if($scope.chatManager.length >= 3)
			return true;
		return false;
	} 
	
	$scope.closeChatbox = function(id, wait){
		$scope.addedChatBox = "";
		$('#'+id).hide('slow');
		if(!wait){
			setTimeout(function(){
				$('#'+id).remove();
				removeChatManager(id);
			},1000);
		}else{
			$('#'+id).remove();
			removeChatManager(id);
		}
	}

	function addChatManager(chatBoxObject){
		if(isChatboxMaxNumber()){
			$scope.closeChatbox($scope.chatManager[0].id, true);
		}
		$scope.chatManager.push(chatBoxObject);
		$scope.addedChatBox = $scope.addChatBox(chatBoxObject.id, chatBoxObject.name);
	}

	// Chat Box Controll box
	$scope.chatManager = [];

	$scope.openChatBox = function(index){
		var currentId = $('#'+index).attr('data-chat-id');
		var currentName = $('#'+index).attr('data-chat-name');
		if(isChatboxOpen(currentId)){
			return;
		}else{
			var chatBoxObject = {name:currentName,
								id:currentId}

			addChatManager(chatBoxObject);
		}
	}
});

(function($){
        $(window).load(function(){
            $(".chatNameList").mCustomScrollbar({
            	theme:"dark-thick"
            });
            $(".content").mCustomScrollbar({
            	theme:"dark-thick",
            	callbacks:{
      				onTotalScrollOffset: 10000
				}
            });
            //$(".content").scrollTop($(".content")[0].scrollHeight);

            $('.hideChatListBtn').click(function(){
            	$('.hideChatListBtn').hide();
            	$('.showChatListBtn').show();
            	$('.chatNameList').animate({ "right": "-=208px" }, "slow");
            	$('.chatBoxContainer').animate({ "right": "-=208px" }, "slow");
            });
            $('.showChatListBtn').click(function(){
            	$('.hideChatListBtn').show();
            	$('.showChatListBtn').hide();
            	$('.chatNameList').animate({ "right": "+=208px" }, "slow");
            	$('.chatBoxContainer').animate({ "right": "+=208px" }, "slow");
            });

            $('.chatbox .form-control').keypress(function (e) {
 	 		if (e.which == 13) {
    			alert("HIT ENTER");
    			return false;    //<---- Add this line
  			}
			});
        });
    })(jQuery);
