# cypress-grep-example
[![ci status][ci image]][ci url] [![badges status][badges image]][badges url]
[![renovate-app badge][renovate-badge]][renovate-app] ![cypress version](https://img.shields.io/badge/cypress-7.2.0-brightgreen) ![cypress-grep version](https://img.shields.io/badge/cypress--grep-1.0.1-brightgreen)
> Example application with grep tags inside the test names

See [cypress-grep](https://github.com/bahmutov/cypress-grep)

## Running some tests

Some tests in this repo have `@smoke` in their names (the symbol `@` has no meaning, any substring is a valid grep string). To run just the tests with substring `@smoke` you can do:

```
$ npx cypress run --env grep=@smoke
cypress-grep: only running tests with "@smoke" in their names
```

[ci image]: https://github.com/bahmutov/cypress-grep-example/workflows/ci/badge.svg?branch=main
[ci url]: https://github.com/bahmutov/cypress-grep-example/actions
[badges image]: https://github.com/bahmutov/cypress-grep-example/workflows/badges/badge.svg?branch=main
[badges url]: https://github.com/bahmutov/cypress-grep-example/actions
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
