/*
Copyright 2010, KISSY UI Library v1.1.2
MIT Licensed
build time: Aug 16 16:50
*/
KISSY.add("flash",function(e){e.Flash={swfs:{},length:0}},{requires:["core"]});
KISSY.add("flash-ua",function(e){function l(){var a;if(navigator.plugins&&navigator.mimeTypes.length)a=(navigator.plugins["Shockwave Flash"]||0).description;else if(window.ActiveXObject)try{a=(new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")}catch(b){}if(a)return h(a)}function h(a){return a.match(/(\d)+/g)}function i(a){var b=e.isString(a)?h(a):a;a=a;if(e.isArray(b))a=parseFloat(b[0]+"."+f(b[1],3)+f(b[2],5));return a||0}function f(a,b){for(var c=(a+"").length;c++<b;)a="0"+
a;return a}var m=e.UA,j,n,k=true;m.fpv=function(a){if(a||k){k=false;j=l();n=i(j)}return j};m.fpvGEQ=function(a,b){k&&m.fpv(b);return!!n&&n>=i(a)}});
KISSY.add("flash-embed",function(e){function l(a,b,c){var d=i.create("<param>");i.attr(d,{name:b,value:c});a.appendChild(d)}var h=e.UA,i=e.DOM,f=e.Flash,m=/object|embed/i,j=encodeURIComponent,n={wmode:"",allowscriptaccess:"",allownetworking:"",allowfullscreen:"",play:"false",loop:"",menu:"",quality:"",scale:"",salign:"",bgcolor:"",devicefont:"",base:"",swliveconnect:"",seamlesstabbing:""},k={params:{},attrs:{width:215,height:138},version:9};e.mix(f,{fpv:h.fpv,fpvGEQ:h.fpvGEQ,add:function(a,b,c){var d,
g;b=f._normalize(b);b=e.merge(k,b);b.attrs=e.merge(k.attrs,b.attrs);if(a=e.get(a)){if(!a.id)a.id=e.guid("ks-flash-");g=b.attrs.id=a.id;if(h.fpv()){if(!h.fpvGEQ(b.version)){this._callback(c,0,g,a);if(!((d=b.xi)&&e.isString(d)))return;b.src=d}if(m.test(a.nodeName))this._register(a,b,c);else b.src?this._embed(a,b,c):this._callback(c,-3,g,a)}else this._callback(c,-1,g,a)}else this._callback(c,-2)},get:function(a){return f.swfs[a]},remove:function(a){if(a=f.get("#"+a)){i.remove(a);delete f.swfs[a.id];
f.length-=1}},contains:function(a){var b=f.swfs,c,d=false;if(e.isString(a))d=a in b;else for(c in b)if(b[c]===a){d=true;break}return d},_register:function(a,b,c){b=b.attrs.id;if(h.gecko||h.opera)a=e.query("object",a)[0]||a;f._addSWF(b,a);f._callback(c,1,b,a)},_embed:function(a,b,c){var d=f._createSWF(b.src,b.attrs,b.params);if(h.ie)a.outerHTML=d.outerHTML;else a.parentNode.replaceChild(d,a);a=e.get("#"+a.id);f._register(a,b,c)},_callback:function(a,b,c,d){b&&e.isFunction(a)&&a({status:b,id:c,swf:d})},
_addSWF:function(a,b){if(a&&b){f.swfs[a]=b;f.length+=1}},_createSWF:function(a,b,c){var d=i.create("<object>"),g;i.attr(d,b);if(h.ie){i.attr(d,"classid","clsid:d27cdb6e-ae6d-11cf-96b8-444553540000");l(d,"movie",a)}else i.attr(d,{type:"application/x-shockwave-flash",data:a,name:b.id});for(g in c)g in n&&l(d,g,c[g]);c.flashvars&&l(d,"flashvars",f.toFlashVars(c.flashvars));return d},_normalize:function(a){var b,c,d,g=a;if(e.isPlainObject(a)){g={};for(d in a){b=d.toLowerCase();c=a[d];if(b!=="flashvars")c=
f._normalize(c);g[b]=c}}return g},toFlashVars:function(a){if(!e.isPlainObject(a))return"";var b,c,d=[];for(b in a){c=a[b];if(e.isString(c))c=j(c);else{c=e.JSON.stringify(c);if(!c)continue;c=c.replace(/:"([^"]+)/g,function(g,o){return':"'+j(o)})}d.push(b+"="+c)}return d.join("&").replace(/\"/g,"'")}})});
