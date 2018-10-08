var Friends = {
	initialize: function() {
		$(document).on('click', '.username', function(event) {
			var username = event.target.innerHTML;
			Friends.toggleStatus(username);
		});
	}, 

	toggleStatus: function(friend) {
		if (friend !== App.username) {
			//add class 'friend' to clicked username container
			$(`.${friend}`).addClass('friend');
			
			var $div = $('<div class="accepted"></div>').text(friend);
			$('#friendBox').prepend($div);
		}
	}

};