(function () {
    const n = document.createElement("link").relList;
    if (n && n.supports && n.supports("modulepreload")) return;
    for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
    new MutationObserver(l => {
        for (const o of l) if (o.type === "childList") for (const u of o.addedNodes) u.tagName === "LINK" && u.rel === "modulepreload" && r(u)
    }).observe(document, {childList: !0, subtree: !0});

    function t(l) {
        const o = {};
        return l.integrity && (o.integrity = l.integrity), l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy), l.crossOrigin === "use-credentials" ? o.credentials = "include" : l.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o
    }

    function r(l) {
        if (l.ep) return;
        l.ep = !0;
        const o = t(l);
        fetch(l.href, o)
    }
})();
var Wi = {exports: {}}, nl = {}, Qi = {exports: {}}, L = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gt = Symbol.for("react.element"), rc = Symbol.for("react.portal"), lc = Symbol.for("react.fragment"),
    oc = Symbol.for("react.strict_mode"), uc = Symbol.for("react.profiler"), ic = Symbol.for("react.provider"),
    sc = Symbol.for("react.context"), ac = Symbol.for("react.forward_ref"), cc = Symbol.for("react.suspense"),
    fc = Symbol.for("react.memo"), dc = Symbol.for("react.lazy"), Du = Symbol.iterator;

function pc(e) {
    return e === null || typeof e != "object" ? null : (e = Du && e[Du] || e["@@iterator"], typeof e == "function" ? e : null)
}

var Ki = {
    isMounted: function () {
        return !1
    }, enqueueForceUpdate: function () {
    }, enqueueReplaceState: function () {
    }, enqueueSetState: function () {
    }
}, Yi = Object.assign, Xi = {};

function ut(e, n, t) {
    this.props = e, this.context = n, this.refs = Xi, this.updater = t || Ki
}

ut.prototype.isReactComponent = {};
ut.prototype.setState = function (e, n) {
    if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, n, "setState")
};
ut.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
};

function Gi() {
}

Gi.prototype = ut.prototype;

function $o(e, n, t) {
    this.props = e, this.context = n, this.refs = Xi, this.updater = t || Ki
}

var Bo = $o.prototype = new Gi;
Bo.constructor = $o;
Yi(Bo, ut.prototype);
Bo.isPureReactComponent = !0;
var Mu = Array.isArray, Zi = Object.prototype.hasOwnProperty, Vo = {current: null},
    Ji = {key: !0, ref: !0, __self: !0, __source: !0};

function qi(e, n, t) {
    var r, l = {}, o = null, u = null;
    if (n != null) for (r in n.ref !== void 0 && (u = n.ref), n.key !== void 0 && (o = "" + n.key), n) Zi.call(n, r) && !Ji.hasOwnProperty(r) && (l[r] = n[r]);
    var i = arguments.length - 2;
    if (i === 1) l.children = t; else if (1 < i) {
        for (var s = Array(i), c = 0; c < i; c++) s[c] = arguments[c + 2];
        l.children = s
    }
    if (e && e.defaultProps) for (r in i = e.defaultProps, i) l[r] === void 0 && (l[r] = i[r]);
    return {$$typeof: Gt, type: e, key: o, ref: u, props: l, _owner: Vo.current}
}

function mc(e, n) {
    return {$$typeof: Gt, type: e.type, key: n, ref: e.ref, props: e.props, _owner: e._owner}
}

function Ao(e) {
    return typeof e == "object" && e !== null && e.$$typeof === Gt
}

function hc(e) {
    var n = {"=": "=0", ":": "=2"};
    return "$" + e.replace(/[=:]/g, function (t) {
        return n[t]
    })
}

var Iu = /\/+/g;

function Sl(e, n) {
    return typeof e == "object" && e !== null && e.key != null ? hc("" + e.key) : n.toString(36)
}

function wr(e, n, t, r, l) {
    var o = typeof e;
    (o === "undefined" || o === "boolean") && (e = null);
    var u = !1;
    if (e === null) u = !0; else switch (o) {
        case"string":
        case"number":
            u = !0;
            break;
        case"object":
            switch (e.$$typeof) {
                case Gt:
                case rc:
                    u = !0
            }
    }
    if (u) return u = e, l = l(u), e = r === "" ? "." + Sl(u, 0) : r, Mu(l) ? (t = "", e != null && (t = e.replace(Iu, "$&/") + "/"), wr(l, n, t, "", function (c) {
        return c
    })) : l != null && (Ao(l) && (l = mc(l, t + (!l.key || u && u.key === l.key ? "" : ("" + l.key).replace(Iu, "$&/") + "/") + e)), n.push(l)), 1;
    if (u = 0, r = r === "" ? "." : r + ":", Mu(e)) for (var i = 0; i < e.length; i++) {
        o = e[i];
        var s = r + Sl(o, i);
        u += wr(o, n, t, s, l)
    } else if (s = pc(e), typeof s == "function") for (e = s.call(e), i = 0; !(o = e.next()).done;) o = o.value, s = r + Sl(o, i++), u += wr(o, n, t, s, l); else if (o === "object") throw n = String(e), Error("Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
    return u
}

function tr(e, n, t) {
    if (e == null) return e;
    var r = [], l = 0;
    return wr(e, r, "", "", function (o) {
        return n.call(t, o, l++)
    }), r
}

function vc(e) {
    if (e._status === -1) {
        var n = e._result;
        n = n(), n.then(function (t) {
            (e._status === 0 || e._status === -1) && (e._status = 1, e._result = t)
        }, function (t) {
            (e._status === 0 || e._status === -1) && (e._status = 2, e._result = t)
        }), e._status === -1 && (e._status = 0, e._result = n)
    }
    if (e._status === 1) return e._result.default;
    throw e._result
}

var ie = {current: null}, Sr = {transition: null},
    yc = {ReactCurrentDispatcher: ie, ReactCurrentBatchConfig: Sr, ReactCurrentOwner: Vo};

function bi() {
    throw Error("act(...) is not supported in production builds of React.")
}

L.Children = {
    map: tr, forEach: function (e, n, t) {
        tr(e, function () {
            n.apply(this, arguments)
        }, t)
    }, count: function (e) {
        var n = 0;
        return tr(e, function () {
            n++
        }), n
    }, toArray: function (e) {
        return tr(e, function (n) {
            return n
        }) || []
    }, only: function (e) {
        if (!Ao(e)) throw Error("React.Children.only expected to receive a single React element child.");
        return e
    }
};
L.Component = ut;
L.Fragment = lc;
L.Profiler = uc;
L.PureComponent = $o;
L.StrictMode = oc;
L.Suspense = cc;
L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = yc;
L.act = bi;
L.cloneElement = function (e, n, t) {
    if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = Yi({}, e.props), l = e.key, o = e.ref, u = e._owner;
    if (n != null) {
        if (n.ref !== void 0 && (o = n.ref, u = Vo.current), n.key !== void 0 && (l = "" + n.key), e.type && e.type.defaultProps) var i = e.type.defaultProps;
        for (s in n) Zi.call(n, s) && !Ji.hasOwnProperty(s) && (r[s] = n[s] === void 0 && i !== void 0 ? i[s] : n[s])
    }
    var s = arguments.length - 2;
    if (s === 1) r.children = t; else if (1 < s) {
        i = Array(s);
        for (var c = 0; c < s; c++) i[c] = arguments[c + 2];
        r.children = i
    }
    return {$$typeof: Gt, type: e.type, key: l, ref: o, props: r, _owner: u}
};
L.createContext = function (e) {
    return e = {
        $$typeof: sc,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    }, e.Provider = {$$typeof: ic, _context: e}, e.Consumer = e
};
L.createElement = qi;
L.createFactory = function (e) {
    var n = qi.bind(null, e);
    return n.type = e, n
};
L.createRef = function () {
    return {current: null}
};
L.forwardRef = function (e) {
    return {$$typeof: ac, render: e}
};
L.isValidElement = Ao;
L.lazy = function (e) {
    return {$$typeof: dc, _payload: {_status: -1, _result: e}, _init: vc}
};
L.memo = function (e, n) {
    return {$$typeof: fc, type: e, compare: n === void 0 ? null : n}
};
L.startTransition = function (e) {
    var n = Sr.transition;
    Sr.transition = {};
    try {
        e()
    } finally {
        Sr.transition = n
    }
};
L.unstable_act = bi;
L.useCallback = function (e, n) {
    return ie.current.useCallback(e, n)
};
L.useContext = function (e) {
    return ie.current.useContext(e)
};
L.useDebugValue = function () {
};
L.useDeferredValue = function (e) {
    return ie.current.useDeferredValue(e)
};
L.useEffect = function (e, n) {
    return ie.current.useEffect(e, n)
};
L.useId = function () {
    return ie.current.useId()
};
L.useImperativeHandle = function (e, n, t) {
    return ie.current.useImperativeHandle(e, n, t)
};
L.useInsertionEffect = function (e, n) {
    return ie.current.useInsertionEffect(e, n)
};
L.useLayoutEffect = function (e, n) {
    return ie.current.useLayoutEffect(e, n)
};
L.useMemo = function (e, n) {
    return ie.current.useMemo(e, n)
};
L.useReducer = function (e, n, t) {
    return ie.current.useReducer(e, n, t)
};
L.useRef = function (e) {
    return ie.current.useRef(e)
};
L.useState = function (e) {
    return ie.current.useState(e)
};
L.useSyncExternalStore = function (e, n, t) {
    return ie.current.useSyncExternalStore(e, n, t)
};
L.useTransition = function () {
    return ie.current.useTransition()
};
L.version = "18.3.1";
Qi.exports = L;
var Dn = Qi.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gc = Dn, wc = Symbol.for("react.element"), Sc = Symbol.for("react.fragment"),
    kc = Object.prototype.hasOwnProperty, Ec = gc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    xc = {key: !0, ref: !0, __self: !0, __source: !0};

function es(e, n, t) {
    var r, l = {}, o = null, u = null;
    t !== void 0 && (o = "" + t), n.key !== void 0 && (o = "" + n.key), n.ref !== void 0 && (u = n.ref);
    for (r in n) kc.call(n, r) && !xc.hasOwnProperty(r) && (l[r] = n[r]);
    if (e && e.defaultProps) for (r in n = e.defaultProps, n) l[r] === void 0 && (l[r] = n[r]);
    return {$$typeof: wc, type: e, key: o, ref: u, props: l, _owner: Ec.current}
}

nl.Fragment = Sc;
nl.jsx = es;
nl.jsxs = es;
Wi.exports = nl;
var j = Wi.exports, Fu = {}, ns = {exports: {}}, ge = {}, ts = {exports: {}}, rs = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function (e) {
    function n(x, P) {
        var z = x.length;
        x.push(P);
        e:for (; 0 < z;) {
            var W = z - 1 >>> 1, G = x[W];
            if (0 < l(G, P)) x[W] = P, x[z] = G, z = W; else break e
        }
    }

    function t(x) {
        return x.length === 0 ? null : x[0]
    }

    function r(x) {
        if (x.length === 0) return null;
        var P = x[0], z = x.pop();
        if (z !== P) {
            x[0] = z;
            e:for (var W = 0, G = x.length, er = G >>> 1; W < er;) {
                var yn = 2 * (W + 1) - 1, wl = x[yn], gn = yn + 1, nr = x[gn];
                if (0 > l(wl, z)) gn < G && 0 > l(nr, wl) ? (x[W] = nr, x[gn] = z, W = gn) : (x[W] = wl, x[yn] = z, W = yn); else if (gn < G && 0 > l(nr, z)) x[W] = nr, x[gn] = z, W = gn; else break e
            }
        }
        return P
    }

    function l(x, P) {
        var z = x.sortIndex - P.sortIndex;
        return z !== 0 ? z : x.id - P.id
    }

    if (typeof performance == "object" && typeof performance.now == "function") {
        var o = performance;
        e.unstable_now = function () {
            return o.now()
        }
    } else {
        var u = Date, i = u.now();
        e.unstable_now = function () {
            return u.now() - i
        }
    }
    var s = [], c = [], m = 1, h = null, p = 3, g = !1, w = !1, S = !1,
        F = typeof setTimeout == "function" ? setTimeout : null,
        f = typeof clearTimeout == "function" ? clearTimeout : null,
        a = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);

    function d(x) {
        for (var P = t(c); P !== null;) {
            if (P.callback === null) r(c); else if (P.startTime <= x) r(c), P.sortIndex = P.expirationTime, n(s, P); else break;
            P = t(c)
        }
    }

    function v(x) {
        if (S = !1, d(x), !w) if (t(s) !== null) w = !0, yl(E); else {
            var P = t(c);
            P !== null && gl(v, P.startTime - x)
        }
    }

    function E(x, P) {
        w = !1, S && (S = !1, f(N), N = -1), g = !0;
        var z = p;
        try {
            for (d(P), h = t(s); h !== null && (!(h.expirationTime > P) || x && !Pe());) {
                var W = h.callback;
                if (typeof W == "function") {
                    h.callback = null, p = h.priorityLevel;
                    var G = W(h.expirationTime <= P);
                    P = e.unstable_now(), typeof G == "function" ? h.callback = G : h === t(s) && r(s), d(P)
                } else r(s);
                h = t(s)
            }
            if (h !== null) var er = !0; else {
                var yn = t(c);
                yn !== null && gl(v, yn.startTime - P), er = !1
            }
            return er
        } finally {
            h = null, p = z, g = !1
        }
    }

    var _ = !1, C = null, N = -1, H = 5, T = -1;

    function Pe() {
        return !(e.unstable_now() - T < H)
    }

    function at() {
        if (C !== null) {
            var x = e.unstable_now();
            T = x;
            var P = !0;
            try {
                P = C(!0, x)
            } finally {
                P ? ct() : (_ = !1, C = null)
            }
        } else _ = !1
    }

    var ct;
    if (typeof a == "function") ct = function () {
        a(at)
    }; else if (typeof MessageChannel < "u") {
        var ju = new MessageChannel, tc = ju.port2;
        ju.port1.onmessage = at, ct = function () {
            tc.postMessage(null)
        }
    } else ct = function () {
        F(at, 0)
    };

    function yl(x) {
        C = x, _ || (_ = !0, ct())
    }

    function gl(x, P) {
        N = F(function () {
            x(e.unstable_now())
        }, P)
    }

    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function (x) {
        x.callback = null
    }, e.unstable_continueExecution = function () {
        w || g || (w = !0, yl(E))
    }, e.unstable_forceFrameRate = function (x) {
        0 > x || 125 < x ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : H = 0 < x ? Math.floor(1e3 / x) : 5
    }, e.unstable_getCurrentPriorityLevel = function () {
        return p
    }, e.unstable_getFirstCallbackNode = function () {
        return t(s)
    }, e.unstable_next = function (x) {
        switch (p) {
            case 1:
            case 2:
            case 3:
                var P = 3;
                break;
            default:
                P = p
        }
        var z = p;
        p = P;
        try {
            return x()
        } finally {
            p = z
        }
    }, e.unstable_pauseExecution = function () {
    }, e.unstable_requestPaint = function () {
    }, e.unstable_runWithPriority = function (x, P) {
        switch (x) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                x = 3
        }
        var z = p;
        p = x;
        try {
            return P()
        } finally {
            p = z
        }
    }, e.unstable_scheduleCallback = function (x, P, z) {
        var W = e.unstable_now();
        switch (typeof z == "object" && z !== null ? (z = z.delay, z = typeof z == "number" && 0 < z ? W + z : W) : z = W, x) {
            case 1:
                var G = -1;
                break;
            case 2:
                G = 250;
                break;
            case 5:
                G = 1073741823;
                break;
            case 4:
                G = 1e4;
                break;
            default:
                G = 5e3
        }
        return G = z + G, x = {
            id: m++,
            callback: P,
            priorityLevel: x,
            startTime: z,
            expirationTime: G,
            sortIndex: -1
        }, z > W ? (x.sortIndex = z, n(c, x), t(s) === null && x === t(c) && (S ? (f(N), N = -1) : S = !0, gl(v, z - W))) : (x.sortIndex = G, n(s, x), w || g || (w = !0, yl(E))), x
    }, e.unstable_shouldYield = Pe, e.unstable_wrapCallback = function (x) {
        var P = p;
        return function () {
            var z = p;
            p = P;
            try {
                return x.apply(this, arguments)
            } finally {
                p = z
            }
        }
    }
})(rs);
ts.exports = rs;
var _c = ts.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cc = Dn, ye = _c;

function y(e) {
    for (var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, t = 1; t < arguments.length; t++) n += "&args[]=" + encodeURIComponent(arguments[t]);
    return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}

var ls = new Set, Ot = {};

function Rn(e, n) {
    bn(e, n), bn(e + "Capture", n)
}

function bn(e, n) {
    for (Ot[e] = n, e = 0; e < n.length; e++) ls.add(n[e])
}

var Qe = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
    Kl = Object.prototype.hasOwnProperty,
    Nc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    Uu = {}, $u = {};

function Pc(e) {
    return Kl.call($u, e) ? !0 : Kl.call(Uu, e) ? !1 : Nc.test(e) ? $u[e] = !0 : (Uu[e] = !0, !1)
}

function zc(e, n, t, r) {
    if (t !== null && t.type === 0) return !1;
    switch (typeof n) {
        case"function":
        case"symbol":
            return !0;
        case"boolean":
            return r ? !1 : t !== null ? !t.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
        default:
            return !1
    }
}

function Lc(e, n, t, r) {
    if (n === null || typeof n > "u" || zc(e, n, t, r)) return !0;
    if (r) return !1;
    if (t !== null) switch (t.type) {
        case 3:
            return !n;
        case 4:
            return n === !1;
        case 5:
            return isNaN(n);
        case 6:
            return isNaN(n) || 1 > n
    }
    return !1
}

function se(e, n, t, r, l, o, u) {
    this.acceptsBooleans = n === 2 || n === 3 || n === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = t, this.propertyName = e, this.type = n, this.sanitizeURL = o, this.removeEmptyString = u
}

var ee = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (e) {
    ee[e] = new se(e, 0, !1, e, null, !1, !1)
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (e) {
    var n = e[0];
    ee[n] = new se(n, 1, !1, e[1], null, !1, !1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    ee[e] = new se(e, 2, !1, e.toLowerCase(), null, !1, !1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (e) {
    ee[e] = new se(e, 2, !1, e, null, !1, !1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (e) {
    ee[e] = new se(e, 3, !1, e.toLowerCase(), null, !1, !1)
});
["checked", "multiple", "muted", "selected"].forEach(function (e) {
    ee[e] = new se(e, 3, !0, e, null, !1, !1)
});
["capture", "download"].forEach(function (e) {
    ee[e] = new se(e, 4, !1, e, null, !1, !1)
});
["cols", "rows", "size", "span"].forEach(function (e) {
    ee[e] = new se(e, 6, !1, e, null, !1, !1)
});
["rowSpan", "start"].forEach(function (e) {
    ee[e] = new se(e, 5, !1, e.toLowerCase(), null, !1, !1)
});
var Ho = /[\-:]([a-z])/g;

function Wo(e) {
    return e[1].toUpperCase()
}

"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (e) {
    var n = e.replace(Ho, Wo);
    ee[n] = new se(n, 1, !1, e, null, !1, !1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (e) {
    var n = e.replace(Ho, Wo);
    ee[n] = new se(n, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var n = e.replace(Ho, Wo);
    ee[n] = new se(n, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1)
});
["tabIndex", "crossOrigin"].forEach(function (e) {
    ee[e] = new se(e, 1, !1, e.toLowerCase(), null, !1, !1)
});
ee.xlinkHref = new se("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function (e) {
    ee[e] = new se(e, 1, !1, e.toLowerCase(), null, !0, !0)
});

function Qo(e, n, t, r) {
    var l = ee.hasOwnProperty(n) ? ee[n] : null;
    (l !== null ? l.type !== 0 : r || !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (Lc(n, t, l, r) && (t = null), r || l === null ? Pc(n) && (t === null ? e.removeAttribute(n) : e.setAttribute(n, "" + t)) : l.mustUseProperty ? e[l.propertyName] = t === null ? l.type === 3 ? !1 : "" : t : (n = l.attributeName, r = l.attributeNamespace, t === null ? e.removeAttribute(n) : (l = l.type, t = l === 3 || l === 4 && t === !0 ? "" : "" + t, r ? e.setAttributeNS(r, n, t) : e.setAttribute(n, t))))
}

var Ge = Cc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, rr = Symbol.for("react.element"),
    Mn = Symbol.for("react.portal"), In = Symbol.for("react.fragment"), Ko = Symbol.for("react.strict_mode"),
    Yl = Symbol.for("react.profiler"), os = Symbol.for("react.provider"), us = Symbol.for("react.context"),
    Yo = Symbol.for("react.forward_ref"), Xl = Symbol.for("react.suspense"), Gl = Symbol.for("react.suspense_list"),
    Xo = Symbol.for("react.memo"), Je = Symbol.for("react.lazy"), is = Symbol.for("react.offscreen"),
    Bu = Symbol.iterator;

function ft(e) {
    return e === null || typeof e != "object" ? null : (e = Bu && e[Bu] || e["@@iterator"], typeof e == "function" ? e : null)
}

var V = Object.assign, kl;

function wt(e) {
    if (kl === void 0) try {
        throw Error()
    } catch (t) {
        var n = t.stack.trim().match(/\n( *(at )?)/);
        kl = n && n[1] || ""
    }
    return `
` + kl + e
}

var El = !1;

function xl(e, n) {
    if (!e || El) return "";
    El = !0;
    var t = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (n) if (n = function () {
            throw Error()
        }, Object.defineProperty(n.prototype, "props", {
            set: function () {
                throw Error()
            }
        }), typeof Reflect == "object" && Reflect.construct) {
            try {
                Reflect.construct(n, [])
            } catch (c) {
                var r = c
            }
            Reflect.construct(e, [], n)
        } else {
            try {
                n.call()
            } catch (c) {
                r = c
            }
            e.call(n.prototype)
        } else {
            try {
                throw Error()
            } catch (c) {
                r = c
            }
            e()
        }
    } catch (c) {
        if (c && r && typeof c.stack == "string") {
            for (var l = c.stack.split(`
`), o = r.stack.split(`
`), u = l.length - 1, i = o.length - 1; 1 <= u && 0 <= i && l[u] !== o[i];) i--;
            for (; 1 <= u && 0 <= i; u--, i--) if (l[u] !== o[i]) {
                if (u !== 1 || i !== 1) do if (u--, i--, 0 > i || l[u] !== o[i]) {
                    var s = `
` + l[u].replace(" at new ", " at ");
                    return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s
                } while (1 <= u && 0 <= i);
                break
            }
        }
    } finally {
        El = !1, Error.prepareStackTrace = t
    }
    return (e = e ? e.displayName || e.name : "") ? wt(e) : ""
}

function Tc(e) {
    switch (e.tag) {
        case 5:
            return wt(e.type);
        case 16:
            return wt("Lazy");
        case 13:
            return wt("Suspense");
        case 19:
            return wt("SuspenseList");
        case 0:
        case 2:
        case 15:
            return e = xl(e.type, !1), e;
        case 11:
            return e = xl(e.type.render, !1), e;
        case 1:
            return e = xl(e.type, !0), e;
        default:
            return ""
    }
}

function Zl(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
        case In:
            return "Fragment";
        case Mn:
            return "Portal";
        case Yl:
            return "Profiler";
        case Ko:
            return "StrictMode";
        case Xl:
            return "Suspense";
        case Gl:
            return "SuspenseList"
    }
    if (typeof e == "object") switch (e.$$typeof) {
        case us:
            return (e.displayName || "Context") + ".Consumer";
        case os:
            return (e._context.displayName || "Context") + ".Provider";
        case Yo:
            var n = e.render;
            return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Xo:
            return n = e.displayName || null, n !== null ? n : Zl(e.type) || "Memo";
        case Je:
            n = e._payload, e = e._init;
            try {
                return Zl(e(n))
            } catch {
            }
    }
    return null
}

function Rc(e) {
    var n = e.type;
    switch (e.tag) {
        case 24:
            return "Cache";
        case 9:
            return (n.displayName || "Context") + ".Consumer";
        case 10:
            return (n._context.displayName || "Context") + ".Provider";
        case 18:
            return "DehydratedFragment";
        case 11:
            return e = n.render, e = e.displayName || e.name || "", n.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
            return "Fragment";
        case 5:
            return n;
        case 4:
            return "Portal";
        case 3:
            return "Root";
        case 6:
            return "Text";
        case 16:
            return Zl(n);
        case 8:
            return n === Ko ? "StrictMode" : "Mode";
        case 22:
            return "Offscreen";
        case 12:
            return "Profiler";
        case 21:
            return "Scope";
        case 13:
            return "Suspense";
        case 19:
            return "SuspenseList";
        case 25:
            return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof n == "function") return n.displayName || n.name || null;
            if (typeof n == "string") return n
    }
    return null
}

function dn(e) {
    switch (typeof e) {
        case"boolean":
        case"number":
        case"string":
        case"undefined":
            return e;
        case"object":
            return e;
        default:
            return ""
    }
}

function ss(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio")
}

function Oc(e) {
    var n = ss(e) ? "checked" : "value", t = Object.getOwnPropertyDescriptor(e.constructor.prototype, n), r = "" + e[n];
    if (!e.hasOwnProperty(n) && typeof t < "u" && typeof t.get == "function" && typeof t.set == "function") {
        var l = t.get, o = t.set;
        return Object.defineProperty(e, n, {
            configurable: !0, get: function () {
                return l.call(this)
            }, set: function (u) {
                r = "" + u, o.call(this, u)
            }
        }), Object.defineProperty(e, n, {enumerable: t.enumerable}), {
            getValue: function () {
                return r
            }, setValue: function (u) {
                r = "" + u
            }, stopTracking: function () {
                e._valueTracker = null, delete e[n]
            }
        }
    }
}

function lr(e) {
    e._valueTracker || (e._valueTracker = Oc(e))
}

function as(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var t = n.getValue(), r = "";
    return e && (r = ss(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== t ? (n.setValue(e), !0) : !1
}

function Rr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
        return e.activeElement || e.body
    } catch {
        return e.body
    }
}

function Jl(e, n) {
    var t = n.checked;
    return V({}, n, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: t ?? e._wrapperState.initialChecked
    })
}

function Vu(e, n) {
    var t = n.defaultValue == null ? "" : n.defaultValue, r = n.checked != null ? n.checked : n.defaultChecked;
    t = dn(n.value != null ? n.value : t), e._wrapperState = {
        initialChecked: r,
        initialValue: t,
        controlled: n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null
    }
}

function cs(e, n) {
    n = n.checked, n != null && Qo(e, "checked", n, !1)
}

function ql(e, n) {
    cs(e, n);
    var t = dn(n.value), r = n.type;
    if (t != null) r === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + t) : e.value !== "" + t && (e.value = "" + t); else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return
    }
    n.hasOwnProperty("value") ? bl(e, n.type, t) : n.hasOwnProperty("defaultValue") && bl(e, n.type, dn(n.defaultValue)), n.checked == null && n.defaultChecked != null && (e.defaultChecked = !!n.defaultChecked)
}

