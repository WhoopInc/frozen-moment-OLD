---
title: Load locale modules (Node.js)
version: 3.0.0
signature: |
  frozenMoment.locale(String);
---


Loading locales in NodeJS is super easy. If there is a file in `moment/locale/` named after a particular locale key, it will be loaded on the first call to `frozenMoment.locale` with that key.

```javascript
var frozenMoment = require('moment');
frozenMoment.locale('fr');
frozenMoment(1316116057189).fromNow(); // il y a une heure
```

If you want your locale supported, create a pull request to the `develop` branch with the [required locale and unit test files](#/i18n/add-locale/).
