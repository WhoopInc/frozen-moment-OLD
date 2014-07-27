---
title: i18n
---


FrozenMoment has robust support for internationalization.

You can load multiple locales and easily switch between them.

Each new FrozenMoment builder is set to the current default locale at the time the builder is created.  You can then set a different locale before freezing the builder into a FrozenMoment instance.

Instead of setting a specific locale, you can set the builder's locale to "global" to create FrozenMoment instances that will always display using the default locale (even if the default locale changes after freezing the instance).
