---
title: Set the default locale
version: 3.0.0
signature: |
  frozenMoment.locale(String);
  frozenMoment.locale(String[]);
  frozenMoment.locale(String, Object);
---


By default, FrozenMoment comes with English locale strings. If you need other locales, you can load them into FrozenMoment for later use.

To load a locale, pass the key and the string values to `frozenMoment.locale`.

More details on each of the parts of the locale bundle can be found in the [customization](#/customize/) section.

```javascript
frozenMoment.locale('fr', {
    months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
    monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
    weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
    weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
    weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[Aujourd'hui à] LT",
        nextDay: '[Demain à] LT',
        nextWeek: 'dddd [à] LT',
        lastDay: '[Hier à] LT',
        lastWeek: 'dddd [dernier à] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "dans %s",
        past : "il y a %s",
        s : "quelques secondes",
        m : "une minute",
        mm : "%d minutes",
        h : "une heure",
        hh : "%d heures",
        d : "un jour",
        dd : "%d jours",
        M : "un mois",
        MM : "%d mois",
        y : "une année",
        yy : "%d années"
    },
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : 'ème');
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
```

To change default locales, simply call `frozenMoment.locale` with the key of a loaded locale.

```javascript
frozenMoment.locale('fr');
frozenMoment(1316116057189).fromNow() // il y a une heure
frozenMoment.locale('en');
frozenMoment(1316116057189).fromNow() // an hour ago
```

You may also specify a list of locales and FrozenMoment will use the first one it has localizations for.

```javascript
frozenMoment.locale(['tq', 'fr']); // 'fr'
```

FrozenMoment will also try locale specifier substrings from most-specific to least-specific until it finds a locale it knows. This is useful when supplying FrozenMoment with a locale string pulled from the user's environment, such as `window.navigator.language`.

```javascript
frozenMoment.locale('en-NZ'); // 'en'
```

Finally, FrozenMoment will search intelligently through an array of locales and their substrings.

```javascript
frozenMoment.locale(['en-NZ', 'en-AU']); // 'en-au', not 'en'
```
