---
title: Parse
---

Instead of modifying the native `Date.prototype`, FrozenMoment creates a wrapper for the `Date` object. To get this wrapper object, simply call `frozenMoment()` with one of the supported input types.

The `FrozenMoment` prototype is exposed through `frozenMoment.fn`. If you want to add your own functions, that is where you would put them.

For ease of reference, any method on the `FrozenMoment.prototype` will be referenced in the docs as `frozenMoment#method`. So `FrozenMoment.prototype.format` == `frozenMoment.fn.format` == `frozenMoment#format`.
