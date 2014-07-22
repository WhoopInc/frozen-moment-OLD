---
title: As Javascript Date
version: 1.0.0
signature: |
  frozenMoment().toDate();
---


To convert a FrozenMoment to a native Date object, use `frozenMoment#toDate`.

**Warning:** For the moment, this returns the `Date` that the moment uses, so any changes to that `Date` will cause the moment to change.  **This will be fixed** to return a copy of the wrapped `Date` object -- feel free to open a pull request if you need this change before we get around to implementing it ourselves.
