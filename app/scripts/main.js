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

	
	var edit = $('<div class="edit btn btn-default new' + noteKinda.id + '">-Edit-</div>');
	var kill = $('<div class="delete btn btn-default new' + noteKinda.id + '">*Delete*</div>');
							
							// want to say, if the edit and delete buttons are already there, don't put them in again 
							// var theyreThere = {edit: true, kill: true};
							// if (theyreThere = false){
							// -OR-
							// // if ((edit = false) && (kill = false)){
							// $('.output-wrap').append(/*edit, kill*/theyreThere);

							// } else if ((edit = true) && (kill = true)) {
							// 	return(null)
							// };   /* ------------------ why doesnt this work??????*/

	$('.output-wrap').append(edit, kill); /*------------------ this worx in place of the overly indented above*/

	$(edit).click(function(){
		$('.form').removeClass('hidden')
		$('#title').val(noteKinda.get('title'));
		$('#content').val(noteKinda.get('content'));

		var editSave = $("<a href='#'><div class='editSave'>" + 'editSave' + "</div></a>");
		$('.output-wrap').append(editSave);
		$('.editSave').click(function(){
		
		// console.log(noteKinda.get('title'))
		
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




	$(kill).click(function(){
	  	$('.form').addClass('hidden');
	  	$('.output-wrap').addClass('hidden');
		noteKinda.destroy({
		  success: function(noteKinda) {

		    // The object was deleted from the Parse Cloud.
		  },
		  error: function(noteKinda, error) {
		    // The delete failed.
		    // error is a Parse.Error with an error code and description.
		  }
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















