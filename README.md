## Description

Simple api service for creating learning modules, courses and categories.

Tech:
NestJs
MongoDb

Assumptions made:
Endpoints are created for the purpose of the required tasks, so it does not contain all CRUD functinoalities.

Category names are made unique because it seems logical that way. This also helps to index the field which makes it better to search by name.

Category, course or learning module, anything can be created independently and later on relations can be made by updating category or course as needed.

Note that the usage schema requires a userId, that is basically the learner id, but since this task does not include an auth flow so you can use any mongodb _id to fill it instead.

There is swagger for easily checking the api endpoints. When the app is running locally, then it can be visited on: http://localhost:4001/api#/

## Setup and installation

Create an .env file from .env.example

```bash
$ cp .env.example .env
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

Some tests are written for controllers and services.

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov

# to run specific tests, for example on usage (from project root):
$ yarn test --testPathPattern=src/usage/usage.controller.spec.ts
```
