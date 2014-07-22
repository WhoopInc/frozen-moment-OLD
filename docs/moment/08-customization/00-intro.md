---
title: Customize
---


FrozenMoment is very easy to customize. In general, you should create a language setting with your customizations.

```javascript
frozenMoment.lang('en-my-settings', {
    // customizations.
});
```

However, you can also overwrite an existing language that has been loaded as well.

```javascript
frozenMoment.lang('en', {
    // customizations
});
```

Any settings that are not defined are inherited from the default english settings.
