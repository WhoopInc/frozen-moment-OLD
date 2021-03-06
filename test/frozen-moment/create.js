var frozenMoment = require('../../frozen-moment'),

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
            throw new Error('input not handled by frozenMoment');
        };
        done();
    },

    'array' : function (test) {
        test.expect(8);
        test.ok(frozenMoment([2010]).toDate() instanceof Date, '[2010]');
        test.ok(frozenMoment([2010, 1]).toDate() instanceof Date, '[2010, 1]');
        test.ok(frozenMoment([2010, 1, 12]).toDate() instanceof Date, '[2010, 1, 12]');
        test.ok(frozenMoment([2010, 1, 12, 1]).toDate() instanceof Date, '[2010, 1, 12, 1]');
        test.ok(frozenMoment([2010, 1, 12, 1, 1]).toDate() instanceof Date, '[2010, 1, 12, 1, 1]');
        test.ok(frozenMoment([2010, 1, 12, 1, 1, 1]).toDate() instanceof Date, '[2010, 1, 12, 1, 1, 1]');
        test.ok(frozenMoment([2010, 1, 12, 1, 1, 1, 1]).toDate() instanceof Date, '[2010, 1, 12, 1, 1, 1, 1]');
        test.equal(+frozenMoment(new Date(2010, 1, 14, 15, 25, 50, 125)), +frozenMoment([2010, 1, 14, 15, 25, 50, 125]), 'constructing with array === constructing with new Date()');
        test.done();
    },

    'array copying': function (test) {
        var importantArray = [2009, 11];
        test.expect(1);
        frozenMoment(importantArray);
        test.deepEqual(importantArray, [2009, 11], 'initializer should not mutate the original array');
        test.done();
    },

    'object' : function (test) {
        var fmt = 'YYYY-MM-DD HH:mm:ss.SSS',
            tests = [
                [{year: 2010}, '2010-01-01 00:00:00.000'],
                [{year: 2010, month: 1}, '2010-02-01 00:00:00.000'],
                [{year: 2010, month: 1, day: 12}, '2010-02-12 00:00:00.000'],
                [{year: 2010, month: 1, date: 12}, '2010-02-12 00:00:00.000'],
                [{year: 2010, month: 1, day: 12, hours: 1}, '2010-02-12 01:00:00.000'],
                [{year: 2010, month: 1, date: 12, hours: 1}, '2010-02-12 01:00:00.000'],
                [{year: 2010, month: 1, day: 12, hours: 1, minutes: 1}, '2010-02-12 01:01:00.000'],
                [{year: 2010, month: 1, date: 12, hours: 1, minutes: 1}, '2010-02-12 01:01:00.000'],
                [{year: 2010, month: 1, day: 12, hours: 1, minutes: 1, seconds: 1}, '2010-02-12 01:01:01.000'],
                [{year: 2010, month: 1, day: 12, hours: 1, minutes: 1, seconds: 1, milliseconds: 1}, '2010-02-12 01:01:01.001'],
                [{years: 2010, months: 1, days: 14, hours: 15, minutes: 25, seconds: 50, milliseconds: 125}, '2010-02-14 15:25:50.125'],
                [{year: 2010, month: 1, day: 14, hour: 15, minute: 25, second: 50, millisecond: 125}, '2010-02-14 15:25:50.125'],
                [{y: 2010, M: 1, d: 14, h: 15, m: 25, s: 50, ms: 125}, '2010-02-14 15:25:50.125']
            ], i;
        test.expect(13);
        for (i = 0; i < tests.length; ++i) {
            test.equal(frozenMoment(tests[i][0]).format(fmt), tests[i][1]);
        }
        test.done();
    },

    'multi format array copying': function (test) {
        var importantArray = ['MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY'];
        test.expect(1);
        frozenMoment('1999-02-13', importantArray);
        test.deepEqual(importantArray, ['MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY'], 'initializer should not mutate the original array');
        test.done();
    },

    'number' : function (test) {
        test.expect(3);
        test.ok(frozenMoment(1000).toDate() instanceof Date, '1000');
        test.ok((frozenMoment(1000).valueOf() === 1000), 'testing valueOf');
        test.ok((frozenMoment.utc(1000).valueOf() === 1000), 'testing valueOf');
        test.done();
    },

    'unix' : function (test) {
        test.expect(8);
        test.equal(frozenMoment.unix(1).valueOf(), 1000, '1 unix timestamp == 1000 Date.valueOf');
        test.equal(frozenMoment(1000).unix(), 1, '1000 Date.valueOf == 1 unix timestamp');
        test.equal(frozenMoment.unix(1000).valueOf(), 1000000, '1000 unix timestamp == 1000000 Date.valueOf');
        test.equal(frozenMoment(1500).unix(), 1, '1500 Date.valueOf == 1 unix timestamp');
        test.equal(frozenMoment(1900).unix(), 1, '1900 Date.valueOf == 1 unix timestamp');
        test.equal(frozenMoment(2100).unix(), 2, '2100 Date.valueOf == 2 unix timestamp');
        test.equal(frozenMoment(1333129333524).unix(), 1333129333, '1333129333524 Date.valueOf == 1333129333 unix timestamp');
        test.equal(frozenMoment(1333129333524000).unix(), 1333129333524, '1333129333524000 Date.valueOf == 1333129333524 unix timestamp');
        test.done();
    },

    'date' : function (test) {
        test.expect(1);
        test.ok(frozenMoment(new Date()).toDate() instanceof Date, 'new Date()');
        test.done();
    },

    'date mutation' : function (test) {
        test.expect(1);
        var a = new Date();
        test.ok(frozenMoment(a).toDate() !== a, 'the date frozenMoment uses should not be the date passed in');
        test.done();
    },

    'frozenMoment' : function (test) {
        test.expect(2);
        test.ok(frozenMoment(frozenMoment()).toDate() instanceof Date, 'frozenMoment(frozenMoment())');
        test.ok(frozenMoment(frozenMoment(frozenMoment())).toDate() instanceof Date, 'frozenMoment(frozenMoment(frozenMoment()))');
        test.done();
    },

    'cloning frozenMoment should only copy own properties' : function (test) {
        test.expect(1);
        test.ok(!frozenMoment().clone().hasOwnProperty('month'), 'Should not clone prototype methods');
        test.done();
    },

    'cloning frozenMoment works with weird clones' : function (test) {
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
        test.equal(+extend({}, now).clone(), +now, 'cloning extend-ed now is now');
        test.equal(+extend({}, nowu).clone(), +nowu, 'cloning extend-ed utc now is utc now');
        test.done();
    },

    'cloning respects frozenMoment.instanceProperties' : function (test) {
        var m = frozenMoment.build();

        test.equal(m.clone()._special, undefined, 'cloning ignores extra properties');
        m._special = 'bacon';
        frozenMoment.instanceProperties.push('_special');
        test.equal(m.clone()._special, 'bacon', 'cloning respects instanceProperties');
        frozenMoment.instanceProperties.pop();

        test.done();
    },

    'undefined' : function (test) {
        test.expect(1);
        test.ok(frozenMoment().toDate() instanceof Date, 'undefined');
        test.done();
    },

    'string without format - json' : function (test) {
        test.expect(5);
        test.equal(frozenMoment('Date(1325132654000)').valueOf(), 1325132654000, 'Date(1325132654000)');
        test.equal(frozenMoment('Date(-1325132654000)').valueOf(), -1325132654000, 'Date(-1325132654000)');
        test.equal(frozenMoment('/Date(1325132654000)/').valueOf(), 1325132654000, '/Date(1325132654000)/');
        test.equal(frozenMoment('/Date(1325132654000+0700)/').valueOf(), 1325132654000, '/Date(1325132654000+0700)/');
        test.equal(frozenMoment('/Date(1325132654000-0700)/').valueOf(), 1325132654000, '/Date(1325132654000-0700)/');
        test.done();
    },

    'string with format dropped am/pm bug' : function (test) {
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

    'empty string with formats' : function (test) {
        test.expect(8);

        test.equal(frozenMoment('', 'MM').format('YYYY-MM-DD HH:mm:ss'), 'Invalid date');
        test.equal(frozenMoment(' ', 'MM').format('YYYY-MM-DD HH:mm:ss'), 'Invalid date');
        test.equal(frozenMoment(' ', 'DD').format('YYYY-MM-DD HH:mm:ss'), 'Invalid date');
        test.equal(frozenMoment(' ', ['MM', 'DD']).format('YYYY-MM-DD HH:mm:ss'), 'Invalid date');

        test.ok(!frozenMoment('', 'MM').isValid());
        test.ok(!frozenMoment(' ', 'MM').isValid());
        test.ok(!frozenMoment(' ', 'DD').isValid());
        test.ok(!frozenMoment(' ', ['MM', 'DD']).isValid());

        test.done();
    },

    'defaulting to current date' : function (test) {
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

    'matching am/pm' : function (test) {
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

    'string with format' : function (test) {
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
                ['x',                   '1234567890123'],
                ['X',                   '1234567890'],
                ['LT',                  '12:30 AM'],
                ['LTS',                 '12:30:29 AM'],
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

    'unix timestamp format' : function (test) {
        var formats = ['X', 'X.S', 'X.SS', 'X.SSS'], i, format;

        test.expect(formats.length * 4);
        for (i = 0; i < formats.length; i++) {
            format = formats[i];
            test.equal(frozenMoment('1234567890',     format).valueOf(), 1234567890 * 1000,       format + ' matches timestamp without milliseconds');
            test.equal(frozenMoment('1234567890.1',   format).valueOf(), 1234567890 * 1000 + 100, format + ' matches timestamp with deciseconds');
            test.equal(frozenMoment('1234567890.12',  format).valueOf(), 1234567890 * 1000 + 120, format + ' matches timestamp with centiseconds');
            test.equal(frozenMoment('1234567890.123', format).valueOf(), 1234567890 * 1000 + 123, format + ' matches timestamp with milliseconds');
        }

        test.done();
    },

    'unix offset milliseconds' :  function (test) {
        test.expect(1);
        test.equal(frozenMoment('1234567890123', 'x').valueOf(), 1234567890123, 'x matches unix offset in milliseconds');
        test.done();
    },

    'milliseconds format' : function (test) {
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

    'string with format no separators' : function (test) {
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

    'string with format (timezone)' : function (test) {
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

    'string with format (timezone offset)' : function (test) {
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

    'string with timezone around start of year' : function (test) {
        test.equal(frozenMoment('2000-01-01T00:00:00.000+01:00').toISOString(), '1999-12-31T23:00:00.000Z', '+1:00 around 2000');
        test.equal(frozenMoment('2000-01-01T00:00:00.000-01:00').toISOString(), '2000-01-01T01:00:00.000Z', '-1:00 around 2000');
        test.equal(frozenMoment('1970-01-01T00:00:00.000+01:00').toISOString(), '1969-12-31T23:00:00.000Z', '+1:00 around 1970');
        test.equal(frozenMoment('1970-01-01T00:00:00.000-01:00').toISOString(), '1970-01-01T01:00:00.000Z', '-1:00 around 1970');
        test.equal(frozenMoment('1200-01-01T00:00:00.000+01:00').toISOString(), '1199-12-31T23:00:00.000Z', '+1:00 around 1200');
        test.equal(frozenMoment('1200-01-01T00:00:00.000-01:00').toISOString(), '1200-01-01T01:00:00.000Z', '-1:00 around 1200');
        test.done();
    },

    'string with array of formats' : function (test) {
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
          'System Administrator and Database Assistant (7/1/2011), System Administrator and Database Assistant (7/1/2011), Database Coordinator (7/1/2011), Vice President (7/1/2011), System Administrator and Database Assistant (5/31/2012), Database Coordinator (7/1/2012), System Administrator and Database Assistant (7/1/2013)',
          ['MM/DD/YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD', 'YYYY-MM-DDTHH:mm:ssZ'])
          .format('YYYY-MM-DD'), '2011-07-01', 'Works for long strings');

        test.equal(frozenMoment('11-02-10', ['MM.DD.YY', 'DD-MM-YY']).format('MM DD YYYY'), '02 11 2010', 'escape RegExp special characters on comparing');

        test.equal(frozenMoment('13-10-98', ['DD MM YY', 'DD MM YYYY'])._f, 'DD MM YY', 'use two digit year');
        test.equal(frozenMoment('13-10-1998', ['DD MM YY', 'DD MM YYYY'])._f, 'DD MM YYYY', 'use four digit year');

        test.equal(frozenMoment('01', ['MM', 'DD'])._f, 'MM', 'Should use first valid format');

        test.done();
    },

    'string with array of formats + ISO': function (test) {
        test.equal(frozenMoment('1994', [frozenMoment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).year(), 1994, 'iso: test parse YYYY');
        test.equal(frozenMoment('17:15', [frozenMoment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).hour(), 17, 'iso: test parse HH:mm (1)');
        test.equal(frozenMoment('17:15', [frozenMoment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).minutes(), 15, 'iso: test parse HH:mm (2)');
        test.equal(frozenMoment('06', [frozenMoment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).month(), 6 - 1, 'iso: test parse MM');
        test.equal(frozenMoment('2012-06-01', [frozenMoment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).parsingFlags().iso, true, 'iso: test parse iso');
        test.equal(frozenMoment('2014-05-05', [frozenMoment.ISO_8601, 'YYYY-MM-DD']).parsingFlags().iso, true, 'iso: edge case array precedence iso');
        test.equal(frozenMoment('2014-05-05', ['YYYY-MM-DD', frozenMoment.ISO_8601]).parsingFlags().iso, false, 'iso: edge case array precedence not iso');
        test.done();
    },

    'string with format - years' : function (test) {
        test.expect(4);
        test.equal(frozenMoment('67', 'YY').format('YYYY'), '2067', '67 > 2067');
        test.equal(frozenMoment('68', 'YY').format('YYYY'), '2068', '68 > 2068');
        test.equal(frozenMoment('69', 'YY').format('YYYY'), '1969', '69 > 1969');
        test.equal(frozenMoment('70', 'YY').format('YYYY'), '1970', '70 > 1970');
        test.done();
    },

    'thaw/freeze cycle' : function (test) {
        test.expect(2);
        var frozenMomentA = frozenMoment([2011, 10, 10]),
            frozenMomentB = frozenMomentA.thaw().month(5).freeze();
        test.equal(frozenMomentA.month(), 10, 'frozenMoment().thaw()...freeze() will create a clone');
        test.equal(frozenMomentB.month(), 5, 'frozenMoment().thaw()...freeze() will create a clone');
        test.done();
    },

    'cloning carrying over utc mode' : function (test) {
        test.expect(8);

        test.equal(frozenMoment().thaw().local().freeze()._isUTC, false, 'An explicitly local frozenMoment should have _isUTC == false');
        test.equal(frozenMoment().thaw().utc().freeze()._isUTC, true, 'An explicitly utc frozenMoment should have _isUTC == true');
        test.equal(frozenMoment().thaw().freeze()._isUTC, false, 'A default frozenMoment should have _isUTC == false');
        test.equal(frozenMoment.utc()._isUTC, true, 'An explicitly utc frozenMoment should have _isUTC == true');
        test.equal(frozenMoment(frozenMoment().thaw().local().freeze())._isUTC, false, 'A "cloned" local frozenMoment should have _isUTC == false');
        test.equal(frozenMoment(frozenMoment().thaw().utc().freeze())._isUTC, true, 'A "cloned" utc frozenMoment should have _isUTC == true');
        test.equal(frozenMoment(frozenMoment())._isUTC, false, 'A "cloned" default frozenMoment should have _isUTC == false');
        test.equal(frozenMoment(frozenMoment.utc())._isUTC, true, 'A "cloned" utc frozenMoment should have _isUTC == true');

        test.done();
    },

    'parsing iso' : function (test) {
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
            test.equal(frozenMoment(formats[i][0]).format('YYYY-MM-DDTHH:mm:ss.SSSZ'), formats[i][1], 'frozenMoment should be able to parse ISO ' + formats[i][0]);
        }
        test.done();
    },

    'parsing iso week year/week/weekday' : function (test) {
        test.equal(frozenMoment.utc('2007-W01').format(), '2007-01-01T00:00:00+00:00', '2008 week 1 (1st Jan Mon)');
        test.equal(frozenMoment.utc('2008-W01').format(), '2007-12-31T00:00:00+00:00', '2008 week 1 (1st Jan Tue)');
        test.equal(frozenMoment.utc('2003-W01').format(), '2002-12-30T00:00:00+00:00', '2008 week 1 (1st Jan Wed)');
        test.equal(frozenMoment.utc('2009-W01').format(), '2008-12-29T00:00:00+00:00', '2009 week 1 (1st Jan Thu)');
        test.equal(frozenMoment.utc('2010-W01').format(), '2010-01-04T00:00:00+00:00', '2010 week 1 (1st Jan Fri)');
        test.equal(frozenMoment.utc('2011-W01').format(), '2011-01-03T00:00:00+00:00', '2011 week 1 (1st Jan Sat)');
        test.equal(frozenMoment.utc('2012-W01').format(), '2012-01-02T00:00:00+00:00', '2012 week 1 (1st Jan Sun)');
        test.done();
    },

    'parsing week year/week/weekday (dow 1, doy 4)' : function (test) {
        frozenMoment.locale('dow:1,doy:4', {week: {dow: 1, doy: 4}});

        test.equal(frozenMoment.utc('2007-01', 'gggg-ww').format(), '2007-01-01T00:00:00+00:00', '2007 week 1 (1st Jan Mon)');
        test.equal(frozenMoment.utc('2008-01', 'gggg-ww').format(), '2007-12-31T00:00:00+00:00', '2008 week 1 (1st Jan Tue)');
        test.equal(frozenMoment.utc('2003-01', 'gggg-ww').format(), '2002-12-30T00:00:00+00:00', '2003 week 1 (1st Jan Wed)');
        test.equal(frozenMoment.utc('2009-01', 'gggg-ww').format(), '2008-12-29T00:00:00+00:00', '2009 week 1 (1st Jan Thu)');
        test.equal(frozenMoment.utc('2010-01', 'gggg-ww').format(), '2010-01-04T00:00:00+00:00', '2010 week 1 (1st Jan Fri)');
        test.equal(frozenMoment.utc('2011-01', 'gggg-ww').format(), '2011-01-03T00:00:00+00:00', '2011 week 1 (1st Jan Sat)');
        test.equal(frozenMoment.utc('2012-01', 'gggg-ww').format(), '2012-01-02T00:00:00+00:00', '2012 week 1 (1st Jan Sun)');

        frozenMoment.defineLocale('dow:1,doy:4', null);
        test.done();
    },

    'parsing week year/week/weekday (dow 1, doy 7)' : function (test) {
        frozenMoment.locale('dow:1,doy:7', {week: {dow: 1, doy: 7}});

        test.equal(frozenMoment.utc('2007-01', 'gggg-ww').format(), '2007-01-01T00:00:00+00:00', '2007 week 1 (1st Jan Mon)');
        test.equal(frozenMoment.utc('2008-01', 'gggg-ww').format(), '2007-12-31T00:00:00+00:00', '2008 week 1 (1st Jan Tue)');
        test.equal(frozenMoment.utc('2003-01', 'gggg-ww').format(), '2002-12-30T00:00:00+00:00', '2003 week 1 (1st Jan Wed)');
        test.equal(frozenMoment.utc('2009-01', 'gggg-ww').format(), '2008-12-29T00:00:00+00:00', '2009 week 1 (1st Jan Thu)');
        test.equal(frozenMoment.utc('2010-01', 'gggg-ww').format(), '2009-12-28T00:00:00+00:00', '2010 week 1 (1st Jan Fri)');
        test.equal(frozenMoment.utc('2011-01', 'gggg-ww').format(), '2010-12-27T00:00:00+00:00', '2011 week 1 (1st Jan Sat)');
        test.equal(frozenMoment.utc('2012-01', 'gggg-ww').format(), '2011-12-26T00:00:00+00:00', '2012 week 1 (1st Jan Sun)');

        frozenMoment.defineLocale('dow:1,doy:7', null);
        test.done();
    },

    'parsing week year/week/weekday (dow 0, doy 6)' : function (test) {
        frozenMoment.locale('dow:0,doy:6', {week: {dow: 0, doy: 6}});

        test.equal(frozenMoment.utc('2007-01', 'gggg-ww').format(), '2006-12-31T00:00:00+00:00', '2007 week 1 (1st Jan Mon)');
        test.equal(frozenMoment.utc('2008-01', 'gggg-ww').format(), '2007-12-30T00:00:00+00:00', '2008 week 1 (1st Jan Tue)');
        test.equal(frozenMoment.utc('2003-01', 'gggg-ww').format(), '2002-12-29T00:00:00+00:00', '2003 week 1 (1st Jan Wed)');
        test.equal(frozenMoment.utc('2009-01', 'gggg-ww').format(), '2008-12-28T00:00:00+00:00', '2009 week 1 (1st Jan Thu)');
        test.equal(frozenMoment.utc('2010-01', 'gggg-ww').format(), '2009-12-27T00:00:00+00:00', '2010 week 1 (1st Jan Fri)');
        test.equal(frozenMoment.utc('2011-01', 'gggg-ww').format(), '2010-12-26T00:00:00+00:00', '2011 week 1 (1st Jan Sat)');
        test.equal(frozenMoment.utc('2012-01', 'gggg-ww').format(), '2012-01-01T00:00:00+00:00', '2012 week 1 (1st Jan Sun)');

        frozenMoment.defineLocale('dow:0,doy:6', null);
        test.done();
    },

    'parsing week year/week/weekday (dow 6, doy 12)' : function (test) {
        frozenMoment.locale('dow:6,doy:12', {week: {dow: 6, doy: 12}});

        test.equal(frozenMoment.utc('2007-01', 'gggg-ww').format(), '2006-12-30T00:00:00+00:00', '2007 week 1 (1st Jan Mon)');
        test.equal(frozenMoment.utc('2008-01', 'gggg-ww').format(), '2007-12-29T00:00:00+00:00', '2008 week 1 (1st Jan Tue)');
        test.equal(frozenMoment.utc('2003-01', 'gggg-ww').format(), '2002-12-28T00:00:00+00:00', '2003 week 1 (1st Jan Wed)');
        test.equal(frozenMoment.utc('2009-01', 'gggg-ww').format(), '2008-12-27T00:00:00+00:00', '2009 week 1 (1st Jan Thu)');
        test.equal(frozenMoment.utc('2010-01', 'gggg-ww').format(), '2009-12-26T00:00:00+00:00', '2010 week 1 (1st Jan Fri)');
        test.equal(frozenMoment.utc('2011-01', 'gggg-ww').format(), '2011-01-01T00:00:00+00:00', '2011 week 1 (1st Jan Sat)');
        test.equal(frozenMoment.utc('2012-01', 'gggg-ww').format(), '2011-12-31T00:00:00+00:00', '2012 week 1 (1st Jan Sun)');
        test.done();
    },

    'parsing ISO with Z' : function (test) {
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
            test.equal(mom.format('YYYY-MM-DDTHH:mm:ss.SSS'), formats[i][1], 'frozenMoment should be able to parse ISO in UTC ' + formats[i][0] + 'Z');

            mom = frozenMoment(formats[i][0] + ' Z').thaw().utc().freeze();
            test.equal(mom.format('YYYY-MM-DDTHH:mm:ss.SSS'), formats[i][1], 'frozenMoment should be able to parse ISO in UTC ' + formats[i][0] + ' Z');
        }
        test.done();
    },

    'parsing iso with T' : function (test) {
        test.expect(8);

        test.equal(frozenMoment('2011-10-08T18')._f, 'YYYY-MM-DDTHH', 'should include "T" in the format');
        test.equal(frozenMoment('2011-10-08T18:20')._f, 'YYYY-MM-DDTHH:mm', 'should include "T" in the format');
        test.equal(frozenMoment('2011-10-08T18:20:13')._f, 'YYYY-MM-DDTHH:mm:ss', 'should include "T" in the format');
        test.equal(frozenMoment('2011-10-08T18:20:13.321')._f, 'YYYY-MM-DDTHH:mm:ss.SSSS', 'should include "T" in the format');

        test.equal(frozenMoment('2011-10-08 18')._f, 'YYYY-MM-DD HH', 'should not include "T" in the format');
        test.equal(frozenMoment('2011-10-08 18:20')._f, 'YYYY-MM-DD HH:mm', 'should not include "T" in the format');
        test.equal(frozenMoment('2011-10-08 18:20:13')._f, 'YYYY-MM-DD HH:mm:ss', 'should not include "T" in the format');
        test.equal(frozenMoment('2011-10-08 18:20:13.321')._f, 'YYYY-MM-DD HH:mm:ss.SSSS', 'should not include "T" in the format');

        test.done();
    },

    'parsing iso Z timezone' : function (test) {
        var i,
            formats = [
                ['2011-10-08T18:04Z',             '2011-10-08T18:04:00.000+00:00'],
                ['2011-10-08T18:04:20Z',          '2011-10-08T18:04:20.000+00:00'],
                ['2011-10-08T18:04:20.111Z',      '2011-10-08T18:04:20.111+00:00']
            ];
        test.expect(formats.length);
        for (i = 0; i < formats.length; i++) {
            test.equal(frozenMoment.utc(formats[i][0]).format('YYYY-MM-DDTHH:mm:ss.SSSZ'), formats[i][1], 'frozenMoment should be able to parse ISO ' + formats[i][0]);
        }
        test.done();
    },

    'parsing iso Z timezone into local' : function (test) {
        test.expect(1);

        var m = frozenMoment('2011-10-08T18:04:20.111Z');

        test.equal(m.thaw().utc().freeze().format('YYYY-MM-DDTHH:mm:ss.SSS'),
                '2011-10-08T18:04:20.111',
                'frozenMoment should be able to parse ISO 2011-10-08T18:04:20.111Z');

        test.done();
    },

    'parsing iso with more subsecond precision digits' : function (test) {
        test.equal(frozenMoment.utc('2013-07-31T22:00:00.0000000Z').format(),
                '2013-07-31T22:00:00+00:00', 'more than 3 subsecond digits');
        test.done();
    },

    'null or empty' : function (test) {
        test.expect(8);
        test.equal(frozenMoment('').isValid(), false, 'frozenMoment("") is not valid');
        test.equal(frozenMoment(null).isValid(), false, 'frozenMoment(null) is not valid');
        test.equal(frozenMoment(null, 'YYYY-MM-DD').isValid(), false, 'frozenMoment("", "format") is not valid');
        test.equal(frozenMoment('', 'YYYY-MM-DD').isValid(), false, 'frozenMoment("", "format") is not valid');
        test.equal(frozenMoment.utc('').isValid(), false, 'frozenMoment.utc("") is not valid');
        test.equal(frozenMoment.utc(null).isValid(), false, 'frozenMoment.utc(null) is not valid');
        test.equal(frozenMoment.utc(null, 'YYYY-MM-DD').isValid(), false, 'frozenMoment.utc(null) is not valid');
        test.equal(frozenMoment.utc('', 'YYYY-MM-DD').isValid(), false, 'frozenMoment.utc("", "YYYY-MM-DD") is not valid');
        test.done();
    },

    'first century' : function (test) {
        test.expect(9);
        test.equal(frozenMoment([0, 0, 1]).format('YYYY-MM-DD'), '0000-01-01', 'Year AD 0');
        test.equal(frozenMoment([99, 0, 1]).format('YYYY-MM-DD'), '0099-01-01', 'Year AD 99');
        test.equal(frozenMoment([999, 0, 1]).format('YYYY-MM-DD'), '0999-01-01', 'Year AD 999');
        test.equal(frozenMoment('0 1 1', 'YYYY MM DD').format('YYYY-MM-DD'), '0000-01-01', 'Year AD 0');
        test.equal(frozenMoment('99 1 1', 'YYYY MM DD').format('YYYY-MM-DD'), '0099-01-01', 'Year AD 99');
        test.equal(frozenMoment('999 1 1', 'YYYY MM DD').format('YYYY-MM-DD'), '0999-01-01', 'Year AD 999');
        test.equal(frozenMoment('0 1 1', 'YYYYY MM DD').format('YYYYY-MM-DD'), '00000-01-01', 'Year AD 0');
        test.equal(frozenMoment('99 1 1', 'YYYYY MM DD').format('YYYYY-MM-DD'), '00099-01-01', 'Year AD 99');
        test.equal(frozenMoment('999 1 1', 'YYYYY MM DD').format('YYYYY-MM-DD'), '00999-01-01', 'Year AD 999');
        test.done();
    },

    'six digit years' : function (test) {
        test.expect(8);
        test.equal(frozenMoment([-270000, 0, 1]).format('YYYYY-MM-DD'), '-270000-01-01', 'format BC 270,001');
        test.equal(frozenMoment([270000, 0, 1]).format('YYYYY-MM-DD'), '270000-01-01', 'format AD 270,000');
        test.equal(frozenMoment('-270000-01-01', 'YYYYY-MM-DD').toDate().getFullYear(), -270000, 'parse BC 270,001');
        test.equal(frozenMoment('270000-01-01',  'YYYYY-MM-DD').toDate().getFullYear(), 270000, 'parse AD 270,000');
        test.equal(frozenMoment('+270000-01-01', 'YYYYY-MM-DD').toDate().getFullYear(), 270000, 'parse AD +270,000');
        test.equal(frozenMoment.utc('-270000-01-01', 'YYYYY-MM-DD').toDate().getUTCFullYear(), -270000, 'parse utc BC 270,001');
        test.equal(frozenMoment.utc('270000-01-01',  'YYYYY-MM-DD').toDate().getUTCFullYear(), 270000, 'parse utc AD 270,000');
        test.equal(frozenMoment.utc('+270000-01-01', 'YYYYY-MM-DD').toDate().getUTCFullYear(), 270000, 'parse utc AD +270,000');
        test.done();
    },

    'negative four digit years' : function (test) {
        test.expect(2);
        test.equal(frozenMoment('-1000-01-01', 'YYYYY-MM-DD').toDate().getFullYear(), -1000, 'parse BC 1,001');
        test.equal(frozenMoment.utc('-1000-01-01', 'YYYYY-MM-DD').toDate().getUTCFullYear(), -1000, 'parse utc BC 1,001');
        test.done();
    },

    'strict parsing' : function (test) {
        test.equal(frozenMoment('2014-', 'YYYY-Q', true).isValid(), false, 'fail missing quarter');

        test.equal(frozenMoment('2012-05', 'YYYY-MM', true).format('YYYY-MM'), '2012-05', 'parse correct string');
        test.equal(frozenMoment(' 2012-05', 'YYYY-MM', true).isValid(), false, 'fail on extra whitespace');
        test.equal(frozenMoment('foo 2012-05', '[foo] YYYY-MM', true).format('YYYY-MM'), '2012-05', 'handle fixed text');
        test.equal(frozenMoment('2012 05', 'YYYY-MM', true).isValid(), false, 'fail on different separator');
        test.equal(frozenMoment('2012 05', 'YYYY MM DD', true).isValid(), false, 'fail on too many tokens');

        test.equal(frozenMoment('05 30 2010', ['DD MM YYYY', 'MM DD YYYY'], true).format('MM DD YYYY'), '05 30 2010', 'array with bad date');
        test.equal(frozenMoment('05 30 2010', ['', 'MM DD YYYY'], true).format('MM DD YYYY'), '05 30 2010', 'array with invalid format');
        test.equal(frozenMoment('05 30 2010', [' DD MM YYYY', 'MM DD YYYY'], true).format('MM DD YYYY'), '05 30 2010', 'array with non-matching format');

        test.equal(frozenMoment('2010.*...', 'YYYY.*', true).isValid(), false, 'invalid format with regex chars');
        test.equal(frozenMoment('2010.*', 'YYYY.*', true).year(), 2010, 'valid format with regex chars');
        test.equal(frozenMoment('.*2010.*', '.*YYYY.*', true).year(), 2010, 'valid format with regex chars on both sides');

        //strict tokens
        test.equal(frozenMoment('-5-05-25', 'YYYY-MM-DD', true).isValid(), false, 'invalid negative year');
        test.equal(frozenMoment('2-05-25', 'YYYY-MM-DD', true).isValid(), false, 'invalid one-digit year');
        test.equal(frozenMoment('20-05-25', 'YYYY-MM-DD', true).isValid(), false, 'invalid two-digit year');
        test.equal(frozenMoment('201-05-25', 'YYYY-MM-DD', true).isValid(), false, 'invalid three-digit year');
        test.equal(frozenMoment('2010-05-25', 'YYYY-MM-DD', true).isValid(), true, 'valid four-digit year');
        test.equal(frozenMoment('22010-05-25', 'YYYY-MM-DD', true).isValid(), false, 'invalid five-digit year');

        test.equal(frozenMoment('12-05-25', 'YY-MM-DD', true).isValid(), true, 'valid two-digit year');
        test.equal(frozenMoment('2012-05-25', 'YY-MM-DD', true).isValid(), false, 'invalid four-digit year');

        test.equal(frozenMoment('-5-05-25', 'Y-MM-DD', true).isValid(), true, 'valid negative year');
        test.equal(frozenMoment('2-05-25', 'Y-MM-DD', true).isValid(), true, 'valid one-digit year');
        test.equal(frozenMoment('20-05-25', 'Y-MM-DD', true).isValid(), true, 'valid two-digit year');
        test.equal(frozenMoment('201-05-25', 'Y-MM-DD', true).isValid(), true, 'valid three-digit year');

        test.equal(frozenMoment('2012-5-25', 'YYYY-M-DD', true).isValid(), true, 'valid one-digit month');
        test.equal(frozenMoment('2012-5-25', 'YYYY-MM-DD', true).isValid(), false, 'invalid one-digit month');
        test.equal(frozenMoment('2012-05-25', 'YYYY-M-DD', true).isValid(), true, 'valid one-digit month');
        test.equal(frozenMoment('2012-05-25', 'YYYY-MM-DD', true).isValid(), true, 'valid one-digit month');

        test.equal(frozenMoment('2012-05-2', 'YYYY-MM-D', true).isValid(), true, 'valid one-digit day');
        test.equal(frozenMoment('2012-05-2', 'YYYY-MM-DD', true).isValid(), false, 'invalid one-digit day');
        test.equal(frozenMoment('2012-05-02', 'YYYY-MM-D', true).isValid(), true, 'valid two-digit day');
        test.equal(frozenMoment('2012-05-02', 'YYYY-MM-DD', true).isValid(), true, 'valid two-digit day');

        test.equal(frozenMoment('+002012-05-25', 'YYYYY-MM-DD', true).isValid(), true, 'valid six-digit year');
        test.equal(frozenMoment('+2012-05-25', 'YYYYY-MM-DD', true).isValid(), false, 'invalid four-digit year');

        //thse are kinda pointless, but they should work as expected
        test.equal(frozenMoment('1', 'S', true).isValid(), true, 'valid one-digit milisecond');
        test.equal(frozenMoment('12', 'S', true).isValid(), false, 'invalid two-digit milisecond');
        test.equal(frozenMoment('123', 'S', true).isValid(), false, 'invalid three-digit milisecond');

        test.equal(frozenMoment('1', 'SS', true).isValid(), false, 'invalid one-digit milisecond');
        test.equal(frozenMoment('12', 'SS', true).isValid(), true, 'valid two-digit milisecond');
        test.equal(frozenMoment('123', 'SS', true).isValid(), false, 'invalid three-digit milisecond');

        test.equal(frozenMoment('1', 'SSS', true).isValid(), false, 'invalid one-digit milisecond');
        test.equal(frozenMoment('12', 'SSS', true).isValid(), false, 'invalid two-digit milisecond');
        test.equal(frozenMoment('123', 'SSS', true).isValid(), true, 'valid three-digit milisecond');

        // strict parsing respects month length
        test.ok(frozenMoment('1 January 2000', 'D MMMM YYYY', true).isValid(), 'capital long-month + MMMM');
        test.ok(!frozenMoment('1 January 2000', 'D MMM YYYY', true).isValid(), 'capital long-month + MMM');
        test.ok(!frozenMoment('1 Jan 2000', 'D MMMM YYYY', true).isValid(), 'capital short-month + MMMM');
        test.ok(frozenMoment('1 Jan 2000', 'D MMM YYYY', true).isValid(), 'capital short-month + MMM');
        test.ok(frozenMoment('1 january 2000', 'D MMMM YYYY', true).isValid(), 'lower long-month + MMMM');
        test.ok(!frozenMoment('1 january 2000', 'D MMM YYYY', true).isValid(), 'lower long-month + MMM');
        test.ok(!frozenMoment('1 jan 2000', 'D MMMM YYYY', true).isValid(), 'lower short-month + MMMM');
        test.ok(frozenMoment('1 jan 2000', 'D MMM YYYY', true).isValid(), 'lower short-month + MMM');

        test.done();
    },

    'parsing into a locale' : function (test) {
        test.expect(2);

        frozenMoment.defineLocale('parselocale', {
            months : 'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split('_'),
            monthsShort : 'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split('_')
        });

        frozenMoment.locale('en');

        test.equal(frozenMoment('2012 seven', 'YYYY MMM', 'parselocale').month(), 6, 'should be able to parse in a specific locale');

        frozenMoment.locale('parselocale');

        test.equal(frozenMoment('2012 july', 'YYYY MMM', 'en').month(), 6, 'should be able to parse in a specific locale');

        frozenMoment.defineLocale('parselocale', null);
        test.done();
    },

    'parsing week and weekday information' : function (test) {
        var ver = getVerifier(test);

        // year
        ver('12', 'gg', '2012 01 01', 'week-year two digits');
        ver('2012', 'gggg', '2012 01 01', 'week-year four digits');

        ver('99', 'gg', '1998 12 27', 'week-year two digits previous year');
        ver('1999', 'gggg', '1998 12 27', 'week-year four digits previous year');

        ver('99', 'GG', '1999 01 04', 'iso week-year two digits');
        ver('1999', 'GGGG', '1999 01 04', 'iso week-year four digits');

        ver('13', 'GG', '2012 12 31', 'iso week-year two digits previous year');
        ver('2013', 'GGGG', '2012 12 31', 'iso week-year four digits previous year');

        // year + week
        ver('1999 37', 'gggg w', '1999 09 05', 'week');
        ver('1999 37', 'gggg ww', '1999 09 05', 'week double');
        ver('1999 37', 'GGGG W', '1999 09 13', 'iso week');
        ver('1999 37', 'GGGG WW', '1999 09 13', 'iso week double');

        ver('1999 37 4', 'GGGG WW E', '1999 09 16', 'iso day');
        ver('1999 37 04', 'GGGG WW E', '1999 09 16', 'iso day wide', true);

        ver('1999 37 4', 'gggg ww e', '1999 09 09', 'day');
        ver('1999 37 04', 'gggg ww e', '1999 09 09', 'day wide', true);

        // year + week + day
        ver('1999 37 4', 'gggg ww d', '1999 09 09', 'd');
        ver('1999 37 Th', 'gggg ww dd', '1999 09 09', 'dd');
        ver('1999 37 Thu', 'gggg ww ddd', '1999 09 09', 'ddd');
        ver('1999 37 Thursday', 'gggg ww dddd', '1999 09 09', 'dddd');

        // lower-order only
        test.equal(frozenMoment('22', 'ww').week(), 22, 'week sets the week by itself');
        test.equal(frozenMoment('22', 'ww').weekYear(), frozenMoment().weekYear(), 'week keeps this year');
        test.equal(frozenMoment('2012 22', 'YYYY ww').weekYear(), 2012, 'week keeps parsed year');

        test.equal(frozenMoment('22', 'WW').isoWeek(), 22, 'iso week sets the week by itself');
        test.equal(frozenMoment('2012 22', 'YYYY WW').weekYear(), 2012, 'iso week keeps parsed year');
        test.equal(frozenMoment('22', 'WW').weekYear(), frozenMoment().weekYear(), 'iso week keeps this year');

        // order
        ver('6 2013 2', 'e gggg w', '2013 01 12', "order doesn't matter");
        ver('6 2013 2', 'E GGGG W', '2013 01 12', "iso order doesn't matter");

        //can parse other stuff too
        test.equal(frozenMoment('1999-W37-4 3:30', 'GGGG-[W]WW-E HH:mm').format('YYYY MM DD HH:mm'), '1999 09 16 03:30', 'parsing weeks and hours');

        // In safari, all years before 1300 are shifted back with one day.
        // http://stackoverflow.com/questions/20768975/safari-subtracts-1-day-from-dates-before-1300
        if (new Date('1300-01-01').getUTCFullYear() === 1300) {
            // Years less than 100
            ver('0098-06', 'GGGG-WW', '0098 02 03', 'small years work', true);
        }

        test.done();
    },

    'parsing localized weekdays' : function (test) {
        var ver = getVerifier(test);
        try {
            frozenMoment.locale('fr'); //french uses doy = 4, dow = 1
            ver('1999 37 4', 'GGGG WW E', '1999 09 16', 'iso ignores locale');
            ver('1999 37 7', 'GGGG WW E', '1999 09 19', 'iso ignores locale');

            ver('1999 37 0', 'gggg ww e', '1999 09 13', 'localized e uses local doy and dow: 0 = monday');
            ver('1999 37 4', 'gggg ww e', '1999 09 17', 'localized e uses local doy and dow: 4 = friday');

            ver('1999 37 1', 'gggg ww d', '1999 09 13', 'localized d uses 0-indexed days: 1 = monday');
            ver('1999 37 Lu', 'gggg ww dd', '1999 09 13', 'localized d uses 0-indexed days: Mo');
            ver('1999 37 lun.', 'gggg ww ddd', '1999 09 13', 'localized d uses 0-indexed days: Mon');
            ver('1999 37 lundi', 'gggg ww dddd', '1999 09 13', 'localized d uses 0-indexed days: Monday');
            ver('1999 37 4', 'gggg ww d', '1999 09 16', 'localized d uses 0-indexed days: 4');

            //sunday goes at the end of the week
            ver('1999 37 0', 'gggg ww d', '1999 09 19', 'localized d uses 0-indexed days: 0 = sund');
            ver('1999 37 Di', 'gggg ww dd', '1999 09 19', 'localized d uses 0-indexed days: 0 = sund');
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
    },

    'array with strings' : function (test) {
        test.equal(frozenMoment(['2014', '7', '31']).isValid(),
                true,
                'string array + isValid');
        test.done();
    },

    'utc with array of formats' : function (test) {
        test.equal(frozenMoment.utc('2014-01-01', ['YYYY-MM-DD', 'YYYY-MM']).format(),
                '2014-01-01T00:00:00+00:00',
                'frozenMoment.utc works with array of formats');
        test.done();
    }

};
