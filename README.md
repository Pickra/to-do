# To-do

This is my first attempt at a to-do app. I'm also using [Parse](https://www.parse.com/) for the 1st time as well as an assignment while at the [Iron Yard](http://theironyard.com/).


~~It's a little buggy, but it's on my to-do list….~~

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









#### why, when i brake up the edit and delete functions,  don't they work?
- tried making each one its own functions and matching the arg(notes)
	- error = undefined doesn't have a get function/destroy function
##### do the variables inside display need to be global?
- i took the var off of em inside putInDisplay (that should make em global), didn't work
- i declared the variables globally and referenced them inside putInDisplay(), no dice
- inside the delete function, i replaced note(the arg from putInDisplay) with newNote (the obj being effected), nope
- and this.newNote.destroy, nada
	
#### refresh needs to happen after edit, delete + editSave

#### HIDE THE SAVE BUTTON UNTIL IT'S NEEDED
- make a new note
###### make only 1 save button
- worlks with edit too

#### i wana see the `notes` upon first loading the app