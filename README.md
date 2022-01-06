This repo is to reproduce a Serenity/JS 3.0.0-rc issue when using WDIO with an external libary.
It contains two separate projects:

- webdriver-mocha-lib (the library)
- webdriver-mocha-todomvc (the consuming project)

Both projects are basically the examples from the Serenity/JS main branch: https://github.com/serenity-js/serenity-js/tree/main/examples/webdriverio-mocha-todomvc

## 1. Build webdriver-mocha-lib (wdio-lib)

```
cd webdriver-mocha-lib
npm install
```

Now you can run a `npm run test` to verify that the project itself is running.

```
npm run dist
```

(!) REMARK: When running the npm script `dist` make sure your OS resp. terminal supports `cp` for copy a file, otherwhise replace it by your prefered commannd for copy.

## 2. Creat a local link to this package

```
cd dist
npm pack
```

This generates a `wdio-lib-3.0.0.tgz`. Copy this to somewhere else and untar the `*.tgz` and the `*.tar` file as well. From the root of the directory where you've extracted the contents run:

```
npm link
```

## 3. Build webdriver-mocha-todomvc (consumer)

```
cd webdriver-mocha-todomvc
npm install
npm link wdio-lib
```

## 4. Reproduction

There are to specs (which to run is defined in wido.conf):

- manage_a_todo_list.spec (the original one)
- manage_a_todo_list_use_lib.spec (the one using the external lib)

The orginal one runs without problems, but the external lib (using the consumer projects actors) will fail:

```
[test:acceptance] [0-0] Managing a Todo List: TodoMVC actor records new items
[test:acceptance] [0-0]
[test:acceptance] [0-0]   Wendy starts with an empty list
[test:acceptance] [0-0]     Wendy navigates to '/'
[test:acceptance] [0-0]       ✗ ConfigurationError: Wendy can't BrowseTheWeb yet. Did you give them the ability to do so?
[test:acceptance] [0-0]
[test:acceptance] [0-0] ✗ Execution failed with error (82ms)
[test:acceptance] [0-0]
[test:acceptance] [0-0]   ConfigurationError: Wendy can't BrowseTheWeb yet. Did you give them the ability to do so?
[test:acceptance] [0-0]       at Actor.abilityTo (C:\tmp\actor_repro\webdriverio-mocha-todomvc\node_modules\@serenity-js\core\src\screenplay\actor\Actor.ts:47:19)
[test:acceptance] [0-0]       at Function.as (C:\tmp\wdio-lib-3.0.0\package\node_modules\@serenity-js\web\src\screenplay\abilities\BrowseTheWeb.ts:18:22)
[test:acceptance] [0-0]       at ExecuteSynchronousScript.executeAs (C:\tmp\wdio-lib-3.0.0\package\node_modules\@serenity-js\web\src\screenplay\interactions\ExecuteScript.ts:338:29)
[test:acceptance] [0-0]       at ExecuteSynchronousScript.performAs (C:\tmp\wdio-lib-3.0.0\package\node_modules\@serenity-js\web\src\screenplay\interactions\ExecuteScript.ts:227:20)
[test:acceptance] [0-0]
```

I prepared `wdio.conf` to use both specs (commented out) and for both `Actors` (external, internal).

Using:

- External tasks (page elements) with external `Actors` works!
- Internal tasks (page elements) with internal `Actors` works!
- Internal tasks (page elements) with **external** `Actors` **fails**!
- External tasks (page elements) with **internal** `Actors` **fails**!
