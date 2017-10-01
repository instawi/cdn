(function() {
    var f = function(e) {
        return jQuery.extend(this, e)
    };
    f.prototype.setStatus = function(e, f) {
        var a, b;
        if (jQuery.isArray(e))
            for (b = 0; b < e.length; b++) e[b].data && e[b].data.number && (a = e[b].data.paging);
        else e.data && (a = e.data.paging);
        !a || 0 >= a.pagesNumber ? (this.$control.html(""), this.$control.addClass("jplist-empty")) : (this.$control.removeClass("jplist-empty"), b = this.$control.attr("data-type"), b = b.replace("{current}", a.currentPage + 1), b = b.replace("{pages}", a.pagesNumber), b = b.replace("{start}", a.start + 1),
            b = b.replace("{end}", a.end), b = b.replace("{all}", a.itemsNumber), this.$control.html(b))
    };
    jQuery.fn.jplist.controls.PaginationInfo = function(e) {
        return new f(e)
    };
    jQuery.fn.jplist.controlTypes["pagination-info"] = {
        className: "PaginationInfo",
        options: {}
    }
})();
(function() {
    var f = function(a, b) {
            var c;
            c = null;
            var d;
            d = !1;
            c = a.$control.find("li[data-active]").eq(0);
            0 >= c.length && (c = a.$control.find("button").eq(0));
            c = b ? 0 : Number(c.attr("data-number")) || 0;
            (d = "true" === a.$control.attr("data-jump-to-start") || a.controlOptions.jumpToStart) && (d = a.history.getLastStatus()) && "pagination" !== d.type && "views" !== d.type && (c = 0);
            d = Number(a.$control.attr("data-items-per-page")) || 0;
            c = new jQuery.fn.jplist.controls.BootstrapPaginationDTO(c, d);
            return c = new jQuery.fn.jplist.StatusDTO(a.name,
                a.action, a.type, c, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking)
        },
        e = function(a) {
            a.$control.on("click", "li", function() {
                var b, c = null;
                b = Number(jQuery(this).attr("data-number")) || 0;
                c = f(a, !1);
                c.data.currentPage = b;
                a.observer.trigger(a.observer.events.knownStatusesChanged, [
                    [c]
                ])
            })
        },
        g = function(a) {
            a.params = {
                view: new jQuery.fn.jplist.controls.BootstrapPaginationView(a.$control, a.controlOptions)
            };
            e(a);
            return jQuery.extend(this, a)
        };
    g.prototype.getStatus = function(a) {
        return f(this, a)
    };
    g.prototype.getDeepLink =
        function() {
            var a = "",
                b;
            this.inDeepLinking && (b = f(this, !1), b.data && (jQuery.isNumeric(b.data.currentPage) && (a = this.name + this.options.delimiter0 + "currentPage=" + b.data.currentPage), jQuery.isNumeric(b.data.number) || "all" === b.data.number)) && (a = this.name + this.options.delimiter0 + "number=" + b.data.number);
            return a
        };
    g.prototype.getStatusByDeepLink = function(a, b) {
        var c;
        a: if (c = null, this.inDeepLinking) {
            if ("currentPage" !== a) {
                c = null;
                break a
            }
            c = f(this, !0);
            c.data && "currentPage" === a && (c.data.currentPage = b)
        }
        return c
    };
    g.prototype.setStatus =
        function(a, b) {
            var c;
            if (jQuery.isArray(a))
                for (var d = 0; d < a.length; d++) a[d].data && (c = a[d].data.paging);
            else a.data && (c = a.data.paging);
            c && this.params.view.build(c)
        };
    jQuery.fn.jplist.controls.BootstrapPagination = function(a) {
        return new g(a)
    };
    jQuery.fn.jplist.controlTypes["boot-pagination"] = {
        className: "BootstrapPagination",
        options: {
            range: 7,
            jumpToStart: !1,
            prevArrow: "&lsaquo;",
            nextArrow: "&rsaquo;",
            firstArrow: "&laquo;",
            lastArrow: "&raquo;"
        }
    }
})();
(function() {
    jQuery.fn.jplist.controls.BootstrapPaginationDTO = function(f, e) {
        var g = {
            currentPage: f,
            paging: null
        };
        e && (g.number = e);
        return g
    }
})();
(function() {
    var f = function(a, b, c, d) {
            var e = "";
            a.$control.find('[data-type="page"]').remove();
            for (var f = b; f < c; f++) e += '<li data-type="page" ', f === d && (e += ' class="jplist-current active" data-active="true" '), b = f + 1, e += ' data-number="' + f + '" ', e += '><a href="#">' + b + "</a></li>";
            a.$jplistPrev.after(e)
        },
        e = function(a) {
            a.$control.on("click", "a", function(b) {
                b.preventDefault()
            })
        },
        g = function(a, b) {
            var c = {
                    $control: a,
                    options: b,
                    $jplistFirst: null,
                    $jplistPrev: null,
                    $jplistNext: null,
                    $jplistLast: null,
                    mode: a.attr("data-mode")
                },
                d, f, g, h;
            d = c.$control.attr("data-prev") || c.options.prevArrow;
            f = c.$control.attr("data-next") || c.options.nextArrow;
            g = c.$control.attr("data-first") || c.options.firstArrow;
            h = c.$control.attr("data-last") || c.options.lastArrow;
            d = "" + ('<li class="jplist-first" data-number="0" data-type="first"><a href="#"><span aria-hidden="true">' + g + '</span><span class="sr-only">First</span></a></li>') + ('<li class="jplist-prev" data-type="prev"><a href="#"><span aria-hidden="true">' + d + '</span><span class="sr-only">Previous</span></a></li>');
            d += '<li class="jplist-next" data-type="next"><a href="#"><span aria-hidden="true">' + f + '</span><span class="sr-only">Next</span></a></li>';
            d += '<li class="jplist-last" data-type="last"><a href="#"><span aria-hidden="true">' + h + '</span><span class="sr-only">Last</span></a></li>';
            c.$control.append(d);
            c.$jplistFirst = c.$control.find('[data-type="first"]');
            c.$jplistPrev = c.$control.find('[data-type="prev"]');
            c.$jplistNext = c.$control.find('[data-type="next"]');
            c.$jplistLast = c.$control.find('[data-type="last"]');
            e(c);
            return jQuery.extend(this, c)
        };
    g.prototype.build = function(a) {
        if (0 <= a.currentPage && a.currentPage < a.pagesNumber) {
            this.$control.show();
            switch (this.mode) {
                case "google-like":
                    var b, c;
                    b = Number(this.$control.attr("data-range")) || this.options.range;
                    c = a.currentPage - Math.floor((b - 1) / 2);
                    0 > c && (c = 0);
                    b = c + b;
                    b > a.pagesNumber && (b = a.pagesNumber);
                    f(this, c, b, a.currentPage);
                    break;
                default:
                    var d;
                    d = Number(this.$control.attr("data-range")) || this.options.range;
                    b = Math.floor(a.currentPage / d);
                    c = d * (b + 1);
                    c > a.pagesNumber && (c =
                        a.pagesNumber);
                    f(this, d * b, c, a.currentPage)
            }
            this.$jplistPrev.attr("data-number", a.prevPage).removeClass("jplist-current");
            this.$jplistNext.attr("data-number", a.nextPage).removeClass("jplist-current");
            this.$jplistLast.attr("data-number", a.pagesNumber - 1).removeClass("jplist-current");
            1 >= a.pagesNumber ? this.$control.addClass("jplist-one-page") : this.$control.removeClass("jplist-one-page")
        } else this.$control.hide();
        0 === a.currentPage ? (this.$jplistFirst.addClass("disabled"), this.$jplistPrev.addClass("disabled")) :
            (this.$jplistFirst.removeClass("disabled"), this.$jplistPrev.removeClass("disabled"));
        a.currentPage == a.pagesNumber - 1 ? (this.$jplistNext.addClass("disabled"), this.$jplistLast.addClass("disabled")) : (this.$jplistNext.removeClass("disabled"), this.$jplistLast.removeClass("disabled"))
    };
    jQuery.fn.jplist.controls.BootstrapPaginationView = function(a, b) {
        return new g(a, b)
    }
})();
(function() {
    var f = function(b) {
            var a;
            a = b.params.$buttons.filter('[data-default="true"]').eq(0);
            0 >= a.length && (a = b.params.$buttons.eq(0));
            return a
        },
        e = function(b, a) {
            var d = null,
                d = a ? f(b) : b.params.$buttons.filter('[data-jplist-selected="true"]'),
                d = new jQuery.fn.jplist.controls.BootstrapDropdownPaginationDTO(d.attr("data-number"));
            return d = new jQuery.fn.jplist.StatusDTO(b.name, b.action, b.type, d, b.inStorage, b.inAnimation, b.isAnimateToTop, b.inDeepLinking)
        },
        g = function(b) {
            b.params.$buttons.on("click", function(a) {
                var d;
                a.preventDefault();
                d = e(b, !1);
                if (a = jQuery(this).attr("data-number")) d.data.number = a;
                b.observer.trigger(b.observer.events.knownStatusesChanged, [
                    [d]
                ])
            })
        },
        a = function(b) {
            b.params = {
                $textBox: b.$control.find('[data-type="selected-text"]'),
                $buttons: b.$control.find("[data-number]")
            };
            g(b);
            return jQuery.extend(this, b)
        };
    a.prototype.getStatus = function(b) {
        return e(this, b)
    };
    a.prototype.getDeepLink = function() {
        var b = "",
            a;
        this.inDeepLinking && (a = e(this, !1), a.data && (jQuery.isNumeric(a.data.number) || "all" === a.data.number) &&
            (b = this.name + this.options.delimiter0 + "number=" + a.data.number));
        return b
    };
    a.prototype.getStatusByDeepLink = function(a, c) {
        var d;
        a: if (d = null, this.inDeepLinking) {
            if ("number" !== a && a !== "path" + this.options.delimiter2 + "type" + this.options.delimiter2 + "order" && "path" !== a) {
                d = null;
                break a
            }
            d = e(this, !0);
            d.data && "number" === a && jQuery.isNumeric(d.data.number) && (d.data.number = c)
        }
        return d
    };
    a.prototype.setStatus = function(a, c) {
        var d = null,
            d = 0;
        if (jQuery.isArray(a))
            for (var e = 0; e < a.length; e++) a[e].data && (jQuery.isNumeric(a[e].data.number) ||
                "all" === a[e].data.number) && (d = a[e].data.number);
        else a.data && (jQuery.isNumeric(a.data.number) || "all" === a.data.number) && (d = a.data.number);
        this.params.$buttons.attr("data-jplist-selected", !1);
        d = 0 === d ? f(this) : this.params.$buttons.filter('[data-number="' + d + '"]');
        0 < d.length && (d.attr("data-jplist-selected", !0), this.params.$textBox.text(d.text()))
    };
    jQuery.fn.jplist.controls.BootstrapItemsPerPageDropdown = function(b) {
        return new a(b)
    };
    jQuery.fn.jplist.controlTypes["boot-items-per-page-dropdown"] = {
        className: "BootstrapItemsPerPageDropdown",
        options: {},
        dropdown: !0
    }
})();
(function() {
    jQuery.fn.jplist.controls.BootstrapDropdownPaginationDTO = function(f) {
        return {
            number: f
        }
    }
})();

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});