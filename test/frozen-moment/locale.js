var frozenMoment = require("../../frozen-frozenMoment"),
    frozenMomentBuilder = frozenMoment.build;

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

        frozenMoment.defineLocale('made-up', {
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

        test.equal(frozenMomentBuilder().locale(locale).freeze().calendar(), "sameDay -LT-", "Should use instance locale in LT formatting");
        test.equal(frozenMomentBuilder().add(1, 'days').locale(locale).freeze().calendar(), "nextDay -L-", "Should use instance locale in L formatting");
        test.equal(frozenMomentBuilder().add(-1, 'days').locale(locale).freeze().calendar(), "lastDay -LLL-", "Should use instance locale in LL formatting");
        test.equal(frozenMomentBuilder().add(4, 'days').locale(locale).freeze().calendar(), "nextWeek -LL-", "Should use instance locale in LLL formatting");
        test.equal(frozenMomentBuilder().add(-4, 'days').locale(locale).freeze().calendar(), "lastWeek -LLLL-", "Should use instance locale in LLLL formatting");

        test.done();
    },

    "library localeData" : function (test) {
        test.expect(3);
        frozenMoment.locale('en');

        var jan = frozenMoment([2000, 0]);

        test.equal(frozenMoment.localeData().months(jan), 'January', 'no arguments returns global');
        test.equal(frozenMoment.localeData('zh-cn').months(jan), '一月', 'a string returns the locale based on key');
        test.equal(frozenMoment.localeData(frozenMomentBuilder().locale('es').freeze()).months(jan), 'enero', "if you pass in a frozenMoment it uses the frozenMoment's locale");

        test.done();
    },

    "library deprecations" : function (test) {
        frozenMoment.lang("dude", {months: ["Movember"]});
        test.equal(frozenMoment.locale(), "dude", "setting the lang sets the locale");
        test.equal(frozenMoment.lang(), frozenMoment.locale());
        test.equal(frozenMoment.langData(), frozenMoment.localeData(), "langData is localeData");
        test.done();
    },

    "defineLocale" : function (test) {
        frozenMoment.locale("en");
        frozenMoment.defineLocale("dude", {months: ["Movember"]});
        test.equal(frozenMoment().locale(), "en", "defineLocale doesn't set it");
        test.equal(frozenMoment().locale("dude").locale(), "dude", "defineLocale defines a locale");
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
        test.equal(frozenMomentBuilder([2012, 5, 6]).locale('es').freeze().format('MMMM'), 'junio', 'Use the instance specific locale');
        test.equal(frozenMoment([2012, 5, 6]).format('MMMM'), 'June', 'Using an instance specific locale does not affect other frozenMoments');

        test.done();
    },

    "instance locale method with array" : function (test) {
        var m = frozenMomentBuilder().locale(['non-existent', 'fr', 'also-non-existent']).freeze();
        test.equal(m.locale()._abbr, 'fr', "passing an array uses the first valid locale");
        m = frozenMomentBuilder().locale(['es', 'fr', 'also-non-existent']).freeze();
        test.equal(m.locale()._abbr, 'es', "passing an array uses the first valid locale");
        test.done();
    },

    "instance getter locale substrings" : function (test) {
        var m = frozenMomentBuilder();

        m = m.locale('fr-crap');
        test.equal(m.freeze().locale()._abbr, 'fr', "use substrings");

        m = m.locale('fr-does-not-exist');
        test.equal(m.freeze().locale()._abbr, 'fr', "uses deep substrings");

        test.done();
    },

    "instance locale persists with manipulation" : function (test) {
        test.expect(3);
        frozenMoment.locale('en');

        test.equal(frozenMomentBuilder([2012, 5, 6]).locale('es').add({days: 1}).freeze().format('MMMM'), 'junio', 'With addition');
        test.equal(frozenMomentBuilder([2012, 5, 6]).locale('es').day(0).freeze().format('MMMM'), 'junio', 'With day getter');
        test.equal(frozenMomentBuilder([2012, 5, 6]).locale('es').endOf('day').freeze().format('MMMM'), 'junio', 'With endOf');

        test.done();
    },

    "instance locale persists with cloning" : function (test) {
        test.expect(2);
        frozenMoment.locale('en');

        var a = frozenMomentBuilder([2012, 5, 6]).locale('es').freeze(),
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

    "duration deprecations" : function (test) {
        test.equal(frozenMoment.duration().lang(), frozenMoment.duration().localeData(), "duration.lang is the same as duration.localeData");
        test.done();
    },

    "from relative time future" : function (test) {
        var start = frozenMoment([2007, 1, 28]);

        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({s: 44})),  "in a few seconds", "44 seconds = a few seconds");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({s: 45})),  "in a minute",      "45 seconds = a minute");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({s: 89})),  "in a minute",      "89 seconds = a minute");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({s: 90})),  "in 2 minutes",     "90 seconds = 2 minutes");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({m: 44})),  "in 44 minutes",    "44 minutes = 44 minutes");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({m: 45})),  "in an hour",       "45 minutes = an hour");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({m: 89})),  "in an hour",       "89 minutes = an hour");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({m: 90})),  "in 2 hours",       "90 minutes = 2 hours");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({h: 5})),   "in 5 hours",       "5 hours = 5 hours");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({h: 21})),  "in 21 hours",      "21 hours = 21 hours");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({h: 22})),  "in a day",         "22 hours = a day");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({h: 35})),  "in a day",         "35 hours = a day");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({h: 36})),  "in 2 days",        "36 hours = 2 days");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({d: 1})),   "in a day",         "1 day = a day");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({d: 5})),   "in 5 days",        "5 days = 5 days");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({d: 25})),  "in 25 days",       "25 days = 25 days");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({d: 26})),  "in a month",       "26 days = a month");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({d: 30})),  "in a month",       "30 days = a month");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({d: 45})),  "in a month",       "45 days = a month");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({d: 47})),  "in 2 months",      "47 days = 2 months");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({d: 74})),  "in 2 months",      "74 days = 2 months");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({d: 78})),  "in 3 months",      "78 days = 3 months");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({M: 1})),   "in a month",       "1 month = a month");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({M: 5})),   "in 5 months",      "5 months = 5 months");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({d: 315})), "in 10 months",     "315 days = 10 months");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({d: 344})), "in a year",        "344 days = a year");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({d: 345})), "in a year",        "345 days = a year");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({d: 548})), "in 2 years",       "548 days = in 2 years");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({y: 1})),   "in a year",        "1 year = a year");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).subtract({y: 5})),   "in 5 years",       "5 years = 5 years");

        test.done();
    },

    "from relative time past" : function (test) {
        var start = frozenMoment([2007, 1, 28]);

        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({s: 44})),  "a few seconds ago", "44 seconds = a few seconds");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({s: 45})),  "a minute ago",      "45 seconds = a minute");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({s: 89})),  "a minute ago",      "89 seconds = a minute");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({s: 90})),  "2 minutes ago",     "90 seconds = 2 minutes");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({m: 44})),  "44 minutes ago",    "44 minutes = 44 minutes");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({m: 45})),  "an hour ago",       "45 minutes = an hour");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({m: 89})),  "an hour ago",       "89 minutes = an hour");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({m: 90})),  "2 hours ago",       "90 minutes = 2 hours");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({h: 5})),   "5 hours ago",       "5 hours = 5 hours");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({h: 21})),  "21 hours ago",      "21 hours = 21 hours");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({h: 22})),  "a day ago",         "22 hours = a day");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({h: 35})),  "a day ago",         "35 hours = a day");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({h: 36})),  "2 days ago",        "36 hours = 2 days");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({d: 1})),   "a day ago",         "1 day = a day");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({d: 5})),   "5 days ago",        "5 days = 5 days");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({d: 25})),  "25 days ago",       "25 days = 25 days");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({d: 26})),  "a month ago",       "26 days = a month");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({d: 30})),  "a month ago",       "30 days = a month");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({d: 43})),  "a month ago",       "43 days = a month");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({d: 46})),  "2 months ago",      "46 days = 2 months");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({d: 74})),  "2 months ago",      "75 days = 2 months");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({d: 76})),  "3 months ago",      "76 days = 3 months");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({M: 1})),   "a month ago",       "1 month = a month");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({M: 5})),   "5 months ago",      "5 months = 5 months");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({d: 315})), "10 months ago",     "315 days = 10 months");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({d: 344})), "a year ago",        "344 days = a year");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({d: 345})), "a year ago",        "345 days = a year");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({d: 548})), "2 years ago",       "548 days = 2 years");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({y: 1})),   "a year ago",        "1 year = a year");
        test.equal(start.from(frozenMomentBuilder([2007, 1, 28]).add({y: 5})),   "5 years ago",       "5 years = 5 years");

        test.done();
    },

    "instance locale used with from" : function (test) {
        test.expect(2);
        frozenMoment.locale('en');

        var a = frozenMomentBuilder([2012, 5, 6]).locale('es').freeze(),
            b = frozenMoment([2012, 5, 7]);

        test.equal(a.from(b), 'hace un día', 'preserve locale of first frozenMoment');
        test.equal(b.from(a), 'in a day', 'do not preserve locale of second frozenMoment');

        test.done();
    },

    "instance localeData" : function (test) {
        frozenMoment.defineLocale("dude", {week: {dow: 3}});
        test.equal(frozenMoment().locale("dude").localeData()._week.dow, 3);
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
        test.equal(frozenMomentBuilder([2013, 0, 1]).startOf('week').freeze().day(), 1, 'for locale monday-locale first day of the week should be monday');
        test.equal(frozenMomentBuilder([2013, 0, 1]).endOf('week').freeze().day(), 0, 'for locale monday-locale last day of the week should be sunday');

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
    }
};
