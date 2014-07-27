---
title: Get the default locale
version: 3.0.0
signature: |
  frozenMoment.locale();
---


If you are changing the default locale frequently, you may want to know which locale is currently being used. This is as simple as calling `frozenMoment.locale` without any parameters.

```javascript
frozenMoment.locale('en'); // set to english
frozenMoment.locale(); // returns 'en'
frozenMoment.locale('fr'); // set to french
frozenMoment.locale(); // returns 'fr'
```
