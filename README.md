# cypress-grep-example
[![ci status][ci image]][ci url] [![badges status][badges image]][badges url]
[![cypress-grep-example](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/4agux9/main&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/4agux9/runs)

[![renovate-app badge][renovate-badge]][renovate-app] ![cypress version](https://img.shields.io/badge/cypress-7.6.0-brightgreen) ![cypress-grep version](https://img.shields.io/badge/cypress--grep-2.5.2-brightgreen)
> Example application with grep tags inside the test names

The demo example for the [cypress-grep](https://github.com/bahmutov/cypress-grep) plugin.

Watch the video [intro to cypress-grep](https://www.youtube.com/watch?v=HS-Px-Sghd8) which shows how this repository tags tests, uses [cypress-grep](https://github.com/bahmutov/cypress-grep) plugin, and sets up the TypeScript intelligent code completion.

You can also watch [How I organize pull request workflows](https://youtu.be/SFW7Ecj5TNE) where I show how the GitHub workflows in [.github/workflows](./.github/workflows) are organized to run the smoke tests first on pull request.

## Install and start the app

Before filtering by test title and tag, we need to install dependencies and start the application

```shell
$ npm install
$ npm start
```

## Running tests by title

We can pick some tests to run using part of their title.

```shell
$ npx cypress run --env grep="the current number of todo items"
```

Runs just a single test found in [cypress/integration/counter-spec.js](./cypress/integration/counter-spec.js). The rest of the tests are still loaded, but are marked pending. To really target specific tests, add `--spec ...` argument

```shell
$ npx cypress run --env grep="the current number of todo items" \
  --spec cypress/integration/counter-spec.js
```

## Running tests by tag

Some tests in this repo in the [cypress/integration](./cypress/integration) folder have the tag `@smoke` in their config object. The symbol `@` has no meaning, I just like to use this prefix to make tags searchable.

```js
// cypress/integration/routing-spec.js
describe('TodoMVC - React', function () {
  context('Routing', function () {
    // other tests

    it('should allow me to display all items', { tags: '@smoke' }, function () {
      ...
    })

    // if you have more than one tag, use an array
    it('should respect the back button', { tags: ['@smoke'] }, function () {
      ...
    })
  })
})
```

To run just the tests with substring `@smoke` you can do:

```text
$ npx cypress run --env grepTag=@smoke
cypress-grep: filtering using tag "@smoke"
```

See the [.github/workflows/main.yml](./.github/workflows/main.yml) that first runs the smoke tests and then all the tests during the CI run. You can see the runs in the [repo's Actions tab](https://github.com/bahmutov/cypress-grep-example/actions).

[ci image]: https://github.com/bahmutov/cypress-grep-example/workflows/ci/badge.svg?branch=main
[ci url]: https://github.com/bahmutov/cypress-grep-example/actions
[badges image]: https://github.com/bahmutov/cypress-grep-example/workflows/badges/badge.svg?branch=main
[badges url]: https://github.com/bahmutov/cypress-grep-example/actions
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
