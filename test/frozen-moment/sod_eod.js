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
        var oldUpdateOffset = frozenMoment.updateOffset,
            // Based on a real story somewhere in America/Los_Angeles
            dstAt = momentBuilder("2014-03-09T02:00:00-08:00").parseZone().freeze(),
            m;

        frozenMoment.updateOffset = function (mom, keepTime) {
            if (mom.isBefore(dstAt)) {
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

        frozenMoment.updateOffset = oldUpdateOffset;

        test.done();
    },

    "startOf across DST -1" : function (test) {
        var oldUpdateOffset = frozenMoment.updateOffset,
            // Based on a real story somewhere in America/Los_Angeles
            dstAt = momentBuilder("2014-11-02T02:00:00-07:00").parseZone().freeze(),
            m;

        frozenMoment.updateOffset = function (mom, keepTime) {
            if (mom.isBefore(dstAt)) {
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

        frozenMoment.updateOffset = oldUpdateOffset;

        test.done();
    }
};
