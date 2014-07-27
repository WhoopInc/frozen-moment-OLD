---
title: Get an instance’s locale
version: 3.0.0
signature: |
  frozenMoment().locale();
---


If you call `frozenMoment#locale` with no parameters, you get back the locale key in use for that frozenMoment.  If the instance is bound to the `"global"` locale, this will return the current default locale key (not `"global"`).

```javascript
var fr = frozenMoment.build().locale('fr').freeze();
fr.locale();  // "fr"

frozenMoment.locale('de');
var global = frozenMoment.build().locale('global').freeze();
global.locale();  // "de"
```
