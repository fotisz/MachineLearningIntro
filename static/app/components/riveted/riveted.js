/*!
 * @preserve
 * riveted.js | v0.6.0
 * Copyright (c) 2015 Rob Flaherty (@robflaherty)
 * Licensed under the MIT license
 */
var riveted = function() {
    function e(e) {
        e = e || {},
        g = parseInt(e.reportInterval, 10) || 5,
        p = parseInt(e.idleTimeout, 10) || 30,
        k = e.gaGlobal || "ga",
        "function" == typeof window[k] && (y = !0),
        "undefined" != typeof _gaq && "function" == typeof _gaq.push && (w = !0),
        "undefined" != typeof dataLayer && "function" == typeof dataLayer.push && (h = !0),
        I = "gaTracker" in e && "string" == typeof e.gaTracker ? e.gaTracker + ".send" : "send",
        "function" == typeof e.eventHandler && (s = e.eventHandler),
        "function" == typeof e.userTimingHandler && (m = e.userTimingHandler),
        T = "nonInteraction" in e && (e.nonInteraction === !1 || "false" === e.nonInteraction) ? !1 : !0,
        t(document, "keydown", f),
        t(document, "click", f),
        t(window, "mousemove", n(f, 500)),
        t(window, "scroll", n(f, 500)),
        t(document, "visibilitychange", a),
        t(document, "webkitvisibilitychange", a)
    }
    function n(e, n) {
        var t, i, a, o = null , r = 0, u = function() {
            r = new Date,
            o = null ,
            a = e.apply(t, i)
        }
        ;
        return function() {
            var c = new Date;
            r || (r = c);
            var d = n - (c - r);
            return t = this,
            i = arguments,
            0 >= d ? (clearTimeout(o),
            o = null ,
            r = c,
            a = e.apply(t, i)) : o || (o = setTimeout(u, d)),
            a
        }
    }
    function t(e, n, t) {
        e.addEventListener ? e.addEventListener(n, t, !1) : e.attachEvent ? e.attachEvent("on" + n, t) : e["on" + n] = t
    }
    function i() {
        clearTimeout(H),
        r()
    }
    function a() {
        (document.hidden || document.webkitHidden) && i()
    }
    function o() {
        _ += 1,
        _ > 0 && _ % g === 0 && s(_)
    }
    function r() {
        L = !0,
        clearTimeout(E)
    }
    function u() {
        i(),
        b = !0
    }
    function c() {
        b = !1
    }
    function d() {
        L = !1,
        clearTimeout(E),
        E = setInterval(o, 1e3)
    }
    function l() {
        var e = new Date
          , n = e - D;
        R = !0,
        m(n),
        E = setInterval(o, 1e3)
    }
    function v() {
        D = new Date,
        _ = 0,
        R = !1,
        L = !1,
        clearTimeout(E),
        clearTimeout(H)
    }
    function f() {
        b || (R || l(),
        L && d(),
        clearTimeout(H),
        H = setTimeout(i, 1e3 * p + 100))
    }
    var s, m, g, p, T, y, w, I, h, k, R = !1, L = !1, b = !1, _ = 0, D = new Date, E = null , H = null ;
    return m = function(e) {
        h ? dataLayer.push({
            event: "RivetedTiming",
            eventCategory: "Riveted",
            timingVar: "First Interaction",
            timingValue: e
        }) : (y && window[k](I, "timing", "Riveted", "First Interaction", e),
        w && _gaq.push(["_trackTiming", "Riveted", "First Interaction", e, null , 100]))
    }
    ,
    s = function(e) {
        h ? dataLayer.push({
            event: "Riveted",
            eventCategory: "Riveted",
            eventAction: "Time Spent",
            eventLabel: e,
            eventValue: g,
            eventNonInteraction: T
        }) : (y && window[k](I, "event", "Riveted", "Time Spent", e.toString(), g, {
            nonInteraction: T
        }),
        w && _gaq.push(["_trackEvent", "Riveted", "Time Spent", e.toString(), g, T]))
    }
    ,
    {
        init: e,
        trigger: f,
        setIdle: i,
        on: c,
        off: u,
        reset: v
    }
}();
