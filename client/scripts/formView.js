var FormView = {

  $form: $('#send'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    console.log(event);

    var message = {
      username: App.username,
      text: $('#message').val(), //<- event.target[0].value,
      roomname: $('#rooms select option:selected').val()
    };
    //set submit input to blank after submission
    $('#send #message').val('');
    //render new message before submission
    MessagesView.renderNewMessage(message);
    console.log('click!');
    Parse.create(message);
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};