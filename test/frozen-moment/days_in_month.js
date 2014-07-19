var frozenMoment = require("../../frozen-moment");

exports.daysInMonth = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        done();
    },

    "days in month" : function (test) {
        test.expect(24);
        var months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], i;
        for (i = 0; i < 12; i++) {
            test.equal(frozenMoment([2012, i]).daysInMonth(),
                       months[i],
                       frozenMoment([2012, i]).format('L') + " should have " + months[i] + " days. (beginning of month " + i + ')');
        }
        for (i = 0; i < 12; i++) {
            test.equal(frozenMoment([2012, i, months[i]]).daysInMonth(),
                       months[i],
                       frozenMoment([2012, i, months[i]]).format('L') + " should have " + months[i] + " days. (end of month " + i + ')');
        }
        test.done();
    },

    "days in month leap years" : function (test) {
        test.expect(4);
        test.equal(frozenMoment([2010, 1]).daysInMonth(), 28, "Feb 2010 should have 28 days");
        test.equal(frozenMoment([2100, 1]).daysInMonth(), 28, "Feb 2100 should have 28 days");
        test.equal(frozenMoment([2008, 1]).daysInMonth(), 29, "Feb 2008 should have 29 days");
        test.equal(frozenMoment([2000, 1]).daysInMonth(), 29, "Feb 2000 should have 29 days");
        test.done();
    }
};
