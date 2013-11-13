# To-do

This is my first attempt at a to-do app. I'm also using [Parse](https://www.parse.com/) for the 1st time as well as an assignment while at the [Iron Yard](http://theironyard.com/).

[Check it out](http://pickra.github.io/to-do/)

#### Refactoring notes below

1. pressing the `make a new note` button in .sidebar removes the .hidden from .form
	- so now the 2 .form-groups in .main are visible

2. saveButton() -  pressing the `save` button in .main is putting the value from `#title` into a property key called `title`, inside the Model/Object `newNote`
		
		it's like making an {} 
		var whatever = {}
		
	- the .form gets hidden in .main
	- saves the newNote (obj) locally by putting it into notesArray (array/collection)
	- then calls fetchAndOrDisplay()
	
3. fetchAndOrDisplay()
	- if there's nothin in the notesArray, then it fetches the models from Parse, forEachs over the array and calls the putInSideBar()
	- if there is stuff in the notesArray, then it clears out .notes, forEachs over the array and calls the putInSideBar()


4. putInSideBar() - 
	- creates a variable called `li`, that gets the title value from the notesArray and sticks it inside an li
	- then it appends that li into .notes, which is inside of .sidebar
	- when you click the li, the putInDisplay() is called

5. putInDisplay() -
	- clears the .output-wrap
	- it creates 2 variables, an edit and delete button
	- it creates 2 other variable, an `h1` with the title value(the object from the notesArray) and a `p` with the content value (ditto)
	- it appends all 4 variables/elements into the .output-wrap

###### has an anonymous edit function
when you click the edit variable(not .edit?, why?), an anonymous function happens(is called?)
	
- it unhides .form in .main
- takes the value from title in notesArray and sticks it in the #title, in .form-group
- ditto w/the content
- makes a local variable called editSave, which is a button and it's appended inside .output-wrap

###### when you click the editSave button an anonymous function happens(is called?)
 - the value from #title in .form, is put into the notesArray
 - ditto for content
 - .form, in .main is hidden
 - a save method is called, which puts stuff on parse by..
 	- calling the getValue() which gets the value from title property in notesArray and puts it in the #title
 	
###### and there is also an anonymous delete function
when you click the when you click the kill variable(not .kill?, why?), an anonymous function happens(is called?)
- clears .output-wrap
- calls a destroy method







#### why, when i brake up the edit and delete functions from the putInDisplay(),  don't they work?
- tried making each one its own functions and matching the arg(notes)
	- error = undefined doesn't have a get function/destroy function
			
##### do the variables inside display need to be global?
- i took the var off of em inside putInDisplay (that should make em global), didn't work
- i declared the variables globally and referenced them inside putInDisplay(), no dice
- inside the delete function, i replaced note(the arg from putInDisplay) with newNote (the obj being effected), nope
- and this.newNote.destroy, nada
###### how do you reference the newNote?
			ANSWER = had to call each function, delete + edit, inside its own click event. and the args had to match.
	
#### refresh needs to happen after edit, delete + editSave
- DONE!!

#### HIDE THE SAVE BUTTON UNTIL IT'S NEEDED

#### make only 1 save button
- works with edit too

#### i wana see the `notes` upon first loading the app
DONE!


##### how change the icon in the left corner of the browser tab
- make a new 1, use a favicon generator. 
- delete their favicon in the app folder. 
- stick new 1 in there.
- grunt build