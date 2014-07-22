---
title: Manipulate
---


Once you have a `FrozenMoment`, you may want to manipulate it in some way.  To do this, you must create a builder object from your moment:

```javascript
frozenMoment().thaw()
```

There are a number of manipulation methods available on your builder object, using the [fluent interface pattern](http://en.wikipedia.org/wiki/Fluent_interface) (also known as [method chaining](http://en.wikipedia.org/wiki/Method_chaining)).  They are described in detail later in the section.  When you're done manipulating the builder, you can convert it back to a FrozenMoment by calling `.freeze()`:

```javascript
frozenMoment().thaw().add('days', 7).subtract('months', 1).year(2009).hours(0).minutes(0).seconds(0).freeze().getISOString();
```

If you don't have a FrozenMoment instance yet, you can start with a fresh builder object:

```javascript
// produces the same output as the example above
frozenMoment.build().add('days', 7).subtract('months', 1).year(2009).hours(0).minutes(0).seconds(0).freeze().getISOString();
```

**Note:** It should be noted that builder objects are mutable, unlike FrozenMoments. Calling any of the manipulation methods will change the original builder.

If you want to create a copy of a builder object and manipulate it, you should use `frozenMoment.build#clone` before manipulating the builder. [More info on cloning.](#/parsing/moment-clone/)
