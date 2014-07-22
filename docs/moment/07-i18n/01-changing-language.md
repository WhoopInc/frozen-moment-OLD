---
title: Changing language globally
version: 1.0.0
signature: |
  frozenMoment.lang(String);
  frozenMoment.lang(String[]);
  frozenMoment.lang(String, Object);
---


**Warning:** This API is subject to change before release.  If you have strong opinions about how the locale API should be implemented, please join the appropriate discussion(s) in GitHub Issues.

By default, FrozenMoment comes with English language strings. If you need other languages, you can load them into FrozenMoment for later use.

To load a language, pass the key and the string values to `frozenMoment.lang`.

More details on each of the parts of the language bundle can be found in the [customization](#/customization/) section.

```javascript
frozenMoment.lang('fr', {
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

Once you load a language, it becomes the active language. To change active languages, simply call `frozenMoment.lang` with the key of a loaded language.

```javascript
frozenMoment.lang('fr');
frozenMoment(1316116057189).fromNow() // il y a une heure
frozenMoment.lang('en');
frozenMoment(1316116057189).fromNow() // an hour ago
```

As of **2.3.0**, `frozenMoment.lang` returns the language used. This is useful because FrozenMoment won't change languages if it doesn't know the one you specify.

```javascript
frozenMoment.lang('fr'); // 'fr'
frozenMoment.lang('tq'); // 'fr'
```

Starting in **2.3.0**, you may also specify a list of languages, and FrozenMoment will use the first one it has localizations for.

```javascript
frozenMoment.lang(['tq', 'fr']); // 'fr'
```

FrozenMoment will also try language specifier substrings from most-specific to least-specific until it finds a language it knows. This is useful when supplying FrozenMoment with a language string pulled from the user's environment, such as `window.navigator.language`.

```javascript
frozenMoment.lang('en-NZ'); // 'en'
```

Finally, FrozenMoment will search intelligently through an array of languages and their substrings.

```javascript
frozenMoment.lang('en-NZ', 'en-AU'); // 'en-au', not 'en'
```
