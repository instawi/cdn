(function() {
    var e = function(e) {
        return jQuery.extend(this, e)
    };
    e.prototype.setStatus = function(e, d) {
        var b, a;
        if (jQuery.isArray(e))
            for (a = 0; a < e.length; a++) e[a].data && e[a].data.paging && (b = e[a].data.paging);
        else e.data && (b = e.data.paging);
        !b || 0 >= b.pagesNumber ? (this.$control.html(""), this.$control.addClass("jplist-empty")) : (this.$control.removeClass("jplist-empty"), a = this.$control.attr("data-type"), a = a.replace("{current}", b.currentPage + 1), a = a.replace("{pages}", b.pagesNumber), a = a.replace("{start}", b.start + 1),
            a = a.replace("{end}", b.end), a = a.replace("{all}", b.itemsNumber), this.$control.html(a))
    };
    jQuery.fn.jplist.controls.PaginationInfo = function(g) {
        return new e(g)
    };
    jQuery.fn.jplist.controlTypes["pagination-info"] = {
        className: "PaginationInfo",
        options: {}
    }
})();
(function() {
    var e = function(b, a) {
            var f;
            f = null;
            var c;
            c = !1;
            f = b.$control.find("button[data-active]").eq(0);
            0 >= f.length && (f = b.$control.find("button").eq(0));
            f = a ? 0 : Number(f.attr("data-number")) || 0;
            (c = "true" === b.$control.attr("data-jump-to-start") || b.controlOptions.jumpToStart) && (c = b.history.getLastStatus()) && "pagination" !== c.type && "views" !== c.type && (f = 0);
            c = Number(b.$control.attr("data-items-per-page")) || 0;
            f = new jQuery.fn.jplist.controls.PaginationDTO(f, c);
            return f = new jQuery.fn.jplist.StatusDTO(b.name,
                b.action, b.type, f, b.inStorage, b.inAnimation, b.isAnimateToTop, b.inDeepLinking)
        },
        g = function(b) {
            b.$control.on("click", "button", function() {
                var a, f = null;
                a = jQuery(this);
                var c;
                a = Number(a.attr("data-number")) || 0;
                f = e(b, !1);
                f.data.currentPage = a;
                c = b.$root.find('[data-control-type="pagination"]');
                c.find("button").removeAttr("data-active");
                c.find('button[data-number="' + a + '"]').each(function() {
                    jQuery(this).attr("data-active", !0)
                });
                b.observer.trigger(b.observer.events.knownStatusesChanged, [
                    [f]
                ])
            })
        },
        d = function(b) {
            b.params = {
                view: new jQuery.fn.jplist.controls.PaginationView(b.$control, b.controlOptions)
            };
            g(b);
            return jQuery.extend(this, b)
        };
    d.prototype.getStatus = function(b) {
        return e(this, b)
    };
    d.prototype.getDeepLink = function() {
        var b = "",
            a;
        if (this.inDeepLinking && (a = e(this, !1), a.data))
            if (jQuery.isNumeric(a.data.currentPage) && (b = this.name + this.options.delimiter0 + "currentPage=" + a.data.currentPage), this.$control.attr("data-items-per-page")) b && (b += this.options.delimiter1), b += this.name + this.options.delimiter0 + "number=" + a.data.number;
            else if (jQuery.isNumeric(a.data.number) || "all" === a.data.number) b = this.name + this.options.delimiter0 + "number=" + a.data.number;
        return b
    };
    d.prototype.getStatusByDeepLink = function(b, a) {
        var f;
        a: if (f = null, this.inDeepLinking) {
            if ("currentPage" !== b) {
                f = null;
                break a
            }
            f = e(this, !0);
            f.data && "currentPage" === b && (f.data.currentPage = a)
        }
        return f
    };
    d.prototype.setStatus = function(b, a) {
        var f;
        if (jQuery.isArray(b))
            for (var c = 0; c < b.length; c++) b[c].data && b[c].data.paging && (f = b[c].data.paging);
        else b.data && (f = b.data.paging);
        f &&
            this.params.view.build(f)
    };
    jQuery.fn.jplist.controls.Pagination = function(b) {
        return new d(b)
    };
    jQuery.fn.jplist.controlTypes.pagination = {
        className: "Pagination",
        options: {}
    }
})();
(function() {
    var e = function(d, b, a, f) {
            var c = "";
            d = d.$control.attr("data-number-title") || d.options.numberArrowTitle;
            for (var c = c + '<div class="jplist-pagesbox" data-type="pagesbox">', h = b; h < a; h++) c += '<button type="button" data-type="page" ', h === f && (c += ' class="jplist-current" data-active="true" '), b = h + 1, c += ' data-number="' + h + '" ', c += ' title="' + d.replace("{number}", b) + '" ', c += ">" + b + "</button> ";
            return c + "</div>"
        },
        g = function(d, b) {
            var a = {
                    $control: d,
                    options: b,
                    $pagingprev: null,
                    $pagingmid: null,
                    $pagingnext: null,
                    $jplistFirst: null,
                    $jplistPrev: null,
                    $jplistNext: null,
                    $jplistLast: null,
                    mode: d.attr("data-mode")
                },
                f, c, h, e, g, k, l, m;
            f = a.$control.attr("data-prev") || a.options.prevArrow;
            c = a.$control.attr("data-prev-title") || a.options.prevArrowTitle;
            h = a.$control.attr("data-next") || a.options.nextArrow;
            e = a.$control.attr("data-next-title") || a.options.nextArrowTitle;
            g = a.$control.attr("data-first") || a.options.firstArrow;
            k = a.$control.attr("data-first-title") || a.options.firstArrowTitle;
            l = a.$control.attr("data-last") || a.options.lastArrow;
            m = a.$control.attr("data-last-title") || a.options.lastArrowTitle;
            a.$control.html('<div class="jplist-pagingprev" data-type="pagingprev"></div><div class="jplist-pagingmid" data-type="pagingmid"></div><div class="jplist-pagingnext" data-type="pagingnext"></div>');
            a.$pagingprev = a.$control.find('[data-type="pagingprev"]');
            a.$pagingmid = a.$control.find('[data-type="pagingmid"]');
            a.$pagingnext = a.$control.find('[data-type="pagingnext"]');
            a.$pagingprev.html('<button type="button" class="jplist-first" data-number="0" data-type="first" title="' +
                k + '">' + g + '</button><button type="button" class="jplist-prev" data-type="prev" title="' + c + '">' + f + "</button>");
            a.$pagingnext.html('<button type="button" class="jplist-next" data-type="next" title="' + e + '">' + h + '</button><button type="button" class="jplist-last" data-type="last" title="' + m + '">' + l + "</button>");
            a.$jplistFirst = a.$pagingprev.find('[data-type="first"]');
            a.$jplistPrev = a.$pagingprev.find('[data-type="prev"]');
            a.$jplistNext = a.$pagingnext.find('[data-type="next"]');
            a.$jplistLast = a.$pagingnext.find('[data-type="last"]');
            return jQuery.extend(this, a)
        };
    g.prototype.build = function(d) {
        if (0 <= d.currentPage && d.currentPage < d.pagesNumber) {
            this.$control.removeClass("jplist-hidden");
            switch (this.mode) {
                case "google-like":
                    var b = "",
                        a;
                    a = Number(this.$control.attr("data-range")) || this.options.range;
                    b = d.currentPage - Math.floor((a - 1) / 2);
                    0 > b && (b = 0);
                    a = b + a;
                    a > d.pagesNumber && (a = d.pagesNumber);
                    b = e(this, b, a, d.currentPage);
                    this.$pagingmid.html(b);
                    break;
                default:
                    var f;
                    f = Number(this.$control.attr("data-range")) || this.options.range;
                    a = Math.floor(d.currentPage /
                        f);
                    b = f * (a + 1);
                    b > d.pagesNumber && (b = d.pagesNumber);
                    b = e(this, f * a, b, d.currentPage);
                    this.$pagingmid.html(b)
            }
            this.$jplistPrev.attr("data-number", d.prevPage).removeClass("jplist-current");
            this.$jplistNext.attr("data-number", d.nextPage).removeClass("jplist-current");
            this.$jplistLast.attr("data-number", d.pagesNumber - 1).removeClass("jplist-current");
            1 >= d.pagesNumber ? this.$control.addClass("jplist-one-page") : this.$control.removeClass("jplist-one-page")
        } else this.$control.addClass("jplist-hidden");
        0 === d.currentPage ?
            this.$pagingprev.addClass("jplist-hidden") : this.$pagingprev.removeClass("jplist-hidden");
        d.currentPage == d.pagesNumber - 1 ? this.$pagingnext.addClass("jplist-hidden") : this.$pagingnext.removeClass("jplist-hidden")
    };
    jQuery.fn.jplist.controls.PaginationView = function(d, b) {
        return new g(d, b)
    };
    jQuery.fn.jplist.controlTypes.pagination = {
        className: "Pagination",
        options: {
            range: 7,
            jumpToStart: !1,
            prevArrow: "&lsaquo;",
            nextArrow: "&rsaquo;",
            firstArrow: "&laquo;",
            lastArrow: "&raquo;",
            prevArrowTitle: "",
            nextArrowTitle: "",
            firstArrowTitle: "",
            lastArrowTitle: "",
            numberArrowTitle: ""
        }
    }
})();
(function() {
    jQuery.fn.jplist.controls.PaginationDTO = function(e, g) {
        var d = {
            currentPage: e,
            paging: null
        };
        g && (d.number = g);
        return d
    }
})();
(function() {
    var e = function(a, b) {
            var c = null;
            b ? (c = a.$control.find('li:has(span[data-default="true"])').eq(0), 0 >= c.length && (c = a.$control.find("li:eq(0)"))) : c = a.$control.find(".active");
            c = c.find("span");
            c = new jQuery.fn.jplist.controls.DropdownPaginationDTO(c.attr("data-number"));
            return c = new jQuery.fn.jplist.StatusDTO(a.name, a.action, a.type, c, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking)
        },
        g = function(a, b) {
            var c, d, e;
            a.$control.find("span").each(function() {
                c = jQuery(this).attr("data-path");
                d = jQuery(this).attr("data-type");
                c && "" !== jQuery.trim(c) && (e = new jQuery.fn.jplist.PathModel(c, d), b.push(e))
            })
        },
        d = function(a) {
            a.$control.find("li").off().on("click", function() {
                var b, c, d, g;
                b = e(a, !1);
                g = jQuery(this).find("span");
                c = g.attr("data-path");
                d = g.attr("data-number");
                c ? (b.data.path = c, b.data.type = g.attr("data-type"), b.data.order = g.attr("data-order")) : d && (b.data.number = d);
                a.observer.trigger(a.observer.events.knownStatusesChanged, [
                    [b]
                ])
            })
        },
        b = function(a) {
            new jQuery.fn.jplist.DropdownControl(a.options,
                a.observer, a.history, a.$control);
            d(a);
            return jQuery.extend(this, a)
        };
    b.prototype.getStatus = function(a) {
        return e(this, a)
    };
    b.prototype.getDeepLink = function() {
        var a = "",
            b;
        this.inDeepLinking && (b = e(this, !1), b.data && (jQuery.isNumeric(b.data.number) || "all" === b.data.number) && (a = this.name + this.options.delimiter0 + "number=" + b.data.number));
        return a
    };
    b.prototype.getStatusByDeepLink = function(a, b) {
        var c;
        a: if (c = null, this.inDeepLinking) {
            if ("number" !== a && a !== "path" + this.options.delimiter2 + "type" + this.options.delimiter2 +
                "order" && "path" !== a) {
                c = null;
                break a
            }
            c = e(this, !0);
            c.data && "number" === a && jQuery.isNumeric(c.data.number) && (c.data.number = b)
        }
        return c
    };
    b.prototype.getPaths = function(a) {
        g(this, a)
    };
    b.prototype.setStatus = function(a, b) {
        var c, d;
        if (jQuery.isArray(a))
            for (d = 0; d < a.length; d++) a[d].data && a[d].data.number && (c = a[d].data.number);
        else a.data && (c = a.data.number);
        if (jQuery.isNumeric(c) || "all" === c) d = this.$control.find("li"), d.removeClass("active"), c = this.$control.find('li:has([data-number="' + c + '"])'), 0 === c.length && (c =
            this.$control.find('li:has([data-number="all"])')), 0 >= c.length && (c = d.eq(0)), c.addClass("active"), this.$control.find(".jplist-dd-panel").text(c.eq(0).text())
    };
    jQuery.fn.jplist.controls.ItemsPerPageDropdown = function(a) {
        return new b(a)
    };
    jQuery.fn.jplist.controlTypes["items-per-page-drop-down"] = {
        className: "ItemsPerPageDropdown",
        options: {},
        dropdown: !0
    }
})();
(function() {
    var e = function(a, b) {
            var c;
            c = null;
            b ? (c = a.$control.find('option[data-default="true"]').eq(0), 0 >= c.length && (c = a.$control.find("option").eq(0))) : c = a.$control.find("option:selected");
            c = new jQuery.fn.jplist.controls.DropdownPaginationDTO(c.attr("data-number"));
            return c = new jQuery.fn.jplist.StatusDTO(a.name, a.action, a.type, c, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking)
        },
        g = function(a, b) {
            var c, d, e;
            a.$control.find("option").each(function() {
                c = jQuery(this).attr("data-path");
                d = jQuery(this).attr("data-type");
                c && (e = new jQuery.fn.jplist.PathModel(c, d), b.push(e))
            })
        },
        d = function(a) {
            a.$control.change(function() {
                var b, c, d;
                b = e(a, !1);
                c = jQuery(this).find("option:selected");
                d = c.attr("data-path");
                c = c.attr("data-number");
                d ? (b.data.path = d, b.data.type = jQuery(this).attr("data-type"), b.data.order = jQuery(this).attr("data-order")) : c && (b.data.number = c);
                a.observer.trigger(a.observer.events.knownStatusesChanged, [
                    [b]
                ])
            })
        },
        b = function(a) {
            d(a);
            return jQuery.extend(this, a)
        };
    b.prototype.getStatus = function(a) {
        return e(this, a)
    };
    b.prototype.getDeepLink =
        function() {
            var a = "",
                b;
            this.inDeepLinking && (b = e(this, !1), b.data && (jQuery.isNumeric(b.data.number) || "all" === b.data.number) && (a = this.name + this.options.delimiter0 + "number=" + b.data.number));
            return a
        };
    b.prototype.getStatusByDeepLink = function(a, b) {
        var c = null;
        this.inDeepLinking && (c = e(this, !0), c.data && "number" === a && jQuery.isNumeric(c.data.number) && (c.data.number = b));
        return c
    };
    b.prototype.getPaths = function(a) {
        g(this, a)
    };
    b.prototype.setStatus = function(a, b) {
        var c;
        if (jQuery.isArray(a))
            for (var d = 0; d < a.length; d++) a[d].data &&
                a[d].data.number && (c = a[d].data.number);
        else a.data && (c = a.data.number);
        if (jQuery.isNumeric(c) || "all" === c) c = this.$control.find('option[data-number="' + c + '"]'), 0 === c.length && (c = this.$control.find('option[data-number="all"]')), c.get(0).selected = !0
    };
    jQuery.fn.jplist.controls.ItemsPerPageSelect = function(a) {
        return new b(a)
    };
    jQuery.fn.jplist.controlTypes["items-per-page-select"] = {
        className: "ItemsPerPageSelect",
        options: {}
    }
})();
(function() {
    jQuery.fn.jplist.controls.DropdownPaginationDTO = function(e) {
        return {
            number: e
        }
    }
})();

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});