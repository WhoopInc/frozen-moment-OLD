---
title: Access locale specific functionality
version: 2.2.0
signature: |
  frozenMoment.localeData()  // 3.0.0
  frozenMoment().localeData()  // 3.0.0
  langData.months()
  langData.monthsShort()
  langData.monthsParse()
  langData.weekdays()
  langData.weekdaysShort()
  langData.weekdaysMin()
  langData.weekdaysParse()
  langData.longDateFormat()
  langData.isPM()
  langData.meridiem()
  langData.calendar()
  langData.relativeTime()
  langData.pastFuture()
  langData.ordinal()
  langData.preparse()
  langData.postformat()
  langData.weeks()
  langData.invalidDate()
---


You can access the properties of the currently loaded locale through the
`frozenMoment.localeData(key)` function. It returns the current locale or a locale
with the given key:

```javascript
var defaultLocale = frozenMoment.localeData();     // current default locale
var frenchLocale = frozenMoment.localeData('fr');  // French locale
```

The returned object has the following methods:

```javascript
langData.months(aFrozenMoment);  // full month name of aFrozenMoment
langData.monthsShort(aFrozenMoment);  // short month name of aFrozenMoment
langData.monthsParse(longOrShortMonthString);  // returns month id (0 to 11) of input
langData.weekdays(aFrozenMoment);  // full weekday name of aFrozenMoment
langData.weekdaysShort(aFrozenMoment);  // short weekday name of aFrozenMoment
langData.weekdaysMin(aFrozenMoment);  // min weekday name of aFrozenMoment
langData.weekdaysParse(minShortOrLongWeekdayString);  // returns weekday id (0 to 6) of input
langData.longDateFormat(dateFormat);  // returns the full format of abbreviated date-time formats LT, L, LL and so on
langData.isPM(amPmString);  // returns true iff amPmString represents PM
langData.meridiem(hours, minutes, isLower);  // returns am/pm string for particular time-of-day in upper/lower case
langData.calendar(key, aFrozenMoment);  // returns a format that would be used for calendar representation. Key is one of 'sameDay', 'nextDay', 'lastDay', 'nextWeek', 'prevWeek', 'sameElse'
langData.relativeTime(number, withoutSuffix, key, isFuture);  // returns relative time string, key is on of 's', 'm', 'mm', 'h', 'hh', 'd', 'dd', 'M', 'MM', 'y', 'yy'. Single letter when number is 1.
langData.pastFuture(diff, relTime);  // convert relTime string to past or future string depending on diff
langData.ordinal(number);  // convert number to ordinal string 1 -> 1st
langData.preparse(str);  // called before parsing on every input string
langData.postformat(str);  // called after formatting on every string
langData.week(aFrozenMoment);  // returns week-of-year of aFrozenMoment
langData.invalidDate();  // returns a translation of 'Invalid date'
```

You can also call `frozenMoment#localeData` on a FrozenMoment to get that instance's locale configuration.

```javascript
var fr = frozenMoment.build().locale('fr').freeze();
fr.locale().months(frozenMoment([2012, 0])) // "janvier"
fr = fr.thaw().locale('en').freeze();
fr.locale().months(frozenMoment([2012, 0])) // "January"
```

If you need to access the locale data for a FrozenMoment, this is the preferred way to do so.
