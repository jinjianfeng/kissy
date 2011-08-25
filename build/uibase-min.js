/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 25 16:20
*/
KISSY.add("uibase/align",function(h,l,f,j){function p(b){var d=b.ownerDocument.body,g=f.css(b,"position"),k=g=="fixed"||g=="absolute";for(b=b.parentNode;b&&b!=d;b=b.parentNode){g=f.css(b,"position");k=k&&g=="static";if(f.css(b,"overflow")!="visible"&&(!k||g=="fixed"||g=="absolute"||g=="relative"))return b}return null}function a(b){for(var d in b)if(d.indexOf("fail")===0)return true;return false}function e(b){var d=b.offset,g=b.node,k=b.points,q,c=this.get("el");d=d||[0,0];q=c.offset();g=m(g,k[0]);
k=m(c,k[1]);k=[k.left-g.left,k.top-g.top];q={left:q.left-k[0]+ +d[0],top:q.top-k[1]+ +d[1]};a:{d=q;q=this.get("el");c={};k={width:q[0].offsetWidth,height:q[0].offsetHeight};g=h.clone(k);if(!h.isEmptyObject(b.overflow)){c={left:0,right:Infinity,top:0,bottom:Infinity};for(var o=q[0];o=p(o);){var r=o.clientWidth;if(!l.ie||r!==0){var s=o.clientLeft,t=o.clientTop;r=f.offset(o);s={left:s,top:t};r.left+=s.left;r.top+=s.top;c.top=Math.max(c.top,r.top);c.right=Math.min(c.right,r.left+o.clientWidth);c.bottom=
Math.min(c.bottom,r.top+o.clientHeight);c.left=Math.max(c.left,r.left)}}o=f.scrollLeft();r=f.scrollTop();c.left=Math.max(c.left,o);c.top=Math.max(c.top,r);c.right=Math.min(c.right,o+f.viewportWidth());c.bottom=Math.min(c.bottom,r+f.viewportHeight());c=c.top>=0&&c.left>=0&&c.bottom>c.top&&c.right>c.left?c:null;b=b.overflow||{};o={};if(d.left<c.left&&b.adjustX){d.left=c.left;o.adjustX=1}if(d.left<c.left&&d.left+g.width>c.right&&b.resizeWidth){g.width-=d.left+g.width-c.right;o.resizeWidth=1}if(d.left+
g.width>c.right&&b.adjustX){d.left=Math.max(c.right-g.width,c.left);o.adjustX=1}if(b.failX)o.failX=d.left<c.left||d.left+g.width>c.right;if(d.top<c.top&&b.adjustY){d.top=c.top;o.adjustY=1}if(d.top>=c.top&&d.top+g.height>c.bottom&&b.resizeHeight){g.height-=d.top+g.height-c.bottom;o.resizeHeight=1}if(d.top+g.height>c.bottom&&b.adjustY){d.top=Math.max(c.bottom-g.height,c.top);o.adjustY=1}if(b.failY)o.failY=d.top<c.top||d.top+g.height>c.bottom;c=o;if(a(c)){b=c;break a}}this.set("x",d.left);this.set("y",
d.top);if(g.width!=k.width||g.height!=k.height){q.width(g.width);q.height(g.height)}b=c}return b}function n(b,d,g){var k=[];h.each(b,function(q){k.push(q.replace(d,function(c){return g[c]}))});return k}function i(){}function m(b,d){var g=d.charAt(0),k=d.charAt(1),q,c,o,r;if(b){b=j.one(b);q=b.offset();c=b[0].offsetWidth;o=b[0].offsetHeight}else{q={left:f.scrollLeft(),top:f.scrollTop()};c=f.viewportWidth();o=f.viewportHeight()}r=q.left;q=q.top;if(g==="c")q+=o/2;else if(g==="b")q+=o;if(k==="c")r+=c/
2;else if(k==="r")r+=c;return{left:r,top:q}}i.ATTRS={align:{}};i.prototype={_uiSetAlign:function(b){h.isPlainObject(b)&&this.align(b.node,b.points,b.offset,b.overflow)},align:function(b,d,g,k){var q={};k=h.clone(k||{});g=g&&[].concat(g)||[0,0];if(k.failX)q.failX=1;if(k.failY)q.failY=1;var c=e.call(this,{node:b,points:d,offset:g,overflow:q});if(a(c)){if(c.failX){d=n(d,/[lr]/ig,{l:"r",r:"l"});g=g;g[0]=-g[0];g=g}if(c.failY){d=n(d,/[tb]/ig,{t:"b",b:"t"});c=g;c[1]=-c[1];g=c}}c=e.call(this,{node:b,points:d,
offset:g,overflow:q});if(a(c)){delete k.failX;delete k.failY;e.call(this,{node:b,points:d,offset:g,overflow:k})}},center:function(b){this.set("align",{node:b,points:["cc","cc"],offset:[0,0]})}};return i},{requires:["ua","dom","node"]});
KISSY.add("uibase/base",function(h,l,f){function j(i){i+="";return i.charAt(0).toUpperCase()+i.substring(1)}function p(i){l.apply(this,arguments);for(var m=this.constructor;m;){if(i&&i[e]&&m.HTML_PARSER)if(i[e]=f.one(i[e])){var b=i[e],d=m.HTML_PARSER,g=void 0,k=void 0;for(g in d)if(d.hasOwnProperty(g)){k=d[g];if(h.isFunction(k))this.__set(g,k.call(this,b));else if(h.isString(k))this.__set(g,b.one(k));else h.isArray(k)&&k[0]&&this.__set(g,b.all(k[0]))}}m=m.superclass&&m.superclass.constructor}a(this,
"initializer","constructor");i&&i.autoRender&&this.render()}function a(i,m,b){for(var d=i.constructor,g=[],k,q,c,o;d;){o=[];if(c=d.__ks_exts)for(var r=0;r<c.length;r++)if(k=c[r]){if(b!="constructor")k=k.prototype.hasOwnProperty(b)?k.prototype[b]:null;k&&o.push(k)}if(d.prototype.hasOwnProperty(m)&&(q=d.prototype[m]))o.push(q);o.length&&g.push.apply(g,o.reverse());d=d.superclass&&d.superclass.constructor}for(r=g.length-1;r>=0;r--)g[r]&&g[r].call(i)}var e="srcNode",n=function(){};p.HTML_PARSER={};p.ATTRS=
{rendered:{value:false},created:{value:false}};h.extend(p,l,{create:function(){if(!this.get("created")){this._createDom();this.fire("createDom");a(this,"createDom","__createDom");this.fire("afterCreateDom");this.set("created",true)}},render:function(){if(!this.get("rendered")){this.create();this._renderUI();this.fire("renderUI");a(this,"renderUI","__renderUI");this.fire("afterRenderUI");this._bindUI();this.fire("bindUI");a(this,"bindUI","__bindUI");this.fire("afterBindUI");this._syncUI();this.fire("syncUI");
a(this,"syncUI","__syncUI");this.fire("afterSyncUI");this.set("rendered",true)}},_createDom:n,_renderUI:n,renderUI:n,_bindUI:function(){var i=this,m=i.__attrs,b,d;for(b in m)if(m.hasOwnProperty(b)){d="_uiSet"+j(b);i[d]&&function(g,k){i.on("after"+j(g)+"Change",function(q){i[k](q.newVal,q)})}(b,d)}},bindUI:n,_syncUI:function(){var i=this.__attrs,m;for(m in i)if(i.hasOwnProperty(m)){var b="_uiSet"+j(m);this[b]&&i[m].sync!==false&&this.get(m)!==undefined&&this[b](this.get(m))}},syncUI:n,destroy:function(){for(var i=
this.constructor,m,b,d;i;){i.prototype.hasOwnProperty("destructor")&&i.prototype.destructor.apply(this);if(m=i.__ks_exts)for(d=m.length-1;d>=0;d--)(b=m[d]&&m[d].prototype.__destructor)&&b.apply(this);i=i.superclass&&i.superclass.constructor}this.fire("destroy");this.detach()}});p.create=function(i,m,b,d){function g(){p.apply(this,arguments)}if(h.isArray(i)){d=b;b=m;m=i;i=p}i=i||p;if(h.isObject(m)){d=b;b=m;m=[]}h.extend(g,i,b,d);if(m){g.__ks_exts=m;var k={};i=m.concat(g);h.each(i,function(c){c&&h.each(["ATTRS",
"HTML_PARSER"],function(o){if(c[o]){k[o]=k[o]||{};h.mix(k[o],c[o],true,undefined,true)}})});h.each(k,function(c,o){g[o]=c});var q={};h.each(i,function(c){if(c){c=c.prototype;for(var o in c)if(c.hasOwnProperty(o))q[o]=c[o]}});h.each(q,function(c,o){g.prototype[o]=c})}return g};return p},{requires:["base","node"]});
KISSY.add("uibase/box",function(){function h(){}h.ATTRS={html:{view:true,sync:false},width:{view:true},height:{view:true},elCls:{view:true},elStyle:{view:true},elAttrs:{view:true},elBefore:{view:true},el:{view:true},render:{view:true},visibleMode:{value:"display",view:true},visible:{view:true},srcNode:{view:true}};h.HTML_PARSER={el:function(l){this.decorateInternal&&this.decorateInternal(l);return l}};h.prototype={_uiSetVisible:function(l){this.fire(l?"show":"hide")},show:function(){this.render();
this.set("visible",true)},hide:function(){this.set("visible",false)}};return h});
KISSY.add("uibase/boxrender",function(h,l){function f(){}function j(a,e,n,i,m,b){e=e||{};if(n)e.width=n;if(i)e.height=i;n="";for(var d in e)if(e.hasOwnProperty(d))n+=d+":"+e[d]+";";e="";for(var g in b)if(b.hasOwnProperty(g))e+=" "+g+"='"+b[g]+"' ";return"<"+m+(n?" style='"+n+"' ":"")+e+(a?" class='"+a+"' ":"")+"></"+m+">"}var p=h.all;f.ATTRS={el:{setter:function(a){return p(a)}},elCls:{},elStyle:{},width:{},height:{},elTagName:{value:"div"},elAttrs:{},elBefore:{},render:{},html:{sync:false},visible:{},
visibleMode:{}};f.construct=j;f.HTML_PARSER={html:function(a){return a.html()}};f.prototype={__renderUI:function(){if(this.__boxRenderNew){var a=this.get("render"),e=this.get("el"),n=this.get("elBefore");if(n)e.insertBefore(n);else a?e.appendTo(a):e.appendTo("body")}},__createDom:function(){var a=this.get("el");if(!a){this.__boxRenderNew=true;a=new l(j(this.get("elCls"),this.get("elStyle"),this.get("width"),this.get("height"),this.get("elTagName"),this.get("elAttrs")));this.set("el",a);this.get("html")&&
a.html(this.get("html"))}},_uiSetElAttrs:function(a){this.get("el").attr(a)},_uiSetElCls:function(a){this.get("el").addClass(a)},_uiSetElStyle:function(a){this.get("el").css(a)},_uiSetWidth:function(a){this.get("el").width(a)},_uiSetHeight:function(a){this.get("el").height(a)},_uiSetHtml:function(a){this.get("el").html(a)},_uiSetVisible:function(a){var e=this.get("el");this.get("visibleMode")=="visibility"?e.css("visibility",a?"visible":"hidden"):e.css("display",a?"":"none")},show:function(){this.render();
this.set("visible",true)},hide:function(){this.set("visible",false)},__destructor:function(){var a=this.get("el");if(a){a.detach();a.remove()}}};return f},{requires:["node"]});KISSY.add("uibase/close",function(){function h(){}h.ATTRS={closable:{view:true},closeAction:{value:"hide"}};var l={hide:"hide",destroy:"destroy"};h.prototype={__bindUI:function(){var f=this,j=f.get("view").get("closeBtn");j&&j.on("click",function(p){f[l[f.get("closeAction")]||"hide"]();p.halt()})}};return h});
KISSY.add("uibase/closerender",function(h,l){function f(){}f.ATTRS={closable:{value:true},closeBtn:{}};f.HTML_PARSER={closeBtn:function(j){return j.one("."+this.get("prefixCls")+"ext-close")}};f.prototype={_uiSetClosable:function(j){var p=this.get("closeBtn");if(p)j?p.css("display",""):p.css("display","none")},__renderUI:function(){var j=this.get("closeBtn"),p=this.get("el");if(!j&&p){j=(new l("<a tabindex='0' role='button' class='"+this.get("prefixCls")+"ext-close'><span class='"+this.get("prefixCls")+
"ext-close-x'>\u5173\u95ed</span></a>")).appendTo(p);this.set("closeBtn",j)}},__destructor:function(){var j=this.get("closeBtn");j&&j.detach()}};return f},{requires:["node"]});
KISSY.add("uibase/constrain",function(h,l,f){function j(){}function p(a){var e;if(!a)return e;var n=this.get("el");if(a!==true){a=f.one(a);e=a.offset();h.mix(e,{maxLeft:e.left+a[0].offsetWidth-n[0].offsetWidth,maxTop:e.top+a[0].offsetHeight-n[0].offsetHeight})}else{a=document.documentElement.clientWidth;e={left:l.scrollLeft(),top:l.scrollTop()};h.mix(e,{maxLeft:e.left+a-n[0].offsetWidth,maxTop:e.top+l.viewportHeight()-n[0].offsetHeight})}return e}j.ATTRS={constrain:{value:false}};j.prototype={__renderUI:function(){var a=
this,e=a.__getDefAttrs(),n=e.x;e=e.y;var i=n.setter,m=e.setter;n.setter=function(b){var d=i&&i.call(a,b);if(d===undefined)d=b;if(!a.get("constrain"))return d;b=p.call(a,a.get("constrain"));return Math.min(Math.max(d,b.left),b.maxLeft)};e.setter=function(b){var d=m&&m.call(a,b);if(d===undefined)d=b;if(!a.get("constrain"))return d;b=p.call(a,a.get("constrain"));return Math.min(Math.max(d,b.top),b.maxTop)};a.addAttr("x",n);a.addAttr("y",e)}};return j},{requires:["dom","node"]});
KISSY.add("uibase/contentbox",function(){function h(){}h.ATTRS={content:{view:true,sync:false},contentEl:{view:true},contentElAttrs:{view:true},contentElStyle:{view:true},contentTagName:{view:true}};h.prototype={};return h});
KISSY.add("uibase/contentboxrender",function(h,l,f){function j(){}function p(e,n){var i=e.get("contentEl");i.html("");n&&i.append(n)}j.ATTRS={contentEl:{},contentElAttrs:{},contentElCls:{value:""},contentElStyle:{},contentTagName:{value:"div"},content:{sync:false}};j.HTML_PARSER={content:function(e){return e.html()}};var a=f.construct;j.prototype={__renderUI:function(){},__createDom:function(){var e,n;e=this.get("el");n=h.makeArray(e[0].childNodes);e=(new l(a(this.get("prefixCls")+"contentbox "+this.get("contentElCls"),
this.get("contentElStyle"),undefined,undefined,this.get("contentTagName"),this.get("contentElAttrs")))).appendTo(e);this.set("contentEl",e);if(n.length)for(var i=0;i<n.length;i++)e.append(n[i]);else if(n=this.get("content"))p(this,n)},_uiSetContentElCls:function(e){this.get("contentEl").addClass(e)},_uiSetContentElAttrs:function(e){this.get("contentEl").attr(e)},_uiSetContentElStyle:function(e){this.get("contentEl").css(e)},_uiSetContent:function(e){p(this,e)}};return j},{requires:["node","./boxrender"]});
KISSY.add("uibase/drag",function(h){function l(){}l.ATTRS={handlers:{value:[]},draggable:{value:true}};l.prototype={_uiSetHandlers:function(f){f&&f.length>0&&this.__drag&&this.__drag.set("handlers",f)},__bindUI:function(){var f=h.require("dd/draggable"),j=this.get("el");if(this.get("draggable")&&f)this.__drag=new f({node:j,handlers:this.get("handlers")})},_uiSetDraggable:function(f){var j=this.__drag;if(j)if(f){j.detach("drag");j.on("drag",this._dragExtAction,this)}else j.detach("drag")},_dragExtAction:function(f){this.set("xy",
[f.left,f.top])},__destructor:function(){var f=this.__drag;f&&f.destroy()}};return l});KISSY.add("uibase/loading",function(){function h(){}h.prototype={loading:function(){this.get("view").loading()},unloading:function(){this.get("view").unloading()}};return h});
KISSY.add("uibase/loadingrender",function(h,l){function f(){}f.prototype={loading:function(){if(!this._loadingExtEl)this._loadingExtEl=(new l("<div class='"+this.get("prefixCls")+"ext-loading' style='position: absolute;border: none;width: 100%;top: 0;left: 0;z-index: 99999;height:100%;*height: expression(this.parentNode.offsetHeight);'/>")).appendTo(this.get("el"));this._loadingExtEl.show()},unloading:function(){var j=this._loadingExtEl;j&&j.hide()}};return f},{requires:["node"]});
KISSY.add("uibase/mask",function(){function h(){}h.ATTRS={mask:{value:false}};h.prototype={_uiSetMask:function(l){if(l){this.on("show",this.get("view")._maskExtShow,this.get("view"));this.on("hide",this.get("view")._maskExtHide,this.get("view"))}else{this.detach("show",this.get("view")._maskExtShow,this.get("view"));this.detach("hide",this.get("view")._maskExtHide,this.get("view"))}}};return h},{requires:["ua"]});
KISSY.add("uibase/maskrender",function(h,l,f,j){function p(){e=(new j("<div class='"+this.get("prefixCls")+"ext-mask'/>")).prependTo("body");e.css({position:"absolute",left:0,top:0,width:l.ie==6?f.docWidth():"100%",height:f.docHeight()});if(l.ie==6)n=(new j("<iframe style='position:absolute;left:0;top:0;background:red;width:"+f.docWidth()+"px;height:"+f.docHeight()+"px;filter:alpha(opacity=0);z-index:-1;'/>")).insertBefore(e);h.Event.on(window,"resize",function(){var m={width:l.ie==6?f.docWidth():
"100%",height:f.docHeight()};n&&n.css(m);e.css(m)});e.unselectable();e.on("mousedown click",function(m){m.halt()})}function a(){}var e,n,i=0;a.prototype={_maskExtShow:function(){e||p.call(this);var m=this.get("zIndex")-1;e.css("z-index",m);n&&n.css("z-index",m);i++;e.css("display","");n&&n.css("display","")},_maskExtHide:function(){i--;if(i<=0)i=0;if(!i){e&&e.css("display","none");n&&n.css("display","none")}},__destructor:function(){this._maskExtHide()}};return a},{requires:["ua","dom","node"]});
KISSY.add("uibase/position",function(h){function l(){}l.ATTRS={x:{view:true},y:{view:true},xy:{setter:function(f){var j=h.makeArray(f);if(j.length){j[0]&&this.set("x",j[0]);j[1]&&this.set("y",j[1])}return f},getter:function(){return[this.get("x"),this.get("y")]}},zIndex:{view:true}};l.prototype={move:function(f,j){if(h.isArray(f)){j=f[1];f=f[0]}this.set("xy",[f,j])}};return l});
KISSY.add("uibase/positionrender",function(){function h(){}h.ATTRS={x:{valueFn:function(){return this.get("el")&&this.get("el").offset().left}},y:{valueFn:function(){return this.get("el")&&this.get("el").offset().top}},zIndex:{value:9999}};h.prototype={__renderUI:function(){this.get("el").addClass(this.get("prefixCls")+"ext-position")},_uiSetZIndex:function(l){this.get("el").css("z-index",l)},_uiSetX:function(l){this.get("el").offset({left:l})},_uiSetY:function(l){this.get("el").offset({top:l})}};
return h});KISSY.add("uibase/resize",function(h){function l(){}l.ATTRS={resize:{value:{}}};l.prototype={__destructor:function(){self.resizer&&self.resizer.destroy()},_uiSetResize:function(f){var j=h.require("resizable");if(j){this.resizer&&this.resizer.destroy();f.node=this.get("el");f.autoRender=true;if(f.handlers)this.resizer=new j(f)}}};return l});
KISSY.add("uibase/shimrender",function(h,l){function f(){}f.ATTRS={shim:{value:true}};f.prototype={_uiSetShim:function(j){var p=this.get("el");if(j&&!this.__shimEl){this.__shimEl=new l("<iframe style='position: absolute;border: none;width: expression(this.parentNode.offsetWidth);top: 0;opacity: 0;filter: alpha(opacity=0);left: 0;z-index: -1;height: expression(this.parentNode.offsetHeight);'/>");p.prepend(this.__shimEl)}else if(!j&&this.__shimEl){this.__shimEl.remove();delete this.__shimEl}}};return f},
{requires:["node"]});KISSY.add("uibase/stdmod",function(){function h(){}h.ATTRS={header:{view:true},body:{view:true},footer:{view:true},bodyStyle:{view:true},footerStyle:{view:true},headerStyle:{view:true},headerContent:{view:true},bodyContent:{view:true},footerContent:{view:true}};h.prototype={};return h});
KISSY.add("uibase/stdmodrender",function(h,l){function f(){}function j(a,e){var n=a.get("contentEl"),i=a.get(e);if(!i){i=(new l("<div class='"+a.get("prefixCls")+p+e+"'/>")).appendTo(n);a.set(e,i)}}var p="stdmod-";f.ATTRS={header:{},body:{},footer:{},bodyStyle:{},footerStyle:{},headerStyle:{},headerContent:{},bodyContent:{},footerContent:{}};f.HTML_PARSER={header:function(a){return a.one("."+this.get("prefixCls")+p+"header")},body:function(a){return a.one("."+this.get("prefixCls")+p+"body")},footer:function(a){return a.one("."+
this.get("prefixCls")+p+"footer")}};f.prototype={_setStdModContent:function(a,e){if(h.isString(e))this.get(a).html(e);else{this.get(a).html("");this.get(a).append(e)}},_uiSetBodyStyle:function(a){this.get("body").css(a)},_uiSetHeaderStyle:function(a){this.get("header").css(a)},_uiSetFooterStyle:function(a){this.get("footer").css(a)},_uiSetBodyContent:function(a){this._setStdModContent("body",a)},_uiSetHeaderContent:function(a){this._setStdModContent("header",a)},_uiSetFooterContent:function(a){this._setStdModContent("footer",
a)},__renderUI:function(){j(this,"header");j(this,"body");j(this,"footer")}};return f},{requires:["node"]});
KISSY.add("uibase",function(h,l,f,j,p,a,e,n,i,m,b,d,g,k,q,c,o,r,s,t,u){a.Render=e;d.Render=g;k.Render=q;c.Render=o;t.Render=u;j.Render=p;i.Render=m;h.mix(l,{Align:f,Box:j,Close:a,Contrain:n,Contentbox:i,Drag:b,Loading:d,Mask:k,Position:c,Shim:{Render:r},Resize:s,StdMod:t});return h.UIBase=l},{requires:["uibase/base","uibase/align","uibase/box","uibase/boxrender","uibase/close","uibase/closerender","uibase/constrain","uibase/contentbox","uibase/contentboxrender","uibase/drag","uibase/loading","uibase/loadingrender",
"uibase/mask","uibase/maskrender","uibase/position","uibase/positionrender","uibase/shimrender","uibase/resize","uibase/stdmod","uibase/stdmodrender"]});
