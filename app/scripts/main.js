Parse.initialize("mnBJxPoO5anLT4b5gtR4oA3dKs0fUdSnCw1TYr6o", "e00VUWvFjONPw4egMhgglRZgpQspAmR8QW7feaZH");

var noteConstructor = Parse.Object.extend("ToDo");

var objectArray = Parse.Collection.extend({
	model: noteConstructor
});

var notesArray = new objectArray()

notesArray.fetch({
	success: function(array){
		array.each(function(note){
			putInSideBar(note);
		})
	}
});

	var newNote = new noteConstructor();
///////////////////////////////////////////
$('.save').click(function(){
	newNote.set('title', $('#title').val());
	newNote.set('content', $('#content').val());

	newNote.save(null, {
		success: function(result){
		putInSideBar(result);	
	}, 
		error: function(result, error){
			alert("No dice hombre" + error.descripton);
		}
	});
});
//////////////////////////////////////////
$('.edit').click(function(){
	var newNote = this
	newNote.set('title', $('#title').val());
	newNote.set('content', $('#content').val());

	newNote.save(null, {
		success: function(result){
		putInSideBar(result);	
	}, 
		error: function(result, error){
			alert("Nope" + error.descripton);
		}
	});
});

// functions 

function putInSideBar (note){
	var li = $('<li>'+note.get('title')+'</li>');

	$('.notes').append(li);

	li.click(function(){
	makeItSoNumberOne(note);
	});
};


function makeItSoNumberOne(note){
	$('#title').val(note.get('title'));
	$('#content').val(note.get('content'));
};




$(document).ready(function(){

	$('.new').click(function(){
		$('.form').removeClass('hidden');
	})
});


















