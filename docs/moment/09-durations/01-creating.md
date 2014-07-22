---
title: Creating
version: 1.6.0
signature: |
  frozenMoment.duration(Number, String);
  frozenMoment.duration(Number);
  frozenMoment.duration(Object);
  frozenMoment.duration(String);
---


To create a duration, call `frozenMoment.duration()` with the length of time in milliseconds.

```javascript
frozenMoment.duration(100); // 100 milliseconds
```

If you want to create a moment with a unit of measurement other than seconds, you can pass the unit of measurement as well.

```javascript
frozenMoment.duration(2, 'seconds');
frozenMoment.duration(2, 'minutes');
frozenMoment.duration(2, 'hours');
frozenMoment.duration(2, 'days');
frozenMoment.duration(2, 'weeks');
frozenMoment.duration(2, 'months');
frozenMoment.duration(2, 'years');
```

The same shorthand from `frozenMoment.build#add` and `frozenMoment.build#subtract` works here as well.

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

Much like `frozenMoment.build#add`, you can pass an object of values if you need multiple different units of measurement.

```javascript
frozenMoment.duration({
    seconds: 2,
    minutes: 2,
    hours: 2,
    days: 2,
    weeks: 2,
    months: 2,
    years: 2
});
```

As of **2.1.0**, moment supports parsing ASP.NET style time spans. The following formats are supported.

The format is an hour, minute, second string separated by colons like `23:59:59`. The number of days can be prefixed with a dot separator like so `7.23:59:59`. Partial seconds are supported as well `23:59:59.999`.

```javascript
frozenMoment.duration('23:59:59');
frozenMoment.duration('23:59:59.999');
frozenMoment.duration('7.23:59:59.999');
frozenMoment.duration('23:59');          //added in 2.3.0
```
