/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: ${build.time}
*/
/**
 * dd support for kissy
 * @author: 承玉<yiminghe@gmail.com>
 */
KISSY.add('dd/ddm', function(S, DOM, Event, N, Base) {

    var doc = document,
        Node = S.require("node/node"),
        SHIM_ZINDEX = 999999;

    function DDM() {
        DDM.superclass.constructor.apply(this, arguments);
        this._init();
    }

    DDM.ATTRS = {
        prefixCls:{
            value:"ks-dd-"
        },
        /**
         * mousedown 后 buffer 触发时间  timeThred
         */
        bufferTime: { value: 200 },

        /**
         * 当前激活的拖动对象，在同一时间只有一个值，所以不是数组
         */
        activeDrag: {},

        /**
         *当前激活的drop对象，在同一时间只有一个值
         */
        activeDrop:{},
        /**
         * 所有注册的可被防止对象，统一管理
         */
        drops:{
            value:[]
        }
    };

    /*
     负责拖动涉及的全局事件：
     1.全局统一的鼠标移动监控
     2.全局统一的鼠标弹起监控，用来通知当前拖动对象停止
     3.为了跨越 iframe 而统一在底下的遮罩层
     */
    S.extend(DDM, Base, {

        _regDrop:function(d) {
            this.get("drops").push(d);
        },

        _unregDrop:function(d) {
            var index = S.indexOf(d, this.get("drops"));
            if (index != -1) {
                this.get("drops").splice(index, 1);
            }
        },

        _init: function() {
            var self = this;
            self._showShimMove = throttle(self._move, self, 30);
        },

        /*
         全局鼠标移动事件通知当前拖动对象正在移动
         注意：chrome8: click 时 mousedown-mousemove-mouseup-click 也会触发 mousemove
         */
        _move: function(ev) {
            var activeDrag = this.get('activeDrag');
            //S.log("move");
            if (!activeDrag) return;
            //防止 ie 选择到字
            ev.preventDefault();
            activeDrag._move(ev);
            /**
             * 获得当前的激活drop
             */
            this._notifyDropsMove(ev);
        },

        _notifyDropsMove:function(ev) {
            var activeDrag = this.get("activeDrag"),mode = activeDrag.get("mode");
            var drops = this.get("drops");
            var activeDrop,
                vArea = 0,
                dragRegion = region(activeDrag.get("node")),
                dragArea = area(dragRegion);

            S.each(drops, function(drop) {
                var a;
                if (mode == "point") {
                    //取鼠标所在的 drop 区域
                    if (inNodeByPointer(drop.get("node"), activeDrag.mousePos)) {
                        activeDrop = drop;
                        return false;
                    }

                } else if (mode == "intersect") {
                    //取一个和activeDrag交集最大的drop区域
                    a = area(intersect(dragRegion, region(drop.get("node"))));
                    if (a > vArea) {
                        vArea = a;
                        activeDrop = drop;
                    }

                } else if (mode == "strict") {
                    //drag 全部在 drop 里面
                    a = area(intersect(dragRegion, region(drop.get("node"))));
                    if (a == dragArea) {
                        activeDrop = drop;
                        return false;
                    }
                }
            });
            var oldDrop = this.get("activeDrop");
            if (oldDrop && oldDrop != activeDrop) {
                oldDrop._handleOut(ev);
            }
            if (activeDrop) {

                activeDrop._handleOver(ev);
            } else {
                this.set("activeDrop", null);
            }
        },

        _deactivateDrops:function() {
            var activeDrag = this.get("activeDrag"),
                activeDrop = this.get("activeDrop");
            activeDrag.get("node").removeClass(this.get("prefixCls") + "drag-over");
            if (activeDrop) {
                activeDrop.get("node").removeClass(this.get("prefixCls") + "drop-over");
                activeDrop.fire('drophit', { drag: activeDrag, drop: activeDrop});
                activeDrag.fire('dragdrophit', { drag: activeDrag,  drop: activeDrop})
            } else {
                activeDrag.fire('dragdropmiss',{
                    drag:activeDrag
                });
            }
        },

        /**
         * 当前拖动对象通知全局：我要开始啦
         * 全局设置当前拖动对象，
         * 还要根据配置进行 buffer 处理
         * @param drag
         */
        _start: function(drag) {
            var self = this,
                bufferTime = self.get("bufferTime") || 0;

            //事件先要注册好，防止点击，导致 mouseup 时还没注册事件
            self._registerEvent();

            //是否中央管理，强制限制拖放延迟
            if (bufferTime) {
                self._bufferTimer = setTimeout(function() {
                    self._bufferStart(drag);
                }, bufferTime);
            } else {
                self._bufferStart(drag);
            }
        },

        _bufferStart: function(drag) {
            var self = this;
            self.set('activeDrag', drag);

            //真正开始移动了才激活垫片
            if (drag.get("shim"))
                self._activeShim();
            drag._start();
        },

        /**
         * 全局通知当前拖动对象：你结束拖动了！
         * @param ev
         */
        _end: function(ev) {
            var self = this,
                activeDrag = self.get("activeDrag");
            self._unregisterEvent();
            if (self._bufferTimer) {
                clearTimeout(self._bufferTimer);
                self._bufferTimer = null;
            }
            self._shim && self._shim.css({
                display:"none"
            });

            if (!activeDrag) return;
            activeDrag._end(ev);
            //处理 drop，看看到底是否有 drop 命中
            this._deactivateDrops(ev);
            self.set("activeDrag", null);
            self.set("activeDrop", null);
        },

        /**
         * 垫片只需创建一次
         */
        _activeShim: function() {
            var self = this,doc = document;
            //创造垫片，防止进入iframe，外面document监听不到 mousedown/up/move
            self._shim = new Node("<div " +
                "style='" +
                //red for debug
                "background-color:red;" +
                "position:absolute;" +
                "left:0;" +
                "width:100%;" +
                "top:0;" +
                "cursor:move;" +
                "z-index:" +
                //覆盖iframe上面即可
                SHIM_ZINDEX
                + ";" +
                "'></div>").appendTo(doc.body);
            //0.5 for debug
            self._shim.css("opacity", 0);
            self._activeShim = self._showShim;
            self._showShim();
        },

        _showShim: function() {
            var self = this;
            self._shim.css({
                display: "",
                height: DOM['docHeight']()
            });
        },

        /**
         * 开始时注册全局监听事件
         */
        _registerEvent: function() {
            var self = this;
            Event.on(doc, 'mouseup', self._end, self);
            Event.on(doc, 'mousemove', self._showShimMove, self);
        },

        /**
         * 结束时需要取消掉，防止平时无谓的监听
         */
        _unregisterEvent: function() {
            var self = this;
            Event.remove(doc, 'mousemove', self._showShimMove, self);
            Event.remove(doc, 'mouseup', self._end, self);
        }
    });


    /**
     * Throttles a call to a method based on the time between calls. from YUI
     * @method throttle
     * @for KISSY
     * @param fn {function} The function call to throttle.
     * @param ms {int} The number of milliseconds to throttle the method call. Defaults to 150
     * @return {function} Returns a wrapped function that calls fn throttled.
     * ! Based on work by Simon Willison: http://gist.github.com/292562
     */
    function throttle(fn, scope, ms) {
        ms = ms || 150;

        if (ms === -1) {
            return (function() {
                fn.apply(scope, arguments);
            });
        }

        var last = S.now();
        return (function() {
            var now = S.now();
            if (now - last > ms) {
                last = now;
                fn.apply(scope, arguments);
            }
        });
    }

    function region(node) {
        var offset = node.offset();
        return {
            left:offset.left,
            right:offset.left + node[0].offsetWidth,
            top:offset.top,
            bottom:offset.top + node[0].offsetHeight
        };
    }

    function inRegion(region, pointer) {

        return region.left <= pointer.left
            && region.right >= pointer.left
            && region.top <= pointer.top
            && region.bottom >= pointer.top;
    }

    function area(region) {
        if (region.top >= region.bottom || region.left >= region.right) return 0;
        return (region.right - region.left) * (region.bottom - region.top);
    }

    function intersect(r1, r2) {
        var t = Math.max(r1.top, r2.top),
            r = Math.min(r1.right, r2.right),
            b = Math.min(r1.bottom, r2.bottom),
            l = Math.max(r1.left, r2.left);
        return {
            left:l,
            right:r,
            top:t,
            bottom:b
        };
    }

    function inNodeByPointer(node, point) {
        return inRegion(region(node), point);
    }

    return new DDM();
}, {
    requires:["dom","event","node","base"]
});
/**
 * dd support for kissy, drag for dd
 * @author: 承玉<yiminghe@gmail.com>
 */
