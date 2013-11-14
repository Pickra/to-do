Parse.initialize("mnBJxPoO5anLT4b5gtR4oA3dKs0fUdSnCw1TYr6o", "e00VUWvFjONPw4egMhgglRZgpQspAmR8QW7feaZH");

var ToDo = Parse.Object.extend("ToDo");


// testObject.save({foo: "bar"}, {
//   success: function(object) {
//     // alert("yay! it worked");
//   }
// });

var noteConstructor = new ToDo();

var noteArrayConstructorObject = Parse.Collection.extend({
	model: ToDo
});

// made a new array type obj
var notesArray = new noteArrayConstructorObject()

// getn stuff from parse and putn it in this array
notesArray.fetch({
	success: function(array){
		// putn each new obj "note, which i havnt made yet" into the array
		array.each(function(note){
			// refeshes data on parse srvr from usr/local??
			putInSideBar(note);

		})
	}
});



/*function to make a new note and save it(when u .click), and let 
u know if it workt.
im gona make a function inside of a jquery method assignment*/

$('.save').click(function(){
	var newNote = new noteConstructor();
/* then "set" the new instance into parse.
the 1st "s is the property name bein set to parse, the 2nd is where
it's getting that value from. in this case, from a dom element*/
	newNote.set('title', $('#title').val());
	newNote.set('content', $('#content').val());

	/*now im gona use parse's ".save" (method?) to save it to parse */
	newNote.save(null, {
		success: function(result){
/* ????????   the above function has "this" {} inside, which is 
also a function that puts the stuff on parse or verifies the 
stuff is on parse or both?????*/
		putInSideBar(result);
	
	}, 
		error: function(result, error){
			alert("No dice hombre" + error.descripton);
		}

	});
});


/* function to put the note in the sidebar... on parse srvr??*/

function putInSideBar (note){
/*makn a new var (called "li", said var, loox in the DOM for the 
element (an li, in this case), and it "gets" the property, from parse
and stix it in the element in the DOM... i think*/
	var li = $('<li>'+note.get('title')+'</li>');
/*lookn in the DOM for the element (in this case ".notes")
and appends the var i just made. */
	$('.notes').append(li);
/* when i click said variable, which is pointing to an element in
the DOM (so really when i ".click" the DOM element...), */
	li.click(function(){
/*this function happens, which is somewhere else in my js, 
which is "rendering" what hapnd in the function... on the parse srvr?*/
	makeItSoNumberOne(note);
	});
};


/* "render" function, call it - makeItSoNumberOne*/
function makeItSoNumberOne(note){
/* lookn in the DOM for the element(in this case, #title) and puts in 
the value/property from the parse srvr. ditto for 2nd element
no. this explanation is wrong!!!!!!!!*/
	$('#title').val(note.get('title'));
	$('#content').val(note.get('content'));
};

/*mason uses "note" as a new "instance" of the Parse obj, or in "this"
case, TestObject.*/









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
		theDelete(note);
	});
};


function theDelete(note){
	  	$('.output-wrap').addClass('hidden');
		note.destroy({
		  success: function(){
		  	fetchAndOrDisplay();
		  	putInSideBar();
		  },

		  error: function(note, error) {

		  }
		});
};

		

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














