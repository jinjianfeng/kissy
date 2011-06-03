/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("node/attach",function(e,g,m,b,d){var i=b.prototype,k=g._isNodeList;b.addMethod=function(c,f,l,j){i[c]=function(){var h=e.makeArray(arguments);h.unshift(this);h=f.apply(l||this,h);if(h===d)h=this;else if(h===null)h=null;else if(j&&(h.nodeType||k(h)||e.isArray(h)))h=new b(h);return h}};var a=["_isElementNode","_getWin","_getComputedStyle","_isNodeList","_nodeTypeIs","_nl2frag","create","get","query","data","viewportHeight","viewportWidth","docHeight","docWidth"];e.each(g,function(c,f){g.hasOwnProperty(f)&&
e.isFunction(c)&&!e.inArray(f,a)&&b.addMethod(f,c,g,true)});b.addMethod("data",g.data,g)},{requires:["dom","event","./base"]});
KISSY.add("node/base",function(e,g,m,b){function d(a,c,f){if(!(this instanceof d))return new d(a,c,f);if(a)if(e.isString(a)){a=g.create(a,c,f);if(a.nodeType===11){i.push.apply(this,e.makeArray(a.childNodes));return b}}else if(e.isArray(a)||k(a)){i.push.apply(this,e.makeArray(a));return b}else a=a;else return b;this[0]=a;this.length=1;return b}var i=Array.prototype,k=g._isNodeList;e.augment(d,m.Target,{isCustomEventTarget:false,fire:null,length:0,item:function(a){if(e.isNumber(a)){if(a>=this.length)return null;
return new d(this[a],b,b)}else return new d(a,b,b)},add:function(a,c,f){if(e.isNumber(c)){f=c;c=b}a=e.makeArray(d.all(a,c));c=new d(this,b,b);if(f===b)i.push.apply(c,a);else{f=[f,0];f.push.apply(f,a);i.splice.apply(c,f)}return c},slice:function(a,c){return new d(i.slice.call(this,a,c),b,b)},getDOMNodes:function(){return i.slice.call(this)},each:function(a,c){var f=this.length,l=0,j;for(j=new d(this[0],b,b);l<f&&a.call(c||j,j,l,this)!==false;j=new d(this[++l],b,b));return this},getDOMNode:function(){return this[0]},
all:function(a){if(this.length>0)return d.all(a,this[0]);return new d(b,b,b)}});d.prototype.one=function(a){a=this.all(a);return a.length?a:null};d.all=function(a,c){if(e.isString(a)&&(a=e.trim(a))&&a.length>=3&&e.startsWith(a,"<")&&e.endsWith(a,">")){if(c){if(c.getDOMNode)c=c.getDOMNode();if(c.ownerDocument)c=c.ownerDocument}return new d(a,b,c)}return new d(g.query(a,c),b,b)};d.one=function(a,c){var f=d.all(a,c);return f.length?f:null};return d.List=d},{requires:["dom","event"]});
KISSY.add("node/override",function(e,g,m,b){e.each(["append","prepend","before","after"],function(d){b.addMethod(d,function(i,k){var a=k;if(e.isString(a))a=g.create(a);g[d](a,i)},undefined,true)})},{requires:["dom","event","./base","./attach"]});KISSY.add("node",function(e,g){return g},{requires:["node/base","node/attach","node/override"]});
