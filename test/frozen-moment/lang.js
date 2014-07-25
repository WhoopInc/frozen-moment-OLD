var frozenMoment = require("../../frozen-moment"),
    momentBuilder = frozenMoment.build;

exports.lang = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "library getter" : function (test) {
        var r;
        test.expect(8);

        r = frozenMoment.lang('en');
        test.equal(r, 'en', 'Lang should return en by default');
        test.equal(frozenMoment.lang(), 'en', 'Lang should return en by default');

        frozenMoment.lang('fr');
        test.equal(frozenMoment.lang(), 'fr', 'Lang should return the changed language');

        frozenMoment.lang('en-gb');
        test.equal(frozenMoment.lang(), 'en-gb', 'Lang should return the changed language');

        frozenMoment.lang('en');
        test.equal(frozenMoment.lang(), 'en', 'Lang should reset');

        frozenMoment.lang('does-not-exist');
        test.equal(frozenMoment.lang(), 'en', 'Lang should reset');

        frozenMoment.lang('EN');
        test.equal(frozenMoment.lang(), 'en', 'Normalize language key case');

        frozenMoment.lang('EN_gb');
        test.equal(frozenMoment.lang(), 'en-gb', 'Normalize language key underscore');

        test.done();
    },

    "library getter array of langs" : function (test) {
        test.equal(frozenMoment.lang(['non-existent', 'fr', 'also-non-existent']), 'fr', "passing an array uses the first valid language");
        test.equal(frozenMoment.lang(['es', 'fr', 'also-non-existent']), 'es', "passing an array uses the first valid language");
        test.done();
    },

    "library getter language substrings" : function (test) {
        test.equal(frozenMoment.lang('fr-crap'), 'fr', "use substrings");
        test.equal(frozenMoment.lang('fr-does-not-exist'), 'fr', "uses deep substrings");
        test.equal(frozenMoment.lang('fr-CA-does-not-exist'), 'fr-ca', "uses deepest substring");
        test.done();
    },

    "library getter language array and substrings" : function (test) {
        test.equal(frozenMoment.lang(['en-CH', 'fr']), 'en', "prefer root languages to shallower ones");
        test.equal(frozenMoment.lang(['en-gb-leeds', 'en-CA']), 'en-gb', "prefer root languages to shallower ones");
        test.equal(frozenMoment.lang(['en-fake', 'en-CA']), 'en-ca', "prefer alternatives with shared roots");
        test.equal(frozenMoment.lang(['en-fake', 'en-fake2', 'en-ca']), 'en-ca', "prefer alternatives with shared roots");
        test.equals(frozenMoment.lang(['fake-CA', 'fake-MX', 'fr']), 'fr', "always find something if possible");
        test.equals(frozenMoment.lang(['fake-CA', 'fake-MX', 'fr']), 'fr', "always find something if possible");
        test.equals(frozenMoment.lang(['fake-CA', 'fake-MX', 'fr-fake-fake-fake']), 'fr', "always find something if possible");
        test.equals(frozenMoment.lang(['en', 'en-CA']), 'en', "prefer earlier if it works");
        test.done();
    },

    "library ensure inheritance" : function (test) {
        test.expect(2);

        frozenMoment.lang('made-up', {
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

        var lang = 'test-inherit-lt';

        frozenMoment.lang(lang, {
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

        frozenMoment.lang('es');

        test.equal(momentBuilder().lang(lang).freeze().calendar(), "sameDay -LT-", "Should use instance lang in LT formatting");
        test.equal(momentBuilder().add(1, 'days').lang(lang).freeze().calendar(), "nextDay -L-", "Should use instance lang in L formatting");
        test.equal(momentBuilder().add(-1, 'days').lang(lang).freeze().calendar(), "lastDay -LLL-", "Should use instance lang in LL formatting");
        test.equal(momentBuilder().add(4, 'days').lang(lang).freeze().calendar(), "nextWeek -LL-", "Should use instance lang in LLL formatting");
        test.equal(momentBuilder().add(-4, 'days').lang(lang).freeze().calendar(), "lastWeek -LLLL-", "Should use instance lang in LLLL formatting");

        test.done();
    },

    "library langData" : function (test) {
        test.expect(3);
        frozenMoment.lang('en');

        var jan = frozenMoment([2000, 0]);

        test.equal(frozenMoment.langData().months(jan), 'January', 'no arguments returns global');
        test.equal(frozenMoment.langData('zh-cn').months(jan), '一月', 'a string returns the language based on key');
        test.equal(frozenMoment.langData(momentBuilder().lang('es').freeze()).months(jan), 'enero', "if you pass in a frozenMoment it uses the frozenMoment's language");

        test.done();
    },

    "instance lang method" : function (test) {
        test.expect(3);
        frozenMoment.lang('en');

        test.equal(frozenMoment([2012, 5, 6]).format('MMMM'), 'June', 'Normally default to global');
        test.equal(momentBuilder([2012, 5, 6]).lang('es').freeze().format('MMMM'), 'junio', 'Use the instance specific language');
        test.equal(frozenMoment([2012, 5, 6]).format('MMMM'), 'June', 'Using an instance specific language does not affect other frozenMoments');

        test.done();
    },

    "instance lang method with array" : function (test) {
        var m = momentBuilder().lang(['non-existent', 'fr', 'also-non-existent']).freeze();
        test.equal(m.lang()._abbr, 'fr', "passing an array uses the first valid language");
        m = momentBuilder().lang(['es', 'fr', 'also-non-existent']).freeze();
        test.equal(m.lang()._abbr, 'es', "passing an array uses the first valid language");
        test.done();
    },

    "instance getter language substrings" : function (test) {
        var m = momentBuilder();

        m = m.lang('fr-crap');
        test.equal(m.freeze().lang()._abbr, 'fr', "use substrings");

        m = m.lang('fr-does-not-exist');
        test.equal(m.freeze().lang()._abbr, 'fr', "uses deep substrings");

        test.done();
    },

    "instance lang persists with manipulation" : function (test) {
        test.expect(3);
        frozenMoment.lang('en');

        test.equal(momentBuilder([2012, 5, 6]).lang('es').add({days: 1}).freeze().format('MMMM'), 'junio', 'With addition');
        test.equal(momentBuilder([2012, 5, 6]).lang('es').day(0).freeze().format('MMMM'), 'junio', 'With day getter');
        test.equal(momentBuilder([2012, 5, 6]).lang('es').endOf('day').freeze().format('MMMM'), 'junio', 'With endOf');

        test.done();
    },

    "instance lang persists with cloning" : function (test) {
        test.expect(2);
        frozenMoment.lang('en');

        var a = momentBuilder([2012, 5, 6]).lang('es').freeze(),
            b = a.clone(),
            c = frozenMoment(a);

        test.equal(b.format('MMMM'), 'junio', 'using frozenMoment.fn.clone()');
        test.equal(c.format('MMMM'), 'junio', 'using frozenMoment()');

        test.done();
    },

    "duration lang method" : function (test) {
        test.expect(3);
        frozenMoment.lang('en');

        test.equal(frozenMoment.duration({seconds: 44}).humanize(), 'a few seconds', 'Normally default to global');
        test.equal(frozenMoment.duration.build({seconds: 44}).lang('es').freeze().humanize(), 'unos segundos', 'Use the instance specific language');
        test.equal(frozenMoment.duration.build({seconds: 44}).freeze().humanize(), 'a few seconds', 'Using an instance specific language does not affect other durations');

        test.done();
    },

    "duration lang persists with cloning" : function (test) {
        test.expect(1);
        frozenMoment.lang('en');

        var a = frozenMoment.duration.build({seconds:  44}).lang('es').freeze(),
            b = frozenMoment.duration(a);

        test.equal(b.humanize(), 'unos segundos', 'using frozenMoment.duration()');
        test.done();
    },

    "from relative time future" : function (test) {
        var start = frozenMoment([2007, 1, 28]);

        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({s: 44})),  "in a few seconds", "44 seconds = a few seconds");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({s: 45})),  "in a minute",      "45 seconds = a minute");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({s: 89})),  "in a minute",      "89 seconds = a minute");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({s: 90})),  "in 2 minutes",     "90 seconds = 2 minutes");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({m: 44})),  "in 44 minutes",    "44 minutes = 44 minutes");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({m: 45})),  "in an hour",       "45 minutes = an hour");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({m: 89})),  "in an hour",       "89 minutes = an hour");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({m: 90})),  "in 2 hours",       "90 minutes = 2 hours");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({h: 5})),   "in 5 hours",       "5 hours = 5 hours");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({h: 21})),  "in 21 hours",      "21 hours = 21 hours");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({h: 22})),  "in a day",         "22 hours = a day");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({h: 35})),  "in a day",         "35 hours = a day");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({h: 36})),  "in 2 days",        "36 hours = 2 days");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({d: 1})),   "in a day",         "1 day = a day");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({d: 5})),   "in 5 days",        "5 days = 5 days");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({d: 25})),  "in 25 days",       "25 days = 25 days");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({d: 26})),  "in a month",       "26 days = a month");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({d: 30})),  "in a month",       "30 days = a month");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({d: 45})),  "in a month",       "45 days = a month");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({d: 47})),  "in 2 months",      "47 days = 2 months");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({d: 74})),  "in 2 months",      "74 days = 2 months");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({d: 78})),  "in 3 months",      "78 days = 3 months");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({M: 1})),   "in a month",       "1 month = a month");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({M: 5})),   "in 5 months",      "5 months = 5 months");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({d: 315})), "in 10 months",     "315 days = 10 months");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({d: 344})), "in a year",        "344 days = a year");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({d: 345})), "in a year",        "345 days = a year");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({d: 548})), "in 2 years",       "548 days = in 2 years");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({y: 1})),   "in a year",        "1 year = a year");
        test.equal(start.from(momentBuilder([2007, 1, 28]).subtract({y: 5})),   "in 5 years",       "5 years = 5 years");

        test.done();
    },

    "from relative time past" : function (test) {
        var start = frozenMoment([2007, 1, 28]);

        test.equal(start.from(momentBuilder([2007, 1, 28]).add({s: 44})),  "a few seconds ago", "44 seconds = a few seconds");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({s: 45})),  "a minute ago",      "45 seconds = a minute");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({s: 89})),  "a minute ago",      "89 seconds = a minute");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({s: 90})),  "2 minutes ago",     "90 seconds = 2 minutes");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({m: 44})),  "44 minutes ago",    "44 minutes = 44 minutes");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({m: 45})),  "an hour ago",       "45 minutes = an hour");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({m: 89})),  "an hour ago",       "89 minutes = an hour");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({m: 90})),  "2 hours ago",       "90 minutes = 2 hours");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({h: 5})),   "5 hours ago",       "5 hours = 5 hours");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({h: 21})),  "21 hours ago",      "21 hours = 21 hours");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({h: 22})),  "a day ago",         "22 hours = a day");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({h: 35})),  "a day ago",         "35 hours = a day");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({h: 36})),  "2 days ago",        "36 hours = 2 days");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({d: 1})),   "a day ago",         "1 day = a day");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({d: 5})),   "5 days ago",        "5 days = 5 days");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({d: 25})),  "25 days ago",       "25 days = 25 days");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({d: 26})),  "a month ago",       "26 days = a month");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({d: 30})),  "a month ago",       "30 days = a month");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({d: 43})),  "a month ago",       "43 days = a month");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({d: 46})),  "2 months ago",      "46 days = 2 months");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({d: 74})),  "2 months ago",      "75 days = 2 months");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({d: 76})),  "3 months ago",      "76 days = 3 months");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({M: 1})),   "a month ago",       "1 month = a month");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({M: 5})),   "5 months ago",      "5 months = 5 months");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({d: 315})), "10 months ago",     "315 days = 10 months");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({d: 344})), "a year ago",        "344 days = a year");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({d: 345})), "a year ago",        "345 days = a year");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({d: 548})), "2 years ago",       "548 days = 2 years");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({y: 1})),   "a year ago",        "1 year = a year");
        test.equal(start.from(momentBuilder([2007, 1, 28]).add({y: 5})),   "5 years ago",       "5 years = 5 years");

        test.done();
    },

    "instance lang used with from" : function (test) {
        test.expect(2);
        frozenMoment.lang('en');

        var a = momentBuilder([2012, 5, 6]).lang('es').freeze(),
            b = frozenMoment([2012, 5, 7]);

        test.equal(a.from(b), 'hace un día', 'preserve language of first frozenMoment');
        test.equal(b.from(a), 'in a day', 'do not preserve language of second frozenMoment');

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

        frozenMoment.lang('made-up-2', {
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

    "changing parts of a language config" : function (test) {
        test.expect(2);

        frozenMoment.lang('partial-lang', {
            months : 'a b c d e f g h i j k l'.split(' ')
        });

        test.equal(frozenMoment([2011, 0, 1]).format('MMMM'), 'a', 'should be able to set language values when creating the language');

        frozenMoment.lang('partial-lang', {
            monthsShort : 'A B C D E F G H I J K L'.split(' ')
        });

        test.equal(frozenMoment([2011, 0, 1]).format('MMMM MMM'), 'a A', 'should be able to set language values after creating the language');

        test.done();
    },

    "start/endOf week feature for first-day-is-monday langs" : function (test) {
        test.expect(2);

        frozenMoment.lang('monday-lang', {
            week : {
                dow : 1 // Monday is the first day of the week
            }
        });

        frozenMoment.lang('monday-lang');
        test.equal(momentBuilder([2013, 0, 1]).startOf('week').freeze().day(), 1, 'for lang monday-lang first day of the week should be monday');
        test.equal(momentBuilder([2013, 0, 1]).endOf('week').freeze().day(), 0, 'for lang monday-lang last day of the week should be sunday');

        test.done();
    },

    "meridiem parsing" : function (test) {
        test.expect(2);

        frozenMoment.lang('meridiem-parsing', {
            meridiemParse : /[bd]/i,
            isPM : function (input) {
                return input === 'b';
            }
        });

        frozenMoment.lang('meridiem-parsing');
        test.equal(frozenMoment('2012-01-01 3b', 'YYYY-MM-DD ha').hour(), 15, 'Custom parsing of meridiem should work');
        test.equal(frozenMoment('2012-01-01 3d', 'YYYY-MM-DD ha').hour(), 3, 'Custom parsing of meridiem should work');

        test.done();
    },

    "invalid date formatting" : function (test) {
        frozenMoment.lang('has-invalid', {
            invalidDate: 'KHAAAAAAAAAAAN!'
        });

        test.equal(frozenMoment.invalid().format(), "KHAAAAAAAAAAAN!");
        test.equal(frozenMoment.invalid().format('YYYY-MM-DD'), "KHAAAAAAAAAAAN!");

        test.done();
    },

    "return lang name" : function (test) {
        test.expect(1);

        var registered = frozenMoment.lang('return-this', {});

        test.equal(registered, 'return-this', 'returns the language configured');

        test.done();
    }
};
