/*
Copyright 2010, KISSY UI Library v1.1.7dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("event",function(d,i){function j(a,c,e,g,k){if(d.isString(c))c=d.query(c);if(d.isArray(c)){d.each(c,function(m){q[a](m,e,g,k)});return true}if((e=d.trim(e))&&e.indexOf(o)>0){d.each(e.split(o),function(m){q[a](c,m,g,k)});return true}}function f(a){return a&&a.nodeType!==3&&a.nodeType!==8?h.data(a,s):-1}function l(a,c){a&&a.nodeType!==3&&a.nodeType!==8&&h.data(a,s,c)}var b=document,h=d.DOM,p=b.addEventListener?function(a,c,e,g){a.addEventListener&&a.addEventListener(c,e,!!g)}:function(a,c,
e){a.attachEvent&&a.attachEvent("on"+c,e)},n=b.removeEventListener?function(a,c,e,g){a.removeEventListener&&a.removeEventListener(c,e,!!g)}:function(a,c,e){a.detachEvent&&a.detachEvent("on"+c,e)},s="ksEventTargetId",o=" ",w=d.now(),A={},q={EVENT_GUID:s,special:{},add:function(a,c,e,g){if(!j("add",a,c,e,g)){var k=f(a),m,t,u,x,v;if(!(k===-1||!c||!d.isFunction(e))){if(!k){l(a,k=w++);A[k]={target:a,events:{}}}t=A[k].events;if(!t[c]){m=((k=!a.isCustomEventTarget)||a._supportSpecialEvent)&&q.special[c]||
{};u=function(r,y){if(!r||!r.fixed)r=new d.EventObject(a,r,c);if(d.isPlainObject(y)){var z=r.type;d.mix(r,y);r.type=z}m.setup&&m.setup(r);return(m.handle||q._handle)(a,r)};t[c]={handle:u,listeners:[]};x=m.fix||c;v=m.capture;m.init&&m.init.apply(null,d.makeArray(arguments));k&&m.fix!==false&&p(a,x,u,v)}t[c].listeners.push({fn:e,scope:g||a})}}},__getListeners:function(a,c){var e,g=[];if(e=(q.__getEvents(a)||{})[c])g=e.listeners;return g},__getEvents:function(a){var c=f(a),e;if(c!==-1)if(c&&(e=A[c]))if(e.target===
a)return e.events||{}},remove:function(a,c,e,g){if(!j("remove",a,c,e,g)){var k=q.__getEvents(a),m=f(a),t,u,x,v,r,y,z=(!a.isCustomEventTarget||a._supportSpecialEvent)&&q.special[c]||{};if(k!==undefined){g=g||a;if(t=k[c]){u=t.listeners;x=u.length;if(d.isFunction(e)&&x){r=v=0;for(y=[];v<x;++v)if(e!==u[v].fn||g!==u[v].scope)y[r++]=u[v];t.listeners=y;x=y.length}if(e===i||x===0){if(!a.isCustomEventTarget){z=q.special[c]||{};if(z.fix!==false)n(a,z.fix||c,t.handle)}delete k[c]}}z.destroy&&z.destroy.apply(null,
d.makeArray(arguments));if(c===i||d.isEmptyObject(k)){for(c in k)q.remove(a,c);delete A[m];h.removeData(a,s)}}}},_handle:function(a,c){var e=q.__getListeners(a,c.type);e=e.slice(0);for(var g,k=0,m=e.length;k<m;++k){g=e[k];g=g.fn.call(g.scope,c);if(g!==i){c.result=g;g===false&&c.halt()}if(c.isImmediatePropagationStopped)break}return g},_getCache:function(a){return A[a]},__getID:f,_simpleAdd:p,_simpleRemove:n};q.on=q.add;d.Event=q});
KISSY.add("event-object",function(d,i){function j(b,h,p){this.currentTarget=b;this.originalEvent=h||{};if(h){this.type=h.type;this._fix()}else{this.type=p;this.target=b}this.currentTarget=b;this.fixed=true}var f=document,l="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" ");
d.augment(j,{_fix:function(){var b=this.originalEvent,h=l.length,p,n=this.currentTarget;for(n=n.nodeType===9?n:n.ownerDocument||f;h;){p=l[--h];this[p]=b[p]}if(!this.target)this.target=this.srcElement||f;if(this.target.nodeType===3)this.target=this.target.parentNode;if(!this.relatedTarget&&this.fromElement)this.relatedTarget=this.fromElement===this.target?this.toElement:this.fromElement;if(this.pageX===i&&this.clientX!==i){b=n.documentElement;h=n.body;this.pageX=this.clientX+(b&&b.scrollLeft||h&&h.scrollLeft||
0)-(b&&b.clientLeft||h&&h.clientLeft||0);this.pageY=this.clientY+(b&&b.scrollTop||h&&h.scrollTop||0)-(b&&b.clientTop||h&&h.clientTop||0)}if(this.which===i)this.which=this.charCode!==i?this.charCode:this.keyCode;if(this.metaKey===i)this.metaKey=this.ctrlKey;if(!this.which&&this.button!==i)this.which=this.button&1?1:this.button&2?3:this.button&4?2:0},preventDefault:function(){var b=this.originalEvent;if(b.preventDefault)b.preventDefault();else b.returnValue=false;this.isDefaultPrevented=true},stopPropagation:function(){var b=
this.originalEvent;if(b.stopPropagation)b.stopPropagation();else b.cancelBubble=true;this.isPropagationStopped=true},stopImmediatePropagation:function(){var b=this.originalEvent;b.stopImmediatePropagation?b.stopImmediatePropagation():this.stopPropagation();this.isImmediatePropagationStopped=true},halt:function(b){b?this.stopImmediatePropagation():this.stopPropagation();this.preventDefault()}});d.EventObject=j});
KISSY.add("event-target",function(d,i){var j=d.Event;d.EventTarget={isCustomEventTarget:true,fire:function(f,l){var b=d.DOM.data(this,j.EVENT_GUID)||-1;if((b=((j._getCache(b)||{}).events||{})[f])&&d.isFunction(b.handle))return b.handle(i,l)},on:function(f,l,b){j.add(this,f,l,b);return this},detach:function(f,l,b){j.remove(this,f,l,b);return this}}});
KISSY.add("event-mouseenter",function(d){var i=d.Event;d.UA.ie||d.each([{name:"mouseenter",fix:"mouseover"},{name:"mouseleave",fix:"mouseout"}],function(j){i.special[j.name]={fix:j.fix,setup:function(f){f.type=j.name},handle:function(f,l){if(d.DOM._isKSNode(f))f=f[0];var b=l.relatedTarget;try{for(;b&&b!==f;)b=b.parentNode;b!==f&&i._handle(f,l)}catch(h){}}}})});
KISSY.add("event-focusin",function(d){var i=d.Event;document.addEventListener&&d.each([{name:"focusin",fix:"focus"},{name:"focusout",fix:"blur"}],function(j){i.special[j.name]={fix:j.fix,capture:true,setup:function(f){f.type=j.name}}})});
KISSY.add("event-hashchange",function(d){var i=d.Event;if((document.documentMode||d.UA.ie)<8){var j,f=function(){function b(){var o=d.trim(n.contentWindow.document.body.innerHTML);if(o!=(s.hash||"#"))s.hash=o;for(o=0;o<l.length;o++)i._handle(l[o],{type:"hashchange"})}function h(o){o="<html><body>"+o+"</body></html>";var w=n.contentWindow.document;try{w.open();w.write(o);w.close();return true}catch(A){return false}}function p(){j=setTimeout(function(){var o=d.trim(n.contentWindow.document.body.innerHTML),
w=s.hash||"#";o!=w&&h(w);p()},500)}var n=d.DOM.create("<iframe class='ks-hashchange-history-iframe'style='position:absolute;left:-9999px;top:-9999px;'>");d.DOM.prepend(n,document.body);var s=window.location;i.add(n,"load",function(){i.remove(n,"load");h(s.hash||"#");i.add(n,"load",b);p()});f=p},l=[];i.special.hashchange={fix:false,init:function(b){d.indexOf(b,b)==-1&&l.push(b);j||f()},destroy:function(b,h){if(!i.__getEvents(b)[h]){var p=d.indexOf(b,l);p>=0&&l.splice(p,1)}if(l.length==0){clearTimeout(j);
j=null}}}}});
