# OLD VERSION — NOT MAINTAINED

**This repository contains the original, abandoned version of Frozen Moment.**
It works, and it's seen some light real-world use.  Unfortunately, this forked
version is clunky to use because it only supports mutation via a builder API.
In addition, even though the locale system should work, this fork provides just
a single locale (US English), and it has not been tested with other locales.

**Current development is focusing on a rewrite.
[The current version is WhoopInc/frozen-moment.][frozen-moment]  That new
repository is architected as a plugin for [Moment](http://momentjs.com/) itself.**
As a plugin, the new version will easily maintain feature parity with upstream
Moment, and users can more easily take advantage of the wider Moment ecosystem.
Again, you should really check out [the new Frozen Moment plugin][frozen-moment]
instead of using this repository's code if at all possible.

[frozen-moment]: https://github.com/WhoopInc/frozen-moment

Here is the unmodified README for this old, unmaintained version of Frozen Moment:

# frozen-moment

<!--[![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url]-->

[![MIT License][license-image]][license-url]

<!--[![Build Status][travis-image]][travis-url]-->

A lightweight javascript date library for parsing, validating, manipulating, and formatting dates.

This is a 2014 fork of [Moment.js](https://github.com/moment/moment).  Whereas Moment provides a mutable wrapper over the native JavaScript Date API, this project seeks to provide an immutable API for working with moments in time that can be created with a chainable builder API.  We aim to maintain general feature parity with the upstream Moment API.

## [Documentation](http://whoopinc.github.io/frozen-moment/docs/)

The docs are a little rough in appearance right now, but they should be accurate and comprehensive.  If you notice anything that doesn't match the actual behavior of our code, please open an issue (or a pull request!).

## [Contributing](CONTRIBUTING.md)

Want to see this project succeed?  We'd love to have you help out!  Take a look at our [current Issues list](https://github.com/WhoopInc/frozen-moment/issues), or just submit a pull request that adds a feature you need.  Documentation pull requests are also very welcome.  Thanks!

## [Changelog](CHANGELOG.md)

## Upgrading from moment 2.x to frozen-moment 3.0

TODO: write this

## License

Moment.js is freely distributable under the terms of the [MIT license](LICENSE).

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/moment
[npm-version-image]: http://img.shields.io/npm/v/moment.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/moment.svg?style=flat

[travis-url]: http://travis-ci.org/moment/moment
[travis-image]: http://img.shields.io/travis/moment/moment/develop.svg?style=flat
