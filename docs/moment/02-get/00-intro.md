---
title: Get
---


FrozenMoment's getters are straightforward -- invoke them without any arguments, and you'll get the appropriate value for that frozenMoment instance.

Each of these getters maps to the corresponding function on the native `Date` object.

```javascript
frozenMoment().seconds() === new Date().getSeconds();
```

If you are in [UTC mode](#/manipulating/utc/), they will map to the UTC equivalent.

```javascript
frozenMoment.utc().seconds() === new Date().getUTCSeconds();
```

For convenience, both singular and plural method names exist as of version `2.0.0`.
