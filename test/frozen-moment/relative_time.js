var frozenMoment = require('../../frozen-moment'),
    momentBuilder = frozenMoment.build;

exports.relativeTime = {
    'default thresholds' : function (test) {
        var a;

        // Seconds to minutes threshold
        a = momentBuilder();
        a = a = a.subtract(44, 'seconds');
        test.equal(a.freeze().fromNow(), 'a few seconds ago', 'Below default seconds to minutes threshold');
        a = a = a.subtract(1, 'seconds');
        test.equal(a.freeze().fromNow(), 'a minute ago', 'Above default seconds to minutes threshold');

        // Minutes to hours threshold
        a = momentBuilder();
        a = a = a.subtract(44, 'minutes');
        test.equal(a.freeze().fromNow(), '44 minutes ago', 'Below default minute to hour threshold');
        a = a = a.subtract(1, 'minutes');
        test.equal(a.freeze().fromNow(), 'an hour ago', 'Above default minute to hour threshold');

        // Hours to days threshold
        a = momentBuilder();
        a = a = a.subtract(21, 'hours');
        test.equal(a.freeze().fromNow(), '21 hours ago', 'Below default hours to day threshold');
        a = a = a.subtract(1, 'hours');
        test.equal(a.freeze().fromNow(), 'a day ago', 'Above default hours to day threshold');

        // Days to month threshold
        a = momentBuilder();
        a = a = a.subtract(25, 'days');
        test.equal(a.freeze().fromNow(), '25 days ago', 'Below default days to month (singular) threshold');
        a = a = a.subtract(1, 'days');
        test.equal(a.freeze().fromNow(), 'a month ago', 'Above default days to month (singular) threshold');

        // months to year threshold
        a = momentBuilder();
        a = a = a.subtract(10, 'months');
        test.equal(a.freeze().fromNow(), '10 months ago', 'Below default days to years threshold');
        a = a = a.subtract(1, 'month');
        test.equal(a.freeze().fromNow(), 'a year ago', 'Above default days to years threshold');

        test.done();
    },

    'custom thresholds' : function (test) {
        // Seconds to minutes threshold
        frozenMoment.relativeTimeThreshold('s', 55);

        var a = momentBuilder();
        a = a.subtract(54, 'seconds');
        test.equal(a.freeze().fromNow(), 'a few seconds ago', 'Below custom seconds to minutes threshold');
        a = a.subtract(1, 'seconds');
        test.equal(a.freeze().fromNow(), 'a minute ago', 'Above custom seconds to minutes threshold');

        frozenMoment.relativeTimeThreshold('s', 45);

        // Minutes to hours threshold
        frozenMoment.relativeTimeThreshold('m', 55);
        a = momentBuilder();
        a = a.subtract(54, 'minutes');
        test.equal(a.freeze().fromNow(), '54 minutes ago', 'Below custom minutes to hours threshold');
        a = a.subtract(1, 'minutes');
        test.equal(a.freeze().fromNow(), 'an hour ago', 'Above custom minutes to hours threshold');
        frozenMoment.relativeTimeThreshold('m', 45);

        // Hours to days threshold
        frozenMoment.relativeTimeThreshold('h', 24);
        a = momentBuilder();
        a = a.subtract(23, 'hours');
        test.equal(a.freeze().fromNow(), '23 hours ago', 'Below custom hours to days threshold');
        a = a.subtract(1, 'hours');
        test.equal(a.freeze().fromNow(), 'a day ago', 'Above custom hours to days threshold');
        frozenMoment.relativeTimeThreshold('h', 22);

        // Days to month threshold
        frozenMoment.relativeTimeThreshold('d', 28);
        a = momentBuilder();
        a = a.subtract(27, 'days');
        test.equal(a.freeze().fromNow(), '27 days ago', 'Below custom days to month (singular) threshold');
        a = a.subtract(1, 'days');
        test.equal(a.freeze().fromNow(), 'a month ago', 'Above custom days to month (singular) threshold');
        frozenMoment.relativeTimeThreshold('d', 26);

        // months to years threshold
        frozenMoment.relativeTimeThreshold('M', 9);
        a = momentBuilder();
        a = a.subtract(8, 'months');
        test.equal(a.freeze().fromNow(), '8 months ago', 'Below custom days to years threshold');
        a = a.subtract(1, 'months');
        test.equal(a.freeze().fromNow(), 'a year ago', 'Above custom days to years threshold');
        frozenMoment.relativeTimeThreshold('M', 11);
        test.done();
    },

    'retrive threshold settings' : function (test) {
        test.expect(1);
        frozenMoment.relativeTimeThreshold('m', 45);
        var minuteThreshold = frozenMoment.relativeTimeThreshold('m');

        test.equal(minuteThreshold, 45, 'Can retrieve minute setting');

        test.done();
    }
};
