---
title: Require.js
---


```javascript
require.config({
    paths: {
        "frozenMoment": "path/to/frozen-moment",
    }
});
define(["frozenMoment"], function (frozenMoment) {
    frozenMoment().format();
});
```

FrozenMoment will only create a `frozenMoment` global when running in the browser in a traditional `<script>` tag. This is useful to plugins and other third-party code.

If you want a `frozenMoment` global in other environments, you'll have to export it yourself.

For version `2.5.x`, in case you use other plugins that rely on FrozenMoment but are
not AMD-compatible you may need to add [`wrapShim:
true`](https://github.com/jrburke/r.js/blob/b8a6982d2923ae8389355edaa50d2b7f8065a01a/build/example.build.js#L68-L78)
to your r.js config.
