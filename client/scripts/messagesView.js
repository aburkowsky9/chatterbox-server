var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
  	MessagesView.render();
  },
  //render all messages or room messages
  render: function() {
  	const messagesInfo = Messages.messagesInfo;


  	messagesInfo.forEach(message => {
  		var $room = $('#rooms select option:selected').val();
  		if (message.roomname === $room) {
	  		//uses template message container in MessageView
	  		var template = MessageView.render(message);
	  		//add class of roomname to each message div
	  		var $template = $(template).addClass(message.roomname.split(' ').join('-')).addClass(message.username.split(' ').join('-'));
	  		MessagesView.$chats.append($template);	
  		}
  	});
  },
  //render single new message from user submission
  renderNewMessage: function(message) {
  	var template = MessageView.render(message);
  	var $template = $(template).addClass(message.roomname);
  	MessagesView.$chats.prepend($template);
  }

};