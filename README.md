# cypress-grep-example
> Example application with grep tags inside the test names

See [cypress-grep](https://github.com/bahmutov/cypress-grep)

## Running some tests

Some tests in this repo have `@smoke` in their names (the symbol `@` has no meaning, any substring is a valid grep string). To run just the tests with substring `@smoke` you can do:

```
$ npx cypress run --env grep=@smoke
cypress-grep: only running tests with "@smoke" in their names
```
