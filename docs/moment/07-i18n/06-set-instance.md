---
title: Set an instance’s locale
version: 3.0.0
signature: |
  frozenMoment.build().locale(String);
---


You can set an instance specific locale configuration on a builder object.

```javascript
frozenMoment.locale('en');    // set the default locale to English
var globalLocale = frozenMoment();
var localLocale = frozenMoment().thaw().locale('fr').freeze();
localLocale.format('LLLL');   // dimanche 15 juillet 2012 11:01
globalLocale.format('LLLL');  // Sunday, July 15 2012 11:01 AM

frozenMoment.locale('es');    // change the default locale to Spanish; does not affect existing instances
localLocale.format('LLLL');   // dimanche 15 juillet 2012 11:01
globalLocale.format('LLLL');  // Sunday, July 15 2012 11:01 AM

globalLocale = globalLocale.thaw().locale("global").freeze(); // replace with a copy that tracks the default locale setting
localLocale.format('LLLL');   // dimanche 15 juillet 2012 11:01
globalLocale.format('LLLL');  // Domingo 15 Julio 2012 11:03
```

This is especially useful when you need to build several FrozenMoment instances that display the same moment in time using different locales.

```javascript
var builder = frozenMoment.build('2012-07-15T11:01:00');
var englishLocale = builder.locale('en').freeze();
var frenchLocale = builder.locale('fr').freeze();
frenchLocale.format('LLLL');   // dimanche 15 juillet 2012 11:01
englishLocale.format('LLLL');  // Sunday, July 15 2012 11:01 AM
```

You can also specify an array of locale identifiers, same as the [global locale configuration](#/i18n/set-global/).