KISSY.add('dd/draggable', function(S, UA, N, Base, DDM) {

    var Node = S.require("node/node");

    /*
     拖放纯功能类
     */
    function Draggable() {
        Draggable.superclass.constructor.apply(this, arguments);
        this._init();
    }

    Draggable.POINT = "pointer";
    Draggable.INTERSECT = "intersect";
    Draggable.STRICT = "strict";

    Draggable.ATTRS = {
        /**
         * 拖放节点
         */
        node: {
            setter:function(v) {
                return Node.one(v);
            }
        },

        /**
         * 是否需要遮罩跨越iframe
         */
        shim:{
            value:true
        },

        /**
         * handler 数组，注意暂时必须在 node 里面
         */
        handlers:{
            value:[],
            setter:function(vs) {
                if (vs) {
                    for (var i = 0; i < vs.length; i++) {
                        vs[i] = Node.one(vs[i]);
                        vs[i].unselectable();
                    }
                }
            }
        },

        mode:{
            /**
             * @enum point,intersect,strict
             * @description
             *  In point mode, a Drop is targeted by the cursor being over the Target
             *  In intersect mode, a Drop is targeted by "part" of the drag node being over the Target
             *  In strict mode, a Drop is targeted by the "entire" drag node being over the Target             *
             */
            value:'point'
        }

    };

    S.extend(Draggable, Base, {

        _init: function() {
            var self = this,
                node = self.get('node'),
                handlers = self.get('handlers');

            if (handlers.length == 0) {
                handlers[0] = node;
            }

            for (var i = 0; i < handlers.length; i++) {
                var hl = handlers[i],
                    ori = hl.css('cursor');
                if (hl[0] != node[0]) {
                    if (!ori || ori === 'auto')
                        hl.css('cursor', 'move');
                }
            }
            node.on('mousedown', self._handleMouseDown, self);
        },

        destroy:function() {
            var self = this,
                node = self.get('node'),
                handlers = self.get('handlers');
            for (var i = 0; i < handlers.length; i++) {
                var hl = handlers[i];
                if (hl.css("cursor") == "move") {
                    hl.css("cursor", "auto");
                }
            }
            node.detach('mousedown', self._handleMouseDown, self);
            self.detach();
        },

        _check: function(t) {
            var handlers = this.get('handlers');

            for (var i = 0; i < handlers.length; i++) {
                var hl = handlers[i];
                if (hl.contains(t)
                    ||
                    //子区域内点击也可以启动
                    hl[0] == t[0]) return true;
            }
            return false;
        },

        /**
         * 鼠标按下时，查看触发源是否是属于 handler 集合，
         * 保存当前状态
         * 通知全局管理器开始作用
         * @param ev
         */
        _handleMouseDown: function(ev) {
            var self = this,
                t = new Node(ev.target);

            if (!self._check(t)) return;
            //chrome 阻止了 flash 点击？？
            //不组织的话chrome会选择
            //if (!UA.webkit) {
            //firefox 默认会拖动对象地址
            ev.preventDefault();
            //}

            DDM._start(self);

            var node = self.get("node"),
                mx = ev.pageX,
                my = ev.pageY,
                nxy = node.offset();
            self.startMousePos = self.mousePos = {
                left:mx,
                top:my
            };
            self.startNodePos = nxy;
            self._diff = {
                left:mx - nxy.left,
                top:my - nxy.top
            };
            self.set("diff", self._diff);

        },

        _move: function(ev) {
            var self = this,
                diff = self.get("diff"),
                left = ev.pageX - diff.left,
                top = ev.pageY - diff.top;
            self.mousePos = {
                left:ev.pageX,
                top:ev.pageY
            };
            self.fire("drag", {
                left:left,
                top:top
            });
        },

        _end: function() {
            this.fire("dragend");
        },

        _start: function() {
            this.fire("dragstart");
        }
    });

    return Draggable;

}, { requires:["ua","node","base","dd/ddm"] });
/**
 * droppable for kissy
 * @author:yiminghe@gmail.com
 */
