# To-do

This is my first attempt at a to-do app. I'm also using [Parse](https://www.parse.com/) for the 1st time as well as an assignment while at the [Iron Yard](http://theironyard.com/).


~~It's a little buggy, but it's on my to-do list….~~

[Check it out](http://pickra.github.io/to-do/)

#### Refactor notes below

1. pressing the `make a new note` button removes the .hidden from .form
	- so now the 2 .form-groups in .main are visible

2. saveButton() -  pressing the `save` button in .main is putting the value from `#title` into a property key called `title`, inside the Model/Parse Object `newNote`
		
		it's like making an {} 
		var whatever = {}
		
	- the .form gets hidden in .main
	- saves the newNote (obj) locally by putting it into notesArray (array/collection)
	- then runs fetchAndOrDisplay()
	
3. fetchAndOrDisplay()
	- if there's nothin in the notesArray, then it fetches the models from Parse, forEachs over the array and calls the putInSideBar()
	- if there is stuff in the notesArray, then it clears out .notes, forEachs over the array and calls the putInSideBar()


4. putInSideBar() - 











#### HIDE THE SAVE BUTTON UNTIL IT'S NEEDED
- make a new note
###### make only 1 save button
- worlks with edit too

#### i wana see the `notes` upon first loading the app