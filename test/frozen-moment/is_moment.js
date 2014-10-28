var frozenMoment = require('../../frozen-moment');

exports.isMoment = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error('input not handled by frozenMoment');
        };
        done();
    },

    'is frozenMoment object': function (test) {
        test.expect(13);

        var MyObj = function () {},
            extend = function (a, b) {
                var i;
                for (i in b) {
                    a[i] = b[i];
                }
                return a;
            };
        MyObj.prototype.toDate = function () {
            return new Date();
        };

        test.ok(frozenMoment.isMoment(frozenMoment()), 'simple frozenMoment object');
        test.ok(frozenMoment.isMoment(frozenMoment(null)), 'invalid frozenMoment object');
        test.ok(frozenMoment.isMoment(extend({}, frozenMoment())), 'externally cloned frozenMoments are frozenMoments');
        test.ok(frozenMoment.isMoment(extend({}, frozenMoment.utc())), 'externally cloned utc frozenMoments are frozenMoments');

        test.ok(!frozenMoment.isMoment(new MyObj()), 'myObj is not frozenMoment object');
        test.ok(!frozenMoment.isMoment(frozenMoment), 'frozenMoment function is not frozenMoment object');
        test.ok(!frozenMoment.isMoment(new Date()), 'date object is not frozenMoment object');
        test.ok(!frozenMoment.isMoment(Object), 'Object is not frozenMoment object');
        test.ok(!frozenMoment.isMoment('foo'), 'string is not frozenMoment object');
        test.ok(!frozenMoment.isMoment(1), 'number is not frozenMoment object');
        test.ok(!frozenMoment.isMoment(NaN), 'NaN is not frozenMoment object');
        test.ok(!frozenMoment.isMoment(null), 'null is not frozenMoment object');
        test.ok(!frozenMoment.isMoment(undefined), 'undefined is not frozenMoment object');

        test.done();
    }
};
