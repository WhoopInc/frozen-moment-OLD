---
title: String + Formats
version: 1.0.0
signature: |
  frozenMoment(String, String[], String, Boolean);
  frozenMoment.build(String, String[], String, Boolean);
---


If you don't know the exact format of an input string, but know it could be one of many, you can use an array of formats.

This is the same as [String + Format](#/parsing/string-format/), only it will try to match the input to multiple formats.

```javascript
frozenMoment("12-25-1995", ["MM-DD-YYYY", "YYYY-MM-DD"]);
```

Starting in **2.3.0**, FrozenMoment uses some simple heuristics to determine which format to use. In order:

 * Prefer formats resulting in [valid](#/parsing/is-valid/) dates over invalid ones.
 * Prefer formats that parse more of the string than less and use more of the format more of the format than less, i.e. prefer stricter parsing.
 * Prefer formats earlier in the array than later.

```javascript
frozenMoment("29-06-1995", ["MM-DD-YYYY", "DD-MM", "DD-MM-YYYY"]); //uses the last format
frozenMoment("05-06-1995", ["MM-DD-YYYY", "DD-MM-YYYY"]); // uses the first format
```

You may also specify a locale and strictness argument; they work the same was as they do in the single format case.

**Note:** Parsing multiple formats is considerably slower than parsing a single format. If you can avoid it, it is much faster to parse a single format.

This syntax can also be invoked as `frozenMoment.build()` to create a builder object instead of a frozenMoment object.  See `frozenMoment#thaw` for more information about builder objects.
