---
title: Set
---


FrozenMoment.build provides a single-argument setter for every getter on FrozenMoment.

These setters map to the corresponding functions on the native `Date` object.

```javascript
frozenMoment.build().seconds(30) === new Date().setSeconds(30);
```

If you are in [UTC mode](#/manipulating/utc/), they will map to the UTC equivalent.

```javascript
frozenMoment.build.utc().seconds(30) === new Date().setUTCSeconds(30);
```

For convenience, both singular and plural method names exist as of version `2.0.0`.
