---
title: AM/PM Parsing
version: 2.1.0
signature: |
  frozenMoment.lang('en', {
      meridiemParse : RegExp
      isPM : Function
  });
---


`Language#isPM` should return true if the input string is past 12 noon. This is used in parsing the `a A` tokens.

```javascript
frozenMoment.lang('en', {
    isPM : function (input) {
        return ((input + '').toLowerCase()[0] === 'p');
    }
});
```

To configure what strings should be parsed as input, set the `meridiemParse` property.

```javascript
frozenMoment.lang('en', {
    meridiemParse : /[ap]\.?m?\.?/i
});
```
