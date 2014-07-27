---
title: Relative Time
version: 1.0.0
signature: |
  frozenMoment.locale('en', {
      relativeTime : Object
  });
---


`Locale#relativeTime` should normally be an object of the replacement strings for `frozenMoment#from`.

```javascript
frozenMoment.locale('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s:  "seconds",
        m:  "a minute",
        mm: "%d minutes",
        h:  "an hour",
        hh: "%d hours",
        d:  "a day",
        dd: "%d days",
        M:  "a month",
        MM: "%d months",
        y:  "a year",
        yy: "%d years"
    }
});
```

`Locale#relativeTime.future` specifies a prefix/suffix for future dates, and `Locale#relativeTime.past` specifies a prefix/suffix for past dates. For other `relativeTime` entries, a single character is used to indicate the singular form of that unit, and an double character refers to the plural form.

If a locale requires additional processing for a token, it can set that token to a callback function. The function will receive the following parameters and should return a localized string.

```javascript
function (number, withoutSuffix, key, isFuture) {
    return string;
}
```

The `key` argument refers to the replacement key in the `Locale#relativeTime ` object. (eg. `s m mm h`, etc.)

The `number` argument refers to the number of units for that key. For `m`, the number is the number of minutes, etc.

The `withoutSuffix` argument will be true if the token will be displayed without a suffix, and false if it will be displayed with a suffix. (The reason for the inverted logic is because the default behavior is to display with the suffix.)

The `isFuture` argument will be true if it is going to use the future suffix/prefix and false if it is going to use the past prefix/suffix. The `isFuture` argument was added in version **1.6.0**.
