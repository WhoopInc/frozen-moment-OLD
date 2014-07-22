---
title: Checking the current FrozenMoment language
version: 1.6.0
signature: |
  frozenMoment.lang();
---


If you are changing languages frequently, you may want to know what language is currently being used. This is as simple as calling `frozenMoment.lang` without any parameters.

```javascript
frozenMoment.lang('en'); // set to english
frozenMoment.lang(); // returns 'en'
frozenMoment.lang('fr'); // set to french
frozenMoment.lang(); // returns 'fr'
```
