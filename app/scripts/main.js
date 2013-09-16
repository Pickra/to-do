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
/////////////////////////////////////////// save button
$('.saved-tasks').click(function(){
	newNote.set('title', $('#title').val());
	newNote.set('content', $('#content').val());

	$('.form').addClass('hidden');

	newNote.save(null, {
		success: function(result){
		putInSideBar(result);	
	}, 
		error: function(result, error){
			alert("No dice hombre" + error.descripton);
		}
	});
});
// ////////////////////////////////////////
function putInSideBar (note){
	var li = $('<li>'+note.get('title')+'</li>');

	$('.notes').append(li);

	li.click(function(){
		putInDisplay(note);
	
	});
};


function makeItSoNumberOne(note){
	$('#title').val(note.get('title'));
	$('#content').val(note.get('content'));
};

function putInDisplay(noteKinda){
	$('.output-wrap h1').text(noteKinda.get('title'));
	$('.output-wrap p').text(noteKinda.get('content'));

	
	var edit = $("<a href='#'><div class='edit'>" + 'Edit' + "</div></a>");
	var kill = $("<a href='#'><div class='delete'>" + 'Delete' + "</div></a>");
							// // want to say, if the edit and delete buttons are already there, don't put them in again 
							// var theyreThere = (edit, kill)


							// if (theyreThere = false){
							// $('.output-wrap').append(edit, kill);

							// } else {
							// 	return(null)
							// }    ------------------ why doesnt this work??????
	$('.output-wrap').append(edit, kill);

	$(edit).click(function(){
		$('.form').removeClass('hidden')
		$('#title').val(noteKinda.get('title'));
		$('#content').val(noteKinda.get('content'));

		var editSave = $("<a href='#'><div class='editSave'>" + 'editSave' + "</div></a>");
		$('.output-wrap').append(editSave);
		$('.editSave').click(function(){
		
		console.log(noteKinda.get('title'))
		
		noteKinda.set('title', $('#title').val());
		noteKinda.set('content', $('#content').val());
			
			$('.form').addClass('hidden');

			noteKinda.save(null, {
				success: function(result){
				makeItSoNumberOne(result);	
			}, 
				error: function(result, error){
					alert("No dice hombre" + error.descripton);
				}
			});
		});
	});
};


$(document).ready(function(){

	$('.new').click(function(){
		$('.form').removeClass('hidden');
	});

});



/*  i don't have an array, unless u count the parse server. 
i need 1 to move stuff from sidebar to display column*/















