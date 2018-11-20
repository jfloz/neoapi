const neo4j = require('neo4j-driver').v1;
const uri="bolt://localhost:7687";
const user="neo4j";
const password="jeo4j"
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

const personName = 'Alice';
const employeeID=1;
const resultPromise = session.run(
  'CREATE (ee:Employee {name: $name, emp_id:$emp_id}) RETURN ee',
  {name: personName, emp_id:employeeID}
);

resultPromise.then(result => {
  session.close();

  const singleRecord = result.records[0];
  const node = singleRecord.get(0);

  console.log(node.properties.name);

  // on application exit:
  driver.close();
});