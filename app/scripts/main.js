			// PARSE FUNCTIONS //

Parse.initialize("mnBJxPoO5anLT4b5gtR4oA3dKs0fUdSnCw1TYr6o", "e00VUWvFjONPw4egMhgglRZgpQspAmR8QW7feaZH");

var noteConstructor = Parse.Object.extend("ToDo");

var objectArray = Parse.Collection.extend({
	model: noteConstructor
});

			// END PARSE FUNCTIONS //


var notesArray = new objectArray()


function fetchAndOrDisplay(){
	if (notesArray.length === 0){
		notesArray.fetch({
			success: function(array){   
				array.each(function(note){
					putInSideBar(note);
				})
			}
		})
	
	} else {
		$('.notes').html('');
		notesArray.each(function(note){ 								
			putInSideBar(note);									
		})
	}
};

function saveButton(){
	$('.saved-tasks').click(function(){
		var newNote = new noteConstructor();
		newNote.set('title', $('#title').val());
		newNote.set('content', $('#content').val());

		$('.under-main').addClass('hidden');
 
		newNote.save(null, {
			success: function(result){	
			notesArray.add(newNote);
			fetchAndOrDisplay();
			// console.log(newNote);
		}, 
			error: function(result, error){
				alert("No dice hombre" + error.descripton);
			}
		});
	});
}

function cancelButton(){
	$('.cancel').click(function(){
		$('.under-main').addClass('hidden');
		console.log('cancel');
	})
}

function putInSideBar(note){
	var li = $('<li>'+ note.get('title')+'</li>');

	$('.notes').append(li);

	li.click(function(){
		putInDisplay(note);
	});
};

			// putInDisplayVariables variables //
var edit;
var kill;
var h1;
var p;
			// end putInDisplayVariables variables
	

function putInDisplay(note){
	$('.output-wrap').html('')
	edit = $('<div class="edit btn-default new' + note.id + '">Edit</div>');
	kill = $('<div class="kill btn-default new' + note.id + '">Delete</div>');
	h1 = $('<h1>' + note.get('title') + '</h1>');
	p = $('<p>' + note.get('content') + '</p>');

	$('.output-wrap').append(h1, p, edit, kill);


	$(edit).click(function(){
		theEditor(note);
	});

	$(kill).click(function(){
		theDelete(note);
	});
};


function theDelete(note){
		note.destroy({
		  success: function(){
		  	fetchAndOrDisplay();
		  	$('.output-wrap').html('');
		  	$('.under-main').addClass('hidden');
		  },

		  error: function(note, error) {

		  }
		});
};


function theEditor(note){
		var editSave = $("<div class='btn-default editSave' style='display: inline-block;'>" + 'Save' + "</div>");
		
		$('.under-main').removeClass('hidden')
		$('#title').val(note.get('title'));
		$('#content').val(note.get('content'));

		$('.saved-tasks').addClass('hidden');

		if($('.editSave').length === 0){
			$('.under-main').append(editSave);
		}
		
		$('.editSave').click(function(){
		note.set('title', $('#title').val());
		note.set('content', $('#content').val());
		$('.under-main').addClass('hidden');
		$('.editSave').remove();
		$('.output-wrap').html('');

			note.save(null, {
				success: function(result){
				getValue(result);
				fetchAndOrDisplay();
				}, 
				error: function(result, error){
					alert("No dice hombre" + error.descripton);
				}
			});
		});
}


function getValue(note){
	$('#title').val(note.get('title'));
	$('#content').val(note.get('content'));
};


function makeNote(){
	$('.new').click(function(){
		$('.under-main').removeClass('hidden');
		$('.saved-tasks').removeClass('hidden');
		$('.form-control').val('');
	});
}

$(document).ready(function(){
	makeNote();
	fetchAndOrDisplay();
	saveButton();
	cancelButton();
});
