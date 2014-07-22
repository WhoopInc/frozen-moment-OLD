---
title: Add
version: 1.0.0
signature: |
  frozenMoment.build().add(String, Number);
  frozenMoment.build().add(Number, String); // 2.0.0
  frozenMoment.build().add(String, String); // 2.7.0
  frozenMoment.build().add(Duration); // 1.6.0
  frozenMoment.build().add(Object);
---


Mutates the original builder by adding time.

This is a pretty robust function for adding time to an existing builder. To add time, pass the key of what time you want to add, and the amount you want to add.

```javascript
frozenMoment.build().add(7, 'days');
```

There are some shorthand keys as well if you're into that whole brevity thing.

```javascript
frozenMoment.build().add(7, 'd');
```

<table class="table table-striped table-bordered">
  <tbody>
    <tr>
      <th>Key</th>
      <th>Shorthand</th>
    </tr>
    <tr>
      <td>years</td>
      <td>y</td>
    </tr>
    <tr>
      <td>months</td>
      <td>M</td>
    </tr>
    <tr>
      <td>weeks</td>
      <td>w</td>
    </tr>
    <tr>
      <td>days</td>
      <td>d</td>
    </tr>
    <tr>
      <td>hours</td>
      <td>h</td>
    </tr>
    <tr>
      <td>minutes</td>
      <td>m</td>
    </tr>
    <tr>
      <td>seconds</td>
      <td>s</td>
    </tr>
    <tr>
      <td>milliseconds</td>
      <td>ms</td>
    </tr>
  </tbody>
</table>

If you want to add multiple different keys at the same time, you can pass them in as an object literal.

```javascript
frozenMoment.build().add(7, 'days').add(1, 'month'); // with chaining
frozenMoment.build().add({days: 7, months: 1}); // with object literal
```

There are no upper limits for the amounts, so you can overload any of the parameters.

```javascript
frozenMoment.build().add(1000000, 'milliseconds'); // a million milliseconds
frozenMoment.build().add(360, 'days'); // 360 days
```

#### Special considerations for months and years

If the day of the month on the original date is greater than the number of days in the final month,
the day of the month will change to the last day in the final month.

```javascript
frozenMoment.build([2010, 0, 31]);                  // January 31
frozenMoment.build([2010, 0, 31]).add('months', 1); // February 28
```

There are also special considerations to keep in mind when adding time that crosses over Daylight Savings Time.
If you are adding years, months, weeks, or days, the original hour will always match the added hour.

```javascript
var m = frozenMoment.build(new Date(2011, 2, 12, 5, 0, 0)); // the day before DST in the US
m.freeze().hours(); // 5
m.add(1, 'day').freeze().hours(); // 5
```

If you are adding hours, minutes, seconds, or milliseconds, the assumption is that you want precision to the hour, and will result in a different hour.

```javascript
var m = frozenMoment.build(new Date(2011, 2, 12, 5, 0, 0)); // the day before DST in the US
m.freeze().hours(); // 5
m.add(24, 'hours').freeze().hours(); // 6
```

Alternatively, you can use [durations](#/durations/) to add to moments.

```javascript
var duration = frozenMoment.duration({'days' : 1});
frozenMoment.build([2012, 0, 31]).add(duration); // February 1
```

As of version **2.7.0**, `add` supports numeric values (number of seconds, hours, days etc) to be specified in `String` form, for example:

```javascript
frozenMoment.build().add('1', 'seconds');
```

**NOTE**: Moment's `add(unit, value)` syntax is **not** supported. Use `add(value, unit)` instead -- it's easier to read and more consistent with the duration interface.
