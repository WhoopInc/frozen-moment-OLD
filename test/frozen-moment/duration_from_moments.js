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