KISSY.add("dd/droppable", function(S, Node, Base, DDM) {

    function Droppable() {
        Droppable.superclass.constructor.apply(this, arguments);
        this._init();
    }

    Droppable.ATTRS = {
        /**
         * 放节点
         */
        node: {
            setter:function(v) {
                var n = Node.one(v);
                n.addClass(DDM.get("prefixCls") + "drop");
                return n;
            }
        }

    };

    S.extend(Droppable, Base, {
        _init:function() {
            DDM._regDrop(this);
        },
        _handleOut:function(ev) {
            var activeDrag = DDM.get("activeDrag");

            this.get("node").removeClass(DDM.get("prefixCls") + "drop-over");
            this.fire("dropexit", {
                drop:this,
                drag:activeDrag
            });

            activeDrag.get("node").removeClass(DDM.get("prefixCls") + "drag-over");
            activeDrag.fire("dragexit", {
                drop:this,
                drag:activeDrag
            });
        },
        _handleOver:function(ev) {
            var oldDrop = DDM.get("activeDrop");
            DDM.set("activeDrop", this);
            var activeDrag = DDM.get("activeDrag");
            this.get("node").addClass(DDM.get("prefixCls") + "drop-over");
            var evt = {
                drag:activeDrag,
                drop:this
            };
            if (this != oldDrop) {
                activeDrag.get("node").addClass(DDM.get("prefixCls") + "drag-over");
                //第一次先触发 dropenter,dragenter
                activeDrag.fire("dragenter", evt);
                this.fire("dropenter", evt)
            } else {
                activeDrag.fire("dragover", evt);
                this.fire("dropover", evt)
            }
        },
        destroy:function() {
            DDM._unregDrop(this);
        }
    });

    return Droppable;

}, { requires:["node","base","dd/ddm"] });/**
 * generate proxy drag object,
 * @author:yiminghe@gmail.com
 */
