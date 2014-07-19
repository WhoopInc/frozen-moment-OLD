var frozenMoment = require("../../frozen-moment");

exports.minMax = {
    setUp : function (cb) {
        frozenMoment.lang('en');
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        cb();
    },

    tearDown : function (cb) {
        frozenMoment.lang('en');
        cb();
    },

    "min" : function (test) {
        var now = frozenMoment(),
            future = now.clone().add(1, 'month'),
            past = now.clone().subtract(1, 'month');

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
            future = now.clone().add(1, 'month'),
            past = now.clone().subtract(1, 'month');

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
