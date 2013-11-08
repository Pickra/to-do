# To-do

This is my first attempt at a to-do app. I'm also using [Parse](https://www.parse.com/) for the 1st time as well as an assignment while at the [Iron Yard](http://theironyard.com/).


~~It's a little buggy, but it's on my to-do list….~~

[Check it out](http://pickra.github.io/to-do/)

#### Refactor notes below

1. pressing the `make a new note` button removes the .hidden from .form
	- so now the 2 .form-groups in .main are visible

2. SAVE BUTTON FUNCTION -  pressing the `save` button in .main is putting the value from `#title` into a property key called `title`, inside the Model/Parse Object `newNote`
		
		it's like making an {} 
		var whatever = {}
		
	- the .form gets hidden
	- saves the new objs on Parse by putting them in an array/collection
	- then forEachs over the array and calls the putInSideBar()
	- and the end result it fetch() from parse to the app

3. putInSideBar()











#### HIDE THE SAVE BUTTON UNTIL IT'S NEEDED
- make a new note
- save an edit

#### i wana see the `notes` upon first loading the app