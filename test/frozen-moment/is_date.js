var frozenMoment = require('../../frozen-moment');

exports.add = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error('input not handled by frozenMoment');
        };
        done();
    },

    'isDate recognizes Date objects' : function (test) {
        test.ok(frozenMoment.isDate(new Date()), 'no args (now)');
        test.ok(frozenMoment.isDate(new Date([2014, 02, 15])), 'array args');
        test.ok(frozenMoment.isDate(new Date('2014-03-15')), 'string args');
        test.ok(frozenMoment.isDate(new Date('does NOT look like a date')), 'invalid date');
        test.done();
    },

    'isDate rejects non-Date objects' : function (test) {
        test.ok(!frozenMoment.isDate(), 'nothing');
        test.ok(!frozenMoment.isDate(undefined), 'undefined');
        test.ok(!frozenMoment.isDate(null), 'string args');
        test.ok(!frozenMoment.isDate(42), 'number');
        test.ok(!frozenMoment.isDate('2014-03-15'), 'string');
        test.ok(!frozenMoment.isDate([2014, 2, 15]), 'array');
        test.ok(!frozenMoment.isDate({year: 2014, month: 2, day: 15}), 'object');
        test.ok(!frozenMoment.isDate({toString: function () {
            return '[object Date]';
        }}), 'lying object');
        test.done();
    }
};
