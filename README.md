# Roadside Assistance Application
Uber-like application for roadside assistance service, using React ([create-react-app](https://github.com/facebook/create-react-app)), [Material-UI](https://github.com/mui-org/material-ui) for frontend, and Typescript Node.js ([NestJS](https://github.com/nestjs/nest)) with [PostgreSQL](https://www.postgresql.org/) for backend.

## Getting started
### Prerequisites
- [Node.js and npm](https://nodejs.org/) 
- [PostgreSQL 10](https://www.postgresql.org/download/)  

When installing PostgreSQL, setup according to these configs:
```
Host: localhost
Port: 5432
Username: postgres
Password: postgres
```
Also, create a new database named `test`.
- [PostGIS](https://postgis.net/windows_downloads/)
### Installation
**1.** `npm install`  
**2.** Create a .env file in `/server` 
```
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_PORT=5432
DB_NAME=test
```  
**3.** Create a .env file in `/client`  
```
REACT_APP_GOOGLE_MAPS_API=XXXXXXXXXXXXXXX
```  
Substitute this with your Google Maps API key. Note that you must enable the [Places API](https://developers.google.com/places/web-service/intro) service. This is used when the user types in the address, Google Maps Places Autocomplete API will autocomplete / autosuggest the filled-in address.  

**4.** Open 2 terminal. Navigate to `/client` in 1 terminal and `/server` in the other one.  
**5.** `npm start` in 2 terminals.  

**Optional**
- **Populate test data:**  

Open a new terminal and navigate to `/server`. Run
```
psql -U postgres test < full_test.bak
```
This will populate the database with 100 customer and roadside professional accounts, 1000 roadside service requests and payment transactions.
- **View admin dashboard:**  

First, make a `POST` request to `localhost:3001/api/auth/register` with this JSON object (body):
```javascript
{
  "email": "admin123@gmail.com",
  "password": "123",
  "userType": "admin"
}
```
You can use [Postman](https://www.getpostman.com) to do so. You can also choose any email and password combination so that a new admin account is created. (the credential above is used for the deployed version on Heroku). You can log in using this admin credentials afterwards and navigate to the Dashboard page to view Data tables related to the information in the database.

## Functionality
A web application which provides roadside assistance services. These services provide assistance to motorists whose vehicles have suffered a mechanical failure (e.g.flat batteries, flat tyres, towing, locked out or emergency fuel delivery) that leaves the driver stranded on the road. Customers can choose either:
- Membership subscription – customers will pay a fixed membership fee annually and are entitled to
unlimited roadside assistance callouts. This is similar to NRMA services.
- Pay-on-demand – customers will pay per service use. When the need emerges (e.g. their car broke
down), they will request assistance through the system. Prices are calculated and presented to customers
up front. This is similar to Uber-style but for roadside assistance.  

Once a customer makes a service request, it will be broadcasted to all the registered professionals who are
available and capable to provide this service in nearby area. They will receive information about the
problematic vehicle (e.g. location, plate number, model, etc.), instructions and payment via the system. They
can then decide whether they accept the request. The customer can see how many responders are in the area via
the system and which one accepts their request. The customer can then choose from the accepted responders
(e.g. based on ratings, reviews and prices). Once the service is completed, the customer can rate and review it
using the system. Payment will be deducted from their credit card and will be credited to the professional’s
account.

Please refer to this [document](https://docs.google.com/document/d/1Ajjk6LkibZUHjc_RHcaSIgE6791f2COrWHbK1clsgWQ/edit?usp=sharing) for more information about the functionality and the user interface of the web app.

## Built with
- [create-react-app](https://github.com/facebook/create-react-app) - React user interface library.
- [NestJS](https://github.com/nestjs/nest) - A progressive Typescript Node.js framework for building efficient, reliable and scalable server-side applications.
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Material-UI](https://github.com/mui-org/material-ui) - Material Design components for React
- [downshift](https://github.com/downshift-js/downshift) - React Autocomplete Dropdown
- [axios](https://github.com/axios/axios) - HTTP client
- [moment](https://github.com/moment/moment) - Formatting and displaying dates and times
- [mui-datatables](https://github.com/gregnb/mui-datatables/) - Datatables for React using Material-UI 
- [TypeORM](https://github.com/typeorm/typeorm) - ORM for Typescript and PostgreSQL

## Authors and contributors
- Hieu Chu: Frontend
- Long Hung Nguyen: Backend

## License
Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
