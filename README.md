![Thor](https://raw.githubusercontent.com/langens-jonathan/thor-en-de-tempel-der-verdoeming/master/src/images/header_logo.png?raw=true "Thor")
![Verdoeming](https://raw.githubusercontent.com/langens-jonathan/thor-en-de-tempel-der-verdoeming/master/src/images/subheader_logo.png?raw=true "De tempel der verdoeming")
A quick game built with react.js to check out the framework. No prior react.js knowledge.

![Screen shot](https://raw.githubusercontent.com/langens-jonathan/thor-en-de-tempel-der-verdoeming/master/screenshots/ss1.png?raw=true "The game")
## Inspiration
The inspiration for this game is queen games's escape series

## Start the game
```
./start-game.sh
```
or just
```
yarn start
```

## How to play
![How to play](https://raw.githubusercontent.com/langens-jonathan/thor-en-de-tempel-der-verdoeming/master/screenshots/ss2.png?raw=true "How to play")
+ A: Go to this tile, if there are icons (other than the 2 squares) you must be able to pay this cost. To pay it you must have reserved the cost (see bullet 'E')
+ B: Go to this tile, if this icon is there than the move is free
+ C: The hero
+ D: Your current score
+ E: Reserved symbols, to reserve see bullet 'G'
+ F: Most thumbs down will come up grey, that means they are locked. To unlock a locked symbol you must reserve a 'thumbs up' for each 2 'thumbs down' symbols. A 'thumbs up' will only unlock pairs of 'thumb down's.
+ G: Your free symbol tray. Click on a symbol to reserve it.
+ H: Refreshes the free symbol tray.
+ I: The time left before the temple collapses.

![Alt text](relative/path/to/img.jpg?raw=true "Title")

## Tilesets
The screenshots are taken with a commercial tileset.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Supported Browsers

By default, the generated project uses the latest version of React.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.

## Supported Language Features and Polyfills

This project supports a superset of the latest JavaScript standard.<br>
In addition to [ES6](https://github.com/lukehoban/es6features) syntax features, it also supports:

* [Exponentiation Operator](https://github.com/rwaldron/exponentiation-operator) (ES2016).
* [Async/await](https://github.com/tc39/ecmascript-asyncawait) (ES2017).
* [Object Rest/Spread Properties](https://github.com/sebmarkbage/ecmascript-rest-spread) (stage 3 proposal).
* [Dynamic import()](https://github.com/tc39/proposal-dynamic-import) (stage 3 proposal)
* [Class Fields and Static Properties](https://github.com/tc39/proposal-class-public-fields) (part of stage 3 proposal).
* [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) and [Flow](https://flowtype.org/) syntax.

Learn more about [different proposal stages](https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-).

While we recommend using experimental proposals with some caution, Facebook heavily uses these features in the product code, so we intend to provide [codemods](https://medium.com/@cpojer/effective-javascript-codemods-5a6686bb46fb) if any of these proposals change in the future.

Note that **the project only includes a few ES6 [polyfills](https://en.wikipedia.org/wiki/Polyfill)**:

* [`Object.assign()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) via [`object-assign`](https://github.com/sindresorhus/object-assign).
* [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) via [`promise`](https://github.com/then/promise).
* [`fetch()`](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) via [`whatwg-fetch`](https://github.com/github/fetch).

If you use any other ES6+ features that need **runtime support** (such as `Array.from()` or `Symbol`), make sure you are including the appropriate polyfills manually, or that the browsers you are targeting already support them.

Also note that using some newer syntax features like `for...of` or `[...nonArrayValue]` causes Babel to emit code that depends on ES6 runtime features and might not work without a polyfill. When in doubt, use [Babel REPL](https://babeljs.io/repl/) to see what any specific syntax compiles down to.
