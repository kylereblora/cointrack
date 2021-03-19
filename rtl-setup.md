# Setting up react-testing-library for CoinTrack

In order for me not to forget the steps I've done to setup testing in this project, I decided to document them here. :)

## 1. Install dependencies

`react-testing-library` is included inside Create React App out of the box, but since this version did not include that, I had to manually install it here.

```
npm i -D @babel/core @testing-library/jest-dom @testing-library/react @types/jest babel-jest jest
```

## 2. Create a `babel.config.js` file

We'll create a new config file in order to customize the project's babel configuration.

```js
// babel.config.js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
};
```

## 3. Create a `setupTest.ts` file

Required in order to prevent [this](https://github.com/testing-library/react-testing-library/issues/379) from happening.

```js
// setupTest.ts
import "@testing-library/jest-dom/extend-expect";
```

Then, reference that inside the `jest` property in our `package.json`:

```js
{
  ...,
  "jest": {
    "setupFilesAfterEnv": [
      "<rootDir>/setupTest.ts"
    ]
  }
}
```

After these, we can now create our tests!
