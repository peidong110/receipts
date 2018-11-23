Assignment#3 for 2406 
This is a course project of COMP2406 in Carleton University. 
This project is implemented by Tiancheng Zhao Student #100988646, Payton Pei Student# 101065299. 
The source code of this project is considered to be the intellectual property belongs to Tiancheng Zhao and Payton Pei. 
Email: 
TianchengZhao@cmail.carleton.ca 
paytonpei@cmail.carleton.ca 

Environment Info: 
Operating System: macOS Mojave 10.14 
Browser: Chrome [Version 69.0.3497.100 (Official Build) (64-bit)] 
Node Version: v10.10.0 
NPM Version: 6.4.1 
Environment Info: 
Operating System: macOS Mojave 10.14 
Browser: Chrome [Version 69.0.3497.100 (Official Build) (64-bit)] 
Node Version: 8.11.1 
NPM Version: 6.4.1 

Install: 
    "express": "^4.16.4",
    "morgan": "^1.9.1" is required to be installed for this programme

Recommand Test Instruction: 
		locate to the directory that has index.js
		and run index.js by typing node index.js
		To Test:
		'http://localhost:3000/recipes.html'
		'http://localhost:3000/recipes'
		'http://localhost:3000/index.html'
		'http://localhost:3000/'
		'http://localhost:3000'
		You can enter ingredents and it will be displayed for you.
Issue:
	We cannot http://localhost:3000/recipes?ingredients=basil,apple to display properly
	But you can use this to get the food http://localhost:3000/?ingredients=basil
	Client is browser, and server is ran seperately.
