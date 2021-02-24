# hello-vue-spa

> My first spa application on vue
## Cheatsheet

- At first, you need to install node.js
- npm install -g vue-cli
- vue init webpack-simple vue-spa
  - npm install (installs everything from package.json)
  - npm run dev
  - npm install --save-dev axios
  - npm install --save-dev vue-router
  - npm install --save vue-scrollto
  - npm install --save vuex

## Commands for db.json, required for [fake endpoint](https://my-json-server.typicode.com/)
``` js
// receiving data from another endpoint
const fetch = require('node-fetch')
f = fetch('url').then(async r => obj = await r.json())

// saving to file
const fs = require('fs')
fs.writeFileSync('./db.json', JSON.stringify({ object }, null, "\t"));
```
