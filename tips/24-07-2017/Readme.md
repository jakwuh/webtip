Webpack DefinePlugin supports objects:

```js
// webpack.conf.js
new webpack.DefinePlugin({
  FEATURES: {
    ADMIN: {
      ENABLED: JSON.stringify(false)
    }
  }
})

// index.js
if (FEATURES.ADMIN.ENABLED) {
  console.log('Admin is enabled');
}
```

In the example `JSON.stringify` is not necessary, but is preferable. This is because you usually want primitive values to be placed as-is. Without `JSON.stringify` in this case you should pass `ENABLED: false` (or `ENABLED: 'false'`) and `VERSION: "'1.44.0'"` (note double quotes). To avoid mistakes with quotes you'd better always use `JSON.stringify`: `ENABLED: JSON.stringify(false)` and `VERSION: JSON.stringify('1.44.0')`.
