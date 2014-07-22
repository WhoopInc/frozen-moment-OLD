---
title: Weekday Names
version: 1.0.0
signature: |
  frozenMoment.lang('en', {
      weekdays : String[]
  });
  frozenMoment.lang('en', {
      weekdays : Function
  });
---


`Language#weekdays` should be an array of the weekdays names.

```javascript
frozenMoment.lang('en', {
    weekdays : [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ]
});
```

`Language#weekdays` can be a callback function as well.

```javascript
frozenMoment.lang('en', {
    weekdays : function (momentToFormat, format) {
        return weekdays[momentToFormat.day()];
    }
});
```
