var frozenMoment = require('../../frozen-moment');


    /**************************************************
      Danish
     *************************************************/

exports['locale:fo'] = {
    setUp : function (cb) {
        frozenMoment.locale('fo');
        frozenMoment.createFromInputFallback = function () {
            throw new Error('input not handled by frozenMoment');
        };
        cb();
    },

    tearDown : function (cb) {
        frozenMoment.locale('en');
        cb();
    },

    'parse' : function (test) {
        var tests = 'januar jan_februar feb_mars mar_apríl apr_mai mai_juni jun_juli jul_august aug_september sep_oktober okt_november nov_desember des'.split('_'), i;
        function equalTest(input, mmm, i) {
            test.equal(frozenMoment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
        test.done();
    },

    'format' : function (test) {
        var a = [
                ['dddd [tann] Do MMMM YYYY, h:mm:ss a', 'sunnudagur tann 14. februar 2010, 3:25:50 pm'],
                ['ddd hA',                             'sun 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2. 02 februar feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14. 14'],
                ['d do dddd ddd dd',                   '0 0. sunnudagur sun su'],
                ['DDD DDDo DDDD',                      '45 45. 045'],
                ['w wo ww',                            '6 6. 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[tann] DDDo [dagin á árinum]',       'tann 45. dagin á árinum'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 februar 2010'],
                ['LLL',                                '14 februar 2010 15:25'],
                ['LLLL',                               'sunnudagur 14. februar, 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 feb 2010'],
                ['lll',                                '14 feb 2010 15:25'],
                ['llll',                               'sun 14. feb, 2010 15:25']
            ],
            b = frozenMoment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    },

    'format ordinal' : function (test) {
        test.equal(frozenMoment([2011, 0, 1]).format('DDDo'), '1.', '1.');
        test.equal(frozenMoment([2011, 0, 2]).format('DDDo'), '2.', '2.');
        test.equal(frozenMoment([2011, 0, 3]).format('DDDo'), '3.', '3.');
        test.equal(frozenMoment([2011, 0, 4]).format('DDDo'), '4.', '4.');
        test.equal(frozenMoment([2011, 0, 5]).format('DDDo'), '5.', '5.');
        test.equal(frozenMoment([2011, 0, 6]).format('DDDo'), '6.', '6.');
        test.equal(frozenMoment([2011, 0, 7]).format('DDDo'), '7.', '7.');
        test.equal(frozenMoment([2011, 0, 8]).format('DDDo'), '8.', '8.');
        test.equal(frozenMoment([2011, 0, 9]).format('DDDo'), '9.', '9.');
        test.equal(frozenMoment([2011, 0, 10]).format('DDDo'), '10.', '10.');

        test.equal(frozenMoment([2011, 0, 11]).format('DDDo'), '11.', '11.');
        test.equal(frozenMoment([2011, 0, 12]).format('DDDo'), '12.', '12.');
        test.equal(frozenMoment([2011, 0, 13]).format('DDDo'), '13.', '13.');
        test.equal(frozenMoment([2011, 0, 14]).format('DDDo'), '14.', '14.');
        test.equal(frozenMoment([2011, 0, 15]).format('DDDo'), '15.', '15.');
        test.equal(frozenMoment([2011, 0, 16]).format('DDDo'), '16.', '16.');
        test.equal(frozenMoment([2011, 0, 17]).format('DDDo'), '17.', '17.');
        test.equal(frozenMoment([2011, 0, 18]).format('DDDo'), '18.', '18.');
        test.equal(frozenMoment([2011, 0, 19]).format('DDDo'), '19.', '19.');
        test.equal(frozenMoment([2011, 0, 20]).format('DDDo'), '20.', '20.');

        test.equal(frozenMoment([2011, 0, 21]).format('DDDo'), '21.', '21.');
        test.equal(frozenMoment([2011, 0, 22]).format('DDDo'), '22.', '22.');
        test.equal(frozenMoment([2011, 0, 23]).format('DDDo'), '23.', '23.');
        test.equal(frozenMoment([2011, 0, 24]).format('DDDo'), '24.', '24.');
        test.equal(frozenMoment([2011, 0, 25]).format('DDDo'), '25.', '25.');
        test.equal(frozenMoment([2011, 0, 26]).format('DDDo'), '26.', '26.');
        test.equal(frozenMoment([2011, 0, 27]).format('DDDo'), '27.', '27.');
        test.equal(frozenMoment([2011, 0, 28]).format('DDDo'), '28.', '28.');
        test.equal(frozenMoment([2011, 0, 29]).format('DDDo'), '29.', '29.');
        test.equal(frozenMoment([2011, 0, 30]).format('DDDo'), '30.', '30.');

        test.equal(frozenMoment([2011, 0, 31]).format('DDDo'), '31.', '31.');
        test.done();
    },

    'format month' : function (test) {
        var expected = 'januar jan_februar feb_mars mar_apríl apr_mai mai_juni jun_juli jul_august aug_september sep_oktober okt_november nov_desember des'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(frozenMoment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    'format week' : function (test) {
        var expected = 'sunnudagur sun su_mánadagur mán má_týsdagur týs tý_mikudagur mik mi_hósdagur hós hó_fríggjadagur frí fr_leygardagur ley le'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(frozenMoment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
        test.done();
    },

    'from' : function (test) {
        var start = frozenMoment([2007, 1, 28]);
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({s: 44}), true),  'fá sekund', '44 seconds = a few seconds');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({s: 45}), true),  'ein minutt',    '45 seconds = a minute');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({s: 89}), true),  'ein minutt',    '89 seconds = a minute');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({s: 90}), true),  '2 minuttir',  '90 seconds = 2 minutes');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({m: 44}), true),  '44 minuttir', '44 minutes = 44 minutes');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({m: 45}), true),  'ein tími',     '45 minutes = an hour');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({m: 89}), true),  'ein tími',     '89 minutes = an hour');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({m: 90}), true),  '2 tímar',     '90 minutes = 2 hours');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({h: 5}), true),   '5 tímar',     '5 hours = 5 hours');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({h: 21}), true),  '21 tímar',    '21 hours = 21 hours');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({h: 22}), true),  'ein dagur',      '22 hours = a day');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({h: 35}), true),  'ein dagur',      '35 hours = a day');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({h: 36}), true),  '2 dagar',      '36 hours = 2 days');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 1}), true),   'ein dagur',      '1 day = a day');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 5}), true),   '5 dagar',      '5 days = 5 days');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 25}), true),  '25 dagar',     '25 days = 25 days');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 26}), true),  'ein mánaði',    '26 days = a month');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 30}), true),  'ein mánaði',    '30 days = a month');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 43}), true),  'ein mánaði',    '43 days = a month');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 46}), true),  '2 mánaðir',   '46 days = 2 months');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 74}), true),  '2 mánaðir',   '75 days = 2 months');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 76}), true),  '3 mánaðir',   '76 days = 3 months');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({M: 1}), true),   'ein mánaði',    '1 month = a month');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({M: 5}), true),   '5 mánaðir',   '5 months = 5 months');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 345}), true), 'eitt ár',       '345 days = a year');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 548}), true), '2 ár',        '548 days = 2 years');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({y: 1}), true),   'eitt ár',       '1 year = a year');
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({y: 5}), true),   '5 ár',        '5 years = 5 years');
        test.done();
    },

    'suffix' : function (test) {
        test.equal(frozenMoment(30000).from(0), 'um fá sekund',  'prefix');
        test.equal(frozenMoment(0).from(30000), 'fá sekund síðani', 'suffix');
        test.done();
    },

    'now from now' : function (test) {
        test.equal(frozenMoment().fromNow(), 'fá sekund síðani',  'now from now should display as in the past');
        test.done();
    },

    'fromNow' : function (test) {
        test.equal(frozenMoment().add({s: 30}).fromNow(), 'um fá sekund', 'in a few seconds');
        test.equal(frozenMoment().add({d: 5}).fromNow(), 'um 5 dagar', 'in 5 days');
        test.done();
    },

    // Monday is the first day of the week.
    // The week that contains Jan 4th is the first week of the year.

    'weeks year starting sunday' : function (test) {
        test.equal(frozenMoment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        test.equal(frozenMoment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
        test.equal(frozenMoment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
        test.equal(frozenMoment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
        test.equal(frozenMoment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');

        test.done();
    },

    'weeks year starting monday' : function (test) {
        test.equal(frozenMoment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        test.equal(frozenMoment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        test.equal(frozenMoment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        test.equal(frozenMoment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        test.equal(frozenMoment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');

        test.done();
    },

    'weeks year starting tuesday' : function (test) {
        test.equal(frozenMoment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        test.equal(frozenMoment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        test.equal(frozenMoment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        test.equal(frozenMoment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        test.equal(frozenMoment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        test.equal(frozenMoment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');

        test.done();
    },

    'weeks year starting wednesday' : function (test) {
        test.equal(frozenMoment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        test.equal(frozenMoment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        test.equal(frozenMoment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        test.equal(frozenMoment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        test.equal(frozenMoment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        test.equal(frozenMoment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');

        test.done();
    },

    'weeks year starting thursday' : function (test) {
        test.equal(frozenMoment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        test.equal(frozenMoment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        test.equal(frozenMoment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        test.equal(frozenMoment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        test.equal(frozenMoment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        test.equal(frozenMoment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');

        test.done();
    },

    'weeks year starting friday' : function (test) {
        test.equal(frozenMoment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        test.equal(frozenMoment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
        test.equal(frozenMoment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
        test.equal(frozenMoment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
        test.equal(frozenMoment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
        test.equal(frozenMoment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');

        test.done();
    },

    'weeks year starting saturday' : function (test) {
        test.equal(frozenMoment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        test.equal(frozenMoment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
        test.equal(frozenMoment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
        test.equal(frozenMoment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
        test.equal(frozenMoment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
        test.equal(frozenMoment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');

        test.done();
    },

    'weeks year starting sunday formatted' : function (test) {
        test.equal(frozenMoment([2012, 0,  1]).format('w ww wo'), '52 52 52.', 'Jan  1 2012 should be week 52');
        test.equal(frozenMoment([2012, 0,  2]).format('w ww wo'),   '1 01 1.', 'Jan  2 2012 should be week 1');
        test.equal(frozenMoment([2012, 0,  8]).format('w ww wo'),   '1 01 1.', 'Jan  8 2012 should be week 1');
        test.equal(frozenMoment([2012, 0,  9]).format('w ww wo'),   '2 02 2.', 'Jan  9 2012 should be week 2');
        test.equal(frozenMoment([2012, 0, 15]).format('w ww wo'),   '2 02 2.', 'Jan 15 2012 should be week 2');

        test.done();
    }
};