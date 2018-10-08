var Rooms = {
	//allRooms: [],
	allRooms: new Set(),

	getRoomOptions: function() {
		// var setRooms = new Set(Rooms.allRooms);
		// return setRooms;
		var setRooms = Rooms.allRooms;
		return setRooms;
	}

};