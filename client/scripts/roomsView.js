var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
  	RoomsView.render();

  	RoomsView.$select.change(function() {
  		console.log('room change!');
  		$('.chat').remove();
  		MessagesView.render();	
  	});

  	RoomsView.$button.click(function() {
  		var newRoom = $('#newRoom').val();
  		RoomsView.addRoom(newRoom);
  	});
  },

  render: function() {
  	var rooms = Rooms.getRoomOptions();	
  	//adds all room options to select drop-down menu
    
    if ($('#rooms select option').length === Rooms.allRooms.size) {
      return;
    }

  	rooms.forEach(room => {
  		var $option = $('<option></option').attr('value', room).text(room);
  		RoomsView.$select.append($option);
  	});
  },
  //render new rooms input by user
  addRoom: function(roomname) {
  	var $option = $('<option></option').attr('value', roomname).text(roomname);
  	RoomsView.$select.prepend($option);
  	$('#newRoom').val('');
    Rooms.allRooms.add(roomname);
  }

};
