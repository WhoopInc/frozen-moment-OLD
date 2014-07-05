var frozenMoment = require("../../frozen-moment");

exports.listers = {
    setUp : function (cb) {
        frozenMoment.locale('en');
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };

        cb();
    },

    tearDown : function (cb) {
        frozenMoment.locale('en');
        cb();
    },

    "default" : function (test) {
        test.expect(5);
        test.deepEqual(frozenMoment.months(), ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
        test.deepEqual(frozenMoment.monthsShort(), ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
        test.deepEqual(frozenMoment.weekdays(), ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
        test.deepEqual(frozenMoment.weekdaysShort(), ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
        test.deepEqual(frozenMoment.weekdaysMin(), ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]);
        test.done();
    },

    "index" : function (test) {
        test.equal(frozenMoment.months(0), "January");
        test.equal(frozenMoment.months(2), "March");
        test.equal(frozenMoment.monthsShort(0), "Jan");
        test.equal(frozenMoment.monthsShort(2), "Mar");
        test.equal(frozenMoment.weekdays(0), "Sunday");
        test.equal(frozenMoment.weekdays(2), "Tuesday");
        test.equal(frozenMoment.weekdaysShort(0), "Sun");
        test.equal(frozenMoment.weekdaysShort(2), "Tue");
        test.equal(frozenMoment.weekdaysMin(0), "Su");
        test.equal(frozenMoment.weekdaysMin(2), "Tu");
        test.done();
    },

    "localized" : function (test) {
        var months = "one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve".split('_'),
            monthsShort = "on_tw_th_fo_fi_si_se_ei_ni_te_el_tw".split("_"),
            weekdays = "one_two_three_four_five_six_seven".split("_"),
            weekdaysShort = "on_tw_th_fo_fi_si_se".split("_"),
            weekdaysMin = "1_2_3_4_5_6_7".split("_");

        frozenMoment.locale('numerologists', {
            months : months,
            monthsShort : monthsShort,
            weekdays : weekdays,
            weekdaysShort: weekdaysShort,
            weekdaysMin: weekdaysMin
        });

        test.deepEqual(frozenMoment.months(), months);
        test.deepEqual(frozenMoment.monthsShort(), monthsShort);
        test.deepEqual(frozenMoment.weekdays(), weekdays);
        test.deepEqual(frozenMoment.weekdaysShort(), weekdaysShort);
        test.deepEqual(frozenMoment.weekdaysMin(), weekdaysMin);

        test.equal(frozenMoment.months(0), "one");
        test.equal(frozenMoment.monthsShort(0), "on");
        test.equal(frozenMoment.weekdays(0), "one");
        test.equal(frozenMoment.weekdaysShort(0), "on");
        test.equal(frozenMoment.weekdaysMin(0), "1");

        test.equal(frozenMoment.months(2), "three");
        test.equal(frozenMoment.monthsShort(2), "th");
        test.equal(frozenMoment.weekdays(2), "three");
        test.equal(frozenMoment.weekdaysShort(2), "th");
        test.equal(frozenMoment.weekdaysMin(2), "3");

        test.done();
    },

    "with functions" : function (test) {
        var monthsShort = "one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve".split('_'),
            monthsShortWeird = "onesy_twosy_threesy_foursy_fivesy_sixsy_sevensy_eightsy_ninesy_tensy_elevensy_twelvesy".split('_');

        frozenMoment.locale("difficult", {

            monthsShort: function (m, format) {
                var arr = format.match(/-MMM-/) ? monthsShortWeird : monthsShort;
                return arr[m.month()];
            }
        });

        test.expect(6);
        test.deepEqual(frozenMoment.monthsShort(), monthsShort);
        test.deepEqual(frozenMoment.monthsShort('MMM'), monthsShort);
        test.deepEqual(frozenMoment.monthsShort('-MMM-'), monthsShortWeird);

        test.deepEqual(frozenMoment.monthsShort('MMM', 2), 'three');
        test.deepEqual(frozenMoment.monthsShort('-MMM-', 2), 'threesy');
        test.deepEqual(frozenMoment.monthsShort(2), 'three');

        test.done();
    }
};
