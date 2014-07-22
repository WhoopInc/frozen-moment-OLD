---
title: FrozenMoment Clone
version: 1.2.0
signature: |
  frozenMoment.build(FrozenMoment);
---


All moments are immutable, so cloning is unnecessary. Builder objects are mutable, however. If you want a clone of a frozenMoment builder, you can do so explicitly or implicitly.

Calling `frozenMoment.build()` on a FrozenMoment or a MomentBuilder will create a new MomentBuilder object initialized with a copy of the internal state of the provided FrozenMoment or MomentBuilder.

```javascript
var a = frozenMoment.build([2012]);
var b = frozenMoment.build(a);
a.year(2000);
b.freeze().year(); // 2012
```

Additionally, you can call `frozenMoment.build#clone` to clone an existing MomentBuilder.

```javascript
var a = frozenMoment.build([2012]);
var b = a.clone();
a.year(2000);
b.freeze().year(); // 2012
```

At time of writing, `frozenMoment#clone` also exists but should return a reference to the original frozenMoment object.  This will probably be removed prior to release.