function Au(e, n, t) {
    if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
        var r = n.type;
        if (!(r !== "submit" && r !== "reset" || n.value !== void 0 && n.value !== null)) return;
        n = "" + e._wrapperState.initialValue, t || n === e.value || (e.value = n), e.defaultValue = n
    }
    t = e.name, t !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, t !== "" && (e.name = t)
}

function bl(e, n, t) {
    (n !== "number" || Rr(e.ownerDocument) !== e) && (t == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + t && (e.defaultValue = "" + t))
}

var St = Array.isArray;

function Yn(e, n, t, r) {
    if (e = e.options, n) {
        n = {};
        for (var l = 0; l < t.length; l++) n["$" + t[l]] = !0;
        for (t = 0; t < e.length; t++) l = n.hasOwnProperty("$" + e[t].value), e[t].selected !== l && (e[t].selected = l), l && r && (e[t].defaultSelected = !0)
    } else {
        for (t = "" + dn(t), n = null, l = 0; l < e.length; l++) {
            if (e[l].value === t) {
                e[l].selected = !0, r && (e[l].defaultSelected = !0);
                return
            }
            n !== null || e[l].disabled || (n = e[l])
        }
        n !== null && (n.selected = !0)
    }
}

function eo(e, n) {
    if (n.dangerouslySetInnerHTML != null) throw Error(y(91));
    return V({}, n, {value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue})
}

function Hu(e, n) {
    var t = n.value;
    if (t == null) {
        if (t = n.children, n = n.defaultValue, t != null) {
            if (n != null) throw Error(y(92));
            if (St(t)) {
                if (1 < t.length) throw Error(y(93));
                t = t[0]
            }
            n = t
        }
        n == null && (n = ""), t = n
    }
    e._wrapperState = {initialValue: dn(t)}
}

function fs(e, n) {
    var t = dn(n.value), r = dn(n.defaultValue);
    t != null && (t = "" + t, t !== e.value && (e.value = t), n.defaultValue == null && e.defaultValue !== t && (e.defaultValue = t)), r != null && (e.defaultValue = "" + r)
}

function Wu(e) {
    var n = e.textContent;
    n === e._wrapperState.initialValue && n !== "" && n !== null && (e.value = n)
}

function ds(e) {
    switch (e) {
        case"svg":
            return "http://www.w3.org/2000/svg";
        case"math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml"
    }
}

function no(e, n) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? ds(n) : e === "http://www.w3.org/2000/svg" && n === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}

var or, ps = function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function (n, t, r, l) {
        MSApp.execUnsafeLocalFunction(function () {
            return e(n, t, r, l)
        })
    } : e
}(function (e, n) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = n; else {
        for (or = or || document.createElement("div"), or.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>", n = or.firstChild; e.firstChild;) e.removeChild(e.firstChild);
        for (; n.firstChild;) e.appendChild(n.firstChild)
    }
});

function jt(e, n) {
    if (n) {
        var t = e.firstChild;
        if (t && t === e.lastChild && t.nodeType === 3) {
            t.nodeValue = n;
            return
        }
    }
    e.textContent = n
}

var xt = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
}, jc = ["Webkit", "ms", "Moz", "O"];
Object.keys(xt).forEach(function (e) {
    jc.forEach(function (n) {
        n = n + e.charAt(0).toUpperCase() + e.substring(1), xt[n] = xt[e]
    })
});

function ms(e, n, t) {
    return n == null || typeof n == "boolean" || n === "" ? "" : t || typeof n != "number" || n === 0 || xt.hasOwnProperty(e) && xt[e] ? ("" + n).trim() : n + "px"
}

function hs(e, n) {
    e = e.style;
    for (var t in n) if (n.hasOwnProperty(t)) {
        var r = t.indexOf("--") === 0, l = ms(t, n[t], r);
        t === "float" && (t = "cssFloat"), r ? e.setProperty(t, l) : e[t] = l
    }
}

var Dc = V({menuitem: !0}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});

function to(e, n) {
    if (n) {
        if (Dc[e] && (n.children != null || n.dangerouslySetInnerHTML != null)) throw Error(y(137, e));
        if (n.dangerouslySetInnerHTML != null) {
            if (n.children != null) throw Error(y(60));
            if (typeof n.dangerouslySetInnerHTML != "object" || !("__html" in n.dangerouslySetInnerHTML)) throw Error(y(61))
        }
        if (n.style != null && typeof n.style != "object") throw Error(y(62))
    }
}

function ro(e, n) {
    if (e.indexOf("-") === -1) return typeof n.is == "string";
    switch (e) {
        case"annotation-xml":
        case"color-profile":
        case"font-face":
        case"font-face-src":
        case"font-face-uri":
        case"font-face-format":
        case"font-face-name":
        case"missing-glyph":
            return !1;
        default:
            return !0
    }
}

var lo = null;

function Go(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e
}

var oo = null, Xn = null, Gn = null;

function Qu(e) {
    if (e = qt(e)) {
        if (typeof oo != "function") throw Error(y(280));
        var n = e.stateNode;
        n && (n = ul(n), oo(e.stateNode, e.type, n))
    }
}

function vs(e) {
    Xn ? Gn ? Gn.push(e) : Gn = [e] : Xn = e
}

function ys() {
    if (Xn) {
        var e = Xn, n = Gn;
        if (Gn = Xn = null, Qu(e), n) for (e = 0; e < n.length; e++) Qu(n[e])
    }
}

function gs(e, n) {
    return e(n)
}

function ws() {
}

var _l = !1;

function Ss(e, n, t) {
    if (_l) return e(n, t);
    _l = !0;
    try {
        return gs(e, n, t)
    } finally {
        _l = !1, (Xn !== null || Gn !== null) && (ws(), ys())
    }
}

function Dt(e, n) {
    var t = e.stateNode;
    if (t === null) return null;
    var r = ul(t);
    if (r === null) return null;
    t = r[n];
    e:switch (n) {
        case"onClick":
        case"onClickCapture":
        case"onDoubleClick":
        case"onDoubleClickCapture":
        case"onMouseDown":
        case"onMouseDownCapture":
        case"onMouseMove":
        case"onMouseMoveCapture":
        case"onMouseUp":
        case"onMouseUpCapture":
        case"onMouseEnter":
            (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
            break e;
        default:
            e = !1
    }
    if (e) return null;
    if (t && typeof t != "function") throw Error(y(231, n, typeof t));
    return t
}

var uo = !1;
if (Qe) try {
    var dt = {};
    Object.defineProperty(dt, "passive", {
        get: function () {
            uo = !0
        }
    }), window.addEventListener("test", dt, dt), window.removeEventListener("test", dt, dt)
} catch {
    uo = !1
}

function Mc(e, n, t, r, l, o, u, i, s) {
    var c = Array.prototype.slice.call(arguments, 3);
    try {
        n.apply(t, c)
    } catch (m) {
        this.onError(m)
    }
}

var _t = !1, Or = null, jr = !1, io = null, Ic = {
    onError: function (e) {
        _t = !0, Or = e
    }
};

function Fc(e, n, t, r, l, o, u, i, s) {
    _t = !1, Or = null, Mc.apply(Ic, arguments)
}

function Uc(e, n, t, r, l, o, u, i, s) {
    if (Fc.apply(this, arguments), _t) {
        if (_t) {
            var c = Or;
            _t = !1, Or = null
        } else throw Error(y(198));
        jr || (jr = !0, io = c)
    }
}

function On(e) {
    var n = e, t = e;
    if (e.alternate) for (; n.return;) n = n.return; else {
        e = n;
        do n = e, n.flags & 4098 && (t = n.return), e = n.return; while (e)
    }
    return n.tag === 3 ? t : null
}

function ks(e) {
    if (e.tag === 13) {
        var n = e.memoizedState;
        if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated
    }
    return null
}

function Ku(e) {
    if (On(e) !== e) throw Error(y(188))
}

function $c(e) {
    var n = e.alternate;
    if (!n) {
        if (n = On(e), n === null) throw Error(y(188));
        return n !== e ? null : e
    }
    for (var t = e, r = n; ;) {
        var l = t.return;
        if (l === null) break;
        var o = l.alternate;
        if (o === null) {
            if (r = l.return, r !== null) {
                t = r;
                continue
            }
            break
        }
        if (l.child === o.child) {
            for (o = l.child; o;) {
                if (o === t) return Ku(l), e;
                if (o === r) return Ku(l), n;
                o = o.sibling
            }
            throw Error(y(188))
        }
        if (t.return !== r.return) t = l, r = o; else {
            for (var u = !1, i = l.child; i;) {
                if (i === t) {
                    u = !0, t = l, r = o;
                    break
                }
                if (i === r) {
                    u = !0, r = l, t = o;
                    break
                }
                i = i.sibling
            }
            if (!u) {
                for (i = o.child; i;) {
                    if (i === t) {
                        u = !0, t = o, r = l;
                        break
                    }
                    if (i === r) {
                        u = !0, r = o, t = l;
                        break
                    }
                    i = i.sibling
                }
                if (!u) throw Error(y(189))
            }
        }
        if (t.alternate !== r) throw Error(y(190))
    }
    if (t.tag !== 3) throw Error(y(188));
    return t.stateNode.current === t ? e : n
}

function Es(e) {
    return e = $c(e), e !== null ? xs(e) : null
}

function xs(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null;) {
        var n = xs(e);
        if (n !== null) return n;
        e = e.sibling
    }
    return null
}

var _s = ye.unstable_scheduleCallback, Yu = ye.unstable_cancelCallback, Bc = ye.unstable_shouldYield,
    Vc = ye.unstable_requestPaint, Q = ye.unstable_now, Ac = ye.unstable_getCurrentPriorityLevel,
    Zo = ye.unstable_ImmediatePriority, Cs = ye.unstable_UserBlockingPriority, Dr = ye.unstable_NormalPriority,
    Hc = ye.unstable_LowPriority, Ns = ye.unstable_IdlePriority, tl = null, Ue = null;

function Wc(e) {
    if (Ue && typeof Ue.onCommitFiberRoot == "function") try {
        Ue.onCommitFiberRoot(tl, e, void 0, (e.current.flags & 128) === 128)
    } catch {
    }
}

var Oe = Math.clz32 ? Math.clz32 : Yc, Qc = Math.log, Kc = Math.LN2;

function Yc(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Qc(e) / Kc | 0) | 0
}

var ur = 64, ir = 4194304;

function kt(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e
    }
}

function Mr(e, n) {
    var t = e.pendingLanes;
    if (t === 0) return 0;
    var r = 0, l = e.suspendedLanes, o = e.pingedLanes, u = t & 268435455;
    if (u !== 0) {
        var i = u & ~l;
        i !== 0 ? r = kt(i) : (o &= u, o !== 0 && (r = kt(o)))
    } else u = t & ~l, u !== 0 ? r = kt(u) : o !== 0 && (r = kt(o));
    if (r === 0) return 0;
    if (n !== 0 && n !== r && !(n & l) && (l = r & -r, o = n & -n, l >= o || l === 16 && (o & 4194240) !== 0)) return n;
    if (r & 4 && (r |= t & 16), n = e.entangledLanes, n !== 0) for (e = e.entanglements, n &= r; 0 < n;) t = 31 - Oe(n), l = 1 << t, r |= e[t], n &= ~l;
    return r
}

function Xc(e, n) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return n + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return n + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1
    }
}

function Gc(e, n) {
    for (var t = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o;) {
        var u = 31 - Oe(o), i = 1 << u, s = l[u];
        s === -1 ? (!(i & t) || i & r) && (l[u] = Xc(i, n)) : s <= n && (e.expiredLanes |= i), o &= ~i
    }
}

function so(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}

function Ps() {
    var e = ur;
    return ur <<= 1, !(ur & 4194240) && (ur = 64), e
}

function Cl(e) {
    for (var n = [], t = 0; 31 > t; t++) n.push(e);
    return n
}

function Zt(e, n, t) {
    e.pendingLanes |= n, n !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, n = 31 - Oe(n), e[n] = t
}

function Zc(e, n) {
    var t = e.pendingLanes & ~n;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= n, e.mutableReadLanes &= n, e.entangledLanes &= n, n = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < t;) {
        var l = 31 - Oe(t), o = 1 << l;
        n[l] = 0, r[l] = -1, e[l] = -1, t &= ~o
    }
}

function Jo(e, n) {
    var t = e.entangledLanes |= n;
    for (e = e.entanglements; t;) {
        var r = 31 - Oe(t), l = 1 << r;
        l & n | e[r] & n && (e[r] |= n), t &= ~l
    }
}

var O = 0;

function zs(e) {
    return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}

var Ls, qo, Ts, Rs, Os, ao = !1, sr = [], rn = null, ln = null, on = null, Mt = new Map, It = new Map, be = [],
    Jc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");

function Xu(e, n) {
    switch (e) {
        case"focusin":
        case"focusout":
            rn = null;
            break;
        case"dragenter":
        case"dragleave":
            ln = null;
            break;
        case"mouseover":
        case"mouseout":
            on = null;
            break;
        case"pointerover":
        case"pointerout":
            Mt.delete(n.pointerId);
            break;
        case"gotpointercapture":
        case"lostpointercapture":
            It.delete(n.pointerId)
    }
}

function pt(e, n, t, r, l, o) {
    return e === null || e.nativeEvent !== o ? (e = {
        blockedOn: n,
        domEventName: t,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [l]
    }, n !== null && (n = qt(n), n !== null && qo(n)), e) : (e.eventSystemFlags |= r, n = e.targetContainers, l !== null && n.indexOf(l) === -1 && n.push(l), e)
}

function qc(e, n, t, r, l) {
    switch (n) {
        case"focusin":
            return rn = pt(rn, e, n, t, r, l), !0;
        case"dragenter":
            return ln = pt(ln, e, n, t, r, l), !0;
        case"mouseover":
            return on = pt(on, e, n, t, r, l), !0;
        case"pointerover":
            var o = l.pointerId;
            return Mt.set(o, pt(Mt.get(o) || null, e, n, t, r, l)), !0;
        case"gotpointercapture":
            return o = l.pointerId, It.set(o, pt(It.get(o) || null, e, n, t, r, l)), !0
    }
    return !1
}

function js(e) {
    var n = kn(e.target);
    if (n !== null) {
        var t = On(n);
        if (t !== null) {
            if (n = t.tag, n === 13) {
                if (n = ks(t), n !== null) {
                    e.blockedOn = n, Os(e.priority, function () {
                        Ts(t)
                    });
                    return
                }
            } else if (n === 3 && t.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = t.tag === 3 ? t.stateNode.containerInfo : null;
                return
            }
        }
    }
    e.blockedOn = null
}

function kr(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length;) {
        var t = co(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent);
        if (t === null) {
            t = e.nativeEvent;
            var r = new t.constructor(t.type, t);
            lo = r, t.target.dispatchEvent(r), lo = null
        } else return n = qt(t), n !== null && qo(n), e.blockedOn = t, !1;
        n.shift()
    }
    return !0
}

function Gu(e, n, t) {
    kr(e) && t.delete(n)
}

function bc() {
    ao = !1, rn !== null && kr(rn) && (rn = null), ln !== null && kr(ln) && (ln = null), on !== null && kr(on) && (on = null), Mt.forEach(Gu), It.forEach(Gu)
}

function mt(e, n) {
    e.blockedOn === n && (e.blockedOn = null, ao || (ao = !0, ye.unstable_scheduleCallback(ye.unstable_NormalPriority, bc)))
}

function Ft(e) {
    function n(l) {
        return mt(l, e)
    }

    if (0 < sr.length) {
        mt(sr[0], e);
        for (var t = 1; t < sr.length; t++) {
            var r = sr[t];
            r.blockedOn === e && (r.blockedOn = null)
        }
    }
    for (rn !== null && mt(rn, e), ln !== null && mt(ln, e), on !== null && mt(on, e), Mt.forEach(n), It.forEach(n), t = 0; t < be.length; t++) r = be[t], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < be.length && (t = be[0], t.blockedOn === null);) js(t), t.blockedOn === null && be.shift()
}

var Zn = Ge.ReactCurrentBatchConfig, Ir = !0;

function ef(e, n, t, r) {
    var l = O, o = Zn.transition;
    Zn.transition = null;
    try {
        O = 1, bo(e, n, t, r)
    } finally {
        O = l, Zn.transition = o
    }
}

function nf(e, n, t, r) {
    var l = O, o = Zn.transition;
    Zn.transition = null;
    try {
        O = 4, bo(e, n, t, r)
    } finally {
        O = l, Zn.transition = o
    }
}

function bo(e, n, t, r) {
    if (Ir) {
        var l = co(e, n, t, r);
        if (l === null) Ml(e, n, r, Fr, t), Xu(e, r); else if (qc(l, e, n, t, r)) r.stopPropagation(); else if (Xu(e, r), n & 4 && -1 < Jc.indexOf(e)) {
            for (; l !== null;) {
                var o = qt(l);
                if (o !== null && Ls(o), o = co(e, n, t, r), o === null && Ml(e, n, r, Fr, t), o === l) break;
                l = o
            }
            l !== null && r.stopPropagation()
        } else Ml(e, n, r, null, t)
    }
}

var Fr = null;

function co(e, n, t, r) {
    if (Fr = null, e = Go(r), e = kn(e), e !== null) if (n = On(e), n === null) e = null; else if (t = n.tag, t === 13) {
        if (e = ks(n), e !== null) return e;
        e = null
    } else if (t === 3) {
        if (n.stateNode.current.memoizedState.isDehydrated) return n.tag === 3 ? n.stateNode.containerInfo : null;
        e = null
    } else n !== e && (e = null);
    return Fr = e, null
}

function Ds(e) {
    switch (e) {
        case"cancel":
        case"click":
        case"close":
        case"contextmenu":
        case"copy":
        case"cut":
        case"auxclick":
        case"dblclick":
        case"dragend":
        case"dragstart":
        case"drop":
        case"focusin":
        case"focusout":
        case"input":
        case"invalid":
        case"keydown":
        case"keypress":
        case"keyup":
        case"mousedown":
        case"mouseup":
        case"paste":
        case"pause":
        case"play":
        case"pointercancel":
        case"pointerdown":
        case"pointerup":
        case"ratechange":
        case"reset":
        case"resize":
        case"seeked":
        case"submit":
        case"touchcancel":
        case"touchend":
        case"touchstart":
        case"volumechange":
        case"change":
        case"selectionchange":
        case"textInput":
        case"compositionstart":
        case"compositionend":
        case"compositionupdate":
        case"beforeblur":
        case"afterblur":
        case"beforeinput":
        case"blur":
        case"fullscreenchange":
        case"focus":
        case"hashchange":
        case"popstate":
        case"select":
        case"selectstart":
            return 1;
        case"drag":
        case"dragenter":
        case"dragexit":
        case"dragleave":
        case"dragover":
        case"mousemove":
        case"mouseout":
        case"mouseover":
        case"pointermove":
        case"pointerout":
        case"pointerover":
        case"scroll":
        case"toggle":
        case"touchmove":
        case"wheel":
        case"mouseenter":
        case"mouseleave":
        case"pointerenter":
        case"pointerleave":
            return 4;
        case"message":
            switch (Ac()) {
                case Zo:
                    return 1;
                case Cs:
                    return 4;
                case Dr:
                case Hc:
                    return 16;
                case Ns:
                    return 536870912;
                default:
                    return 16
            }
        default:
            return 16
    }
}

var nn = null, eu = null, Er = null;

function Ms() {
    if (Er) return Er;
    var e, n = eu, t = n.length, r, l = "value" in nn ? nn.value : nn.textContent, o = l.length;
    for (e = 0; e < t && n[e] === l[e]; e++) ;
    var u = t - e;
    for (r = 1; r <= u && n[t - r] === l[o - r]; r++) ;
    return Er = l.slice(e, 1 < r ? 1 - r : void 0)
}

function xr(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0
}

function ar() {
    return !0
}

function Zu() {
    return !1
}

function we(e) {
    function n(t, r, l, o, u) {
        this._reactName = t, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = u, this.currentTarget = null;
        for (var i in e) e.hasOwnProperty(i) && (t = e[i], this[i] = t ? t(o) : o[i]);
        return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? ar : Zu, this.isPropagationStopped = Zu, this
    }

    return V(n.prototype, {
        preventDefault: function () {
            this.defaultPrevented = !0;
            var t = this.nativeEvent;
            t && (t.preventDefault ? t.preventDefault() : typeof t.returnValue != "unknown" && (t.returnValue = !1), this.isDefaultPrevented = ar)
        }, stopPropagation: function () {
            var t = this.nativeEvent;
            t && (t.stopPropagation ? t.stopPropagation() : typeof t.cancelBubble != "unknown" && (t.cancelBubble = !0), this.isPropagationStopped = ar)
        }, persist: function () {
        }, isPersistent: ar
    }), n
}

var it = {
        eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function (e) {
            return e.timeStamp || Date.now()
        }, defaultPrevented: 0, isTrusted: 0
    }, nu = we(it), Jt = V({}, it, {view: 0, detail: 0}), tf = we(Jt), Nl, Pl, ht, rl = V({}, Jt, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: tu,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
            return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
        },
        movementX: function (e) {
            return "movementX" in e ? e.movementX : (e !== ht && (ht && e.type === "mousemove" ? (Nl = e.screenX - ht.screenX, Pl = e.screenY - ht.screenY) : Pl = Nl = 0, ht = e), Nl)
        },
        movementY: function (e) {
            return "movementY" in e ? e.movementY : Pl
        }
    }), Ju = we(rl), rf = V({}, rl, {dataTransfer: 0}), lf = we(rf), of = V({}, Jt, {relatedTarget: 0}), zl = we(of),
    uf = V({}, it, {animationName: 0, elapsedTime: 0, pseudoElement: 0}), sf = we(uf), af = V({}, it, {
        clipboardData: function (e) {
            return "clipboardData" in e ? e.clipboardData : window.clipboardData
        }
    }), cf = we(af), ff = V({}, it, {data: 0}), qu = we(ff), df = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    }, pf = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    }, mf = {Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey"};

function hf(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = mf[e]) ? !!n[e] : !1
}

function tu() {
    return hf
}

var vf = V({}, Jt, {
    key: function (e) {
        if (e.key) {
            var n = df[e.key] || e.key;
            if (n !== "Unidentified") return n
        }
        return e.type === "keypress" ? (e = xr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? pf[e.keyCode] || "Unidentified" : ""
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: tu,
    charCode: function (e) {
        return e.type === "keypress" ? xr(e) : 0
    },
    keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    },
    which: function (e) {
        return e.type === "keypress" ? xr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    }
}), yf = we(vf), gf = V({}, rl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
}), bu = we(gf), wf = V({}, Jt, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: tu
}), Sf = we(wf), kf = V({}, it, {propertyName: 0, elapsedTime: 0, pseudoElement: 0}), Ef = we(kf), xf = V({}, rl, {
    deltaX: function (e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
    }, deltaY: function (e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
    }, deltaZ: 0, deltaMode: 0
}), _f = we(xf), Cf = [9, 13, 27, 32], ru = Qe && "CompositionEvent" in window, Ct = null;
Qe && "documentMode" in document && (Ct = document.documentMode);
var Nf = Qe && "TextEvent" in window && !Ct, Is = Qe && (!ru || Ct && 8 < Ct && 11 >= Ct), ei = String.fromCharCode(32),
    ni = !1;

