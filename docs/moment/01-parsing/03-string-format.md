---
title: String + Format
version: 1.0.0
signature: |
  frozenMoment(String, String);
  frozenMoment.build(String, String);
  frozenMoment(String, String, String);
  frozenMoment.build(String, String, String);
  frozenMoment(String, String, Boolean);
  frozenMoment.build(String, String, Boolean);
  frozenMoment(String, String, String, Boolean);
  frozenMoment.build(String, String, String, Boolean);
---


If you know the format of an input string, you can use that to parse a frozenMoment.

```javascript
frozenMoment("12-25-1995", "MM-DD-YYYY");
```

The parser ignores non-alphanumeric characters, so both of the following will return the same thing.

```javascript
frozenMoment("12-25-1995", "MM-DD-YYYY");
frozenMoment("12\25\1995", "MM-DD-YYYY");
```

The parsing tokens are similar to the formatting tokens used in `frozenMoment#format`.

<table class="table table-striped table-bordered">
  <tbody>
    <tr>
      <th>Input</th>
      <th>Output</th>
    </tr>
    <tr>
      <td>M, MM</td>
      <td>Month Number (1 - 12)</td>
    </tr>
    <tr>
      <td>MMM, MMMM</td>
      <td>Month Name (In the default locale, which is set with `frozenMoment.locale()`)</td>
    </tr>
    <tr>
      <td>Q</td>
      <td>Quarter (1 - 4) -- sets the month to the first month in that quarter</td>
    <tr>
      <td>D, DD</td>
      <td>Day of month</td>
    </tr>
    <tr>
      <td>Do</td>
      <td>Ordinal day of month (from `2.6.0`)</td>
    </tr>
    <tr>
      <td>DDD, DDDD</td>
      <td>Day of year</td>
    </tr>
    <tr>
      <td>d, dd, ddd, dddd</td>
      <td>Day of week (NOTE: these formats only make sense when combined with "ww")
    </tr>
    <tr>
      <td>e</td>
      <td>Day of week (locale) (NOTE: this formats only makes sense when combined with "ww")
    </tr>
    <tr>
      <td>E</td>
      <td>Day of week (ISO) (NOTE: this format only makes sense when combined with "WW")
    </tr>
    <tr>
      <td>w, ww</td>
      <td>Week of the year (NOTE: combine this format with "gg" or "gggg" instead of "YY" or "YYYY")
    </tr>
    <tr>
    <tr>
      <td>W, WW</td>
      <td>Week of the year (ISO) (NOTE: combine this format with "GG" or "GGGG" instead of "YY" or "YYYY")
    </tr>
    <tr>
    <tr>
      <td>YY</td>
      <td>2 digit year (see below)</td>
    </tr>
    <tr>
      <td>YYYY</td>
      <td>4 digit year</td>
    </tr>
    <tr>
      <td>gg</td>
      <td>2 digit week year (if greater than 68 will return 1900's, otherwise 2000's)</td>
    </tr>
    <tr>
      <td>gggg</td>
      <td>4 digit week year</td>
    </tr>
    <tr>
      <td>GG</td>
      <td>2 digit week year (ISO) (if greater than 68 will return 1900's, otherwise 2000's)</td>
    </tr>
    <tr>
      <td>GGGG</td>
      <td>4 digit week year (ISO)</td>
    </tr>
    <tr>
      <td>a, A</td>
      <td>AM/PM</td>
    </tr>
    <tr>
      <td>H, HH</td>
      <td>24 hour time</td>
    </tr>
    <tr>
      <td>h, hh</td>
      <td>12 hour time (use in conjunction with a or A)</td>
    </tr>
    <tr>
      <td>m, mm</td>
      <td>Minutes</td>
    </tr>
    <tr>
      <td>s, ss</td>
      <td>Seconds</td>
    </tr>
    <tr>
      <td>S</td>
      <td>Deciseconds (1/10th of a second)</td>
    </tr>
    <tr>
      <td>SS</td>
      <td>Centiseconds (1/100th of a second)</td>
    </tr>
    <tr>
      <td>SSS</td>
      <td>Milliseconds (1/1000th of a second)</td>
    </tr>
    <tr>
      <td>Z, ZZ</td>
      <td>
        Timezone offset as `+07:00` or `+0700`
      </td>
    </tr>
    <tr>
      <td>X</td>
      <td>
        Unix timestamp
      </td>
    </tr>
	<tr>
	  <td>LT, L, LL, LLL, LLLL</td>
	  <td>Locale dependent date and time representation</td>
	</tr>
  </tbody>
</table>

`Z ZZ` were added in **1.2.0**. `S SS SSS` were added in **1.6.0**. `X` was
added in `2.0.0`, `LT`, `L`, `LL`, `LLL`, `LLLL` were added in `2.2.1`.

Unless you specify a timezone offset, parsing a string will create a date in the current timezone.

```javascript
frozenMoment("2010-10-20 4:30", "YYYY-MM-DD HH:mm"); // parsed as 4:30 local time
frozenMoment("2010-10-20 4:30 +0000", "YYYY-MM-DD HH:mm Z"); // parsed as 4:30 GMT
```

If the moment that results from the parsed input does not exist, `frozenMoment#isValid` will return false.

```javascript
frozenMoment("2010 13", "YYYY MM").isValid(); // false (not a real month)
frozenMoment("2010 11 31", "YYYY MM DD").isValid(); // false (not a real day)
frozenMoment("2010 2 29", "YYYY MM DD").isValid(); // false (not a leap year)
frozenMoment("2010 notamonth 29", "YYYY MMM DD").isValid(); // false (not a real month name)
```

As of version **2.0.0**, a locale key can be passed as the third parameter to `frozenMoment()` and `frozenMoment.utc()`.

```javascript
frozenMoment('2012 juillet', 'YYYY MMM', 'fr');
frozenMoment('2012 July', 'YYYY MMM', 'en');
```

FrozenMoment's parser is very forgiving, and this can lead to undesired behavior. As of version **2.3.0**, you may specify a boolean for the last argument to make FrozenMoment use strict parsing. Strict parsing requires that the format and input match exactly.

**Warning** We may remove the forgiving parser mode from FrozenMoment core prior to release.  In that case, strict parsing would become the only mode
available.  If you have strong opinions about this one way or the other, please
comment in our GitHub Issues.

```javascript
frozenMoment('It is 2012-05-25', 'YYYY-MM-DD').isValid();        // true
frozenMoment('It is 2012-05-25', 'YYYY-MM-DD', true).isValid();  // false
frozenMoment('2012-05-25', 'YYYY-MM-DD', true).isValid();        // true
```

You can use both locale and strictness.

```javascript
frozenMoment('2012-10-14', 'YYYY-MM-DD', 'fr', true);
```

Two digit year parser by default assumes years above 68 to be in the 1900's and
below in the 2000's. This can be changed by replacing the
`frozenMoment.parseTwoDigitYear`.

All of these syntaxes can also be invoked as `frozenMoment.build()` to create a builder object instead of a frozenMoment object.  See `frozenMoment#thaw` for more information about builder objects.
