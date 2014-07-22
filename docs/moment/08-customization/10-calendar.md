---
title: Calendar
version: 1.3.0
signature: |
  frozenMoment.lang('en', {
      calendar : Object
  });
---


`Language#calendar` should have the following formatting strings.

```javascript
frozenMoment.lang('en', {
    calendar : {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    }
});
```

Each of the `Language#calendar` keys can also be a callback function with the scope of the current frozenMoment. It should return a formatting string.

```javascript
function () {
    return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
},
```
