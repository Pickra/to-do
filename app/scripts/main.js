			// PARSE FUNCTIONS //

Parse.initialize("mnBJxPoO5anLT4b5gtR4oA3dKs0fUdSnCw1TYr6o", "e00VUWvFjONPw4egMhgglRZgpQspAmR8QW7feaZH");

var noteConstructor = Parse.Object.extend("ToDo");

var objectArray = Parse.Collection.extend({
	model: noteConstructor
});

			// END PARSE FUNCTIONS //



			// PARSE VARIABLES //
var notesArray = new objectArray()

var newNote = new noteConstructor();
			// END PARSE VARIABLES


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
		newNote.set('title', $('#title').val());
		newNote.set('content', $('#content').val());

		$('.form').addClass('hidden');
 
		newNote.save(null, {
			success: function(result){	
			notesArray.add(result);
			fetchAndOrDisplay();
			// console.log(newNote);
		}, 
			error: function(result, error){
				alert("No dice hombre" + error.descripton);
			}
		});
	});
}

function putInSideBar(note){
	var li = $('<li>'+ note.get('title')+'</li>');

	$('.notes').append(li);

	li.click(function(){
		putInDisplay(note);
	});
};

			// other variables //
var edit;
var kill;
var h1;
var p;
			// end other variables
	

function putInDisplay(note){
	$('.output-wrap').html('')
	edit = $('<div class="edit btn btn-default new' + note.id + '">-Edit-</div>');
	kill = $('<div class="kill btn btn-default new' + note.id + '">*Delete*</div>');
	h1 = $('<h1>' + note.get('title') + '</h1>');
	p = $('<p>' + note.get('content') + '</p>');

	$('.output-wrap').append(h1, p, edit, kill);


	$(edit).click(function(){
		theEditor(note);
	});


	$(kill).click(function(){
	  	$('.output-wrap').addClass('hidden');
		note.destroy({
		  success: function(note){
		  	fetchAndOrDisplay();
		  },

		  error: function(note, error) {

		  }
		});
	});
};
//  edit/delete/editSave functions need to b broken up into separate named functions


		

function theEditor(note){
		$('.form').removeClass('hidden')
		$('#title').val(note.get('title'));
		$('#content').val(note.get('content'));

		var editSave = $("<a href='#'><div class='editSave'>" + 'editSave' + "</div></a>");
		$('.output-wrap').append(editSave);
		
		$('.editSave').click(function(){
		note.set('title', $('#title').val());
		note.set('content', $('#content').val());
		$('.form').addClass('hidden');

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



$(document).ready(function(){
	$('.new').click(function(){
		$('.form').removeClass('hidden');
	});

	fetchAndOrDisplay();
	saveButton();
});
