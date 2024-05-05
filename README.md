# se4458APIgateway

API Gateway Project
This project is an API Gateway application developed with Node.js. API Gateway acts as a bridge between different services in microservice architectures, allowing requests to be managed and communication between services to be organized. This project offers various solutions on issues such as scalability, security and service management.


Features
API Routing
Routing rules to different API endpoints are defined under the routes folder. Thanks to these rules, incoming requests are forwarded to the appropriate services.

Fake API Endpoints
The fakeapi folder contains fake API endpoints designed to be used in development and testing processes. In this way, integration and load tests can be performed even before the real services are ready.

It starts the application via port 3000 and activates the API Gateway. After the application is run, you can see the server output by going to http://localhost:3000 through your browser.

Auxiliary Modules
The util folder contains modules that contain frequently used functions in the project. These modules help reduce code duplication and make the application cleaner.


Development
While working on this project, you can find the codes in the gateway.js and routes folder. These files and folders provide the basic functionality of the project.

Addictions
Some basic dependencies used in the project are:
Express.js
body-parser
dotenv

