---
title: Load locale modules (Browser)
version: 3.0.0
signature: |
  frozenMoment.locale(String, Object);
---


To load locale modules in the browser, just include their files after the FrozenMoment library.

```html
<script src="frozen-moment.min.js"></script>
<script src="min/locale/fr.js"></script>
<script src="min/locale/pt.js"></script>
```

There is a minified version of each locale. There is also a single minified file with all the locale modules bundled together.

```html
<script src="frozen-moment.min.js"></script>
<script src="locale/all.min.js"></script>
```

Ideally, you would bundle all the scripts you need into one file to minimize http requests.

```html
<script src="frozen-moment-fr-it.min.js"></script>
```

**Note:** the files in the `/locale/` folder are optimized for use in Node.js. If you want to use locale files in the browser, use the minified versions that are included at `/min/locale/`.
