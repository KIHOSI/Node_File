var Gpio = require("onoff").Gpio; // include onoff to interact with the GPIO
var LED = new Gpio(4,'out'); // use GPIO 4 as output (Physical pin 7)
var pushButton = new Gpio(17,'in','both'); //use GPIO pin 17 (Physical pin 11) as input, 
// and 'both' button presses, and release should be handled

pushButton.watch(function (err,value){ // watch for hardware interrupts on pushButton GPIO,
// specify callback function 
	if(err){ //if an error
		console.error('There are an error',err); //output error message to console
		return;
	}
	LED.writeSync(value); //turn LED on or off depending on the button state (0 or 1)
	//按著button，state為1;放開button，state為0
	//console.log(value);
});

function unexportOnClose(){ //function to run when exiting program 
	LED.writeSync(0); // Turn LED off
	LED.unexport(); // Unexport LED GPIO to free resource
	pushButton.unexport(); //Unexport Button GPIO to free resource
}

process.on('SIGINT',unexportOnClose); //function to run when user close with using ctrl+c