---
title: AM/PM
version: 1.6.0
signature: |
  frozenMoment.locale('en', {
      meridiem : Function
      meridiemParse : RegExp  // 2.1.0
      isPM : Function  // 2.1.0
  });
---


If it is provided, `Locale#meridiem` must be a callback function that returns the correct strings used in your locale for the `a A` tokenS.  If no value is provided, the default callback returns `'am'` for times before noon and `'pm'` for times after noon.

If your locale needs any different computation for am/pm, `Locale#meridiem` should be a callback function that returns the correct string based on hour, minute, and upper/lowercase.

```javascript
frozenMoment.locale('zh-cn', {
    meridiem : function (hour, minute, isLowercase) {
        if (hour < 9) {
            return "早上";
        } else if (hour < 11 && minute < 30) {
            return "上午";
        } else if (hour < 13 && minute < 30) {
            return "中午";
        } else if (hour < 18) {
            return "下午";
        } else {
            return "晚上";
        }
    }
});
```

To configure what input strings should be parsed as am/pm tokens, set the `meridiemParse` property.

```javascript
frozenMoment.locale('en', {
    meridiemParse : /[ap]\.?m?\.?/i
});
```

`Locale#isPM` is a callback function that accepts an input string and returns true if the input string is past 12 noon. This is used while parsing the `a A` tokens.

```javascript
frozenMoment.locale('en', {
    isPM : function (input) {
        return ((input + '').toLowerCase()[0] === 'p');
    }
});
```
