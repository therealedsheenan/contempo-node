# contempo-node
Just another node API boilerplate.

### Dependencies
- Mongo Database


### Installation
Install dependecies:

```
$ npm install
```
or by using yarn
```
$ yarn
```

### Running Development Environment
```
$ npm run dev
```
or by using yarn
```
$ yarn dev
```

### Running tests
```
$ npm test
```
or by using yarn
```
$ yarn test
```

### Production
```
$ npm start
```
or by using yarn
```
$ yarn start
```

### Routes
Here are the list of pre-made routes:

GET `/api/` - Welcome endpoint

GET `/api/users/` - Get all the users

POST `/api/users/new` - Creating new user

PUT `/api/users/` - Editing User *must have the Authorization Token to be valid.

POST `/api/users/login` - Login endpoint

Checkout the POSTMAN collection file for more information.
