---
title: Weekday Names
version: 1.0.0
signature: |
  frozenMoment.locale('en', {
      weekdays : String[]
  });
  frozenMoment.locale('en', {
      weekdays : Function
  });
---


`Locale#weekdays` should normally be an array of weekday names.

```javascript
frozenMoment.locale('en', {
    weekdays : [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ]
});
```

`Locale#weekdays` can also be a callback function.

```javascript
frozenMoment.locale('en', {
    weekdays : function (momentToFormat, format) {
        return weekdays[momentToFormat.day()];
    }
});
```
