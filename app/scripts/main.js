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


$('.save').click(function(){
	var newNote = new noteConstructor();
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