function Fs(e, n) {
    switch (e) {
        case"keyup":
            return Cf.indexOf(n.keyCode) !== -1;
        case"keydown":
            return n.keyCode !== 229;
        case"keypress":
        case"mousedown":
        case"focusout":
            return !0;
        default:
            return !1
    }
}

function Us(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null
}

var Fn = !1;

function Pf(e, n) {
    switch (e) {
        case"compositionend":
            return Us(n);
        case"keypress":
            return n.which !== 32 ? null : (ni = !0, ei);
        case"textInput":
            return e = n.data, e === ei && ni ? null : e;
        default:
            return null
    }
}

function zf(e, n) {
    if (Fn) return e === "compositionend" || !ru && Fs(e, n) ? (e = Ms(), Er = eu = nn = null, Fn = !1, e) : null;
    switch (e) {
        case"paste":
            return null;
        case"keypress":
            if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
                if (n.char && 1 < n.char.length) return n.char;
                if (n.which) return String.fromCharCode(n.which)
            }
            return null;
        case"compositionend":
            return Is && n.locale !== "ko" ? null : n.data;
        default:
            return null
    }
}

var Lf = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};

function ti(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!Lf[e.type] : n === "textarea"
}

function $s(e, n, t, r) {
    vs(r), n = Ur(n, "onChange"), 0 < n.length && (t = new nu("onChange", "change", null, t, r), e.push({
        event: t,
        listeners: n
    }))
}

var Nt = null, Ut = null;

function Tf(e) {
    Zs(e, 0)
}

function ll(e) {
    var n = Bn(e);
    if (as(n)) return e
}

function Rf(e, n) {
    if (e === "change") return n
}

var Bs = !1;
if (Qe) {
    var Ll;
    if (Qe) {
        var Tl = "oninput" in document;
        if (!Tl) {
            var ri = document.createElement("div");
            ri.setAttribute("oninput", "return;"), Tl = typeof ri.oninput == "function"
        }
        Ll = Tl
    } else Ll = !1;
    Bs = Ll && (!document.documentMode || 9 < document.documentMode)
}

function li() {
    Nt && (Nt.detachEvent("onpropertychange", Vs), Ut = Nt = null)
}

function Vs(e) {
    if (e.propertyName === "value" && ll(Ut)) {
        var n = [];
        $s(n, Ut, e, Go(e)), Ss(Tf, n)
    }
}

function Of(e, n, t) {
    e === "focusin" ? (li(), Nt = n, Ut = t, Nt.attachEvent("onpropertychange", Vs)) : e === "focusout" && li()
}

function jf(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return ll(Ut)
}

function Df(e, n) {
    if (e === "click") return ll(n)
}

function Mf(e, n) {
    if (e === "input" || e === "change") return ll(n)
}

function If(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n
}

var De = typeof Object.is == "function" ? Object.is : If;

function $t(e, n) {
    if (De(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null) return !1;
    var t = Object.keys(e), r = Object.keys(n);
    if (t.length !== r.length) return !1;
    for (r = 0; r < t.length; r++) {
        var l = t[r];
        if (!Kl.call(n, l) || !De(e[l], n[l])) return !1
    }
    return !0
}

function oi(e) {
    for (; e && e.firstChild;) e = e.firstChild;
    return e
}

function ui(e, n) {
    var t = oi(e);
    e = 0;
    for (var r; t;) {
        if (t.nodeType === 3) {
            if (r = e + t.textContent.length, e <= n && r >= n) return {node: t, offset: n - e};
            e = r
        }
        e:{
            for (; t;) {
                if (t.nextSibling) {
                    t = t.nextSibling;
                    break e
                }
                t = t.parentNode
            }
            t = void 0
        }
        t = oi(t)
    }
}

function As(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? As(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1
}

function Hs() {
    for (var e = window, n = Rr(); n instanceof e.HTMLIFrameElement;) {
        try {
            var t = typeof n.contentWindow.location.href == "string"
        } catch {
            t = !1
        }
        if (t) e = n.contentWindow; else break;
        n = Rr(e.document)
    }
    return n
}

function lu(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true")
}

function Ff(e) {
    var n = Hs(), t = e.focusedElem, r = e.selectionRange;
    if (n !== t && t && t.ownerDocument && As(t.ownerDocument.documentElement, t)) {
        if (r !== null && lu(t)) {
            if (n = r.start, e = r.end, e === void 0 && (e = n), "selectionStart" in t) t.selectionStart = n, t.selectionEnd = Math.min(e, t.value.length); else if (e = (n = t.ownerDocument || document) && n.defaultView || window, e.getSelection) {
                e = e.getSelection();
                var l = t.textContent.length, o = Math.min(r.start, l);
                r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = ui(t, o);
                var u = ui(t, r);
                l && u && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== u.node || e.focusOffset !== u.offset) && (n = n.createRange(), n.setStart(l.node, l.offset), e.removeAllRanges(), o > r ? (e.addRange(n), e.extend(u.node, u.offset)) : (n.setEnd(u.node, u.offset), e.addRange(n)))
            }
        }
        for (n = [], e = t; e = e.parentNode;) e.nodeType === 1 && n.push({
            element: e,
            left: e.scrollLeft,
            top: e.scrollTop
        });
        for (typeof t.focus == "function" && t.focus(), t = 0; t < n.length; t++) e = n[t], e.element.scrollLeft = e.left, e.element.scrollTop = e.top
    }
}

var Uf = Qe && "documentMode" in document && 11 >= document.documentMode, Un = null, fo = null, Pt = null, po = !1;

function ii(e, n, t) {
    var r = t.window === t ? t.document : t.nodeType === 9 ? t : t.ownerDocument;
    po || Un == null || Un !== Rr(r) || (r = Un, "selectionStart" in r && lu(r) ? r = {
        start: r.selectionStart,
        end: r.selectionEnd
    } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
        anchorNode: r.anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
    }), Pt && $t(Pt, r) || (Pt = r, r = Ur(fo, "onSelect"), 0 < r.length && (n = new nu("onSelect", "select", null, n, t), e.push({
        event: n,
        listeners: r
    }), n.target = Un)))
}

function cr(e, n) {
    var t = {};
    return t[e.toLowerCase()] = n.toLowerCase(), t["Webkit" + e] = "webkit" + n, t["Moz" + e] = "moz" + n, t
}

var $n = {
    animationend: cr("Animation", "AnimationEnd"),
    animationiteration: cr("Animation", "AnimationIteration"),
    animationstart: cr("Animation", "AnimationStart"),
    transitionend: cr("Transition", "TransitionEnd")
}, Rl = {}, Ws = {};
Qe && (Ws = document.createElement("div").style, "AnimationEvent" in window || (delete $n.animationend.animation, delete $n.animationiteration.animation, delete $n.animationstart.animation), "TransitionEvent" in window || delete $n.transitionend.transition);

function ol(e) {
    if (Rl[e]) return Rl[e];
    if (!$n[e]) return e;
    var n = $n[e], t;
    for (t in n) if (n.hasOwnProperty(t) && t in Ws) return Rl[e] = n[t];
    return e
}

var Qs = ol("animationend"), Ks = ol("animationiteration"), Ys = ol("animationstart"), Xs = ol("transitionend"),
    Gs = new Map,
    si = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");

function mn(e, n) {
    Gs.set(e, n), Rn(n, [e])
}

for (var Ol = 0; Ol < si.length; Ol++) {
    var jl = si[Ol], $f = jl.toLowerCase(), Bf = jl[0].toUpperCase() + jl.slice(1);
    mn($f, "on" + Bf)
}
mn(Qs, "onAnimationEnd");
mn(Ks, "onAnimationIteration");
mn(Ys, "onAnimationStart");
mn("dblclick", "onDoubleClick");
mn("focusin", "onFocus");
mn("focusout", "onBlur");
mn(Xs, "onTransitionEnd");
bn("onMouseEnter", ["mouseout", "mouseover"]);
bn("onMouseLeave", ["mouseout", "mouseover"]);
bn("onPointerEnter", ["pointerout", "pointerover"]);
bn("onPointerLeave", ["pointerout", "pointerover"]);
Rn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Rn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Rn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Rn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Rn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Rn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Et = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
    Vf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Et));

function ai(e, n, t) {
    var r = e.type || "unknown-event";
    e.currentTarget = t, Uc(r, n, void 0, e), e.currentTarget = null
}

function Zs(e, n) {
    n = (n & 4) !== 0;
    for (var t = 0; t < e.length; t++) {
        var r = e[t], l = r.event;
        r = r.listeners;
        e:{
            var o = void 0;
            if (n) for (var u = r.length - 1; 0 <= u; u--) {
                var i = r[u], s = i.instance, c = i.currentTarget;
                if (i = i.listener, s !== o && l.isPropagationStopped()) break e;
                ai(l, i, c), o = s
            } else for (u = 0; u < r.length; u++) {
                if (i = r[u], s = i.instance, c = i.currentTarget, i = i.listener, s !== o && l.isPropagationStopped()) break e;
                ai(l, i, c), o = s
            }
        }
    }
    if (jr) throw e = io, jr = !1, io = null, e
}

function M(e, n) {
    var t = n[go];
    t === void 0 && (t = n[go] = new Set);
    var r = e + "__bubble";
    t.has(r) || (Js(n, e, 2, !1), t.add(r))
}

function Dl(e, n, t) {
    var r = 0;
    n && (r |= 4), Js(t, e, r, n)
}

var fr = "_reactListening" + Math.random().toString(36).slice(2);

function Bt(e) {
    if (!e[fr]) {
        e[fr] = !0, ls.forEach(function (t) {
            t !== "selectionchange" && (Vf.has(t) || Dl(t, !1, e), Dl(t, !0, e))
        });
        var n = e.nodeType === 9 ? e : e.ownerDocument;
        n === null || n[fr] || (n[fr] = !0, Dl("selectionchange", !1, n))
    }
}

function Js(e, n, t, r) {
    switch (Ds(n)) {
        case 1:
            var l = ef;
            break;
        case 4:
            l = nf;
            break;
        default:
            l = bo
    }
    t = l.bind(null, n, t, e), l = void 0, !uo || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(n, t, {
        capture: !0,
        passive: l
    }) : e.addEventListener(n, t, !0) : l !== void 0 ? e.addEventListener(n, t, {passive: l}) : e.addEventListener(n, t, !1)
}

function Ml(e, n, t, r, l) {
    var o = r;
    if (!(n & 1) && !(n & 2) && r !== null) e:for (; ;) {
        if (r === null) return;
        var u = r.tag;
        if (u === 3 || u === 4) {
            var i = r.stateNode.containerInfo;
            if (i === l || i.nodeType === 8 && i.parentNode === l) break;
            if (u === 4) for (u = r.return; u !== null;) {
                var s = u.tag;
                if ((s === 3 || s === 4) && (s = u.stateNode.containerInfo, s === l || s.nodeType === 8 && s.parentNode === l)) return;
                u = u.return
            }
            for (; i !== null;) {
                if (u = kn(i), u === null) return;
                if (s = u.tag, s === 5 || s === 6) {
                    r = o = u;
                    continue e
                }
                i = i.parentNode
            }
        }
        r = r.return
    }
    Ss(function () {
        var c = o, m = Go(t), h = [];
        e:{
            var p = Gs.get(e);
            if (p !== void 0) {
                var g = nu, w = e;
                switch (e) {
                    case"keypress":
                        if (xr(t) === 0) break e;
                    case"keydown":
                    case"keyup":
                        g = yf;
                        break;
                    case"focusin":
                        w = "focus", g = zl;
                        break;
                    case"focusout":
                        w = "blur", g = zl;
                        break;
                    case"beforeblur":
                    case"afterblur":
                        g = zl;
                        break;
                    case"click":
                        if (t.button === 2) break e;
                    case"auxclick":
                    case"dblclick":
                    case"mousedown":
                    case"mousemove":
                    case"mouseup":
                    case"mouseout":
                    case"mouseover":
                    case"contextmenu":
                        g = Ju;
                        break;
                    case"drag":
                    case"dragend":
                    case"dragenter":
                    case"dragexit":
                    case"dragleave":
                    case"dragover":
                    case"dragstart":
                    case"drop":
                        g = lf;
                        break;
                    case"touchcancel":
                    case"touchend":
                    case"touchmove":
                    case"touchstart":
                        g = Sf;
                        break;
                    case Qs:
                    case Ks:
                    case Ys:
                        g = sf;
                        break;
                    case Xs:
                        g = Ef;
                        break;
                    case"scroll":
                        g = tf;
                        break;
                    case"wheel":
                        g = _f;
                        break;
                    case"copy":
                    case"cut":
                    case"paste":
                        g = cf;
                        break;
                    case"gotpointercapture":
                    case"lostpointercapture":
                    case"pointercancel":
                    case"pointerdown":
                    case"pointermove":
                    case"pointerout":
                    case"pointerover":
                    case"pointerup":
                        g = bu
                }
                var S = (n & 4) !== 0, F = !S && e === "scroll", f = S ? p !== null ? p + "Capture" : null : p;
                S = [];
                for (var a = c, d; a !== null;) {
                    d = a;
                    var v = d.stateNode;
                    if (d.tag === 5 && v !== null && (d = v, f !== null && (v = Dt(a, f), v != null && S.push(Vt(a, v, d)))), F) break;
                    a = a.return
                }
                0 < S.length && (p = new g(p, w, null, t, m), h.push({event: p, listeners: S}))
            }
        }
        if (!(n & 7)) {
            e:{
                if (p = e === "mouseover" || e === "pointerover", g = e === "mouseout" || e === "pointerout", p && t !== lo && (w = t.relatedTarget || t.fromElement) && (kn(w) || w[Ke])) break e;
                if ((g || p) && (p = m.window === m ? m : (p = m.ownerDocument) ? p.defaultView || p.parentWindow : window, g ? (w = t.relatedTarget || t.toElement, g = c, w = w ? kn(w) : null, w !== null && (F = On(w), w !== F || w.tag !== 5 && w.tag !== 6) && (w = null)) : (g = null, w = c), g !== w)) {
                    if (S = Ju, v = "onMouseLeave", f = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (S = bu, v = "onPointerLeave", f = "onPointerEnter", a = "pointer"), F = g == null ? p : Bn(g), d = w == null ? p : Bn(w), p = new S(v, a + "leave", g, t, m), p.target = F, p.relatedTarget = d, v = null, kn(m) === c && (S = new S(f, a + "enter", w, t, m), S.target = d, S.relatedTarget = F, v = S), F = v, g && w) n:{
                        for (S = g, f = w, a = 0, d = S; d; d = jn(d)) a++;
                        for (d = 0, v = f; v; v = jn(v)) d++;
                        for (; 0 < a - d;) S = jn(S), a--;
                        for (; 0 < d - a;) f = jn(f), d--;
                        for (; a--;) {
                            if (S === f || f !== null && S === f.alternate) break n;
                            S = jn(S), f = jn(f)
                        }
                        S = null
                    } else S = null;
                    g !== null && ci(h, p, g, S, !1), w !== null && F !== null && ci(h, F, w, S, !0)
                }
            }
            e:{
                if (p = c ? Bn(c) : window, g = p.nodeName && p.nodeName.toLowerCase(), g === "select" || g === "input" && p.type === "file") var E = Rf; else if (ti(p)) if (Bs) E = Mf; else {
                    E = jf;
                    var _ = Of
                } else (g = p.nodeName) && g.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (E = Df);
                if (E && (E = E(e, c))) {
                    $s(h, E, t, m);
                    break e
                }
                _ && _(e, p, c), e === "focusout" && (_ = p._wrapperState) && _.controlled && p.type === "number" && bl(p, "number", p.value)
            }
            switch (_ = c ? Bn(c) : window, e) {
                case"focusin":
                    (ti(_) || _.contentEditable === "true") && (Un = _, fo = c, Pt = null);
                    break;
                case"focusout":
                    Pt = fo = Un = null;
                    break;
                case"mousedown":
                    po = !0;
                    break;
                case"contextmenu":
                case"mouseup":
                case"dragend":
                    po = !1, ii(h, t, m);
                    break;
                case"selectionchange":
                    if (Uf) break;
                case"keydown":
                case"keyup":
                    ii(h, t, m)
            }
            var C;
            if (ru) e:{
                switch (e) {
                    case"compositionstart":
                        var N = "onCompositionStart";
                        break e;
                    case"compositionend":
                        N = "onCompositionEnd";
                        break e;
                    case"compositionupdate":
                        N = "onCompositionUpdate";
                        break e
                }
                N = void 0
            } else Fn ? Fs(e, t) && (N = "onCompositionEnd") : e === "keydown" && t.keyCode === 229 && (N = "onCompositionStart");
            N && (Is && t.locale !== "ko" && (Fn || N !== "onCompositionStart" ? N === "onCompositionEnd" && Fn && (C = Ms()) : (nn = m, eu = "value" in nn ? nn.value : nn.textContent, Fn = !0)), _ = Ur(c, N), 0 < _.length && (N = new qu(N, e, null, t, m), h.push({
                event: N,
                listeners: _
            }), C ? N.data = C : (C = Us(t), C !== null && (N.data = C)))), (C = Nf ? Pf(e, t) : zf(e, t)) && (c = Ur(c, "onBeforeInput"), 0 < c.length && (m = new qu("onBeforeInput", "beforeinput", null, t, m), h.push({
                event: m,
                listeners: c
            }), m.data = C))
        }
        Zs(h, n)
    })
}

function Vt(e, n, t) {
    return {instance: e, listener: n, currentTarget: t}
}

function Ur(e, n) {
    for (var t = n + "Capture", r = []; e !== null;) {
        var l = e, o = l.stateNode;
        l.tag === 5 && o !== null && (l = o, o = Dt(e, t), o != null && r.unshift(Vt(e, o, l)), o = Dt(e, n), o != null && r.push(Vt(e, o, l))), e = e.return
    }
    return r
}

function jn(e) {
    if (e === null) return null;
    do e = e.return; while (e && e.tag !== 5);
    return e || null
}

function ci(e, n, t, r, l) {
    for (var o = n._reactName, u = []; t !== null && t !== r;) {
        var i = t, s = i.alternate, c = i.stateNode;
        if (s !== null && s === r) break;
        i.tag === 5 && c !== null && (i = c, l ? (s = Dt(t, o), s != null && u.unshift(Vt(t, s, i))) : l || (s = Dt(t, o), s != null && u.push(Vt(t, s, i)))), t = t.return
    }
    u.length !== 0 && e.push({event: n, listeners: u})
}

var Af = /\r\n?/g, Hf = /\u0000|\uFFFD/g;

function fi(e) {
    return (typeof e == "string" ? e : "" + e).replace(Af, `
`).replace(Hf, "")
}

function dr(e, n, t) {
    if (n = fi(n), fi(e) !== n && t) throw Error(y(425))
}

function $r() {
}

var mo = null, ho = null;

function vo(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null
}

var yo = typeof setTimeout == "function" ? setTimeout : void 0,
    Wf = typeof clearTimeout == "function" ? clearTimeout : void 0,
    di = typeof Promise == "function" ? Promise : void 0,
    Qf = typeof queueMicrotask == "function" ? queueMicrotask : typeof di < "u" ? function (e) {
        return di.resolve(null).then(e).catch(Kf)
    } : yo;

function Kf(e) {
    setTimeout(function () {
        throw e
    })
}

function Il(e, n) {
    var t = n, r = 0;
    do {
        var l = t.nextSibling;
        if (e.removeChild(t), l && l.nodeType === 8) if (t = l.data, t === "/$") {
            if (r === 0) {
                e.removeChild(l), Ft(n);
                return
            }
            r--
        } else t !== "$" && t !== "$?" && t !== "$!" || r++;
        t = l
    } while (t);
    Ft(n)
}

function un(e) {
    for (; e != null; e = e.nextSibling) {
        var n = e.nodeType;
        if (n === 1 || n === 3) break;
        if (n === 8) {
            if (n = e.data, n === "$" || n === "$!" || n === "$?") break;
            if (n === "/$") return null
        }
    }
    return e
}

function pi(e) {
    e = e.previousSibling;
    for (var n = 0; e;) {
        if (e.nodeType === 8) {
            var t = e.data;
            if (t === "$" || t === "$!" || t === "$?") {
                if (n === 0) return e;
                n--
            } else t === "/$" && n++
        }
        e = e.previousSibling
    }
    return null
}

var st = Math.random().toString(36).slice(2), Fe = "__reactFiber$" + st, At = "__reactProps$" + st,
    Ke = "__reactContainer$" + st, go = "__reactEvents$" + st, Yf = "__reactListeners$" + st,
    Xf = "__reactHandles$" + st;

function kn(e) {
    var n = e[Fe];
    if (n) return n;
    for (var t = e.parentNode; t;) {
        if (n = t[Ke] || t[Fe]) {
            if (t = n.alternate, n.child !== null || t !== null && t.child !== null) for (e = pi(e); e !== null;) {
                if (t = e[Fe]) return t;
                e = pi(e)
            }
            return n
        }
        e = t, t = e.parentNode
    }
    return null
}

function qt(e) {
    return e = e[Fe] || e[Ke], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}

function Bn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(y(33))
}

function ul(e) {
    return e[At] || null
}

var wo = [], Vn = -1;

function hn(e) {
    return {current: e}
}

function I(e) {
    0 > Vn || (e.current = wo[Vn], wo[Vn] = null, Vn--)
}

function D(e, n) {
    Vn++, wo[Vn] = e.current, e.current = n
}

var pn = {}, le = hn(pn), fe = hn(!1), Nn = pn;

function et(e, n) {
    var t = e.type.contextTypes;
    if (!t) return pn;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === n) return r.__reactInternalMemoizedMaskedChildContext;
    var l = {}, o;
    for (o in t) l[o] = n[o];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = n, e.__reactInternalMemoizedMaskedChildContext = l), l
}

function de(e) {
    return e = e.childContextTypes, e != null
}

function Br() {
    I(fe), I(le)
}

function mi(e, n, t) {
    if (le.current !== pn) throw Error(y(168));
    D(le, n), D(fe, t)
}

function qs(e, n, t) {
    var r = e.stateNode;
    if (n = n.childContextTypes, typeof r.getChildContext != "function") return t;
    r = r.getChildContext();
    for (var l in r) if (!(l in n)) throw Error(y(108, Rc(e) || "Unknown", l));
    return V({}, t, r)
}

function Vr(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || pn, Nn = le.current, D(le, e), D(fe, fe.current), !0
}

function hi(e, n, t) {
    var r = e.stateNode;
    if (!r) throw Error(y(169));
    t ? (e = qs(e, n, Nn), r.__reactInternalMemoizedMergedChildContext = e, I(fe), I(le), D(le, e)) : I(fe), D(fe, t)
}

var Ve = null, il = !1, Fl = !1;

function bs(e) {
    Ve === null ? Ve = [e] : Ve.push(e)
}

function Gf(e) {
    il = !0, bs(e)
}

function vn() {
    if (!Fl && Ve !== null) {
        Fl = !0;
        var e = 0, n = O;
        try {
            var t = Ve;
            for (O = 1; e < t.length; e++) {
                var r = t[e];
                do r = r(!0); while (r !== null)
            }
            Ve = null, il = !1
        } catch (l) {
            throw Ve !== null && (Ve = Ve.slice(e + 1)), _s(Zo, vn), l
        } finally {
            O = n, Fl = !1
        }
    }
    return null
}

var An = [], Hn = 0, Ar = null, Hr = 0, ke = [], Ee = 0, Pn = null, Ae = 1, He = "";

function wn(e, n) {
    An[Hn++] = Hr, An[Hn++] = Ar, Ar = e, Hr = n
}

function ea(e, n, t) {
    ke[Ee++] = Ae, ke[Ee++] = He, ke[Ee++] = Pn, Pn = e;
    var r = Ae;
    e = He;
    var l = 32 - Oe(r) - 1;
    r &= ~(1 << l), t += 1;
    var o = 32 - Oe(n) + l;
    if (30 < o) {
        var u = l - l % 5;
        o = (r & (1 << u) - 1).toString(32), r >>= u, l -= u, Ae = 1 << 32 - Oe(n) + l | t << l | r, He = o + e
    } else Ae = 1 << o | t << l | r, He = e
}

function ou(e) {
    e.return !== null && (wn(e, 1), ea(e, 1, 0))
}

function uu(e) {
    for (; e === Ar;) Ar = An[--Hn], An[Hn] = null, Hr = An[--Hn], An[Hn] = null;
    for (; e === Pn;) Pn = ke[--Ee], ke[Ee] = null, He = ke[--Ee], ke[Ee] = null, Ae = ke[--Ee], ke[Ee] = null
}

