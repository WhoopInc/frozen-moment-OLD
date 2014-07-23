var frozenMoment = require("../../frozen-moment");


    /**************************************************
      Italian
     *************************************************/

exports["locale:it"] = {
    setUp : function (cb) {
        frozenMoment.locale('it');
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };
        cb();
    },

    tearDown : function (cb) {
        frozenMoment.locale('en');
        cb();
    },

    "parse" : function (test) {
        var tests = 'gennaio gen_febbraio feb_marzo mar_aprile apr_maggio mag_giugno giu_luglio lug_agosto ago_settembre set_ottobre ott_novembre nov_dicembre dic'.split("_"), i;
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

    "format" : function (test) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Domenica, febbraio 14º 2010, 3:25:50 pm'],
                ['ddd, hA',                            'Dom, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2º 02 febbraio feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14º 14'],
                ['d do dddd ddd dd',                   '0 0º Domenica Dom D'],
                ['DDD DDDo DDDD',                      '45 45º 045'],
                ['w wo ww',                            '6 6º 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45º day of the year'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 febbraio 2010'],
                ['LLL',                                '14 febbraio 2010 15:25'],
                ['LLLL',                               'Domenica, 14 febbraio 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 feb 2010'],
                ['lll',                                '14 feb 2010 15:25'],
                ['llll',                               'Dom, 14 feb 2010 15:25']
            ],
            b = frozenMoment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    },

    "format ordinal" : function (test) {
        test.equal(frozenMoment([2011, 0, 1]).format('DDDo'), '1º', '1º');
        test.equal(frozenMoment([2011, 0, 2]).format('DDDo'), '2º', '2º');
        test.equal(frozenMoment([2011, 0, 3]).format('DDDo'), '3º', '3º');
        test.equal(frozenMoment([2011, 0, 4]).format('DDDo'), '4º', '4º');
        test.equal(frozenMoment([2011, 0, 5]).format('DDDo'), '5º', '5º');
        test.equal(frozenMoment([2011, 0, 6]).format('DDDo'), '6º', '6º');
        test.equal(frozenMoment([2011, 0, 7]).format('DDDo'), '7º', '7º');
        test.equal(frozenMoment([2011, 0, 8]).format('DDDo'), '8º', '8º');
        test.equal(frozenMoment([2011, 0, 9]).format('DDDo'), '9º', '9º');
        test.equal(frozenMoment([2011, 0, 10]).format('DDDo'), '10º', '10º');

        test.equal(frozenMoment([2011, 0, 11]).format('DDDo'), '11º', '11º');
        test.equal(frozenMoment([2011, 0, 12]).format('DDDo'), '12º', '12º');
        test.equal(frozenMoment([2011, 0, 13]).format('DDDo'), '13º', '13º');
        test.equal(frozenMoment([2011, 0, 14]).format('DDDo'), '14º', '14º');
        test.equal(frozenMoment([2011, 0, 15]).format('DDDo'), '15º', '15º');
        test.equal(frozenMoment([2011, 0, 16]).format('DDDo'), '16º', '16º');
        test.equal(frozenMoment([2011, 0, 17]).format('DDDo'), '17º', '17º');
        test.equal(frozenMoment([2011, 0, 18]).format('DDDo'), '18º', '18º');
        test.equal(frozenMoment([2011, 0, 19]).format('DDDo'), '19º', '19º');
        test.equal(frozenMoment([2011, 0, 20]).format('DDDo'), '20º', '20º');

        test.equal(frozenMoment([2011, 0, 21]).format('DDDo'), '21º', '21º');
        test.equal(frozenMoment([2011, 0, 22]).format('DDDo'), '22º', '22º');
        test.equal(frozenMoment([2011, 0, 23]).format('DDDo'), '23º', '23º');
        test.equal(frozenMoment([2011, 0, 24]).format('DDDo'), '24º', '24º');
        test.equal(frozenMoment([2011, 0, 25]).format('DDDo'), '25º', '25º');
        test.equal(frozenMoment([2011, 0, 26]).format('DDDo'), '26º', '26º');
        test.equal(frozenMoment([2011, 0, 27]).format('DDDo'), '27º', '27º');
        test.equal(frozenMoment([2011, 0, 28]).format('DDDo'), '28º', '28º');
        test.equal(frozenMoment([2011, 0, 29]).format('DDDo'), '29º', '29º');
        test.equal(frozenMoment([2011, 0, 30]).format('DDDo'), '30º', '30º');

        test.equal(frozenMoment([2011, 0, 31]).format('DDDo'), '31º', '31º');
        test.done();
    },

    "format month" : function (test) {
        var expected = 'gennaio gen_febbraio feb_marzo mar_aprile apr_maggio mag_giugno giu_luglio lug_agosto ago_settembre set_ottobre ott_novembre nov_dicembre dic'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(frozenMoment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function (test) {
        var expected = 'Domenica Dom D_Lunedì Lun L_Martedì Mar Ma_Mercoledì Mer Me_Giovedì Gio G_Venerdì Ven V_Sabato Sab S'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(frozenMoment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function (test) {
        var start = frozenMoment([2007, 1, 28]);
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({s: 44}), true),  "alcuni secondi",    "44 seconds = seconds");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({s: 45}), true),  "un minuto",   "45 seconds = a minute");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({s: 89}), true),  "un minuto",   "89 seconds = a minute");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({s: 90}), true),  "2 minuti",  "90 seconds = 2 minutes");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({m: 44}), true),  "44 minuti", "44 minutes = 44 minutes");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({m: 45}), true),  "un'ora",    "45 minutes = an hour");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({m: 89}), true),  "un'ora",    "89 minutes = an hour");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({m: 90}), true),  "2 ore",    "90 minutes = 2 hours");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({h: 5}), true),   "5 ore",    "5 hours = 5 hours");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({h: 21}), true),  "21 ore",   "21 hours = 21 hours");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({h: 22}), true),  "un giorno",      "22 hours = a day");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({h: 35}), true),  "un giorno",      "35 hours = a day");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({h: 36}), true),  "2 giorni",     "36 hours = 2 days");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 1}), true),   "un giorno",      "1 day = a day");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 5}), true),   "5 giorni",     "5 days = 5 days");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 25}), true),  "25 giorni",    "25 days = 25 days");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 26}), true),  "un mese",    "26 days = a month");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 30}), true),  "un mese",    "30 days = a month");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 43}), true),  "un mese",    "43 days = a month");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 46}), true),  "2 mesi",   "46 days = 2 months");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 74}), true),  "2 mesi",   "75 days = 2 months");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 76}), true),  "3 mesi",   "76 days = 3 months");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({M: 1}), true),   "un mese",    "1 month = a month");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({M: 5}), true),   "5 mesi",   "5 months = 5 months");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 345}), true), "un anno",     "345 days = a year");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({d: 548}), true), "2 anni",    "548 days = 2 years");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({y: 1}), true),   "un anno",     "1 year = a year");
        test.equal(start.from(frozenMoment([2007, 1, 28]).add({y: 5}), true),   "5 anni",    "5 years = 5 years");
        test.done();
    },

    "suffix" : function (test) {
        test.equal(frozenMoment(30000).from(0), "in alcuni secondi", "prefix");
        test.equal(frozenMoment(0).from(30000), "alcuni secondi fa", "suffix");
        test.done();
    },

    "fromNow" : function (test) {
        test.equal(frozenMoment().add({s: 30}).fromNow(), "in alcuni secondi", "in seconds");
        test.equal(frozenMoment().add({d: 5}).fromNow(), "tra 5 giorni", "in 5 days");
        test.done();
    },

    "calendar day" : function (test) {
        var a = frozenMoment().hours(2).minutes(0).seconds(0);

        test.equal(frozenMoment(a).calendar(),                     "Oggi alle 02:00",     "today at the same time");
        test.equal(frozenMoment(a).add({m: 25}).calendar(),      "Oggi alle 02:25",     "Now plus 25 min");
        test.equal(frozenMoment(a).add({h: 1}).calendar(),       "Oggi alle 03:00",     "Now plus 1 hour");
        test.equal(frozenMoment(a).add({d: 1}).calendar(),       "Domani alle 02:00",   "tomorrow at the same time");
        test.equal(frozenMoment(a).subtract({h: 1}).calendar(),  "Oggi alle 01:00",     "Now minus 1 hour");
        test.equal(frozenMoment(a).subtract({d: 1}).calendar(),  "Ieri alle 02:00",     "yesterday at the same time");
        test.done();
    },

    "calendar next week" : function (test) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = frozenMoment().add({d: i});
            test.equal(m.calendar(),       m.format('dddd [alle] LT'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [alle] LT'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [alle] LT'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function (test) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = frozenMoment().subtract({d: i});
            test.equal(m.calendar(),       m.format('[lo scorso] dddd [alle] LT'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[lo scorso] dddd [alle] LT'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[lo scorso] dddd [alle] LT'),  "Today - " + i + " days end of day");
        }
        test.done();
    },

    "calendar all else" : function (test) {
        var weeksAgo = frozenMoment().subtract({w: 1}),
            weeksFromNow = frozenMoment().add({w: 1});

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

        weeksAgo = frozenMoment().subtract({w: 2});
        weeksFromNow = frozenMoment().add({w: 2});

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
        test.done();
    },

    // Monday is the first day of the week.
    // The week that contains Jan 4th is the first week of the year.

    "weeks year starting sunday" : function (test) {
        test.equal(frozenMoment([2012, 0, 1]).week(), 52, "Jan  1 2012 should be week 52");
        test.equal(frozenMoment([2012, 0, 2]).week(),  1, "Jan  2 2012 should be week 1");
        test.equal(frozenMoment([2012, 0, 8]).week(),  1, "Jan  8 2012 should be week 1");
        test.equal(frozenMoment([2012, 0, 9]).week(),  2, "Jan  9 2012 should be week 2");
        test.equal(frozenMoment([2012, 0, 15]).week(), 2, "Jan 15 2012 should be week 2");

        test.done();
    },

    "weeks year starting monday" : function (test) {
        test.equal(frozenMoment([2007, 0, 1]).week(),  1, "Jan  1 2007 should be week 1");
        test.equal(frozenMoment([2007, 0, 7]).week(),  1, "Jan  7 2007 should be week 1");
        test.equal(frozenMoment([2007, 0, 8]).week(),  2, "Jan  8 2007 should be week 2");
        test.equal(frozenMoment([2007, 0, 14]).week(), 2, "Jan 14 2007 should be week 2");
        test.equal(frozenMoment([2007, 0, 15]).week(), 3, "Jan 15 2007 should be week 3");

        test.done();
    },

    "weeks year starting tuesday" : function (test) {
        test.equal(frozenMoment([2007, 11, 31]).week(), 1, "Dec 31 2007 should be week 1");
        test.equal(frozenMoment([2008,  0,  1]).week(), 1, "Jan  1 2008 should be week 1");
        test.equal(frozenMoment([2008,  0,  6]).week(), 1, "Jan  6 2008 should be week 1");
        test.equal(frozenMoment([2008,  0,  7]).week(), 2, "Jan  7 2008 should be week 2");
        test.equal(frozenMoment([2008,  0, 13]).week(), 2, "Jan 13 2008 should be week 2");
        test.equal(frozenMoment([2008,  0, 14]).week(), 3, "Jan 14 2008 should be week 3");

        test.done();
    },

    "weeks year starting wednesday" : function (test) {
        test.equal(frozenMoment([2002, 11, 30]).week(), 1, "Dec 30 2002 should be week 1");
        test.equal(frozenMoment([2003,  0,  1]).week(), 1, "Jan  1 2003 should be week 1");
        test.equal(frozenMoment([2003,  0,  5]).week(), 1, "Jan  5 2003 should be week 1");
        test.equal(frozenMoment([2003,  0,  6]).week(), 2, "Jan  6 2003 should be week 2");
        test.equal(frozenMoment([2003,  0, 12]).week(), 2, "Jan 12 2003 should be week 2");
        test.equal(frozenMoment([2003,  0, 13]).week(), 3, "Jan 13 2003 should be week 3");

        test.done();
    },

    "weeks year starting thursday" : function (test) {
        test.equal(frozenMoment([2008, 11, 29]).week(), 1, "Dec 29 2008 should be week 1");
        test.equal(frozenMoment([2009,  0,  1]).week(), 1, "Jan  1 2009 should be week 1");
        test.equal(frozenMoment([2009,  0,  4]).week(), 1, "Jan  4 2009 should be week 1");
        test.equal(frozenMoment([2009,  0,  5]).week(), 2, "Jan  5 2009 should be week 2");
        test.equal(frozenMoment([2009,  0, 11]).week(), 2, "Jan 11 2009 should be week 2");
        test.equal(frozenMoment([2009,  0, 13]).week(), 3, "Jan 12 2009 should be week 3");

        test.done();
    },

    "weeks year starting friday" : function (test) {
        test.equal(frozenMoment([2009, 11, 28]).week(), 53, "Dec 28 2009 should be week 53");
        test.equal(frozenMoment([2010,  0,  1]).week(), 53, "Jan  1 2010 should be week 53");
        test.equal(frozenMoment([2010,  0,  3]).week(), 53, "Jan  3 2010 should be week 53");
        test.equal(frozenMoment([2010,  0,  4]).week(),  1, "Jan  4 2010 should be week 1");
        test.equal(frozenMoment([2010,  0, 10]).week(),  1, "Jan 10 2010 should be week 1");
        test.equal(frozenMoment([2010,  0, 11]).week(),  2, "Jan 11 2010 should be week 2");

        test.done();
    },

    "weeks year starting saturday" : function (test) {
        test.equal(frozenMoment([2010, 11, 27]).week(), 52, "Dec 27 2010 should be week 52");
        test.equal(frozenMoment([2011,  0,  1]).week(), 52, "Jan  1 2011 should be week 52");
        test.equal(frozenMoment([2011,  0,  2]).week(), 52, "Jan  2 2011 should be week 52");
        test.equal(frozenMoment([2011,  0,  3]).week(),  1, "Jan  3 2011 should be week 1");
        test.equal(frozenMoment([2011,  0,  9]).week(),  1, "Jan  9 2011 should be week 1");
        test.equal(frozenMoment([2011,  0, 10]).week(),  2, "Jan 10 2011 should be week 2");

        test.done();
    },

    "weeks year starting sunday formatted" : function (test) {
        test.equal(frozenMoment([2012, 0,  1]).format('w ww wo'), '52 52 52º', "Jan  1 2012 should be week 52");
        test.equal(frozenMoment([2012, 0,  2]).format('w ww wo'),  '1 01 1º', "Jan  2 2012 should be week 1");
        test.equal(frozenMoment([2012, 0,  8]).format('w ww wo'),  '1 01 1º', "Jan  8 2012 should be week 1");
        test.equal(frozenMoment([2012, 0,  9]).format('w ww wo'),  '2 02 2º', "Jan  9 2012 should be week 2");
        test.equal(frozenMoment([2012, 0, 15]).format('w ww wo'),  '2 02 2º', "Jan 15 2012 should be week 2");

        test.done();
    }
};