KISSY.add("dd/proxy", function(S) {
    function Proxy() {
        Proxy.superclass.constructor.apply(this, arguments);
    }

    Proxy.ATTRS = {
        node:{
            /*
             如何生成替代节点
             @return {KISSY.Node} 替代节点
             */
            value:function(drag) {
                var n = S.one(drag.get("node")[0].cloneNode(true));
                n.attr("id", S.guid("ks-dd-proxy"));
                return n;
            }
        }
    };

    S.extend(Proxy, S.Base, {
        attach:function(drag) {
            var self = this;
            drag.on("dragstart", function() {
                var node = self.get("node");
                var dragNode = drag.get("node");
                if (S.isFunction(node)) {
                    node = node(drag);
                    node.css("position", "absolute");
                    self.set("node", node);
                    dragNode.parent().append(node);
                }
                node.show();
                node.offset(dragNode.offset());
                drag.set("dragNode", dragNode);
                drag.set("node", node);
            });
            drag.on("dragend", function() {
                var node = self.get("node");
                drag.get("dragNode").offset(node.offset());
                node.hide();
                drag.set("node", drag.get("dragNode"));
            });
        },

        destroy:function() {
            var node = this.get("node");
            if (node && !S.isFunction(node)) {
                node.remove();
            }
        }
    });

    return Proxy;
});KISSY.add("dd", function(S, DDM, Draggable, Droppable,Proxy) {
    var dd = {
        Draggable:Draggable,
        Droppable:Droppable,
        DDM:DDM,
        Proxy:Proxy
    };

    S.mix(S, dd);

    return dd;
}, {
    requires:["dd/ddm","dd/draggable","dd/droppable","dd/proxy"]
});
