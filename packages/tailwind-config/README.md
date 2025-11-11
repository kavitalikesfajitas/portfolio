# Package Usage

To use this package, your consuming project must include a PostCSS configuration file (`postcss.config.js`) with a similar setup:


File: `postcss.config.js`
```js
// If you want to use other PostCSS plugins, see the following:
// https://tailwindcss.com/docs/using-with-preprocessors

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

