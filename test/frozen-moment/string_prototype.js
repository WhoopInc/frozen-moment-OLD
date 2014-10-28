var frozenMoment = require('../../frozen-moment');

exports.stringPrototype = {
    setUp : function (done) {
        frozenMoment.createFromInputFallback = function () {
            throw new Error('input not handled by frozenMoment');
        };
        done();
    },

    'string prototype overrides call' : function (test) {
        test.expect(1);

        frozenMoment.locale('en');
        var prior = String.prototype.call, b;
        String.prototype.call = function () {
            return null;
        };

        b = frozenMoment(new Date(2011, 7, 28, 15, 25, 50, 125));
        test.equal(b.format('MMMM Do YYYY, h:mm a'), 'August 28th 2011, 3:25 pm');

        String.prototype.call = prior;
        test.done();
    }

};
