var socket = io.connect();

function addMessage(msg, alias) {
	$("#chatEntries").append('<article class="message"><p>' + alias + ' : ' + msg + '</p></article>');
}

function sentMessage() {
	if ($('#messageInput').val() != "")
	{
		socket.emit('message', $('#messageInput').val());
		addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
		$('#messageInput').val('');
	}
}

function setAlias() {
   if ($("#aliasInput").val() != "")
   {
      socket.emit('setAlias', $("#aliasInput").val());
      $('#chatControls').show();
      $('#aliasInput').hide();
   }
}

socket.on('message', function(data) {
   addMessage(data['message'], data['alias']);
});

$(function() {
   $("#chatControls").hide();
   $("#aliasSet").click(function() {setAlias()});
   $("#submit").click(function() {sentMessage();});
});