---
title: Minimal Weekday Abbreviations
version: 1.7.0
signature: |
  frozenMoment.lang('en', {
      weekdaysMin : String[]
  });
  frozenMoment.lang('en', {
      weekdaysMin : Function
  });
---


`Language#weekdaysMin` should be an array of two letter weekday abbreviations. The purpose of these is for things like calendar pickers, thus they should be as small as possible.

```javascript
frozenMoment.lang('en', {
    weekdaysMin : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
});
```

`Language#weekdaysMin` can be a callback function as well.

```javascript
frozenMoment.lang('en', {
    weekdaysMin : function (momentToFormat, format) {
        return weekdaysMin[momentToFormat.day()];
    }
});
```
