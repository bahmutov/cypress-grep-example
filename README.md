# cypress-grep-example
[![ci status][ci image]][ci url] [![badges status][badges image]][badges url]
[![cypress-grep-example](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/4agux9/main&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/4agux9/runs)

[![renovate-app badge][renovate-badge]][renovate-app] ![cypress version](https://img.shields.io/badge/cypress-7.2.0-brightgreen) ![cypress-grep version](https://img.shields.io/badge/cypress--grep-1.8.0-brightgreen)
> Example application with grep tags inside the test names

See [cypress-grep](https://github.com/bahmutov/cypress-grep)

## Running smoke tests

Some tests in this repo in the [cypress/integration](./cypress/integration) folder have the string `@smoke` in their names (the symbol `@` has no meaning, any substring is a valid grep string. I just like to use such "tags" to stand out a little bit) or by adding the `tag: ['@smoke']` to their config object.

```js
// cypress/integration/routing-spec.js
describe('TodoMVC - React', function () {
  context('Routing', function () {
    // other tests

    // specify tags right in the test name
    it('should allow me to display all items @smoke', function () {
      ...
    })

    // ALTERNATIVE: specify tags in the test configuration object
    it('should respect the back button', { tags: ['@smoke'] }, function () {
      ...
    })
  })
})
```

To run just the tests with substring `@smoke` you can do:

```text
$ npx cypress run --env grep=@smoke
cypress-grep: only running tests with "@smoke" in their names
```

See the [.github/workflows/main.yml](./.github/workflows/main.yml) that first runs the smoke tests and then all the tests during the CI run. You can see the runs in the [repo's Actions tab](https://github.com/bahmutov/cypress-grep-example/actions).

[ci image]: https://github.com/bahmutov/cypress-grep-example/workflows/ci/badge.svg?branch=main
[ci url]: https://github.com/bahmutov/cypress-grep-example/actions
[badges image]: https://github.com/bahmutov/cypress-grep-example/workflows/badges/badge.svg?branch=main
[badges url]: https://github.com/bahmutov/cypress-grep-example/actions
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
