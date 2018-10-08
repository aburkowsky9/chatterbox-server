var Messages = {
	_data: {}, 

	messagesInfo: [],

	convertUndefined: function(messages) {
		messages.forEach(message => {
			
			var username = message.username;
			//remove %20 from usernames
			// if (username.include('%20')) {
			// 	username = username.split('%20').join(' ');
			// }

			message.username = username || 'anonymous';
			message.text = message.text || 'I was too lazy to write something...';
			message.roomname = message.roomname || 'home';

			//push roomnames to all rooms array to be filtered and added to select list
			//Rooms.allRooms.push(message.roomname);
			//allRooms is now a set
			Rooms.allRooms.add(message.roomname);
		});
		return messages;
	}	

};