---
title: Durations
---


**Warning:** This section describes the Duration API that FrozenMoment has inherited from the upstream Moment implementation.  This API **will** be changing to provide an immutable object + builder API, in much the same style as frozenMoment and frozenMoment.build have adapted the previous moment API.

FrozenMoment also has duration objects. Where a moment is defined as single points in time, durations are defined as a length of time.

Durations do not have a defined beginning and end date. They are contextless.

A duration is conceptually more similar to '2 hours' than to 'between 2 and 4 pm today'. As such, they are not a good solution to converting between units that depend on context.

For example, a year can be defined as 366 days, 365 days, 365.25 days, 12 months, or 52 weeks. Trying to convert years to days makes no sense without context. It is much better to use `frozenMoment#diff` for calculating days or years between two moments than to use `Durations`.
