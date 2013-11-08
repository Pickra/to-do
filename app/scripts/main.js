			// PARSE OBJECTS //

Parse.initialize("mnBJxPoO5anLT4b5gtR4oA3dKs0fUdSnCw1TYr6o", "e00VUWvFjONPw4egMhgglRZgpQspAmR8QW7feaZH");

var noteConstructor = Parse.Object.extend("ToDo"); 					/*---- makes a constructor, noteConstructor, which is like a constructor w/additional properties inherited from the Parse Class ToDo  ------------*/

var objectArray = Parse.Collection.extend({							/*---------- makes a constructor array, objectArray, which is an object with array like properties(cuz its an array inside an obj), that makes other arrays(like a constructor), again w/properties inherited from Parse ------------*/
	model: noteConstructor											/*-----  thought i got this while we talkin about this in class 2day, i wrote a bunch of notes, askt alota questions; but now that im tired and lookn @ my notes, feel confused -------*/
});

			// END PARSE OBJS //



			// PARSE VARIABLES //

var notesArray = new objectArray()  								/*------  a new obj array ------*/

var newNote = new noteConstructor();							/*----- makn a new obj --------*/
			// END PARSE VARIABLES


function fetchFromParse(){
	notesArray.fetch({													/*------ fetches data, that has been updated on Parse, to the app -----*/
		success: function(array){   
			// clear sidebar
			array.each(function(note){    								/*------  cycles thru the objs in the array, loox for Each obj in the array and... ------*/
				putInSideBar(note);										/*---------   calls this function, which is defined below   -------*/
			})
		}
	})
};

function saveButton(){
	$('.saved-tasks').click(function(){ 								/*-------- this is a click event that, when you click the saved-tasks class(button) ------*/
		newNote.set('title', $('#title').val());  						/* it's like making an {}( var whatever = {}), set is putting the value from #title into a property key called title, inside the Model/Parse Object newNote*/
		newNote.set('content', $('#content').val());  					/*----  ditto -----*/
		console.log(newNote);

		$('.form').addClass('hidden');									/*--- adding the hidden class(which is just negative opacity) to the form---------*/

		newNote.save(null, {											/*---------  saves the new obj on Parse ----------*/
			success: function(result){	
			fetchFromParse(result);										
		}, 
			error: function(result, error){
				alert("No dice hombre" + error.descripton);
			}
		});
	});
}

function putInSideBar (note){
	var li = $('<li>'+note.get('title')+'</li>');					/*------ creates an li(called li), passes the arg(?)gets the data (in the title property) from Parse ---------*/

	$('.notes').append(li);											/*---- put the li(append it) in the notes class, which is a ul in the column that has the sidebar class -----*/

	li.click(function(){											/*----  when u click an li.... ------*/
		putInDisplay(note);											/*----  this function is called -----*/
	});
};


function getValue(note){
	$('#title').val(note.get('title'));  							/*---  gets the value from Parse's property and puts it in the #title*/
	$('#content').val(note.get('content'));  						/*--- ditto ----*/
};

	

function putInDisplay(noteKinda){
	// $('.output-wrap').html('')  									/*---- clear everything that's in this class -----*/

	var edit = $('<div class="edit btn btn-default new' + noteKinda.id + '">-Edit-</div>');  		/*---- make a button, get/assign the parse id (that Parse assigned to it when it is created?) to this div -----*/
	var kill = $('<div class="delete btn btn-default new' + noteKinda.id + '">*Delete*</div>'); 	/*---- ditto -----*/
	var h1 = $('<h1>' + noteKinda.get('title') + '</h1>');  	/*---- makes a h1 and puts the property value from the Parse title property into it -----*/
	var p = $('<p>' + noteKinda.get('content') + '</p>'); 		/*---- ditto -----*/

	$('.output-wrap').append(h1, p, edit, kill); 				/*---- append these above 4 creations to this class -----*/



//  edit functionality needs to b broken up

	$(edit).click(function(){									/*---- click event for the edit(var)button -----*/
		$('.form').removeClass('hidden')						/*---- the same opacity thing from above -----*/
		$('#title').val(noteKinda.get('title'));				/*---- get the property value from Parse and stick it in the #title(which is the .title input field) -----*/
		$('#content').val(noteKinda.get('content')); 			/*---- yup -----*/

		var editSave = $("<a href='#'><div class='editSave'>" + 'editSave' + "</div></a>");	/*---- makes yet another button.... -----*/
		$('.output-wrap').append(editSave);						/*---- appends it to this class -----*/
		
		$('.editSave').click(function(){						/*---- here's it's click event -----*/
		noteKinda.set('title', $('#title').val());				/*---- more of the same as above -----*/
		noteKinda.set('content', $('#content').val());			/*---- ditto -----*/
		$('.form').addClass('hidden');							/*---- yup tup -----*/

		noteKinda.save(null, {									/*---- save it... -----*/
			success: function(result){
			getValue(result);							/*---- (to parse?)  ----*/
			}, 
			error: function(result, error){
				alert("No dice hombre" + error.descripton);
			}
		});
		});
	});

	$(kill).click(function(){									/*----  click event ----*/
	  	$('.output-wrap').addClass('hidden');					/*----  opacity yada ----*/
		noteKinda.destroy({										/*----  delete the info ----*/
		  success: function(noteKinda) {
		    													// The object was deleted from the Parse Cloud.
		  },
															    // The delete failed.
		  error: function(noteKinda, error) {
															    // error is a Parse.Error with an error code and description.
		  }
		});
	});
};








$(document).ready(function(){
	$('.new').click(function(){									/*---- when you clik the 'make a new note' button, the .hidden is removed from .form ----*/
		$('.form').removeClass('hidden');
	});

	fetchFromParse();
	saveButton();
});
