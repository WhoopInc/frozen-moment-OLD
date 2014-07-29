(function(){
    var require = function(){
        return window.frozenMoment;
    }
    var exports = {};
/*!
 * Nodeunit
 * https://github.com/caolan/nodeunit
 * Copyright (c) 2010 Caolan McMahon
 * MIT Licensed
 *
 * json2.js
 * http://www.JSON.org/json2.js
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */
nodeunit = (function(){
/*
    http://www.JSON.org/json2.js
    2010-11-17

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false, regexp: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON = {};

(function () {
    "use strict";

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
.replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
var assert = this.assert = {};
var types = {};
var core = {};
var nodeunit = {};
var reporter = {};
/*global setTimeout: false, console: false */
(function () {

    var async = {};

    // global on the server, window in the browser
    var root = this,
        previous_async = root.async;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
    }
    else {
        root.async = async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    //// cross-browser compatiblity functions ////

    var _forEach = function (arr, iterator) {
        if (arr.forEach) {
            return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    var _map = function (arr, iterator) {
        if (arr.map) {
            return arr.map(iterator);
        }
        var results = [];
        _forEach(arr, function (x, i, a) {
            results.push(iterator(x, i, a));
        });
        return results;
    };

    var _reduce = function (arr, iterator, memo) {
        if (arr.reduce) {
            return arr.reduce(iterator, memo);
        }
        _forEach(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    };

    var _keys = function (obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    var _indexOf = function (arr, item) {
        if (arr.indexOf) {
            return arr.indexOf(item);
        }
        for (var i = 0; i < arr.length; i += 1) {
            if (arr[i] === item) {
                return i;
            }
        }
        return -1;
    };

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////
    if (typeof process === 'undefined' || !(process.nextTick)) {
        async.nextTick = function (fn) {
            setTimeout(fn, 0);
        };
    }
    else {
        async.nextTick = process.nextTick;
    }

    async.forEach = function (arr, iterator, callback) {
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        _forEach(arr, function (x) {
            iterator(x, function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed === arr.length) {
                        callback();
                    }
                }
            });
        });
    };

    async.forEachSeries = function (arr, iterator, callback) {
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed === arr.length) {
                        callback();
                    }
                    else {
                        iterate();
                    }
                }
            });
        };
        iterate();
    };


    var doParallel = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.forEach].concat(args));
        };
    };
    var doSeries = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.forEachSeries].concat(args));
        };
    };


    var _asyncMap = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (err, v) {
                results[x.index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    };
    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);


    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.reduce = function (arr, memo, iterator, callback) {
        async.forEachSeries(arr, function (x, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err, memo);
        });
    };
    // inject alias
    async.inject = async.reduce;
    // foldl alias
    async.foldl = async.reduce;

    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, function (x) {
            return x;
        }).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };
    // foldr alias
    async.foldr = async.reduceRight;

    var _filter = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.filter = doParallel(_filter);
    async.filterSeries = doSeries(_filter);
    // select alias
    async.select = async.filter;
    async.selectSeries = async.filterSeries;

    var _reject = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (!v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.reject = doParallel(_reject);
    async.rejectSeries = doSeries(_reject);

    var _detect = function (eachfn, arr, iterator, main_callback) {
        eachfn(arr, function (x, callback) {
            iterator(x, function (result) {
                if (result) {
                    main_callback(x);
                }
                else {
                    callback();
                }
            });
        }, function (err) {
            main_callback();
        });
    };
    async.detect = doParallel(_detect);
    async.detectSeries = doSeries(_detect);

    async.some = function (arr, iterator, main_callback) {
        async.forEach(arr, function (x, callback) {
            iterator(x, function (v) {
                if (v) {
                    main_callback(true);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(false);
        });
    };
    // any alias
    async.any = async.some;

    async.every = function (arr, iterator, main_callback) {
        async.forEach(arr, function (x, callback) {
            iterator(x, function (v) {
                if (!v) {
                    main_callback(false);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(true);
        });
    };
    // all alias
    async.all = async.every;

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                var fn = function (left, right) {
                    var a = left.criteria, b = right.criteria;
                    return a < b ? -1 : a > b ? 1 : 0;
                };
                callback(null, _map(results.sort(fn), function (x) {
                    return x.value;
                }));
            }
        });
    };

    async.auto = function (tasks, callback) {
        callback = callback || function () {};
        var keys = _keys(tasks);
        if (!keys.length) {
            return callback(null);
        }

        var completed = [];

        var listeners = [];
        var addListener = function (fn) {
            listeners.unshift(fn);
        };
        var removeListener = function (fn) {
            for (var i = 0; i < listeners.length; i += 1) {
                if (listeners[i] === fn) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        };
        var taskComplete = function () {
            _forEach(listeners, function (fn) {
                fn();
            });
        };

        addListener(function () {
            if (completed.length === keys.length) {
                callback(null);
            }
        });

        _forEach(keys, function (k) {
            var task = (tasks[k] instanceof Function) ? [tasks[k]]: tasks[k];
            var taskCallback = function (err) {
                if (err) {
                    callback(err);
                    // stop subsequent errors hitting callback multiple times
                    callback = function () {};
                }
                else {
                    completed.push(k);
                    taskComplete();
                }
            };
            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
            var ready = function () {
                return _reduce(requires, function (a, x) {
                    return (a && _indexOf(completed, x) !== -1);
                }, true);
            };
            if (ready()) {
                task[task.length - 1](taskCallback);
            }
            else {
                var listener = function () {
                    if (ready()) {
                        removeListener(listener);
                        task[task.length - 1](taskCallback);
                    }
                };
                addListener(listener);
            }
        });
    };

    async.waterfall = function (tasks, callback) {
        if (!tasks.length) {
            return callback();
        }
        callback = callback || function () {};
        var wrapIterator = function (iterator) {
            return function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    async.nextTick(function () {
                        iterator.apply(null, args);
                    });
                }
            };
        };
        wrapIterator(async.iterator(tasks))();
    };

    async.parallel = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            async.map(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args || null);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.forEach(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.series = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            async.mapSeries(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args || null);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.forEachSeries(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.iterator = function (tasks) {
        var makeCallback = function (index) {
            var fn = function () {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            };
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        };
        return makeCallback(0);
    };

    async.apply = function (fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(
                null, args.concat(Array.prototype.slice.call(arguments))
            );
        };
    };

    var _concat = function (eachfn, arr, fn, callback) {
        var r = [];
        eachfn(arr, function (x, cb) {
            fn(x, function (err, y) {
                r = r.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, r);
        });
    };
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        if (test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.whilst(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.until = function (test, iterator, callback) {
        if (!test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.until(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.queue = function (worker, concurrency) {
        var workers = 0;
        var tasks = [];
        var q = {
            concurrency: concurrency,
            push: function (data, callback) {
                tasks.push({data: data, callback: callback});
                async.nextTick(q.process);
            },
            process: function () {
                if (workers < q.concurrency && tasks.length) {
                    var task = tasks.splice(0, 1)[0];
                    workers += 1;
                    worker(task.data, function () {
                        workers -= 1;
                        if (task.callback) {
                            task.callback.apply(task, arguments);
                        }
                        q.process();
                    });
                }
            },
            length: function () {
                return tasks.length;
            }
        };
        return q;
    };

    var _console_fn = function (name) {
        return function (fn) {
            var args = Array.prototype.slice.call(arguments, 1);
            fn.apply(null, args.concat([function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (typeof console !== 'undefined') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _forEach(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            }]));
        };
    };
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        hasher = hasher || function (x) {
            return x;
        };
        return function () {
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (key in memo) {
                callback.apply(null, memo[key]);
            }
            else {
                fn.apply(null, args.concat([function () {
                    memo[key] = arguments;
                    callback.apply(null, arguments);
                }]));
            }
        };
    };

}());
(function(exports){
/**
 * This file is based on the node.js assert module, but with some small
 * changes for browser-compatibility
 * THIS FILE SHOULD BE BROWSER-COMPATIBLE JS!
 */


/**
 * Added for browser compatibility
 */

var _keys = function(obj){
    if(Object.keys) return Object.keys(obj);
    if (typeof obj != 'object' && typeof obj != 'function') {
        throw new TypeError('-');
    }
    var keys = [];
    for(var k in obj){
        if(obj.hasOwnProperty(k)) keys.push(k);
    }
    return keys;
};



// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


var pSlice = Array.prototype.slice;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = exports;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({message: message, actual: actual, expected: expected})

assert.AssertionError = function AssertionError (options) {
  this.name = "AssertionError";
  this.message = options.message;
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
};
// code from util.inherits in node
assert.AssertionError.super_ = Error;


// EDITED FOR BROWSER COMPATIBILITY: replaced Object.create call
// TODO: test what effect this may have
var ctor = function () { this.constructor = assert.AssertionError; };
ctor.prototype = Error.prototype;
assert.AssertionError.prototype = new ctor();


assert.AssertionError.prototype.toString = function() {
  if (this.message) {
    return [this.name+":", this.message].join(' ');
  } else {
    return [ this.name+":"
           , JSON.stringify(this.expected )
           , this.operator
           , JSON.stringify(this.actual)
           ].join(" ");
  }
};

// assert.AssertionError instanceof Error

assert.AssertionError.__proto__ = Error.prototype;

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

assert.ok = function ok(value, message) {
  if (!!!value) fail(value, true, message, "==", assert.ok);
};

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, "==", assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, "!=", assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, "deepEqual", assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == "object",
  // equivalence is determined by ==.
  } else if (typeof actual != 'object' && typeof expected != 'object') {
    return actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical "prototype" property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isUndefinedOrNull (value) {
  return value === null || value === undefined;
}

function isArguments (object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv (a, b) {
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical "prototype" property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try{
    var ka = _keys(a),
      kb = _keys(b),
      key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key] ))
       return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, "notDeepEqual", assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, "===", assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as determined by !==.
// assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, "!==", assert.notStrictEqual);
  }
};

function _throws (shouldThrow, block, err, message) {
  var exception = null,
      threw = false,
      typematters = true;

  message = message || "";

  //handle optional arguments
  if (arguments.length == 3) {
    if (typeof(err) == "string") {
      message = err;
      typematters = false;
    }
  } else if (arguments.length == 2) {
    typematters = false;
  }

  try {
    block();
  } catch (e) {
    threw = true;
    exception = e;
  }

  if (shouldThrow && !threw) {
    fail( "Missing expected exception"
        + (err && err.name ? " ("+err.name+")." : '.')
        + (message ? " " + message : "")
        );
  }
  if (!shouldThrow && threw && typematters && exception instanceof err) {
    fail( "Got unwanted exception"
        + (err && err.name ? " ("+err.name+")." : '.')
        + (message ? " " + message : "")
        );
  }
  if ((shouldThrow && threw && typematters && !(exception instanceof err)) ||
      (!shouldThrow && threw)) {
    throw exception;
  }
};

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function (err) { if (err) {throw err;}};
})(assert);
(function(exports){
/*!
 * Nodeunit
 * Copyright (c) 2010 Caolan McMahon
 * MIT Licensed
 *
 * THIS FILE SHOULD BE BROWSER-COMPATIBLE JS!
 * You can use @REMOVE_LINE_FOR_BROWSER to remove code from the browser build.
 * Only code on that line will be removed, its mostly to avoid requiring code
 * that is node specific
 */

/**
 * Module dependencies
 */

//var assert = require('./assert'),     //@REMOVE_LINE_FOR_BROWSER
//    async = require('../deps/async'); //@REMOVE_LINE_FOR_BROWSER


/**
 * Creates assertion objects representing the result of an assert call.
 * Accepts an object or AssertionError as its argument.
 *
 * @param {object} obj
 * @api public
 */

exports.assertion = function (obj) {
    return {
        method: obj.method || '',
        message: obj.message || (obj.error && obj.error.message) || '',
        error: obj.error,
        passed: function () {
            return !this.error;
        },
        failed: function () {
            return Boolean(this.error);
        }
    };
};

/**
 * Creates an assertion list object representing a group of assertions.
 * Accepts an array of assertion objects.
 *
 * @param {Array} arr
 * @param {Number} duration
 * @api public
 */

exports.assertionList = function (arr, duration) {
    var that = arr || [];
    that.failures = function () {
        var failures = 0;
        for (var i = 0; i < this.length; i += 1) {
            if (this[i].failed()) {
                failures += 1;
            }
        }
        return failures;
    };
    that.passes = function () {
        return that.length - that.failures();
    };
    that.duration = duration || 0;
    return that;
};

/**
 * Create a wrapper function for assert module methods. Executes a callback
 * after the it's complete with an assertion object representing the result.
 *
 * @param {Function} callback
 * @api private
 */

var assertWrapper = function (callback) {
    return function (new_method, assert_method, arity) {
        return function () {
            var message = arguments[arity - 1];
            var a = exports.assertion({method: new_method, message: message});
            try {
                assert[assert_method].apply(null, arguments);
            }
            catch (e) {
                a.error = e;
            }
            callback(a);
        };
    };
};

/**
 * Creates the 'test' object that gets passed to every test function.
 * Accepts the name of the test function as its first argument, followed by
 * the start time in ms, the options object and a callback function.
 *
 * @param {String} name
 * @param {Number} start
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

exports.test = function (name, start, options, callback) {
    var expecting;
    var a_list = [];

    var wrapAssert = assertWrapper(function (a) {
        a_list.push(a);
        if (options.log) {
            async.nextTick(function () {
                options.log(a);
            });
        }
    });

    var test = {
        done: function (err) {
            if (expecting !== undefined && expecting !== a_list.length) {
                var e = new Error(
                    'Expected ' + expecting + ' assertions, ' +
                    a_list.length + ' ran'
                );
                var a1 = exports.assertion({method: 'expect', error: e});
                a_list.push(a1);
                if (options.log) {
                    async.nextTick(function () {
                        options.log(a1);
                    });
                }
            }
            if (err) {
                var a2 = exports.assertion({error: err});
                a_list.push(a2);
                if (options.log) {
                    async.nextTick(function () {
                        options.log(a2);
                    });
                }
            }
            var end = new Date().getTime();
            async.nextTick(function () {
                var assertion_list = exports.assertionList(a_list, end - start);
                options.testDone(name, assertion_list);
                callback(null, a_list);
            });
        },
        ok: wrapAssert('ok', 'ok', 2),
        same: wrapAssert('same', 'deepEqual', 3),
        equals: wrapAssert('equals', 'equal', 3),
        expect: function (num) {
            expecting = num;
        },
        _assertion_list: a_list
    };
    // add all functions from the assert module
    for (var k in assert) {
        if (assert.hasOwnProperty(k)) {
            test[k] = wrapAssert(k, k, assert[k].length);
        }
    }
    return test;
};

/**
 * Ensures an options object has all callbacks, adding empty callback functions
 * if any are missing.
 *
 * @param {Object} opt
 * @return {Object}
 * @api public
 */

exports.options = function (opt) {
    var optionalCallback = function (name) {
        opt[name] = opt[name] || function () {};
    };

    optionalCallback('moduleStart');
    optionalCallback('moduleDone');
    optionalCallback('testStart');
    optionalCallback('testDone');
    //optionalCallback('log');

    // 'done' callback is not optional.

    return opt;
};
})(types);
(function(exports){
/*!
 * Nodeunit
 * Copyright (c) 2010 Caolan McMahon
 * MIT Licensed
 *
 * THIS FILE SHOULD BE BROWSER-COMPATIBLE JS!
 * You can use @REMOVE_LINE_FOR_BROWSER to remove code from the browser build.
 * Only code on that line will be removed, its mostly to avoid requiring code
 * that is node specific
 */

/**
 * Module dependencies
 */

//var async = require('../deps/async'), //@REMOVE_LINE_FOR_BROWSER
//    types = require('./types');       //@REMOVE_LINE_FOR_BROWSER


/**
 * Added for browser compatibility
 */

var _keys = function (obj) {
    if (Object.keys) {
        return Object.keys(obj);
    }
    var keys = [];
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            keys.push(k);
        }
    }
    return keys;
};


var _copy = function (obj) {
    var nobj = {};
    var keys = _keys(obj);
    for (var i = 0; i <  keys.length; i += 1) {
        nobj[keys[i]] = obj[keys[i]];
    }
    return nobj;
};


/**
 * Runs a test function (fn) from a loaded module. After the test function
 * calls test.done(), the callback is executed with an assertionList as its
 * second argument.
 *
 * @param {String} name
 * @param {Function} fn
 * @param {Object} opt
 * @param {Function} callback
 * @api public
 */

exports.runTest = function (name, fn, opt, callback) {
    var options = types.options(opt);

    options.testStart(name);
    var start = new Date().getTime();
    var test = types.test(name, start, options, callback);

    try {
        fn(test);
    }
    catch (e) {
        test.done(e);
    }
};

/**
 * Takes an object containing test functions or other test suites as properties
 * and runs each in series. After all tests have completed, the callback is
 * called with a list of all assertions as the second argument.
 *
 * If a name is passed to this function it is prepended to all test and suite
 * names that run within it.
 *
 * @param {String} name
 * @param {Object} suite
 * @param {Object} opt
 * @param {Function} callback
 * @api public
 */

exports.runSuite = function (name, suite, opt, callback) {
    var keys = _keys(suite);

    async.concatSeries(keys, function (k, cb) {
        var prop = suite[k], _name;

        _name = name ? [].concat(name, k) : [k];

        _name.toString = function () {
            // fallback for old one
            return this.join(' - ');
        };

        if (typeof prop === 'function') {
            var in_name = false;
            for (var i = 0; i < _name.length; i += 1) {
                if (_name[i] === opt.testspec) {
                    in_name = true;
                }
            }
            if (!opt.testspec || in_name) {
                if (opt.moduleStart) {
                    opt.moduleStart();
                }
                exports.runTest(_name, suite[k], opt, cb);
            }
            else {
                return cb();
            }
        }
        else {
            exports.runSuite(_name, suite[k], opt, cb);
        }
    }, callback);
};

/**
 * Run each exported test function or test suite from a loaded module.
 *
 * @param {String} name
 * @param {Object} mod
 * @param {Object} opt
 * @param {Function} callback
 * @api public
 */

exports.runModule = function (name, mod, opt, callback) {
    var options = _copy(types.options(opt));

    var _run = false;
    var _moduleStart = options.moduleStart;
    function run_once() {
        if (!_run) {
            _run = true;
            _moduleStart(name);
        }
    }
    options.moduleStart = run_once;

    mod = this.testCase(mod);

    var start = new Date().getTime();

    exports.runSuite(null, mod, options, function (err, a_list) {
        var end = new Date().getTime();
        var assertion_list = types.assertionList(a_list, end - start);
        options.moduleDone(name, assertion_list);
        callback(null, a_list);
    });
};

/**
 * Treats an object literal as a list of modules keyed by name. Runs each
 * module and finished with calling 'done'. You can think of this as a browser
 * safe alternative to runFiles in the nodeunit module.
 *
 * @param {Object} modules
 * @param {Object} opt
 * @api public
 */

// TODO: add proper unit tests for this function
exports.runModules = function (modules, opt) {
    var all_assertions = [];
    var options = types.options(opt);
    var start = new Date().getTime();

    async.concatSeries(_keys(modules), function (k, cb) {
        exports.runModule(k, modules[k], options, cb);
    },
    function (err, all_assertions) {
        var end = new Date().getTime();
        options.done(types.assertionList(all_assertions, end - start));
    });
};


/**
 * Wraps a test function with setUp and tearDown functions.
 * Used by testCase.
 *
 * @param {Function} setUp
 * @param {Function} tearDown
 * @param {Function} fn
 * @api private
 */

var wrapTest = function (setUp, tearDown, fn) {
    return function (test) {
        var context = {};
        if (tearDown) {
            var done = test.done;
            test.done = function (err) {
                try {
                    tearDown.call(context, function (err2) {
                        if (err && err2) {
                            test._assertion_list.push(
                                types.assertion({error: err})
                            );
                            return done(err2);
                        }
                        done(err || err2);
                    });
                }
                catch (e) {
                    done(e);
                }
            };
        }
        if (setUp) {
            setUp.call(context, function (err) {
                if (err) {
                    return test.done(err);
                }
                fn.call(context, test);
            });
        }
        else {
            fn.call(context, test);
        }
    };
};


/**
 * Wraps a group of tests with setUp and tearDown functions.
 * Used by testCase.
 *
 * @param {Function} setUp
 * @param {Function} tearDown
 * @param {Object} group
 * @api private
 */

var wrapGroup = function (setUp, tearDown, group) {
    var tests = {};
    var keys = _keys(group);
    for (var i = 0; i < keys.length; i += 1) {
        var k = keys[i];
        if (typeof group[k] === 'function') {
            tests[k] = wrapTest(setUp, tearDown, group[k]);
        }
        else if (typeof group[k] === 'object') {
            tests[k] = wrapGroup(setUp, tearDown, group[k]);
        }
    }
    return tests;
};


/**
 * Utility for wrapping a suite of test functions with setUp and tearDown
 * functions.
 *
 * @param {Object} suite
 * @return {Object}
 * @api public
 */

exports.testCase = function (suite) {
    var setUp = suite.setUp;
    var tearDown = suite.tearDown;
    delete suite.setUp;
    delete suite.tearDown;
    return wrapGroup(setUp, tearDown, suite);
};
})(core);
(function(exports){
/*!
 * Nodeunit
 * Copyright (c) 2010 Caolan McMahon
 * MIT Licensed
 *
 * THIS FILE SHOULD BE BROWSER-COMPATIBLE JS!
 * You can use @REMOVE_LINE_FOR_BROWSER to remove code from the browser build.
 * Only code on that line will be removed, its mostly to avoid requiring code
 * that is node specific
 */


/**
 * NOTE: this test runner is not listed in index.js because it cannot be
 * used with the command-line tool, only inside the browser.
 */


/**
 * Reporter info string
 */

exports.info = "Browser-based test reporter";


/**
 * Run all tests within each module, reporting the results
 *
 * @param {Array} files
 * @api public
 */

exports.run = function (modules, options) {
    var start = new Date().getTime();

    function setText(el, txt) {
        if ('innerText' in el) {
            el.innerText = txt;
        }
        else if ('textContent' in el){
            el.textContent = txt;
        }
    }

    function getOrCreate(tag, id) {
        var el = document.getElementById(id);
        if (!el) {
            el = document.createElement(tag);
            el.id = id;
            document.body.appendChild(el);
        }
        return el;
    };

    var header = getOrCreate('h1', 'nodeunit-header');
    var banner = getOrCreate('h2', 'nodeunit-banner');
    var userAgent = getOrCreate('h2', 'nodeunit-userAgent');
    var tests = getOrCreate('ol', 'nodeunit-tests');
    var result = getOrCreate('p', 'nodeunit-testresult');

    setText(userAgent, navigator.userAgent);

    nodeunit.runModules(modules, {
        moduleStart: function (name) {
            /*var mheading = document.createElement('h2');
            mheading.innerText = name;
            results.appendChild(mheading);
            module = document.createElement('ol');
            results.appendChild(module);*/
        },
        testDone: function (name, assertions) {
            var test = document.createElement('li');
            var strong = document.createElement('strong');
            strong.innerHTML = name + ' <b style="color: black;">(' +
                '<b class="fail">' + assertions.failures() + '</b>, ' +
                '<b class="pass">' + assertions.passes() + '</b>, ' +
                assertions.length +
            ')</b>';
            test.className = assertions.failures() ? 'fail': 'pass';
            test.appendChild(strong);

            var aList = document.createElement('ol');
            aList.style.display = 'none';
            test.onclick = function () {
                var d = aList.style.display;
                aList.style.display = (d == 'none') ? 'block': 'none';
            };
            for (var i=0; i<assertions.length; i++) {
                var li = document.createElement('li');
                var a = assertions[i];
                if (a.failed()) {
                    li.innerHTML = (a.message || a.method || 'no message') +
                        '<pre>' + (a.error.stack || a.error) + '</pre>';
                    li.className = 'fail';
                }
                else {
                    li.innerHTML = a.message || a.method || 'no message';
                    li.className = 'pass';
                }
                aList.appendChild(li);
            }
            test.appendChild(aList);
            tests.appendChild(test);
        },
        done: function (assertions) {
            var end = new Date().getTime();
            var duration = end - start;

            var failures = assertions.failures();
            banner.className = failures ? 'fail': 'pass';

            result.innerHTML = 'Tests completed in ' + duration +
                ' milliseconds.<br/><span class="passed">' +
                assertions.passes() + '</span> assertions of ' +
                '<span class="all">' + assertions.length + '<span> passed, ' +
                assertions.failures() + ' failed.';
        }
    });
};
})(reporter);
nodeunit = core;
nodeunit.assert = assert;
nodeunit.reporter = reporter;
nodeunit.run = reporter.run;
return nodeunit; })();

var frozenMoment = require("../../frozen-moment");

exports.add = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "add short args" : function (test) {
        test.expect(16);

        var a = frozenMoment.build(), b, c, d;
        a = a.year(2011);
        a = a.month(9);
        a = a.date(12);
        a = a.hours(6);
        a = a.minutes(7);
        a = a.seconds(8);
        a = a.milliseconds(500);

        test.equal(a.add({ms: 50}).freeze().milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add({s: 1}).freeze().seconds(), 9, 'Add seconds');
        test.equal(a.add({m: 1}).freeze().minutes(), 8, 'Add minutes');
        test.equal(a.add({h: 1}).freeze().hours(), 7, 'Add hours');
        test.equal(a.add({d: 1}).freeze().date(), 13, 'Add date');
        test.equal(a.add({w: 1}).freeze().date(), 20, 'Add week');
        test.equal(a.add({M: 1}).freeze().month(), 10, 'Add month');
        test.equal(a.add({y: 1}).freeze().year(), 2012, 'Add year');
        test.equal(a.add({Q: 1}).freeze().month(), 1, 'Add quarter');

        b = frozenMoment.build([2010, 0, 31]).add({M: 1}).freeze();
        c = frozenMoment.build([2010, 1, 28]).subtract({M: 1}).freeze();
        d = frozenMoment.build([2010, 1, 28]).subtract({Q: 1}).freeze();

        test.equal(b.month(), 1, 'add month, jan 31st to feb 28th');
        test.equal(b.date(), 28, 'add month, jan 31st to feb 28th');
        test.equal(c.month(), 0, 'subtract month, feb 28th to jan 28th');
        test.equal(c.date(), 28, 'subtract month, feb 28th to jan 28th');
        test.equal(d.month(), 10, 'subtract quarter, feb 28th 2010 to nov 28th 2009');
        test.equal(d.date(), 28, 'subtract quarter, feb 28th 2010 to nov 28th 2009');
        test.equal(d.year(), 2009, 'subtract quarter, feb 28th 2010 to nov 28th 2009');
        test.done();
    },

    "add long args" : function (test) {
        test.expect(9);

        var a = frozenMoment.build();
        a = a.year(2011);
        a = a.month(9);
        a = a.date(12);
        a = a.hours(6);
        a = a.minutes(7);
        a = a.seconds(8);
        a = a.milliseconds(500);

        test.equal(a.add({milliseconds: 50}).freeze().milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add({seconds: 1}).freeze().seconds(), 9, 'Add seconds');
        test.equal(a.add({minutes: 1}).freeze().minutes(), 8, 'Add minutes');
        test.equal(a.add({hours: 1}).freeze().hours(), 7, 'Add hours');
        test.equal(a.add({days: 1}).freeze().date(), 13, 'Add date');
        test.equal(a.add({weeks: 1}).freeze().date(), 20, 'Add week');
        test.equal(a.add({months: 1}).freeze().month(), 10, 'Add month');
        test.equal(a.add({years: 1}).freeze().year(), 2012, 'Add year');
        test.equal(a.add({quarters: 1}).freeze().month(), 1, 'Add quarter');
        test.done();
    },

    "add long singular args" : function (test) {
        test.expect(9);

        var a = frozenMoment.build();
        a = a.year(2011);
        a = a.month(9);
        a = a.date(12);
        a = a.hours(6);
        a = a.minutes(7);
        a = a.seconds(8);
        a = a.milliseconds(500);

        test.equal(a.add({millisecond: 50}).freeze().milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add({second: 1}).freeze().seconds(), 9, 'Add seconds');
        test.equal(a.add({minute: 1}).freeze().minutes(), 8, 'Add minutes');
        test.equal(a.add({hour: 1}).freeze().hours(), 7, 'Add hours');
        test.equal(a.add({day: 1}).freeze().date(), 13, 'Add date');
        test.equal(a.add({week: 1}).freeze().date(), 20, 'Add week');
        test.equal(a.add({month: 1}).freeze().month(), 10, 'Add month');
        test.equal(a.add({year: 1}).freeze().year(), 2012, 'Add year');
        test.equal(a.add({quarter: 1}).freeze().month(), 1, 'Add quarter');
        test.done();
    },

    "add string long singular" : function (test) {
        test.expect(9);

        var a = frozenMoment.build();
        a = a.year(2011);
        a = a.month(9);
        a = a.date(12);
        a = a.hours(6);
        a = a.minutes(7);
        a = a.seconds(8);
        a = a.milliseconds(500);

        test.equal(a.add(50, 'millisecond').freeze().milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add(1, 'second').freeze().seconds(), 9, 'Add seconds');
        test.equal(a.add(1, 'minute').freeze().minutes(), 8, 'Add minutes');
        test.equal(a.add(1, 'hour').freeze().hours(), 7, 'Add hours');
        test.equal(a.add(1, 'day').freeze().date(), 13, 'Add date');
        test.equal(a.add(1, 'week').freeze().date(), 20, 'Add week');
        test.equal(a.add(1, 'month').freeze().month(), 10, 'Add month');
        test.equal(a.add(1, 'year').freeze().year(), 2012, 'Add year');
        test.equal(a.add(1, 'quarter').freeze().month(), 1, 'Add quarter');
        test.done();
    },

    "add string long" : function (test) {
        test.expect(9);

        var a = frozenMoment.build();
        a = a.year(2011);
        a = a.month(9);
        a = a.date(12);
        a = a.hours(6);
        a = a.minutes(7);
        a = a.seconds(8);
        a = a.milliseconds(500);

        test.equal(a.add(50, 'milliseconds').freeze().milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add(1, 'seconds').freeze().seconds(), 9, 'Add seconds');
        test.equal(a.add(1, 'minutes').freeze().minutes(), 8, 'Add minutes');
        test.equal(a.add(1, 'hours').freeze().hours(), 7, 'Add hours');
        test.equal(a.add(1, 'days').freeze().date(), 13, 'Add date');
        test.equal(a.add(1, 'weeks').freeze().date(), 20, 'Add week');
        test.equal(a.add(1, 'months').freeze().month(), 10, 'Add month');
        test.equal(a.add(1, 'years').freeze().year(), 2012, 'Add year');
        test.equal(a.add(1, 'quarters').freeze().month(), 1, 'Add quarter');
        test.done();
    },

    "add string short" : function (test) {
        test.expect(9);

        var a = frozenMoment.build();
        a = a.year(2011);
        a = a.month(9);
        a = a.date(12);
        a = a.hours(6);
        a = a.minutes(7);
        a = a.seconds(8);
        a = a.milliseconds(500);

        test.equal(a.add(50, 'ms').freeze().milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add(1, 's').freeze().seconds(), 9, 'Add seconds');
        test.equal(a.add(1, 'm').freeze().minutes(), 8, 'Add minutes');
        test.equal(a.add(1, 'h').freeze().hours(), 7, 'Add hours');
        test.equal(a.add(1, 'd').freeze().date(), 13, 'Add date');
        test.equal(a.add(1, 'w').freeze().date(), 20, 'Add week');
        test.equal(a.add(1, 'M').freeze().month(), 10, 'Add month');
        test.equal(a.add(1, 'y').freeze().year(), 2012, 'Add year');
        test.equal(a.add(1, 'Q').freeze().month(), 1, 'Add quarter');
        test.done();
    },

    "add strings string short" : function (test) {
        test.expect(9);

        var a = frozenMoment.build();
        a = a.year(2011);
        a = a.month(9);
        a = a.date(12);
        a = a.hours(6);
        a = a.minutes(7);
        a = a.seconds(8);
        a = a.milliseconds(500);

        test.equal(a.add('50', 'ms').freeze().milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add('1', 's').freeze().seconds(), 9, 'Add seconds');
        test.equal(a.add('1', 'm').freeze().minutes(), 8, 'Add minutes');
        test.equal(a.add('1', 'h').freeze().hours(), 7, 'Add hours');
        test.equal(a.add('1', 'd').freeze().date(), 13, 'Add date');
        test.equal(a.add('1', 'w').freeze().date(), 20, 'Add week');
        test.equal(a.add('1', 'M').freeze().month(), 10, 'Add month');
        test.equal(a.add('1', 'y').freeze().year(), 2012, 'Add year');
        test.equal(a.add('1', 'Q').freeze().month(), 1, 'Add quarter');
        test.done();
    },

    "subtract strings string short" : function (test) {
        test.expect(9);

        var a = frozenMoment.build();
        a = a.year(2011);
        a = a.month(9);
        a = a.date(12);
        a = a.hours(6);
        a = a.minutes(7);
        a = a.seconds(8);
        a = a.milliseconds(500);

        test.equal(a.subtract('50', 'ms').freeze().milliseconds(), 450, 'Subtract milliseconds');
        test.equal(a.subtract('1', 's').freeze().seconds(), 7, 'Subtract seconds');
        test.equal(a.subtract('1', 'm').freeze().minutes(), 6, 'Subtract minutes');
        test.equal(a.subtract('1', 'h').freeze().hours(), 5, 'Subtract hours');
        test.equal(a.subtract('1', 'd').freeze().date(), 11, 'Subtract date');
        test.equal(a.subtract('1', 'w').freeze().date(), 4, 'Subtract week');
        test.equal(a.subtract('1', 'M').freeze().month(), 8, 'Subtract month');
        test.equal(a.subtract('1', 'y').freeze().year(), 2010, 'Subtract year');
        test.equal(a.subtract('1', 'Q').freeze().month(), 5, 'Subtract quarter');
        test.done();
    },

    "add across DST" : function (test) {
        // Detect Safari bug and bail. Hours on 13th March 2011 are shifted
        // with 1 ahead.
        if (new Date(2011, 2, 13, 5, 0, 0).getHours() !== 5) {
            test.done();
            return;
        }

        var a = frozenMoment.build(new Date(2011, 2, 12, 5, 0, 0)),
            b = frozenMoment.build(new Date(2011, 2, 12, 5, 0, 0)),
            c = frozenMoment.build(new Date(2011, 2, 12, 5, 0, 0)),
            d = frozenMoment(new Date(2011, 2, 12, 5, 0, 0)),
            e = frozenMoment.build(new Date(2011, 2, 12, 5, 0, 0));
        a = a.add(1, 'days').freeze();
        b = b.add(24, 'hours').freeze();
        c = c.add(1, 'months').freeze();
        e = e.add(1, 'quarter').freeze();
        test.equal(a.hours(), 5, 'adding days over DST difference should result in the same hour');
        if (b.isDST() && !d.isDST()) {
            test.equal(b.hours(), 6, 'adding hours over DST difference should result in a different hour');
        } else if (!b.isDST() && d.isDST()) {
            test.equal(b.hours(), 4, 'adding hours over DST difference should result in a different hour');
        } else {
            test.equal(b.hours(), 5, 'adding hours over DST difference should result in a same hour if the timezone does not have daylight savings time');
        }
        test.equal(c.hours(), 5, 'adding months over DST difference should result in the same hour');
        test.equal(e.hours(), 5, 'adding quarters over DST difference should result in the same hour');
        test.done();
    }
};

var frozenMoment = require("../../frozen-moment"),

    getVerifier = function (test) {
        return function (input, format, expected, description, asymetrical) {
            var m = frozenMoment(input, format);
            test.equal(m.format('YYYY MM DD'), expected, 'compare: ' + description);

            //test round trip
            if (!asymetrical) {
                test.equal(m.format(format), input, 'round trip: ' + description);
            }
        };
    };

exports.create = {
    setUp : function (done) {
        frozenMoment.locale('en');
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "array" : function (test) {
        test.expect(8);
        test.ok(frozenMoment([2010]).toDate() instanceof Date, "[2010]");
        test.ok(frozenMoment([2010, 1]).toDate() instanceof Date, "[2010, 1]");
        test.ok(frozenMoment([2010, 1, 12]).toDate() instanceof Date, "[2010, 1, 12]");
        test.ok(frozenMoment([2010, 1, 12, 1]).toDate() instanceof Date, "[2010, 1, 12, 1]");
        test.ok(frozenMoment([2010, 1, 12, 1, 1]).toDate() instanceof Date, "[2010, 1, 12, 1, 1]");
        test.ok(frozenMoment([2010, 1, 12, 1, 1, 1]).toDate() instanceof Date, "[2010, 1, 12, 1, 1, 1]");
        test.ok(frozenMoment([2010, 1, 12, 1, 1, 1, 1]).toDate() instanceof Date, "[2010, 1, 12, 1, 1, 1, 1]");
        test.equal(+frozenMoment(new Date(2010, 1, 14, 15, 25, 50, 125)), +frozenMoment([2010, 1, 14, 15, 25, 50, 125]), "constructing with array === constructing with new Date()");
        test.done();
    },

    "array copying": function (test) {
        var importantArray = [2009, 11];
        test.expect(1);
        frozenMoment(importantArray);
        test.deepEqual(importantArray, [2009, 11], "initializer should not mutate the original array");
        test.done();
    },

    "object" : function (test) {
        test.expect(10);
        test.ok(frozenMoment({year: 2010}).toDate() instanceof Date, "{year: 2010}");
        test.ok(frozenMoment({year: 2010, month: 1}).toDate() instanceof Date, "{year: 2010, month: 1}");
        test.ok(frozenMoment({year: 2010, month: 1, day: 12}).toDate() instanceof Date, "{year: 2010, month: 1, day: 12}");
        test.ok(frozenMoment({year: 2010, month: 1, day: 12, hours: 1}).toDate() instanceof Date, "{year: 2010, month: 1, day: 12, hours: 1}");
        test.ok(frozenMoment({year: 2010, month: 1, day: 12, hours: 1, minutes: 1}).toDate() instanceof Date, "{year: 2010, month: 1, hours: 12, minutes: 1, seconds: 1}");
        test.ok(frozenMoment({year: 2010, month: 1, day: 12, hours: 1, minutes: 1, seconds: 1}).toDate() instanceof Date, "{year: 2010, month: 1, day: 12, hours: 1, minutes: 1, seconds: 1}");
        test.ok(frozenMoment({year: 2010, month: 1, day: 12, hours: 1, minutes: 1, seconds: 1, milliseconds: 1}).toDate() instanceof Date, "{year: 2010, month: 1, day: 12, hours: 1, minutes: 1, seconds: 1, milliseconds: 1}");
        test.equal(+frozenMoment(new Date(2010, 1, 14, 15, 25, 50, 125)), +frozenMoment({years: 2010, months: 1, days: 14, hours: 15, minutes: 25, seconds: 50, milliseconds: 125}), "constructing with object (long plural) === constructing with new Date()");
        test.equal(+frozenMoment(new Date(2010, 1, 14, 15, 25, 50, 125)), +frozenMoment({year: 2010, month: 1, day: 14, hour: 15, minute: 25, second: 50, millisecond: 125}), "constructing with object (long) === constructing with new Date()");
        test.equal(+frozenMoment(new Date(2010, 1, 14, 15, 25, 50, 125)), +frozenMoment({y: 2010, M: 1, d: 14, h: 15, m: 25, s: 50, ms: 125}), "constructing with object (short) === constructing with new Date()");
        test.done();
    },

    "multi format array copying": function (test) {
        var importantArray = ['MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY'];
        test.expect(1);
        frozenMoment('1999-02-13', importantArray);
        test.deepEqual(importantArray, ['MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY'], "initializer should not mutate the original array");
        test.done();
    },

    "number" : function (test) {
        test.expect(3);
        test.ok(frozenMoment(1000).toDate() instanceof Date, "1000");
        test.ok((frozenMoment(1000).valueOf() === 1000), "testing valueOf");
        test.ok((frozenMoment.utc(1000).valueOf() === 1000), "testing valueOf");
        test.done();
    },

    "unix" : function (test) {
        test.expect(8);
        test.equal(frozenMoment.unix(1).valueOf(), 1000, "1 unix timestamp == 1000 Date.valueOf");
        test.equal(frozenMoment(1000).unix(), 1, "1000 Date.valueOf == 1 unix timestamp");
        test.equal(frozenMoment.unix(1000).valueOf(), 1000000, "1000 unix timestamp == 1000000 Date.valueOf");
        test.equal(frozenMoment(1500).unix(), 1, "1500 Date.valueOf == 1 unix timestamp");
        test.equal(frozenMoment(1900).unix(), 1, "1900 Date.valueOf == 1 unix timestamp");
        test.equal(frozenMoment(2100).unix(), 2, "2100 Date.valueOf == 2 unix timestamp");
        test.equal(frozenMoment(1333129333524).unix(), 1333129333, "1333129333524 Date.valueOf == 1333129333 unix timestamp");
        test.equal(frozenMoment(1333129333524000).unix(), 1333129333524, "1333129333524000 Date.valueOf == 1333129333524 unix timestamp");
        test.done();
    },

    "date" : function (test) {
        test.expect(1);
        test.ok(frozenMoment(new Date()).toDate() instanceof Date, "new Date()");
        test.done();
    },

    "date mutation" : function (test) {
        test.expect(1);
        var a = new Date();
        test.ok(frozenMoment(a).toDate() !== a, "the date frozenMoment uses should not be the date passed in");
        test.done();
    },

    "frozenMoment" : function (test) {
        test.expect(2);
        test.ok(frozenMoment(frozenMoment()).toDate() instanceof Date, "frozenMoment(frozenMoment())");
        test.ok(frozenMoment(frozenMoment(frozenMoment())).toDate() instanceof Date, "frozenMoment(frozenMoment(frozenMoment()))");
        test.done();
    },

    "cloning frozenMoment should only copy own properties" : function (test) {
        test.expect(1);
        test.ok(!frozenMoment().clone().hasOwnProperty('month'), "Should not clone prototype methods");
        test.done();
    },

    "cloning frozenMoment works with weird clones" : function (test) {
        var extend = function (a, b) {
                var i;
                for (i in b) {
                    a[i] = b[i];
                }
                return a;
            },
            now = frozenMoment(),
            nowu = frozenMoment.utc();

        test.expect(2);
        test.equal(+extend({}, now).clone(), +now, "cloning extend-ed now is now");
        test.equal(+extend({}, nowu).clone(), +nowu, "cloning extend-ed utc now is utc now");
        test.done();
    },

    "undefined" : function (test) {
        test.expect(1);
        test.ok(frozenMoment().toDate() instanceof Date, "undefined");
        test.done();
    },

    "string without format - json" : function (test) {
        test.expect(5);
        test.equal(frozenMoment("Date(1325132654000)").valueOf(), 1325132654000, "Date(1325132654000)");
        test.equal(frozenMoment("Date(-1325132654000)").valueOf(), -1325132654000, "Date(-1325132654000)");
        test.equal(frozenMoment("/Date(1325132654000)/").valueOf(), 1325132654000, "/Date(1325132654000)/");
        test.equal(frozenMoment("/Date(1325132654000+0700)/").valueOf(), 1325132654000, "/Date(1325132654000+0700)/");
        test.equal(frozenMoment("/Date(1325132654000-0700)/").valueOf(), 1325132654000, "/Date(1325132654000-0700)/");
        test.done();
    },

    "string with format dropped am/pm bug" : function (test) {
        frozenMoment.locale('en');
        test.expect(6);

        test.equal(frozenMoment('05/1/2012 12:25:00', 'MM/DD/YYYY h:m:s a').format('MM/DD/YYYY'), '05/01/2012', 'should not break if am/pm is left off from the parsing tokens');
        test.equal(frozenMoment('05/1/2012 12:25:00 am', 'MM/DD/YYYY h:m:s a').format('MM/DD/YYYY'), '05/01/2012', 'should not break if am/pm is left off from the parsing tokens');
        test.equal(frozenMoment('05/1/2012 12:25:00 pm', 'MM/DD/YYYY h:m:s a').format('MM/DD/YYYY'), '05/01/2012', 'should not break if am/pm is left off from the parsing tokens');

        test.ok(frozenMoment('05/1/2012 12:25:00', 'MM/DD/YYYY h:m:s a').isValid());
        test.ok(frozenMoment('05/1/2012 12:25:00 am', 'MM/DD/YYYY h:m:s a').isValid());
        test.ok(frozenMoment('05/1/2012 12:25:00 pm', 'MM/DD/YYYY h:m:s a').isValid());

        test.done();
    },

    "empty string with formats" : function (test) {
        test.expect(8);

        test.equal(frozenMoment('', 'MM').format('YYYY-MM-DD HH:mm:ss'), 'Invalid date');
        test.equal(frozenMoment(' ', 'MM').format('YYYY-MM-DD HH:mm:ss'), 'Invalid date');
        test.equal(frozenMoment(' ', 'DD').format('YYYY-MM-DD HH:mm:ss'), 'Invalid date');
        test.equal(frozenMoment(' ', ['MM', "DD"]).format('YYYY-MM-DD HH:mm:ss'), 'Invalid date');

        test.ok(!frozenMoment('', 'MM').isValid());
        test.ok(!frozenMoment(' ', 'MM').isValid());
        test.ok(!frozenMoment(' ', 'DD').isValid());
        test.ok(!frozenMoment(' ', ['MM', "DD"]).isValid());

        test.done();
    },

    "defaulting to current date" : function (test) {
        test.expect(4);

        var now = frozenMoment();
        test.equal(frozenMoment('12:13:14', 'hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'),
                now.thaw().hour(12).minute(13).second(14).freeze().format('YYYY-MM-DD hh:mm:ss'),
                'given only time default to current date');
        test.equal(frozenMoment('05', 'DD').format('YYYY-MM-DD'),
                now.thaw().date(5).freeze().format('YYYY-MM-DD'),
                'given day of month default to current month, year');
        test.equal(frozenMoment('05', 'MM').format('YYYY-MM-DD'),
                now.thaw().month(4).date(1).freeze().format('YYYY-MM-DD'),
                'given month default to current year');
        test.equal(frozenMoment('1996', 'YYYY').format('YYYY-MM-DD'),
                now.thaw().year(1996).month(0).date(1).freeze().format('YYYY-MM-DD'),
                'given year do not default');
        test.done();
    },

    "matching am/pm" : function (test) {
        test.expect(13);

        test.equal(frozenMoment('2012-09-03T03:00PM',   'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for PM');
        test.equal(frozenMoment('2012-09-03T03:00P.M.', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for P.M.');
        test.equal(frozenMoment('2012-09-03T03:00P',    'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for P');
        test.equal(frozenMoment('2012-09-03T03:00pm',   'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for pm');
        test.equal(frozenMoment('2012-09-03T03:00p.m.', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for p.m.');
        test.equal(frozenMoment('2012-09-03T03:00p',    'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for p');

        test.equal(frozenMoment('2012-09-03T03:00AM',   'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for AM');
        test.equal(frozenMoment('2012-09-03T03:00A.M.', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for A.M.');
        test.equal(frozenMoment('2012-09-03T03:00A',    'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for A');
        test.equal(frozenMoment('2012-09-03T03:00am',   'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for am');
        test.equal(frozenMoment('2012-09-03T03:00a.m.', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for a.m.');
        test.equal(frozenMoment('2012-09-03T03:00a',    'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for a');

        test.equal(frozenMoment('5:00p.m.March 4 2012', 'h:mmAMMMM D YYYY').format('YYYY-MM-DDThh:mmA'), '2012-03-04T05:00PM', 'am/pm should parse correctly before month names');

        test.done();
    },

    "string with format" : function (test) {
        frozenMoment.locale('en');
        var a = [
                ['YYYY-Q',              '2014-4'],
                ['MM-DD-YYYY',          '12-02-1999'],
                ['DD-MM-YYYY',          '12-02-1999'],
                ['DD/MM/YYYY',          '12/02/1999'],
                ['DD_MM_YYYY',          '12_02_1999'],
                ['DD:MM:YYYY',          '12:02:1999'],
                ['D-M-YY',              '2-2-99'],
                ['YY',                  '99'],
                ['DDD-YYYY',            '300-1999'],
                ['DD-MM-YYYY h:m:s',    '12-02-1999 2:45:10'],
                ['DD-MM-YYYY h:m:s a',  '12-02-1999 2:45:10 am'],
                ['DD-MM-YYYY h:m:s a',  '12-02-1999 2:45:10 pm'],
                ['h:mm a',              '12:00 pm'],
                ['h:mm a',              '12:30 pm'],
                ['h:mm a',              '12:00 am'],
                ['h:mm a',              '12:30 am'],
                ['HH:mm',               '12:00'],
                ['YYYY-MM-DDTHH:mm:ss', '2011-11-11T11:11:11'],
                ['MM-DD-YYYY [M]',      '12-02-1999 M'],
                ['ddd MMM DD HH:mm:ss YYYY', 'Tue Apr 07 22:52:51 2009'],
                ['HH:mm:ss',            '12:00:00'],
                ['HH:mm:ss',            '12:30:00'],
                ['HH:mm:ss',            '00:00:00'],
                ['HH:mm:ss S',          '00:30:00 1'],
                ['HH:mm:ss SS',         '00:30:00 12'],
                ['HH:mm:ss SSS',        '00:30:00 123'],
                ['HH:mm:ss S',          '00:30:00 7'],
                ['HH:mm:ss SS',         '00:30:00 78'],
                ['HH:mm:ss SSS',        '00:30:00 789'],
                ['X',                   '1234567890'],
                ['LT',                  '12:30 AM'],
                ['L',                   '09/02/1999'],
                ['l',                   '9/2/1999'],
                ['LL',                  'September 2 1999'],
                ['ll',                  'Sep 2 1999'],
                ['LLL',                 'September 2 1999 12:30 AM'],
                ['lll',                 'Sep 2 1999 12:30 AM'],
                ['LLLL',                'Thursday, September 2 1999 12:30 AM'],
                ['llll',                'Thu, Sep 2 1999 12:30 AM']
            ],
            m,
            i;

        test.expect(2 * a.length);
        for (i = 0; i < a.length; i++) {
            m = frozenMoment(a[i][1], a[i][0]);
            test.ok(m.isValid());
            test.equal(m.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    },

    "unix timestamp format" : function (test) {
        var formats = ['X', 'X.S', 'X.SS', 'X.SSS'], i, format;

        test.expect(formats.length * 4);
        for (i = 0; i < formats.length; i++) {
            format = formats[i];
            test.equal(frozenMoment('1234567890',     format).valueOf(), 1234567890 * 1000,       format + " matches timestamp without milliseconds");
            test.equal(frozenMoment('1234567890.1',   format).valueOf(), 1234567890 * 1000 + 100, format + " matches timestamp with deciseconds");
            test.equal(frozenMoment('1234567890.12',  format).valueOf(), 1234567890 * 1000 + 120, format + " matches timestamp with centiseconds");
            test.equal(frozenMoment('1234567890.123', format).valueOf(), 1234567890 * 1000 + 123, format + " matches timestamp with milliseconds");
        }

        test.done();
    },

    "milliseconds format" : function (test) {
        test.expect(5);
        test.equal(frozenMoment('1', 'S').get('ms'), 100, 'deciseconds');
        // test.equal(frozenMoment('10', 'S', true).isValid(), false, 'deciseconds with two digits');
        // test.equal(frozenMoment('1', 'SS', true).isValid(), false, 'centiseconds with one digits');
        test.equal(frozenMoment('12', 'SS').get('ms'), 120, 'centiseconds');
        // test.equal(frozenMoment('123', 'SS', true).isValid(), false, 'centiseconds with three digits');
        test.equal(frozenMoment('123', 'SSS').get('ms'), 123, 'milliseconds');
        test.equal(frozenMoment('1234', 'SSSS').get('ms'), 123, 'milliseconds with SSSS');
        test.equal(frozenMoment('123456789101112', 'SSSS').get('ms'), 123, 'milliseconds with SSSS');
        test.done();
    },

    "string with format no separators" : function (test) {
        frozenMoment.locale('en');
        var a = [
                ['MMDDYYYY',          '12021999'],
                ['DDMMYYYY',          '12021999'],
                ['YYYYMMDD',          '19991202'],
                ['DDMMMYYYY',         '10Sep2001']
            ], i;

        test.expect(a.length);

        for (i = 0; i < a.length; i++) {
            test.equal(frozenMoment(a[i][1], a[i][0]).format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }

        test.done();
    },

    "string with format (timezone)" : function (test) {
        test.expect(8);
        test.equal(frozenMoment('5 -0700', 'H ZZ').toDate().getUTCHours(), 12, 'parse hours "5 -0700" ---> "H ZZ"');
        test.equal(frozenMoment('5 -07:00', 'H Z').toDate().getUTCHours(), 12, 'parse hours "5 -07:00" ---> "H Z"');
        test.equal(frozenMoment('5 -0730', 'H ZZ').toDate().getUTCMinutes(), 30, 'parse hours "5 -0730" ---> "H ZZ"');
        test.equal(frozenMoment('5 -07:30', 'H Z').toDate().getUTCMinutes(), 30, 'parse hours "5 -07:0" ---> "H Z"');
        test.equal(frozenMoment('5 +0100', 'H ZZ').toDate().getUTCHours(), 4, 'parse hours "5 +0100" ---> "H ZZ"');
        test.equal(frozenMoment('5 +01:00', 'H Z').toDate().getUTCHours(), 4, 'parse hours "5 +01:00" ---> "H Z"');
        test.equal(frozenMoment('5 +0130', 'H ZZ').toDate().getUTCMinutes(), 30, 'parse hours "5 +0130" ---> "H ZZ"');
        test.equal(frozenMoment('5 +01:30', 'H Z').toDate().getUTCMinutes(), 30, 'parse hours "5 +01:30" ---> "H Z"');
        test.done();
    },

    "string with format (timezone offset)" : function (test) {
        var a, b, c, d, e, f;
        test.expect(4);
        a = new Date(Date.UTC(2011, 0, 1, 1));
        b = frozenMoment('2011 1 1 0 -01:00', 'YYYY MM DD HH Z');
        test.equal(a.getHours(), b.hours(), 'date created with utc == parsed string with timezone offset');
        test.equal(+a, +b, 'date created with utc == parsed string with timezone offset');
        c = frozenMoment('2011 2 1 10 -05:00', 'YYYY MM DD HH Z');
        d = frozenMoment('2011 2 1 8 -07:00', 'YYYY MM DD HH Z');
        test.equal(c.hours(), d.hours(), '10 am central time == 8 am pacific time');
        e = frozenMoment.utc('Fri, 20 Jul 2012 17:15:00', 'ddd, DD MMM YYYY HH:mm:ss');
        f = frozenMoment.utc('Fri, 20 Jul 2012 10:15:00 -0700', 'ddd, DD MMM YYYY HH:mm:ss ZZ');
        test.equal(e.hours(), f.hours(), 'parse timezone offset in utc');
        test.done();
    },

    "string with timezone around start of year" : function (test) {
        test.equal(frozenMoment('2000-01-01T00:00:00.000+01:00').toISOString(), "1999-12-31T23:00:00.000Z", "+1:00 around 2000");
        test.equal(frozenMoment('2000-01-01T00:00:00.000-01:00').toISOString(), "2000-01-01T01:00:00.000Z", "-1:00 around 2000");
        test.equal(frozenMoment('1970-01-01T00:00:00.000+01:00').toISOString(), "1969-12-31T23:00:00.000Z", "+1:00 around 1970");
        test.equal(frozenMoment('1970-01-01T00:00:00.000-01:00').toISOString(), "1970-01-01T01:00:00.000Z", "-1:00 around 1970");
        test.equal(frozenMoment('1200-01-01T00:00:00.000+01:00').toISOString(), "1199-12-31T23:00:00.000Z", "+1:00 around 1200");
        test.equal(frozenMoment('1200-01-01T00:00:00.000-01:00').toISOString(), "1200-01-01T01:00:00.000Z", "-1:00 around 1200");
        test.done();
    },

    "string with array of formats" : function (test) {
        test.equal(frozenMoment('11-02-1999', ['MM-DD-YYYY', 'DD-MM-YYYY']).format('MM DD YYYY'), '11 02 1999', 'switching month and day');
        test.equal(frozenMoment('02-11-1999', ['MM/DD/YYYY', 'YYYY MM DD', 'MM-DD-YYYY']).format('MM DD YYYY'), '02 11 1999', 'year last');
        test.equal(frozenMoment('1999-02-11', ['MM/DD/YYYY', 'YYYY MM DD', 'MM-DD-YYYY']).format('MM DD YYYY'), '02 11 1999', 'year first');

        test.equal(frozenMoment('02-11-1999', ['MM/DD/YYYY', 'YYYY MM DD']).format('MM DD YYYY'), '02 11 1999', 'year last');
        test.equal(frozenMoment('1999-02-11', ['MM/DD/YYYY', 'YYYY MM DD']).format('MM DD YYYY'), '02 11 1999', 'year first');
        test.equal(frozenMoment('02-11-1999', ['YYYY MM DD', 'MM/DD/YYYY']).format('MM DD YYYY'), '02 11 1999', 'year last');
        test.equal(frozenMoment('1999-02-11', ['YYYY MM DD', 'MM/DD/YYYY']).format('MM DD YYYY'), '02 11 1999', 'year first');

        test.equal(frozenMoment('13-11-1999', ['MM/DD/YYYY', 'DD/MM/YYYY']).format('MM DD YYYY'), '11 13 1999', 'second must be month');
        test.equal(frozenMoment('11-13-1999', ['MM/DD/YYYY', 'DD/MM/YYYY']).format('MM DD YYYY'), '11 13 1999', 'first must be month');
        test.equal(frozenMoment('01-02-2000', ['MM/DD/YYYY', 'DD/MM/YYYY']).format('MM DD YYYY'), '01 02 2000', 'either can be a month, month first format');
        test.equal(frozenMoment('02-01-2000', ['DD/MM/YYYY', 'MM/DD/YYYY']).format('MM DD YYYY'), '01 02 2000', 'either can be a month, day first format');

        test.equal(frozenMoment('11-02-10', ['MM/DD/YY', 'YY MM DD', 'DD-MM-YY']).format('MM DD YYYY'), '02 11 2010', 'all unparsed substrings have influence on format penalty');
        test.equal(frozenMoment('11-02-10', ['MM-DD-YY HH:mm', 'YY MM DD']).format('MM DD YYYY'), '02 10 2011', 'prefer formats without extra tokens');
        test.equal(frozenMoment('11-02-10 junk', ['MM-DD-YY', 'YY.MM.DD junk']).format('MM DD YYYY'), '02 10 2011', 'prefer formats that dont result in extra characters');
        test.equal(frozenMoment('11-22-10', ['YY-MM-DD', 'YY-DD-MM']).format('MM DD YYYY'), '10 22 2011', 'prefer valid results');

        test.equal(frozenMoment('gibberish', ['YY-MM-DD', 'YY-DD-MM']).format('MM DD YYYY'), 'Invalid date', 'doest throw for invalid strings');
        test.equal(frozenMoment('gibberish', []).format('MM DD YYYY'), 'Invalid date', 'doest throw for an empty array');

        //https://github.com/moment/moment/issues/1143
        test.equal(frozenMoment(
          "System Administrator and Database Assistant (7/1/2011), System Administrator and Database Assistant (7/1/2011), Database Coordinator (7/1/2011), Vice President (7/1/2011), System Administrator and Database Assistant (5/31/2012), Database Coordinator (7/1/2012), System Administrator and Database Assistant (7/1/2013)",
          ["MM/DD/YYYY", "MM-DD-YYYY", "YYYY-MM-DD", "YYYY-MM-DDTHH:mm:ssZ"])
          .format('YYYY-MM-DD'), '2011-07-01', 'Works for long strings');

        test.equal(frozenMoment('11-02-10', ['MM.DD.YY', 'DD-MM-YY']).format('MM DD YYYY'), '02 11 2010', 'escape RegExp special characters on comparing');

        test.equal(frozenMoment('13-10-98', ['DD MM YY', 'DD MM YYYY'])._f, 'DD MM YY', 'use two digit year');
        test.equal(frozenMoment('13-10-1998', ['DD MM YY', 'DD MM YYYY'])._f, 'DD MM YYYY', 'use four digit year');

        test.equal(frozenMoment('01', ["MM", "DD"])._f, "MM", "Should use first valid format");

        test.done();
    },

    "string with array of formats + ISO": function (test) {
        test.equal(frozenMoment('1994', [frozenMoment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).year(), 1994, 'iso: test parse YYYY');
        test.equal(frozenMoment('17:15', [frozenMoment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).hour(), 17, 'iso: test parse HH:mm (1)');
        test.equal(frozenMoment('17:15', [frozenMoment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).minutes(), 15, 'iso: test parse HH:mm (2)');
        test.equal(frozenMoment('06', [frozenMoment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).month(), 6 - 1, 'iso: test parse MM');
        test.equal(frozenMoment('2012-06-01', [frozenMoment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).parsingFlags().iso, true, 'iso: test parse iso');
        test.equal(frozenMoment('2014-05-05', [frozenMoment.ISO_8601, 'YYYY-MM-DD']).parsingFlags().iso, true, 'iso: edge case array precedence iso');
        test.equal(frozenMoment('2014-05-05', ['YYYY-MM-DD', frozenMoment.ISO_8601]).parsingFlags().iso, false, 'iso: edge case array precedence not iso');
        test.done();
    },

    "string with format - years" : function (test) {
        test.expect(4);
        test.equal(frozenMoment('67', 'YY').format('YYYY'), '2067', '67 > 2067');
        test.equal(frozenMoment('68', 'YY').format('YYYY'), '2068', '68 > 2068');
        test.equal(frozenMoment('69', 'YY').format('YYYY'), '1969', '69 > 1969');
        test.equal(frozenMoment('70', 'YY').format('YYYY'), '1970', '70 > 1970');
        test.done();
    },

    "thaw/freeze cycle" : function (test) {
        test.expect(2);
        var frozenMomentA = frozenMoment([2011, 10, 10]),
            frozenMomentB = frozenMomentA.thaw().month(5).freeze();
        test.equal(frozenMomentA.month(), 10, "frozenMoment().thaw()...freeze() will create a clone");
        test.equal(frozenMomentB.month(), 5, "frozenMoment().thaw()...freeze() will create a clone");
        test.done();
    },

    "cloning carrying over utc mode" : function (test) {
        test.expect(8);

        test.equal(frozenMoment().thaw().local().freeze()._isUTC, false, "An explicitly local frozenMoment should have _isUTC == false");
        test.equal(frozenMoment().thaw().utc().freeze()._isUTC, true, "An explicitly utc frozenMoment should have _isUTC == true");
        test.equal(frozenMoment().thaw().freeze()._isUTC, false, "A default frozenMoment should have _isUTC == false");
        test.equal(frozenMoment.utc()._isUTC, true, "An explicitly utc frozenMoment should have _isUTC == true");
        test.equal(frozenMoment(frozenMoment().thaw().local().freeze())._isUTC, false, "A 'cloned' local frozenMoment should have _isUTC == false");
        test.equal(frozenMoment(frozenMoment().thaw().utc().freeze())._isUTC, true, "A 'cloned' utc frozenMoment should have _isUTC == true");
        test.equal(frozenMoment(frozenMoment())._isUTC, false, "A 'cloned' default frozenMoment should have _isUTC == false");
        test.equal(frozenMoment(frozenMoment.utc())._isUTC, true, "A 'cloned' utc frozenMoment should have _isUTC == true");

        test.done();
    },

    "parsing iso" : function (test) {
        var offset = frozenMoment([2011, 9, 8]).zone(),
            pad = function (input) {
                if (input < 10) {
                    return '0' + input;
                }
                return '' + input;
            },
            hourOffset = (offset > 0) ? Math.floor(offset / 60) : Math.ceil(offset / 60),
            minOffset = offset - (hourOffset * 60),
            tz = (offset > 0) ? '-' + pad(hourOffset) + ':' + pad(minOffset) : '+' + pad(-hourOffset) + ':' + pad(-minOffset),
            tz2 = tz.replace(':', ''),
            tz3 = tz2.slice(0, 3),
            formats = [
                ['2011-10-08',                    '2011-10-08T00:00:00.000' + tz],
                ['2011-10-08T18',                 '2011-10-08T18:00:00.000' + tz],
                ['2011-10-08T18:04',              '2011-10-08T18:04:00.000' + tz],
                ['2011-10-08T18:04:20',           '2011-10-08T18:04:20.000' + tz],
                ['2011-10-08T18:04' + tz,         '2011-10-08T18:04:00.000' + tz],
                ['2011-10-08T18:04:20' + tz,      '2011-10-08T18:04:20.000' + tz],
                ['2011-10-08T18:04' + tz2,        '2011-10-08T18:04:00.000' + tz],
                ['2011-10-08T18:04:20' + tz2,     '2011-10-08T18:04:20.000' + tz],
                ['2011-10-08T18:04' + tz3,        '2011-10-08T18:04:00.000' + tz],
                ['2011-10-08T18:04:20' + tz3,     '2011-10-08T18:04:20.000' + tz],
                ['2011-10-08T18:04:20.1' + tz2,   '2011-10-08T18:04:20.100' + tz],
                ['2011-10-08T18:04:20.11' + tz2,  '2011-10-08T18:04:20.110' + tz],
                ['2011-10-08T18:04:20.111' + tz2, '2011-10-08T18:04:20.111' + tz],
                ['2011-10-08 18',                 '2011-10-08T18:00:00.000' + tz],
                ['2011-10-08 18:04',              '2011-10-08T18:04:00.000' + tz],
                ['2011-10-08 18:04:20',           '2011-10-08T18:04:20.000' + tz],
                ['2011-10-08 18:04' + tz,         '2011-10-08T18:04:00.000' + tz],
                ['2011-10-08 18:04:20' + tz,      '2011-10-08T18:04:20.000' + tz],
                ['2011-10-08 18:04' + tz2,        '2011-10-08T18:04:00.000' + tz],
                ['2011-10-08 18:04:20' + tz2,     '2011-10-08T18:04:20.000' + tz],
                ['2011-10-08 18:04' + tz3,        '2011-10-08T18:04:00.000' + tz],
                ['2011-10-08 18:04:20' + tz3,     '2011-10-08T18:04:20.000' + tz],
                ['2011-10-08 18:04:20.1' + tz2,   '2011-10-08T18:04:20.100' + tz],
                ['2011-10-08 18:04:20.11' + tz2,  '2011-10-08T18:04:20.110' + tz],
                ['2011-10-08 18:04:20.111' + tz2, '2011-10-08T18:04:20.111' + tz],
                ['2011-W40',                      '2011-10-03T00:00:00.000' + tz],
                ['2011-W40-6',                    '2011-10-08T00:00:00.000' + tz],
                ['2011-W40-6T18',                 '2011-10-08T18:00:00.000' + tz],
                ['2011-W40-6T18:04',              '2011-10-08T18:04:00.000' + tz],
                ['2011-W40-6T18:04:20',           '2011-10-08T18:04:20.000' + tz],
                ['2011-W40-6T18:04' + tz,         '2011-10-08T18:04:00.000' + tz],
                ['2011-W40-6T18:04:20' + tz,      '2011-10-08T18:04:20.000' + tz],
                ['2011-W40-6T18:04' + tz2,        '2011-10-08T18:04:00.000' + tz],
                ['2011-W40-6T18:04:20' + tz2,     '2011-10-08T18:04:20.000' + tz],
                ['2011-W40-6T18:04' + tz3,        '2011-10-08T18:04:00.000' + tz],
                ['2011-W40-6T18:04:20' + tz3,     '2011-10-08T18:04:20.000' + tz],
                ['2011-W40-6T18:04:20.1' + tz2,   '2011-10-08T18:04:20.100' + tz],
                ['2011-W40-6T18:04:20.11' + tz2,  '2011-10-08T18:04:20.110' + tz],
                ['2011-W40-6T18:04:20.111' + tz2, '2011-10-08T18:04:20.111' + tz],
                ['2011-W40-6 18',                 '2011-10-08T18:00:00.000' + tz],
                ['2011-W40-6 18:04',              '2011-10-08T18:04:00.000' + tz],
                ['2011-W40-6 18:04:20',           '2011-10-08T18:04:20.000' + tz],
                ['2011-W40-6 18:04' + tz,         '2011-10-08T18:04:00.000' + tz],
                ['2011-W40-6 18:04:20' + tz,      '2011-10-08T18:04:20.000' + tz],
                ['2011-W40-6 18:04' + tz2,        '2011-10-08T18:04:00.000' + tz],
                ['2011-W40-6 18:04:20' + tz2,     '2011-10-08T18:04:20.000' + tz],
                ['2011-W40-6 18:04' + tz3,        '2011-10-08T18:04:00.000' + tz],
                ['2011-W40-6 18:04:20' + tz3,     '2011-10-08T18:04:20.000' + tz],
                ['2011-W40-6 18:04:20.1' + tz2,   '2011-10-08T18:04:20.100' + tz],
                ['2011-W40-6 18:04:20.11' + tz2,  '2011-10-08T18:04:20.110' + tz],
                ['2011-W40-6 18:04:20.111' + tz2, '2011-10-08T18:04:20.111' + tz],
                ['2011-281',                      '2011-10-08T00:00:00.000' + tz],
                ['2011-281T18',                   '2011-10-08T18:00:00.000' + tz],
                ['2011-281T18:04',                '2011-10-08T18:04:00.000' + tz],
                ['2011-281T18:04:20',             '2011-10-08T18:04:20.000' + tz],
                ['2011-281T18:04' + tz,           '2011-10-08T18:04:00.000' + tz],
                ['2011-281T18:04:20' + tz,        '2011-10-08T18:04:20.000' + tz],
                ['2011-281T18:04' + tz2,          '2011-10-08T18:04:00.000' + tz],
                ['2011-281T18:04:20' + tz2,       '2011-10-08T18:04:20.000' + tz],
                ['2011-281T18:04' + tz3,          '2011-10-08T18:04:00.000' + tz],
                ['2011-281T18:04:20' + tz3,       '2011-10-08T18:04:20.000' + tz],
                ['2011-281T18:04:20.1' + tz2,     '2011-10-08T18:04:20.100' + tz],
                ['2011-281T18:04:20.11' + tz2,    '2011-10-08T18:04:20.110' + tz],
                ['2011-281T18:04:20.111' + tz2,   '2011-10-08T18:04:20.111' + tz],
                ['2011-281 18',                   '2011-10-08T18:00:00.000' + tz],
                ['2011-281 18:04',                '2011-10-08T18:04:00.000' + tz],
                ['2011-281 18:04:20',             '2011-10-08T18:04:20.000' + tz],
                ['2011-281 18:04' + tz,           '2011-10-08T18:04:00.000' + tz],
                ['2011-281 18:04:20' + tz,        '2011-10-08T18:04:20.000' + tz],
                ['2011-281 18:04' + tz2,          '2011-10-08T18:04:00.000' + tz],
                ['2011-281 18:04:20' + tz2,       '2011-10-08T18:04:20.000' + tz],
                ['2011-281 18:04' + tz3,          '2011-10-08T18:04:00.000' + tz],
                ['2011-281 18:04:20' + tz3,       '2011-10-08T18:04:20.000' + tz],
                ['2011-281 18:04:20.1' + tz2,     '2011-10-08T18:04:20.100' + tz],
                ['2011-281 18:04:20.11' + tz2,    '2011-10-08T18:04:20.110' + tz],
                ['2011-281 18:04:20.111' + tz2,   '2011-10-08T18:04:20.111' + tz]
            ], i;
        test.expect(formats.length);
        for (i = 0; i < formats.length; i++) {
            test.equal(frozenMoment(formats[i][0]).format('YYYY-MM-DDTHH:mm:ss.SSSZ'), formats[i][1], "frozenMoment should be able to parse ISO " + formats[i][0]);
        }
        test.done();
    },

    "parsing iso week year/week/weekday" : function (test) {
        test.equal(frozenMoment.utc("2007-W01").format(), "2007-01-01T00:00:00+00:00", "2008 week 1 (1st Jan Mon)");
        test.equal(frozenMoment.utc("2008-W01").format(), "2007-12-31T00:00:00+00:00", "2008 week 1 (1st Jan Tue)");
        test.equal(frozenMoment.utc("2003-W01").format(), "2002-12-30T00:00:00+00:00", "2008 week 1 (1st Jan Wed)");
        test.equal(frozenMoment.utc("2009-W01").format(), "2008-12-29T00:00:00+00:00", "2009 week 1 (1st Jan Thu)");
        test.equal(frozenMoment.utc("2010-W01").format(), "2010-01-04T00:00:00+00:00", "2010 week 1 (1st Jan Fri)");
        test.equal(frozenMoment.utc("2011-W01").format(), "2011-01-03T00:00:00+00:00", "2011 week 1 (1st Jan Sat)");
        test.equal(frozenMoment.utc("2012-W01").format(), "2012-01-02T00:00:00+00:00", "2012 week 1 (1st Jan Sun)");
        test.done();
    },

    "parsing week year/week/weekday (dow 1, doy 4)" : function (test) {
        frozenMoment.locale("dow:1,doy:4", {week: {dow: 1, doy: 4}});

        test.equal(frozenMoment.utc("2007-01", "gggg-ww").format(), "2007-01-01T00:00:00+00:00", "2007 week 1 (1st Jan Mon)");
        test.equal(frozenMoment.utc("2008-01", "gggg-ww").format(), "2007-12-31T00:00:00+00:00", "2008 week 1 (1st Jan Tue)");
        test.equal(frozenMoment.utc("2003-01", "gggg-ww").format(), "2002-12-30T00:00:00+00:00", "2003 week 1 (1st Jan Wed)");
        test.equal(frozenMoment.utc("2009-01", "gggg-ww").format(), "2008-12-29T00:00:00+00:00", "2009 week 1 (1st Jan Thu)");
        test.equal(frozenMoment.utc("2010-01", "gggg-ww").format(), "2010-01-04T00:00:00+00:00", "2010 week 1 (1st Jan Fri)");
        test.equal(frozenMoment.utc("2011-01", "gggg-ww").format(), "2011-01-03T00:00:00+00:00", "2011 week 1 (1st Jan Sat)");
        test.equal(frozenMoment.utc("2012-01", "gggg-ww").format(), "2012-01-02T00:00:00+00:00", "2012 week 1 (1st Jan Sun)");

        frozenMoment.defineLocale("dow:1,doy:4", null);
        test.done();
    },

    "parsing week year/week/weekday (dow 1, doy 7)" : function (test) {
        frozenMoment.locale("dow:1,doy:7", {week: {dow: 1, doy: 7}});

        test.equal(frozenMoment.utc("2007-01", "gggg-ww").format(), "2007-01-01T00:00:00+00:00", "2007 week 1 (1st Jan Mon)");
        test.equal(frozenMoment.utc("2008-01", "gggg-ww").format(), "2007-12-31T00:00:00+00:00", "2008 week 1 (1st Jan Tue)");
        test.equal(frozenMoment.utc("2003-01", "gggg-ww").format(), "2002-12-30T00:00:00+00:00", "2003 week 1 (1st Jan Wed)");
        test.equal(frozenMoment.utc("2009-01", "gggg-ww").format(), "2008-12-29T00:00:00+00:00", "2009 week 1 (1st Jan Thu)");
        test.equal(frozenMoment.utc("2010-01", "gggg-ww").format(), "2009-12-28T00:00:00+00:00", "2010 week 1 (1st Jan Fri)");
        test.equal(frozenMoment.utc("2011-01", "gggg-ww").format(), "2010-12-27T00:00:00+00:00", "2011 week 1 (1st Jan Sat)");
        test.equal(frozenMoment.utc("2012-01", "gggg-ww").format(), "2011-12-26T00:00:00+00:00", "2012 week 1 (1st Jan Sun)");

        frozenMoment.defineLocale("dow:1,doy:7", null);
        test.done();
    },

    "parsing week year/week/weekday (dow 0, doy 6)" : function (test) {
        frozenMoment.locale("dow:0,doy:6", {week: {dow: 0, doy: 6}});

        test.equal(frozenMoment.utc("2007-01", "gggg-ww").format(), "2006-12-31T00:00:00+00:00", "2007 week 1 (1st Jan Mon)");
        test.equal(frozenMoment.utc("2008-01", "gggg-ww").format(), "2007-12-30T00:00:00+00:00", "2008 week 1 (1st Jan Tue)");
        test.equal(frozenMoment.utc("2003-01", "gggg-ww").format(), "2002-12-29T00:00:00+00:00", "2003 week 1 (1st Jan Wed)");
        test.equal(frozenMoment.utc("2009-01", "gggg-ww").format(), "2008-12-28T00:00:00+00:00", "2009 week 1 (1st Jan Thu)");
        test.equal(frozenMoment.utc("2010-01", "gggg-ww").format(), "2009-12-27T00:00:00+00:00", "2010 week 1 (1st Jan Fri)");
        test.equal(frozenMoment.utc("2011-01", "gggg-ww").format(), "2010-12-26T00:00:00+00:00", "2011 week 1 (1st Jan Sat)");
        test.equal(frozenMoment.utc("2012-01", "gggg-ww").format(), "2012-01-01T00:00:00+00:00", "2012 week 1 (1st Jan Sun)");

        frozenMoment.defineLocale("dow:0,doy:6", null);
        test.done();
    },

    "parsing week year/week/weekday (dow 6, doy 12)" : function (test) {
        frozenMoment.locale("dow:6,doy:12", {week: {dow: 6, doy: 12}});

        test.equal(frozenMoment.utc("2007-01", "gggg-ww").format(), "2006-12-30T00:00:00+00:00", "2007 week 1 (1st Jan Mon)");
        test.equal(frozenMoment.utc("2008-01", "gggg-ww").format(), "2007-12-29T00:00:00+00:00", "2008 week 1 (1st Jan Tue)");
        test.equal(frozenMoment.utc("2003-01", "gggg-ww").format(), "2002-12-28T00:00:00+00:00", "2003 week 1 (1st Jan Wed)");
        test.equal(frozenMoment.utc("2009-01", "gggg-ww").format(), "2008-12-27T00:00:00+00:00", "2009 week 1 (1st Jan Thu)");
        test.equal(frozenMoment.utc("2010-01", "gggg-ww").format(), "2009-12-26T00:00:00+00:00", "2010 week 1 (1st Jan Fri)");
        test.equal(frozenMoment.utc("2011-01", "gggg-ww").format(), "2011-01-01T00:00:00+00:00", "2011 week 1 (1st Jan Sat)");
        test.equal(frozenMoment.utc("2012-01", "gggg-ww").format(), "2011-12-31T00:00:00+00:00", "2012 week 1 (1st Jan Sun)");
        test.done();
    },

    "parsing ISO with Z" : function (test) {
        var i, mom, formats = [
            ['2011-10-08T18:04',             '2011-10-08T18:04:00.000'],
            ['2011-10-08T18:04:20',          '2011-10-08T18:04:20.000'],
            ['2011-10-08T18:04:20.1',        '2011-10-08T18:04:20.100'],
            ['2011-10-08T18:04:20.11',       '2011-10-08T18:04:20.110'],
            ['2011-10-08T18:04:20.111',      '2011-10-08T18:04:20.111'],
            ['2011-W40-6T18',                '2011-10-08T18:00:00.000'],
            ['2011-W40-6T18:04',             '2011-10-08T18:04:00.000'],
            ['2011-W40-6T18:04:20',          '2011-10-08T18:04:20.000'],
            ['2011-W40-6T18:04:20.1',        '2011-10-08T18:04:20.100'],
            ['2011-W40-6T18:04:20.11',       '2011-10-08T18:04:20.110'],
            ['2011-W40-6T18:04:20.111',      '2011-10-08T18:04:20.111'],
            ['2011-281T18',                  '2011-10-08T18:00:00.000'],
            ['2011-281T18:04',               '2011-10-08T18:04:00.000'],
            ['2011-281T18:04:20',            '2011-10-08T18:04:20.000'],
            ['2011-281T18:04:20',            '2011-10-08T18:04:20.000'],
            ['2011-281T18:04:20.1',          '2011-10-08T18:04:20.100'],
            ['2011-281T18:04:20.11',         '2011-10-08T18:04:20.110'],
            ['2011-281T18:04:20.111',        '2011-10-08T18:04:20.111']
        ];

        for (i = 0; i < formats.length; i++) {
            mom = frozenMoment(formats[i][0] + 'Z').thaw().utc().freeze();
            test.equal(mom.format('YYYY-MM-DDTHH:mm:ss.SSS'), formats[i][1], "frozenMoment should be able to parse ISO in UTC " + formats[i][0] + 'Z');

            mom = frozenMoment(formats[i][0] + ' Z').thaw().utc().freeze();
            test.equal(mom.format('YYYY-MM-DDTHH:mm:ss.SSS'), formats[i][1], "frozenMoment should be able to parse ISO in UTC " + formats[i][0] + ' Z');
        }
        test.done();
    },

    "parsing iso with T" : function (test) {
        test.expect(8);

        test.equal(frozenMoment('2011-10-08T18')._f, "YYYY-MM-DDTHH", "should include 'T' in the format");
        test.equal(frozenMoment('2011-10-08T18:20')._f, "YYYY-MM-DDTHH:mm", "should include 'T' in the format");
        test.equal(frozenMoment('2011-10-08T18:20:13')._f, "YYYY-MM-DDTHH:mm:ss", "should include 'T' in the format");
        test.equal(frozenMoment('2011-10-08T18:20:13.321')._f, "YYYY-MM-DDTHH:mm:ss.SSSS", "should include 'T' in the format");

        test.equal(frozenMoment('2011-10-08 18')._f, "YYYY-MM-DD HH", "should not include 'T' in the format");
        test.equal(frozenMoment('2011-10-08 18:20')._f, "YYYY-MM-DD HH:mm", "should not include 'T' in the format");
        test.equal(frozenMoment('2011-10-08 18:20:13')._f, "YYYY-MM-DD HH:mm:ss", "should not include 'T' in the format");
        test.equal(frozenMoment('2011-10-08 18:20:13.321')._f, "YYYY-MM-DD HH:mm:ss.SSSS", "should not include 'T' in the format");

        test.done();
    },

    "parsing iso Z timezone" : function (test) {
        var i,
            formats = [
                ['2011-10-08T18:04Z',             '2011-10-08T18:04:00.000+00:00'],
                ['2011-10-08T18:04:20Z',          '2011-10-08T18:04:20.000+00:00'],
                ['2011-10-08T18:04:20.111Z',      '2011-10-08T18:04:20.111+00:00']
            ];
        test.expect(formats.length);
        for (i = 0; i < formats.length; i++) {
            test.equal(frozenMoment.utc(formats[i][0]).format('YYYY-MM-DDTHH:mm:ss.SSSZ'), formats[i][1], "frozenMoment should be able to parse ISO " + formats[i][0]);
        }
        test.done();
    },

    "parsing iso Z timezone into local" : function (test) {
        test.expect(1);

        var m = frozenMoment('2011-10-08T18:04:20.111Z');

        test.equal(m.thaw().utc().freeze().format('YYYY-MM-DDTHH:mm:ss.SSS'),
                '2011-10-08T18:04:20.111',
                'frozenMoment should be able to parse ISO 2011-10-08T18:04:20.111Z');

        test.done();
    },

    "parsing iso with more subsecond precision digits" : function (test) {
        test.equal(frozenMoment.utc("2013-07-31T22:00:00.0000000Z").format(),
                "2013-07-31T22:00:00+00:00", "more than 3 subsecond digits");
        test.done();
    },

    "null or empty" : function (test) {
        test.expect(8);
        test.equal(frozenMoment('').isValid(), false, "frozenMoment('') is not valid");
        test.equal(frozenMoment(null).isValid(), false, "frozenMoment(null) is not valid");
        test.equal(frozenMoment(null, 'YYYY-MM-DD').isValid(), false, "frozenMoment('', 'format') is not valid");
        test.equal(frozenMoment('', 'YYYY-MM-DD').isValid(), false, "frozenMoment('', 'format') is not valid");
        test.equal(frozenMoment.utc('').isValid(), false, "frozenMoment.utc('') is not valid");
        test.equal(frozenMoment.utc(null).isValid(), false, "frozenMoment.utc(null) is not valid");
        test.equal(frozenMoment.utc(null, 'YYYY-MM-DD').isValid(), false, "frozenMoment.utc(null) is not valid");
        test.equal(frozenMoment.utc('', 'YYYY-MM-DD').isValid(), false, "frozenMoment.utc('', 'YYYY-MM-DD') is not valid");
        test.done();
    },

    "first century" : function (test) {
        test.expect(9);
        test.equal(frozenMoment([0, 0, 1]).format("YYYY-MM-DD"), "0000-01-01", "Year AD 0");
        test.equal(frozenMoment([99, 0, 1]).format("YYYY-MM-DD"), "0099-01-01", "Year AD 99");
        test.equal(frozenMoment([999, 0, 1]).format("YYYY-MM-DD"), "0999-01-01", "Year AD 999");
        test.equal(frozenMoment('0 1 1', 'YYYY MM DD').format("YYYY-MM-DD"), "0000-01-01", "Year AD 0");
        test.equal(frozenMoment('99 1 1', 'YYYY MM DD').format("YYYY-MM-DD"), "0099-01-01", "Year AD 99");
        test.equal(frozenMoment('999 1 1', 'YYYY MM DD').format("YYYY-MM-DD"), "0999-01-01", "Year AD 999");
        test.equal(frozenMoment('0 1 1', 'YYYYY MM DD').format("YYYYY-MM-DD"), "00000-01-01", "Year AD 0");
        test.equal(frozenMoment('99 1 1', 'YYYYY MM DD').format("YYYYY-MM-DD"), "00099-01-01", "Year AD 99");
        test.equal(frozenMoment('999 1 1', 'YYYYY MM DD').format("YYYYY-MM-DD"), "00999-01-01", "Year AD 999");
        test.done();
    },

    "six digit years" : function (test) {
        test.expect(8);
        test.equal(frozenMoment([-270000, 0, 1]).format("YYYYY-MM-DD"), "-270000-01-01", "format BC 270,001");
        test.equal(frozenMoment([270000, 0, 1]).format("YYYYY-MM-DD"), "270000-01-01", "format AD 270,000");
        test.equal(frozenMoment("-270000-01-01", "YYYYY-MM-DD").toDate().getFullYear(), -270000, "parse BC 270,001");
        test.equal(frozenMoment("270000-01-01",  "YYYYY-MM-DD").toDate().getFullYear(), 270000, "parse AD 270,000");
        test.equal(frozenMoment("+270000-01-01", "YYYYY-MM-DD").toDate().getFullYear(), 270000, "parse AD +270,000");
        test.equal(frozenMoment.utc("-270000-01-01", "YYYYY-MM-DD").toDate().getUTCFullYear(), -270000, "parse utc BC 270,001");
        test.equal(frozenMoment.utc("270000-01-01",  "YYYYY-MM-DD").toDate().getUTCFullYear(), 270000, "parse utc AD 270,000");
        test.equal(frozenMoment.utc("+270000-01-01", "YYYYY-MM-DD").toDate().getUTCFullYear(), 270000, "parse utc AD +270,000");
        test.done();
    },

    "negative four digit years" : function (test) {
        test.expect(2);
        test.equal(frozenMoment("-1000-01-01", "YYYYY-MM-DD").toDate().getFullYear(), -1000, "parse BC 1,001");
        test.equal(frozenMoment.utc("-1000-01-01", "YYYYY-MM-DD").toDate().getUTCFullYear(), -1000, "parse utc BC 1,001");
        test.done();
    },

    "strict parsing" : function (test) {
        test.equal(frozenMoment("2014-", "YYYY-Q", true).isValid(), false, "fail missing quarter");

        test.equal(frozenMoment("2012-05", "YYYY-MM", true).format("YYYY-MM"), "2012-05", "parse correct string");
        test.equal(frozenMoment(" 2012-05", "YYYY-MM", true).isValid(), false, "fail on extra whitespace");
        test.equal(frozenMoment("foo 2012-05", "[foo] YYYY-MM", true).format('YYYY-MM'), "2012-05", "handle fixed text");
        test.equal(frozenMoment("2012 05", "YYYY-MM", true).isValid(), false, "fail on different separator");
        test.equal(frozenMoment("2012 05", "YYYY MM DD", true).isValid(), false, "fail on too many tokens");

        test.equal(frozenMoment("05 30 2010", ["DD MM YYYY", "MM DD YYYY"], true).format("MM DD YYYY"), "05 30 2010", "array with bad date");
        test.equal(frozenMoment("05 30 2010", ["", "MM DD YYYY"], true).format("MM DD YYYY"), "05 30 2010", "array with invalid format");
        test.equal(frozenMoment("05 30 2010", [" DD MM YYYY", "MM DD YYYY"], true).format("MM DD YYYY"), "05 30 2010", "array with non-matching format");

        test.equal(frozenMoment("2010.*...", "YYYY.*", true).isValid(), false, "invalid format with regex chars");
        test.equal(frozenMoment("2010.*", "YYYY.*", true).year(), 2010, "valid format with regex chars");
        test.equal(frozenMoment(".*2010.*", ".*YYYY.*", true).year(), 2010, "valid format with regex chars on both sides");

        //strict tokens
        test.equal(frozenMoment("-5-05-25", 'YYYY-MM-DD', true).isValid(), false, "invalid negative year");
        test.equal(frozenMoment("2-05-25", 'YYYY-MM-DD', true).isValid(), false, "invalid one-digit year");
        test.equal(frozenMoment("20-05-25", 'YYYY-MM-DD', true).isValid(), false, "invalid two-digit year");
        test.equal(frozenMoment("201-05-25", 'YYYY-MM-DD', true).isValid(), false, "invalid three-digit year");
        test.equal(frozenMoment("2010-05-25", 'YYYY-MM-DD', true).isValid(), true, "valid four-digit year");
        test.equal(frozenMoment("22010-05-25", 'YYYY-MM-DD', true).isValid(), false, "invalid five-digit year");

        test.equal(frozenMoment("12-05-25", 'YY-MM-DD', true).isValid(), true, "valid two-digit year");
        test.equal(frozenMoment("2012-05-25", 'YY-MM-DD', true).isValid(), false, "invalid four-digit year");

        test.equal(frozenMoment("-5-05-25", 'Y-MM-DD', true).isValid(), true, "valid negative year");
        test.equal(frozenMoment("2-05-25", 'Y-MM-DD', true).isValid(), true, "valid one-digit year");
        test.equal(frozenMoment("20-05-25", 'Y-MM-DD', true).isValid(), true, "valid two-digit year");
        test.equal(frozenMoment("201-05-25", 'Y-MM-DD', true).isValid(), true, "valid three-digit year");

        test.equal(frozenMoment("2012-5-25", 'YYYY-M-DD', true).isValid(), true, "valid one-digit month");
        test.equal(frozenMoment("2012-5-25", 'YYYY-MM-DD', true).isValid(), false, "invalid one-digit month");
        test.equal(frozenMoment("2012-05-25", 'YYYY-M-DD', true).isValid(), true, "valid one-digit month");
        test.equal(frozenMoment("2012-05-25", 'YYYY-MM-DD', true).isValid(), true, "valid one-digit month");

        test.equal(frozenMoment("2012-05-2", 'YYYY-MM-D', true).isValid(), true, "valid one-digit day");
        test.equal(frozenMoment("2012-05-2", 'YYYY-MM-DD', true).isValid(), false, "invalid one-digit day");
        test.equal(frozenMoment("2012-05-02", 'YYYY-MM-D', true).isValid(), true, "valid two-digit day");
        test.equal(frozenMoment("2012-05-02", 'YYYY-MM-DD', true).isValid(), true, "valid two-digit day");

        test.equal(frozenMoment("+002012-05-25", 'YYYYY-MM-DD', true).isValid(), true, "valid six-digit year");
        test.equal(frozenMoment("+2012-05-25", 'YYYYY-MM-DD', true).isValid(), false, "invalid four-digit year");

        //thse are kinda pointless, but they should work as expected
        test.equal(frozenMoment("1", 'S', true).isValid(), true, "valid one-digit milisecond");
        test.equal(frozenMoment("12", 'S', true).isValid(), false, "invalid two-digit milisecond");
        test.equal(frozenMoment("123", 'S', true).isValid(), false, "invalid three-digit milisecond");

        test.equal(frozenMoment("1", 'SS', true).isValid(), false, "invalid one-digit milisecond");
        test.equal(frozenMoment("12", 'SS', true).isValid(), true, "valid two-digit milisecond");
        test.equal(frozenMoment("123", 'SS', true).isValid(), false, "invalid three-digit milisecond");

        test.equal(frozenMoment("1", 'SSS', true).isValid(), false, "invalid one-digit milisecond");
        test.equal(frozenMoment("12", 'SSS', true).isValid(), false, "invalid two-digit milisecond");
        test.equal(frozenMoment("123", 'SSS', true).isValid(), true, "valid three-digit milisecond");

        test.done();
    },

    "parsing into a locale" : function (test) {
        test.expect(2);

        frozenMoment.defineLocale('parselocale', {
            months : "one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve".split('_'),
            monthsShort : "one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve".split("_")
        });

        frozenMoment.locale('en');

        test.equal(frozenMoment('2012 seven', 'YYYY MMM', 'parselocale').month(), 6, "should be able to parse in a specific locale");

        frozenMoment.locale('parselocale');

        test.equal(frozenMoment('2012 july', 'YYYY MMM', 'en').month(), 6, "should be able to parse in a specific locale");

        frozenMoment.defineLocale('parselocale', null);
        test.done();
    },

    "parsing week and weekday information" : function (test) {
        var ver = getVerifier(test);

        // year
        ver('12', 'gg', "2012 01 01", 'week-year two digits');
        ver('2012', 'gggg', "2012 01 01", 'week-year four digits');

        ver('99', 'gg', "1998 12 27", 'week-year two digits previous year');
        ver('1999', 'gggg', "1998 12 27", 'week-year four digits previous year');

        ver('99', 'GG', "1999 01 04", 'iso week-year two digits');
        ver('1999', 'GGGG', "1999 01 04", 'iso week-year four digits');

        ver('13', 'GG', "2012 12 31", 'iso week-year two digits previous year');
        ver('2013', 'GGGG', "2012 12 31", 'iso week-year four digits previous year');

        // year + week
        ver('1999 37', 'gggg w', "1999 09 05", 'week');
        ver('1999 37', 'gggg ww', "1999 09 05", 'week double');
        ver('1999 37', 'GGGG W', "1999 09 13", 'iso week');
        ver('1999 37', 'GGGG WW', "1999 09 13", 'iso week double');

        ver('1999 37 4', 'GGGG WW E', "1999 09 16", 'iso day');
        ver('1999 37 04', 'GGGG WW E', "1999 09 16", 'iso day wide', true);

        ver('1999 37 4', 'gggg ww e', "1999 09 09", 'day');
        ver('1999 37 04', 'gggg ww e', "1999 09 09", 'day wide', true);

        // year + week + day
        ver('1999 37 4', 'gggg ww d', "1999 09 09", 'd');
        ver('1999 37 Th', 'gggg ww dd', "1999 09 09", 'dd');
        ver('1999 37 Thu', 'gggg ww ddd', "1999 09 09", 'ddd');
        ver('1999 37 Thursday', 'gggg ww dddd', "1999 09 09", 'dddd');

        // lower-order only
        test.equal(frozenMoment('22', 'ww').week(), 22, "week sets the week by itself");
        test.equal(frozenMoment('22', 'ww').weekYear(), frozenMoment().weekYear(), "week keeps this year");
        test.equal(frozenMoment('2012 22', 'YYYY ww').weekYear(), 2012, "week keeps parsed year");

        test.equal(frozenMoment('22', 'WW').isoWeek(), 22, "iso week sets the week by itself");
        test.equal(frozenMoment('2012 22', 'YYYY WW').weekYear(), 2012, "iso week keeps parsed year");
        test.equal(frozenMoment('22', 'WW').weekYear(), frozenMoment().weekYear(), "iso week keeps this year");

        // order
        ver('6 2013 2', 'e gggg w', "2013 01 12", "order doesn't matter");
        ver('6 2013 2', 'E GGGG W', "2013 01 12", "iso order doesn't matter");

        //can parse other stuff too
        test.equal(frozenMoment('1999-W37-4 3:30', 'GGGG-[W]WW-E HH:mm').format('YYYY MM DD HH:mm'), '1999 09 16 03:30', "parsing weeks and hours");

        // In safari, all years before 1300 are shifted back with one day.
        // http://stackoverflow.com/questions/20768975/safari-subtracts-1-day-from-dates-before-1300
        if (new Date("1300-01-01").getUTCFullYear() === 1300) {
            // Years less than 100
            ver('0098-06', 'GGGG-WW', "0098 02 03", "small years work", true);
        }

        test.done();
    },

    'parsing localized weekdays' : function (test) {
        var ver = getVerifier(test);
        try {
            frozenMoment.locale('fr'); //french uses doy = 4, dow = 1
            ver('1999 37 4', 'GGGG WW E', "1999 09 16", 'iso ignores locale');
            ver('1999 37 7', 'GGGG WW E', "1999 09 19", 'iso ignores locale');

            ver('1999 37 0', 'gggg ww e', "1999 09 13", 'localized e uses local doy and dow: 0 = monday');
            ver('1999 37 4', 'gggg ww e', "1999 09 17", 'localized e uses local doy and dow: 4 = friday');

            ver('1999 37 1', 'gggg ww d', "1999 09 13", 'localized d uses 0-indexed days: 1 = monday');
            ver('1999 37 Lu', 'gggg ww dd', "1999 09 13", 'localized d uses 0-indexed days: Mo');
            ver('1999 37 lun.', 'gggg ww ddd', "1999 09 13", 'localized d uses 0-indexed days: Mon');
            ver('1999 37 lundi', 'gggg ww dddd', "1999 09 13", 'localized d uses 0-indexed days: Monday');
            ver('1999 37 4', 'gggg ww d', "1999 09 16", 'localized d uses 0-indexed days: 4');

            //sunday goes at the end of the week
            ver('1999 37 0', 'gggg ww d', "1999 09 19", 'localized d uses 0-indexed days: 0 = sund');
            ver('1999 37 Di', 'gggg ww dd', "1999 09 19", 'localized d uses 0-indexed days: 0 = sund');
        }
        finally {
            frozenMoment.locale('en');
            test.done();
        }
    },

    'parsing with customized two-digit year' : function (test) {
        var original = frozenMoment.parseTwoDigitYear;
        try {
            test.equal(frozenMoment('68', 'YY').year(), 2068);
            test.equal(frozenMoment('69', 'YY').year(), 1969);
            frozenMoment.parseTwoDigitYear = function (input) {
                return +input + (+input > 30 ? 1900 : 2000);
            };
            test.equal(frozenMoment('68', 'YY').year(), 1968);
            test.equal(frozenMoment('67', 'YY').year(), 1967);
            test.equal(frozenMoment('31', 'YY').year(), 1931);
            test.equal(frozenMoment('30', 'YY').year(), 2030);
        }
        finally {
            frozenMoment.parseTwoDigitYear = original;
            test.done();
        }
    }
};

var frozenMoment = require("../../frozen-moment");

exports.daysInMonth = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "days in month" : function (test) {
        test.expect(24);
        var months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], i;
        for (i = 0; i < 12; i++) {
            test.equal(frozenMoment([2012, i]).daysInMonth(),
                       months[i],
                       frozenMoment([2012, i]).format('L') + " should have " + months[i] + " days. (beginning of month " + i + ')');
        }
        for (i = 0; i < 12; i++) {
            test.equal(frozenMoment([2012, i, months[i]]).daysInMonth(),
                       months[i],
                       frozenMoment([2012, i, months[i]]).format('L') + " should have " + months[i] + " days. (end of month " + i + ')');
        }
        test.done();
    },

    "days in month leap years" : function (test) {
        test.expect(4);
        test.equal(frozenMoment([2010, 1]).daysInMonth(), 28, "Feb 2010 should have 28 days");
        test.equal(frozenMoment([2100, 1]).daysInMonth(), 28, "Feb 2100 should have 28 days");
        test.equal(frozenMoment([2008, 1]).daysInMonth(), 29, "Feb 2008 should have 29 days");
        test.equal(frozenMoment([2000, 1]).daysInMonth(), 29, "Feb 2000 should have 29 days");
        test.done();
    }
};

var frozenMoment = require("../../frozen-moment");

function equal(test, a, b, message) {
    test.ok(Math.abs(a - b) < 0.00000001, "(" + a + " === " + b + ") " + message);
}

function dstForYear(year) {
    var start = frozenMoment([year]),
        end = frozenMoment([year + 1]),
        current = start,
        last;

    while (current < end) {
        last = current;
        current = current.thaw().add(24, 'hour').freeze();
        if (last.zone() !== current.zone()) {
            end = current;
            current = last;
            break;
        }
    }

    while (current < end) {
        last = current;
        current = current.thaw().add(1, 'hour').freeze();
        if (last.zone() !== current.zone()) {
            return {
                frozenMoment : last,
                diff : (current.zone() - last.zone()) / 60
            };
        }
    }
}

exports.diff = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "diff" : function (test) {
        test.expect(5);

        test.equal(frozenMoment(1000).diff(0), 1000, "1 second - 0 = 1000");
        test.equal(frozenMoment(1000).diff(500), 500, "1 second - 0.5 seconds = 500");
        test.equal(frozenMoment(0).diff(1000), -1000, "0 - 1 second = -1000");
        test.equal(frozenMoment(new Date(1000)).diff(1000), 0, "1 second - 1 second = 0");
        var oneHourDate = new Date(),
            nowDate = new Date(+oneHourDate);
        oneHourDate.setHours(oneHourDate.getHours() + 1);
        test.equal(frozenMoment(oneHourDate).diff(nowDate), 60 * 60 * 1000, "1 hour from now = 3600000");
        test.done();
    },

    "diff key after" : function (test) {
        test.expect(10);

        test.equal(frozenMoment([2010]).diff([2011], 'years'), -1, "year diff");
        test.equal(frozenMoment([2010]).diff([2010, 2], 'months'), -2, "month diff");
        test.equal(frozenMoment([2010]).diff([2010, 0, 7], 'weeks'), 0, "week diff");
        test.equal(frozenMoment([2010]).diff([2010, 0, 8], 'weeks'), -1, "week diff");
        test.equal(frozenMoment([2010]).diff([2010, 0, 21], 'weeks'), -2, "week diff");
        test.equal(frozenMoment([2010]).diff([2010, 0, 22], 'weeks'), -3, "week diff");
        test.equal(frozenMoment([2010]).diff([2010, 0, 4], 'days'), -3, "day diff");
        test.equal(frozenMoment([2010]).diff([2010, 0, 1, 4], 'hours'), -4, "hour diff");
        test.equal(frozenMoment([2010]).diff([2010, 0, 1, 0, 5], 'minutes'), -5, "minute diff");
        test.equal(frozenMoment([2010]).diff([2010, 0, 1, 0, 0, 6], 'seconds'), -6, "second diff");
        test.done();
    },

    "diff key before" : function (test) {
        test.expect(10);

        test.equal(frozenMoment([2011]).diff([2010], 'years'), 1, "year diff");
        test.equal(frozenMoment([2010, 2]).diff([2010], 'months'), 2, "month diff");
        test.equal(frozenMoment([2010, 0, 4]).diff([2010], 'days'), 3, "day diff");
        test.equal(frozenMoment([2010, 0, 7]).diff([2010], 'weeks'), 0, "week diff");
        test.equal(frozenMoment([2010, 0, 8]).diff([2010], 'weeks'), 1, "week diff");
        test.equal(frozenMoment([2010, 0, 21]).diff([2010], 'weeks'), 2, "week diff");
        test.equal(frozenMoment([2010, 0, 22]).diff([2010], 'weeks'), 3, "week diff");
        test.equal(frozenMoment([2010, 0, 1, 4]).diff([2010], 'hours'), 4, "hour diff");
        test.equal(frozenMoment([2010, 0, 1, 0, 5]).diff([2010], 'minutes'), 5, "minute diff");
        test.equal(frozenMoment([2010, 0, 1, 0, 0, 6]).diff([2010], 'seconds'), 6, "second diff");
        test.done();
    },

    "diff key before singular" : function (test) {
        test.expect(10);

        test.equal(frozenMoment([2011]).diff([2010], 'year'), 1, "year diff singular");
        test.equal(frozenMoment([2010, 2]).diff([2010], 'month'), 2, "month diff singular");
        test.equal(frozenMoment([2010, 0, 4]).diff([2010], 'day'), 3, "day diff singular");
        test.equal(frozenMoment([2010, 0, 7]).diff([2010], 'week'), 0, "week diff singular");
        test.equal(frozenMoment([2010, 0, 8]).diff([2010], 'week'), 1, "week diff singular");
        test.equal(frozenMoment([2010, 0, 21]).diff([2010], 'week'), 2, "week diff singular");
        test.equal(frozenMoment([2010, 0, 22]).diff([2010], 'week'), 3, "week diff singular");
        test.equal(frozenMoment([2010, 0, 1, 4]).diff([2010], 'hour'), 4, "hour diff singular");
        test.equal(frozenMoment([2010, 0, 1, 0, 5]).diff([2010], 'minute'), 5, "minute diff singular");
        test.equal(frozenMoment([2010, 0, 1, 0, 0, 6]).diff([2010], 'second'), 6, "second diff singular");
        test.done();
    },

    "diff key before abbreviated" : function (test) {
        test.expect(10);

        test.equal(frozenMoment([2011]).diff([2010], 'y'), 1, "year diff abbreviated");
        test.equal(frozenMoment([2010, 2]).diff([2010], 'M'), 2, "month diff abbreviated");
        test.equal(frozenMoment([2010, 0, 4]).diff([2010], 'd'), 3, "day diff abbreviated");
        test.equal(frozenMoment([2010, 0, 7]).diff([2010], 'w'), 0, "week diff abbreviated");
        test.equal(frozenMoment([2010, 0, 8]).diff([2010], 'w'), 1, "week diff abbreviated");
        test.equal(frozenMoment([2010, 0, 21]).diff([2010], 'w'), 2, "week diff abbreviated");
        test.equal(frozenMoment([2010, 0, 22]).diff([2010], 'w'), 3, "week diff abbreviated");
        test.equal(frozenMoment([2010, 0, 1, 4]).diff([2010], 'h'), 4, "hour diff abbreviated");
        test.equal(frozenMoment([2010, 0, 1, 0, 5]).diff([2010], 'm'), 5, "minute diff abbreviated");
        test.equal(frozenMoment([2010, 0, 1, 0, 0, 6]).diff([2010], 's'), 6, "second diff abbreviated");
        test.done();
    },

    "diff month" : function (test) {
        test.expect(1);

        test.equal(frozenMoment([2011, 0, 31]).diff([2011, 2, 1], 'months'), -1, "month diff");
        test.done();
    },

    "diff across DST" : function (test) {
        var dst = dstForYear(2012), a, b, daysInMonth;
        if (!dst) {
            test.done();
            return;
        }

        test.expect(16);

        a = dst.frozenMoment;
        b = a.thaw().utc().add(12, 'hours').local().freeze();
        daysInMonth = (a.daysInMonth() + b.daysInMonth()) / 2;
        equal(test, b.diff(a, 'ms', true), 12 * 60 * 60 * 1000,                         "ms diff across DST");
        equal(test, b.diff(a, 's', true),  12 * 60 * 60,                                "second diff across DST");
        equal(test, b.diff(a, 'm', true),  12 * 60,                                     "minute diff across DST");
        equal(test, b.diff(a, 'h', true),  12,                                          "hour diff across DST");
        equal(test, b.diff(a, 'd', true),  (12 - dst.diff) / 24,                        "day diff across DST");
        equal(test, b.diff(a, 'w', true),  (12 - dst.diff) / 24 / 7,                    "week diff across DST");
        equal(test, b.diff(a, 'M', true),  (12 - dst.diff) / 24 / daysInMonth,          "month diff across DST");
        equal(test, b.diff(a, 'y', true),  (12 - dst.diff) / 24 / daysInMonth / 12,     "year diff across DST");


        a = dst.frozenMoment;
        b = a.thaw().utc().add(12 + dst.diff, 'hours').local().freeze();
        daysInMonth = (a.daysInMonth() + b.daysInMonth()) / 2;

        equal(test, b.diff(a, 'ms', true), (12 + dst.diff) * 60 * 60 * 1000,   "ms diff across DST");
        equal(test, b.diff(a, 's', true),  (12 + dst.diff) * 60 * 60,          "second diff across DST");
        equal(test, b.diff(a, 'm', true),  (12 + dst.diff) * 60,               "minute diff across DST");
        equal(test, b.diff(a, 'h', true),  (12 + dst.diff),                    "hour diff across DST");
        equal(test, b.diff(a, 'd', true),  12 / 24,                            "day diff across DST");
        equal(test, b.diff(a, 'w', true),  12 / 24 / 7,                        "week diff across DST");
        equal(test, b.diff(a, 'M', true),  12 / 24 / daysInMonth,              "month diff across DST");
        equal(test, b.diff(a, 'y', true),  12 / 24 / daysInMonth / 12,         "year diff across DST");

        test.done();
    },

    "diff overflow" : function (test) {
        test.expect(4);

        test.equal(frozenMoment([2011]).diff([2010], 'months'), 12, "month diff");
        test.equal(frozenMoment([2010, 0, 2]).diff([2010], 'hours'), 24, "hour diff");
        test.equal(frozenMoment([2010, 0, 1, 2]).diff([2010], 'minutes'), 120, "minute diff");
        test.equal(frozenMoment([2010, 0, 1, 0, 4]).diff([2010], 'seconds'), 240, "second diff");
        test.done();
    },

    "diff between utc and local" : function (test) {
        if (frozenMoment([2012]).zone() === frozenMoment([2011]).zone()) {
            // Russia's zone offset on 1st of Jan 2012 vs 2011 is different
            test.equal(frozenMoment([2012]).thaw().utc().freeze().diff([2011], 'years'), 1, "year diff");
        }
        test.equal(frozenMoment([2010, 2, 2]).thaw().utc().freeze().diff([2010, 0, 2], 'months'), 2, "month diff");
        test.equal(frozenMoment([2010, 0, 4]).thaw().utc().freeze().diff([2010], 'days'), 3, "day diff");
        test.equal(frozenMoment([2010, 0, 22]).thaw().utc().freeze().diff([2010], 'weeks'), 3, "week diff");
        test.equal(frozenMoment([2010, 0, 1, 4]).thaw().utc().freeze().diff([2010], 'hours'), 4, "hour diff");
        test.equal(frozenMoment([2010, 0, 1, 0, 5]).thaw().utc().freeze().diff([2010], 'minutes'), 5, "minute diff");
        test.equal(frozenMoment([2010, 0, 1, 0, 0, 6]).thaw().utc().freeze().diff([2010], 'seconds'), 6, "second diff");

        test.done();
    },

    "diff floored" : function (test) {
        test.expect(7);

        test.equal(frozenMoment([2010, 0, 1, 23]).diff([2010], 'day'), 0, "23 hours = 0 days");
        test.equal(frozenMoment([2010, 0, 1, 23, 59]).diff([2010], 'day'), 0, "23:59 hours = 0 days");
        test.equal(frozenMoment([2010, 0, 1, 24]).diff([2010], 'day'), 1, "24 hours = 1 day");
        test.equal(frozenMoment([2010, 0, 2]).diff([2011, 0, 1], 'year'), 0, "year rounded down");
        test.equal(frozenMoment([2011, 0, 1]).diff([2010, 0, 2], 'year'), 0, "year rounded down");
        test.equal(frozenMoment([2010, 0, 2]).diff([2011, 0, 2], 'year'), -1, "year rounded down");
        test.equal(frozenMoment([2011, 0, 2]).diff([2010, 0, 2], 'year'), 1, "year rounded down");

        test.done();
    },

    "year diffs include dates" : function (test) {
        test.expect(1);

        test.ok(frozenMoment([2012, 1, 19]).diff(frozenMoment([2002, 1, 20]), 'years', true) < 10, "year diff should include date of month");

        test.done();
    },

    "month diffs" : function (test) {
        test.expect(8);

        // due to floating point math errors, these tests just need to be accurate within 0.00000001
        equal(test, frozenMoment([2012, 0, 1]).diff([2012, 1, 1], 'months', true), -1, 'Jan 1 to Feb 1 should be 1 month');
        equal(test, frozenMoment([2012, 0, 1]).diff([2012, 0, 1, 12], 'months', true), -0.5 / 31, 'Jan 1 to Jan 1 noon should be 0.5 / 31 months');
        equal(test, frozenMoment([2012, 0, 15]).diff([2012, 1, 15], 'months', true), -1, 'Jan 15 to Feb 15 should be 1 month');
        equal(test, frozenMoment([2012, 0, 28]).diff([2012, 1, 28], 'months', true), -1, 'Jan 28 to Feb 28 should be 1 month');
        equal(test, frozenMoment([2012, 0, 31]).diff([2012, 1, 29], 'months', true), -1 + (2 / 30), 'Jan 31 to Feb 29 should be 1 - (2 / 30) months');
        equal(test, frozenMoment([2012, 0, 31]).diff([2012, 2, 1], 'months', true), -2 + (30 / 31), 'Jan 31 to Mar 1 should be 2 - (30 / 31) months');
        equal(test, frozenMoment([2012, 0, 31]).diff([2012, 2, 1, 12], 'months', true), -2 + (29.5 / 31), 'Jan 31 to Mar 1 should be 2 - (29.5 / 31) months');
        equal(test, frozenMoment([2012, 0, 1]).diff([2012, 0, 31], 'months', true), -(30 / 31), 'Jan 1 to Jan 31 should be 30 / 31 months');

        test.done();
    },

    "year diffs" : function (test) {
        test.expect(10);

        // due to floating point math errors, these tests just need to be accurate within 0.00000001
        equal(test, frozenMoment([2012, 0, 1]).diff([2013, 0, 1], 'years', true), -1, 'Jan 1 2012 to Jan 1 2013 should be 1 year');
        equal(test, frozenMoment([2012, 1, 28]).diff([2013, 1, 28], 'years', true), -1, 'Feb 28 2012 to Feb 28 2013 should be 1 year');
        equal(test, frozenMoment([2012, 2, 1]).diff([2013, 2, 1], 'years', true), -1, 'Mar 1 2012 to Mar 1 2013 should be 1 year');
        equal(test, frozenMoment([2012, 11, 1]).diff([2013, 11, 1], 'years', true), -1, 'Dec 1 2012 to Dec 1 2013 should be 1 year');
        equal(test, frozenMoment([2012, 11, 31]).diff([2013, 11, 31], 'years', true), -1, 'Dec 31 2012 to Dec 31 2013 should be 1 year');
        equal(test, frozenMoment([2012, 0, 1]).diff([2013, 6, 1], 'years', true), -1.5, 'Jan 1 2012 to Jul 1 2013 should be 1.5 years');
        equal(test, frozenMoment([2012, 0, 31]).diff([2013, 6, 31], 'years', true), -1.5, 'Jan 31 2012 to Jul 31 2013 should be 1.5 years');
        equal(test, frozenMoment([2012, 0, 1]).diff([2013, 0, 1, 12], 'years', true), -1 - (0.5 / 31) / 12, 'Jan 1 2012 to Jan 1 2013 noon should be 1+(0.5 / 31) / 12 years');
        equal(test, frozenMoment([2012, 0, 1]).diff([2013, 6, 1, 12], 'years', true), -1.5 - (0.5 / 31) / 12, 'Jan 1 2012 to Jul 1 2013 noon should be 1.5+(0.5 / 31) / 12 years');
        equal(test, frozenMoment([2012, 1, 29]).diff([2013, 1, 28], 'years', true), -1 + (1 / 28.5) / 12, 'Feb 29 2012 to Feb 28 2013 should be 1-(1 / 28.5) / 12 years');

        test.done();
    }
};

var frozenMoment = require("../../frozen-moment");

exports.duration = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "object instantiation" : function (test) {
        var d = frozenMoment.duration({
            years: 2,
            months: 3,
            weeks: 2,
            days: 1,
            hours: 8,
            minutes: 9,
            seconds: 20,
            milliseconds: 12
        });

        test.expect(8);
        test.equal(d.years(),        2,  "years");
        test.equal(d.months(),       3,  "months");
        test.equal(d.weeks(),        2,  "weeks");
        test.equal(d.days(),         15, "days"); // two weeks + 1 day
        test.equal(d.hours(),        8,  "hours");
        test.equal(d.minutes(),      9,  "minutes");
        test.equal(d.seconds(),      20, "seconds");
        test.equal(d.milliseconds(), 12, "milliseconds");
        test.done();
    },

    "object instantiation with strings" : function (test) {
        var d = frozenMoment.duration({
            years: '2',
            months: '3',
            weeks: '2',
            days: '1',
            hours: '8',
            minutes: '9',
            seconds: '20',
            milliseconds: '12'
        });

        test.expect(8);
        test.equal(d.years(),        2,  "years");
        test.equal(d.months(),       3,  "months");
        test.equal(d.weeks(),        2,  "weeks");
        test.equal(d.days(),         15, "days"); // two weeks + 1 day
        test.equal(d.hours(),        8,  "hours");
        test.equal(d.minutes(),      9,  "minutes");
        test.equal(d.seconds(),      20, "seconds");
        test.equal(d.milliseconds(), 12, "milliseconds");
        test.done();
    },

    "milliseconds instantiation" : function (test) {
        test.expect(1);
        test.equal(frozenMoment.duration(72).milliseconds(), 72, "milliseconds");
        test.done();
    },

    "instantiation by type" : function (test) {
        test.expect(16);
        test.equal(frozenMoment.duration(1, "years").years(),                 1, "years");
        test.equal(frozenMoment.duration(1, "y").years(),                     1, "y");
        test.equal(frozenMoment.duration(2, "months").months(),               2, "months");
        test.equal(frozenMoment.duration(2, "M").months(),                    2, "M");
        test.equal(frozenMoment.duration(3, "weeks").weeks(),                 3, "weeks");
        test.equal(frozenMoment.duration(3, "w").weeks(),                     3, "weeks");
        test.equal(frozenMoment.duration(4, "days").days(),                   4, "days");
        test.equal(frozenMoment.duration(4, "d").days(),                      4, "d");
        test.equal(frozenMoment.duration(5, "hours").hours(),                 5, "hours");
        test.equal(frozenMoment.duration(5, "h").hours(),                     5, "h");
        test.equal(frozenMoment.duration(6, "minutes").minutes(),             6, "minutes");
        test.equal(frozenMoment.duration(6, "m").minutes(),                   6, "m");
        test.equal(frozenMoment.duration(7, "seconds").seconds(),             7, "seconds");
        test.equal(frozenMoment.duration(7, "s").seconds(),                   7, "s");
        test.equal(frozenMoment.duration(8, "milliseconds").milliseconds(),   8, "milliseconds");
        test.equal(frozenMoment.duration(8, "ms").milliseconds(),             8, "ms");
        test.done();
    },

    "shortcuts" : function (test) {
        test.expect(8);
        test.equal(frozenMoment.duration({y: 1}).years(),         1, "years = y");
        test.equal(frozenMoment.duration({M: 2}).months(),        2, "months = M");
        test.equal(frozenMoment.duration({w: 3}).weeks(),         3, "weeks = w");
        test.equal(frozenMoment.duration({d: 4}).days(),          4, "days = d");
        test.equal(frozenMoment.duration({h: 5}).hours(),         5, "hours = h");
        test.equal(frozenMoment.duration({m: 6}).minutes(),       6, "minutes = m");
        test.equal(frozenMoment.duration({s: 7}).seconds(),       7, "seconds = s");
        test.equal(frozenMoment.duration({ms: 8}).milliseconds(), 8, "milliseconds = ms");
        test.done();
    },

    "generic getter" : function (test) {
        test.expect(24);
        test.equal(frozenMoment.duration(1, "years").get("years"),                1, "years");
        test.equal(frozenMoment.duration(1, "years").get("year"),                 1, "years = year");
        test.equal(frozenMoment.duration(1, "years").get("y"),                    1, "years = y");
        test.equal(frozenMoment.duration(2, "months").get("months"),              2, "months");
        test.equal(frozenMoment.duration(2, "months").get("month"),               2, "months = month");
        test.equal(frozenMoment.duration(2, "months").get("M"),                   2, "months = M");
        test.equal(frozenMoment.duration(3, "weeks").get("weeks"),                3, "weeks");
        test.equal(frozenMoment.duration(3, "weeks").get("week"),                 3, "weeks = week");
        test.equal(frozenMoment.duration(3, "weeks").get("w"),                    3, "weeks = w");
        test.equal(frozenMoment.duration(4, "days").get("days"),                  4, "days");
        test.equal(frozenMoment.duration(4, "days").get("day"),                   4, "days = day");
        test.equal(frozenMoment.duration(4, "days").get("d"),                     4, "days = d");
        test.equal(frozenMoment.duration(5, "hours").get("hours"),                5, "hours");
        test.equal(frozenMoment.duration(5, "hours").get("hour"),                 5, "hours = hour");
        test.equal(frozenMoment.duration(5, "hours").get("h"),                    5, "hours = h");
        test.equal(frozenMoment.duration(6, "minutes").get("minutes"),            6, "minutes");
        test.equal(frozenMoment.duration(6, "minutes").get("minute"),             6, "minutes = minute");
        test.equal(frozenMoment.duration(6, "minutes").get("m"),                  6, "minutes = m");
        test.equal(frozenMoment.duration(7, "seconds").get("seconds"),            7, "seconds");
        test.equal(frozenMoment.duration(7, "seconds").get("second"),             7, "seconds = second");
        test.equal(frozenMoment.duration(7, "seconds").get("s"),                  7, "seconds = s");
        test.equal(frozenMoment.duration(8, "milliseconds").get("milliseconds"),  8, "milliseconds");
        test.equal(frozenMoment.duration(8, "milliseconds").get("millisecond"),   8, "milliseconds = millisecond");
        test.equal(frozenMoment.duration(8, "milliseconds").get("ms"),            8, "milliseconds = ms");
        test.done();
    },

    "instantiation from another duration" : function (test) {
        var simple = frozenMoment.duration(1234),
            lengthy = frozenMoment.duration(60 * 60 * 24 * 360 * 1e3),
            complicated = frozenMoment.duration({
                years: 2,
                months: 3,
                weeks: 4,
                days: 1,
                hours: 8,
                minutes: 9,
                seconds: 20,
                milliseconds: 12
            }),
            modified = frozenMoment.duration(1, 'day').thaw().add(frozenMoment.duration(1, 'day')).freeze();

        test.expect(4);
        test.deepEqual(frozenMoment.duration(simple), simple, "simple clones are equal");
        test.deepEqual(frozenMoment.duration(lengthy), lengthy, "lengthy clones are equal");
        test.deepEqual(frozenMoment.duration(complicated), complicated, "complicated clones are equal");
        test.deepEqual(frozenMoment.duration(modified), modified, "cloning modified duration works");
        test.done();
    },

    "instantiation from a duration builder" : function (test) {
        var simple = frozenMoment.duration.build(1234),
            lengthy = frozenMoment.duration.build(60 * 60 * 24 * 360 * 1e3),
            complicated = frozenMoment.duration.build({
                years: 2,
                months: 3,
                weeks: 4,
                days: 1,
                hours: 8,
                minutes: 9,
                seconds: 20,
                milliseconds: 12
            }),
            modified = frozenMoment.duration.build(1, 'day');

        test.expect(4);
        modified.add(frozenMoment.duration(1, 'day'));

        test.deepEqual(simple._data, frozenMoment.duration(simple)._data,
                       "simple durations are equal to their builders");
        test.deepEqual(lengthy._data, frozenMoment.duration(lengthy)._data,
                       "lengthy durations are equal to their builders");
        test.deepEqual(complicated._data, frozenMoment.duration(complicated)._data,
                       "complicated durations are equal to their builders");
        test.deepEqual(modified._data, frozenMoment.duration(modified)._data,
                       "building modified duration works");
        test.done();
    },

    "freezing a duration builder" : function (test) {
        var simple = frozenMoment.duration.build(1234),
            lengthy = frozenMoment.duration.build(60 * 60 * 24 * 360 * 1e3),
            complicated = frozenMoment.duration.build({
                years: 2,
                months: 3,
                weeks: 4,
                days: 1,
                hours: 8,
                minutes: 9,
                seconds: 20,
                milliseconds: 12
            }),
            modified = frozenMoment.duration.build(1, 'day');

        test.expect(4);
        modified.add(frozenMoment.duration(1, 'day'));

        test.deepEqual(simple._data, simple.freeze()._data,
                       "simple durations are equal to their builders");
        test.deepEqual(lengthy._data, lengthy.freeze()._data,
                       "lengthy durations are equal to their builders");
        test.deepEqual(complicated._data, complicated.freeze()._data,
                       "complicated durations are equal to their builders");
        test.deepEqual(modified._data, modified.freeze()._data,
                       "building modified duration works");
        test.done();
    },

    "thawing a duration" : function (test) {
        var simple = frozenMoment.duration(1234),
            lengthy = frozenMoment.duration(60 * 60 * 24 * 360 * 1e3),
            complicated = frozenMoment.duration({
                years: 2,
                months: 3,
                weeks: 4,
                days: 1,
                hours: 8,
                minutes: 9,
                seconds: 20,
                milliseconds: 12
            });

        test.expect(3);
        test.deepEqual(simple._data, simple.thaw()._data,
                       "simple builders are equal to their durations");
        test.deepEqual(lengthy._data, lengthy.thaw()._data,
                       "lengthy builders are equal to their durations");
        test.deepEqual(complicated._data, complicated.thaw()._data,
                       "complicated builders are equal to their durations");
        test.done();
    },

    "instantiation from 24-hour time zero" : function (test) {
        test.expect(6);
        test.equal(frozenMoment.duration("00:00").years(), 0, "0 years");
        test.equal(frozenMoment.duration("00:00").days(), 0, "0 days");
        test.equal(frozenMoment.duration("00:00").hours(), 0, "0 hours");
        test.equal(frozenMoment.duration("00:00").minutes(), 0, "0 minutes");
        test.equal(frozenMoment.duration("00:00").seconds(), 0, "0 seconds");
        test.equal(frozenMoment.duration("00:00").milliseconds(), 0, "0 milliseconds");
        test.done();
    },

    "instantiation from 24-hour time <24 hours" : function (test) {
        test.expect(6);
        test.equal(frozenMoment.duration("06:45").years(), 0, "0 years");
        test.equal(frozenMoment.duration("06:45").days(), 0, "0 days");
        test.equal(frozenMoment.duration("06:45").hours(), 6, "6 hours");
        test.equal(frozenMoment.duration("06:45").minutes(), 45, "45 minutes");
        test.equal(frozenMoment.duration("06:45").seconds(), 0, "0 seconds");
        test.equal(frozenMoment.duration("06:45").milliseconds(), 0, "0 milliseconds");
        test.done();
    },

    "instantiation from 24-hour time >24 hours" : function (test) {
        test.expect(6);
        test.equal(frozenMoment.duration("26:45").years(), 0, "0 years");
        test.equal(frozenMoment.duration("26:45").days(), 1, "0 days");
        test.equal(frozenMoment.duration("26:45").hours(), 2, "2 hours");
        test.equal(frozenMoment.duration("26:45").minutes(), 45, "45 minutes");
        test.equal(frozenMoment.duration("26:45").seconds(), 0, "0 seconds");
        test.equal(frozenMoment.duration("26:45").milliseconds(), 0, "0 milliseconds");
        test.done();
    },

    "instatiation from serialized C# TimeSpan zero" : function (test) {
        test.expect(6);
        test.equal(frozenMoment.duration("00:00:00").years(), 0, "0 years");
        test.equal(frozenMoment.duration("00:00:00").days(), 0, "0 days");
        test.equal(frozenMoment.duration("00:00:00").hours(), 0, "0 hours");
        test.equal(frozenMoment.duration("00:00:00").minutes(), 0, "0 minutes");
        test.equal(frozenMoment.duration("00:00:00").seconds(), 0, "0 seconds");
        test.equal(frozenMoment.duration("00:00:00").milliseconds(), 0, "0 milliseconds");
        test.done();
    },

    "instatiation from serialized C# TimeSpan with days" : function (test) {
        test.expect(6);
        test.equal(frozenMoment.duration("1.02:03:04.9999999").years(), 0, "0 years");
        test.equal(frozenMoment.duration("1.02:03:04.9999999").days(), 1, "1 day");
        test.equal(frozenMoment.duration("1.02:03:04.9999999").hours(), 2, "2 hours");
        test.equal(frozenMoment.duration("1.02:03:04.9999999").minutes(), 3, "3 minutes");
        test.equal(frozenMoment.duration("1.02:03:04.9999999").seconds(), 4, "4 seconds");
        test.equal(frozenMoment.duration("1.02:03:04.9999999").milliseconds(), 999, "999 milliseconds");
        test.done();
    },

    "instatiation from serialized C# TimeSpan without days" : function (test) {
        test.expect(10);
        test.equal(frozenMoment.duration("01:02:03.9999999").years(), 0, "0 years");
        test.equal(frozenMoment.duration("01:02:03.9999999").days(), 0, "0 days");
        test.equal(frozenMoment.duration("01:02:03.9999999").hours(), 1, "1 hour");
        test.equal(frozenMoment.duration("01:02:03.9999999").minutes(), 2, "2 minutes");
        test.equal(frozenMoment.duration("01:02:03.9999999").seconds(), 3, "3 seconds");
        test.equal(frozenMoment.duration("01:02:03.9999999").milliseconds(), 999, "999 milliseconds");

        test.equal(frozenMoment.duration("23:59:59.9999999").days(), 0, "0 days");
        test.equal(frozenMoment.duration("23:59:59.9999999").hours(), 23, "23 hours");

        test.equal(frozenMoment.duration("500:59:59.9999999").days(), 20, "500 hours overflows to 20 days");
        test.equal(frozenMoment.duration("500:59:59.9999999").hours(), 20, "500 hours overflows to 20 hours");
        test.done();
    },

    "instatiation from serialized C# TimeSpan without days or milliseconds" : function (test) {
        test.expect(6);
        test.equal(frozenMoment.duration("01:02:03").years(), 0, "0 years");
        test.equal(frozenMoment.duration("01:02:03").days(), 0, "0 days");
        test.equal(frozenMoment.duration("01:02:03").hours(), 1, "1 hour");
        test.equal(frozenMoment.duration("01:02:03").minutes(), 2, "2 minutes");
        test.equal(frozenMoment.duration("01:02:03").seconds(), 3, "3 seconds");
        test.equal(frozenMoment.duration("01:02:03").milliseconds(), 0, "0 milliseconds");
        test.done();
    },

    "instatiation from serialized C# TimeSpan without milliseconds" : function (test) {
        test.expect(6);
        test.equal(frozenMoment.duration("1.02:03:04").years(), 0, "0 years");
        test.equal(frozenMoment.duration("1.02:03:04").days(), 1, "1 day");
        test.equal(frozenMoment.duration("1.02:03:04").hours(), 2, "2 hours");
        test.equal(frozenMoment.duration("1.02:03:04").minutes(), 3, "3 minutes");
        test.equal(frozenMoment.duration("1.02:03:04").seconds(), 4, "4 seconds");
        test.equal(frozenMoment.duration("1.02:03:04").milliseconds(), 0, "0 milliseconds");
        test.done();
    },

    "instatiation from serialized C# TimeSpan maxValue" : function (test) {
        var d = frozenMoment.duration("10675199.02:48:05.4775807");

        test.equal(d.years(), 29227, "29227 years");
        test.equal(d.months(), 8, "8 months");
        test.equal(d.days(), 17, "17 day");  // this should be 13

        test.equal(d.hours(), 2, "2 hours");
        test.equal(d.minutes(), 48, "48 minutes");
        test.equal(d.seconds(), 5, "5 seconds");
        test.equal(d.milliseconds(), 477, "477 milliseconds");
        test.done();
    },

    "instatiation from serialized C# TimeSpan minValue" : function (test) {
        var d = frozenMoment.duration("-10675199.02:48:05.4775808");

        test.equal(d.years(), -29227, "29653 years");
        test.equal(d.months(), -8, "8 day");
        test.equal(d.days(), -17, "17 day"); // this should be 13

        test.equal(d.hours(), -2, "2 hours");
        test.equal(d.minutes(), -48, "48 minutes");
        test.equal(d.seconds(), -5, "5 seconds");
        test.equal(d.milliseconds(), -477, "477 milliseconds");
        test.done();
    },

    "instantiation from ISO 8601 duration" : function (test) {
        test.expect(7);
        test.equal(frozenMoment.duration("P1Y2M3DT4H5M6S").asSeconds(), frozenMoment.duration({y: 1, M: 2, d: 3, h: 4, m: 5, s: 6}).asSeconds(), "all fields");
        test.equal(frozenMoment.duration("P1M").asSeconds(), frozenMoment.duration({M: 1}).asSeconds(), "single month field");
        test.equal(frozenMoment.duration("PT1M").asSeconds(), frozenMoment.duration({m: 1}).asSeconds(), "single minute field");
        test.equal(frozenMoment.duration("P1MT2H").asSeconds(), frozenMoment.duration({M: 1, h: 2}).asSeconds(), "random fields missing");
        test.equal(frozenMoment.duration("-P60D").asSeconds(), frozenMoment.duration({d: -60}).asSeconds(), "negative days");
        test.equal(frozenMoment.duration("PT0.5S").asSeconds(), frozenMoment.duration({s: 0.5}).asSeconds(), "fractional seconds");
        test.equal(frozenMoment.duration("PT0,5S").asSeconds(), frozenMoment.duration({s: 0.5}).asSeconds(), "fractional seconds (comma)");
        test.done();
    },

    "serialization to ISO 8601 duration strings" : function (test) {
        test.expect(6);
        test.equal(frozenMoment.duration({y: 1, M: 2, d: 3, h: 4, m: 5, s: 6}).toISOString(), "P1Y2M3DT4H5M6S", "all fields");
        test.equal(frozenMoment.duration({M: -1}).toISOString(), "-P1M", "one month ago");
        test.equal(frozenMoment.duration({m: -1}).toISOString(), "-PT1M", "one minute ago");
        test.equal(frozenMoment.duration({s: -0.5}).toISOString(), "-PT0.5S", "one half second ago");
        test.equal(frozenMoment.duration({y: -0.5, M: 1}).toISOString(), "-P5M", "a month after half a year ago");
        test.equal(frozenMoment.duration({}).toISOString(), "P0D", "zero duration");
        test.done();
    },

    "`isodate` (python) test cases" : function (test) {
        test.expect(24);
        test.equal(frozenMoment.duration("P18Y9M4DT11H9M8S").asSeconds(), frozenMoment.duration({y: 18, M: 9, d: 4, h: 11, m: 9, s: 8}).asSeconds(), "python isodate 1");
        test.equal(frozenMoment.duration("P2W").asSeconds(), frozenMoment.duration({w: 2}).asSeconds(), "python isodate 2");
        test.equal(frozenMoment.duration("P3Y6M4DT12H30M5S").asSeconds(), frozenMoment.duration({y: 3, M: 6, d: 4, h: 12, m: 30, s: 5}).asSeconds(), "python isodate 3");
        test.equal(frozenMoment.duration("P23DT23H").asSeconds(), frozenMoment.duration({d: 23, h: 23}).asSeconds(), "python isodate 4");
        test.equal(frozenMoment.duration("P4Y").asSeconds(), frozenMoment.duration({y: 4}).asSeconds(), "python isodate 5");
        test.equal(frozenMoment.duration("P1M").asSeconds(), frozenMoment.duration({M: 1}).asSeconds(), "python isodate 6");
        test.equal(frozenMoment.duration("PT1M").asSeconds(), frozenMoment.duration({m: 1}).asSeconds(), "python isodate 7");
        test.equal(frozenMoment.duration("P0.5Y").asSeconds(), frozenMoment.duration({y: 0.5}).asSeconds(), "python isodate 8");
        test.equal(frozenMoment.duration("PT36H").asSeconds(), frozenMoment.duration({h: 36}).asSeconds(), "python isodate 9");
        test.equal(frozenMoment.duration("P1DT12H").asSeconds(), frozenMoment.duration({d: 1, h: 12}).asSeconds(), "python isodate 10");
        test.equal(frozenMoment.duration("-P2W").asSeconds(), frozenMoment.duration({w: -2}).asSeconds(), "python isodate 11");
        test.equal(frozenMoment.duration("-P2.2W").asSeconds(), frozenMoment.duration({w: -2.2}).asSeconds(), "python isodate 12");
        test.equal(frozenMoment.duration("P1DT2H3M4S").asSeconds(), frozenMoment.duration({d: 1, h: 2, m: 3, s: 4}).asSeconds(), "python isodate 13");
        test.equal(frozenMoment.duration("P1DT2H3M").asSeconds(), frozenMoment.duration({d: 1, h: 2, m: 3}).asSeconds(), "python isodate 14");
        test.equal(frozenMoment.duration("P1DT2H").asSeconds(), frozenMoment.duration({d: 1, h: 2}).asSeconds(), "python isodate 15");
        test.equal(frozenMoment.duration("PT2H").asSeconds(), frozenMoment.duration({h: 2}).asSeconds(), "python isodate 16");
        test.equal(frozenMoment.duration("PT2.3H").asSeconds(), frozenMoment.duration({h: 2.3}).asSeconds(), "python isodate 17");
        test.equal(frozenMoment.duration("PT2H3M4S").asSeconds(), frozenMoment.duration({h: 2, m: 3, s: 4}).asSeconds(), "python isodate 18");
        test.equal(frozenMoment.duration("PT3M4S").asSeconds(), frozenMoment.duration({m: 3, s: 4}).asSeconds(), "python isodate 19");
        test.equal(frozenMoment.duration("PT22S").asSeconds(), frozenMoment.duration({s: 22}).asSeconds(), "python isodate 20");
        test.equal(frozenMoment.duration("PT22.22S").asSeconds(), frozenMoment.duration({s: 22.22}).asSeconds(), "python isodate 21");
        test.equal(frozenMoment.duration("-P2Y").asSeconds(), frozenMoment.duration({y: -2}).asSeconds(), "python isodate 22");
        test.equal(frozenMoment.duration("-P3Y6M4DT12H30M5S").asSeconds(), frozenMoment.duration({y: -3, M: -6, d: -4, h: -12, m: -30, s: -5}).asSeconds(), "python isodate 23");
        test.equal(frozenMoment.duration("-P1DT2H3M4S").asSeconds(), frozenMoment.duration({d: -1, h: -2, m: -3, s: -4}).asSeconds(), "python isodate 24");
        test.done();
    },

    "ISO 8601 misuse cases" : function (test) {
        test.expect(8);
        test.equal(frozenMoment.duration("P").asSeconds(), 0, "lonely P");
        test.equal(frozenMoment.duration("PT").asSeconds(), 0, "just P and T");
        test.equal(frozenMoment.duration("P1H").asSeconds(), 0, "missing T");
        test.equal(frozenMoment.duration("P1D1Y").asSeconds(), 0, "out of order");
        test.equal(frozenMoment.duration("PT.5S").asSeconds(), 0.5, "accept no leading zero for decimal");
        test.equal(frozenMoment.duration("PT1,S").asSeconds(), 1, "accept trailing decimal separator");
        test.equal(frozenMoment.duration("PT1M0,,5S").asSeconds(), 60, "extra decimal separators are ignored as 0");
        test.equal(frozenMoment.duration("P-1DS").asSeconds(), 0, "wrong position of negative");
        test.done();
    },

    "humanize" : function (test) {
        test.expect(32);
        frozenMoment.locale('en');
        test.equal(frozenMoment.duration({seconds: 44}).humanize(),  "a few seconds", "44 seconds = a few seconds");
        test.equal(frozenMoment.duration({seconds: 45}).humanize(),  "a minute",      "45 seconds = a minute");
        test.equal(frozenMoment.duration({seconds: 89}).humanize(),  "a minute",      "89 seconds = a minute");
        test.equal(frozenMoment.duration({seconds: 90}).humanize(),  "2 minutes",     "90 seconds = 2 minutes");
        test.equal(frozenMoment.duration({minutes: 44}).humanize(),  "44 minutes",    "44 minutes = 44 minutes");
        test.equal(frozenMoment.duration({minutes: 45}).humanize(),  "an hour",       "45 minutes = an hour");
        test.equal(frozenMoment.duration({minutes: 89}).humanize(),  "an hour",       "89 minutes = an hour");
        test.equal(frozenMoment.duration({minutes: 90}).humanize(),  "2 hours",       "90 minutes = 2 hours");
        test.equal(frozenMoment.duration({hours: 5}).humanize(),     "5 hours",       "5 hours = 5 hours");
        test.equal(frozenMoment.duration({hours: 21}).humanize(),    "21 hours",      "21 hours = 21 hours");
        test.equal(frozenMoment.duration({hours: 22}).humanize(),    "a day",         "22 hours = a day");
        test.equal(frozenMoment.duration({hours: 35}).humanize(),    "a day",         "35 hours = a day");
        test.equal(frozenMoment.duration({hours: 36}).humanize(),    "2 days",        "36 hours = 2 days");
        test.equal(frozenMoment.duration({days: 1}).humanize(),      "a day",         "1 day = a day");
        test.equal(frozenMoment.duration({days: 5}).humanize(),      "5 days",        "5 days = 5 days");
        test.equal(frozenMoment.duration({weeks: 1}).humanize(),     "7 days",        "1 week = 7 days");
        test.equal(frozenMoment.duration({days: 25}).humanize(),     "25 days",       "25 days = 25 days");
        test.equal(frozenMoment.duration({days: 26}).humanize(),     "a month",       "26 days = a month");
        test.equal(frozenMoment.duration({days: 30}).humanize(),     "a month",       "30 days = a month");
        test.equal(frozenMoment.duration({days: 45}).humanize(),     "a month",       "45 days = a month");
        test.equal(frozenMoment.duration({days: 46}).humanize(),     "2 months",      "46 days = 2 months");
        test.equal(frozenMoment.duration({days: 74}).humanize(),     "2 months",      "74 days = 2 months");
        test.equal(frozenMoment.duration({days: 77}).humanize(),     "3 months",      "77 days = 3 months");
        test.equal(frozenMoment.duration({months: 1}).humanize(),    "a month",       "1 month = a month");
        test.equal(frozenMoment.duration({months: 5}).humanize(),    "5 months",      "5 months = 5 months");
        test.equal(frozenMoment.duration({days: 344}).humanize(),    "a year",        "344 days = a year");
        test.equal(frozenMoment.duration({days: 345}).humanize(),    "a year",        "345 days = a year");
        test.equal(frozenMoment.duration({days: 547}).humanize(),    "a year",        "547 days = a year");
        test.equal(frozenMoment.duration({days: 548}).humanize(),    "2 years",       "548 days = 2 years");
        test.equal(frozenMoment.duration({years: 1}).humanize(),     "a year",        "1 year = a year");
        test.equal(frozenMoment.duration({years: 5}).humanize(),     "5 years",       "5 years = 5 years");
        test.equal(frozenMoment.duration(7200000).humanize(),        "2 hours",       "7200000 = 2 minutes");
        test.done();
    },

    "humanize duration with suffix" : function (test) {
        test.expect(2);
        frozenMoment.locale('en');
        test.equal(frozenMoment.duration({seconds:  44}).humanize(true),  "in a few seconds", "44 seconds = a few seconds");
        test.equal(frozenMoment.duration({seconds: -44}).humanize(true),  "a few seconds ago", "44 seconds = a few seconds");
        test.done();
    },

    "bubble value up" : function (test) {
        test.expect(5);
        test.equal(frozenMoment.duration({milliseconds: 61001}).milliseconds(), 1, "61001 milliseconds has 1 millisecond left over");
        test.equal(frozenMoment.duration({milliseconds: 61001}).seconds(),      1, "61001 milliseconds has 1 second left over");
        test.equal(frozenMoment.duration({milliseconds: 61001}).minutes(),      1, "61001 milliseconds has 1 minute left over");

        test.equal(frozenMoment.duration({minutes: 350}).minutes(), 50, "350 minutes has 50 minutes left over");
        test.equal(frozenMoment.duration({minutes: 350}).hours(),   5,  "350 minutes has 5 hours left over");
        test.done();
    },

    "clipping" : function (test) {
        test.expect(18);
        test.equal(frozenMoment.duration({months: 11}).months(), 11, "11 months is 11 months");
        test.equal(frozenMoment.duration({months: 11}).years(),  0,  "11 months makes no year");
        test.equal(frozenMoment.duration({months: 12}).months(), 0,  "12 months is 0 months left over");
        test.equal(frozenMoment.duration({months: 12}).years(),  1,  "12 months makes 1 year");
        test.equal(frozenMoment.duration({months: 13}).months(), 1,  "13 months is 1 month left over");
        test.equal(frozenMoment.duration({months: 13}).years(),  1,  "13 months makes 1 year");

        test.equal(frozenMoment.duration({days: 29}).days(),   29, "29 days is 29 days");
        test.equal(frozenMoment.duration({days: 29}).months(), 0,  "29 days makes no month");
        test.equal(frozenMoment.duration({days: 30}).days(),   0,  "30 days is 0 days left over");
        test.equal(frozenMoment.duration({days: 30}).months(), 1,  "30 days is a month");
        test.equal(frozenMoment.duration({days: 31}).days(),   1,  "31 days is 1 day left over");
        test.equal(frozenMoment.duration({days: 31}).months(), 1,  "31 days is a month");

        test.equal(frozenMoment.duration({hours: 23}).hours(), 23, "23 hours is 23 hours");
        test.equal(frozenMoment.duration({hours: 23}).days(),  0,  "23 hours makes no day");
        test.equal(frozenMoment.duration({hours: 24}).hours(), 0,  "24 hours is 0 hours left over");
        test.equal(frozenMoment.duration({hours: 24}).days(),  1,  "24 hours makes 1 day");
        test.equal(frozenMoment.duration({hours: 25}).hours(), 1,  "25 hours is 1 hour left over");
        test.equal(frozenMoment.duration({hours: 25}).days(),  1,  "25 hours makes 1 day");
        test.done();
    },

    "effective equivalency" : function (test) {
        test.expect(7);
        test.deepEqual(frozenMoment.duration({seconds: 1})._data,  frozenMoment.duration({milliseconds: 1000})._data, "1 second is the same as 1000 milliseconds");
        test.deepEqual(frozenMoment.duration({seconds: 60})._data, frozenMoment.duration({minutes: 1})._data,         "1 minute is the same as 60 seconds");
        test.deepEqual(frozenMoment.duration({minutes: 60})._data, frozenMoment.duration({hours: 1})._data,           "1 hour is the same as 60 minutes");
        test.deepEqual(frozenMoment.duration({hours: 24})._data,   frozenMoment.duration({days: 1})._data,            "1 day is the same as 24 hours");
        test.deepEqual(frozenMoment.duration({days: 7})._data,     frozenMoment.duration({weeks: 1})._data,           "1 week is the same as 7 days");
        test.deepEqual(frozenMoment.duration({days: 30})._data,    frozenMoment.duration({months: 1})._data,          "1 month is the same as 30 days");
        test.deepEqual(frozenMoment.duration({months: 12})._data,  frozenMoment.duration({years: 1})._data,           "1 years is the same as 12 months");
        test.done();
    },

    "asGetters" : function (test) {
        var d = frozenMoment.duration({
            years: 2,
            months: 3,
            weeks: 2,
            days: 1,
            hours: 8,
            minutes: 9,
            seconds: 20,
            milliseconds: 12
        });

        test.expect(8);
        // These are of course very fragile. Their existence merely hints that
        // changing the way 'as' works changes the output.
        test.equal(d.asYears().toFixed(2),          "2.29", "years");
        test.equal(d.asMonths().toFixed(2),        "27.50", "months");
        test.equal(d.asWeeks().toFixed(2),        "119.59", "weeks");
        test.equal(d.asDays().toFixed(2),         "837.14", "days");
        test.equal(d.asHours().toFixed(2),      "20091.25", "hours");
        test.equal(d.asMinutes().toFixed(2),  "1205475.03", "minutes");
        test.equal(d.asSeconds().toFixed(2), "72328502.01", "seconds");
        test.equal(d.asMilliseconds(),         72328502012, "milliseconds");
        test.done();
    },

    "generic as getter" : function (test) {
        var d = frozenMoment.duration({
            years: 2,
            months: 3,
            weeks: 2,
            days: 1,
            hours: 8,
            minutes: 9,
            seconds: 20,
            milliseconds: 12
        });

        // These are of course very fragile. Their existence merely hints that
        // changing the way 'as' works changes the output.
        test.expect(24);
        test.equal(d.as("years").toFixed(2),          "2.29", "years");
        test.equal(d.as("year").toFixed(2),           "2.29", "years = year");
        test.equal(d.as("y").toFixed(2),              "2.29", "years = y");
        test.equal(d.as("months").toFixed(2),         "27.50", "months");
        test.equal(d.as("month").toFixed(2),          "27.50", "months = month");
        test.equal(d.as("M").toFixed(2),              "27.50", "months = M");
        test.equal(d.as("weeks").toFixed(2),          "119.59", "weeks");
        test.equal(d.as("week").toFixed(2),           "119.59", "weeks = week");
        test.equal(d.as("w").toFixed(2),              "119.59", "weeks = w");
        test.equal(d.as("days").toFixed(2),           "837.14", "days");
        test.equal(d.as("day").toFixed(2),            "837.14", "days = day");
        test.equal(d.as("d").toFixed(2),              "837.14", "days = d");
        test.equal(d.as("hours").toFixed(2),          "20091.25", "hours");
        test.equal(d.as("hour").toFixed(2),           "20091.25", "hours = hour");
        test.equal(d.as("h").toFixed(2),              "20091.25", "hours = h");
        test.equal(d.as("minutes").toFixed(2),        "1205475.03", "minutes");
        test.equal(d.as("minute").toFixed(2),         "1205475.03", "minutes = minute");
        test.equal(d.as("m").toFixed(2),              "1205475.03", "minutes = m");
        test.equal(d.as("seconds").toFixed(2),        "72328502.01", "seconds");
        test.equal(d.as("second").toFixed(2),         "72328502.01", "seconds = second");
        test.equal(d.as("s").toFixed(2),              "72328502.01", "seconds = s");
        test.equal(d.as("milliseconds"),              72328502012, "milliseconds");
        test.equal(d.as("millisecond"),               72328502012, "milliseconds = millisecond");
        test.equal(d.as("ms"),                        72328502012, "milliseconds = ms");
        test.done();
    },

    "isDuration" : function (test) {
        test.expect(3);
        test.ok(frozenMoment.isDuration(frozenMoment.duration(12345678)), "correctly says true");
        test.ok(!frozenMoment.isDuration(frozenMoment()), "frozenMoment object is not a duration");
        test.ok(!frozenMoment.isDuration({milliseconds: 1}), "plain object is not a duration");
        test.done();
    },

    "add" : function (test) {
        test.expect(4);

        var d = frozenMoment.duration.build({months: 4, weeks: 3, days: 2});
        // for some reason, d._data._months does not get updated; use d._months instead.
        test.equal(d.add(1, 'month')._months, 5, 'Add months');
        test.equal(d.add(5, 'days')._days, 28, 'Add days');
        test.equal(d.add(10000)._milliseconds, 10000, 'Add milliseconds');
        test.equal(d.add({h: 23, m: 59})._milliseconds, 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 10000, 'Add hour:minute');

        test.done();
    },

    "add and bubble" : function (test) {
        test.expect(4);

        test.equal(frozenMoment.duration.build(1, 'second').add(1000, 'milliseconds').freeze().seconds(), 2, 'Adding milliseconds should bubble up to seconds');
        test.equal(frozenMoment.duration.build(1, 'minute').add(60, 'second').freeze().minutes(), 2, 'Adding seconds should bubble up to minutes');
        test.equal(frozenMoment.duration.build(1, 'hour').add(60, 'minutes').freeze().hours(), 2, 'Adding minutes should bubble up to hours');
        test.equal(frozenMoment.duration.build(1, 'day').add(24, 'hours').freeze().days(), 2, 'Adding hours should bubble up to days');

        test.done();
    },

    "subtract and bubble" : function (test) {
        test.expect(4);

        test.equal(frozenMoment.duration.build(2, 'second').subtract(1000, 'milliseconds').freeze().seconds(), 1, 'Subtracting milliseconds should bubble up to seconds');
        test.equal(frozenMoment.duration.build(2, 'minute').subtract(60, 'second').freeze().minutes(), 1, 'Subtracting seconds should bubble up to minutes');
        test.equal(frozenMoment.duration.build(2, 'hour').subtract(60, 'minutes').freeze().hours(), 1, 'Subtracting minutes should bubble up to hours');
        test.equal(frozenMoment.duration.build(2, 'day').subtract(24, 'hours').freeze().days(), 1, 'Subtracting hours should bubble up to days');

        test.done();
    },

    "subtract" : function (test) {
        test.expect(4);

        var d = frozenMoment.duration.build({months: 2, weeks: 2, days: 0, hours: 5});
        // for some reason, d._data._months does not get updated; use d._months instead.
        test.equal(d.subtract(1, 'months')._months, 1, 'Subtract months');
        test.equal(d.subtract(14, 'days')._days, 0, 'Subtract days');
        test.equal(d.subtract(10000)._milliseconds, 5 * 60 * 60 * 1000 - 10000, 'Subtract milliseconds');
        test.equal(d.subtract({h: 1, m: 59})._milliseconds, 3 * 60 * 60 * 1000 + 1 * 60 * 1000 - 10000, 'Subtract hour:minute');

        test.done();
    }

};

var frozenMoment = require("../../frozen-moment");

exports.durationFromMoments = {
    setUp: function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "pure year diff" : function (test) {
        var m1 = frozenMoment("2012-01-01T00:00:00.000Z"),
            m2 = frozenMoment("2013-01-01T00:00:00.000Z");

        test.equal(frozenMoment.duration({from: m1, to: m2}).as("years"), 1, "year frozenMoment difference");
        test.equal(frozenMoment.duration({from: m2, to: m1}).as("years"), -1, "negative year frozenMoment difference");
        test.done();
    },

    "month and day diff" : function (test) {
        var m1 = frozenMoment("2012-01-15T00:00:00.000Z"),
            m2 = frozenMoment("2012-02-17T00:00:00.000Z"),
            d = frozenMoment.duration({from: m1, to: m2});

        test.equal(d.get("days"), 2);
        test.equal(d.get("months"), 1);
        test.done();
    },

    "day diff, separate months" : function (test) {
        var m1 = frozenMoment("2012-01-15T00:00:00.000Z"),
            m2 = frozenMoment("2012-02-13T00:00:00.000Z"),
            d = frozenMoment.duration({from: m1, to: m2});

        test.equal(d.as("days"), 29);
        test.done();
    },

    "hour diff" : function (test) {
        var m1 = frozenMoment("2012-01-15T17:00:00.000Z"),
            m2 = frozenMoment("2012-01-16T03:00:00.000Z"),
            d = frozenMoment.duration({from: m1, to: m2});

        test.equal(d.as("hours"), 10);
        test.done();
    },

    "minute diff" : function (test) {
        var m1 = frozenMoment("2012-01-15T17:45:00.000Z"),
            m2 = frozenMoment("2012-01-16T03:15:00.000Z"),
            d = frozenMoment.duration({from: m1, to: m2});

        test.equal(d.as("hours"), 9.5);
        test.done();
    }
};

var frozenMoment = require("../../frozen-moment");

exports.format = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "format YY" : function (test) {
        test.expect(1);

        var b = frozenMoment(new Date(2009, 1, 14, 15, 25, 50, 125));
        test.equal(b.format('YY'), '09', 'YY ---> 09');
        test.done();
    },

    "format escape brackets" : function (test) {
        test.expect(10);

        frozenMoment.locale('en');

        var b = frozenMoment(new Date(2009, 1, 14, 15, 25, 50, 125));
        test.equal(b.format('[day]'), 'day', 'Single bracket');
        test.equal(b.format('[day] YY [YY]'), 'day 09 YY', 'Double bracket');
        test.equal(b.format('[YY'), '[09', 'Un-ended bracket');
        test.equal(b.format('[[YY]]'), '[YY]', 'Double nested brackets');
        test.equal(b.format('[[]'), '[', 'Escape open bracket');
        test.equal(b.format('[Last]'), 'Last', 'localized tokens');
        test.equal(b.format('[L] L'), 'L 02/14/2009', 'localized tokens with escaped localized tokens');
        test.equal(b.format('[L LL LLL LLLL aLa]'), 'L LL LLL LLLL aLa', 'localized tokens with escaped localized tokens');
        test.equal(b.format('[LLL] LLL'), 'LLL February 14 2009 3:25 PM', 'localized tokens with escaped localized tokens (recursion)');
        test.equal(b.format('YYYY[\n]DD[\n]'), '2009\n14\n', 'Newlines');
        test.done();
    },

    "handle negative years" : function (test) {
        test.expect(10);

        frozenMoment.locale('en');
        test.equal(frozenMoment.utc().thaw().year(-1).freeze().format('YY'), '-01', 'YY with negative year');
        test.equal(frozenMoment.utc().thaw().year(-1).freeze().format('YYYY'), '-0001', 'YYYY with negative year');
        test.equal(frozenMoment.utc().thaw().year(-12).freeze().format('YY'), '-12', 'YY with negative year');
        test.equal(frozenMoment.utc().thaw().year(-12).freeze().format('YYYY'), '-0012', 'YYYY with negative year');
        test.equal(frozenMoment.utc().thaw().year(-123).freeze().format('YY'), '-23', 'YY with negative year');
        test.equal(frozenMoment.utc().thaw().year(-123).freeze().format('YYYY'), '-0123', 'YYYY with negative year');
        test.equal(frozenMoment.utc().thaw().year(-1234).freeze().format('YY'), '-34', 'YY with negative year');
        test.equal(frozenMoment.utc().thaw().year(-1234).freeze().format('YYYY'), '-1234', 'YYYY with negative year');
        test.equal(frozenMoment.utc().thaw().year(-12345).freeze().format('YY'), '-45', 'YY with negative year');
        test.equal(frozenMoment.utc().thaw().year(-12345).freeze().format('YYYY'), '-12345', 'YYYY with negative year');

        test.done();
    },

    "format milliseconds" : function (test) {
        test.expect(6);
        var b = frozenMoment(new Date(2009, 1, 14, 15, 25, 50, 123));
        test.equal(b.format('S'), '1', 'Deciseconds');
        test.equal(b.format('SS'), '12', 'Centiseconds');
        test.equal(b.format('SSS'), '123', 'Milliseconds');
        b = b.thaw().milliseconds(789).freeze();
        test.equal(b.format('S'), '7', 'Deciseconds');
        test.equal(b.format('SS'), '78', 'Centiseconds');
        test.equal(b.format('SSS'), '789', 'Milliseconds');
        test.done();
    },

    "format timezone" : function (test) {
        test.expect(2);

        var b = frozenMoment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            explanation = 'frozenMoment().format("z") = ' + b.format('z') + ' It should be something like "PST"';
        if (frozenMoment().zone() === -60) {
            explanation += "For UTC+1 this is a known issue, see https://github.com/timrwood/frozenMoment/issues/162";
        }
        test.ok(b.format('Z').match(/^[\+\-]\d\d:\d\d$/), b.format('Z') + ' should be something like "+07:30"');
        test.ok(b.format('ZZ').match(/^[\+\-]\d{4}$/), b.format('ZZ') + ' should be something like "+0700"');
        test.done();
    },

    "format multiple with zone" : function (test) {
        test.expect(1);

        var b = frozenMoment('2012-10-08 -1200', ['YYYY-MM-DD HH:mm ZZ', 'YYYY-MM-DD ZZ', 'YYYY-MM-DD']);
        test.equals(b.format('YYYY-MM'), '2012-10', 'Parsing multiple formats should not crash with different sized formats');
        test.done();
    },

    "isDST" : function (test) {
        test.expect(2);

        var janOffset = new Date(2011, 0, 1).getTimezoneOffset(),
            julOffset = new Date(2011, 6, 1).getTimezoneOffset(),
            janIsDst = janOffset < julOffset,
            julIsDst = julOffset < janOffset,
            jan1 = frozenMoment([2011]),
            jul1 = frozenMoment([2011, 6]);

        if (janIsDst && julIsDst) {
            test.ok(0, 'January and July cannot both be in DST');
            test.ok(0, 'January and July cannot both be in DST');
        } else if (janIsDst) {
            test.ok(jan1.isDST(), 'January 1 is DST');
            test.ok(!jul1.isDST(), 'July 1 is not DST');
        } else if (julIsDst) {
            test.ok(!jan1.isDST(), 'January 1 is not DST');
            test.ok(jul1.isDST(), 'July 1 is DST');
        } else {
            test.ok(!jan1.isDST(), 'January 1 is not DST');
            test.ok(!jul1.isDST(), 'July 1 is not DST');
        }
        test.done();
    },

    "unix timestamp" : function (test) {
        test.expect(5);

        var m = frozenMoment('1234567890.123', 'X');
        test.equals(m.format('X'), '1234567890', 'unix timestamp without milliseconds');
        test.equals(m.format('X.S'), '1234567890.1', 'unix timestamp with deciseconds');
        test.equals(m.format('X.SS'), '1234567890.12', 'unix timestamp with centiseconds');
        test.equals(m.format('X.SSS'), '1234567890.123', 'unix timestamp with milliseconds');

        m = frozenMoment(1234567890.123, 'X');
        test.equals(m.format('X'), '1234567890', 'unix timestamp as integer');

        test.done();
    },

    "zone" : function (test) {
        test.expect(3);

        if (frozenMoment().zone() > 0) {
            test.ok(frozenMoment().format('ZZ').indexOf('-') > -1, 'When the zone() offset is greater than 0, the ISO offset should be less than zero');
        }
        if (frozenMoment().zone() < 0) {
            test.ok(frozenMoment().format('ZZ').indexOf('+') > -1, 'When the zone() offset is less than 0, the ISO offset should be greater than zero');
        }
        if (frozenMoment().zone() === 0) {
            test.ok(frozenMoment().format('ZZ').indexOf('+') > -1, 'When the zone() offset is equal to 0, the ISO offset should be positive zero');
        }
        if (frozenMoment().zone() === 0) {
            test.equal(frozenMoment().zone(), 0, 'frozenMoment.fn.zone should be a multiple of 15 (was ' + frozenMoment().zone() + ')');
        } else {
            test.equal(frozenMoment().zone() % 15, 0, 'frozenMoment.fn.zone should be a multiple of 15 (was ' + frozenMoment().zone() + ')');
        }
        test.equal(frozenMoment().zone(), new Date().getTimezoneOffset(), 'zone should equal getTimezoneOffset');
        test.done();
    },

    "default format" : function (test) {
        test.expect(1);
        var isoRegex = /\d{4}.\d\d.\d\dT\d\d.\d\d.\d\d[\+\-]\d\d:\d\d/;
        test.ok(isoRegex.exec(frozenMoment().format()), "default format (" + frozenMoment().format() + ") should match ISO");
        test.done();
    },

    "escaping quotes" : function (test) {
        test.expect(4);
        frozenMoment.locale('en');
        var date = frozenMoment([2012, 0]);
        test.equal(date.format('MMM \'YY'), "Jan '12", "Should be able to format with single parenthesis");
        test.equal(date.format('MMM "YY'),  'Jan "12', "Should be able to format with double parenthesis");
        test.equal(date.format("MMM 'YY"),  "Jan '12", "Should be able to format with single parenthesis");
        test.equal(date.format("MMM \"YY"), 'Jan "12', "Should be able to format with double parenthesis");
        test.done();
    },

    "toJSON" : function (test) {
        var supportsJson = typeof JSON !== "undefined" && JSON.stringify && JSON.stringify.call,
            date = frozenMoment("2012-10-09T21:30:40.678+0100");

        test.expect(supportsJson ? 2 : 1);

        test.equal(date.toJSON(), "2012-10-09T20:30:40.678Z", "should output ISO8601 on frozenMoment.fn.toJSON");

        if (supportsJson) {
            test.equal(JSON.stringify({
                date : date
            }), '{"date":"2012-10-09T20:30:40.678Z"}', "should output ISO8601 on JSON.stringify");
        }

        test.done();
    },

    "toISOString" : function (test) {
        test.expect(4);
        var date = frozenMoment.utc("2012-10-09T20:30:40.678");

        test.equal(date.toISOString(), "2012-10-09T20:30:40.678Z", "should output ISO8601 on frozenMoment.fn.toISOString");

        // big years
        date = frozenMoment.utc("+020123-10-09T20:30:40.678");
        test.equal(date.toISOString(), "+020123-10-09T20:30:40.678Z", "ISO8601 format on big positive year");
        // negative years
        date = frozenMoment.utc("-000001-10-09T20:30:40.678");
        test.equal(date.toISOString(), "-000001-10-09T20:30:40.678Z", "ISO8601 format on negative year");
        // big negative years
        date = frozenMoment.utc("-020123-10-09T20:30:40.678");
        test.equal(date.toISOString(), "-020123-10-09T20:30:40.678Z", "ISO8601 format on big negative year");

        test.done();
    },

    "long years" : function (test) {
        test.expect(6);
        test.equal(frozenMoment.utc().thaw().year(2).freeze().format('YYYYYY'), '+000002', 'small year with YYYYYY');
        test.equal(frozenMoment.utc().thaw().year(2012).freeze().format('YYYYYY'), '+002012', 'regular year with YYYYYY');
        test.equal(frozenMoment.utc().thaw().year(20123).freeze().format('YYYYYY'), '+020123', 'big year with YYYYYY');

        test.equal(frozenMoment.utc().thaw().year(-1).freeze().format('YYYYYY'), '-000001', 'small negative year with YYYYYY');
        test.equal(frozenMoment.utc().thaw().year(-2012).freeze().format('YYYYYY'), '-002012', 'negative year with YYYYYY');
        test.equal(frozenMoment.utc().thaw().year(-20123).freeze().format('YYYYYY'), '-020123', 'big negative year with YYYYYY');

        test.done();
    },

    "iso week formats" : function (test) {
        // http://en.wikipedia.org/wiki/ISO_week_date
        var cases = {
            "2005-01-02": "2004-53",
            "2005-12-31": "2005-52",
            "2007-01-01": "2007-01",
            "2007-12-30": "2007-52",
            "2007-12-31": "2008-01",
            "2008-01-01": "2008-01",
            "2008-12-28": "2008-52",
            "2008-12-29": "2009-01",
            "2008-12-30": "2009-01",
            "2008-12-31": "2009-01",
            "2009-01-01": "2009-01",
            "2009-12-31": "2009-53",
            "2010-01-01": "2009-53",
            "2010-01-02": "2009-53",
            "2010-01-03": "2009-53",
            "404-12-31": "0404-53",
            "405-12-31": "0405-52"
        }, i, isoWeek, formatted2, formatted1;

        for (i in cases) {
            isoWeek = cases[i].split('-').pop();
            formatted2 = frozenMoment(i, 'YYYY-MM-DD').format('WW');
            test.equal(isoWeek, formatted2, i + ": WW should be " + isoWeek + ", but " + formatted2);
            isoWeek = isoWeek.replace(/^0+/, '');
            formatted1 = frozenMoment(i, 'YYYY-MM-DD').format('W');
            test.equal(isoWeek, formatted1, i + ": W should be " + isoWeek + ", but " + formatted1);
        }

        test.done();
    },

    "iso week year formats" : function (test) {
        // http://en.wikipedia.org/wiki/ISO_week_date
        var cases = {
            "2005-01-02": "2004-53",
            "2005-12-31": "2005-52",
            "2007-01-01": "2007-01",
            "2007-12-30": "2007-52",
            "2007-12-31": "2008-01",
            "2008-01-01": "2008-01",
            "2008-12-28": "2008-52",
            "2008-12-29": "2009-01",
            "2008-12-30": "2009-01",
            "2008-12-31": "2009-01",
            "2009-01-01": "2009-01",
            "2009-12-31": "2009-53",
            "2010-01-01": "2009-53",
            "2010-01-02": "2009-53",
            "2010-01-03": "2009-53",
            "404-12-31": "0404-53",
            "405-12-31": "0405-52"
        }, i, isoWeekYear, formatted5, formatted4, formatted2;

        for (i in cases) {
            isoWeekYear = cases[i].split('-')[0];
            formatted5 = frozenMoment(i, 'YYYY-MM-DD').format('GGGGG');
            test.equal('0' + isoWeekYear, formatted5, i + ": GGGGG should be " + isoWeekYear + ", but " + formatted5);
            formatted4 = frozenMoment(i, 'YYYY-MM-DD').format('GGGG');
            test.equal(isoWeekYear, formatted4, i + ": GGGG should be " + isoWeekYear + ", but " + formatted4);
            formatted2 = frozenMoment(i, 'YYYY-MM-DD').format('GG');
            test.equal(isoWeekYear.slice(2, 4), formatted2, i + ": GG should be " + isoWeekYear + ", but " + formatted2);
        }

        test.done();
    },

    "week year formats" : function (test) {
        // http://en.wikipedia.org/wiki/ISO_week_date
        var cases = {
            "2005-01-02": "2004-53",
            "2005-12-31": "2005-52",
            "2007-01-01": "2007-01",
            "2007-12-30": "2007-52",
            "2007-12-31": "2008-01",
            "2008-01-01": "2008-01",
            "2008-12-28": "2008-52",
            "2008-12-29": "2009-01",
            "2008-12-30": "2009-01",
            "2008-12-31": "2009-01",
            "2009-01-01": "2009-01",
            "2009-12-31": "2009-53",
            "2010-01-01": "2009-53",
            "2010-01-02": "2009-53",
            "2010-01-03": "2009-53",
            "404-12-31": "0404-53",
            "405-12-31": "0405-52"
        }, i, isoWeekYear, formatted5, formatted4, formatted2;

        frozenMoment.locale('en-gb'); // 1, 4
        for (i in cases) {
            isoWeekYear = cases[i].split('-')[0];
            formatted5 = frozenMoment(i, 'YYYY-MM-DD').format('ggggg');
            test.equal('0' + isoWeekYear, formatted5, i + ": ggggg should be " + isoWeekYear + ", but " + formatted5);
            formatted4 = frozenMoment(i, 'YYYY-MM-DD').format('gggg');
            test.equal(isoWeekYear, formatted4, i + ": gggg should be " + isoWeekYear + ", but " + formatted4);
            formatted2 = frozenMoment(i, 'YYYY-MM-DD').format('gg');
            test.equal(isoWeekYear.slice(2, 4), formatted2, i + ": gg should be " + isoWeekYear + ", but " + formatted2);
        }

        test.done();
    },

    "iso weekday formats" : function (test) {
        test.expect(7);

        test.equal(frozenMoment([1985, 1,  4]).format('E'), '1', "Feb  4 1985 is Monday    -- 1st day");
        test.equal(frozenMoment([2029, 8, 18]).format('E'), '2', "Sep 18 2029 is Tuesday   -- 2nd day");
        test.equal(frozenMoment([2013, 3, 24]).format('E'), '3', "Apr 24 2013 is Wednesday -- 3rd day");
        test.equal(frozenMoment([2015, 2,  5]).format('E'), '4', "Mar  5 2015 is Thursday  -- 4th day");
        test.equal(frozenMoment([1970, 0,  2]).format('E'), '5', "Jan  2 1970 is Friday    -- 5th day");
        test.equal(frozenMoment([2001, 4, 12]).format('E'), '6', "May 12 2001 is Saturday  -- 6th day");
        test.equal(frozenMoment([2000, 0,  2]).format('E'), '7', "Jan  2 2000 is Sunday    -- 7th day");

        test.done();
    },

    "weekday formats" : function (test) {
        test.expect(7);

        frozenMoment.locale('dow: 3,doy: 5', {week: {dow: 3, doy: 5}});
        test.equal(frozenMoment([1985, 1,  6]).format('e'), '0', "Feb  6 1985 is Wednesday -- 0th day");
        test.equal(frozenMoment([2029, 8, 20]).format('e'), '1', "Sep 20 2029 is Thursday  -- 1st day");
        test.equal(frozenMoment([2013, 3, 26]).format('e'), '2', "Apr 26 2013 is Friday    -- 2nd day");
        test.equal(frozenMoment([2015, 2,  7]).format('e'), '3', "Mar  7 2015 is Saturday  -- 3nd day");
        test.equal(frozenMoment([1970, 0,  4]).format('e'), '4', "Jan  4 1970 is Sunday    -- 4th day");
        test.equal(frozenMoment([2001, 4, 14]).format('e'), '5', "May 14 2001 is Monday    -- 5th day");
        test.equal(frozenMoment([2000, 0,  4]).format('e'), '6', "Jan  4 2000 is Tuesday   -- 6th day");

        test.done();
    },

    "toString is just human readable format" : function (test) {
        test.expect(1);

        var b = frozenMoment(new Date(2009, 1, 5, 15, 25, 50, 125));
        test.equal(b.toString(), b.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ'));
        test.done();
    },

    "toJSON skips postformat" : function (test) {
        test.expect(1);

        frozenMoment.locale('postformat', {
            postformat: function (s) {
                s.replace(/./g, 'X');
            }
        });
        test.equal(frozenMoment.utc([2000, 0, 1]).toJSON(), "2000-01-01T00:00:00.000Z", "toJSON doesn't postformat");
        frozenMoment.locale('postformat', null);
        test.done();
    },

    "calendar day timezone" : function (test) {
        test.expect(11);

        frozenMoment.locale('en');
        var zones = [60, -60, 90, -90, 360, -360, 720, -720],
            b = frozenMoment.build().utc().startOf('day').subtract({m : 1}).freeze(),
            c = frozenMoment.build().local().startOf('day').subtract({m : 1}).freeze(),
            d = frozenMoment.build().local().startOf('day').subtract({d : 2}).freeze(),
            i, z, a;

        for (i = 0; i < zones.length; ++i) {
            z = zones[i];
            a = frozenMoment.build().zone(z).startOf('day').subtract({m: 1});
            test.equal(a.zone(z).freeze().calendar(), "Yesterday at 11:59 PM", "Yesterday at 11:59 PM, not Today, or the wrong time");
        }

        test.equal(frozenMoment.build(b).utc().freeze().calendar(), "Yesterday at 11:59 PM", "Yesterday at 11:59 PM, not Today, or the wrong time");
        test.equal(frozenMoment.build(c).local().freeze().calendar(), "Yesterday at 11:59 PM", "Yesterday at 11:59 PM, not Today, or the wrong time");
        test.equal(frozenMoment.build(c).local().freeze().calendar(d), "Tomorrow at 11:59 PM", "Tomorrow at 11:59 PM, not Yesterday, or the wrong time");

        test.done();
    },

    "invalid" : function (test) {
        frozenMoment.locale('en');

        test.equal(frozenMoment.invalid().format(), "Invalid date");
        test.equal(frozenMoment.invalid().format('YYYY-MM-DD'), "Invalid date");

        test.done();
    },

    "quarter formats" : function (test) {
        test.expect(7);

        test.equal(frozenMoment([1985, 1,  4]).format('Q'), '1', "Feb  4 1985 is Q1");
        test.equal(frozenMoment([2029, 8, 18]).format('Q'), '3', "Sep 18 2029 is Q3");
        test.equal(frozenMoment([2013, 3, 24]).format('Q'), '2', "Apr 24 2013 is Q2");
        test.equal(frozenMoment([2015, 2,  5]).format('Q'), '1', "Mar  5 2015 is Q1");
        test.equal(frozenMoment([1970, 0,  2]).format('Q'), '1', "Jan  2 1970 is Q1");
        test.equal(frozenMoment([2001, 11, 12]).format('Q'), '4', "Dec 12 2001 is Q4");
        test.equal(frozenMoment([2000, 0,  2]).format('[Q]Q-YYYY'), 'Q1-2000', "Jan  2 2000 is Q1");

        test.done();
    }
};

var frozenMoment = require("../../frozen-moment"),
    momentBuilder = frozenMoment.build;

exports.gettersSetters = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "getters" : function (test) {
        test.expect(8);

        var a = frozenMoment([2011, 9, 12, 6, 7, 8, 9]);
        test.equal(a.year(), 2011, 'year');
        test.equal(a.month(), 9, 'month');
        test.equal(a.date(), 12, 'date');
        test.equal(a.day(), 3, 'day');
        test.equal(a.hours(), 6, 'hour');
        test.equal(a.minutes(), 7, 'minute');
        test.equal(a.seconds(), 8, 'second');
        test.equal(a.milliseconds(), 9, 'milliseconds');
        test.done();
    },

    "getters programmatic" : function (test) {
        var a = frozenMoment([2011, 9, 12, 6, 7, 8, 9]);
        test.equal(a.get('year'), 2011, 'year');
        test.equal(a.get('month'), 9, 'month');
        test.equal(a.get('date'), 12, 'date');
        test.equal(a.get('day'), 3, 'day');
        test.equal(a.get('hour'), 6, 'hour');
        test.equal(a.get('minute'), 7, 'minute');
        test.equal(a.get('second'), 8, 'second');
        test.equal(a.get('milliseconds'), 9, 'milliseconds');

        //actual getters tested elsewhere
        test.equal(a.get('weekday'), a.weekday(), 'weekday');
        test.equal(a.get('isoWeekday'), a.isoWeekday(), 'isoWeekday');
        test.equal(a.get('week'), a.week(), 'week');
        test.equal(a.get('isoWeek'), a.isoWeek(), 'isoWeek');
        test.equal(a.get('dayOfYear'), a.dayOfYear(), 'dayOfYear');
        test.done();
    },

    "setters plural" : function (test) {
        test.expect(6);

        var a = momentBuilder();
        a = a.year(2011);
        a = a.months(9);
        a = a.date(12);
        a = a.hours(6);
        a = a.minutes(7);
        a = a.seconds(8);
        a = a.milliseconds(9);
        a = a.freeze();
        test.equal(a.months(), 9, 'months');
        test.equal(a.days(), 12, 'days');
        test.equal(a.hours(), 6, 'hours');
        test.equal(a.minutes(), 7, 'minutes');
        test.equal(a.seconds(), 8, 'seconds');
        test.equal(a.milliseconds(), 9, 'milliseconds');
        test.done();
    },

    "setters singular" : function (test) {
        test.expect(8);

        var a = momentBuilder();
        a = a.year(2011);
        a = a.month(9);
        a = a.date(12);
        a = a.hour(6);
        a = a.minute(7);
        a = a.second(8);
        a = a.millisecond(9);
        a = a.freeze();
        test.equal(a.year(), 2011, 'year');
        test.equal(a.month(), 9, 'month');
        test.equal(a.date(), 12, 'date');
        test.equal(a.day(), 3, 'day');
        test.equal(a.hour(), 6, 'hour');
        test.equal(a.minute(), 7, 'minute');
        test.equal(a.second(), 8, 'second');
        test.equal(a.millisecond(), 9, 'milliseconds');
        test.done();
    },

    "setters" : function (test) {
        test.expect(9);

        var a = momentBuilder();
        a = a.year(2011);
        a = a.month(9);
        a = a.date(12);
        a = a.hours(6);
        a = a.minutes(7);
        a = a.seconds(8);
        a = a.milliseconds(9);
        a = a.freeze();
        test.equal(a.year(), 2011, 'year');
        test.equal(a.month(), 9, 'month');
        test.equal(a.date(), 12, 'date');
        test.equal(a.day(), 3, 'day');
        test.equal(a.hours(), 6, 'hour');
        test.equal(a.minutes(), 7, 'minute');
        test.equal(a.seconds(), 8, 'second');
        test.equal(a.milliseconds(), 9, 'milliseconds');

        // Test month() behavior. See https://github.com/timrwood/frozenMoment/pull/822
        a = momentBuilder('20130531', 'YYYYMMDD');
        a.month(3);
        test.equal(a.freeze().month(), 3, 'month edge case');

        test.done();
    },

    "setter programmatic" : function (test) {
        var a = momentBuilder();
        a = a.set('year', 2011);
        a = a.set('month', 9);
        a = a.set('date', 12);
        a = a.set('hours', 6);
        a = a.set('minutes', 7);
        a = a.set('seconds', 8);
        a = a.set('milliseconds', 9);
        a = a.freeze();
        test.equal(a.year(), 2011, 'year');
        test.equal(a.month(), 9, 'month');
        test.equal(a.date(), 12, 'date');
        test.equal(a.day(), 3, 'day');
        test.equal(a.hours(), 6, 'hour');
        test.equal(a.minutes(), 7, 'minute');
        test.equal(a.seconds(), 8, 'second');
        test.equal(a.milliseconds(), 9, 'milliseconds');

        // Test month() behavior. See https://github.com/timrwood/frozenMoment/pull/822
        a = momentBuilder('20130531', 'YYYYMMDD');
        a = a.month(3).freeze();
        test.equal(a.month(), 3, 'month edge case');

        test.done();
    },

    // Disable this, until we weekYear setter is fixed.
    // https://github.com/moment/moment/issues/1379
    // "setters programatic with weeks" : function (test) {
    //     var a = frozenMoment();
    //     a.set('weekYear', 2001);
    //     a.set('week', 49);
    //     a.set('day', 4);
    //     test.equals(a.weekYear(), 2001);
    //     test.equals(a.week(), 49);
    //     test.equals(a.day(), 4);

    //     a.set('weekday', 1);
    //     test.equals(a.weekday(), 1);

    //     test.done();
    //},

    // I think this suffers from the same issue as the non-iso version.
    // "setters programatic with weeks ISO" : function (test) {
    //     var a = frozenMoment();
    //     a.set('isoWeekYear', 2001);
    //     a.set('isoWeek', 49);
    //     a.set('isoWeekday', 4);

    //     test.equals(a.weekYear(), 2001);
    //     test.equals(a.week(), 49);
    //     test.equals(a.day(), 4);

    //     test.done();
    //},

    "setters strings" : function (test) {
        test.expect(7);

        var a = momentBuilder([2012]).locale('en');
        test.equal(a.day(0).day('Wednesday').freeze().day(), 3, 'day full name');
        test.equal(a.day(0).day('Wed').freeze().day(), 3, 'day short name');
        test.equal(a.day(0).day('We').freeze().day(), 3, 'day minimal name');
        test.equal(a.day(0).day('invalid').freeze().day(), 0, 'invalid day name');
        test.equal(a.month(0).month('April').freeze().month(), 3, 'month full name');
        test.equal(a.month(0).month('Apr').freeze().month(), 3, 'month short name');
        test.equal(a.month(0).month('invalid').freeze().month(), 0, 'invalid month name');
        test.done();
    },

    "setters - falsey values" : function (test) {
        test.expect(1);

        var a = momentBuilder();
        // ensure minutes wasn't coincidentally 0 already
        a = a.minutes(1);
        a = a.minutes(0);
        test.equal(a.freeze().minutes(), 0, 'falsey value');
        test.done();
    },

    "chaining setters" : function (test) {
        test.expect(7);

        var a = momentBuilder().year(2011)
                               .month(9)
                               .date(12)
                               .hours(6)
                               .minutes(7)
                               .seconds(8)
                               .freeze();
        test.equal(a.year(), 2011, 'year');
        test.equal(a.month(), 9, 'month');
        test.equal(a.date(), 12, 'date');
        test.equal(a.day(), 3, 'day');
        test.equal(a.hours(), 6, 'hour');
        test.equal(a.minutes(), 7, 'minute');
        test.equal(a.seconds(), 8, 'second');
        test.done();
    },

    "day setter" : function (test) {
        test.expect(18);

        var a = frozenMoment([2011, 0, 15]);
        test.equal(a.thaw().day(0).freeze().date(), 9, 'set from saturday to sunday');
        test.equal(a.thaw().day(6).freeze().date(), 15, 'set from saturday to saturday');
        test.equal(a.thaw().day(3).freeze().date(), 12, 'set from saturday to wednesday');

        a = frozenMoment([2011, 0, 9]);
        test.equal(a.thaw().day(0).freeze().date(), 9, 'set from sunday to sunday');
        test.equal(a.thaw().day(6).freeze().date(), 15, 'set from sunday to saturday');
        test.equal(a.thaw().day(3).freeze().date(), 12, 'set from sunday to wednesday');

        a = frozenMoment([2011, 0, 12]);
        test.equal(a.thaw().day(0).freeze().date(), 9, 'set from wednesday to sunday');
        test.equal(a.thaw().day(6).freeze().date(), 15, 'set from wednesday to saturday');
        test.equal(a.thaw().day(3).freeze().date(), 12, 'set from wednesday to wednesday');

        test.equal(a.thaw().day(-7).freeze().date(), 2, 'set from wednesday to last sunday');
        test.equal(a.thaw().day(-1).freeze().date(), 8, 'set from wednesday to last saturday');
        test.equal(a.thaw().day(-4).freeze().date(), 5, 'set from wednesday to last wednesday');

        test.equal(a.thaw().day(7).freeze().date(), 16, 'set from wednesday to next sunday');
        test.equal(a.thaw().day(13).freeze().date(), 22, 'set from wednesday to next saturday');
        test.equal(a.thaw().day(10).freeze().date(), 19, 'set from wednesday to next wednesday');

        test.equal(a.thaw().day(14).freeze().date(), 23, 'set from wednesday to second next sunday');
        test.equal(a.thaw().day(20).freeze().date(), 29, 'set from wednesday to second next saturday');
        test.equal(a.thaw().day(17).freeze().date(), 26, 'set from wednesday to second next wednesday');
        test.done();
    }
};

var frozenMoment = require("../../frozen-moment");

exports.invalid = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "invalid" : function (test) {
        var m = frozenMoment.invalid();
        test.equals(m.isValid(), false);
        test.equals(m.parsingFlags().userInvalidated, true);
        test.ok(isNaN(m.valueOf()));
        test.done();
    },

    "invalid with existing flag" : function (test) {
        var m = frozenMoment.invalid({invalidMonth : 'whatchamacallit'});
        test.equals(m.isValid(), false);
        test.equals(m.parsingFlags().userInvalidated, false);
        test.equals(m.parsingFlags().invalidMonth, 'whatchamacallit');
        test.ok(isNaN(m.valueOf()));
        test.done();
    },

    "invalid with custom flag" : function (test) {
        var m = frozenMoment.invalid({tooBusyWith : 'reiculating splines'});
        test.equals(m.isValid(), false);
        test.equals(m.parsingFlags().userInvalidated, false);
        test.equals(m.parsingFlags().tooBusyWith, 'reiculating splines');
        test.ok(isNaN(m.valueOf()));
        test.done();
    }
};

var frozenMoment = require("../../frozen-moment");

exports.isAfter = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "is after without units" : function (test) {
        test.expect(17);

        var m = frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = frozenMoment(m);
        test.equal(m.isAfter(frozenMoment(new Date(2012, 3, 2, 3, 5, 5, 10))), false, "year is later");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 3, 2, 3, 3, 5, 10))), true, "year is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 4, 2, 3, 4, 5, 10))), false, "month is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 2, 2, 3, 4, 5, 10))), true, "month is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 3, 3, 4, 5, 10))), false, "day is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 1, 3, 4, 5, 10))), true, "day is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 4, 4, 5, 10))), false, "hour is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 2, 4, 5, 10))), true, "hour is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 5, 5, 10))), false, "minute is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 3, 5, 10))), true, "minute is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 6, 10))), false, "second is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 4, 11))), true, "second is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, "millisecond match");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 11))), false, "millisecond is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 9))), true, "millisecond is earlier");
        test.equal(m.isAfter(m), false, "frozenMoments are not after themselves");
        test.equal(+m, +mCopy, "isAfter second should not change frozenMoment");
        test.done();
    },

    "is after year" : function (test) {
        test.expect(11);

        var m = frozenMoment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = frozenMoment(m);
        test.equal(m.isAfter(frozenMoment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year'), false, "year match");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 5, 6, 7, 8, 9, 10)), 'years'), true, "plural should work");
        test.equal(m.isAfter(frozenMoment(new Date(2013, 5, 6, 7, 8, 9, 10)), 'year'), false, "year is later");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 5, 6, 7, 8, 9, 10)), 'year'), true, "year is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 0, 1, 0, 0, 0, 0)), 'year'), false, "exact start of year");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 11, 31, 23, 59, 59, 999)), 'year'), false, "exact end of year");
        test.equal(m.isAfter(frozenMoment(new Date(2012, 0, 1, 0, 0, 0, 0)), 'year'), false, "start of next year");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 11, 31, 23, 59, 59, 999)), 'year'), true, "end of previous year");
        test.equal(m.isAfter(frozenMoment(new Date(1980, 11, 31, 23, 59, 59, 999)), 'year'), true, "end of year far before");
        test.equal(m.isAfter(m, 'year'), false, "same frozenMoments are not after the same year");
        test.equal(+m, +mCopy, "isAfter year should not change frozenMoment");
        test.done();
    },

    "is after month" : function (test) {
        test.expect(13);

        var m = frozenMoment(new Date(2011, 2, 3, 4, 5, 6, 7)), mCopy = frozenMoment(m);
        test.equal(m.isAfter(frozenMoment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month'), false, "month match");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 2, 6, 7, 8, 9, 10)), 'months'), true, "plural should work");
        test.equal(m.isAfter(frozenMoment(new Date(2012, 2, 6, 7, 8, 9, 10)), 'month'), false, "year is later");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 2, 6, 7, 8, 9, 10)), 'month'), true, "year is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'month'), false, "month is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 1, 6, 7, 8, 9, 10)), 'month'), true, "month is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month'), false, "exact start of month");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 2, 31, 23, 59, 59, 999)), 'month'), false, "exact end of month");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 1, 0, 0, 0, 0)), 'month'), false, "start of next month");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 1, 27, 23, 59, 59, 999)), 'month'), true, "end of previous month");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 12, 31, 23, 59, 59, 999)), 'month'), true, "later month but earlier year");
        test.equal(m.isAfter(m, 'month'), false, "same frozenMoments are not after the same month");
        test.equal(+m, +mCopy, "isAfter month should not change frozenMoment");
        test.done();
    },

    "is after day" : function (test) {
        test.expect(15);

        var m = frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 6)), mCopy = frozenMoment(m);
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 7, 8, 9, 10)), 'day'), false, "day match");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 3, 2, 7, 8, 9, 10)), 'days'), true, "plural should work");
        test.equal(m.isAfter(frozenMoment(new Date(2012, 3, 2, 7, 8, 9, 10)), 'day'), false, "year is later");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 3, 2, 7, 8, 9, 10)), 'day'), true, "year is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 4, 2, 7, 8, 9, 10)), 'day'), false, "month is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 2, 2, 7, 8, 9, 10)), 'day'), true, "month is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 3, 7, 8, 9, 10)), 'day'), false, "day is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 1, 7, 8, 9, 10)), 'day'), true, "day is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 0, 0, 0, 0)), 'day'), false, "exact start of day");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 23, 59, 59, 999)), 'day'), false, "exact end of day");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 3, 0, 0, 0, 0)), 'day'), false, "start of next day");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 1, 23, 59, 59, 999)), 'day'), true, "end of previous day");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 3, 10, 0, 0, 0, 0)), 'day'), true, "later day but earlier year");
        test.equal(m.isAfter(m, 'day'), false, "same frozenMoments are not after the same day");
        test.equal(+m, +mCopy, "isAfter day should not change frozenMoment");
        test.done();
    },

    "is after hour" : function (test) {
        test.expect(16);

        var m = frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 6)), mCopy = frozenMoment(m);
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 8, 9, 10)), 'hour'), false, "hour match");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 3, 2, 3, 8, 9, 10)), 'hours'), true, "plural should work");
        test.equal(m.isAfter(frozenMoment(new Date(2012, 3, 2, 3, 8, 9, 10)), 'hour'), false, "year is later");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 3, 2, 3, 8, 9, 10)), 'hour'), true, "year is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 4, 2, 3, 8, 9, 10)), 'hour'), false, "month is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hour'), true, "month is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 3, 3, 8, 9, 10)), 'hour'), false, "day is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 1, 3, 8, 9, 10)), 'hour'), true, "day is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 4, 8, 9, 10)), 'hour'), false, "hour is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 8, 9, 10)), 'hour'), false, "hour is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 0, 0, 0)), 'hour'), false, "exact start of hour");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 59, 59, 999)), 'hour'), false, "exact end of hour");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 4, 0, 0, 0)), 'hour'), false, "start of next hour");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 2, 59, 59, 999)), 'hour'), true, "end of previous hour");
        test.equal(m.isAfter(m, 'hour'), false, "same frozenMoments are not after the same hour");
        test.equal(+m, +mCopy, "isAfter hour should not change frozenMoment");
        test.done();
    },

    "is after minute" : function (test) {
        test.expect(18);

        var m = frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 6)), mCopy = frozenMoment(m);
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 9, 10)), 'minute'), false, "minute match");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 3, 2, 3, 4, 9, 10)), 'minutes'), true, "plural should work");
        test.equal(m.isAfter(frozenMoment(new Date(2012, 3, 2, 3, 4, 9, 10)), 'minute'), false, "year is later");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 3, 2, 3, 4, 9, 10)), 'minute'), true, "year is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 4, 2, 3, 4, 9, 10)), 'minute'), false, "month is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 2, 2, 3, 4, 9, 10)), 'minute'), true, "month is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 3, 3, 4, 9, 10)), 'minute'), false, "day is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 1, 3, 4, 9, 10)), 'minute'), true, "day is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 4, 4, 9, 10)), 'minute'), false, "hour is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 2, 4, 9, 10)), 'minute'), true, "hour is earler");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 5, 9, 10)), 'minute'), false, "minute is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 3, 9, 10)), 'minute'), true, "minute is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 0, 0)), 'minute'), false, "exact start of minute");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 59, 999)), 'minute'), false, "exact end of minute");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 5, 0, 0)), 'minute'), false, "start of next minute");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 3, 59, 999)), 'minute'), true, "end of previous minute");
        test.equal(m.isAfter(m, 'minute'), false, "same frozenMoments are not after the same minute");
        test.equal(+m, +mCopy, "isAfter minute should not change frozenMoment");
        test.done();
    },

    "is after second" : function (test) {
        test.expect(20);

        var m = frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = frozenMoment(m);
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'second'), false, "second match");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'seconds'), true, "plural should work");
        test.equal(m.isAfter(frozenMoment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'second'), false, "year is later");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'second'), true, "year is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 4, 2, 3, 4, 5, 10)), 'second'), false, "month is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'second'), true, "month is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 3, 3, 4, 5, 10)), 'second'), false, "day is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 1, 1, 4, 5, 10)), 'second'), true, "day is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 4, 4, 5, 10)), 'second'), false, "hour is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 1, 4, 1, 5, 10)), 'second'), true, "hour is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 5, 5, 10)), 'second'), false, "minute is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 3, 5, 10)), 'second'), true, "minute is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 6, 10)), 'second'), false, "second is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 4, 5)), 'second'), true, "second is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 0)), 'second'), false, "exact start of second");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 999)), 'second'), false, "exact end of second");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 6, 0)), 'second'), false, "start of next second");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 4, 999)), 'second'), true, "end of previous second");
        test.equal(m.isAfter(m, 'second'), false, "same frozenMoments are not after the same second");
        test.equal(+m, +mCopy, "isAfter second should not change frozenMoment");
        test.done();
    },

    "is after millisecond" : function (test) {
        test.expect(18);

        var m = frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = frozenMoment(m);
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'millisecond'), false, "millisecond match");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'milliseconds'), true, "plural should work");
        test.equal(m.isAfter(frozenMoment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'millisecond'), false, "year is later");
        test.equal(m.isAfter(frozenMoment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'millisecond'), true, "year is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 4, 2, 3, 4, 5, 10)), 'millisecond'), false, "month is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'millisecond'), true, "month is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 3, 3, 4, 5, 10)), 'millisecond'), false, "day is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 1, 1, 4, 5, 10)), 'millisecond'), true, "day is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 4, 4, 5, 10)), 'millisecond'), false, "hour is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 1, 4, 1, 5, 10)), 'millisecond'), true, "hour is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 5, 5, 10)), 'millisecond'), false, "minute is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 3, 5, 10)), 'millisecond'), true, "minute is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 6, 10)), 'millisecond'), false, "second is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 4, 5)), 'millisecond'), true, "second is earlier");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 6, 11)), 'millisecond'), false, "millisecond is later");
        test.equal(m.isAfter(frozenMoment(new Date(2011, 3, 2, 3, 4, 4, 9)), 'millisecond'), true, "millisecond is earlier");
        test.equal(m.isAfter(m, 'millisecond'), false, "same frozenMoments are not after the same millisecond");
        test.equal(+m, +mCopy, "isAfter millisecond should not change frozenMoment");
        test.done();
    }

};

var frozenMoment = require("../../frozen-moment");

exports.isBefore = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "is after without units" : function (test) {
        test.expect(17);

        var m = frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = frozenMoment(m);
        test.equal(m.isBefore(frozenMoment(new Date(2012, 3, 2, 3, 5, 5, 10))), true, "year is later");
        test.equal(m.isBefore(frozenMoment(new Date(2010, 3, 2, 3, 3, 5, 10))), false, "year is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 4, 2, 3, 4, 5, 10))), true, "month is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 2, 2, 3, 4, 5, 10))), false, "month is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 3, 3, 4, 5, 10))), true, "day is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 1, 3, 4, 5, 10))), false, "day is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 4, 4, 5, 10))), true, "hour is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 2, 4, 5, 10))), false, "hour is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 5, 5, 10))), true, "minute is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 3, 5, 10))), false, "minute is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 6, 10))), true, "second is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 4, 11))), false, "second is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, "millisecond match");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 11))), true, "millisecond is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 9))), false, "millisecond is earlier");
        test.equal(m.isBefore(m), false, "frozenMoments are not before themselves");
        test.equal(+m, +mCopy, "isBefore second should not change frozenMoment");
        test.done();
    },

    "is before year" : function (test) {
        test.expect(11);

        var m = frozenMoment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = frozenMoment(m);
        test.equal(m.isBefore(frozenMoment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year'), false, "year match");
        test.equal(m.isBefore(frozenMoment(new Date(2012, 5, 6, 7, 8, 9, 10)), 'years'), true, "plural should work");
        test.equal(m.isBefore(frozenMoment(new Date(2013, 5, 6, 7, 8, 9, 10)), 'year'), true, "year is later");
        test.equal(m.isBefore(frozenMoment(new Date(2010, 5, 6, 7, 8, 9, 10)), 'year'), false, "year is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 0, 1, 0, 0, 0, 0)), 'year'), false, "exact start of year");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 11, 31, 23, 59, 59, 999)), 'year'), false, "exact end of year");
        test.equal(m.isBefore(frozenMoment(new Date(2012, 0, 1, 0, 0, 0, 0)), 'year'), true, "start of next year");
        test.equal(m.isBefore(frozenMoment(new Date(2010, 11, 31, 23, 59, 59, 999)), 'year'), false, "end of previous year");
        test.equal(m.isBefore(frozenMoment(new Date(1980, 11, 31, 23, 59, 59, 999)), 'year'), false, "end of year far before");
        test.equal(m.isBefore(m, 'year'), false, "same frozenMoments are not before the same year");
        test.equal(+m, +mCopy, "isBefore year should not change frozenMoment");
        test.done();
    },

    "is before month" : function (test) {
        test.expect(13);

        var m = frozenMoment(new Date(2011, 2, 3, 4, 5, 6, 7)), mCopy = frozenMoment(m);
        test.equal(m.isBefore(frozenMoment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month'), false, "month match");
        test.equal(m.isBefore(frozenMoment(new Date(2012, 2, 6, 7, 8, 9, 10)), 'months'), true, "plural should work");
        test.equal(m.isBefore(frozenMoment(new Date(2012, 2, 6, 7, 8, 9, 10)), 'month'), true, "year is later");
        test.equal(m.isBefore(frozenMoment(new Date(2010, 2, 6, 7, 8, 9, 10)), 'month'), false, "year is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'month'), true, "month is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 1, 6, 7, 8, 9, 10)), 'month'), false, "month is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month'), false, "exact start of month");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 2, 31, 23, 59, 59, 999)), 'month'), false, "exact end of month");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 1, 0, 0, 0, 0)), 'month'), true, "start of next month");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 1, 27, 23, 59, 59, 999)), 'month'), false, "end of previous month");
        test.equal(m.isBefore(frozenMoment(new Date(2010, 12, 31, 23, 59, 59, 999)), 'month'), false, "later month but earlier year");
        test.equal(m.isBefore(m, 'month'), false, "same frozenMoments are not before the same month");
        test.equal(+m, +mCopy, "isBefore month should not change frozenMoment");
        test.done();
    },

    "is before day" : function (test) {
        test.expect(15);

        var m = frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 6)), mCopy = frozenMoment(m);
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 7, 8, 9, 10)), 'day'), false, "day match");
        test.equal(m.isBefore(frozenMoment(new Date(2012, 3, 2, 7, 8, 9, 10)), 'days'), true, "plural should work");
        test.equal(m.isBefore(frozenMoment(new Date(2012, 3, 2, 7, 8, 9, 10)), 'day'), true, "year is later");
        test.equal(m.isBefore(frozenMoment(new Date(2010, 3, 2, 7, 8, 9, 10)), 'day'), false, "year is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 4, 2, 7, 8, 9, 10)), 'day'), true, "month is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 2, 2, 7, 8, 9, 10)), 'day'), false, "month is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 3, 7, 8, 9, 10)), 'day'), true, "day is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 1, 7, 8, 9, 10)), 'day'), false, "day is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 0, 0, 0, 0)), 'day'), false, "exact start of day");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 23, 59, 59, 999)), 'day'), false, "exact end of day");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 3, 0, 0, 0, 0)), 'day'), true, "start of next day");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 1, 23, 59, 59, 999)), 'day'), false, "end of previous day");
        test.equal(m.isBefore(frozenMoment(new Date(2010, 3, 10, 0, 0, 0, 0)), 'day'), false, "later day but earlier year");
        test.equal(m.isBefore(m, 'day'), false, "same frozenMoments are not before the same day");
        test.equal(+m, +mCopy, "isBefore day should not change frozenMoment");
        test.done();
    },

    "is before hour" : function (test) {
        test.expect(16);

        var m = frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 6)), mCopy = frozenMoment(m);
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 8, 9, 10)), 'hour'), false, "hour match");
        test.equal(m.isBefore(frozenMoment(new Date(2012, 3, 2, 3, 8, 9, 10)), 'hours'), true, "plural should work");
        test.equal(m.isBefore(frozenMoment(new Date(2012, 3, 2, 3, 8, 9, 10)), 'hour'), true, "year is later");
        test.equal(m.isBefore(frozenMoment(new Date(2010, 3, 2, 3, 8, 9, 10)), 'hour'), false, "year is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 4, 2, 3, 8, 9, 10)), 'hour'), true, "month is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hour'), false, "month is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 3, 3, 8, 9, 10)), 'hour'), true, "day is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 1, 3, 8, 9, 10)), 'hour'), false, "day is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 4, 8, 9, 10)), 'hour'), true, "hour is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 8, 9, 10)), 'hour'), false, "hour is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 0, 0, 0)), 'hour'), false, "exact start of hour");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 59, 59, 999)), 'hour'), false, "exact end of hour");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 4, 0, 0, 0)), 'hour'), true, "start of next hour");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 2, 59, 59, 999)), 'hour'), false, "end of previous hour");
        test.equal(m.isBefore(m, 'hour'), false, "same frozenMoments are not before the same hour");
        test.equal(+m, +mCopy, "isBefore hour should not change frozenMoment");
        test.done();
    },

    "is before minute" : function (test) {
        test.expect(18);

        var m = frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 6)), mCopy = frozenMoment(m);
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 9, 10)), 'minute'), false, "minute match");
        test.equal(m.isBefore(frozenMoment(new Date(2012, 3, 2, 3, 4, 9, 10)), 'minutes'), true, "plural should work");
        test.equal(m.isBefore(frozenMoment(new Date(2012, 3, 2, 3, 4, 9, 10)), 'minute'), true, "year is later");
        test.equal(m.isBefore(frozenMoment(new Date(2010, 3, 2, 3, 4, 9, 10)), 'minute'), false, "year is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 4, 2, 3, 4, 9, 10)), 'minute'), true, "month is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 2, 2, 3, 4, 9, 10)), 'minute'), false, "month is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 3, 3, 4, 9, 10)), 'minute'), true, "day is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 1, 3, 4, 9, 10)), 'minute'), false, "day is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 4, 4, 9, 10)), 'minute'), true, "hour is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 2, 4, 9, 10)), 'minute'), false, "hour is earler");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 5, 9, 10)), 'minute'), true, "minute is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 3, 9, 10)), 'minute'), false, "minute is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 0, 0)), 'minute'), false, "exact start of minute");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 59, 999)), 'minute'), false, "exact end of minute");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 5, 0, 0)), 'minute'), true, "start of next minute");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 3, 59, 999)), 'minute'), false, "end of previous minute");
        test.equal(m.isBefore(m, 'minute'), false, "same frozenMoments are not before the same minute");
        test.equal(+m, +mCopy, "isBefore minute should not change frozenMoment");
        test.done();
    },

    "is before second" : function (test) {
        test.expect(20);

        var m = frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = frozenMoment(m);
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'second'), false, "second match");
        test.equal(m.isBefore(frozenMoment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'seconds'), true, "plural should work");
        test.equal(m.isBefore(frozenMoment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'second'), true, "year is later");
        test.equal(m.isBefore(frozenMoment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'second'), false, "year is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 4, 2, 3, 4, 5, 10)), 'second'), true, "month is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'second'), false, "month is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 3, 3, 4, 5, 10)), 'second'), true, "day is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 1, 1, 4, 5, 10)), 'second'), false, "day is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 4, 4, 5, 10)), 'second'), true, "hour is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 1, 4, 1, 5, 10)), 'second'), false, "hour is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 5, 5, 10)), 'second'), true, "minute is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 3, 5, 10)), 'second'), false, "minute is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 6, 10)), 'second'), true, "second is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 4, 5)), 'second'), false, "second is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 0)), 'second'), false, "exact start of second");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 999)), 'second'), false, "exact end of second");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 6, 0)), 'second'), true, "start of next second");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 4, 999)), 'second'), false, "end of previous second");
        test.equal(m.isBefore(m, 'second'), false, "same frozenMoments are not before the same second");
        test.equal(+m, +mCopy, "isBefore second should not change frozenMoment");
        test.done();
    },

    "is before millisecond" : function (test) {
        test.expect(18);

        var m = frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = frozenMoment(m);
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'millisecond'), false, "millisecond match");
        test.equal(m.isBefore(frozenMoment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'milliseconds'), false, "plural should work");
        test.equal(m.isBefore(frozenMoment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'millisecond'), true, "year is later");
        test.equal(m.isBefore(frozenMoment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'millisecond'), false, "year is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 4, 2, 3, 4, 5, 10)), 'millisecond'), true, "month is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'millisecond'), false, "month is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 3, 3, 4, 5, 10)), 'millisecond'), true, "day is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 1, 1, 4, 5, 10)), 'millisecond'), false, "day is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 4, 4, 5, 10)), 'millisecond'), true, "hour is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 1, 4, 1, 5, 10)), 'millisecond'), false, "hour is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 5, 5, 10)), 'millisecond'), true, "minute is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 3, 5, 10)), 'millisecond'), false, "minute is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 6, 10)), 'millisecond'), true, "second is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 4, 5)), 'millisecond'), false, "second is earlier");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 6, 11)), 'millisecond'), true, "millisecond is later");
        test.equal(m.isBefore(frozenMoment(new Date(2011, 3, 2, 3, 4, 4, 9)), 'millisecond'), false, "millisecond is earlier");
        test.equal(m.isBefore(m, 'millisecond'), false, "same frozenMoments are not before the same millisecond");
        test.equal(+m, +mCopy, "isBefore millisecond should not change frozenMoment");
        test.done();
    }
};

var frozenMoment = require('../../frozen-moment');

exports.isMoment = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "is frozenMoment object": function (test) {
        test.expect(13);

        var MyObj = function () {},
            extend = function (a, b) {
                var i;
                for (i in b) {
                    a[i] = b[i];
                }
                return a;
            };
        MyObj.prototype.toDate = function () {
            return new Date();
        };

        test.ok(frozenMoment.isMoment(frozenMoment()), 'simple frozenMoment object');
        test.ok(frozenMoment.isMoment(frozenMoment(null)), 'invalid frozenMoment object');
        test.ok(frozenMoment.isMoment(extend({}, frozenMoment())), 'externally cloned frozenMoments are frozenMoments');
        test.ok(frozenMoment.isMoment(extend({}, frozenMoment.utc())), 'externally cloned utc frozenMoments are frozenMoments');

        test.ok(!frozenMoment.isMoment(new MyObj()), 'myObj is not frozenMoment object');
        test.ok(!frozenMoment.isMoment(frozenMoment), 'frozenMoment function is not frozenMoment object');
        test.ok(!frozenMoment.isMoment(new Date()), 'date object is not frozenMoment object');
        test.ok(!frozenMoment.isMoment(Object), 'Object is not frozenMoment object');
        test.ok(!frozenMoment.isMoment('foo'), 'string is not frozenMoment object');
        test.ok(!frozenMoment.isMoment(1), 'number is not frozenMoment object');
        test.ok(!frozenMoment.isMoment(NaN), 'NaN is not frozenMoment object');
        test.ok(!frozenMoment.isMoment(null), 'null is not frozenMoment object');
        test.ok(!frozenMoment.isMoment(undefined), 'undefined is not frozenMoment object');

        test.done();
    }
};

var frozenMoment = require("../../frozen-moment");

exports.isSame = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "is same without units" : function (test) {
        test.expect(17);

        var m = frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = frozenMoment(m);
        test.equal(m.isSame(frozenMoment(new Date(2012, 3, 2, 3, 5, 5, 10))), false, "year is later");
        test.equal(m.isSame(frozenMoment(new Date(2010, 3, 2, 3, 3, 5, 10))), false, "year is earlier");
        test.equal(m.isSame(frozenMoment(new Date(2011, 4, 2, 3, 4, 5, 10))), false, "month is later");
        test.equal(m.isSame(frozenMoment(new Date(2011, 2, 2, 3, 4, 5, 10))), false, "month is earlier");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 3, 3, 4, 5, 10))), false, "day is later");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 1, 3, 4, 5, 10))), false, "day is earlier");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 4, 4, 5, 10))), false, "hour is later");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 2, 4, 5, 10))), false, "hour is earlier");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 3, 5, 5, 10))), false, "minute is later");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 3, 3, 5, 10))), false, "minute is earlier");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 3, 4, 6, 10))), false, "second is later");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 3, 4, 4, 11))), false, "second is earlier");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 10))), true, "millisecond match");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 11))), false, "millisecond is later");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 9))), false, "millisecond is earlier");
        test.equal(m.isSame(m), true, "frozenMoments are the same as themselves");
        test.equal(+m, +mCopy, "isSame second should not change frozenMoment");
        test.done();
    },

    "is same year" : function (test) {
        test.expect(9);

        var m = frozenMoment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = frozenMoment(m);
        test.equal(m.isSame(frozenMoment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year'), true, "year match");
        test.equal(m.isSame(frozenMoment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'years'), true, "plural should work");
        test.equal(m.isSame(frozenMoment(new Date(2012, 5, 6, 7, 8, 9, 10)), 'year'), false, "year mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 0, 1, 0, 0, 0, 0)), 'year'), true, "exact start of year");
        test.equal(m.isSame(frozenMoment(new Date(2011, 11, 31, 23, 59, 59, 999)), 'year'), true, "exact end of year");
        test.equal(m.isSame(frozenMoment(new Date(2012, 0, 1, 0, 0, 0, 0)), 'year'), false, "start of next year");
        test.equal(m.isSame(frozenMoment(new Date(2010, 11, 31, 23, 59, 59, 999)), 'year'), false, "end of previous year");
        test.equal(m.isSame(m, 'year'), true, "same frozenMoments are in the same year");
        test.equal(+m, +mCopy, "isSame year should not change frozenMoment");
        test.done();
    },

    "is same month" : function (test) {
        test.expect(10);

        var m = frozenMoment(new Date(2011, 2, 3, 4, 5, 6, 7)), mCopy = frozenMoment(m);
        test.equal(m.isSame(frozenMoment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month'), true, "month match");
        test.equal(m.isSame(frozenMoment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'months'), true, "plural should work");
        test.equal(m.isSame(frozenMoment(new Date(2012, 2, 6, 7, 8, 9, 10)), 'month'), false, "year mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'month'), false, "month mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month'), true, "exact start of month");
        test.equal(m.isSame(frozenMoment(new Date(2011, 2, 31, 23, 59, 59, 999)), 'month'), true, "exact end of month");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 1, 0, 0, 0, 0)), 'month'), false, "start of next month");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 27, 23, 59, 59, 999)), 'month'), false, "end of previous month");
        test.equal(m.isSame(m, 'month'), true, "same frozenMoments are in the same month");
        test.equal(+m, +mCopy, "isSame month should not change frozenMoment");
        test.done();
    },

    "is same day" : function (test) {
        test.expect(11);

        var m = frozenMoment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = frozenMoment(m);
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'day'), true, "day match");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'days'), true, "plural should work");
        test.equal(m.isSame(frozenMoment(new Date(2012, 1, 2, 7, 8, 9, 10)), 'day'), false, "year mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 2, 2, 7, 8, 9, 10)), 'day'), false, "month mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 3, 7, 8, 9, 10)), 'day'), false, "day mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 0, 0, 0, 0)), 'day'), true, "exact start of day");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 23, 59, 59, 999)), 'day'), true, "exact end of day");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 3, 0, 0, 0, 0)), 'day'), false, "start of next day");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 1, 23, 59, 59, 999)), 'day'), false, "end of previous day");
        test.equal(m.isSame(m, 'day'), true, "same frozenMoments are in the same day");
        test.equal(+m, +mCopy, "isSame day should not change frozenMoment");
        test.done();
    },

    "is same hour" : function (test) {
        test.expect(12);

        var m = frozenMoment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = frozenMoment(m);
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hour'), true, "hour match");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hours'), true, "plural should work");
        test.equal(m.isSame(frozenMoment(new Date(2012, 1, 2, 3, 8, 9, 10)), 'hour'), false, "year mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 2, 2, 3, 8, 9, 10)), 'hour'), false, "month mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 3, 3, 8, 9, 10)), 'hour'), false, "day mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 4, 8, 9, 10)), 'hour'), false, "hour mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 0, 0, 0)), 'hour'), true, "exact start of hour");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 59, 59, 999)), 'hour'), true, "exact end of hour");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 4, 0, 0, 0)), 'hour'), false, "start of next hour");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 2, 59, 59, 999)), 'hour'), false, "end of previous hour");
        test.equal(m.isSame(m, 'hour'), true, "same frozenMoments are in the same hour");
        test.equal(+m, +mCopy, "isSame hour should not change frozenMoment");
        test.done();
    },

    "is same minute" : function (test) {
        test.expect(13);

        var m = frozenMoment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = frozenMoment(m);
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minute'), true, "minute match");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minutes'), true, "plural should work");
        test.equal(m.isSame(frozenMoment(new Date(2012, 1, 2, 3, 4, 9, 10)), 'minute'), false, "year mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 2, 2, 3, 4, 9, 10)), 'minute'), false, "month mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 3, 3, 4, 9, 10)), 'minute'), false, "day mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 4, 4, 9, 10)), 'minute'), false, "hour mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 5, 9, 10)), 'minute'), false, "minute mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 4, 0, 0)), 'minute'), true, "exact start of minute");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 4, 59, 999)), 'minute'), true, "exact end of minute");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 5, 0, 0)), 'minute'), false, "start of next minute");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 3, 59, 999)), 'minute'), false, "end of previous minute");
        test.equal(m.isSame(m, 'minute'), true, "same frozenMoments are in the same minute");
        test.equal(+m, +mCopy, "isSame minute should not change frozenMoment");
        test.done();
    },

    "is same second" : function (test) {
        test.expect(14);

        var m = frozenMoment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = frozenMoment(m);
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 4, 5, 10)), 'second'), true, "second match");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 4, 5, 10)), 'seconds'), true, "plural should work");
        test.equal(m.isSame(frozenMoment(new Date(2012, 1, 2, 3, 4, 5, 10)), 'second'), false, "year mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'second'), false, "month mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 3, 3, 4, 5, 10)), 'second'), false, "day mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 4, 4, 5, 10)), 'second'), false, "hour mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 5, 5, 10)), 'second'), false, "minute mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 4, 6, 10)), 'second'), false, "second mismatch");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 4, 5, 0)), 'second'), true, "exact start of second");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 4, 5, 999)), 'second'), true, "exact end of second");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 4, 6, 0)), 'second'), false, "start of next second");
        test.equal(m.isSame(frozenMoment(new Date(2011, 1, 2, 3, 4, 4, 999)), 'second'), false, "end of previous second");
        test.equal(m.isSame(m, 'second'), true, "same frozenMoments are in the same second");
        test.equal(+m, +mCopy, "isSame second should not change frozenMoment");
        test.done();
    },

    "is same millisecond" : function (test) {
        test.expect(18);

        var m = frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = frozenMoment(m);
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'millisecond'), true, "millisecond match");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'milliseconds'), true, "plural should work");
        test.equal(m.isSame(frozenMoment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'millisecond'), false, "year is later");
        test.equal(m.isSame(frozenMoment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'millisecond'), false, "year is earlier");
        test.equal(m.isSame(frozenMoment(new Date(2011, 4, 2, 3, 4, 5, 10)), 'millisecond'), false, "month is later");
        test.equal(m.isSame(frozenMoment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'millisecond'), false, "month is earlier");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 3, 3, 4, 5, 10)), 'millisecond'), false, "day is later");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 1, 1, 4, 5, 10)), 'millisecond'), false, "day is earlier");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 4, 4, 5, 10)), 'millisecond'), false, "hour is later");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 1, 4, 1, 5, 10)), 'millisecond'), false, "hour is earlier");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 3, 5, 5, 10)), 'millisecond'), false, "minute is later");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 3, 3, 5, 10)), 'millisecond'), false, "minute is earlier");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 3, 4, 6, 10)), 'millisecond'), false, "second is later");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 3, 4, 4, 5)), 'millisecond'), false, "second is earlier");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 3, 4, 6, 11)), 'millisecond'), false, "millisecond is later");
        test.equal(m.isSame(frozenMoment(new Date(2011, 3, 2, 3, 4, 4, 9)), 'millisecond'), false, "millisecond is earlier");
        test.equal(m.isSame(m, 'millisecond'), true, "same frozenMoments are in the same millisecond");
        test.equal(+m, +mCopy, "isSame millisecond should not change frozenMoment");
        test.done();
    },

    "is same with zone'd frozenMoments" : function (test) {
        test.expect(3);
        test.ok(frozenMoment.build.parseZone('2013-02-01T-05:00').freeze().isSame(frozenMoment('2013-02-01'), 'year'), "zoned vs local frozenMoment");
        test.ok(frozenMoment('2013-02-01').isSame(frozenMoment('2013-02-01').thaw().zone('-05:00').freeze(), 'year'), "local vs zoned frozenMoment");
        test.ok(frozenMoment.build.parseZone('2013-02-01T-05:00').freeze().isSame(frozenMoment.build.parseZone('2013-02-01T-06:30'), 'year'),
                "zoned vs (differently) zoned frozenMoment");
        test.done();
    }
};

var frozenMoment = require("../../frozen-moment");

exports.isValid = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "array bad month" : function (test) {
        test.expect(2);
        test.equal(frozenMoment([2010, -1]).isValid(), false, 'month -1 invalid');
        test.equal(frozenMoment([2100, 12]).isValid(), false, 'month 12 invalid');

        test.done();
    },

    "array good month" : function (test) {
        test.expect(12 * 2);

        for (var i = 0; i < 12; i++) {
            test.equal(frozenMoment([2010, i]).isValid(), true, 'month ' + i);
            test.equal(frozenMoment.utc([2010, i]).isValid(), true, 'month ' + i);
        }

        test.done();
    },

    "array bad date" : function (test) {
        var tests = [
            frozenMoment([2010, 0, 0]),
            frozenMoment([2100, 0, 32]),
            frozenMoment.utc([2010, 0, 0]),
            frozenMoment.utc([2100, 0, 32])
        ],
        i, m;

        test.expect(tests.length);

        for (i in tests) {
            m = tests[i];
            test.equal(m.isValid(), false);
        }

        test.done();
    },

    "array bad date leap year" : function (test) {
        test.expect(8);

        test.equal(frozenMoment([2010, 1, 29]).isValid(), false, '2010 feb 29');
        test.equal(frozenMoment([2100, 1, 29]).isValid(), false, '2100 feb 29');
        test.equal(frozenMoment([2008, 1, 30]).isValid(), false, '2008 feb 30');
        test.equal(frozenMoment([2000, 1, 30]).isValid(), false, '2000 feb 30');

        test.equal(frozenMoment.utc([2010, 1, 29]).isValid(), false, 'utc 2010 feb 29');
        test.equal(frozenMoment.utc([2100, 1, 29]).isValid(), false, 'utc 2100 feb 29');
        test.equal(frozenMoment.utc([2008, 1, 30]).isValid(), false, 'utc 2008 feb 30');
        test.equal(frozenMoment.utc([2000, 1, 30]).isValid(), false, 'utc 2000 feb 30');

        test.done();
    },

    "string + formats bad date" : function (test) {
        test.equal(frozenMoment('2020-00-00', []).isValid(), false, 'invalid on empty array');
        test.equal(frozenMoment('2020-00-00', ['YYYY-MM-DD', 'DD-MM-YYYY']).isValid(), false, 'invalid on all in array');
        test.equal(frozenMoment('2020-00-00', ['DD-MM-YYYY', 'YYYY-MM-DD']).isValid(), false, 'invalid on all in array');
        test.equal(frozenMoment('2020-01-01', ['YYYY-MM-DD', 'DD-MM-YYYY']).isValid(), true, 'valid on first');
        test.equal(frozenMoment('2020-01-01', ['DD-MM-YYYY', 'YYYY-MM-DD']).isValid(), true, 'valid on last');
        test.equal(frozenMoment('2020-01-01', ['YYYY-MM-DD', 'YYYY-DD-MM']).isValid(), true, 'valid on both');
        test.equal(frozenMoment('2020-13-01', ['YYYY-MM-DD', 'YYYY-DD-MM']).isValid(), true, 'valid on last');

        test.equal(frozenMoment('12-13-2012', ['DD-MM-YYYY', 'YYYY-MM-DD']).isValid(), false, 'month rollover');
        test.equal(frozenMoment('12-13-2012', ['DD-MM-YYYY', 'DD-MM-YYYY']).isValid(), false, 'month rollover');
        test.equal(frozenMoment('38-12-2012', ['DD-MM-YYYY']).isValid(), false, 'day rollover');

        test.done();
    },

    "string nonsensical with format" : function (test) {
        test.expect(2);

        test.equal(frozenMoment('fail', "MM-DD-YYYY").isValid(), false, 'string "fail" with format "MM-DD-YYYY"');
        test.equal(frozenMoment("xx-xx-2001", 'DD-MM-YYY').isValid(), true, 'string "xx-xx-2001" with format "MM-DD-YYYY"');
        test.done();
    },

    "string with bad month name" : function (test) {
        test.expect(2);

        frozenMoment.locale('en');

        test.equal(frozenMoment('01-Nam-2012', 'DD-MMM-YYYY').isValid(), false, '"Nam" is an invalid month');
        test.equal(frozenMoment('01-Aug-2012', 'DD-MMM-YYYY').isValid(), true, '"Aug" is a valid month');

        test.done();
    },

    "string with spaceless format" : function (test) {
        test.expect(1);

        test.equal(frozenMoment('10Sep2001', 'DDMMMYYYY').isValid(), true, "Parsing 10Sep2001 should result in a valid date");

        test.done();
    },

    "invalid string iso 8601" : function (test) {
        var tests = [
            '2010-00-00',
            '2010-01-00',
            '2010-01-40',
            '2010-01-01T24',
            '2010-01-01T23:60',
            '2010-01-01T23:59:60'
        ], i;

        test.expect(tests.length * 2);

        for (i = 0; i < tests.length; i++) {
            test.equal(frozenMoment(tests[i]).isValid(), false, tests[i] + ' should be invalid');
            test.equal(frozenMoment.utc(tests[i]).isValid(), false, tests[i] + ' should be invalid');
        }
        test.done();
    },

    "invalid string iso 8601 + timezone" : function (test) {
        var tests = [
            '2010-00-00T+00:00',
            '2010-01-00T+00:00',
            '2010-01-40T+00:00',
            '2010-01-40T24+00:00',
            '2010-01-40T23:60+00:00',
            '2010-01-40T23:59:60+00:00',
            '2010-01-40T23:59:59.9999+00:00'
        ], i;

        test.expect(tests.length * 2);

        for (i = 0; i < tests.length; i++) {
            test.equal(frozenMoment(tests[i]).isValid(), false, tests[i] + ' should be invalid');
            test.equal(frozenMoment.utc(tests[i]).isValid(), false, tests[i] + ' should be invalid');
        }
        test.done();
    },

    "valid string iso 8601 + timezone" : function (test) {
        var tests = [
            '2010-01-01',
            '2010-01-30',
            '2010-01-30T23+00:00',
            '2010-01-30T23:59+00:00',
            '2010-01-30T23:59:59+00:00',
            '2010-01-30T23:59:59.999+00:00',
            '2010-01-30T23:59:59.999-07:00',
            '2010-01-30T00:00:00.000+07:00',
            '2010-01-30T00:00:00.000+07'
        ], i;

        test.expect(tests.length * 2);

        for (i = 0; i < tests.length; i++) {
            test.equal(frozenMoment(tests[i]).isValid(), true, tests[i] + ' should be valid');
            test.equal(frozenMoment.utc(tests[i]).isValid(), true, tests[i] + ' should be valid');
        }
        test.done();
    },

    "invalidAt" : function (test) {
        test.expect(7);
        test.equal(frozenMoment([2000, 12]).invalidAt(), 1, 'month 12 is invalid: 0-11');
        test.equal(frozenMoment([2000, 1, 30]).invalidAt(), 2, '30 is not a valid february day');
        test.equal(frozenMoment([2000, 1, 29, 24]).invalidAt(), 3, '24 is invalid hour');
        test.equal(frozenMoment([2000, 1, 29, 23, 60]).invalidAt(), 4, '60 is invalid minute');
        test.equal(frozenMoment([2000, 1, 29, 23, 59, 60]).invalidAt(), 5, '60 is invalid second');
        test.equal(frozenMoment([2000, 1, 29, 23, 59, 59, 1000]).invalidAt(), 6, '1000 is invalid millisecond');
        test.equal(frozenMoment([2000, 1, 29, 23, 59, 59, 999]).invalidAt(), -1, '-1 if everything is fine');
        test.done();
    },

    "valid Unix timestamp" : function (test) {
        test.expect(21);
        test.equal(frozenMoment(1371065286, "X").isValid(), true, 'number integer');
        test.equal(frozenMoment(1379066897.0, "X").isValid(), true, 'number whole 1dp');
        test.equal(frozenMoment(1379066897.7, "X").isValid(), true, 'number 1dp');
        test.equal(frozenMoment(1379066897.00, "X").isValid(), true, 'number whole 2dp');
        test.equal(frozenMoment(1379066897.07, "X").isValid(), true, 'number 2dp');
        test.equal(frozenMoment(1379066897.17, "X").isValid(), true, 'number 2dp');
        test.equal(frozenMoment(1379066897.000, "X").isValid(), true, 'number whole 3dp');
        test.equal(frozenMoment(1379066897.007, "X").isValid(), true, 'number 3dp');
        test.equal(frozenMoment(1379066897.017, "X").isValid(), true, 'number 3dp');
        test.equal(frozenMoment(1379066897.157, "X").isValid(), true, 'number 3dp');
        test.equal(frozenMoment("1371065286", "X").isValid(), true, 'string integer');
        test.equal(frozenMoment("1379066897.", "X").isValid(), true, 'string trailing .');
        test.equal(frozenMoment("1379066897.0", "X").isValid(), true, 'string whole 1dp');
        test.equal(frozenMoment("1379066897.7", "X").isValid(), true, 'string 1dp');
        test.equal(frozenMoment("1379066897.00", "X").isValid(), true, 'string whole 2dp');
        test.equal(frozenMoment("1379066897.07", "X").isValid(), true, 'string 2dp');
        test.equal(frozenMoment("1379066897.17", "X").isValid(), true, 'string 2dp');
        test.equal(frozenMoment("1379066897.000", "X").isValid(), true, 'string whole 3dp');
        test.equal(frozenMoment("1379066897.007", "X").isValid(), true, 'string 3dp');
        test.equal(frozenMoment("1379066897.017", "X").isValid(), true, 'string 3dp');
        test.equal(frozenMoment("1379066897.157", "X").isValid(), true, 'string 3dp');
        test.done();
    },

    "invalid Unix timestamp" : function (test) {
        test.expect(8);
        test.equal(frozenMoment(undefined, "X").isValid(), false, 'undefined');
        test.equal(frozenMoment("undefined", "X").isValid(), false, 'string undefined');
        try {
            test.equal(frozenMoment(null, "X").isValid(), false, 'null');
        } catch (e) {
            test.ok(true, 'null');
        }

        test.equal(frozenMoment("null", "X").isValid(), false, 'string null');
        test.equal(frozenMoment([], "X").isValid(), false, 'array');
        test.equal(frozenMoment("{}", "X").isValid(), false, 'object');
        try {
            test.equal(frozenMoment("", "X").isValid(), false, 'string empty');
        } catch (e) {
            test.ok(true, 'string empty');
        }

        test.equal(frozenMoment(" ", "X").isValid(), false, 'string space');
        test.done();
    },

    "empty" : function (test) {
        test.equal(frozenMoment(null).isValid(), false, 'null');
        test.equal(frozenMoment('').isValid(), false, 'empty string');

        test.equal(frozenMoment(null, 'YYYY').isValid(), false, 'format + null');
        test.equal(frozenMoment('', 'YYYY').isValid(), false, 'format + empty string');
        test.equal(frozenMoment(' ', 'YYYY').isValid(), false, 'format + empty when trimmed');
        test.done();
    },

    "days of the year" : function (test) {
        test.equal(frozenMoment('2010 300', 'YYYY DDDD').isValid(), true, 'day 300 of year valid');
        test.equal(frozenMoment('2010 365', 'YYYY DDDD').isValid(), true, 'day 365 of year valid');
        test.equal(frozenMoment('2010 366', 'YYYY DDDD').isValid(), false, 'day 366 of year invalid');
        test.equal(frozenMoment('2012 365', 'YYYY DDDD').isValid(), true, 'day 365 of leap year valid');
        test.equal(frozenMoment('2012 366', 'YYYY DDDD').isValid(), true, 'day 366 of leap year valid');
        test.equal(frozenMoment('2012 367', 'YYYY DDDD').isValid(), false, 'day 367 of leap year invalid');

        test.done();
    },

    "oddball permissiveness" : function (test) {
        //https://github.com/moment/moment/issues/1128
        test.ok(frozenMoment("2010-10-3199", ["MM/DD/YYYY", "MM-DD-YYYY", "YYYY-MM-DD"]).isValid());

        //https://github.com/moment/moment/issues/1122
        test.ok(frozenMoment("3:25", ["h:mma", "hh:mma", "H:mm", "HH:mm"]).isValid());

        test.done();
    }
};

var frozenMoment = require("../../frozen-moment");

exports.leapyear = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "leap year" : function (test) {
        test.expect(4);

        test.equal(frozenMoment([2010, 0, 1]).isLeapYear(), false, '2010');
        test.equal(frozenMoment([2100, 0, 1]).isLeapYear(), false, '2100');
        test.equal(frozenMoment([2008, 0, 1]).isLeapYear(), true, '2008');
        test.equal(frozenMoment([2000, 0, 1]).isLeapYear(), true, '2000');
        test.done();
    }
};

var frozenMoment = require("../../frozen-moment");

exports.listers = {
    setUp : function (cb) {
        frozenMoment.locale('en');
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };

        cb();
    },

    tearDown : function (cb) {
        frozenMoment.locale('en');
        cb();
    },

    "default" : function (test) {
        test.expect(5);
        test.deepEqual(frozenMoment.months(), ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
        test.deepEqual(frozenMoment.monthsShort(), ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
        test.deepEqual(frozenMoment.weekdays(), ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
        test.deepEqual(frozenMoment.weekdaysShort(), ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
        test.deepEqual(frozenMoment.weekdaysMin(), ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]);
        test.done();
    },

    "index" : function (test) {
        test.equal(frozenMoment.months(0), "January");
        test.equal(frozenMoment.months(2), "March");
        test.equal(frozenMoment.monthsShort(0), "Jan");
        test.equal(frozenMoment.monthsShort(2), "Mar");
        test.equal(frozenMoment.weekdays(0), "Sunday");
        test.equal(frozenMoment.weekdays(2), "Tuesday");
        test.equal(frozenMoment.weekdaysShort(0), "Sun");
        test.equal(frozenMoment.weekdaysShort(2), "Tue");
        test.equal(frozenMoment.weekdaysMin(0), "Su");
        test.equal(frozenMoment.weekdaysMin(2), "Tu");
        test.done();
    },

    "localized" : function (test) {
        var months = "one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve".split('_'),
            monthsShort = "on_tw_th_fo_fi_si_se_ei_ni_te_el_tw".split("_"),
            weekdays = "one_two_three_four_five_six_seven".split("_"),
            weekdaysShort = "on_tw_th_fo_fi_si_se".split("_"),
            weekdaysMin = "1_2_3_4_5_6_7".split("_");

        frozenMoment.locale('numerologists', {
            months : months,
            monthsShort : monthsShort,
            weekdays : weekdays,
            weekdaysShort: weekdaysShort,
            weekdaysMin: weekdaysMin
        });

        test.deepEqual(frozenMoment.months(), months);
        test.deepEqual(frozenMoment.monthsShort(), monthsShort);
        test.deepEqual(frozenMoment.weekdays(), weekdays);
        test.deepEqual(frozenMoment.weekdaysShort(), weekdaysShort);
        test.deepEqual(frozenMoment.weekdaysMin(), weekdaysMin);

        test.equal(frozenMoment.months(0), "one");
        test.equal(frozenMoment.monthsShort(0), "on");
        test.equal(frozenMoment.weekdays(0), "one");
        test.equal(frozenMoment.weekdaysShort(0), "on");
        test.equal(frozenMoment.weekdaysMin(0), "1");

        test.equal(frozenMoment.months(2), "three");
        test.equal(frozenMoment.monthsShort(2), "th");
        test.equal(frozenMoment.weekdays(2), "three");
        test.equal(frozenMoment.weekdaysShort(2), "th");
        test.equal(frozenMoment.weekdaysMin(2), "3");

        test.done();
    },

    "with functions" : function (test) {
        var monthsShort = "one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve".split('_'),
            monthsShortWeird = "onesy_twosy_threesy_foursy_fivesy_sixsy_sevensy_eightsy_ninesy_tensy_elevensy_twelvesy".split('_');

        frozenMoment.locale("difficult", {

            monthsShort: function (m, format) {
                var arr = format.match(/-MMM-/) ? monthsShortWeird : monthsShort;
                return arr[m.month()];
            }
        });

        test.expect(6);
        test.deepEqual(frozenMoment.monthsShort(), monthsShort);
        test.deepEqual(frozenMoment.monthsShort('MMM'), monthsShort);
        test.deepEqual(frozenMoment.monthsShort('-MMM-'), monthsShortWeird);

        test.deepEqual(frozenMoment.monthsShort('MMM', 2), 'three');
        test.deepEqual(frozenMoment.monthsShort('-MMM-', 2), 'threesy');
        test.deepEqual(frozenMoment.monthsShort(2), 'three');

        test.done();
    }
};

var frozenMoment = require("../../frozen-moment");

exports.locale = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        frozenMoment.locale('en');
        done();
    },

    "library getter" : function (test) {
        var r;
        test.expect(8);

        r = frozenMoment.locale('en');
        test.equal(r, 'en', 'locale should return en by default');
        test.equal(frozenMoment.locale(), 'en', 'locale should return en by default');

        frozenMoment.locale('fr');
        test.equal(frozenMoment.locale(), 'fr', 'locale should return the changed locale');

        frozenMoment.locale('en-gb');
        test.equal(frozenMoment.locale(), 'en-gb', 'locale should return the changed locale');

        frozenMoment.locale('en');
        test.equal(frozenMoment.locale(), 'en', 'locale should reset');

        frozenMoment.locale('does-not-exist');
        test.equal(frozenMoment.locale(), 'en', 'locale should reset');

        frozenMoment.locale('EN');
        test.equal(frozenMoment.locale(), 'en', 'Normalize locale key case');

        frozenMoment.locale('EN_gb');
        test.equal(frozenMoment.locale(), 'en-gb', 'Normalize locale key underscore');

        test.done();
    },

    "library getter array of locales" : function (test) {
        test.equal(frozenMoment.locale(['non-existent', 'fr', 'also-non-existent']), 'fr', "passing an array uses the first valid locale");
        test.equal(frozenMoment.locale(['es', 'fr', 'also-non-existent']), 'es', "passing an array uses the first valid locale");
        test.done();
    },

    "library getter locale substrings" : function (test) {
        test.equal(frozenMoment.locale('fr-crap'), 'fr', "use substrings");
        test.equal(frozenMoment.locale('fr-does-not-exist'), 'fr', "uses deep substrings");
        test.equal(frozenMoment.locale('fr-CA-does-not-exist'), 'fr-ca', "uses deepest substring");
        test.done();
    },

    "library getter locale array and substrings" : function (test) {
        test.equal(frozenMoment.locale(['en-CH', 'fr']), 'en', "prefer root locales to shallower ones");
        test.equal(frozenMoment.locale(['en-gb-leeds', 'en-CA']), 'en-gb', "prefer root locales to shallower ones");
        test.equal(frozenMoment.locale(['en-fake', 'en-CA']), 'en-ca', "prefer alternatives with shared roots");
        test.equal(frozenMoment.locale(['en-fake', 'en-fake2', 'en-ca']), 'en-ca', "prefer alternatives with shared roots");
        test.equals(frozenMoment.locale(['fake-CA', 'fake-MX', 'fr']), 'fr', "always find something if possible");
        test.equals(frozenMoment.locale(['fake-CA', 'fake-MX', 'fr']), 'fr', "always find something if possible");
        test.equals(frozenMoment.locale(['fake-CA', 'fake-MX', 'fr-fake-fake-fake']), 'fr', "always find something if possible");
        test.equals(frozenMoment.locale(['en', 'en-CA']), 'en', "prefer earlier if it works");
        test.done();
    },

    "library ensure inheritance" : function (test) {
        test.expect(2);

        frozenMoment.locale('made-up', {
            // I put them out of order
            months : "February_March_April_May_June_July_August_September_October_November_December_January".split("_")
            // the rest of the properties should be inherited.
        });

        test.equal(frozenMoment([2012, 5, 6]).format('MMMM'), 'July', 'Override some of the configs');
        test.equal(frozenMoment([2012, 5, 6]).format('MMM'), 'Jun', 'But not all of them');

        test.done();
    },

    "library ensure inheritance LT L LL LLL LLLL" : function (test) {
        test.expect(5);

        var locale = 'test-inherit-lt';

        frozenMoment.locale(locale, {
            longDateFormat : {
                LT : "-[LT]-",
                L : "-[L]-",
                LL : "-[LL]-",
                LLL : "-[LLL]-",
                LLLL : "-[LLLL]-"
            },
            calendar : {
                sameDay : '[sameDay] LT',
                nextDay : '[nextDay] L',
                nextWeek : '[nextWeek] LL',
                lastDay : '[lastDay] LLL',
                lastWeek : '[lastWeek] LLLL',
                sameElse : 'L'
            }
        });

        frozenMoment.locale('es');

        test.equal(frozenMoment.build().locale(locale).freeze().calendar(), "sameDay -LT-", "Should use instance locale in LT formatting");
        test.equal(frozenMoment.build().add(1, 'days').locale(locale).freeze().calendar(), "nextDay -L-", "Should use instance locale in L formatting");
        test.equal(frozenMoment.build().add(-1, 'days').locale(locale).freeze().calendar(), "lastDay -LLL-", "Should use instance locale in LL formatting");
        test.equal(frozenMoment.build().add(4, 'days').locale(locale).freeze().calendar(), "nextWeek -LL-", "Should use instance locale in LLL formatting");
        test.equal(frozenMoment.build().add(-4, 'days').locale(locale).freeze().calendar(), "lastWeek -LLLL-", "Should use instance locale in LLLL formatting");

        test.done();
    },

    "library localeData" : function (test) {
        test.expect(3);
        frozenMoment.locale('en');

        var jan = frozenMoment([2000, 0]);

        test.equal(frozenMoment.localeData().months(jan), 'January', 'no arguments returns global');
        test.equal(frozenMoment.localeData('zh-cn').months(jan), '一月', 'a string returns the locale based on key');
        test.equal(frozenMoment.localeData(frozenMoment.build().locale('es').freeze()).months(jan), 'enero', "if you pass in a frozenMoment it uses the frozenMoment's locale");

        test.done();
    },

    "defineLocale" : function (test) {
        frozenMoment.locale("en");
        frozenMoment.defineLocale("dude", {months: ["Movember"]});
        test.equal(frozenMoment().locale(), "en", "defineLocale doesn't set it");
        test.equal(frozenMoment.build().locale("dude").freeze().locale(), "dude", "defineLocale defines a locale");
        test.done();
    },

    "library convenience" : function (test) {
        frozenMoment.locale("something", {week: {dow: 3}});
        frozenMoment.locale("something");
        test.equal(frozenMoment.locale(), "something", "locale can be used to create the locale too");
        test.done();
    },

    "instance locale method" : function (test) {
        test.expect(3);
        frozenMoment.locale('en');

        test.equal(frozenMoment([2012, 5, 6]).format('MMMM'), 'June', 'Normally default to global');
        test.equal(frozenMoment.build([2012, 5, 6]).locale('es').freeze().format('MMMM'), 'junio', 'Use the instance specific locale');
        test.equal(frozenMoment([2012, 5, 6]).format('MMMM'), 'June', 'Using an instance specific locale does not affect other frozenMoments');

        test.done();
    },

    "instance locale method with array" : function (test) {
        var m = frozenMoment.build().locale(['non-existent', 'fr', 'also-non-existent']).freeze();
        test.equal(m.locale(), 'fr', "passing an array uses the first valid locale");
        m = frozenMoment.build().locale(['es', 'fr', 'also-non-existent']).freeze();
        test.equal(m.locale(), 'es', "passing an array uses the first valid locale");
        test.done();
    },

    "instance getter locale substrings" : function (test) {
        var m = frozenMoment.build();

        m = m.locale('fr-crap');
        test.equal(m.freeze().locale(), 'fr', "use substrings");

        m = m.locale('fr-does-not-exist');
        test.equal(m.freeze().locale(), 'fr', "uses deep substrings");

        test.done();
    },

    "instance locale persists with manipulation" : function (test) {
        test.expect(3);
        frozenMoment.locale('en');

        test.equal(frozenMoment.build([2012, 5, 6]).locale('es').add({days: 1}).freeze().format('MMMM'), 'junio', 'With addition');
        test.equal(frozenMoment.build([2012, 5, 6]).locale('es').day(0).freeze().format('MMMM'), 'junio', 'With day getter');
        test.equal(frozenMoment.build([2012, 5, 6]).locale('es').endOf('day').freeze().format('MMMM'), 'junio', 'With endOf');

        test.done();
    },

    "instance locale persists with cloning" : function (test) {
        test.expect(2);
        frozenMoment.locale('en');

        var a = frozenMoment.build([2012, 5, 6]).locale('es').freeze(),
            b = a.clone(),
            c = frozenMoment(a);

        test.equal(b.format('MMMM'), 'junio', 'using frozenMoment.fn.clone()');
        test.equal(c.format('MMMM'), 'junio', 'using frozenMoment()');

        test.done();
    },

    "duration locale method" : function (test) {
        test.expect(3);
        frozenMoment.locale('en');

        test.equal(frozenMoment.duration({seconds: 44}).humanize(), 'a few seconds', 'Normally default to global');
        test.equal(frozenMoment.duration.build({seconds: 44}).locale('es').freeze().humanize(), 'unos segundos', 'Use the instance specific locale');
        test.equal(frozenMoment.duration.build({seconds: 44}).freeze().humanize(), 'a few seconds', 'Using an instance specific locale does not affect other durations');

        test.done();
    },

    "duration locale persists with cloning" : function (test) {
        test.expect(1);
        frozenMoment.locale('en');

        var a = frozenMoment.duration.build({seconds:  44}).locale('es').freeze(),
            b = frozenMoment.duration(a);

        test.equal(b.humanize(), 'unos segundos', 'using frozenMoment.duration()');
        test.done();
    },

    "changing the global locale doesn't affect existing duration instances" : function (test) {
        var mom = frozenMoment.duration();
        frozenMoment.locale('fr');
        test.equal('en', mom.locale());
        test.done();
    },

    "from relative time future" : function (test) {
        var start = frozenMoment([2007, 1, 28]);

        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({s: 44})),  "in a few seconds", "44 seconds = a few seconds");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({s: 45})),  "in a minute",      "45 seconds = a minute");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({s: 89})),  "in a minute",      "89 seconds = a minute");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({s: 90})),  "in 2 minutes",     "90 seconds = 2 minutes");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({m: 44})),  "in 44 minutes",    "44 minutes = 44 minutes");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({m: 45})),  "in an hour",       "45 minutes = an hour");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({m: 89})),  "in an hour",       "89 minutes = an hour");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({m: 90})),  "in 2 hours",       "90 minutes = 2 hours");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({h: 5})),   "in 5 hours",       "5 hours = 5 hours");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({h: 21})),  "in 21 hours",      "21 hours = 21 hours");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({h: 22})),  "in a day",         "22 hours = a day");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({h: 35})),  "in a day",         "35 hours = a day");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({h: 36})),  "in 2 days",        "36 hours = 2 days");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({d: 1})),   "in a day",         "1 day = a day");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({d: 5})),   "in 5 days",        "5 days = 5 days");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({d: 25})),  "in 25 days",       "25 days = 25 days");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({d: 26})),  "in a month",       "26 days = a month");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({d: 30})),  "in a month",       "30 days = a month");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({d: 45})),  "in a month",       "45 days = a month");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({d: 47})),  "in 2 months",      "47 days = 2 months");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({d: 74})),  "in 2 months",      "74 days = 2 months");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({d: 78})),  "in 3 months",      "78 days = 3 months");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({M: 1})),   "in a month",       "1 month = a month");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({M: 5})),   "in 5 months",      "5 months = 5 months");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({d: 315})), "in 10 months",     "315 days = 10 months");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({d: 344})), "in a year",        "344 days = a year");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({d: 345})), "in a year",        "345 days = a year");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({d: 548})), "in 2 years",       "548 days = in 2 years");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({y: 1})),   "in a year",        "1 year = a year");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).subtract({y: 5})),   "in 5 years",       "5 years = 5 years");

        test.done();
    },

    "from relative time past" : function (test) {
        var start = frozenMoment([2007, 1, 28]);

        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({s: 44})),  "a few seconds ago", "44 seconds = a few seconds");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({s: 45})),  "a minute ago",      "45 seconds = a minute");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({s: 89})),  "a minute ago",      "89 seconds = a minute");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({s: 90})),  "2 minutes ago",     "90 seconds = 2 minutes");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({m: 44})),  "44 minutes ago",    "44 minutes = 44 minutes");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({m: 45})),  "an hour ago",       "45 minutes = an hour");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({m: 89})),  "an hour ago",       "89 minutes = an hour");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({m: 90})),  "2 hours ago",       "90 minutes = 2 hours");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({h: 5})),   "5 hours ago",       "5 hours = 5 hours");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({h: 21})),  "21 hours ago",      "21 hours = 21 hours");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({h: 22})),  "a day ago",         "22 hours = a day");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({h: 35})),  "a day ago",         "35 hours = a day");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({h: 36})),  "2 days ago",        "36 hours = 2 days");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({d: 1})),   "a day ago",         "1 day = a day");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({d: 5})),   "5 days ago",        "5 days = 5 days");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({d: 25})),  "25 days ago",       "25 days = 25 days");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({d: 26})),  "a month ago",       "26 days = a month");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({d: 30})),  "a month ago",       "30 days = a month");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({d: 43})),  "a month ago",       "43 days = a month");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({d: 46})),  "2 months ago",      "46 days = 2 months");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({d: 74})),  "2 months ago",      "75 days = 2 months");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({d: 76})),  "3 months ago",      "76 days = 3 months");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({M: 1})),   "a month ago",       "1 month = a month");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({M: 5})),   "5 months ago",      "5 months = 5 months");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({d: 315})), "10 months ago",     "315 days = 10 months");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({d: 344})), "a year ago",        "344 days = a year");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({d: 345})), "a year ago",        "345 days = a year");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({d: 548})), "2 years ago",       "548 days = 2 years");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({y: 1})),   "a year ago",        "1 year = a year");
        test.equal(start.from(frozenMoment.build([2007, 1, 28]).add({y: 5})),   "5 years ago",       "5 years = 5 years");

        test.done();
    },

    "instance locale used with from" : function (test) {
        test.expect(2);
        frozenMoment.locale('en');

        var a = frozenMoment.build([2012, 5, 6]).locale('es').freeze(),
            b = frozenMoment([2012, 5, 7]);

        test.equal(a.from(b), 'hace un día', 'preserve locale of first frozenMoment');
        test.equal(b.from(a), 'in a day', 'do not preserve locale of second frozenMoment');

        test.done();
    },

    "instance localeData" : function (test) {
        frozenMoment.defineLocale("dude", {week: {dow: 3}});
        test.equal(frozenMoment.build().locale("dude").freeze().localeData()._week.dow, 3);
        test.done();
    },

    "month name callback function" : function (test) {
        test.expect(3);

        function fakeReplace(m, format) {
            if (/test/.test(format)) {
                return "test";
            }
            if (m.date() === 1) {
                return "date";
            }
            return 'default';
        }

        frozenMoment.locale('made-up-2', {
            months : fakeReplace,
            monthsShort : fakeReplace,
            weekdays : fakeReplace,
            weekdaysShort : fakeReplace,
            weekdaysMin : fakeReplace
        });

        test.equal(frozenMoment().format('[test] dd ddd dddd MMM MMMM'), 'test test test test test test', 'format month name function should be able to access the format string');
        test.equal(frozenMoment([2011, 0, 1]).format('dd ddd dddd MMM MMMM'), 'date date date date date', 'format month name function should be able to access the frozenMoment object');
        test.equal(frozenMoment([2011, 0, 2]).format('dd ddd dddd MMM MMMM'), 'default default default default default', 'format month name function should be able to access the frozenMoment object');

        test.done();
    },

    "changing parts of a locale config" : function (test) {
        test.expect(2);

        frozenMoment.locale('partial-locale', {
            months : 'a b c d e f g h i j k l'.split(' ')
        });

        test.equal(frozenMoment([2011, 0, 1]).format('MMMM'), 'a', 'should be able to set locale values when creating the locale');

        frozenMoment.locale('partial-locale', {
            monthsShort : 'A B C D E F G H I J K L'.split(' ')
        });

        test.equal(frozenMoment([2011, 0, 1]).format('MMMM MMM'), 'a A', 'should be able to set locale values after creating the locale');

        test.done();
    },

    "start/endOf week feature for first-day-is-monday locales" : function (test) {
        test.expect(2);

        frozenMoment.locale('monday-locale', {
            week : {
                dow : 1 // Monday is the first day of the week
            }
        });

        frozenMoment.locale('monday-locale');
        test.equal(frozenMoment.build([2013, 0, 1]).startOf('week').freeze().day(), 1, 'for locale monday-locale first day of the week should be monday');
        test.equal(frozenMoment.build([2013, 0, 1]).endOf('week').freeze().day(), 0, 'for locale monday-locale last day of the week should be sunday');

        test.done();
    },

    "meridiem parsing" : function (test) {
        test.expect(2);

        frozenMoment.locale('meridiem-parsing', {
            meridiemParse : /[bd]/i,
            isPM : function (input) {
                return input === 'b';
            }
        });

        frozenMoment.locale('meridiem-parsing');
        test.equal(frozenMoment('2012-01-01 3b', 'YYYY-MM-DD ha').hour(), 15, 'Custom parsing of meridiem should work');
        test.equal(frozenMoment('2012-01-01 3d', 'YYYY-MM-DD ha').hour(), 3, 'Custom parsing of meridiem should work');

        test.done();
    },

    "invalid date formatting" : function (test) {
        frozenMoment.locale('has-invalid', {
            invalidDate: 'KHAAAAAAAAAAAN!'
        });

        test.equal(frozenMoment.invalid().format(), "KHAAAAAAAAAAAN!");
        test.equal(frozenMoment.invalid().format('YYYY-MM-DD'), "KHAAAAAAAAAAAN!");

        test.done();
    },

    "return locale name" : function (test) {
        test.expect(1);

        var registered = frozenMoment.locale('return-this', {});

        test.equal(registered, 'return-this', 'returns the locale configured');

        test.done();
    },

    "changing the global locale doesn't affect existing instances" : function (test) {
        frozenMoment.locale('en');
        var mom = frozenMoment();
        frozenMoment.locale('pr');
        test.equal('en', frozenMoment.locale());
        frozenMoment.locale('fr');
        test.equal('en', mom.locale());
        test.done();
    }
};

var frozenMoment = require("../../frozen-moment");

exports.minMax = {
    setUp : function (cb) {
        frozenMoment.locale('en');
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        cb();
    },

    tearDown : function (cb) {
        frozenMoment.locale('en');
        cb();
    },

    "min" : function (test) {
        var now = frozenMoment(),
            future = now.thaw().add(1, 'month').freeze(),
            past = now.thaw().subtract(1, 'month').freeze();

        test.equal(frozenMoment.min(now, future, past), past, "min(now, future, past)");
        test.equal(frozenMoment.min(future, now, past), past, "min(future, now, past)");
        test.equal(frozenMoment.min(future, past, now), past, "min(future, past, now)");
        test.equal(frozenMoment.min(past, future, now), past, "min(past, future, now)");
        test.equal(frozenMoment.min(now, past), past, "min(now, past)");
        test.equal(frozenMoment.min(past, now), past, "min(past, now)");
        test.equal(frozenMoment.min(now), now, "min(now, past)");

        test.equal(frozenMoment.min([now, future, past]), past, "min([now, future, past])");
        test.equal(frozenMoment.min([now, past]), past, "min(now, past)");
        test.equal(frozenMoment.min([now]), now, "min(now)");

        test.done();
    },

    "max" : function (test) {
        var now = frozenMoment(),
            future = now.thaw().add(1, 'month').freeze(),
            past = now.thaw().subtract(1, 'month').freeze();

        test.equal(frozenMoment.max(now, future, past), future, "max(now, future, past)");
        test.equal(frozenMoment.max(future, now, past), future, "max(future, now, past)");
        test.equal(frozenMoment.max(future, past, now), future, "max(future, past, now)");
        test.equal(frozenMoment.max(past, future, now), future, "max(past, future, now)");
        test.equal(frozenMoment.max(now, past), now, "max(now, past)");
        test.equal(frozenMoment.max(past, now), now, "max(past, now)");
        test.equal(frozenMoment.max(now), now, "max(now, past)");

        test.equal(frozenMoment.max([now, future, past]), future, "max([now, future, past])");
        test.equal(frozenMoment.max([now, past]), now, "max(now, past)");
        test.equal(frozenMoment.max([now]), now, "max(now)");

        test.done();
    }

};

var frozenMoment = require("../../frozen-moment");

exports.mutable = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "mutation methods" : function (test) {
        var m = frozenMoment.build();

        test.equal(m, m.year(2011), 'year() should be mutable');
        test.equal(m, m.month(1), 'month() should be mutable');
        test.equal(m, m.hours(7), 'hours() should be mutable');
        test.equal(m, m.minutes(33), 'minutes() should be mutable');
        test.equal(m, m.seconds(44), 'seconds() should be mutable');
        test.equal(m, m.milliseconds(55), 'milliseconds() should be mutable');
        test.equal(m, m.day(2), 'day() should be mutable');
        test.equal(m, m.startOf('week'), 'startOf() should be mutable');
        test.equal(m, m.add(1, 'days'), 'add() should be mutable');
        test.equal(m, m.subtract(2, 'years'), 'subtract() should be mutable');
        test.equal(m, m.local(), 'local() should be mutable');
        test.equal(m, m.utc(), 'utc() should be mutable');

        test.done();
    },

    "non-mutation methods" : function (test) {
        var m = frozenMoment.build();
        test.notEqual(m, m.clone(), "clone() should not be mutable");

        test.done();
    }
};

/*global require, exports */

var frozenMoment = require("../../frozen-moment");

exports.normalizeUnits = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "normalize units" : function (test) {
        var fullKeys = ["year", "quarter", "month", "isoWeek", "week", "day", "hour", "minute", "second", "millisecond", "date", 'dayOfYear', 'weekday', 'isoWeekday', 'weekYear', 'isoWeekYear'],
            aliases = ["y", "Q", "M", "W", "w", "d", "h", "m", "s", "ms", "D", 'DDD', 'e', 'E', 'gg', 'GG'],
            length = fullKeys.length,
            fullKey,
            fullKeyCaps,
            fullKeyPlural,
            fullKeyCapsPlural,
            fullKeyLower,
            alias,
            index;

        for (index = 0; index < length; index += 1) {
            fullKey = fullKeys[index];
            fullKeyCaps = fullKey.toUpperCase();
            fullKeyLower = fullKey.toLowerCase();
            fullKeyPlural = fullKey + "s";
            fullKeyCapsPlural = fullKeyCaps + "s";
            alias = aliases[index];
            test.equal(frozenMoment.normalizeUnits(fullKey), fullKey, "Testing full key " + fullKey);
            test.equal(frozenMoment.normalizeUnits(fullKeyCaps), fullKey, "Testing full key capitalised " + fullKey);
            test.equal(frozenMoment.normalizeUnits(fullKeyPlural), fullKey, "Testing full key plural " + fullKey);
            test.equal(frozenMoment.normalizeUnits(fullKeyCapsPlural), fullKey, "Testing full key capitalised and plural " + fullKey);
            test.equal(frozenMoment.normalizeUnits(alias), fullKey, "Testing alias " + fullKey);
        }

        test.done();
    }
};

var frozenMoment = require('../../frozen-moment'),
    flags = function () {
        return frozenMoment.apply(null, arguments).parsingFlags();
    };

exports.parsingFlags = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },


    'overflow with array' : function (test) {
        //months
        test.equal(flags([2010, 0]).overflow, -1, 'month 0 valid');
        test.equal(flags([2010, 1]).overflow, -1, 'month 1 valid');
        test.equal(flags([2010, -1]).overflow, 1, 'month -1 invalid');
        test.equal(flags([2100, 12]).overflow, 1, 'month 12 invalid');

        //days
        test.equal(flags([2010, 1, 16]).overflow, -1, 'date valid');
        test.equal(flags([2010, 1, -1]).overflow, 2, 'date -1 invalid');
        test.equal(flags([2010, 1, 0]).overflow, 2, 'date 0 invalid');
        test.equal(flags([2010, 1, 32]).overflow, 2, 'date 32 invalid');
        test.equal(flags([2012, 1, 29]).overflow, -1, 'date leap year valid');
        test.equal(flags([2010, 1, 29]).overflow, 2, 'date leap year invalid');

        //hours
        test.equal(flags([2010, 1, 1, 8]).overflow, -1, 'hour valid');
        test.equal(flags([2010, 1, 1, 0]).overflow, -1, 'hour 0 valid');
        test.equal(flags([2010, 1, 1, -1]).overflow, 3, 'hour -1 invalid');
        test.equal(flags([2010, 1, 1, 24]).overflow, 3, 'hour 24 invalid');

        //minutes
        test.equal(flags([2010, 1, 1, 8, 15]).overflow, -1, 'minute valid');
        test.equal(flags([2010, 1, 1, 8, 0]).overflow, -1, 'minute 0 valid');
        test.equal(flags([2010, 1, 1, 8, -1]).overflow, 4, 'minute -1 invalid');
        test.equal(flags([2010, 1, 1, 8, 60]).overflow, 4, 'minute 60 invalid');

        //seconds
        test.equal(flags([2010, 1, 1, 8, 15, 12]).overflow, -1, 'second valid');
        test.equal(flags([2010, 1, 1, 8, 15, 0]).overflow, -1, 'second 0 valid');
        test.equal(flags([2010, 1, 1, 8, 15, -1]).overflow, 5, 'second -1 invalid');
        test.equal(flags([2010, 1, 1, 8, 15, 60]).overflow, 5, 'second 60 invalid');

        //milliseconds
        test.equal(flags([2010, 1, 1, 8, 15, 12, 345]).overflow, -1, 'millisecond valid');
        test.equal(flags([2010, 1, 1, 8, 15, 12, 0]).overflow, -1, 'millisecond 0 valid');
        test.equal(flags([2010, 1, 1, 8, 15, 12, -1]).overflow, 6, 'millisecond -1 invalid');
        test.equal(flags([2010, 1, 1, 8, 15, 12, 1000]).overflow, 6, 'millisecond 1000 invalid');

        test.done();
    },

    'overflow without format' : function (test) {
        //months
        test.equal(flags('2001-01', 'YYYY-MM').overflow, -1, 'month 1 valid');
        test.equal(flags('2001-12', 'YYYY-MM').overflow, -1, 'month 12 valid');
        test.equal(flags('2001-13', 'YYYY-MM').overflow, 1, 'month 13 invalid');

        //days
        test.equal(flags('2010-01-16', 'YYYY-MM-DD').overflow, -1, 'date 16 valid');
        test.equal(flags('2010-01-0',  'YYYY-MM-DD').overflow, 2, 'date 0 invalid');
        test.equal(flags('2010-01-32', 'YYYY-MM-DD').overflow, 2, 'date 32 invalid');
        test.equal(flags('2012-02-29', 'YYYY-MM-DD').overflow, -1, 'date leap year valid');
        test.equal(flags('2010-02-29', 'YYYY-MM-DD').overflow, 2, 'date leap year invalid');

        //days of the year
        test.equal(flags('2010 300', 'YYYY DDDD').overflow, -1, 'day 300 of year valid');
        test.equal(flags('2010 365', 'YYYY DDDD').overflow, -1, 'day 365 of year valid');
        test.equal(flags('2010 366', 'YYYY DDDD').overflow, 2, 'day 366 of year invalid');
        test.equal(flags('2012 366', 'YYYY DDDD').overflow, -1, 'day 366 of leap year valid');
        test.equal(flags('2012 367', 'YYYY DDDD').overflow, 2, 'day 367 of leap year invalid');

        //hours
        test.equal(flags('08', 'HH').overflow, -1, 'hour valid');
        test.equal(flags('00', 'HH').overflow, -1, 'hour 0 valid');
        test.equal(flags('24', 'HH').overflow, 3, 'hour 24 invalid');

        //minutes
        test.equal(flags('08:15', 'HH:mm').overflow, -1, 'minute valid');
        test.equal(flags('08:00', 'HH:mm').overflow, -1, 'minute 0 valid');
        test.equal(flags('08:60', 'HH:mm').overflow, 4, 'minute 60 invalid');

        //seconds
        test.equal(flags('08:15:12', 'HH:mm:ss').overflow, -1, 'second valid');
        test.equal(flags('08:15:00', 'HH:mm:ss').overflow, -1, 'second 0 valid');
        test.equal(flags('08:15:60', 'HH:mm:ss').overflow, 5, 'second 60 invalid');

        //milliseconds
        test.equal(flags('08:15:12:345', 'HH:mm:ss:SSSS').overflow, -1, 'millisecond valid');
        test.equal(flags('08:15:12:000', 'HH:mm:ss:SSSS').overflow, -1, 'millisecond 0 valid');

        //this is OK because we don't match the last digit, so it's 100 ms
        test.equal(flags('08:15:12:1000', 'HH:mm:ss:SSSS').overflow, -1, 'millisecond 1000 actually valid');

        test.done();
    },

    'extra tokens' : function (test) {
        test.deepEqual(flags('1982-05-25', 'YYYY-MM-DD').unusedTokens, [], 'nothing extra');
        test.deepEqual(flags('1982-05', 'YYYY-MM-DD').unusedTokens, ['DD'], 'extra formatting token');
        test.deepEqual(flags('1982', 'YYYY-MM-DD').unusedTokens, ['MM', 'DD'], 'multiple extra formatting tokens');
        test.deepEqual(flags('1982-05', 'YYYY-MM-').unusedTokens, [], 'extra non-formatting token');
        test.deepEqual(flags('1982-05-', 'YYYY-MM-DD').unusedTokens, ['DD'], 'non-extra non-formatting token');
        test.deepEqual(flags('1982 05 1982', 'YYYY-MM-DD').unusedTokens, [], 'different non-formatting token');

        test.done();
    },

    'extra tokens strict' : function (test) {
        test.deepEqual(flags('1982-05-25', 'YYYY-MM-DD', true).unusedTokens, [], 'nothing extra');
        test.deepEqual(flags('1982-05', 'YYYY-MM-DD', true).unusedTokens, ['-', 'DD'], 'extra formatting token');
        test.deepEqual(flags('1982', 'YYYY-MM-DD', true).unusedTokens, ['-', 'MM', '-', 'DD'], 'multiple extra formatting tokens');
        test.deepEqual(flags('1982-05', 'YYYY-MM-', true).unusedTokens, ['-'], 'extra non-formatting token');
        test.deepEqual(flags('1982-05-', 'YYYY-MM-DD', true).unusedTokens, ['DD'], 'non-extra non-formatting token');
        test.deepEqual(flags('1982 05 1982', 'YYYY-MM-DD', true).unusedTokens, ['-', '-'], 'different non-formatting token');

        test.done();
    },

    'unused input' : function (test) {
        test.deepEqual(flags('1982-05-25', 'YYYY-MM-DD').unusedInput, [], 'normal input');
        test.deepEqual(flags('1982-05-25 this is more stuff', 'YYYY-MM-DD').unusedInput, [' this is more stuff'], 'trailing nonsense');
        test.deepEqual(flags('1982-05-25 09:30', 'YYYY-MM-DD').unusedInput, [' 09:30'], ['trailing legit-looking input']);
        test.deepEqual(flags('1982-05-25 some junk', 'YYYY-MM-DD [some junk]').unusedInput, [], 'junk that actually gets matched');
        test.deepEqual(flags('stuff at beginning 1982-05-25', 'YYYY-MM-DD').unusedInput, ['stuff at beginning '], 'leading junk');
        test.deepEqual(flags('junk 1982 more junk 05 yet more junk25', 'YYYY-MM-DD').unusedInput, ['junk ', ' more junk ', ' yet more junk'], 'interstitial junk');

        test.done();
    },

    'unused input strict' : function (test) {
        test.deepEqual(flags('1982-05-25', 'YYYY-MM-DD', true).unusedInput, [], 'normal input');
        test.deepEqual(flags('1982-05-25 this is more stuff', 'YYYY-MM-DD', true).unusedInput, [' this is more stuff'], 'trailing nonsense');
        test.deepEqual(flags('1982-05-25 09:30', 'YYYY-MM-DD', true).unusedInput, [' 09:30'], ['trailing legit-looking input']);
        test.deepEqual(flags('1982-05-25 some junk', 'YYYY-MM-DD [some junk]', true).unusedInput, [], 'junk that actually gets matched');
        test.deepEqual(flags('stuff at beginning 1982-05-25', 'YYYY-MM-DD', true).unusedInput, ['stuff at beginning '], 'leading junk');
        test.deepEqual(flags('junk 1982 more junk 05 yet more junk25', 'YYYY-MM-DD', true).unusedInput, ['junk ', ' more junk ', ' yet more junk'], 'interstitial junk');

        test.done();
    },

    'chars left over' : function (test) {
        test.equal(flags('1982-05-25', 'YYYY-MM-DD').charsLeftOver, 0, 'normal input');
        test.equal(flags('1982-05-25 this is more stuff', 'YYYY-MM-DD').charsLeftOver, ' this is more stuff'.length, 'trailing nonsense');
        test.equal(flags('1982-05-25 09:30', 'YYYY-MM-DD').charsLeftOver, ' 09:30'.length, 'trailing legit-looking input');
        test.equal(flags('stuff at beginning 1982-05-25', 'YYYY-MM-DD').charsLeftOver, 'stuff at beginning '.length, 'leading junk');
        test.equal(flags('1982 junk 05 more junk25', 'YYYY-MM-DD').charsLeftOver, [' junk ', ' more junk'].join('').length, 'interstitial junk');
        test.equal(flags('stuff at beginning 1982 junk 05 more junk25', 'YYYY-MM-DD').charsLeftOver, ['stuff at beginning ', ' junk ', ' more junk'].join('').length, 'leading and interstitial junk');

        test.done();
    },

    'empty' : function (test) {
        test.equal(flags('1982-05-25', 'YYYY-MM-DD').empty, false, 'normal input');
        test.equal(flags('nothing here', 'YYYY-MM-DD').empty, true, 'pure garbage');
        test.equal(flags('junk but has the number 2000 in it', 'YYYY-MM-DD').empty, false, 'only mostly garbage');
        test.equal(flags('', 'YYYY-MM-DD').empty, true, 'empty string');
        test.equal(flags('', 'YYYY-MM-DD').empty, true, 'blank string');

        test.done();
    },

    'null' : function (test) {
        test.equal(flags('1982-05-25', 'YYYY-MM-DD').nullInput, false, 'normal input');
        test.equal(flags(null).nullInput, true, 'just null');
        test.equal(flags(null, 'YYYY-MM-DD').nullInput, true, 'null with format');

        test.done();
    },

    'invalid month' : function (test) {
        test.equal(flags('1982 May', 'YYYY MMMM').invalidMonth, null, 'normal input');
        test.equal(flags('1982 Laser', 'YYYY MMMM').invalidMonth, 'Laser', 'bad month name');

        test.done();
    },

    'empty format array' : function (test) {
        test.equal(flags('1982 May', ['YYYY MMM']).invalidFormat, false, 'empty format array');
        test.equal(flags('1982 May', []).invalidFormat, true, 'empty format array');
        test.done();
    }
};

var frozenMoment = require("../../frozen-moment"),
    momentBuilder = frozenMoment.build,

    symbolMap = {
        '1': '!',
        '2': '@',
        '3': '#',
        '4': '$',
        '5': '%',
        '6': '^',
        '7': '&',
        '8': '*',
        '9': '(',
        '0': ')'
    },

    numberMap = {
        '!': '1',
        '@': '2',
        '#': '3',
        '$': '4',
        '%': '5',
        '^': '6',
        '&': '7',
        '*': '8',
        '(': '9',
        ')': '0'
    },

    symbolLang = {
        preparse: function (string) {
            return string.replace(/[!@#$%\^&*()]/g, function (match) {
                return numberMap[match];
            });
        },

        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        }
    };

exports.preparsePostformat = {
    setUp: function (cb) {
        frozenMoment.locale('symbol', symbolLang);
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };

        cb();
    },

    tearDown: function (cb) {
        frozenMoment.locale('en-gb');
        cb();
    },

    "transform": function (test) {
        test.expect(3);

        test.equal(frozenMoment.utc('@)!@-)*-@&', 'YYYY-MM-DD').unix(), 1346025600, "preparse string + format");
        test.equal(frozenMoment.utc('@)!@-)*-@&').unix(), 1346025600, "preparse ISO8601 string");
        test.equal(frozenMoment.unix(1346025600).thaw().utc().freeze().format('YYYY-MM-DD'), '@)!@-)*-@&', "postformat");

        test.done();
    },

    "transform from": function (test) {
        test.expect(3);

        var start = frozenMoment([2007, 1, 28]);

        test.equal(start.from(momentBuilder([2007, 1, 28]).add({s: 90}), true), "@ minutes", "postformat should work on frozenMoment.fn.from");
        test.equal(momentBuilder().add(6, 'd').freeze().fromNow(true), "^ days", "postformat should work on frozenMoment.fn.fromNow");
        test.equal(frozenMoment.duration(10, "h").humanize(), "!) hours", "postformat should work on frozenMoment.duration.fn.humanize");

        test.done();
    },

    "calendar day" : function (test) {
        test.expect(6);

        var a = momentBuilder().hours(2).minutes(0).seconds(0);

        test.equal(a.freeze().calendar(),                           "Today at @:)) AM",     "today at the same time");
        test.equal(a.clone().add({m: 25}).freeze().calendar(),      "Today at @:@% AM",     "Now plus 25 min");
        test.equal(a.clone().add({h: 1}).freeze().calendar(),       "Today at #:)) AM",     "Now plus 1 hour");
        test.equal(a.clone().add({d: 1}).freeze().calendar(),       "Tomorrow at @:)) AM",  "tomorrow at the same time");
        test.equal(a.clone().subtract({h: 1}).freeze().calendar(),  "Today at !:)) AM",     "Now minus 1 hour");
        test.equal(a.clone().subtract({d: 1}).freeze().calendar(),  "Yesterday at @:)) AM", "yesterday at the same time");

        test.done();
    }
};

var frozenMoment = require("../../frozen-moment"),
    momentBuilder = frozenMoment.build;

exports.quarter = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "library quarter getter" : function (test) {
        test.expect(7);

        test.equal(frozenMoment([1985,  1,  4]).quarter(), 1, "Feb  4 1985 is Q1");
        test.equal(frozenMoment([2029,  8, 18]).quarter(), 3, "Sep 18 2029 is Q3");
        test.equal(frozenMoment([2013,  3, 24]).quarter(), 2, "Apr 24 2013 is Q2");
        test.equal(frozenMoment([2015,  2,  5]).quarter(), 1, "Mar  5 2015 is Q1");
        test.equal(frozenMoment([1970,  0,  2]).quarter(), 1, "Jan  2 1970 is Q1");
        test.equal(frozenMoment([2001, 11, 12]).quarter(), 4, "Dec 12 2001 is Q4");
        test.equal(frozenMoment([2000,  0,  2]).quarter(), 1, "Jan  2 2000 is Q1");

        test.done();
    },

    "quarter setter singular" : function (test) {
        var m;
        test.expect(4);

        m = momentBuilder([2014, 4, 11]);
        test.equal(m.quarter(2).freeze().month(), 4, "set same quarter");
        test.equal(m.quarter(3).freeze().month(), 7, "set 3rd quarter");
        test.equal(m.quarter(1).freeze().month(), 1, "set 1st quarter");
        test.equal(m.quarter(4).freeze().month(), 10, "set 4th quarter");

        test.done();
    },

    "quarter setter plural" : function (test) {
        var m;
        test.expect(4);

        m = momentBuilder([2014, 4, 11]);
        test.equal(m.quarters(2).freeze().month(), 4, "set same quarter");
        test.equal(m.quarters(3).freeze().month(), 7, "set 3rd quarter");
        test.equal(m.quarters(1).freeze().month(), 1, "set 1st quarter");
        test.equal(m.quarters(4).freeze().month(), 10, "set 4th quarter");

        test.done();
    },

    "quarter setter programmatic" : function (test) {
        var m;
        test.expect(4);

        m = momentBuilder([2014, 4, 11]);
        test.equal(m.set("quarter", 2).freeze().month(), 4, "set same quarter");
        test.equal(m.set("quarter", 3).freeze().month(), 7, "set 3rd quarter");
        test.equal(m.set("quarter", 1).freeze().month(), 1, "set 1st quarter");
        test.equal(m.set("quarter", 4).freeze().month(), 10, "set 4th quarter");

        test.done();
    },

    "quarter setter programmatic plural" : function (test) {
        var m;
        test.expect(4);

        m = momentBuilder([2014, 4, 11]);
        test.equal(m.set("quarters", 2).freeze().month(), 4, "set same quarter");
        test.equal(m.set("quarters", 3).freeze().month(), 7, "set 3rd quarter");
        test.equal(m.set("quarters", 1).freeze().month(), 1, "set 1st quarter");
        test.equal(m.set("quarters", 4).freeze().month(), 10, "set 4th quarter");

        test.done();
    },

    "quarter setter programmatic abbr" : function (test) {
        var m;
        test.expect(4);

        m = momentBuilder([2014, 4, 11]);
        test.equal(m.set("Q", 2).freeze().month(), 4, "set same quarter");
        test.equal(m.set("Q", 3).freeze().month(), 7, "set 3rd quarter");
        test.equal(m.set("Q", 1).freeze().month(), 1, "set 1st quarter");
        test.equal(m.set("Q", 4).freeze().month(), 10, "set 4th quarter");

        test.done();
    },

    "quarter setter only month changes" : function (test) {
        var m;
        test.expect(7);

        m = momentBuilder([2014, 4, 11, 1, 2, 3, 4]).quarter(4).freeze();
        test.equal(m.year(), 2014, "keep year");
        test.equal(m.month(), 10, "set month");
        test.equal(m.date(), 11, "keep date");
        test.equal(m.hour(), 1, "keep hour");
        test.equal(m.minute(), 2, "keep minutes");
        test.equal(m.second(), 3, "keep seconds");
        test.equal(m.millisecond(), 4, "keep milliseconds");

        test.done();
    },

    "quarter setter bubble to next year" : function (test) {
        var m;
        test.expect(7);

        m = momentBuilder([2014, 4, 11, 1, 2, 3, 4]).quarter(7).freeze();
        test.equal(m.year(), 2015, "year bubbled");
        test.equal(m.month(), 7, "set month");
        test.equal(m.date(), 11, "keep date");
        test.equal(m.hour(), 1, "keep hour");
        test.equal(m.minute(), 2, "keep minutes");
        test.equal(m.second(), 3, "keep seconds");
        test.equal(m.millisecond(), 4, "keep milliseconds");

        test.done();
    },

    "quarter setter bubble to previous year" : function (test) {
        var m;
        test.expect(7);

        m = momentBuilder([2014, 4, 11, 1, 2, 3, 4]).quarter(-3).freeze();
        test.equal(m.year(), 2013, "year bubbled");
        test.equal(m.month(), 1, "set month");
        test.equal(m.date(), 11, "keep date");
        test.equal(m.hour(), 1, "keep hour");
        test.equal(m.minute(), 2, "keep minutes");
        test.equal(m.second(), 3, "keep seconds");
        test.equal(m.millisecond(), 4, "keep milliseconds");

        test.done();
    }
};

var frozenMoment = require("../../frozen-moment"),
    momentBuilder = frozenMoment.build;

exports.relativeTime = {
    "default thresholds" : function (test) {
        var a;

        // Seconds to minutes threshold
        a = momentBuilder();
        a = a = a.subtract(44, 'seconds');
        test.equal(a.freeze().fromNow(), "a few seconds ago", "Below default seconds to minutes threshold");
        a = a = a.subtract(1, 'seconds');
        test.equal(a.freeze().fromNow(), "a minute ago", "Above default seconds to minutes threshold");

        // Minutes to hours threshold
        a = momentBuilder();
        a = a = a.subtract(44, 'minutes');
        test.equal(a.freeze().fromNow(), "44 minutes ago", "Below default minute to hour threshold");
        a = a = a.subtract(1, 'minutes');
        test.equal(a.freeze().fromNow(), "an hour ago", "Above default minute to hour threshold");

        // Hours to days threshold
        a = momentBuilder();
        a = a = a.subtract(21, 'hours');
        test.equal(a.freeze().fromNow(), "21 hours ago", "Below default hours to day threshold");
        a = a = a.subtract(1, 'hours');
        test.equal(a.freeze().fromNow(), "a day ago", "Above default hours to day threshold");

        // Days to month threshold
        a = momentBuilder();
        a = a = a.subtract(25, 'days');
        test.equal(a.freeze().fromNow(), "25 days ago", "Below default days to month (singular) threshold");
        a = a = a.subtract(1, 'days');
        test.equal(a.freeze().fromNow(), "a month ago", "Above default days to month (singular) threshold");

        // months to year threshold
        a = momentBuilder();
        a = a = a.subtract(10, 'months');
        test.equal(a.freeze().fromNow(), "10 months ago", "Below default days to years threshold");
        a = a = a.subtract(1, 'month');
        test.equal(a.freeze().fromNow(), "a year ago", "Above default days to years threshold");

        test.done();
    },

    "custom thresholds" : function (test) {
        // Seconds to minutes threshold
        frozenMoment.relativeTimeThreshold('s', 55);

        var a = momentBuilder();
        a = a.subtract(54, 'seconds');
        test.equal(a.freeze().fromNow(), "a few seconds ago", "Below custom seconds to minutes threshold");
        a = a.subtract(1, 'seconds');
        test.equal(a.freeze().fromNow(), "a minute ago", "Above custom seconds to minutes threshold");

        frozenMoment.relativeTimeThreshold('s', 45);

        // Minutes to hours threshold
        frozenMoment.relativeTimeThreshold('m', 55);
        a = momentBuilder();
        a = a.subtract(54, 'minutes');
        test.equal(a.freeze().fromNow(), "54 minutes ago", "Below custom minutes to hours threshold");
        a = a.subtract(1, 'minutes');
        test.equal(a.freeze().fromNow(), "an hour ago", "Above custom minutes to hours threshold");
        frozenMoment.relativeTimeThreshold('m', 45);

        // Hours to days threshold
        frozenMoment.relativeTimeThreshold('h', 24);
        a = momentBuilder();
        a = a.subtract(23, 'hours');
        test.equal(a.freeze().fromNow(), "23 hours ago", "Below custom hours to days threshold");
        a = a.subtract(1, 'hours');
        test.equal(a.freeze().fromNow(), "a day ago", "Above custom hours to days threshold");
        frozenMoment.relativeTimeThreshold('h', 22);

        // Days to month threshold
        frozenMoment.relativeTimeThreshold('d', 28);
        a = momentBuilder();
        a = a.subtract(27, 'days');
        test.equal(a.freeze().fromNow(), "27 days ago", "Below custom days to month (singular) threshold");
        a = a.subtract(1, 'days');
        test.equal(a.freeze().fromNow(), "a month ago", "Above custom days to month (singular) threshold");
        frozenMoment.relativeTimeThreshold('d', 26);

        // months to years threshold
        frozenMoment.relativeTimeThreshold('M', 9);
        a = momentBuilder();
        a = a.subtract(8, 'months');
        test.equal(a.freeze().fromNow(), "8 months ago", "Below custom days to years threshold");
        a = a.subtract(1, 'months');
        test.equal(a.freeze().fromNow(), "a year ago", "Above custom days to years threshold");
        frozenMoment.relativeTimeThreshold('M', 11);
        test.done();
    },

    "retrive threshold settings" : function (test) {
        test.expect(1);
        frozenMoment.relativeTimeThreshold('m', 45);
        var minuteThreshold = frozenMoment.relativeTimeThreshold('m');

        test.equal(minuteThreshold, 45, "Can retrieve minute setting");

        test.done();
    }
};

var frozenMoment = require("../../frozen-moment"),
    momentBuilder = frozenMoment.build;

exports.endStartOf = {
    setUp : function (done) {
        frozenMoment.locale('en');
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    tearDown : function (cb) {
        frozenMoment.locale('en');
        cb();
    },

    "start of year" : function (test) {
        test.expect(9);

        var m = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('year').freeze(),
            ms = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('years').freeze(),
            ma = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('y').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 0, "strip out the month");
        test.equal(m.date(), 1, "strip out the day");
        test.equal(m.hours(), 0, "strip out the hours");
        test.equal(m.minutes(), 0, "strip out the minutes");
        test.equal(m.seconds(), 0, "strip out the seconds");
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },

    "end of year" : function (test) {
        test.expect(9);

        var m = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('year').freeze(),
            ms = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('years').freeze(),
            ma = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('y').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 11, "set the month");
        test.equal(m.date(), 31, "set the day");
        test.equal(m.hours(), 23, "set the hours");
        test.equal(m.minutes(), 59, "set the minutes");
        test.equal(m.seconds(), 59, "set the seconds");
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },

    "start of quarter" : function (test) {
        test.expect(10);

        var m = momentBuilder(new Date(2011, 4, 2, 3, 4, 5, 6)).startOf('quarter').freeze(),
            ms = momentBuilder(new Date(2011, 4, 2, 3, 4, 5, 6)).startOf('quarters').freeze(),
            ma = momentBuilder(new Date(2011, 4, 2, 3, 4, 5, 6)).startOf('Q').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.quarter(), 2, "keep the quarter");
        test.equal(m.month(), 3, "strip out the month");
        test.equal(m.date(), 1, "strip out the day");
        test.equal(m.hours(), 0, "strip out the hours");
        test.equal(m.minutes(), 0, "strip out the minutes");
        test.equal(m.seconds(), 0, "strip out the seconds");
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },

    "end of quarter" : function (test) {
        test.expect(10);

        var m = momentBuilder(new Date(2011, 4, 2, 3, 4, 5, 6)).endOf('quarter').freeze(),
            ms = momentBuilder(new Date(2011, 4, 2, 3, 4, 5, 6)).endOf('quarters').freeze(),
            ma = momentBuilder(new Date(2011, 4, 2, 3, 4, 5, 6)).endOf('Q').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.quarter(), 2, "keep the quarter");
        test.equal(m.month(), 5, "set the month");
        test.equal(m.date(), 30, "set the day");
        test.equal(m.hours(), 23, "set the hours");
        test.equal(m.minutes(), 59, "set the minutes");
        test.equal(m.seconds(), 59, "set the seconds");
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },

    "start of month" : function (test) {
        test.expect(9);

        var m = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('month').freeze(),
            ms = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('months').freeze(),
            ma = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('M').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 1, "strip out the day");
        test.equal(m.hours(), 0, "strip out the hours");
        test.equal(m.minutes(), 0, "strip out the minutes");
        test.equal(m.seconds(), 0, "strip out the seconds");
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },

    "end of month" : function (test) {
        test.expect(9);

        var m = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('month').freeze(),
            ms = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('months').freeze(),
            ma = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('M').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 28, "set the day");
        test.equal(m.hours(), 23, "set the hours");
        test.equal(m.minutes(), 59, "set the minutes");
        test.equal(m.seconds(), 59, "set the seconds");
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },

    "start of week" : function (test) {
        test.expect(10);

        var m = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('week').freeze(),
            ms = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('weeks').freeze(),
            ma = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('w').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 0, "rolls back to January");
        test.equal(m.day(), 0, "set day of week");
        test.equal(m.date(), 30, "set correct date");
        test.equal(m.hours(), 0, "strip out the hours");
        test.equal(m.minutes(), 0, "strip out the minutes");
        test.equal(m.seconds(), 0, "strip out the seconds");
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },

    "end of week" : function (test) {
        test.expect(10);

        var m = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('week').freeze(),
            ms = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('weeks').freeze(),
            ma = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('weeks').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.day(), 6, "set the day of the week");
        test.equal(m.date(), 5, "set the day");
        test.equal(m.hours(), 23, "set the hours");
        test.equal(m.minutes(), 59, "set the minutes");
        test.equal(m.seconds(), 59, "set the seconds");
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },

    "start of iso-week" : function (test) {
        test.expect(10);

        var m = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('isoWeek').freeze(),
            ms = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('isoWeeks').freeze(),
            ma = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('W').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 0, "rollback to January");
        test.equal(m.isoWeekday(), 1, "set day of iso-week");
        test.equal(m.date(), 31, "set correct date");
        test.equal(m.hours(), 0, "strip out the hours");
        test.equal(m.minutes(), 0, "strip out the minutes");
        test.equal(m.seconds(), 0, "strip out the seconds");
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },

    "end of iso-week" : function (test) {
        test.expect(10);

        var m = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('isoWeek').freeze(),
            ms = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('isoWeeks').freeze(),
            ma = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('W').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.isoWeekday(), 7, "set the day of the week");
        test.equal(m.date(), 6, "set the day");
        test.equal(m.hours(), 23, "set the hours");
        test.equal(m.minutes(), 59, "set the minutes");
        test.equal(m.seconds(), 59, "set the seconds");
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },

    "start of day" : function (test) {
        test.expect(9);

        var m = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('day').freeze(),
            ms = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('days').freeze(),
            ma = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('d').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 0, "strip out the hours");
        test.equal(m.minutes(), 0, "strip out the minutes");
        test.equal(m.seconds(), 0, "strip out the seconds");
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },

    "end of day" : function (test) {
        test.expect(9);

        var m = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('day').freeze(),
            ms = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('days').freeze(),
            ma = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('d').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 23, "set the hours");
        test.equal(m.minutes(), 59, "set the minutes");
        test.equal(m.seconds(), 59, "set the seconds");
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },

    "start of hour" : function (test) {
        test.expect(9);

        var m = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('hour').freeze(),
            ms = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('hours').freeze(),
            ma = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('h').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours");
        test.equal(m.minutes(), 0, "strip out the minutes");
        test.equal(m.seconds(), 0, "strip out the seconds");
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },

    "end of hour" : function (test) {
        test.expect(9);

        var m = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('hour').freeze(),
            ms = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('hours').freeze(),
            ma = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('h').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours");
        test.equal(m.minutes(), 59, "set the minutes");
        test.equal(m.seconds(), 59, "set the seconds");
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },

    "start of minute" : function (test) {
        test.expect(9);

        var m = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('minute').freeze(),
            ms = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('minutes').freeze(),
            ma = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('m').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours");
        test.equal(m.minutes(), 4, "keep the minutes");
        test.equal(m.seconds(), 0, "strip out the seconds");
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },

    "end of minute" : function (test) {
        test.expect(9);

        var m = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('minute').freeze(),
            ms = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('minutes').freeze(),
            ma = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('m').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours");
        test.equal(m.minutes(), 4, "keep the minutes");
        test.equal(m.seconds(), 59, "set the seconds");
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },

    "start of second" : function (test) {
        test.expect(9);

        var m = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('second').freeze(),
            ms = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('seconds').freeze(),
            ma = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('s').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours");
        test.equal(m.minutes(), 4, "keep the minutes");
        test.equal(m.seconds(), 5, "keep the the seconds");
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },

    "end of second" : function (test) {
        test.expect(9);

        var m = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('second').freeze(),
            ms = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('seconds').freeze(),
            ma = momentBuilder(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('s').freeze();
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours");
        test.equal(m.minutes(), 4, "keep the minutes");
        test.equal(m.seconds(), 5, "keep the seconds");
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },

    "startOf across DST +1" : function (test) {
        var oldUpdateOffset = momentBuilder.updateOffset,
            // Based on a real story somewhere in America/Los_Angeles
            dstAt = momentBuilder("2014-03-09T02:00:00-08:00").parseZone().freeze(),
            m;

        momentBuilder.updateOffset = function (mom, keepTime) {
            if (mom.freeze().isBefore(dstAt)) {
                mom.zone(8, keepTime);
            } else {
                mom.zone(7, keepTime);
            }
        };

        m = momentBuilder("2014-03-15T00:00:00-07:00").parseZone();
        m = m.startOf('M').freeze();
        test.equal(m.format(), "2014-03-01T00:00:00-08:00",
                "startOf('month') across +1");

        m = momentBuilder("2014-03-09T09:00:00-07:00").parseZone();
        m = m.startOf('d').freeze();
        test.equal(m.format(), "2014-03-09T00:00:00-08:00",
                "startOf('day') across +1");

        m = momentBuilder("2014-03-09T03:05:00-07:00").parseZone();
        m = m.startOf('h').freeze();
        test.equal(m.format(), "2014-03-09T03:00:00-07:00",
                "startOf('hour') after +1");

        m = momentBuilder("2014-03-09T01:35:00-08:00").parseZone();
        m = m.startOf('h').freeze();
        test.equal(m.format(), "2014-03-09T01:00:00-08:00",
                "startOf('hour') before +1");

        // There is no such time as 2:30-7 to try startOf('hour') across that

        momentBuilder.updateOffset = oldUpdateOffset;

        test.done();
    },

    "startOf across DST -1" : function (test) {
        var oldUpdateOffset = momentBuilder.updateOffset,
            // Based on a real story somewhere in America/Los_Angeles
            dstAt = momentBuilder("2014-11-02T02:00:00-07:00").parseZone().freeze(),
            m;

        momentBuilder.updateOffset = function (mom, keepTime) {
            if (mom.freeze().isBefore(dstAt)) {
                mom.zone(7, keepTime);
            } else {
                mom.zone(8, keepTime);
            }
        };

        m = momentBuilder("2014-11-15T00:00:00-08:00").parseZone();
        m = m.startOf('M').freeze();
        test.equal(m.format(), "2014-11-01T00:00:00-07:00",
                "startOf('month') across -1");

        m = momentBuilder("2014-11-02T09:00:00-08:00").parseZone();
        m = m.startOf('d').freeze();
        test.equal(m.format(), "2014-11-02T00:00:00-07:00",
                "startOf('day') across -1");

        // note that zone is -8
        m = momentBuilder("2014-11-02T01:30:00-08:00").parseZone();
        m = m.startOf('h').freeze();
        test.equal(m.format(), "2014-11-02T01:00:00-08:00",
                "startOf('hour') after +1");

        // note that zone is -7
        m = momentBuilder("2014-11-02T01:30:00-07:00").parseZone();
        m = m.startOf('h').freeze();
        test.equal(m.format(), "2014-11-02T01:00:00-07:00",
                "startOf('hour') before +1");

        momentBuilder.updateOffset = oldUpdateOffset;

        test.done();
    }
};

var frozenMoment = require("../../frozen-moment");

exports.stringPrototype = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "string prototype overrides call" : function (test) {
        test.expect(1);

        frozenMoment.locale('en');
        var prior = String.prototype.call, b;
        String.prototype.call = function () {
            return null;
        };

        b = frozenMoment(new Date(2011, 7, 28, 15, 25, 50, 125));
        test.equal(b.format('MMMM Do YYYY, h:mm a'), 'August 28th 2011, 3:25 pm');

        String.prototype.call = prior;
        test.done();
    }

};

var frozenMoment = require("../../frozen-moment");

exports.utc = {
    setUp : function (done) {
        frozenMoment.locale('en');
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };

        done();
    },

    tearDown : function (cb) {
        frozenMoment.locale('en');
        cb();
    },

    "utc and local" : function (test) {
        test.expect(7);

        var m = frozenMoment.build(Date.UTC(2011, 1, 2, 3, 4, 5, 6)), zone, expected;
        m = m.utc().freeze();
        // utc
        test.equal(m.date(), 2, "the day should be correct for utc");
        test.equal(m.day(), 3, "the date should be correct for utc");
        test.equal(m.hours(), 3, "the hours should be correct for utc");

        // local
        m = m.thaw().local().freeze();
        if (m.zone() > 180) {
            test.equal(m.date(), 1, "the date should be correct for local");
            test.equal(m.day(), 2, "the day should be correct for local");
        } else {
            test.equal(m.date(), 2, "the date should be correct for local");
            test.equal(m.day(), 3, "the day should be correct for local");
        }
        zone = Math.ceil(m.zone() / 60);
        expected = (24 + 3 - zone) % 24;
        test.equal(m.hours(), expected, "the hours (" + m.hours() + ") should be correct for local");
        test.equal(frozenMoment.utc().zone(), 0, "timezone in utc should always be zero");

        test.done();
    },

    "creating with utc and no arguments" : function (test) {
        test.expect(2);

        var startOfTest = new Date().valueOf(),
            frozenMomentDefaultUtcTime = frozenMoment.utc().valueOf(),
            afterMomentCreationTime = new Date().valueOf();

        test.ok(startOfTest <= frozenMomentDefaultUtcTime, "frozenMoment UTC default time should be now, not in the past");
        test.ok(frozenMomentDefaultUtcTime <= afterMomentCreationTime, "frozenMoment UTC default time should be now, not in the future");

        test.done();
    },

    "creating with utc and a date parameter array" : function (test) {
        test.expect(6);

        var m = frozenMoment.utc([2011, 1, 2, 3, 4, 5, 6]);
        test.equal(m.date(), 2, "the day should be correct for utc array");
        test.equal(m.hours(), 3, "the hours should be correct for utc array");

        m = frozenMoment.utc("2011-02-02 3:04:05", "YYYY-MM-DD HH:mm:ss");
        test.equal(m.date(), 2, "the day should be correct for utc parsing format");
        test.equal(m.hours(), 3, "the hours should be correct for utc parsing format");

        m = frozenMoment.utc("2011-02-02T03:04:05+00:00");
        test.equal(m.date(), 2, "the day should be correct for utc parsing iso");
        test.equal(m.hours(), 3, "the hours should be correct for utc parsing iso");

        test.done();
    },

    "creating with utc without timezone" : function (test) {
        test.expect(4);

        var m = frozenMoment.utc("2012-01-02T08:20:00");
        test.equal(m.date(), 2, "the day should be correct for utc parse without timezone");
        test.equal(m.hours(), 8, "the hours should be correct for utc parse without timezone");

        m = frozenMoment.utc("2012-01-02T08:20:00+09:00");
        test.equal(m.date(), 1, "the day should be correct for utc parse with timezone");
        test.equal(m.hours(), 23, "the hours should be correct for utc parse with timezone");

        test.done();
    },

    "cloning with utc" : function (test) {
        test.expect(4);

        var m = frozenMoment.utc("2012-01-02T08:20:00");
        test.equal(frozenMoment.utc(m)._isUTC, true, "the local zone should be converted to UTC");
        test.equal(frozenMoment.utc(m.thaw().utc())._isUTC, true, "the local zone should stay in UTC");

        m.zone(120);
        test.equal(frozenMoment.utc(m)._isUTC, true, "the explicit zone should stay in UTC");
        test.equal(frozenMoment.utc(m).zone(), 0, "the explicit zone should have an offset of 0");

        test.done();
    },

    "weekday with utc" : function (test) {
        test.expect(1);

        test.equal(
            frozenMoment.build('2013-09-15T00:00:00Z').utc().freeze().weekday(), // first minute of the day
            frozenMoment.build('2013-09-15T23:59:00Z').utc().freeze().weekday(), // last minute of the day
            "a UTC-frozenMoment's .weekday() should not be affected by the local timezone"
        );

        test.done();
    }
};

var frozenMoment = require("../../frozen-moment");

exports.weekYear = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "iso week year": function (test) {
        test.expect(19);

        // Some examples taken from http://en.wikipedia.org/wiki/ISO_week
        test.equal(frozenMoment([2005, 0, 1]).isoWeekYear(), 2004);
        test.equal(frozenMoment([2005, 0, 2]).isoWeekYear(), 2004);
        test.equal(frozenMoment([2005, 0, 3]).isoWeekYear(), 2005);
        test.equal(frozenMoment([2005, 11, 31]).isoWeekYear(), 2005);
        test.equal(frozenMoment([2006, 0, 1]).isoWeekYear(), 2005);
        test.equal(frozenMoment([2006, 0, 2]).isoWeekYear(), 2006);
        test.equal(frozenMoment([2007, 0, 1]).isoWeekYear(), 2007);
        test.equal(frozenMoment([2007, 11, 30]).isoWeekYear(), 2007);
        test.equal(frozenMoment([2007, 11, 31]).isoWeekYear(), 2008);
        test.equal(frozenMoment([2008, 0, 1]).isoWeekYear(), 2008);
        test.equal(frozenMoment([2008, 11, 28]).isoWeekYear(), 2008);
        test.equal(frozenMoment([2008, 11, 29]).isoWeekYear(), 2009);
        test.equal(frozenMoment([2008, 11, 30]).isoWeekYear(), 2009);
        test.equal(frozenMoment([2008, 11, 31]).isoWeekYear(), 2009);
        test.equal(frozenMoment([2009, 0, 1]).isoWeekYear(), 2009);
        test.equal(frozenMoment([2010, 0, 1]).isoWeekYear(), 2009);
        test.equal(frozenMoment([2010, 0, 2]).isoWeekYear(), 2009);
        test.equal(frozenMoment([2010, 0, 3]).isoWeekYear(), 2009);
        test.equal(frozenMoment([2010, 0, 4]).isoWeekYear(), 2010);

        test.done();
    },

    "week year": function (test) {
        test.expect(31);

        // Some examples taken from http://en.wikipedia.org/wiki/ISO_week
        frozenMoment.locale('dow: 1,doy: 4', {week: {dow: 1, doy: 4}}); // like iso
        test.equal(frozenMoment([2005, 0, 1]).weekYear(), 2004);
        test.equal(frozenMoment([2005, 0, 2]).weekYear(), 2004);
        test.equal(frozenMoment([2005, 0, 3]).weekYear(), 2005);
        test.equal(frozenMoment([2005, 11, 31]).weekYear(), 2005);
        test.equal(frozenMoment([2006, 0, 1]).weekYear(), 2005);
        test.equal(frozenMoment([2006, 0, 2]).weekYear(), 2006);
        test.equal(frozenMoment([2007, 0, 1]).weekYear(), 2007);
        test.equal(frozenMoment([2007, 11, 30]).weekYear(), 2007);
        test.equal(frozenMoment([2007, 11, 31]).weekYear(), 2008);
        test.equal(frozenMoment([2008, 0, 1]).weekYear(), 2008);
        test.equal(frozenMoment([2008, 11, 28]).weekYear(), 2008);
        test.equal(frozenMoment([2008, 11, 29]).weekYear(), 2009);
        test.equal(frozenMoment([2008, 11, 30]).weekYear(), 2009);
        test.equal(frozenMoment([2008, 11, 31]).weekYear(), 2009);
        test.equal(frozenMoment([2009, 0, 1]).weekYear(), 2009);
        test.equal(frozenMoment([2010, 0, 1]).weekYear(), 2009);
        test.equal(frozenMoment([2010, 0, 2]).weekYear(), 2009);
        test.equal(frozenMoment([2010, 0, 3]).weekYear(), 2009);
        test.equal(frozenMoment([2010, 0, 4]).weekYear(), 2010);

        frozenMoment.locale('dow: 1,doy: 7', {week: {dow: 1, doy: 7}});
        test.equal(frozenMoment([2004, 11, 26]).weekYear(), 2004);
        test.equal(frozenMoment([2004, 11, 27]).weekYear(), 2005);
        test.equal(frozenMoment([2005, 11, 25]).weekYear(), 2005);
        test.equal(frozenMoment([2005, 11, 26]).weekYear(), 2006);
        test.equal(frozenMoment([2006, 11, 31]).weekYear(), 2006);
        test.equal(frozenMoment([2007,  0,  1]).weekYear(), 2007);
        test.equal(frozenMoment([2007, 11, 30]).weekYear(), 2007);
        test.equal(frozenMoment([2007, 11, 31]).weekYear(), 2008);
        test.equal(frozenMoment([2008, 11, 28]).weekYear(), 2008);
        test.equal(frozenMoment([2008, 11, 29]).weekYear(), 2009);
        test.equal(frozenMoment([2009, 11, 27]).weekYear(), 2009);
        test.equal(frozenMoment([2009, 11, 28]).weekYear(), 2010);

        test.done();
    }
};

var frozenMoment = require("../../frozen-moment");

exports.weekYear = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "iso weekday": function (test) {
        var i;
        test.expect(7 * 7);

        for (i = 0; i < 7; ++i) {
            frozenMoment.locale('dow:' + i + ',doy: 6', {week: {dow: i, doy: 6}});
            test.equal(frozenMoment([1985, 1,  4]).isoWeekday(), 1, "Feb  4 1985 is Monday    -- 1st day");
            test.equal(frozenMoment([2029, 8, 18]).isoWeekday(), 2, "Sep 18 2029 is Tuesday   -- 2nd day");
            test.equal(frozenMoment([2013, 3, 24]).isoWeekday(), 3, "Apr 24 2013 is Wednesday -- 3rd day");
            test.equal(frozenMoment([2015, 2,  5]).isoWeekday(), 4, "Mar  5 2015 is Thursday  -- 4th day");
            test.equal(frozenMoment([1970, 0,  2]).isoWeekday(), 5, "Jan  2 1970 is Friday    -- 5th day");
            test.equal(frozenMoment([2001, 4, 12]).isoWeekday(), 6, "May 12 2001 is Saturday  -- 6th day");
            test.equal(frozenMoment([2000, 0,  2]).isoWeekday(), 7, "Jan  2 2000 is Sunday    -- 7th day");
        }
        test.done();
    },

    "iso weekday setter" : function (test) {
        test.expect(27);

        var a = frozenMoment.build([2011, 0, 10]);
        test.equal(a.clone().isoWeekday(1).freeze().date(),  10, 'set from mon to mon');
        test.equal(a.clone().isoWeekday(4).freeze().date(),  13, 'set from mon to thu');
        test.equal(a.clone().isoWeekday(7).freeze().date(),  16, 'set from mon to sun');
        test.equal(a.clone().isoWeekday(-6).freeze().date(),  3, 'set from mon to last mon');
        test.equal(a.clone().isoWeekday(-3).freeze().date(),  6, 'set from mon to last thu');
        test.equal(a.clone().isoWeekday(0).freeze().date(),   9, 'set from mon to last sun');
        test.equal(a.clone().isoWeekday(8).freeze().date(),  17, 'set from mon to next mon');
        test.equal(a.clone().isoWeekday(11).freeze().date(), 20, 'set from mon to next thu');
        test.equal(a.clone().isoWeekday(14).freeze().date(), 23, 'set from mon to next sun');

        a = frozenMoment.build([2011, 0, 13]);
        test.equal(a.clone().isoWeekday(1).freeze().date(), 10, 'set from thu to mon');
        test.equal(a.clone().isoWeekday(4).freeze().date(), 13, 'set from thu to thu');
        test.equal(a.clone().isoWeekday(7).freeze().date(), 16, 'set from thu to sun');
        test.equal(a.clone().isoWeekday(-6).freeze().date(),  3, 'set from thu to last mon');
        test.equal(a.clone().isoWeekday(-3).freeze().date(),  6, 'set from thu to last thu');
        test.equal(a.clone().isoWeekday(0).freeze().date(),   9, 'set from thu to last sun');
        test.equal(a.clone().isoWeekday(8).freeze().date(),  17, 'set from thu to next mon');
        test.equal(a.clone().isoWeekday(11).freeze().date(), 20, 'set from thu to next thu');
        test.equal(a.clone().isoWeekday(14).freeze().date(), 23, 'set from thu to next sun');

        a = frozenMoment.build([2011, 0, 16]);
        test.equal(a.clone().isoWeekday(1).freeze().date(), 10, 'set from sun to mon');
        test.equal(a.clone().isoWeekday(4).freeze().date(), 13, 'set from sun to thu');
        test.equal(a.clone().isoWeekday(7).freeze().date(), 16, 'set from sun to sun');
        test.equal(a.clone().isoWeekday(-6).freeze().date(),  3, 'set from sun to last mon');
        test.equal(a.clone().isoWeekday(-3).freeze().date(),  6, 'set from sun to last thu');
        test.equal(a.clone().isoWeekday(0).freeze().date(),   9, 'set from sun to last sun');
        test.equal(a.clone().isoWeekday(8).freeze().date(),  17, 'set from sun to next mon');
        test.equal(a.clone().isoWeekday(11).freeze().date(), 20, 'set from sun to next thu');
        test.equal(a.clone().isoWeekday(14).freeze().date(), 23, 'set from sun to next sun');

        test.done();
    },

    "weekday first day of week Sunday (dow 0)": function (test) {
        test.expect(7);

        frozenMoment.locale('dow: 0,doy: 6', {week: {dow: 0, doy: 6}});
        test.equal(frozenMoment([1985, 1,  3]).weekday(), 0, "Feb  3 1985 is Sunday    -- 0th day");
        test.equal(frozenMoment([2029, 8, 17]).weekday(), 1, "Sep 17 2029 is Monday    -- 1st day");
        test.equal(frozenMoment([2013, 3, 23]).weekday(), 2, "Apr 23 2013 is Tuesday   -- 2nd day");
        test.equal(frozenMoment([2015, 2,  4]).weekday(), 3, "Mar  4 2015 is Wednesday -- 3nd day");
        test.equal(frozenMoment([1970, 0,  1]).weekday(), 4, "Jan  1 1970 is Thursday  -- 4th day");
        test.equal(frozenMoment([2001, 4, 11]).weekday(), 5, "May 11 2001 is Friday    -- 5th day");
        test.equal(frozenMoment([2000, 0,  1]).weekday(), 6, "Jan  1 2000 is Saturday  -- 6th day");
        test.done();
    },

    "weekday first day of week Monday (dow 1)": function (test) {
        test.expect(7);

        frozenMoment.locale('dow: 1,doy: 6', {week: {dow: 1, doy: 6}});
        test.equal(frozenMoment([1985, 1,  4]).weekday(), 0, "Feb  4 1985 is Monday    -- 0th day");
        test.equal(frozenMoment([2029, 8, 18]).weekday(), 1, "Sep 18 2029 is Tuesday   -- 1st day");
        test.equal(frozenMoment([2013, 3, 24]).weekday(), 2, "Apr 24 2013 is Wednesday -- 2nd day");
        test.equal(frozenMoment([2015, 2,  5]).weekday(), 3, "Mar  5 2015 is Thursday  -- 3nd day");
        test.equal(frozenMoment([1970, 0,  2]).weekday(), 4, "Jan  2 1970 is Friday    -- 4th day");
        test.equal(frozenMoment([2001, 4, 12]).weekday(), 5, "May 12 2001 is Saturday  -- 5th day");
        test.equal(frozenMoment([2000, 0,  2]).weekday(), 6, "Jan  2 2000 is Sunday    -- 6th day");
        test.done();
    },

    "weekday first day of week Tuesday (dow 2)": function (test) {
        test.expect(7);

        frozenMoment.locale('dow: 2,doy: 6', {week: {dow: 2, doy: 6}});
        test.equal(frozenMoment([1985, 1,  5]).weekday(), 0, "Feb  5 1985 is Tuesday   -- 0th day");
        test.equal(frozenMoment([2029, 8, 19]).weekday(), 1, "Sep 19 2029 is Wednesday -- 1st day");
        test.equal(frozenMoment([2013, 3, 25]).weekday(), 2, "Apr 25 2013 is Thursday  -- 2nd day");
        test.equal(frozenMoment([2015, 2,  6]).weekday(), 3, "Mar  6 2015 is Friday    -- 3nd day");
        test.equal(frozenMoment([1970, 0,  3]).weekday(), 4, "Jan  3 1970 is Staturday -- 4th day");
        test.equal(frozenMoment([2001, 4, 13]).weekday(), 5, "May 13 2001 is Sunday    -- 5th day");
        test.equal(frozenMoment([2000, 0,  3]).weekday(), 6, "Jan  3 2000 is Monday    -- 6th day");
        test.done();
    },

    "weekday first day of week Wednesday (dow 3)": function (test) {
        test.expect(7);

        frozenMoment.locale('dow: 3,doy: 6', {week: {dow: 3, doy: 6}});
        test.equal(frozenMoment([1985, 1,  6]).weekday(), 0, "Feb  6 1985 is Wednesday -- 0th day");
        test.equal(frozenMoment([2029, 8, 20]).weekday(), 1, "Sep 20 2029 is Thursday  -- 1st day");
        test.equal(frozenMoment([2013, 3, 26]).weekday(), 2, "Apr 26 2013 is Friday    -- 2nd day");
        test.equal(frozenMoment([2015, 2,  7]).weekday(), 3, "Mar  7 2015 is Saturday  -- 3nd day");
        test.equal(frozenMoment([1970, 0,  4]).weekday(), 4, "Jan  4 1970 is Sunday    -- 4th day");
        test.equal(frozenMoment([2001, 4, 14]).weekday(), 5, "May 14 2001 is Monday    -- 5th day");
        test.equal(frozenMoment([2000, 0,  4]).weekday(), 6, "Jan  4 2000 is Tuesday   -- 6th day");
        frozenMoment.locale('dow:3,doy:6', null);
        test.done();
    },

    "weekday first day of week Thursday (dow 4)": function (test) {
        test.expect(7);

        frozenMoment.locale('dow: 4,doy: 6', {week: {dow: 4, doy: 6}});

        test.equal(frozenMoment([1985, 1,  7]).weekday(), 0, "Feb  7 1985 is Thursday  -- 0th day");
        test.equal(frozenMoment([2029, 8, 21]).weekday(), 1, "Sep 21 2029 is Friday    -- 1st day");
        test.equal(frozenMoment([2013, 3, 27]).weekday(), 2, "Apr 27 2013 is Saturday  -- 2nd day");
        test.equal(frozenMoment([2015, 2,  8]).weekday(), 3, "Mar  8 2015 is Sunday    -- 3nd day");
        test.equal(frozenMoment([1970, 0,  5]).weekday(), 4, "Jan  5 1970 is Monday    -- 4th day");
        test.equal(frozenMoment([2001, 4, 15]).weekday(), 5, "May 15 2001 is Tuesday   -- 5th day");
        test.equal(frozenMoment([2000, 0,  5]).weekday(), 6, "Jan  5 2000 is Wednesday -- 6th day");
        test.done();
    },

    "weekday first day of week Friday (dow 5)": function (test) {
        test.expect(7);

        frozenMoment.locale('dow: 5,doy: 6', {week: {dow: 5, doy: 6}});
        test.equal(frozenMoment([1985, 1,  8]).weekday(), 0, "Feb  8 1985 is Friday    -- 0th day");
        test.equal(frozenMoment([2029, 8, 22]).weekday(), 1, "Sep 22 2029 is Staturday -- 1st day");
        test.equal(frozenMoment([2013, 3, 28]).weekday(), 2, "Apr 28 2013 is Sunday    -- 2nd day");
        test.equal(frozenMoment([2015, 2,  9]).weekday(), 3, "Mar  9 2015 is Monday    -- 3nd day");
        test.equal(frozenMoment([1970, 0,  6]).weekday(), 4, "Jan  6 1970 is Tuesday   -- 4th day");
        test.equal(frozenMoment([2001, 4, 16]).weekday(), 5, "May 16 2001 is Wednesday -- 5th day");
        test.equal(frozenMoment([2000, 0,  6]).weekday(), 6, "Jan  6 2000 is Thursday  -- 6th day");
        test.done();
    },

    "weekday first day of week Saturday (dow 6)": function (test) {
        test.expect(7);

        frozenMoment.locale('dow: 6,doy: 6', {week: {dow: 6, doy: 6}});
        test.equal(frozenMoment([1985, 1,  9]).weekday(), 0, "Feb  9 1985 is Staturday -- 0th day");
        test.equal(frozenMoment([2029, 8, 23]).weekday(), 1, "Sep 23 2029 is Sunday    -- 1st day");
        test.equal(frozenMoment([2013, 3, 29]).weekday(), 2, "Apr 29 2013 is Monday    -- 2nd day");
        test.equal(frozenMoment([2015, 2, 10]).weekday(), 3, "Mar 10 2015 is Tuesday   -- 3nd day");
        test.equal(frozenMoment([1970, 0,  7]).weekday(), 4, "Jan  7 1970 is Wednesday -- 4th day");
        test.equal(frozenMoment([2001, 4, 17]).weekday(), 5, "May 17 2001 is Thursday  -- 5th day");
        test.equal(frozenMoment([2000, 0,  7]).weekday(), 6, "Jan  7 2000 is Friday    -- 6th day");
        test.done();
    }
};

var frozenMoment = require("../../frozen-moment"),
    momentBuilder = frozenMoment.build;

exports.weeks = {
    setUp : function (done) {
        frozenMoment.locale('en');
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };

        done();
    },

    tearDown : function (cb) {
        frozenMoment.locale('en');
        cb();
    },

    "day of year" : function (test) {
        test.expect(8);

        test.equal(frozenMoment([2000,  0,  1]).dayOfYear(),   1, "Jan  1 2000 should be day 1 of the year");
        test.equal(frozenMoment([2000,  1, 28]).dayOfYear(),  59, "Feb 28 2000 should be day 59 of the year");
        test.equal(frozenMoment([2000,  1, 29]).dayOfYear(),  60, "Feb 28 2000 should be day 60 of the year");
        test.equal(frozenMoment([2000, 11, 31]).dayOfYear(), 366, "Dec 31 2000 should be day 366 of the year");
        test.equal(frozenMoment([2001,  0,  1]).dayOfYear(),   1, "Jan  1 2001 should be day 1 of the year");
        test.equal(frozenMoment([2001,  1, 28]).dayOfYear(),  59, "Feb 28 2001 should be day 59 of the year");
        test.equal(frozenMoment([2001,  2,  1]).dayOfYear(),  60, "Mar  1 2001 should be day 60 of the year");
        test.equal(frozenMoment([2001, 11, 31]).dayOfYear(), 365, "Dec 31 2001 should be day 365 of the year");

        test.done();
    },

    "day of year setters" : function (test) {
        test.expect(8);

        test.equal(momentBuilder([2000,  0,  1]).dayOfYear(200).freeze().dayOfYear(), 200, "Setting Jan  1 2000 day of the year to 200 should work");
        test.equal(momentBuilder([2000,  1, 28]).dayOfYear(200).freeze().dayOfYear(), 200, "Setting Feb 28 2000 day of the year to 200 should work");
        test.equal(momentBuilder([2000,  1, 29]).dayOfYear(200).freeze().dayOfYear(), 200, "Setting Feb 28 2000 day of the year to 200 should work");
        test.equal(momentBuilder([2000, 11, 31]).dayOfYear(200).freeze().dayOfYear(), 200, "Setting Dec 31 2000 day of the year to 200 should work");
        test.equal(momentBuilder().dayOfYear(1).freeze().dayOfYear(),   1, "Setting day of the year to 1 should work");
        test.equal(momentBuilder().dayOfYear(59).freeze().dayOfYear(),  59, "Setting day of the year to 59 should work");
        test.equal(momentBuilder().dayOfYear(60).freeze().dayOfYear(),  60, "Setting day of the year to 60 should work");
        test.equal(momentBuilder().dayOfYear(365).freeze().dayOfYear(), 365, "Setting day of the year to 365 should work");

        test.done();
    },

    "iso weeks year starting sunday" : function (test) {
        test.expect(5);

        test.equal(frozenMoment([2012, 0, 1]).isoWeek(), 52, "Jan  1 2012 should be iso week 52");
        test.equal(frozenMoment([2012, 0, 2]).isoWeek(),  1, "Jan  2 2012 should be iso week 1");
        test.equal(frozenMoment([2012, 0, 8]).isoWeek(),  1, "Jan  8 2012 should be iso week 1");
        test.equal(frozenMoment([2012, 0, 9]).isoWeek(),  2, "Jan  9 2012 should be iso week 2");
        test.equal(frozenMoment([2012, 0, 15]).isoWeek(), 2, "Jan 15 2012 should be iso week 2");

        test.done();
    },

    "iso weeks year starting monday" : function (test) {
        test.expect(5);

        test.equal(frozenMoment([2007, 0, 1]).isoWeek(),  1, "Jan  1 2007 should be iso week 1");
        test.equal(frozenMoment([2007, 0, 7]).isoWeek(),  1, "Jan  7 2007 should be iso week 1");
        test.equal(frozenMoment([2007, 0, 8]).isoWeek(),  2, "Jan  8 2007 should be iso week 2");
        test.equal(frozenMoment([2007, 0, 14]).isoWeek(), 2, "Jan 14 2007 should be iso week 2");
        test.equal(frozenMoment([2007, 0, 15]).isoWeek(), 3, "Jan 15 2007 should be iso week 3");

        test.done();
    },

    "iso weeks year starting tuesday" : function (test) {
        test.expect(6);

        test.equal(frozenMoment([2007, 11, 31]).isoWeek(), 1, "Dec 31 2007 should be iso week 1");
        test.equal(frozenMoment([2008,  0,  1]).isoWeek(), 1, "Jan  1 2008 should be iso week 1");
        test.equal(frozenMoment([2008,  0,  6]).isoWeek(), 1, "Jan  6 2008 should be iso week 1");
        test.equal(frozenMoment([2008,  0,  7]).isoWeek(), 2, "Jan  7 2008 should be iso week 2");
        test.equal(frozenMoment([2008,  0, 13]).isoWeek(), 2, "Jan 13 2008 should be iso week 2");
        test.equal(frozenMoment([2008,  0, 14]).isoWeek(), 3, "Jan 14 2008 should be iso week 3");

        test.done();
    },

    "iso weeks year starting wednesday" : function (test) {
        test.expect(6);

        test.equal(frozenMoment([2002, 11, 30]).isoWeek(), 1, "Dec 30 2002 should be iso week 1");
        test.equal(frozenMoment([2003,  0,  1]).isoWeek(), 1, "Jan  1 2003 should be iso week 1");
        test.equal(frozenMoment([2003,  0,  5]).isoWeek(), 1, "Jan  5 2003 should be iso week 1");
        test.equal(frozenMoment([2003,  0,  6]).isoWeek(), 2, "Jan  6 2003 should be iso week 2");
        test.equal(frozenMoment([2003,  0, 12]).isoWeek(), 2, "Jan 12 2003 should be iso week 2");
        test.equal(frozenMoment([2003,  0, 13]).isoWeek(), 3, "Jan 13 2003 should be iso week 3");

        test.done();
    },

    "iso weeks year starting thursday" : function (test) {
        test.expect(6);

        test.equal(frozenMoment([2008, 11, 29]).isoWeek(), 1, "Dec 29 2008 should be iso week 1");
        test.equal(frozenMoment([2009,  0,  1]).isoWeek(), 1, "Jan  1 2009 should be iso week 1");
        test.equal(frozenMoment([2009,  0,  4]).isoWeek(), 1, "Jan  4 2009 should be iso week 1");
        test.equal(frozenMoment([2009,  0,  5]).isoWeek(), 2, "Jan  5 2009 should be iso week 2");
        test.equal(frozenMoment([2009,  0, 11]).isoWeek(), 2, "Jan 11 2009 should be iso week 2");
        test.equal(frozenMoment([2009,  0, 13]).isoWeek(), 3, "Jan 12 2009 should be iso week 3");

        test.done();
    },

    "iso weeks year starting friday" : function (test) {
        test.expect(6);

        test.equal(frozenMoment([2009, 11, 28]).isoWeek(), 53, "Dec 28 2009 should be iso week 53");
        test.equal(frozenMoment([2010,  0,  1]).isoWeek(), 53, "Jan  1 2010 should be iso week 53");
        test.equal(frozenMoment([2010,  0,  3]).isoWeek(), 53, "Jan  3 2010 should be iso week 53");
        test.equal(frozenMoment([2010,  0,  4]).isoWeek(),  1, "Jan  4 2010 should be iso week 1");
        test.equal(frozenMoment([2010,  0, 10]).isoWeek(),  1, "Jan 10 2010 should be iso week 1");
        test.equal(frozenMoment([2010,  0, 11]).isoWeek(),  2, "Jan 11 2010 should be iso week 2");

        test.done();
    },

    "iso weeks year starting saturday" : function (test) {
        test.expect(6);

        test.equal(frozenMoment([2010, 11, 27]).isoWeek(), 52, "Dec 27 2010 should be iso week 52");
        test.equal(frozenMoment([2011,  0,  1]).isoWeek(), 52, "Jan  1 2011 should be iso week 52");
        test.equal(frozenMoment([2011,  0,  2]).isoWeek(), 52, "Jan  2 2011 should be iso week 52");
        test.equal(frozenMoment([2011,  0,  3]).isoWeek(),  1, "Jan  3 2011 should be iso week 1");
        test.equal(frozenMoment([2011,  0,  9]).isoWeek(),  1, "Jan  9 2011 should be iso week 1");
        test.equal(frozenMoment([2011,  0, 10]).isoWeek(),  2, "Jan 10 2011 should be iso week 2");

        test.done();
    },

    "iso weeks year starting sunday formatted" : function (test) {
        test.expect(5);

        test.equal(frozenMoment([2012, 0,  1]).format('W WW Wo'), '52 52 52nd', "Jan  1 2012 should be iso week 52");
        test.equal(frozenMoment([2012, 0,  2]).format('W WW Wo'),   '1 01 1st', "Jan  2 2012 should be iso week 1");
        test.equal(frozenMoment([2012, 0,  8]).format('W WW Wo'),   '1 01 1st', "Jan  8 2012 should be iso week 1");
        test.equal(frozenMoment([2012, 0,  9]).format('W WW Wo'),   '2 02 2nd', "Jan  9 2012 should be iso week 2");
        test.equal(frozenMoment([2012, 0, 15]).format('W WW Wo'),   '2 02 2nd', "Jan 15 2012 should be iso week 2");

        test.done();
    },

    "weeks plural year starting sunday" : function (test) {
        test.expect(5);

        test.equal(frozenMoment([2012, 0,  1]).weeks(), 1, "Jan  1 2012 should be week 1");
        test.equal(frozenMoment([2012, 0,  7]).weeks(), 1, "Jan  7 2012 should be week 1");
        test.equal(frozenMoment([2012, 0,  8]).weeks(), 2, "Jan  8 2012 should be week 2");
        test.equal(frozenMoment([2012, 0, 14]).weeks(), 2, "Jan 14 2012 should be week 2");
        test.equal(frozenMoment([2012, 0, 15]).weeks(), 3, "Jan 15 2012 should be week 3");

        test.done();
    },

    "iso weeks plural year starting sunday" : function (test) {
        test.expect(5);

        test.equal(frozenMoment([2012, 0, 1]).isoWeeks(), 52, "Jan  1 2012 should be iso week 52");
        test.equal(frozenMoment([2012, 0, 2]).isoWeeks(),  1, "Jan  2 2012 should be iso week 1");
        test.equal(frozenMoment([2012, 0, 8]).isoWeeks(),  1, "Jan  8 2012 should be iso week 1");
        test.equal(frozenMoment([2012, 0, 9]).isoWeeks(),  2, "Jan  9 2012 should be iso week 2");
        test.equal(frozenMoment([2012, 0, 15]).isoWeeks(), 2, "Jan 15 2012 should be iso week 2");

        test.done();
    },

    "weeks setter" : function (test) {
        test.expect(5);

        test.equal(momentBuilder([2012, 0,  1]).week(30).freeze().week(), 30, "Setting Jan 1 2012 to week 30 should work");
        test.equal(momentBuilder([2012, 0,  7]).week(30).freeze().week(), 30, "Setting Jan 7 2012 to week 30 should work");
        test.equal(momentBuilder([2012, 0,  8]).week(30).freeze().week(), 30, "Setting Jan 8 2012 to week 30 should work");
        test.equal(momentBuilder([2012, 0, 14]).week(30).freeze().week(), 30, "Setting Jan 14 2012 to week 30 should work");
        test.equal(momentBuilder([2012, 0, 15]).week(30).freeze().week(), 30, "Setting Jan 15 2012 to week 30 should work");

        test.done();
    },

    "iso weeks setter" : function (test) {
        test.expect(5);

        test.equal(momentBuilder([2012, 0,  1]).isoWeeks(25).freeze().isoWeeks(), 25, "Setting Jan  1 2012 to week 25 should work");
        test.equal(momentBuilder([2012, 0,  2]).isoWeeks(24).freeze().isoWeeks(), 24, "Setting Jan  2 2012 to week 24 should work");
        test.equal(momentBuilder([2012, 0,  8]).isoWeeks(23).freeze().isoWeeks(), 23, "Setting Jan  8 2012 to week 23 should work");
        test.equal(momentBuilder([2012, 0,  9]).isoWeeks(22).freeze().isoWeeks(), 22, "Setting Jan  9 2012 to week 22 should work");
        test.equal(momentBuilder([2012, 0, 15]).isoWeeks(21).freeze().isoWeeks(), 21, "Setting Jan 15 2012 to week 21 should work");

        test.done();
    },

    "iso weeks setter day of year" : function (test) {
        test.expect(6);

        test.equal(momentBuilder([2012, 0,  1]).isoWeek(1).freeze().dayOfYear(), 9, "Setting Jan  1 2012 to week 1 should be day of year 8");
        test.equal(momentBuilder([2012, 0,  1]).isoWeek(1).freeze().year(),   2011, "Setting Jan  1 2012 to week 1 should be year 2011");
        test.equal(momentBuilder([2012, 0,  2]).isoWeek(1).freeze().dayOfYear(), 2, "Setting Jan  2 2012 to week 1 should be day of year 2");
        test.equal(momentBuilder([2012, 0,  8]).isoWeek(1).freeze().dayOfYear(), 8, "Setting Jan  8 2012 to week 1 should be day of year 8");
        test.equal(momentBuilder([2012, 0,  9]).isoWeek(1).freeze().dayOfYear(), 2, "Setting Jan  9 2012 to week 1 should be day of year 2");
        test.equal(momentBuilder([2012, 0, 15]).isoWeek(1).freeze().dayOfYear(), 8, "Setting Jan 15 2012 to week 1 should be day of year 8");

        test.done();
    },

    "years with iso week 53" : function (test) {
        test.expect(71);

        // Based on a table taken from http://en.wikipedia.org/wiki/ISO_week_date
        // (as downloaded on 2014-01-06) listing the 71 years in a 400-year cycle
        // that have 53 weeks; in this case reflecting the 2000 based cycle
        test.equal(frozenMoment([2004, 11, 31]).isoWeek(), 53, "Dec 31 2004 should be iso week 53");
        test.equal(frozenMoment([2009, 11, 31]).isoWeek(), 53, "Dec 31 2009 should be iso week 53");
        test.equal(frozenMoment([2015, 11, 31]).isoWeek(), 53, "Dec 31 2015 should be iso week 53");
        test.equal(frozenMoment([2020, 11, 31]).isoWeek(), 53, "Dec 31 2020 should be iso week 53");
        test.equal(frozenMoment([2026, 11, 31]).isoWeek(), 53, "Dec 31 2026 should be iso week 53");
        test.equal(frozenMoment([2032, 11, 31]).isoWeek(), 53, "Dec 31 2032 should be iso week 53");
        test.equal(frozenMoment([2037, 11, 31]).isoWeek(), 53, "Dec 31 2037 should be iso week 53");
        test.equal(frozenMoment([2043, 11, 31]).isoWeek(), 53, "Dec 31 2043 should be iso week 53");
        test.equal(frozenMoment([2048, 11, 31]).isoWeek(), 53, "Dec 31 2048 should be iso week 53");
        test.equal(frozenMoment([2054, 11, 31]).isoWeek(), 53, "Dec 31 2054 should be iso week 53");
        test.equal(frozenMoment([2060, 11, 31]).isoWeek(), 53, "Dec 31 2060 should be iso week 53");
        test.equal(frozenMoment([2065, 11, 31]).isoWeek(), 53, "Dec 31 2065 should be iso week 53");
        test.equal(frozenMoment([2071, 11, 31]).isoWeek(), 53, "Dec 31 2071 should be iso week 53");
        test.equal(frozenMoment([2076, 11, 31]).isoWeek(), 53, "Dec 31 2076 should be iso week 53");
        test.equal(frozenMoment([2082, 11, 31]).isoWeek(), 53, "Dec 31 2082 should be iso week 53");
        test.equal(frozenMoment([2088, 11, 31]).isoWeek(), 53, "Dec 31 2088 should be iso week 53");
        test.equal(frozenMoment([2093, 11, 31]).isoWeek(), 53, "Dec 31 2093 should be iso week 53");
        test.equal(frozenMoment([2099, 11, 31]).isoWeek(), 53, "Dec 31 2099 should be iso week 53");
        test.equal(frozenMoment([2105, 11, 31]).isoWeek(), 53, "Dec 31 2105 should be iso week 53");
        test.equal(frozenMoment([2111, 11, 31]).isoWeek(), 53, "Dec 31 2111 should be iso week 53");
        test.equal(frozenMoment([2116, 11, 31]).isoWeek(), 53, "Dec 31 2116 should be iso week 53");
        test.equal(frozenMoment([2122, 11, 31]).isoWeek(), 53, "Dec 31 2122 should be iso week 53");
        test.equal(frozenMoment([2128, 11, 31]).isoWeek(), 53, "Dec 31 2128 should be iso week 53");
        test.equal(frozenMoment([2133, 11, 31]).isoWeek(), 53, "Dec 31 2133 should be iso week 53");
        test.equal(frozenMoment([2139, 11, 31]).isoWeek(), 53, "Dec 31 2139 should be iso week 53");
        test.equal(frozenMoment([2144, 11, 31]).isoWeek(), 53, "Dec 31 2144 should be iso week 53");
        test.equal(frozenMoment([2150, 11, 31]).isoWeek(), 53, "Dec 31 2150 should be iso week 53");
        test.equal(frozenMoment([2156, 11, 31]).isoWeek(), 53, "Dec 31 2156 should be iso week 53");
        test.equal(frozenMoment([2161, 11, 31]).isoWeek(), 53, "Dec 31 2161 should be iso week 53");
        test.equal(frozenMoment([2167, 11, 31]).isoWeek(), 53, "Dec 31 2167 should be iso week 53");
        test.equal(frozenMoment([2172, 11, 31]).isoWeek(), 53, "Dec 31 2172 should be iso week 53");
        test.equal(frozenMoment([2178, 11, 31]).isoWeek(), 53, "Dec 31 2178 should be iso week 53");
        test.equal(frozenMoment([2184, 11, 31]).isoWeek(), 53, "Dec 31 2184 should be iso week 53");
        test.equal(frozenMoment([2189, 11, 31]).isoWeek(), 53, "Dec 31 2189 should be iso week 53");
        test.equal(frozenMoment([2195, 11, 31]).isoWeek(), 53, "Dec 31 2195 should be iso week 53");
        test.equal(frozenMoment([2201, 11, 31]).isoWeek(), 53, "Dec 31 2201 should be iso week 53");
        test.equal(frozenMoment([2207, 11, 31]).isoWeek(), 53, "Dec 31 2207 should be iso week 53");
        test.equal(frozenMoment([2212, 11, 31]).isoWeek(), 53, "Dec 31 2212 should be iso week 53");
        test.equal(frozenMoment([2218, 11, 31]).isoWeek(), 53, "Dec 31 2218 should be iso week 53");
        test.equal(frozenMoment([2224, 11, 31]).isoWeek(), 53, "Dec 31 2224 should be iso week 53");
        test.equal(frozenMoment([2229, 11, 31]).isoWeek(), 53, "Dec 31 2229 should be iso week 53");
        test.equal(frozenMoment([2235, 11, 31]).isoWeek(), 53, "Dec 31 2235 should be iso week 53");
        test.equal(frozenMoment([2240, 11, 31]).isoWeek(), 53, "Dec 31 2240 should be iso week 53");
        test.equal(frozenMoment([2246, 11, 31]).isoWeek(), 53, "Dec 31 2246 should be iso week 53");
        test.equal(frozenMoment([2252, 11, 31]).isoWeek(), 53, "Dec 31 2252 should be iso week 53");
        test.equal(frozenMoment([2257, 11, 31]).isoWeek(), 53, "Dec 31 2257 should be iso week 53");
        test.equal(frozenMoment([2263, 11, 31]).isoWeek(), 53, "Dec 31 2263 should be iso week 53");
        test.equal(frozenMoment([2268, 11, 31]).isoWeek(), 53, "Dec 31 2268 should be iso week 53");
        test.equal(frozenMoment([2274, 11, 31]).isoWeek(), 53, "Dec 31 2274 should be iso week 53");
        test.equal(frozenMoment([2280, 11, 31]).isoWeek(), 53, "Dec 31 2280 should be iso week 53");
        test.equal(frozenMoment([2285, 11, 31]).isoWeek(), 53, "Dec 31 2285 should be iso week 53");
        test.equal(frozenMoment([2291, 11, 31]).isoWeek(), 53, "Dec 31 2291 should be iso week 53");
        test.equal(frozenMoment([2296, 11, 31]).isoWeek(), 53, "Dec 31 2296 should be iso week 53");
        test.equal(frozenMoment([2303, 11, 31]).isoWeek(), 53, "Dec 31 2303 should be iso week 53");
        test.equal(frozenMoment([2308, 11, 31]).isoWeek(), 53, "Dec 31 2308 should be iso week 53");
        test.equal(frozenMoment([2314, 11, 31]).isoWeek(), 53, "Dec 31 2314 should be iso week 53");
        test.equal(frozenMoment([2320, 11, 31]).isoWeek(), 53, "Dec 31 2320 should be iso week 53");
        test.equal(frozenMoment([2325, 11, 31]).isoWeek(), 53, "Dec 31 2325 should be iso week 53");
        test.equal(frozenMoment([2331, 11, 31]).isoWeek(), 53, "Dec 31 2331 should be iso week 53");
        test.equal(frozenMoment([2336, 11, 31]).isoWeek(), 53, "Dec 31 2336 should be iso week 53");
        test.equal(frozenMoment([2342, 11, 31]).isoWeek(), 53, "Dec 31 2342 should be iso week 53");
        test.equal(frozenMoment([2348, 11, 31]).isoWeek(), 53, "Dec 31 2348 should be iso week 53");
        test.equal(frozenMoment([2353, 11, 31]).isoWeek(), 53, "Dec 31 2353 should be iso week 53");
        test.equal(frozenMoment([2359, 11, 31]).isoWeek(), 53, "Dec 31 2359 should be iso week 53");
        test.equal(frozenMoment([2364, 11, 31]).isoWeek(), 53, "Dec 31 2364 should be iso week 53");
        test.equal(frozenMoment([2370, 11, 31]).isoWeek(), 53, "Dec 31 2370 should be iso week 53");
        test.equal(frozenMoment([2376, 11, 31]).isoWeek(), 53, "Dec 31 2376 should be iso week 53");
        test.equal(frozenMoment([2381, 11, 31]).isoWeek(), 53, "Dec 31 2381 should be iso week 53");
        test.equal(frozenMoment([2387, 11, 31]).isoWeek(), 53, "Dec 31 2387 should be iso week 53");
        test.equal(frozenMoment([2392, 11, 31]).isoWeek(), 53, "Dec 31 2392 should be iso week 53");
        test.equal(frozenMoment([2398, 11, 31]).isoWeek(), 53, "Dec 31 2398 should be iso week 53");

        test.done();
    },

    "count years with iso week 53" : function (test) {
        test.expect(1);

        // Based on http://en.wikipedia.org/wiki/ISO_week_date (as seen on 2014-01-06)
        // stating that there are 71 years in a 400-year cycle that have 53 weeks;
        // in this case reflecting the 2000 based cycle
        var count = 0, i;
        for (i = 0; i < 400; i++) {
            count += (frozenMoment([2000 + i, 11, 31]).isoWeek() === 53) ? 1 : 0;
        }
        test.equal(count, 71, "Should have 71 years in 400-year cycle with iso week 53");

        test.done();
    }
};

var frozenMoment = require("../../frozen-moment");

exports.weeksInYear = {
    "isoWeeksInYear": function (test) {
        test.equal(frozenMoment([2004]).isoWeeksInYear(), 53, "2004 has 53 iso weeks");
        test.equal(frozenMoment([2005]).isoWeeksInYear(), 52, "2005 has 53 iso weeks");
        test.equal(frozenMoment([2006]).isoWeeksInYear(), 52, "2006 has 53 iso weeks");
        test.equal(frozenMoment([2007]).isoWeeksInYear(), 52, "2007 has 52 iso weeks");
        test.equal(frozenMoment([2008]).isoWeeksInYear(), 52, "2008 has 53 iso weeks");
        test.equal(frozenMoment([2009]).isoWeeksInYear(), 53, "2009 has 53 iso weeks");
        test.equal(frozenMoment([2010]).isoWeeksInYear(), 52, "2010 has 52 iso weeks");
        test.equal(frozenMoment([2011]).isoWeeksInYear(), 52, "2011 has 52 iso weeks");
        test.equal(frozenMoment([2012]).isoWeeksInYear(), 52, "2012 has 52 iso weeks");
        test.equal(frozenMoment([2013]).isoWeeksInYear(), 52, "2013 has 52 iso weeks");
        test.equal(frozenMoment([2014]).isoWeeksInYear(), 52, "2014 has 52 iso weeks");
        test.equal(frozenMoment([2015]).isoWeeksInYear(), 53, "2015 has 53 iso weeks");

        test.done();
    },

    "weeksInYear doy/dow = 1/4": function (test) {
        frozenMoment.locale('1/4', {week: {dow: 1, doy: 4}});

        test.equal(frozenMoment([2004]).weeksInYear(), 53, "2004 has 53 weeks");
        test.equal(frozenMoment([2005]).weeksInYear(), 52, "2005 has 53 weeks");
        test.equal(frozenMoment([2006]).weeksInYear(), 52, "2006 has 53 weeks");
        test.equal(frozenMoment([2007]).weeksInYear(), 52, "2007 has 52 weeks");
        test.equal(frozenMoment([2008]).weeksInYear(), 52, "2008 has 53 weeks");
        test.equal(frozenMoment([2009]).weeksInYear(), 53, "2009 has 53 weeks");
        test.equal(frozenMoment([2010]).weeksInYear(), 52, "2010 has 52 weeks");
        test.equal(frozenMoment([2011]).weeksInYear(), 52, "2011 has 52 weeks");
        test.equal(frozenMoment([2012]).weeksInYear(), 52, "2012 has 52 weeks");
        test.equal(frozenMoment([2013]).weeksInYear(), 52, "2013 has 52 weeks");
        test.equal(frozenMoment([2014]).weeksInYear(), 52, "2014 has 52 weeks");
        test.equal(frozenMoment([2015]).weeksInYear(), 53, "2015 has 53 weeks");

        test.done();
    },

    "weeksInYear doy/dow = 6/12": function (test) {
        frozenMoment.locale('6/12', {week: {dow: 6, doy: 12}});

        test.equal(frozenMoment([2004]).weeksInYear(), 53, "2004 has 53 weeks");
        test.equal(frozenMoment([2005]).weeksInYear(), 52, "2005 has 53 weeks");
        test.equal(frozenMoment([2006]).weeksInYear(), 52, "2006 has 53 weeks");
        test.equal(frozenMoment([2007]).weeksInYear(), 52, "2007 has 52 weeks");
        test.equal(frozenMoment([2008]).weeksInYear(), 52, "2008 has 53 weeks");
        test.equal(frozenMoment([2009]).weeksInYear(), 52, "2009 has 53 weeks");
        test.equal(frozenMoment([2010]).weeksInYear(), 53, "2010 has 52 weeks");
        test.equal(frozenMoment([2011]).weeksInYear(), 52, "2011 has 52 weeks");
        test.equal(frozenMoment([2012]).weeksInYear(), 52, "2012 has 52 weeks");
        test.equal(frozenMoment([2013]).weeksInYear(), 52, "2013 has 52 weeks");
        test.equal(frozenMoment([2014]).weeksInYear(), 52, "2014 has 52 weeks");
        test.equal(frozenMoment([2015]).weeksInYear(), 52, "2015 has 53 weeks");

        test.done();
    },

    "weeksInYear doy/dow = 1/7": function (test) {
        frozenMoment.locale('1/7', {week: {dow: 1, doy: 7}});

        test.equal(frozenMoment([2004]).weeksInYear(), 52, "2004 has 53 weeks");
        test.equal(frozenMoment([2005]).weeksInYear(), 52, "2005 has 53 weeks");
        test.equal(frozenMoment([2006]).weeksInYear(), 53, "2006 has 53 weeks");
        test.equal(frozenMoment([2007]).weeksInYear(), 52, "2007 has 52 weeks");
        test.equal(frozenMoment([2008]).weeksInYear(), 52, "2008 has 53 weeks");
        test.equal(frozenMoment([2009]).weeksInYear(), 52, "2009 has 53 weeks");
        test.equal(frozenMoment([2010]).weeksInYear(), 52, "2010 has 52 weeks");
        test.equal(frozenMoment([2011]).weeksInYear(), 52, "2011 has 52 weeks");
        test.equal(frozenMoment([2012]).weeksInYear(), 53, "2012 has 52 weeks");
        test.equal(frozenMoment([2013]).weeksInYear(), 52, "2013 has 52 weeks");
        test.equal(frozenMoment([2014]).weeksInYear(), 52, "2014 has 52 weeks");
        test.equal(frozenMoment([2015]).weeksInYear(), 52, "2015 has 53 weeks");

        test.done();
    },

    "weeksInYear doy/dow = 0/6": function (test) {
        frozenMoment.locale('0/6', {week: {dow: 0, doy: 6}});

        test.equal(frozenMoment([2004]).weeksInYear(), 52, "2004 has 53 weeks");
        test.equal(frozenMoment([2005]).weeksInYear(), 53, "2005 has 53 weeks");
        test.equal(frozenMoment([2006]).weeksInYear(), 52, "2006 has 53 weeks");
        test.equal(frozenMoment([2007]).weeksInYear(), 52, "2007 has 52 weeks");
        test.equal(frozenMoment([2008]).weeksInYear(), 52, "2008 has 53 weeks");
        test.equal(frozenMoment([2009]).weeksInYear(), 52, "2009 has 53 weeks");
        test.equal(frozenMoment([2010]).weeksInYear(), 52, "2010 has 52 weeks");
        test.equal(frozenMoment([2011]).weeksInYear(), 53, "2011 has 52 weeks");
        test.equal(frozenMoment([2012]).weeksInYear(), 52, "2012 has 52 weeks");
        test.equal(frozenMoment([2013]).weeksInYear(), 52, "2013 has 52 weeks");
        test.equal(frozenMoment([2014]).weeksInYear(), 52, "2014 has 52 weeks");
        test.equal(frozenMoment([2015]).weeksInYear(), 52, "2015 has 53 weeks");

        test.done();
    }
};

var frozenMoment = require('../../frozen-moment');

exports.zoneSwitching = {
    setUp : function (done) {
        frozenMoment.locale('en');
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };

        done();
    },

    "local to utc, keepLocalTime = true" : function (test) {
        var m = frozenMoment(),
            fmt = "YYYY-DD-MM HH:mm:ss";
        test.equal(m.thaw().utc(true).freeze().format(fmt), m.format(fmt), "local to utc failed to keep local time");

        test.done();
    },

    "local to utc, keepLocalTime = false" : function (test) {
        var m = frozenMoment();
        test.equal(m.thaw().utc().freeze().valueOf(), m.valueOf(), "local to utc failed to keep utc time (implicit)");
        test.equal(m.thaw().utc(false).freeze().valueOf(), m.valueOf(), "local to utc failed to keep utc time (explicit)");

        test.done();
    },

    "local to zone, keepLocalTime = true" : function (test) {
        var m = frozenMoment(),
            fmt = "YYYY-DD-MM HH:mm:ss",
            z;

        // Apparently there is -12:00 and +14:00
        // http://en.wikipedia.org/wiki/UTC+14:00
        // http://en.wikipedia.org/wiki/UTC-12:00
        for (z = -12; z <= 14; ++z) {
            test.equal(m.thaw().zone(z * 60, true).freeze().format(fmt), m.format(fmt),
                    "local to zone(" + z + ":00) failed to keep local time");
        }

        test.done();
    },

    "local to zone, keepLocalTime = false" : function (test) {
        var m = frozenMoment(),
            z;

        // Apparently there is -12:00 and +14:00
        // http://en.wikipedia.org/wiki/UTC+14:00
        // http://en.wikipedia.org/wiki/UTC-12:00
        for (z = -12; z <= 14; ++z) {
            test.equal(m.thaw().zone(z * 60).freeze().valueOf(), m.valueOf(),
                    "local to zone(" + z + ":00) failed to keep utc time (implicit)");
            test.equal(m.thaw().zone(z * 60, false).freeze().valueOf(), m.valueOf(),
                    "local to zone(" + z + ":00) failed to keep utc time (explicit)");
        }

        test.done();
    },

    "utc to local, keepLocalTime = true" : function (test) {
        var um = frozenMoment.utc(),
            fmt = "YYYY-DD-MM HH:mm:ss";

        test.equal(um.thaw().local(true).freeze().format(fmt), um.format(fmt), "utc to local failed to keep local time");

        test.done();
    },

    "utc to local, keepLocalTime = false" : function (test) {
        var um = frozenMoment.utc();
        test.equal(um.thaw().local().freeze().valueOf(), um.valueOf(), "utc to local failed to keep utc time (implicit)");
        test.equal(um.thaw().local(false).freeze().valueOf(), um.valueOf(), "utc to local failed to keep utc time (explicit)");

        test.done();
    },

    "zone to local, keepLocalTime = true" : function (test) {
        var m = frozenMoment(),
            fmt = "YYYY-DD-MM HH:mm:ss",
            z;

        // Apparently there is -12:00 and +14:00
        // http://en.wikipedia.org/wiki/UTC+14:00
        // http://en.wikipedia.org/wiki/UTC-12:00
        for (z = -12; z <= 14; ++z) {
            m.zone(z * 60);

            test.equal(m.thaw().local(true).freeze().format(fmt), m.format(fmt),
                    "zone(" + z + ":00) to local failed to keep local time");
        }

        test.done();
    },

    "zone to local, keepLocalTime = false" : function (test) {
        var m = frozenMoment(),
            z;

        // Apparently there is -12:00 and +14:00
        // http://en.wikipedia.org/wiki/UTC+14:00
        // http://en.wikipedia.org/wiki/UTC-12:00
        for (z = -12; z <= 14; ++z) {
            m.zone(z * 60);

            test.equal(m.thaw().local(false).freeze().valueOf(), m.valueOf(),
                    "zone(" + z + ":00) to local failed to keep utc time (explicit)");
            test.equal(m.thaw().local().freeze().valueOf(), m.valueOf(),
                    "zone(" + z + ":00) to local failed to keep utc time (implicit)");
        }

        test.done();
    }
};

var frozenMoment = require("../../frozen-moment"),
    momentBuilder = frozenMoment.build;

exports.zones = {
    setUp : function (done) {
        frozenMoment.locale('en');
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };

        done();
    },

    tearDown : function (cb) {
        frozenMoment.locale('en');
        cb();
    },

    "set zone" : function (test) {
        var zone = frozenMoment();

        zone = zone.thaw().zone(0).freeze();
        test.equal(zone.zone(), 0, "should be able to set the zone to 0");

        zone = zone.thaw().zone(60).freeze();
        test.equal(zone.zone(), 60, "should be able to set the zone to 60");

        zone = zone.thaw().zone(-60).freeze();
        test.equal(zone.zone(), -60, "should be able to set the zone to -60");

        test.done();
    },

    "set zone shorthand" : function (test) {
        var zone = frozenMoment();

        zone = zone.thaw().zone(1).freeze();
        test.equal(zone.zone(), 60, "setting the zone to 1 should imply hours and convert to 60");

        zone = zone.thaw().zone(-1).freeze();
        test.equal(zone.zone(), -60, "setting the zone to -1 should imply hours and convert to -60");

        zone = zone.thaw().zone(15).freeze();
        test.equal(zone.zone(), 900, "setting the zone to 15 should imply hours and convert to 900");

        zone = zone.thaw().zone(-15).freeze();
        test.equal(zone.zone(), -900, "setting the zone to -15 should imply hours and convert to -900");

        zone = zone.thaw().zone(16).freeze();
        test.equal(zone.zone(), 16, "setting the zone to 16 should imply minutes");

        zone = zone.thaw().zone(-16).freeze();
        test.equal(zone.zone(), -16, "setting the zone to -16 should imply minutes");

        test.done();
    },

    "set zone with string" : function (test) {
        var zone = frozenMoment();

        zone = zone.thaw().zone("+00:00").freeze();
        test.equal(zone.zone(), 0, "set the zone with a timezone string");

        zone = zone.thaw().zone("2013-03-07T07:00:00-08:00").freeze();
        test.equal(zone.zone(), 480, "set the zone with a string that does not begin with the timezone");

        zone = zone.thaw().zone("2013-03-07T07:00:00+0100").freeze();
        test.equal(zone.zone(), -60, "set the zone with a string that uses the +0000 syntax");

        zone = zone.thaw().zone("03-07-2013T07:00:00-08:00").freeze();
        test.equal(zone.zone(), 480, "set the zone with a string with a non-ISO 8601 date");

        test.done();
    },

    "change hours when changing the zone" : function (test) {
        var zone = frozenMoment.utc([2000, 0, 1, 6]);

        zone = zone.thaw().zone(0).freeze();
        test.equal(zone.hour(), 6, "UTC 6AM should be 6AM at +0000");

        zone = zone.thaw().zone(60).freeze();
        test.equal(zone.hour(), 5, "UTC 6AM should be 5AM at -0100");

        zone = zone.thaw().zone(-60).freeze();
        test.equal(zone.hour(), 7, "UTC 6AM should be 7AM at +0100");

        test.done();
    },

    "change minutes when changing the zone" : function (test) {
        var zone = frozenMoment.utc([2000, 0, 1, 6, 31]);

        zone = zone.thaw().zone(0).freeze();
        test.equal(zone.format("HH:mm"), "06:31", "UTC 6:31AM should be 6:31AM at +0000");

        zone = zone.thaw().zone(30).freeze();
        test.equal(zone.format("HH:mm"), "06:01", "UTC 6:31AM should be 6:01AM at -0030");

        zone = zone.thaw().zone(-30).freeze();
        test.equal(zone.format("HH:mm"), "07:01", "UTC 6:31AM should be 7:01AM at +0030");

        zone = zone.thaw().zone(1380).freeze();
        test.equal(zone.format("HH:mm"), "07:31", "UTC 6:31AM should be 7:31AM at +1380");

        test.done();
    },

    "distance from the unix epoch" : function (test) {
        var zoneA = frozenMoment(),
            zoneB = frozenMoment(zoneA),
            zoneC = frozenMoment(zoneA),
            zoneD = frozenMoment(zoneA),
            zoneE = frozenMoment(zoneA);

        zoneB = zoneB.thaw().utc().freeze();
        test.equal(+zoneA, +zoneB, "frozenMoment should equal frozenMoment.utc");

        zoneC = zoneC.thaw().zone(-60).freeze();
        test.equal(+zoneA, +zoneC, "frozenMoment should equal frozenMoment.zone(-60)");

        zoneD = zoneD.thaw().zone(480).freeze();
        test.equal(+zoneA, +zoneD, "frozenMoment should equal frozenMoment.zone(480)");

        zoneE = zoneE.thaw().zone(1000).freeze();
        test.equal(+zoneA, +zoneE, "frozenMoment should equal frozenMoment.zone(1000)");

        test.done();
    },

    "update offset after changing any values" : function (test) {
        var oldOffset = momentBuilder.updateOffset,
            m = frozenMoment.utc([2000, 6, 1]);

        momentBuilder.updateOffset = function (mom, keepTime) {
            if (mom.freeze().valueOf() > 962409600000) {
                mom.zone(120, keepTime);
            } else {
                mom.zone(60, keepTime);
            }
        };

        test.equal(m.format("ZZ"), "+0000", "should be at +0000");
        test.equal(m.format("HH:mm"), "00:00", "should start 12AM at +0000 timezone");

        m = m.thaw().add(1, 'h').freeze();

        test.equal(m.format("ZZ"), "-0200", "should be at -0200");
        test.equal(m.format("HH:mm"), "23:00", "1AM at +0000 should be 11PM at -0200 timezone");

        m = m.thaw().subtract(1, 'h').freeze();

        test.equal(m.format("ZZ"), "-0100", "should be at -0100");
        test.equal(m.format("HH:mm"), "23:00", "12AM at +0000 should be 11PM at -0100 timezone");

        momentBuilder.updateOffset = oldOffset;

        test.done();
    },

    "getters and setters" : function (test) {
        var a = frozenMoment([2011, 5, 20]);

        test.equal(a.thaw().zone(120).year(2012).freeze().year(), 2012, "should get and set year correctly");
        test.equal(a.thaw().zone(120).month(1).freeze().month(), 1, "should get and set month correctly");
        test.equal(a.thaw().zone(120).date(2).freeze().date(), 2, "should get and set date correctly");
        test.equal(a.thaw().zone(120).day(1).freeze().day(), 1, "should get and set day correctly");
        test.equal(a.thaw().zone(120).hour(1).freeze().hour(), 1, "should get and set hour correctly");
        test.equal(a.thaw().zone(120).minute(1).freeze().minute(), 1, "should get and set minute correctly");

        test.done();
    },

    "getters" : function (test) {
        var a = frozenMoment.utc([2012, 0, 1, 0, 0, 0]);

        test.equal(a.thaw().zone(120).freeze().year(),  2011, "should get year correctly");
        test.equal(a.thaw().zone(120).freeze().month(),   11, "should get month correctly");
        test.equal(a.thaw().zone(120).freeze().date(),    31, "should get date correctly");
        test.equal(a.thaw().zone(120).freeze().hour(),    22, "should get hour correctly");
        test.equal(a.thaw().zone(120).freeze().minute(),   0, "should get minute correctly");

        test.equal(a.thaw().zone(-120).freeze().year(),  2012, "should get year correctly");
        test.equal(a.thaw().zone(-120).freeze().month(),    0, "should get month correctly");
        test.equal(a.thaw().zone(-120).freeze().date(),     1, "should get date correctly");
        test.equal(a.thaw().zone(-120).freeze().hour(),     2, "should get hour correctly");
        test.equal(a.thaw().zone(-120).freeze().minute(),   0, "should get minute correctly");

        test.equal(a.thaw().zone(-90).freeze().year(),  2012, "should get year correctly");
        test.equal(a.thaw().zone(-90).freeze().month(),    0, "should get month correctly");
        test.equal(a.thaw().zone(-90).freeze().date(),     1, "should get date correctly");
        test.equal(a.thaw().zone(-90).freeze().hour(),     1, "should get hour correctly");
        test.equal(a.thaw().zone(-90).freeze().minute(),  30, "should get minute correctly");

        test.done();
    },

    "from" : function (test) {
        var zoneA = frozenMoment(),
            zoneB = momentBuilder(zoneA).zone(720).freeze(),
            zoneC = momentBuilder(zoneA).zone(360).freeze(),
            zoneD = momentBuilder(zoneA).zone(-690).freeze(),
            other = momentBuilder(zoneA).add(35, 'm').freeze();

        test.equal(zoneA.from(other), zoneB.from(other), "frozenMoment#from should be the same in all zones");
        test.equal(zoneA.from(other), zoneC.from(other), "frozenMoment#from should be the same in all zones");
        test.equal(zoneA.from(other), zoneD.from(other), "frozenMoment#from should be the same in all zones");

        test.done();
    },

    "diff" : function (test) {
        var zoneA = frozenMoment(),
            zoneB = momentBuilder(zoneA).zone(720).freeze(),
            zoneC = momentBuilder(zoneA).zone(360).freeze(),
            zoneD = momentBuilder(zoneA).zone(-690).freeze(),
            other = momentBuilder(zoneA).add(35, 'm').freeze();

        test.equal(zoneA.diff(other), zoneB.diff(other), "frozenMoment#diff should be the same in all zones");
        test.equal(zoneA.diff(other), zoneC.diff(other), "frozenMoment#diff should be the same in all zones");
        test.equal(zoneA.diff(other), zoneD.diff(other), "frozenMoment#diff should be the same in all zones");

        test.equal(zoneA.diff(other, 'minute', true), zoneB.diff(other, 'minute', true), "frozenMoment#diff should be the same in all zones");
        test.equal(zoneA.diff(other, 'minute', true), zoneC.diff(other, 'minute', true), "frozenMoment#diff should be the same in all zones");
        test.equal(zoneA.diff(other, 'minute', true), zoneD.diff(other, 'minute', true), "frozenMoment#diff should be the same in all zones");

        test.equal(zoneA.diff(other, 'hour', true), zoneB.diff(other, 'hour', true), "frozenMoment#diff should be the same in all zones");
        test.equal(zoneA.diff(other, 'hour', true), zoneC.diff(other, 'hour', true), "frozenMoment#diff should be the same in all zones");
        test.equal(zoneA.diff(other, 'hour', true), zoneD.diff(other, 'hour', true), "frozenMoment#diff should be the same in all zones");

        test.done();
    },

    "unix offset and timestamp" : function (test) {
        var zoneA = frozenMoment(),
            zoneB = momentBuilder(zoneA).zone(720).freeze(),
            zoneC = momentBuilder(zoneA).zone(360).freeze(),
            zoneD = momentBuilder(zoneA).zone(-690).freeze();

        test.equal(zoneA.unix(), zoneB.unix(), "frozenMoment#unix should be the same in all zones");
        test.equal(zoneA.unix(), zoneC.unix(), "frozenMoment#unix should be the same in all zones");
        test.equal(zoneA.unix(), zoneD.unix(), "frozenMoment#unix should be the same in all zones");

        test.equal(+zoneA, +zoneB, "frozenMoment#valueOf should be the same in all zones");
        test.equal(+zoneA, +zoneC, "frozenMoment#valueOf should be the same in all zones");
        test.equal(+zoneA, +zoneD, "frozenMoment#valueOf should be the same in all zones");

        test.done();
    },

    "cloning" : function (test) {
        test.equal(momentBuilder().zone(120).freeze().zone(),   120, "explicit freezing should retain the zone");
        test.equal(momentBuilder().zone(-120).freeze().zone(), -120, "explicit freezing should retain the zone");
        test.equal(frozenMoment(momentBuilder().zone(120)).zone(),   120, "implicit freezing should retain the zone");
        test.equal(frozenMoment(momentBuilder().zone(-120)).zone(), -120, "implicit freezing should retain the zone");

        test.done();
    },

    "start of / end of" : function (test) {
        var a = frozenMoment.utc([2010, 1, 2, 0, 0, 0]).thaw().zone(450);

        test.equal(a.clone().startOf('day').freeze().hour(), 0, "start of day should work on frozenMoments with a zone");
        test.equal(a.clone().startOf('day').freeze().minute(), 0, "start of day should work on frozenMoments with a zone");
        test.equal(a.clone().startOf('hour').freeze().minute(), 0, "start of hour should work on frozenMoments with a zone");

        test.equal(a.clone().endOf('day').freeze().hour(), 23, "end of day should work on frozenMoments with a zone");
        test.equal(a.clone().endOf('day').freeze().minute(), 59, "end of day should work on frozenMoments with a zone");
        test.equal(a.clone().endOf('hour').freeze().minute(), 59, "end of hour should work on frozenMoments with a zone");

        test.done();
    },

    "reset zone with frozenMoment#utc" : function (test) {
        var a = frozenMoment.utc([2012]).thaw().zone(480);

        test.equal(a.freeze().hour(),      16, "different zone should have different hour");
        test.equal(a.utc().freeze().hour(), 0, "calling frozenMoment#utc should reset the offset");

        test.done();
    },

    "reset zone with frozenMoment#local" : function (test) {
        var a = frozenMoment([2012]).thaw().zone(480);

        test.equal(a.clone().local().freeze().hour(), 0, "calling frozenMoment#local should reset the offset");

        test.done();
    },

    "toDate" : function (test) {
        var zoneA = new Date(),
            zoneB = momentBuilder(zoneA).zone(720).freeze().toDate(),
            zoneC = momentBuilder(zoneA).zone(360).freeze().toDate(),
            zoneD = momentBuilder(zoneA).zone(-690).freeze().toDate();

        test.equal(+zoneA, +zoneB, "frozenMoment#toDate should output a date with the right unix timestamp");
        test.equal(+zoneA, +zoneC, "frozenMoment#toDate should output a date with the right unix timestamp");
        test.equal(+zoneA, +zoneD, "frozenMoment#toDate should output a date with the right unix timestamp");

        test.done();
    },

    "same / before / after" : function (test) {
        var zoneA = frozenMoment().thaw().utc().freeze(),
            zoneB = frozenMoment(zoneA).thaw().zone(120).freeze(),
            zoneC = frozenMoment(zoneA).thaw().zone(-120).freeze();

        test.ok(zoneA.isSame(zoneB), "two frozenMoments with different offsets should be the same");
        test.ok(zoneA.isSame(zoneC), "two frozenMoments with different offsets should be the same");

        test.ok(zoneA.isSame(zoneB, 'hour'), "two frozenMoments with different offsets should be the same hour");
        test.ok(zoneA.isSame(zoneC, 'hour'), "two frozenMoments with different offsets should be the same hour");

        zoneA = zoneA.thaw().add(1, 'hour').freeze();

        test.ok(zoneA.isAfter(zoneB), "isAfter should work with two frozenMoments with different offsets");
        test.ok(zoneA.isAfter(zoneC), "isAfter should work with two frozenMoments with different offsets");

        test.ok(zoneA.isAfter(zoneB, 'hour'), "isAfter:hour should work with two frozenMoments with different offsets");
        test.ok(zoneA.isAfter(zoneC, 'hour'), "isAfter:hour should work with two frozenMoments with different offsets");

        zoneA = zoneA.thaw().subtract(2, 'hour').freeze();

        test.ok(zoneA.isBefore(zoneB), "isBefore should work with two frozenMoments with different offsets");
        test.ok(zoneA.isBefore(zoneC), "isBefore should work with two frozenMoments with different offsets");

        test.ok(zoneA.isBefore(zoneB, 'hour'), "isBefore:hour should work with two frozenMoments with different offsets");
        test.ok(zoneA.isBefore(zoneC, 'hour'), "isBefore:hour should work with two frozenMoments with different offsets");

        test.done();
    },

    "add / subtract over dst" : function (test) {
        var oldOffset = momentBuilder.updateOffset,
            m = frozenMoment.utc([2000, 2, 31, 3]);

        momentBuilder.updateOffset = function (mom, keepTime) {
            if (mom.clone().utc().freeze().month() > 2) {
                mom.zone(-60, keepTime);
            } else {
                mom.zone(0, keepTime);
            }
        };

        test.equal(m.hour(), 3, "should start at 00:00");

        m = m.thaw().add(24, 'hour').freeze();

        test.equal(m.hour(), 4, "adding 24 hours should disregard dst");

        m = m.thaw().subtract(24, 'hour').freeze();

        test.equal(m.hour(), 3, "subtracting 24 hours should disregard dst");

        m = m.thaw().add(1, 'day').freeze();

        test.equal(m.hour(), 3, "adding 1 day should have the same hour");

        m = m.thaw().subtract(1, 'day').freeze();

        test.equal(m.hour(), 3, "subtracting 1 day should have the same hour");

        m = m.thaw().add(1, 'month').freeze();

        test.equal(m.hour(), 3, "adding 1 month should have the same hour");

        m = m.thaw().subtract(1, 'month').freeze();

        test.equal(m.hour(), 3, "subtracting 1 month should have the same hour");

        momentBuilder.updateOffset = oldOffset;

        test.done();
    },

    "isDST" : function (test) {
        var oldOffset = momentBuilder.updateOffset;

        momentBuilder.updateOffset = function (mom, keepTime) {
            var month = mom.freeze().month();
            if (month > 2 && month < 9) {
                mom.zone(-60, keepTime);
            } else {
                mom.zone(0, keepTime);
            }
        };

        test.ok(!momentBuilder().month(0).freeze().isDST(),  "Jan should not be summer dst");
        test.ok(momentBuilder().month(6).freeze().isDST(),   "Jul should be summer dst");
        test.ok(!momentBuilder().month(11).freeze().isDST(), "Dec should not be summer dst");

        momentBuilder.updateOffset = function (mom) {
            var month = mom.freeze().month();
            if (month > 2 && month < 9) {
                mom.zone(0);
            } else {
                mom.zone(-60);
            }
        };

        test.ok(momentBuilder().month(0).freeze().isDST(),  "Jan should be winter dst");
        test.ok(!momentBuilder().month(6).freeze().isDST(), "Jul should not be winter dst");
        test.ok(momentBuilder().month(11).freeze().isDST(), "Dec should be winter dst");

        momentBuilder.updateOffset = oldOffset;

        test.done();
    },

    "zone names" : function (test) {
        test.expect(8);

        test.equal(frozenMoment().zoneAbbr(),   "", "Local zone abbr should be empty");
        test.equal(frozenMoment().format('z'),  "", "Local zone formatted abbr should be empty");
        test.equal(frozenMoment().zoneName(),   "", "Local zone name should be empty");
        test.equal(frozenMoment().format('zz'), "", "Local zone formatted name should be empty");

        test.equal(frozenMoment.utc().zoneAbbr(),   "UTC", "UTC zone abbr should be UTC");
        test.equal(frozenMoment.utc().format('z'),  "UTC", "UTC zone formatted abbr should be UTC");
        test.equal(frozenMoment.utc().zoneName(),   "Coordinated Universal Time", "UTC zone abbr should be Coordinated Universal Time");
        test.equal(frozenMoment.utc().format('zz'), "Coordinated Universal Time", "UTC zone formatted abbr should be Coordinated Universal Time");

        test.done();
    },

    "hours alignment with UTC" : function (test) {
        test.expect(4);

        test.equals(momentBuilder().zone(120).freeze().hasAlignedHourOffset(), true);
        test.equals(momentBuilder().zone(-180).freeze().hasAlignedHourOffset(), true);
        test.equals(momentBuilder().zone(90).freeze().hasAlignedHourOffset(), false);
        test.equals(momentBuilder().zone(-90).freeze().hasAlignedHourOffset(), false);

        test.done();
    },

    "hours alignment with other zone" : function (test) {
        test.expect(16);

        var m = momentBuilder().zone(120).freeze();

        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(180)), true);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(-180)), true);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(90)), false);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(-90)), false);

        m = momentBuilder().zone(90).freeze();

        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(180)), false);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(-180)), false);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(30)), true);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(-30)), true);

        m = momentBuilder().zone(-60).freeze();

        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(180)), true);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(-180)), true);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(90)), false);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(-90)), false);

        m = momentBuilder().zone(25).freeze();

        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(-35)), true);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(85)), true);

        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(35)), false);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(-85)), false);

        test.done();
    },

    "parse zone" : function (test) {
        test.expect(2);
        var m = momentBuilder("2013-01-01T00:00:00-13:00").parseZone().freeze();
        test.equal(m.zone(), 13 * 60);
        test.equal(m.hours(), 0);
        test.done();
    },

    "parse zone static" : function (test) {
        test.expect(2);
        var m = momentBuilder.parseZone("2013-01-01T00:00:00-13:00").freeze();
        test.equal(m.zone(), 13 * 60);
        test.equal(m.hours(), 0);
        test.done();
    },

    "parse zone with more arguments" : function (test) {
        var m;
        test.expect(3);

        m = momentBuilder.parseZone("2013 01 01 05 -13:00", "YYYY MM DD HH ZZ").freeze();
        test.equal(m.format(), "2013-01-01T05:00:00-13:00", "accept input and format");
        m = momentBuilder.parseZone("2013-01-01-13:00", "YYYY MM DD ZZ", true).freeze();
        test.equal(m.isValid(), false, "accept input, format and strict flag");
        m = momentBuilder.parseZone("2013-01-01-13:00", ["DD MM YYYY ZZ", "YYYY MM DD ZZ"]).freeze();
        test.equal(m.format(), "2013-01-01T00:00:00-13:00", "accept input and array of formats");

        test.done();
    },

    "parse zone with a timezone from the format string" : function (test) {
        test.expect(1);

        var m = frozenMoment("11-12-2013 -0400 +1100", "DD-MM-YYYY ZZ #####").thaw().parseZone().freeze();

        test.equal(m.zone(), 4 * 60);
        test.done();
    },

    "parse zone without a timezone included in the format string" : function (test) {
        test.expect(1);

        var m = frozenMoment("11-12-2013 -0400 +1100", "DD-MM-YYYY").thaw().parseZone().freeze();

        test.equal(m.zone(), -11 * 60);
        test.done();
    },

    "timezone format" : function (test) {
        test.equal(momentBuilder().zone(-60).freeze().format('ZZ'), "+0100", "-60 -> +0100");
        test.equal(momentBuilder().zone(-90).freeze().format('ZZ'), "+0130", "-90 -> +0130");
        test.equal(momentBuilder().zone(-120).freeze().format('ZZ'), "+0200", "-120 -> +0200");

        test.equal(momentBuilder().zone(+60).freeze().format('ZZ'), "-0100", "+60 -> -0100");
        test.equal(momentBuilder().zone(+90).freeze().format('ZZ'), "-0130", "+90 -> -0130");
        test.equal(momentBuilder().zone(+120).freeze().format('ZZ'), "-0200", "+120 -> -0200");
        test.done();
    }
};

/*global moment:false*/

(function(){
	var banner = $('#nodeunit-banner');
	var tests = $('#nodeunit-tests');
	var headerRow = $("#header-row");

	var start = frozenMoment();
	var passed = 0;
	var failed = 0;
	var total = 0;
	var currentTestModule;
	var currentModuleEl;

	function updateTest(_passed, _failed) {
		passed += _passed;
		failed += _failed;
		updateTotals(passed, failed);
	}

	function updateTotals(_passed, _failed) {
		if (_failed) {
			banner.addClass('has-failed');
		}
		banner.html(_passed + ' tests passed<br/><span>' + _failed + ' failed</span>');
	}

	(function() {
		var queryArgs = {}, query = window.location.search, pieces, i, key_val,
			filtered, suite, test;
		if (!query) { return; }
		if (query[query.length - 1] === '/') {
			query = query.slice(0, query.length - 1);
		}
		pieces = query.slice(1).split('&');
		for (i = 0; i < pieces.length; ++i) {
			key_val = pieces[i].split('=');
			queryArgs[decodeURIComponent(key_val[0])] = decodeURIComponent(key_val[1]);
		}
		if (queryArgs.suite !== undefined) {
			filtered = {};
			for (suite in exports) {
				if (suite.match(queryArgs.suite)) {
					filtered[suite] = exports[suite];
				}
			}
			exports = filtered;
		}
		if (queryArgs.test !== undefined) {
			for (suite in exports) {
				filtered = {};
				for (test in exports[suite]) {
					if (test === 'setUp' || test === 'tearDown' || test.match(queryArgs.test)) {
						filtered[test] = exports[suite][test];
					}
				}
				exports[suite] = filtered;
			}
		}
	}());

	nodeunit.runModules(exports, {
		moduleStart : function (name) {
			currentTestModule = name;
			currentModuleEl = $('<div>').addClass('tests-module');
			currentModuleEl.append('<h3 class="tests-module-title">' + name + '</h3>');
			tests.append(currentModuleEl);
		},
		testDone : function (name, assertions) {
			var testEl = $('<div>').addClass('tests-test'),
				testHtml = '',
				assertUl = $('<div>').addClass('tests-asserts'),
				assertLi,
				assertHtml = '',
				assert;

			total++;

			// each test
			testHtml += '<div class="tests-test-title"><strong>' + name + '</strong> ';
			if (assertions.failures()) {
				testEl.addClass('has-failed is-open');
				testHtml += assertions.passes() + ' passed : ';
				testHtml += assertions.failures() + ' failed</div>';
			} else {
				testHtml += 'all ' + assertions.passes() + ' passed</div>';
			}
			testEl.html(testHtml);

			// each assert
			for (var i = 0; i < assertions.length; i++) {
				assert = assertions[i];
				assert.uid = total + '.' + (i + 1);
				assert.test_name = name;
				assert.module_name = currentTestModule;
				assertLi = $('<div>').addClass('tests-assert');
				assertHtml = '<strong>' + assert.uid + '</strong> ';
				assertHtml += (assert.message || assert.method || 'no message');
				if (assert.failed()) {
					assertHtml += ' (' + assert.error.expected + ' ' + assert.error.operator + ' ' + assert.error.actual + ')';
					assertHtml += '<pre>' + (assert.error.stack || assert.error) + '</pre>';
					assertLi.addClass('has-failed');
				}
				assertLi.html(assertHtml);
				assertUl.append(assertLi);
			}

			testEl.append(assertUl);
			currentModuleEl.append(testEl);
			updateTest(assertions.passes(), assertions.failures());
		},
		done : function (assertions) {
			var duration = frozenMoment().diff(start),
				failures = assertions.failures(),
				assert, error, i,
				reportHTML = '',
				header,
				expression,
				submitUrl = "https://github.com/WhoopInc/frozen-moment/issues/new",
				searchUrl = "https://github.com/WhoopInc/frozen-moment/search",
				titleText = "" + failures + " test" + (failures !== 1 ? "s" : "") + " failed. ",
				bodyText = [
					"### Client info",
					'```',
					"Date String   : " + (new Date()).toString(),
					"Locale String : " + (new Date()).toLocaleString(),
					"Offset        : " + (new Date(1000)).getTimezoneOffset(),
					"User Agent    : " + navigator.userAgent,
					'```'
				];

			for (i = 0; i < assertions.length; ++i) {
				assert = assertions[i];
				error = assert.error;

				if (!assert.failed()) {
					continue;
				}

				header = assert.module_name + ':' + assert.test_name + ' (' + assert.uid + ') ';
				titleText += header;

				bodyText.push('');
				bodyText.push('====');
				bodyText.push('');
				bodyText.push('### ' + header);
				bodyText.push('');
				bodyText.push(assert.message);
				bodyText.push('');
				bodyText.push('```javascript');
				bodyText.push('// Expected ' + error.expected);
				bodyText.push('// Actual   ' + error.actual);

				expression = typeof error.actual === 'string' ? '"' + error.actual.replace('"', '\\"') + '"' : error.actual;
				expression += ' ' + error.operator + ' ';
				expression += typeof error.expected === 'string' ? '"' + error.expected.replace('"', '\\"') + '"' : error.expected;

				bodyText.push(expression);
				bodyText.push('```');
				console.log(assert, error);
			}

			bodyText = bodyText.join('\n');

			submitUrl += '?title=' + encodeURIComponent(titleText);
			submitUrl += '&body=' + encodeURIComponent(bodyText);

			searchUrl += '?type=Issues&q=' + encodeURIComponent(titleText);

			if (failures) {
				reportHTML += '<h2>Uh oh, looks like some tests failed.</h2>';
				reportHTML += "<p>It's hard to catch bugs across all browsers and timezones. If you have a minute, please report the failing test.</p>";
				reportHTML += "<a class='button' href='" + searchUrl + "' target='_blank'><b>STEP 1:</b> Search for an existing failure report</a>";
				reportHTML += "<p>If it doesn't look like this failure has already been reported, proceed to step 2.</p>";
				reportHTML += "<a class='button' href='" + submitUrl + "' target='_blank'><b>STEP 2:</b> Submit a failure report</a>";
				reportHTML += '<h3>Issue title</h3>';
				reportHTML += '<pre>' + titleText + '</pre>';
				reportHTML += '<h3>Issue description</h3>';
				reportHTML += '<pre>' + bodyText.replace(/\n/g, '<br/>') + '</pre>';
			} else {
				reportHTML += "<p class='success'>Awesome, all the unit tests passed!</p>";
			}

			$('#report-wrapper').html('<div class="tests-reporting">' + reportHTML + '<div>');

			updateTotals(assertions.passes(), failures);
		}
	});

	tests.on('click', '.tests-test', function(){
		$(this).toggleClass('is-open');
	});
})();


})();