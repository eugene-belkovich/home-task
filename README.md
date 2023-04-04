## Installation

```bash
$ npm install
```

### Build and run docker locally

Run application with docker-compose. This command runs database & run backend service

```bash
make dev
```

Stop & remove local dependencies

```bash
make stop
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

## Test

Populate mongo database with test data

```bash
$ npm run seed
```
