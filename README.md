# shopee-test
Dockerized Node.JS app to satisfy shopee test. 

# Requirement
docker and docker-compose for running, node and npm for unit and integration testing

# How to Run
run the following command:

```sh
docker-compose up --build -d
```

# Unit & Integration Testing
Unit and Integration testing is done by running npm script
## Unit Testing
Unit testing is done by running the test in the shopee-billing-service folder
```sh
cd shopee-billing-service
npm install
npm run test
```
## Integration Testing
Unit testing is done by running the test in the express folder
```sh
cd express
npm install
npm run test
```