---
title: Month Names
version: 1.0.0
signature: |
  frozenMoment.locale('en', {
      months : String[]
  });
  frozenMoment.locale('en', {
      months : Function
  });
---


`Locale#months` should normally be an array of month names.

```javascript
frozenMoment.locale('en', {
    months : [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ]
});
```

If you need more processing to calculate the name of the month -- for example, if your language's grammar changes the spelling of month names in different formatting contexts -- then `Locale#months` can be a callback function with the following signature. It should always return a month name as a string.

```javascript
frozenMoment.locale('en', {
    months : function (momentToFormat, format) {
        // momentToFormat is the moment currently being formatted
        // format is the formatting string
        if (/^MMMM/.test(format)) { // if the format starts with 'MMMM'
            return nominative[momentToFormat.month()];
        } else {
            return subjective[momentToFormat.month()];
        }
    }
});
```