var ve = null, he = null, U = !1, Re = null;

function na(e, n) {
    var t = xe(5, null, null, 0);
    t.elementType = "DELETED", t.stateNode = n, t.return = e, n = e.deletions, n === null ? (e.deletions = [t], e.flags |= 16) : n.push(t)
}

function vi(e, n) {
    switch (e.tag) {
        case 5:
            var t = e.type;
            return n = n.nodeType !== 1 || t.toLowerCase() !== n.nodeName.toLowerCase() ? null : n, n !== null ? (e.stateNode = n, ve = e, he = un(n.firstChild), !0) : !1;
        case 6:
            return n = e.pendingProps === "" || n.nodeType !== 3 ? null : n, n !== null ? (e.stateNode = n, ve = e, he = null, !0) : !1;
        case 13:
            return n = n.nodeType !== 8 ? null : n, n !== null ? (t = Pn !== null ? {
                id: Ae,
                overflow: He
            } : null, e.memoizedState = {
                dehydrated: n,
                treeContext: t,
                retryLane: 1073741824
            }, t = xe(18, null, null, 0), t.stateNode = n, t.return = e, e.child = t, ve = e, he = null, !0) : !1;
        default:
            return !1
    }
}

function So(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}

function ko(e) {
    if (U) {
        var n = he;
        if (n) {
            var t = n;
            if (!vi(e, n)) {
                if (So(e)) throw Error(y(418));
                n = un(t.nextSibling);
                var r = ve;
                n && vi(e, n) ? na(r, t) : (e.flags = e.flags & -4097 | 2, U = !1, ve = e)
            }
        } else {
            if (So(e)) throw Error(y(418));
            e.flags = e.flags & -4097 | 2, U = !1, ve = e
        }
    }
}

function yi(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
    ve = e
}

function pr(e) {
    if (e !== ve) return !1;
    if (!U) return yi(e), U = !0, !1;
    var n;
    if ((n = e.tag !== 3) && !(n = e.tag !== 5) && (n = e.type, n = n !== "head" && n !== "body" && !vo(e.type, e.memoizedProps)), n && (n = he)) {
        if (So(e)) throw ta(), Error(y(418));
        for (; n;) na(e, n), n = un(n.nextSibling)
    }
    if (yi(e), e.tag === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(y(317));
        e:{
            for (e = e.nextSibling, n = 0; e;) {
                if (e.nodeType === 8) {
                    var t = e.data;
                    if (t === "/$") {
                        if (n === 0) {
                            he = un(e.nextSibling);
                            break e
                        }
                        n--
                    } else t !== "$" && t !== "$!" && t !== "$?" || n++
                }
                e = e.nextSibling
            }
            he = null
        }
    } else he = ve ? un(e.stateNode.nextSibling) : null;
    return !0
}

function ta() {
    for (var e = he; e;) e = un(e.nextSibling)
}

function nt() {
    he = ve = null, U = !1
}

function iu(e) {
    Re === null ? Re = [e] : Re.push(e)
}

var Zf = Ge.ReactCurrentBatchConfig;

function vt(e, n, t) {
    if (e = t.ref, e !== null && typeof e != "function" && typeof e != "object") {
        if (t._owner) {
            if (t = t._owner, t) {
                if (t.tag !== 1) throw Error(y(309));
                var r = t.stateNode
            }
            if (!r) throw Error(y(147, e));
            var l = r, o = "" + e;
            return n !== null && n.ref !== null && typeof n.ref == "function" && n.ref._stringRef === o ? n.ref : (n = function (u) {
                var i = l.refs;
                u === null ? delete i[o] : i[o] = u
            }, n._stringRef = o, n)
        }
        if (typeof e != "string") throw Error(y(284));
        if (!t._owner) throw Error(y(290, e))
    }
    return e
}

function mr(e, n) {
    throw e = Object.prototype.toString.call(n), Error(y(31, e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e))
}

function gi(e) {
    var n = e._init;
    return n(e._payload)
}

function ra(e) {
    function n(f, a) {
        if (e) {
            var d = f.deletions;
            d === null ? (f.deletions = [a], f.flags |= 16) : d.push(a)
        }
    }

    function t(f, a) {
        if (!e) return null;
        for (; a !== null;) n(f, a), a = a.sibling;
        return null
    }

    function r(f, a) {
        for (f = new Map; a !== null;) a.key !== null ? f.set(a.key, a) : f.set(a.index, a), a = a.sibling;
        return f
    }

    function l(f, a) {
        return f = fn(f, a), f.index = 0, f.sibling = null, f
    }

    function o(f, a, d) {
        return f.index = d, e ? (d = f.alternate, d !== null ? (d = d.index, d < a ? (f.flags |= 2, a) : d) : (f.flags |= 2, a)) : (f.flags |= 1048576, a)
    }

    function u(f) {
        return e && f.alternate === null && (f.flags |= 2), f
    }

    function i(f, a, d, v) {
        return a === null || a.tag !== 6 ? (a = Wl(d, f.mode, v), a.return = f, a) : (a = l(a, d), a.return = f, a)
    }

    function s(f, a, d, v) {
        var E = d.type;
        return E === In ? m(f, a, d.props.children, v, d.key) : a !== null && (a.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Je && gi(E) === a.type) ? (v = l(a, d.props), v.ref = vt(f, a, d), v.return = f, v) : (v = Tr(d.type, d.key, d.props, null, f.mode, v), v.ref = vt(f, a, d), v.return = f, v)
    }

    function c(f, a, d, v) {
        return a === null || a.tag !== 4 || a.stateNode.containerInfo !== d.containerInfo || a.stateNode.implementation !== d.implementation ? (a = Ql(d, f.mode, v), a.return = f, a) : (a = l(a, d.children || []), a.return = f, a)
    }

    function m(f, a, d, v, E) {
        return a === null || a.tag !== 7 ? (a = Cn(d, f.mode, v, E), a.return = f, a) : (a = l(a, d), a.return = f, a)
    }

    function h(f, a, d) {
        if (typeof a == "string" && a !== "" || typeof a == "number") return a = Wl("" + a, f.mode, d), a.return = f, a;
        if (typeof a == "object" && a !== null) {
            switch (a.$$typeof) {
                case rr:
                    return d = Tr(a.type, a.key, a.props, null, f.mode, d), d.ref = vt(f, null, a), d.return = f, d;
                case Mn:
                    return a = Ql(a, f.mode, d), a.return = f, a;
                case Je:
                    var v = a._init;
                    return h(f, v(a._payload), d)
            }
            if (St(a) || ft(a)) return a = Cn(a, f.mode, d, null), a.return = f, a;
            mr(f, a)
        }
        return null
    }

    function p(f, a, d, v) {
        var E = a !== null ? a.key : null;
        if (typeof d == "string" && d !== "" || typeof d == "number") return E !== null ? null : i(f, a, "" + d, v);
        if (typeof d == "object" && d !== null) {
            switch (d.$$typeof) {
                case rr:
                    return d.key === E ? s(f, a, d, v) : null;
                case Mn:
                    return d.key === E ? c(f, a, d, v) : null;
                case Je:
                    return E = d._init, p(f, a, E(d._payload), v)
            }
            if (St(d) || ft(d)) return E !== null ? null : m(f, a, d, v, null);
            mr(f, d)
        }
        return null
    }

    function g(f, a, d, v, E) {
        if (typeof v == "string" && v !== "" || typeof v == "number") return f = f.get(d) || null, i(a, f, "" + v, E);
        if (typeof v == "object" && v !== null) {
            switch (v.$$typeof) {
                case rr:
                    return f = f.get(v.key === null ? d : v.key) || null, s(a, f, v, E);
                case Mn:
                    return f = f.get(v.key === null ? d : v.key) || null, c(a, f, v, E);
                case Je:
                    var _ = v._init;
                    return g(f, a, d, _(v._payload), E)
            }
            if (St(v) || ft(v)) return f = f.get(d) || null, m(a, f, v, E, null);
            mr(a, v)
        }
        return null
    }

    function w(f, a, d, v) {
        for (var E = null, _ = null, C = a, N = a = 0, H = null; C !== null && N < d.length; N++) {
            C.index > N ? (H = C, C = null) : H = C.sibling;
            var T = p(f, C, d[N], v);
            if (T === null) {
                C === null && (C = H);
                break
            }
            e && C && T.alternate === null && n(f, C), a = o(T, a, N), _ === null ? E = T : _.sibling = T, _ = T, C = H
        }
        if (N === d.length) return t(f, C), U && wn(f, N), E;
        if (C === null) {
            for (; N < d.length; N++) C = h(f, d[N], v), C !== null && (a = o(C, a, N), _ === null ? E = C : _.sibling = C, _ = C);
            return U && wn(f, N), E
        }
        for (C = r(f, C); N < d.length; N++) H = g(C, f, N, d[N], v), H !== null && (e && H.alternate !== null && C.delete(H.key === null ? N : H.key), a = o(H, a, N), _ === null ? E = H : _.sibling = H, _ = H);
        return e && C.forEach(function (Pe) {
            return n(f, Pe)
        }), U && wn(f, N), E
    }

    function S(f, a, d, v) {
        var E = ft(d);
        if (typeof E != "function") throw Error(y(150));
        if (d = E.call(d), d == null) throw Error(y(151));
        for (var _ = E = null, C = a, N = a = 0, H = null, T = d.next(); C !== null && !T.done; N++, T = d.next()) {
            C.index > N ? (H = C, C = null) : H = C.sibling;
            var Pe = p(f, C, T.value, v);
            if (Pe === null) {
                C === null && (C = H);
                break
            }
            e && C && Pe.alternate === null && n(f, C), a = o(Pe, a, N), _ === null ? E = Pe : _.sibling = Pe, _ = Pe, C = H
        }
        if (T.done) return t(f, C), U && wn(f, N), E;
        if (C === null) {
            for (; !T.done; N++, T = d.next()) T = h(f, T.value, v), T !== null && (a = o(T, a, N), _ === null ? E = T : _.sibling = T, _ = T);
            return U && wn(f, N), E
        }
        for (C = r(f, C); !T.done; N++, T = d.next()) T = g(C, f, N, T.value, v), T !== null && (e && T.alternate !== null && C.delete(T.key === null ? N : T.key), a = o(T, a, N), _ === null ? E = T : _.sibling = T, _ = T);
        return e && C.forEach(function (at) {
            return n(f, at)
        }), U && wn(f, N), E
    }

    function F(f, a, d, v) {
        if (typeof d == "object" && d !== null && d.type === In && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
            switch (d.$$typeof) {
                case rr:
                    e:{
                        for (var E = d.key, _ = a; _ !== null;) {
                            if (_.key === E) {
                                if (E = d.type, E === In) {
                                    if (_.tag === 7) {
                                        t(f, _.sibling), a = l(_, d.props.children), a.return = f, f = a;
                                        break e
                                    }
                                } else if (_.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Je && gi(E) === _.type) {
                                    t(f, _.sibling), a = l(_, d.props), a.ref = vt(f, _, d), a.return = f, f = a;
                                    break e
                                }
                                t(f, _);
                                break
                            } else n(f, _);
                            _ = _.sibling
                        }
                        d.type === In ? (a = Cn(d.props.children, f.mode, v, d.key), a.return = f, f = a) : (v = Tr(d.type, d.key, d.props, null, f.mode, v), v.ref = vt(f, a, d), v.return = f, f = v)
                    }
                    return u(f);
                case Mn:
                    e:{
                        for (_ = d.key; a !== null;) {
                            if (a.key === _) if (a.tag === 4 && a.stateNode.containerInfo === d.containerInfo && a.stateNode.implementation === d.implementation) {
                                t(f, a.sibling), a = l(a, d.children || []), a.return = f, f = a;
                                break e
                            } else {
                                t(f, a);
                                break
                            } else n(f, a);
                            a = a.sibling
                        }
                        a = Ql(d, f.mode, v), a.return = f, f = a
                    }
                    return u(f);
                case Je:
                    return _ = d._init, F(f, a, _(d._payload), v)
            }
            if (St(d)) return w(f, a, d, v);
            if (ft(d)) return S(f, a, d, v);
            mr(f, d)
        }
        return typeof d == "string" && d !== "" || typeof d == "number" ? (d = "" + d, a !== null && a.tag === 6 ? (t(f, a.sibling), a = l(a, d), a.return = f, f = a) : (t(f, a), a = Wl(d, f.mode, v), a.return = f, f = a), u(f)) : t(f, a)
    }

    return F
}

var tt = ra(!0), la = ra(!1), Wr = hn(null), Qr = null, Wn = null, su = null;

function au() {
    su = Wn = Qr = null
}

function cu(e) {
    var n = Wr.current;
    I(Wr), e._currentValue = n
}

function Eo(e, n, t) {
    for (; e !== null;) {
        var r = e.alternate;
        if ((e.childLanes & n) !== n ? (e.childLanes |= n, r !== null && (r.childLanes |= n)) : r !== null && (r.childLanes & n) !== n && (r.childLanes |= n), e === t) break;
        e = e.return
    }
}

function Jn(e, n) {
    Qr = e, su = Wn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & n && (ce = !0), e.firstContext = null)
}

function Ce(e) {
    var n = e._currentValue;
    if (su !== e) if (e = {context: e, memoizedValue: n, next: null}, Wn === null) {
        if (Qr === null) throw Error(y(308));
        Wn = e, Qr.dependencies = {lanes: 0, firstContext: e}
    } else Wn = Wn.next = e;
    return n
}

var En = null;

function fu(e) {
    En === null ? En = [e] : En.push(e)
}

function oa(e, n, t, r) {
    var l = n.interleaved;
    return l === null ? (t.next = t, fu(n)) : (t.next = l.next, l.next = t), n.interleaved = t, Ye(e, r)
}

function Ye(e, n) {
    e.lanes |= n;
    var t = e.alternate;
    for (t !== null && (t.lanes |= n), t = e, e = e.return; e !== null;) e.childLanes |= n, t = e.alternate, t !== null && (t.childLanes |= n), t = e, e = e.return;
    return t.tag === 3 ? t.stateNode : null
}

var qe = !1;

function du(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {pending: null, interleaved: null, lanes: 0},
        effects: null
    }
}

function ua(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
    })
}

function We(e, n) {
    return {eventTime: e, lane: n, tag: 0, payload: null, callback: null, next: null}
}

function sn(e, n, t) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, R & 2) {
        var l = r.pending;
        return l === null ? n.next = n : (n.next = l.next, l.next = n), r.pending = n, Ye(e, t)
    }
    return l = r.interleaved, l === null ? (n.next = n, fu(r)) : (n.next = l.next, l.next = n), r.interleaved = n, Ye(e, t)
}

function _r(e, n, t) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (t & 4194240) !== 0)) {
        var r = n.lanes;
        r &= e.pendingLanes, t |= r, n.lanes = t, Jo(e, t)
    }
}

function wi(e, n) {
    var t = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, t === r)) {
        var l = null, o = null;
        if (t = t.firstBaseUpdate, t !== null) {
            do {
                var u = {
                    eventTime: t.eventTime,
                    lane: t.lane,
                    tag: t.tag,
                    payload: t.payload,
                    callback: t.callback,
                    next: null
                };
                o === null ? l = o = u : o = o.next = u, t = t.next
            } while (t !== null);
            o === null ? l = o = n : o = o.next = n
        } else l = o = n;
        t = {
            baseState: r.baseState,
            firstBaseUpdate: l,
            lastBaseUpdate: o,
            shared: r.shared,
            effects: r.effects
        }, e.updateQueue = t;
        return
    }
    e = t.lastBaseUpdate, e === null ? t.firstBaseUpdate = n : e.next = n, t.lastBaseUpdate = n
}

function Kr(e, n, t, r) {
    var l = e.updateQueue;
    qe = !1;
    var o = l.firstBaseUpdate, u = l.lastBaseUpdate, i = l.shared.pending;
    if (i !== null) {
        l.shared.pending = null;
        var s = i, c = s.next;
        s.next = null, u === null ? o = c : u.next = c, u = s;
        var m = e.alternate;
        m !== null && (m = m.updateQueue, i = m.lastBaseUpdate, i !== u && (i === null ? m.firstBaseUpdate = c : i.next = c, m.lastBaseUpdate = s))
    }
    if (o !== null) {
        var h = l.baseState;
        u = 0, m = c = s = null, i = o;
        do {
            var p = i.lane, g = i.eventTime;
            if ((r & p) === p) {
                m !== null && (m = m.next = {
                    eventTime: g,
                    lane: 0,
                    tag: i.tag,
                    payload: i.payload,
                    callback: i.callback,
                    next: null
                });
                e:{
                    var w = e, S = i;
                    switch (p = n, g = t, S.tag) {
                        case 1:
                            if (w = S.payload, typeof w == "function") {
                                h = w.call(g, h, p);
                                break e
                            }
                            h = w;
                            break e;
                        case 3:
                            w.flags = w.flags & -65537 | 128;
                        case 0:
                            if (w = S.payload, p = typeof w == "function" ? w.call(g, h, p) : w, p == null) break e;
                            h = V({}, h, p);
                            break e;
                        case 2:
                            qe = !0
                    }
                }
                i.callback !== null && i.lane !== 0 && (e.flags |= 64, p = l.effects, p === null ? l.effects = [i] : p.push(i))
            } else g = {
                eventTime: g,
                lane: p,
                tag: i.tag,
                payload: i.payload,
                callback: i.callback,
                next: null
            }, m === null ? (c = m = g, s = h) : m = m.next = g, u |= p;
            if (i = i.next, i === null) {
                if (i = l.shared.pending, i === null) break;
                p = i, i = p.next, p.next = null, l.lastBaseUpdate = p, l.shared.pending = null
            }
        } while (1);
        if (m === null && (s = h), l.baseState = s, l.firstBaseUpdate = c, l.lastBaseUpdate = m, n = l.shared.interleaved, n !== null) {
            l = n;
            do u |= l.lane, l = l.next; while (l !== n)
        } else o === null && (l.shared.lanes = 0);
        Ln |= u, e.lanes = u, e.memoizedState = h
    }
}

function Si(e, n, t) {
    if (e = n.effects, n.effects = null, e !== null) for (n = 0; n < e.length; n++) {
        var r = e[n], l = r.callback;
        if (l !== null) {
            if (r.callback = null, r = t, typeof l != "function") throw Error(y(191, l));
            l.call(r)
        }
    }
}

var bt = {}, $e = hn(bt), Ht = hn(bt), Wt = hn(bt);

function xn(e) {
    if (e === bt) throw Error(y(174));
    return e
}

function pu(e, n) {
    switch (D(Wt, n), D(Ht, e), D($e, bt), e = n.nodeType, e) {
        case 9:
        case 11:
            n = (n = n.documentElement) ? n.namespaceURI : no(null, "");
            break;
        default:
            e = e === 8 ? n.parentNode : n, n = e.namespaceURI || null, e = e.tagName, n = no(n, e)
    }
    I($e), D($e, n)
}

function rt() {
    I($e), I(Ht), I(Wt)
}

function ia(e) {
    xn(Wt.current);
    var n = xn($e.current), t = no(n, e.type);
    n !== t && (D(Ht, e), D($e, t))
}

function mu(e) {
    Ht.current === e && (I($e), I(Ht))
}

var $ = hn(0);

function Yr(e) {
    for (var n = e; n !== null;) {
        if (n.tag === 13) {
            var t = n.memoizedState;
            if (t !== null && (t = t.dehydrated, t === null || t.data === "$?" || t.data === "$!")) return n
        } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
            if (n.flags & 128) return n
        } else if (n.child !== null) {
            n.child.return = n, n = n.child;
            continue
        }
        if (n === e) break;
        for (; n.sibling === null;) {
            if (n.return === null || n.return === e) return null;
            n = n.return
        }
        n.sibling.return = n.return, n = n.sibling
    }
    return null
}

var Ul = [];

function hu() {
    for (var e = 0; e < Ul.length; e++) Ul[e]._workInProgressVersionPrimary = null;
    Ul.length = 0
}

var Cr = Ge.ReactCurrentDispatcher, $l = Ge.ReactCurrentBatchConfig, zn = 0, B = null, Y = null, Z = null, Xr = !1,
    zt = !1, Qt = 0, Jf = 0;

function ne() {
    throw Error(y(321))
}

function vu(e, n) {
    if (n === null) return !1;
    for (var t = 0; t < n.length && t < e.length; t++) if (!De(e[t], n[t])) return !1;
    return !0
}

function yu(e, n, t, r, l, o) {
    if (zn = o, B = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, Cr.current = e === null || e.memoizedState === null ? nd : td, e = t(r, l), zt) {
        o = 0;
        do {
            if (zt = !1, Qt = 0, 25 <= o) throw Error(y(301));
            o += 1, Z = Y = null, n.updateQueue = null, Cr.current = rd, e = t(r, l)
        } while (zt)
    }
    if (Cr.current = Gr, n = Y !== null && Y.next !== null, zn = 0, Z = Y = B = null, Xr = !1, n) throw Error(y(300));
    return e
}

function gu() {
    var e = Qt !== 0;
    return Qt = 0, e
}

function Ie() {
    var e = {memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null};
    return Z === null ? B.memoizedState = Z = e : Z = Z.next = e, Z
}

function Ne() {
    if (Y === null) {
        var e = B.alternate;
        e = e !== null ? e.memoizedState : null
    } else e = Y.next;
    var n = Z === null ? B.memoizedState : Z.next;
    if (n !== null) Z = n, Y = e; else {
        if (e === null) throw Error(y(310));
        Y = e, e = {
            memoizedState: Y.memoizedState,
            baseState: Y.baseState,
            baseQueue: Y.baseQueue,
            queue: Y.queue,
            next: null
        }, Z === null ? B.memoizedState = Z = e : Z = Z.next = e
    }
    return Z
}

function Kt(e, n) {
    return typeof n == "function" ? n(e) : n
}

function Bl(e) {
    var n = Ne(), t = n.queue;
    if (t === null) throw Error(y(311));
    t.lastRenderedReducer = e;
    var r = Y, l = r.baseQueue, o = t.pending;
    if (o !== null) {
        if (l !== null) {
            var u = l.next;
            l.next = o.next, o.next = u
        }
        r.baseQueue = l = o, t.pending = null
    }
    if (l !== null) {
        o = l.next, r = r.baseState;
        var i = u = null, s = null, c = o;
        do {
            var m = c.lane;
            if ((zn & m) === m) s !== null && (s = s.next = {
                lane: 0,
                action: c.action,
                hasEagerState: c.hasEagerState,
                eagerState: c.eagerState,
                next: null
            }), r = c.hasEagerState ? c.eagerState : e(r, c.action); else {
                var h = {
                    lane: m,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null
                };
                s === null ? (i = s = h, u = r) : s = s.next = h, B.lanes |= m, Ln |= m
            }
            c = c.next
        } while (c !== null && c !== o);
        s === null ? u = r : s.next = i, De(r, n.memoizedState) || (ce = !0), n.memoizedState = r, n.baseState = u, n.baseQueue = s, t.lastRenderedState = r
    }
    if (e = t.interleaved, e !== null) {
        l = e;
        do o = l.lane, B.lanes |= o, Ln |= o, l = l.next; while (l !== e)
    } else l === null && (t.lanes = 0);
    return [n.memoizedState, t.dispatch]
}

function Vl(e) {
    var n = Ne(), t = n.queue;
    if (t === null) throw Error(y(311));
    t.lastRenderedReducer = e;
    var r = t.dispatch, l = t.pending, o = n.memoizedState;
    if (l !== null) {
        t.pending = null;
        var u = l = l.next;
        do o = e(o, u.action), u = u.next; while (u !== l);
        De(o, n.memoizedState) || (ce = !0), n.memoizedState = o, n.baseQueue === null && (n.baseState = o), t.lastRenderedState = o
    }
    return [o, r]
}

function sa() {
}

function aa(e, n) {
    var t = B, r = Ne(), l = n(), o = !De(r.memoizedState, l);
    if (o && (r.memoizedState = l, ce = !0), r = r.queue, wu(da.bind(null, t, r, e), [e]), r.getSnapshot !== n || o || Z !== null && Z.memoizedState.tag & 1) {
        if (t.flags |= 2048, Yt(9, fa.bind(null, t, r, l, n), void 0, null), J === null) throw Error(y(349));
        zn & 30 || ca(t, n, l)
    }
    return l
}

function ca(e, n, t) {
    e.flags |= 16384, e = {getSnapshot: n, value: t}, n = B.updateQueue, n === null ? (n = {
        lastEffect: null,
        stores: null
    }, B.updateQueue = n, n.stores = [e]) : (t = n.stores, t === null ? n.stores = [e] : t.push(e))
}

function fa(e, n, t, r) {
    n.value = t, n.getSnapshot = r, pa(n) && ma(e)
}

function da(e, n, t) {
    return t(function () {
        pa(n) && ma(e)
    })
}

function pa(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
        var t = n();
        return !De(e, t)
    } catch {
        return !0
    }
}

function ma(e) {
    var n = Ye(e, 1);
    n !== null && je(n, e, 1, -1)
}

