## Description

Task Management - a simple demo project on how to use [Nest](https://github.com/nestjs/nest) framework.

## Techniques

- JWT based authentication and API endpoint authorization guard with Passport
- Data persistence using MySQL DB with TypeORM
- Custom parameter decorator to get the user object from the request
- task status validation with pipe
- property validator in DTOs

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
