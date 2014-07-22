---
title: Validation
version: 1.7.0
signature: |
  frozenMoment().isValid();
---


FrozenMoment applies stricter initialization rules than the `Date` constructor.

```js
new Date(2013, 25, 14).toString(); // "Sat Feb 14 2015 00:00:00 GMT-0500 (EST)"
frozenMoment([2015, 25, 35]).format();   // 'Invalid date'
```

You can check whether the FrozenMoment considers the date invalid using `frozenMoment#isValid`. You can check the metrics used by `#isValid` using `frozenMoment#parsingFlags` which returns an object

The following parsing flags result in an invalid date:

 * `overflow`: An overflow of a date field, such as a 13th month, a 32nd day of the month (or a 29th of February on non-leap years), a 367th day of the year, etc. `overflow` contains the index of the invalid unit to match `#invalidAt` (see below); `-1` means no overflow.
 * `invalidMonth`: An invalid month name, such as ```frozenMoment('Marbruary', 'MMMM');```. Contains the invalid month string itself, or else null.
 * `empty`: An input string that contains nothing parsable, such as `frozenMoment('this is nonsense');`. Boolean.
 * `nullInput`: A `null` input, like `frozenMoment(null);`. Boolean.
 * `invalidFormat`: An empty list of formats, such as `frozenMoment('2013-05-25', [])`. Boolean.
 * `userInvalidated`: A date created explicitly as invalid, such as `frozenMoment.invalid()`. Boolean.

Additionally, if the FrozenMoment is parsed in strict mode, these flags must be empty for the FrozenMoment to be valid:

 * `unusedTokens`: array of format substrings not found in the input string
 * `unusedInput`: array of input substrings not matched to the format string

**Note:** FrozenMoment's concept of validity became more strict and consistent between 2.2 and 2.3.

Additionally, you can use `frozenMoment#invalidAt` to determine which date unit overflowed.

```javascript
var m = frozenMoment("2011-10-10T10:20:90");
m.isValid(); // false
m.invalidAt(); // 5 for seconds
```

The return value has the following meaning:

<ol>
  <li>years</li>
  <li>months</li>
  <li>days</li>
  <li>hours</li>
  <li>minutes</li>
  <li>seconds</li>
  <li>milliseconds</li>
</ol>

**Note:** In case of multiple wrong units the first one is returned (because
days validity may depend on month, for example).