function ki(e) {
    var n = Ie();
    return typeof e == "function" && (e = e()), n.memoizedState = n.baseState = e, e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Kt,
        lastRenderedState: e
    }, n.queue = e, e = e.dispatch = ed.bind(null, B, e), [n.memoizedState, e]
}

function Yt(e, n, t, r) {
    return e = {
        tag: e,
        create: n,
        destroy: t,
        deps: r,
        next: null
    }, n = B.updateQueue, n === null ? (n = {
        lastEffect: null,
        stores: null
    }, B.updateQueue = n, n.lastEffect = e.next = e) : (t = n.lastEffect, t === null ? n.lastEffect = e.next = e : (r = t.next, t.next = e, e.next = r, n.lastEffect = e)), e
}

function ha() {
    return Ne().memoizedState
}

function Nr(e, n, t, r) {
    var l = Ie();
    B.flags |= e, l.memoizedState = Yt(1 | n, t, void 0, r === void 0 ? null : r)
}

function sl(e, n, t, r) {
    var l = Ne();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (Y !== null) {
        var u = Y.memoizedState;
        if (o = u.destroy, r !== null && vu(r, u.deps)) {
            l.memoizedState = Yt(n, t, o, r);
            return
        }
    }
    B.flags |= e, l.memoizedState = Yt(1 | n, t, o, r)
}

function Ei(e, n) {
    return Nr(8390656, 8, e, n)
}

function wu(e, n) {
    return sl(2048, 8, e, n)
}

function va(e, n) {
    return sl(4, 2, e, n)
}

function ya(e, n) {
    return sl(4, 4, e, n)
}

function ga(e, n) {
    if (typeof n == "function") return e = e(), n(e), function () {
        n(null)
    };
    if (n != null) return e = e(), n.current = e, function () {
        n.current = null
    }
}

function wa(e, n, t) {
    return t = t != null ? t.concat([e]) : null, sl(4, 4, ga.bind(null, n, e), t)
}

function Su() {
}

function Sa(e, n) {
    var t = Ne();
    n = n === void 0 ? null : n;
    var r = t.memoizedState;
    return r !== null && n !== null && vu(n, r[1]) ? r[0] : (t.memoizedState = [e, n], e)
}

function ka(e, n) {
    var t = Ne();
    n = n === void 0 ? null : n;
    var r = t.memoizedState;
    return r !== null && n !== null && vu(n, r[1]) ? r[0] : (e = e(), t.memoizedState = [e, n], e)
}

function Ea(e, n, t) {
    return zn & 21 ? (De(t, n) || (t = Ps(), B.lanes |= t, Ln |= t, e.baseState = !0), n) : (e.baseState && (e.baseState = !1, ce = !0), e.memoizedState = t)
}

function qf(e, n) {
    var t = O;
    O = t !== 0 && 4 > t ? t : 4, e(!0);
    var r = $l.transition;
    $l.transition = {};
    try {
        e(!1), n()
    } finally {
        O = t, $l.transition = r
    }
}

function xa() {
    return Ne().memoizedState
}

function bf(e, n, t) {
    var r = cn(e);
    if (t = {
        lane: r,
        action: t,
        hasEagerState: !1,
        eagerState: null,
        next: null
    }, _a(e)) Ca(n, t); else if (t = oa(e, n, t, r), t !== null) {
        var l = ue();
        je(t, e, r, l), Na(t, n, r)
    }
}

function ed(e, n, t) {
    var r = cn(e), l = {lane: r, action: t, hasEagerState: !1, eagerState: null, next: null};
    if (_a(e)) Ca(n, l); else {
        var o = e.alternate;
        if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = n.lastRenderedReducer, o !== null)) try {
            var u = n.lastRenderedState, i = o(u, t);
            if (l.hasEagerState = !0, l.eagerState = i, De(i, u)) {
                var s = n.interleaved;
                s === null ? (l.next = l, fu(n)) : (l.next = s.next, s.next = l), n.interleaved = l;
                return
            }
        } catch {
        } finally {
        }
        t = oa(e, n, l, r), t !== null && (l = ue(), je(t, e, r, l), Na(t, n, r))
    }
}

function _a(e) {
    var n = e.alternate;
    return e === B || n !== null && n === B
}

function Ca(e, n) {
    zt = Xr = !0;
    var t = e.pending;
    t === null ? n.next = n : (n.next = t.next, t.next = n), e.pending = n
}

function Na(e, n, t) {
    if (t & 4194240) {
        var r = n.lanes;
        r &= e.pendingLanes, t |= r, n.lanes = t, Jo(e, t)
    }
}

var Gr = {
    readContext: Ce,
    useCallback: ne,
    useContext: ne,
    useEffect: ne,
    useImperativeHandle: ne,
    useInsertionEffect: ne,
    useLayoutEffect: ne,
    useMemo: ne,
    useReducer: ne,
    useRef: ne,
    useState: ne,
    useDebugValue: ne,
    useDeferredValue: ne,
    useTransition: ne,
    useMutableSource: ne,
    useSyncExternalStore: ne,
    useId: ne,
    unstable_isNewReconciler: !1
}, nd = {
    readContext: Ce, useCallback: function (e, n) {
        return Ie().memoizedState = [e, n === void 0 ? null : n], e
    }, useContext: Ce, useEffect: Ei, useImperativeHandle: function (e, n, t) {
        return t = t != null ? t.concat([e]) : null, Nr(4194308, 4, ga.bind(null, n, e), t)
    }, useLayoutEffect: function (e, n) {
        return Nr(4194308, 4, e, n)
    }, useInsertionEffect: function (e, n) {
        return Nr(4, 2, e, n)
    }, useMemo: function (e, n) {
        var t = Ie();
        return n = n === void 0 ? null : n, e = e(), t.memoizedState = [e, n], e
    }, useReducer: function (e, n, t) {
        var r = Ie();
        return n = t !== void 0 ? t(n) : n, r.memoizedState = r.baseState = n, e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: n
        }, r.queue = e, e = e.dispatch = bf.bind(null, B, e), [r.memoizedState, e]
    }, useRef: function (e) {
        var n = Ie();
        return e = {current: e}, n.memoizedState = e
    }, useState: ki, useDebugValue: Su, useDeferredValue: function (e) {
        return Ie().memoizedState = e
    }, useTransition: function () {
        var e = ki(!1), n = e[0];
        return e = qf.bind(null, e[1]), Ie().memoizedState = e, [n, e]
    }, useMutableSource: function () {
    }, useSyncExternalStore: function (e, n, t) {
        var r = B, l = Ie();
        if (U) {
            if (t === void 0) throw Error(y(407));
            t = t()
        } else {
            if (t = n(), J === null) throw Error(y(349));
            zn & 30 || ca(r, n, t)
        }
        l.memoizedState = t;
        var o = {value: t, getSnapshot: n};
        return l.queue = o, Ei(da.bind(null, r, o, e), [e]), r.flags |= 2048, Yt(9, fa.bind(null, r, o, t, n), void 0, null), t
    }, useId: function () {
        var e = Ie(), n = J.identifierPrefix;
        if (U) {
            var t = He, r = Ae;
            t = (r & ~(1 << 32 - Oe(r) - 1)).toString(32) + t, n = ":" + n + "R" + t, t = Qt++, 0 < t && (n += "H" + t.toString(32)), n += ":"
        } else t = Jf++, n = ":" + n + "r" + t.toString(32) + ":";
        return e.memoizedState = n
    }, unstable_isNewReconciler: !1
}, td = {
    readContext: Ce,
    useCallback: Sa,
    useContext: Ce,
    useEffect: wu,
    useImperativeHandle: wa,
    useInsertionEffect: va,
    useLayoutEffect: ya,
    useMemo: ka,
    useReducer: Bl,
    useRef: ha,
    useState: function () {
        return Bl(Kt)
    },
    useDebugValue: Su,
    useDeferredValue: function (e) {
        var n = Ne();
        return Ea(n, Y.memoizedState, e)
    },
    useTransition: function () {
        var e = Bl(Kt)[0], n = Ne().memoizedState;
        return [e, n]
    },
    useMutableSource: sa,
    useSyncExternalStore: aa,
    useId: xa,
    unstable_isNewReconciler: !1
}, rd = {
    readContext: Ce,
    useCallback: Sa,
    useContext: Ce,
    useEffect: wu,
    useImperativeHandle: wa,
    useInsertionEffect: va,
    useLayoutEffect: ya,
    useMemo: ka,
    useReducer: Vl,
    useRef: ha,
    useState: function () {
        return Vl(Kt)
    },
    useDebugValue: Su,
    useDeferredValue: function (e) {
        var n = Ne();
        return Y === null ? n.memoizedState = e : Ea(n, Y.memoizedState, e)
    },
    useTransition: function () {
        var e = Vl(Kt)[0], n = Ne().memoizedState;
        return [e, n]
    },
    useMutableSource: sa,
    useSyncExternalStore: aa,
    useId: xa,
    unstable_isNewReconciler: !1
};

function Le(e, n) {
    if (e && e.defaultProps) {
        n = V({}, n), e = e.defaultProps;
        for (var t in e) n[t] === void 0 && (n[t] = e[t]);
        return n
    }
    return n
}

function xo(e, n, t, r) {
    n = e.memoizedState, t = t(r, n), t = t == null ? n : V({}, n, t), e.memoizedState = t, e.lanes === 0 && (e.updateQueue.baseState = t)
}

var al = {
    isMounted: function (e) {
        return (e = e._reactInternals) ? On(e) === e : !1
    }, enqueueSetState: function (e, n, t) {
        e = e._reactInternals;
        var r = ue(), l = cn(e), o = We(r, l);
        o.payload = n, t != null && (o.callback = t), n = sn(e, o, l), n !== null && (je(n, e, l, r), _r(n, e, l))
    }, enqueueReplaceState: function (e, n, t) {
        e = e._reactInternals;
        var r = ue(), l = cn(e), o = We(r, l);
        o.tag = 1, o.payload = n, t != null && (o.callback = t), n = sn(e, o, l), n !== null && (je(n, e, l, r), _r(n, e, l))
    }, enqueueForceUpdate: function (e, n) {
        e = e._reactInternals;
        var t = ue(), r = cn(e), l = We(t, r);
        l.tag = 2, n != null && (l.callback = n), n = sn(e, l, r), n !== null && (je(n, e, r, t), _r(n, e, r))
    }
};

function xi(e, n, t, r, l, o, u) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, u) : n.prototype && n.prototype.isPureReactComponent ? !$t(t, r) || !$t(l, o) : !0
}

function Pa(e, n, t) {
    var r = !1, l = pn, o = n.contextType;
    return typeof o == "object" && o !== null ? o = Ce(o) : (l = de(n) ? Nn : le.current, r = n.contextTypes, o = (r = r != null) ? et(e, l) : pn), n = new n(t, o), e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = al, e.stateNode = n, n._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), n
}

function _i(e, n, t, r) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(t, r), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(t, r), n.state !== e && al.enqueueReplaceState(n, n.state, null)
}

function _o(e, n, t, r) {
    var l = e.stateNode;
    l.props = t, l.state = e.memoizedState, l.refs = {}, du(e);
    var o = n.contextType;
    typeof o == "object" && o !== null ? l.context = Ce(o) : (o = de(n) ? Nn : le.current, l.context = et(e, o)), l.state = e.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (xo(e, n, o, t), l.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (n = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), n !== l.state && al.enqueueReplaceState(l, l.state, null), Kr(e, t, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308)
}

function lt(e, n) {
    try {
        var t = "", r = n;
        do t += Tc(r), r = r.return; while (r);
        var l = t
    } catch (o) {
        l = `
Error generating stack: ` + o.message + `
` + o.stack
    }
    return {value: e, source: n, stack: l, digest: null}
}

function Al(e, n, t) {
    return {value: e, source: null, stack: t ?? null, digest: n ?? null}
}

function Co(e, n) {
    try {
        console.error(n.value)
    } catch (t) {
        setTimeout(function () {
            throw t
        })
    }
}

var ld = typeof WeakMap == "function" ? WeakMap : Map;

function za(e, n, t) {
    t = We(-1, t), t.tag = 3, t.payload = {element: null};
    var r = n.value;
    return t.callback = function () {
        Jr || (Jr = !0, Mo = r), Co(e, n)
    }, t
}

function La(e, n, t) {
    t = We(-1, t), t.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var l = n.value;
        t.payload = function () {
            return r(l)
        }, t.callback = function () {
            Co(e, n)
        }
    }
    var o = e.stateNode;
    return o !== null && typeof o.componentDidCatch == "function" && (t.callback = function () {
        Co(e, n), typeof r != "function" && (an === null ? an = new Set([this]) : an.add(this));
        var u = n.stack;
        this.componentDidCatch(n.value, {componentStack: u !== null ? u : ""})
    }), t
}

function Ci(e, n, t) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new ld;
        var l = new Set;
        r.set(n, l)
    } else l = r.get(n), l === void 0 && (l = new Set, r.set(n, l));
    l.has(t) || (l.add(t), e = gd.bind(null, e, n, t), n.then(e, e))
}

function Ni(e) {
    do {
        var n;
        if ((n = e.tag === 13) && (n = e.memoizedState, n = n !== null ? n.dehydrated !== null : !0), n) return e;
        e = e.return
    } while (e !== null);
    return null
}

function Pi(e, n, t, r, l) {
    return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === n ? e.flags |= 65536 : (e.flags |= 128, t.flags |= 131072, t.flags &= -52805, t.tag === 1 && (t.alternate === null ? t.tag = 17 : (n = We(-1, 1), n.tag = 2, sn(t, n, 1))), t.lanes |= 1), e)
}

var od = Ge.ReactCurrentOwner, ce = !1;

function oe(e, n, t, r) {
    n.child = e === null ? la(n, null, t, r) : tt(n, e.child, t, r)
}

function zi(e, n, t, r, l) {
    t = t.render;
    var o = n.ref;
    return Jn(n, l), r = yu(e, n, t, r, o, l), t = gu(), e !== null && !ce ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~l, Xe(e, n, l)) : (U && t && ou(n), n.flags |= 1, oe(e, n, r, l), n.child)
}

function Li(e, n, t, r, l) {
    if (e === null) {
        var o = t.type;
        return typeof o == "function" && !zu(o) && o.defaultProps === void 0 && t.compare === null && t.defaultProps === void 0 ? (n.tag = 15, n.type = o, Ta(e, n, o, r, l)) : (e = Tr(t.type, null, r, n, n.mode, l), e.ref = n.ref, e.return = n, n.child = e)
    }
    if (o = e.child, !(e.lanes & l)) {
        var u = o.memoizedProps;
        if (t = t.compare, t = t !== null ? t : $t, t(u, r) && e.ref === n.ref) return Xe(e, n, l)
    }
    return n.flags |= 1, e = fn(o, r), e.ref = n.ref, e.return = n, n.child = e
}

function Ta(e, n, t, r, l) {
    if (e !== null) {
        var o = e.memoizedProps;
        if ($t(o, r) && e.ref === n.ref) if (ce = !1, n.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (ce = !0); else return n.lanes = e.lanes, Xe(e, n, l)
    }
    return No(e, n, t, r, l)
}

function Ra(e, n, t) {
    var r = n.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden") if (!(n.mode & 1)) n.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
    }, D(Kn, me), me |= t; else {
        if (!(t & 1073741824)) return e = o !== null ? o.baseLanes | t : t, n.lanes = n.childLanes = 1073741824, n.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null
        }, n.updateQueue = null, D(Kn, me), me |= e, null;
        n.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null
        }, r = o !== null ? o.baseLanes : t, D(Kn, me), me |= r
    } else o !== null ? (r = o.baseLanes | t, n.memoizedState = null) : r = t, D(Kn, me), me |= r;
    return oe(e, n, l, t), n.child
}

function Oa(e, n) {
    var t = n.ref;
    (e === null && t !== null || e !== null && e.ref !== t) && (n.flags |= 512, n.flags |= 2097152)
}

function No(e, n, t, r, l) {
    var o = de(t) ? Nn : le.current;
    return o = et(n, o), Jn(n, l), t = yu(e, n, t, r, o, l), r = gu(), e !== null && !ce ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~l, Xe(e, n, l)) : (U && r && ou(n), n.flags |= 1, oe(e, n, t, l), n.child)
}

function Ti(e, n, t, r, l) {
    if (de(t)) {
        var o = !0;
        Vr(n)
    } else o = !1;
    if (Jn(n, l), n.stateNode === null) Pr(e, n), Pa(n, t, r), _o(n, t, r, l), r = !0; else if (e === null) {
        var u = n.stateNode, i = n.memoizedProps;
        u.props = i;
        var s = u.context, c = t.contextType;
        typeof c == "object" && c !== null ? c = Ce(c) : (c = de(t) ? Nn : le.current, c = et(n, c));
        var m = t.getDerivedStateFromProps,
            h = typeof m == "function" || typeof u.getSnapshotBeforeUpdate == "function";
        h || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== r || s !== c) && _i(n, u, r, c), qe = !1;
        var p = n.memoizedState;
        u.state = p, Kr(n, r, u, l), s = n.memoizedState, i !== r || p !== s || fe.current || qe ? (typeof m == "function" && (xo(n, t, m, r), s = n.memoizedState), (i = qe || xi(n, t, i, r, p, s, c)) ? (h || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = r, n.memoizedState = s), u.props = r, u.state = s, u.context = c, r = i) : (typeof u.componentDidMount == "function" && (n.flags |= 4194308), r = !1)
    } else {
        u = n.stateNode, ua(e, n), i = n.memoizedProps, c = n.type === n.elementType ? i : Le(n.type, i), u.props = c, h = n.pendingProps, p = u.context, s = t.contextType, typeof s == "object" && s !== null ? s = Ce(s) : (s = de(t) ? Nn : le.current, s = et(n, s));
        var g = t.getDerivedStateFromProps;
        (m = typeof g == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== h || p !== s) && _i(n, u, r, s), qe = !1, p = n.memoizedState, u.state = p, Kr(n, r, u, l);
        var w = n.memoizedState;
        i !== h || p !== w || fe.current || qe ? (typeof g == "function" && (xo(n, t, g, r), w = n.memoizedState), (c = qe || xi(n, t, c, r, p, w, s) || !1) ? (m || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(r, w, s), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(r, w, s)), typeof u.componentDidUpdate == "function" && (n.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (n.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (n.flags |= 1024), n.memoizedProps = r, n.memoizedState = w), u.props = r, u.state = w, u.context = s, r = c) : (typeof u.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (n.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (n.flags |= 1024), r = !1)
    }
    return Po(e, n, t, r, o, l)
}

function Po(e, n, t, r, l, o) {
    Oa(e, n);
    var u = (n.flags & 128) !== 0;
    if (!r && !u) return l && hi(n, t, !1), Xe(e, n, o);
    r = n.stateNode, od.current = n;
    var i = u && typeof t.getDerivedStateFromError != "function" ? null : r.render();
    return n.flags |= 1, e !== null && u ? (n.child = tt(n, e.child, null, o), n.child = tt(n, null, i, o)) : oe(e, n, i, o), n.memoizedState = r.state, l && hi(n, t, !0), n.child
}

function ja(e) {
    var n = e.stateNode;
    n.pendingContext ? mi(e, n.pendingContext, n.pendingContext !== n.context) : n.context && mi(e, n.context, !1), pu(e, n.containerInfo)
}

function Ri(e, n, t, r, l) {
    return nt(), iu(l), n.flags |= 256, oe(e, n, t, r), n.child
}

var zo = {dehydrated: null, treeContext: null, retryLane: 0};

function Lo(e) {
    return {baseLanes: e, cachePool: null, transitions: null}
}

function Da(e, n, t) {
    var r = n.pendingProps, l = $.current, o = !1, u = (n.flags & 128) !== 0, i;
    if ((i = u) || (i = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), i ? (o = !0, n.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), D($, l & 1), e === null) return ko(n), e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (n.mode & 1 ? e.data === "$!" ? n.lanes = 8 : n.lanes = 1073741824 : n.lanes = 1, null) : (u = r.children, e = r.fallback, o ? (r = n.mode, o = n.child, u = {
        mode: "hidden",
        children: u
    }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = u) : o = dl(u, r, 0, null), e = Cn(e, r, t, null), o.return = n, e.return = n, o.sibling = e, n.child = o, n.child.memoizedState = Lo(t), n.memoizedState = zo, e) : ku(n, u));
    if (l = e.memoizedState, l !== null && (i = l.dehydrated, i !== null)) return ud(e, n, u, r, i, l, t);
    if (o) {
        o = r.fallback, u = n.mode, l = e.child, i = l.sibling;
        var s = {mode: "hidden", children: r.children};
        return !(u & 1) && n.child !== l ? (r = n.child, r.childLanes = 0, r.pendingProps = s, n.deletions = null) : (r = fn(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), i !== null ? o = fn(i, o) : (o = Cn(o, u, t, null), o.flags |= 2), o.return = n, r.return = n, r.sibling = o, n.child = r, r = o, o = n.child, u = e.child.memoizedState, u = u === null ? Lo(t) : {
            baseLanes: u.baseLanes | t,
            cachePool: null,
            transitions: u.transitions
        }, o.memoizedState = u, o.childLanes = e.childLanes & ~t, n.memoizedState = zo, r
    }
    return o = e.child, e = o.sibling, r = fn(o, {
        mode: "visible",
        children: r.children
    }), !(n.mode & 1) && (r.lanes = t), r.return = n, r.sibling = null, e !== null && (t = n.deletions, t === null ? (n.deletions = [e], n.flags |= 16) : t.push(e)), n.child = r, n.memoizedState = null, r
}

function ku(e, n) {
    return n = dl({mode: "visible", children: n}, e.mode, 0, null), n.return = e, e.child = n
}

function hr(e, n, t, r) {
    return r !== null && iu(r), tt(n, e.child, null, t), e = ku(n, n.pendingProps.children), e.flags |= 2, n.memoizedState = null, e
}

function ud(e, n, t, r, l, o, u) {
    if (t) return n.flags & 256 ? (n.flags &= -257, r = Al(Error(y(422))), hr(e, n, u, r)) : n.memoizedState !== null ? (n.child = e.child, n.flags |= 128, null) : (o = r.fallback, l = n.mode, r = dl({
        mode: "visible",
        children: r.children
    }, l, 0, null), o = Cn(o, l, u, null), o.flags |= 2, r.return = n, o.return = n, r.sibling = o, n.child = r, n.mode & 1 && tt(n, e.child, null, u), n.child.memoizedState = Lo(u), n.memoizedState = zo, o);
    if (!(n.mode & 1)) return hr(e, n, u, null);
    if (l.data === "$!") {
        if (r = l.nextSibling && l.nextSibling.dataset, r) var i = r.dgst;
        return r = i, o = Error(y(419)), r = Al(o, r, void 0), hr(e, n, u, r)
    }
    if (i = (u & e.childLanes) !== 0, ce || i) {
        if (r = J, r !== null) {
            switch (u & -u) {
                case 4:
                    l = 2;
                    break;
                case 16:
                    l = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    l = 32;
                    break;
                case 536870912:
                    l = 268435456;
                    break;
                default:
                    l = 0
            }
            l = l & (r.suspendedLanes | u) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Ye(e, l), je(r, e, l, -1))
        }
        return Pu(), r = Al(Error(y(421))), hr(e, n, u, r)
    }
    return l.data === "$?" ? (n.flags |= 128, n.child = e.child, n = wd.bind(null, e), l._reactRetry = n, null) : (e = o.treeContext, he = un(l.nextSibling), ve = n, U = !0, Re = null, e !== null && (ke[Ee++] = Ae, ke[Ee++] = He, ke[Ee++] = Pn, Ae = e.id, He = e.overflow, Pn = n), n = ku(n, r.children), n.flags |= 4096, n)
}

function Oi(e, n, t) {
    e.lanes |= n;
    var r = e.alternate;
    r !== null && (r.lanes |= n), Eo(e.return, n, t)
}

function Hl(e, n, t, r, l) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = {
        isBackwards: n,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: t,
        tailMode: l
    } : (o.isBackwards = n, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = t, o.tailMode = l)
}

function Ma(e, n, t) {
    var r = n.pendingProps, l = r.revealOrder, o = r.tail;
    if (oe(e, n, r.children, t), r = $.current, r & 2) r = r & 1 | 2, n.flags |= 128; else {
        if (e !== null && e.flags & 128) e:for (e = n.child; e !== null;) {
            if (e.tag === 13) e.memoizedState !== null && Oi(e, t, n); else if (e.tag === 19) Oi(e, t, n); else if (e.child !== null) {
                e.child.return = e, e = e.child;
                continue
            }
            if (e === n) break e;
            for (; e.sibling === null;) {
                if (e.return === null || e.return === n) break e;
                e = e.return
            }
            e.sibling.return = e.return, e = e.sibling
        }
        r &= 1
    }
    if (D($, r), !(n.mode & 1)) n.memoizedState = null; else switch (l) {
        case"forwards":
            for (t = n.child, l = null; t !== null;) e = t.alternate, e !== null && Yr(e) === null && (l = t), t = t.sibling;
            t = l, t === null ? (l = n.child, n.child = null) : (l = t.sibling, t.sibling = null), Hl(n, !1, l, t, o);
            break;
        case"backwards":
            for (t = null, l = n.child, n.child = null; l !== null;) {
                if (e = l.alternate, e !== null && Yr(e) === null) {
                    n.child = l;
                    break
                }
                e = l.sibling, l.sibling = t, t = l, l = e
            }
            Hl(n, !0, t, null, o);
            break;
        case"together":
            Hl(n, !1, null, null, void 0);
            break;
        default:
            n.memoizedState = null
    }
    return n.child
}

