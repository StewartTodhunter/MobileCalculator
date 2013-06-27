var calculator = (function() {

	var pub = {};
	var calc;
	var oper8;
	var clearOnEnter = true;
	var mem;
	
	window.onload=function(){	
		pub.clearM();		
	};	
	
	pub.clearM = function() {
		clearScreen(true);	
		calc = "";
		oper8 = "";
		mem = 0;	
		clearOnEnter = true;		
	}

	pub.readM = function() {	
		output(mem);		
	}

	pub.addM = function() {	
		mem = parseFloat(read()) + mem;
		clearScreen(true);		
	}

	pub.minusM = function() {	
		mem = parseFloat(read()) - mem;
		clearScreen(true);		
	}

	pub.operation = function(opInput) {	
		oper8 = opInput;
		
		if (read().length > 0) {
			calc = read();
		}
			
		clearScreen(true);
	}

	pub.solve = function() {
		if (oper8 == "")
			screenFlash();
		else if (oper8 == "+")
			output(parseFloat(calc) + parseFloat(read()));
		else if (oper8 == "-")
			output(parseFloat(calc) - parseFloat(read()));
		else if (oper8 == "/")
			output(parseFloat(calc) / parseFloat(read()));
		else if (oper8 == "X")
			output(parseFloat(calc) * parseFloat(read()));

		oper8 = "";
		clearOnEnter = true;		
	}	

	pub.enterText = function(input) {			
		screenFlash();
		
		if (clearOnEnter == true) {			
			save(input);
			clearOnEnter = false;			
		}else {			
			if (read().length < 10)			
				save(read() + input);				
		}
	}
	
	function clearScreen(zero) {	
		screenFlash();		
		clearOnEnter = true;
		
		if (zero == true)
			save("0");			
		else save("");		
	}
	
	function output(answer) {		
		clearScreen(false);		
		answer = answer.toString();
		
		if (answer.length > 10)
			pub.enterText("overflow!");
		else {		
			if (answer == "NaN")
				pub.enterText("0");
			else pub.enterText(answer);			
		}		
	}
	
	function screenFlash() {	
		screenStyle().color = "white";
		setTimeout(function() {screenStyle().color = "black";}, 100);		
	}
	
	function read() {	
		return screen().innerHTML;		
	}
	
	function save(input) {	
		screen().innerHTML = input;		
	}
	
	function screenStyle() {	
		return screen().style;		
	}
	
	function screen() {	
		return document.getElementById("screen");		
	}
	
	return pub;
}());