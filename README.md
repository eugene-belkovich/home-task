## Installation

```bash
$ npm install
```

## Build and run in docker

Run application with docker-compose. This command runs database & run backend service

```bash
make dev
```

## Run locally

Before run application you need to run mongo database. You can use docker-compose or run mongo locally

```bash
npm run start:dev
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

If you want to run api-tests.http in Intellij IDEA or Webstorm IDE run this `npm run seed` before

## Seed

Populate mongo database with test data

```bash
$ npm run seed
```

## Format and lint

```bash
# format code
$ npm run format

# lint lint rules
$ npm run lint

# lint ts rules
$ npm run ts
```
