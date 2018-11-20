# NeoAPI

This is demo of an API that uses [Neo4j Bolt Driver](https://neo4j.com/docs/develo per-manual/current/drivers/).
The API contains the following functions:
-Create an Employee node
-Return all employees


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
Java JRE
```
sudo apt-get install default-jre
sudo apt-add-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
```
[Neo4j Database installation](https://neo4j.com/docs/operations-manual/current/installation)
```
cd $NEO4J_HOME
./bin/neo4j start
```
Open browser at http://localhost:7474
  -change default password

Neo4j Bolt driver
The neo4j driver should be availabe at
```
bolt://localhost:7687
```

[Install Nodejs](https://nodejs.org/en/download/)


### Installing

A step by step series of examples that tell you how to get a development env running
```
git clone https://github.com/jfloz/neoapi.git
cd neoapi
npm install
```
npm will install neo4j-driver and expressjs

Open conf.json to review link to neo4j and credentials

Start node server
```
node server.js
```


## APIs
*ADD Employee Given employee_name and emp_id*

INPUT- HTTP GET ../add_employee/employee_name/emp_id

OUTPUT- JSON confirmation

Example

curl "http://localhost:3000/add_employee/Jaime/8"



*RETURN ALL Employees*

INPUT- HTTP GET ../employees

OUPUT- JSON

curl "http://localhost:3000/employees"


## Deployment to EC2
Java JRE
```
sudo apt-get install default-jre
sudo apt-add-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
```
Neo4j Database
[Intall](https://neo4j.com/docs/operations-manual/current/installation)
```
cd $NEO4J_HOME
./bin/neo4j start
```
NOTE: to change INITIAL password from command line:
```./bin/neo4j stop
   ./bin/neo4j-admin set-initial-password <newpassword>
   ./bin/neo4j start
```
Nodejs
[Node](https://nodejs.org/en/download/)
```
sudo apt-get install nodejs
```
npm
```
sudo apt-get install npm
```
Clone repository
```
git clone https://github.com/jfloz/neoapi.git
cd neoapi
npm install
```

Open conf.json to review link to neo4j and credentials

Start node server
```
node server.js
```



##UI
Simple Single Page App
http://ec2-18-219-194-50.us-east-2.compute.amazonaws.com:3000/
Enter Employee name
Enter Employee ID
Click Add Employee Button

## Authors

* **Jaime Flores**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
* Hat tip to anyone whose code was used
