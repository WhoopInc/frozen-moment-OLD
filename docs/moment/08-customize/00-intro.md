---
title: Customize
---


FrozenMoment is very easy to customize. In general, you should create a locale setting with your customizations.

```javascript
frozenMoment.locale('en-my-settings', {
    // customizations.
});
```

However, you can also overwrite an existing locale that has been loaded as well.

```javascript
frozenMoment.locale('en', {
    // customizations
});
```

Any settings that are not defined are inherited from the default English settings.
