---
title: Changing language locally
version: 1.7.0
signature: |
  frozenMoment().lang(String);
---


A global language configuration can be problematic when passing around moments that may need to be formatted into different languages.

You can set an instance specific language configuration on a builder object.

```javascript
frozenMoment.lang('en'); // default the language to English
var globalLang = frozenMoment();
var localLang = frozenMoment();

localLang = localLang.thaw().lang('fr').freeze(); // replace with a copy that uses French
localLang.format('LLLL'); // dimanche 15 juillet 2012 11:01
globalLang.format('LLLL'); // Sunday, July 15 2012 11:01 AM

frozenMoment.lang('es'); // change the global language to Spanish
localLang.format('LLLL'); // dimanche 15 juillet 2012 11:01
globalLang.format('LLLL'); // Domingo 15 Julio 2012 11:03

localLang = localLang.thaw().lang(false).freeze(); // replace with a copy that has no instance language setting
localLang.format('LLLL'); // Domingo 15 Julio 2012 11:03
globalLang.format('LLLL'); // Domingo 15 Julio 2012 11:03
```

If you call `frozenMoment#lang` with no parameters, you get back the language configuration that would be used for that frozenMoment.

```javascript
var fr = frozenMoment.build().lang('fr').freeze();
fr.lang().months(frozenMoment([2012, 0])) // "janvier"
fr = fr.thaw().lang('en').freeze();
fr.lang().months(frozenMoment([2012, 0])) // "January"
```

If you need to access the language data for a moment, this is the preferred way to do so.

As of **2.3.0**, you can also specify an array of language identifiers. It works the same was it does in the [global language configuration](http://localhost:8000/docs/#/i18n/changing-language/).
