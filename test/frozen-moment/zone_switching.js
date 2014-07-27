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
