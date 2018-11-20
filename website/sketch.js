var globaldata;
function setup() {
	//createCanvas(windowWidth-10, windowHeight-10);
	createCanvas(400, 400);
	background(0);
	//loadJSON('employees',gotData);
	drawData();
	//loadJSON("http://api.open-notify.org/astros.json", gotData2, 'jsonp');
	console.log('running');
	var button=select('#submit');
	button.mousePressed(submitEmployee);
}
function drawData(){
	loadJSON('employees',gotData);
}

function submitEmployee(){
	var name=select('#name').value();
	var emp_id=select('#emp_id').value();
	console.log(name);
	console.log(emp_id);
	loadJSON('add_employee/'+name+'/'+emp_id, finished);
	function finished(data){
		drawData();
		//console.log(data);
	}
}

function gotData(data){
	background(0);
	var k=data.lenght;
	for(var i=0; i<data.length; i++){
		console.log(data[i].properties.name);
		fill(255);
		//ellipse(random(width),random(height),16,16);
		//textSize(40);
		var atext=data[i].properties.name+"("+data[i].properties.emp_id+")"
		text(atext,random(50,350),random(50,350));
	}
}


function draw() {
 	//background(60,255,10);
}
