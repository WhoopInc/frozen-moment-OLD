var frozenMoment = require('../../frozen-moment'),
    momentBuilder = frozenMoment.build,

    symbolMap = {
        '1': '!',
        '2': '@',
        '3': '#',
        '4': '$',
        '5': '%',
        '6': '^',
        '7': '&',
        '8': '*',
        '9': '(',
        '0': ')'
    },

    numberMap = {
        '!': '1',
        '@': '2',
        '#': '3',
        '$': '4',
        '%': '5',
        '^': '6',
        '&': '7',
        '*': '8',
        '(': '9',
        ')': '0'
    },

    symbolLang = {
        preparse: function (string) {
            return string.replace(/[!@#$%\^&*()]/g, function (match) {
                return numberMap[match];
            });
        },

        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        }
    };

exports.preparsePostformat = {
    setUp: function (cb) {
        frozenMoment.locale('symbol', symbolLang);
        frozenMoment.createFromInputFallback = function () {
            throw new Error('input not handled by frozenMoment');
        };

        cb();
    },

    tearDown: function (cb) {
        frozenMoment.locale('en-gb');
        cb();
    },

    'transform': function (test) {
        test.expect(3);

        test.equal(frozenMoment.utc('@)!@-)*-@&', 'YYYY-MM-DD').unix(), 1346025600, 'preparse string + format');
        test.equal(frozenMoment.utc('@)!@-)*-@&').unix(), 1346025600, 'preparse ISO8601 string');
        test.equal(frozenMoment.unix(1346025600).thaw().utc().freeze().format('YYYY-MM-DD'), '@)!@-)*-@&', 'postformat');

        test.done();
    },

    'transform from': function (test) {
        test.expect(3);

        var start = frozenMoment([2007, 1, 28]);

        test.equal(start.from(momentBuilder([2007, 1, 28]).add({s: 90}), true), '@ minutes', 'postformat should work on frozenMoment.fn.from');
        test.equal(momentBuilder().add(6, 'd').freeze().fromNow(true), '^ days', 'postformat should work on frozenMoment.fn.fromNow');
        test.equal(frozenMoment.duration(10, 'h').humanize(), '!) hours', 'postformat should work on frozenMoment.duration.fn.humanize');

        test.done();
    },

    'calendar day' : function (test) {
        test.expect(6);

        var a = momentBuilder().hours(2).minutes(0).seconds(0);

        test.equal(a.freeze().calendar(),                           'Today at @:)) AM',     'today at the same time');
        test.equal(a.clone().add({m: 25}).freeze().calendar(),      'Today at @:@% AM',     'Now plus 25 min');
        test.equal(a.clone().add({h: 1}).freeze().calendar(),       'Today at #:)) AM',     'Now plus 1 hour');
        test.equal(a.clone().add({d: 1}).freeze().calendar(),       'Tomorrow at @:)) AM',  'tomorrow at the same time');
        test.equal(a.clone().subtract({h: 1}).freeze().calendar(),  'Today at !:)) AM',     'Now minus 1 hour');
        test.equal(a.clone().subtract({d: 1}).freeze().calendar(),  'Yesterday at @:)) AM', 'yesterday at the same time');

        test.done();
    }
};
