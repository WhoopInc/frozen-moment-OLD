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

        var a = momentBuilder([2012]).lang('en');
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
