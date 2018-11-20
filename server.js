
const neo4j = require('neo4j-driver').v1;
var fs =require('fs');
const conf = JSON.parse(fs.readFileSync('conf.json'));
const uri=conf.neo_uri;
const user=conf.neo_username;
const password=conf.neo_password;
const app_port=Number(conf.app_port);
console.log(conf);
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

var data=fs.readFileSync('words.json');
var words=JSON.parse(data);
//console.log(words);

console.log("server is starting");
var express=require('express');
var app=express();
var server=app.listen(app_port);

app.use(express.static('website'));


app.get('/employees',getEmployees);
function getEmployees(request,response){
	const resultPromise = session.run(
  'MATCH (employees) RETURN employees;',
	);
	resultPromise.then(result => {
  session.close();

  var output=[];
  for (var i=0; i<result.records.length;i++){
  	var r={};
		r.node=i;
  	var singleRecord=result.records[i];
  	r.properties=singleRecord.get(0).properties;
  	output.push(r);
  }
  console.log(output);
	response.send(output);
  // on application exit:
  driver.close();
})
}

app.get('/add_employee/:name/:id',addEmployee);
function addEmployee(request,response){
	var data=request.params;
	const personName = data.name;
	const employeeID=Number(data.id);

	const resultPromise = session.run(
  'CREATE (ee:Employee {name: $name, emp_id:$emp_id}) RETURN ee',
  {name: personName, emp_id:employeeID}
	);

	resultPromise.then(result => {
  	session.close();

  	const singleRecord = result.records[0];
  	const node = singleRecord.get(0);
  	console.log(node.properties.name);
		const aname=node.properties.name;
		const aid=node.properties.emp_id;
		var reply={name:aname,emp_id:aid,msg:"added employee"}
		response.send(reply);
  	// on application exit:
  	driver.close();
});
}


app.get('/add/:word/:score',addWord);
function addWord(request,response){
	var data=request.params;
	var word=data.word;
	var score=Number(data.score);
	words[word]=score;
	var data=JSON.stringify(words,null,2);
	fs.writeFile('words.json',data,finished);
	function finished(err){
		console.log('all set..');
		var reply={word:word,score:score,msg:"Thank you for your word"}
		response.send(reply)
	}
}


app.get('/all',sendAll);
function sendAll(request,response){
	response.send(words);
}


app.get('/search/:word/',searchWord);
function searchWord(request,response){
	var reply;
	var word=request.params.word;
	if(words[word]){
		reply={status:"found", word:word, score: words[word]}
	}else{
		reply={status:" not found", word:word }
	}
	response.send(reply);
}

// app.get('/', function (req, res) {
//   res.send('GET request to the homepage')
// })
