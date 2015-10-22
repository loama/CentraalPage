/*!
 * FullCalendar v2.3.1
 * Docs & License: http://fullcalendar.io/
 * (c) 2015 Adam Shaw
 */
(function(t) {
    "function" == typeof define && define.amd ? define(["jquery", "moment"], t) : "object" == typeof exports ? module.exports = t(require("jquery"), require("moment")) : t(jQuery, moment)
})(function(t, e) {
    function n() {
        var e, n, i, r, s, o = Array.prototype.slice.call(arguments),
            l = {};
        for (e = 0; Pe.length > e; e++) {
            for (n = Pe[e], i = null, r = 0; o.length > r; r++) s = o[r][n], t.isPlainObject(s) ? i = t.extend(i || {}, s) : null != s && (i = null);
            null !== i && (l[n] = i)
        }
        return o.unshift({}), o.push(l), t.extend.apply(t, o)
    }

    function i(e) {
        var n, i = {
                views: e.views || {}
            };
        return t.each(e, function(e, r) {
            "views" != e && (t.isPlainObject(r) && !/(time|duration|interval)$/i.test(e) && -1 == t.inArray(e, Pe) ? (n = null, t.each(r, function(t, r) {
                /^(month|week|day|default|basic(Week|Day)?|agenda(Week|Day)?)$/.test(t) ? (i.views[t] || (i.views[t] = {}), i.views[t][e] = r) : (n || (n = {}), n[t] = r)
            }), n && (i[e] = n)) : i[e] = r)
        }), i
    }

    function r(t, e) {
        e.left && t.css({
            "border-left-width": 1,
            "margin-left": e.left - 1
        }), e.right && t.css({
            "border-right-width": 1,
            "margin-right": e.right - 1
        })
    }

    function s(t) {
        t.css({
            "margin-left": "",
            "margin-right": "",
            "border-left-width": "",
            "border-right-width": ""
        })
    }

    function o() {
        t("body").addClass("fc-not-allowed")
    }

    function l() {
        t("body").removeClass("fc-not-allowed")
    }

    function a(e, n, i) {
        var r = Math.floor(n / e.length),
            s = Math.floor(n - r * (e.length - 1)),
            o = [],
            l = [],
            a = [],
            c = 0;
        u(e), e.each(function(n, i) {
            var u = n === e.length - 1 ? s : r,
                d = t(i).outerHeight(!0);
            u > d ? (o.push(i), l.push(d), a.push(t(i).height())) : c += d
        }), i && (n -= c, r = Math.floor(n / o.length), s = Math.floor(n - r * (o.length - 1))), t(o).each(function(e, n) {
            var i = e === o.length - 1 ? s : r,
                u = l[e],
                c = a[e],
                d = i - (u - c);
            i > u && t(n).height(d)
        })
    }

    function u(t) {
        t.height("")
    }

    function c(e) {
        var n = 0;
        return e.find("> *").each(function(e, i) {
            var r = t(i).outerWidth();
            r > n && (n = r)
        }), n++, e.width(n), n
    }

    function d(t, e) {
        return t.height(e).addClass("fc-scroller"), t[0].scrollHeight - 1 > t[0].clientHeight ? !0 : (h(t), !1)
    }

    function h(t) {
        t.height("").removeClass("fc-scroller")
    }

    function f(e) {
        var n = e.css("position"),
            i = e.parents().filter(function() {
                var e = t(this);
                return /(auto|scroll)/.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
            }).eq(0);
        return "fixed" !== n && i.length ? i : t(e[0].ownerDocument || document)
    }

    function g(t) {
        var e = t.offset();
        return {
            left: e.left,
            right: e.left + t.outerWidth(),
            top: e.top,
            bottom: e.top + t.outerHeight()
        }
    }

    function p(t) {
        var e = t.offset(),
            n = v(t),
            i = e.left + E(t, "border-left-width") + n.left,
            r = e.top + E(t, "border-top-width") + n.top;
        return {
            left: i,
            right: i + t[0].clientWidth,
            top: r,
            bottom: r + t[0].clientHeight
        }
    }

    function m(t) {
        var e = t.offset(),
            n = e.left + E(t, "border-left-width") + E(t, "padding-left"),
            i = e.top + E(t, "border-top-width") + E(t, "padding-top");
        return {
            left: n,
            right: n + t.width(),
            top: i,
            bottom: i + t.height()
        }
    }

    function v(t) {
        var e = t.innerWidth() - t[0].clientWidth,
            n = {
                left: 0,
                right: 0,
                top: 0,
                bottom: t.innerHeight() - t[0].clientHeight
            };
        return y() && "rtl" == t.css("direction") ? n.left = e : n.right = e, n
    }

    function y() {
        return null === Ve && (Ve = w()), Ve
    }

    function w() {
        var e = t("<div><div/></div>").css({
            position: "absolute",
            top: -1e3,
            left: 0,
            border: 0,
            padding: 0,
            overflow: "scroll",
            direction: "rtl"
        }).appendTo("body"),
            n = e.children(),
            i = n.offset().left > e.offset().left;
        return e.remove(), i
    }

    function E(t, e) {
        return parseFloat(t.css(e)) || 0
    }

    function S(t) {
        return 1 == t.which && !t.ctrlKey
    }

    function b(t, e) {
        var n = {
            left: Math.max(t.left, e.left),
            right: Math.min(t.right, e.right),
            top: Math.max(t.top, e.top),
            bottom: Math.min(t.bottom, e.bottom)
        };
        return n.left < n.right && n.top < n.bottom ? n : !1
    }

    function D(t, e) {
        return {
            left: Math.min(Math.max(t.left, e.left), e.right),
            top: Math.min(Math.max(t.top, e.top), e.bottom)
        }
    }

    function C(t) {
        return {
            left: (t.left + t.right) / 2,
            top: (t.top + t.bottom) / 2
        }
    }

    function T(t, e) {
        return {
            left: t.left - e.left,
            top: t.top - e.top
        }
    }

    function H(t, e) {
        var n, i, r, s, o = t.start,
            l = t.end,
            a = e.start,
            u = e.end;
        return l > a && u > o ? (o >= a ? (n = o.clone(), r = !0) : (n = a.clone(), r = !1), u >= l ? (i = l.clone(), s = !0) : (i = u.clone(), s = !1), {
            start: n,
            end: i,
            isStart: r,
            isEnd: s
        }) : void 0
    }

    function x(t, n) {
        return e.duration({
            days: t.clone().stripTime().diff(n.clone().stripTime(), "days"),
            ms: t.time() - n.time()
        })
    }

    function R(t, n) {
        return e.duration({
            days: t.clone().stripTime().diff(n.clone().stripTime(), "days")
        })
    }

    function k(t, n, i) {
        return e.duration(Math.round(t.diff(n, i, !0)), i)
    }

    function M(t, e) {
        var n, i, r;
        for (n = 0; Ye.length > n && (i = Ye[n], r = F(i, t, e), !(r >= 1 && U(r))); n++);
        return i
    }

    function F(t, n, i) {
        return null != i ? i.diff(n, t, !0) : e.isDuration(n) ? n.as(t) : n.end.diff(n.start, t, !0)
    }

    function z(t) {
        return Boolean(t.hours() || t.minutes() || t.seconds() || t.milliseconds())
    }

    function G(t) {
        return "[object Date]" === Object.prototype.toString.call(t) || t instanceof Date
    }

    function L(t) {
        return /^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(t)
    }

    function _(t) {
        var e = function() {};
        return e.prototype = t, new e
    }

    function P(t, e) {
        for (var n in t) A(t, n) && (e[n] = t[n])
    }

    function V(t, e) {
        var n, i, r = ["constructor", "toString", "valueOf"];
        for (n = 0; r.length > n; n++) i = r[n], t[i] !== Object.prototype[i] && (e[i] = t[i])
    }

    function A(t, e) {
        return Ie.call(t, e)
    }

    function O(e) {
        return /undefined|null|boolean|number|string/.test(t.type(e))
    }

    function N(e, n, i) {
        if (t.isFunction(e) && (e = [e]), e) {
            var r, s;
            for (r = 0; e.length > r; r++) s = e[r].apply(n, i) || s;
            return s
        }
    }

    function B() {
        for (var t = 0; arguments.length > t; t++)
            if (void 0 !== arguments[t]) return arguments[t]
    }

    function Y(t) {
        return (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />")
    }

    function I(t) {
        return t.replace(/&.*?;/g, "")
    }

    function W(e) {
        var n = [];
        return t.each(e, function(t, e) {
            null != e && n.push(t + ":" + e)
        }), n.join(";")
    }

    function Z(t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
    }

    function j(t, e) {
        return t - e
    }

    function U(t) {
        return 0 === t % 1
    }

    function q(t, e) {
        var n = t[e];
        return function() {
            return n.apply(t, arguments)
        }
    }

    function $(t, e) {
        var n, i, r, s, o = function() {
                var l = +new Date - s;
                e > l && l > 0 ? n = setTimeout(o, e - l) : (n = null, t.apply(r, i), n || (r = i = null))
            };
        return function() {
            r = this, i = arguments, s = +new Date, n || (n = setTimeout(o, e))
        }
    }

    function X(n, i, r) {
        var s, o, l, a, u = n[0],
            c = 1 == n.length && "string" == typeof u;
        return e.isMoment(u) ? (a = e.apply(null, n), Q(u, a)) : G(u) || void 0 === u ? a = e.apply(null, n) : (s = !1, o = !1, c ? We.test(u) ? (u += "-01", n = [u], s = !0, o = !0) : (l = Ze.exec(u)) && (s = !l[5], o = !0) : t.isArray(u) && (o = !0), a = i || s ? e.utc.apply(e, n) : e.apply(null, n), s ? (a._ambigTime = !0, a._ambigZone = !0) : r && (o ? a._ambigZone = !0 : c && (a.utcOffset ? a.utcOffset(u) : a.zone(u)))), a._fullCalendar = !0, a
    }

    function K(t, n) {
        var i, r, s = !1,
            o = !1,
            l = t.length,
            a = [];
        for (i = 0; l > i; i++) r = t[i], e.isMoment(r) || (r = Le.moment.parseZone(r)), s = s || r._ambigTime, o = o || r._ambigZone, a.push(r);
        for (i = 0; l > i; i++) r = a[i], n || !s || r._ambigTime ? o && !r._ambigZone && (a[i] = r.clone().stripZone()) : a[i] = r.clone().stripTime();
        return a
    }

    function Q(t, e) {
        t._ambigTime ? e._ambigTime = !0 : e._ambigTime && (e._ambigTime = !1), t._ambigZone ? e._ambigZone = !0 : e._ambigZone && (e._ambigZone = !1)
    }

    function J(t, e) {
        t.year(e[0] || 0).month(e[1] || 0).date(e[2] || 0).hours(e[3] || 0).minutes(e[4] || 0).seconds(e[5] || 0).milliseconds(e[6] || 0)
    }

    function te(t, e) {
        return Ue.format.call(t, e)
    }

    function ee(t, e) {
        return ne(t, le(e))
    }

    function ne(t, e) {
        var n, i = "";
        for (n = 0; e.length > n; n++) i += ie(t, e[n]);
        return i
    }

    function ie(t, e) {
        var n, i;
        return "string" == typeof e ? e : (n = e.token) ? qe[n] ? qe[n](t) : te(t, n) : e.maybe && (i = ne(t, e.maybe), i.match(/[1-9]/)) ? i : ""
    }

    function re(t, e, n, i, r) {
        var s;
        return t = Le.moment.parseZone(t), e = Le.moment.parseZone(e), s = (t.localeData || t.lang).call(t), n = s.longDateFormat(n) || n, i = i || " - ", se(t, e, le(n), i, r)
    }

    function se(t, e, n, i, r) {
        var s, o, l, a, u = "",
            c = "",
            d = "",
            h = "",
            f = "";
        for (o = 0; n.length > o && (s = oe(t, e, n[o]), s !== !1); o++) u += s;
        for (l = n.length - 1; l > o && (s = oe(t, e, n[l]), s !== !1); l--) c = s + c;
        for (a = o; l >= a; a++) d += ie(t, n[a]), h += ie(e, n[a]);
        return (d || h) && (f = r ? h + i + d : d + i + h), u + f + c
    }

    function oe(t, e, n) {
        var i, r;
        return "string" == typeof n ? n : (i = n.token) && (r = $e[i.charAt(0)], r && t.isSame(e, r)) ? te(t, i) : !1
    }

    function le(t) {
        return t in Xe ? Xe[t] : Xe[t] = ae(t)
    }

    function ae(t) {
        for (var e, n = [], i = /\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g; e = i.exec(t);) e[1] ? n.push(e[1]) : e[2] ? n.push({
            maybe: ae(e[2])
        }) : e[3] ? n.push({
            token: e[3]
        }) : e[5] && n.push(e[5]);
        return n
    }

    function ue() {}

    function ce(t, e) {
        return t || e ? t && e ? t.grid === e.grid && t.row === e.row && t.col === e.col : !1 : !0
    }

    function de(t) {
        var e = fe(t);
        return "background" === e || "inverse-background" === e
    }

    function he(t) {
        return "inverse-background" === fe(t)
    }

    function fe(t) {
        return B((t.source || {}).rendering, t.rendering)
    }

    function ge(t) {
        var e, n, i = {};
        for (e = 0; t.length > e; e++) n = t[e], (i[n._id] || (i[n._id] = [])).push(n);
        return i
    }

    function pe(t, e) {
        return t.eventStartMS - e.eventStartMS
    }

    function me(t, e) {
        return t.eventStartMS - e.eventStartMS || e.eventDurationMS - t.eventDurationMS || e.event.allDay - t.event.allDay || (t.event.title || "").localeCompare(e.event.title)
    }

    function ve(n) {
        var i, r, s, o, l = Le.dataAttrPrefix;
        return l && (l += "-"), i = n.data(l + "event") || null, i && (i = "object" == typeof i ? t.extend({}, i) : {}, r = i.start, null == r && (r = i.time), s = i.duration, o = i.stick, delete i.start, delete i.time, delete i.duration, delete i.stick), null == r && (r = n.data(l + "start")), null == r && (r = n.data(l + "time")), null == s && (s = n.data(l + "duration")), null == o && (o = n.data(l + "stick")), r = null != r ? e.duration(r) : null, s = null != s ? e.duration(s) : null, o = Boolean(o), {
            eventProps: i,
            startTime: r,
            duration: s,
            stick: o
        }
    }

    function ye(t, e) {
        var n, i;
        for (n = 0; e.length > n; n++)
            if (i = e[n], i.leftCol <= t.rightCol && i.rightCol >= t.leftCol) return !0;
        return !1
    }

    function we(t, e) {
        return t.leftCol - e.leftCol
    }

    function Ee(t) {
        var e, n, i;
        if (t.sort(me), e = Se(t), be(e), n = e[0]) {
            for (i = 0; n.length > i; i++) De(n[i]);
            for (i = 0; n.length > i; i++) Ce(n[i], 0, 0)
        }
    }

    function Se(t) {
        var e, n, i, r = [];
        for (e = 0; t.length > e; e++) {
            for (n = t[e], i = 0; r.length > i && Te(n, r[i]).length; i++);
            n.level = i, (r[i] || (r[i] = [])).push(n)
        }
        return r
    }

    function be(t) {
        var e, n, i, r, s;
        for (e = 0; t.length > e; e++)
            for (n = t[e], i = 0; n.length > i; i++)
                for (r = n[i], r.forwardSegs = [], s = e + 1; t.length > s; s++) Te(r, t[s], r.forwardSegs)
    }

    function De(t) {
        var e, n, i = t.forwardSegs,
            r = 0;
        if (void 0 === t.forwardPressure) {
            for (e = 0; i.length > e; e++) n = i[e], De(n), r = Math.max(r, 1 + n.forwardPressure);
            t.forwardPressure = r
        }
    }

    function Ce(t, e, n) {
        var i, r = t.forwardSegs;
        if (void 0 === t.forwardCoord)
            for (r.length ? (r.sort(xe), Ce(r[0], e + 1, n), t.forwardCoord = r[0].backwardCoord) : t.forwardCoord = 1, t.backwardCoord = t.forwardCoord - (t.forwardCoord - n) / (e + 1), i = 0; r.length > i; i++) Ce(r[i], 0, t.forwardCoord)
    }

    function Te(t, e, n) {
        n = n || [];
        for (var i = 0; e.length > i; i++) He(t, e[i]) && n.push(e[i]);
        return n
    }

    function He(t, e) {
        return t.bottom > e.top && t.top < e.bottom
    }

    function xe(t, e) {
        return e.forwardPressure - t.forwardPressure || (t.backwardCoord || 0) - (e.backwardCoord || 0) || me(t, e)
    }

    function Re(n, i) {
        function r() {
            j ? l() && (c(), a()) : s()
        }

        function s() {
            U = B.theme ? "ui" : "fc", n.addClass("fc"), B.isRTL ? n.addClass("fc-rtl") : n.addClass("fc-ltr"), B.theme ? n.addClass("ui-widget") : n.addClass("fc-unthemed"), j = t("<div class='fc-view-container'/>").prependTo(n), W = N.header = new Fe(N, B), Z = W.render(), Z && n.prepend(Z), a(B.defaultView), B.handleWindowResize && (K = $(h, B.windowResizeDelay), t(window).resize(K))
        }

        function o() {
            q && q.removeElement(), W.destroy(), j.remove(), n.removeClass("fc fc-ltr fc-rtl fc-unthemed ui-widget"), K && t(window).unbind("resize", K)
        }

        function l() {
            return n.is(":visible")
        }

        function a(e) {
            ie++, q && e && q.type !== e && (W.deactivateButton(q.type), G(), q.removeElement(), q = N.view = null), !q && e && (q = N.view = ne[e] || (ne[e] = N.instantiateView(e)), q.setElement(t("<div class='fc-view fc-" + e + "-view' />").appendTo(j)), W.activateButton(e)), q && (Q = q.massageCurrentDate(Q), q.isDisplayed && Q.isWithin(q.intervalStart, q.intervalEnd) || l() && (G(), q.display(Q), L(), E(), S(), m())), L(), ie--
        }

        function u(t) {
            return l() ? (t && d(), ie++, q.updateSize(!0), ie--, !0) : void 0
        }

        function c() {
            l() && d()
        }

        function d() {
            X = "number" == typeof B.contentHeight ? B.contentHeight : "number" == typeof B.height ? B.height - (Z ? Z.outerHeight(!0) : 0) : Math.round(j.width() / Math.max(B.aspectRatio, .5))
        }

        function h(t) {
            !ie && t.target === window && q.start && u(!0) && q.trigger("windowResize", ee)
        }

        function f() {
            p(), v()
        }

        function g() {
            l() && (G(), q.displayEvents(re), L())
        }

        function p() {
            G(), q.clearEvents(), L()
        }

        function m() {
            !B.lazyFetching || J(q.start, q.end) ? v() : g()
        }

        function v() {
            te(q.start, q.end)
        }

        function y(t) {
            re = t, g()
        }

        function w() {
            g()
        }

        function E() {
            W.updateTitle(q.title)
        }

        function S() {
            var t = N.getNow();
            t.isWithin(q.intervalStart, q.intervalEnd) ? W.disableButton("today") : W.enableButton("today")
        }

        function b(t, e) {
            t = N.moment(t), e = e ? N.moment(e) : t.hasTime() ? t.clone().add(N.defaultTimedEventDuration) : t.clone().add(N.defaultAllDayEventDuration), q.select({
                start: t,
                end: e
            })
        }

        function D() {
            q && q.unselect()
        }

        function C() {
            Q = q.computePrevDate(Q), a()
        }

        function T() {
            Q = q.computeNextDate(Q), a()
        }

        function H() {
            Q.add(-1, "years"), a()
        }

        function x() {
            Q.add(1, "years"), a()
        }

        function R() {
            Q = N.getNow(), a()
        }

        function k(t) {
            Q = N.moment(t), a()
        }

        function M(t) {
            Q.add(e.duration(t)), a()
        }

        function F(t, e) {
            var n;
            e = e || "day", n = N.getViewSpec(e) || N.getUnitViewSpec(e), Q = t, a(n ? n.type : null)
        }

        function z() {
            return Q.clone()
        }

        function G() {
            j.css({
                width: "100%",
                height: j.height(),
                overflow: "hidden"
            })
        }

        function L() {
            j.css({
                width: "",
                height: "",
                overflow: ""
            })
        }

        function P() {
            return N
        }

        function V() {
            return q
        }

        function A(t, e) {
            return void 0 === e ? B[t] : (("height" == t || "contentHeight" == t || "aspectRatio" == t) && (B[t] = e, u(!0)), void 0)
        }

        function O(t, e) {
            return B[t] ? B[t].apply(e || ee, Array.prototype.slice.call(arguments, 2)) : void 0
        }
        var N = this;
        N.initOptions(i || {});
        var B = this.options;
        N.render = r, N.destroy = o, N.refetchEvents = f, N.reportEvents = y, N.reportEventChange = w, N.rerenderEvents = g, N.changeView = a, N.select = b, N.unselect = D, N.prev = C, N.next = T, N.prevYear = H, N.nextYear = x, N.today = R, N.gotoDate = k, N.incrementDate = M, N.zoomTo = F, N.getDate = z, N.getCalendar = P, N.getView = V, N.option = A, N.trigger = O;
        var Y = _(Me(B.lang));
        if (B.monthNames && (Y._months = B.monthNames), B.monthNamesShort && (Y._monthsShort = B.monthNamesShort), B.dayNames && (Y._weekdays = B.dayNames), B.dayNamesShort && (Y._weekdaysShort = B.dayNamesShort), null != B.firstDay) {
            var I = _(Y._week);
            I.dow = B.firstDay, Y._week = I
        }
        Y._fullCalendar_weekCalc = function(t) {
            return "function" == typeof t ? t : "local" === t ? t : "iso" === t || "ISO" === t ? "ISO" : void 0
        }(B.weekNumberCalculation), N.defaultAllDayEventDuration = e.duration(B.defaultAllDayEventDuration), N.defaultTimedEventDuration = e.duration(B.defaultTimedEventDuration), N.moment = function() {
            var t;
            return "local" === B.timezone ? (t = Le.moment.apply(null, arguments), t.hasTime() && t.local()) : t = "UTC" === B.timezone ? Le.moment.utc.apply(null, arguments) : Le.moment.parseZone.apply(null, arguments), "_locale" in t ? t._locale = Y : t._lang = Y, t
        }, N.getIsAmbigTimezone = function() {
            return "local" !== B.timezone && "UTC" !== B.timezone
        }, N.rezoneDate = function(t) {
            return N.moment(t.toArray())
        }, N.getNow = function() {
            var t = B.now;
            return "function" == typeof t && (t = t()), N.moment(t)
        }, N.getEventEnd = function(t) {
            return t.end ? t.end.clone() : N.getDefaultEventEnd(t.allDay, t.start)
        }, N.getDefaultEventEnd = function(t, e) {
            var n = e.clone();
            return t ? n.stripTime().add(N.defaultAllDayEventDuration) : n.add(N.defaultTimedEventDuration), N.getIsAmbigTimezone() && n.stripZone(), n
        }, N.humanizeDuration = function(t) {
            return (t.locale || t.lang).call(t, B.lang).humanize()
        }, ze.call(N, B);
        var W, Z, j, U, q, X, K, Q, J = N.isFetchNeeded,
            te = N.fetchEvents,
            ee = n[0],
            ne = {}, ie = 0,
            re = [];
        Q = null != B.defaultDate ? N.moment(B.defaultDate) : N.getNow(), N.getSuggestedViewHeight = function() {
            return void 0 === X && c(), X
        }, N.isHeightAuto = function() {
            return "auto" === B.contentHeight || "auto" === B.height
        }
    }

    function ke(e) {
        t.each(fn, function(t, n) {
            null == e[t] && (e[t] = n(e))
        })
    }

    function Me(t) {
        var n = e.localeData || e.langData;
        return n.call(e, t) || n.call(e, "en")
    }

    function Fe(e, n) {
        function i() {
            var e = n.header;
            return f = n.theme ? "ui" : "fc", e ? g = t("<div class='fc-toolbar'/>").append(s("left")).append(s("right")).append(s("center")).append('<div class="fc-clear"/>') : void 0
        }

        function r() {
            g.remove()
        }

        function s(i) {
            var r = t('<div class="fc-' + i + '"/>'),
                s = n.header[i];
            return s && t.each(s.split(" "), function() {
                var i, s = t(),
                    o = !0;
                t.each(this.split(","), function(i, r) {
                    var l, a, u, c, d, h, g, m, v;
                    "title" == r ? (s = s.add(t("<h2>&nbsp;</h2>")), o = !1) : (l = e.getViewSpec(r), l ? (a = function() {
                        e.changeView(r)
                    }, p.push(r), u = l.buttonTextOverride, c = l.buttonTextDefault) : e[r] && (a = function() {
                        e[r]()
                    }, u = (e.overrides.buttonText || {})[r], c = n.buttonText[r]), a && (d = n.themeButtonIcons[r], h = n.buttonIcons[r], g = u ? Y(u) : d && n.theme ? "<span class='ui-icon ui-icon-" + d + "'></span>" : h && !n.theme ? "<span class='fc-icon fc-icon-" + h + "'></span>" : Y(c), m = ["fc-" + r + "-button", f + "-button", f + "-state-default"], v = t('<button type="button" class="' + m.join(" ") + '">' + g + "</button>").click(function() {
                        v.hasClass(f + "-state-disabled") || (a(), (v.hasClass(f + "-state-active") || v.hasClass(f + "-state-disabled")) && v.removeClass(f + "-state-hover"))
                    }).mousedown(function() {
                        v.not("." + f + "-state-active").not("." + f + "-state-disabled").addClass(f + "-state-down")
                    }).mouseup(function() {
                        v.removeClass(f + "-state-down")
                    }).hover(function() {
                        v.not("." + f + "-state-active").not("." + f + "-state-disabled").addClass(f + "-state-hover")
                    }, function() {
                        v.removeClass(f + "-state-hover").removeClass(f + "-state-down")
                    }), s = s.add(v)))
                }), o && s.first().addClass(f + "-corner-left").end().last().addClass(f + "-corner-right").end(), s.length > 1 ? (i = t("<div/>"), o && i.addClass("fc-button-group"), i.append(s), r.append(i)) : r.append(s)
            }), r
        }

        function o(t) {
            g.find("h2").text(t)
        }

        function l(t) {
            g.find(".fc-" + t + "-button").addClass(f + "-state-active")
        }

        function a(t) {
            g.find(".fc-" + t + "-button").removeClass(f + "-state-active")
        }

        function u(t) {
            g.find(".fc-" + t + "-button").attr("disabled", "disabled").addClass(f + "-state-disabled")
        }

        function c(t) {
            g.find(".fc-" + t + "-button").removeAttr("disabled").removeClass(f + "-state-disabled")
        }

        function d() {
            return p
        }
        var h = this;
        h.render = i, h.destroy = r, h.updateTitle = o, h.activateButton = l, h.deactivateButton = a, h.disableButton = u, h.enableButton = c, h.getViewsWithButtons = d;
        var f, g = t(),
            p = []
    }

    function ze(n) {
        function i(t, e) {
            return !W || t.clone().stripZone() < W.clone().stripZone() || e.clone().stripZone() > Z.clone().stripZone()
        }

        function r(t, e) {
            W = t, Z = e, te = [];
            var n = ++K,
                i = X.length;
            Q = i;
            for (var r = 0; i > r; r++) s(X[r], n)
        }

        function s(e, n) {
            o(e, function(i) {
                var r, s, o, l = t.isArray(e.events);
                if (n == K) {
                    if (i)
                        for (r = 0; i.length > r; r++) s = i[r], o = l ? s : E(s, e), o && te.push.apply(te, T(o));
                    Q--, Q || q(te)
                }
            })
        }

        function o(e, i) {
            var r, s, l = Le.sourceFetchers;
            for (r = 0; l.length > r; r++) {
                if (s = l[r].call(I, e, W.clone(), Z.clone(), n.timezone, i), s === !0) return;
                if ("object" == typeof s) return o(s, i), void 0
            }
            var a = e.events;
            if (a) t.isFunction(a) ? (y(), a.call(I, W.clone(), Z.clone(), n.timezone, function(t) {
                i(t), w()
            })) : t.isArray(a) ? i(a) : i();
            else {
                var u = e.url;
                if (u) {
                    var c, d = e.success,
                        h = e.error,
                        f = e.complete;
                    c = t.isFunction(e.data) ? e.data() : e.data;
                    var g = t.extend({}, c || {}),
                        p = B(e.startParam, n.startParam),
                        m = B(e.endParam, n.endParam),
                        v = B(e.timezoneParam, n.timezoneParam);
                    p && (g[p] = W.format()), m && (g[m] = Z.format()), n.timezone && "local" != n.timezone && (g[v] = n.timezone), y(), t.ajax(t.extend({}, gn, e, {
                        data: g,
                        success: function(e) {
                            e = e || [];
                            var n = N(d, this, arguments);
                            t.isArray(n) && (e = n), i(e)
                        },
                        error: function() {
                            N(h, this, arguments), i()
                        },
                        complete: function() {
                            N(f, this, arguments), w()
                        }
                    }))
                } else i()
            }
        }

        function l(t) {
            var e = a(t);
            e && (X.push(e), Q++, s(e, K))
        }

        function a(e) {
            var n, i, r = Le.sourceNormalizers;
            if (t.isFunction(e) || t.isArray(e) ? n = {
                events: e
            } : "string" == typeof e ? n = {
                url: e
            } : "object" == typeof e && (n = t.extend({}, e)), n) {
                for (n.className ? "string" == typeof n.className && (n.className = n.className.split(/\s+/)) : n.className = [], t.isArray(n.events) && (n.origArray = n.events, n.events = t.map(n.events, function(t) {
                    return E(t, n)
                })), i = 0; r.length > i; i++) r[i].call(I, n);
                return n
            }
        }

        function u(e) {
            X = t.grep(X, function(t) {
                return !c(t, e)
            }), te = t.grep(te, function(t) {
                return !c(t.source, e)
            }), q(te)
        }

        function c(t, e) {
            return t && e && d(t) == d(e)
        }

        function d(t) {
            return ("object" == typeof t ? t.origArray || t.googleCalendarId || t.url || t.events : null) || t
        }

        function h(t) {
            t.start = I.moment(t.start), t.end = t.end ? I.moment(t.end) : null, H(t, f(t)), q(te)
        }

        function f(e) {
            var n = {};
            return t.each(e, function(t, e) {
                g(t) && void 0 !== e && O(e) && (n[t] = e)
            }), n
        }

        function g(t) {
            return !/^_|^(id|allDay|start|end)$/.test(t)
        }

        function p(t, e) {
            var n, i, r, s = E(t);
            if (s) {
                for (n = T(s), i = 0; n.length > i; i++) r = n[i], r.source || (e && ($.events.push(r), r.source = $), te.push(r));
                return q(te), n
            }
            return []
        }

        function m(e) {
            var n, i;
            for (null == e ? e = function() {
                return !0
            } : t.isFunction(e) || (n = e + "", e = function(t) {
                return t._id == n
            }), te = t.grep(te, e, !0), i = 0; X.length > i; i++) t.isArray(X[i].events) && (X[i].events = t.grep(X[i].events, e, !0));
            q(te)
        }

        function v(e) {
            return t.isFunction(e) ? t.grep(te, e) : null != e ? (e += "", t.grep(te, function(t) {
                return t._id == e
            })) : te
        }

        function y() {
            J++ || j("loading", null, !0, U())
        }

        function w() {
            --J || j("loading", null, !1, U())
        }

        function E(i, r) {
            var s, o, l, a = {};
            if (n.eventDataTransform && (i = n.eventDataTransform(i)), r && r.eventDataTransform && (i = r.eventDataTransform(i)), t.extend(a, i), r && (a.source = r), a._id = i._id || (void 0 === i.id ? "_fc" + pn++ : i.id + ""), a.className = i.className ? "string" == typeof i.className ? i.className.split(/\s+/) : i.className : [], s = i.start || i.date, o = i.end, L(s) && (s = e.duration(s)), L(o) && (o = e.duration(o)), i.dow || e.isDuration(s) || e.isDuration(o)) a.start = s ? e.duration(s) : null, a.end = o ? e.duration(o) : null, a._recurring = !0;
            else {
                if (s && (s = I.moment(s), !s.isValid())) return !1;
                o && (o = I.moment(o), o.isValid() || (o = null)), l = i.allDay, void 0 === l && (l = B(r ? r.allDayDefault : void 0, n.allDayDefault)), S(s, o, l, a)
            }
            return a
        }

        function S(t, e, n, i) {
            i.start = t, i.end = e, i.allDay = n, b(i), Ge(i)
        }

        function b(t) {
            D(t), t.end && !t.end.isAfter(t.start) && (t.end = null), t.end || (t.end = n.forceEventDuration ? I.getDefaultEventEnd(t.allDay, t.start) : null)
        }

        function D(t) {
            null == t.allDay && (t.allDay = !(t.start.hasTime() || t.end && t.end.hasTime())), t.allDay ? (t.start.stripTime(), t.end && t.end.stripTime()) : (t.start.hasTime() || (t.start = I.rezoneDate(t.start)), t.end && !t.end.hasTime() && (t.end = I.rezoneDate(t.end)))
        }

        function C(e) {
            var n;
            return e.end || (n = e.allDay, null == n && (n = !e.start.hasTime()), e = t.extend({}, e), e.end = I.getDefaultEventEnd(n, e.start)), e
        }

        function T(e, n, i) {
            var r, s, o, l, a, u, c, d, h, f = [];
            if (n = n || W, i = i || Z, e)
                if (e._recurring) {
                    if (s = e.dow)
                        for (r = {}, o = 0; s.length > o; o++) r[s[o]] = !0;
                    for (l = n.clone().stripTime(); l.isBefore(i);)(!r || r[l.day()]) && (a = e.start, u = e.end, c = l.clone(), d = null, a && (c = c.time(a)), u && (d = l.clone().time(u)), h = t.extend({}, e), S(c, d, !a && !u, h), f.push(h)), l.add(1, "days")
                } else f.push(e);
            return f
        }

        function H(e, n, i) {
            function r(t, e) {
                return i ? k(t, e, i) : n.allDay ? R(t, e) : x(t, e)
            }
            var s, o, l, a, u, c, d = {};
            return n = n || {}, n.start || (n.start = e.start.clone()), void 0 === n.end && (n.end = e.end ? e.end.clone() : null), null == n.allDay && (n.allDay = e.allDay), b(n), s = {
                start: e._start.clone(),
                end: e._end ? e._end.clone() : I.getDefaultEventEnd(e._allDay, e._start),
                allDay: n.allDay
            }, b(s), o = null !== e._end && null === n.end, l = r(n.start, s.start), n.end ? (a = r(n.end, s.end), u = a.subtract(l)) : u = null, t.each(n, function(t, e) {
                g(t) && void 0 !== e && (d[t] = e)
            }), c = M(v(e._id), o, n.allDay, l, u, d), {
                dateDelta: l,
                durationDelta: u,
                undo: c
            }
        }

        function M(e, n, i, r, s, o) {
            var l = I.getIsAmbigTimezone(),
                a = [];
            return r && !r.valueOf() && (r = null), s && !s.valueOf() && (s = null), t.each(e, function(e, u) {
                var c, d;
                c = {
                    start: u.start.clone(),
                    end: u.end ? u.end.clone() : null,
                    allDay: u.allDay
                }, t.each(o, function(t) {
                    c[t] = u[t]
                }), d = {
                    start: u._start,
                    end: u._end,
                    allDay: i
                }, b(d), n ? d.end = null : s && !d.end && (d.end = I.getDefaultEventEnd(d.allDay, d.start)), r && (d.start.add(r), d.end && d.end.add(r)), s && d.end.add(s), l && !d.allDay && (r || s) && (d.start.stripZone(), d.end && d.end.stripZone()), t.extend(u, o, d), Ge(u), a.push(function() {
                    t.extend(u, c), Ge(u)
                })
            }),
            function() {
                for (var t = 0; a.length > t; t++) a[t]()
            }
        }

        function F(e) {
            var i, r = n.businessHours,
                s = {
                    className: "fc-nonbusiness",
                    start: "09:00",
                    end: "17:00",
                    dow: [1, 2, 3, 4, 5],
                    rendering: "inverse-background"
                }, o = I.getView();
            return r && (i = t.extend({}, s, "object" == typeof r ? r : {})), i ? (e && (i.start = null, i.end = null), T(E(i), o.start, o.end)) : []
        }

        function z(t, e) {
            var i = e.source || {}, r = B(e.constraint, i.constraint, n.eventConstraint),
                s = B(e.overlap, i.overlap, n.eventOverlap);
            return t = C(t), P(t, r, s, e)
        }

        function G(t) {
            return P(t, n.selectConstraint, n.selectOverlap)
        }

        function _(e, n) {
            var i, r;
            return n && (i = t.extend({}, n, e), r = T(E(i))[0]), r ? z(e, r) : (e = C(e), G(e))
        }

        function P(e, n, i, r) {
            var s, o, l, a, u, c;
            if (e = t.extend({}, e), e.start = e.start.clone().stripZone(), e.end = e.end.clone().stripZone(), null != n) {
                for (s = V(n), o = !1, a = 0; s.length > a; a++)
                    if (A(s[a], e)) {
                        o = !0;
                        break
                    }
                if (!o) return !1
            }
            for (l = I.getPeerEvents(r, e), a = 0; l.length > a; a++)
                if (u = l[a], Y(u, e)) {
                    if (i === !1) return !1;
                    if ("function" == typeof i && !i(u, r)) return !1;
                    if (r) {
                        if (c = B(u.overlap, (u.source || {}).overlap), c === !1) return !1;
                        if ("function" == typeof c && !c(r, u)) return !1
                    }
                }
            return !0
        }

        function V(t) {
            return "businessHours" === t ? F() : "object" == typeof t ? T(E(t)) : v(t)
        }

        function A(t, e) {
            var n = t.start.clone().stripZone(),
                i = I.getEventEnd(t).stripZone();
            return e.start >= n && i >= e.end
        }

        function Y(t, e) {
            var n = t.start.clone().stripZone(),
                i = I.getEventEnd(t).stripZone();
            return i > e.start && e.end > n
        }
        var I = this;
        I.isFetchNeeded = i, I.fetchEvents = r, I.addEventSource = l, I.removeEventSource = u, I.updateEvent = h, I.renderEvent = p, I.removeEvents = m, I.clientEvents = v, I.mutateEvent = H, I.normalizeEventRange = b, I.normalizeEventRangeTimes = D, I.ensureVisibleEventRange = C;
        var W, Z, j = I.trigger,
            U = I.getView,
            q = I.reportEvents,
            $ = {
                events: []
            }, X = [$],
            K = 0,
            Q = 0,
            J = 0,
            te = [];
        t.each((n.events ? [n.events] : []).concat(n.eventSources || []), function(t, e) {
            var n = a(e);
            n && X.push(n)
        }), I.getBusinessHoursEvents = F, I.isEventRangeAllowed = z, I.isSelectionRangeAllowed = G, I.isExternalDropRangeAllowed = _, I.getEventCache = function() {
            return te
        }
    }

    function Ge(t) {
        t._allDay = t.allDay, t._start = t.start.clone(), t._end = t.end ? t.end.clone() : null
    }
    var Le = t.fullCalendar = {
        version: "2.3.1"
    }, _e = Le.views = {};
    t.fn.fullCalendar = function(e) {
        var n = Array.prototype.slice.call(arguments, 1),
            i = this;
        return this.each(function(r, s) {
            var o, l = t(s),
                a = l.data("fullCalendar");
            "string" == typeof e ? a && t.isFunction(a[e]) && (o = a[e].apply(a, n), r || (i = o), "destroy" === e && l.removeData("fullCalendar")) : a || (a = new Le.CalendarBase(l, e), l.data("fullCalendar", a), a.render())
        }), i
    };
    var Pe = ["header", "buttonText", "buttonIcons", "themeButtonIcons"];
    Le.intersectionToSeg = H, Le.applyAll = N, Le.debounce = $, Le.isInt = U, Le.htmlEscape = Y, Le.cssToStr = W, Le.proxy = q, Le.getClientRect = p, Le.getContentRect = m, Le.getScrollbarWidths = v;
    var Ve = null;
    Le.computeIntervalUnit = M, Le.durationHasTime = z;
    var Ae, Oe, Ne, Be = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
        Ye = ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"],
        Ie = {}.hasOwnProperty,
        We = /^\s*\d{4}-\d\d$/,
        Ze = /^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/,
        je = e.fn,
        Ue = t.extend({}, je);
    Le.moment = function() {
        return X(arguments)
    }, Le.moment.utc = function() {
        var t = X(arguments, !0);
        return t.hasTime() && t.utc(), t
    }, Le.moment.parseZone = function() {
        return X(arguments, !0, !0)
    }, je.clone = function() {
        var t = Ue.clone.apply(this, arguments);
        return Q(this, t), this._fullCalendar && (t._fullCalendar = !0), t
    }, je.week = je.weeks = function(t) {
        var e = (this._locale || this._lang)._fullCalendar_weekCalc;
        return null == t && "function" == typeof e ? e(this) : "ISO" === e ? Ue.isoWeek.apply(this, arguments) : Ue.week.apply(this, arguments)
    }, je.time = function(t) {
        if (!this._fullCalendar) return Ue.time.apply(this, arguments);
        if (null == t) return e.duration({
            hours: this.hours(),
            minutes: this.minutes(),
            seconds: this.seconds(),
            milliseconds: this.milliseconds()
        });
        this._ambigTime = !1, e.isDuration(t) || e.isMoment(t) || (t = e.duration(t));
        var n = 0;
        return e.isDuration(t) && (n = 24 * Math.floor(t.asDays())), this.hours(n + t.hours()).minutes(t.minutes()).seconds(t.seconds()).milliseconds(t.milliseconds())
    }, je.stripTime = function() {
        var t;
        return this._ambigTime || (t = this.toArray(), this.utc(), Oe(this, t.slice(0, 3)), this._ambigTime = !0, this._ambigZone = !0), this
    }, je.hasTime = function() {
        return !this._ambigTime
    }, je.stripZone = function() {
        var t, e;
        return this._ambigZone || (t = this.toArray(), e = this._ambigTime, this.utc(), Oe(this, t), this._ambigTime = e || !1, this._ambigZone = !0), this
    }, je.hasZone = function() {
        return !this._ambigZone
    }, je.local = function() {
        var t = this.toArray(),
            e = this._ambigZone;
        return Ue.local.apply(this, arguments), this._ambigTime = !1, this._ambigZone = !1, e && Ne(this, t), this
    }, je.utc = function() {
        return Ue.utc.apply(this, arguments), this._ambigTime = !1, this._ambigZone = !1, this
    }, t.each(["zone", "utcOffset"], function(t, e) {
        Ue[e] && (je[e] = function(t) {
            return null != t && (this._ambigTime = !1, this._ambigZone = !1), Ue[e].apply(this, arguments)
        })
    }), je.format = function() {
        return this._fullCalendar && arguments[0] ? ee(this, arguments[0]) : this._ambigTime ? te(this, "YYYY-MM-DD") : this._ambigZone ? te(this, "YYYY-MM-DD[T]HH:mm:ss") : Ue.format.apply(this, arguments)
    }, je.toISOString = function() {
        return this._ambigTime ? te(this, "YYYY-MM-DD") : this._ambigZone ? te(this, "YYYY-MM-DD[T]HH:mm:ss") : Ue.toISOString.apply(this, arguments)
    }, je.isWithin = function(t, e) {
        var n = K([this, t, e]);
        return n[0] >= n[1] && n[0] < n[2]
    }, je.isSame = function(t, e) {
        var n;
        return this._fullCalendar ? e ? (n = K([this, t], !0), Ue.isSame.call(n[0], n[1], e)) : (t = Le.moment.parseZone(t), Ue.isSame.call(this, t) && Boolean(this._ambigTime) === Boolean(t._ambigTime) && Boolean(this._ambigZone) === Boolean(t._ambigZone)) : Ue.isSame.apply(this, arguments)
    }, t.each(["isBefore", "isAfter"], function(t, e) {
        je[e] = function(t, n) {
            var i;
            return this._fullCalendar ? (i = K([this, t]), Ue[e].call(i[0], i[1], n)) : Ue[e].apply(this, arguments)
        }
    }), Ae = "_d" in e() && "updateOffset" in e, Oe = Ae ? function(t, n) {
        t._d.setTime(Date.UTC.apply(Date, n)), e.updateOffset(t, !1)
    } : J, Ne = Ae ? function(t, n) {
        t._d.setTime(+new Date(n[0] || 0, n[1] || 0, n[2] || 0, n[3] || 0, n[4] || 0, n[5] || 0, n[6] || 0)), e.updateOffset(t, !1)
    } : J;
    var qe = {
        t: function(t) {
            return te(t, "a").charAt(0)
        },
        T: function(t) {
            return te(t, "A").charAt(0)
        }
    };
    Le.formatRange = re;
    var $e = {
        Y: "year",
        M: "month",
        D: "day",
        d: "day",
        A: "second",
        a: "second",
        T: "second",
        t: "second",
        H: "second",
        h: "second",
        m: "second",
        s: "second"
    }, Xe = {};
    Le.Class = ue, ue.extend = function(t) {
        var e, n = this;
        return t = t || {}, A(t, "constructor") && (e = t.constructor), "function" != typeof e && (e = t.constructor = function() {
            n.apply(this, arguments)
        }), e.prototype = _(n.prototype), P(t, e.prototype), V(t, e.prototype), P(n, e), e
    }, ue.mixin = function(t) {
        P(t.prototype || t, this.prototype)
    };
    var Ke = ue.extend({
        isHidden: !0,
        options: null,
        el: null,
        documentMousedownProxy: null,
        margin: 10,
        constructor: function(t) {
            this.options = t || {}
        },
        show: function() {
            this.isHidden && (this.el || this.render(), this.el.show(), this.position(), this.isHidden = !1, this.trigger("show"))
        },
        hide: function() {
            this.isHidden || (this.el.hide(), this.isHidden = !0, this.trigger("hide"))
        },
        render: function() {
            var e = this,
                n = this.options;
            this.el = t('<div class="fc-popover"/>').addClass(n.className || "").css({
                top: 0,
                left: 0
            }).append(n.content).appendTo(n.parentEl), this.el.on("click", ".fc-close", function() {
                e.hide()
            }), n.autoHide && t(document).on("mousedown", this.documentMousedownProxy = q(this, "documentMousedown"))
        },
        documentMousedown: function(e) {
            this.el && !t(e.target).closest(this.el).length && this.hide()
        },
        destroy: function() {
            this.hide(), this.el && (this.el.remove(), this.el = null), t(document).off("mousedown", this.documentMousedownProxy)
        },
        position: function() {
            var e, n, i, r, s, o = this.options,
                l = this.el.offsetParent().offset(),
                a = this.el.outerWidth(),
                u = this.el.outerHeight(),
                c = t(window),
                d = f(this.el);
            r = o.top || 0, s = void 0 !== o.left ? o.left : void 0 !== o.right ? o.right - a : 0, d.is(window) || d.is(document) ? (d = c, e = 0, n = 0) : (i = d.offset(), e = i.top, n = i.left), e += c.scrollTop(), n += c.scrollLeft(), o.viewportConstrain !== !1 && (r = Math.min(r, e + d.outerHeight() - u - this.margin), r = Math.max(r, e + this.margin), s = Math.min(s, n + d.outerWidth() - a - this.margin), s = Math.max(s, n + this.margin)), this.el.css({
                top: r - l.top,
                left: s - l.left
            })
        },
        trigger: function(t) {
            this.options[t] && this.options[t].apply(this, Array.prototype.slice.call(arguments, 1))
        }
    }),
        Qe = ue.extend({
            grid: null,
            rowCoords: null,
            colCoords: null,
            containerEl: null,
            bounds: null,
            constructor: function(t) {
                this.grid = t
            },
            build: function() {
                this.rowCoords = this.grid.computeRowCoords(), this.colCoords = this.grid.computeColCoords(), this.computeBounds()
            },
            clear: function() {
                this.rowCoords = null, this.colCoords = null
            },
            getCell: function(e, n) {
                var i, r, s, o = this.rowCoords,
                    l = o.length,
                    a = this.colCoords,
                    u = a.length,
                    c = null,
                    d = null;
                if (this.inBounds(e, n)) {
                    for (i = 0; l > i; i++)
                        if (r = o[i], n >= r.top && r.bottom > n) {
                            c = i;
                            break
                        }
                    for (i = 0; u > i; i++)
                        if (r = a[i], e >= r.left && r.right > e) {
                            d = i;
                            break
                        }
                    if (null !== c && null !== d) return s = this.grid.getCell(c, d), s.grid = this.grid, t.extend(s, o[c], a[d]), s
                }
                return null
            },
            computeBounds: function() {
                this.bounds = this.containerEl ? p(this.containerEl) : null
            },
            inBounds: function(t, e) {
                var n = this.bounds;
                return n ? t >= n.left && n.right > t && e >= n.top && n.bottom > e : !0
            }
        }),
        Je = ue.extend({
            coordMaps: null,
            constructor: function(t) {
                this.coordMaps = t
            },
            build: function() {
                var t, e = this.coordMaps;
                for (t = 0; e.length > t; t++) e[t].build()
            },
            getCell: function(t, e) {
                var n, i = this.coordMaps,
                    r = null;
                for (n = 0; i.length > n && !r; n++) r = i[n].getCell(t, e);
                return r
            },
            clear: function() {
                var t, e = this.coordMaps;
                for (t = 0; e.length > t; t++) e[t].clear()
            }
        }),
        tn = Le.DragListener = ue.extend({
            options: null,
            isListening: !1,
            isDragging: !1,
            originX: null,
            originY: null,
            mousemoveProxy: null,
            mouseupProxy: null,
            subjectEl: null,
            subjectHref: null,
            scrollEl: null,
            scrollBounds: null,
            scrollTopVel: null,
            scrollLeftVel: null,
            scrollIntervalId: null,
            scrollHandlerProxy: null,
            scrollSensitivity: 30,
            scrollSpeed: 200,
            scrollIntervalMs: 50,
            constructor: function(t) {
                t = t || {}, this.options = t, this.subjectEl = t.subjectEl
            },
            mousedown: function(t) {
                S(t) && (t.preventDefault(), this.startListening(t), this.options.distance || this.startDrag(t))
            },
            startListening: function(e) {
                var n;
                this.isListening || (e && this.options.scroll && (n = f(t(e.target)), n.is(window) || n.is(document) || (this.scrollEl = n, this.scrollHandlerProxy = $(q(this, "scrollHandler"), 100), this.scrollEl.on("scroll", this.scrollHandlerProxy))), t(document).on("mousemove", this.mousemoveProxy = q(this, "mousemove")).on("mouseup", this.mouseupProxy = q(this, "mouseup")).on("selectstart", this.preventDefault), e ? (this.originX = e.pageX, this.originY = e.pageY) : (this.originX = 0, this.originY = 0), this.isListening = !0, this.listenStart(e))
            },
            listenStart: function(t) {
                this.trigger("listenStart", t)
            },
            mousemove: function(t) {
                var e, n, i = t.pageX - this.originX,
                    r = t.pageY - this.originY;
                this.isDragging || (e = this.options.distance || 1, n = i * i + r * r, n >= e * e && this.startDrag(t)), this.isDragging && this.drag(i, r, t)
            },
            startDrag: function(t) {
                this.isListening || this.startListening(), this.isDragging || (this.isDragging = !0, this.dragStart(t))
            },
            dragStart: function(t) {
                var e = this.subjectEl;
                this.trigger("dragStart", t), (this.subjectHref = e ? e.attr("href") : null) && e.removeAttr("href")
            },
            drag: function(t, e, n) {
                this.trigger("drag", t, e, n), this.updateScroll(n)
            },
            mouseup: function(t) {
                this.stopListening(t)
            },
            stopDrag: function(t) {
                this.isDragging && (this.stopScrolling(), this.dragStop(t), this.isDragging = !1)
            },
            dragStop: function(t) {
                var e = this;
                this.trigger("dragStop", t), setTimeout(function() {
                    e.subjectHref && e.subjectEl.attr("href", e.subjectHref)
                }, 0)
            },
            stopListening: function(e) {
                this.stopDrag(e), this.isListening && (this.scrollEl && (this.scrollEl.off("scroll", this.scrollHandlerProxy), this.scrollHandlerProxy = null), t(document).off("mousemove", this.mousemoveProxy).off("mouseup", this.mouseupProxy).off("selectstart", this.preventDefault), this.mousemoveProxy = null, this.mouseupProxy = null, this.isListening = !1, this.listenStop(e))
            },
            listenStop: function(t) {
                this.trigger("listenStop", t)
            },
            trigger: function(t) {
                this.options[t] && this.options[t].apply(this, Array.prototype.slice.call(arguments, 1))
            },
            preventDefault: function(t) {
                t.preventDefault()
            },
            computeScrollBounds: function() {
                var t = this.scrollEl;
                this.scrollBounds = t ? g(t) : null
            },
            updateScroll: function(t) {
                var e, n, i, r, s = this.scrollSensitivity,
                    o = this.scrollBounds,
                    l = 0,
                    a = 0;
                o && (e = (s - (t.pageY - o.top)) / s, n = (s - (o.bottom - t.pageY)) / s, i = (s - (t.pageX - o.left)) / s, r = (s - (o.right - t.pageX)) / s, e >= 0 && 1 >= e ? l = -1 * e * this.scrollSpeed : n >= 0 && 1 >= n && (l = n * this.scrollSpeed), i >= 0 && 1 >= i ? a = -1 * i * this.scrollSpeed : r >= 0 && 1 >= r && (a = r * this.scrollSpeed)), this.setScrollVel(l, a)
            },
            setScrollVel: function(t, e) {
                this.scrollTopVel = t, this.scrollLeftVel = e, this.constrainScrollVel(), !this.scrollTopVel && !this.scrollLeftVel || this.scrollIntervalId || (this.scrollIntervalId = setInterval(q(this, "scrollIntervalFunc"), this.scrollIntervalMs))
            },
            constrainScrollVel: function() {
                var t = this.scrollEl;
                0 > this.scrollTopVel ? 0 >= t.scrollTop() && (this.scrollTopVel = 0) : this.scrollTopVel > 0 && t.scrollTop() + t[0].clientHeight >= t[0].scrollHeight && (this.scrollTopVel = 0), 0 > this.scrollLeftVel ? 0 >= t.scrollLeft() && (this.scrollLeftVel = 0) : this.scrollLeftVel > 0 && t.scrollLeft() + t[0].clientWidth >= t[0].scrollWidth && (this.scrollLeftVel = 0)
            },
            scrollIntervalFunc: function() {
                var t = this.scrollEl,
                    e = this.scrollIntervalMs / 1e3;
                this.scrollTopVel && t.scrollTop(t.scrollTop() + this.scrollTopVel * e), this.scrollLeftVel && t.scrollLeft(t.scrollLeft() + this.scrollLeftVel * e), this.constrainScrollVel(), this.scrollTopVel || this.scrollLeftVel || this.stopScrolling()
            },
            stopScrolling: function() {
                this.scrollIntervalId && (clearInterval(this.scrollIntervalId), this.scrollIntervalId = null, this.scrollStop())
            },
            scrollHandler: function() {
                this.scrollIntervalId || this.scrollStop()
            },
            scrollStop: function() {}
        }),
        en = tn.extend({
            coordMap: null,
            origCell: null,
            cell: null,
            coordAdjust: null,
            constructor: function(t, e) {
                tn.prototype.constructor.call(this, e), this.coordMap = t
            },
            listenStart: function(t) {
                var e, n, i, r = this.subjectEl;
                tn.prototype.listenStart.apply(this, arguments), this.computeCoords(), t ? (n = {
                    left: t.pageX,
                    top: t.pageY
                }, i = n, r && (e = g(r), i = D(i, e)), this.origCell = this.getCell(i.left, i.top), r && this.options.subjectCenter && (this.origCell && (e = b(this.origCell, e) || e), i = C(e)), this.coordAdjust = T(i, n)) : (this.origCell = null, this.coordAdjust = null)
            },
            computeCoords: function() {
                this.coordMap.build(), this.computeScrollBounds()
            },
            dragStart: function(t) {
                var e;
                tn.prototype.dragStart.apply(this, arguments), e = this.getCell(t.pageX, t.pageY), e && this.cellOver(e)
            },
            drag: function(t, e, n) {
                var i;
                tn.prototype.drag.apply(this, arguments), i = this.getCell(n.pageX, n.pageY), ce(i, this.cell) || (this.cell && this.cellOut(), i && this.cellOver(i))
            },
            dragStop: function() {
                this.cellDone(), tn.prototype.dragStop.apply(this, arguments)
            },
            cellOver: function(t) {
                this.cell = t, this.trigger("cellOver", t, ce(t, this.origCell), this.origCell)
            },
            cellOut: function() {
                this.cell && (this.trigger("cellOut", this.cell), this.cellDone(), this.cell = null)
            },
            cellDone: function() {
                this.cell && this.trigger("cellDone", this.cell)
            },
            listenStop: function() {
                tn.prototype.listenStop.apply(this, arguments), this.origCell = this.cell = null, this.coordMap.clear()
            },
            scrollStop: function() {
                tn.prototype.scrollStop.apply(this, arguments), this.computeCoords()
            },
            getCell: function(t, e) {
                return this.coordAdjust && (t += this.coordAdjust.left, e += this.coordAdjust.top), this.coordMap.getCell(t, e)
            }
        }),
        nn = ue.extend({
            options: null,
            sourceEl: null,
            el: null,
            parentEl: null,
            top0: null,
            left0: null,
            mouseY0: null,
            mouseX0: null,
            topDelta: null,
            leftDelta: null,
            mousemoveProxy: null,
            isFollowing: !1,
            isHidden: !1,
            isAnimating: !1,
            constructor: function(e, n) {
                this.options = n = n || {}, this.sourceEl = e, this.parentEl = n.parentEl ? t(n.parentEl) : e.parent()
            },
            start: function(e) {
                this.isFollowing || (this.isFollowing = !0, this.mouseY0 = e.pageY, this.mouseX0 = e.pageX, this.topDelta = 0, this.leftDelta = 0, this.isHidden || this.updatePosition(), t(document).on("mousemove", this.mousemoveProxy = q(this, "mousemove")))
            },
            stop: function(e, n) {
                function i() {
                    this.isAnimating = !1, r.destroyEl(), this.top0 = this.left0 = null, n && n()
                }
                var r = this,
                    s = this.options.revertDuration;
                this.isFollowing && !this.isAnimating && (this.isFollowing = !1, t(document).off("mousemove", this.mousemoveProxy), e && s && !this.isHidden ? (this.isAnimating = !0, this.el.animate({
                    top: this.top0,
                    left: this.left0
                }, {
                    duration: s,
                    complete: i
                })) : i())
            },
            getEl: function() {
                var t = this.el;
                return t || (this.sourceEl.width(), t = this.el = this.sourceEl.clone().css({
                    position: "absolute",
                    visibility: "",
                    display: this.isHidden ? "none" : "",
                    margin: 0,
                    right: "auto",
                    bottom: "auto",
                    width: this.sourceEl.width(),
                    height: this.sourceEl.height(),
                    opacity: this.options.opacity || "",
                    zIndex: this.options.zIndex
                }).appendTo(this.parentEl)), t
            },
            destroyEl: function() {
                this.el && (this.el.remove(), this.el = null)
            },
            updatePosition: function() {
                var t, e;
                this.getEl(), null === this.top0 && (this.sourceEl.width(), t = this.sourceEl.offset(), e = this.el.offsetParent().offset(), this.top0 = t.top - e.top, this.left0 = t.left - e.left), this.el.css({
                    top: this.top0 + this.topDelta,
                    left: this.left0 + this.leftDelta
                })
            },
            mousemove: function(t) {
                this.topDelta = t.pageY - this.mouseY0, this.leftDelta = t.pageX - this.mouseX0, this.isHidden || this.updatePosition()
            },
            hide: function() {
                this.isHidden || (this.isHidden = !0, this.el && this.el.hide())
            },
            show: function() {
                this.isHidden && (this.isHidden = !1, this.updatePosition(), this.getEl().show())
            }
        }),
        rn = ue.extend({
            view: null,
            isRTL: null,
            cellHtml: "<td/>",
            constructor: function(t) {
                this.view = t, this.isRTL = t.opt("isRTL")
            },
            rowHtml: function(t, e) {
                var n, i, r = this.getHtmlRenderer("cell", t),
                    s = "";
                for (e = e || 0, n = 0; this.colCnt > n; n++) i = this.getCell(e, n), s += r(i);
                return s = this.bookendCells(s, t, e), "<tr>" + s + "</tr>"
            },
            bookendCells: function(t, e, n) {
                var i = this.getHtmlRenderer("intro", e)(n || 0),
                    r = this.getHtmlRenderer("outro", e)(n || 0),
                    s = this.isRTL ? r : i,
                    o = this.isRTL ? i : r;
                return "string" == typeof t ? s + t + o : t.prepend(s).append(o)
            },
            getHtmlRenderer: function(t, e) {
                var n, i, r, s, o = this.view;
                return n = t + "Html", e && (i = e + Z(t) + "Html"), i && (s = o[i]) ? r = o : i && (s = this[i]) ? r = this : (s = o[n]) ? r = o : (s = this[n]) && (r = this), "function" == typeof s ? function() {
                    return s.apply(r, arguments) || ""
                } : function() {
                    return s || ""
                }
            }
        }),
        sn = Le.Grid = rn.extend({
            start: null,
            end: null,
            rowCnt: 0,
            colCnt: 0,
            rowData: null,
            colData: null,
            el: null,
            coordMap: null,
            elsByFill: null,
            externalDragStartProxy: null,
            colHeadFormat: null,
            eventTimeFormat: null,
            displayEventTime: null,
            displayEventEnd: null,
            cellDuration: null,
            largeUnit: null,
            constructor: function() {
                rn.apply(this, arguments), this.coordMap = new Qe(this), this.elsByFill = {}, this.externalDragStartProxy = q(this, "externalDragStart")
            },
            computeColHeadFormat: function() {},
            computeEventTimeFormat: function() {
                return this.view.opt("smallTimeFormat")
            },
            computeDisplayEventTime: function() {
                return !0
            },
            computeDisplayEventEnd: function() {
                return !0
            },
            setRange: function(t) {
                var e, n, i = this.view;
                this.start = t.start.clone(), this.end = t.end.clone(), this.rowData = [], this.colData = [], this.updateCells(), this.colHeadFormat = i.opt("columnFormat") || this.computeColHeadFormat(), this.eventTimeFormat = i.opt("eventTimeFormat") || i.opt("timeFormat") || this.computeEventTimeFormat(), e = i.opt("displayEventTime"), null == e && (e = this.computeDisplayEventTime()), n = i.opt("displayEventEnd"), null == n && (n = this.computeDisplayEventEnd()), this.displayEventTime = e, this.displayEventEnd = n
            },
            updateCells: function() {},
            rangeToSegs: function() {},
            diffDates: function(t, e) {
                return this.largeUnit ? k(t, e, this.largeUnit) : x(t, e)
            },
            getCell: function(e, n) {
                var i;
                return null == n && ("number" == typeof e ? (n = e % this.colCnt, e = Math.floor(e / this.colCnt)) : (n = e.col, e = e.row)), i = {
                    row: e,
                    col: n
                }, t.extend(i, this.getRowData(e), this.getColData(n)), t.extend(i, this.computeCellRange(i)), i
            },
            computeCellRange: function(t) {
                var e = this.computeCellDate(t);
                return {
                    start: e,
                    end: e.clone().add(this.cellDuration)
                }
            },
            computeCellDate: function() {},
            getRowData: function(t) {
                return this.rowData[t] || {}
            },
            getColData: function(t) {
                return this.colData[t] || {}
            },
            getRowEl: function() {},
            getColEl: function() {},
            getCellDayEl: function(t) {
                return this.getColEl(t.col) || this.getRowEl(t.row)
            },
            computeRowCoords: function() {
                var t, e, n, i = [];
                for (t = 0; this.rowCnt > t; t++) e = this.getRowEl(t), n = e.offset().top, i.push({
                    top: n,
                    bottom: n + e.outerHeight()
                });
                return i
            },
            computeColCoords: function() {
                var t, e, n, i = [];
                for (t = 0; this.colCnt > t; t++) e = this.getColEl(t), n = e.offset().left, i.push({
                    left: n,
                    right: n + e.outerWidth()
                });
                return i
            },
            setElement: function(e) {
                var n = this;
                this.el = e, e.on("mousedown", function(e) {
                    t(e.target).is(".fc-event-container *, .fc-more") || t(e.target).closest(".fc-popover").length || n.dayMousedown(e)
                }), this.bindSegHandlers(), this.bindGlobalHandlers()
            },
            removeElement: function() {
                this.unbindGlobalHandlers(), this.el.remove()
            },
            renderSkeleton: function() {},
            renderDates: function() {},
            destroyDates: function() {},
            bindGlobalHandlers: function() {
                t(document).on("dragstart sortstart", this.externalDragStartProxy)
            },
            unbindGlobalHandlers: function() {
                t(document).off("dragstart sortstart", this.externalDragStartProxy)
            },
            dayMousedown: function(t) {
                var e, n, i = this,
                    r = this.view,
                    s = r.opt("selectable"),
                    a = new en(this.coordMap, {
                        scroll: r.opt("dragScroll"),
                        dragStart: function() {
                            r.unselect()
                        },
                        cellOver: function(t, r, l) {
                            l && (e = r ? t : null, s && (n = i.computeSelection(l, t), n ? i.renderSelection(n) : o()))
                        },
                        cellOut: function() {
                            e = null, n = null, i.destroySelection(), l()
                        },
                        listenStop: function(t) {
                            e && r.trigger("dayClick", i.getCellDayEl(e), e.start, t), n && r.reportSelection(n, t), l()
                        }
                    });
                a.mousedown(t)
            },
            renderRangeHelper: function(t, e) {
                var n = this.fabricateHelperEvent(t, e);
                this.renderHelper(n, e)
            },
            fabricateHelperEvent: function(t, e) {
                var n = e ? _(e.event) : {};
                return n.start = t.start.clone(), n.end = t.end ? t.end.clone() : null, n.allDay = null, this.view.calendar.normalizeEventRange(n), n.className = (n.className || []).concat("fc-helper"), e || (n.editable = !1), n
            },
            renderHelper: function() {},
            destroyHelper: function() {},
            renderSelection: function(t) {
                this.renderHighlight(t)
            },
            destroySelection: function() {
                this.destroyHighlight()
            },
            computeSelection: function(t, e) {
                var n, i = [t.start, t.end, e.start, e.end];
                return i.sort(j), n = {
                    start: i[0].clone(),
                    end: i[3].clone()
                }, this.view.calendar.isSelectionRangeAllowed(n) ? n : null
            },
            renderHighlight: function(t) {
                this.renderFill("highlight", this.rangeToSegs(t))
            },
            destroyHighlight: function() {
                this.destroyFill("highlight")
            },
            highlightSegClasses: function() {
                return ["fc-highlight"]
            },
            renderFill: function() {},
            destroyFill: function(t) {
                var e = this.elsByFill[t];
                e && (e.remove(), delete this.elsByFill[t])
            },
            renderFillSegEls: function(e, n) {
                var i, r = this,
                    s = this[e + "SegEl"],
                    o = "",
                    l = [];
                if (n.length) {
                    for (i = 0; n.length > i; i++) o += this.fillSegHtml(e, n[i]);
                    t(o).each(function(e, i) {
                        var o = n[e],
                            a = t(i);
                        s && (a = s.call(r, o, a)), a && (a = t(a), a.is(r.fillSegTag) && (o.el = a, l.push(o)))
                    })
                }
                return l
            },
            fillSegTag: "div",
            fillSegHtml: function(t, e) {
                var n = this[t + "SegClasses"],
                    i = this[t + "SegCss"],
                    r = n ? n.call(this, e) : [],
                    s = W(i ? i.call(this, e) : {});
                return "<" + this.fillSegTag + (r.length ? ' class="' + r.join(" ") + '"' : "") + (s ? ' style="' + s + '"' : "") + " />"
            },
            headHtml: function() {
                return '<div class="fc-row ' + this.view.widgetHeaderClass + '">' + "<table>" + "<thead>" + this.rowHtml("head") + "</thead>" + "</table>" + "</div>"
            },
            headCellHtml: function(t) {
                var e = this.view,
                    n = t.start;
                return '<th class="fc-day-header ' + e.widgetHeaderClass + " fc-" + Be[n.day()] + '">' + Y(n.format(this.colHeadFormat)) + "</th>"
            },
            bgCellHtml: function(t) {
                var e = this.view,
                    n = t.start,
                    i = this.getDayClasses(n);
                return i.unshift("fc-day", e.widgetContentClass), '<td class="' + i.join(" ") + '"' + ' data-date="' + n.format("YYYY-MM-DD") + '"' + "></td>"
            },
            getDayClasses: function(t) {
                var e = this.view,
                    n = e.calendar.getNow().stripTime(),
                    i = ["fc-" + Be[t.day()]];
                return 1 == e.intervalDuration.as("months") && t.month() != e.intervalStart.month() && i.push("fc-other-month"), t.isSame(n, "day") ? i.push("fc-today", e.highlightStateClass) : n > t ? i.push("fc-past") : i.push("fc-future"), i
            }
        });
    sn.mixin({
        mousedOverSeg: null,
        isDraggingSeg: !1,
        isResizingSeg: !1,
        isDraggingExternal: !1,
        segs: null,
        renderEvents: function(t) {
            var e, n, i = this.eventsToSegs(t),
                r = [],
                s = [];
            for (e = 0; i.length > e; e++) n = i[e], de(n.event) ? r.push(n) : s.push(n);
            r = this.renderBgSegs(r) || r, s = this.renderFgSegs(s) || s, this.segs = r.concat(s)
        },
        destroyEvents: function() {
            this.triggerSegMouseout(), this.destroyFgSegs(), this.destroyBgSegs(), this.segs = null
        },
        getEventSegs: function() {
            return this.segs || []
        },
        renderFgSegs: function() {},
        destroyFgSegs: function() {},
        renderFgSegEls: function(e, n) {
            var i, r = this.view,
                s = "",
                o = [];
            if (e.length) {
                for (i = 0; e.length > i; i++) s += this.fgSegHtml(e[i], n);
                t(s).each(function(n, i) {
                    var s = e[n],
                        l = r.resolveEventEl(s.event, t(i));
                    l && (l.data("fc-seg", s), s.el = l, o.push(s))
                })
            }
            return o
        },
        fgSegHtml: function() {},
        renderBgSegs: function(t) {
            return this.renderFill("bgEvent", t)
        },
        destroyBgSegs: function() {
            this.destroyFill("bgEvent")
        },
        bgEventSegEl: function(t, e) {
            return this.view.resolveEventEl(t.event, e)
        },
        bgEventSegClasses: function(t) {
            var e = t.event,
                n = e.source || {};
            return ["fc-bgevent"].concat(e.className, n.className || [])
        },
        bgEventSegCss: function(t) {
            var e = this.view,
                n = t.event,
                i = n.source || {};
            return {
                "background-color": n.backgroundColor || n.color || i.backgroundColor || i.color || e.opt("eventBackgroundColor") || e.opt("eventColor")
            }
        },
        businessHoursSegClasses: function() {
            return ["fc-nonbusiness", "fc-bgevent"]
        },
        bindSegHandlers: function() {
            var e = this,
                n = this.view;
            t.each({
                mouseenter: function(t, n) {
                    e.triggerSegMouseover(t, n)
                },
                mouseleave: function(t, n) {
                    e.triggerSegMouseout(t, n)
                },
                click: function(t, e) {
                    return n.trigger("eventClick", this, t.event, e)
                },
                mousedown: function(i, r) {
                    t(r.target).is(".fc-resizer") && n.isEventResizable(i.event) ? e.segResizeMousedown(i, r, t(r.target).is(".fc-start-resizer")) : n.isEventDraggable(i.event) && e.segDragMousedown(i, r)
                }
            }, function(n, i) {
                e.el.on(n, ".fc-event-container > *", function(n) {
                    var r = t(this).data("fc-seg");
                    return !r || e.isDraggingSeg || e.isResizingSeg ? void 0 : i.call(this, r, n)
                })
            })
        },
        triggerSegMouseover: function(t, e) {
            this.mousedOverSeg || (this.mousedOverSeg = t, this.view.trigger("eventMouseover", t.el[0], t.event, e))
        },
        triggerSegMouseout: function(t, e) {
            e = e || {}, this.mousedOverSeg && (t = t || this.mousedOverSeg, this.mousedOverSeg = null, this.view.trigger("eventMouseout", t.el[0], t.event, e))
        },
        segDragMousedown: function(t, e) {
            var n, i = this,
                r = this.view,
                s = r.calendar,
                a = t.el,
                u = t.event,
                c = new nn(t.el, {
                    parentEl: r.el,
                    opacity: r.opt("dragOpacity"),
                    revertDuration: r.opt("dragRevertDuration"),
                    zIndex: 2
                }),
                d = new en(r.coordMap, {
                    distance: 5,
                    scroll: r.opt("dragScroll"),
                    subjectEl: a,
                    subjectCenter: !0,
                    listenStart: function(t) {
                        c.hide(), c.start(t)
                    },
                    dragStart: function(e) {
                        i.triggerSegMouseout(t, e), i.segDragStart(t, e), r.hideEvent(u)
                    },
                    cellOver: function(e, l, a) {
                        t.cell && (a = t.cell), n = i.computeEventDrop(a, e, u), n && !s.isEventRangeAllowed(n, u) && (o(), n = null), n && r.renderDrag(n, t) ? c.hide() : c.show(), l && (n = null)
                    },
                    cellOut: function() {
                        r.destroyDrag(), c.show(), n = null
                    },
                    cellDone: function() {
                        l()
                    },
                    dragStop: function(e) {
                        c.stop(!n, function() {
                            r.destroyDrag(), r.showEvent(u), i.segDragStop(t, e), n && r.reportEventDrop(u, n, this.largeUnit, a, e)
                        })
                    },
                    listenStop: function() {
                        c.stop()
                    }
                });
            d.mousedown(e)
        },
        segDragStart: function(t, e) {
            this.isDraggingSeg = !0, this.view.trigger("eventDragStart", t.el[0], t.event, e, {})
        },
        segDragStop: function(t, e) {
            this.isDraggingSeg = !1, this.view.trigger("eventDragStop", t.el[0], t.event, e, {})
        },
        computeEventDrop: function(t, e, n) {
            var i, r, s = this.view.calendar,
                o = t.start,
                l = e.start;
            return o.hasTime() === l.hasTime() ? (i = this.diffDates(l, o), n.allDay && z(i) ? (r = {
                start: n.start.clone(),
                end: s.getEventEnd(n),
                allDay: !1
            }, s.normalizeEventRangeTimes(r)) : r = {
                start: n.start.clone(),
                end: n.end ? n.end.clone() : null,
                allDay: n.allDay
            }, r.start.add(i), r.end && r.end.add(i)) : r = {
                start: l.clone(),
                end: null,
                allDay: !l.hasTime()
            }, r
        },
        applyDragOpacity: function(t) {
            var e = this.view.opt("dragOpacity");
            null != e && t.each(function(t, n) {
                n.style.opacity = e
            })
        },
        externalDragStart: function(e, n) {
            var i, r, s = this.view;
            s.opt("droppable") && (i = t((n ? n.item : null) || e.target), r = s.opt("dropAccept"), (t.isFunction(r) ? r.call(i[0], i) : i.is(r)) && (this.isDraggingExternal || this.listenToExternalDrag(i, e, n)))
        },
        listenToExternalDrag: function(t, e, n) {
            var i, r, s = this,
                a = ve(t);
            i = new en(this.coordMap, {
                listenStart: function() {
                    s.isDraggingExternal = !0
                },
                cellOver: function(t) {
                    r = s.computeExternalDrop(t, a), r ? s.renderDrag(r) : o()
                },
                cellOut: function() {
                    r = null, s.destroyDrag(), l()
                },
                dragStop: function() {
                    s.destroyDrag(), l(), r && s.view.reportExternalDrop(a, r, t, e, n)
                },
                listenStop: function() {
                    s.isDraggingExternal = !1
                }
            }), i.startDrag(e)
        },
        computeExternalDrop: function(t, e) {
            var n = {
                start: t.start.clone(),
                end: null
            };
            return e.startTime && !n.start.hasTime() && n.start.time(e.startTime), e.duration && (n.end = n.start.clone().add(e.duration)), this.view.calendar.isExternalDropRangeAllowed(n, e.eventProps) ? n : null
        },
        renderDrag: function() {},
        destroyDrag: function() {},
        segResizeMousedown: function(t, e, n) {
            var i, r, s = this,
                a = this.view,
                u = a.calendar,
                c = t.el,
                d = t.event,
                h = u.getEventEnd(d);
            i = new en(this.coordMap, {
                distance: 5,
                scroll: a.opt("dragScroll"),
                subjectEl: c,
                dragStart: function(e) {
                    s.triggerSegMouseout(t, e), s.segResizeStart(t, e)
                },
                cellOver: function(e, i, l) {
                    r = n ? s.computeEventStartResize(l, e, d) : s.computeEventEndResize(l, e, d), r && (u.isEventRangeAllowed(r, d) ? r.start.isSame(d.start) && r.end.isSame(h) && (r = null) : (o(), r = null)), r && (a.hideEvent(d), s.renderEventResize(r, t))
                },
                cellOut: function() {
                    r = null
                },
                cellDone: function() {
                    s.destroyEventResize(), a.showEvent(d), l()
                },
                dragStop: function(e) {
                    s.segResizeStop(t, e), r && a.reportEventResize(d, r, this.largeUnit, c, e)
                }
            }), i.mousedown(e)
        },
        segResizeStart: function(t, e) {
            this.isResizingSeg = !0, this.view.trigger("eventResizeStart", t.el[0], t.event, e, {})
        },
        segResizeStop: function(t, e) {
            this.isResizingSeg = !1, this.view.trigger("eventResizeStop", t.el[0], t.event, e, {})
        },
        computeEventStartResize: function(t, e, n) {
            return this.computeEventResize("start", t, e, n)
        },
        computeEventEndResize: function(t, e, n) {
            return this.computeEventResize("end", t, e, n)
        },
        computeEventResize: function(t, e, n, i) {
            var r, s, o = this.view.calendar,
                l = this.diffDates(n[t], e[t]);
            return r = {
                start: i.start.clone(),
                end: o.getEventEnd(i),
                allDay: i.allDay
            }, r.allDay && z(l) && (r.allDay = !1, o.normalizeEventRangeTimes(r)), r[t].add(l), r.start.isBefore(r.end) || (s = i.allDay ? o.defaultAllDayEventDuration : o.defaultTimedEventDuration, this.cellDuration && s > this.cellDuration && (s = this.cellDuration), "start" == t ? r.start = r.end.clone().subtract(s) : r.end = r.start.clone().add(s)), r
        },
        renderEventResize: function() {},
        destroyEventResize: function() {},
        getEventTimeText: function(t, e, n) {
            return null == e && (e = this.eventTimeFormat), null == n && (n = this.displayEventEnd), this.displayEventTime && t.start.hasTime() ? n && t.end ? this.view.formatRange(t, e) : t.start.format(e) : ""
        },
        getSegClasses: function(t, e, n) {
            var i = t.event,
                r = ["fc-event", t.isStart ? "fc-start" : "fc-not-start", t.isEnd ? "fc-end" : "fc-not-end"].concat(i.className, i.source ? i.source.className : []);
            return e && r.push("fc-draggable"), n && r.push("fc-resizable"), r
        },
        getEventSkinCss: function(t) {
            var e = this.view,
                n = t.source || {}, i = t.color,
                r = n.color,
                s = e.opt("eventColor");
            return {
                "background-color": t.backgroundColor || i || n.backgroundColor || r || e.opt("eventBackgroundColor") || s,
                "border-color": t.borderColor || i || n.borderColor || r || e.opt("eventBorderColor") || s,
                color: t.textColor || n.textColor || e.opt("eventTextColor")
            }
        },
        eventsToSegs: function(t, e) {
            var n, i = this.eventsToRanges(t),
                r = [];
            for (n = 0; i.length > n; n++) r.push.apply(r, this.eventRangeToSegs(i[n], e));
            return r
        },
        eventsToRanges: function(e) {
            var n = this,
                i = ge(e),
                r = [];
            return t.each(i, function(t, e) {
                e.length && r.push.apply(r, he(e[0]) ? n.eventsToInverseRanges(e) : n.eventsToNormalRanges(e))
            }), r
        },
        eventsToNormalRanges: function(t) {
            var e, n, i, r, s = this.view.calendar,
                o = [];
            for (e = 0; t.length > e; e++) n = t[e], i = n.start.clone().stripZone(), r = s.getEventEnd(n).stripZone(), o.push({
                event: n,
                start: i,
                end: r,
                eventStartMS: +i,
                eventDurationMS: r - i
            });
            return o
        },
        eventsToInverseRanges: function(t) {
            var e, n, i = this.view,
                r = i.start.clone().stripZone(),
                s = i.end.clone().stripZone(),
                o = this.eventsToNormalRanges(t),
                l = [],
                a = t[0],
                u = r;
            for (o.sort(pe), e = 0; o.length > e; e++) n = o[e], n.start > u && l.push({
                event: a,
                start: u,
                end: n.start
            }), u = n.end;
            return s > u && l.push({
                event: a,
                start: u,
                end: s
            }), l
        },
        eventRangeToSegs: function(t, e) {
            var n, i, r;
            for (n = e ? e(t) : this.rangeToSegs(t), i = 0; n.length > i; i++) r = n[i], r.event = t.event, r.eventStartMS = t.eventStartMS, r.eventDurationMS = t.eventDurationMS;
            return n
        }
    }), Le.compareSegs = me, Le.dataAttrPrefix = "";
    var on = sn.extend({
        numbersVisible: !1,
        bottomCoordPadding: 0,
        breakOnWeeks: null,
        cellDates: null,
        dayToCellOffsets: null,
        rowEls: null,
        dayEls: null,
        helperEls: null,
        constructor: function() {
            sn.apply(this, arguments), this.cellDuration = e.duration(1, "day")
        },
        renderDates: function(t) {
            var e, n, i, r = this.view,
                s = this.rowCnt,
                o = this.colCnt,
                l = s * o,
                a = "";
            for (e = 0; s > e; e++) a += this.dayRowHtml(e, t);
            for (this.el.html(a), this.rowEls = this.el.find(".fc-row"), this.dayEls = this.el.find(".fc-day"), n = 0; l > n; n++) i = this.getCell(n), r.trigger("dayRender", null, i.start, this.dayEls.eq(n))
        },
        destroyDates: function() {
            this.destroySegPopover()
        },
        renderBusinessHours: function() {
            var t = this.view.calendar.getBusinessHoursEvents(!0),
                e = this.eventsToSegs(t);
            this.renderFill("businessHours", e, "bgevent")
        },
        dayRowHtml: function(t, e) {
            var n = this.view,
                i = ["fc-row", "fc-week", n.widgetContentClass];
            return e && i.push("fc-rigid"), '<div class="' + i.join(" ") + '">' + '<div class="fc-bg">' + "<table>" + this.rowHtml("day", t) + "</table>" + "</div>" + '<div class="fc-content-skeleton">' + "<table>" + (this.numbersVisible ? "<thead>" + this.rowHtml("number", t) + "</thead>" : "") + "</table>" + "</div>" + "</div>"
        },
        dayCellHtml: function(t) {
            return this.bgCellHtml(t)
        },
        computeColHeadFormat: function() {
            return this.rowCnt > 1 ? "ddd" : this.colCnt > 1 ? this.view.opt("dayOfMonthFormat") : "dddd"
        },
        computeEventTimeFormat: function() {
            return this.view.opt("extraSmallTimeFormat")
        },
        computeDisplayEventEnd: function() {
            return 1 == this.colCnt
        },
        updateCells: function() {
            var t, e, n, i;
            if (this.updateCellDates(), t = this.cellDates, this.breakOnWeeks) {
                for (e = t[0].day(), i = 1; t.length > i && t[i].day() != e; i++);
                n = Math.ceil(t.length / i)
            } else n = 1, i = t.length;
            this.rowCnt = n, this.colCnt = i
        },
        updateCellDates: function() {
            for (var t = this.view, e = this.start.clone(), n = [], i = -1, r = []; e.isBefore(this.end);) t.isHiddenDay(e) ? r.push(i + .5) : (i++, r.push(i), n.push(e.clone())), e.add(1, "days");
            this.cellDates = n, this.dayToCellOffsets = r
        },
        computeCellDate: function(t) {
            var e = this.colCnt,
                n = t.row * e + (this.isRTL ? e - t.col - 1 : t.col);
            return this.cellDates[n].clone()
        },
        getRowEl: function(t) {
            return this.rowEls.eq(t)
        },
        getColEl: function(t) {
            return this.dayEls.eq(t)
        },
        getCellDayEl: function(t) {
            return this.dayEls.eq(t.row * this.colCnt + t.col)
        },
        computeRowCoords: function() {
            var t = sn.prototype.computeRowCoords.call(this);
            return t[t.length - 1].bottom += this.bottomCoordPadding, t
        },
        rangeToSegs: function(t) {
            var e, n, i, r, s, o, l, a, u, c, d = this.isRTL,
                h = this.rowCnt,
                f = this.colCnt,
                g = [];
            for (t = this.view.computeDayRange(t), e = this.dateToCellOffset(t.start), n = this.dateToCellOffset(t.end.subtract(1, "days")), i = 0; h > i; i++) r = i * f, s = r + f - 1, a = Math.max(r, e), u = Math.min(s, n), a = Math.ceil(a), u = Math.floor(u), u >= a && (o = a === e, l = u === n, a -= r, u -= r, c = {
                row: i,
                isStart: o,
                isEnd: l
            }, d ? (c.leftCol = f - u - 1, c.rightCol = f - a - 1) : (c.leftCol = a, c.rightCol = u), g.push(c));
            return g
        },
        dateToCellOffset: function(t) {
            var e = this.dayToCellOffsets,
                n = t.diff(this.start, "days");
            return 0 > n ? e[0] - 1 : n >= e.length ? e[e.length - 1] + 1 : e[n]
        },
        renderDrag: function(t, e) {
            return this.renderHighlight(this.view.calendar.ensureVisibleEventRange(t)), e && !e.el.closest(this.el).length ? (this.renderRangeHelper(t, e), this.applyDragOpacity(this.helperEls), !0) : void 0
        },
        destroyDrag: function() {
            this.destroyHighlight(), this.destroyHelper()
        },
        renderEventResize: function(t, e) {
            this.renderHighlight(t), this.renderRangeHelper(t, e)
        },
        destroyEventResize: function() {
            this.destroyHighlight(), this.destroyHelper()
        },
        renderHelper: function(e, n) {
            var i, r = [],
                s = this.eventsToSegs([e]);
            s = this.renderFgSegEls(s), i = this.renderSegRows(s), this.rowEls.each(function(e, s) {
                var o, l = t(s),
                    a = t('<div class="fc-helper-skeleton"><table/></div>');
                o = n && n.row === e ? n.el.position().top : l.find(".fc-content-skeleton tbody").position().top, a.css("top", o).find("table").append(i[e].tbodyEl), l.append(a), r.push(a[0])
            }), this.helperEls = t(r)
        },
        destroyHelper: function() {
            this.helperEls && (this.helperEls.remove(), this.helperEls = null)
        },
        fillSegTag: "td",
        renderFill: function(e, n, i) {
            var r, s, o, l = [];
            for (n = this.renderFillSegEls(e, n), r = 0; n.length > r; r++) s = n[r], o = this.renderFillRow(e, s, i), this.rowEls.eq(s.row).append(o), l.push(o[0]);
            return this.elsByFill[e] = t(l), n
        },
        renderFillRow: function(e, n, i) {
            var r, s, o = this.colCnt,
                l = n.leftCol,
                a = n.rightCol + 1;
            return i = i || e.toLowerCase(), r = t('<div class="fc-' + i + '-skeleton">' + "<table><tr/></table>" + "</div>"), s = r.find("tr"), l > 0 && s.append('<td colspan="' + l + '"/>'), s.append(n.el.attr("colspan", a - l)), o > a && s.append('<td colspan="' + (o - a) + '"/>'), this.bookendCells(s, e), r
        }
    });
    on.mixin({
        rowStructs: null,
        destroyEvents: function() {
            this.destroySegPopover(), sn.prototype.destroyEvents.apply(this, arguments)
        },
        getEventSegs: function() {
            return sn.prototype.getEventSegs.call(this).concat(this.popoverSegs || [])
        },
        renderBgSegs: function(e) {
            var n = t.grep(e, function(t) {
                return t.event.allDay
            });
            return sn.prototype.renderBgSegs.call(this, n)
        },
        renderFgSegs: function(e) {
            var n;
            return e = this.renderFgSegEls(e), n = this.rowStructs = this.renderSegRows(e), this.rowEls.each(function(e, i) {
                t(i).find(".fc-content-skeleton > table").append(n[e].tbodyEl)
            }), e
        },
        destroyFgSegs: function() {
            for (var t, e = this.rowStructs || []; t = e.pop();) t.tbodyEl.remove();
            this.rowStructs = null
        },
        renderSegRows: function(t) {
            var e, n, i = [];
            for (e = this.groupSegRows(t), n = 0; e.length > n; n++) i.push(this.renderSegRow(n, e[n]));
            return i
        },
        fgSegHtml: function(t, e) {
            var n, i, r = this.view,
                s = t.event,
                o = r.isEventDraggable(s),
                l = !e && s.allDay && t.isStart && r.isEventResizableFromStart(s),
                a = !e && s.allDay && t.isEnd && r.isEventResizableFromEnd(s),
                u = this.getSegClasses(t, o, l || a),
                c = W(this.getEventSkinCss(s)),
                d = "";
            return u.unshift("fc-day-grid-event", "fc-h-event"), t.isStart && (n = this.getEventTimeText(s), n && (d = '<span class="fc-time">' + Y(n) + "</span>")), i = '<span class="fc-title">' + (Y(s.title || "") || "&nbsp;") + "</span>", '<a class="' + u.join(" ") + '"' + (s.url ? ' href="' + Y(s.url) + '"' : "") + (c ? ' style="' + c + '"' : "") + ">" + '<div class="fc-content">' + (this.isRTL ? i + " " + d : d + " " + i) + "</div>" + (l ? '<div class="fc-resizer fc-start-resizer" />' : "") + (a ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>"
        },
        renderSegRow: function(e, n) {
            function i(e) {
                for (; e > o;) c = (v[r - 1] || [])[o], c ? c.attr("rowspan", parseInt(c.attr("rowspan") || 1, 10) + 1) : (c = t("<td/>"), l.append(c)), m[r][o] = c, v[r][o] = c, o++
            }
            var r, s, o, l, a, u, c, d = this.colCnt,
                h = this.buildSegLevels(n),
                f = Math.max(1, h.length),
                g = t("<tbody/>"),
                p = [],
                m = [],
                v = [];
            for (r = 0; f > r; r++) {
                if (s = h[r], o = 0, l = t("<tr/>"), p.push([]), m.push([]), v.push([]), s)
                    for (a = 0; s.length > a; a++) {
                        for (u = s[a], i(u.leftCol), c = t('<td class="fc-event-container"/>').append(u.el), u.leftCol != u.rightCol ? c.attr("colspan", u.rightCol - u.leftCol + 1) : v[r][o] = c; u.rightCol >= o;) m[r][o] = c, p[r][o] = u, o++;
                        l.append(c)
                    }
                i(d), this.bookendCells(l, "eventSkeleton"), g.append(l)
            }
            return {
                row: e,
                tbodyEl: g,
                cellMatrix: m,
                segMatrix: p,
                segLevels: h,
                segs: n
            }
        },
        buildSegLevels: function(t) {
            var e, n, i, r = [];
            for (t.sort(me), e = 0; t.length > e; e++) {
                for (n = t[e], i = 0; r.length > i && ye(n, r[i]); i++);
                n.level = i, (r[i] || (r[i] = [])).push(n)
            }
            for (i = 0; r.length > i; i++) r[i].sort(we);
            return r
        },
        groupSegRows: function(t) {
            var e, n = [];
            for (e = 0; this.rowCnt > e; e++) n.push([]);
            for (e = 0; t.length > e; e++) n[t[e].row].push(t[e]);
            return n
        }
    }), on.mixin({
        segPopover: null,
        popoverSegs: null,
        destroySegPopover: function() {
            this.segPopover && this.segPopover.hide()
        },
        limitRows: function(t) {
            var e, n, i = this.rowStructs || [];
            for (e = 0; i.length > e; e++) this.unlimitRow(e), n = t ? "number" == typeof t ? t : this.computeRowLevelLimit(e) : !1, n !== !1 && this.limitRow(e, n)
        },
        computeRowLevelLimit: function(e) {
            function n(e, n) {
                s = Math.max(s, t(n).outerHeight())
            }
            var i, r, s, o = this.rowEls.eq(e),
                l = o.height(),
                a = this.rowStructs[e].tbodyEl.children();
            for (i = 0; a.length > i; i++)
                if (r = a.eq(i).removeClass("fc-limited"), s = 0, r.find("> td > :first-child").each(n), r.position().top + s > l) return i;
            return !1
        },
        limitRow: function(e, n) {
            function i(i) {
                for (; i > D;) r = E.getCell(e, D), c = E.getCellSegs(r, n), c.length && (f = o[n - 1][D], w = E.renderMoreLink(r, c), y = t("<div/>").append(w), f.append(y), b.push(y[0])), D++
            }
            var r, s, o, l, a, u, c, d, h, f, g, p, m, v, y, w, E = this,
                S = this.rowStructs[e],
                b = [],
                D = 0;
            if (n && S.segLevels.length > n) {
                for (s = S.segLevels[n - 1], o = S.cellMatrix, l = S.tbodyEl.children().slice(n).addClass("fc-limited").get(), a = 0; s.length > a; a++) {
                    for (u = s[a], i(u.leftCol), h = [], d = 0; u.rightCol >= D;) r = this.getCell(e, D), c = this.getCellSegs(r, n), h.push(c), d += c.length, D++;
                    if (d) {
                        for (f = o[n - 1][u.leftCol], g = f.attr("rowspan") || 1, p = [], m = 0; h.length > m; m++) v = t('<td class="fc-more-cell"/>').attr("rowspan", g), c = h[m], r = this.getCell(e, u.leftCol + m), w = this.renderMoreLink(r, [u].concat(c)), y = t("<div/>").append(w), v.append(y), p.push(v[0]), b.push(v[0]);
                        f.addClass("fc-limited").after(t(p)), l.push(f[0])
                    }
                }
                i(this.colCnt), S.moreEls = t(b), S.limitedEls = t(l)
            }
        },
        unlimitRow: function(t) {
            var e = this.rowStructs[t];
            e.moreEls && (e.moreEls.remove(), e.moreEls = null), e.limitedEls && (e.limitedEls.removeClass("fc-limited"), e.limitedEls = null)
        },
        renderMoreLink: function(e, n) {
            var i = this,
                r = this.view;
            return t('<a class="fc-more"/>').text(this.getMoreLinkText(n.length)).on("click", function(s) {
                var o = r.opt("eventLimitClick"),
                    l = e.start,
                    a = t(this),
                    u = i.getCellDayEl(e),
                    c = i.getCellSegs(e),
                    d = i.resliceDaySegs(c, l),
                    h = i.resliceDaySegs(n, l);
                "function" == typeof o && (o = r.trigger("eventLimitClick", null, {
                    date: l,
                    dayEl: u,
                    moreEl: a,
                    segs: d,
                    hiddenSegs: h
                }, s)), "popover" === o ? i.showSegPopover(e, a, d) : "string" == typeof o && r.calendar.zoomTo(l, o)
            })
        },
        showSegPopover: function(t, e, n) {
            var i, r, s = this,
                o = this.view,
                l = e.parent();
            i = 1 == this.rowCnt ? o.el : this.rowEls.eq(t.row), r = {
                className: "fc-more-popover",
                content: this.renderSegPopoverContent(t, n),
                parentEl: this.el,
                top: i.offset().top,
                autoHide: !0,
                viewportConstrain: o.opt("popoverViewportConstrain"),
                hide: function() {
                    s.segPopover.destroy(), s.segPopover = null, s.popoverSegs = null
                }
            }, this.isRTL ? r.right = l.offset().left + l.outerWidth() + 1 : r.left = l.offset().left - 1, this.segPopover = new Ke(r), this.segPopover.show()
        },
        renderSegPopoverContent: function(e, n) {
            var i, r = this.view,
                s = r.opt("theme"),
                o = e.start.format(r.opt("dayPopoverFormat")),
                l = t('<div class="fc-header ' + r.widgetHeaderClass + '">' + '<span class="fc-close ' + (s ? "ui-icon ui-icon-closethick" : "fc-icon fc-icon-x") + '"></span>' + '<span class="fc-title">' + Y(o) + "</span>" + '<div class="fc-clear"/>' + "</div>" + '<div class="fc-body ' + r.widgetContentClass + '">' + '<div class="fc-event-container"></div>' + "</div>"),
                a = l.find(".fc-event-container");
            for (n = this.renderFgSegEls(n, !0), this.popoverSegs = n, i = 0; n.length > i; i++) n[i].cell = e, a.append(n[i].el);
            return l
        },
        resliceDaySegs: function(e, n) {
            var i = t.map(e, function(t) {
                return t.event
            }),
                r = n.clone().stripTime(),
                s = r.clone().add(1, "days"),
                o = {
                    start: r,
                    end: s
                };
            return e = this.eventsToSegs(i, function(t) {
                var e = H(t, o);
                return e ? [e] : []
            }), e.sort(me), e
        },
        getMoreLinkText: function(t) {
            var e = this.view.opt("eventLimitText");
            return "function" == typeof e ? e(t) : "+" + t + " " + e
        },
        getCellSegs: function(t, e) {
            for (var n, i = this.rowStructs[t.row].segMatrix, r = e || 0, s = []; i.length > r;) n = i[r][t.col], n && s.push(n), r++;
            return s
        }
    });
    var ln = sn.extend({
        slotDuration: null,
        snapDuration: null,
        minTime: null,
        maxTime: null,
        axisFormat: null,
        dayEls: null,
        slatEls: null,
        slatTops: null,
        helperEl: null,
        businessHourSegs: null,
        constructor: function() {
            sn.apply(this, arguments), this.processOptions()
        },
        renderDates: function() {
            this.el.html(this.renderHtml()), this.dayEls = this.el.find(".fc-day"), this.slatEls = this.el.find(".fc-slats tr")
        },
        renderBusinessHours: function() {
            var t = this.view.calendar.getBusinessHoursEvents();
            this.businessHourSegs = this.renderFill("businessHours", this.eventsToSegs(t), "bgevent")
        },
        renderHtml: function() {
            return '<div class="fc-bg"><table>' + this.rowHtml("slotBg") + "</table>" + "</div>" + '<div class="fc-slats">' + "<table>" + this.slatRowHtml() + "</table>" + "</div>"
        },
        slotBgCellHtml: function(t) {
            return this.bgCellHtml(t)
        },
        slatRowHtml: function() {
            for (var t, n, i, r = this.view, s = this.isRTL, o = "", l = 0 === this.slotDuration.asMinutes() % 15, a = e.duration(+this.minTime); this.maxTime > a;) t = this.start.clone().time(a), n = t.minutes(), i = '<td class="fc-axis fc-time ' + r.widgetContentClass + '" ' + r.axisStyleAttr() + ">" + (l && n ? "" : "<span>" + Y(t.format(this.axisFormat)) + "</span>") + "</td>", o += "<tr " + (n ? 'class="fc-minor"' : "") + ">" + (s ? "" : i) + '<td class="' + r.widgetContentClass + '"/>' + (s ? i : "") + "</tr>", a.add(this.slotDuration);
            return o
        },
        processOptions: function() {
            var t = this.view,
                n = t.opt("slotDuration"),
                i = t.opt("snapDuration");
            n = e.duration(n), i = i ? e.duration(i) : n, this.slotDuration = n, this.snapDuration = i, this.cellDuration = i, this.minTime = e.duration(t.opt("minTime")), this.maxTime = e.duration(t.opt("maxTime")), this.axisFormat = t.opt("axisFormat") || t.opt("smallTimeFormat")
        },
        computeColHeadFormat: function() {
            return this.colCnt > 1 ? this.view.opt("dayOfMonthFormat") : "dddd"
        },
        computeEventTimeFormat: function() {
            return this.view.opt("noMeridiemTimeFormat")
        },
        computeDisplayEventEnd: function() {
            return !0
        },
        updateCells: function() {
            var t, e = this.view,
                n = [];
            for (t = this.start.clone(); t.isBefore(this.end);) n.push({
                day: t.clone()
            }), t.add(1, "day"), t = e.skipHiddenDays(t);
            this.isRTL && n.reverse(), this.colData = n, this.colCnt = n.length, this.rowCnt = Math.ceil((this.maxTime - this.minTime) / this.snapDuration)
        },
        computeCellDate: function(t) {
            var e = this.computeSnapTime(t.row);
            return this.view.calendar.rezoneDate(t.day).time(e)
        },
        getColEl: function(t) {
            return this.dayEls.eq(t)
        },
        computeSnapTime: function(t) {
            return e.duration(this.minTime + this.snapDuration * t)
        },
        rangeToSegs: function(t) {
            var e, n, i, r, s = this.colCnt,
                o = [];
            for (t = {
                start: t.start.clone().stripZone(),
                end: t.end.clone().stripZone()
            }, n = 0; s > n; n++) i = this.colData[n].day, r = {
                start: i.clone().time(this.minTime),
                end: i.clone().time(this.maxTime)
            }, e = H(t, r), e && (e.col = n, o.push(e));
            return o
        },
        updateSize: function(t) {
            this.computeSlatTops(), t && this.updateSegVerticals()
        },
        computeRowCoords: function() {
            var t, e, n = this.el.offset().top,
                i = [];
            for (t = 0; this.rowCnt > t; t++) e = {
                top: n + this.computeTimeTop(this.computeSnapTime(t))
            }, t > 0 && (i[t - 1].bottom = e.top), i.push(e);
            return e.bottom = e.top + this.computeTimeTop(this.computeSnapTime(t)), i
        },
        computeDateTop: function(t, n) {
            return this.computeTimeTop(e.duration(t.clone().stripZone() - n.clone().stripTime()))
        },
        computeTimeTop: function(t) {
            var e, n, i, r, s = (t - this.minTime) / this.slotDuration;
            return s = Math.max(0, s), s = Math.min(this.slatEls.length, s), e = Math.floor(s), n = s - e, i = this.slatTops[e], n ? (r = this.slatTops[e + 1], i + (r - i) * n) : i
        },
        computeSlatTops: function() {
            var e, n = [];
            this.slatEls.each(function(i, r) {
                e = t(r).position().top, n.push(e)
            }), n.push(e + this.slatEls.last().outerHeight()), this.slatTops = n
        },
        renderDrag: function(t, e) {
            return e ? (this.renderRangeHelper(t, e), this.applyDragOpacity(this.helperEl), !0) : (this.renderHighlight(this.view.calendar.ensureVisibleEventRange(t)), void 0)
        },
        destroyDrag: function() {
            this.destroyHelper(), this.destroyHighlight()
        },
        renderEventResize: function(t, e) {
            this.renderRangeHelper(t, e)
        },
        destroyEventResize: function() {
            this.destroyHelper()
        },
        renderHelper: function(e, n) {
            var i, r, s, o, l = this.eventsToSegs([e]);
            for (l = this.renderFgSegEls(l), i = this.renderSegTable(l), r = 0; l.length > r; r++) s = l[r], n && n.col === s.col && (o = n.el, s.el.css({
                left: o.css("left"),
                right: o.css("right"),
                "margin-left": o.css("margin-left"),
                "margin-right": o.css("margin-right")
            }));
            this.helperEl = t('<div class="fc-helper-skeleton"/>').append(i).appendTo(this.el)
        },
        destroyHelper: function() {
            this.helperEl && (this.helperEl.remove(), this.helperEl = null)
        },
        renderSelection: function(t) {
            this.view.opt("selectHelper") ? this.renderRangeHelper(t) : this.renderHighlight(t)
        },
        destroySelection: function() {
            this.destroyHelper(), this.destroyHighlight()
        },
        renderFill: function(e, n, i) {
            var r, s, o, l, a, u, c, d, h, f;
            if (n.length) {
                for (n = this.renderFillSegEls(e, n), r = this.groupSegCols(n), i = i || e.toLowerCase(), s = t('<div class="fc-' + i + '-skeleton">' + "<table><tr/></table>" + "</div>"), o = s.find("tr"), l = 0; r.length > l; l++)
                    if (a = r[l], u = t("<td/>").appendTo(o), a.length)
                        for (c = t('<div class="fc-' + i + '-container"/>').appendTo(u), d = this.colData[l].day, h = 0; a.length > h; h++) f = a[h], c.append(f.el.css({
                            top: this.computeDateTop(f.start, d),
                            bottom: -this.computeDateTop(f.end, d)
                        }));
                this.bookendCells(o, e), this.el.append(s), this.elsByFill[e] = s
            }
            return n
        }
    });
    ln.mixin({
        eventSkeletonEl: null,
        renderFgSegs: function(e) {
            return e = this.renderFgSegEls(e), this.el.append(this.eventSkeletonEl = t('<div class="fc-content-skeleton"/>').append(this.renderSegTable(e))), e
        },
        destroyFgSegs: function() {
            this.eventSkeletonEl && (this.eventSkeletonEl.remove(), this.eventSkeletonEl = null)
        },
        renderSegTable: function(e) {
            var n, i, r, s, o, l, a = t("<table><tr/></table>"),
                u = a.find("tr");
            for (n = this.groupSegCols(e), this.computeSegVerticals(e), s = 0; n.length > s; s++) {
                for (o = n[s], Ee(o), l = t('<div class="fc-event-container"/>'), i = 0; o.length > i; i++) r = o[i], r.el.css(this.generateSegPositionCss(r)), 30 > r.bottom - r.top && r.el.addClass("fc-short"), l.append(r.el);
                u.append(t("<td/>").append(l))
            }
            return this.bookendCells(u, "eventSkeleton"), a
        },
        updateSegVerticals: function() {
            var t, e = (this.segs || []).concat(this.businessHourSegs || []);
            for (this.computeSegVerticals(e), t = 0; e.length > t; t++) e[t].el.css(this.generateSegVerticalCss(e[t]))
        },
        computeSegVerticals: function(t) {
            var e, n;
            for (e = 0; t.length > e; e++) n = t[e], n.top = this.computeDateTop(n.start, n.start), n.bottom = this.computeDateTop(n.end, n.start)
        },
        fgSegHtml: function(t, e) {
            var n, i, r, s = this.view,
                o = t.event,
                l = s.isEventDraggable(o),
                a = !e && t.isStart && s.isEventResizableFromStart(o),
                u = !e && t.isEnd && s.isEventResizableFromEnd(o),
                c = this.getSegClasses(t, l, a || u),
                d = W(this.getEventSkinCss(o));
            return c.unshift("fc-time-grid-event", "fc-v-event"), s.isMultiDayEvent(o) ? (t.isStart || t.isEnd) && (n = this.getEventTimeText(t), i = this.getEventTimeText(t, "LT"), r = this.getEventTimeText(t, null, !1)) : (n = this.getEventTimeText(o), i = this.getEventTimeText(o, "LT"), r = this.getEventTimeText(o, null, !1)), '<a class="' + c.join(" ") + '"' + (o.url ? ' href="' + Y(o.url) + '"' : "") + (d ? ' style="' + d + '"' : "") + ">" + '<div class="fc-content">' + (n ? '<div class="fc-time" data-start="' + Y(r) + '"' + ' data-full="' + Y(i) + '"' + ">" + "<span>" + Y(n) + "</span>" + "</div>" : "") + (o.title ? '<div class="fc-title">' + Y(o.title) + "</div>" : "") + "</div>" + '<div class="fc-bg"/>' + (u ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>"
        },
        generateSegPositionCss: function(t) {
            var e, n, i = this.view.opt("slotEventOverlap"),
                r = t.backwardCoord,
                s = t.forwardCoord,
                o = this.generateSegVerticalCss(t);
            return i && (s = Math.min(1, r + 2 * (s - r))), this.isRTL ? (e = 1 - s, n = r) : (e = r, n = 1 - s), o.zIndex = t.level + 1, o.left = 100 * e + "%", o.right = 100 * n + "%", i && t.forwardPressure && (o[this.isRTL ? "marginLeft" : "marginRight"] = 20), o
        },
        generateSegVerticalCss: function(t) {
            return {
                top: t.top,
                bottom: -t.bottom
            }
        },
        groupSegCols: function(t) {
            var e, n = [];
            for (e = 0; this.colCnt > e; e++) n.push([]);
            for (e = 0; t.length > e; e++) n[t[e].col].push(t[e]);
            return n
        }
    });
    var an = Le.View = ue.extend({
        type: null,
        name: null,
        title: null,
        calendar: null,
        options: null,
        coordMap: null,
        el: null,
        isDisplayed: !1,
        isSkeletonRendered: !1,
        isEventsRendered: !1,
        start: null,
        end: null,
        intervalStart: null,
        intervalEnd: null,
        intervalDuration: null,
        intervalUnit: null,
        isSelected: !1,
        scrollerEl: null,
        scrollTop: null,
        widgetHeaderClass: null,
        widgetContentClass: null,
        highlightStateClass: null,
        nextDayThreshold: null,
        isHiddenDayHash: null,
        documentMousedownProxy: null,
        constructor: function(t, n, i, r) {
            this.calendar = t, this.type = this.name = n, this.options = i, this.intervalDuration = r || e.duration(1, "day"), this.nextDayThreshold = e.duration(this.opt("nextDayThreshold")), this.initThemingProps(), this.initHiddenDays(), this.documentMousedownProxy = q(this, "documentMousedown"), this.initialize()
        },
        initialize: function() {},
        opt: function(t) {
            return this.options[t]
        },
        trigger: function(t, e) {
            var n = this.calendar;
            return n.trigger.apply(n, [t, e || this].concat(Array.prototype.slice.call(arguments, 2), [this]))
        },
        setDate: function(t) {
            this.setRange(this.computeRange(t))
        },
        setRange: function(e) {
            t.extend(this, e), this.updateTitle()
        },
        computeRange: function(t) {
            var e, n, i = M(this.intervalDuration),
                r = t.clone().startOf(i),
                s = r.clone().add(this.intervalDuration);
            return /year|month|week|day/.test(i) ? (r.stripTime(), s.stripTime()) : (r.hasTime() || (r = this.calendar.rezoneDate(r)), s.hasTime() || (s = this.calendar.rezoneDate(s))), e = r.clone(), e = this.skipHiddenDays(e), n = s.clone(), n = this.skipHiddenDays(n, -1, !0), {
                intervalUnit: i,
                intervalStart: r,
                intervalEnd: s,
                start: e,
                end: n
            }
        },
        computePrevDate: function(t) {
            return this.massageCurrentDate(t.clone().startOf(this.intervalUnit).subtract(this.intervalDuration), -1)
        },
        computeNextDate: function(t) {
            return this.massageCurrentDate(t.clone().startOf(this.intervalUnit).add(this.intervalDuration))
        },
        massageCurrentDate: function(t, e) {
            return 1 >= this.intervalDuration.as("days") && this.isHiddenDay(t) && (t = this.skipHiddenDays(t, e), t.startOf("day")), t
        },
        updateTitle: function() {
            this.title = this.computeTitle()
        },
        computeTitle: function() {
            return this.formatRange({
                start: this.intervalStart,
                end: this.intervalEnd
            }, this.opt("titleFormat") || this.computeTitleFormat(), this.opt("titleRangeSeparator"))
        },
        computeTitleFormat: function() {
            return "year" == this.intervalUnit ? "YYYY" : "month" == this.intervalUnit ? this.opt("monthYearFormat") : this.intervalDuration.as("days") > 1 ? "ll" : "LL"
        },
        formatRange: function(t, e, n) {
            var i = t.end;
            return i.hasTime() || (i = i.clone().subtract(1)), re(t.start, i, e, n, this.opt("isRTL"))
        },
        setElement: function(t) {
            this.el = t, this.bindGlobalHandlers()
        },
        removeElement: function() {
            this.clear(), this.isSkeletonRendered && (this.destroySkeleton(), this.isSkeletonRendered = !1), this.unbindGlobalHandlers(), this.el.remove()
        },
        display: function(t) {
            var e = null;
            this.isDisplayed && (e = this.queryScroll()), this.clear(), this.setDate(t), this.render(), this.updateSize(), this.renderBusinessHours(), this.isDisplayed = !0, e = this.computeInitialScroll(e), this.forceScroll(e), this.triggerRender()
        },
        clear: function() {
            this.isDisplayed && (this.unselect(), this.clearEvents(), this.triggerDestroy(), this.destroyBusinessHours(), this.destroy(), this.isDisplayed = !1)
        },
        render: function() {
            this.isSkeletonRendered || (this.renderSkeleton(), this.isSkeletonRendered = !0), this.renderDates()
        },
        destroy: function() {
            this.destroyDates()
        },
        renderSkeleton: function() {},
        destroySkeleton: function() {},
        renderDates: function() {},
        destroyDates: function() {},
        renderBusinessHours: function() {},
        destroyBusinessHours: function() {},
        triggerRender: function() {
            this.trigger("viewRender", this, this, this.el)
        },
        triggerDestroy: function() {
            this.trigger("viewDestroy", this, this, this.el)
        },
        bindGlobalHandlers: function() {
            t(document).on("mousedown", this.documentMousedownProxy)
        },
        unbindGlobalHandlers: function() {
            t(document).off("mousedown", this.documentMousedownProxy)
        },
        initThemingProps: function() {
            var t = this.opt("theme") ? "ui" : "fc";
            this.widgetHeaderClass = t + "-widget-header", this.widgetContentClass = t + "-widget-content", this.highlightStateClass = t + "-state-highlight"
        },
        updateSize: function(t) {
            var e;
            t && (e = this.queryScroll()), this.updateHeight(), this.updateWidth(), t && this.setScroll(e)
        },
        updateWidth: function() {},
        updateHeight: function() {
            var t = this.calendar;
            this.setHeight(t.getSuggestedViewHeight(), t.isHeightAuto())
        },
        setHeight: function() {},
        computeScrollerHeight: function(t) {
            var e, n, i = this.scrollerEl;
            return e = this.el.add(i), e.css({
                position: "relative",
                left: -1
            }), n = this.el.outerHeight() - i.height(), e.css({
                position: "",
                left: ""
            }), t - n
        },
        computeInitialScroll: function() {
            return 0
        },
        queryScroll: function() {
            return this.scrollerEl ? this.scrollerEl.scrollTop() : void 0
        },
        setScroll: function(t) {
            return this.scrollerEl ? this.scrollerEl.scrollTop(t) : void 0
        },
        forceScroll: function(t) {
            var e = this;
            this.setScroll(t), setTimeout(function() {
                e.setScroll(t)
            }, 0)
        },
        displayEvents: function(t) {
            var e = this.queryScroll();
            this.clearEvents(), this.renderEvents(t), this.isEventsRendered = !0, this.setScroll(e), this.triggerEventRender()
        },
        clearEvents: function() {
            this.isEventsRendered && (this.triggerEventDestroy(), this.destroyEvents(), this.isEventsRendered = !1)
        },
        renderEvents: function() {},
        destroyEvents: function() {},
        triggerEventRender: function() {
            this.renderedEventSegEach(function(t) {
                this.trigger("eventAfterRender", t.event, t.event, t.el)
            }), this.trigger("eventAfterAllRender")
        },
        triggerEventDestroy: function() {
            this.renderedEventSegEach(function(t) {
                this.trigger("eventDestroy", t.event, t.event, t.el)
            })
        },
        resolveEventEl: function(e, n) {
            var i = this.trigger("eventRender", e, e, n);
            return i === !1 ? n = null : i && i !== !0 && (n = t(i)), n
        },
        showEvent: function(t) {
            this.renderedEventSegEach(function(t) {
                t.el.css("visibility", "")
            }, t)
        },
        hideEvent: function(t) {
            this.renderedEventSegEach(function(t) {
                t.el.css("visibility", "hidden")
            }, t)
        },
        renderedEventSegEach: function(t, e) {
            var n, i = this.getEventSegs();
            for (n = 0; i.length > n; n++) e && i[n].event._id !== e._id || i[n].el && t.call(this, i[n])
        },
        getEventSegs: function() {
            return []
        },
        isEventDraggable: function(t) {
            var e = t.source || {};
            return B(t.startEditable, e.startEditable, this.opt("eventStartEditable"), t.editable, e.editable, this.opt("editable"))
        },
        reportEventDrop: function(t, e, n, i, r) {
            var s = this.calendar,
                o = s.mutateEvent(t, e, n),
                l = function() {
                    o.undo(), s.reportEventChange()
                };
            this.triggerEventDrop(t, o.dateDelta, l, i, r), s.reportEventChange()
        },
        triggerEventDrop: function(t, e, n, i, r) {
            this.trigger("eventDrop", i[0], t, e, n, r, {})
        },
        reportExternalDrop: function(e, n, i, r, s) {
            var o, l, a = e.eventProps;
            a && (o = t.extend({}, a, n), l = this.calendar.renderEvent(o, e.stick)[0]), this.triggerExternalDrop(l, n, i, r, s)
        },
        triggerExternalDrop: function(t, e, n, i, r) {
            this.trigger("drop", n[0], e.start, i, r), t && this.trigger("eventReceive", null, t)
        },
        renderDrag: function() {},
        destroyDrag: function() {},
        isEventResizableFromStart: function(t) {
            return this.opt("eventResizableFromStart") && this.isEventResizable(t)
        },
        isEventResizableFromEnd: function(t) {
            return this.isEventResizable(t)
        },
        isEventResizable: function(t) {
            var e = t.source || {};
            return B(t.durationEditable, e.durationEditable, this.opt("eventDurationEditable"), t.editable, e.editable, this.opt("editable"))
        },
        reportEventResize: function(t, e, n, i, r) {
            var s = this.calendar,
                o = s.mutateEvent(t, e, n),
                l = function() {
                    o.undo(), s.reportEventChange()
                };
            this.triggerEventResize(t, o.durationDelta, l, i, r), s.reportEventChange()
        },
        triggerEventResize: function(t, e, n, i, r) {
            this.trigger("eventResize", i[0], t, e, n, r, {})
        },
        select: function(t, e) {
            this.unselect(e), this.renderSelection(t), this.reportSelection(t, e)
        },
        renderSelection: function() {},
        reportSelection: function(t, e) {
            this.isSelected = !0, this.trigger("select", null, t.start, t.end, e)
        },
        unselect: function(t) {
            this.isSelected && (this.isSelected = !1, this.destroySelection(), this.trigger("unselect", null, t))
        },
        destroySelection: function() {},
        documentMousedown: function(e) {
            var n;
            this.isSelected && this.opt("unselectAuto") && S(e) && (n = this.opt("unselectCancel"), n && t(e.target).closest(n).length || this.unselect(e))
        },
        initHiddenDays: function() {
            var e, n = this.opt("hiddenDays") || [],
                i = [],
                r = 0;
            for (this.opt("weekends") === !1 && n.push(0, 6), e = 0; 7 > e; e++)(i[e] = -1 !== t.inArray(e, n)) || r++;
            if (!r) throw "invalid hiddenDays";
            this.isHiddenDayHash = i
        },
        isHiddenDay: function(t) {
            return e.isMoment(t) && (t = t.day()), this.isHiddenDayHash[t]
        },
        skipHiddenDays: function(t, e, n) {
            var i = t.clone();
            for (e = e || 1; this.isHiddenDayHash[(i.day() + (n ? e : 0) + 7) % 7];) i.add(e, "days");
            return i
        },
        computeDayRange: function(t) {
            var e, n = t.start.clone().stripTime(),
                i = t.end,
                r = null;
            return i && (r = i.clone().stripTime(), e = +i.time(), e && e >= this.nextDayThreshold && r.add(1, "days")), (!i || n >= r) && (r = n.clone().add(1, "days")), {
                start: n,
                end: r
            }
        },
        isMultiDayEvent: function(t) {
            var e = this.computeDayRange(t);
            return e.end.diff(e.start, "days") > 1
        }
    }),
        un = Le.Calendar = Le.CalendarBase = ue.extend({
            dirDefaults: null,
            langDefaults: null,
            overrides: null,
            options: null,
            viewSpecCache: null,
            view: null,
            header: null,
            constructor: Re,
            initOptions: function(t) {
                var e, r, s, o;
                t = i(t), e = t.lang, r = cn[e], r || (e = un.defaults.lang, r = cn[e] || {}), s = B(t.isRTL, r.isRTL, un.defaults.isRTL), o = s ? un.rtlDefaults : {}, this.dirDefaults = o, this.langDefaults = r, this.overrides = t, this.options = n(un.defaults, o, r, t), ke(this.options), this.viewSpecCache = {}
            },
            getViewSpec: function(t) {
                var e = this.viewSpecCache;
                return e[t] || (e[t] = this.buildViewSpec(t))
            },
            getUnitViewSpec: function(e) {
                var n, i, r;
                if (-1 != t.inArray(e, Ye))
                    for (n = this.header.getViewsWithButtons(), t.each(Le.views, function(t) {
                        n.push(t)
                    }), i = 0; n.length > i; i++)
                        if (r = this.getViewSpec(n[i]), r && r.singleUnit == e) return r
            },
            buildViewSpec: function(t) {
                for (var i, r, s, o, l, a, u = this.overrides.views || {}, c = [], d = [], h = t; h && !i;) r = _e[h] || {}, s = u[h] || {}, o = o || s.duration || r.duration, h = s.type || r.type, "function" == typeof r ? (i = r, c.unshift(i.defaults || {})) : c.unshift(r), d.unshift(s);
                return i ? (a = {
                    "class": i,
                    type: t
                }, o && (o = e.duration(o), o.valueOf() || (o = null)), o && (a.duration = o, l = M(o), 1 === o.as(l) && (a.singleUnit = l, d.unshift(u[l] || {}))), a.defaults = n.apply(null, c), a.overrides = n.apply(null, d), this.buildViewSpecOptions(a), this.buildViewSpecButtonText(a, t), a) : void 0
            },
            buildViewSpecOptions: function(t) {
                t.options = n(un.defaults, t.defaults, this.dirDefaults, this.langDefaults, this.overrides, t.overrides), ke(t.options)
            },
            buildViewSpecButtonText: function(t, e) {
                function n(n) {
                    var i = n.buttonText || {};
                    return i[e] || (t.singleUnit ? i[t.singleUnit] : null)
                }
                t.buttonTextOverride = n(this.overrides) || t.overrides.buttonText, t.buttonTextDefault = n(this.langDefaults) || n(this.dirDefaults) || t.defaults.buttonText || n(un.defaults) || (t.duration ? this.humanizeDuration(t.duration) : null) || e
            },
            instantiateView: function(t) {
                var e = this.getViewSpec(t);
                return new e["class"](this, t, e.options, e.duration)
            },
            isValidViewType: function(t) {
                return Boolean(this.getViewSpec(t))
            }
        });
    un.defaults = {
        titleRangeSeparator: " — ",
        monthYearFormat: "MMMM YYYY",
        defaultTimedEventDuration: "02:00:00",
        defaultAllDayEventDuration: {
            days: 1
        },
        forceEventDuration: !1,
        nextDayThreshold: "09:00:00",
        defaultView: "month",
        aspectRatio: 1.35,
        header: {
            left: "title",
            center: "",
            right: "today prev,next"
        },
        weekends: !0,
        weekNumbers: !1,
        weekNumberTitle: "W",
        weekNumberCalculation: "local",
        lazyFetching: !0,
        startParam: "start",
        endParam: "end",
        timezoneParam: "timezone",
        timezone: !1,
        isRTL: !1,
        buttonText: {
            prev: "prev",
            next: "next",
            prevYear: "prev year",
            nextYear: "next year",
            year: "year",
            today: "today",
            month: "month",
            week: "week",
            day: "day"
        },
        buttonIcons: {
            prev: "left-single-arrow",
            next: "right-single-arrow",
            prevYear: "left-double-arrow",
            nextYear: "right-double-arrow"
        },
        theme: !1,
        themeButtonIcons: {
            prev: "circle-triangle-w",
            next: "circle-triangle-e",
            prevYear: "seek-prev",
            nextYear: "seek-next"
        },
        dragOpacity: .75,
        dragRevertDuration: 500,
        dragScroll: !0,
        unselectAuto: !0,
        dropAccept: "*",
        eventLimit: !1,
        eventLimitText: "more",
        eventLimitClick: "popover",
        dayPopoverFormat: "LL",
        handleWindowResize: !0,
        windowResizeDelay: 200
    }, un.englishDefaults = {
        dayPopoverFormat: "dddd, MMMM D"
    }, un.rtlDefaults = {
        header: {
            left: "next,prev today",
            center: "",
            right: "title"
        },
        buttonIcons: {
            prev: "right-single-arrow",
            next: "left-single-arrow",
            prevYear: "right-double-arrow",
            nextYear: "left-double-arrow"
        },
        themeButtonIcons: {
            prev: "circle-triangle-e",
            next: "circle-triangle-w",
            nextYear: "seek-prev",
            prevYear: "seek-next"
        }
    };
    var cn = Le.langs = {};
    Le.datepickerLang = function(e, n, i) {
        var r = cn[e] || (cn[e] = {});
        r.isRTL = i.isRTL, r.weekNumberTitle = i.weekHeader, t.each(dn, function(t, e) {
            r[t] = e(i)
        }), t.datepicker && (t.datepicker.regional[n] = t.datepicker.regional[e] = i, t.datepicker.regional.en = t.datepicker.regional[""], t.datepicker.setDefaults(i))
    }, Le.lang = function(e, i) {
        var r, s;
        r = cn[e] || (cn[e] = {}), i && (r = cn[e] = n(r, i)), s = Me(e), t.each(hn, function(t, e) {
            null == r[t] && (r[t] = e(s, r))
        }), un.defaults.lang = e
    };
    var dn = {
        buttonText: function(t) {
            return {
                prev: I(t.prevText),
                next: I(t.nextText),
                today: I(t.currentText)
            }
        },
        monthYearFormat: function(t) {
            return t.showMonthAfterYear ? "YYYY[" + t.yearSuffix + "] MMMM" : "MMMM YYYY[" + t.yearSuffix + "]"
        }
    }, hn = {
            dayOfMonthFormat: function(t, e) {
                var n = t.longDateFormat("l");
                return n = n.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g, ""), e.isRTL ? n += " ddd" : n = "ddd " + n, n
            },
            mediumTimeFormat: function(t) {
                return t.longDateFormat("LT").replace(/\s*a$/i, "a")
            },
            smallTimeFormat: function(t) {
                return t.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "a")
            },
            extraSmallTimeFormat: function(t) {
                return t.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "t")
            },
            hourFormat: function(t) {
                return t.longDateFormat("LT").replace(":mm", "").replace(/(\Wmm)$/, "").replace(/\s*a$/i, "a")
            },
            noMeridiemTimeFormat: function(t) {
                return t.longDateFormat("LT").replace(/\s*a$/i, "")
            }
        }, fn = {
            smallDayDateFormat: function(t) {
                return t.isRTL ? "D dd" : "dd D"
            },
            weekFormat: function(t) {
                return t.isRTL ? "w[ " + t.weekNumberTitle + "]" : "[" + t.weekNumberTitle + " ]w"
            },
            smallWeekFormat: function(t) {
                return t.isRTL ? "w[" + t.weekNumberTitle + "]" : "[" + t.weekNumberTitle + "]w"
            }
        };
    Le.lang("en", un.englishDefaults), Le.sourceNormalizers = [], Le.sourceFetchers = [];
    var gn = {
        dataType: "json",
        cache: !1
    }, pn = 1;
    un.prototype.getPeerEvents = function(t) {
        var e, n, i = this.getEventCache(),
            r = [];
        for (e = 0; i.length > e; e++) n = i[e], t && t._id === n._id || r.push(n);
        return r
    };
    var mn = _e.basic = an.extend({
        dayGrid: null,
        dayNumbersVisible: !1,
        weekNumbersVisible: !1,
        weekNumberWidth: null,
        headRowEl: null,
        initialize: function() {
            this.dayGrid = new on(this), this.coordMap = this.dayGrid.coordMap
        },
        setRange: function(t) {
            an.prototype.setRange.call(this, t), this.dayGrid.breakOnWeeks = /year|month|week/.test(this.intervalUnit), this.dayGrid.setRange(t)
        },
        computeRange: function(t) {
            var e = an.prototype.computeRange.call(this, t);
            return /year|month/.test(e.intervalUnit) && (e.start.startOf("week"), e.start = this.skipHiddenDays(e.start), e.end.weekday() && (e.end.add(1, "week").startOf("week"), e.end = this.skipHiddenDays(e.end, -1, !0))), e
        },
        render: function() {
            this.dayNumbersVisible = this.dayGrid.rowCnt > 1, this.weekNumbersVisible = this.opt("weekNumbers"), this.dayGrid.numbersVisible = this.dayNumbersVisible || this.weekNumbersVisible, this.el.addClass("fc-basic-view").html(this.renderHtml()), this.headRowEl = this.el.find("thead .fc-row"), this.scrollerEl = this.el.find(".fc-day-grid-container"), this.dayGrid.coordMap.containerEl = this.scrollerEl, this.dayGrid.setElement(this.el.find(".fc-day-grid")), this.dayGrid.renderDates(this.hasRigidRows())
        },
        destroy: function() {
            this.dayGrid.destroyDates(), this.dayGrid.removeElement()
        },
        renderBusinessHours: function() {
            this.dayGrid.renderBusinessHours()
        },
        renderHtml: function() {
            return '<table><thead class="fc-head"><tr><td class="' + this.widgetHeaderClass + '">' + this.dayGrid.headHtml() + "</td>" + "</tr>" + "</thead>" + '<tbody class="fc-body">' + "<tr>" + '<td class="' + this.widgetContentClass + '">' + '<div class="fc-day-grid-container">' + '<div class="fc-day-grid"/>' + "</div>" + "</td>" + "</tr>" + "</tbody>" + "</table>"
        },
        headIntroHtml: function() {
            return this.weekNumbersVisible ? '<th class="fc-week-number ' + this.widgetHeaderClass + '" ' + this.weekNumberStyleAttr() + ">" + "<span>" + Y(this.opt("weekNumberTitle")) + "</span>" + "</th>" : void 0
        },
        numberIntroHtml: function(t) {
            return this.weekNumbersVisible ? '<td class="fc-week-number" ' + this.weekNumberStyleAttr() + ">" + "<span>" + this.dayGrid.getCell(t, 0).start.format("w") + "</span>" + "</td>" : void 0
        },
        dayIntroHtml: function() {
            return this.weekNumbersVisible ? '<td class="fc-week-number ' + this.widgetContentClass + '" ' + this.weekNumberStyleAttr() + "></td>" : void 0
        },
        introHtml: function() {
            return this.weekNumbersVisible ? '<td class="fc-week-number" ' + this.weekNumberStyleAttr() + "></td>" : void 0
        },
        numberCellHtml: function(t) {
            var e, n = t.start;
            return this.dayNumbersVisible ? (e = this.dayGrid.getDayClasses(n), e.unshift("fc-day-number"), '<td class="' + e.join(" ") + '" data-date="' + n.format() + '">' + n.date() + "</td>") : "<td/>"
        },
        weekNumberStyleAttr: function() {
            return null !== this.weekNumberWidth ? 'style="width:' + this.weekNumberWidth + 'px"' : ""
        },
        hasRigidRows: function() {
            var t = this.opt("eventLimit");
            return t && "number" != typeof t
        },
        updateWidth: function() {
            this.weekNumbersVisible && (this.weekNumberWidth = c(this.el.find(".fc-week-number")))
        },
        setHeight: function(t, e) {
            var n, i = this.opt("eventLimit");
            h(this.scrollerEl), s(this.headRowEl), this.dayGrid.destroySegPopover(), i && "number" == typeof i && this.dayGrid.limitRows(i), n = this.computeScrollerHeight(t), this.setGridHeight(n, e), i && "number" != typeof i && this.dayGrid.limitRows(i), !e && d(this.scrollerEl, n) && (r(this.headRowEl, v(this.scrollerEl)), n = this.computeScrollerHeight(t), this.scrollerEl.height(n))
        },
        setGridHeight: function(t, e) {
            e ? u(this.dayGrid.rowEls) : a(this.dayGrid.rowEls, t, !0)
        },
        renderEvents: function(t) {
            this.dayGrid.renderEvents(t), this.updateHeight()
        },
        getEventSegs: function() {
            return this.dayGrid.getEventSegs()
        },
        destroyEvents: function() {
            this.dayGrid.destroyEvents()
        },
        renderDrag: function(t, e) {
            return this.dayGrid.renderDrag(t, e)
        },
        destroyDrag: function() {
            this.dayGrid.destroyDrag()
        },
        renderSelection: function(t) {
            this.dayGrid.renderSelection(t)
        },
        destroySelection: function() {
            this.dayGrid.destroySelection()
        }
    }),
        vn = _e.month = mn.extend({
            computeRange: function(t) {
                var e, n = mn.prototype.computeRange.call(this, t);
                return this.isFixedWeeks() && (e = Math.ceil(n.end.diff(n.start, "weeks", !0)), n.end.add(6 - e, "weeks")), n
            },
            setGridHeight: function(t, e) {
                e = e || "variable" === this.opt("weekMode"), e && (t *= this.rowCnt / 6), a(this.dayGrid.rowEls, t, !e)
            },
            isFixedWeeks: function() {
                var t = this.opt("weekMode");
                return t ? "fixed" === t : this.opt("fixedWeekCount")
            }
        });
    vn.duration = {
        months: 1
    }, vn.defaults = {
        fixedWeekCount: !0
    }, _e.basicWeek = {
        type: "basic",
        duration: {
            weeks: 1
        }
    }, _e.basicDay = {
        type: "basic",
        duration: {
            days: 1
        }
    };
    var yn = {
        allDaySlot: !0,
        allDayText: "all-day",
        scrollTime: "06:00:00",
        slotDuration: "00:30:00",
        minTime: "00:00:00",
        maxTime: "24:00:00",
        slotEventOverlap: !0
    }, wn = 5,
        En = _e.agenda = an.extend({
            timeGrid: null,
            dayGrid: null,
            axisWidth: null,
            noScrollRowEls: null,
            bottomRuleEl: null,
            bottomRuleHeight: null,
            initialize: function() {
                this.timeGrid = new ln(this), this.opt("allDaySlot") ? (this.dayGrid = new on(this), this.coordMap = new Je([this.dayGrid.coordMap, this.timeGrid.coordMap])) : this.coordMap = this.timeGrid.coordMap
            },
            setRange: function(t) {
                an.prototype.setRange.call(this, t), this.timeGrid.setRange(t), this.dayGrid && this.dayGrid.setRange(t)
            },
            render: function() {
                this.el.addClass("fc-agenda-view").html(this.renderHtml()), this.scrollerEl = this.el.find(".fc-time-grid-container"), this.timeGrid.coordMap.containerEl = this.scrollerEl, this.timeGrid.setElement(this.el.find(".fc-time-grid")), this.timeGrid.renderDates(), this.bottomRuleEl = t('<hr class="fc-divider ' + this.widgetHeaderClass + '"/>').appendTo(this.timeGrid.el), this.dayGrid && (this.dayGrid.setElement(this.el.find(".fc-day-grid")), this.dayGrid.renderDates(), this.dayGrid.bottomCoordPadding = this.dayGrid.el.next("hr").outerHeight()), this.noScrollRowEls = this.el.find(".fc-row:not(.fc-scroller *)")
            },
            destroy: function() {
                this.timeGrid.destroyDates(), this.timeGrid.removeElement(), this.dayGrid && (this.dayGrid.destroyDates(), this.dayGrid.removeElement())
            },
            renderBusinessHours: function() {
                this.timeGrid.renderBusinessHours(), this.dayGrid && this.dayGrid.renderBusinessHours()
            },
            renderHtml: function() {
                return '<table><thead class="fc-head"><tr><td class="' + this.widgetHeaderClass + '">' + this.timeGrid.headHtml() + "</td>" + "</tr>" + "</thead>" + '<tbody class="fc-body">' + "<tr>" + '<td class="' + this.widgetContentClass + '">' + (this.dayGrid ? '<div class="fc-day-grid"/><hr class="fc-divider ' + this.widgetHeaderClass + '"/>' : "") + '<div class="fc-time-grid-container">' + '<div class="fc-time-grid"/>' + "</div>" + "</td>" + "</tr>" + "</tbody>" + "</table>"
            },
            headIntroHtml: function() {
                var t, e;
                return this.opt("weekNumbers") ? (t = this.timeGrid.getCell(0).start, e = t.format(this.opt("smallWeekFormat")), '<th class="fc-axis fc-week-number ' + this.widgetHeaderClass + '" ' + this.axisStyleAttr() + ">" + "<span>" + Y(e) + "</span>" + "</th>") : '<th class="fc-axis ' + this.widgetHeaderClass + '" ' + this.axisStyleAttr() + "></th>"
            },
            dayIntroHtml: function() {
                return '<td class="fc-axis ' + this.widgetContentClass + '" ' + this.axisStyleAttr() + ">" + "<span>" + (this.opt("allDayHtml") || Y(this.opt("allDayText"))) + "</span>" + "</td>"
            },
            slotBgIntroHtml: function() {
                return '<td class="fc-axis ' + this.widgetContentClass + '" ' + this.axisStyleAttr() + "></td>"
            },
            introHtml: function() {
                return '<td class="fc-axis" ' + this.axisStyleAttr() + "></td>"
            },
            axisStyleAttr: function() {
                return null !== this.axisWidth ? 'style="width:' + this.axisWidth + 'px"' : ""
            },
            updateSize: function(t) {
                this.timeGrid.updateSize(t), an.prototype.updateSize.call(this, t)
            },
            updateWidth: function() {
                this.axisWidth = c(this.el.find(".fc-axis"))
            },
            setHeight: function(t, e) {
                var n, i;
                null === this.bottomRuleHeight && (this.bottomRuleHeight = this.bottomRuleEl.outerHeight()), this.bottomRuleEl.hide(), this.scrollerEl.css("overflow", ""), h(this.scrollerEl), s(this.noScrollRowEls), this.dayGrid && (this.dayGrid.destroySegPopover(), n = this.opt("eventLimit"), n && "number" != typeof n && (n = wn), n && this.dayGrid.limitRows(n)), e || (i = this.computeScrollerHeight(t), d(this.scrollerEl, i) ? (r(this.noScrollRowEls, v(this.scrollerEl)), i = this.computeScrollerHeight(t), this.scrollerEl.height(i)) : (this.scrollerEl.height(i).css("overflow", "hidden"), this.bottomRuleEl.show()))
            },
            computeInitialScroll: function() {
                var t = e.duration(this.opt("scrollTime")),
                    n = this.timeGrid.computeTimeTop(t);
                return n = Math.ceil(n), n && n++, n
            },
            renderEvents: function(t) {
                var e, n, i = [],
                    r = [],
                    s = [];
                for (n = 0; t.length > n; n++) t[n].allDay ? i.push(t[n]) : r.push(t[n]);
                e = this.timeGrid.renderEvents(r), this.dayGrid && (s = this.dayGrid.renderEvents(i)), this.updateHeight()
            },
            getEventSegs: function() {
                return this.timeGrid.getEventSegs().concat(this.dayGrid ? this.dayGrid.getEventSegs() : [])
            },
            destroyEvents: function() {
                this.timeGrid.destroyEvents(), this.dayGrid && this.dayGrid.destroyEvents()
            },
            renderDrag: function(t, e) {
                return t.start.hasTime() ? this.timeGrid.renderDrag(t, e) : this.dayGrid ? this.dayGrid.renderDrag(t, e) : void 0
            },
            destroyDrag: function() {
                this.timeGrid.destroyDrag(), this.dayGrid && this.dayGrid.destroyDrag()
            },
            renderSelection: function(t) {
                t.start.hasTime() || t.end.hasTime() ? this.timeGrid.renderSelection(t) : this.dayGrid && this.dayGrid.renderSelection(t)
            },
            destroySelection: function() {
                this.timeGrid.destroySelection(), this.dayGrid && this.dayGrid.destroySelection()
            }
        });
    return En.defaults = yn, _e.agendaWeek = {
        type: "agenda",
        duration: {
            weeks: 1
        }
    }, _e.agendaDay = {
        type: "agenda",
        duration: {
            days: 1
        }
    }, Le
});