function Pr(e, n) {
    !(n.mode & 1) && e !== null && (e.alternate = null, n.alternate = null, n.flags |= 2)
}

function Xe(e, n, t) {
    if (e !== null && (n.dependencies = e.dependencies), Ln |= n.lanes, !(t & n.childLanes)) return null;
    if (e !== null && n.child !== e.child) throw Error(y(153));
    if (n.child !== null) {
        for (e = n.child, t = fn(e, e.pendingProps), n.child = t, t.return = n; e.sibling !== null;) e = e.sibling, t = t.sibling = fn(e, e.pendingProps), t.return = n;
        t.sibling = null
    }
    return n.child
}

function id(e, n, t) {
    switch (n.tag) {
        case 3:
            ja(n), nt();
            break;
        case 5:
            ia(n);
            break;
        case 1:
            de(n.type) && Vr(n);
            break;
        case 4:
            pu(n, n.stateNode.containerInfo);
            break;
        case 10:
            var r = n.type._context, l = n.memoizedProps.value;
            D(Wr, r._currentValue), r._currentValue = l;
            break;
        case 13:
            if (r = n.memoizedState, r !== null) return r.dehydrated !== null ? (D($, $.current & 1), n.flags |= 128, null) : t & n.child.childLanes ? Da(e, n, t) : (D($, $.current & 1), e = Xe(e, n, t), e !== null ? e.sibling : null);
            D($, $.current & 1);
            break;
        case 19:
            if (r = (t & n.childLanes) !== 0, e.flags & 128) {
                if (r) return Ma(e, n, t);
                n.flags |= 128
            }
            if (l = n.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), D($, $.current), r) break;
            return null;
        case 22:
        case 23:
            return n.lanes = 0, Ra(e, n, t)
    }
    return Xe(e, n, t)
}

var Ia, To, Fa, Ua;
Ia = function (e, n) {
    for (var t = n.child; t !== null;) {
        if (t.tag === 5 || t.tag === 6) e.appendChild(t.stateNode); else if (t.tag !== 4 && t.child !== null) {
            t.child.return = t, t = t.child;
            continue
        }
        if (t === n) break;
        for (; t.sibling === null;) {
            if (t.return === null || t.return === n) return;
            t = t.return
        }
        t.sibling.return = t.return, t = t.sibling
    }
};
To = function () {
};
Fa = function (e, n, t, r) {
    var l = e.memoizedProps;
    if (l !== r) {
        e = n.stateNode, xn($e.current);
        var o = null;
        switch (t) {
            case"input":
                l = Jl(e, l), r = Jl(e, r), o = [];
                break;
            case"select":
                l = V({}, l, {value: void 0}), r = V({}, r, {value: void 0}), o = [];
                break;
            case"textarea":
                l = eo(e, l), r = eo(e, r), o = [];
                break;
            default:
                typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = $r)
        }
        to(t, r);
        var u;
        t = null;
        for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
            var i = l[c];
            for (u in i) i.hasOwnProperty(u) && (t || (t = {}), t[u] = "")
        } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Ot.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
        for (c in r) {
            var s = r[c];
            if (i = l != null ? l[c] : void 0, r.hasOwnProperty(c) && s !== i && (s != null || i != null)) if (c === "style") if (i) {
                for (u in i) !i.hasOwnProperty(u) || s && s.hasOwnProperty(u) || (t || (t = {}), t[u] = "");
                for (u in s) s.hasOwnProperty(u) && i[u] !== s[u] && (t || (t = {}), t[u] = s[u])
            } else t || (o || (o = []), o.push(c, t)), t = s; else c === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, i = i ? i.__html : void 0, s != null && i !== s && (o = o || []).push(c, s)) : c === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(c, "" + s) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Ot.hasOwnProperty(c) ? (s != null && c === "onScroll" && M("scroll", e), o || i === s || (o = [])) : (o = o || []).push(c, s))
        }
        t && (o = o || []).push("style", t);
        var c = o;
        (n.updateQueue = c) && (n.flags |= 4)
    }
};
Ua = function (e, n, t, r) {
    t !== r && (n.flags |= 4)
};

function yt(e, n) {
    if (!U) switch (e.tailMode) {
        case"hidden":
            n = e.tail;
            for (var t = null; n !== null;) n.alternate !== null && (t = n), n = n.sibling;
            t === null ? e.tail = null : t.sibling = null;
            break;
        case"collapsed":
            t = e.tail;
            for (var r = null; t !== null;) t.alternate !== null && (r = t), t = t.sibling;
            r === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
    }
}

function te(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, t = 0, r = 0;
    if (n) for (var l = e.child; l !== null;) t |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling; else for (l = e.child; l !== null;) t |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= r, e.childLanes = t, n
}

function sd(e, n, t) {
    var r = n.pendingProps;
    switch (uu(n), n.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return te(n), null;
        case 1:
            return de(n.type) && Br(), te(n), null;
        case 3:
            return r = n.stateNode, rt(), I(fe), I(le), hu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (pr(n) ? n.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(n.flags & 256) || (n.flags |= 1024, Re !== null && (Uo(Re), Re = null))), To(e, n), te(n), null;
        case 5:
            mu(n);
            var l = xn(Wt.current);
            if (t = n.type, e !== null && n.stateNode != null) Fa(e, n, t, r, l), e.ref !== n.ref && (n.flags |= 512, n.flags |= 2097152); else {
                if (!r) {
                    if (n.stateNode === null) throw Error(y(166));
                    return te(n), null
                }
                if (e = xn($e.current), pr(n)) {
                    r = n.stateNode, t = n.type;
                    var o = n.memoizedProps;
                    switch (r[Fe] = n, r[At] = o, e = (n.mode & 1) !== 0, t) {
                        case"dialog":
                            M("cancel", r), M("close", r);
                            break;
                        case"iframe":
                        case"object":
                        case"embed":
                            M("load", r);
                            break;
                        case"video":
                        case"audio":
                            for (l = 0; l < Et.length; l++) M(Et[l], r);
                            break;
                        case"source":
                            M("error", r);
                            break;
                        case"img":
                        case"image":
                        case"link":
                            M("error", r), M("load", r);
                            break;
                        case"details":
                            M("toggle", r);
                            break;
                        case"input":
                            Vu(r, o), M("invalid", r);
                            break;
                        case"select":
                            r._wrapperState = {wasMultiple: !!o.multiple}, M("invalid", r);
                            break;
                        case"textarea":
                            Hu(r, o), M("invalid", r)
                    }
                    to(t, o), l = null;
                    for (var u in o) if (o.hasOwnProperty(u)) {
                        var i = o[u];
                        u === "children" ? typeof i == "string" ? r.textContent !== i && (o.suppressHydrationWarning !== !0 && dr(r.textContent, i, e), l = ["children", i]) : typeof i == "number" && r.textContent !== "" + i && (o.suppressHydrationWarning !== !0 && dr(r.textContent, i, e), l = ["children", "" + i]) : Ot.hasOwnProperty(u) && i != null && u === "onScroll" && M("scroll", r)
                    }
                    switch (t) {
                        case"input":
                            lr(r), Au(r, o, !0);
                            break;
                        case"textarea":
                            lr(r), Wu(r);
                            break;
                        case"select":
                        case"option":
                            break;
                        default:
                            typeof o.onClick == "function" && (r.onclick = $r)
                    }
                    r = l, n.updateQueue = r, r !== null && (n.flags |= 4)
                } else {
                    u = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = ds(t)), e === "http://www.w3.org/1999/xhtml" ? t === "script" ? (e = u.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = u.createElement(t, {is: r.is}) : (e = u.createElement(t), t === "select" && (u = e, r.multiple ? u.multiple = !0 : r.size && (u.size = r.size))) : e = u.createElementNS(e, t), e[Fe] = n, e[At] = r, Ia(e, n, !1, !1), n.stateNode = e;
                    e:{
                        switch (u = ro(t, r), t) {
                            case"dialog":
                                M("cancel", e), M("close", e), l = r;
                                break;
                            case"iframe":
                            case"object":
                            case"embed":
                                M("load", e), l = r;
                                break;
                            case"video":
                            case"audio":
                                for (l = 0; l < Et.length; l++) M(Et[l], e);
                                l = r;
                                break;
                            case"source":
                                M("error", e), l = r;
                                break;
                            case"img":
                            case"image":
                            case"link":
                                M("error", e), M("load", e), l = r;
                                break;
                            case"details":
                                M("toggle", e), l = r;
                                break;
                            case"input":
                                Vu(e, r), l = Jl(e, r), M("invalid", e);
                                break;
                            case"option":
                                l = r;
                                break;
                            case"select":
                                e._wrapperState = {wasMultiple: !!r.multiple}, l = V({}, r, {value: void 0}), M("invalid", e);
                                break;
                            case"textarea":
                                Hu(e, r), l = eo(e, r), M("invalid", e);
                                break;
                            default:
                                l = r
                        }
                        to(t, l), i = l;
                        for (o in i) if (i.hasOwnProperty(o)) {
                            var s = i[o];
                            o === "style" ? hs(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && ps(e, s)) : o === "children" ? typeof s == "string" ? (t !== "textarea" || s !== "") && jt(e, s) : typeof s == "number" && jt(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Ot.hasOwnProperty(o) ? s != null && o === "onScroll" && M("scroll", e) : s != null && Qo(e, o, s, u))
                        }
                        switch (t) {
                            case"input":
                                lr(e), Au(e, r, !1);
                                break;
                            case"textarea":
                                lr(e), Wu(e);
                                break;
                            case"option":
                                r.value != null && e.setAttribute("value", "" + dn(r.value));
                                break;
                            case"select":
                                e.multiple = !!r.multiple, o = r.value, o != null ? Yn(e, !!r.multiple, o, !1) : r.defaultValue != null && Yn(e, !!r.multiple, r.defaultValue, !0);
                                break;
                            default:
                                typeof l.onClick == "function" && (e.onclick = $r)
                        }
                        switch (t) {
                            case"button":
                            case"input":
                            case"select":
                            case"textarea":
                                r = !!r.autoFocus;
                                break e;
                            case"img":
                                r = !0;
                                break e;
                            default:
                                r = !1
                        }
                    }
                    r && (n.flags |= 4)
                }
                n.ref !== null && (n.flags |= 512, n.flags |= 2097152)
            }
            return te(n), null;
        case 6:
            if (e && n.stateNode != null) Ua(e, n, e.memoizedProps, r); else {
                if (typeof r != "string" && n.stateNode === null) throw Error(y(166));
                if (t = xn(Wt.current), xn($e.current), pr(n)) {
                    if (r = n.stateNode, t = n.memoizedProps, r[Fe] = n, (o = r.nodeValue !== t) && (e = ve, e !== null)) switch (e.tag) {
                        case 3:
                            dr(r.nodeValue, t, (e.mode & 1) !== 0);
                            break;
                        case 5:
                            e.memoizedProps.suppressHydrationWarning !== !0 && dr(r.nodeValue, t, (e.mode & 1) !== 0)
                    }
                    o && (n.flags |= 4)
                } else r = (t.nodeType === 9 ? t : t.ownerDocument).createTextNode(r), r[Fe] = n, n.stateNode = r
            }
            return te(n), null;
        case 13:
            if (I($), r = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                if (U && he !== null && n.mode & 1 && !(n.flags & 128)) ta(), nt(), n.flags |= 98560, o = !1; else if (o = pr(n), r !== null && r.dehydrated !== null) {
                    if (e === null) {
                        if (!o) throw Error(y(318));
                        if (o = n.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(y(317));
                        o[Fe] = n
                    } else nt(), !(n.flags & 128) && (n.memoizedState = null), n.flags |= 4;
                    te(n), o = !1
                } else Re !== null && (Uo(Re), Re = null), o = !0;
                if (!o) return n.flags & 65536 ? n : null
            }
            return n.flags & 128 ? (n.lanes = t, n) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (n.child.flags |= 8192, n.mode & 1 && (e === null || $.current & 1 ? X === 0 && (X = 3) : Pu())), n.updateQueue !== null && (n.flags |= 4), te(n), null);
        case 4:
            return rt(), To(e, n), e === null && Bt(n.stateNode.containerInfo), te(n), null;
        case 10:
            return cu(n.type._context), te(n), null;
        case 17:
            return de(n.type) && Br(), te(n), null;
        case 19:
            if (I($), o = n.memoizedState, o === null) return te(n), null;
            if (r = (n.flags & 128) !== 0, u = o.rendering, u === null) if (r) yt(o, !1); else {
                if (X !== 0 || e !== null && e.flags & 128) for (e = n.child; e !== null;) {
                    if (u = Yr(e), u !== null) {
                        for (n.flags |= 128, yt(o, !1), r = u.updateQueue, r !== null && (n.updateQueue = r, n.flags |= 4), n.subtreeFlags = 0, r = t, t = n.child; t !== null;) o = t, e = r, o.flags &= 14680066, u = o.alternate, u === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = u.childLanes, o.lanes = u.lanes, o.child = u.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = u.memoizedProps, o.memoizedState = u.memoizedState, o.updateQueue = u.updateQueue, o.type = u.type, e = u.dependencies, o.dependencies = e === null ? null : {
                            lanes: e.lanes,
                            firstContext: e.firstContext
                        }), t = t.sibling;
                        return D($, $.current & 1 | 2), n.child
                    }
                    e = e.sibling
                }
                o.tail !== null && Q() > ot && (n.flags |= 128, r = !0, yt(o, !1), n.lanes = 4194304)
            } else {
                if (!r) if (e = Yr(u), e !== null) {
                    if (n.flags |= 128, r = !0, t = e.updateQueue, t !== null && (n.updateQueue = t, n.flags |= 4), yt(o, !0), o.tail === null && o.tailMode === "hidden" && !u.alternate && !U) return te(n), null
                } else 2 * Q() - o.renderingStartTime > ot && t !== 1073741824 && (n.flags |= 128, r = !0, yt(o, !1), n.lanes = 4194304);
                o.isBackwards ? (u.sibling = n.child, n.child = u) : (t = o.last, t !== null ? t.sibling = u : n.child = u, o.last = u)
            }
            return o.tail !== null ? (n = o.tail, o.rendering = n, o.tail = n.sibling, o.renderingStartTime = Q(), n.sibling = null, t = $.current, D($, r ? t & 1 | 2 : t & 1), n) : (te(n), null);
        case 22:
        case 23:
            return Nu(), r = n.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (n.flags |= 8192), r && n.mode & 1 ? me & 1073741824 && (te(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : te(n), null;
        case 24:
            return null;
        case 25:
            return null
    }
    throw Error(y(156, n.tag))
}

function ad(e, n) {
    switch (uu(n), n.tag) {
        case 1:
            return de(n.type) && Br(), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
        case 3:
            return rt(), I(fe), I(le), hu(), e = n.flags, e & 65536 && !(e & 128) ? (n.flags = e & -65537 | 128, n) : null;
        case 5:
            return mu(n), null;
        case 13:
            if (I($), e = n.memoizedState, e !== null && e.dehydrated !== null) {
                if (n.alternate === null) throw Error(y(340));
                nt()
            }
            return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
        case 19:
            return I($), null;
        case 4:
            return rt(), null;
        case 10:
            return cu(n.type._context), null;
        case 22:
        case 23:
            return Nu(), null;
        case 24:
            return null;
        default:
            return null
    }
}

var vr = !1, re = !1, cd = typeof WeakSet == "function" ? WeakSet : Set, k = null;

function Qn(e, n) {
    var t = e.ref;
    if (t !== null) if (typeof t == "function") try {
        t(null)
    } catch (r) {
        A(e, n, r)
    } else t.current = null
}

function Ro(e, n, t) {
    try {
        t()
    } catch (r) {
        A(e, n, r)
    }
}

var ji = !1;

function fd(e, n) {
    if (mo = Ir, e = Hs(), lu(e)) {
        if ("selectionStart" in e) var t = {start: e.selectionStart, end: e.selectionEnd}; else e:{
            t = (t = e.ownerDocument) && t.defaultView || window;
            var r = t.getSelection && t.getSelection();
            if (r && r.rangeCount !== 0) {
                t = r.anchorNode;
                var l = r.anchorOffset, o = r.focusNode;
                r = r.focusOffset;
                try {
                    t.nodeType, o.nodeType
                } catch {
                    t = null;
                    break e
                }
                var u = 0, i = -1, s = -1, c = 0, m = 0, h = e, p = null;
                n:for (; ;) {
                    for (var g; h !== t || l !== 0 && h.nodeType !== 3 || (i = u + l), h !== o || r !== 0 && h.nodeType !== 3 || (s = u + r), h.nodeType === 3 && (u += h.nodeValue.length), (g = h.firstChild) !== null;) p = h, h = g;
                    for (; ;) {
                        if (h === e) break n;
                        if (p === t && ++c === l && (i = u), p === o && ++m === r && (s = u), (g = h.nextSibling) !== null) break;
                        h = p, p = h.parentNode
                    }
                    h = g
                }
                t = i === -1 || s === -1 ? null : {start: i, end: s}
            } else t = null
        }
        t = t || {start: 0, end: 0}
    } else t = null;
    for (ho = {
        focusedElem: e,
        selectionRange: t
    }, Ir = !1, k = n; k !== null;) if (n = k, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null) e.return = n, k = e; else for (; k !== null;) {
        n = k;
        try {
            var w = n.alternate;
            if (n.flags & 1024) switch (n.tag) {
                case 0:
                case 11:
                case 15:
                    break;
                case 1:
                    if (w !== null) {
                        var S = w.memoizedProps, F = w.memoizedState, f = n.stateNode,
                            a = f.getSnapshotBeforeUpdate(n.elementType === n.type ? S : Le(n.type, S), F);
                        f.__reactInternalSnapshotBeforeUpdate = a
                    }
                    break;
                case 3:
                    var d = n.stateNode.containerInfo;
                    d.nodeType === 1 ? d.textContent = "" : d.nodeType === 9 && d.documentElement && d.removeChild(d.documentElement);
                    break;
                case 5:
                case 6:
                case 4:
                case 17:
                    break;
                default:
                    throw Error(y(163))
            }
        } catch (v) {
            A(n, n.return, v)
        }
        if (e = n.sibling, e !== null) {
            e.return = n.return, k = e;
            break
        }
        k = n.return
    }
    return w = ji, ji = !1, w
}

function Lt(e, n, t) {
    var r = n.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
        var l = r = r.next;
        do {
            if ((l.tag & e) === e) {
                var o = l.destroy;
                l.destroy = void 0, o !== void 0 && Ro(n, t, o)
            }
            l = l.next
        } while (l !== r)
    }
}

function cl(e, n) {
    if (n = n.updateQueue, n = n !== null ? n.lastEffect : null, n !== null) {
        var t = n = n.next;
        do {
            if ((t.tag & e) === e) {
                var r = t.create;
                t.destroy = r()
            }
            t = t.next
        } while (t !== n)
    }
}

function Oo(e) {
    var n = e.ref;
    if (n !== null) {
        var t = e.stateNode;
        switch (e.tag) {
            case 5:
                e = t;
                break;
            default:
                e = t
        }
        typeof n == "function" ? n(e) : n.current = e
    }
}

function $a(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, $a(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && (delete n[Fe], delete n[At], delete n[go], delete n[Yf], delete n[Xf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
}

function Ba(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
}

function Di(e) {
    e:for (; ;) {
        for (; e.sibling === null;) {
            if (e.return === null || Ba(e.return)) return null;
            e = e.return
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
            e.child.return = e, e = e.child
        }
        if (!(e.flags & 2)) return e.stateNode
    }
}

function jo(e, n, t) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, n ? t.nodeType === 8 ? t.parentNode.insertBefore(e, n) : t.insertBefore(e, n) : (t.nodeType === 8 ? (n = t.parentNode, n.insertBefore(e, t)) : (n = t, n.appendChild(e)), t = t._reactRootContainer, t != null || n.onclick !== null || (n.onclick = $r)); else if (r !== 4 && (e = e.child, e !== null)) for (jo(e, n, t), e = e.sibling; e !== null;) jo(e, n, t), e = e.sibling
}

function Do(e, n, t) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, n ? t.insertBefore(e, n) : t.appendChild(e); else if (r !== 4 && (e = e.child, e !== null)) for (Do(e, n, t), e = e.sibling; e !== null;) Do(e, n, t), e = e.sibling
}

var q = null, Te = !1;

function Ze(e, n, t) {
    for (t = t.child; t !== null;) Va(e, n, t), t = t.sibling
}

function Va(e, n, t) {
    if (Ue && typeof Ue.onCommitFiberUnmount == "function") try {
        Ue.onCommitFiberUnmount(tl, t)
    } catch {
    }
    switch (t.tag) {
        case 5:
            re || Qn(t, n);
        case 6:
            var r = q, l = Te;
            q = null, Ze(e, n, t), q = r, Te = l, q !== null && (Te ? (e = q, t = t.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(t) : e.removeChild(t)) : q.removeChild(t.stateNode));
            break;
        case 18:
            q !== null && (Te ? (e = q, t = t.stateNode, e.nodeType === 8 ? Il(e.parentNode, t) : e.nodeType === 1 && Il(e, t), Ft(e)) : Il(q, t.stateNode));
            break;
        case 4:
            r = q, l = Te, q = t.stateNode.containerInfo, Te = !0, Ze(e, n, t), q = r, Te = l;
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (!re && (r = t.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
                l = r = r.next;
                do {
                    var o = l, u = o.destroy;
                    o = o.tag, u !== void 0 && (o & 2 || o & 4) && Ro(t, n, u), l = l.next
                } while (l !== r)
            }
            Ze(e, n, t);
            break;
        case 1:
            if (!re && (Qn(t, n), r = t.stateNode, typeof r.componentWillUnmount == "function")) try {
                r.props = t.memoizedProps, r.state = t.memoizedState, r.componentWillUnmount()
            } catch (i) {
                A(t, n, i)
            }
            Ze(e, n, t);
            break;
        case 21:
            Ze(e, n, t);
            break;
        case 22:
            t.mode & 1 ? (re = (r = re) || t.memoizedState !== null, Ze(e, n, t), re = r) : Ze(e, n, t);
            break;
        default:
            Ze(e, n, t)
    }
}

function Mi(e) {
    var n = e.updateQueue;
    if (n !== null) {
        e.updateQueue = null;
        var t = e.stateNode;
        t === null && (t = e.stateNode = new cd), n.forEach(function (r) {
            var l = Sd.bind(null, e, r);
            t.has(r) || (t.add(r), r.then(l, l))
        })
    }
}

function ze(e, n) {
    var t = n.deletions;
    if (t !== null) for (var r = 0; r < t.length; r++) {
        var l = t[r];
        try {
            var o = e, u = n, i = u;
            e:for (; i !== null;) {
                switch (i.tag) {
                    case 5:
                        q = i.stateNode, Te = !1;
                        break e;
                    case 3:
                        q = i.stateNode.containerInfo, Te = !0;
                        break e;
                    case 4:
                        q = i.stateNode.containerInfo, Te = !0;
                        break e
                }
                i = i.return
            }
            if (q === null) throw Error(y(160));
            Va(o, u, l), q = null, Te = !1;
            var s = l.alternate;
            s !== null && (s.return = null), l.return = null
        } catch (c) {
            A(l, n, c)
        }
    }
    if (n.subtreeFlags & 12854) for (n = n.child; n !== null;) Aa(n, e), n = n.sibling
}

function Aa(e, n) {
    var t = e.alternate, r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if (ze(n, e), Me(e), r & 4) {
                try {
                    Lt(3, e, e.return), cl(3, e)
                } catch (S) {
                    A(e, e.return, S)
                }
                try {
                    Lt(5, e, e.return)
                } catch (S) {
                    A(e, e.return, S)
                }
            }
            break;
        case 1:
            ze(n, e), Me(e), r & 512 && t !== null && Qn(t, t.return);
            break;
        case 5:
            if (ze(n, e), Me(e), r & 512 && t !== null && Qn(t, t.return), e.flags & 32) {
                var l = e.stateNode;
                try {
                    jt(l, "")
                } catch (S) {
                    A(e, e.return, S)
                }
            }
            if (r & 4 && (l = e.stateNode, l != null)) {
                var o = e.memoizedProps, u = t !== null ? t.memoizedProps : o, i = e.type, s = e.updateQueue;
                if (e.updateQueue = null, s !== null) try {
                    i === "input" && o.type === "radio" && o.name != null && cs(l, o), ro(i, u);
                    var c = ro(i, o);
                    for (u = 0; u < s.length; u += 2) {
                        var m = s[u], h = s[u + 1];
                        m === "style" ? hs(l, h) : m === "dangerouslySetInnerHTML" ? ps(l, h) : m === "children" ? jt(l, h) : Qo(l, m, h, c)
                    }
                    switch (i) {
                        case"input":
                            ql(l, o);
                            break;
                        case"textarea":
                            fs(l, o);
                            break;
                        case"select":
                            var p = l._wrapperState.wasMultiple;
                            l._wrapperState.wasMultiple = !!o.multiple;
                            var g = o.value;
                            g != null ? Yn(l, !!o.multiple, g, !1) : p !== !!o.multiple && (o.defaultValue != null ? Yn(l, !!o.multiple, o.defaultValue, !0) : Yn(l, !!o.multiple, o.multiple ? [] : "", !1))
                    }
                    l[At] = o
                } catch (S) {
                    A(e, e.return, S)
                }
            }
            break;
        case 6:
            if (ze(n, e), Me(e), r & 4) {
                if (e.stateNode === null) throw Error(y(162));
                l = e.stateNode, o = e.memoizedProps;
                try {
                    l.nodeValue = o
                } catch (S) {
                    A(e, e.return, S)
                }
            }
            break;
        case 3:
            if (ze(n, e), Me(e), r & 4 && t !== null && t.memoizedState.isDehydrated) try {
                Ft(n.containerInfo)
            } catch (S) {
                A(e, e.return, S)
            }
            break;
        case 4:
            ze(n, e), Me(e);
            break;
        case 13:
            ze(n, e), Me(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (_u = Q())), r & 4 && Mi(e);
            break;
        case 22:
            if (m = t !== null && t.memoizedState !== null, e.mode & 1 ? (re = (c = re) || m, ze(n, e), re = c) : ze(n, e), Me(e), r & 8192) {
                if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !m && e.mode & 1) for (k = e, m = e.child; m !== null;) {
                    for (h = k = m; k !== null;) {
                        switch (p = k, g = p.child, p.tag) {
                            case 0:
                            case 11:
                            case 14:
                            case 15:
                                Lt(4, p, p.return);
                                break;
                            case 1:
                                Qn(p, p.return);
                                var w = p.stateNode;
                                if (typeof w.componentWillUnmount == "function") {
                                    r = p, t = p.return;
                                    try {
                                        n = r, w.props = n.memoizedProps, w.state = n.memoizedState, w.componentWillUnmount()
                                    } catch (S) {
                                        A(r, t, S)
                                    }
                                }
                                break;
                            case 5:
                                Qn(p, p.return);
                                break;
                            case 22:
                                if (p.memoizedState !== null) {
                                    Fi(h);
                                    continue
                                }
                        }
                        g !== null ? (g.return = p, k = g) : Fi(h)
                    }
                    m = m.sibling
                }
                e:for (m = null, h = e; ;) {
                    if (h.tag === 5) {
                        if (m === null) {
                            m = h;
                            try {
                                l = h.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (i = h.stateNode, s = h.memoizedProps.style, u = s != null && s.hasOwnProperty("display") ? s.display : null, i.style.display = ms("display", u))
                            } catch (S) {
                                A(e, e.return, S)
                            }
                        }
                    } else if (h.tag === 6) {
                        if (m === null) try {
                            h.stateNode.nodeValue = c ? "" : h.memoizedProps
                        } catch (S) {
                            A(e, e.return, S)
                        }
                    } else if ((h.tag !== 22 && h.tag !== 23 || h.memoizedState === null || h === e) && h.child !== null) {
                        h.child.return = h, h = h.child;
                        continue
                    }
                    if (h === e) break e;
                    for (; h.sibling === null;) {
                        if (h.return === null || h.return === e) break e;
                        m === h && (m = null), h = h.return
                    }
                    m === h && (m = null), h.sibling.return = h.return, h = h.sibling
                }
            }
            break;
        case 19:
            ze(n, e), Me(e), r & 4 && Mi(e);
            break;
        case 21:
            break;
        default:
            ze(n, e), Me(e)
    }
}

