var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    Friends.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
    // Fetch new data every 10 seconds
    setInterval(App.fetch, 3000);

  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      // examine the response from the server request:
      console.log(data);
      Messages._data = data;
      Messages.messagesInfo = Messages.convertUndefined(data.results);
     
      //initialize rendering of rooms and messages after fetching data
      RoomsView.initialize();
      MessagesView.initialize();
      callback();
    }); 
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
