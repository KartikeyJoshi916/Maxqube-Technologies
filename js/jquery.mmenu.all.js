(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("jquery"));
  } else {
    root.jquery_mmenu_all_js = factory(root.jQuery);
  }
})(this, function (jQuery) {
  /*!
   * jQuery mmenu v7.2.2
   * @requires jQuery 1.7.0 or later
   *
   * mmenu.frebsite.nl
   *
   * Copyright (c) Fred Heusschen
   * www.frebsite.nl
   *
   * License: CC-BY-NC-4.0
   * http://creativecommons.org/licenses/by-nc/4.0/
   */
  !(function (h) {
    var n,
      p,
      o,
      a,
      t,
      f = "mmenu",
      e = "7.2.2";
    (h[f] && h[f].version > e) ||
      ((h[f] = function (t, e, n) {
        return (
          (this.$menu = t),
          (this._api = [
            "bind",
            "getInstance",
            "initPanels",
            "openPanel",
            "closePanel",
            "closeAllPanels",
            "setSelected",
          ]),
          (this.opts = e),
          (this.conf = n),
          (this.vars = {}),
          (this.cbck = {}),
          (this.mtch = {}),
          "function" == typeof this.___deprecated && this.___deprecated(),
          this._initWrappers(),
          this._initAddons(),
          this._initExtensions(),
          this._initHooks(),
          this._initMenu(),
          this._initPanels(),
          this._initOpened(),
          this._initAnchors(),
          this._initMatchMedia(),
          "function" == typeof this.___debug && this.___debug(),
          this
        );
      }),
      (h[f].version = e),
      (h[f].uniqueId = 0),
      (h[f].wrappers = {}),
      (h[f].addons = {}),
      (h[f].defaults = {
        hooks: {},
        extensions: [],
        wrappers: [],
        navbar: { add: !0, title: "Menu", titleLink: "parent" },
        onClick: { setSelected: !0 },
        slidingSubmenus: !0,
      }),
      (h[f].configuration = {
        classNames: {
          divider: "Divider",
          inset: "Inset",
          nolistview: "NoListview",
          nopanel: "NoPanel",
          panel: "Panel",
          selected: "Selected",
          spacer: "Spacer",
          vertical: "Vertical",
        },
        clone: !1,
        language: null,
        openingInterval: 25,
        panelNodetype: "ul, ol, div",
        transitionDuration: 400,
      }),
      (h[f].prototype = {
        getInstance: function () {
          return this;
        },
        initPanels: function (t) {
          this._initPanels(t);
        },
        openPanel: function (t, e) {
          if (
            (this.trigger("openPanel:before", t),
            t &&
              t.length &&
              (t.is("." + p.panel) || (t = t.closest("." + p.panel)),
              t.is("." + p.panel)))
          ) {
            var n = this;
            if (
              ("boolean" != typeof e && (e = !0),
              t.parent("." + p.listitem + "_vertical").length)
            )
              t
                .parents("." + p.listitem + "_vertical")
                .addClass(p.listitem + "_opened")
                .children("." + p.panel)
                .removeClass(p.hidden),
                this.openPanel(
                  t
                    .parents("." + p.panel)
                    .not(function () {
                      return h(this).parent(
                        "." + p.listitem + "_vertical"
                      ).length;
                    })
                    .first()
                ),
                this.trigger("openPanel:start", t),
                this.trigger("openPanel:finish", t);
            else {
              if (t.hasClass(p.panel + "_opened")) return;
              var i = this.$pnls.children("." + p.panel),
                s = this.$pnls.children("." + p.panel + "_opened");
              if (!h[f].support.csstransitions)
                return (
                  s.addClass(p.hidden).removeClass(p.panel + "_opened"),
                  t.removeClass(p.hidden).addClass(p.panel + "_opened"),
                  this.trigger("openPanel:start", t),
                  void this.trigger("openPanel:finish", t)
                );
              i.not(t).removeClass(p.panel + "_opened-parent");
              for (var a = t.data(o.parent); a; )
                (a = a.closest("." + p.panel)).parent(
                  "." + p.listitem + "_vertical"
                ).length || a.addClass(p.panel + "_opened-parent"),
                  (a = a.data(o.parent));
              i
                .removeClass(p.panel + "_highest")
                .not(s)
                .not(t)
                .addClass(p.hidden),
                t.removeClass(p.hidden);
              var r = function () {
                  s.removeClass(p.panel + "_opened"),
                    t.addClass(p.panel + "_opened"),
                    t.hasClass(p.panel + "_opened-parent")
                      ? (s.addClass(p.panel + "_highest"),
                        t.removeClass(p.panel + "_opened-parent"))
                      : (s.addClass(p.panel + "_opened-parent"),
                        t.addClass(p.panel + "_highest")),
                    n.trigger("openPanel:start", t);
                },
                l = function () {
                  s.removeClass(p.panel + "_highest").addClass(p.hidden),
                    t.removeClass(p.panel + "_highest"),
                    n.trigger("openPanel:finish", t);
                };
              e && !t.hasClass(p.panel + "_noanimation")
                ? setTimeout(function () {
                    n.__transitionend(
                      t,
                      function () {
                        l();
                      },
                      n.conf.transitionDuration
                    ),
                      r();
                  }, n.conf.openingInterval)
                : (r(), l());
            }
            this.trigger("openPanel:after", t);
          }
        },
        closePanel: function (t) {
          this.trigger("closePanel:before", t);
          var e = t.parent();
          e.hasClass(p.listitem + "_vertical") &&
            (e.removeClass(p.listitem + "_opened"),
            t.addClass(p.hidden),
            this.trigger("closePanel", t)),
            this.trigger("closePanel:after", t);
        },
        closeAllPanels: function (t) {
          this.trigger("closeAllPanels:before"),
            this.$pnls
              .find("." + p.listview)
              .children()
              .removeClass(p.listitem + "_selected")
              .filter("." + p.listitem + "_vertical")
              .removeClass(p.listitem + "_opened");
          var e = this.$pnls.children("." + p.panel),
            n = t && t.length ? t : e.first();
          this.$pnls
            .children("." + p.panel)
            .not(n)
            .removeClass(p.panel + "_opened")
            .removeClass(p.panel + "_opened-parent")
            .removeClass(p.panel + "_highest")
            .addClass(p.hidden),
            this.openPanel(n, !1),
            this.trigger("closeAllPanels:after");
        },
        togglePanel: function (t) {
          var e = t.parent();
          e.hasClass(p.listitem + "_vertical") &&
            this[
              e.hasClass(p.listitem + "_opened") ? "closePanel" : "openPanel"
            ](t);
        },
        setSelected: function (t) {
          this.trigger("setSelected:before", t),
            this.$menu
              .find("." + p.listitem + "_selected")
              .removeClass(p.listitem + "_selected"),
            t.addClass(p.listitem + "_selected"),
            this.trigger("setSelected:after", t);
        },
        bind: function (t, e) {
          (this.cbck[t] = this.cbck[t] || []), this.cbck[t].push(e);
        },
        trigger: function () {
          var t = Array.prototype.slice.call(arguments),
            e = t.shift();
          if (this.cbck[e])
            for (var n = 0, i = this.cbck[e].length; n < i; n++)
              this.cbck[e][n].apply(this, t);
        },
        matchMedia: function (t, e, n) {
          var i = { yes: e, no: n };
          (this.mtch[t] = this.mtch[t] || []), this.mtch[t].push(i);
        },
        i18n: function (t) {
          return h[f].i18n(t, this.conf.language);
        },
        _initHooks: function () {
          for (var t in this.opts.hooks) this.bind(t, this.opts.hooks[t]);
        },
        _initWrappers: function () {
          this.trigger("initWrappers:before");
          for (var t = 0; t < this.opts.wrappers.length; t++) {
            var e = h[f].wrappers[this.opts.wrappers[t]];
            "function" == typeof e && e.call(this);
          }
          this.trigger("initWrappers:after");
        },
        _initAddons: function () {
          var t;
          for (t in (this.trigger("initAddons:before"), h[f].addons))
            h[f].addons[t].add.call(this),
              (h[f].addons[t].add = function () {});
          for (t in h[f].addons) h[f].addons[t].setup.call(this);
          this.trigger("initAddons:after");
        },
        _initExtensions: function () {
          this.trigger("initExtensions:before");
          var e = this;
          for (var t in (this.opts.extensions.constructor === Array &&
            (this.opts.extensions = { all: this.opts.extensions }),
          this.opts.extensions))
            (this.opts.extensions[t] = this.opts.extensions[t].length
              ? p.menu + "_" + this.opts.extensions[t].join(" " + p.menu + "_")
              : ""),
              this.opts.extensions[t] &&
                (function (t) {
                  e.matchMedia(
                    t,
                    function () {
                      this.$menu.addClass(this.opts.extensions[t]);
                    },
                    function () {
                      this.$menu.removeClass(this.opts.extensions[t]);
                    }
                  );
                })(t);
          this.trigger("initExtensions:after");
        },
        _initMenu: function () {
          this.trigger("initMenu:before");
          this.conf.clone &&
            ((this.$orig = this.$menu),
            (this.$menu = this.$orig.clone()),
            this.$menu
              .add(this.$menu.find("[id]"))
              .filter("[id]")
              .each(function () {
                h(this).attr("id", p.mm(h(this).attr("id")));
              })),
            this.$menu.attr(
              "id",
              this.$menu.attr("id") || this.__getUniqueId()
            ),
            (this.$pnls = h('<div class="' + p.panels + '" />')
              .append(this.$menu.children(this.conf.panelNodetype))
              .prependTo(this.$menu)),
            this.$menu.addClass(p.menu).parent().addClass(p.wrapper),
            this.trigger("initMenu:after");
        },
        _initPanels: function (t) {
          this.trigger("initPanels:before", t),
            (t = t || this.$pnls.children(this.conf.panelNodetype));
          var i = h(),
            s = this,
            a = function (t) {
              t.filter(s.conf.panelNodetype).each(function (t) {
                var e = s._initPanel(h(this));
                if (e) {
                  s._initNavbar(e), s._initListview(e), (i = i.add(e));
                  var n = e
                    .children("." + p.listview)
                    .children("li")
                    .children(s.conf.panelNodetype)
                    .add(e.children("." + s.conf.classNames.panel));
                  n.length && a(n);
                }
              });
            };
          a(t), this.trigger("initPanels:after", i);
        },
        _initPanel: function (t) {
          this.trigger("initPanel:before", t);
          if (t.hasClass(p.panel)) return t;
          if (
            (this.__refactorClass(t, this.conf.classNames.panel, p.panel),
            this.__refactorClass(t, this.conf.classNames.nopanel, p.nopanel),
            this.__refactorClass(
              t,
              this.conf.classNames.inset,
              p.listview + "_inset"
            ),
            t.filter("." + p.listview + "_inset").addClass(p.nopanel),
            t.hasClass(p.nopanel))
          )
            return !1;
          var e =
            t.hasClass(this.conf.classNames.vertical) ||
            !this.opts.slidingSubmenus;
          t.removeClass(this.conf.classNames.vertical);
          var n = t.attr("id") || this.__getUniqueId();
          t.is("ul, ol") &&
            (t.removeAttr("id"), t.wrap("<div />"), (t = t.parent())),
            t.attr("id", n),
            t.addClass(p.panel + " " + p.hidden);
          var i = t.parent("li");
          return (
            e ? i.addClass(p.listitem + "_vertical") : t.appendTo(this.$pnls),
            i.length && (i.data(o.child, t), t.data(o.parent, i)),
            this.trigger("initPanel:after", t),
            t
          );
        },
        _initNavbar: function (t) {
          if (
            (this.trigger("initNavbar:before", t),
            !t.children("." + p.navbar).length)
          ) {
            var e = t.data(o.parent),
              n = h('<div class="' + p.navbar + '" />'),
              i = this.__getPanelTitle(t, this.opts.navbar.title),
              s = "";
            if (e && e.length) {
              if (e.hasClass(p.listitem + "_vertical")) return;
              if (e.parent().is("." + p.listview))
                var a = e.children("a, span").not("." + p.btn + "_next");
              else
                a = e
                  .closest("." + p.panel)
                  .find('a[href="#' + t.attr("id") + '"]');
              var r = (e = (a = a.first()).closest("." + p.panel)).attr("id");
              switch (
                ((i = this.__getPanelTitle(
                  t,
                  h("<span>" + a.text() + "</span>").text()
                )),
                this.opts.navbar.titleLink)
              ) {
                case "anchor":
                  s = a.attr("href");
                  break;
                case "parent":
                  s = "#" + r;
              }
              n.append(
                '<a class="' +
                  p.btn +
                  " " +
                  p.btn +
                  "_prev " +
                  p.navbar +
                  '__btn" href="#' +
                  r +
                  '" />'
              );
            } else if (!this.opts.navbar.title) return;
            this.opts.navbar.add && t.addClass(p.panel + "_has-navbar"),
              n
                .append(
                  '<a class="' +
                    p.navbar +
                    '__title"' +
                    (s.length ? ' href="' + s + '"' : "") +
                    ">" +
                    i +
                    "</a>"
                )
                .prependTo(t),
              this.trigger("initNavbar:after", t);
          }
        },
        _initListview: function (t) {
          this.trigger("initListview:before", t);
          var e = this.__childAddBack(t, "ul, ol");
          this.__refactorClass(
            e,
            this.conf.classNames.nolistview,
            p.nolistview
          );
          var n = e
            .not("." + p.nolistview)
            .addClass(p.listview)
            .children()
            .addClass(p.listitem);
          this.__refactorClass(
            n,
            this.conf.classNames.selected,
            p.listitem + "_selected"
          ),
            this.__refactorClass(
              n,
              this.conf.classNames.divider,
              p.listitem + "_divider"
            ),
            this.__refactorClass(
              n,
              this.conf.classNames.spacer,
              p.listitem + "_spacer"
            ),
            n
              .children("a, span")
              .not("." + p.btn)
              .addClass(p.listitem + "__text");
          var i = t.data(o.parent);
          if (i && i.is("." + p.listitem) && !i.children("." + p.btn).length) {
            var s = i.children("a, span").first(),
              a = h(
                '<a class="' +
                  p.btn +
                  " " +
                  p.btn +
                  "_next " +
                  p.listitem +
                  '__btn" href="#' +
                  t.attr("id") +
                  '" />'
              );
            a.insertAfter(s),
              s.is("span") &&
                (a.addClass(p.listitem + "__text").html(s.html()), s.remove());
          }
          this.trigger("initListview:after", t);
        },
        _initOpened: function () {
          this.trigger("initOpened:before");
          var t = this.$pnls
              .find("." + p.listitem + "_selected")
              .removeClass(p.listitem + "_selected")
              .last()
              .addClass(p.listitem + "_selected"),
            e = t.length
              ? t.closest("." + p.panel)
              : this.$pnls.children("." + p.panel).first();
          this.openPanel(e, !1), this.trigger("initOpened:after");
        },
        _initAnchors: function () {
          this.trigger("initAnchors:before");
          var c = this;
          t.$body.on(a.click + "-oncanvas", "a[href]", function (t) {
            var e = h(this),
              n = e.attr("href"),
              i = c.$menu.find(e).length,
              s = e.is("." + p.listitem + " > a"),
              a = e.is('[rel="external"]') || e.is('[target="_blank"]');
            if (i && 1 < n.length && "#" == n.slice(0, 1))
              try {
                var r = c.$menu.find(n);
                if (r.is("." + p.panel))
                  return (
                    c[
                      e.parent().hasClass(p.listitem + "_vertical")
                        ? "togglePanel"
                        : "openPanel"
                    ](r),
                    void t.preventDefault()
                  );
              } catch (t) {}
            var l = {
              close: null,
              setSelected: null,
              preventDefault: "#" == n.slice(0, 1),
            };
            for (var o in h[f].addons) {
              var d = h[f].addons[o].clickAnchor.call(c, e, i, s, a);
              if (d) {
                if ("boolean" == typeof d) return void t.preventDefault();
                "object" == typeof d && (l = h.extend({}, l, d));
              }
            }
            i &&
              s &&
              !a &&
              (c.__valueOrFn(e, c.opts.onClick.setSelected, l.setSelected) &&
                c.setSelected(h(t.target).parent()),
              c.__valueOrFn(
                e,
                c.opts.onClick.preventDefault,
                l.preventDefault
              ) && t.preventDefault(),
              c.__valueOrFn(e, c.opts.onClick.close, l.close) &&
                c.opts.offCanvas &&
                "function" == typeof c.close &&
                c.close());
          }),
            this.trigger("initAnchors:after");
        },
        _initMatchMedia: function () {
          var n = this;
          for (var i in this.mtch)
            !(function () {
              var e = i,
                t = window.matchMedia(e);
              n._fireMatchMedia(e, t),
                t.addListener(function (t) {
                  n._fireMatchMedia(e, t);
                });
            })();
        },
        _fireMatchMedia: function (t, e) {
          for (
            var n = e.matches ? "yes" : "no", i = 0;
            i < this.mtch[t].length;
            i++
          )
            this.mtch[t][i][n].call(this);
        },
        _getOriginalMenuId: function () {
          var t = this.$menu.attr("id");
          return this.conf.clone && t && t.length && (t = p.umm(t)), t;
        },
        __api: function () {
          var n = this,
            i = {};
          return (
            h.each(this._api, function (t) {
              var e = this;
              i[e] = function () {
                var t = n[e].apply(n, arguments);
                return void 0 === t ? i : t;
              };
            }),
            i
          );
        },
        __valueOrFn: function (t, e, n) {
          if ("function" == typeof e) {
            var i = e.call(t[0]);
            if (void 0 !== i) return i;
          }
          return ("function" != typeof e && void 0 !== e) || void 0 === n
            ? e
            : n;
        },
        __getPanelTitle: function (t, e) {
          var n;
          return (
            "function" == typeof this.opts.navbar.title &&
              (n = this.opts.navbar.title.call(t[0])),
            void 0 === n && (n = t.data(o.title)),
            void 0 !== n
              ? n
              : "string" == typeof e
              ? this.i18n(e)
              : this.i18n(h[f].defaults.navbar.title)
          );
        },
        __refactorClass: function (t, e, n) {
          return t
            .filter("." + e)
            .removeClass(e)
            .addClass(n);
        },
        __findAddBack: function (t, e) {
          return t.find(e).add(t.filter(e));
        },
        __childAddBack: function (t, e) {
          return t.children(e).add(t.filter(e));
        },
        __filterListItems: function (t) {
          return t.not("." + p.listitem + "_divider").not("." + p.hidden);
        },
        __filterListItemAnchors: function (t) {
          return this.__filterListItems(t)
            .children("a")
            .not("." + p.btn + "_next");
        },
        __openPanelWoAnimation: function (t) {
          t.hasClass(p.panel + "_noanimation") ||
            (t.addClass(p.panel + "_noanimation"),
            this.__transitionend(
              t,
              function () {
                t.removeClass(p.panel + "_noanimation");
              },
              this.conf.openingInterval
            ),
            this.openPanel(t));
        },
        __transitionend: function (e, n, t) {
          var i = !1,
            s = function (t) {
              (void 0 !== t && t.target != e[0]) ||
                (i ||
                  (e.off(a.transitionend),
                  e.off(a.webkitTransitionEnd),
                  n.call(e[0])),
                (i = !0));
            };
          e.on(a.transitionend, s),
            e.on(a.webkitTransitionEnd, s),
            setTimeout(s, 1.1 * t);
        },
        __getUniqueId: function () {
          return p.mm(h[f].uniqueId++);
        },
      }),
      (h.fn[f] = function (n, i) {
        !(function () {
          if (h[f].glbl) return;
          (t = {
            $wndw: h(window),
            $docu: h(document),
            $html: h("html"),
            $body: h("body"),
          }),
            (p = {}),
            (o = {}),
            (a = {}),
            h.each([p, o, a], function (t, i) {
              i.add = function (t) {
                t = t.split(" ");
                for (var e = 0, n = t.length; e < n; e++) i[t[e]] = i.mm(t[e]);
              };
            }),
            (p.mm = function (t) {
              return "mm-" + t;
            }),
            p.add(
              "wrapper menu panels panel nopanel navbar listview nolistview listitem btn hidden"
            ),
            (p.umm = function (t) {
              return "mm-" == t.slice(0, 3) && (t = t.slice(3)), t;
            }),
            (o.mm = function (t) {
              return "mm-" + t;
            }),
            o.add("parent child title"),
            (a.mm = function (t) {
              return t + ".mm";
            }),
            a.add(
              "transitionend webkitTransitionEnd click scroll resize keydown mousedown mouseup touchstart touchmove touchend orientationchange"
            ),
            (h[f]._c = p),
            (h[f]._d = o),
            (h[f]._e = a),
            (h[f].glbl = t);
        })(),
          (n = h.extend(!0, {}, h[f].defaults, n)),
          (i = h.extend(!0, {}, h[f].configuration, i));
        var s = h();
        return (
          this.each(function () {
            var t = h(this);
            if (!t.data(f)) {
              var e = new h[f](t, n, i);
              e.$menu.data(f, e.__api()), (s = s.add(e.$menu));
            }
          }),
          s
        );
      }),
      (h[f].i18n =
        ((n = {}),
        function (t, e) {
          switch (typeof t) {
            case "object":
              return (
                "string" == typeof e &&
                  (void 0 === n[e] && (n[e] = {}), h.extend(n[e], t)),
                n
              );
            case "string":
              return ("string" == typeof e && void 0 !== n[e] && n[e][t]) || t;
            case "undefined":
            default:
              return n;
          }
        })),
      (h[f].support = {
        touch: "ontouchstart" in window || navigator.msMaxTouchPoints || !1,
        csstransitions:
          "undefined" == typeof Modernizr ||
          void 0 === Modernizr.csstransitions ||
          Modernizr.csstransitions,
      }));
  })(jQuery);
  !(function (r) {
    var s,
      i,
      o,
      a,
      t = "mmenu",
      p = "offCanvas";
    (r[t].addons[p] = {
      setup: function () {
        if (this.opts[p]) {
          var e = this.opts[p],
            i = this.conf[p];
          (a = r[t].glbl),
            (this._api = r.merge(this._api, ["open", "close", "setPage"])),
            "object" != typeof e && (e = {}),
            (e = this.opts[p] = r.extend(!0, {}, r[t].defaults[p], e)),
            "string" != typeof i.page.selector &&
              (i.page.selector = "> " + i.page.nodetype),
            (this.vars.opened = !1);
          var o = [s.menu + "_offcanvas"];
          this.bind("initMenu:after", function () {
            var e = this;
            this._initBlocker(),
              this.setPage(a.$page),
              this["_initWindow_" + p](),
              this.$menu
                .addClass(o.join(" "))
                .parent("." + s.wrapper)
                .removeClass(s.wrapper),
              this.$menu[i.menu.insertMethod](i.menu.insertSelector);
            var t = window.location.hash;
            if (t) {
              var n = this._getOriginalMenuId();
              n &&
                n == t.slice(1) &&
                setTimeout(function () {
                  e.open();
                }, 1e3);
            }
          }),
            this.bind("setPage:after", function (e) {
              a.$blck && a.$blck.children("a").attr("href", "#" + e.attr("id"));
            }),
            this.bind("open:start:sr-aria", function () {
              this.__sr_aria(this.$menu, "hidden", !1);
            }),
            this.bind("close:finish:sr-aria", function () {
              this.__sr_aria(this.$menu, "hidden", !0);
            }),
            this.bind("initMenu:after:sr-aria", function () {
              this.__sr_aria(this.$menu, "hidden", !0);
            }),
            this.bind("initBlocker:after:sr-text", function () {
              a.$blck
                .children("a")
                .html(
                  this.__sr_text(
                    this.i18n(this.conf.screenReader.text.closeMenu)
                  )
                );
            });
        }
      },
      add: function () {
        (s = r[t]._c),
          (i = r[t]._d),
          (o = r[t]._e),
          s.add("slideout page no-csstransforms3d"),
          i.add("style");
      },
      clickAnchor: function (e, t) {
        var n = this;
        if (this.opts[p]) {
          var i = this._getOriginalMenuId();
          if (i && e.is('[href="#' + i + '"]')) {
            if (t) return this.open(), !0;
            var o = e.closest("." + s.menu);
            if (o.length) {
              var r = o.data("mmenu");
              if (r && r.close)
                return (
                  r.close(),
                  n.__transitionend(
                    o,
                    function () {
                      n.open();
                    },
                    n.conf.transitionDuration
                  ),
                  !0
                );
            }
            return this.open(), !0;
          }
          if (a.$page)
            return (i = a.$page.first().attr("id")) &&
              e.is('[href="#' + i + '"]')
              ? (this.close(), !0)
              : void 0;
        }
      },
    }),
      (r[t].defaults[p] = { blockUI: !0, moveBackground: !0 }),
      (r[t].configuration[p] = {
        menu: { insertMethod: "prependTo", insertSelector: "body" },
        page: {
          nodetype: "div",
          selector: null,
          noSelector: [],
          wrapIfNeeded: !0,
        },
      }),
      (r[t].prototype.open = function () {
        if ((this.trigger("open:before"), !this.vars.opened)) {
          var e = this;
          this._openSetup(),
            setTimeout(function () {
              e._openFinish();
            }, this.conf.openingInterval),
            this.trigger("open:after");
        }
      }),
      (r[t].prototype._openSetup = function () {
        var e = this,
          t = this.opts[p];
        this.closeAllOthers(),
          a.$page.each(function () {
            r(this).data(i.style, r(this).attr("style") || "");
          }),
          a.$wndw.trigger(o.resize + "-" + p, [!0]);
        var n = [s.wrapper + "_opened"];
        t.blockUI && n.push(s.wrapper + "_blocking"),
          "modal" == t.blockUI && n.push(s.wrapper + "_modal"),
          t.moveBackground && n.push(s.wrapper + "_background"),
          a.$html.addClass(n.join(" ")),
          setTimeout(function () {
            e.vars.opened = !0;
          }, this.conf.openingInterval),
          this.$menu.addClass(s.menu + "_opened");
      }),
      (r[t].prototype._openFinish = function () {
        var e = this;
        this.__transitionend(
          a.$page.first(),
          function () {
            e.trigger("open:finish");
          },
          this.conf.transitionDuration
        ),
          this.trigger("open:start"),
          a.$html.addClass(s.wrapper + "_opening");
      }),
      (r[t].prototype.close = function () {
        if ((this.trigger("close:before"), this.vars.opened)) {
          var t = this;
          this.__transitionend(
            a.$page.first(),
            function () {
              t.$menu.removeClass(s.menu + "_opened");
              var e = [
                s.wrapper + "_opened",
                s.wrapper + "_blocking",
                s.wrapper + "_modal",
                s.wrapper + "_background",
              ];
              a.$html.removeClass(e.join(" ")),
                a.$page.each(function () {
                  var e = r(this).data(i.style);
                  r(this).attr("style", e);
                }),
                (t.vars.opened = !1),
                t.trigger("close:finish");
            },
            this.conf.transitionDuration
          ),
            this.trigger("close:start"),
            a.$html.removeClass(s.wrapper + "_opening"),
            this.trigger("close:after");
        }
      }),
      (r[t].prototype.closeAllOthers = function () {
        a.$body
          .find("." + s.menu + "_offcanvas")
          .not(this.$menu)
          .each(function () {
            var e = r(this).data(t);
            e && e.close && e.close();
          });
      }),
      (r[t].prototype.setPage = function (e) {
        this.trigger("setPage:before", e);
        var t = this,
          n = this.conf[p];
        (e && e.length) ||
          ((e = a.$body
            .find(n.page.selector)
            .not("." + s.menu)
            .not("." + s.wrapper + "__blocker")),
          n.page.noSelector.length && (e = e.not(n.page.noSelector.join(", "))),
          1 < e.length &&
            n.page.wrapIfNeeded &&
            (e = e.wrapAll("<" + this.conf[p].page.nodetype + " />").parent())),
          e.addClass(s.page + " " + s.slideout).each(function () {
            r(this).attr("id", r(this).attr("id") || t.__getUniqueId());
          }),
          (a.$page = e),
          this.trigger("setPage:after", e);
      }),
      (r[t].prototype["_initWindow_" + p] = function () {
        a.$wndw.off(o.keydown + "-" + p).on(o.keydown + "-" + p, function (e) {
          if (a.$html.hasClass(s.wrapper + "_opened") && 9 == e.keyCode)
            return e.preventDefault(), !1;
        });
        var i = 0;
        a.$wndw.off(o.resize + "-" + p).on(o.resize + "-" + p, function (e, t) {
          if (
            1 == a.$page.length &&
            (t || a.$html.hasClass(s.wrapper + "_opened"))
          ) {
            var n = a.$wndw.height();
            (t || n != i) && ((i = n), a.$page.css("minHeight", n));
          }
        });
      }),
      (r[t].prototype._initBlocker = function () {
        var t = this,
          e = this.opts[p],
          n = this.conf[p];
        this.trigger("initBlocker:before"),
          e.blockUI &&
            (a.$blck ||
              (a.$blck = r(
                '<div class="' + s.wrapper + "__blocker " + s.slideout + '" />'
              ).append("<a />")),
            a.$blck
              .appendTo(n.menu.insertSelector)
              .off(o.touchstart + "-" + p + " " + o.touchmove + "-" + p)
              .on(
                o.touchstart + "-" + p + " " + o.touchmove + "-" + p,
                function (e) {
                  e.preventDefault(),
                    e.stopPropagation(),
                    a.$blck.trigger(o.mousedown + "-" + p);
                }
              )
              .off(o.mousedown + "-" + p)
              .on(o.mousedown + "-" + p, function (e) {
                e.preventDefault(),
                  a.$html.hasClass(s.wrapper + "_modal") ||
                    (t.closeAllOthers(), t.close());
              }),
            this.trigger("initBlocker:after"));
      });
  })(jQuery);
  !(function (n) {
    var s,
      o,
      i = "mmenu",
      e = "screenReader";
    (n[i].addons[e] = {
      setup: function () {
        var r = this,
          t = this.opts[e],
          a = this.conf[e];
        n[i].glbl,
          "boolean" == typeof t && (t = { aria: t, text: t }),
          "object" != typeof t && (t = {}),
          (t = this.opts[e] = n.extend(!0, {}, n[i].defaults[e], t)).aria &&
            (this.bind("initAddons:after", function () {
              this.bind("initMenu:after", function () {
                this.trigger("initMenu:after:sr-aria");
              }),
                this.bind("initNavbar:after", function () {
                  this.trigger("initNavbar:after:sr-aria", arguments[0]);
                }),
                this.bind("openPanel:start", function () {
                  this.trigger("openPanel:start:sr-aria", arguments[0]);
                }),
                this.bind("close:start", function () {
                  this.trigger("close:start:sr-aria");
                }),
                this.bind("close:finish", function () {
                  this.trigger("close:finish:sr-aria");
                }),
                this.bind("open:start", function () {
                  this.trigger("open:start:sr-aria");
                }),
                this.bind("initOpened:after", function () {
                  this.trigger("initOpened:after:sr-aria");
                });
            }),
            this.bind("updateListview", function () {
              this.$pnls
                .find("." + s.listview)
                .children()
                .each(function () {
                  r.__sr_aria(n(this), "hidden", n(this).is("." + s.hidden));
                });
            }),
            this.bind("openPanel:start", function (t) {
              var i = this.$menu
                  .find("." + s.panel)
                  .not(t)
                  .not(t.parents("." + s.panel)),
                n = t.add(
                  t
                    .find(
                      "." + s.listitem + "_vertical ." + s.listitem + "_opened"
                    )
                    .children("." + s.panel)
                );
              this.__sr_aria(i, "hidden", !0), this.__sr_aria(n, "hidden", !1);
            }),
            this.bind("closePanel", function (t) {
              this.__sr_aria(t, "hidden", !0);
            }),
            this.bind("initPanels:after", function (t) {
              var i = t.find("." + s.btn).each(function () {
                r.__sr_aria(
                  n(this),
                  "owns",
                  n(this).attr("href").replace("#", "")
                );
              });
              this.__sr_aria(i, "haspopup", !0);
            }),
            this.bind("initNavbar:after", function (t) {
              var i = t.children("." + s.navbar);
              this.__sr_aria(i, "hidden", !t.hasClass(s.panel + "_has-navbar"));
            }),
            t.text &&
              "parent" == this.opts.navbar.titleLink &&
              this.bind("initNavbar:after", function (t) {
                var i = t.children("." + s.navbar),
                  n = !!i.children("." + s.btn + "_prev").length;
                this.__sr_aria(i.children("." + s.title), "hidden", n);
              })),
          t.text &&
            (this.bind("initAddons:after", function () {
              this.bind("setPage:after", function () {
                this.trigger("setPage:after:sr-text", arguments[0]);
              }),
                this.bind("initBlocker:after", function () {
                  this.trigger("initBlocker:after:sr-text");
                });
            }),
            this.bind("initNavbar:after", function (t) {
              var i = t.children("." + s.navbar),
                n = this.i18n(a.text.closeSubmenu);
              i.children("." + s.btn + "_prev").html(this.__sr_text(n));
            }),
            this.bind("initListview:after", function (t) {
              var i = t.data(o.parent);
              if (i && i.length) {
                var n = i.children("." + s.btn + "_next"),
                  e = this.i18n(
                    a.text[
                      n.parent().is("." + s.listitem + "_vertical")
                        ? "toggleSubmenu"
                        : "openSubmenu"
                    ]
                  );
                n.append(r.__sr_text(e));
              }
            }));
      },
      add: function () {
        (s = n[i]._c), (o = n[i]._d), n[i]._e, s.add("sronly");
      },
      clickAnchor: function (t, i) {},
    }),
      (n[i].defaults[e] = { aria: !0, text: !0 }),
      (n[i].configuration[e] = {
        text: {
          closeMenu: "Close menu",
          closeSubmenu: "Close submenu",
          openSubmenu: "Open submenu",
          toggleSubmenu: "Toggle submenu",
        },
      }),
      (n[i].prototype.__sr_aria = function (t, i, n) {
        t.prop("aria-" + i, n)[n ? "attr" : "removeAttr"]("aria-" + i, n);
      }),
      (n[i].prototype.__sr_role = function (t, i) {
        t.prop("role", i)[i ? "attr" : "removeAttr"]("role", i);
      }),
      (n[i].prototype.__sr_text = function (t) {
        return '<span class="' + s.sronly + '">' + t + "</span>";
      });
  })(jQuery);
  !(function (n) {
    var e,
      r,
      s,
      t = "mmenu",
      i = "scrollBugFix";
    (n[t].addons[i] = {
      setup: function () {
        var o = this.opts[i];
        this.conf[i];
        (s = n[t].glbl),
          n[t].support.touch &&
            this.opts.offCanvas &&
            this.opts.offCanvas.blockUI &&
            ("boolean" == typeof o && (o = { fix: o }),
            "object" != typeof o && (o = {}),
            (o = this.opts[i] = n.extend(!0, {}, n[t].defaults[i], o)).fix &&
              (this.bind("open:start", function () {
                this.$pnls.children("." + e.panel + "_opened").scrollTop(0);
              }),
              this.bind("initMenu:after", function () {
                this["_initWindow_" + i]();
              })));
      },
      add: function () {
        (e = n[t]._c), n[t]._d, (r = n[t]._e);
      },
      clickAnchor: function (o, t) {},
    }),
      (n[t].defaults[i] = { fix: !0 }),
      (n[t].prototype["_initWindow_" + i] = function () {
        var o = this;
        n(document)
          .off(r.touchmove + "-" + i)
          .on(r.touchmove + "-" + i, function (o) {
            s.$html.hasClass(e.wrapper + "_opened") && o.preventDefault();
          });
        var t = !1;
        s.$body
          .off(r.touchstart + "-" + i)
          .on(
            r.touchstart + "-" + i,
            "." + e.panels + "> ." + e.panel,
            function (o) {
              s.$html.hasClass(e.wrapper + "_opened") &&
                (t ||
                  ((t = !0),
                  0 === o.currentTarget.scrollTop
                    ? (o.currentTarget.scrollTop = 1)
                    : o.currentTarget.scrollHeight ===
                        o.currentTarget.scrollTop +
                          o.currentTarget.offsetHeight &&
                      (o.currentTarget.scrollTop -= 1),
                  (t = !1)));
            }
          )
          .off(r.touchmove + "-" + i)
          .on(
            r.touchmove + "-" + i,
            "." + e.panels + "> ." + e.panel,
            function (o) {
              s.$html.hasClass(e.wrapper + "_opened") &&
                n(this)[0].scrollHeight > n(this).innerHeight() &&
                o.stopPropagation();
            }
          ),
          s.$wndw
            .off(r.orientationchange + "-" + i)
            .on(r.orientationchange + "-" + i, function () {
              o.$pnls
                .children("." + e.panel + "_opened")
                .scrollTop(0)
                .css({ "-webkit-overflow-scrolling": "auto" })
                .css({ "-webkit-overflow-scrolling": "touch" });
            });
      });
  })(jQuery);
  !(function (s) {
    var a,
      e = "mmenu",
      i = "autoHeight";
    (s[e].addons[i] = {
      setup: function () {
        var h = this.opts[i];
        this.conf[i];
        if (
          (s[e].glbl,
          "boolean" == typeof h && h && (h = { height: "auto" }),
          "string" == typeof h && (h = { height: h }),
          "object" != typeof h && (h = {}),
          "auto" ==
            (h = this.opts[i] = s.extend(!0, {}, s[e].defaults[i], h)).height ||
            "highest" == h.height)
        ) {
          this.bind("initMenu:after", function () {
            this.$menu.addClass(a.menu + "_autoheight");
          });
          var t = function (t) {
            if (!this.opts.offCanvas || this.vars.opened) {
              var e = Math.max(parseInt(this.$pnls.css("top"), 10), 0) || 0,
                i = Math.max(parseInt(this.$pnls.css("bottom"), 10), 0) || 0,
                n = 0;
              this.$menu.addClass(a.menu + "_autoheight-measuring"),
                "auto" == h.height
                  ? ((t =
                      t ||
                      this.$pnls.children("." + a.panel + "_opened")).parent(
                      "." + a.listitem + "_vertical"
                    ).length &&
                      (t = t.parents("." + a.panel).not(function () {
                        return s(this).parent(
                          "." + a.listitem + "_vertical"
                        ).length;
                      })),
                    t.length || (t = this.$pnls.children("." + a.panel)),
                    (n = t.first().outerHeight()))
                  : "highest" == h.height &&
                    this.$pnls.children("." + a.panel).each(function () {
                      var t = s(this);
                      t.parent("." + a.listitem + "_vertical").length &&
                        (t = t.parents("." + a.panel).not(function () {
                          return s(this).parent(
                            "." + a.listitem + "_vertical"
                          ).length;
                        })),
                        (n = Math.max(n, t.first().outerHeight()));
                    }),
                this.$menu
                  .height(n + e + i)
                  .removeClass(a.menu + "_autoheight-measuring");
            }
          };
          this.opts.offCanvas && this.bind("open:start", t),
            "highest" == h.height && this.bind("initPanels:after", t),
            "auto" == h.height &&
              (this.bind("updateListview", t),
              this.bind("openPanel:start", t),
              this.bind("closePanel", t));
        }
      },
      add: function () {
        (a = s[e]._c), s[e]._d, s[e]._e.add("resize");
      },
      clickAnchor: function (t, e) {},
    }),
      (s[e].defaults[i] = { height: "default" });
  })(jQuery);
  !(function (s) {
    var a,
      h = "mmenu",
      c = "backButton";
    (s[h].addons[c] = {
      setup: function () {
        if (this.opts.offCanvas) {
          var o = this,
            n = this.opts[c];
          this.conf[c];
          s[h].glbl,
            "boolean" == typeof n && (n = { close: n }),
            "object" != typeof n && (n = {}),
            (n = s.extend(!0, {}, s[h].defaults[c], n));
          var e = "#" + this.$menu.attr("id");
          if (n.close) {
            var i = [];
            function t() {
              (i = [e]),
                this.$pnls
                  .children("." + a.panel + "_opened-parent")
                  .add(o.$pnls.children("." + a.panel + "_opened"))
                  .each(function () {
                    i.push("#" + s(this).attr("id"));
                  });
            }
            this.bind("open:finish", function () {
              history.pushState(null, document.title, e);
            }),
              this.bind("open:finish", t),
              this.bind("openPanel:finish", t),
              this.bind("close:finish", function () {
                (i = []),
                  history.back(),
                  history.pushState(
                    null,
                    document.title,
                    location.pathname + location.search
                  );
              }),
              s(window).on("popstate", function (n) {
                if (o.vars.opened && i.length) {
                  var t = (i = i.slice(0, -1))[i.length - 1];
                  t == e
                    ? o.close()
                    : (o.openPanel(s(t)),
                      history.pushState(null, document.title, e));
                }
              });
          }
          n.open &&
            s(window).on("popstate", function (n) {
              o.vars.opened || location.hash != e || o.open();
            });
        }
      },
      add: function () {
        window.history && window.history.pushState
          ? ((a = s[h]._c), s[h]._d, s[h]._e)
          : (s[h].addons[c].setup = function () {});
      },
      clickAnchor: function (n, t) {},
    }),
      (s[h].defaults[c] = { close: !1, open: !1 });
  })(jQuery);
  !(function (t) {
    var o,
      d,
      n = "mmenu",
      p = "columns";
    (t[n].addons[p] = {
      setup: function () {
        var i = this.opts[p];
        this.conf[p];
        if (
          (t[n].glbl,
          "boolean" == typeof i && (i = { add: i }),
          "number" == typeof i && (i = { add: !0, visible: i }),
          "object" != typeof i && (i = {}),
          "number" == typeof i.visible &&
            (i.visible = { min: i.visible, max: i.visible }),
          (i = this.opts[p] = t.extend(!0, {}, t[n].defaults[p], i)).add)
        ) {
          (i.visible.min = Math.max(1, Math.min(6, i.visible.min))),
            (i.visible.max = Math.max(
              i.visible.min,
              Math.min(6, i.visible.max)
            ));
          for (var a = "", s = "", e = 0; e <= i.visible.max; e++)
            (a += " " + o.menu + "_columns-" + e),
              (s += " " + o.panel + "_columns-" + e);
          a.length && ((a = a.slice(1)), (s = s.slice(1)));
          var l =
            s +
            " " +
            o.panel +
            "_opened " +
            o.panel +
            "_opened-parent " +
            o.panel +
            "_highest";
          this.bind("openPanel:before", function (e) {
            var n = e.data(d.parent);
            if (n && (n = n.closest("." + o.panel)).length) {
              var i = n.attr("class");
              if (i && (i = i.split(o.panel + "_columns-")[1]))
                for (i = parseInt(i.split(" ")[0], 10) + 1; 0 < i; ) {
                  var a = this.$pnls.children("." + o.panel + "_columns-" + i);
                  if (!a.length) {
                    i = -1;
                    break;
                  }
                  i++, a.removeClass(l).addClass(o.hidden);
                }
            }
          }),
            this.bind("openPanel:start", function (e) {
              var n = this.$pnls.children(
                "." + o.panel + "_opened-parent"
              ).length;
              e.hasClass(o.panel + "_opened-parent") || n++,
                (n = Math.min(i.visible.max, Math.max(i.visible.min, n))),
                this.$menu.removeClass(a).addClass(o.menu + "_columns-" + n),
                this.$pnls
                  .children("." + o.panel)
                  .removeClass(s)
                  .filter("." + o.panel + "_opened-parent")
                  .add(e)
                  .slice(-i.visible.max)
                  .each(function (e) {
                    t(this).addClass(o.panel + "_columns-" + e);
                  });
            });
        }
      },
      add: function () {
        (o = t[n]._c), (d = t[n]._d), t[n]._e;
      },
      clickAnchor: function (e, n) {},
    }),
      (t[n].defaults[p] = { add: !1, visible: { min: 1, max: 3 } });
  })(jQuery);
  !(function (a) {
    var s,
      d,
      n = "mmenu",
      c = "counters";
    (a[n].addons[c] = {
      setup: function () {
        var i = this,
          e = this.opts[c];
        this.conf[c];
        if (
          (a[n].glbl,
          "boolean" == typeof e && (e = { add: e, update: e }),
          "object" != typeof e && (e = {}),
          (e = this.opts[c] = a.extend(!0, {}, a[n].defaults[c], e)),
          this.bind("initListview:after", function (t) {
            var n = this.conf.classNames[c].counter;
            this.__refactorClass(t.find("." + n), n, s.counter);
          }),
          e.add &&
            this.bind("initListview:after", function (t) {
              var n;
              switch (e.addTo) {
                case "panels":
                  n = t;
                  break;
                default:
                  n = t.filter(e.addTo);
              }
              n.each(function () {
                var t = a(this).data(d.parent);
                t &&
                  (t.find("." + s.counter).length ||
                    t
                      .children("." + s.btn)
                      .prepend(a('<span class="' + s.counter + '" />')));
              });
            }),
          e.update)
        ) {
          var t = function (t) {
            (t = t || this.$pnls.children("." + s.panel)).each(function () {
              var t = a(this),
                n = t.data(d.parent);
              if (n) {
                var e = n.find("." + s.counter);
                e.length &&
                  (t = t.children("." + s.listview)).length &&
                  e.html(i.__filterListItems(t.children()).length);
              }
            });
          };
          this.bind("initListview:after", t), this.bind("updateListview", t);
        }
      },
      add: function () {
        (s = a[n]._c), (d = a[n]._d), a[n]._e, s.add("counter");
      },
      clickAnchor: function (t, n) {},
    }),
      (a[n].defaults[c] = { add: !1, addTo: "panels", count: !1 }),
      (a[n].configuration.classNames[c] = { counter: "Counter" });
  })(jQuery);
  !(function (d) {
    var l,
      i,
      t = "mmenu",
      a = "dividers";
    (d[t].addons[a] = {
      setup: function () {
        var e = this,
          n = this.opts[a];
        this.conf[a];
        if (
          (d[t].glbl,
          "boolean" == typeof n && (n = { add: n, fixed: n }),
          "object" != typeof n && (n = {}),
          (n = this.opts[a] = d.extend(!0, {}, d[t].defaults[a], n)).type &&
            this.bind("initMenu:after", function () {
              this.$menu.addClass(l.menu + "_" + a + "-" + n.type);
            }),
          n.add &&
            this.bind("initListview:after", function (i) {
              var t;
              switch (n.addTo) {
                case "panels":
                  t = i;
                  break;
                default:
                  t = i.filter(n.addTo);
              }
              t.length &&
                (t.children("." + l.listitem + "_divider").remove(),
                t.find("." + l.listview).each(function () {
                  var t = "";
                  e.__filterListItems(d(this).children()).each(function () {
                    var i = d
                      .trim(d(this).children("a, span").text())
                      .slice(0, 1)
                      .toLowerCase();
                    i != t &&
                      i.length &&
                      ((t = i),
                      d(
                        '<li class="' +
                          l.listitem +
                          " " +
                          l.listitem +
                          '_divider">' +
                          i +
                          "</li>"
                      ).insertBefore(this));
                  });
                }));
            }),
          n.fixed)
        ) {
          this.bind("initPanels:after", function () {
            void 0 === this.$fixeddivider &&
              (this.$fixeddivider = d(
                '<ul class="' +
                  l.listview +
                  " " +
                  l.listview +
                  '_fixeddivider"><li class="' +
                  l.listitem +
                  " " +
                  l.listitem +
                  '_divider"></li></ul>'
              )
                .appendTo(this.$pnls)
                .children());
          });
          var s = function (i) {
            if (
              !(i = i || this.$pnls.children("." + l.panel + "_opened")).is(
                ":hidden"
              )
            ) {
              var t = i.find("." + l.listitem + "_divider").not("." + l.hidden),
                e = i.scrollTop() || 0,
                n = "";
              t.each(function () {
                d(this).position().top + e < e + 1 && (n = d(this).text());
              }),
                this.$fixeddivider.text(n),
                this.$pnls[n.length ? "addClass" : "removeClass"](
                  l.panel + "_dividers"
                );
            }
          };
          this.bind("open:start", s),
            this.bind("openPanel:start", s),
            this.bind("updateListview", s),
            this.bind("initPanel:after", function (t) {
              t.off(i.scroll + "-" + a + " " + i.touchmove + "-" + a).on(
                i.scroll + "-" + a + " " + i.touchmove + "-" + a,
                function (i) {
                  t.hasClass(l.panel + "_opened") && s.call(e, t);
                }
              );
            });
        }
      },
      add: function () {
        (l = d[t]._c), d[t]._d, (i = d[t]._e).add("scroll");
      },
      clickAnchor: function (i, t) {},
    }),
      (d[t].defaults[a] = { add: !1, addTo: "panels", fixed: !1, type: null });
  })(jQuery);
  !(function (y) {
    var x,
      p,
      o,
      n = "mmenu",
      O = "drag";
    function $(n, e, t) {
      return n < e && (n = e), t < n && (n = t), n;
    }
    (y[n].addons[O] = {
      setup: function () {
        if (this.opts.offCanvas) {
          var e = this.opts[O],
            t = this.conf[O];
          (o = y[n].glbl),
            "boolean" == typeof e && (e = { menu: e, panels: e }),
            "object" != typeof e && (e = {}),
            "boolean" == typeof e.menu && (e.menu = { open: e.menu }),
            "object" != typeof e.menu && (e.menu = {}),
            "boolean" == typeof e.panels && (e.panels = { close: e.panels }),
            "object" != typeof e.panels && (e.panels = {}),
            (e = this.opts[O] = y.extend(!0, {}, y[n].defaults[O], e)).menu
              .open &&
              this.bind("setPage:after", function () {
                (function (e, t, o) {
                  var i,
                    a,
                    s,
                    r,
                    p = this,
                    c = {
                      events: "panleft panright",
                      typeLower: "x",
                      typeUpper: "X",
                      open_dir: "right",
                      close_dir: "left",
                      negative: !1,
                    },
                    d = "width",
                    u = c.open_dir,
                    f = function (n) {
                      n <= e.maxStartPos && (m = 1);
                    },
                    l = function () {
                      return y("." + x.slideout);
                    },
                    m = 0,
                    h = 0,
                    g = 0,
                    n = this.opts.extensions.all,
                    _ =
                      void 0 === n
                        ? "left"
                        : -1 < n.indexOf(x.menu + "_position-right")
                        ? "right"
                        : -1 < n.indexOf(x.menu + "_position-top")
                        ? "top"
                        : -1 < n.indexOf(x.menu + "_position-bottom")
                        ? "bottom"
                        : "left",
                    v =
                      void 0 === n
                        ? "back"
                        : -1 < n.indexOf(x.menu + "_position-top") ||
                          -1 < n.indexOf(x.menu + "_position-bottom") ||
                          -1 < n.indexOf(x.menu + "_position-front")
                        ? "front"
                        : "back";
                  switch (_) {
                    case "top":
                    case "bottom":
                      (c.events = "panup pandown"),
                        (c.typeLower = "y"),
                        (c.typeUpper = "Y"),
                        (d = "height");
                  }
                  switch (_) {
                    case "right":
                    case "bottom":
                      (c.negative = !0),
                        (f = function (n) {
                          n >= o.$wndw[d]() - e.maxStartPos && (m = 1);
                        });
                  }
                  switch (_) {
                    case "right":
                      (c.open_dir = "left"), (c.close_dir = "right");
                      break;
                    case "top":
                      (c.open_dir = "down"), (c.close_dir = "up");
                      break;
                    case "bottom":
                      (c.open_dir = "up"), (c.close_dir = "down");
                  }
                  switch (v) {
                    case "front":
                      l = function () {
                        return p.$menu;
                      };
                  }
                  var b = this.__valueOrFn(this.$menu, e.node, o.$page);
                  "string" == typeof b && (b = y(b));
                  var w = new Hammer(b[0], this.opts[O].vendors.hammer);
                  w.on("panstart", function (n) {
                    f(n.center[c.typeLower]), (r = l()), (u = c.open_dir);
                  }),
                    w.on(c.events + " panend", function (n) {
                      0 < m && n.preventDefault();
                    }),
                    w.on(c.events, function (n) {
                      if (
                        ((i = n["delta" + c.typeUpper]),
                        c.negative && (i = -i),
                        i != h && (u = h <= i ? c.open_dir : c.close_dir),
                        (h = i) > e.threshold && 1 == m)
                      ) {
                        if (o.$html.hasClass(x.wrapper + "_opened")) return;
                        (m = 2),
                          p._openSetup(),
                          p.trigger("open:start"),
                          o.$html.addClass(x.dragging),
                          (g = $(o.$wndw[d]() * t[d].perc, t[d].min, t[d].max));
                      }
                      2 == m &&
                        ((a = $(h, 10, g) - ("front" == v ? g : 0)),
                        c.negative && (a = -a),
                        (s = "translate" + c.typeUpper + "(" + a + "px )"),
                        r.css({
                          "-webkit-transform": "-webkit-" + s,
                          transform: s,
                        }));
                    }),
                    w.on("panend", function (n) {
                      2 == m &&
                        (o.$html.removeClass(x.dragging),
                        r.css("transform", ""),
                        p[u == c.open_dir ? "_openFinish" : "close"]()),
                        (m = 0);
                    });
                }).call(this, e.menu, t.menu, o);
              }),
            e.panels.close &&
              this.bind("initPanel:after", function (n) {
                (function (n, e, t, o) {
                  var i = this,
                    a = n.data(p.parent);
                  if (a) {
                    a = a.closest("." + x.panel);
                    var s = new Hammer(n[0], i.opts[O].vendors.hammer),
                      r = null;
                    s.on("panright", function (n) {
                      r ||
                        (i.openPanel(a),
                        (r = setTimeout(function () {
                          clearTimeout(r), (r = null);
                        }, i.conf.openingInterval +
                          i.conf.transitionDuration)));
                    });
                  }
                }).call(this, n, e.panels, t.panels, o);
              });
        }
      },
      add: function () {
        if ("function" != typeof Hammer || Hammer.VERSION < 2)
          return (
            (y[n].addons[O].add = function () {}),
            void (y[n].addons[O].setup = function () {})
          );
        (x = y[n]._c), (p = y[n]._d), y[n]._e, x.add("dragging");
      },
      clickAnchor: function (n, e) {},
    }),
      (y[n].defaults[O] = {
        menu: { open: !1, maxStartPos: 100, threshold: 50 },
        panels: { close: !1 },
        vendors: { hammer: {} },
      }),
      (y[n].configuration[O] = {
        menu: {
          width: { perc: 0.8, min: 140, max: 440 },
          height: { perc: 0.8, min: 140, max: 880 },
        },
        panels: {},
      });
  })(jQuery);
  !(function (n) {
    var $,
      s,
      a,
      y,
      t = "mmenu",
      f = "dropdown";
    (n[t].addons[f] = {
      setup: function () {
        if (this.opts.offCanvas) {
          var o = this,
            x = this.opts[f],
            b = this.conf[f];
          if (
            ((y = n[t].glbl),
            "boolean" == typeof x && x && (x = { drop: x }),
            "object" != typeof x && (x = {}),
            "string" == typeof x.position && (x.position = { of: x.position }),
            (x = this.opts[f] = n.extend(!0, {}, n[t].defaults[f], x)).drop)
          ) {
            var g;
            this.bind("initMenu:after", function () {
              if (
                (this.$menu.addClass($.menu + "_" + f),
                "string" != typeof x.position.of)
              ) {
                var t = this._getOriginalMenuId();
                t && t.length && (x.position.of = '[href="#' + t + '"]');
              }
              "string" == typeof x.position.of &&
                ((g = n(x.position.of)),
                (x.event = x.event.split(" ")),
                1 == x.event.length && (x.event[1] = x.event[0]),
                "hover" == x.event[0] &&
                  g.on(a.mouseenter + "-" + f, function () {
                    o.open();
                  }),
                "hover" == x.event[1] &&
                  this.$menu.on(a.mouseleave + "-" + f, function () {
                    o.close();
                  }));
            }),
              this.bind("open:start", function () {
                this.$menu.data(s.style, this.$menu.attr("style") || ""),
                  y.$html.addClass($.wrapper + "_dropdown");
              }),
              this.bind("close:finish", function () {
                this.$menu.attr("style", this.$menu.data(s.style)),
                  y.$html.removeClass($.wrapper + "_dropdown");
              });
            var e = function (t, o) {
                var e,
                  i,
                  n = o[0],
                  s = o[1],
                  a = "x" == t ? "scrollLeft" : "scrollTop",
                  f = "x" == t ? "outerWidth" : "outerHeight",
                  r = "x" == t ? "left" : "top",
                  p = "x" == t ? "right" : "bottom",
                  l = "x" == t ? "width" : "height",
                  h = "x" == t ? "maxWidth" : "maxHeight",
                  u = null,
                  d = y.$wndw[a](),
                  c = (g.offset()[r] -= d),
                  m = c + g[f](),
                  v = y.$wndw[l](),
                  w = b.offset.button[t] + b.offset.viewport[t];
                if (x.position[t])
                  switch (x.position[t]) {
                    case "left":
                    case "bottom":
                      u = "after";
                      break;
                    case "right":
                    case "top":
                      u = "before";
                  }
                return (
                  null === u &&
                    (u = c + (m - c) / 2 < v / 2 ? "after" : "before"),
                  "after" == u
                    ? ((i = v - ((e = "x" == t ? c : m) + w)),
                      (n[r] = e + b.offset.button[t]),
                      (n[p] = "auto"),
                      x.tip &&
                        s.push($.menu + "_tip-" + ("x" == t ? "left" : "top")))
                    : ((i = (e = "x" == t ? m : c) - w),
                      (n[p] =
                        "calc( 100% - " + (e - b.offset.button[t]) + "px )"),
                      (n[r] = "auto"),
                      x.tip &&
                        s.push(
                          $.menu + "_tip-" + ("x" == t ? "right" : "bottom")
                        )),
                  x.fitViewport && (n[h] = Math.min(b[l].max, i)),
                  [n, s]
                );
              },
              i = function (t) {
                if (this.vars.opened) {
                  this.$menu.attr("style", this.$menu.data(s.style));
                  var o = [{}, []];
                  (o = e.call(this, "y", o)),
                    (o = e.call(this, "x", o)),
                    this.$menu.css(o[0]),
                    x.tip &&
                      this.$menu
                        .removeClass(
                          $.tipleft +
                            " " +
                            $.tipright +
                            " " +
                            $.tiptop +
                            " " +
                            $.tipbottom
                        )
                        .addClass(o[1].join(" "));
                }
              };
            this.bind("open:start", i),
              y.$wndw.on(a.resize + "-" + f, function (t) {
                i.call(o);
              }),
              this.opts.offCanvas.blockUI ||
                y.$wndw.on(a.scroll + "-" + f, function (t) {
                  i.call(o);
                });
          }
        }
      },
      add: function () {
        ($ = n[t]._c),
          (s = n[t]._d),
          (a = n[t]._e),
          $.add("dropdown"),
          a.add("mouseenter mouseleave resize scroll");
      },
      clickAnchor: function (t, o) {},
    }),
      (n[t].defaults[f] = {
        drop: !1,
        fitViewport: !0,
        event: "click",
        position: {},
        tip: !0,
      }),
      (n[t].configuration[f] = {
        offset: { button: { x: -5, y: 5 }, viewport: { x: 20, y: 20 } },
        height: { max: 880 },
        width: { max: 440 },
      });
  })(jQuery);
  !(function (c) {
    var f,
      a,
      s = "mmenu",
      d = "fixedElements";
    (c[s].addons[d] = {
      setup: function () {
        if (this.opts.offCanvas) {
          this.opts[d];
          var o = this.conf[d];
          a = c[s].glbl;
          this.bind("setPage:after", function (s) {
            var t = this.conf.classNames[d].fixed,
              i = s.find("." + t);
            this.__refactorClass(i, t, f.slideout),
              i[o.elemInsertMethod](o.elemInsertSelector);
            var e = this.conf.classNames[d].sticky,
              n = s.find("." + e);
            this.__refactorClass(n, e, f.sticky),
              (n = s.find("." + f.sticky)).length &&
                (this.bind("open:start", function () {
                  if ("hidden" == a.$html.css("overflow")) {
                    var s = a.$wndw.scrollTop() + o.sticky.offset;
                    n.each(function () {
                      c(this).css("top", parseInt(c(this).css("top"), 10) + s);
                    });
                  }
                }),
                this.bind("close:finish", function () {
                  n.css("top", "");
                }));
          });
        }
      },
      add: function () {
        (f = c[s]._c), c[s]._d, c[s]._e, f.add("sticky");
      },
      clickAnchor: function (s, t) {},
    }),
      (c[s].configuration[d] = {
        sticky: { offset: 0 },
        elemInsertMethod: "appendTo",
        elemInsertSelector: "body",
      }),
      (c[s].configuration.classNames[d] = { fixed: "Fixed", sticky: "Sticky" });
  })(jQuery);
  !(function (c) {
    var d,
      s,
      a,
      n = "mmenu",
      t = "iconbar";
    (c[n].addons[t] = {
      setup: function () {
        var e = this,
          o = this.opts[t];
        this.conf[t];
        if (
          (c[n].glbl, o instanceof Array && (o = { add: !0, top: o }), o.add)
        ) {
          var r = null;
          if (
            (c.each(["top", "bottom"], function (a, n) {
              var t = o[n];
              t instanceof Array || (t = [t]);
              for (
                var e = c('<div class="' + d.iconbar + "__" + n + '" />'),
                  i = 0,
                  s = t.length;
                i < s;
                i++
              )
                e.append(t[i]);
              e.children().length &&
                (r || (r = c('<div class="' + d.iconbar + '" />')),
                r.append(e));
            }),
            r &&
              (this.bind("initMenu:after", function () {
                var a = d.menu + "_iconbar";
                o.size && (a += " " + d.menu + "_iconbar-" + o.size),
                  this.$menu.addClass(a).prepend(r);
              }),
              "tabs" == o.type))
          ) {
            r.addClass(d.iconbar + "_tabs");
            var i = r.find("a");
            i.on(a.click + "-" + t, function (a) {
              var n = c(this);
              if (n.hasClass(d.iconbar + "__tab_selected"))
                a.stopImmediatePropagation();
              else
                try {
                  var t = c(n.attr("href"));
                  t.hasClass(d.panel) &&
                    (a.preventDefault(),
                    a.stopImmediatePropagation(),
                    e.openPanel(t, !1));
                } catch (a) {}
            }),
              this.bind("openPanel:start", function a(n) {
                i.removeClass(d.iconbar + "__tab_selected");
                var t = i.filter('[href="#' + n.attr("id") + '"]');
                if (t.length) t.addClass(d.iconbar + "__tab_selected");
                else {
                  var e = n.data(s.parent);
                  e && e.length && a(e.closest("." + d.panel));
                }
              });
          }
        }
      },
      add: function () {
        (d = c[n]._c), (s = c[n]._d), (a = c[n]._e), d.add(t);
      },
      clickAnchor: function (a, n) {},
    }),
      (c[n].defaults[t] = { add: !1, top: [], bottom: [] }),
      (c[n].configuration[t] = {});
  })(jQuery);
  !(function (s) {
    var d,
      r = "mmenu",
      o = "iconPanels";
    (s[r].addons[o] = {
      setup: function () {
        var n = this,
          a = this.opts[o],
          t = (this.conf[o], !1);
        s[r].glbl,
          "boolean" == typeof a && (a = { add: a }),
          ("number" != typeof a && "string" != typeof a) ||
            (a = { add: !0, visible: a }),
          "object" != typeof a && (a = {}),
          "first" == a.visible && ((t = !0), (a.visible = 1)),
          ((a = this.opts[o] = s.extend(!0, {}, s[r].defaults[o], a)).visible =
            Math.min(3, Math.max(1, a.visible))),
          a.visible++;
        var l = "";
        if (!t) {
          for (var e = 0; e <= a.visible; e++)
            l += " " + d.panel + "_iconpanel-" + e;
          l.length && (l = l.slice(1));
        }
        if (a.add) {
          var i = function (e) {
            if (!e.parent("." + d.listitem + "_vertical").length) {
              var i = n.$pnls.children("." + d.panel);
              t
                ? i
                    .removeClass(d.panel + "_iconpanel-first")
                    .first()
                    .addClass(d.panel + "_iconpanel-first")
                : i
                    .removeClass(l)
                    .filter("." + d.panel + "_opened-parent")
                    .removeClass(d.hidden)
                    .not(function () {
                      return s(this).parent(
                        "." + d.listitem + "_vertical"
                      ).length;
                    })
                    .add(e)
                    .slice(-a.visible)
                    .each(function (e) {
                      s(this).addClass(d.panel + "_iconpanel-" + e);
                    });
            }
          };
          this.bind("initMenu:after", function () {
            var e = [d.menu + "_iconpanel"];
            a.size && e.push(d.menu + "_iconpanel-" + a.size),
              a.hideNavbar && e.push(d.menu + "_hidenavbar"),
              a.hideDivider && e.push(d.menu + "_hidedivider"),
              this.$menu.addClass(e.join(" "));
          }),
            this.bind("openPanel:start", i),
            this.bind("initPanels:after", function (e) {
              i.call(n, n.$pnls.children("." + d.panel + "_opened"));
            }),
            this.bind("initListview:after", function (e) {
              !a.blockPanel ||
                e.parent("." + d.listitem + "_vertical").length ||
                e.children("." + d.panel + "__blocker").length ||
                e.prepend(
                  '<a href="#' +
                    e.closest("." + d.panel).attr("id") +
                    '" class="' +
                    d.panel +
                    '__blocker" />'
                );
            });
        }
      },
      add: function () {
        (d = s[r]._c), s[r]._d, s[r]._e;
      },
      clickAnchor: function (e, i) {},
    }),
      (s[r].defaults[o] = {
        add: !1,
        blockPanel: !0,
        hideDivider: !1,
        hideNavbar: !0,
        visible: 3,
      });
  })(jQuery);
  !(function (s) {
    var o,
      d,
      a,
      i,
      r = "mmenu",
      c = "keyboardNavigation";
    (s[r].addons[c] = {
      setup: function () {
        if (!s[r].support.touch) {
          var e = this.opts[c];
          this.conf[c];
          if (
            ((i = s[r].glbl),
            ("boolean" != typeof e && "string" != typeof e) ||
              (e = { enable: e }),
            "object" != typeof e && (e = {}),
            (e = this.opts[c] = s.extend(!0, {}, s[r].defaults[c], e)).enable)
          ) {
            var n = s('<button class="' + o.tabstart + '" />'),
              t = s('<button class="' + o.tabend + '" />'),
              a = s('<button class="' + o.tabend + '" />');
            this.bind("initMenu:after", function () {
              e.enhance && this.$menu.addClass(o.menu + "_keyboardfocus"),
                this["_initWindow_" + c](e.enhance);
            }),
              this.bind("initOpened:before", function () {
                this.$menu
                  .prepend(n)
                  .append(t)
                  .children(
                    "." + o.mm("navbars-top") + ", ." + o.mm("navbars-bottom")
                  )
                  .children("." + o.navbar)
                  .children("a." + o.title)
                  .attr("tabindex", -1);
              }),
              this.bind("initBlocker:after", function () {
                i.$blck.append(a).children("a").addClass(o.tabstart);
              }),
              this.bind("open:finish", function () {
                f.call(this, null, e.enable);
              }),
              this.bind("openPanel:finish", function (n) {
                f.call(this, n, e.enable);
              }),
              this.bind("initOpened:after:sr-aria", function () {
                var n = this.$menu
                  .add(i.$blck)
                  .children("." + o.tabstart + ", ." + o.tabend);
                this.__sr_aria(n, "hidden", !0),
                  this.__sr_role(n, "presentation");
              });
          }
        }
      },
      add: function () {
        (o = s[r]._c),
          (d = s[r]._d),
          (a = s[r]._e),
          o.add("tabstart tabend"),
          a.add("focusin keydown");
      },
      clickAnchor: function (n, e) {},
    }),
      (s[r].defaults[c] = { enable: !1, enhance: !1 }),
      (s[r].configuration[c] = {}),
      (s[r].prototype["_initWindow_" + c] = function (n) {
        i.$wndw.off(a.keydown + "-offCanvas"),
          i.$wndw
            .off(a.focusin + "-" + c)
            .on(a.focusin + "-" + c, function (n) {
              if (i.$html.hasClass(o.wrapper + "_opened")) {
                var e = s(n.target);
                if (e.is("." + o.tabend)) {
                  var t = s();
                  e.parent().is("." + o.menu) && i.$blck && (t = i.$blck),
                    e.parent().is("." + o.wrapper + "__blocker") &&
                      (t = i.$body
                        .find("." + o.menu + "_offcanvas")
                        .filter("." + o.menu + "_opened")),
                    t.length || (t = e.parent()),
                    t.children("." + o.tabstart).focus();
                }
              }
            }),
          i.$wndw
            .off(a.keydown + "-" + c)
            .on(a.keydown + "-" + c, function (n) {
              var e = s(n.target),
                t = e.closest("." + o.menu);
              if (t.length) {
                t.data("mmenu");
                if (e.is("input, textarea"));
                else
                  switch (n.keyCode) {
                    case 13:
                      (e.is(".mm-toggle") || e.is(".mm-check")) &&
                        e.trigger(a.click);
                      break;
                    case 32:
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                      n.preventDefault();
                  }
              }
            }),
          n &&
            i.$wndw
              .off(a.keydown + "-" + c)
              .on(a.keydown + "-" + c, function (n) {
                var e = s(n.target),
                  t = e.closest("." + o.menu);
                if (t.length) {
                  var a = t.data("mmenu");
                  if (e.is("input"))
                    switch (n.keyCode) {
                      case 27:
                        e.val("");
                    }
                  else
                    switch (n.keyCode) {
                      case 8:
                        var i = t
                          .find("." + o.panel + "_opened")
                          .data(d.parent);
                        i && i.length && a.openPanel(i.closest("." + o.panel));
                        break;
                      case 27:
                        t.hasClass(o.menu + "_offcanvas") && a.close();
                    }
                }
              });
      });
    var l = "input, select, textarea, button, label, a[href]";
    function f(n, e) {
      n = n || this.$pnls.children("." + o.panel + "_opened");
      var t = s(),
        a = this.$menu
          .children("." + o.mm("navbars_top") + ", ." + o.mm("navbars_bottom"))
          .children("." + o.navbar);
      a.find(l).filter(":focus").length ||
        ("default" == e &&
          ((t = n
            .children("." + o.listview)
            .find("a[href]")
            .not("." + o.hidden)).length || (t = n.find(l).not("." + o.hidden)),
          t.length || (t = a.find(l).not("." + o.hidden))),
        t.length || (t = this.$menu.children("." + o.tabstart)),
        t.first().focus());
    }
  })(jQuery);
  !(function (e) {
    var i,
      l = "mmenu",
      t = "lazySubmenus";
    (e[l].addons[t] = {
      setup: function () {
        var n = this.opts[t];
        this.conf[t];
        e[l].glbl,
          "boolean" == typeof n && (n = { load: n }),
          "object" != typeof n && (n = {}),
          (n = this.opts[t] = e.extend(!0, {}, e[l].defaults[t], n)).load &&
            (this.bind("initMenu:after", function () {
              this.$pnls
                .find("li")
                .children(this.conf.panelNodetype)
                .not("." + i.inset)
                .not("." + i.nolistview)
                .not("." + i.nopanel)
                .addClass(
                  i.panel + "_lazysubmenu " + i.nolistview + " " + i.nopanel
                );
            }),
            this.bind("initPanels:before", function (n) {
              (n = n || this.$pnls.children(this.conf.panelNodetype)),
                this.__findAddBack(n, "." + i.panel + "_lazysubmenu")
                  .not(
                    "." + i.panel + "_lazysubmenu ." + i.panel + "_lazysubmenu"
                  )
                  .removeClass(
                    i.panel + "_lazysubmenu " + i.nolistview + " " + i.nopanel
                  );
            }),
            this.bind("initOpened:before", function () {
              var n = this.$pnls
                .find("." + this.conf.classNames.selected)
                .parents("." + i.panel + "_lazysubmenu");
              n.length &&
                (n.removeClass(
                  i.panel + "_lazysubmenu " + i.nolistview + " " + i.nopanel
                ),
                this.initPanels(n.last()));
            }),
            this.bind("openPanel:before", function (n) {
              var e = this.__findAddBack(n, "." + i.panel + "_lazysubmenu").not(
                "." + i.panel + "_lazysubmenu ." + i.panel + "_lazysubmenu"
              );
              e.length && this.initPanels(e);
            }));
      },
      add: function () {
        (i = e[l]._c), e[l]._d, e[l]._e;
      },
      clickAnchor: function (n, e) {},
    }),
      (e[l].defaults[t] = { load: !1 }),
      (e[l].configuration[t] = {});
  })(jQuery);
  !(function (b) {
    var p,
      h = "mmenu",
      m = "navbars";
    (b[h].addons[m] = {
      setup: function () {
        var d = this,
          l = this.opts[m],
          v = this.conf[m];
        if ((b[h].glbl, void 0 !== l)) {
          l instanceof Array || (l = [l]);
          var f = {},
            u = {};
          l.length &&
            (b.each(l, function (n) {
              var t = l[n];
              "boolean" == typeof t && t && (t = {}),
                "object" != typeof t && (t = {}),
                void 0 === t.content && (t.content = ["prev", "title"]),
                t.content instanceof Array || (t.content = [t.content]),
                (t = b.extend(!0, {}, d.opts.navbar, t));
              var a = b('<div class="' + p.navbar + '" />'),
                e = t.height;
              "number" != typeof e
                ? (e = 1)
                : 1 < (e = Math.min(4, Math.max(1, e))) &&
                  a.addClass(p.navbar + "_size-" + e);
              var o = t.position;
              switch (o) {
                case "bottom":
                  break;
                default:
                  o = "top";
              }
              f[o] || (f[o] = 0),
                (f[o] += e),
                u[o] ||
                  (u[o] = b('<div class="' + p.navbars + "_" + o + '" />')),
                u[o].append(a);
              for (var r = 0, s = t.content.length; r < s; r++) {
                var i = b[h].addons[m][t.content[r]] || null;
                i
                  ? i.call(d, a, t, v)
                  : ((i = t.content[r]) instanceof b || (i = b(t.content[r])),
                    a.append(i));
              }
              var c = b[h].addons[m][t.type] || null;
              c && c.call(d, a, t, v),
                a.children("." + p.btn).length &&
                  a.addClass(p.navbar + "_has-btns");
            }),
            this.bind("initMenu:after", function () {
              for (var n in f)
                this.$menu.addClass(p.menu + "_navbar_" + n + "-" + f[n]),
                  this.$menu["bottom" == n ? "append" : "prepend"](u[n]);
            }));
        }
      },
      add: function () {
        (p = b[h]._c), b[h]._d, b[h]._e, p.add(m);
      },
      clickAnchor: function (n, t) {},
    }),
      (b[h].configuration[m] = {
        breadcrumbs: { separator: "/", removeFirst: !1 },
      }),
      (b[h].configuration.classNames[m] = {});
  })(jQuery);
  !(function (f) {
    var o,
      i,
      a,
      c = "mmenu",
      d = "pageScroll";
    (f[c].addons[d] = {
      setup: function () {
        var n = this,
          t = this.opts[d],
          s = this.conf[d];
        if (
          ((a = f[c].glbl),
          "boolean" == typeof t && (t = { scroll: t }),
          (t = this.opts[d] = f.extend(!0, {}, f[c].defaults[d], t)).scroll &&
            this.bind("close:finish", function () {
              h(s.scrollOffset);
            }),
          t.update)
        ) {
          var e = [],
            r = [];
          (n = this).bind("initListview:after", function (t) {
            n
              .__filterListItemAnchors(t.find("." + o.listview).children("li"))
              .each(function () {
                var t = f(this).attr("href");
                p(t) && e.push(t);
              }),
              (r = e.reverse());
          });
          var l = -1;
          a.$wndw.on(i.scroll + "-" + d, function (t) {
            for (var e = a.$wndw.scrollTop(), i = 0; i < r.length; i++)
              if (f(r[i]).offset().top < e + s.updateOffset) {
                l !== i &&
                  ((l = i),
                  n.setSelected(
                    n
                      .__filterListItemAnchors(
                        n.$pnls
                          .children("." + o.panel + "_opened")
                          .find("." + o.listview)
                          .children("li")
                      )
                      .filter('[href="' + r[i] + '"]')
                      .parent()
                  ));
                break;
              }
          });
        }
      },
      add: function () {
        (o = f[c]._c), f[c]._d, (i = f[c]._e);
      },
      clickAnchor: function (t, e, i) {
        if (
          ((s = !1),
          e &&
            i &&
            this.opts.offCanvas &&
            this.opts[d].scroll &&
            a.$page &&
            a.$page.length)
        ) {
          var n = t.attr("href");
          if (p(n)) {
            if (
              ((s = f(n)),
              !this.$menu.is("." + o.menu + "_sidebar-expanded") ||
                !a.$html.is("." + o.wrapper + "_sidebar-expanded"))
            )
              return { close: !0 };
            h(this.conf[d].scrollOffset);
          }
        }
      },
    }),
      (f[c].defaults[d] = { scroll: !1, update: !1 });
    var s = !(f[c].configuration[d] = { scrollOffset: 0, updateOffset: 50 });
    function h(t) {
      s &&
        s.length &&
        s.is(":visible") &&
        a.$html.add(a.$body).animate({ scrollTop: s.offset().top + t }),
        (s = !1);
    }
    function p(t) {
      try {
        return !("#" == t || "#" != t.slice(0, 1) || !a.$page.find(t).length);
      } catch (t) {
        return !1;
      }
    }
  })(jQuery);
  !(function (o) {
    var f,
      u,
      h,
      n = "mmenu",
      _ = "searchfield";
    function l(e, n) {
      if (n) for (var s in n) e.attr(s, n[s]);
    }
    (o[n].addons[_] = {
      setup: function () {
        var a = this,
          t = this.opts[_],
          e = this.conf[_];
        o[n].glbl,
          "boolean" == typeof t && (t = { add: t }),
          "object" != typeof t && (t = {}),
          "boolean" == typeof t.panel && (t.panel = { add: t.panel }),
          "object" != typeof t.panel && (t.panel = {}),
          t.add &&
            ("panel" == t.addTo && (t.panel.add = !0),
            t.panel.add &&
              ((t.showSubPanels = !1), t.panel.splash && (t.cancel = !0)),
            (t = this.opts[_] = o.extend(!0, {}, o[n].defaults[_], t)),
            (e = this.conf[_] = o.extend(!0, {}, o[n].configuration[_], e)),
            this.bind("close:start", function () {
              this.$menu
                .find("." + f.searchfield)
                .children("input")
                .blur();
            }),
            this.bind("initPanels:after", function (e) {
              var n,
                s = o();
              switch (
                (t.panel.add && (s = this._initSearchPanel(e)), t.addTo)
              ) {
                case "panels":
                  n = e;
                  break;
                case "panel":
                  n = s;
                  break;
                default:
                  n = this.$menu.find(t.addTo);
              }
              (n.each(function () {
                var e = a._initSearchfield(o(this));
                t.search && e.length && a._initSearching(e);
              }),
              t.noResults) &&
                (t.panel.add ? s : e).each(function () {
                  a._initNoResultsMsg(o(this));
                });
            }));
      },
      add: function () {
        (f = o[n]._c),
          (u = o[n]._d),
          (h = o[n]._e),
          f.add("searchfield"),
          u.add("searchfield"),
          h.add("input focus blur");
      },
      clickAnchor: function (e, n) {
        if (e.hasClass(f.searchfield + "__btn")) {
          if (e.hasClass(f.btn + "_close")) {
            var s = e.closest("." + f.searchfield).find("input");
            return s.val(""), this.search(s), !0;
          }
          if (e.hasClass(f.btn + "_next"))
            return e.closest("." + f.searchfield).submit(), !0;
        }
      },
    }),
      (o[n].defaults[_] = {
        add: !1,
        addTo: "panels",
        noResults: "No results found.",
        placeholder: "Search",
        panel: {
          add: !1,
          dividers: !0,
          fx: "none",
          id: null,
          splash: null,
          title: "Search",
        },
        search: !0,
        showTextItems: !1,
        showSubPanels: !0,
      }),
      (o[n].configuration[_] = { clear: !1, form: !1, input: !1, submit: !1 }),
      (o[n].prototype._initSearchPanel = function (e) {
        var n = this.opts[_];
        this.conf[_];
        if (this.$pnls.children("." + f.panel + "_search").length) return o();
        var s = o('<div class="' + f.panel + '_search " />')
          .append("<ul />")
          .appendTo(this.$pnls);
        switch (
          (n.panel.id && s.attr("id", n.panel.id),
          n.panel.title && s.attr("data-mm-title", n.panel.title),
          n.panel.fx)
        ) {
          case !1:
            break;
          case "none":
            s.addClass(f.panel + "_noanimation");
            break;
          default:
            s.addClass(f.panel + "_fx-" + n.panel.fx);
        }
        return (
          n.panel.splash &&
            s.append(
              '<div class="' +
                f.panel +
                '__searchsplash">' +
                n.panel.splash +
                "</div>"
            ),
          this._initPanels(s),
          s
        );
      }),
      (o[n].prototype._initSearchfield = function (e) {
        var n = this.opts[_],
          s = this.conf[_];
        if (e.parent("." + f.listitem + "_vertical").length) return o();
        if (e.find("." + f.searchfield).length)
          return e.find("." + f.searchfield);
        var a = o(
            "<" +
              (s.form ? "form" : "div") +
              ' class="' +
              f.searchfield +
              '" />'
          ),
          t = o('<div class="' + f.searchfield + '__input" />'),
          i = o(
            '<input placeholder="' +
              this.i18n(n.placeholder) +
              '" type="text" autocomplete="off" />'
          );
        return (
          t.append(i).appendTo(a),
          e.prepend(a),
          e.hasClass(f.panel) && e.addClass(f.panel + "_has-searchfield"),
          l(i, s.input),
          s.clear &&
            o(
              '<a class="' +
                f.btn +
                " " +
                f.btn +
                "_close " +
                f.searchfield +
                '__btn" href="#" />'
            ).appendTo(t),
          l(a, s.form),
          s.form &&
            s.submit &&
            !s.clear &&
            o(
              '<a class="' +
                f.btn +
                " " +
                f.btn +
                "_next " +
                f.searchfield +
                '__btn" href="#" />'
            ).appendTo(t),
          n.cancel &&
            o(
              '<a href="#" class="' +
                f.searchfield +
                '__cancel">' +
                this.i18n("cancel") +
                "</a>"
            ).appendTo(a),
          a
        );
      }),
      (o[n].prototype._initSearching = function (e) {
        var n = this,
          s = this.opts[_],
          a = (this.conf[_], {});
        e.closest("." + f.panel + "_search").length
          ? ((a.$pnls = this.$pnls.find("." + f.panel)),
            (a.$nrsp = e.closest("." + f.panel)))
          : e.closest("." + f.panel).length
          ? ((a.$pnls = e.closest("." + f.panel)), (a.$nrsp = a.$pnls))
          : ((a.$pnls = this.$pnls.find("." + f.panel)),
            (a.$nrsp = this.$menu)),
          (a.$pnls = a.$pnls.not(function () {
            return o(this).parent("." + f.listitem + "_vertical").length;
          })),
          s.panel.add && (a.$pnls = a.$pnls.not("." + f.panel + "_search"));
        var t = e.find("input"),
          i = e.find("." + f.searchfield + "__cancel"),
          l = this.$pnls.children("." + f.panel + "_search"),
          d = a.$pnls.find("." + f.listitem);
        (a.$itms = d.not("." + f.listitem + "_divider")),
          (a.$dvdr = d.filter("." + f.listitem + "_divider")),
          s.panel.add &&
            s.panel.splash &&
            t
              .off(h.focus + "-" + _ + "-splash")
              .on(h.focus + "-" + _ + "-splash", function (e) {
                n.openPanel(l);
              }),
          s.cancel &&
            (t
              .off(h.focus + "-" + _ + "-cancel")
              .on(h.focus + "-" + _ + "-cancel", function (e) {
                i.addClass(f.searchfield + "__cancel-active");
              }),
            i
              .off(h.click + "-" + _ + "-splash")
              .on(h.click + "-" + _ + "-splash", function (e) {
                e.preventDefault(),
                  o(this).removeClass(f.searchfield + "__cancel-active"),
                  l.hasClass(f.panel + "_opened") &&
                    n.openPanel(
                      n.$pnls.children("." + f.panel + "_opened-parent").last()
                    );
              })),
          s.panel.add &&
            "panel" == s.addTo &&
            this.bind("openPanel:finish", function (e) {
              e[0] === l[0] && t.focus();
            }),
          t
            .data(u.searchfield, a)
            .off(h.input + "-" + _)
            .on(h.input + "-" + _, function (e) {
              (function (e) {
                switch (e) {
                  case 9:
                  case 16:
                  case 17:
                  case 18:
                  case 37:
                  case 38:
                  case 39:
                  case 40:
                    return !0;
                }
                return !1;
              })(e.keyCode) || n.search(t);
            }),
          this.search(t);
      }),
      (o[n].prototype._initNoResultsMsg = function (e) {
        var n = this.opts[_];
        this.conf[_];
        if (
          (e.closest("." + f.panel).length ||
            (e = this.$pnls.children("." + f.panel).first()),
          !e.children("." + f.panel + "__noresultsmsg").length)
        ) {
          var s = e.children("." + f.listview).first(),
            a = o(
              '<div class="' + f.panel + "__noresultsmsg " + f.hidden + '" />'
            ).append(this.i18n(n.noResults));
          s.length ? a.insertAfter(s) : a.prependTo(e);
        }
      }),
      (o[n].prototype.search = function (a, s) {
        var t = this,
          i = this.opts[_];
        this.conf[_];
        (a =
          a ||
          this.$menu
            .find("." + f.searchfield)
            .chidren("input")
            .first()),
          (s = (s = s || a.val()).toLowerCase().trim());
        var e = a.data(u.searchfield),
          n = a.closest("." + f.searchfield).find("." + f.btn),
          l = this.$pnls.children("." + f.panel + "_search"),
          d = e.$pnls,
          h = e.$itms,
          r = e.$dvdr,
          c = e.$nrsp;
        if (
          (h
            .removeClass(f.listitem + "_nosubitems")
            .find("." + f.btn + "_fullwidth-search")
            .removeClass(f.btn + "_fullwidth-search " + f.btn + "_fullwidth"),
          l.children("." + f.listview).empty(),
          d.scrollTop(0),
          s.length)
        ) {
          if (
            (h.add(r).addClass(f.hidden),
            h.each(function () {
              var e = o(this),
                n = "a";
              (i.showTextItems ||
                (i.showSubPanels && e.find("." + f.btn + "_next"))) &&
                (n = "a, span"),
                -1 <
                  e
                    .children(n)
                    .not("." + f.btn + "_next")
                    .text()
                    .toLowerCase()
                    .indexOf(s) && e.removeClass(f.hidden);
            }),
            i.panel.add)
          ) {
            var p = o();
            d.each(function () {
              var e = t
                .__filterListItems(o(this).find("." + f.listitem))
                .clone(!0);
              e.length &&
                (i.panel.dividers &&
                  (p = p.add(
                    '<li class="' +
                      f.listitem +
                      " " +
                      f.listitem +
                      '_divider">' +
                      o(this)
                        .find("." + f.navbar + "__title")
                        .text() +
                      "</li>"
                  )),
                (p = p.add(e)));
            }),
              p
                .find("." + f.mm("toggle"))
                .remove()
                .end()
                .find("." + f.mm("check"))
                .remove()
                .end()
                .find("." + f.btn)
                .remove(),
              l.children("." + f.listview).append(p),
              this.openPanel(l);
          } else
            i.showSubPanels &&
              d.each(function (e) {
                var n = o(this);
                t.__filterListItems(n.find("." + f.listitem)).each(function () {
                  var e = o(this).data(u.child);
                  e &&
                    e
                      .find("." + f.listview)
                      .children()
                      .removeClass(f.hidden);
                });
              }),
              o(d.get().reverse()).each(function (e) {
                var n = o(this),
                  s = n.data(u.parent);
                s &&
                  (t.__filterListItems(n.find("." + f.listitem)).length
                    ? s.hasClass(f.hidden) &&
                      s
                        .removeClass(f.hidden)
                        .children("." + f.btn + "_next")
                        .not("." + f.btn + "_fullwidth")
                        .addClass(f.btn + "_fullwidth")
                        .addClass(f.btn + "_fullwidth-search")
                    : a.closest("." + f.panel).length ||
                      ((n.hasClass(f.panel + "_opened") ||
                        n.hasClass(f.panel + "_opened-parent")) &&
                        setTimeout(function () {
                          t.openPanel(s.closest("." + f.panel));
                        }, (e + 1) * (1.5 * t.conf.openingInterval)),
                      s.addClass(f.listitem + "_nosubitems")));
              }),
              this.__filterListItems(d.find("." + f.listitem)).each(
                function () {
                  o(this)
                    .prevAll("." + f.listitem + "_divider")
                    .first()
                    .removeClass(f.hidden);
                }
              );
          n.removeClass(f.hidden),
            c
              .find("." + f.panel + "__noresultsmsg")
              [h.not("." + f.hidden).length ? "addClass" : "removeClass"](
                f.hidden
              ),
            i.panel.add &&
              (i.panel.splash &&
                l.find("." + f.panel + "__searchsplash").addClass(f.hidden),
              h.add(r).removeClass(f.hidden));
        } else
          h.add(r).removeClass(f.hidden),
            n.addClass(f.hidden),
            c.find("." + f.panel + "__noresultsmsg").addClass(f.hidden),
            i.panel.add &&
              (i.panel.splash
                ? l.find("." + f.panel + "__searchsplash").removeClass(f.hidden)
                : a.closest("." + f.panel + "_search").length ||
                  this.openPanel(
                    this.$pnls.children("." + f.panel + "_opened-parent").last()
                  ));
        this.trigger("updateListview");
      });
  })(jQuery);
  !(function (d) {
    var h,
      t,
      e = "mmenu",
      o = "sectionIndexer";
    (d[e].addons[o] = {
      setup: function () {
        var s = this,
          i = this.opts[o];
        this.conf[o];
        d[e].glbl,
          "boolean" == typeof i && (i = { add: i }),
          "object" != typeof i && (i = {}),
          (i = this.opts[o] = d.extend(!0, {}, d[e].defaults[o], i));
        var r = null;
        this.bind("initPanels:after", function (e) {
          if (i.add) {
            var a;
            switch (i.addTo) {
              case "panels":
                a = e;
                break;
              default:
                a = (a = d(i.addTo, this.$menu)).filter("." + h.panel);
            }
            a
              .find("." + h.listitem + "_divider")
              .closest("." + h.panel)
              .addClass(h.panel + "_has-sectionindexer"),
              r ||
                (r = d('<div class="' + h.sectionindexer + '" />')
                  .prependTo(this.$menu)
                  .append(
                    '<a href="#a">a</a><a href="#b">b</a><a href="#c">c</a><a href="#d">d</a><a href="#e">e</a><a href="#f">f</a><a href="#g">g</a><a href="#h">h</a><a href="#i">i</a><a href="#j">j</a><a href="#k">k</a><a href="#l">l</a><a href="#m">m</a><a href="#n">n</a><a href="#o">o</a><a href="#p">p</a><a href="#q">q</a><a href="#r">r</a><a href="#s">s</a><a href="#t">t</a><a href="#u">u</a><a href="#v">v</a><a href="#w">w</a><a href="#x">x</a><a href="#y">y</a><a href="#z">z</a>'
                  )).on(
                  t.mouseover + "-" + o + " " + t.touchstart + "-" + o,
                  "a",
                  function (e) {
                    var a = d(e.target).attr("href").slice(1),
                      n = s.$pnls.children("." + h.panel + "_opened"),
                      i = n.find("." + h.listview),
                      r = -1,
                      t = n.scrollTop();
                    n.scrollTop(0),
                      i
                        .children("." + h.listitem + "_divider")
                        .not("." + h.hidden)
                        .each(function () {
                          r < 0 &&
                            a == d(this).text().slice(0, 1).toLowerCase() &&
                            (r = d(this).position().top);
                        }),
                      n.scrollTop(-1 < r ? r : t);
                  }
                );
            var n = function (e) {
              (e = e || this.$pnls.children("." + h.panel + "_opened")),
                this.$menu[
                  (e.hasClass(h.panel + "_has-sectionindexer")
                    ? "add"
                    : "remove") + "Class"
                ](h.menu + "_has-sectionindexer");
            };
            this.bind("openPanel:start", n), this.bind("initPanels:after", n);
          }
        });
      },
      add: function () {
        (h = d[e]._c),
          d[e]._d,
          (t = d[e]._e),
          h.add("sectionindexer"),
          t.add("mouseover");
      },
      clickAnchor: function (e, a) {
        if (e.parent().is("." + h.indexer)) return !0;
      },
    }),
      (d[e].defaults[o] = { add: !1, addTo: "panels" });
  })(jQuery);
  !(function (t) {
    var s,
      a,
      l = "mmenu",
      r = "setSelected";
    (t[l].addons[r] = {
      setup: function () {
        var n = this,
          e = this.opts[r];
        this.conf[r];
        if (
          (t[l].glbl,
          "boolean" == typeof e && (e = { hover: e, parent: e }),
          "object" != typeof e && (e = {}),
          "detect" ==
            (e = this.opts[r] = t.extend(!0, {}, t[l].defaults[r], e)).current)
        ) {
          var i = function (e) {
            e = e.split("?")[0].split("#")[0];
            var t = n.$menu.find('a[href="' + e + '"], a[href="' + e + '/"]');
            t.length
              ? n.setSelected(t.parent(), !0)
              : (e = e.split("/").slice(0, -1)).length && i(e.join("/"));
          };
          this.bind("initMenu:after", function () {
            i(window.location.href);
          });
        } else
          e.current ||
            this.bind("initListview:after", function (e) {
              e.find("." + s.listview)
                .children("." + s.listitem + "_selected")
                .removeClass(s.listitem + "_selected");
            });
        e.hover &&
          this.bind("initMenu:after", function () {
            this.$menu.addClass(s.menu + "_selected-hover");
          }),
          e.parent &&
            (this.bind("openPanel:finish", function (e) {
              this.$pnls
                .find("." + s.listview)
                .find("." + s.listitem + "_selected-parent")
                .removeClass(s.listitem + "_selected-parent");
              for (var t = e.data(a.parent); t; )
                t
                  .not("." + s.listitem + "_vertical")
                  .addClass(s.listitem + "_selected-parent"),
                  (t = t.closest("." + s.panel).data(a.parent));
            }),
            this.bind("initMenu:after", function () {
              this.$menu.addClass(s.menu + "_selected-parent");
            }));
      },
      add: function () {
        (s = t[l]._c), (a = t[l]._d), t[l]._e;
      },
      clickAnchor: function (e, t) {},
    }),
      (t[l].defaults[r] = { current: !0, hover: !1, parent: !1 });
  })(jQuery);
  !(function (a) {
    var n,
      t,
      l = "mmenu",
      i = "sidebar";
    (a[l].addons[i] = {
      setup: function () {
        if (this.opts.offCanvas) {
          var e = this.opts[i];
          this.conf[i];
          (t = a[l].glbl),
            ("string" == typeof e ||
              ("boolean" == typeof e && e) ||
              "number" == typeof e) &&
              (e = { expanded: e }),
            "object" != typeof e && (e = {}),
            "boolean" == typeof e.collapsed &&
              e.collapsed &&
              (e.collapsed = "all"),
            ("string" != typeof e.collapsed &&
              "number" != typeof e.collapsed) ||
              (e.collapsed = { use: e.collapsed }),
            "object" != typeof e.collapsed && (e.collapsed = {}),
            "number" == typeof e.collapsed.use &&
              (e.collapsed.use = "(min-width: " + e.collapsed.use + "px)"),
            "boolean" == typeof e.expanded &&
              e.expanded &&
              (e.expanded = "all"),
            ("string" != typeof e.expanded && "number" != typeof e.expanded) ||
              (e.expanded = { use: e.expanded }),
            "object" != typeof e.expanded && (e.expanded = {}),
            "number" == typeof e.expanded.use &&
              (e.expanded.use = "(min-width: " + e.expanded.use + "px)"),
            (e = this.opts[i] = a.extend(!0, {}, a[l].defaults[i], e));
          var d = n.wrapper + "_sidebar-collapsed";
          e.collapsed.size &&
            (d += " " + n.wrapper + "_sidebar-collapsed-" + e.collapsed.size);
          var s = n.wrapper + "_sidebar-expanded";
          e.expanded.size &&
            (s += " " + n.wrapper + "_sidebar-expanded-" + e.expanded.size),
            e.collapsed.use &&
              (this.bind("initMenu:after", function () {
                this.$menu.addClass(n.menu + "_sidebar-collapsed"),
                  e.collapsed.blockMenu &&
                    this.opts.offCanvas &&
                    !this.$menu.children("." + n.menu + "__blocker").length &&
                    this.$menu.prepend(
                      '<a class="' +
                        n.menu +
                        '__blocker" href="#' +
                        this.$menu.attr("id") +
                        '" />'
                    ),
                  e.collapsed.hideNavbar &&
                    this.$menu.addClass(n.menu + "_hidenavbar"),
                  e.collapsed.hideDivider &&
                    this.$menu.addClass(n.menu + "_hidedivider");
              }),
              "boolean" == typeof e.collapsed.use
                ? this.bind("initMenu:after", function () {
                    t.$html.addClass(d);
                  })
                : this.matchMedia(
                    e.collapsed.use,
                    function () {
                      t.$html.addClass(d);
                    },
                    function () {
                      t.$html.removeClass(d);
                    }
                  )),
            e.expanded.use &&
              (this.bind("initMenu:after", function () {
                this.$menu.addClass(n.menu + "_sidebar-expanded");
              }),
              "boolean" == typeof e.expanded.use
                ? this.bind("initMenu:after", function () {
                    t.$html.addClass(s), this.open();
                  })
                : this.matchMedia(
                    e.expanded.use,
                    function () {
                      t.$html.addClass(s),
                        t.$html.hasClass(n.wrapper + "_sidebar-closed") ||
                          this.open();
                    },
                    function () {
                      t.$html.removeClass(s), this.close();
                    }
                  ),
              this.bind("close:start", function () {
                t.$html.hasClass(s) &&
                  t.$html.addClass(n.wrapper + "_sidebar-closed");
              }),
              this.bind("open:start", function () {
                t.$html.removeClass(n.wrapper + "_sidebar-closed");
              }));
        }
      },
      add: function () {
        (n = a[l]._c), a[l]._d, a[l]._e;
      },
      clickAnchor: function (e, d, s) {
        if (
          this.opts[i].expanded.use &&
          t.$html.is("." + n.wrapper + "_sidebar-expanded") &&
          d &&
          s
        )
          return { close: !1 };
      },
    }),
      (a[l].defaults[i] = {
        collapsed: { use: !1, blockMenu: !0, hideDivider: !1, hideNavbar: !0 },
        expanded: { use: !1 },
      }),
      (a[l].configuration[i] = {});
  })(jQuery);
  !(function (n) {
    var l,
      t = "mmenu",
      e = "toggles";
    (n[t].addons[e] = {
      setup: function () {
        var s = this;
        this.opts[e], this.conf[e];
        n[t].glbl,
          this.bind("initPanels:after", function (t) {
            this.__refactorClass(
              t.find("input"),
              this.conf.classNames[e].toggle,
              l.toggle
            ),
              this.__refactorClass(
                t.find("input"),
                this.conf.classNames[e].check,
                l.check
              ),
              t
                .find("input." + l.toggle + ", input." + l.check)
                .each(function () {
                  var t = n(this),
                    e = t.closest("li"),
                    c = t.hasClass(l.toggle) ? "toggle" : "check",
                    i = t.attr("id") || s.__getUniqueId();
                  e.children('label[for="' + i + '"]').length ||
                    (t.attr("id", i),
                    e.prepend(t),
                    n(
                      '<label for="' + i + '" class="' + l[c] + '"></label>'
                    ).insertAfter(
                      e.children("." + l.listitem + "__text").last()
                    ));
                });
          });
      },
      add: function () {
        (l = n[t]._c), n[t]._d, n[t]._e, l.add("toggle check");
      },
      clickAnchor: function (t, e) {},
    }),
      (n[t].configuration.classNames[e] = { toggle: "Toggle", check: "Check" });
  })(jQuery);
  !(function (d) {
    var s = "mmenu";
    d[s].addons.navbars.breadcrumbs = function (a, r, i) {
      var n = this,
        b = d[s]._c,
        c = d[s]._d;
      b.add("separator");
      var e = d('<span class="' + b.navbar + '__breadcrumbs" />').appendTo(a);
      this.bind("initNavbar:after", function (a) {
        if (
          !a.children("." + b.navbar).children("." + b.navbar + "__breadcrumbs")
            .length
        ) {
          a.removeClass(b.panel + "_has-navbar");
          for (
            var r = [],
              n = d('<span class="' + b.navbar + '__breadcrumbs"></span>'),
              e = a,
              s = !0;
            e && e.length;

          ) {
            if (
              (e.is("." + b.panel) || (e = e.closest("." + b.panel)),
              !e.parent("." + b.listitem + "_vertical").length)
            ) {
              var t = e
                .children("." + b.navbar)
                .children("." + b.navbar + "__title")
                .text();
              t.length &&
                r.unshift(
                  s
                    ? "<span>" + t + "</span>"
                    : '<a href="#' + e.attr("id") + '">' + t + "</a>"
                ),
                (s = !1);
            }
            e = e.data(c.parent);
          }
          i.breadcrumbs.removeFirst && r.shift(),
            n
              .append(
                r.join(
                  '<span class="' +
                    b.separator +
                    '">' +
                    i.breadcrumbs.separator +
                    "</span>"
                )
              )
              .appendTo(a.children("." + b.navbar));
        }
      }),
        this.bind("openPanel:start", function (a) {
          var r = a.find("." + b.navbar + "__breadcrumbs");
          r.length && e.html(r.html() || "");
        }),
        this.bind("initNavbar:after:sr-aria", function (a) {
          a.children("." + b.navbar)
            .children("." + b.breadcrumbs)
            .children("a")
            .each(function () {
              n.__sr_aria(d(this), "owns", d(this).attr("href").slice(1));
            });
        });
    };
  })(jQuery);
  !(function (s) {
    var r = "mmenu";
    s[r].addons.navbars.close = function (t, e) {
      var n = s[r]._c;
      s[r].glbl;
      n.add("close");
      var a = s(
        '<a class="' +
          n.btn +
          " " +
          n.btn +
          "_close " +
          n.navbar +
          '__btn" href="#" />'
      ).appendTo(t);
      this.bind("setPage:after", function (t) {
        a.attr("href", "#" + t.attr("id"));
      }),
        this.bind("setPage:after:sr-text", function (t) {
          a.html(
            this.__sr_text(this.i18n(this.conf.screenReader.text.closeMenu))
          ),
            this.__sr_aria(a, "owns", a.attr("href").slice(1));
        });
    };
  })(jQuery);
  !(function (h) {
    var d = "mmenu",
      o = "navbars";
    (h[d].addons[o].next = function (a, n) {
      var t,
        e,
        s,
        r = h[d]._c,
        i = h(
          '<a class="' +
            r.btn +
            " " +
            r.btn +
            "_next " +
            r.navbar +
            '__btn" href="#" />'
        ).appendTo(a);
      this.bind("openPanel:start", function (a) {
        (t = a.find("." + this.conf.classNames[o].panelNext)),
          (e = t.attr("href")),
          (s = t.html()),
          e ? i.attr("href", e) : i.removeAttr("href"),
          i[e || s ? "removeClass" : "addClass"](r.hidden),
          i.html(s);
      }),
        this.bind("openPanel:start:sr-aria", function (a) {
          this.__sr_aria(i, "hidden", i.hasClass(r.hidden)),
            this.__sr_aria(i, "owns", (i.attr("href") || "").slice(1));
        });
    }),
      (h[d].configuration.classNames[o].panelNext = "Next");
  })(jQuery);
  !(function (h) {
    var l = "mmenu",
      d = "navbars";
    (h[l].addons[d].prev = function (a, n) {
      var r,
        e,
        t,
        i = h[l]._c,
        s = h(
          '<a class="' +
            i.btn +
            " " +
            i.btn +
            "_prev " +
            i.navbar +
            '__btn" href="#" />'
        ).appendTo(a);
      this.bind("initNavbar:after", function (a) {
        a.removeClass(i.panel + "_has-navbar");
      }),
        this.bind("openPanel:start", function (a) {
          a.parent("." + i.listitem + "_vertical").length ||
            ((r = a.find("." + this.conf.classNames[d].panelPrev)).length ||
              (r = a.children("." + i.navbar).children("." + i.btn + "_prev")),
            (e = r.attr("href")),
            (t = r.html()),
            e ? s.attr("href", e) : s.removeAttr("href"),
            s[e || t ? "removeClass" : "addClass"](i.hidden),
            s.html(t));
        }),
        this.bind("initNavbar:after:sr-aria", function (a) {
          var n = a.children("." + i.navbar);
          this.__sr_aria(n, "hidden", !0);
        }),
        this.bind("openPanel:start:sr-aria", function (a) {
          this.__sr_aria(s, "hidden", s.hasClass(i.hidden)),
            this.__sr_aria(s, "owns", (s.attr("href") || "").slice(1));
        });
    }),
      (h[l].configuration.classNames[d].panelPrev = "Prev");
  })(jQuery);
  !(function (t) {
    var a = "mmenu";
    t[a].addons.navbars.searchfield = function (s, e) {
      t[a]._c;
      "object" != typeof this.opts.searchfield && (this.opts.searchfield = {}),
        (this.opts.searchfield.add = !0),
        (this.opts.searchfield.addTo = s);
    };
  })(jQuery);
  !(function (i) {
    var o = "mmenu",
      c = "navbars";
    i[o].addons[c].tabs = function (a, e, t) {
      var s = i[o]._c,
        r = i[o]._d,
        n = i[o]._e,
        l = this,
        d = a.children("a");
      a
        .addClass(s.navbar + "_tabs")
        .parent()
        .addClass(s.navbars + "_has-tabs"),
        d.on(n.click + "-" + c, function (a) {
          a.preventDefault();
          var e = i(this);
          if (e.hasClass(s.navbar + "__tab_selected"))
            a.stopImmediatePropagation();
          else
            try {
              l.openPanel(i(e.attr("href")), !1), a.stopImmediatePropagation();
            } catch (a) {}
        }),
        this.bind("openPanel:start", function a(e) {
          d.removeClass(s.navbar + "__tab_selected");
          var t = d.filter('[href="#' + e.attr("id") + '"]');
          if (t.length) t.addClass(s.navbar + "__tab_selected");
          else {
            var n = e.data(r.parent);
            n && n.length && a(n.closest("." + s.panel));
          }
        });
    };
  })(jQuery);
  !(function (h) {
    var d = "mmenu",
      o = "navbars";
    (h[d].addons[o].title = function (t, a) {
      var e,
        n,
        i,
        r,
        s = h[d]._c,
        l = h('<a class="' + s.navbar + '__title" />').appendTo(t);
      this.bind("openPanel:start", function (t) {
        t.parent("." + s.listitem + "_vertical").length ||
          ((i = t.find("." + this.conf.classNames[o].panelTitle)).length ||
            (i = t
              .children("." + s.navbar)
              .children("." + s.navbar + "__title")),
          (e = i.attr("href")),
          (n = i.html() || a.title),
          e ? l.attr("href", e) : l.removeAttr("href"),
          l[e || n ? "removeClass" : "addClass"](s.hidden),
          l.html(n));
      }),
        this.bind("openPanel:start:sr-aria", function (t) {
          if (
            this.opts.screenReader.text &&
            (r ||
              (r = this.$menu
                .children("." + s.navbars + "_top, ." + s.navbars + "_bottom")
                .children("." + s.navbar)
                .children("." + s.btn + "_prev")),
            r.length)
          ) {
            var a = !0;
            "parent" == this.opts.navbar.titleLink &&
              (a = !r.hasClass(s.hidden)),
              this.__sr_aria(l, "hidden", a);
          }
        });
    }),
      (h[d].configuration.classNames[o].panelTitle = "Title");
  })(jQuery);
  jQuery.mmenu.wrappers.angular = function () {
    this.opts.onClick = { close: !0, preventDefault: !1, setSelected: !0 };
  };
  !(function (a) {
    a.mmenu.wrappers.bootstrap3 = function () {
      if (this.$menu.hasClass("navbar-collapse")) {
        (this.conf.classNames.selected = "active"),
          (this.conf.classNames.divider = "divider"),
          (this.conf.clone = !0),
          (this.opts.hooks = this.opts.hooks || {});
        for (
          var n = "", a = ["nav-tabs", "nav-pills", "navbar-nav"], e = 0;
          e < a.length;
          e++
        )
          if (this.$menu.find("." + a[e]).length) {
            n = a[e];
            break;
          }
        n.length &&
          ((this.opts.hooks["initMenu:before"] = function () {
            "navbar-nav" == n && this.$menu.wrapInner("<div />");
          }),
          (this.opts.hooks["initMenu:after"] = function () {
            t.menu.call(this),
              t.dropdown.call(this),
              t[n.split("nav-").join("").split("-nav").join("")].call(this);
          }));
      }
    };
    var t = {
      menu: function () {
        this.$menu
          .find(".nav")
          .removeClass("nav")
          .end()
          .find(".sr-only")
          .remove()
          .end()
          .find(".divider:empty")
          .remove();
        for (
          var n = ["role", "aria-haspopup", "aria-expanded"], a = 0;
          a < n.length;
          a++
        )
          this.$menu.find("[" + n[a] + "]").removeAttr(n[a]);
      },
      dropdown: function () {
        var n = this.$menu.find(".dropdown");
        n.removeClass("dropdown"),
          n
            .children(".dropdown-toggle")
            .find(".caret")
            .remove()
            .end()
            .each(function () {
              a(this).replaceWith("<span>" + a(this).html() + "</span>");
            }),
          n.children(".dropdown-menu").removeClass("dropdown-menu");
      },
      tabs: function () {
        this.$menu.find(".nav-tabs").removeClass("nav-tabs");
      },
      pills: function () {
        this.$menu.find(".nav-pills").removeClass("nav-pills");
      },
      navbar: function () {
        var a = this;
        this.$menu
          .removeClass("collapse navbar-collapse")
          .find('[class*="navbar-"]')
          .removeClass(
            "navbar-left navbar-right navbar-nav navbar-text navbar-btn"
          );
        var n = this.$menu.find(".navbar-form");
        (this.conf.searchform = {
          form: { action: n.attr("action"), method: n.attr("method") },
          input: { name: n.find("input").attr("name") },
          submit: !0,
        }),
          n.remove(),
          (this.$orig || this.$menu)
            .closest(".navbar")
            .find(".navbar-header")
            .find(".navbar-toggle")
            .off("click")
            .on("click", function (n) {
              a.open(), n.stopImmediatePropagation(), n.preventDefault();
            });
      },
    };
  })(jQuery);
  !(function (i) {
    function s(n) {
      for (
        var a = i("<a />"), e = ["href", "title", "target"], t = 0;
        t < e.length;
        t++
      )
        void 0 !== n.attr(e[t]) && a.attr(e[t], n.attr(e[t]));
      return a.html(n.html()), a.find(".sr-only").remove(), a;
    }
    function o(n) {
      var e = i("<ul />");
      return (
        n.children().each(function () {
          var n = i(this),
            a = i("<li />");
          n.hasClass("dropdown-divider")
            ? a.addClass("Divider")
            : n.hasClass("dropdown-item") && a.append(s(n)),
            e.append(a);
        }),
        e
      );
    }
    i.mmenu.wrappers.bootstrap4 = function () {
      var e = this;
      if (this.$menu.hasClass("navbar-collapse")) {
        this.conf.clone = !1;
        var n = i("<nav />"),
          r = i("<div />");
        n.append(r),
          this.$menu.children().each(function () {
            var n,
              t,
              a = i(this);
            switch (!0) {
              case a.hasClass("navbar-nav"):
                r.append(
                  ((n = a),
                  (t = i("<ul />")),
                  n.find(".nav-item").each(function () {
                    var n = i(this),
                      a = i("<li />");
                    if (
                      (n.hasClass("active") && a.addClass("Selected"),
                      !n.hasClass("nav-link"))
                    ) {
                      var e = n.children(".dropdown-menu");
                      e.length && a.append(o(e)), (n = n.children(".nav-link"));
                    }
                    a.prepend(s(n)), t.append(a);
                  }),
                  t)
                );
                break;
              case a.hasClass("dropdown-menu"):
                r.append(o(a));
                break;
              case a.hasClass("form-inline"):
                (e.conf.searchfield.form = {
                  action: a.attr("action") || null,
                  method: a.attr("method") || null,
                }),
                  (e.conf.searchfield.input = {
                    name: a.find("input").attr("name") || null,
                  }),
                  (e.conf.searchfield.clear = !1),
                  (e.conf.searchfield.submit = !0);
                break;
              default:
                r.append(a.clone(!0));
            }
          }),
          this.bind("initMenu:before", function () {
            n.prependTo("body"), (this.$menu = n);
          }),
          this.$menu
            .parent()
            .find(".navbar-toggler")
            .removeAttr("data-target")
            .removeAttr("aria-controls")
            .off("click")
            .on("click", function (n) {
              n.preventDefault(),
                n.stopImmediatePropagation(),
                e[e.vars.opened ? "close" : "open"]();
            });
      }
    };
  })(jQuery);
  !(function (n) {
    n.mmenu.wrappers.jqueryMobile = function () {
      var t = this;
      (this.opts.onClick.close = !1),
        (this.conf.offCanvas.page.selector = "div.ui-page-active"),
        n("body").on("pagecontainerchange", function (e, n) {
          "function" == typeof t.close && (t.close(), t.setPage(n.toPage));
        }),
        this.bind("initAnchors:after", function () {
          n("body").on("click", ".mm-listview a", function (e) {
            e.isDefaultPrevented() ||
              (e.preventDefault(),
              n("body").pagecontainer("change", n(this).attr("href")));
          });
        });
    };
  })(jQuery);
  jQuery.mmenu.wrappers.magento = function () {
    this.conf.classNames.selected = "active";
  };
  jQuery.mmenu.wrappers.olark = function () {
    this.conf.offCanvas.page.noSelector.push("#olark");
  };
  !(function (o) {
    var r = "mmenu";
    o[r].wrappers.turbolinks = function () {
      var n, t;
      o(document)
        .on("turbolinks:before-visit", function () {
          (t = o("html")),
            (n = t.attr("class")),
            (n = o
              .grep(n.split(/\s+/), function (n) {
                return !/mm-/.test(n);
              })
              .join(" "));
        })
        .on("turbolinks:load", function () {
          void 0 !== t && (t.attr("class", n), (o[r].glbl = !1));
        });
    };
  })(jQuery);
  !(function (s) {
    s.mmenu.wrappers.wordpress = function () {
      (this.conf.classNames.selected = "current-menu-item"),
        s("#wpadminbar").css("position", "fixed").addClass("mm-slideout");
    };
  })(jQuery);
  jQuery.mmenu.i18n({ Menu: "Menü" }, "de");
  jQuery.mmenu.i18n(
    {
      "Close menu": "Menü schließen",
      "Close submenu": "Untermenü schließen",
      "Open submenu": "Untermenü öffnen",
      "Toggle submenu": "Untermenü wechseln",
    },
    "de"
  );
  jQuery.mmenu.i18n(
    {
      Search: "Suche",
      "No results found.": "Keine Ergebnisse gefunden.",
      cancel: "beenden",
    },
    "de"
  );
  jQuery.mmenu.i18n({ Menu: "Menu" }, "nl");
  jQuery.mmenu.i18n(
    {
      "Close menu": "Menu sluiten",
      "Close submenu": "Submenu sluiten",
      "Open submenu": "Submenu openen",
      "Toggle submenu": "Submenu wisselen",
    },
    "nl"
  );
  jQuery.mmenu.i18n(
    {
      Search: "Zoeken",
      "No results found.": "Geen resultaten gevonden.",
      cancel: "annuleren",
    },
    "nl"
  );
  jQuery.mmenu.i18n({ Menu: "Меню" }, "ru");
  jQuery.mmenu.i18n(
    {
      "Close menu": "Закрыть меню",
      "Close submenu": "Закрыть подменю",
      "Open submenu": "Открыть подменю",
      "Toggle submenu": "Переключить подменю",
    },
    "ru"
  );
  jQuery.mmenu.i18n(
    {
      Search: "Найти",
      "No results found.": "Ничего не найдено.",
      "Search results": "Результаты поиска",
    },
    "ru"
  );
  return true;
});