function Me(e) {
    var n = e.flags;
    if (n & 2) {
        try {
            e:{
                for (var t = e.return; t !== null;) {
                    if (Ba(t)) {
                        var r = t;
                        break e
                    }
                    t = t.return
                }
                throw Error(y(160))
            }
            switch (r.tag) {
                case 5:
                    var l = r.stateNode;
                    r.flags & 32 && (jt(l, ""), r.flags &= -33);
                    var o = Di(e);
                    Do(e, o, l);
                    break;
                case 3:
                case 4:
                    var u = r.stateNode.containerInfo, i = Di(e);
                    jo(e, i, u);
                    break;
                default:
                    throw Error(y(161))
            }
        } catch (s) {
            A(e, e.return, s)
        }
        e.flags &= -3
    }
    n & 4096 && (e.flags &= -4097)
}

function dd(e, n, t) {
    k = e, Ha(e)
}

function Ha(e, n, t) {
    for (var r = (e.mode & 1) !== 0; k !== null;) {
        var l = k, o = l.child;
        if (l.tag === 22 && r) {
            var u = l.memoizedState !== null || vr;
            if (!u) {
                var i = l.alternate, s = i !== null && i.memoizedState !== null || re;
                i = vr;
                var c = re;
                if (vr = u, (re = s) && !c) for (k = l; k !== null;) u = k, s = u.child, u.tag === 22 && u.memoizedState !== null ? Ui(l) : s !== null ? (s.return = u, k = s) : Ui(l);
                for (; o !== null;) k = o, Ha(o), o = o.sibling;
                k = l, vr = i, re = c
            }
            Ii(e)
        } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, k = o) : Ii(e)
    }
}

function Ii(e) {
    for (; k !== null;) {
        var n = k;
        if (n.flags & 8772) {
            var t = n.alternate;
            try {
                if (n.flags & 8772) switch (n.tag) {
                    case 0:
                    case 11:
                    case 15:
                        re || cl(5, n);
                        break;
                    case 1:
                        var r = n.stateNode;
                        if (n.flags & 4 && !re) if (t === null) r.componentDidMount(); else {
                            var l = n.elementType === n.type ? t.memoizedProps : Le(n.type, t.memoizedProps);
                            r.componentDidUpdate(l, t.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                        }
                        var o = n.updateQueue;
                        o !== null && Si(n, o, r);
                        break;
                    case 3:
                        var u = n.updateQueue;
                        if (u !== null) {
                            if (t = null, n.child !== null) switch (n.child.tag) {
                                case 5:
                                    t = n.child.stateNode;
                                    break;
                                case 1:
                                    t = n.child.stateNode
                            }
                            Si(n, u, t)
                        }
                        break;
                    case 5:
                        var i = n.stateNode;
                        if (t === null && n.flags & 4) {
                            t = i;
                            var s = n.memoizedProps;
                            switch (n.type) {
                                case"button":
                                case"input":
                                case"select":
                                case"textarea":
                                    s.autoFocus && t.focus();
                                    break;
                                case"img":
                                    s.src && (t.src = s.src)
                            }
                        }
                        break;
                    case 6:
                        break;
                    case 4:
                        break;
                    case 12:
                        break;
                    case 13:
                        if (n.memoizedState === null) {
                            var c = n.alternate;
                            if (c !== null) {
                                var m = c.memoizedState;
                                if (m !== null) {
                                    var h = m.dehydrated;
                                    h !== null && Ft(h)
                                }
                            }
                        }
                        break;
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                        break;
                    default:
                        throw Error(y(163))
                }
                re || n.flags & 512 && Oo(n)
            } catch (p) {
                A(n, n.return, p)
            }
        }
        if (n === e) {
            k = null;
            break
        }
        if (t = n.sibling, t !== null) {
            t.return = n.return, k = t;
            break
        }
        k = n.return
    }
}

function Fi(e) {
    for (; k !== null;) {
        var n = k;
        if (n === e) {
            k = null;
            break
        }
        var t = n.sibling;
        if (t !== null) {
            t.return = n.return, k = t;
            break
        }
        k = n.return
    }
}

function Ui(e) {
    for (; k !== null;) {
        var n = k;
        try {
            switch (n.tag) {
                case 0:
                case 11:
                case 15:
                    var t = n.return;
                    try {
                        cl(4, n)
                    } catch (s) {
                        A(n, t, s)
                    }
                    break;
                case 1:
                    var r = n.stateNode;
                    if (typeof r.componentDidMount == "function") {
                        var l = n.return;
                        try {
                            r.componentDidMount()
                        } catch (s) {
                            A(n, l, s)
                        }
                    }
                    var o = n.return;
                    try {
                        Oo(n)
                    } catch (s) {
                        A(n, o, s)
                    }
                    break;
                case 5:
                    var u = n.return;
                    try {
                        Oo(n)
                    } catch (s) {
                        A(n, u, s)
                    }
            }
        } catch (s) {
            A(n, n.return, s)
        }
        if (n === e) {
            k = null;
            break
        }
        var i = n.sibling;
        if (i !== null) {
            i.return = n.return, k = i;
            break
        }
        k = n.return
    }
}

var pd = Math.ceil, Zr = Ge.ReactCurrentDispatcher, Eu = Ge.ReactCurrentOwner, _e = Ge.ReactCurrentBatchConfig, R = 0,
    J = null, K = null, b = 0, me = 0, Kn = hn(0), X = 0, Xt = null, Ln = 0, fl = 0, xu = 0, Tt = null, ae = null,
    _u = 0, ot = 1 / 0, Be = null, Jr = !1, Mo = null, an = null, yr = !1, tn = null, qr = 0, Rt = 0, Io = null,
    zr = -1, Lr = 0;

function ue() {
    return R & 6 ? Q() : zr !== -1 ? zr : zr = Q()
}

function cn(e) {
    return e.mode & 1 ? R & 2 && b !== 0 ? b & -b : Zf.transition !== null ? (Lr === 0 && (Lr = Ps()), Lr) : (e = O, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ds(e.type)), e) : 1
}

function je(e, n, t, r) {
    if (50 < Rt) throw Rt = 0, Io = null, Error(y(185));
    Zt(e, t, r), (!(R & 2) || e !== J) && (e === J && (!(R & 2) && (fl |= t), X === 4 && en(e, b)), pe(e, r), t === 1 && R === 0 && !(n.mode & 1) && (ot = Q() + 500, il && vn()))
}

function pe(e, n) {
    var t = e.callbackNode;
    Gc(e, n);
    var r = Mr(e, e === J ? b : 0);
    if (r === 0) t !== null && Yu(t), e.callbackNode = null, e.callbackPriority = 0; else if (n = r & -r, e.callbackPriority !== n) {
        if (t != null && Yu(t), n === 1) e.tag === 0 ? Gf($i.bind(null, e)) : bs($i.bind(null, e)), Qf(function () {
            !(R & 6) && vn()
        }), t = null; else {
            switch (zs(r)) {
                case 1:
                    t = Zo;
                    break;
                case 4:
                    t = Cs;
                    break;
                case 16:
                    t = Dr;
                    break;
                case 536870912:
                    t = Ns;
                    break;
                default:
                    t = Dr
            }
            t = Ja(t, Wa.bind(null, e))
        }
        e.callbackPriority = n, e.callbackNode = t
    }
}

function Wa(e, n) {
    if (zr = -1, Lr = 0, R & 6) throw Error(y(327));
    var t = e.callbackNode;
    if (qn() && e.callbackNode !== t) return null;
    var r = Mr(e, e === J ? b : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || n) n = br(e, r); else {
        n = r;
        var l = R;
        R |= 2;
        var o = Ka();
        (J !== e || b !== n) && (Be = null, ot = Q() + 500, _n(e, n));
        do try {
            vd();
            break
        } catch (i) {
            Qa(e, i)
        } while (1);
        au(), Zr.current = o, R = l, K !== null ? n = 0 : (J = null, b = 0, n = X)
    }
    if (n !== 0) {
        if (n === 2 && (l = so(e), l !== 0 && (r = l, n = Fo(e, l))), n === 1) throw t = Xt, _n(e, 0), en(e, r), pe(e, Q()), t;
        if (n === 6) en(e, r); else {
            if (l = e.current.alternate, !(r & 30) && !md(l) && (n = br(e, r), n === 2 && (o = so(e), o !== 0 && (r = o, n = Fo(e, o))), n === 1)) throw t = Xt, _n(e, 0), en(e, r), pe(e, Q()), t;
            switch (e.finishedWork = l, e.finishedLanes = r, n) {
                case 0:
                case 1:
                    throw Error(y(345));
                case 2:
                    Sn(e, ae, Be);
                    break;
                case 3:
                    if (en(e, r), (r & 130023424) === r && (n = _u + 500 - Q(), 10 < n)) {
                        if (Mr(e, 0) !== 0) break;
                        if (l = e.suspendedLanes, (l & r) !== r) {
                            ue(), e.pingedLanes |= e.suspendedLanes & l;
                            break
                        }
                        e.timeoutHandle = yo(Sn.bind(null, e, ae, Be), n);
                        break
                    }
                    Sn(e, ae, Be);
                    break;
                case 4:
                    if (en(e, r), (r & 4194240) === r) break;
                    for (n = e.eventTimes, l = -1; 0 < r;) {
                        var u = 31 - Oe(r);
                        o = 1 << u, u = n[u], u > l && (l = u), r &= ~o
                    }
                    if (r = l, r = Q() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * pd(r / 1960)) - r, 10 < r) {
                        e.timeoutHandle = yo(Sn.bind(null, e, ae, Be), r);
                        break
                    }
                    Sn(e, ae, Be);
                    break;
                case 5:
                    Sn(e, ae, Be);
                    break;
                default:
                    throw Error(y(329))
            }
        }
    }
    return pe(e, Q()), e.callbackNode === t ? Wa.bind(null, e) : null
}

function Fo(e, n) {
    var t = Tt;
    return e.current.memoizedState.isDehydrated && (_n(e, n).flags |= 256), e = br(e, n), e !== 2 && (n = ae, ae = t, n !== null && Uo(n)), e
}

function Uo(e) {
    ae === null ? ae = e : ae.push.apply(ae, e)
}

function md(e) {
    for (var n = e; ;) {
        if (n.flags & 16384) {
            var t = n.updateQueue;
            if (t !== null && (t = t.stores, t !== null)) for (var r = 0; r < t.length; r++) {
                var l = t[r], o = l.getSnapshot;
                l = l.value;
                try {
                    if (!De(o(), l)) return !1
                } catch {
                    return !1
                }
            }
        }
        if (t = n.child, n.subtreeFlags & 16384 && t !== null) t.return = n, n = t; else {
            if (n === e) break;
            for (; n.sibling === null;) {
                if (n.return === null || n.return === e) return !0;
                n = n.return
            }
            n.sibling.return = n.return, n = n.sibling
        }
    }
    return !0
}

function en(e, n) {
    for (n &= ~xu, n &= ~fl, e.suspendedLanes |= n, e.pingedLanes &= ~n, e = e.expirationTimes; 0 < n;) {
        var t = 31 - Oe(n), r = 1 << t;
        e[t] = -1, n &= ~r
    }
}

