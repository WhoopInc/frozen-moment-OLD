var frozenMoment = require('../../frozen-moment');

exports.add = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error('input not handled by frozenMoment');
        };
        done();
    },

    'add short args' : function (test) {
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

    'add long args' : function (test) {
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

    'add long singular args' : function (test) {
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

    'add string long singular' : function (test) {
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

    'add string long' : function (test) {
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

    'add string short' : function (test) {
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

    'add strings string short' : function (test) {
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

    'subtract strings string short' : function (test) {
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

    'add across DST' : function (test) {
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
