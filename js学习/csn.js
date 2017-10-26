var Csn = (function() {
    var $, csn = {};
    $ = function(sel, con) {
        return csn.init(sel, con);
    };
    csn.init = function(sel, con) {
        if (!sel) { return csn.C(); }
        if (con !== undefined) { return $(con).find(sel); }
        if (csn.isC(sel)) { return sel; }
        if (typeof(sel) === 'function') { return $(document).ready(sel); }
        return csn.C(typeof sel === 'object' ? [sel] : $.dom(sel));
    };
    csn.C = function(dom) {
        return new C(dom);
    };
    function C(dom) {
        var len = 0;
        for (var i=0,l=dom?dom.length:0; i<l; i++) {
            dom[i] == null || (this[len++] = dom[i]);
        }
        this.length = len;
    }
    csn.isC = function(obj) {
        return obj instanceof csn.C;
    };
    $.fn = {
        constructor:csn.C,
        dt:[],
        dtt:[],
        di:[],
        size:function() {
            return this.length;
        },
        eq:function(i) {
            var obj;
            $.list(this, function(j) {
                if (i === j) {
                    obj = this;
                    return true;
                }
            });
            return $(obj);
        },
        index:function(o) {
            var i = -1;
            $.list(this, function(j) {
                if (o === this) {
                    i = j;
                    return true;
                }
            });
            return i;
        },
        find:function(sel) {
            var dom = [];
            $.list(this, function(){
                $.list($.dom(sel, this), function() {
                    dom.push(this);
                });
            });
            return csn.C(dom);
        },
        remove:function() {
            $.list(this, function() {
                this.parentNode.removeChild(this);
            });
        },
        hide:function() {
            $.list(this, function() {
                this.style.display = 'none';
            });
            return this;
        },
        show:function() {
            $.list(this, function() {
                this.style.display = 'block';
            });
            return this;
        },
        append:function(str) {
            this.html(this.html()+str);
        },
        html:function() {
            return this.make('innerHTML', arguments[0]);
        },
        val:function() {
            return this.make('value', arguments[0]);
        },
        attr:function() {
            return this.make(arguments[0], arguments[1]);
        },
        cls:function() {
            return this.make('className', arguments[0]);
        },
        inCls:function(c) {
            return (this.cls().indexOf(c) > -1);
        },
        rmCls:function(c) {
            $.list(this, function() {
                var _cls = this.className;
                if (!_cls) { return; }
                this.className = (' '+_cls+' ').replace(' '+c+' ', ' ').replace(/^ /, '').replace(/ $/);
            });
        },
        adCls:function(c) {
            $.list(this, function() {
                var _cls = this.className;
                this.className = _cls ? ($.index(_cls, c) > -1 ? _cls : (_cls + ' ' + c)) : c;
            });
        },
        css:function() {
            return this.make(arguments[0], arguments[1], 'style');
        },
        make:function(v1, v2, k) {
            if (v2 === undefined && typeof v1 !== 'object') {
                var that = this[0];
                return (k !== undefined && k in that) ? k === 'style' ? $.style(that)[$.css3(v1)] : that[k][v1] : that[v1];
            } else {
                if (typeof v1 === 'object') {
                    $.list(this, function() {
                        var that = this;
                        $.each(v1, function(i) {
                            (k !== undefined && k in that) ? (that[k][(k === 'style') ? $.css3(i) : i] = this) : (that[i] = this);
                        });
                    });
                } else {
                    $.list(this, function() {
                        (k !== undefined && k in this) ? (this[k][k === 'style' ? $.css3(v1) : v1] = v2) : (this[v1] = v2);
                    });
                }
                return this;
            }
        },
        ready:function(fn) {
            (/complete|loaded|interactive/.test(document.readyState) && document.body) ? fn($) : (document.addEventListener && document.addEventListener('DOMContentLoaded', function() { fn($); }, false));
            return this;
        },
        on:function() {
            var e = arguments[0];
            switch (arguments.length) {
                case 0:
                    return this;
                    break;
                case 1:
                    $.list(this, function() {
                        this[e+'fn']();
                    });
                    break;
                default:
                    var fn = arguments[1];
                    var b = arguments[2] || false;
                    if (typeof e === 'object') {
                        var that = this;
                        $.each(e, function() {
                            that.on(this, fn, b);
                        });
                    } else {
                        $.list(this, function() {
                            this.addEventListener ? (this.addEventListener(e, fn, b) && (this[e+'b'] = b)) : this.attachEvent('on'+e, fn);
                            this[e+'fn'] = fn;
                        });
                    }

            }
            return this;
        },
        off:function(e) {
            if (typeof e === 'object') {
                var that = this;
                $.each(e, function() {
                    that.off(this);
                });
            } else {
                $.list(this, function() {
                    this.removeEventListener ? (this.removeEventListener(e, this[e+'fn'], this[e+'b']) && (delete this[e+'b'])) : this.detachEvent('on'+e, this[e+'fn']);
                    delete this[e+'fn'];
                });
            }
            return this;
        },
        animate:function(obj, t) {
            var zs = 32;
            var _t = t % zs;
            var c = Math.floor(t / zs);
            var lt = this.dt.length;
            var _this = this;
            $.list(this, function() {
                var that = this;
                _this.dt[lt] = t;
                setTimeout(function() {
                    $.each(obj, function(i) {
                        $.animateGo(_this, that, c, zs, i, this);
                    });
                }, _t);
            });
        }
    };
    $.cssNum = ['column-count', 'columns', 'font-weight', 'line-height', 'opacity', 'z-index', 'zoom'];
    $.bowPre = ['webkit','khtml','moz','ms','o'];
    $.cssArr = {};
    $.cssPre = {};
    $.pxArr = {};
    $.ajaxType = {
        script:'text/javascript,application/javascript,application/x-javascript',
        json:'application/json',
        xml:'application/xml,text/xml',
        html:'text/html',
        text:'text/plain'
    };
    $.index = function(obj, v ,b) {
        if (!obj) { return -1; }
        var k = -1;
        if (typeof (obj) === 'string') {
            for (var i=0,l=obj.length; i<l; i++) {
                if ((b && obj[i] === v) || (!b && obj[i] == v)) {
                    k = i;
                    break;
                }
            }
        } else {
            for (var i in obj) {
                if ((b && obj[i] === v) || (!b && obj[i] == v)) {
                    k = i;
                    break;
                }
            }
        }
        return k;
    };
    $.uCase = function(s) {
        return s[0].toUpperCase() + s.slice(1);
    };
    $.hump = function(v, p, arr) {
        return ((p = p || '-') && ($.index(v, p) > -1) && (arr = v.split(p))) ? (arr[0] + $.uCase(arr[1])) : v;
    };
    $.bowCore = function(name) {
        name = name || 'transition';
        if ($.cssPre[name] === undefined) {
            $.cssPre[name] = '';
            var css = $.domStyle();
            var _name = $.uCase(name);
            $.each($.bowPre, function(i, v) {
                if (typeof(css[v + _name]) === 'string') {
                    $.cssPre[name] = v;
                }
                return true;
            });
        }
        return $.cssPre[name];
    };
    $.css3 = function(name) {
        name = $.hump(name || 'transition');
        if ($.cssArr[name] === undefined) {
            var css = $.domStyle();
            if (typeof(css[name]) === 'string') {
                $.cssArr[name] = name;
            } else {
                $.cssArr[name] = $.bowCore(name) + $.uCase(name);
            }
            return $.cssArr[name];
        }
        return $.cssArr[name];
    };
    $.isPx = function(name) {
        return ($.pxArr[name] === undefined) ? ($.pxArr[name] = $.index($.cssNum, name) === -1) : $.pxArr[name];
    };
    $.animateGo = function(obj, dom, c, t, i, v) {
        var isPx = $.isPx(i) ? 'px' : '';
        i = $.css3(i);
        var end = isPx ? parseInt(v) : v;
        var di = obj.di;
        var dc = (end - (isPx ? parseInt($.style(dom)[i]) : $.style(dom)[i])) / c;
        var li = di.length;
        dom.style[i] = (end - (dc * c)) + isPx;
        di[li] = setInterval(function() {
            if (--c < 0) {
                dom.style[i] = end + isPx;
                clearInterval(di[li]);
                delete di[li];
            } else {
                dom.style[i] = (end - (dc * c)) + isPx;
            }
        }, t);
    };
    $.each = function(obj, fn) {
        for (var i in obj) {
            if (fn.call(obj[i], i, obj[i])) { break; };
        }
    };
    $.list = function(obj, fn) {
        for (var i=0,l=obj.length; i<l; i++) {
            if (fn.call(obj[i], i, obj[i])) { break; }
        }
    };
    $.dom = function(sel, obj) {
        return (obj || document).querySelectorAll(sel);
        obj = obj || document;
        var isId = sel[0] === '#', isClass = !isId && sel[0] === '.', name = isId || isClass ? sel.slice(1) : sel;
        return isId ? [obj.getElementById(name)] : ((isClass ? obj.getElementsByClassName(name) : obj.getElementsByTagName(name)) || obj.querySelectorAll(sel));
    };
    $.rem = function(q, mw) {
        document.documentElement.style.fontSize = Math.min($.w(), mw || 768) / (typeof(q) === 'number' ? q : 15) + 'px';
    };
    $.resize = function(fn) {
        (window.onresize = fn)();
    };
    $.style = function(obj) {
        return window.getComputedStyle ? window.getComputedStyle(obj) : obj.currentStyle;
    };
    $.domStyle = function() {
        return ($.domCss === undefined) ? ($.domCss = (document.body || document.documentElement).style) : $.domCss;
    };
    $.box = function(sel) {
        return (sel ? $.dom(sel)[0] : document.documentElement).getBoundingClientRect();
    };
    $.w = function(b) {
        return (b === undefined || $.width === undefined) ? ($.width = document.documentElement.clientWidth) : $.width;
    };
    $.h = function(b) {
        return (b === undefined || $.height === undefined) ? ($.height = document.documentElement.clientHeight) : $.height;
    };
    $.query = function(k, r) {
        return (k === undefined || (r = window.location.search.substr(1).match(new RegExp("(^|&)"+k+"=([^&]*)(&|$)"))) === null) ? null : unescape(r[2]);
    };
    $.agent = function() {
        return ($.userAgent === undefined)? ($.userAgent = navigator.userAgent.toLowerCase()) : $.userAgent;
    };
    $.os = function() {
        var _agent = $.agent();
        if (_agent.indexOf('macintosh') > 0 || _agent.indexOf('window') > 0) { return 'pc'; }
        if (_agent.indexOf('micromessenger') > 0 || _agent.indexOf('mqqbrowser') > 0) { return 'wx'; }
        if (_agent.indexOf('iphone') > 0 || _agent.indexOf('mac os') > 0) { return 'iphone'; }
        if (_agent.indexOf('android') > 0 || _agent.indexOf('linux') > 0) { return 'android'; }
        return 'android';
    };
    $.browser = function() {
        var _agent = $.agent();
        return {
            version: (_agent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1],
            safari: /webkit/.test( _agent ),
            opera: /opera/.test( _agent ),
            msie: /msie/.test( _agent ) && !/opera/.test( _agent ),
            mozilla: /mozilla/.test( _agent ) && !/(compatible|webkit)/.test( _agent )
        };
    };
    $.check = function(s, t) {
        var _reg;
        switch (t) {
            case 'usr':
                _reg = /^[\u4E00-\u9FA5|\w]{5,25}$/i;
                break;
            case 'pwd':
                _reg = /^[\w\-]{6,20}$/;
                break;
            case 'url':
                _reg = /^https?:\/\/.+/;
                break;
            case 'email':
                _reg = /^[a-zA-Z0-9][\w\.-]+@[a-zA-Z0-9]{1,10}\.(com(\.cn)?|net|cn)$/i;
                break;
            case 'phone':
                _reg = /^(\d{3,4})?\d{7,8}$/;
                break;
            case 'tel':
                _reg = /^1[34578]{1}\d{9}$/;
                break;
            case 'wx':
                _reg = /^[-\w]{6,20}$/;
                break;
            case 'qq':
                _reg = /^[1-9]\d{4,11}$/;
                break;
            case 'code':
                _reg = /^[0-9a-zA-Z]{4,6}$/;
                break;
            default:
                return false;
        }
        return _reg.test(s);
    };
    $.format = function(obj, b) {
        var arr = [];
        if (typeof (obj) === 'object') {
            if (b) {
                $.each(obj, function(i) {
                    arr.push(i + '=' + this);
                });
            } else {
                $.each(obj, function(i) {
                    arr.push(i + '=' + encodeURIComponent(this));
                });
            }
            arr = arr.join('&');
        } else {
            arr = obj;
        }
        return (arr + ('&_=' + Math.random()).replace('.', ''));
    };
    $.getAjaxType = function(type) {
        var t;
        if (type) {
            type = type.indexOf(';') > -1 ? type.split(';', 2)[0] : type;
            $.each($.ajaxType, function(i) {
                if (this.indexOf(type) > -1) {
                    t = i;
                    return true;
                }
            });
        }
        return (t || 'text');
    };
    $.xhr = function() {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.success = [];
        xhr.fail = [];
        xhr.then = function(s, f) {
            xhr.y(s);
            xhr.n(f);
            return this;
        };
        xhr.y = function(s) {
            s && xhr.success.push(s);
            return this;
        };
        xhr.n = function(f) {
            f && xhr.fail.push(f);
            return this;
        };
        xhr.setMimeType = function(t) {
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            (t in $.ajaxType) && (t = $.ajaxType[t]) && xhr.overrideMimeType && (t = t.indexOf(',') > -1 ? t.split(',', 2)[0] : t) && xhr.overrideMimeType(t);
        };
        return xhr;
    };
    $.ajax = function (obj) {
        obj = obj || {};
        obj.type = (obj.type || 'GET').toUpperCase();
        if (obj.type !== 'GET' && obj.type !== 'POST') { return; }
        var xhr = $.xhr();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) { return; }
            if (xhr.status === 200) {
                var dataType = (obj.dataType in $.ajaxType) ? obj.dataType : $.getAjaxType(xhr.getResponseHeader('content-type'));
                var result = (xhr.responseType === 'arraybuffer' || xhr.responseType === 'blob') ? xhr.response : xhr.responseText;
                dataType === 'script' ? (1, eval)(result) : (result = dataType === 'xml' ? xhr.responseXML : dataType === 'json' ? JSON.parse(result) : result);
                obj.success ? obj.success(result) : $.each(xhr.success, function() { this(result); });
            } else {
                obj.fail ? obj.fail(xhr.status) : $.each(xhr.fail, function() { this(xhr.status); });
            }
        };
        var data = obj.data ? $.format(obj.data, obj.type === 'GET') : null;
        if (obj.type === 'GET') {
            xhr.open('GET', obj.url + (data ? ('?' + data) : ''), true);
            xhr.setMimeType(obj.dataType);
            xhr.send(null);
        } else if (obj.type === 'POST') {
            xhr.open('POST', obj.url, true);
            xhr.setMimeType(obj.dataType);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(data);
        }
        return xhr;
    };
    $.request = function(arr, b) {
        var obj = {url:arr[0]};
        b && (obj.type = 'POST');
        var fs = 1;
        if (typeof arr[fs] !== 'function') {
            obj.data = arr[fs++];
        }
        arr[fs] && (obj.success = arr[fs++]) && arr[fs] && (obj.fail = arr[fs]);
        return $.ajax(obj);
    };
    $.get = function() {
        return $.request(arguments);
    };
    $.post = function() {
        return $.request(arguments, true);
    };
    csn.C.prototype = C.prototype = $.fn;
    $.csn = csn;
    return $;
})();
window.Csn = Csn, '$' in window || (window.$ = Csn);
