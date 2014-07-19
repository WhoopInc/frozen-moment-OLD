var frozenMoment = require("../../frozen-moment");

exports.leapyear = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "leap year" : function (test) {
        test.expect(4);

        test.equal(frozenMoment([2010, 0, 1]).isLeapYear(), false, '2010');
        test.equal(frozenMoment([2100, 0, 1]).isLeapYear(), false, '2100');
        test.equal(frozenMoment([2008, 0, 1]).isLeapYear(), true, '2008');
        test.equal(frozenMoment([2000, 0, 1]).isLeapYear(), true, '2000');
        test.done();
    }
};
