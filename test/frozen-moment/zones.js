var frozenMoment = require("../../frozen-moment"),
    momentBuilder = frozenMoment.build;

exports.zones = {
    setUp : function (done) {
        frozenMoment.locale('en');
        frozenMoment.createFromInputFallback = function () {
            throw new Error("input not handled by frozenMoment");
        };

        done();
    },

    tearDown : function (cb) {
        frozenMoment.locale('en');
        cb();
    },

    "set zone" : function (test) {
        var zone = frozenMoment();

        zone = zone.thaw().zone(0).freeze();
        test.equal(zone.zone(), 0, "should be able to set the zone to 0");

        zone = zone.thaw().zone(60).freeze();
        test.equal(zone.zone(), 60, "should be able to set the zone to 60");

        zone = zone.thaw().zone(-60).freeze();
        test.equal(zone.zone(), -60, "should be able to set the zone to -60");

        test.done();
    },

    "set zone shorthand" : function (test) {
        var zone = frozenMoment();

        zone = zone.thaw().zone(1).freeze();
        test.equal(zone.zone(), 60, "setting the zone to 1 should imply hours and convert to 60");

        zone = zone.thaw().zone(-1).freeze();
        test.equal(zone.zone(), -60, "setting the zone to -1 should imply hours and convert to -60");

        zone = zone.thaw().zone(15).freeze();
        test.equal(zone.zone(), 900, "setting the zone to 15 should imply hours and convert to 900");

        zone = zone.thaw().zone(-15).freeze();
        test.equal(zone.zone(), -900, "setting the zone to -15 should imply hours and convert to -900");

        zone = zone.thaw().zone(16).freeze();
        test.equal(zone.zone(), 16, "setting the zone to 16 should imply minutes");

        zone = zone.thaw().zone(-16).freeze();
        test.equal(zone.zone(), -16, "setting the zone to -16 should imply minutes");

        test.done();
    },

    "set zone with string" : function (test) {
        var zone = frozenMoment();

        zone = zone.thaw().zone("+00:00").freeze();
        test.equal(zone.zone(), 0, "set the zone with a timezone string");

        zone = zone.thaw().zone("2013-03-07T07:00:00-08:00").freeze();
        test.equal(zone.zone(), 480, "set the zone with a string that does not begin with the timezone");

        zone = zone.thaw().zone("2013-03-07T07:00:00+0100").freeze();
        test.equal(zone.zone(), -60, "set the zone with a string that uses the +0000 syntax");

        zone = zone.thaw().zone("03-07-2013T07:00:00-08:00").freeze();
        test.equal(zone.zone(), 480, "set the zone with a string with a non-ISO 8601 date");

        test.done();
    },

    "change hours when changing the zone" : function (test) {
        var zone = frozenMoment.utc([2000, 0, 1, 6]);

        zone = zone.thaw().zone(0).freeze();
        test.equal(zone.hour(), 6, "UTC 6AM should be 6AM at +0000");

        zone = zone.thaw().zone(60).freeze();
        test.equal(zone.hour(), 5, "UTC 6AM should be 5AM at -0100");

        zone = zone.thaw().zone(-60).freeze();
        test.equal(zone.hour(), 7, "UTC 6AM should be 7AM at +0100");

        test.done();
    },

    "change minutes when changing the zone" : function (test) {
        var zone = frozenMoment.utc([2000, 0, 1, 6, 31]);

        zone = zone.thaw().zone(0).freeze();
        test.equal(zone.format("HH:mm"), "06:31", "UTC 6:31AM should be 6:31AM at +0000");

        zone = zone.thaw().zone(30).freeze();
        test.equal(zone.format("HH:mm"), "06:01", "UTC 6:31AM should be 6:01AM at -0030");

        zone = zone.thaw().zone(-30).freeze();
        test.equal(zone.format("HH:mm"), "07:01", "UTC 6:31AM should be 7:01AM at +0030");

        zone = zone.thaw().zone(1380).freeze();
        test.equal(zone.format("HH:mm"), "07:31", "UTC 6:31AM should be 7:31AM at +1380");

        test.done();
    },

    "distance from the unix epoch" : function (test) {
        var zoneA = frozenMoment(),
            zoneB = frozenMoment(zoneA),
            zoneC = frozenMoment(zoneA),
            zoneD = frozenMoment(zoneA),
            zoneE = frozenMoment(zoneA);

        zoneB = zoneB.thaw().utc().freeze();
        test.equal(+zoneA, +zoneB, "frozenMoment should equal frozenMoment.utc");

        zoneC = zoneC.thaw().zone(-60).freeze();
        test.equal(+zoneA, +zoneC, "frozenMoment should equal frozenMoment.zone(-60)");

        zoneD = zoneD.thaw().zone(480).freeze();
        test.equal(+zoneA, +zoneD, "frozenMoment should equal frozenMoment.zone(480)");

        zoneE = zoneE.thaw().zone(1000).freeze();
        test.equal(+zoneA, +zoneE, "frozenMoment should equal frozenMoment.zone(1000)");

        test.done();
    },

    "update offset after changing any values" : function (test) {
        var oldOffset = frozenMoment.updateOffset,
            m = frozenMoment.utc([2000, 6, 1]);

        frozenMoment.updateOffset = function (mom, keepTime) {
            if (mom.__doChange) {
                if (+mom > 962409600000) {
                    mom.zone(120, keepTime);
                } else {
                    mom.zone(60, keepTime);
                }
            }
        };

        test.equal(m.format("ZZ"), "+0000", "should be at +0000");
        test.equal(m.format("HH:mm"), "00:00", "should start 12AM at +0000 timezone");

        m.__doChange = true;
        m = m.thaw().add(1, 'h').freeze();

        test.equal(m.format("ZZ"), "-0200", "should be at -0200");
        test.equal(m.format("HH:mm"), "23:00", "1AM at +0000 should be 11PM at -0200 timezone");

        m = m.thaw().subtract(1, 'h').freeze();

        test.equal(m.format("ZZ"), "-0100", "should be at -0100");
        test.equal(m.format("HH:mm"), "23:00", "12AM at +0000 should be 11PM at -0100 timezone");

        frozenMoment.updateOffset = oldOffset;

        test.done();
    },

    "getters and setters" : function (test) {
        var a = frozenMoment([2011, 5, 20]);

        test.equal(a.thaw().zone(120).year(2012).freeze().year(), 2012, "should get and set year correctly");
        test.equal(a.thaw().zone(120).month(1).freeze().month(), 1, "should get and set month correctly");
        test.equal(a.thaw().zone(120).date(2).freeze().date(), 2, "should get and set date correctly");
        test.equal(a.thaw().zone(120).day(1).freeze().day(), 1, "should get and set day correctly");
        test.equal(a.thaw().zone(120).hour(1).freeze().hour(), 1, "should get and set hour correctly");
        test.equal(a.thaw().zone(120).minute(1).freeze().minute(), 1, "should get and set minute correctly");

        test.done();
    },

    "getters" : function (test) {
        var a = frozenMoment.utc([2012, 0, 1, 0, 0, 0]);

        test.equal(a.thaw().zone(120).freeze().year(),  2011, "should get year correctly");
        test.equal(a.thaw().zone(120).freeze().month(),   11, "should get month correctly");
        test.equal(a.thaw().zone(120).freeze().date(),    31, "should get date correctly");
        test.equal(a.thaw().zone(120).freeze().hour(),    22, "should get hour correctly");
        test.equal(a.thaw().zone(120).freeze().minute(),   0, "should get minute correctly");

        test.equal(a.thaw().zone(-120).freeze().year(),  2012, "should get year correctly");
        test.equal(a.thaw().zone(-120).freeze().month(),    0, "should get month correctly");
        test.equal(a.thaw().zone(-120).freeze().date(),     1, "should get date correctly");
        test.equal(a.thaw().zone(-120).freeze().hour(),     2, "should get hour correctly");
        test.equal(a.thaw().zone(-120).freeze().minute(),   0, "should get minute correctly");

        test.equal(a.thaw().zone(-90).freeze().year(),  2012, "should get year correctly");
        test.equal(a.thaw().zone(-90).freeze().month(),    0, "should get month correctly");
        test.equal(a.thaw().zone(-90).freeze().date(),     1, "should get date correctly");
        test.equal(a.thaw().zone(-90).freeze().hour(),     1, "should get hour correctly");
        test.equal(a.thaw().zone(-90).freeze().minute(),  30, "should get minute correctly");

        test.done();
    },

    "from" : function (test) {
        var zoneA = frozenMoment(),
            zoneB = momentBuilder(zoneA).zone(720).freeze(),
            zoneC = momentBuilder(zoneA).zone(360).freeze(),
            zoneD = momentBuilder(zoneA).zone(-690).freeze(),
            other = momentBuilder(zoneA).add(35, 'm').freeze();

        test.equal(zoneA.from(other), zoneB.from(other), "frozenMoment#from should be the same in all zones");
        test.equal(zoneA.from(other), zoneC.from(other), "frozenMoment#from should be the same in all zones");
        test.equal(zoneA.from(other), zoneD.from(other), "frozenMoment#from should be the same in all zones");

        test.done();
    },

    "diff" : function (test) {
        var zoneA = frozenMoment(),
            zoneB = momentBuilder(zoneA).zone(720).freeze(),
            zoneC = momentBuilder(zoneA).zone(360).freeze(),
            zoneD = momentBuilder(zoneA).zone(-690).freeze(),
            other = momentBuilder(zoneA).add(35, 'm').freeze();

        test.equal(zoneA.diff(other), zoneB.diff(other), "frozenMoment#diff should be the same in all zones");
        test.equal(zoneA.diff(other), zoneC.diff(other), "frozenMoment#diff should be the same in all zones");
        test.equal(zoneA.diff(other), zoneD.diff(other), "frozenMoment#diff should be the same in all zones");

        test.equal(zoneA.diff(other, 'minute', true), zoneB.diff(other, 'minute', true), "frozenMoment#diff should be the same in all zones");
        test.equal(zoneA.diff(other, 'minute', true), zoneC.diff(other, 'minute', true), "frozenMoment#diff should be the same in all zones");
        test.equal(zoneA.diff(other, 'minute', true), zoneD.diff(other, 'minute', true), "frozenMoment#diff should be the same in all zones");

        test.equal(zoneA.diff(other, 'hour', true), zoneB.diff(other, 'hour', true), "frozenMoment#diff should be the same in all zones");
        test.equal(zoneA.diff(other, 'hour', true), zoneC.diff(other, 'hour', true), "frozenMoment#diff should be the same in all zones");
        test.equal(zoneA.diff(other, 'hour', true), zoneD.diff(other, 'hour', true), "frozenMoment#diff should be the same in all zones");

        test.done();
    },

    "unix offset and timestamp" : function (test) {
        var zoneA = frozenMoment(),
            zoneB = momentBuilder(zoneA).zone(720).freeze(),
            zoneC = momentBuilder(zoneA).zone(360).freeze(),
            zoneD = momentBuilder(zoneA).zone(-690).freeze();

        test.equal(zoneA.unix(), zoneB.unix(), "frozenMoment#unix should be the same in all zones");
        test.equal(zoneA.unix(), zoneC.unix(), "frozenMoment#unix should be the same in all zones");
        test.equal(zoneA.unix(), zoneD.unix(), "frozenMoment#unix should be the same in all zones");

        test.equal(+zoneA, +zoneB, "frozenMoment#valueOf should be the same in all zones");
        test.equal(+zoneA, +zoneC, "frozenMoment#valueOf should be the same in all zones");
        test.equal(+zoneA, +zoneD, "frozenMoment#valueOf should be the same in all zones");

        test.done();
    },

    "cloning" : function (test) {
        test.equal(momentBuilder().zone(120).freeze().zone(),   120, "explicit freezing should retain the zone");
        test.equal(momentBuilder().zone(-120).freeze().zone(), -120, "explicit freezing should retain the zone");
        test.equal(frozenMoment(momentBuilder().zone(120)).zone(),   120, "implicit freezing should retain the zone");
        test.equal(frozenMoment(momentBuilder().zone(-120)).zone(), -120, "implicit freezing should retain the zone");

        test.done();
    },

    "start of / end of" : function (test) {
        var a = frozenMoment.utc([2010, 1, 2, 0, 0, 0]).thaw().zone(450);

        test.equal(a.clone().startOf('day').freeze().hour(), 0, "start of day should work on frozenMoments with a zone");
        test.equal(a.clone().startOf('day').freeze().minute(), 0, "start of day should work on frozenMoments with a zone");
        test.equal(a.clone().startOf('hour').freeze().minute(), 0, "start of hour should work on frozenMoments with a zone");

        test.equal(a.clone().endOf('day').freeze().hour(), 23, "end of day should work on frozenMoments with a zone");
        test.equal(a.clone().endOf('day').freeze().minute(), 59, "end of day should work on frozenMoments with a zone");
        test.equal(a.clone().endOf('hour').freeze().minute(), 59, "end of hour should work on frozenMoments with a zone");

        test.done();
    },

    "reset zone with frozenMoment#utc" : function (test) {
        var a = frozenMoment.utc([2012]).thaw().zone(480);

        test.equal(a.freeze().hour(),      16, "different zone should have different hour");
        test.equal(a.utc().freeze().hour(), 0, "calling frozenMoment#utc should reset the offset");

        test.done();
    },

    "reset zone with frozenMoment#local" : function (test) {
        var a = frozenMoment([2012]).thaw().zone(480);

        test.equal(a.clone().local().freeze().hour(), 0, "calling frozenMoment#local should reset the offset");

        test.done();
    },

    "toDate" : function (test) {
        var zoneA = new Date(),
            zoneB = momentBuilder(zoneA).zone(720).freeze().toDate(),
            zoneC = momentBuilder(zoneA).zone(360).freeze().toDate(),
            zoneD = momentBuilder(zoneA).zone(-690).freeze().toDate();

        test.equal(+zoneA, +zoneB, "frozenMoment#toDate should output a date with the right unix timestamp");
        test.equal(+zoneA, +zoneC, "frozenMoment#toDate should output a date with the right unix timestamp");
        test.equal(+zoneA, +zoneD, "frozenMoment#toDate should output a date with the right unix timestamp");

        test.done();
    },

    "same / before / after" : function (test) {
        var zoneA = frozenMoment().thaw().utc().freeze(),
            zoneB = frozenMoment(zoneA).thaw().zone(120).freeze(),
            zoneC = frozenMoment(zoneA).thaw().zone(-120).freeze();

        test.ok(zoneA.isSame(zoneB), "two frozenMoments with different offsets should be the same");
        test.ok(zoneA.isSame(zoneC), "two frozenMoments with different offsets should be the same");

        test.ok(zoneA.isSame(zoneB, 'hour'), "two frozenMoments with different offsets should be the same hour");
        test.ok(zoneA.isSame(zoneC, 'hour'), "two frozenMoments with different offsets should be the same hour");

        zoneA = zoneA.thaw().add(1, 'hour').freeze();

        test.ok(zoneA.isAfter(zoneB), "isAfter should work with two frozenMoments with different offsets");
        test.ok(zoneA.isAfter(zoneC), "isAfter should work with two frozenMoments with different offsets");

        test.ok(zoneA.isAfter(zoneB, 'hour'), "isAfter:hour should work with two frozenMoments with different offsets");
        test.ok(zoneA.isAfter(zoneC, 'hour'), "isAfter:hour should work with two frozenMoments with different offsets");

        zoneA = zoneA.thaw().subtract(2, 'hour').freeze();

        test.ok(zoneA.isBefore(zoneB), "isBefore should work with two frozenMoments with different offsets");
        test.ok(zoneA.isBefore(zoneC), "isBefore should work with two frozenMoments with different offsets");

        test.ok(zoneA.isBefore(zoneB, 'hour'), "isBefore:hour should work with two frozenMoments with different offsets");
        test.ok(zoneA.isBefore(zoneC, 'hour'), "isBefore:hour should work with two frozenMoments with different offsets");

        test.done();
    },

    "add / subtract over dst" : function (test) {
        var oldOffset = frozenMoment.updateOffset,
            m = frozenMoment.utc([2000, 2, 31, 3]);

        frozenMoment.updateOffset = function (mom, keepTime) {
            if (mom.clone().utc().month() > 2) {
                mom.zone(-60, keepTime);
            } else {
                mom.zone(0, keepTime);
            }
        };

        test.equal(m.hour(), 3, "should start at 00:00");

        m = m.thaw().add(24, 'hour').freeze();

        test.equal(m.hour(), 4, "adding 24 hours should disregard dst");

        m = m.thaw().subtract(24, 'hour').freeze();

        test.equal(m.hour(), 3, "subtracting 24 hours should disregard dst");

        m = m.thaw().add(1, 'day').freeze();

        test.equal(m.hour(), 3, "adding 1 day should have the same hour");

        m = m.thaw().subtract(1, 'day').freeze();

        test.equal(m.hour(), 3, "subtracting 1 day should have the same hour");

        m = m.thaw().add(1, 'month').freeze();

        test.equal(m.hour(), 3, "adding 1 month should have the same hour");

        m = m.thaw().subtract(1, 'month').freeze();

        test.equal(m.hour(), 3, "subtracting 1 month should have the same hour");

        frozenMoment.updateOffset = oldOffset;

        test.done();
    },

    "isDST" : function (test) {
        var oldOffset = frozenMoment.updateOffset;

        frozenMoment.updateOffset = function (mom, keepTime) {
            if (mom.month() > 2 && mom.month() < 9) {
                mom.zone(-60, keepTime);
            } else {
                mom.zone(0, keepTime);
            }
        };

        test.ok(!momentBuilder().month(0).freeze().isDST(),  "Jan should not be summer dst");
        test.ok(momentBuilder().month(6).freeze().isDST(),   "Jul should be summer dst");
        test.ok(!momentBuilder().month(11).freeze().isDST(), "Dec should not be summer dst");

        frozenMoment.updateOffset = function (mom) {
            if (mom.month() > 2 && mom.month() < 9) {
                mom.zone(0);
            } else {
                mom.zone(-60);
            }
        };

        test.ok(momentBuilder().month(0).freeze().isDST(),  "Jan should be winter dst");
        test.ok(!momentBuilder().month(6).freeze().isDST(), "Jul should not be winter dst");
        test.ok(momentBuilder().month(11).freeze().isDST(), "Dec should be winter dst");

        frozenMoment.updateOffset = oldOffset;

        test.done();
    },

    "zone names" : function (test) {
        test.expect(8);

        test.equal(frozenMoment().zoneAbbr(),   "", "Local zone abbr should be empty");
        test.equal(frozenMoment().format('z'),  "", "Local zone formatted abbr should be empty");
        test.equal(frozenMoment().zoneName(),   "", "Local zone name should be empty");
        test.equal(frozenMoment().format('zz'), "", "Local zone formatted name should be empty");

        test.equal(frozenMoment.utc().zoneAbbr(),   "UTC", "UTC zone abbr should be UTC");
        test.equal(frozenMoment.utc().format('z'),  "UTC", "UTC zone formatted abbr should be UTC");
        test.equal(frozenMoment.utc().zoneName(),   "Coordinated Universal Time", "UTC zone abbr should be Coordinated Universal Time");
        test.equal(frozenMoment.utc().format('zz'), "Coordinated Universal Time", "UTC zone formatted abbr should be Coordinated Universal Time");

        test.done();
    },

    "hours alignment with UTC" : function (test) {
        test.expect(4);

        test.equals(momentBuilder().zone(120).freeze().hasAlignedHourOffset(), true);
        test.equals(momentBuilder().zone(-180).freeze().hasAlignedHourOffset(), true);
        test.equals(momentBuilder().zone(90).freeze().hasAlignedHourOffset(), false);
        test.equals(momentBuilder().zone(-90).freeze().hasAlignedHourOffset(), false);

        test.done();
    },

    "hours alignment with other zone" : function (test) {
        test.expect(16);

        var m = momentBuilder().zone(120).freeze();

        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(180)), true);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(-180)), true);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(90)), false);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(-90)), false);

        m = momentBuilder().zone(90).freeze();

        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(180)), false);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(-180)), false);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(30)), true);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(-30)), true);

        m = momentBuilder().zone(-60).freeze();

        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(180)), true);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(-180)), true);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(90)), false);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(-90)), false);

        m = momentBuilder().zone(25).freeze();

        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(-35)), true);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(85)), true);

        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(35)), false);
        test.equals(m.hasAlignedHourOffset(momentBuilder().zone(-85)), false);

        test.done();
    },

    "parse zone" : function (test) {
        test.expect(2);
        var m = momentBuilder("2013-01-01T00:00:00-13:00").parseZone().freeze();
        test.equal(m.zone(), 13 * 60);
        test.equal(m.hours(), 0);
        test.done();
    },

    "parse zone static" : function (test) {
        test.expect(2);
        var m = momentBuilder.parseZone("2013-01-01T00:00:00-13:00").freeze();
        test.equal(m.zone(), 13 * 60);
        test.equal(m.hours(), 0);
        test.done();
    },

    "parse zone with more arguments" : function (test) {
        var m;
        test.expect(3);

        m = momentBuilder.parseZone("2013 01 01 05 -13:00", "YYYY MM DD HH ZZ").freeze();
        console.log(m._d, m._d.toISOString());
        test.equal(m.format(), "2013-01-01T05:00:00-13:00", "accept input and format");
        m = momentBuilder.parseZone("2013-01-01-13:00", "YYYY MM DD ZZ", true).freeze();
        console.log(m._d, m._d.toISOString());
        test.equal(m.isValid(), false, "accept input, format and strict flag");
        m = momentBuilder.parseZone("2013-01-01-13:00", ["DD MM YYYY ZZ", "YYYY MM DD ZZ"]).freeze();
        console.log(m._d, m._d.toISOString());
        test.equal(m.format(), "2013-01-01T00:00:00-13:00", "accept input and array of formats");

        test.done();
    },

    "parse zone with a timezone from the format string" : function (test) {
        test.expect(1);

        var m = frozenMoment("11-12-2013 -0400 +1100", "DD-MM-YYYY ZZ #####").thaw().parseZone().freeze();

        test.equal(m.zone(), 4 * 60);
        test.done();
    },

    "parse zone without a timezone included in the format string" : function (test) {
        test.expect(1);

        var m = frozenMoment("11-12-2013 -0400 +1100", "DD-MM-YYYY").thaw().parseZone().freeze();

        test.equal(m.zone(), -11 * 60);
        test.done();
    },

    "timezone format" : function (test) {
        test.equal(momentBuilder().zone(-60).freeze().format('ZZ'), "+0100", "-60 -> +0100");
        test.equal(momentBuilder().zone(-90).freeze().format('ZZ'), "+0130", "-90 -> +0130");
        test.equal(momentBuilder().zone(-120).freeze().format('ZZ'), "+0200", "-120 -> +0200");

        test.equal(momentBuilder().zone(+60).freeze().format('ZZ'), "-0100", "+60 -> -0100");
        test.equal(momentBuilder().zone(+90).freeze().format('ZZ'), "-0130", "+90 -> -0130");
        test.equal(momentBuilder().zone(+120).freeze().format('ZZ'), "-0200", "+120 -> -0200");
        test.done();
    }
};
