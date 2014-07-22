---
title: UTC
version: 1.5.0
signature: |
  frozenMoment.utc();
  frozenMoment.build().utc();
  frozenMoment.utc(Number);
  frozenMoment.build().utc(Number);
  frozenMoment.utc(Number[]);
  frozenMoment.build().utc(Number[]);
  frozenMoment.utc(String);
  frozenMoment.build().utc(String);
  frozenMoment.utc(String, String);
  frozenMoment.build().utc(String, String);
  frozenMoment.utc(String, String[]);
  frozenMoment.build().utc(String, String[]);
  frozenMoment.utc(String, String, String);
  frozenMoment.build().utc(String, String, String);
  frozenMoment.utc(FrozenMoment);
  frozenMoment.build().utc(FrozenMoment);
  frozenMoment.utc(Date);
  frozenMoment.build().utc(Date);
---

**Warning** FrozenMoment's handling of UTC vs local time is entirely subject to reconsideration prior to release.  If you have strong opinions about how this should work, please comment in an appropriate GitHub Issue.


By default, FrozenMoment parses and displays in local time.

If you want to parse or display a moment in UTC, you can use `frozenMoment.utc()` instead of `frozenMoment()`.

This brings us to an interesting feature of FrozenMoment. UTC mode.

While in UTC mode, all display methods will display in UTC time instead of local time, and all getters will internally use the `Date#getUTC*` methods instead of the `Date#get*` methods.

```javascript
frozenMoment().format();     // 2013-02-04T10:35:24-08:00
frozenMoment.utc().format(); // 2013-02-04T18:35:24+00:00
frozenMoment.utc().seconds() === new Date().getUTCSeconds();
```

It is important to note that though the displays differ above, they are both the same moment in time.

```javascript
var a = frozenMoment();
var b = frozenMoment.utc();
a.format();  // 2013-02-04T10:35:24-08:00
b.format();  // 2013-02-04T18:35:24+00:00
a.valueOf(); // 1360002924000
b.valueOf(); // 1360002924000
```

Additionally, when a MomentBuilder is in UTC mode, all setters will internally use the `Date#setUTC*` methods instead of the `Date#set*` methods.

```javascript
frozenMoment.build.utc().seconds(30) === new Date().setUTCSeconds(30);
```

Any moment created with `frozenMoment.utc()` will be in UTC mode, and any moment created with `frozenMoment()` will not.

To switch from UTC to local time, you can use [frozenMoment.build#utc](#/manipulating/utc/) or [frozenMoment.build#local](#/manipulating/local/).

```javascript
var a = frozenMoment.utc([2011, 0, 1, 8]);
a.hours(); // 8 UTC
a = a.thaw().local().freeze();
a.hours(); // 0 PST
```
