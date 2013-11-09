			// PARSE FUNCTIONS //

Parse.initialize("mnBJxPoO5anLT4b5gtR4oA3dKs0fUdSnCw1TYr6o", "e00VUWvFjONPw4egMhgglRZgpQspAmR8QW7feaZH");

var noteConstructor = Parse.Object.extend("ToDo"); 					/*---- makes a constructor, noteConstructor, which is like a constructor w/additional properties inherited from the Parse Class ToDo  ------------*/

var objectArray = Parse.Collection.extend({							/*---------- makes a constructor array, objectArray, which is an object with array like properties(cuz its an array inside an obj), that makes other arrays(like a constructor), again w/properties inherited from Parse ------------*/
	model: noteConstructor											/*-----  thought i got this while we talkin about this in class 2day, i wrote a bunch of notes, askt alota questions; but now that im tired and lookn @ my notes, feel confused -------*/
});

			// END PARSE FUNCTIONS //



			// PARSE VARIABLES //
var notesArray = new objectArray()  								/*------  a new local obj array ------*/

var newNote = new noteConstructor();							/*----- makn a new obj --------*/
			// END PARSE VARIABLES

			// other variables //
var edit;
var kill;
var h1;
var p;
			// end other variables

function fetchAndOrDisplay(){
	if (notesArray.length === 0){
		notesArray.fetch({													/*------ fetches data, that has been updated on Parse, to the app -----*/
			success: function(array){   
				array.each(function(note){    								/*------  cycles thru the objs in the array, loox for Each obj in the array and... ------*/
					putInSideBar(note);										/*---------   calls this function, which is defined below   -------*/
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
	$('.saved-tasks').click(function(){ 								/*-------- this is a click event that, when you click the saved-tasks class(button) ------*/
		newNote.set('title', $('#title').val());  						/* it's like making an {}( var whatever = {}), set is putting the value from #title into a property key called title, inside the Model/Parse Object newNote*/
		newNote.set('content', $('#content').val());  					/*----  ditto -----*/

		$('.form').addClass('hidden');									/*--- adding the hidden class(which is just negative opacity) to the form---------*/
 
		newNote.save(null, {											/*---------  saves the new obj on Parse ----------*/
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
	var li = $('<li>'+ note.get('title')+'</li>');					/*------ creates an li(called li), passes the arg(?)gets the data (in the title property) from Parse ---------*/

	$('.notes').append(li);											/*---- put the li(append it) in the notes class, which is a ul in the column that has the sidebar class -----*/

	li.click(function(){											/*----  when u click an li.... ------*/
		putInDisplay(note);											/*----  this function is called -----*/
	});
};

	

function putInDisplay(note){
	$('.output-wrap').html('')  									/*---- clear everything that's in this class -----*/
	edit = $('<div class="edit btn btn-default new' + note.id + '">-Edit-</div>');  		/*---- make a button, get/assign the parse id (that Parse assigned to it when it is created?) to this div -----*/
	kill = $('<div class="kill btn btn-default new' + note.id + '">*Delete*</div>'); 	/*---- ditto -----*/
	h1 = $('<h1>' + note.get('title') + '</h1>');  	/*---- makes a h1 and puts the property value from the Parse title property into it -----*/
	p = $('<p>' + note.get('content') + '</p>'); 		/*---- ditto -----*/

	$('.output-wrap').append(h1, p, edit, kill); 				/*---- append these above 4 creations to this class -----*/




//  edit/delete/editSave functions need to b broken up into separate named functions


	$(edit).click(function(){									/*---- click event for the edit(var)button -----*/
		$('.form').removeClass('hidden')						/*---- the same opacity thing from above -----*/
		$('#title').val(note.get('title'));				/*---- get the property value from Parse and stick it in the #title(which is the .title input field) -----*/
		$('#content').val(note.get('content')); 			/*---- yup -----*/

		var editSave = $("<a href='#'><div class='editSave'>" + 'editSave' + "</div></a>");	/*---- makes yet another button.... -----*/
		$('.output-wrap').append(editSave);						/*---- appends it to this class -----*/
		
		$('.editSave').click(function(){						/*---- here's it's click event -----*/
		note.set('title', $('#title').val());				/*---- more of the same as above -----*/
		note.set('content', $('#content').val());			/*---- ditto -----*/
		$('.form').addClass('hidden');							/*---- yup tup -----*/

		note.save(null, {									/*---- save it... -----*/
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
		note.destroy({										/*----  delete the info ----*/
		  success: function(note) {
		    													// The object was deleted from the Parse Cloud.
		  },
															    // The delete failed.
		  error: function(note, error) {
															    // error is a Parse.Error with an error code and description.
		  }
		});

	});


};



function getValue(note){
	$('#title').val(note.get('title'));  							/*---  gets the value from title property in notesArray and puts it in the #title*/
	$('#content').val(note.get('content'));							/*--- ditto ----*/
};



$(document).ready(function(){
	$('.new').click(function(){									/*---- when you clik the 'make a new note' button, the .hidden is removed from .form ----*/
		$('.form').removeClass('hidden');
	});

	fetchAndOrDisplay();
	saveButton();
});