function $i(e) {
    if (R & 6) throw Error(y(327));
    qn();
    var n = Mr(e, 0);
    if (!(n & 1)) return pe(e, Q()), null;
    var t = br(e, n);
    if (e.tag !== 0 && t === 2) {
        var r = so(e);
        r !== 0 && (n = r, t = Fo(e, r))
    }
    if (t === 1) throw t = Xt, _n(e, 0), en(e, n), pe(e, Q()), t;
    if (t === 6) throw Error(y(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = n, Sn(e, ae, Be), pe(e, Q()), null
}

function Cu(e, n) {
    var t = R;
    R |= 1;
    try {
        return e(n)
    } finally {
        R = t, R === 0 && (ot = Q() + 500, il && vn())
    }
}

function Tn(e) {
    tn !== null && tn.tag === 0 && !(R & 6) && qn();
    var n = R;
    R |= 1;
    var t = _e.transition, r = O;
    try {
        if (_e.transition = null, O = 1, e) return e()
    } finally {
        O = r, _e.transition = t, R = n, !(R & 6) && vn()
    }
}

function Nu() {
    me = Kn.current, I(Kn)
}

function _n(e, n) {
    e.finishedWork = null, e.finishedLanes = 0;
    var t = e.timeoutHandle;
    if (t !== -1 && (e.timeoutHandle = -1, Wf(t)), K !== null) for (t = K.return; t !== null;) {
        var r = t;
        switch (uu(r), r.tag) {
            case 1:
                r = r.type.childContextTypes, r != null && Br();
                break;
            case 3:
                rt(), I(fe), I(le), hu();
                break;
            case 5:
                mu(r);
                break;
            case 4:
                rt();
                break;
            case 13:
                I($);
                break;
            case 19:
                I($);
                break;
            case 10:
                cu(r.type._context);
                break;
            case 22:
            case 23:
                Nu()
        }
        t = t.return
    }
    if (J = e, K = e = fn(e.current, null), b = me = n, X = 0, Xt = null, xu = fl = Ln = 0, ae = Tt = null, En !== null) {
        for (n = 0; n < En.length; n++) if (t = En[n], r = t.interleaved, r !== null) {
            t.interleaved = null;
            var l = r.next, o = t.pending;
            if (o !== null) {
                var u = o.next;
                o.next = l, r.next = u
            }
            t.pending = r
        }
        En = null
    }
    return e
}

function Qa(e, n) {
    do {
        var t = K;
        try {
            if (au(), Cr.current = Gr, Xr) {
                for (var r = B.memoizedState; r !== null;) {
                    var l = r.queue;
                    l !== null && (l.pending = null), r = r.next
                }
                Xr = !1
            }
            if (zn = 0, Z = Y = B = null, zt = !1, Qt = 0, Eu.current = null, t === null || t.return === null) {
                X = 1, Xt = n, K = null;
                break
            }
            e:{
                var o = e, u = t.return, i = t, s = n;
                if (n = b, i.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
                    var c = s, m = i, h = m.tag;
                    if (!(m.mode & 1) && (h === 0 || h === 11 || h === 15)) {
                        var p = m.alternate;
                        p ? (m.updateQueue = p.updateQueue, m.memoizedState = p.memoizedState, m.lanes = p.lanes) : (m.updateQueue = null, m.memoizedState = null)
                    }
                    var g = Ni(u);
                    if (g !== null) {
                        g.flags &= -257, Pi(g, u, i, o, n), g.mode & 1 && Ci(o, c, n), n = g, s = c;
                        var w = n.updateQueue;
                        if (w === null) {
                            var S = new Set;
                            S.add(s), n.updateQueue = S
                        } else w.add(s);
                        break e
                    } else {
                        if (!(n & 1)) {
                            Ci(o, c, n), Pu();
                            break e
                        }
                        s = Error(y(426))
                    }
                } else if (U && i.mode & 1) {
                    var F = Ni(u);
                    if (F !== null) {
                        !(F.flags & 65536) && (F.flags |= 256), Pi(F, u, i, o, n), iu(lt(s, i));
                        break e
                    }
                }
                o = s = lt(s, i), X !== 4 && (X = 2), Tt === null ? Tt = [o] : Tt.push(o), o = u;
                do {
                    switch (o.tag) {
                        case 3:
                            o.flags |= 65536, n &= -n, o.lanes |= n;
                            var f = za(o, s, n);
                            wi(o, f);
                            break e;
                        case 1:
                            i = s;
                            var a = o.type, d = o.stateNode;
                            if (!(o.flags & 128) && (typeof a.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (an === null || !an.has(d)))) {
                                o.flags |= 65536, n &= -n, o.lanes |= n;
                                var v = La(o, i, n);
                                wi(o, v);
                                break e
                            }
                    }
                    o = o.return
                } while (o !== null)
            }
            Xa(t)
        } catch (E) {
            n = E, K === t && t !== null && (K = t = t.return);
            continue
        }
        break
    } while (1)
}

function Ka() {
    var e = Zr.current;
    return Zr.current = Gr, e === null ? Gr : e
}

function Pu() {
    (X === 0 || X === 3 || X === 2) && (X = 4), J === null || !(Ln & 268435455) && !(fl & 268435455) || en(J, b)
}

function br(e, n) {
    var t = R;
    R |= 2;
    var r = Ka();
    (J !== e || b !== n) && (Be = null, _n(e, n));
    do try {
        hd();
        break
    } catch (l) {
        Qa(e, l)
    } while (1);
    if (au(), R = t, Zr.current = r, K !== null) throw Error(y(261));
    return J = null, b = 0, X
}

function hd() {
    for (; K !== null;) Ya(K)
}

function vd() {
    for (; K !== null && !Bc();) Ya(K)
}

function Ya(e) {
    var n = Za(e.alternate, e, me);
    e.memoizedProps = e.pendingProps, n === null ? Xa(e) : K = n, Eu.current = null
}

function Xa(e) {
    var n = e;
    do {
        var t = n.alternate;
        if (e = n.return, n.flags & 32768) {
            if (t = ad(t, n), t !== null) {
                t.flags &= 32767, K = t;
                return
            }
            if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null; else {
                X = 6, K = null;
                return
            }
        } else if (t = sd(t, n, me), t !== null) {
            K = t;
            return
        }
        if (n = n.sibling, n !== null) {
            K = n;
            return
        }
        K = n = e
    } while (n !== null);
    X === 0 && (X = 5)
}

function Sn(e, n, t) {
    var r = O, l = _e.transition;
    try {
        _e.transition = null, O = 1, yd(e, n, t, r)
    } finally {
        _e.transition = l, O = r
    }
    return null
}

function yd(e, n, t, r) {
    do qn(); while (tn !== null);
    if (R & 6) throw Error(y(327));
    t = e.finishedWork;
    var l = e.finishedLanes;
    if (t === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, t === e.current) throw Error(y(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var o = t.lanes | t.childLanes;
    if (Zc(e, o), e === J && (K = J = null, b = 0), !(t.subtreeFlags & 2064) && !(t.flags & 2064) || yr || (yr = !0, Ja(Dr, function () {
        return qn(), null
    })), o = (t.flags & 15990) !== 0, t.subtreeFlags & 15990 || o) {
        o = _e.transition, _e.transition = null;
        var u = O;
        O = 1;
        var i = R;
        R |= 4, Eu.current = null, fd(e, t), Aa(t, e), Ff(ho), Ir = !!mo, ho = mo = null, e.current = t, dd(t), Vc(), R = i, O = u, _e.transition = o
    } else e.current = t;
    if (yr && (yr = !1, tn = e, qr = l), o = e.pendingLanes, o === 0 && (an = null), Wc(t.stateNode), pe(e, Q()), n !== null) for (r = e.onRecoverableError, t = 0; t < n.length; t++) l = n[t], r(l.value, {
        componentStack: l.stack,
        digest: l.digest
    });
    if (Jr) throw Jr = !1, e = Mo, Mo = null, e;
    return qr & 1 && e.tag !== 0 && qn(), o = e.pendingLanes, o & 1 ? e === Io ? Rt++ : (Rt = 0, Io = e) : Rt = 0, vn(), null
}

function qn() {
    if (tn !== null) {
        var e = zs(qr), n = _e.transition, t = O;
        try {
            if (_e.transition = null, O = 16 > e ? 16 : e, tn === null) var r = !1; else {
                if (e = tn, tn = null, qr = 0, R & 6) throw Error(y(331));
                var l = R;
                for (R |= 4, k = e.current; k !== null;) {
                    var o = k, u = o.child;
                    if (k.flags & 16) {
                        var i = o.deletions;
                        if (i !== null) {
                            for (var s = 0; s < i.length; s++) {
                                var c = i[s];
                                for (k = c; k !== null;) {
                                    var m = k;
                                    switch (m.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            Lt(8, m, o)
                                    }
                                    var h = m.child;
                                    if (h !== null) h.return = m, k = h; else for (; k !== null;) {
                                        m = k;
                                        var p = m.sibling, g = m.return;
                                        if ($a(m), m === c) {
                                            k = null;
                                            break
                                        }
                                        if (p !== null) {
                                            p.return = g, k = p;
                                            break
                                        }
                                        k = g
                                    }
                                }
                            }
                            var w = o.alternate;
                            if (w !== null) {
                                var S = w.child;
                                if (S !== null) {
                                    w.child = null;
                                    do {
                                        var F = S.sibling;
                                        S.sibling = null, S = F
                                    } while (S !== null)
                                }
                            }
                            k = o
                        }
                    }
                    if (o.subtreeFlags & 2064 && u !== null) u.return = o, k = u; else e:for (; k !== null;) {
                        if (o = k, o.flags & 2048) switch (o.tag) {
                            case 0:
                            case 11:
                            case 15:
                                Lt(9, o, o.return)
                        }
                        var f = o.sibling;
                        if (f !== null) {
                            f.return = o.return, k = f;
                            break e
                        }
                        k = o.return
                    }
                }
                var a = e.current;
                for (k = a; k !== null;) {
                    u = k;
                    var d = u.child;
                    if (u.subtreeFlags & 2064 && d !== null) d.return = u, k = d; else e:for (u = a; k !== null;) {
                        if (i = k, i.flags & 2048) try {
                            switch (i.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    cl(9, i)
                            }
                        } catch (E) {
                            A(i, i.return, E)
                        }
                        if (i === u) {
                            k = null;
                            break e
                        }
                        var v = i.sibling;
                        if (v !== null) {
                            v.return = i.return, k = v;
                            break e
                        }
                        k = i.return
                    }
                }
                if (R = l, vn(), Ue && typeof Ue.onPostCommitFiberRoot == "function") try {
                    Ue.onPostCommitFiberRoot(tl, e)
                } catch {
                }
                r = !0
            }
            return r
        } finally {
            O = t, _e.transition = n
        }
    }
    return !1
}

function Bi(e, n, t) {
    n = lt(t, n), n = za(e, n, 1), e = sn(e, n, 1), n = ue(), e !== null && (Zt(e, 1, n), pe(e, n))
}

function A(e, n, t) {
    if (e.tag === 3) Bi(e, e, t); else for (; n !== null;) {
        if (n.tag === 3) {
            Bi(n, e, t);
            break
        } else if (n.tag === 1) {
            var r = n.stateNode;
            if (typeof n.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (an === null || !an.has(r))) {
                e = lt(t, e), e = La(n, e, 1), n = sn(n, e, 1), e = ue(), n !== null && (Zt(n, 1, e), pe(n, e));
                break
            }
        }
        n = n.return
    }
}

function gd(e, n, t) {
    var r = e.pingCache;
    r !== null && r.delete(n), n = ue(), e.pingedLanes |= e.suspendedLanes & t, J === e && (b & t) === t && (X === 4 || X === 3 && (b & 130023424) === b && 500 > Q() - _u ? _n(e, 0) : xu |= t), pe(e, n)
}

function Ga(e, n) {
    n === 0 && (e.mode & 1 ? (n = ir, ir <<= 1, !(ir & 130023424) && (ir = 4194304)) : n = 1);
    var t = ue();
    e = Ye(e, n), e !== null && (Zt(e, n, t), pe(e, t))
}

function wd(e) {
    var n = e.memoizedState, t = 0;
    n !== null && (t = n.retryLane), Ga(e, t)
}

function Sd(e, n) {
    var t = 0;
    switch (e.tag) {
        case 13:
            var r = e.stateNode, l = e.memoizedState;
            l !== null && (t = l.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(y(314))
    }
    r !== null && r.delete(n), Ga(e, t)
}

var Za;
Za = function (e, n, t) {
    if (e !== null) if (e.memoizedProps !== n.pendingProps || fe.current) ce = !0; else {
        if (!(e.lanes & t) && !(n.flags & 128)) return ce = !1, id(e, n, t);
        ce = !!(e.flags & 131072)
    } else ce = !1, U && n.flags & 1048576 && ea(n, Hr, n.index);
    switch (n.lanes = 0, n.tag) {
        case 2:
            var r = n.type;
            Pr(e, n), e = n.pendingProps;
            var l = et(n, le.current);
            Jn(n, t), l = yu(null, n, r, e, l, t);
            var o = gu();
            return n.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (n.tag = 1, n.memoizedState = null, n.updateQueue = null, de(r) ? (o = !0, Vr(n)) : o = !1, n.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, du(n), l.updater = al, n.stateNode = l, l._reactInternals = n, _o(n, r, e, t), n = Po(null, n, r, !0, o, t)) : (n.tag = 0, U && o && ou(n), oe(null, n, l, t), n = n.child), n;
        case 16:
            r = n.elementType;
            e:{
                switch (Pr(e, n), e = n.pendingProps, l = r._init, r = l(r._payload), n.type = r, l = n.tag = Ed(r), e = Le(r, e), l) {
                    case 0:
                        n = No(null, n, r, e, t);
                        break e;
                    case 1:
                        n = Ti(null, n, r, e, t);
                        break e;
                    case 11:
                        n = zi(null, n, r, e, t);
                        break e;
                    case 14:
                        n = Li(null, n, r, Le(r.type, e), t);
                        break e
                }
                throw Error(y(306, r, ""))
            }
            return n;
        case 0:
            return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : Le(r, l), No(e, n, r, l, t);
        case 1:
            return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : Le(r, l), Ti(e, n, r, l, t);
        case 3:
            e:{
                if (ja(n), e === null) throw Error(y(387));
                r = n.pendingProps, o = n.memoizedState, l = o.element, ua(e, n), Kr(n, r, null, t);
                var u = n.memoizedState;
                if (r = u.element, o.isDehydrated) if (o = {
                    element: r,
                    isDehydrated: !1,
                    cache: u.cache,
                    pendingSuspenseBoundaries: u.pendingSuspenseBoundaries,
                    transitions: u.transitions
                }, n.updateQueue.baseState = o, n.memoizedState = o, n.flags & 256) {
                    l = lt(Error(y(423)), n), n = Ri(e, n, r, t, l);
                    break e
                } else if (r !== l) {
                    l = lt(Error(y(424)), n), n = Ri(e, n, r, t, l);
                    break e
                } else for (he = un(n.stateNode.containerInfo.firstChild), ve = n, U = !0, Re = null, t = la(n, null, r, t), n.child = t; t;) t.flags = t.flags & -3 | 4096, t = t.sibling; else {
                    if (nt(), r === l) {
                        n = Xe(e, n, t);
                        break e
                    }
                    oe(e, n, r, t)
                }
                n = n.child
            }
            return n;
        case 5:
            return ia(n), e === null && ko(n), r = n.type, l = n.pendingProps, o = e !== null ? e.memoizedProps : null, u = l.children, vo(r, l) ? u = null : o !== null && vo(r, o) && (n.flags |= 32), Oa(e, n), oe(e, n, u, t), n.child;
        case 6:
            return e === null && ko(n), null;
        case 13:
            return Da(e, n, t);
        case 4:
            return pu(n, n.stateNode.containerInfo), r = n.pendingProps, e === null ? n.child = tt(n, null, r, t) : oe(e, n, r, t), n.child;
        case 11:
            return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : Le(r, l), zi(e, n, r, l, t);
        case 7:
            return oe(e, n, n.pendingProps, t), n.child;
        case 8:
            return oe(e, n, n.pendingProps.children, t), n.child;
        case 12:
            return oe(e, n, n.pendingProps.children, t), n.child;
        case 10:
            e:{
                if (r = n.type._context, l = n.pendingProps, o = n.memoizedProps, u = l.value, D(Wr, r._currentValue), r._currentValue = u, o !== null) if (De(o.value, u)) {
                    if (o.children === l.children && !fe.current) {
                        n = Xe(e, n, t);
                        break e
                    }
                } else for (o = n.child, o !== null && (o.return = n); o !== null;) {
                    var i = o.dependencies;
                    if (i !== null) {
                        u = o.child;
                        for (var s = i.firstContext; s !== null;) {
                            if (s.context === r) {
                                if (o.tag === 1) {
                                    s = We(-1, t & -t), s.tag = 2;
                                    var c = o.updateQueue;
                                    if (c !== null) {
                                        c = c.shared;
                                        var m = c.pending;
                                        m === null ? s.next = s : (s.next = m.next, m.next = s), c.pending = s
                                    }
                                }
                                o.lanes |= t, s = o.alternate, s !== null && (s.lanes |= t), Eo(o.return, t, n), i.lanes |= t;
                                break
                            }
                            s = s.next
                        }
                    } else if (o.tag === 10) u = o.type === n.type ? null : o.child; else if (o.tag === 18) {
                        if (u = o.return, u === null) throw Error(y(341));
                        u.lanes |= t, i = u.alternate, i !== null && (i.lanes |= t), Eo(u, t, n), u = o.sibling
                    } else u = o.child;
                    if (u !== null) u.return = o; else for (u = o; u !== null;) {
                        if (u === n) {
                            u = null;
                            break
                        }
                        if (o = u.sibling, o !== null) {
                            o.return = u.return, u = o;
                            break
                        }
                        u = u.return
                    }
                    o = u
                }
                oe(e, n, l.children, t), n = n.child
            }
            return n;
        case 9:
            return l = n.type, r = n.pendingProps.children, Jn(n, t), l = Ce(l), r = r(l), n.flags |= 1, oe(e, n, r, t), n.child;
        case 14:
            return r = n.type, l = Le(r, n.pendingProps), l = Le(r.type, l), Li(e, n, r, l, t);
        case 15:
            return Ta(e, n, n.type, n.pendingProps, t);
        case 17:
            return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : Le(r, l), Pr(e, n), n.tag = 1, de(r) ? (e = !0, Vr(n)) : e = !1, Jn(n, t), Pa(n, r, l), _o(n, r, l, t), Po(null, n, r, !0, e, t);
        case 19:
            return Ma(e, n, t);
        case 22:
            return Ra(e, n, t)
    }
    throw Error(y(156, n.tag))
};

function Ja(e, n) {
    return _s(e, n)
}

function kd(e, n, t, r) {
    this.tag = e, this.key = t, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
}

function xe(e, n, t, r) {
    return new kd(e, n, t, r)
}

function zu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent)
}

function Ed(e) {
    if (typeof e == "function") return zu(e) ? 1 : 0;
    if (e != null) {
        if (e = e.$$typeof, e === Yo) return 11;
        if (e === Xo) return 14
    }
    return 2
}

function fn(e, n) {
    var t = e.alternate;
    return t === null ? (t = xe(e.tag, n, e.key, e.mode), t.elementType = e.elementType, t.type = e.type, t.stateNode = e.stateNode, t.alternate = e, e.alternate = t) : (t.pendingProps = n, t.type = e.type, t.flags = 0, t.subtreeFlags = 0, t.deletions = null), t.flags = e.flags & 14680064, t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, n = e.dependencies, t.dependencies = n === null ? null : {
        lanes: n.lanes,
        firstContext: n.firstContext
    }, t.sibling = e.sibling, t.index = e.index, t.ref = e.ref, t
}

function Tr(e, n, t, r, l, o) {
    var u = 2;
    if (r = e, typeof e == "function") zu(e) && (u = 1); else if (typeof e == "string") u = 5; else e:switch (e) {
        case In:
            return Cn(t.children, l, o, n);
        case Ko:
            u = 8, l |= 8;
            break;
        case Yl:
            return e = xe(12, t, n, l | 2), e.elementType = Yl, e.lanes = o, e;
        case Xl:
            return e = xe(13, t, n, l), e.elementType = Xl, e.lanes = o, e;
        case Gl:
            return e = xe(19, t, n, l), e.elementType = Gl, e.lanes = o, e;
        case is:
            return dl(t, l, o, n);
        default:
            if (typeof e == "object" && e !== null) switch (e.$$typeof) {
                case os:
                    u = 10;
                    break e;
                case us:
                    u = 9;
                    break e;
                case Yo:
                    u = 11;
                    break e;
                case Xo:
                    u = 14;
                    break e;
                case Je:
                    u = 16, r = null;
                    break e
            }
            throw Error(y(130, e == null ? e : typeof e, ""))
    }
    return n = xe(u, t, n, l), n.elementType = e, n.type = r, n.lanes = o, n
}

function Cn(e, n, t, r) {
    return e = xe(7, e, r, n), e.lanes = t, e
}

function dl(e, n, t, r) {
    return e = xe(22, e, r, n), e.elementType = is, e.lanes = t, e.stateNode = {isHidden: !1}, e
}

function Wl(e, n, t) {
    return e = xe(6, e, null, n), e.lanes = t, e
}

function Ql(e, n, t) {
    return n = xe(4, e.children !== null ? e.children : [], e.key, n), n.lanes = t, n.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
    }, n
}

function xd(e, n, t, r, l) {
    this.tag = n, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Cl(0), this.expirationTimes = Cl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Cl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null
}

function Lu(e, n, t, r, l, o, u, i, s) {
    return e = new xd(e, n, t, i, s), n === 1 ? (n = 1, o === !0 && (n |= 8)) : n = 0, o = xe(3, null, null, n), e.current = o, o.stateNode = e, o.memoizedState = {
        element: r,
        isDehydrated: t,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
    }, du(o), e
}

function _d(e, n, t) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {$$typeof: Mn, key: r == null ? null : "" + r, children: e, containerInfo: n, implementation: t}
}

function qa(e) {
    if (!e) return pn;
    e = e._reactInternals;
    e:{
        if (On(e) !== e || e.tag !== 1) throw Error(y(170));
        var n = e;
        do {
            switch (n.tag) {
                case 3:
                    n = n.stateNode.context;
                    break e;
                case 1:
                    if (de(n.type)) {
                        n = n.stateNode.__reactInternalMemoizedMergedChildContext;
                        break e
                    }
            }
            n = n.return
        } while (n !== null);
        throw Error(y(171))
    }
    if (e.tag === 1) {
        var t = e.type;
        if (de(t)) return qs(e, t, n)
    }
    return n
}

function ba(e, n, t, r, l, o, u, i, s) {
    return e = Lu(t, r, !0, e, l, o, u, i, s), e.context = qa(null), t = e.current, r = ue(), l = cn(t), o = We(r, l), o.callback = n ?? null, sn(t, o, l), e.current.lanes = l, Zt(e, l, r), pe(e, r), e
}

function pl(e, n, t, r) {
    var l = n.current, o = ue(), u = cn(l);
    return t = qa(t), n.context === null ? n.context = t : n.pendingContext = t, n = We(o, u), n.payload = {element: e}, r = r === void 0 ? null : r, r !== null && (n.callback = r), e = sn(l, n, u), e !== null && (je(e, l, u, o), _r(e, l, u)), u
}

function el(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode
    }
}

function Vi(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var t = e.retryLane;
        e.retryLane = t !== 0 && t < n ? t : n
    }
}

function Tu(e, n) {
    Vi(e, n), (e = e.alternate) && Vi(e, n)
}

function Cd() {
    return null
}

var ec = typeof reportError == "function" ? reportError : function (e) {
    console.error(e)
};

function Ru(e) {
    this._internalRoot = e
}

ml.prototype.render = Ru.prototype.render = function (e) {
    var n = this._internalRoot;
    if (n === null) throw Error(y(409));
    pl(e, n, null, null)
};
ml.prototype.unmount = Ru.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var n = e.containerInfo;
        Tn(function () {
            pl(null, e, null, null)
        }), n[Ke] = null
    }
};

function ml(e) {
    this._internalRoot = e
}

ml.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
        var n = Rs();
        e = {blockedOn: null, target: e, priority: n};
        for (var t = 0; t < be.length && n !== 0 && n < be[t].priority; t++) ;
        be.splice(t, 0, e), t === 0 && js(e)
    }
};

function Ou(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}

function hl(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}

function Ai() {
}

function Nd(e, n, t, r, l) {
    if (l) {
        if (typeof r == "function") {
            var o = r;
            r = function () {
                var c = el(u);
                o.call(c)
            }
        }
        var u = ba(n, r, e, 0, null, !1, !1, "", Ai);
        return e._reactRootContainer = u, e[Ke] = u.current, Bt(e.nodeType === 8 ? e.parentNode : e), Tn(), u
    }
    for (; l = e.lastChild;) e.removeChild(l);
    if (typeof r == "function") {
        var i = r;
        r = function () {
            var c = el(s);
            i.call(c)
        }
    }
    var s = Lu(e, 0, !1, null, null, !1, !1, "", Ai);
    return e._reactRootContainer = s, e[Ke] = s.current, Bt(e.nodeType === 8 ? e.parentNode : e), Tn(function () {
        pl(n, s, t, r)
    }), s
}

function vl(e, n, t, r, l) {
    var o = t._reactRootContainer;
    if (o) {
        var u = o;
        if (typeof l == "function") {
            var i = l;
            l = function () {
                var s = el(u);
                i.call(s)
            }
        }
        pl(n, u, e, l)
    } else u = Nd(t, n, e, l, r);
    return el(u)
}

Ls = function (e) {
    switch (e.tag) {
        case 3:
            var n = e.stateNode;
            if (n.current.memoizedState.isDehydrated) {
                var t = kt(n.pendingLanes);
                t !== 0 && (Jo(n, t | 1), pe(n, Q()), !(R & 6) && (ot = Q() + 500, vn()))
            }
            break;
        case 13:
            Tn(function () {
                var r = Ye(e, 1);
                if (r !== null) {
                    var l = ue();
                    je(r, e, 1, l)
                }
            }), Tu(e, 1)
    }
};
qo = function (e) {
    if (e.tag === 13) {
        var n = Ye(e, 134217728);
        if (n !== null) {
            var t = ue();
            je(n, e, 134217728, t)
        }
        Tu(e, 134217728)
    }
};
Ts = function (e) {
    if (e.tag === 13) {
        var n = cn(e), t = Ye(e, n);
        if (t !== null) {
            var r = ue();
            je(t, e, n, r)
        }
        Tu(e, n)
    }
};
Rs = function () {
    return O
};
Os = function (e, n) {
    var t = O;
    try {
        return O = e, n()
    } finally {
        O = t
    }
};
oo = function (e, n, t) {
    switch (n) {
        case"input":
            if (ql(e, t), n = t.name, t.type === "radio" && n != null) {
                for (t = e; t.parentNode;) t = t.parentNode;
                for (t = t.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), n = 0; n < t.length; n++) {
                    var r = t[n];
                    if (r !== e && r.form === e.form) {
                        var l = ul(r);
                        if (!l) throw Error(y(90));
                        as(r), ql(r, l)
                    }
                }
            }
            break;
        case"textarea":
            fs(e, t);
            break;
        case"select":
            n = t.value, n != null && Yn(e, !!t.multiple, n, !1)
    }
};
gs = Cu;
ws = Tn;
var Pd = {usingClientEntryPoint: !1, Events: [qt, Bn, ul, vs, ys, Cu]},
    gt = {findFiberByHostInstance: kn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom"}, zd = {
        bundleType: gt.bundleType,
        version: gt.version,
        rendererPackageName: gt.rendererPackageName,
        rendererConfig: gt.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: Ge.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
            return e = Es(e), e === null ? null : e.stateNode
        },
        findFiberByHostInstance: gt.findFiberByHostInstance || Cd,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var gr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!gr.isDisabled && gr.supportsFiber) try {
        tl = gr.inject(zd), Ue = gr
    } catch {
    }
}
ge.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Pd;
ge.createPortal = function (e, n) {
    var t = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Ou(n)) throw Error(y(200));
    return _d(e, n, null, t)
};
ge.createRoot = function (e, n) {
    if (!Ou(e)) throw Error(y(299));
    var t = !1, r = "", l = ec;
    return n != null && (n.unstable_strictMode === !0 && (t = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onRecoverableError !== void 0 && (l = n.onRecoverableError)), n = Lu(e, 1, !1, null, null, t, !1, r, l), e[Ke] = n.current, Bt(e.nodeType === 8 ? e.parentNode : e), new Ru(n)
};
ge.findDOMNode = function (e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var n = e._reactInternals;
    if (n === void 0) throw typeof e.render == "function" ? Error(y(188)) : (e = Object.keys(e).join(","), Error(y(268, e)));
    return e = Es(n), e = e === null ? null : e.stateNode, e
};
ge.flushSync = function (e) {
    return Tn(e)
};
ge.hydrate = function (e, n, t) {
    if (!hl(n)) throw Error(y(200));
    return vl(null, e, n, !0, t)
};
ge.hydrateRoot = function (e, n, t) {
    if (!Ou(e)) throw Error(y(405));
    var r = t != null && t.hydratedSources || null, l = !1, o = "", u = ec;
    if (t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (u = t.onRecoverableError)), n = ba(n, null, e, 1, t ?? null, l, !1, o, u), e[Ke] = n.current, Bt(e), r) for (e = 0; e < r.length; e++) t = r[e], l = t._getVersion, l = l(t._source), n.mutableSourceEagerHydrationData == null ? n.mutableSourceEagerHydrationData = [t, l] : n.mutableSourceEagerHydrationData.push(t, l);
    return new ml(n)
};
ge.render = function (e, n, t) {
    if (!hl(n)) throw Error(y(200));
    return vl(null, e, n, !1, t)
};
ge.unmountComponentAtNode = function (e) {
    if (!hl(e)) throw Error(y(40));
    return e._reactRootContainer ? (Tn(function () {
        vl(null, null, e, !1, function () {
            e._reactRootContainer = null, e[Ke] = null
        })
    }), !0) : !1
};
ge.unstable_batchedUpdates = Cu;
ge.unstable_renderSubtreeIntoContainer = function (e, n, t, r) {
    if (!hl(t)) throw Error(y(200));
    if (e == null || e._reactInternals === void 0) throw Error(y(38));
    return vl(e, n, t, !1, r)
};
ge.version = "18.3.1-next-f1338f8080-20240426";

function nc() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(nc)
    } catch (e) {
        console.error(e)
    }
}

nc(), ns.exports = ge;
var Ld = ns.exports, Hi = Ld;
Fu.createRoot = Hi.createRoot, Fu.hydrateRoot = Hi.hydrateRoot;
const Td = "index-module__container___IghVp", Rd = "index-module__content___t-cQ-", Od = "index-module__drop___6Ln9w",
    jd = "index-module__contentBox___qVC38", Dd = "index-module__inputBox___--Lk4", Md = "index-module__btns___fdRwI",
    Se = {container: Td, content: Rd, drop: Od, contentBox: jd, inputBox: Dd, btns: Md}, Id = () => {
        const [e, n] = Dn.useState(!0), [t, r] = Dn.useState(null);
        Dn.useEffect(() => {
            var i;
            const u = (i = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : i.getAttribute("content");
            r(u)
        }, []);
        const l = () => {
            n(!e)
        }, o = u => {
            u.preventDefault();
            const i = new FormData(u.target), s = Object.fromEntries(i.entries());
            fetch(e ? "/api/login/" : "/api/register/", {
                method: "POST",
                headers: {"Content-Type": "application/json", "X-CSRFToken": t},
                body: JSON.stringify(s)
            }).then(m => {
                if (!m.ok) throw new Error(`HTTP error! status: ${m.status}`);
                return m.json()
            }).then(m => {
                m.success ? (alert(m.message || "操作成功"), window.location.href = "/home/") : alert(m.message || "操作失败，请检查输入！")
            }).catch(m => {
                console.error("请求错误:", m), alert("请求失败，请稍后重试！")
            })
        };
        return Dn.useEffect(() => {
            document.querySelectorAll("form").forEach(i => i.reset())
        }, [e]), j.jsx("div", {
            className: Se.container,
            style: {"--main-color": e ? "#01b4ff" : "#c61dff", "--btn-color": e ? "#c61dff" : "#01b4ff"},
            children: j.jsxs("div", {
                className: Se.content, children: [j.jsx("div", {
                    className: Se.drop, children: j.jsx("div", {
                        className: Se.contentBox,
                        children: e ? j.jsxs(j.Fragment, {
                            children: [j.jsx("h2", {children: "登录"}), j.jsxs("form", {
                                onSubmit: o,
                                autoComplete: "off",
                                children: [j.jsx("div", {
                                    className: Se.inputBox,
                                    children: j.jsx("input", {
                                        type: "text",
                                        placeholder: "用户名",
                                        name: "username",
                                        autoComplete: "new-username",
                                        required: !0
                                    })
                                }), j.jsx("div", {
                                    className: Se.inputBox,
                                    children: j.jsx("input", {
                                        type: "password",
                                        placeholder: "密码",
                                        name: "password",
                                        autoComplete: "new-password",
                                        required: !0
                                    })
                                }), j.jsx("div", {
                                    className: Se.inputBox,
                                    children: j.jsx("input", {type: "submit", value: "登录"})
                                })]
                            })]
                        }) : j.jsxs(j.Fragment, {
                            children: [j.jsx("h2", {children: "注册"}), j.jsxs("form", {
                                onSubmit: o,
                                autoComplete: "off",
                                children: [j.jsx("input", {
                                    type: "password",
                                    style: {display: "none"}
                                }), j.jsx("div", {
                                    className: Se.inputBox,
                                    children: j.jsx("input", {
                                        type: "text",
                                        placeholder: "用户名",
                                        name: "username",
                                        autoComplete: "new-username",
                                        required: !0
                                    })
                                }), j.jsx("div", {
                                    className: Se.inputBox,
                                    children: j.jsx("input", {
                                        type: "email",
                                        placeholder: "邮箱",
                                        name: "email",
                                        autoComplete: "new-email",
                                        required: !0
                                    })
                                }), j.jsx("div", {
                                    className: Se.inputBox,
                                    children: j.jsx("input", {
                                        type: "password",
                                        placeholder: "密码",
                                        name: "password",
                                        autoComplete: "new-password",
                                        required: !0
                                    })
                                }), j.jsx("div", {
                                    className: Se.inputBox,
                                    children: j.jsx("input", {type: "submit", value: "注册"})
                                })]
                            })]
                        })
                    })
                }), j.jsx("div", {className: Se.btns, onClick: l, children: e ? "注册" : "登录"})]
            })
        })
    };
export {Id as W, Fu as c, j};
