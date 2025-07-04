﻿/*!
 * cleave.js - 1.6.0
 * https://github.com/nosir/cleave.js
 * Apache License Version 2.0
 *
 * Copyright (C) 2012-2020 Max Huang https://github.com/nosir/
 */
! function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Cleave = t() : e.Cleave = t()
}(this, function () {
    return function (e) {
        function t(i) {
            if (r[i]) return r[i].exports;
            var n = r[i] = {
                exports: {},
                id: i,
                loaded: !1
            };
            return e[i].call(n.exports, n, n.exports, t), n.loaded = !0, n.exports
        }
        var r = {};
        return t.m = e, t.c = r, t.p = "", t(0)
    }([function (e, t, r) {
        (function (t) {
            "use strict";
            var i = function (e, t) {
                var r = this,
                    n = !1;
                if ("string" == typeof e ? (r.element = document.querySelector(e), n = document.querySelectorAll(e).length > 1) : "undefined" != typeof e.length && e.length > 0 ? (r.element = e[0], n = e.length > 1) : r.element = e, !r.element) throw new Error("[cleave.js] Please check the element");
                if (n) try {
                    console.warn("[cleave.js] Multiple input fields matched, cleave.js will only take the first one.")
                } catch (a) { }
                t.initValue = r.element.value, r.properties = i.DefaultProperties.assign({}, t), r.init()
            };
            i.prototype = {
                init: function () {
                    var e = this,
                        t = e.properties;
                    return t.numeral || t.phone || t.creditCard || t.time || t.date || 0 !== t.blocksLength || t.prefix ? (t.maxLength = i.Util.getMaxLength(t.blocks), e.isAndroid = i.Util.isAndroid(), e.lastInputValue = "", e.isBackward = "", e.onChangeListener = e.onChange.bind(e), e.onKeyDownListener = e.onKeyDown.bind(e), e.onFocusListener = e.onFocus.bind(e), e.onCutListener = e.onCut.bind(e), e.onCopyListener = e.onCopy.bind(e), e.initSwapHiddenInput(), e.element.addEventListener("input", e.onChangeListener), e.element.addEventListener("keydown", e.onKeyDownListener), e.element.addEventListener("focus", e.onFocusListener), e.element.addEventListener("cut", e.onCutListener), e.element.addEventListener("copy", e.onCopyListener), e.initPhoneFormatter(), e.initDateFormatter(), e.initTimeFormatter(), e.initNumeralFormatter(), void ((t.initValue || t.prefix && !t.noImmediatePrefix) && e.onInput(t.initValue))) : void e.onInput(t.initValue)
                },
                initSwapHiddenInput: function () {
                    var e = this,
                        t = e.properties;
                    if (t.swapHiddenInput) {
                        var r = e.element.cloneNode(!0);
                        e.element.parentNode.insertBefore(r, e.element), e.elementSwapHidden = e.element, e.elementSwapHidden.type = "hidden", e.element = r, e.element.id = ""
                    }
                },
                initNumeralFormatter: function () {
                    var e = this,
                        t = e.properties;
                    t.numeral && (t.numeralFormatter = new i.NumeralFormatter(t.numeralDecimalMark, t.numeralIntegerScale, t.numeralDecimalScale, t.numeralThousandsGroupStyle, t.numeralPositiveOnly, t.stripLeadingZeroes, t.prefix, t.signBeforePrefix, t.tailPrefix, t.delimiter))
                },
                initTimeFormatter: function () {
                    var e = this,
                        t = e.properties;
                    t.time && (t.timeFormatter = new i.TimeFormatter(t.timePattern, t.timeFormat), t.blocks = t.timeFormatter.getBlocks(), t.blocksLength = t.blocks.length, t.maxLength = i.Util.getMaxLength(t.blocks))
                },
                initDateFormatter: function () {
                    var e = this,
                        t = e.properties;
                    t.date && (t.dateFormatter = new i.DateFormatter(t.datePattern, t.dateMin, t.dateMax), t.blocks = t.dateFormatter.getBlocks(), t.blocksLength = t.blocks.length, t.maxLength = i.Util.getMaxLength(t.blocks))
                },
                initPhoneFormatter: function () {
                    var e = this,
                        t = e.properties;
                    if (t.phone) try {
                        t.phoneFormatter = new i.PhoneFormatter(new t.root.Cleave.AsYouTypeFormatter(t.phoneRegionCode), t.delimiter)
                    } catch (r) {
                        throw new Error("[cleave.js] Please include phone-type-formatter.{country}.js lib")
                    }
                },
                onKeyDown: function (e) {
                    var t = this,
                        r = e.which || e.keyCode;
                    t.lastInputValue = t.element.value, t.isBackward = 8 === r
                },
                onChange: function (e) {
                    var t = this,
                        r = t.properties,
                        n = i.Util;
                    t.isBackward = t.isBackward || "deleteContentBackward" === e.inputType;
                    var a = n.getPostDelimiter(t.lastInputValue, r.delimiter, r.delimiters);
                    t.isBackward && a ? r.postDelimiterBackspace = a : r.postDelimiterBackspace = !1, this.onInput(this.element.value)
                },
                onFocus: function () {
                    var e = this,
                        t = e.properties;
                    e.lastInputValue = e.element.value, t.prefix && t.noImmediatePrefix && !e.element.value && this.onInput(t.prefix), i.Util.fixPrefixCursor(e.element, t.prefix, t.delimiter, t.delimiters)
                },
                onCut: function (e) {
                    i.Util.checkFullSelection(this.element.value) && (this.copyClipboardData(e), this.onInput(""))
                },
                onCopy: function (e) {
                    i.Util.checkFullSelection(this.element.value) && this.copyClipboardData(e)
                },
                copyClipboardData: function (e) {
                    var t = this,
                        r = t.properties,
                        n = i.Util,
                        a = t.element.value,
                        o = "";
                    o = r.copyDelimiter ? a : n.stripDelimiters(a, r.delimiter, r.delimiters);
                    try {
                        e.clipboardData ? e.clipboardData.setData("Text", o) : window.clipboardData.setData("Text", o), e.preventDefault()
                    } catch (l) { }
                },
                onInput: function (e) {
                    var t = this,
                        r = t.properties,
                        n = i.Util,
                        a = n.getPostDelimiter(e, r.delimiter, r.delimiters);
                    return r.numeral || !r.postDelimiterBackspace || a || (e = n.headStr(e, e.length - r.postDelimiterBackspace.length)), r.phone ? (!r.prefix || r.noImmediatePrefix && !e.length ? r.result = r.phoneFormatter.format(e) : r.result = r.prefix + r.phoneFormatter.format(e).slice(r.prefix.length), void t.updateValueState()) : r.numeral ? (r.prefix && r.noImmediatePrefix && 0 === e.length ? r.result = "" : r.result = r.numeralFormatter.format(e), void t.updateValueState()) : (r.date && (e = r.dateFormatter.getValidatedDate(e)), r.time && (e = r.timeFormatter.getValidatedTime(e)), e = n.stripDelimiters(e, r.delimiter, r.delimiters), e = n.getPrefixStrippedValue(e, r.prefix, r.prefixLength, r.result, r.delimiter, r.delimiters, r.noImmediatePrefix, r.tailPrefix, r.signBeforePrefix), e = r.numericOnly ? n.strip(e, /[^\d]/g) : e, e = r.uppercase ? e.toUpperCase() : e, e = r.lowercase ? e.toLowerCase() : e, r.prefix && (r.tailPrefix ? e += r.prefix : e = r.prefix + e, 0 === r.blocksLength) ? (r.result = e, void t.updateValueState()) : (r.creditCard && t.updateCreditCardPropsByValue(e), e = n.headStr(e, r.maxLength), r.result = n.getFormattedValue(e, r.blocks, r.blocksLength, r.delimiter, r.delimiters, r.delimiterLazyShow), void t.updateValueState()))
                },
                updateCreditCardPropsByValue: function (e) {
                    var t, r = this,
                        n = r.properties,
                        a = i.Util;
                    a.headStr(n.result, 4) !== a.headStr(e, 4) && (t = i.CreditCardDetector.getInfo(e, n.creditCardStrictMode), n.blocks = t.blocks, n.blocksLength = n.blocks.length, n.maxLength = a.getMaxLength(n.blocks), n.creditCardType !== t.type && (n.creditCardType = t.type, n.onCreditCardTypeChanged.call(r, n.creditCardType)))
                },
                updateValueState: function () {
                    var e = this,
                        t = i.Util,
                        r = e.properties;
                    if (e.element) {
                        var n = e.element.selectionEnd,
                            a = e.element.value,
                            o = r.result;
                        if (n = t.getNextCursorPosition(n, a, o, r.delimiter, r.delimiters), e.isAndroid) return void window.setTimeout(function () {
                            e.element.value = o, t.setSelection(e.element, n, r.document, !1), e.callOnValueChanged()
                        }, 1);
                        e.element.value = o, r.swapHiddenInput && (e.elementSwapHidden.value = e.getRawValue()), t.setSelection(e.element, n, r.document, !1), e.callOnValueChanged()
                    }
                },
                callOnValueChanged: function () {
                    var e = this,
                        t = e.properties;
                    t.onValueChanged.call(e, {
                        target: {
                            name: e.element.name,
                            value: t.result,
                            rawValue: e.getRawValue()
                        }
                    })
                },
                setPhoneRegionCode: function (e) {
                    var t = this,
                        r = t.properties;
                    r.phoneRegionCode = e, t.initPhoneFormatter(), t.onChange()
                },
                setRawValue: function (e) {
                    var t = this,
                        r = t.properties;
                    e = void 0 !== e && null !== e ? e.toString() : "", r.numeral && (e = e.replace(".", r.numeralDecimalMark)), r.postDelimiterBackspace = !1, t.element.value = e, t.onInput(e)
                },
                getRawValue: function () {
                    var e = this,
                        t = e.properties,
                        r = i.Util,
                        n = e.element.value;
                    return t.rawValueTrimPrefix && (n = r.getPrefixStrippedValue(n, t.prefix, t.prefixLength, t.result, t.delimiter, t.delimiters, t.noImmediatePrefix, t.tailPrefix, t.signBeforePrefix)), n = t.numeral ? t.numeralFormatter.getRawValue(n) : r.stripDelimiters(n, t.delimiter, t.delimiters)
                },
                getISOFormatDate: function () {
                    var e = this,
                        t = e.properties;
                    return t.date ? t.dateFormatter.getISOFormatDate() : ""
                },
                getISOFormatTime: function () {
                    var e = this,
                        t = e.properties;
                    return t.time ? t.timeFormatter.getISOFormatTime() : ""
                },
                getFormattedValue: function () {
                    return this.element.value
                },
                destroy: function () {
                    var e = this;
                    e.element.removeEventListener("input", e.onChangeListener), e.element.removeEventListener("keydown", e.onKeyDownListener), e.element.removeEventListener("focus", e.onFocusListener), e.element.removeEventListener("cut", e.onCutListener), e.element.removeEventListener("copy", e.onCopyListener)
                },
                toString: function () {
                    return "[Cleave Object]"
                }
            }, i.NumeralFormatter = r(1), i.DateFormatter = r(2), i.TimeFormatter = r(3), i.PhoneFormatter = r(4), i.CreditCardDetector = r(5), i.Util = r(6), i.DefaultProperties = r(7), ("object" == typeof t && t ? t : window).Cleave = i, e.exports = i
        }).call(t, function () {
            return this
        }())
    }, function (e, t) {
        "use strict";
        var r = function (e, t, i, n, a, o, l, s, c, u) {
            var d = this;
            d.numeralDecimalMark = e || ".", d.numeralIntegerScale = t > 0 ? t : 0, d.numeralDecimalScale = i >= 0 ? i : 2, d.numeralThousandsGroupStyle = n || r.groupStyle.thousand, d.numeralPositiveOnly = !!a, d.stripLeadingZeroes = o !== !1, d.prefix = l || "" === l ? l : "", d.signBeforePrefix = !!s, d.tailPrefix = !!c, d.delimiter = u || "" === u ? u : ",", d.delimiterRE = u ? new RegExp("\\" + u, "g") : ""
        };
        r.groupStyle = {
            thousand: "thousand",
            lakh: "lakh",
            wan: "wan",
            none: "none"
        }, r.prototype = {
            getRawValue: function (e) {
                return e.replace(this.delimiterRE, "").replace(this.numeralDecimalMark, ".")
            },
            format: function (e) {
                var t, i, n, a, o = this,
                    l = "";
                switch (e = e.replace(/[A-Za-z]/g, "").replace(o.numeralDecimalMark, "M").replace(/[^\dM-]/g, "").replace(/^\-/, "N").replace(/\-/g, "").replace("N", o.numeralPositiveOnly ? "" : "-").replace("M", o.numeralDecimalMark), o.stripLeadingZeroes && (e = e.replace(/^(-)?0+(?=\d)/, "$1")), i = "-" === e.slice(0, 1) ? "-" : "", n = "undefined" != typeof o.prefix ? o.signBeforePrefix ? i + o.prefix : o.prefix + i : i, a = e, e.indexOf(o.numeralDecimalMark) >= 0 && (t = e.split(o.numeralDecimalMark), a = t[0], l = o.numeralDecimalMark + t[1].slice(0, o.numeralDecimalScale)), "-" === i && (a = a.slice(1)), o.numeralIntegerScale > 0 && (a = a.slice(0, o.numeralIntegerScale)), o.numeralThousandsGroupStyle) {
                    case r.groupStyle.lakh:
                        a = a.replace(/(\d)(?=(\d\d)+\d$)/g, "$1" + o.delimiter);
                        break;
                    case r.groupStyle.wan:
                        a = a.replace(/(\d)(?=(\d{4})+$)/g, "$1" + o.delimiter);
                        break;
                    case r.groupStyle.thousand:
                        a = a.replace(/(\d)(?=(\d{3})+$)/g, "$1" + o.delimiter)
                }
                return o.tailPrefix ? i + a.toString() + (o.numeralDecimalScale > 0 ? l.toString() : "") + o.prefix : n + a.toString() + (o.numeralDecimalScale > 0 ? l.toString() : "")
            }
        }, e.exports = r
    }, function (e, t) {
        "use strict";
        var r = function (e, t, r) {
            var i = this;
            i.date = [], i.blocks = [], i.datePattern = e, i.dateMin = t.split("-").reverse().map(function (e) {
                return parseInt(e, 10)
            }), 2 === i.dateMin.length && i.dateMin.unshift(0), i.dateMax = r.split("-").reverse().map(function (e) {
                return parseInt(e, 10)
            }), 2 === i.dateMax.length && i.dateMax.unshift(0), i.initBlocks()
        };
        r.prototype = {
            initBlocks: function () {
                var e = this;
                e.datePattern.forEach(function (t) {
                    "Y" === t ? e.blocks.push(4) : e.blocks.push(2)
                })
            },
            getISOFormatDate: function () {
                var e = this,
                    t = e.date;
                return t[2] ? t[2] + "-" + e.addLeadingZero(t[1]) + "-" + e.addLeadingZero(t[0]) : ""
            },
            getBlocks: function () {
                return this.blocks
            },
            getValidatedDate: function (e) {
                var t = this,
                    r = "";
                return e = e.replace(/[^\d]/g, ""), t.blocks.forEach(function (i, n) {
                    if (e.length > 0) {
                        var a = e.slice(0, i),
                            o = a.slice(0, 1),
                            l = e.slice(i);
                        switch (t.datePattern[n]) {
                            case "d":
                                "00" === a ? a = "01" : parseInt(o, 10) > 3 ? a = "0" + o : parseInt(a, 10) > 31 && (a = "31");
                                break;
                            case "m":
                                "00" === a ? a = "01" : parseInt(o, 10) > 1 ? a = "0" + o : parseInt(a, 10) > 12 && (a = "12")
                        }
                        r += a, e = l
                    }
                }), this.getFixedDateString(r)
            },
            getFixedDateString: function (e) {
                var t, r, i, n = this,
                    a = n.datePattern,
                    o = [],
                    l = 0,
                    s = 0,
                    c = 0,
                    u = 0,
                    d = 0,
                    m = 0,
                    p = !1;
                4 === e.length && "y" !== a[0].toLowerCase() && "y" !== a[1].toLowerCase() && (u = "d" === a[0] ? 0 : 2, d = 2 - u, t = parseInt(e.slice(u, u + 2), 10), r = parseInt(e.slice(d, d + 2), 10), o = this.getFixedDate(t, r, 0)), 8 === e.length && (a.forEach(function (e, t) {
                    switch (e) {
                        case "d":
                            l = t;
                            break;
                        case "m":
                            s = t;
                            break;
                        default:
                            c = t
                    }
                }), m = 2 * c, u = l <= c ? 2 * l : 2 * l + 2, d = s <= c ? 2 * s : 2 * s + 2, t = parseInt(e.slice(u, u + 2), 10), r = parseInt(e.slice(d, d + 2), 10), i = parseInt(e.slice(m, m + 4), 10), p = 4 === e.slice(m, m + 4).length, o = this.getFixedDate(t, r, i)), 4 !== e.length || "y" !== a[0] && "y" !== a[1] || (d = "m" === a[0] ? 0 : 2, m = 2 - d, r = parseInt(e.slice(d, d + 2), 10), i = parseInt(e.slice(m, m + 2), 10), p = 2 === e.slice(m, m + 2).length, o = [0, r, i]), 6 !== e.length || "Y" !== a[0] && "Y" !== a[1] || (d = "m" === a[0] ? 0 : 4, m = 2 - .5 * d, r = parseInt(e.slice(d, d + 2), 10), i = parseInt(e.slice(m, m + 4), 10), p = 4 === e.slice(m, m + 4).length, o = [0, r, i]), o = n.getRangeFixedDate(o), n.date = o;
                var h = 0 === o.length ? e : a.reduce(function (e, t) {
                    switch (t) {
                        case "d":
                            return e + (0 === o[0] ? "" : n.addLeadingZero(o[0]));
                        case "m":
                            return e + (0 === o[1] ? "" : n.addLeadingZero(o[1]));
                        case "y":
                            return e + (p ? n.addLeadingZeroForYear(o[2], !1) : "");
                        case "Y":
                            return e + (p ? n.addLeadingZeroForYear(o[2], !0) : "")
                    }
                }, "");
                return h
            },
            getRangeFixedDate: function (e) {
                var t = this,
                    r = t.datePattern,
                    i = t.dateMin || [],
                    n = t.dateMax || [];
                return !e.length || i.length < 3 && n.length < 3 ? e : r.find(function (e) {
                    return "y" === e.toLowerCase()
                }) && 0 === e[2] ? e : n.length && (n[2] < e[2] || n[2] === e[2] && (n[1] < e[1] || n[1] === e[1] && n[0] < e[0])) ? n : i.length && (i[2] > e[2] || i[2] === e[2] && (i[1] > e[1] || i[1] === e[1] && i[0] > e[0])) ? i : e
            },
            getFixedDate: function (e, t, r) {
                return e = Math.min(e, 31), t = Math.min(t, 12), r = parseInt(r || 0, 10), (t < 7 && t % 2 === 0 || t > 8 && t % 2 === 1) && (e = Math.min(e, 2 === t ? this.isLeapYear(r) ? 29 : 28 : 30)), [e, t, r]
            },
            isLeapYear: function (e) {
                return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
            },
            addLeadingZero: function (e) {
                return (e < 10 ? "0" : "") + e
            },
            addLeadingZeroForYear: function (e, t) {
                return t ? (e < 10 ? "000" : e < 100 ? "00" : e < 1e3 ? "0" : "") + e : (e < 10 ? "0" : "") + e
            }
        }, e.exports = r
    }, function (e, t) {
        "use strict";
        var r = function (e, t) {
            var r = this;
            r.time = [], r.blocks = [], r.timePattern = e, r.timeFormat = t, r.initBlocks()
        };
        r.prototype = {
            initBlocks: function () {
                var e = this;
                e.timePattern.forEach(function () {
                    e.blocks.push(2)
                })
            },
            getISOFormatTime: function () {
                var e = this,
                    t = e.time;
                return t[2] ? e.addLeadingZero(t[0]) + ":" + e.addLeadingZero(t[1]) + ":" + e.addLeadingZero(t[2]) : ""
            },
            getBlocks: function () {
                return this.blocks
            },
            getTimeFormatOptions: function () {
                var e = this;
                return "12" === String(e.timeFormat) ? {
                    maxHourFirstDigit: 1,
                    maxHours: 12,
                    maxMinutesFirstDigit: 5,
                    maxMinutes: 60
                } : {
                    maxHourFirstDigit: 2,
                    maxHours: 23,
                    maxMinutesFirstDigit: 5,
                    maxMinutes: 60
                }
            },
            getValidatedTime: function (e) {
                var t = this,
                    r = "";
                e = e.replace(/[^\d]/g, "");
                var i = t.getTimeFormatOptions();
                return t.blocks.forEach(function (n, a) {
                    if (e.length > 0) {
                        var o = e.slice(0, n),
                            l = o.slice(0, 1),
                            s = e.slice(n);
                        switch (t.timePattern[a]) {
                            case "h":
                                parseInt(l, 10) > i.maxHourFirstDigit ? o = "0" + l : parseInt(o, 10) > i.maxHours && (o = i.maxHours + "");
                                break;
                            case "m":
                            case "s":
                                parseInt(l, 10) > i.maxMinutesFirstDigit ? o = "0" + l : parseInt(o, 10) > i.maxMinutes && (o = i.maxMinutes + "")
                        }
                        r += o, e = s
                    }
                }), this.getFixedTimeString(r)
            },
            getFixedTimeString: function (e) {
                var t, r, i, n = this,
                    a = n.timePattern,
                    o = [],
                    l = 0,
                    s = 0,
                    c = 0,
                    u = 0,
                    d = 0,
                    m = 0;
                return 6 === e.length && (a.forEach(function (e, t) {
                    switch (e) {
                        case "s":
                            l = 2 * t;
                            break;
                        case "m":
                            s = 2 * t;
                            break;
                        case "h":
                            c = 2 * t
                    }
                }), m = c, d = s, u = l, t = parseInt(e.slice(u, u + 2), 10), r = parseInt(e.slice(d, d + 2), 10), i = parseInt(e.slice(m, m + 2), 10), o = this.getFixedTime(i, r, t)), 4 === e.length && n.timePattern.indexOf("s") < 0 && (a.forEach(function (e, t) {
                    switch (e) {
                        case "m":
                            s = 2 * t;
                            break;
                        case "h":
                            c = 2 * t
                    }
                }), m = c, d = s, t = 0, r = parseInt(e.slice(d, d + 2), 10), i = parseInt(e.slice(m, m + 2), 10), o = this.getFixedTime(i, r, t)), n.time = o, 0 === o.length ? e : a.reduce(function (e, t) {
                    switch (t) {
                        case "s":
                            return e + n.addLeadingZero(o[2]);
                        case "m":
                            return e + n.addLeadingZero(o[1]);
                        case "h":
                            return e + n.addLeadingZero(o[0])
                    }
                }, "")
            },
            getFixedTime: function (e, t, r) {
                return r = Math.min(parseInt(r || 0, 10), 60), t = Math.min(t, 60), e = Math.min(e, 60), [e, t, r]
            },
            addLeadingZero: function (e) {
                return (e < 10 ? "0" : "") + e
            }
        }, e.exports = r
    }, function (e, t) {
        "use strict";
        var r = function (e, t) {
            var r = this;
            r.delimiter = t || "" === t ? t : " ", r.delimiterRE = t ? new RegExp("\\" + t, "g") : "", r.formatter = e
        };
        r.prototype = {
            setFormatter: function (e) {
                this.formatter = e
            },
            format: function (e) {
                var t = this;
                t.formatter.clear(), e = e.replace(/[^\d+]/g, ""), e = e.replace(/^\+/, "B").replace(/\+/g, "").replace("B", "+"), e = e.replace(t.delimiterRE, "");
                for (var r, i = "", n = !1, a = 0, o = e.length; a < o; a++) r = t.formatter.inputDigit(e.charAt(a)), /[\s()-]/g.test(r) ? (i = r, n = !0) : n || (i = r);
                return i = i.replace(/[()]/g, ""), i = i.replace(/[\s-]/g, t.delimiter)
            }
        }, e.exports = r
    }, function (e, t) {
        "use strict";
        var r = {
            blocks: {
                uatp: [4, 5, 6],
                amex: [4, 6, 5],
                diners: [4, 6, 4],
                discover: [4, 4, 4, 4],
                mastercard: [4, 4, 4, 4],
                dankort: [4, 4, 4, 4],
                instapayment: [4, 4, 4, 4],
                jcb15: [4, 6, 5],
                jcb: [4, 4, 4, 4],
                maestro: [4, 4, 4, 4],
                visa: [4, 4, 4, 4],
                mir: [4, 4, 4, 4],
                unionPay: [4, 4, 4, 4],
                general: [4, 4, 4, 4]
            },
            re: {
                uatp: /^(?!1800)1\d{0,14}/,
                amex: /^3[47]\d{0,13}/,
                discover: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
                diners: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
                mastercard: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
                dankort: /^(5019|4175|4571)\d{0,12}/,
                instapayment: /^63[7-9]\d{0,13}/,
                jcb15: /^(?:2131|1800)\d{0,11}/,
                jcb: /^(?:35\d{0,2})\d{0,12}/,
                maestro: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
                mir: /^220[0-4]\d{0,12}/,
                visa: /^4\d{0,15}/,
                unionPay: /^(62|81)\d{0,14}/
            },
            getStrictBlocks: function (e) {
                var t = e.reduce(function (e, t) {
                    return e + t
                }, 0);
                return e.concat(19 - t)
            },
            getInfo: function (e, t) {
                var i = r.blocks,
                    n = r.re;
                t = !!t;
                for (var a in n)
                    if (n[a].test(e)) {
                        var o = i[a];
                        return {
                            type: a,
                            blocks: t ? this.getStrictBlocks(o) : o
                        }
                    }
                return {
                    type: "unknown",
                    blocks: t ? this.getStrictBlocks(i.general) : i.general
                }
            }
        };
        e.exports = r
    }, function (e, t) {
        "use strict";
        var r = {
            noop: function () { },
            strip: function (e, t) {
                return e.replace(t, "")
            },
            getPostDelimiter: function (e, t, r) {
                if (0 === r.length) return e.slice(-t.length) === t ? t : "";
                var i = "";
                return r.forEach(function (t) {
                    e.slice(-t.length) === t && (i = t)
                }), i
            },
            getDelimiterREByDelimiter: function (e) {
                return new RegExp(e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "g")
            },
            getNextCursorPosition: function (e, t, r, i, n) {
                return t.length === e ? r.length : e + this.getPositionOffset(e, t, r, i, n)
            },
            getPositionOffset: function (e, t, r, i, n) {
                var a, o, l;
                return a = this.stripDelimiters(t.slice(0, e), i, n), o = this.stripDelimiters(r.slice(0, e), i, n), l = a.length - o.length, 0 !== l ? l / Math.abs(l) : 0
            },
            stripDelimiters: function (e, t, r) {
                var i = this;
                if (0 === r.length) {
                    var n = t ? i.getDelimiterREByDelimiter(t) : "";
                    return e.replace(n, "")
                }
                return r.forEach(function (t) {
                    t.split("").forEach(function (t) {
                        e = e.replace(i.getDelimiterREByDelimiter(t), "")
                    })
                }), e
            },
            headStr: function (e, t) {
                return e.slice(0, t)
            },
            getMaxLength: function (e) {
                return e.reduce(function (e, t) {
                    return e + t
                }, 0)
            },
            getPrefixStrippedValue: function (e, t, r, i, n, a, o, l, s) {
                if (0 === r) return e;
                if (e === t && "" !== e) return "";
                if (s && "-" == e.slice(0, 1)) {
                    var c = "-" == i.slice(0, 1) ? i.slice(1) : i;
                    return "-" + this.getPrefixStrippedValue(e.slice(1), t, r, c, n, a, o, l, s)
                }
                if (i.slice(0, r) !== t && !l) return o && !i && e ? e : "";
                if (i.slice(-r) !== t && l) return o && !i && e ? e : "";
                var u = this.stripDelimiters(i, n, a);
                return e.slice(0, r) === t || l ? e.slice(-r) !== t && l ? u.slice(0, -r - 1) : l ? e.slice(0, -r) : e.slice(r) : u.slice(r)
            },
            getFirstDiffIndex: function (e, t) {
                for (var r = 0; e.charAt(r) === t.charAt(r);)
                    if ("" === e.charAt(r++)) return -1;
                return r
            },
            getFormattedValue: function (e, t, r, i, n, a) {
                var o = "",
                    l = n.length > 0,
                    s = "";
                return 0 === r ? e : (t.forEach(function (t, c) {
                    if (e.length > 0) {
                        var u = e.slice(0, t),
                            d = e.slice(t);
                        s = l ? n[a ? c - 1 : c] || s : i, a ? (c > 0 && (o += s), o += u) : (o += u, u.length === t && c < r - 1 && (o += s)), e = d
                    }
                }), o)
            },
            fixPrefixCursor: function (e, t, r, i) {
                if (e) {
                    var n = e.value,
                        a = r || i[0] || " ";
                    if (e.setSelectionRange && t && !(t.length + a.length <= n.length)) {
                        var o = 2 * n.length;
                        setTimeout(function () {
                            e.setSelectionRange(o, o)
                        }, 1)
                    }
                }
            },
            checkFullSelection: function (e) {
                try {
                    var t = window.getSelection() || document.getSelection() || {};
                    return t.toString().length === e.length
                } catch (r) { }
                return !1
            },
            setSelection: function (e, t, r) {
                if (e === this.getActiveElement(r) && !(e && e.value.length <= t))
                    if (e.createTextRange) {
                        var i = e.createTextRange();
                        i.move("character", t), i.select()
                    } else try {
                        e.setSelectionRange(t, t)
                    } catch (n) {
                        console.warn("The input element type does not support selection")
                    }
            },
            getActiveElement: function (e) {
                var t = e.activeElement;
                return t && t.shadowRoot ? this.getActiveElement(t.shadowRoot) : t
            },
            isAndroid: function () {
                return navigator && /android/i.test(navigator.userAgent)
            },
            isAndroidBackspaceKeydown: function (e, t) {
                return !!(this.isAndroid() && e && t) && t === e.slice(0, -1)
            }
        };
        e.exports = r
    }, function (e, t) {
        (function (t) {
            "use strict";
            var r = {
                assign: function (e, r) {
                    return e = e || {}, r = r || {}, e.creditCard = !!r.creditCard, e.creditCardStrictMode = !!r.creditCardStrictMode, e.creditCardType = "", e.onCreditCardTypeChanged = r.onCreditCardTypeChanged || function () { }, e.phone = !!r.phone, e.phoneRegionCode = r.phoneRegionCode || "AU", e.phoneFormatter = {}, e.time = !!r.time, e.timePattern = r.timePattern || ["h", "m", "s"], e.timeFormat = r.timeFormat || "24", e.timeFormatter = {}, e.date = !!r.date, e.datePattern = r.datePattern || ["d", "m", "Y"], e.dateMin = r.dateMin || "", e.dateMax = r.dateMax || "", e.dateFormatter = {}, e.numeral = !!r.numeral, e.numeralIntegerScale = r.numeralIntegerScale > 0 ? r.numeralIntegerScale : 0, e.numeralDecimalScale = r.numeralDecimalScale >= 0 ? r.numeralDecimalScale : 2, e.numeralDecimalMark = r.numeralDecimalMark || ".", e.numeralThousandsGroupStyle = r.numeralThousandsGroupStyle || "thousand", e.numeralPositiveOnly = !!r.numeralPositiveOnly, e.stripLeadingZeroes = r.stripLeadingZeroes !== !1, e.signBeforePrefix = !!r.signBeforePrefix, e.tailPrefix = !!r.tailPrefix, e.swapHiddenInput = !!r.swapHiddenInput, e.numericOnly = e.creditCard || e.date || !!r.numericOnly, e.uppercase = !!r.uppercase, e.lowercase = !!r.lowercase, e.prefix = e.creditCard || e.date ? "" : r.prefix || "", e.noImmediatePrefix = !!r.noImmediatePrefix, e.prefixLength = e.prefix.length, e.rawValueTrimPrefix = !!r.rawValueTrimPrefix, e.copyDelimiter = !!r.copyDelimiter, e.initValue = void 0 !== r.initValue && null !== r.initValue ? r.initValue.toString() : "", e.delimiter = r.delimiter || "" === r.delimiter ? r.delimiter : r.date ? "/" : r.time ? ":" : r.numeral ? "," : (r.phone, " "), e.delimiterLength = e.delimiter.length, e.delimiterLazyShow = !!r.delimiterLazyShow, e.delimiters = r.delimiters || [], e.blocks = r.blocks || [], e.blocksLength = e.blocks.length, e.root = "object" == typeof t && t ? t : window, e.document = r.document || e.root.document, e.maxLength = 0, e.backspace = !1, e.result = "", e.onValueChanged = r.onValueChanged || function () { }, e
                }
            };
            e.exports = r
        }).call(t, function () {
            return this
        }())
    }])
});