---
title: String
version: 1.0.0
signature: |
  frozenMoment(String);
  frozenMoment.build(String);
---


You can create a frozenMoment from a string. FrozenMoment would try a few ISO patterns and then try the native js Date.

```javascript
var day = frozenMoment("Dec 25, 1995");
```

**Warning** Browser support for this is inconsistent. Because there is no specification on which formats should be supported, what works in some browsers will not work in other browsers.

**Warning** We currently intend to remove this functionality (inherited from upstream Moment) before the first release of FrozenMoment.

For more consistent results, you should use [String + Format](#/parsing/string-format/).

There is one exception: FrozenMoment does detect if you are using an ISO-8601 string and will parse that correctly without a format string.

The following ISO-8601 formats are supported across all browsers.

```javascript
"2013-02-08"
"2013-02-08T09"
"2013-02-08 09"
"2013-02-08T09:30"
"2013-02-08 09:30"
"2013-02-08T09:30:26"
"2013-02-08 09:30:26"
"2013-02-08T09:30:26.123"
"2013-02-08 09:30:26.123"
"2013-02-08T09:30:26 Z"
"2013-02-08 09:30:26 Z"
"2013-W06-5"
"2013-W06-5T09"
"2013-W06-5 09"
"2013-W06-5T09:30"
"2013-W06-5 09:30"
"2013-W06-5T09:30:26"
"2013-W06-5 09:30:26"
"2013-W06-5T09:30:26.123"
"2013-W06-5 09:30:26.123"
"2013-W06-5T09:30:26 Z"
"2013-W06-5 09:30:26 Z"
"2013-039"
"2013-039T09"
"2013-039 09"
"2013-039T09:30"
"2013-039 09:30"
"2013-039T09:30:26"
"2013-039 09:30:26"
"2013-039T09:30:26.123"
"2013-039 09:30:26.123"
"2013-039T09:30:26 Z"
"2013-039 09:30:26 Z"
```

**Note:** Automatic cross browser ISO-8601 support was added in version **1.5.0**. Support for the week and ordinal formats was added in version **2.3.0**.

If a string does not match any of the above formats and is not able to be parsed with `Date.parse`, `frozenMoment#isValid` will return false.

```javascript
frozenMoment("not a real date").isValid(); // false
```

When invoked as `frozenMoment.build()`, this API creates a builder object instead of a frozenMoment object.  See `frozenMoment#thaw` for more information about builder objects.
