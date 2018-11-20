const neo4j = require('neo4j-driver').v1;
const uri="bolt://localhost:7687";
const user="neo4j";
const password="jeo4j"
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

const personName = 'Alice';
const employeeID=1;
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
 
  // on application exit:
  driver.close();
})