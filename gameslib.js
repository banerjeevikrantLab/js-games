! function(e) { if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else { var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.CodeHS = e() } }(function() {
    var define, module, exports;
    return function e(t, n, r) {
        function o(s, a) { if (!n[s]) { if (!t[s]) { var u = "function" == typeof require && require; if (!a && u) return u(s, !0); if (i) return i(s, !0); var l = new Error("Cannot find module '" + s + "'"); throw l.code = "MODULE_NOT_FOUND", l } var c = n[s] = { exports: {} };
                t[s][0].call(c.exports, function(e) { var n = t[s][1][e]; return o(n ? n : e) }, c, c.exports, e, t, n, r) } return n[s].exports } for (var i = "function" == typeof require && require, s = 0; s < r.length; s++) o(r[s]); return o }({
        1: [function(require, module, exports) { "use strict"; var graphicsModule = require("codehs-graphics"),
                dataStructuresModule = require("codehs-datastructures"),
                consoleModule = require("codehs-console"),
                randomizerModule = graphicsModule.Randomizer,
                keyboardModule = require("codehs-keyboard"),
                CodeHSGraphics = graphicsModule.CodeHSGraphics,
                CodeHSConsole = consoleModule.CodeHSConsole,
                CodeHSDatastructures = dataStructuresModule,
                domready = require("domready"),
                PUBLIC_METHODS = {},
                PUBLIC_CONSTRUCTORS = {};
            PUBLIC_METHODS.__graphics__ = graphicsModule.PUBLIC_METHODS, PUBLIC_METHODS.__console__ = consoleModule.PUBLIC_METHODS, PUBLIC_CONSTRUCTORS.__graphics__ = graphicsModule.PUBLIC_CONSTRUCTORS, PUBLIC_CONSTRUCTORS.__datastructs__ = dataStructuresModule.PUBLIC_CONSTRUCTORS; var makeNamespaceWrap = function() { var e, t, n, r = ""; for (e in PUBLIC_METHODS)
                        if (PUBLIC_METHODS.hasOwnProperty(e))
                            for (n = 0; n < PUBLIC_METHODS[e].length; n++) t = PUBLIC_METHODS[e][n], r += "window." + t + " = function(){\n	return " + e + "." + t + ".apply(" + e + ", arguments);\n}\n";
                    var o; for (e in PUBLIC_CONSTRUCTORS)
                        if (PUBLIC_CONSTRUCTORS.hasOwnProperty(e))
                            for (n = 0; n < PUBLIC_CONSTRUCTORS[e].length; n++) o = PUBLIC_CONSTRUCTORS[e][n], r += "window." + o + " = " + e + "." + o + ";\n";
                    return r += "Text.giveDefaultContext(__graphics__);\n" },
                setup = function() { window.__graphics__ = new CodeHSGraphics, window.__console__ = new CodeHSConsole, window.__datastructs__ = CodeHSDatastructures, window.CodeHSGraphics = CodeHSGraphics, window.Randomizer = randomizerModule, window.Color = graphicsModule.Color, window.Keyboard = keyboardModule; var wrap = makeNamespaceWrap();
                    eval(wrap) };
            domready(function() { setup() }), module.exports = { CodeHSGraphics: CodeHSGraphics, CodeHSConsole: CodeHSConsole, CodeHSDatastructures: CodeHSDatastructures } }, { "codehs-console": 2, "codehs-datastructures": 3, "codehs-graphics": 11, "codehs-keyboard": 22, domready: 23 }],
        2: [function(e, t, n) { "use strict";

            function r() {} var o = e("jquery");
            window.CHS = window.CHS || {}, CHS.log = CHS.log || function() {}, CHS.Utils = CHS.Utils || { assert: function() {} }; var i = [],
                s = null,
                a = "#tester-message",
                u = [];
            r.registerPublicMethod = function(e) { u.push(e) }, r.getNamespaceModifcationString = function() { for (var e = "", t = 0; t < u.length; t++) { var n = u[t];
                    e += "function " + n + "(){\n	return __console__." + n + ".apply(__console__, arguments);\n}\n" } return e }, r.setSolution = function(e) { s = e }, r.prototype.checkOutput = function() { if (s) { var e = { success: !0, message: "<strong>Nice job!</strong> You got it!" }; if (0 === o("#console").html().length) e.success = !1, e.message = "You didn't print anything.";
                    else if (i.length != s.length) e.success = !1, e.message = "<strong>Not quite.</strong> Take a look at the example output in the exercise tab.";
                    else
                        for (var t = 0; t < i.length; t++) { var n = i[t],
                                r = s[t],
                                u = new RegExp(r);
                            0 !== n.search(u) && (e.success = !1, e.message = "<strong>Not quite.</strong> Take a look at the example output in the exercise tab.") }
                    return o(a).html(e.message), e.success ? o(a).removeClass("gone").removeClass("alert-error").addClass("alert-info") : o(a).removeClass("gone").removeClass("alert-info").addClass("alert-error"), e } }, r.getOutput = function() { return o("#console").text() }, r.exists = function() { return o("#console").exists() }, r.clear = function() { i = [], o("#console").html(""), o(a).addClass("gone") }, r.prototype.readLinePrivate = function(e, t) { "undefined" != typeof t && t || this.print(e), o("#console").css("margin-top", "180px"); var n = prompt(e); return o("#console").css("margin-top", "0px"), "undefined" != typeof t && t || this.println(n), n }, r.prototype.runCode = function(e) { var t = r.getNamespaceModifcationString(),
                    n = ""; return n += t, n += e, n += "\n\nif(typeof start == 'function') {start();} ", n += "__console__.checkOutput();", CHS.Utils.safeEval(n, this, "__console__") }, r.prototype.print = function(e) { if (1 !== arguments.length) throw new Error("You should pass exactly 1 argument to print"); var t = o("#console");
                t.length ? (t.html(o("#console").html() + e), t.scrollTop(o("#console")[0].scrollHeight), i = t.html().split("\n"), i.splice(i.length - 1, 1)) : window.console.log(e) }, r.registerPublicMethod("print"), r.prototype.println = function(e) { if (0 === arguments.length) e = "";
                else { if (1 !== arguments.length) throw new Error("You should pass exactly 1 argument to println");
                    this.print(e + "\n");
                    o("#console").scrollTop() } }, r.registerPublicMethod("println"), r.prototype.readNumber = function(e, t, n) { for (var r = 0, o = 100, i = e, s = !1, a = 0;;) { var u = this.readLinePrivate(i, s); if (null === u) return null; if (u = t(u), !isNaN(u)) return u; if (null === u) return r; if (a > o) return r;
                    i = "That was not " + n + ". Please try again. " + e, s = !0, a++ } }, r.registerPublicMethod("readNumber"), r.prototype.readLine = function(e) { if (1 !== arguments.length) throw new Error("You should pass exactly 1 argument to readLine"); return this.readLinePrivate(e, !1) }, r.registerPublicMethod("readLine"), r.prototype.readBoolean = function(e) { if (1 !== arguments.length) throw new Error("You should pass exactly 1 argument to readBoolean"); return this.readNumber(e, function(e) { return null === e ? NaN : (e = e.toLowerCase(), "true" == e || "yes" == e ? !0 : "false" == e || "no" == e ? !1 : NaN) }, "a boolean (true/false)") }, r.registerPublicMethod("readBoolean"), r.prototype.readInt = function(e) { if (1 !== arguments.length) throw new Error("You should pass exactly 1 argument to readInt"); return this.readNumber(e, function(e) { var t = parseInt(e),
                        n = parseFloat(e); return t == n ? t : NaN }, "an integer") }, r.registerPublicMethod("readInt"), r.prototype.readFloat = function(e) { if (1 !== arguments.length) throw new Error("You should pass exactly 1 argument to readFloat"); return r.readNumber(e, parseFloat, "a float") }, r.registerPublicMethod("readFloat"), t.exports = { CodeHSConsole: r, PUBLIC_METHODS: u } }, { jquery: 24 }],
        3: [function(e, t, n) { "use strict"; var r = (e("./queue.js"), e("./set.js")),
                o = e("./stack.js"),
                i = ["Queue", "Set", "Stack"];
            t.exports = { PUBLIC_CONSTRUCTORS: i, Set: r, Stack: o } }, { "./queue.js": 4, "./set.js": 5, "./stack.js": 6 }],
        4: [function(e, t, n) { "use strict";

            function r() { this.q = [] }
            r.prototype.size = function() { return this.q.length }, r.prototype.clear = function() { this.q = [] }, r.prototype.enqueue = function(e) { this.q.push(e) }, r.prototype.dequeue = function() { var e = this.q[0]; return this.q.splice(0, 1), e }, r.prototype.peek = function() { var e = this.q[0]; return e }, r.prototype.hasNext = function() { return 0 !== this.q.length }, r.prototype.isEmpty = function() { return 0 === this.q.length }, t.exports = r }, {}],
        5: [function(e, t, n) { "use strict";

            function r() { this.set = {}, this.numElems = 0 }
            r.prototype.size = function() { return this.numElems }, r.prototype.isEmpty = function() { return 0 === this.numElems }, r.prototype.clear = function() { this.set = {}, this.numElems = 0 }, r.prototype.getKey = function(e) { var t = e; return "object" == typeof e && (t = e.toString()), t }, r.prototype.add = function(e) { if (null === e) throw new TypeError("Cannot add a null to a set."); var t = this.getKey(e);
                this.containsKey(t) || this.numElems++, this.set[t] = e }, r.prototype.remove = function(e) { if (null === e) throw new TypeError("Cannot remove null from a set."); var t = this.getKey(e); if (!this.containsKey(t)) throw new Error("Set does not contain " + t);
                delete this.set[t], this.numElems-- }, r.prototype.containsKey = function(e) { return "undefined" != typeof this.set[e] }, r.prototype.contains = function(e) { return "undefined" != typeof this.find(e) }, r.prototype.elems = function() { return this.set }, r.prototype.find = function(e) { var t = this.getKey(e); return this.set[t] }, r.prototype.union = function(e) { for (var t in e.elems()) this.add(e.find(t)) }, r.prototype.intersect = function(e) { var t = {},
                    n = 0; for (var r in e.elems()) this.containsKey(r) && (n++, t[r] = this.find(r));
                this.set = t, this.numElems = n }, r.prototype.toString = function() { var e = "Set: {",
                    t = 0; for (var n in this.set) { var r = this.set[n];
                    e += r, t < this.size() - 1 && (e += ", "), t++ } return e += "}" }, t.exports = r }, {}],
        6: [function(e, t, n) { "use strict";

            function r() { this.stack = [] }
            r.prototype.size = function() { return this.stack.length }, r.prototype.clear = function() { this.stack = [] }, r.prototype.push = function(e) { this.stack.push(e) }, r.prototype.pop = function() { var e = this.stack.length,
                    t = this.stack[e - 1]; return this.stack.splice(e - 1, 1), t }, r.prototype.peek = function() { var e = this.stack.length,
                    t = this.stack[e - 1]; return t }, r.prototype.hasNext = function() { return 0 !== this.stack.length }, r.prototype.isEmpty = function() { return 0 === this.stack.length }, t.exports = r }, {}],
        7: [function(e, t, n) { "use strict";

            function r(e, t, n, i) { if ("number" != typeof e) throw new TypeError("You must pass four numbers to newArc(radius, startAngle, endAngle, angleUnit)");
                o.call(this), this.radius = e, this.angleUnit = i || r.DEGREES, this.counterclockwise = r.COUNTER_CLOCKWISE, this.type = "Arc", this.angleUnit == r.DEGREES && (t = s(t), n = s(n)), this.startAngle = t, this.endAngle = n } var o = e("./thing.js");
            r.prototype = new o, r.prototype.constructor = r, r.COUNTER_CLOCKWISE = !0, r.CLOCKWISE = !1, r.DEGREES = 0, r.RADIANS = 1, r.prototype.draw = function(e) { var t = e.getContext();
                t.beginPath(), t.arc(this.x, this.y, this.radius, i(this.startAngle), i(this.endAngle), this.counterclockwise), t.lineTo(this.x, this.y), this.hasBorder && (t.lineWidth = this.lineWidth, t.strokeStyle = this.stroke.toString(), t.stroke()), t.fillStyle = this.color.toString(), t.fill() }, r.prototype.setStartAngle = function(e) { this.angleUnit == r.DEGREES && (e = s(e)), this.startAngle = e }, r.prototype.setEndAngle = function(e) { this.angleUnit == r.DEGREES && (e = s(e)), this.endAngle = e }, r.prototype.getStartAngle = function() { var e = this.startAngle; return this.angleUnit == r.DEGREES && (e = a(this.startAngle)), Math.round(e) }, r.prototype.getEndAngle = function() { var e = this.endAngle; return this.angleUnit == r.DEGREES && (e = a(this.endAngle)), Math.round(e) }, r.prototype.setDirection = function(e) { this.counterclockwise = e }; var i = function(e) { return e = a(e), e = Math.round(e), e = (360 - e) % 360, e = s(e) },
                s = function(e) { return e / 180 * Math.PI },
                a = function(e) { return e / Math.PI * 180 };
            t.exports = r }, { "./thing.js": 19 }],
        8: [function(e, t, n) { "use strict";

            function r(e) { if ("number" != typeof e) throw new TypeError("You must pass a number to the Circle constructor!");
                o.call(this), this.radius = e, this.color = i.black, this.lineWidth = 3, this.type = "Circle" } var o = e("./thing.js"),
                i = e("./color.js");
            r.prototype = new o, r.prototype.constructor = r, r.prototype.draw = function(e) { var t = e.getContext();
                t.beginPath(), this.hasBorder && (t.strokeStyle = this.stroke.toString(), t.lineWidth = this.lineWidth), t.fillStyle = this.color.toString(), t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, !0), t.closePath(), this.hasBorder && t.stroke(), t.fill() }, r.prototype.getRadius = function() { return this.radius }, r.prototype.getHeight = function() { return 2 * this.radius }, r.prototype.getWidth = function() { return 2 * this.radius }, r.prototype.setRadius = function(e) { if ("number" != typeof e) throw new TypeError('You must pass a number to <span class="code">setRadius(num)</span>');
                e = Math.max(0, e), this.radius = e }, r.prototype.containsPoint = function(e, t, n) { var r = n.getDistance(this.x, this.y, e, t); return r < this.radius }, t.exports = r }, { "./color.js": 9, "./thing.js": 19 }],
        9: [function(e, t, n) { "use strict";

            function r(e, t, n) { this.r = e, this.g = t, this.b = n }

            function o(e, t, n) { if (e = Math.floor(e), t = Math.floor(t), n = Math.floor(n), e > 255 || t > 255 || n > 255) throw "Invalid color component"; return (e << 16 | t << 8 | n).toString(16) }

            function i(e, t, n) { return "#" + ("000000" + o(e, t, n)).slice(-6) }

            function s(e, t, n) { return 0 > n && (n += 1), n > 1 && (n -= 1), 1 / 6 > n ? e + 6 * (t - e) * n : .5 > n ? t : 2 / 3 > n ? e + (t - e) * (2 / 3 - n) * 6 : e } var a = e("./randomizer.js");
            r.prototype.toString = function() { return r.createFromRGB(this.r, this.g, this.b) }, r.random = a.nextColor, r.constants = { red: "#FF0000", RED: "#FF0000", green: "#00FF00", GREEN: "#00FF00", blue: "#0000FF", BLUE: "#0000FF", yellow: "#FFFF00", YELLOW: "#FFFF00", cyan: "#00FFFF", CYAN: "#00FFFF", orange: "#FFA500", ORANGE: "#FFA500", white: "#FFFFFF", WHITE: "#FFFFFF", black: "#000000", BLACK: "#000000", gray: "#cccccc", GRAY: "#CCCCCC", grey: "#cccccc", GREY: "#CCCCCC", purple: "#9B30FF", PURPLE: "#9B30FF" }; var u; for (u in r.constants) r[u] = r.constants[u];
            r.createFromRGB = function(e, t, n) { return i(e, t, n) }, r.randomRed = function() { var e = a.nextInt(50, 255); return r.createFromRGB(e, 0, 0) }, r.randomGreen = function() { var e = a.nextInt(50, 255); return r.createFromRGB(0, e, 0) }, r.randomBlue = function() { var e = a.nextInt(50, 255); return r.createFromRGB(0, 0, e) }, r.createFromRGBL = function(e, t, n, o) { var i = r.rgbToHsl(e, t, n);
                0 > o && (o = 0), o > 1 && (o = 1); var s = r.hslToRgb(i[0], i[1], o); return r.createFromRGB(s[0], s[1], s[2]) }, r.rgbToHsl = function(e, t, n) { e /= 255, t /= 255, n /= 255; var r, o, i = Math.max(e, t, n),
                    s = Math.min(e, t, n),
                    a = (i + s) / 2; if (i == s) r = o = 0;
                else { var u = i - s; switch (o = a > .5 ? u / (2 - i - s) : u / (i + s), i) {
                        case e:
                            r = (t - n) / u + (n > t ? 6 : 0); break;
                        case t:
                            r = (n - e) / u + 2; break;
                        case n:
                            r = (e - t) / u + 4 }
                    r /= 6 } return [r, o, a] }, r.hslToRgb = function(e, t, n) { var r, o, i; if (0 === t) r = o = i = n;
                else { var a = .5 > n ? n * (1 + t) : n + t - n * t,
                        u = 2 * n - a;
                    r = s(u, a, e + 1 / 3), o = s(u, a, e), i = s(u, a, e - 1 / 3) } return [255 * r, 255 * o, 255 * i] }, r.average = function(e, t) {
                function n(e) { return e.toString(16) }

                function r(e) { return parseInt(e, 16) } for (var o, i, s, a, u = /[\da-z]{2}/gi, l = e.match(u), c = t.match(u), p = "#", h = 0; h < l.length; h++) o = r(l[h]), i = r(c[h]), s = Math.floor(o + i >> 1), a = n(s), 1 == a.length && (a = "0" + a), p += a; return p }, t.exports = r }, { "./randomizer.js": 16 }],
        10: [function(e, t, n) { "use strict";

            function r(e) { e = e || {}, this.resetAllState(), this.globalTimer = !0, this.currentCanvas = null, this.setCurrentCanvas(e.canvas), this.debugMode = e.debug || !1, this.instanceId = c, c++; var t = this.canvasHasInstance(e.canvas); if (null !== t) { var n = l[t];
                    n.stopTimer("MAIN_TIMER"), l[t] = this } else l.push(this) }
            Array.prototype.remove = function(e) { return this.splice(e, 1)[0] }; var o = e("codehs-js-utils"),
                i = 40,
                s = [],
                a = [],
                u = [],
                l = [],
                c = 0;
            r.registerPublicMethod = function(e) { s.push(e) }, r.registerConstructorMethod = function(e) { a.push(e) }, r.getNamespaceModifcationString = function() { for (var e = "\n", t = 0; t < s.length; t++) { var n = s[t];
                    e += "function " + n + "(){\n	return __graphics__." + n + ".apply(__graphics__, arguments);\n}\n" } return e }, r.getConstructorModificationString = function() { for (var e = "", t = 0; t < a.length; t++) { var n = a[t];
                    e += "var " + n + " = __graphics__." + n + ";\n" } return e }, r.prototype.add = function(e) { this.elements.push(e) }, r.registerPublicMethod("add"), r.prototype.waitForClick = function() { this.clickCount++ }, r.registerPublicMethod("waitForClick"), r.prototype.mouseClickMethod = function(e) { this.clickCallback = o.safeCallback(e) }, r.registerPublicMethod("mouseClickMethod"), r.prototype.mouseMoveMethod = function(e) { this.moveCallback = o.safeCallback(e) }, r.registerPublicMethod("mouseMoveMethod"), r.prototype.mouseDownMethod = function(e) { this.mouseDownCallback = o.safeCallback(e) }, r.registerPublicMethod("mouseDownMethod"), r.prototype.mouseUpMethod = function(e) { this.mouseUpCallback = o.safeCallback(e) }, r.registerPublicMethod("mouseUpMethod"), r.prototype.mouseDragMethod = function(e) { this.dragCallback = o.safeCallback(e) }, r.registerPublicMethod("mouseDragMethod"), r.prototype.keyDownMethod = function(e) { this.keyDownCallback = o.safeCallback(e) }, r.registerPublicMethod("keyDownMethod"), r.prototype.keyUpMethod = function(e) { this.keyUpCallback = o.safeCallback(e) }, r.registerPublicMethod("keyUpMethod"), r.prototype.isKeyPressed = function(e) { return -1 != u.indexOf(e) }, r.registerPublicMethod("isKeyPressed"), r.prototype.getWidth = function() { var e = this.getCanvas(); return parseFloat(e.getAttribute("width")) }, r.registerPublicMethod("getWidth"), r.prototype.getHeight = function() { var e = this.getCanvas(); return parseFloat(e.getAttribute("height")) }, r.registerPublicMethod("getHeight"), r.prototype.stopTimer = function(e) { var t = "function" == typeof e ? e.name : e;
                clearInterval(this.timers[t]) }, r.registerPublicMethod("stopTimer"), r.prototype.stopAllTimers = function() { for (var e = 1; 99999 > e; e++) window.clearInterval(e);
                this.setMainTimer() }, r.registerPublicMethod("stopAllTimers"), r.prototype.setTimer = function(e, t, n, r) { var o = this;
                (isNaN(t) || 15 > t) && (t = 15), this.waitingForClick() ? this.delayedTimers.push({ fn: e, time: t, data: n, clicks: o.clickCount, name: r }) : this.setGraphicsTimer(e, t, n, r) }, r.registerPublicMethod("setTimer"), r.prototype.setBackgroundColor = function(e) { this.backgroundColor = e }, r.registerPublicMethod("setBackgroundColor"), r.prototype.clear = function(e) { var t = e || this.getContext();
                t.clearRect(0, 0, this.getWidth(), this.getHeight()) }, r.registerPublicMethod("clear"), r.prototype.getElementAt = function(e, t) { for (var n = this.elements.length - 1; n >= 0; n--)
                    if (this.elements[n].containsPoint(e, t, this)) return this.elements[n];
                return null }, r.registerPublicMethod("getElementAt"), r.prototype.elementExistsWithParameters = function(e) { for (var t = this.elements.length - 1; t >= 0; t--) { var n = this.elements[t]; try { if (void 0 !== e.x && this.runCode("return " + e.x).result.toFixed(0) != n.getX().toFixed(0)) continue; if (void 0 !== e.y && this.runCode("return " + e.y).result.toFixed(0) != n.getY().toFixed(0)) continue; if (void 0 !== e.width && this.runCode("return " + e.width).result.toFixed(0) != n.getWidth().toFixed(0)) continue; if (void 0 !== e.height && this.runCode("return " + e.height).result.toFixed(0) != n.getHeight().toFixed(0)) continue; if (void 0 !== e.radius && this.runCode("return " + e.radius).result.toFixed(0) != n.getRadius().toFixed(0)) continue; if (void 0 !== e.color && this.runCode("return " + e.color).result != n.getColor()) continue; if (void 0 !== e.label && e.label != n.getLabel()) continue; if (void 0 !== e.type && e.type != n.getType()) continue } catch (r) { continue } return !0 } return !1 }, r.registerPublicMethod("elementExistsWithParameters"), r.prototype.removeAll = function() { this.elements = [] }, r.registerPublicMethod("removeAll"), r.prototype.remove = function(e) { for (var t = 0; t < this.elements.length; t++) this.elements[t] == e && this.elements.splice(t, 1) }, r.registerPublicMethod("remove"), r.prototype.setSize = function(e, t) { var n = this.getCanvas();
                n.width = e, n.height = t }, r.registerPublicMethod("setSize"), r.prototype.Rectangle = e("./rectangle.js"), r.registerConstructorMethod("Rectangle"), r.prototype.Circle = e("./circle.js"), r.registerConstructorMethod("Circle"), r.prototype.Line = e("./line.js"), r.registerConstructorMethod("Line"), r.prototype.Grid = e("./grid.js"), r.registerConstructorMethod("Grid"), r.prototype.Line = e("./line.js"), r.registerConstructorMethod("Line"), r.prototype.Polygon = e("./polygon.js"), r.registerConstructorMethod("Polygon"), r.prototype.Text = e("./text.js"), r.registerConstructorMethod("Text"), r.prototype.Oval = e("./oval.js"), r.registerConstructorMethod("Oval"), r.prototype.Arc = e("./arc.js"), r.registerConstructorMethod("Arc"), r.prototype.Color = e("./color.js"), r.registerConstructorMethod("Color"), r.prototype.WebImage = e("./webimage.js"), r.registerConstructorMethod("WebImage"), r.prototype.runCode = function(e) { console.log("RUNNING THE CODE"); var t = r.getNamespaceModifcationString(),
                    n = r.getConstructorModificationString(),
                    i = ""; return i += t, i += n, i += "\nText.giveDefaultContext(__graphics__);\n", i += e, i += "\n\nif(typeof start == 'function') {start();} ", o.safeEval(i, this, "__graphics__") }, r.prototype.resetAllTimers = function() { for (var e in this.timers) clearInterval(this.timers[e]) }, r.prototype.resetAllState = function() { this.backgroundColor = null, this.elements = [], this.clickCallback = null, this.moveCallback = null, this.mouseDownCallback = null, this.mouseUpCallback = null, this.dragCallback = null, this.keyDownCallback = null, this.keyUpCallback = null, this.timers = {}, this.timersList = [], this.clickCount = 0, this.delayedTimers = [] }, r.prototype.fullReset = function() { this.resetAllTimers(), this.resetAllState(), this.setMainTimer() }, r.prototype.canvasExists = function() { return null !== this.getCanvas() }, r.prototype.getCanvas = function() { return this.currentCanvas }, r.prototype.setCurrentCanvas = function(e) { e ? this.currentCanvas = $(e)[0] : this.currentCanvas = document.getElementsByTagName("canvas")[0], this.currentCanvas || (this.currentCanvas = null), this.fullReset(), this.setup() }, r.prototype.stopGlobalTimer = function() { this.globalTimer = !1 }, r.prototype.drawBackground = function() { if (this.backgroundColor) { var e = this.getContext();
                    e.fillStyle = this.backgroundColor, e.beginPath(), e.rect(0, 0, this.getWidth(), this.getHeight()), e.closePath(), e.fill() } }, r.prototype.getContext = function() { var e = this.getCanvas(); if (e && e.getContext) { var t = e.getContext("2d"); return t } return null }, r.prototype.redraw = function() { this.clear(), this.drawBackground(); for (var e = 0; e < this.elements.length; e++) this.elements[e].draw(this) }, r.prototype.setMainTimer = function() { var e = this;
                this.globalTimer && this.setTimer(function() { e.redraw() }, i, null, "MAIN_TIMER") }, r.prototype.waitingForClick = function() { return 0 !== this.clickCount }, r.prototype.canvasHasInstance = function(e) { for (var t, n = 0; n < l.length; n++)
                    if (t = l[n], t.instanceId !== this.instanceId && t.getCanvas() === e) return t.instanceId;
                return null }, r.prototype.getDistance = function(e, t, n, r) { return Math.sqrt(Math.pow(e - n, 2) + Math.pow(t - r, 2)) }, r.prototype.setup = function() { var e = this,
                    t = this.getCanvas();
                t.onclick = function(t) { if (e.waitingForClick()) { e.clickCount--; for (var n = 0; n < e.delayedTimers.length; n++) { var r = e.delayedTimers[n];
                            r.clicks--, 0 === r.clicks && e.setGraphicsTimer(r.fn, r.time, r.data) } } else e.clickCallback && e.clickCallback(t) }; var n = !1;
                t.onmousemove = function(t) { e.moveCallback && e.moveCallback(t), n && e.dragCallback && e.dragCallback(t) }, t.onmousedown = function(t) { n = !0, e.mouseDownCallback && e.mouseDownCallback(t) }, t.onmouseup = function(t) { n = !1, e.mouseUpCallback && e.mouseUpCallback(t) }, t.ontouchmove = function(t) { t.preventDefault(), e.dragCallback ? e.dragCallback(t) : e.moveCallback && e.moveCallback(t) }, t.ontouchstart = function(t) { if (t.preventDefault(), e.mouseDownCallback ? e.mouseDownCallback(t) : e.clickCallback && e.clickCallback(t), e.waitingForClick()) { e.clickCount--; for (var n = 0; n < e.delayedTimers.length; n++) { var r = e.delayedTimers[n];
                            r.clicks--, 0 === r.clicks && e.setGraphicsTimer(r.fn, r.time, r.data) } } else; }, t.ontouchend = function(t) { t.preventDefault(), e.mouseUpCallback && e.mouseUpCallback(t) } }, r.prototype.setGraphicsTimer = function(e, t, n, r) { "undefined" == typeof r && (r = e.name), this.timers[r] = o.safeSetInterval(e, n, t), this.timersList.push({ name: r, fn: e, data: n, time: t }) }, window.onkeydown = function(e) { var t = u.indexOf(e.keyCode); - 1 === t && u.push(e.keyCode); for (var n, r = 0; r < l.length; r++) { var o = l[r];
                    o.keyDownCallback && (o.keyDownCallback(e), n = !0, e.keyCode == Keyboard.SPACE && (n = !1), e.keyCode >= Keyboard.LEFT && e.keyCode <= Keyboard.DOWN && (n = !1)) } return n }, window.onkeyup = function(e) { var t = u.indexOf(e.keyCode); - 1 !== t && u.splice(t, 1); for (var n = 0; n < l.length; n++) { var r = l[n];
                    r.keyUpCallback && r.keyUpCallback(e) } }, r.getMouseCoordinates = function(e) { var t, n;
                e.pageX || e.pageY ? (t = e.pageX, n = e.pageY) : (t = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, n = e.clientY + document.body.scrollTop + document.documentElement.scrollTop); var r = $(e.currentTarget).offset(); return t -= r.left, n -= r.top, t = Math.round(t), n = Math.round(n), { x: t, y: n } }, r.getTouchCoordinates = r.getMouseCoordinates, MouseEvent.prototype.getX = function() { return r.getMouseCoordinates(this).x }, MouseEvent.prototype.getY = function() { return r.getMouseCoordinates(this).y }, "undefined" != typeof TouchEvent && (TouchEvent.prototype.getX = function() { return r.getTouchCoordinates(self.touches[0]).x }, TouchEvent.prototype.getY = function() { return r.getTouchCoordinates(self.touches[0]).y }), t.exports = { CodeHSGraphics: r, PUBLIC_METHODS: s, PUBLIC_CONSTRUCTORS: a } }, { "./arc.js": 7, "./circle.js": 8, "./color.js": 9, "./grid.js": 12, "./line.js": 13, "./oval.js": 14, "./polygon.js": 15, "./rectangle.js": 17, "./text.js": 18, "./webimage.js": 20, "codehs-js-utils": 21 }],
        11: [function(e, t, n) { "use strict"; var r = e("./graphics.js"),
                o = r.CodeHSGraphics,
                i = r.PUBLIC_CONSTRUCTORS,
                s = r.PUBLIC_METHODS,
                a = e("./webimage.js"),
                u = e("./polygon.js"),
                l = e("./color.js"),
                c = e("./randomizer.js"),
                p = e("./text.js"),
                h = e("./grid.js"),
                f = e("./circle.js"),
                d = e("./line.js"),
                g = e("./rectangle.js");
            t.exports = { CodeHSGraphics: o, PUBLIC_METHODS: s, PUBLIC_CONSTRUCTORS: i, WebImage: a, Polygon: u, Color: l, Randomizer: c, Text: p, Grid: h, Circle: f, Line: d, Rectangle: g } }, { "./circle.js": 8, "./color.js": 9, "./graphics.js": 10, "./grid.js": 12, "./line.js": 13, "./polygon.js": 15, "./randomizer.js": 16, "./rectangle.js": 17, "./text.js": 18, "./webimage.js": 20 }],
        12: [function(e, t, n) { "use strict";

            function r(e, t) { this.grid = new Array(e); for (var n = 0; e > n; n++) this.grid[n] = new Array(t) }
            r.prototype.initFromArray = function(e) { for (var t = 0; t < e.length; t++)
                    for (var n = 0; n < e[0].length; n++) this.inBounds(t, n) && this.set(t, n, e[t][n]) }, r.prototype.init = function(e) { for (var t = 0; t < this.numRows(); t++)
                    for (var n = 0; n < this.numCols(); n++) this.grid[t][n] = e }, r.prototype.get = function(e, t) { return this.grid[e][t] }, r.prototype.set = function(e, t, n) { this.grid[e][t] = n }, r.prototype.numRows = function() { return this.grid.length }, r.prototype.numCols = function() { return this.grid[0].length }, r.prototype.inBounds = function(e, t) { return 0 > e || 0 > t ? !1 : e >= this.numRows() || t >= this.numCols() ? !1 : !0 }, r.prototype.toList = function() { for (var e = [], t = 0; t < this.grid.length; t++)
                    for (var n = 0; n < this.grid[0].length; n++) { var r = this.grid[t][n];
                        r && 0 !== r && e.push([t, n, r]) }
                return e }, r.prototype.toString = function() { for (var e = "", t = 0; t < this.numRows(); t++) { for (var n = 0; n < this.numCols(); n++) e += this.get(t, n) + " ";
                    e += "<br/>" } return e }, t.exports = r }, {}],
        13: [function(e, t, n) { "use strict";

            function r(e, t, n, r) { if ("number" != typeof e || "number" != typeof t || "number" != typeof n || "number" != typeof r) throw new TypeError('You must pass 4 numbers to <span class="code">new Line(x1, y1, x2, y2)</span>');
                o.call(this), this.x1 = e, this.y1 = t, this.x2 = n, this.y2 = r, this.lineWidth = 2, this.type = "Line" } var o = e("./thing.js");
            r.prototype = new o, r.prototype.constructor = r, r.prototype.setColor = function(e) { this.stroke = e }, r.prototype.getColor = function() { return this.stroke }, r.prototype.draw = function(e) { var t = e.getContext();
                t.fillStyle = this.color.toString(), t.beginPath(), t.strokeStyle = this.stroke.toString(), t.lineWidth = this.lineWidth, t.moveTo(this.x1, this.y1), t.lineTo(this.x2, this.y2), t.closePath(), t.stroke() }, r.prototype.containsPoint = function(e, t) { return !1 }, r.prototype.getWidth = function() { return this.width }, r.prototype.getHeight = function() { return this.height }, r.prototype.setLineWidth = function(e) { if ("number" != typeof e) throw new TypeError('You must pass a number to <span class="code">setLineWidth(width)</span>');
                this.lineWidth = e }, r.prototype.setPosition = function(e, t) { if ("number" != typeof e || "number" != typeof t) throw new TypeError('You must pass 2 numbers to <span class="code">setPosition(x, y)</span>');
                this.x1 = e, this.y1 = t }, r.prototype.setEndpoint = function(e, t) { if ("number" != typeof e || "number" != typeof t) throw new TypeError('You must pass 2 numbers to <span class="code">setEndpoint(x, y)</span>');
                this.x2 = e, this.y2 = t }, r.prototype.move = function(e, t) { if ("number" != typeof e || "number" != typeof t) throw new TypeError('You must pass 2 numbers to <span class="code">move(x, y)</span>');
                this.x1 += e, this.y1 += t, this.x2 += e, this.y2 += t }, t.exports = r }, { "./thing.js": 19 }],
        14: [function(e, t, n) { "use strict";

            function r(e, t) { if ("number" != typeof e || "number" != typeof t) throw new TypeError("You must pass two numbers to new Oval(width, height)");
                o.call(this), this.width = e, this.height = t, this.type = "Oval" } var o = e("./thing.js");
            r.prototype = new o, r.prototype.constructor = r, r.prototype.draw = function(e) { var t = e.getContext(),
                    n = this.width,
                    r = this.height,
                    o = this.x - n / 2,
                    i = this.y - r / 2,
                    s = .5522848,
                    a = n / 2 * s,
                    u = r / 2 * s,
                    l = o + n,
                    c = i + r,
                    p = o + n / 2,
                    h = i + r / 2;
                t.beginPath(), t.moveTo(o, h), t.bezierCurveTo(o, h - u, p - a, i, p, i), t.bezierCurveTo(p + a, i, l, h - u, l, h), t.bezierCurveTo(l, h + u, p + a, c, p, c), t.bezierCurveTo(p - a, c, o, h + u, o, h), t.fillStyle = this.color.toString(), t.fill(), this.hasBorder && (t.strokeStyle = this.stroke.toString(), t.lineWidth = this.lineWidth, t.stroke()), t.closePath() }, r.prototype.getHeight = function() { return this.height }, r.prototype.getWidth = function() { return this.width }, r.prototype.setWidth = function(e) { this.width = e }, r.prototype.setHeight = function(e) { this.height = e }, r.prototype.containsPoint = function(e, t) { var n = Math.pow(this.width / 2, 2),
                    r = Math.pow(this.height / 2, 2),
                    o = Math.pow(e - this.x, 2),
                    i = Math.pow(t - this.y, 2),
                    s = o / n + i / r; return 1 >= s }, t.exports = r }, { "./thing.js": 19 }],
        15: [function(e, t, n) { "use strict";

            function r(e, t) { o.call(this), this.points = [] } var o = e("./thing.js");
            r.prototype = new o, r.prototype.constructor = r, r.prototype.draw = function(e) { if (0 !== this.points.length) { var t = e.getContext();
                    t.fillStyle = this.color.toString(), t.beginPath(); var n = this.points[0];
                    t.moveTo(n.x, n.y); for (var r = 1; r < this.points.length; r++) { var o = this.points[r];
                        t.lineTo(o.x, o.y) }
                    t.closePath(), t.fill() } }, r.prototype.containsPoint = function(e, t) { return e >= this.x && e <= this.x + this.width && t >= this.y && t <= this.y + this.height }, r.prototype.getWidth = function() { return this.width }, r.prototype.getHeight = function() { return this.height }, r.prototype.addPoint = function(e, t) { this.points.push({ x: e, y: t }) }, t.exports = r }, { "./thing.js": 19 }],
        16: [function(e, t, n) { "use strict"; var r = function(e, t) { "undefined" == typeof t && (t = e - 1, e = 0), e = Math.floor(e); var n = Math.random(); return e + Math.floor(n * (t - e + 1)) },
                o = function(e, t) { return "undefined" == typeof t && (t = e, e = 0), e + (t - e) * Math.random() },
                i = function() { var e = r(0, 255); return 16 > e ? "0" + e.toString(16) : e.toString(16) },
                s = function() { var e = i(),
                        t = i(),
                        n = i(); return "#" + e + t + n },
                a = function(e) { return "undefined" == typeof e && (e = .5), Math.random() < e };
            t.exports = { nextInt: r, nextFloat: o, nextHex: i, nextColor: s, nextBoolean: a } }, {}],
        17: [function(e, t, n) { "use strict";

            function r(e, t) { if ("number" != typeof e || "number" != typeof t) throw new TypeError('You must pass two numbers to <span class="code">new Rectangle(width, height)</span>');
                o.call(this), this.width = e, this.height = t, this.type = "Rectangle" } var o = e("./thing.js");
            r.prototype = new o, r.prototype.constructor = r, r.prototype.draw = function(e) { var t = e.getContext();
                t.fillStyle = this.color.toString(), this.hasBorder && (t.lineWidth = this.lineWidth, t.strokeStyle = this.stroke.toString()), t.beginPath(), t.rect(this.x, this.y, this.width, this.height), t.closePath(), this.hasBorder && t.stroke(), t.fill() }, r.prototype.containsPoint = function(e, t) { return e >= this.x && e <= this.x + this.width && t >= this.y && t <= this.y + this.height }, r.prototype.getWidth = function() { return this.width }, r.prototype.getHeight = function() { return this.height }, t.exports = r }, { "./thing.js": 19 }],
        18: [function(e, t, n) { "use strict"; var r = e("./thing.js"),
                o = function(e, t) { r.call(this), this.label = e, this.type = "Text", this.font = void 0 == t ? "20pt Arial" : t, this.context = null, this.resetDimensions() };
            o.prototype = new r, o.prototype.constructor = o, o.defaultContext = null, o.giveDefaultContext = function(e) { o.defaultContext = e.getContext() }, o.prototype.resetDimensions = function() { var e = this.context || o.defaultContext;
                e.font = this.font, this.width = e.measureText(this.label).width, this.height = 1.2 * e.measureText("m").width }, o.prototype.draw = function(e) { var t = e.getContext();
                this.context = t, t.fillStyle = this.color.toString(), t.beginPath(), t.font = this.font, this.resetDimensions(), t.fillText(this.label, this.x, this.y), t.closePath(), t.fill() }, o.prototype.setFont = function(e) { this.font = e, this.resetDimensions() }, o.prototype.setLabel = function(e) { this.label = e, this.resetDimensions() }, o.prototype.setText = function(e) { this.label = e, this.resetDimensions() }, o.prototype.getLabel = function(e) { return this.label }, o.prototype.getText = function(e) { return this.label }, o.prototype.getWidth = function() { return this.width }, o.prototype.getHeight = function() { return this.height }, o.prototype.containsPoint = function(e, t) { return e >= this.x && e <= this.x + this.width && t <= this.y && t >= this.y - this.height }, t.exports = o }, { "./thing.js": 19 }],
        19: [function(e, t, n) {
            "use strict";

            function r() { this.x = 0, this.y = 0, this.color = "#000000", this.stroke = "#000000", this.type = "Thing", this.lineWidth = 1, this.filled = !0, this.hasBorder = !1 }
            r.prototype.setFilled = function(e) { if (1 !== arguments.length) throw new Error("You should pass exactly 1 argument to setFilled");
                this.filled = e }, r.prototype.isFilled = function() { return this.filled }, r.prototype.setBorder = function(e) { if (1 !== arguments.length) throw new Error("You should pass exactly 1 argument to setBorder");
                this.hasBorder = e }, r.prototype.hasBorder = function() { return this.hasBorder }, r.prototype.setType = function(e) { if (1 !== arguments.length) throw new Error("You should pass exactly 1 argument to setType");
                this.type = e }, r.prototype.getType = function() {
                return this.type
            }, r.prototype.setPosition = function(e, t) { if (2 !== arguments.length) throw new Error("You should pass exactly 2 arguments to setPosition"); if ("number" != typeof e && isNaN(e)) throw new TypeError("Invalid number for x-coordinate"); if ("number" != typeof t && isNaN(t)) throw new TypeError("Invalid number for y-coordinate");
                this.x = e, this.y = t }, r.prototype.setColor = function(e) { if (1 !== arguments.length) throw new Error("You should pass exactly 1 argument to setColor."); if (void 0 === e) throw new TypeError("Invalid color");
                this.color = e }, r.prototype.getColor = function() { return this.color }, r.prototype.setBorderColor = function(e) { if (void 0 === e) throw new TypeError("Invalid color.");
                this.stroke = e, this.hasBorder = !0, this.hasBorder = !0 }, r.prototype.getBorderColor = function() { return this.stroke }, r.prototype.setBorderWidth = function(e) { if (1 !== arguments.length) throw new Error("You should pass exactly 1 argument to setBorderWidth.");
                this.lineWidth = e, this.hasBorder = !0 }, r.prototype.getBorderWidth = function() { return this.lineWidth }, r.prototype.move = function(e, t) { if (2 !== arguments.length) throw new Error("You should pass exactly 2 arguments to move."); if ("number" != typeof e && isNaN(e)) throw new TypeError("Invalid number for dx."); if ("number" != typeof t && isNaN(t)) throw new TypeError("Invalid number for dy.");
                this.x += e, this.y += t }, r.prototype.getX = function() { return this.x }, r.prototype.getY = function() { return this.y }, r.prototype.draw = function() {}, r.prototype.containsPoint = function(e, t) { return !1 }, t.exports = r
        }, {}],
        20: [function(e, t, n) { "use strict";

            function r(e) { if ("string" != typeof e) throw new TypeError('You must pass a string to <span class="code">new WebImage(filename)</span> that has the image\'s location.');
                o.call(this); var t = this;
                this.image = new Image, this.image.src = e, this.filename = e, this.width = i, this.height = i, this.image.onload = function() { t.checkDimensions(), t.loadfn && t.loadfn() }, this.set = 0, this.type = "WebImage" } var o = e("./thing.js"),
                i = 1,
                s = 4,
                a = 0,
                u = 1,
                l = 2,
                c = 3;
            r.prototype = new o, r.prototype.constructor = r, r.prototype.loaded = function(e) { this.loadfn = e }, r.prototype.setImage = function(e) { var t = this;
                this.image = new Image, this.image.src = e, this.filename = e, this.width = i, this.height = i, this.image.onload = function() { t.checkDimensions(), t.loadfn && t.loadfn() }, this.set = 0 }, r.prototype.checkDimensions = function() { this.width == i && (this.width = this.image.width, this.height = this.image.height) }, r.prototype.draw = function(e) { this.checkDimensions(); var t = e.getContext();
                t.beginPath(), t.drawImage(this.image, this.x, this.y, this.width, this.height), t.closePath() }, r.prototype.getData = function(e) { var t = e.getContext();
                this.data = t.getImageData(this.x, this.y, this.width, this.height) }, r.prototype.containsPoint = function(e, t) { return e >= this.x && e <= this.x + this.width && t >= this.y && t <= this.y + this.height }, r.prototype.getWidth = function() { return this.width }, r.prototype.getHeight = function() { return this.height }, r.prototype.setSize = function(e, t) { this.width = e, this.height = t }, r.prototype.getPixel = function(e, t) { var n = s * (t * this.width + e),
                    r = [this.data.data[n + a], this.data.data[n + u], this.data.data[n + l], this.data.data[n + c]]; return r }, r.prototype.getRed = function(e, t) { return this.getPixel(e, t)[a] }, r.prototype.getGreen = function(e, t) { return this.getPixel(e, t)[u] }, r.prototype.getBlue = function(e, t) { return this.getPixel(e, t)[l] }, r.prototype.getAlpha = function(e, t) { return this.getPixel(e, t)[c] }, r.prototype.setPixel = function(e, t, n, r) { var o = s * (t * this.width + e);
                this.data.data[o + n] = r }, r.prototype.setRed = function(e, t, n) { this.setPixel(e, t, a, n) }, r.prototype.setGreen = function(e, t, n) { this.setPixel(e, t, u, n) }, r.prototype.setBlue = function(e, t, n) { this.setPixel(e, t, l, n) }, r.prototype.setAlpha = function(e, t, n) { this.setPixel(e, t, c, n) }, t.exports = r }, { "./thing.js": 19 }],
        21: [function(require, module, exports) { "use strict";

            function linesWithoutSemicolons(e) { var t = jslint(e),
                    n = t.warnings,
                    r = []; return n && n.length && _.each(n, function(e) { e && "expected_a_b" == e.code && ";" == e.a && r.push(e.line + 1) }), r }

            function removeComments(e) { e = e.split(""); for (var t = { singleQuote: !1, doubleQuote: !1, blockComment: !1, lineComment: !1, condComp: !1 }, n = 0, r = e.length; r > n; n++)
                    if (t.singleQuote) "'" === e[n] && "\\" !== e[n - 1] && (t.singleQuote = !1);
                    else if (t.doubleQuote) '"' === e[n] && "\\" !== e[n - 1] && (t.doubleQuote = !1);
                else if (t.blockComment) "*" === e[n] && "/" === e[n + 1] && ("\n" !== e[n + 1] && (e[n + 1] = ""), t.blockComment = !1), "\n" !== e[n] && (e[n] = "");
                else if (t.lineComment)("\n" === e[n + 1] || "\r" === e[n + 1]) && (t.lineComment = !1), "\n" !== e[n] && (e[n] = "");
                else if (t.condComp) "@" === e[n - 2] && "*" === e[n - 1] && "/" === e[n] && (t.condComp = !1);
                else if (t.doubleQuote = '"' === e[n], t.singleQuote = "'" === e[n], "/" === e[n]) { if ("*" === e[n + 1] && "@" === e[n + 2]) { t.condComp = !0; continue } if ("*" === e[n + 1]) { "\n" !== e[n] && (e[n] = ""), t.blockComment = !0; continue } if ("/" === e[n + 1]) { "\n" !== e[n] && (e[n] = ""), t.lineComment = !0; continue } } return e.join("") }

            function lineNumberFromError(e) { var t = -1;
                e.stack.replace(/<anonymous>:(.*):/gm, function(e, n, r, o) {-1 == t && (t = parseInt(n)) }); return t }

            function generateCodeArray(e) { var t = e.split("\n"); return t }

            function safeEditorCode(e, t) { t = t || {}; var n = t.fnOnError || function() {},
                    r = t.toTryArgs || []; try { return e.apply(null, r) } catch (o) { return CHS.PubSub.trigger("editorError:handle", o, "runner"), n() } }

            function safeEval(code, context, contextName) { var __context__ = context;
                code = "(function(" + contextName + "){" + code, code += "})(__context__);"; var fnToTry = function() { return { result: eval(code), hasError: !1 } },
                    fnOnError = function() { return { hasError: !0 } }; return safeEditorCode(fnToTry, { fnOnError: fnOnError }) }

            function safeCallback(e, t) { return function() { var n = {}; return n.fnOnError = t, n.toTryArgs = arguments, safeEditorCode(e, n) } }

            function safeSetInterval(e, t, n) { var r = function() { clearInterval(i) },
                    o = safeCallback(e, r),
                    i = setInterval(o, n, t); return i }
            module.exports = { linesWithoutSemicolons: linesWithoutSemicolons, removeComments: removeComments, lineNumberFromError: lineNumberFromError, generateCodeArray: generateCodeArray, safeEval: safeEval, safeCallback: safeCallback, safeSetInterval: safeSetInterval } }, {}],
        22: [function(e, t, n) { "use strict"; var r = {};
            r = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, ENTER: 13, SHIFT: 16, SPACE: 32, BACKSPACE: 8, TAB: 9, CTRL: 17, ALT: 18, CAPS_LOCK: 20, LEFT_COMMAND: 91, LEFT_WINDOW: 91, RIGHT_WINDOW: 92, RIGHT_COMMAND: 93, SELECT: 93 }, r.digit = function(e) { return e %= 10, e + 48 }, r.letter = function(e) { return 0 === e.length ? null : e.toUpperCase().charCodeAt(0) }, r.nonEditingKeys = [r.LEFT, r.RIGHT, r.UP, r.DOWN, r.CTRL, r.SHIFT, r.ALT, r.CAPS_LOCK, r.LEFT_COMMAND, r.RIGHT_COMMAND, r.SELECT, r.LEFT_WINDOW, r.RIGHT_WINDOW], r.isEditingKey = function(e) { return -1 === r.nonEditingKeys.indexOf(e) }, t.exports = r }, {}],
        23: [function(e, t, n) {! function(e, n) { "undefined" != typeof t ? t.exports = n() : "function" == typeof define && "object" == typeof define.amd ? define(n) : this[e] = n() }("domready", function() { var e, t = [],
                    n = document,
                    r = n.documentElement.doScroll,
                    o = "DOMContentLoaded",
                    i = (r ? /^loaded|^c/ : /^loaded|^i|^c/).test(n.readyState); return i || n.addEventListener(o, e = function() { for (n.removeEventListener(o, e), i = 1; e = t.shift();) e() }),
                    function(e) { i ? setTimeout(e, 0) : t.push(e) } }) }, {}],
        24: [function(e, t, n) {
            ! function(e, n) { "object" == typeof t && "object" == typeof t.exports ? t.exports = e.document ? n(e, !0) : function(e) { if (!e.document) throw new Error("jQuery requires a window with a document"); return n(e) } : n(e) }("undefined" != typeof window ? window : this, function(e, t) {
                function n(e) { var t = "length" in e && e.length,
                        n = Z.type(e); return "function" === n || Z.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e }

                function r(e, t, n) { if (Z.isFunction(t)) return Z.grep(e, function(e, r) { return !!t.call(e, r, e) !== n }); if (t.nodeType) return Z.grep(e, function(e) { return e === t !== n }); if ("string" == typeof t) { if (ae.test(t)) return Z.filter(t, e, n);
                        t = Z.filter(t, e) } return Z.grep(e, function(e) { return z.call(t, e) >= 0 !== n }) }

                function o(e, t) { for (;
                        (e = e[t]) && 1 !== e.nodeType;); return e }

                function i(e) { var t = de[e] = {}; return Z.each(e.match(fe) || [], function(e, n) { t[n] = !0 }), t }

                function s() { V.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1), Z.ready() }

                function a() { Object.defineProperty(this.cache = {}, 0, { get: function() { return {} } }), this.expando = Z.expando + a.uid++ }

                function u(e, t, n) { var r; if (void 0 === n && 1 === e.nodeType)
                        if (r = "data-" + t.replace(be, "-$1").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) { try { n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : xe.test(n) ? Z.parseJSON(n) : n } catch (o) {}
                            ve.set(e, t, n) } else n = void 0;
                    return n }

                function l() { return !0 }

                function c() { return !1 }

                function p() { try { return V.activeElement } catch (e) {} }

                function h(e, t) { return Z.nodeName(e, "table") && Z.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e }

                function f(e) { return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e }

                function d(e) { var t = Oe.exec(e.type); return t ? e.type = t[1] : e.removeAttribute("type"), e }

                function g(e, t) { for (var n = 0, r = e.length; r > n; n++) ye.set(e[n], "globalEval", !t || ye.get(t[n], "globalEval")) }

                function m(e, t) { var n, r, o, i, s, a, u, l; if (1 === t.nodeType) { if (ye.hasData(e) && (i = ye.access(e), s = ye.set(t, i), l = i.events)) { delete s.handle, s.events = {}; for (o in l)
                                for (n = 0, r = l[o].length; r > n; n++) Z.event.add(t, o, l[o][n]) }
                        ve.hasData(e) && (a = ve.access(e), u = Z.extend({}, a), ve.set(t, u)) } }

                function y(e, t) { var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : []; return void 0 === t || t && Z.nodeName(e, t) ? Z.merge([e], n) : n }

                function v(e, t) { var n = t.nodeName.toLowerCase(); "input" === n && ke.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue) }

                function x(t, n) { var r, o = Z(n.createElement(t)).appendTo(n.body),
                        i = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(o[0])) ? r.display : Z.css(o[0], "display"); return o.detach(), i }

                function b(e) { var t = V,
                        n = qe[e]; return n || (n = x(e, t), "none" !== n && n || (Ie = (Ie || Z("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Ie[0].contentDocument, t.write(), t.close(), n = x(e, t), Ie.detach()), qe[e] = n), n }

                function C(e, t, n) { var r, o, i, s, a = e.style; return n = n || Ue(e), n && (s = n.getPropertyValue(t) || n[t]), n && ("" !== s || Z.contains(e.ownerDocument, e) || (s = Z.style(e, t)), We.test(s) && Be.test(t) && (r = a.width, o = a.minWidth, i = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = r, a.minWidth = o, a.maxWidth = i)), void 0 !== s ? s + "" : s }

                function w(e, t) { return { get: function() { return e() ? void delete this.get : (this.get = t).apply(this, arguments) } } }

                function T(e, t) { if (t in e) return t; for (var n = t[0].toUpperCase() + t.slice(1), r = t, o = Ke.length; o--;)
                        if (t = Ke[o] + n, t in e) return t;
                    return r }

                function k(e, t, n) { var r = $e.exec(t); return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t }

                function E(e, t, n, r, o) { for (var i = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > i; i += 2) "margin" === n && (s += Z.css(e, n + we[i], !0, o)), r ? ("content" === n && (s -= Z.css(e, "padding" + we[i], !0, o)), "margin" !== n && (s -= Z.css(e, "border" + we[i] + "Width", !0, o))) : (s += Z.css(e, "padding" + we[i], !0, o), "padding" !== n && (s += Z.css(e, "border" + we[i] + "Width", !0, o))); return s }

                function S(e, t, n) { var r = !0,
                        o = "width" === t ? e.offsetWidth : e.offsetHeight,
                        i = Ue(e),
                        s = "border-box" === Z.css(e, "boxSizing", !1, i); if (0 >= o || null == o) { if (o = C(e, t, i), (0 > o || null == o) && (o = e.style[t]), We.test(o)) return o;
                        r = s && (Q.boxSizingReliable() || o === e.style[t]), o = parseFloat(o) || 0 } return o + E(e, t, n || (s ? "border" : "content"), r, i) + "px" }

                function N(e, t) { for (var n, r, o, i = [], s = 0, a = e.length; a > s; s++) r = e[s], r.style && (i[s] = ye.get(r, "olddisplay"), n = r.style.display, t ? (i[s] || "none" !== n || (r.style.display = ""), "" === r.style.display && Te(r) && (i[s] = ye.access(r, "olddisplay", b(r.nodeName)))) : (o = Te(r), "none" === n && o || ye.set(r, "olddisplay", o ? n : Z.css(r, "display")))); for (s = 0; a > s; s++) r = e[s], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? i[s] || "" : "none")); return e }

                function D(e, t, n, r, o) { return new D.prototype.init(e, t, n, r, o) }

                function j() { return setTimeout(function() { Qe = void 0 }), Qe = Z.now() }

                function M(e, t) { var n, r = 0,
                        o = { height: e }; for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = we[r], o["margin" + n] = o["padding" + n] = e; return t && (o.opacity = o.width = e), o }

                function P(e, t, n) { for (var r, o = (nt[t] || []).concat(nt["*"]), i = 0, s = o.length; s > i; i++)
                        if (r = o[i].call(n, t, e)) return r }

                function A(e, t, n) { var r, o, i, s, a, u, l, c, p = this,
                        h = {},
                        f = e.style,
                        d = e.nodeType && Te(e),
                        g = ye.get(e, "fxshow");
                    n.queue || (a = Z._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, u = a.empty.fire, a.empty.fire = function() { a.unqueued || u() }), a.unqueued++, p.always(function() { p.always(function() { a.unqueued--, Z.queue(e, "fx").length || a.empty.fire() }) })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], l = Z.css(e, "display"), c = "none" === l ? ye.get(e, "olddisplay") || b(e.nodeName) : l, "inline" === c && "none" === Z.css(e, "float") && (f.display = "inline-block")), n.overflow && (f.overflow = "hidden", p.always(function() { f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2] })); for (r in t)
                        if (o = t[r], Je.exec(o)) { if (delete t[r], i = i || "toggle" === o, o === (d ? "hide" : "show")) { if ("show" !== o || !g || void 0 === g[r]) continue;
                                d = !0 }
                            h[r] = g && g[r] || Z.style(e, r) } else l = void 0;
                    if (Z.isEmptyObject(h)) "inline" === ("none" === l ? b(e.nodeName) : l) && (f.display = l);
                    else { g ? "hidden" in g && (d = g.hidden) : g = ye.access(e, "fxshow", {}), i && (g.hidden = !d), d ? Z(e).show() : p.done(function() { Z(e).hide() }), p.done(function() { var t;
                            ye.remove(e, "fxshow"); for (t in h) Z.style(e, t, h[t]) }); for (r in h) s = P(d ? g[r] : 0, r, p), r in g || (g[r] = s.start, d && (s.end = s.start, s.start = "width" === r || "height" === r ? 1 : 0)) } }

                function L(e, t) { var n, r, o, i, s; for (n in e)
                        if (r = Z.camelCase(n), o = t[r], i = e[n], Z.isArray(i) && (o = i[1], i = e[n] = i[0]), n !== r && (e[r] = i, delete e[n]), s = Z.cssHooks[r], s && "expand" in s) { i = s.expand(i), delete e[r]; for (n in i) n in e || (e[n] = i[n], t[n] = o) } else t[r] = o }

                function F(e, t, n) { var r, o, i = 0,
                        s = tt.length,
                        a = Z.Deferred().always(function() { delete u.elem }),
                        u = function() { if (o) return !1; for (var t = Qe || j(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, i = 1 - r, s = 0, u = l.tweens.length; u > s; s++) l.tweens[s].run(i); return a.notifyWith(e, [l, i, n]), 1 > i && u ? n : (a.resolveWith(e, [l]), !1) },
                        l = a.promise({ elem: e, props: Z.extend({}, t), opts: Z.extend(!0, { specialEasing: {} }, n), originalProperties: t, originalOptions: n, startTime: Qe || j(), duration: n.duration, tweens: [], createTween: function(t, n) { var r = Z.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing); return l.tweens.push(r), r }, stop: function(t) { var n = 0,
                                    r = t ? l.tweens.length : 0; if (o) return this; for (o = !0; r > n; n++) l.tweens[n].run(1); return t ? a.resolveWith(e, [l, t]) : a.rejectWith(e, [l, t]), this } }),
                        c = l.props; for (L(c, l.opts.specialEasing); s > i; i++)
                        if (r = tt[i].call(l, e, c, l.opts)) return r;
                    return Z.map(c, P, l), Z.isFunction(l.opts.start) && l.opts.start.call(e, l), Z.fx.timer(Z.extend(u, { elem: e, anim: l, queue: l.opts.queue })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always) }

                function H(e) { return function(t, n) { "string" != typeof t && (n = t, t = "*"); var r, o = 0,
                            i = t.toLowerCase().match(fe) || []; if (Z.isFunction(n))
                            for (; r = i[o++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n) } }

                function O(e, t, n, r) {
                    function o(a) { var u; return i[a] = !0, Z.each(e[a] || [], function(e, a) { var l = a(t, n, r); return "string" != typeof l || s || i[l] ? s ? !(u = l) : void 0 : (t.dataTypes.unshift(l), o(l), !1) }), u } var i = {},
                        s = e === xt; return o(t.dataTypes[0]) || !i["*"] && o("*") }

                function _(e, t) { var n, r, o = Z.ajaxSettings.flatOptions || {}; for (n in t) void 0 !== t[n] && ((o[n] ? e : r || (r = {}))[n] = t[n]); return r && Z.extend(!0, e, r), e }

                function R(e, t, n) { for (var r, o, i, s, a = e.contents, u = e.dataTypes;
                        "*" === u[0];) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type")); if (r)
                        for (o in a)
                            if (a[o] && a[o].test(r)) { u.unshift(o); break }
                    if (u[0] in n) i = u[0];
                    else { for (o in n) { if (!u[0] || e.converters[o + " " + u[0]]) { i = o; break }
                            s || (s = o) }
                        i = i || s } return i ? (i !== u[0] && u.unshift(i), n[i]) : void 0 }

                function I(e, t, n, r) { var o, i, s, a, u, l = {},
                        c = e.dataTypes.slice(); if (c[1])
                        for (s in e.converters) l[s.toLowerCase()] = e.converters[s]; for (i = c.shift(); i;)
                        if (e.responseFields[i] && (n[e.responseFields[i]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = i, i = c.shift())
                            if ("*" === i) i = u;
                            else if ("*" !== u && u !== i) { if (s = l[u + " " + i] || l["* " + i], !s)
                            for (o in l)
                                if (a = o.split(" "), a[1] === i && (s = l[u + " " + a[0]] || l["* " + a[0]])) { s === !0 ? s = l[o] : l[o] !== !0 && (i = a[0], c.unshift(a[1])); break }
                        if (s !== !0)
                            if (s && e["throws"]) t = s(t);
                            else try { t = s(t) } catch (p) { return { state: "parsererror", error: s ? p : "No conversion from " + u + " to " + i } } } return { state: "success", data: t } }

                function q(e, t, n, r) { var o; if (Z.isArray(t)) Z.each(t, function(t, o) { n || kt.test(e) ? r(e, o) : q(e + "[" + ("object" == typeof o ? t : "") + "]", o, n, r) });
                    else if (n || "object" !== Z.type(t)) r(e, t);
                    else
                        for (o in t) q(e + "[" + o + "]", t[o], n, r) }

                function B(e) { return Z.isWindow(e) ? e : 9 === e.nodeType && e.defaultView }
                var W = [],
                    U = W.slice,
                    G = W.concat,
                    $ = W.push,
                    z = W.indexOf,
                    Y = {},
                    X = Y.toString,
                    K = Y.hasOwnProperty,
                    Q = {},
                    V = e.document,
                    J = "2.1.4",
                    Z = function(e, t) { return new Z.fn.init(e, t) },
                    ee = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                    te = /^-ms-/,
                    ne = /-([\da-z])/gi,
                    re = function(e, t) { return t.toUpperCase() };
                Z.fn = Z.prototype = { jquery: J, constructor: Z, selector: "", length: 0, toArray: function() { return U.call(this) }, get: function(e) { return null != e ? 0 > e ? this[e + this.length] : this[e] : U.call(this) }, pushStack: function(e) { var t = Z.merge(this.constructor(), e); return t.prevObject = this, t.context = this.context, t }, each: function(e, t) { return Z.each(this, e, t) }, map: function(e) { return this.pushStack(Z.map(this, function(t, n) { return e.call(t, n, t) })) }, slice: function() { return this.pushStack(U.apply(this, arguments)) }, first: function() { return this.eq(0) }, last: function() { return this.eq(-1) }, eq: function(e) { var t = this.length,
                            n = +e + (0 > e ? t : 0); return this.pushStack(n >= 0 && t > n ? [this[n]] : []) }, end: function() { return this.prevObject || this.constructor(null) }, push: $, sort: W.sort, splice: W.splice }, Z.extend = Z.fn.extend = function() { var e, t, n, r, o, i, s = arguments[0] || {},
                        a = 1,
                        u = arguments.length,
                        l = !1; for ("boolean" == typeof s && (l = s, s = arguments[a] || {}, a++), "object" == typeof s || Z.isFunction(s) || (s = {}), a === u && (s = this, a--); u > a; a++)
                        if (null != (e = arguments[a]))
                            for (t in e) n = s[t], r = e[t], s !== r && (l && r && (Z.isPlainObject(r) || (o = Z.isArray(r))) ? (o ? (o = !1, i = n && Z.isArray(n) ? n : []) : i = n && Z.isPlainObject(n) ? n : {}, s[t] = Z.extend(l, i, r)) : void 0 !== r && (s[t] = r));
                    return s }, Z.extend({ expando: "jQuery" + (J + Math.random()).replace(/\D/g, ""), isReady: !0, error: function(e) { throw new Error(e) }, noop: function() {}, isFunction: function(e) { return "function" === Z.type(e) }, isArray: Array.isArray, isWindow: function(e) { return null != e && e === e.window }, isNumeric: function(e) { return !Z.isArray(e) && e - parseFloat(e) + 1 >= 0 }, isPlainObject: function(e) { return "object" !== Z.type(e) || e.nodeType || Z.isWindow(e) ? !1 : e.constructor && !K.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0 }, isEmptyObject: function(e) { var t; for (t in e) return !1; return !0 }, type: function(e) { return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Y[X.call(e)] || "object" : typeof e }, globalEval: function(e) { var t, n = eval;
                        e = Z.trim(e), e && (1 === e.indexOf("use strict") ? (t = V.createElement("script"), t.text = e, V.head.appendChild(t).parentNode.removeChild(t)) : n(e)) }, camelCase: function(e) { return e.replace(te, "ms-").replace(ne, re) }, nodeName: function(e, t) { return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase() }, each: function(e, t, r) { var o, i = 0,
                            s = e.length,
                            a = n(e); if (r) { if (a)
                                for (; s > i && (o = t.apply(e[i], r), o !== !1); i++);
                            else
                                for (i in e)
                                    if (o = t.apply(e[i], r), o === !1) break } else if (a)
                            for (; s > i && (o = t.call(e[i], i, e[i]), o !== !1); i++);
                        else
                            for (i in e)
                                if (o = t.call(e[i], i, e[i]), o === !1) break; return e }, trim: function(e) { return null == e ? "" : (e + "").replace(ee, "") }, makeArray: function(e, t) { var r = t || []; return null != e && (n(Object(e)) ? Z.merge(r, "string" == typeof e ? [e] : e) : $.call(r, e)), r }, inArray: function(e, t, n) { return null == t ? -1 : z.call(t, e, n) }, merge: function(e, t) { for (var n = +t.length, r = 0, o = e.length; n > r; r++) e[o++] = t[r]; return e.length = o, e }, grep: function(e, t, n) { for (var r, o = [], i = 0, s = e.length, a = !n; s > i; i++) r = !t(e[i], i), r !== a && o.push(e[i]); return o }, map: function(e, t, r) { var o, i = 0,
                            s = e.length,
                            a = n(e),
                            u = []; if (a)
                            for (; s > i; i++) o = t(e[i], i, r), null != o && u.push(o);
                        else
                            for (i in e) o = t(e[i], i, r), null != o && u.push(o); return G.apply([], u) }, guid: 1, proxy: function(e, t) { var n, r, o; return "string" == typeof t && (n = e[t], t = e, e = n), Z.isFunction(e) ? (r = U.call(arguments, 2), o = function() { return e.apply(t || this, r.concat(U.call(arguments))) }, o.guid = e.guid = e.guid || Z.guid++, o) : void 0 }, now: Date.now, support: Q }), Z.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) { Y["[object " + t + "]"] = t.toLowerCase() });
                var oe = function(e) {
                    function t(e, t, n, r) { var o, i, s, a, u, l, p, f, d, g; if ((t ? t.ownerDocument || t : q) !== A && P(t), t = t || A, n = n || [], a = t.nodeType, "string" != typeof e || !e || 1 !== a && 9 !== a && 11 !== a) return n; if (!r && F) { if (11 !== a && (o = ve.exec(e)))
                                if (s = o[1]) { if (9 === a) { if (i = t.getElementById(s), !i || !i.parentNode) return n; if (i.id === s) return n.push(i), n } else if (t.ownerDocument && (i = t.ownerDocument.getElementById(s)) && R(t, i) && i.id === s) return n.push(i), n } else { if (o[2]) return J.apply(n, t.getElementsByTagName(e)), n; if ((s = o[3]) && C.getElementsByClassName) return J.apply(n, t.getElementsByClassName(s)), n }
                            if (C.qsa && (!H || !H.test(e))) { if (f = p = I, d = t, g = 1 !== a && e, 1 === a && "object" !== t.nodeName.toLowerCase()) { for (l = E(e), (p = t.getAttribute("id")) ? f = p.replace(be, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", u = l.length; u--;) l[u] = f + h(l[u]);
                                    d = xe.test(e) && c(t.parentNode) || t, g = l.join(",") } if (g) try { return J.apply(n, d.querySelectorAll(g)), n } catch (m) {} finally { p || t.removeAttribute("id") } } } return N(e.replace(ue, "$1"), t, n, r) }

                    function n() {
                        function e(n, r) { return t.push(n + " ") > w.cacheLength && delete e[t.shift()], e[n + " "] = r } var t = []; return e }

                    function r(e) { return e[I] = !0, e }

                    function o(e) { var t = A.createElement("div"); try { return !!e(t) } catch (n) { return !1 } finally { t.parentNode && t.parentNode.removeChild(t), t = null } }

                    function i(e, t) { for (var n = e.split("|"), r = e.length; r--;) w.attrHandle[n[r]] = t }

                    function s(e, t) { var n = t && e,
                            r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Y) - (~e.sourceIndex || Y); if (r) return r; if (n)
                            for (; n = n.nextSibling;)
                                if (n === t) return -1;
                        return e ? 1 : -1 }

                    function a(e) { return function(t) { var n = t.nodeName.toLowerCase(); return "input" === n && t.type === e } }

                    function u(e) { return function(t) { var n = t.nodeName.toLowerCase(); return ("input" === n || "button" === n) && t.type === e } }

                    function l(e) { return r(function(t) { return t = +t, r(function(n, r) { for (var o, i = e([], n.length, t), s = i.length; s--;) n[o = i[s]] && (n[o] = !(r[o] = n[o])) }) }) }

                    function c(e) { return e && "undefined" != typeof e.getElementsByTagName && e }

                    function p() {}

                    function h(e) { for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value; return r }

                    function f(e, t, n) { var r = t.dir,
                            o = n && "parentNode" === r,
                            i = W++; return t.first ? function(t, n, i) { for (; t = t[r];)
                                if (1 === t.nodeType || o) return e(t, n, i) } : function(t, n, s) { var a, u, l = [B, i]; if (s) { for (; t = t[r];)
                                    if ((1 === t.nodeType || o) && e(t, n, s)) return !0 } else
                                for (; t = t[r];)
                                    if (1 === t.nodeType || o) { if (u = t[I] || (t[I] = {}), (a = u[r]) && a[0] === B && a[1] === i) return l[2] = a[2]; if (u[r] = l, l[2] = e(t, n, s)) return !0 } } }

                    function d(e) { return e.length > 1 ? function(t, n, r) { for (var o = e.length; o--;)
                                if (!e[o](t, n, r)) return !1;
                            return !0 } : e[0] }

                    function g(e, n, r) { for (var o = 0, i = n.length; i > o; o++) t(e, n[o], r); return r }

                    function m(e, t, n, r, o) { for (var i, s = [], a = 0, u = e.length, l = null != t; u > a; a++)(i = e[a]) && (!n || n(i, r, o)) && (s.push(i), l && t.push(a)); return s }

                    function y(e, t, n, o, i, s) { return o && !o[I] && (o = y(o)), i && !i[I] && (i = y(i, s)), r(function(r, s, a, u) { var l, c, p, h = [],
                                f = [],
                                d = s.length,
                                y = r || g(t || "*", a.nodeType ? [a] : a, []),
                                v = !e || !r && t ? y : m(y, h, e, a, u),
                                x = n ? i || (r ? e : d || o) ? [] : s : v; if (n && n(v, x, a, u), o)
                                for (l = m(x, f), o(l, [], a, u), c = l.length; c--;)(p = l[c]) && (x[f[c]] = !(v[f[c]] = p)); if (r) { if (i || e) { if (i) { for (l = [], c = x.length; c--;)(p = x[c]) && l.push(v[c] = p);
                                        i(null, x = [], l, u) } for (c = x.length; c--;)(p = x[c]) && (l = i ? ee(r, p) : h[c]) > -1 && (r[l] = !(s[l] = p)) } } else x = m(x === s ? x.splice(d, x.length) : x), i ? i(null, s, x, u) : J.apply(s, x) }) }

                    function v(e) { for (var t, n, r, o = e.length, i = w.relative[e[0].type], s = i || w.relative[" "], a = i ? 1 : 0, u = f(function(e) { return e === t }, s, !0), l = f(function(e) { return ee(t, e) > -1 }, s, !0), c = [function(e, n, r) { var o = !i && (r || n !== D) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r)); return t = null, o }]; o > a; a++)
                            if (n = w.relative[e[a].type]) c = [f(d(c), n)];
                            else { if (n = w.filter[e[a].type].apply(null, e[a].matches), n[I]) { for (r = ++a; o > r && !w.relative[e[r].type]; r++); return y(a > 1 && d(c), a > 1 && h(e.slice(0, a - 1).concat({ value: " " === e[a - 2].type ? "*" : "" })).replace(ue, "$1"), n, r > a && v(e.slice(a, r)), o > r && v(e = e.slice(r)), o > r && h(e)) }
                                c.push(n) }
                        return d(c) }

                    function x(e, n) { var o = n.length > 0,
                            i = e.length > 0,
                            s = function(r, s, a, u, l) { var c, p, h, f = 0,
                                    d = "0",
                                    g = r && [],
                                    y = [],
                                    v = D,
                                    x = r || i && w.find.TAG("*", l),
                                    b = B += null == v ? 1 : Math.random() || .1,
                                    C = x.length; for (l && (D = s !== A && s); d !== C && null != (c = x[d]); d++) { if (i && c) { for (p = 0; h = e[p++];)
                                            if (h(c, s, a)) { u.push(c); break }
                                        l && (B = b) }
                                    o && ((c = !h && c) && f--, r && g.push(c)) } if (f += d, o && d !== f) { for (p = 0; h = n[p++];) h(g, y, s, a); if (r) { if (f > 0)
                                            for (; d--;) g[d] || y[d] || (y[d] = Q.call(u));
                                        y = m(y) }
                                    J.apply(u, y), l && !r && y.length > 0 && f + n.length > 1 && t.uniqueSort(u) } return l && (B = b, D = v), g }; return o ? r(s) : s }
                    var b, C, w, T, k, E, S, N, D, j, M, P, A, L, F, H, O, _, R, I = "sizzle" + 1 * new Date,
                        q = e.document,
                        B = 0,
                        W = 0,
                        U = n(),
                        G = n(),
                        $ = n(),
                        z = function(e, t) { return e === t && (M = !0), 0 },
                        Y = 1 << 31,
                        X = {}.hasOwnProperty,
                        K = [],
                        Q = K.pop,
                        V = K.push,
                        J = K.push,
                        Z = K.slice,
                        ee = function(e, t) { for (var n = 0, r = e.length; r > n; n++)
                                if (e[n] === t) return n;
                            return -1 },
                        te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                        ne = "[\\x20\\t\\r\\n\\f]",
                        re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                        oe = re.replace("w", "w#"),
                        ie = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + oe + "))|)" + ne + "*\\]",
                        se = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)",
                        ae = new RegExp(ne + "+", "g"),
                        ue = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
                        le = new RegExp("^" + ne + "*," + ne + "*"),
                        ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
                        pe = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
                        he = new RegExp(se),
                        fe = new RegExp("^" + oe + "$"),
                        de = { ID: new RegExp("^#(" + re + ")"), CLASS: new RegExp("^\\.(" + re + ")"), TAG: new RegExp("^(" + re.replace("w", "w*") + ")"), ATTR: new RegExp("^" + ie), PSEUDO: new RegExp("^" + se), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"), bool: new RegExp("^(?:" + te + ")$", "i"), needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i") },
                        ge = /^(?:input|select|textarea|button)$/i,
                        me = /^h\d$/i,
                        ye = /^[^{]+\{\s*\[native \w/,
                        ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                        xe = /[+~]/,
                        be = /'|\\/g,
                        Ce = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
                        we = function(e, t, n) { var r = "0x" + t - 65536; return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320) },
                        Te = function() { P() };
                    try { J.apply(K = Z.call(q.childNodes), q.childNodes), K[q.childNodes.length].nodeType } catch (ke) { J = { apply: K.length ? function(e, t) { V.apply(e, Z.call(t)) } : function(e, t) { for (var n = e.length, r = 0; e[n++] = t[r++];);
                                e.length = n - 1 } } }
                    C = t.support = {}, k = t.isXML = function(e) { var t = e && (e.ownerDocument || e).documentElement; return t ? "HTML" !== t.nodeName : !1 }, P = t.setDocument = function(e) { var t, n, r = e ? e.ownerDocument || e : q; return r !== A && 9 === r.nodeType && r.documentElement ? (A = r, L = r.documentElement, n = r.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", Te, !1) : n.attachEvent && n.attachEvent("onunload", Te)), F = !k(r), C.attributes = o(function(e) { return e.className = "i", !e.getAttribute("className") }), C.getElementsByTagName = o(function(e) { return e.appendChild(r.createComment("")), !e.getElementsByTagName("*").length }), C.getElementsByClassName = ye.test(r.getElementsByClassName), C.getById = o(function(e) { return L.appendChild(e).id = I, !r.getElementsByName || !r.getElementsByName(I).length }), C.getById ? (w.find.ID = function(e, t) { if ("undefined" != typeof t.getElementById && F) { var n = t.getElementById(e); return n && n.parentNode ? [n] : [] } }, w.filter.ID = function(e) { var t = e.replace(Ce, we); return function(e) { return e.getAttribute("id") === t } }) : (delete w.find.ID, w.filter.ID = function(e) { var t = e.replace(Ce, we); return function(e) { var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id"); return n && n.value === t } }), w.find.TAG = C.getElementsByTagName ? function(e, t) { return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : C.qsa ? t.querySelectorAll(e) : void 0 } : function(e, t) { var n, r = [],
                                o = 0,
                                i = t.getElementsByTagName(e); if ("*" === e) { for (; n = i[o++];) 1 === n.nodeType && r.push(n); return r } return i }, w.find.CLASS = C.getElementsByClassName && function(e, t) { return F ? t.getElementsByClassName(e) : void 0 }, O = [], H = [], (C.qsa = ye.test(r.querySelectorAll)) && (o(function(e) { L.appendChild(e).innerHTML = "<a id='" + I + "'></a><select id='" + I + "-\f]' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && H.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || H.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + I + "-]").length || H.push("~="), e.querySelectorAll(":checked").length || H.push(":checked"), e.querySelectorAll("a#" + I + "+*").length || H.push(".#.+[+~]") }), o(function(e) { var t = r.createElement("input");
                            t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && H.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || H.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), H.push(",.*:") })), (C.matchesSelector = ye.test(_ = L.matches || L.webkitMatchesSelector || L.mozMatchesSelector || L.oMatchesSelector || L.msMatchesSelector)) && o(function(e) { C.disconnectedMatch = _.call(e, "div"), _.call(e, "[s!='']:x"), O.push("!=", se) }), H = H.length && new RegExp(H.join("|")), O = O.length && new RegExp(O.join("|")), t = ye.test(L.compareDocumentPosition), R = t || ye.test(L.contains) ? function(e, t) { var n = 9 === e.nodeType ? e.documentElement : e,
                                r = t && t.parentNode; return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r))) } : function(e, t) { if (t)
                                for (; t = t.parentNode;)
                                    if (t === e) return !0;
                            return !1 }, z = t ? function(e, t) { if (e === t) return M = !0, 0; var n = !e.compareDocumentPosition - !t.compareDocumentPosition; return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !C.sortDetached && t.compareDocumentPosition(e) === n ? e === r || e.ownerDocument === q && R(q, e) ? -1 : t === r || t.ownerDocument === q && R(q, t) ? 1 : j ? ee(j, e) - ee(j, t) : 0 : 4 & n ? -1 : 1) } : function(e, t) { if (e === t) return M = !0, 0; var n, o = 0,
                                i = e.parentNode,
                                a = t.parentNode,
                                u = [e],
                                l = [t]; if (!i || !a) return e === r ? -1 : t === r ? 1 : i ? -1 : a ? 1 : j ? ee(j, e) - ee(j, t) : 0; if (i === a) return s(e, t); for (n = e; n = n.parentNode;) u.unshift(n); for (n = t; n = n.parentNode;) l.unshift(n); for (; u[o] === l[o];) o++; return o ? s(u[o], l[o]) : u[o] === q ? -1 : l[o] === q ? 1 : 0 }, r) : A }, t.matches = function(e, n) { return t(e, null, null, n) }, t.matchesSelector = function(e, n) { if ((e.ownerDocument || e) !== A && P(e), n = n.replace(pe, "='$1']"), C.matchesSelector && F && (!O || !O.test(n)) && (!H || !H.test(n))) try { var r = _.call(e, n); if (r || C.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r } catch (o) {}
                        return t(n, A, null, [e]).length > 0 }, t.contains = function(e, t) { return (e.ownerDocument || e) !== A && P(e), R(e, t) }, t.attr = function(e, t) {
                        (e.ownerDocument || e) !== A && P(e); var n = w.attrHandle[t.toLowerCase()],
                            r = n && X.call(w.attrHandle, t.toLowerCase()) ? n(e, t, !F) : void 0; return void 0 !== r ? r : C.attributes || !F ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null }, t.error = function(e) { throw new Error("Syntax error, unrecognized expression: " + e) }, t.uniqueSort = function(e) { var t, n = [],
                            r = 0,
                            o = 0; if (M = !C.detectDuplicates, j = !C.sortStable && e.slice(0), e.sort(z), M) { for (; t = e[o++];) t === e[o] && (r = n.push(o)); for (; r--;) e.splice(n[r], 1) } return j = null, e }, T = t.getText = function(e) { var t, n = "",
                            r = 0,
                            o = e.nodeType; if (o) { if (1 === o || 9 === o || 11 === o) { if ("string" == typeof e.textContent) return e.textContent; for (e = e.firstChild; e; e = e.nextSibling) n += T(e) } else if (3 === o || 4 === o) return e.nodeValue } else
                            for (; t = e[r++];) n += T(t); return n }, w = t.selectors = {
                        cacheLength: 50,
                        createPseudo: r,
                        match: de,
                        attrHandle: {},
                        find: {},
                        relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
                        preFilter: {
                            ATTR: function(e) { return e[1] = e[1].replace(Ce, we), e[3] = (e[3] || e[4] || e[5] || "").replace(Ce, we), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4) },
                            CHILD: function(e) {
                                return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]),
                                    e
                            },
                            PSEUDO: function(e) { var t, n = !e[6] && e[2]; return de.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && he.test(n) && (t = E(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3)) }
                        },
                        filter: { TAG: function(e) { var t = e.replace(Ce, we).toLowerCase(); return "*" === e ? function() { return !0 } : function(e) { return e.nodeName && e.nodeName.toLowerCase() === t } }, CLASS: function(e) { var t = U[e + " "]; return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && U(e, function(e) { return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "") }) }, ATTR: function(e, n, r) { return function(o) { var i = t.attr(o, e); return null == i ? "!=" === n : n ? (i += "", "=" === n ? i === r : "!=" === n ? i !== r : "^=" === n ? r && 0 === i.indexOf(r) : "*=" === n ? r && i.indexOf(r) > -1 : "$=" === n ? r && i.slice(-r.length) === r : "~=" === n ? (" " + i.replace(ae, " ") + " ").indexOf(r) > -1 : "|=" === n ? i === r || i.slice(0, r.length + 1) === r + "-" : !1) : !0 } }, CHILD: function(e, t, n, r, o) { var i = "nth" !== e.slice(0, 3),
                                    s = "last" !== e.slice(-4),
                                    a = "of-type" === t; return 1 === r && 0 === o ? function(e) { return !!e.parentNode } : function(t, n, u) { var l, c, p, h, f, d, g = i !== s ? "nextSibling" : "previousSibling",
                                        m = t.parentNode,
                                        y = a && t.nodeName.toLowerCase(),
                                        v = !u && !a; if (m) { if (i) { for (; g;) { for (p = t; p = p[g];)
                                                    if (a ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1;
                                                d = g = "only" === e && !d && "nextSibling" } return !0 } if (d = [s ? m.firstChild : m.lastChild], s && v) { for (c = m[I] || (m[I] = {}), l = c[e] || [], f = l[0] === B && l[1], h = l[0] === B && l[2], p = f && m.childNodes[f]; p = ++f && p && p[g] || (h = f = 0) || d.pop();)
                                                if (1 === p.nodeType && ++h && p === t) { c[e] = [B, f, h]; break } } else if (v && (l = (t[I] || (t[I] = {}))[e]) && l[0] === B) h = l[1];
                                        else
                                            for (;
                                                (p = ++f && p && p[g] || (h = f = 0) || d.pop()) && ((a ? p.nodeName.toLowerCase() !== y : 1 !== p.nodeType) || !++h || (v && ((p[I] || (p[I] = {}))[e] = [B, h]), p !== t));); return h -= o, h === r || h % r === 0 && h / r >= 0 } } }, PSEUDO: function(e, n) { var o, i = w.pseudos[e] || w.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e); return i[I] ? i(n) : i.length > 1 ? (o = [e, e, "", n], w.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) { for (var r, o = i(e, n), s = o.length; s--;) r = ee(e, o[s]), e[r] = !(t[r] = o[s]) }) : function(e) { return i(e, 0, o) }) : i } },
                        pseudos: { not: r(function(e) { var t = [],
                                    n = [],
                                    o = S(e.replace(ue, "$1")); return o[I] ? r(function(e, t, n, r) { for (var i, s = o(e, null, r, []), a = e.length; a--;)(i = s[a]) && (e[a] = !(t[a] = i)) }) : function(e, r, i) { return t[0] = e, o(t, null, i, n), t[0] = null, !n.pop() } }), has: r(function(e) { return function(n) { return t(e, n).length > 0 } }), contains: r(function(e) { return e = e.replace(Ce, we),
                                    function(t) { return (t.textContent || t.innerText || T(t)).indexOf(e) > -1 } }), lang: r(function(e) { return fe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(Ce, we).toLowerCase(),
                                    function(t) { var n;
                                        do
                                            if (n = F ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                                        return !1 } }), target: function(t) { var n = e.location && e.location.hash; return n && n.slice(1) === t.id }, root: function(e) { return e === L }, focus: function(e) { return e === A.activeElement && (!A.hasFocus || A.hasFocus()) && !!(e.type || e.href || ~e.tabIndex) }, enabled: function(e) { return e.disabled === !1 }, disabled: function(e) { return e.disabled === !0 }, checked: function(e) { var t = e.nodeName.toLowerCase(); return "input" === t && !!e.checked || "option" === t && !!e.selected }, selected: function(e) { return e.parentNode && e.parentNode.selectedIndex, e.selected === !0 }, empty: function(e) { for (e = e.firstChild; e; e = e.nextSibling)
                                    if (e.nodeType < 6) return !1;
                                return !0 }, parent: function(e) { return !w.pseudos.empty(e) }, header: function(e) { return me.test(e.nodeName) }, input: function(e) { return ge.test(e.nodeName) }, button: function(e) { var t = e.nodeName.toLowerCase(); return "input" === t && "button" === e.type || "button" === t }, text: function(e) { var t; return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase()) }, first: l(function() { return [0] }), last: l(function(e, t) { return [t - 1] }), eq: l(function(e, t, n) { return [0 > n ? n + t : n] }), even: l(function(e, t) { for (var n = 0; t > n; n += 2) e.push(n); return e }), odd: l(function(e, t) { for (var n = 1; t > n; n += 2) e.push(n); return e }), lt: l(function(e, t, n) { for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r); return e }), gt: l(function(e, t, n) { for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r); return e }) }
                    }, w.pseudos.nth = w.pseudos.eq;
                    for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) w.pseudos[b] = a(b);
                    for (b in { submit: !0, reset: !0 }) w.pseudos[b] = u(b);
                    return p.prototype = w.filters = w.pseudos, w.setFilters = new p, E = t.tokenize = function(e, n) { var r, o, i, s, a, u, l, c = G[e + " "]; if (c) return n ? 0 : c.slice(0); for (a = e, u = [], l = w.preFilter; a;) {
                            (!r || (o = le.exec(a))) && (o && (a = a.slice(o[0].length) || a), u.push(i = [])), r = !1, (o = ce.exec(a)) && (r = o.shift(), i.push({ value: r, type: o[0].replace(ue, " ") }), a = a.slice(r.length)); for (s in w.filter) !(o = de[s].exec(a)) || l[s] && !(o = l[s](o)) || (r = o.shift(), i.push({ value: r, type: s, matches: o }), a = a.slice(r.length)); if (!r) break } return n ? a.length : a ? t.error(e) : G(e, u).slice(0) }, S = t.compile = function(e, t) { var n, r = [],
                            o = [],
                            i = $[e + " "]; if (!i) { for (t || (t = E(e)), n = t.length; n--;) i = v(t[n]), i[I] ? r.push(i) : o.push(i);
                            i = $(e, x(o, r)), i.selector = e } return i }, N = t.select = function(e, t, n, r) { var o, i, s, a, u, l = "function" == typeof e && e,
                            p = !r && E(e = l.selector || e); if (n = n || [], 1 === p.length) { if (i = p[0] = p[0].slice(0), i.length > 2 && "ID" === (s = i[0]).type && C.getById && 9 === t.nodeType && F && w.relative[i[1].type]) { if (t = (w.find.ID(s.matches[0].replace(Ce, we), t) || [])[0], !t) return n;
                                l && (t = t.parentNode), e = e.slice(i.shift().value.length) } for (o = de.needsContext.test(e) ? 0 : i.length; o-- && (s = i[o], !w.relative[a = s.type]);)
                                if ((u = w.find[a]) && (r = u(s.matches[0].replace(Ce, we), xe.test(i[0].type) && c(t.parentNode) || t))) { if (i.splice(o, 1), e = r.length && h(i), !e) return J.apply(n, r), n; break } } return (l || S(e, p))(r, t, !F, n, xe.test(e) && c(t.parentNode) || t), n }, C.sortStable = I.split("").sort(z).join("") === I, C.detectDuplicates = !!M, P(), C.sortDetached = o(function(e) { return 1 & e.compareDocumentPosition(A.createElement("div")) }), o(function(e) { return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href") }) || i("type|href|height|width", function(e, t, n) { return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2) }), C.attributes && o(function(e) { return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value") }) || i("value", function(e, t, n) { return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue }), o(function(e) { return null == e.getAttribute("disabled") }) || i(te, function(e, t, n) { var r; return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null }), t
                }(e);
                Z.find = oe, Z.expr = oe.selectors, Z.expr[":"] = Z.expr.pseudos, Z.unique = oe.uniqueSort, Z.text = oe.getText, Z.isXMLDoc = oe.isXML, Z.contains = oe.contains;
                var ie = Z.expr.match.needsContext,
                    se = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                    ae = /^.[^:#\[\.,]*$/;
                Z.filter = function(e, t, n) { var r = t[0]; return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? Z.find.matchesSelector(r, e) ? [r] : [] : Z.find.matches(e, Z.grep(t, function(e) { return 1 === e.nodeType })) }, Z.fn.extend({ find: function(e) { var t, n = this.length,
                            r = [],
                            o = this; if ("string" != typeof e) return this.pushStack(Z(e).filter(function() { for (t = 0; n > t; t++)
                                if (Z.contains(o[t], this)) return !0 })); for (t = 0; n > t; t++) Z.find(e, o[t], r); return r = this.pushStack(n > 1 ? Z.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, r }, filter: function(e) { return this.pushStack(r(this, e || [], !1)) }, not: function(e) { return this.pushStack(r(this, e || [], !0)) }, is: function(e) { return !!r(this, "string" == typeof e && ie.test(e) ? Z(e) : e || [], !1).length } });
                var ue, le = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
                    ce = Z.fn.init = function(e, t) { var n, r; if (!e) return this; if ("string" == typeof e) { if (n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : le.exec(e), !n || !n[1] && t) return !t || t.jquery ? (t || ue).find(e) : this.constructor(t).find(e); if (n[1]) { if (t = t instanceof Z ? t[0] : t, Z.merge(this, Z.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : V, !0)), se.test(n[1]) && Z.isPlainObject(t))
                                    for (n in t) Z.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]); return this } return r = V.getElementById(n[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = V, this.selector = e, this } return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : Z.isFunction(e) ? "undefined" != typeof ue.ready ? ue.ready(e) : e(Z) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), Z.makeArray(e, this)) };
                ce.prototype = Z.fn, ue = Z(V);
                var pe = /^(?:parents|prev(?:Until|All))/,
                    he = { children: !0, contents: !0, next: !0, prev: !0 };
                Z.extend({ dir: function(e, t, n) { for (var r = [], o = void 0 !== n;
                            (e = e[t]) && 9 !== e.nodeType;)
                            if (1 === e.nodeType) { if (o && Z(e).is(n)) break;
                                r.push(e) }
                        return r }, sibling: function(e, t) { for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e); return n } }), Z.fn.extend({ has: function(e) { var t = Z(e, this),
                            n = t.length; return this.filter(function() { for (var e = 0; n > e; e++)
                                if (Z.contains(this, t[e])) return !0 }) }, closest: function(e, t) { for (var n, r = 0, o = this.length, i = [], s = ie.test(e) || "string" != typeof e ? Z(e, t || this.context) : 0; o > r; r++)
                            for (n = this[r]; n && n !== t; n = n.parentNode)
                                if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && Z.find.matchesSelector(n, e))) { i.push(n); break }
                        return this.pushStack(i.length > 1 ? Z.unique(i) : i) }, index: function(e) { return e ? "string" == typeof e ? z.call(Z(e), this[0]) : z.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 }, add: function(e, t) { return this.pushStack(Z.unique(Z.merge(this.get(), Z(e, t)))) }, addBack: function(e) { return this.add(null == e ? this.prevObject : this.prevObject.filter(e)) } }), Z.each({ parent: function(e) { var t = e.parentNode; return t && 11 !== t.nodeType ? t : null }, parents: function(e) { return Z.dir(e, "parentNode") }, parentsUntil: function(e, t, n) { return Z.dir(e, "parentNode", n) }, next: function(e) { return o(e, "nextSibling") }, prev: function(e) { return o(e, "previousSibling") }, nextAll: function(e) { return Z.dir(e, "nextSibling") }, prevAll: function(e) { return Z.dir(e, "previousSibling") }, nextUntil: function(e, t, n) { return Z.dir(e, "nextSibling", n) }, prevUntil: function(e, t, n) { return Z.dir(e, "previousSibling", n) }, siblings: function(e) { return Z.sibling((e.parentNode || {}).firstChild, e) }, children: function(e) { return Z.sibling(e.firstChild) }, contents: function(e) { return e.contentDocument || Z.merge([], e.childNodes) } }, function(e, t) { Z.fn[e] = function(n, r) { var o = Z.map(this, t, n); return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (o = Z.filter(r, o)), this.length > 1 && (he[e] || Z.unique(o), pe.test(e) && o.reverse()), this.pushStack(o) } });
                var fe = /\S+/g,
                    de = {};
                Z.Callbacks = function(e) { e = "string" == typeof e ? de[e] || i(e) : Z.extend({}, e); var t, n, r, o, s, a, u = [],
                        l = !e.once && [],
                        c = function(i) { for (t = e.memory && i, n = !0, a = o || 0, o = 0, s = u.length, r = !0; u && s > a; a++)
                                if (u[a].apply(i[0], i[1]) === !1 && e.stopOnFalse) { t = !1; break }
                            r = !1, u && (l ? l.length && c(l.shift()) : t ? u = [] : p.disable()) },
                        p = { add: function() { if (u) { var n = u.length;! function i(t) { Z.each(t, function(t, n) { var r = Z.type(n); "function" === r ? e.unique && p.has(n) || u.push(n) : n && n.length && "string" !== r && i(n) }) }(arguments), r ? s = u.length : t && (o = n, c(t)) } return this }, remove: function() { return u && Z.each(arguments, function(e, t) { for (var n;
                                        (n = Z.inArray(t, u, n)) > -1;) u.splice(n, 1), r && (s >= n && s--, a >= n && a--) }), this }, has: function(e) { return e ? Z.inArray(e, u) > -1 : !(!u || !u.length) }, empty: function() { return u = [], s = 0, this }, disable: function() { return u = l = t = void 0, this }, disabled: function() { return !u }, lock: function() { return l = void 0, t || p.disable(), this }, locked: function() { return !l }, fireWith: function(e, t) { return !u || n && !l || (t = t || [], t = [e, t.slice ? t.slice() : t], r ? l.push(t) : c(t)), this }, fire: function() { return p.fireWith(this, arguments), this }, fired: function() { return !!n } }; return p }, Z.extend({ Deferred: function(e) { var t = [
                                ["resolve", "done", Z.Callbacks("once memory"), "resolved"],
                                ["reject", "fail", Z.Callbacks("once memory"), "rejected"],
                                ["notify", "progress", Z.Callbacks("memory")]
                            ],
                            n = "pending",
                            r = { state: function() { return n }, always: function() { return o.done(arguments).fail(arguments), this }, then: function() { var e = arguments; return Z.Deferred(function(n) { Z.each(t, function(t, i) { var s = Z.isFunction(e[t]) && e[t];
                                            o[i[1]](function() { var e = s && s.apply(this, arguments);
                                                e && Z.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[i[0] + "With"](this === r ? n.promise() : this, s ? [e] : arguments) }) }), e = null }).promise() }, promise: function(e) { return null != e ? Z.extend(e, r) : r } },
                            o = {}; return r.pipe = r.then, Z.each(t, function(e, i) { var s = i[2],
                                a = i[3];
                            r[i[1]] = s.add, a && s.add(function() { n = a }, t[1 ^ e][2].disable, t[2][2].lock), o[i[0]] = function() { return o[i[0] + "With"](this === o ? r : this, arguments), this }, o[i[0] + "With"] = s.fireWith }), r.promise(o), e && e.call(o, o), o }, when: function(e) { var t, n, r, o = 0,
                            i = U.call(arguments),
                            s = i.length,
                            a = 1 !== s || e && Z.isFunction(e.promise) ? s : 0,
                            u = 1 === a ? e : Z.Deferred(),
                            l = function(e, n, r) { return function(o) { n[e] = this, r[e] = arguments.length > 1 ? U.call(arguments) : o, r === t ? u.notifyWith(n, r) : --a || u.resolveWith(n, r) } }; if (s > 1)
                            for (t = new Array(s), n = new Array(s), r = new Array(s); s > o; o++) i[o] && Z.isFunction(i[o].promise) ? i[o].promise().done(l(o, r, i)).fail(u.reject).progress(l(o, n, t)) : --a; return a || u.resolveWith(r, i), u.promise() } });
                var ge;
                Z.fn.ready = function(e) { return Z.ready.promise().done(e), this }, Z.extend({ isReady: !1, readyWait: 1, holdReady: function(e) { e ? Z.readyWait++ : Z.ready(!0) }, ready: function(e) {
                        (e === !0 ? --Z.readyWait : Z.isReady) || (Z.isReady = !0, e !== !0 && --Z.readyWait > 0 || (ge.resolveWith(V, [Z]), Z.fn.triggerHandler && (Z(V).triggerHandler("ready"), Z(V).off("ready")))) } }), Z.ready.promise = function(t) { return ge || (ge = Z.Deferred(), "complete" === V.readyState ? setTimeout(Z.ready) : (V.addEventListener("DOMContentLoaded", s, !1), e.addEventListener("load", s, !1))), ge.promise(t) }, Z.ready.promise();
                var me = Z.access = function(e, t, n, r, o, i, s) { var a = 0,
                        u = e.length,
                        l = null == n; if ("object" === Z.type(n)) { o = !0; for (a in n) Z.access(e, t, a, n[a], !0, i, s) } else if (void 0 !== r && (o = !0, Z.isFunction(r) || (s = !0), l && (s ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) { return l.call(Z(e), n) })), t))
                        for (; u > a; a++) t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n))); return o ? e : l ? t.call(e) : u ? t(e[0], n) : i };
                Z.acceptData = function(e) { return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType }, a.uid = 1, a.accepts = Z.acceptData, a.prototype = { key: function(e) { if (!a.accepts(e)) return 0; var t = {},
                            n = e[this.expando]; if (!n) { n = a.uid++; try { t[this.expando] = { value: n }, Object.defineProperties(e, t) } catch (r) { t[this.expando] = n, Z.extend(e, t) } } return this.cache[n] || (this.cache[n] = {}), n }, set: function(e, t, n) { var r, o = this.key(e),
                            i = this.cache[o]; if ("string" == typeof t) i[t] = n;
                        else if (Z.isEmptyObject(i)) Z.extend(this.cache[o], t);
                        else
                            for (r in t) i[r] = t[r]; return i }, get: function(e, t) { var n = this.cache[this.key(e)]; return void 0 === t ? n : n[t] }, access: function(e, t, n) { var r; return void 0 === t || t && "string" == typeof t && void 0 === n ? (r = this.get(e, t), void 0 !== r ? r : this.get(e, Z.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t) }, remove: function(e, t) { var n, r, o, i = this.key(e),
                            s = this.cache[i]; if (void 0 === t) this.cache[i] = {};
                        else { Z.isArray(t) ? r = t.concat(t.map(Z.camelCase)) : (o = Z.camelCase(t), t in s ? r = [t, o] : (r = o, r = r in s ? [r] : r.match(fe) || [])), n = r.length; for (; n--;) delete s[r[n]] } }, hasData: function(e) { return !Z.isEmptyObject(this.cache[e[this.expando]] || {}) }, discard: function(e) { e[this.expando] && delete this.cache[e[this.expando]] } };
                var ye = new a,
                    ve = new a,
                    xe = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                    be = /([A-Z])/g;
                Z.extend({ hasData: function(e) { return ve.hasData(e) || ye.hasData(e) }, data: function(e, t, n) { return ve.access(e, t, n) }, removeData: function(e, t) { ve.remove(e, t) }, _data: function(e, t, n) { return ye.access(e, t, n) }, _removeData: function(e, t) { ye.remove(e, t) } }), Z.fn.extend({ data: function(e, t) { var n, r, o, i = this[0],
                            s = i && i.attributes; if (void 0 === e) { if (this.length && (o = ve.get(i), 1 === i.nodeType && !ye.get(i, "hasDataAttrs"))) { for (n = s.length; n--;) s[n] && (r = s[n].name, 0 === r.indexOf("data-") && (r = Z.camelCase(r.slice(5)), u(i, r, o[r])));
                                ye.set(i, "hasDataAttrs", !0) } return o } return "object" == typeof e ? this.each(function() { ve.set(this, e) }) : me(this, function(t) { var n, r = Z.camelCase(e); if (i && void 0 === t) { if (n = ve.get(i, e), void 0 !== n) return n; if (n = ve.get(i, r), void 0 !== n) return n; if (n = u(i, r, void 0), void 0 !== n) return n } else this.each(function() { var n = ve.get(this, r);
                                ve.set(this, r, t), -1 !== e.indexOf("-") && void 0 !== n && ve.set(this, e, t) }) }, null, t, arguments.length > 1, null, !0) }, removeData: function(e) { return this.each(function() { ve.remove(this, e) }) } }), Z.extend({ queue: function(e, t, n) { var r; return e ? (t = (t || "fx") + "queue", r = ye.get(e, t), n && (!r || Z.isArray(n) ? r = ye.access(e, t, Z.makeArray(n)) : r.push(n)), r || []) : void 0 }, dequeue: function(e, t) { t = t || "fx"; var n = Z.queue(e, t),
                            r = n.length,
                            o = n.shift(),
                            i = Z._queueHooks(e, t),
                            s = function() { Z.dequeue(e, t) }; "inprogress" === o && (o = n.shift(), r--), o && ("fx" === t && n.unshift("inprogress"), delete i.stop, o.call(e, s, i)), !r && i && i.empty.fire() }, _queueHooks: function(e, t) { var n = t + "queueHooks"; return ye.get(e, n) || ye.access(e, n, { empty: Z.Callbacks("once memory").add(function() { ye.remove(e, [t + "queue", n]) }) }) } }), Z.fn.extend({ queue: function(e, t) { var n = 2; return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? Z.queue(this[0], e) : void 0 === t ? this : this.each(function() { var n = Z.queue(this, e, t);
                            Z._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && Z.dequeue(this, e) }) }, dequeue: function(e) { return this.each(function() { Z.dequeue(this, e) }) }, clearQueue: function(e) { return this.queue(e || "fx", []) }, promise: function(e, t) { var n, r = 1,
                            o = Z.Deferred(),
                            i = this,
                            s = this.length,
                            a = function() {--r || o.resolveWith(i, [i]) }; for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;) n = ye.get(i[s], e + "queueHooks"), n && n.empty && (r++, n.empty.add(a)); return a(), o.promise(t) } });
                var Ce = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                    we = ["Top", "Right", "Bottom", "Left"],
                    Te = function(e, t) { return e = t || e, "none" === Z.css(e, "display") || !Z.contains(e.ownerDocument, e) },
                    ke = /^(?:checkbox|radio)$/i;
                ! function() { var e = V.createDocumentFragment(),
                        t = e.appendChild(V.createElement("div")),
                        n = V.createElement("input");
                    n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), Q.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", Q.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue }();
                var Ee = "undefined";
                Q.focusinBubbles = "onfocusin" in e;
                var Se = /^key/,
                    Ne = /^(?:mouse|pointer|contextmenu)|click/,
                    De = /^(?:focusinfocus|focusoutblur)$/,
                    je = /^([^.]*)(?:\.(.+)|)$/;
                Z.event = { global: {}, add: function(e, t, n, r, o) { var i, s, a, u, l, c, p, h, f, d, g, m = ye.get(e); if (m)
                            for (n.handler && (i = n, n = i.handler, o = i.selector), n.guid || (n.guid = Z.guid++), (u = m.events) || (u = m.events = {}), (s = m.handle) || (s = m.handle = function(t) { return typeof Z !== Ee && Z.event.triggered !== t.type ? Z.event.dispatch.apply(e, arguments) : void 0 }), t = (t || "").match(fe) || [""], l = t.length; l--;) a = je.exec(t[l]) || [], f = g = a[1], d = (a[2] || "").split(".").sort(), f && (p = Z.event.special[f] || {}, f = (o ? p.delegateType : p.bindType) || f, p = Z.event.special[f] || {}, c = Z.extend({ type: f, origType: g, data: r, handler: n, guid: n.guid, selector: o, needsContext: o && Z.expr.match.needsContext.test(o), namespace: d.join(".") }, i), (h = u[f]) || (h = u[f] = [], h.delegateCount = 0, p.setup && p.setup.call(e, r, d, s) !== !1 || e.addEventListener && e.addEventListener(f, s, !1)), p.add && (p.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), o ? h.splice(h.delegateCount++, 0, c) : h.push(c), Z.event.global[f] = !0) }, remove: function(e, t, n, r, o) { var i, s, a, u, l, c, p, h, f, d, g, m = ye.hasData(e) && ye.get(e); if (m && (u = m.events)) { for (t = (t || "").match(fe) || [""], l = t.length; l--;)
                                if (a = je.exec(t[l]) || [], f = g = a[1], d = (a[2] || "").split(".").sort(), f) { for (p = Z.event.special[f] || {}, f = (r ? p.delegateType : p.bindType) || f, h = u[f] || [], a = a[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = i = h.length; i--;) c = h[i], !o && g !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (h.splice(i, 1), c.selector && h.delegateCount--, p.remove && p.remove.call(e, c));
                                    s && !h.length && (p.teardown && p.teardown.call(e, d, m.handle) !== !1 || Z.removeEvent(e, f, m.handle), delete u[f]) } else
                                    for (f in u) Z.event.remove(e, f + t[l], n, r, !0);
                            Z.isEmptyObject(u) && (delete m.handle, ye.remove(e, "events")) } }, trigger: function(t, n, r, o) { var i, s, a, u, l, c, p, h = [r || V],
                            f = K.call(t, "type") ? t.type : t,
                            d = K.call(t, "namespace") ? t.namespace.split(".") : []; if (s = a = r = r || V, 3 !== r.nodeType && 8 !== r.nodeType && !De.test(f + Z.event.triggered) && (f.indexOf(".") >= 0 && (d = f.split("."), f = d.shift(), d.sort()), l = f.indexOf(":") < 0 && "on" + f, t = t[Z.expando] ? t : new Z.Event(f, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = d.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : Z.makeArray(n, [t]), p = Z.event.special[f] || {}, o || !p.trigger || p.trigger.apply(r, n) !== !1)) { if (!o && !p.noBubble && !Z.isWindow(r)) { for (u = p.delegateType || f, De.test(u + f) || (s = s.parentNode); s; s = s.parentNode) h.push(s), a = s;
                                a === (r.ownerDocument || V) && h.push(a.defaultView || a.parentWindow || e) } for (i = 0;
                                (s = h[i++]) && !t.isPropagationStopped();) t.type = i > 1 ? u : p.bindType || f, c = (ye.get(s, "events") || {})[t.type] && ye.get(s, "handle"), c && c.apply(s, n), c = l && s[l], c && c.apply && Z.acceptData(s) && (t.result = c.apply(s, n), t.result === !1 && t.preventDefault()); return t.type = f, o || t.isDefaultPrevented() || p._default && p._default.apply(h.pop(), n) !== !1 || !Z.acceptData(r) || l && Z.isFunction(r[f]) && !Z.isWindow(r) && (a = r[l], a && (r[l] = null), Z.event.triggered = f, r[f](), Z.event.triggered = void 0, a && (r[l] = a)), t.result } }, dispatch: function(e) { e = Z.event.fix(e); var t, n, r, o, i, s = [],
                            a = U.call(arguments),
                            u = (ye.get(this, "events") || {})[e.type] || [],
                            l = Z.event.special[e.type] || {}; if (a[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) { for (s = Z.event.handlers.call(this, e, u), t = 0;
                                (o = s[t++]) && !e.isPropagationStopped();)
                                for (e.currentTarget = o.elem, n = 0;
                                    (i = o.handlers[n++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, r = ((Z.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, a), void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation())); return l.postDispatch && l.postDispatch.call(this, e), e.result } }, handlers: function(e, t) { var n, r, o, i, s = [],
                            a = t.delegateCount,
                            u = e.target; if (a && u.nodeType && (!e.button || "click" !== e.type))
                            for (; u !== this; u = u.parentNode || this)
                                if (u.disabled !== !0 || "click" !== e.type) { for (r = [], n = 0; a > n; n++) i = t[n], o = i.selector + " ", void 0 === r[o] && (r[o] = i.needsContext ? Z(o, this).index(u) >= 0 : Z.find(o, this, null, [u]).length), r[o] && r.push(i);
                                    r.length && s.push({ elem: u, handlers: r }) }
                        return a < t.length && s.push({ elem: this, handlers: t.slice(a) }), s }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function(e, t) { return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e } }, mouseHooks: { props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function(e, t) { var n, r, o, i = t.button; return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || V, r = n.documentElement, o = n.body, e.pageX = t.clientX + (r && r.scrollLeft || o && o.scrollLeft || 0) - (r && r.clientLeft || o && o.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || o && o.scrollTop || 0) - (r && r.clientTop || o && o.clientTop || 0)), e.which || void 0 === i || (e.which = 1 & i ? 1 : 2 & i ? 3 : 4 & i ? 2 : 0), e } }, fix: function(e) { if (e[Z.expando]) return e; var t, n, r, o = e.type,
                            i = e,
                            s = this.fixHooks[o]; for (s || (this.fixHooks[o] = s = Ne.test(o) ? this.mouseHooks : Se.test(o) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, e = new Z.Event(i), t = r.length; t--;) n = r[t], e[n] = i[n]; return e.target || (e.target = V), 3 === e.target.nodeType && (e.target = e.target.parentNode), s.filter ? s.filter(e, i) : e }, special: { load: { noBubble: !0 }, focus: { trigger: function() { return this !== p() && this.focus ? (this.focus(), !1) : void 0 }, delegateType: "focusin" }, blur: { trigger: function() { return this === p() && this.blur ? (this.blur(), !1) : void 0 }, delegateType: "focusout" }, click: { trigger: function() { return "checkbox" === this.type && this.click && Z.nodeName(this, "input") ? (this.click(), !1) : void 0 }, _default: function(e) { return Z.nodeName(e.target, "a") } }, beforeunload: { postDispatch: function(e) { void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result) } } }, simulate: function(e, t, n, r) { var o = Z.extend(new Z.Event, n, { type: e, isSimulated: !0, originalEvent: {} });
                        r ? Z.event.trigger(o, null, t) : Z.event.dispatch.call(t, o), o.isDefaultPrevented() && n.preventDefault() } }, Z.removeEvent = function(e, t, n) { e.removeEventListener && e.removeEventListener(t, n, !1) }, Z.Event = function(e, t) { return this instanceof Z.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? l : c) : this.type = e, t && Z.extend(this, t), this.timeStamp = e && e.timeStamp || Z.now(), void(this[Z.expando] = !0)) : new Z.Event(e, t) }, Z.Event.prototype = { isDefaultPrevented: c, isPropagationStopped: c, isImmediatePropagationStopped: c, preventDefault: function() { var e = this.originalEvent;
                        this.isDefaultPrevented = l, e && e.preventDefault && e.preventDefault() }, stopPropagation: function() { var e = this.originalEvent;
                        this.isPropagationStopped = l, e && e.stopPropagation && e.stopPropagation() }, stopImmediatePropagation: function() { var e = this.originalEvent;
                        this.isImmediatePropagationStopped = l, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation() } }, Z.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function(e, t) { Z.event.special[e] = { delegateType: t, bindType: t, handle: function(e) { var n, r = this,
                                o = e.relatedTarget,
                                i = e.handleObj; return (!o || o !== r && !Z.contains(r, o)) && (e.type = i.origType, n = i.handler.apply(this, arguments), e.type = t), n } } }), Q.focusinBubbles || Z.each({ focus: "focusin", blur: "focusout" }, function(e, t) { var n = function(e) { Z.event.simulate(t, e.target, Z.event.fix(e), !0) };
                    Z.event.special[t] = { setup: function() { var r = this.ownerDocument || this,
                                o = ye.access(r, t);
                            o || r.addEventListener(e, n, !0), ye.access(r, t, (o || 0) + 1) }, teardown: function() { var r = this.ownerDocument || this,
                                o = ye.access(r, t) - 1;
                            o ? ye.access(r, t, o) : (r.removeEventListener(e, n, !0), ye.remove(r, t)) } } }), Z.fn.extend({ on: function(e, t, n, r, o) { var i, s; if ("object" == typeof e) { "string" != typeof t && (n = n || t, t = void 0); for (s in e) this.on(s, t, n, e[s], o); return this } if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1) r = c;
                        else if (!r) return this; return 1 === o && (i = r, r = function(e) { return Z().off(e), i.apply(this, arguments) }, r.guid = i.guid || (i.guid = Z.guid++)), this.each(function() { Z.event.add(this, e, r, n, t) }) }, one: function(e, t, n, r) { return this.on(e, t, n, r, 1) }, off: function(e, t, n) { var r, o; if (e && e.preventDefault && e.handleObj) return r = e.handleObj, Z(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this; if ("object" == typeof e) { for (o in e) this.off(o, t, e[o]); return this } return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = c), this.each(function() { Z.event.remove(this, e, n, t) }) }, trigger: function(e, t) { return this.each(function() { Z.event.trigger(e, t, this) }) }, triggerHandler: function(e, t) { var n = this[0]; return n ? Z.event.trigger(e, t, n, !0) : void 0 } });
                var Me = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                    Pe = /<([\w:]+)/,
                    Ae = /<|&#?\w+;/,
                    Le = /<(?:script|style|link)/i,
                    Fe = /checked\s*(?:[^=]|=\s*.checked.)/i,
                    He = /^$|\/(?:java|ecma)script/i,
                    Oe = /^true\/(.*)/,
                    _e = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
                    Re = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };
                Re.optgroup = Re.option, Re.tbody = Re.tfoot = Re.colgroup = Re.caption = Re.thead, Re.th = Re.td, Z.extend({ clone: function(e, t, n) { var r, o, i, s, a = e.cloneNode(!0),
                            u = Z.contains(e.ownerDocument, e); if (!(Q.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Z.isXMLDoc(e)))
                            for (s = y(a), i = y(e), r = 0, o = i.length; o > r; r++) v(i[r], s[r]); if (t)
                            if (n)
                                for (i = i || y(e), s = s || y(a), r = 0, o = i.length; o > r; r++) m(i[r], s[r]);
                            else m(e, a);
                        return s = y(a, "script"), s.length > 0 && g(s, !u && y(e, "script")), a }, buildFragment: function(e, t, n, r) { for (var o, i, s, a, u, l, c = t.createDocumentFragment(), p = [], h = 0, f = e.length; f > h; h++)
                            if (o = e[h], o || 0 === o)
                                if ("object" === Z.type(o)) Z.merge(p, o.nodeType ? [o] : o);
                                else if (Ae.test(o)) { for (i = i || c.appendChild(t.createElement("div")), s = (Pe.exec(o) || ["", ""])[1].toLowerCase(), a = Re[s] || Re._default, i.innerHTML = a[1] + o.replace(Me, "<$1></$2>") + a[2], l = a[0]; l--;) i = i.lastChild;
                            Z.merge(p, i.childNodes), i = c.firstChild, i.textContent = "" } else p.push(t.createTextNode(o)); for (c.textContent = "", h = 0; o = p[h++];)
                            if ((!r || -1 === Z.inArray(o, r)) && (u = Z.contains(o.ownerDocument, o), i = y(c.appendChild(o), "script"), u && g(i), n))
                                for (l = 0; o = i[l++];) He.test(o.type || "") && n.push(o);
                        return c }, cleanData: function(e) { for (var t, n, r, o, i = Z.event.special, s = 0; void 0 !== (n = e[s]); s++) { if (Z.acceptData(n) && (o = n[ye.expando], o && (t = ye.cache[o]))) { if (t.events)
                                    for (r in t.events) i[r] ? Z.event.remove(n, r) : Z.removeEvent(n, r, t.handle);
                                ye.cache[o] && delete ye.cache[o] }
                            delete ve.cache[n[ve.expando]] } } }), Z.fn.extend({ text: function(e) { return me(this, function(e) { return void 0 === e ? Z.text(this) : this.empty().each(function() {
                                (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e) }) }, null, e, arguments.length) }, append: function() { return this.domManip(arguments, function(e) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) { var t = h(this, e);
                                t.appendChild(e) } }) }, prepend: function() { return this.domManip(arguments, function(e) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) { var t = h(this, e);
                                t.insertBefore(e, t.firstChild) } }) }, before: function() { return this.domManip(arguments, function(e) { this.parentNode && this.parentNode.insertBefore(e, this) }) }, after: function() { return this.domManip(arguments, function(e) { this.parentNode && this.parentNode.insertBefore(e, this.nextSibling) }) }, remove: function(e, t) { for (var n, r = e ? Z.filter(e, this) : this, o = 0; null != (n = r[o]); o++) t || 1 !== n.nodeType || Z.cleanData(y(n)), n.parentNode && (t && Z.contains(n.ownerDocument, n) && g(y(n, "script")), n.parentNode.removeChild(n)); return this }, empty: function() { for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (Z.cleanData(y(e, !1)), e.textContent = ""); return this }, clone: function(e, t) { return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() { return Z.clone(this, e, t) }) }, html: function(e) { return me(this, function(e) { var t = this[0] || {},
                                n = 0,
                                r = this.length; if (void 0 === e && 1 === t.nodeType) return t.innerHTML; if ("string" == typeof e && !Le.test(e) && !Re[(Pe.exec(e) || ["", ""])[1].toLowerCase()]) { e = e.replace(Me, "<$1></$2>"); try { for (; r > n; n++) t = this[n] || {}, 1 === t.nodeType && (Z.cleanData(y(t, !1)), t.innerHTML = e);
                                    t = 0 } catch (o) {} }
                            t && this.empty().append(e) }, null, e, arguments.length) }, replaceWith: function() { var e = arguments[0]; return this.domManip(arguments, function(t) { e = this.parentNode, Z.cleanData(y(this)), e && e.replaceChild(t, this) }), e && (e.length || e.nodeType) ? this : this.remove() }, detach: function(e) { return this.remove(e, !0) }, domManip: function(e, t) { e = G.apply([], e); var n, r, o, i, s, a, u = 0,
                            l = this.length,
                            c = this,
                            p = l - 1,
                            h = e[0],
                            g = Z.isFunction(h); if (g || l > 1 && "string" == typeof h && !Q.checkClone && Fe.test(h)) return this.each(function(n) { var r = c.eq(n);
                            g && (e[0] = h.call(this, n, r.html())), r.domManip(e, t) }); if (l && (n = Z.buildFragment(e, this[0].ownerDocument, !1, this), r = n.firstChild, 1 === n.childNodes.length && (n = r), r)) { for (o = Z.map(y(n, "script"), f), i = o.length; l > u; u++) s = n, u !== p && (s = Z.clone(s, !0, !0), i && Z.merge(o, y(s, "script"))), t.call(this[u], s, u); if (i)
                                for (a = o[o.length - 1].ownerDocument, Z.map(o, d), u = 0; i > u; u++) s = o[u], He.test(s.type || "") && !ye.access(s, "globalEval") && Z.contains(a, s) && (s.src ? Z._evalUrl && Z._evalUrl(s.src) : Z.globalEval(s.textContent.replace(_e, ""))) } return this } }), Z.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function(e, t) { Z.fn[e] = function(e) { for (var n, r = [], o = Z(e), i = o.length - 1, s = 0; i >= s; s++) n = s === i ? this : this.clone(!0), Z(o[s])[t](n), $.apply(r, n.get()); return this.pushStack(r) } });
                var Ie, qe = {},
                    Be = /^margin/,
                    We = new RegExp("^(" + Ce + ")(?!px)[a-z%]+$", "i"),
                    Ue = function(t) { return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null) };
                ! function() {
                    function t() {
                        s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", s.innerHTML = "", o.appendChild(i);
                        var t = e.getComputedStyle(s, null);
                        n = "1%" !== t.top, r = "4px" === t.width,
                            o.removeChild(i)
                    }
                    var n, r, o = V.documentElement,
                        i = V.createElement("div"),
                        s = V.createElement("div");
                    s.style && (s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", Q.clearCloneStyle = "content-box" === s.style.backgroundClip, i.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", i.appendChild(s), e.getComputedStyle && Z.extend(Q, { pixelPosition: function() { return t(), n }, boxSizingReliable: function() { return null == r && t(), r }, reliableMarginRight: function() { var t, n = s.appendChild(V.createElement("div")); return n.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", s.style.width = "1px", o.appendChild(i), t = !parseFloat(e.getComputedStyle(n, null).marginRight), o.removeChild(i), s.removeChild(n), t } }))
                }(), Z.swap = function(e, t, n, r) { var o, i, s = {}; for (i in t) s[i] = e.style[i], e.style[i] = t[i];
                    o = n.apply(e, r || []); for (i in t) e.style[i] = s[i]; return o };
                var Ge = /^(none|table(?!-c[ea]).+)/,
                    $e = new RegExp("^(" + Ce + ")(.*)$", "i"),
                    ze = new RegExp("^([+-])=(" + Ce + ")", "i"),
                    Ye = { position: "absolute", visibility: "hidden", display: "block" },
                    Xe = { letterSpacing: "0", fontWeight: "400" },
                    Ke = ["Webkit", "O", "Moz", "ms"];
                Z.extend({ cssHooks: { opacity: { get: function(e, t) { if (t) { var n = C(e, "opacity"); return "" === n ? "1" : n } } } }, cssNumber: { columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": "cssFloat" }, style: function(e, t, n, r) { if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) { var o, i, s, a = Z.camelCase(t),
                                u = e.style; return t = Z.cssProps[a] || (Z.cssProps[a] = T(u, a)), s = Z.cssHooks[t] || Z.cssHooks[a], void 0 === n ? s && "get" in s && void 0 !== (o = s.get(e, !1, r)) ? o : u[t] : (i = typeof n, "string" === i && (o = ze.exec(n)) && (n = (o[1] + 1) * o[2] + parseFloat(Z.css(e, t)), i = "number"), null != n && n === n && ("number" !== i || Z.cssNumber[a] || (n += "px"), Q.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), s && "set" in s && void 0 === (n = s.set(e, n, r)) || (u[t] = n)), void 0) } }, css: function(e, t, n, r) { var o, i, s, a = Z.camelCase(t); return t = Z.cssProps[a] || (Z.cssProps[a] = T(e.style, a)), s = Z.cssHooks[t] || Z.cssHooks[a], s && "get" in s && (o = s.get(e, !0, n)), void 0 === o && (o = C(e, t, r)), "normal" === o && t in Xe && (o = Xe[t]), "" === n || n ? (i = parseFloat(o), n === !0 || Z.isNumeric(i) ? i || 0 : o) : o } }), Z.each(["height", "width"], function(e, t) { Z.cssHooks[t] = { get: function(e, n, r) { return n ? Ge.test(Z.css(e, "display")) && 0 === e.offsetWidth ? Z.swap(e, Ye, function() { return S(e, t, r) }) : S(e, t, r) : void 0 }, set: function(e, n, r) { var o = r && Ue(e); return k(e, n, r ? E(e, t, r, "border-box" === Z.css(e, "boxSizing", !1, o), o) : 0) } } }), Z.cssHooks.marginRight = w(Q.reliableMarginRight, function(e, t) { return t ? Z.swap(e, { display: "inline-block" }, C, [e, "marginRight"]) : void 0 }), Z.each({ margin: "", padding: "", border: "Width" }, function(e, t) { Z.cssHooks[e + t] = { expand: function(n) { for (var r = 0, o = {}, i = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) o[e + we[r] + t] = i[r] || i[r - 2] || i[0]; return o } }, Be.test(e) || (Z.cssHooks[e + t].set = k) }), Z.fn.extend({ css: function(e, t) { return me(this, function(e, t, n) { var r, o, i = {},
                                s = 0; if (Z.isArray(t)) { for (r = Ue(e), o = t.length; o > s; s++) i[t[s]] = Z.css(e, t[s], !1, r); return i } return void 0 !== n ? Z.style(e, t, n) : Z.css(e, t) }, e, t, arguments.length > 1) }, show: function() { return N(this, !0) }, hide: function() { return N(this) }, toggle: function(e) { return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() { Te(this) ? Z(this).show() : Z(this).hide() }) } }), Z.Tween = D, D.prototype = { constructor: D, init: function(e, t, n, r, o, i) { this.elem = e, this.prop = n, this.easing = o || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = i || (Z.cssNumber[n] ? "" : "px") }, cur: function() { var e = D.propHooks[this.prop]; return e && e.get ? e.get(this) : D.propHooks._default.get(this) }, run: function(e) { var t, n = D.propHooks[this.prop]; return this.options.duration ? this.pos = t = Z.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : D.propHooks._default.set(this), this } }, D.prototype.init.prototype = D.prototype, D.propHooks = { _default: { get: function(e) { var t; return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = Z.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop] }, set: function(e) { Z.fx.step[e.prop] ? Z.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[Z.cssProps[e.prop]] || Z.cssHooks[e.prop]) ? Z.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now } } }, D.propHooks.scrollTop = D.propHooks.scrollLeft = { set: function(e) { e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now) } }, Z.easing = { linear: function(e) { return e }, swing: function(e) { return .5 - Math.cos(e * Math.PI) / 2 } }, Z.fx = D.prototype.init, Z.fx.step = {};
                var Qe, Ve, Je = /^(?:toggle|show|hide)$/,
                    Ze = new RegExp("^(?:([+-])=|)(" + Ce + ")([a-z%]*)$", "i"),
                    et = /queueHooks$/,
                    tt = [A],
                    nt = { "*": [function(e, t) { var n = this.createTween(e, t),
                                r = n.cur(),
                                o = Ze.exec(t),
                                i = o && o[3] || (Z.cssNumber[e] ? "" : "px"),
                                s = (Z.cssNumber[e] || "px" !== i && +r) && Ze.exec(Z.css(n.elem, e)),
                                a = 1,
                                u = 20; if (s && s[3] !== i) { i = i || s[3], o = o || [], s = +r || 1;
                                do a = a || ".5", s /= a, Z.style(n.elem, e, s + i); while (a !== (a = n.cur() / r) && 1 !== a && --u) } return o && (s = n.start = +s || +r || 0, n.unit = i, n.end = o[1] ? s + (o[1] + 1) * o[2] : +o[2]), n }] };
                Z.Animation = Z.extend(F, { tweener: function(e, t) { Z.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" "); for (var n, r = 0, o = e.length; o > r; r++) n = e[r], nt[n] = nt[n] || [], nt[n].unshift(t) }, prefilter: function(e, t) { t ? tt.unshift(e) : tt.push(e) } }), Z.speed = function(e, t, n) { var r = e && "object" == typeof e ? Z.extend({}, e) : { complete: n || !n && t || Z.isFunction(e) && e, duration: e, easing: n && t || t && !Z.isFunction(t) && t }; return r.duration = Z.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in Z.fx.speeds ? Z.fx.speeds[r.duration] : Z.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() { Z.isFunction(r.old) && r.old.call(this), r.queue && Z.dequeue(this, r.queue) }, r }, Z.fn.extend({ fadeTo: function(e, t, n, r) { return this.filter(Te).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r) }, animate: function(e, t, n, r) { var o = Z.isEmptyObject(e),
                                i = Z.speed(t, n, r),
                                s = function() { var t = F(this, Z.extend({}, e), i);
                                    (o || ye.get(this, "finish")) && t.stop(!0) }; return s.finish = s, o || i.queue === !1 ? this.each(s) : this.queue(i.queue, s) }, stop: function(e, t, n) { var r = function(e) { var t = e.stop;
                                delete e.stop, t(n) }; return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() { var t = !0,
                                    o = null != e && e + "queueHooks",
                                    i = Z.timers,
                                    s = ye.get(this); if (o) s[o] && s[o].stop && r(s[o]);
                                else
                                    for (o in s) s[o] && s[o].stop && et.test(o) && r(s[o]); for (o = i.length; o--;) i[o].elem !== this || null != e && i[o].queue !== e || (i[o].anim.stop(n), t = !1, i.splice(o, 1));
                                (t || !n) && Z.dequeue(this, e) }) }, finish: function(e) { return e !== !1 && (e = e || "fx"), this.each(function() { var t, n = ye.get(this),
                                    r = n[e + "queue"],
                                    o = n[e + "queueHooks"],
                                    i = Z.timers,
                                    s = r ? r.length : 0; for (n.finish = !0, Z.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = i.length; t--;) i[t].elem === this && i[t].queue === e && (i[t].anim.stop(!0), i.splice(t, 1)); for (t = 0; s > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                                delete n.finish }) } }), Z.each(["toggle", "show", "hide"], function(e, t) { var n = Z.fn[t];
                        Z.fn[t] = function(e, r, o) { return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(M(t, !0), e, r, o) } }), Z.each({ slideDown: M("show"), slideUp: M("hide"), slideToggle: M("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function(e, t) { Z.fn[e] = function(e, n, r) { return this.animate(t, e, n, r) } }), Z.timers = [], Z.fx.tick = function() { var e, t = 0,
                            n = Z.timers; for (Qe = Z.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
                        n.length || Z.fx.stop(), Qe = void 0 }, Z.fx.timer = function(e) { Z.timers.push(e), e() ? Z.fx.start() : Z.timers.pop() }, Z.fx.interval = 13, Z.fx.start = function() { Ve || (Ve = setInterval(Z.fx.tick, Z.fx.interval)) }, Z.fx.stop = function() { clearInterval(Ve), Ve = null }, Z.fx.speeds = { slow: 600, fast: 200, _default: 400 }, Z.fn.delay = function(e, t) { return e = Z.fx ? Z.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) { var r = setTimeout(t, e);
                            n.stop = function() { clearTimeout(r) } }) },
                    function() { var e = V.createElement("input"),
                            t = V.createElement("select"),
                            n = t.appendChild(V.createElement("option"));
                        e.type = "checkbox", Q.checkOn = "" !== e.value, Q.optSelected = n.selected, t.disabled = !0, Q.optDisabled = !n.disabled, e = V.createElement("input"), e.value = "t", e.type = "radio", Q.radioValue = "t" === e.value }();
                var rt, ot, it = Z.expr.attrHandle;
                Z.fn.extend({ attr: function(e, t) { return me(this, Z.attr, e, t, arguments.length > 1) }, removeAttr: function(e) { return this.each(function() { Z.removeAttr(this, e) }) } }), Z.extend({ attr: function(e, t, n) { var r, o, i = e.nodeType; if (e && 3 !== i && 8 !== i && 2 !== i) return typeof e.getAttribute === Ee ? Z.prop(e, t, n) : (1 === i && Z.isXMLDoc(e) || (t = t.toLowerCase(), r = Z.attrHooks[t] || (Z.expr.match.bool.test(t) ? ot : rt)), void 0 === n ? r && "get" in r && null !== (o = r.get(e, t)) ? o : (o = Z.find.attr(e, t), null == o ? void 0 : o) : null !== n ? r && "set" in r && void 0 !== (o = r.set(e, n, t)) ? o : (e.setAttribute(t, n + ""), n) : void Z.removeAttr(e, t)) }, removeAttr: function(e, t) { var n, r, o = 0,
                            i = t && t.match(fe); if (i && 1 === e.nodeType)
                            for (; n = i[o++];) r = Z.propFix[n] || n, Z.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n) }, attrHooks: { type: { set: function(e, t) { if (!Q.radioValue && "radio" === t && Z.nodeName(e, "input")) { var n = e.value; return e.setAttribute("type", t), n && (e.value = n), t } } } } }), ot = { set: function(e, t, n) { return t === !1 ? Z.removeAttr(e, n) : e.setAttribute(n, n), n } }, Z.each(Z.expr.match.bool.source.match(/\w+/g), function(e, t) { var n = it[t] || Z.find.attr;
                    it[t] = function(e, t, r) { var o, i; return r || (i = it[t], it[t] = o, o = null != n(e, t, r) ? t.toLowerCase() : null, it[t] = i), o } });
                var st = /^(?:input|select|textarea|button)$/i;
                Z.fn.extend({ prop: function(e, t) { return me(this, Z.prop, e, t, arguments.length > 1) }, removeProp: function(e) { return this.each(function() { delete this[Z.propFix[e] || e] }) } }), Z.extend({ propFix: { "for": "htmlFor", "class": "className" }, prop: function(e, t, n) { var r, o, i, s = e.nodeType; if (e && 3 !== s && 8 !== s && 2 !== s) return i = 1 !== s || !Z.isXMLDoc(e), i && (t = Z.propFix[t] || t, o = Z.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (r = o.set(e, n, t)) ? r : e[t] = n : o && "get" in o && null !== (r = o.get(e, t)) ? r : e[t] }, propHooks: { tabIndex: { get: function(e) { return e.hasAttribute("tabindex") || st.test(e.nodeName) || e.href ? e.tabIndex : -1 } } } }), Q.optSelected || (Z.propHooks.selected = { get: function(e) { var t = e.parentNode; return t && t.parentNode && t.parentNode.selectedIndex, null } }), Z.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() { Z.propFix[this.toLowerCase()] = this });
                var at = /[\t\r\n\f]/g;
                Z.fn.extend({ addClass: function(e) { var t, n, r, o, i, s, a = "string" == typeof e && e,
                            u = 0,
                            l = this.length; if (Z.isFunction(e)) return this.each(function(t) { Z(this).addClass(e.call(this, t, this.className)) }); if (a)
                            for (t = (e || "").match(fe) || []; l > u; u++)
                                if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(at, " ") : " ")) { for (i = 0; o = t[i++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                                    s = Z.trim(r), n.className !== s && (n.className = s) }
                        return this }, removeClass: function(e) { var t, n, r, o, i, s, a = 0 === arguments.length || "string" == typeof e && e,
                            u = 0,
                            l = this.length; if (Z.isFunction(e)) return this.each(function(t) { Z(this).removeClass(e.call(this, t, this.className)) }); if (a)
                            for (t = (e || "").match(fe) || []; l > u; u++)
                                if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(at, " ") : "")) { for (i = 0; o = t[i++];)
                                        for (; r.indexOf(" " + o + " ") >= 0;) r = r.replace(" " + o + " ", " ");
                                    s = e ? Z.trim(r) : "", n.className !== s && (n.className = s) }
                        return this }, toggleClass: function(e, t) { var n = typeof e; return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : Z.isFunction(e) ? this.each(function(n) { Z(this).toggleClass(e.call(this, n, this.className, t), t) }) : this.each(function() { if ("string" === n)
                                for (var t, r = 0, o = Z(this), i = e.match(fe) || []; t = i[r++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                            else(n === Ee || "boolean" === n) && (this.className && ye.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ye.get(this, "__className__") || "") }) }, hasClass: function(e) { for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)
                            if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(at, " ").indexOf(t) >= 0) return !0;
                        return !1 } });
                var ut = /\r/g;
                Z.fn.extend({ val: function(e) { var t, n, r, o = this[0]; { if (arguments.length) return r = Z.isFunction(e), this.each(function(n) { var o;
                                1 === this.nodeType && (o = r ? e.call(this, n, Z(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : Z.isArray(o) && (o = Z.map(o, function(e) { return null == e ? "" : e + "" })), t = Z.valHooks[this.type] || Z.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o)) }); if (o) return t = Z.valHooks[o.type] || Z.valHooks[o.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : (n = o.value, "string" == typeof n ? n.replace(ut, "") : null == n ? "" : n) } } }), Z.extend({ valHooks: { option: { get: function(e) { var t = Z.find.attr(e, "value"); return null != t ? t : Z.trim(Z.text(e)) } }, select: { get: function(e) { for (var t, n, r = e.options, o = e.selectedIndex, i = "select-one" === e.type || 0 > o, s = i ? null : [], a = i ? o + 1 : r.length, u = 0 > o ? a : i ? o : 0; a > u; u++)
                                    if (n = r[u], (n.selected || u === o) && (Q.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !Z.nodeName(n.parentNode, "optgroup"))) { if (t = Z(n).val(), i) return t;
                                        s.push(t) }
                                return s }, set: function(e, t) { for (var n, r, o = e.options, i = Z.makeArray(t), s = o.length; s--;) r = o[s], (r.selected = Z.inArray(r.value, i) >= 0) && (n = !0); return n || (e.selectedIndex = -1), i } } } }), Z.each(["radio", "checkbox"], function() { Z.valHooks[this] = { set: function(e, t) { return Z.isArray(t) ? e.checked = Z.inArray(Z(e).val(), t) >= 0 : void 0 } }, Q.checkOn || (Z.valHooks[this].get = function(e) { return null === e.getAttribute("value") ? "on" : e.value }) }), Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) { Z.fn[t] = function(e, n) { return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t) } }), Z.fn.extend({ hover: function(e, t) { return this.mouseenter(e).mouseleave(t || e) }, bind: function(e, t, n) { return this.on(e, null, t, n) }, unbind: function(e, t) { return this.off(e, null, t) }, delegate: function(e, t, n, r) { return this.on(t, e, n, r) }, undelegate: function(e, t, n) { return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n) } });
                var lt = Z.now(),
                    ct = /\?/;
                Z.parseJSON = function(e) { return JSON.parse(e + "") }, Z.parseXML = function(e) { var t, n; if (!e || "string" != typeof e) return null; try { n = new DOMParser, t = n.parseFromString(e, "text/xml") } catch (r) { t = void 0 } return (!t || t.getElementsByTagName("parsererror").length) && Z.error("Invalid XML: " + e), t };
                var pt = /#.*$/,
                    ht = /([?&])_=[^&]*/,
                    ft = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                    dt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                    gt = /^(?:GET|HEAD)$/,
                    mt = /^\/\//,
                    yt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
                    vt = {},
                    xt = {},
                    bt = "*/".concat("*"),
                    Ct = e.location.href,
                    wt = yt.exec(Ct.toLowerCase()) || [];
                Z.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: Ct, type: "GET", isLocal: dt.test(wt[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": bt, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": Z.parseJSON, "text xml": Z.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function(e, t) { return t ? _(_(e, Z.ajaxSettings), t) : _(Z.ajaxSettings, e) }, ajaxPrefilter: H(vt), ajaxTransport: H(xt), ajax: function(e, t) {
                        function n(e, t, n, s) { var u, c, y, v, b, w = t;
                            2 !== x && (x = 2, a && clearTimeout(a), r = void 0, i = s || "", C.readyState = e > 0 ? 4 : 0, u = e >= 200 && 300 > e || 304 === e, n && (v = R(p, C, n)), v = I(p, v, C, u), u ? (p.ifModified && (b = C.getResponseHeader("Last-Modified"), b && (Z.lastModified[o] = b), b = C.getResponseHeader("etag"), b && (Z.etag[o] = b)), 204 === e || "HEAD" === p.type ? w = "nocontent" : 304 === e ? w = "notmodified" : (w = v.state, c = v.data, y = v.error, u = !y)) : (y = w, (e || !w) && (w = "error", 0 > e && (e = 0))), C.status = e, C.statusText = (t || w) + "", u ? d.resolveWith(h, [c, w, C]) : d.rejectWith(h, [C, w, y]), C.statusCode(m), m = void 0, l && f.trigger(u ? "ajaxSuccess" : "ajaxError", [C, p, u ? c : y]), g.fireWith(h, [C, w]), l && (f.trigger("ajaxComplete", [C, p]), --Z.active || Z.event.trigger("ajaxStop"))) } "object" == typeof e && (t = e, e = void 0), t = t || {}; var r, o, i, s, a, u, l, c, p = Z.ajaxSetup({}, t),
                            h = p.context || p,
                            f = p.context && (h.nodeType || h.jquery) ? Z(h) : Z.event,
                            d = Z.Deferred(),
                            g = Z.Callbacks("once memory"),
                            m = p.statusCode || {},
                            y = {},
                            v = {},
                            x = 0,
                            b = "canceled",
                            C = { readyState: 0, getResponseHeader: function(e) { var t; if (2 === x) { if (!s)
                                            for (s = {}; t = ft.exec(i);) s[t[1].toLowerCase()] = t[2];
                                        t = s[e.toLowerCase()] } return null == t ? null : t }, getAllResponseHeaders: function() { return 2 === x ? i : null }, setRequestHeader: function(e, t) { var n = e.toLowerCase(); return x || (e = v[n] = v[n] || e, y[e] = t), this }, overrideMimeType: function(e) { return x || (p.mimeType = e), this }, statusCode: function(e) { var t; if (e)
                                        if (2 > x)
                                            for (t in e) m[t] = [m[t], e[t]];
                                        else C.always(e[C.status]);
                                    return this }, abort: function(e) { var t = e || b; return r && r.abort(t), n(0, t), this } }; if (d.promise(C).complete = g.add, C.success = C.done, C.error = C.fail, p.url = ((e || p.url || Ct) + "").replace(pt, "").replace(mt, wt[1] + "//"), p.type = t.method || t.type || p.method || p.type, p.dataTypes = Z.trim(p.dataType || "*").toLowerCase().match(fe) || [""], null == p.crossDomain && (u = yt.exec(p.url.toLowerCase()), p.crossDomain = !(!u || u[1] === wt[1] && u[2] === wt[2] && (u[3] || ("http:" === u[1] ? "80" : "443")) === (wt[3] || ("http:" === wt[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = Z.param(p.data, p.traditional)), O(vt, p, t, C), 2 === x) return C;
                        l = Z.event && p.global, l && 0 === Z.active++ && Z.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !gt.test(p.type), o = p.url, p.hasContent || (p.data && (o = p.url += (ct.test(o) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = ht.test(o) ? o.replace(ht, "$1_=" + lt++) : o + (ct.test(o) ? "&" : "?") + "_=" + lt++)), p.ifModified && (Z.lastModified[o] && C.setRequestHeader("If-Modified-Since", Z.lastModified[o]), Z.etag[o] && C.setRequestHeader("If-None-Match", Z.etag[o])), (p.data && p.hasContent && p.contentType !== !1 || t.contentType) && C.setRequestHeader("Content-Type", p.contentType), C.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + bt + "; q=0.01" : "") : p.accepts["*"]); for (c in p.headers) C.setRequestHeader(c, p.headers[c]); if (p.beforeSend && (p.beforeSend.call(h, C, p) === !1 || 2 === x)) return C.abort();
                        b = "abort"; for (c in { success: 1, error: 1, complete: 1 }) C[c](p[c]); if (r = O(xt, p, t, C)) { C.readyState = 1, l && f.trigger("ajaxSend", [C, p]), p.async && p.timeout > 0 && (a = setTimeout(function() { C.abort("timeout") }, p.timeout)); try { x = 1, r.send(y, n) } catch (w) { if (!(2 > x)) throw w;
                                n(-1, w) } } else n(-1, "No Transport"); return C }, getJSON: function(e, t, n) { return Z.get(e, t, n, "json") }, getScript: function(e, t) { return Z.get(e, void 0, t, "script") } }), Z.each(["get", "post"], function(e, t) { Z[t] = function(e, n, r, o) { return Z.isFunction(n) && (o = o || r, r = n, n = void 0), Z.ajax({ url: e, type: t, dataType: o, data: n, success: r }) } }), Z._evalUrl = function(e) { return Z.ajax({ url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }) }, Z.fn.extend({ wrapAll: function(e) { var t; return Z.isFunction(e) ? this.each(function(t) { Z(this).wrapAll(e.call(this, t)) }) : (this[0] && (t = Z(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() { for (var e = this; e.firstElementChild;) e = e.firstElementChild; return e }).append(this)), this) }, wrapInner: function(e) { return Z.isFunction(e) ? this.each(function(t) { Z(this).wrapInner(e.call(this, t)) }) : this.each(function() { var t = Z(this),
                                n = t.contents();
                            n.length ? n.wrapAll(e) : t.append(e) }) }, wrap: function(e) { var t = Z.isFunction(e); return this.each(function(n) { Z(this).wrapAll(t ? e.call(this, n) : e) }) }, unwrap: function() { return this.parent().each(function() { Z.nodeName(this, "body") || Z(this).replaceWith(this.childNodes) }).end() } }), Z.expr.filters.hidden = function(e) { return e.offsetWidth <= 0 && e.offsetHeight <= 0 }, Z.expr.filters.visible = function(e) { return !Z.expr.filters.hidden(e) };
                var Tt = /%20/g,
                    kt = /\[\]$/,
                    Et = /\r?\n/g,
                    St = /^(?:submit|button|image|reset|file)$/i,
                    Nt = /^(?:input|select|textarea|keygen)/i;
                Z.param = function(e, t) { var n, r = [],
                        o = function(e, t) { t = Z.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t) }; if (void 0 === t && (t = Z.ajaxSettings && Z.ajaxSettings.traditional), Z.isArray(e) || e.jquery && !Z.isPlainObject(e)) Z.each(e, function() { o(this.name, this.value) });
                    else
                        for (n in e) q(n, e[n], t, o); return r.join("&").replace(Tt, "+") }, Z.fn.extend({ serialize: function() { return Z.param(this.serializeArray()) }, serializeArray: function() { return this.map(function() { var e = Z.prop(this, "elements"); return e ? Z.makeArray(e) : this }).filter(function() { var e = this.type; return this.name && !Z(this).is(":disabled") && Nt.test(this.nodeName) && !St.test(e) && (this.checked || !ke.test(e)) }).map(function(e, t) { var n = Z(this).val(); return null == n ? null : Z.isArray(n) ? Z.map(n, function(e) { return { name: t.name, value: e.replace(Et, "\r\n") } }) : { name: t.name, value: n.replace(Et, "\r\n") } }).get() } }), Z.ajaxSettings.xhr = function() { try { return new XMLHttpRequest } catch (e) {} };
                var Dt = 0,
                    jt = {},
                    Mt = { 0: 200, 1223: 204 },
                    Pt = Z.ajaxSettings.xhr();
                e.attachEvent && e.attachEvent("onunload", function() { for (var e in jt) jt[e]() }), Q.cors = !!Pt && "withCredentials" in Pt, Q.ajax = Pt = !!Pt, Z.ajaxTransport(function(e) { var t; return Q.cors || Pt && !e.crossDomain ? { send: function(n, r) { var o, i = e.xhr(),
                                s = ++Dt; if (i.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                                for (o in e.xhrFields) i[o] = e.xhrFields[o];
                            e.mimeType && i.overrideMimeType && i.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest"); for (o in n) i.setRequestHeader(o, n[o]);
                            t = function(e) { return function() { t && (delete jt[s], t = i.onload = i.onerror = null, "abort" === e ? i.abort() : "error" === e ? r(i.status, i.statusText) : r(Mt[i.status] || i.status, i.statusText, "string" == typeof i.responseText ? { text: i.responseText } : void 0, i.getAllResponseHeaders())) } }, i.onload = t(), i.onerror = t("error"), t = jt[s] = t("abort"); try { i.send(e.hasContent && e.data || null) } catch (a) { if (t) throw a } }, abort: function() { t && t() } } : void 0 }), Z.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function(e) { return Z.globalEval(e), e } } }), Z.ajaxPrefilter("script", function(e) { void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET") }), Z.ajaxTransport("script", function(e) { if (e.crossDomain) { var t, n; return { send: function(r, o) { t = Z("<script>").prop({ async: !0, charset: e.scriptCharset, src: e.url }).on("load error", n = function(e) { t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type) }), V.head.appendChild(t[0]) }, abort: function() { n && n() } } } });
                var At = [],
                    Lt = /(=)\?(?=&|$)|\?\?/;
                Z.ajaxSetup({ jsonp: "callback", jsonpCallback: function() { var e = At.pop() || Z.expando + "_" + lt++; return this[e] = !0, e } }), Z.ajaxPrefilter("json jsonp", function(t, n, r) { var o, i, s, a = t.jsonp !== !1 && (Lt.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Lt.test(t.data) && "data"); return a || "jsonp" === t.dataTypes[0] ? (o = t.jsonpCallback = Z.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(Lt, "$1" + o) : t.jsonp !== !1 && (t.url += (ct.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function() { return s || Z.error(o + " was not called"), s[0] }, t.dataTypes[0] = "json", i = e[o], e[o] = function() { s = arguments }, r.always(function() { e[o] = i, t[o] && (t.jsonpCallback = n.jsonpCallback, At.push(o)), s && Z.isFunction(i) && i(s[0]), s = i = void 0 }), "script") : void 0 }), Z.parseHTML = function(e, t, n) { if (!e || "string" != typeof e) return null; "boolean" == typeof t && (n = t, t = !1), t = t || V; var r = se.exec(e),
                        o = !n && []; return r ? [t.createElement(r[1])] : (r = Z.buildFragment([e], t, o), o && o.length && Z(o).remove(), Z.merge([], r.childNodes)) };
                var Ft = Z.fn.load;
                Z.fn.load = function(e, t, n) { if ("string" != typeof e && Ft) return Ft.apply(this, arguments); var r, o, i, s = this,
                        a = e.indexOf(" "); return a >= 0 && (r = Z.trim(e.slice(a)), e = e.slice(0, a)), Z.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), s.length > 0 && Z.ajax({ url: e, type: o, dataType: "html", data: t }).done(function(e) { i = arguments, s.html(r ? Z("<div>").append(Z.parseHTML(e)).find(r) : e) }).complete(n && function(e, t) { s.each(n, i || [e.responseText, t, e]) }), this }, Z.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) { Z.fn[t] = function(e) { return this.on(t, e) } }), Z.expr.filters.animated = function(e) { return Z.grep(Z.timers, function(t) { return e === t.elem }).length };
                var Ht = e.document.documentElement;
                Z.offset = { setOffset: function(e, t, n) { var r, o, i, s, a, u, l, c = Z.css(e, "position"),
                            p = Z(e),
                            h = {}; "static" === c && (e.style.position = "relative"), a = p.offset(), i = Z.css(e, "top"), u = Z.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (i + u).indexOf("auto") > -1, l ? (r = p.position(), s = r.top, o = r.left) : (s = parseFloat(i) || 0, o = parseFloat(u) || 0), Z.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (h.top = t.top - a.top + s), null != t.left && (h.left = t.left - a.left + o), "using" in t ? t.using.call(e, h) : p.css(h) } }, Z.fn.extend({ offset: function(e) { if (arguments.length) return void 0 === e ? this : this.each(function(t) { Z.offset.setOffset(this, e, t) }); var t, n, r = this[0],
                            o = { top: 0, left: 0 },
                            i = r && r.ownerDocument; if (i) return t = i.documentElement, Z.contains(t, r) ? (typeof r.getBoundingClientRect !== Ee && (o = r.getBoundingClientRect()), n = B(i), { top: o.top + n.pageYOffset - t.clientTop, left: o.left + n.pageXOffset - t.clientLeft }) : o }, position: function() { if (this[0]) { var e, t, n = this[0],
                                r = { top: 0, left: 0 }; return "fixed" === Z.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), Z.nodeName(e[0], "html") || (r = e.offset()), r.top += Z.css(e[0], "borderTopWidth", !0), r.left += Z.css(e[0], "borderLeftWidth", !0)), { top: t.top - r.top - Z.css(n, "marginTop", !0), left: t.left - r.left - Z.css(n, "marginLeft", !0) } } }, offsetParent: function() { return this.map(function() { for (var e = this.offsetParent || Ht; e && !Z.nodeName(e, "html") && "static" === Z.css(e, "position");) e = e.offsetParent; return e || Ht }) } }), Z.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(t, n) { var r = "pageYOffset" === n;
                    Z.fn[t] = function(o) { return me(this, function(t, o, i) { var s = B(t); return void 0 === i ? s ? s[n] : t[o] : void(s ? s.scrollTo(r ? e.pageXOffset : i, r ? i : e.pageYOffset) : t[o] = i) }, t, o, arguments.length, null) } }), Z.each(["top", "left"], function(e, t) { Z.cssHooks[t] = w(Q.pixelPosition, function(e, n) { return n ? (n = C(e, t), We.test(n) ? Z(e).position()[t] + "px" : n) : void 0 }) }), Z.each({ Height: "height", Width: "width" }, function(e, t) { Z.each({ padding: "inner" + e, content: t, "": "outer" + e }, function(n, r) { Z.fn[r] = function(r, o) { var i = arguments.length && (n || "boolean" != typeof r),
                                s = n || (r === !0 || o === !0 ? "margin" : "border"); return me(this, function(t, n, r) { var o; return Z.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === r ? Z.css(t, n, s) : Z.style(t, n, r, s) }, t, i ? r : void 0, i, null) } }) }), Z.fn.size = function() { return this.length }, Z.fn.andSelf = Z.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() { return Z });
                var Ot = e.jQuery,
                    _t = e.$;
                return Z.noConflict = function(t) { return e.$ === Z && (e.$ = _t), t && e.jQuery === Z && (e.jQuery = Ot), Z }, typeof t === Ee && (e.jQuery = e.$ = Z), Z
            })
        }, {}]
    }, {}, [1])(1)
});