﻿/*!
 * Bootstrap-select v1.13.18 (https://developer.snapappointments.com/bootstrap-select)
 *
 * Copyright 2012-2020 SnapAppointments, LLC
 * Licensed under MIT (https://github.com/snapappointments/bootstrap-select/blob/master/LICENSE)
 */

! function (e, t) {
    void 0 === e && void 0 !== window && (e = window), "function" == typeof define && define.amd ? define(["jquery"], function (e) {
        return t(e)
    }) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(e.jQuery)
}(this, function (e) {
    ! function (P) {
        "use strict";
        var d = ["sanitize", "whiteList", "sanitizeFn"],
            r = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
            e = {
                "*": ["class", "dir", "id", "lang", "role", "tabindex", "style", /^aria-[\w-]*$/i],
                a: ["target", "href", "title", "rel"],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ["src", "alt", "title", "width", "height"],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: []
            },
            l = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
            a = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

        function v(e, t) {
            var i = e.nodeName.toLowerCase();
            if (-1 !== P.inArray(i, t)) return -1 === P.inArray(i, r) || Boolean(e.nodeValue.match(l) || e.nodeValue.match(a));
            for (var s = P(t).filter(function (e, t) {
                return t instanceof RegExp
            }), n = 0, o = s.length; n < o; n++)
                if (i.match(s[n])) return !0;
            return !1
        }

        function W(e, t, i) {
            if (i && "function" == typeof i) return i(e);
            for (var s = Object.keys(t), n = 0, o = e.length; n < o; n++)
                for (var r = e[n].querySelectorAll("*"), l = 0, a = r.length; l < a; l++) {
                    var c = r[l],
                        d = c.nodeName.toLowerCase();
                    if (-1 !== s.indexOf(d))
                        for (var h = [].slice.call(c.attributes), p = [].concat(t["*"] || [], t[d] || []), u = 0, f = h.length; u < f; u++) {
                            var m = h[u];
                            v(m, p) || c.removeAttribute(m.nodeName)
                        } else c.parentNode.removeChild(c)
                }
        }
        "classList" in document.createElement("_") || function (e) {
            if ("Element" in e) {
                var t = "classList",
                    i = "prototype",
                    s = e.Element[i],
                    n = Object,
                    o = function () {
                        var i = P(this);
                        return {
                            add: function (e) {
                                return e = Array.prototype.slice.call(arguments).join(" "), i.addClass(e)
                            },
                            remove: function (e) {
                                return e = Array.prototype.slice.call(arguments).join(" "), i.removeClass(e)
                            },
                            toggle: function (e, t) {
                                return i.toggleClass(e, t)
                            },
                            contains: function (e) {
                                return i.hasClass(e)
                            }
                        }
                    };
                if (n.defineProperty) {
                    var r = {
                        get: o,
                        enumerable: !0,
                        configurable: !0
                    };
                    try {
                        n.defineProperty(s, t, r)
                    } catch (e) {
                        void 0 !== e.number && -2146823252 !== e.number || (r.enumerable = !1, n.defineProperty(s, t, r))
                    }
                } else n[i].__defineGetter__ && s.__defineGetter__(t, o)
            }
        }(window);
        var t, c, i = document.createElement("_");
        if (i.classList.add("c1", "c2"), !i.classList.contains("c2")) {
            var s = DOMTokenList.prototype.add,
                n = DOMTokenList.prototype.remove;
            DOMTokenList.prototype.add = function () {
                Array.prototype.forEach.call(arguments, s.bind(this))
            }, DOMTokenList.prototype.remove = function () {
                Array.prototype.forEach.call(arguments, n.bind(this))
            }
        }
        if (i.classList.toggle("c3", !1), i.classList.contains("c3")) {
            var o = DOMTokenList.prototype.toggle;
            DOMTokenList.prototype.toggle = function (e, t) {
                return 1 in arguments && !this.contains(e) == !t ? t : o.call(this, e)
            }
        }

        function h(e) {
            if (null == this) throw new TypeError;
            var t = String(this);
            if (e && "[object RegExp]" == c.call(e)) throw new TypeError;
            var i = t.length,
                s = String(e),
                n = s.length,
                o = 1 < arguments.length ? arguments[1] : void 0,
                r = o ? Number(o) : 0;
            r != r && (r = 0);
            var l = Math.min(Math.max(r, 0), i);
            if (i < n + l) return !1;
            for (var a = -1; ++a < n;)
                if (t.charCodeAt(l + a) != s.charCodeAt(a)) return !1;
            return !0
        }

        function O(e, t) {
            var i, s = e.selectedOptions,
                n = [];
            if (t) {
                for (var o = 0, r = s.length; o < r; o++)(i = s[o]).disabled || "OPTGROUP" === i.parentNode.tagName && i.parentNode.disabled || n.push(i);
                return n
            }
            return s
        }

        function z(e, t) {
            for (var i, s = [], n = t || e.selectedOptions, o = 0, r = n.length; o < r; o++)(i = n[o]).disabled || "OPTGROUP" === i.parentNode.tagName && i.parentNode.disabled || s.push(i.value);
            return e.multiple ? s : s.length ? s[0] : null
        }
        i = null, String.prototype.startsWith || (t = function () {
            try {
                var e = {},
                    t = Object.defineProperty,
                    i = t(e, e, e) && t
            } catch (e) { }
            return i
        }(), c = {}.toString, t ? t(String.prototype, "startsWith", {
            value: h,
            configurable: !0,
            writable: !0
        }) : String.prototype.startsWith = h), Object.keys || (Object.keys = function (e, t, i) {
            for (t in i = [], e) i.hasOwnProperty.call(e, t) && i.push(t);
            return i
        }), HTMLSelectElement && !HTMLSelectElement.prototype.hasOwnProperty("selectedOptions") && Object.defineProperty(HTMLSelectElement.prototype, "selectedOptions", {
            get: function () {
                return this.querySelectorAll(":checked")
            }
        });
        var p = {
            useDefault: !1,
            _set: P.valHooks.select.set
        };
        P.valHooks.select.set = function (e, t) {
            return t && !p.useDefault && P(e).data("selected", !0), p._set.apply(this, arguments)
        };
        var T = null,
            u = function () {
                try {
                    return new Event("change"), !0
                } catch (e) {
                    return !1
                }
            }();

        function k(e, t, i, s) {
            for (var n = ["display", "subtext", "tokens"], o = !1, r = 0; r < n.length; r++) {
                var l = n[r],
                    a = e[l];
                if (a && (a = a.toString(), "display" === l && (a = a.replace(/<[^>]+>/g, "")), s && (a = w(a)), a = a.toUpperCase(), o = "contains" === i ? 0 <= a.indexOf(t) : a.startsWith(t))) break
            }
            return o
        }

        function N(e) {
            return parseInt(e, 10) || 0
        }
        P.fn.triggerNative = function (e) {
            var t, i = this[0];
            i.dispatchEvent ? (u ? t = new Event(e, {
                bubbles: !0
            }) : (t = document.createEvent("Event")).initEvent(e, !0, !1), i.dispatchEvent(t)) : i.fireEvent ? ((t = document.createEventObject()).eventType = e, i.fireEvent("on" + e, t)) : this.trigger(e)
        };
        var f = {
            "\xc0": "A",
            "\xc1": "A",
            "\xc2": "A",
            "\xc3": "A",
            "\xc4": "A",
            "\xc5": "A",
            "\xe0": "a",
            "\xe1": "a",
            "\xe2": "a",
            "\xe3": "a",
            "\xe4": "a",
            "\xe5": "a",
            "\xc7": "C",
            "\xe7": "c",
            "\xd0": "D",
            "\xf0": "d",
            "\xc8": "E",
            "\xc9": "E",
            "\xca": "E",
            "\xcb": "E",
            "\xe8": "e",
            "\xe9": "e",
            "\xea": "e",
            "\xeb": "e",
            "\xcc": "I",
            "\xcd": "I",
            "\xce": "I",
            "\xcf": "I",
            "\xec": "i",
            "\xed": "i",
            "\xee": "i",
            "\xef": "i",
            "\xd1": "N",
            "\xf1": "n",
            "\xd2": "O",
            "\xd3": "O",
            "\xd4": "O",
            "\xd5": "O",
            "\xd6": "O",
            "\xd8": "O",
            "\xf2": "o",
            "\xf3": "o",
            "\xf4": "o",
            "\xf5": "o",
            "\xf6": "o",
            "\xf8": "o",
            "\xd9": "U",
            "\xda": "U",
            "\xdb": "U",
            "\xdc": "U",
            "\xf9": "u",
            "\xfa": "u",
            "\xfb": "u",
            "\xfc": "u",
            "\xdd": "Y",
            "\xfd": "y",
            "\xff": "y",
            "\xc6": "Ae",
            "\xe6": "ae",
            "\xde": "Th",
            "\xfe": "th",
            "\xdf": "ss",
            "\u0100": "A",
            "\u0102": "A",
            "\u0104": "A",
            "\u0101": "a",
            "\u0103": "a",
            "\u0105": "a",
            "\u0106": "C",
            "\u0108": "C",
            "\u010a": "C",
            "\u010c": "C",
            "\u0107": "c",
            "\u0109": "c",
            "\u010b": "c",
            "\u010d": "c",
            "\u010e": "D",
            "\u0110": "D",
            "\u010f": "d",
            "\u0111": "d",
            "\u0112": "E",
            "\u0114": "E",
            "\u0116": "E",
            "\u0118": "E",
            "\u011a": "E",
            "\u0113": "e",
            "\u0115": "e",
            "\u0117": "e",
            "\u0119": "e",
            "\u011b": "e",
            "\u011c": "G",
            "\u011e": "G",
            "\u0120": "G",
            "\u0122": "G",
            "\u011d": "g",
            "\u011f": "g",
            "\u0121": "g",
            "\u0123": "g",
            "\u0124": "H",
            "\u0126": "H",
            "\u0125": "h",
            "\u0127": "h",
            "\u0128": "I",
            "\u012a": "I",
            "\u012c": "I",
            "\u012e": "I",
            "\u0130": "I",
            "\u0129": "i",
            "\u012b": "i",
            "\u012d": "i",
            "\u012f": "i",
            "\u0131": "i",
            "\u0134": "J",
            "\u0135": "j",
            "\u0136": "K",
            "\u0137": "k",
            "\u0138": "k",
            "\u0139": "L",
            "\u013b": "L",
            "\u013d": "L",
            "\u013f": "L",
            "\u0141": "L",
            "\u013a": "l",
            "\u013c": "l",
            "\u013e": "l",
            "\u0140": "l",
            "\u0142": "l",
            "\u0143": "N",
            "\u0145": "N",
            "\u0147": "N",
            "\u014a": "N",
            "\u0144": "n",
            "\u0146": "n",
            "\u0148": "n",
            "\u014b": "n",
            "\u014c": "O",
            "\u014e": "O",
            "\u0150": "O",
            "\u014d": "o",
            "\u014f": "o",
            "\u0151": "o",
            "\u0154": "R",
            "\u0156": "R",
            "\u0158": "R",
            "\u0155": "r",
            "\u0157": "r",
            "\u0159": "r",
            "\u015a": "S",
            "\u015c": "S",
            "\u015e": "S",
            "\u0160": "S",
            "\u015b": "s",
            "\u015d": "s",
            "\u015f": "s",
            "\u0161": "s",
            "\u0162": "T",
            "\u0164": "T",
            "\u0166": "T",
            "\u0163": "t",
            "\u0165": "t",
            "\u0167": "t",
            "\u0168": "U",
            "\u016a": "U",
            "\u016c": "U",
            "\u016e": "U",
            "\u0170": "U",
            "\u0172": "U",
            "\u0169": "u",
            "\u016b": "u",
            "\u016d": "u",
            "\u016f": "u",
            "\u0171": "u",
            "\u0173": "u",
            "\u0174": "W",
            "\u0175": "w",
            "\u0176": "Y",
            "\u0177": "y",
            "\u0178": "Y",
            "\u0179": "Z",
            "\u017b": "Z",
            "\u017d": "Z",
            "\u017a": "z",
            "\u017c": "z",
            "\u017e": "z",
            "\u0132": "IJ",
            "\u0133": "ij",
            "\u0152": "Oe",
            "\u0153": "oe",
            "\u0149": "'n",
            "\u017f": "s"
        },
            m = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
            g = RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\u1ab0-\\u1aff\\u1dc0-\\u1dff]", "g");

        function b(e) {
            return f[e]
        }

        function w(e) {
            return (e = e.toString()) && e.replace(m, b).replace(g, "")
        }
        var I, x, y, $, S = (I = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        }, x = "(?:" + Object.keys(I).join("|") + ")", y = RegExp(x), $ = RegExp(x, "g"), function (e) {
            return e = null == e ? "" : "" + e, y.test(e) ? e.replace($, E) : e
        });

        function E(e) {
            return I[e]
        }
        var C = {
            32: " ",
            48: "0",
            49: "1",
            50: "2",
            51: "3",
            52: "4",
            53: "5",
            54: "6",
            55: "7",
            56: "8",
            57: "9",
            59: ";",
            65: "A",
            66: "B",
            67: "C",
            68: "D",
            69: "E",
            70: "F",
            71: "G",
            72: "H",
            73: "I",
            74: "J",
            75: "K",
            76: "L",
            77: "M",
            78: "N",
            79: "O",
            80: "P",
            81: "Q",
            82: "R",
            83: "S",
            84: "T",
            85: "U",
            86: "V",
            87: "W",
            88: "X",
            89: "Y",
            90: "Z",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9"
        },
            A = 27,
            L = 13,
            D = 32,
            H = 9,
            B = 38,
            R = 40,
            M = {
                success: !1,
                major: "3"
            };
        try {
            M.full = (P.fn.dropdown.Constructor.VERSION || "").split(" ")[0].split("."), M.major = M.full[0], M.success = !0
        } catch (e) { }
        var U = 0,
            j = ".bs.select",
            V = {
                DISABLED: "disabled",
                DIVIDER: "divider",
                SHOW: "open",
                DROPUP: "dropup",
                MENU: "dropdown-menu",
                MENURIGHT: "dropdown-menu-right",
                MENULEFT: "dropdown-menu-left",
                BUTTONCLASS: "btn-default",
                POPOVERHEADER: "popover-title",
                ICONBASE: "glyphicon",
                TICKICON: "glyphicon-ok"
            },
            F = {
                MENU: "." + V.MENU
            },
            _ = {
                div: document.createElement("div"),
                span: document.createElement("span"),
                i: document.createElement("i"),
                subtext: document.createElement("small"),
                a: document.createElement("a"),
                li: document.createElement("li"),
                whitespace: document.createTextNode("\xa0"),
                fragment: document.createDocumentFragment()
            };
        _.noResults = _.li.cloneNode(!1), _.noResults.className = "no-results", _.a.setAttribute("role", "option"), _.a.className = "dropdown-item", _.subtext.className = "text-muted", _.text = _.span.cloneNode(!1), _.text.className = "text", _.checkMark = _.span.cloneNode(!1);
        var G = new RegExp(B + "|" + R),
            q = new RegExp("^" + H + "$|" + A),
            K = {
                li: function (e, t, i) {
                    var s = _.li.cloneNode(!1);
                    return e && (1 === e.nodeType || 11 === e.nodeType ? s.appendChild(e) : s.innerHTML = e), void 0 !== t && "" !== t && (s.className = t), null != i && s.classList.add("optgroup-" + i), s
                },
                a: function (e, t, i) {
                    var s = _.a.cloneNode(!0);
                    return e && (11 === e.nodeType ? s.appendChild(e) : s.insertAdjacentHTML("beforeend", e)), void 0 !== t && "" !== t && s.classList.add.apply(s.classList, t.split(/\s+/)), i && s.setAttribute("style", i), s
                },
                text: function (e, t) {
                    var i, s, n = _.text.cloneNode(!1);
                    if (e.content) n.innerHTML = e.content;
                    else {
                        if (n.textContent = e.text, e.icon) {
                            var o = _.whitespace.cloneNode(!1);
                            (s = (!0 === t ? _.i : _.span).cloneNode(!1)).className = this.options.iconBase + " " + e.icon, _.fragment.appendChild(s), _.fragment.appendChild(o)
                        }
                        e.subtext && ((i = _.subtext.cloneNode(!1)).textContent = e.subtext, n.appendChild(i))
                    }
                    if (!0 === t)
                        for (; 0 < n.childNodes.length;) _.fragment.appendChild(n.childNodes[0]);
                    else _.fragment.appendChild(n);
                    return _.fragment
                },
                label: function (e) {
                    var t, i, s = _.text.cloneNode(!1);
                    if (s.innerHTML = e.display, e.icon) {
                        var n = _.whitespace.cloneNode(!1);
                        (i = _.span.cloneNode(!1)).className = this.options.iconBase + " " + e.icon, _.fragment.appendChild(i), _.fragment.appendChild(n)
                    }
                    return e.subtext && ((t = _.subtext.cloneNode(!1)).textContent = e.subtext, s.appendChild(t)), _.fragment.appendChild(s), _.fragment
                }
            };
        var Y = function (e, t) {
            var i = this;
            p.useDefault || (P.valHooks.select.set = p._set, p.useDefault = !0), this.$element = P(e), this.$newElement = null, this.$button = null, this.$menu = null, this.options = t, this.selectpicker = {
                main: {},
                search: {},
                current: {},
                view: {},
                isSearching: !1,
                keydown: {
                    keyHistory: "",
                    resetKeyHistory: {
                        start: function () {
                            return setTimeout(function () {
                                i.selectpicker.keydown.keyHistory = ""
                            }, 800)
                        }
                    }
                }
            }, this.sizeInfo = {}, null === this.options.title && (this.options.title = this.$element.attr("title"));
            var s = this.options.windowPadding;
            "number" == typeof s && (this.options.windowPadding = [s, s, s, s]), this.val = Y.prototype.val, this.render = Y.prototype.render, this.refresh = Y.prototype.refresh, this.setStyle = Y.prototype.setStyle, this.selectAll = Y.prototype.selectAll, this.deselectAll = Y.prototype.deselectAll, this.destroy = Y.prototype.destroy, this.remove = Y.prototype.remove, this.show = Y.prototype.show, this.hide = Y.prototype.hide, this.init()
        };

        function Z(e) {
            var l, a = arguments,
                c = e;
            if ([].shift.apply(a), !M.success) {
                try {
                    M.full = (P.fn.dropdown.Constructor.VERSION || "").split(" ")[0].split(".")
                } catch (e) {
                    Y.BootstrapVersion ? M.full = Y.BootstrapVersion.split(" ")[0].split(".") : (M.full = [M.major, "0", "0"], console.warn("There was an issue retrieving Bootstrap's version. Ensure Bootstrap is being loaded before bootstrap-select and there is no namespace collision. If loading Bootstrap asynchronously, the version may need to be manually specified via $.fn.selectpicker.Constructor.BootstrapVersion.", e))
                }
                M.major = M.full[0], M.success = !0
            }
            if ("4" === M.major) {
                var t = [];
                Y.DEFAULTS.style === V.BUTTONCLASS && t.push({
                    name: "style",
                    className: "BUTTONCLASS"
                }), Y.DEFAULTS.iconBase === V.ICONBASE && t.push({
                    name: "iconBase",
                    className: "ICONBASE"
                }), Y.DEFAULTS.tickIcon === V.TICKICON && t.push({
                    name: "tickIcon",
                    className: "TICKICON"
                }), V.DIVIDER = "dropdown-divider", V.SHOW = "show", V.BUTTONCLASS = "btn-light", V.POPOVERHEADER = "popover-header", V.ICONBASE = "", V.TICKICON = "bs-ok-default";
                for (var i = 0; i < t.length; i++) {
                    e = t[i];
                    Y.DEFAULTS[e.name] = V[e.className]
                }
            }
            var s = this.each(function () {
                var e = P(this);
                if (e.is("select")) {
                    var t = e.data("selectpicker"),
                        i = "object" == typeof c && c;
                    if (t) {
                        if (i)
                            for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (t.options[s] = i[s])
                    } else {
                        var n = e.data();
                        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && -1 !== P.inArray(o, d) && delete n[o];
                        var r = P.extend({}, Y.DEFAULTS, P.fn.selectpicker.defaults || {}, n, i);
                        r.template = P.extend({}, Y.DEFAULTS.template, P.fn.selectpicker.defaults ? P.fn.selectpicker.defaults.template : {}, n.template, i.template), e.data("selectpicker", t = new Y(this, r))
                    }
                    "string" == typeof c && (l = t[c] instanceof Function ? t[c].apply(t, a) : t.options[c])
                }
            });
            return void 0 !== l ? l : s
        }
        Y.VERSION = "1.13.18", Y.DEFAULTS = {
            noneSelectedText: "Nothing selected",
            noneResultsText: "No results matched {0}",
            countSelectedText: function (e, t) {
                return 1 == e ? "{0} item selected" : "{0} items selected"
            },
            maxOptionsText: function (e, t) {
                return [1 == e ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == t ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"]
            },
            selectAllText: "Select All",
            deselectAllText: "Deselect All",
            doneButton: !1,
            doneButtonText: "Close",
            multipleSeparator: ", ",
            styleBase: "btn",
            style: V.BUTTONCLASS,
            size: "auto",
            title: null,
            selectedTextFormat: "values",
            width: !1,
            container: !1,
            hideDisabled: !1,
            showSubtext: !1,
            showIcon: !0,
            showContent: !0,
            dropupAuto: !0,
            header: !1,
            liveSearch: !1,
            liveSearchPlaceholder: null,
            liveSearchNormalize: !1,
            liveSearchStyle: "contains",
            actionsBox: !1,
            iconBase: V.ICONBASE,
            tickIcon: V.TICKICON,
            showTick: !1,
            template: {
                caret: '<span class="caret"></span>'
            },
            maxOptions: !1,
            mobile: !1,
            selectOnTab: !1,
            dropdownAlignRight: !1,
            windowPadding: 0,
            virtualScroll: 600,
            display: !1,
            sanitize: !0,
            sanitizeFn: null,
            whiteList: e
        }, Y.prototype = {
            constructor: Y,
            init: function () {
                var i = this,
                    e = this.$element.attr("id"),
                    t = this.$element[0],
                    s = t.form;
                U++, this.selectId = "bs-select-" + U, t.classList.add("bs-select-hidden"), this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), t.classList.contains("show-tick") && (this.options.showTick = !0), this.$newElement = this.createDropdown(), this.buildData(), this.$element.after(this.$newElement).prependTo(this.$newElement), s && null === t.form && (s.id || (s.id = "form-" + this.selectId), t.setAttribute("form", s.id)), this.$button = this.$newElement.children("button"), this.$menu = this.$newElement.children(F.MENU), this.$menuInner = this.$menu.children(".inner"), this.$searchbox = this.$menu.find("input"), t.classList.remove("bs-select-hidden"), !0 === this.options.dropdownAlignRight && this.$menu[0].classList.add(V.MENURIGHT), void 0 !== e && this.$button.attr("data-id", e), this.checkDisabled(), this.clickListener(), this.options.liveSearch ? (this.liveSearchListener(), this.focusedParent = this.$searchbox[0]) : this.focusedParent = this.$menuInner[0], this.setStyle(), this.render(), this.setWidth(), this.options.container ? this.selectPosition() : this.$element.on("hide" + j, function () {
                    if (i.isVirtual()) {
                        var e = i.$menuInner[0],
                            t = e.firstChild.cloneNode(!1);
                        e.replaceChild(t, e.firstChild), e.scrollTop = 0
                    }
                }), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile(), this.$newElement.on({
                    "hide.bs.dropdown": function (e) {
                        i.$element.trigger("hide" + j, e)
                    },
                    "hidden.bs.dropdown": function (e) {
                        i.$element.trigger("hidden" + j, e)
                    },
                    "show.bs.dropdown": function (e) {
                        i.$element.trigger("show" + j, e)
                    },
                    "shown.bs.dropdown": function (e) {
                        i.$element.trigger("shown" + j, e)
                    }
                }), t.hasAttribute("required") && this.$element.on("invalid" + j, function () {
                    i.$button[0].classList.add("bs-invalid"), i.$element.on("shown" + j + ".invalid", function () {
                        i.$element.val(i.$element.val()).off("shown" + j + ".invalid")
                    }).on("rendered" + j, function () {
                        this.validity.valid && i.$button[0].classList.remove("bs-invalid"), i.$element.off("rendered" + j)
                    }), i.$button.on("blur" + j, function () {
                        i.$element.trigger("focus").trigger("blur"), i.$button.off("blur" + j)
                    })
                }), setTimeout(function () {
                    i.buildList(), i.$element.trigger("loaded" + j)
                })
            },
            createDropdown: function () {
                var e = this.multiple || this.options.showTick ? " show-tick" : "",
                    t = this.multiple ? ' aria-multiselectable="true"' : "",
                    i = "",
                    s = this.autofocus ? " autofocus" : "";
                M.major < 4 && this.$element.parent().hasClass("input-group") && (i = " input-group-btn");
                var n, o = "",
                    r = "",
                    l = "",
                    a = "";
                return this.options.header && (o = '<div class="' + V.POPOVERHEADER + '"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>"), this.options.liveSearch && (r = '<div class="bs-searchbox"><input type="search" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + S(this.options.liveSearchPlaceholder) + '"') + ' role="combobox" aria-label="Search" aria-controls="' + this.selectId + '" aria-autocomplete="list"></div>'), this.multiple && this.options.actionsBox && (l = '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn ' + V.BUTTONCLASS + '">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn ' + V.BUTTONCLASS + '">' + this.options.deselectAllText + "</button></div></div>"), this.multiple && this.options.doneButton && (a = '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm ' + V.BUTTONCLASS + '">' + this.options.doneButtonText + "</button></div></div>"), n = '<div class="dropdown bootstrap-select' + e + i + '"><button type="button" tabindex="-1" class="' + this.options.styleBase + ' dropdown-toggle" ' + ("static" === this.options.display ? 'data-display="static"' : "") + 'data-toggle="dropdown"' + s + ' role="combobox" aria-owns="' + this.selectId + '" aria-haspopup="listbox" aria-expanded="false"><div class="filter-option"><div class="filter-option-inner"><div class="filter-option-inner-inner"></div></div> </div>' + ("4" === M.major ? "" : '<span class="bs-caret">' + this.options.template.caret + "</span>") + '</button><div class="' + V.MENU + " " + ("4" === M.major ? "" : V.SHOW) + '">' + o + r + l + '<div class="inner ' + V.SHOW + '" role="listbox" id="' + this.selectId + '" tabindex="-1" ' + t + '><ul class="' + V.MENU + " inner " + ("4" === M.major ? V.SHOW : "") + '" role="presentation"></ul></div>' + a + "</div></div>", P(n)
            },
            setPositionData: function () {
                this.selectpicker.view.canHighlight = [], this.selectpicker.view.size = 0, this.selectpicker.view.firstHighlightIndex = !1;
                for (var e = 0; e < this.selectpicker.current.data.length; e++) {
                    var t = this.selectpicker.current.data[e],
                        i = !0;
                    "divider" === t.type ? (i = !1, t.height = this.sizeInfo.dividerHeight) : "optgroup-label" === t.type ? (i = !1, t.height = this.sizeInfo.dropdownHeaderHeight) : t.height = this.sizeInfo.liHeight, t.disabled && (i = !1), this.selectpicker.view.canHighlight.push(i), i && (this.selectpicker.view.size++, t.posinset = this.selectpicker.view.size, !1 === this.selectpicker.view.firstHighlightIndex && (this.selectpicker.view.firstHighlightIndex = e)), t.position = (0 === e ? 0 : this.selectpicker.current.data[e - 1].position) + t.height
                }
            },
            isVirtual: function () {
                return !1 !== this.options.virtualScroll && this.selectpicker.main.elements.length >= this.options.virtualScroll || !0 === this.options.virtualScroll
            },
            createView: function (N, e, t) {
                var A, L, D = this,
                    i = 0,
                    H = [];
                if (this.selectpicker.isSearching = N, this.selectpicker.current = N ? this.selectpicker.search : this.selectpicker.main, this.setPositionData(), e)
                    if (t) i = this.$menuInner[0].scrollTop;
                    else if (!D.multiple) {
                        var s = D.$element[0],
                            n = (s.options[s.selectedIndex] || {}).liIndex;
                        if ("number" == typeof n && !1 !== D.options.size) {
                            var o = D.selectpicker.main.data[n],
                                r = o && o.position;
                            r && (i = r - (D.sizeInfo.menuInnerHeight + D.sizeInfo.liHeight) / 2)
                        }
                    }

                function l(e, t) {
                    var i, s, n, o, r, l, a, c, d = D.selectpicker.current.elements.length,
                        h = [],
                        p = !0,
                        u = D.isVirtual();
                    D.selectpicker.view.scrollTop = e, i = Math.ceil(D.sizeInfo.menuInnerHeight / D.sizeInfo.liHeight * 1.5), s = Math.round(d / i) || 1;
                    for (var f = 0; f < s; f++) {
                        var m = (f + 1) * i;
                        if (f === s - 1 && (m = d), h[f] = [f * i + (f ? 1 : 0), m], !d) break;
                        void 0 === r && e - 1 <= D.selectpicker.current.data[m - 1].position - D.sizeInfo.menuInnerHeight && (r = f)
                    }
                    if (void 0 === r && (r = 0), l = [D.selectpicker.view.position0, D.selectpicker.view.position1], n = Math.max(0, r - 1), o = Math.min(s - 1, r + 1), D.selectpicker.view.position0 = !1 === u ? 0 : Math.max(0, h[n][0]) || 0, D.selectpicker.view.position1 = !1 === u ? d : Math.min(d, h[o][1]) || 0, a = l[0] !== D.selectpicker.view.position0 || l[1] !== D.selectpicker.view.position1, void 0 !== D.activeIndex && (L = D.selectpicker.main.elements[D.prevActiveIndex], H = D.selectpicker.main.elements[D.activeIndex], A = D.selectpicker.main.elements[D.selectedIndex], t && (D.activeIndex !== D.selectedIndex && D.defocusItem(H), D.activeIndex = void 0), D.activeIndex && D.activeIndex !== D.selectedIndex && D.defocusItem(A)), void 0 !== D.prevActiveIndex && D.prevActiveIndex !== D.activeIndex && D.prevActiveIndex !== D.selectedIndex && D.defocusItem(L), (t || a) && (c = D.selectpicker.view.visibleElements ? D.selectpicker.view.visibleElements.slice() : [], D.selectpicker.view.visibleElements = !1 === u ? D.selectpicker.current.elements : D.selectpicker.current.elements.slice(D.selectpicker.view.position0, D.selectpicker.view.position1), D.setOptionStatus(), (N || !1 === u && t) && (p = ! function (e, i) {
                        return e.length === i.length && e.every(function (e, t) {
                            return e === i[t]
                        })
                    }(c, D.selectpicker.view.visibleElements)), (t || !0 === u) && p)) {
                        var v, g, b = D.$menuInner[0],
                            w = document.createDocumentFragment(),
                            I = b.firstChild.cloneNode(!1),
                            x = D.selectpicker.view.visibleElements,
                            k = [];
                        b.replaceChild(I, b.firstChild);
                        f = 0;
                        for (var y = x.length; f < y; f++) {
                            var $, S, E = x[f];
                            D.options.sanitize && ($ = E.lastChild) && (S = D.selectpicker.current.data[f + D.selectpicker.view.position0]) && S.content && !S.sanitized && (k.push($), S.sanitized = !0), w.appendChild(E)
                        }
                        if (D.options.sanitize && k.length && W(k, D.options.whiteList, D.options.sanitizeFn), !0 === u ? (v = 0 === D.selectpicker.view.position0 ? 0 : D.selectpicker.current.data[D.selectpicker.view.position0 - 1].position, g = D.selectpicker.view.position1 > d - 1 ? 0 : D.selectpicker.current.data[d - 1].position - D.selectpicker.current.data[D.selectpicker.view.position1 - 1].position, b.firstChild.style.marginTop = v + "px", b.firstChild.style.marginBottom = g + "px") : (b.firstChild.style.marginTop = 0, b.firstChild.style.marginBottom = 0), b.firstChild.appendChild(w), !0 === u && D.sizeInfo.hasScrollBar) {
                            var C = b.firstChild.offsetWidth;
                            if (t && C < D.sizeInfo.menuInnerInnerWidth && D.sizeInfo.totalMenuWidth > D.sizeInfo.selectWidth) b.firstChild.style.minWidth = D.sizeInfo.menuInnerInnerWidth + "px";
                            else if (C > D.sizeInfo.menuInnerInnerWidth) {
                                D.$menu[0].style.minWidth = 0;
                                var O = b.firstChild.offsetWidth;
                                O > D.sizeInfo.menuInnerInnerWidth && (D.sizeInfo.menuInnerInnerWidth = O, b.firstChild.style.minWidth = D.sizeInfo.menuInnerInnerWidth + "px"), D.$menu[0].style.minWidth = ""
                            }
                        }
                    }
                    if (D.prevActiveIndex = D.activeIndex, D.options.liveSearch) {
                        if (N && t) {
                            var z, T = 0;
                            D.selectpicker.view.canHighlight[T] || (T = 1 + D.selectpicker.view.canHighlight.slice(1).indexOf(!0)), z = D.selectpicker.view.visibleElements[T], D.defocusItem(D.selectpicker.view.currentActive), D.activeIndex = (D.selectpicker.current.data[T] || {}).index, D.focusItem(z)
                        }
                    } else D.$menuInner.trigger("focus")
                }
                l(i, !0), this.$menuInner.off("scroll.createView").on("scroll.createView", function (e, t) {
                    D.noScroll || l(this.scrollTop, t), D.noScroll = !1
                }), P(window).off("resize" + j + "." + this.selectId + ".createView").on("resize" + j + "." + this.selectId + ".createView", function () {
                    D.$newElement.hasClass(V.SHOW) && l(D.$menuInner[0].scrollTop)
                })
            },
            focusItem: function (e, t, i) {
                if (e) {
                    t = t || this.selectpicker.main.data[this.activeIndex];
                    var s = e.firstChild;
                    s && (s.setAttribute("aria-setsize", this.selectpicker.view.size), s.setAttribute("aria-posinset", t.posinset), !0 !== i && (this.focusedParent.setAttribute("aria-activedescendant", s.id), e.classList.add("active"), s.classList.add("active")))
                }
            },
            defocusItem: function (e) {
                e && (e.classList.remove("active"), e.firstChild && e.firstChild.classList.remove("active"))
            },
            setPlaceholder: function () {
                var e = this,
                    t = !1;
                if (this.options.title && !this.multiple) {
                    this.selectpicker.view.titleOption || (this.selectpicker.view.titleOption = document.createElement("option")), t = !0;
                    var i = this.$element[0],
                        s = !1,
                        n = !this.selectpicker.view.titleOption.parentNode,
                        o = i.selectedIndex,
                        r = i.options[o],
                        l = window.performance && window.performance.getEntriesByType("navigation"),
                        a = l && l.length ? "back_forward" !== l[0].type : 2 !== window.performance.navigation.type;
                    n && (this.selectpicker.view.titleOption.className = "bs-title-option", this.selectpicker.view.titleOption.value = "", s = !r || 0 === o && !1 === r.defaultSelected && void 0 === this.$element.data("selected")), !n && 0 === this.selectpicker.view.titleOption.index || i.insertBefore(this.selectpicker.view.titleOption, i.firstChild), s && a ? i.selectedIndex = 0 : "complete" !== document.readyState && window.addEventListener("pageshow", function () {
                        e.selectpicker.view.displayedValue !== i.value && e.render()
                    })
                }
                return t
            },
            buildData: function () {
                var p = ':not([hidden]):not([data-hidden="true"])',
                    u = [],
                    f = 0,
                    m = this.setPlaceholder() ? 1 : 0;
                this.options.hideDisabled && (p += ":not(:disabled)");
                var e = this.$element[0].querySelectorAll("select > *" + p);

                function v(e) {
                    var t = u[u.length - 1];
                    t && "divider" === t.type && (t.optID || e.optID) || ((e = e || {}).type = "divider", u.push(e))
                }

                function g(e, t) {
                    if ((t = t || {}).divider = "true" === e.getAttribute("data-divider"), t.divider) v({
                        optID: t.optID
                    });
                    else {
                        var i = u.length,
                            s = e.style.cssText,
                            n = s ? S(s) : "",
                            o = (e.className || "") + (t.optgroupClass || "");
                        t.optID && (o = "opt " + o), t.optionClass = o.trim(), t.inlineStyle = n, t.text = e.textContent, t.content = e.getAttribute("data-content"), t.tokens = e.getAttribute("data-tokens"), t.subtext = e.getAttribute("data-subtext"), t.icon = e.getAttribute("data-icon"), e.liIndex = i, t.display = t.content || t.text, t.type = "option", t.index = i, t.option = e, t.selected = !!e.selected, t.disabled = t.disabled || !!e.disabled, u.push(t)
                    }
                }

                function t(e, t) {
                    var i = t[e],
                        s = !(e - 1 < m) && t[e - 1],
                        n = t[e + 1],
                        o = i.querySelectorAll("option" + p);
                    if (o.length) {
                        var r, l, a = {
                            display: S(i.label),
                            subtext: i.getAttribute("data-subtext"),
                            icon: i.getAttribute("data-icon"),
                            type: "optgroup-label",
                            optgroupClass: " " + (i.className || "")
                        };
                        f++, s && v({
                            optID: f
                        }), a.optID = f, u.push(a);
                        for (var c = 0, d = o.length; c < d; c++) {
                            var h = o[c];
                            0 === c && (l = (r = u.length - 1) + d), g(h, {
                                headerIndex: r,
                                lastIndex: l,
                                optID: a.optID,
                                optgroupClass: a.optgroupClass,
                                disabled: i.disabled
                            })
                        }
                        n && v({
                            optID: f
                        })
                    }
                }
                for (var i = e.length, s = m; s < i; s++) {
                    var n = e[s];
                    "OPTGROUP" !== n.tagName ? g(n, {}) : t(s, e)
                }
                this.selectpicker.main.data = this.selectpicker.current.data = u
            },
            buildList: function () {
                var s = this,
                    e = this.selectpicker.main.data,
                    n = [],
                    o = 0;

                function t(e) {
                    var t, i = 0;
                    switch (e.type) {
                        case "divider":
                            t = K.li(!1, V.DIVIDER, e.optID ? e.optID + "div" : void 0);
                            break;
                        case "option":
                            (t = K.li(K.a(K.text.call(s, e), e.optionClass, e.inlineStyle), "", e.optID)).firstChild && (t.firstChild.id = s.selectId + "-" + e.index);
                            break;
                        case "optgroup-label":
                            t = K.li(K.label.call(s, e), "dropdown-header" + e.optgroupClass, e.optID)
                    }
                    e.element = t, n.push(t), e.display && (i += e.display.length), e.subtext && (i += e.subtext.length), e.icon && (i += 1), o < i && (o = i, s.selectpicker.view.widestOption = n[n.length - 1])
                } !s.options.showTick && !s.multiple || _.checkMark.parentNode || (_.checkMark.className = this.options.iconBase + " " + s.options.tickIcon + " check-mark", _.a.appendChild(_.checkMark));
                for (var i = e.length, r = 0; r < i; r++) {
                    t(e[r])
                }
                this.selectpicker.main.elements = this.selectpicker.current.elements = n
            },
            findLis: function () {
                return this.$menuInner.find(".inner > li")
            },
            render: function () {
                var e, t = this,
                    i = this.$element[0],
                    s = this.setPlaceholder() && 0 === i.selectedIndex,
                    n = O(i, this.options.hideDisabled),
                    o = n.length,
                    r = this.$button[0],
                    l = r.querySelector(".filter-option-inner-inner"),
                    a = document.createTextNode(this.options.multipleSeparator),
                    c = _.fragment.cloneNode(!1),
                    d = !1;
                if (r.classList.toggle("bs-placeholder", t.multiple ? !o : !z(i, n)), t.multiple || 1 !== n.length || (t.selectpicker.view.displayedValue = z(i, n)), "static" === this.options.selectedTextFormat) c = K.text.call(this, {
                    text: this.options.title
                }, !0);
                else if (!1 === (this.multiple && -1 !== this.options.selectedTextFormat.indexOf("count") && 1 < o && (1 < (e = this.options.selectedTextFormat.split(">")).length && o > e[1] || 1 === e.length && 2 <= o))) {
                    if (!s) {
                        for (var h = 0; h < o && h < 50; h++) {
                            var p = n[h],
                                u = this.selectpicker.main.data[p.liIndex],
                                f = {};
                            this.multiple && 0 < h && c.appendChild(a.cloneNode(!1)), p.title ? f.text = p.title : u && (u.content && t.options.showContent ? (f.content = u.content.toString(), d = !0) : (t.options.showIcon && (f.icon = u.icon), t.options.showSubtext && !t.multiple && u.subtext && (f.subtext = " " + u.subtext), f.text = p.textContent.trim())), c.appendChild(K.text.call(this, f, !0))
                        }
                        49 < o && c.appendChild(document.createTextNode("..."))
                    }
                } else {
                    var m = ':not([hidden]):not([data-hidden="true"]):not([data-divider="true"])';
                    this.options.hideDisabled && (m += ":not(:disabled)");
                    var v = this.$element[0].querySelectorAll("select > option" + m + ", optgroup" + m + " option" + m).length,
                        g = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(o, v) : this.options.countSelectedText;
                    c = K.text.call(this, {
                        text: g.replace("{0}", o.toString()).replace("{1}", v.toString())
                    }, !0)
                }
                if (null == this.options.title && (this.options.title = this.$element.attr("title")), c.childNodes.length || (c = K.text.call(this, {
                    text: void 0 !== this.options.title ? this.options.title : this.options.noneSelectedText
                }, !0)), r.title = c.textContent.replace(/<[^>]*>?/g, "").trim(), this.options.sanitize && d && W([c], t.options.whiteList, t.options.sanitizeFn), l.innerHTML = "", l.appendChild(c), M.major < 4 && this.$newElement[0].classList.contains("bs3-has-addon")) {
                    var b = r.querySelector(".filter-expand"),
                        w = l.cloneNode(!0);
                    w.className = "filter-expand", b ? r.replaceChild(w, b) : r.appendChild(w)
                }
                this.$element.trigger("rendered" + j)
            },
            setStyle: function (e, t) {
                var i, s = this.$button[0],
                    n = this.$newElement[0],
                    o = this.options.style.trim();
                this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, "")), M.major < 4 && (n.classList.add("bs3"), n.parentNode.classList && n.parentNode.classList.contains("input-group") && (n.previousElementSibling || n.nextElementSibling) && (n.previousElementSibling || n.nextElementSibling).classList.contains("input-group-addon") && n.classList.add("bs3-has-addon")), i = e ? e.trim() : o, "add" == t ? i && s.classList.add.apply(s.classList, i.split(" ")) : "remove" == t ? i && s.classList.remove.apply(s.classList, i.split(" ")) : (o && s.classList.remove.apply(s.classList, o.split(" ")), i && s.classList.add.apply(s.classList, i.split(" ")))
            },
            liHeight: function (e) {
                if (e || !1 !== this.options.size && !Object.keys(this.sizeInfo).length) {
                    var t, i = _.div.cloneNode(!1),
                        s = _.div.cloneNode(!1),
                        n = _.div.cloneNode(!1),
                        o = document.createElement("ul"),
                        r = _.li.cloneNode(!1),
                        l = _.li.cloneNode(!1),
                        a = _.a.cloneNode(!1),
                        c = _.span.cloneNode(!1),
                        d = this.options.header && 0 < this.$menu.find("." + V.POPOVERHEADER).length ? this.$menu.find("." + V.POPOVERHEADER)[0].cloneNode(!0) : null,
                        h = this.options.liveSearch ? _.div.cloneNode(!1) : null,
                        p = this.options.actionsBox && this.multiple && 0 < this.$menu.find(".bs-actionsbox").length ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0) : null,
                        u = this.options.doneButton && this.multiple && 0 < this.$menu.find(".bs-donebutton").length ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0) : null,
                        f = this.$element.find("option")[0];
                    if (this.sizeInfo.selectWidth = this.$newElement[0].offsetWidth, c.className = "text", a.className = "dropdown-item " + (f ? f.className : ""), i.className = this.$menu[0].parentNode.className + " " + V.SHOW, i.style.width = 0, "auto" === this.options.width && (s.style.minWidth = 0), s.className = V.MENU + " " + V.SHOW, n.className = "inner " + V.SHOW, o.className = V.MENU + " inner " + ("4" === M.major ? V.SHOW : ""), r.className = V.DIVIDER, l.className = "dropdown-header", c.appendChild(document.createTextNode("\u200b")), this.selectpicker.current.data.length)
                        for (var m = 0; m < this.selectpicker.current.data.length; m++) {
                            var v = this.selectpicker.current.data[m];
                            if ("option" === v.type) {
                                t = v.element;
                                break
                            }
                        } else t = _.li.cloneNode(!1), a.appendChild(c), t.appendChild(a);
                    if (l.appendChild(c.cloneNode(!0)), this.selectpicker.view.widestOption && o.appendChild(this.selectpicker.view.widestOption.cloneNode(!0)), o.appendChild(t), o.appendChild(r), o.appendChild(l), d && s.appendChild(d), h) {
                        var g = document.createElement("input");
                        h.className = "bs-searchbox", g.className = "form-control", h.appendChild(g), s.appendChild(h)
                    }
                    p && s.appendChild(p), n.appendChild(o), s.appendChild(n), u && s.appendChild(u), i.appendChild(s), document.body.appendChild(i);
                    var b, w = t.offsetHeight,
                        I = l ? l.offsetHeight : 0,
                        x = d ? d.offsetHeight : 0,
                        k = h ? h.offsetHeight : 0,
                        y = p ? p.offsetHeight : 0,
                        $ = u ? u.offsetHeight : 0,
                        S = P(r).outerHeight(!0),
                        E = !!window.getComputedStyle && window.getComputedStyle(s),
                        C = s.offsetWidth,
                        O = E ? null : P(s),
                        z = {
                            vert: N(E ? E.paddingTop : O.css("paddingTop")) + N(E ? E.paddingBottom : O.css("paddingBottom")) + N(E ? E.borderTopWidth : O.css("borderTopWidth")) + N(E ? E.borderBottomWidth : O.css("borderBottomWidth")),
                            horiz: N(E ? E.paddingLeft : O.css("paddingLeft")) + N(E ? E.paddingRight : O.css("paddingRight")) + N(E ? E.borderLeftWidth : O.css("borderLeftWidth")) + N(E ? E.borderRightWidth : O.css("borderRightWidth"))
                        },
                        T = {
                            vert: z.vert + N(E ? E.marginTop : O.css("marginTop")) + N(E ? E.marginBottom : O.css("marginBottom")) + 2,
                            horiz: z.horiz + N(E ? E.marginLeft : O.css("marginLeft")) + N(E ? E.marginRight : O.css("marginRight")) + 2
                        };
                    n.style.overflowY = "scroll", b = s.offsetWidth - C, document.body.removeChild(i), this.sizeInfo.liHeight = w, this.sizeInfo.dropdownHeaderHeight = I, this.sizeInfo.headerHeight = x, this.sizeInfo.searchHeight = k, this.sizeInfo.actionsHeight = y, this.sizeInfo.doneButtonHeight = $, this.sizeInfo.dividerHeight = S, this.sizeInfo.menuPadding = z, this.sizeInfo.menuExtras = T, this.sizeInfo.menuWidth = C, this.sizeInfo.menuInnerInnerWidth = C - z.horiz, this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth, this.sizeInfo.scrollBarWidth = b, this.sizeInfo.selectHeight = this.$newElement[0].offsetHeight, this.setPositionData()
                }
            },
            getSelectPosition: function () {
                var e, t = P(window),
                    i = this.$newElement.offset(),
                    s = P(this.options.container);
                this.options.container && s.length && !s.is("body") ? ((e = s.offset()).top += parseInt(s.css("borderTopWidth")), e.left += parseInt(s.css("borderLeftWidth"))) : e = {
                    top: 0,
                    left: 0
                };
                var n = this.options.windowPadding;
                this.sizeInfo.selectOffsetTop = i.top - e.top - t.scrollTop(), this.sizeInfo.selectOffsetBot = t.height() - this.sizeInfo.selectOffsetTop - this.sizeInfo.selectHeight - e.top - n[2], this.sizeInfo.selectOffsetLeft = i.left - e.left - t.scrollLeft(), this.sizeInfo.selectOffsetRight = t.width() - this.sizeInfo.selectOffsetLeft - this.sizeInfo.selectWidth - e.left - n[1], this.sizeInfo.selectOffsetTop -= n[0], this.sizeInfo.selectOffsetLeft -= n[3]
            },
            setMenuSize: function (e) {
                this.getSelectPosition();
                var t, i, s, n, o, r, l, a, c = this.sizeInfo.selectWidth,
                    d = this.sizeInfo.liHeight,
                    h = this.sizeInfo.headerHeight,
                    p = this.sizeInfo.searchHeight,
                    u = this.sizeInfo.actionsHeight,
                    f = this.sizeInfo.doneButtonHeight,
                    m = this.sizeInfo.dividerHeight,
                    v = this.sizeInfo.menuPadding,
                    g = 0;
                if (this.options.dropupAuto && (l = d * this.selectpicker.current.elements.length + v.vert, a = this.sizeInfo.selectOffsetTop - this.sizeInfo.selectOffsetBot > this.sizeInfo.menuExtras.vert && l + this.sizeInfo.menuExtras.vert + 50 > this.sizeInfo.selectOffsetBot, !0 === this.selectpicker.isSearching && (a = this.selectpicker.dropup), this.$newElement.toggleClass(V.DROPUP, a), this.selectpicker.dropup = a), "auto" === this.options.size) n = 3 < this.selectpicker.current.elements.length ? 3 * this.sizeInfo.liHeight + this.sizeInfo.menuExtras.vert - 2 : 0, i = this.sizeInfo.selectOffsetBot - this.sizeInfo.menuExtras.vert, s = n + h + p + u + f, r = Math.max(n - v.vert, 0), this.$newElement.hasClass(V.DROPUP) && (i = this.sizeInfo.selectOffsetTop - this.sizeInfo.menuExtras.vert), t = (o = i) - h - p - u - f - v.vert;
                else if (this.options.size && "auto" != this.options.size && this.selectpicker.current.elements.length > this.options.size) {
                    for (var b = 0; b < this.options.size; b++) "divider" === this.selectpicker.current.data[b].type && g++;
                    t = (i = d * this.options.size + g * m + v.vert) - v.vert, o = i + h + p + u + f, s = r = ""
                }
                this.$menu.css({
                    "max-height": o + "px",
                    overflow: "hidden",
                    "min-height": s + "px"
                }), this.$menuInner.css({
                    "max-height": t + "px",
                    "overflow-y": "auto",
                    "min-height": r + "px"
                }), this.sizeInfo.menuInnerHeight = Math.max(t, 1), this.selectpicker.current.data.length && this.selectpicker.current.data[this.selectpicker.current.data.length - 1].position > this.sizeInfo.menuInnerHeight && (this.sizeInfo.hasScrollBar = !0, this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth + this.sizeInfo.scrollBarWidth), "auto" === this.options.dropdownAlignRight && this.$menu.toggleClass(V.MENURIGHT, this.sizeInfo.selectOffsetLeft > this.sizeInfo.selectOffsetRight && this.sizeInfo.selectOffsetRight < this.sizeInfo.totalMenuWidth - c), this.dropdown && this.dropdown._popper && this.dropdown._popper.update()
            },
            setSize: function (e) {
                if (this.liHeight(e), this.options.header && this.$menu.css("padding-top", 0), !1 !== this.options.size) {
                    var t = this,
                        i = P(window);
                    this.setMenuSize(), this.options.liveSearch && this.$searchbox.off("input.setMenuSize propertychange.setMenuSize").on("input.setMenuSize propertychange.setMenuSize", function () {
                        return t.setMenuSize()
                    }), "auto" === this.options.size ? i.off("resize" + j + "." + this.selectId + ".setMenuSize scroll" + j + "." + this.selectId + ".setMenuSize").on("resize" + j + "." + this.selectId + ".setMenuSize scroll" + j + "." + this.selectId + ".setMenuSize", function () {
                        return t.setMenuSize()
                    }) : this.options.size && "auto" != this.options.size && this.selectpicker.current.elements.length > this.options.size && i.off("resize" + j + "." + this.selectId + ".setMenuSize scroll" + j + "." + this.selectId + ".setMenuSize")
                }
                this.createView(!1, !0, e)
            },
            setWidth: function () {
                var i = this;
                "auto" === this.options.width ? requestAnimationFrame(function () {
                    i.$menu.css("min-width", "0"), i.$element.on("loaded" + j, function () {
                        i.liHeight(), i.setMenuSize();
                        var e = i.$newElement.clone().appendTo("body"),
                            t = e.css("width", "auto").children("button").outerWidth();
                        e.remove(), i.sizeInfo.selectWidth = Math.max(i.sizeInfo.totalMenuWidth, t), i.$newElement.css("width", i.sizeInfo.selectWidth + "px")
                    })
                }) : "fit" === this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", "")), this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement[0].classList.remove("fit-width")
            },
            selectPosition: function () {
                this.$bsContainer = P('<div class="bs-container" />');

                function e(e) {
                    var t = {},
                        i = r.options.display || !!P.fn.dropdown.Constructor.Default && P.fn.dropdown.Constructor.Default.display;
                    r.$bsContainer.addClass(e.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass(V.DROPUP, e.hasClass(V.DROPUP)), s = e.offset(), l.is("body") ? n = {
                        top: 0,
                        left: 0
                    } : ((n = l.offset()).top += parseInt(l.css("borderTopWidth")) - l.scrollTop(), n.left += parseInt(l.css("borderLeftWidth")) - l.scrollLeft()), o = e.hasClass(V.DROPUP) ? 0 : e[0].offsetHeight, (M.major < 4 || "static" === i) && (t.top = s.top - n.top + o, t.left = s.left - n.left), t.width = e[0].offsetWidth, r.$bsContainer.css(t)
                }
                var s, n, o, r = this,
                    l = P(this.options.container);
                this.$button.on("click.bs.dropdown.data-api", function () {
                    r.isDisabled() || (e(r.$newElement), r.$bsContainer.appendTo(r.options.container).toggleClass(V.SHOW, !r.$button.hasClass(V.SHOW)).append(r.$menu))
                }), P(window).off("resize" + j + "." + this.selectId + " scroll" + j + "." + this.selectId).on("resize" + j + "." + this.selectId + " scroll" + j + "." + this.selectId, function () {
                    r.$newElement.hasClass(V.SHOW) && e(r.$newElement)
                }), this.$element.on("hide" + j, function () {
                    r.$menu.data("height", r.$menu.height()), r.$bsContainer.detach()
                })
            },
            setOptionStatus: function (e) {
                var t = this;
                if (t.noScroll = !1, t.selectpicker.view.visibleElements && t.selectpicker.view.visibleElements.length)
                    for (var i = 0; i < t.selectpicker.view.visibleElements.length; i++) {
                        var s = t.selectpicker.current.data[i + t.selectpicker.view.position0],
                            n = s.option;
                        n && (!0 !== e && t.setDisabled(s.index, s.disabled), t.setSelected(s.index, n.selected))
                    }
            },
            setSelected: function (e, t) {
                var i, s, n = this.selectpicker.main.elements[e],
                    o = this.selectpicker.main.data[e],
                    r = void 0 !== this.activeIndex,
                    l = this.activeIndex === e || t && !this.multiple && !r;
                o.selected = t, s = n.firstChild, t && (this.selectedIndex = e), n.classList.toggle("selected", t), l ? (this.focusItem(n, o), this.selectpicker.view.currentActive = n, this.activeIndex = e) : this.defocusItem(n), s && (s.classList.toggle("selected", t), t ? s.setAttribute("aria-selected", !0) : this.multiple ? s.setAttribute("aria-selected", !1) : s.removeAttribute("aria-selected")), l || r || !t || void 0 === this.prevActiveIndex || (i = this.selectpicker.main.elements[this.prevActiveIndex], this.defocusItem(i))
            },
            setDisabled: function (e, t) {
                var i, s = this.selectpicker.main.elements[e];
                this.selectpicker.main.data[e].disabled = t, i = s.firstChild, s.classList.toggle(V.DISABLED, t), i && ("4" === M.major && i.classList.toggle(V.DISABLED, t), t ? (i.setAttribute("aria-disabled", t), i.setAttribute("tabindex", -1)) : (i.removeAttribute("aria-disabled"), i.setAttribute("tabindex", 0)))
            },
            isDisabled: function () {
                return this.$element[0].disabled
            },
            checkDisabled: function () {
                this.isDisabled() ? (this.$newElement[0].classList.add(V.DISABLED), this.$button.addClass(V.DISABLED).attr("aria-disabled", !0)) : this.$button[0].classList.contains(V.DISABLED) && (this.$newElement[0].classList.remove(V.DISABLED), this.$button.removeClass(V.DISABLED).attr("aria-disabled", !1))
            },
            clickListener: function () {
                var C = this,
                    t = P(document);

                function e() {
                    C.options.liveSearch ? C.$searchbox.trigger("focus") : C.$menuInner.trigger("focus")
                }

                function i() {
                    C.dropdown && C.dropdown._popper && C.dropdown._popper.state.isCreated ? e() : requestAnimationFrame(i)
                }
                t.data("spaceSelect", !1), this.$button.on("keyup", function (e) {
                    /(32)/.test(e.keyCode.toString(10)) && t.data("spaceSelect") && (e.preventDefault(), t.data("spaceSelect", !1))
                }), this.$newElement.on("show.bs.dropdown", function () {
                    3 < M.major && !C.dropdown && (C.dropdown = C.$button.data("bs.dropdown"), C.dropdown._menu = C.$menu[0])
                }), this.$button.on("click.bs.dropdown.data-api", function () {
                    C.$newElement.hasClass(V.SHOW) || C.setSize()
                }), this.$element.on("shown" + j, function () {
                    C.$menuInner[0].scrollTop !== C.selectpicker.view.scrollTop && (C.$menuInner[0].scrollTop = C.selectpicker.view.scrollTop), 3 < M.major ? requestAnimationFrame(i) : e()
                }), this.$menuInner.on("mouseenter", "li a", function (e) {
                    var t = this.parentElement,
                        i = C.isVirtual() ? C.selectpicker.view.position0 : 0,
                        s = Array.prototype.indexOf.call(t.parentElement.children, t),
                        n = C.selectpicker.current.data[s + i];
                    C.focusItem(t, n, !0)
                }), this.$menuInner.on("click", "li a", function (e, t) {
                    var i = P(this),
                        s = C.$element[0],
                        n = C.isVirtual() ? C.selectpicker.view.position0 : 0,
                        o = C.selectpicker.current.data[i.parent().index() + n],
                        r = o.index,
                        l = z(s),
                        a = s.selectedIndex,
                        c = s.options[a],
                        d = !0;
                    if (C.multiple && 1 !== C.options.maxOptions && e.stopPropagation(), e.preventDefault(), !C.isDisabled() && !i.parent().hasClass(V.DISABLED)) {
                        var h = o.option,
                            p = P(h),
                            u = h.selected,
                            f = p.parent("optgroup"),
                            m = f.find("option"),
                            v = C.options.maxOptions,
                            g = f.data("maxOptions") || !1;
                        if (r === C.activeIndex && (t = !0), t || (C.prevActiveIndex = C.activeIndex, C.activeIndex = void 0), C.multiple) {
                            if (h.selected = !u, C.setSelected(r, !u), C.focusedParent.focus(), !1 !== v || !1 !== g) {
                                var b = v < O(s).length,
                                    w = g < f.find("option:selected").length;
                                if (v && b || g && w)
                                    if (v && 1 == v) s.selectedIndex = -1, h.selected = !0, C.setOptionStatus(!0);
                                    else if (g && 1 == g) {
                                        for (var I = 0; I < m.length; I++) {
                                            var x = m[I];
                                            x.selected = !1, C.setSelected(x.liIndex, !1)
                                        }
                                        h.selected = !0, C.setSelected(r, !0)
                                    } else {
                                        var k = "string" == typeof C.options.maxOptionsText ? [C.options.maxOptionsText, C.options.maxOptionsText] : C.options.maxOptionsText,
                                            y = "function" == typeof k ? k(v, g) : k,
                                            $ = y[0].replace("{n}", v),
                                            S = y[1].replace("{n}", g),
                                            E = P('<div class="notify"></div>');
                                        y[2] && ($ = $.replace("{var}", y[2][1 < v ? 0 : 1]), S = S.replace("{var}", y[2][1 < g ? 0 : 1])), h.selected = !1, C.$menu.append(E), v && b && (E.append(P("<div>" + $ + "</div>")), d = !1, C.$element.trigger("maxReached" + j)), g && w && (E.append(P("<div>" + S + "</div>")), d = !1, C.$element.trigger("maxReachedGrp" + j)), setTimeout(function () {
                                            C.setSelected(r, !1)
                                        }, 10), E[0].classList.add("fadeOut"), setTimeout(function () {
                                            E.remove()
                                        }, 1050)
                                    }
                            }
                        } else c && (c.selected = !1), h.selected = !0, C.setSelected(r, !0);
                        !C.multiple || C.multiple && 1 === C.options.maxOptions ? C.$button.trigger("focus") : C.options.liveSearch && C.$searchbox.trigger("focus"), d && (!C.multiple && a === s.selectedIndex || (T = [h.index, p.prop("selected"), l], C.$element.triggerNative("change")))
                    }
                }), this.$menu.on("click", "li." + V.DISABLED + " a, ." + V.POPOVERHEADER + ", ." + V.POPOVERHEADER + " :not(.close)", function (e) {
                    e.currentTarget == this && (e.preventDefault(), e.stopPropagation(), C.options.liveSearch && !P(e.target).hasClass("close") ? C.$searchbox.trigger("focus") : C.$button.trigger("focus"))
                }), this.$menuInner.on("click", ".divider, .dropdown-header", function (e) {
                    e.preventDefault(), e.stopPropagation(), C.options.liveSearch ? C.$searchbox.trigger("focus") : C.$button.trigger("focus")
                }), this.$menu.on("click", "." + V.POPOVERHEADER + " .close", function () {
                    C.$button.trigger("click")
                }), this.$searchbox.on("click", function (e) {
                    e.stopPropagation()
                }), this.$menu.on("click", ".actions-btn", function (e) {
                    C.options.liveSearch ? C.$searchbox.trigger("focus") : C.$button.trigger("focus"), e.preventDefault(), e.stopPropagation(), P(this).hasClass("bs-select-all") ? C.selectAll() : C.deselectAll()
                }), this.$button.on("focus" + j, function (e) {
                    var t = C.$element[0].getAttribute("tabindex");
                    void 0 !== t && e.originalEvent && e.originalEvent.isTrusted && (this.setAttribute("tabindex", t), C.$element[0].setAttribute("tabindex", -1), C.selectpicker.view.tabindex = t)
                }).on("blur" + j, function (e) {
                    void 0 !== C.selectpicker.view.tabindex && e.originalEvent && e.originalEvent.isTrusted && (C.$element[0].setAttribute("tabindex", C.selectpicker.view.tabindex), this.setAttribute("tabindex", -1), C.selectpicker.view.tabindex = void 0)
                }), this.$element.on("change" + j, function () {
                    C.render(), C.$element.trigger("changed" + j, T), T = null
                }).on("focus" + j, function () {
                    C.options.mobile || C.$button[0].focus()
                })
            },
            liveSearchListener: function () {
                var u = this;
                this.$button.on("click.bs.dropdown.data-api", function () {
                    u.$searchbox.val() && (u.$searchbox.val(""), u.selectpicker.search.previousValue = void 0)
                }), this.$searchbox.on("click.bs.dropdown.data-api focus.bs.dropdown.data-api touchend.bs.dropdown.data-api", function (e) {
                    e.stopPropagation()
                }), this.$searchbox.on("input propertychange", function () {
                    var e = u.$searchbox[0].value;
                    if (u.selectpicker.search.elements = [], u.selectpicker.search.data = [], e) {
                        var t = [],
                            i = e.toUpperCase(),
                            s = {},
                            n = [],
                            o = u._searchStyle(),
                            r = u.options.liveSearchNormalize;
                        r && (i = w(i));
                        for (var l = 0; l < u.selectpicker.main.data.length; l++) {
                            var a = u.selectpicker.main.data[l];
                            s[l] || (s[l] = k(a, i, o, r)), s[l] && void 0 !== a.headerIndex && -1 === n.indexOf(a.headerIndex) && (0 < a.headerIndex && (s[a.headerIndex - 1] = !0, n.push(a.headerIndex - 1)), s[a.headerIndex] = !0, n.push(a.headerIndex), s[a.lastIndex + 1] = !0), s[l] && "optgroup-label" !== a.type && n.push(l)
                        }
                        l = 0;
                        for (var c = n.length; l < c; l++) {
                            var d = n[l],
                                h = n[l - 1],
                                p = (a = u.selectpicker.main.data[d], u.selectpicker.main.data[h]);
                            ("divider" !== a.type || "divider" === a.type && p && "divider" !== p.type && c - 1 !== l) && (u.selectpicker.search.data.push(a), t.push(u.selectpicker.main.elements[d]))
                        }
                        u.activeIndex = void 0, u.noScroll = !0, u.$menuInner.scrollTop(0), u.selectpicker.search.elements = t, u.createView(!0),
                            function (e, t) {
                                e.length || (_.noResults.innerHTML = this.options.noneResultsText.replace("{0}", '"' + S(t) + '"'), this.$menuInner[0].firstChild.appendChild(_.noResults))
                            }.call(u, t, e)
                    } else u.selectpicker.search.previousValue && (u.$menuInner.scrollTop(0), u.createView(!1));
                    u.selectpicker.search.previousValue = e
                })
            },
            _searchStyle: function () {
                return this.options.liveSearchStyle || "contains"
            },
            val: function (e) {
                var t = this.$element[0];
                if (void 0 === e) return this.$element.val();
                var i = z(t);
                if (T = [null, null, i], this.$element.val(e).trigger("changed" + j, T), this.$newElement.hasClass(V.SHOW))
                    if (this.multiple) this.setOptionStatus(!0);
                    else {
                        var s = (t.options[t.selectedIndex] || {}).liIndex;
                        "number" == typeof s && (this.setSelected(this.selectedIndex, !1), this.setSelected(s, !0))
                    }
                return this.render(), T = null, this.$element
            },
            changeAll: function (e) {
                if (this.multiple) {
                    void 0 === e && (e = !0);
                    var t = this.$element[0],
                        i = 0,
                        s = 0,
                        n = z(t);
                    t.classList.add("bs-select-hidden");
                    for (var o = 0, r = this.selectpicker.current.data, l = r.length; o < l; o++) {
                        var a = r[o],
                            c = a.option;
                        c && !a.disabled && "divider" !== a.type && (a.selected && i++, !0 === (c.selected = e) && s++)
                    }
                    t.classList.remove("bs-select-hidden"), i !== s && (this.setOptionStatus(), T = [null, null, n], this.$element.triggerNative("change"))
                }
            },
            selectAll: function () {
                return this.changeAll(!0)
            },
            deselectAll: function () {
                return this.changeAll(!1)
            },
            toggle: function (e) {
                (e = e || window.event) && e.stopPropagation(), this.$button.trigger("click.bs.dropdown.data-api")
            },
            keydown: function (e) {
                var t, i, s, n, o, r = P(this),
                    l = r.hasClass("dropdown-toggle"),
                    a = (l ? r.closest(".dropdown") : r.closest(F.MENU)).data("this"),
                    c = a.findLis(),
                    d = !1,
                    h = e.which === H && !l && !a.options.selectOnTab,
                    p = G.test(e.which) || h,
                    u = a.$menuInner[0].scrollTop,
                    f = !0 === a.isVirtual() ? a.selectpicker.view.position0 : 0;
                if (!(112 <= e.which && e.which <= 123))
                    if (!(i = a.$newElement.hasClass(V.SHOW)) && (p || 48 <= e.which && e.which <= 57 || 96 <= e.which && e.which <= 105 || 65 <= e.which && e.which <= 90) && (a.$button.trigger("click.bs.dropdown.data-api"), a.options.liveSearch)) a.$searchbox.trigger("focus");
                    else {
                        if (e.which === A && i && (e.preventDefault(), a.$button.trigger("click.bs.dropdown.data-api").trigger("focus")), p) {
                            if (!c.length) return; - 1 !== (t = (s = a.selectpicker.main.elements[a.activeIndex]) ? Array.prototype.indexOf.call(s.parentElement.children, s) : -1) && a.defocusItem(s), e.which === B ? (-1 !== t && t--, t + f < 0 && (t += c.length), a.selectpicker.view.canHighlight[t + f] || -1 === (t = a.selectpicker.view.canHighlight.slice(0, t + f).lastIndexOf(!0) - f) && (t = c.length - 1)) : e.which !== R && !h || (++t + f >= a.selectpicker.view.canHighlight.length && (t = a.selectpicker.view.firstHighlightIndex), a.selectpicker.view.canHighlight[t + f] || (t = t + 1 + a.selectpicker.view.canHighlight.slice(t + f + 1).indexOf(!0))), e.preventDefault();
                            var m = f + t;
                            e.which === B ? 0 === f && t === c.length - 1 ? (a.$menuInner[0].scrollTop = a.$menuInner[0].scrollHeight, m = a.selectpicker.current.elements.length - 1) : d = (o = (n = a.selectpicker.current.data[m]).position - n.height) < u : e.which !== R && !h || (t === a.selectpicker.view.firstHighlightIndex ? (a.$menuInner[0].scrollTop = 0, m = a.selectpicker.view.firstHighlightIndex) : d = u < (o = (n = a.selectpicker.current.data[m]).position - a.sizeInfo.menuInnerHeight)), s = a.selectpicker.current.elements[m], a.activeIndex = a.selectpicker.current.data[m].index, a.focusItem(s), a.selectpicker.view.currentActive = s, d && (a.$menuInner[0].scrollTop = o), a.options.liveSearch ? a.$searchbox.trigger("focus") : r.trigger("focus")
                        } else if (!r.is("input") && !q.test(e.which) || e.which === D && a.selectpicker.keydown.keyHistory) {
                            var v, g, b = [];
                            e.preventDefault(), a.selectpicker.keydown.keyHistory += C[e.which], a.selectpicker.keydown.resetKeyHistory.cancel && clearTimeout(a.selectpicker.keydown.resetKeyHistory.cancel), a.selectpicker.keydown.resetKeyHistory.cancel = a.selectpicker.keydown.resetKeyHistory.start(), g = a.selectpicker.keydown.keyHistory, /^(.)\1+$/.test(g) && (g = g.charAt(0));
                            for (var w = 0; w < a.selectpicker.current.data.length; w++) {
                                var I = a.selectpicker.current.data[w];
                                k(I, g, "startsWith", !0) && a.selectpicker.view.canHighlight[w] && b.push(I.index)
                            }
                            if (b.length) {
                                var x = 0;
                                c.removeClass("active").find("a").removeClass("active"), 1 === g.length && (-1 === (x = b.indexOf(a.activeIndex)) || x === b.length - 1 ? x = 0 : x++), v = b[x], d = 0 < u - (n = a.selectpicker.main.data[v]).position ? (o = n.position - n.height, !0) : (o = n.position - a.sizeInfo.menuInnerHeight, n.position > u + a.sizeInfo.menuInnerHeight), s = a.selectpicker.main.elements[v], a.activeIndex = b[x], a.focusItem(s), s && s.firstChild.focus(), d && (a.$menuInner[0].scrollTop = o), r.trigger("focus")
                            }
                        }
                        i && (e.which === D && !a.selectpicker.keydown.keyHistory || e.which === L || e.which === H && a.options.selectOnTab) && (e.which !== D && e.preventDefault(), a.options.liveSearch && e.which === D || (a.$menuInner.find(".active a").trigger("click", !0), r.trigger("focus"), a.options.liveSearch || (e.preventDefault(), P(document).data("spaceSelect", !0))))
                    }
            },
            mobile: function () {
                this.options.mobile = !0, this.$element[0].classList.add("mobile-device")
            },
            refresh: function () {
                var e = P.extend({}, this.options, this.$element.data());
                this.options = e, this.checkDisabled(), this.buildData(), this.setStyle(), this.render(), this.buildList(), this.setWidth(), this.setSize(!0), this.$element.trigger("refreshed" + j)
            },
            hide: function () {
                this.$newElement.hide()
            },
            show: function () {
                this.$newElement.show()
            },
            remove: function () {
                this.$newElement.remove(), this.$element.remove()
            },
            destroy: function () {
                this.$newElement.before(this.$element).remove(), this.$bsContainer ? this.$bsContainer.remove() : this.$menu.remove(), this.selectpicker.view.titleOption && this.selectpicker.view.titleOption.parentNode && this.selectpicker.view.titleOption.parentNode.removeChild(this.selectpicker.view.titleOption), this.$element.off(j).removeData("selectpicker").removeClass("bs-select-hidden selectpicker"), P(window).off(j + "." + this.selectId)
            }
        };
        var J = P.fn.selectpicker;

        function Q() {
            if (P.fn.dropdown) return (P.fn.dropdown.Constructor._dataApiKeydownHandler || P.fn.dropdown.Constructor.prototype.keydown).apply(this, arguments)
        }
        P.fn.selectpicker = Z, P.fn.selectpicker.Constructor = Y, P.fn.selectpicker.noConflict = function () {
            return P.fn.selectpicker = J, this
        }, P(document).off("keydown.bs.dropdown.data-api").on("keydown.bs.dropdown.data-api", ':not(.bootstrap-select) > [data-toggle="dropdown"]', Q).on("keydown.bs.dropdown.data-api", ":not(.bootstrap-select) > .dropdown-menu", Q).on("keydown" + j, '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input', Y.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input', function (e) {
            e.stopPropagation()
        }), P(window).on("load" + j + ".data-api", function () {
            P(".selectpicker").each(function () {
                var e = P(this);
                Z.call(e, e.data())
            })
        })
    }(e)
});
//# sourceMappingURL=bootstrap-select.min.js.map