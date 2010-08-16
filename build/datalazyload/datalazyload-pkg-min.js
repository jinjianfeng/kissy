/*
Copyright 2010, KISSY UI Library v1.1.2
MIT Licensed
build time: Aug 16 16:50
*/
KISSY.add("datalazyload",function(c,o){function h(a,b){if(!(this instanceof h))return new h(a,b);if(b===o){b=a;a=[l]}c.isArray(a)||(a=[c.get(a)||l]);this.containers=a;this.config=c.merge(p,b);this._init()}var f=c.DOM,j=c.Event,k=window,l=document,m="scroll",n="resize",p={mod:"manual",diff:"default",placeholder:"none"};c.augment(h,{_init:function(){this.threshold=this._getThreshold();this._filterItems();this._getItemsLength()&&this._initLoadEvent()},_filterItems:function(){var a=this.containers,b,
e,d,i=[],g=[];b=0;for(e=a.length;b<e;++b){d=c.query("img",a[b]);i=i.concat(c.filter(d,this._filterImg,this));d=c.query("textarea",a[b]);g=g.concat(c.filter(d,this._filterArea,this))}this.images=i;this.areas=g},_filterImg:function(a){var b=a.getAttribute("data-ks-lazyload"),e=this.threshold,d=this.config.placeholder;if(this.config.mod==="manual"){if(b){if(d!=="none")a.src=d;return true}}else if(f.offset(a).top>e&&!b){f.attr(a,"data-ks-lazyload",a.src);if(d!=="none")a.src=d;else a.removeAttribute("src");
return true}},_filterArea:function(a){return f.hasClass(a,"ks-datalazyload")},_initLoadEvent:function(){function a(){e||(e=c.later(function(){b();e=null},100))}function b(){d._loadItems();if(d._getItemsLength()===0){j.remove(k,m,a);j.remove(k,n,a)}}var e,d=this;j.on(k,m,a);j.on(k,n,function(){d.threshold=d._getThreshold();a()});d._getItemsLength()&&c.ready(function(){b()})},_loadItems:function(){this._loadImgs();this._loadAreas()},_loadImgs:function(){this.images=c.filter(this.images,this._loadImg,
this)},_loadImg:function(a){var b=this.threshold+f.scrollTop();if(f.offset(a).top<=b)this._loadImgSrc(a);else return true},_loadImgSrc:function(a,b){b=b||"data-ks-lazyload";var e=a.getAttribute(b);if(e&&a.src!=e){a.src=e;a.removeAttribute(b)}},_loadAreas:function(){this.areas=c.filter(this.areas,this._loadArea,this)},_loadArea:function(a){var b=f.css(a,"display")==="none";if(f.offset(b?a.parentNode:a).top<=this.threshold+f.scrollTop())this._loadAreaData(a.parentNode,a);else return true},_loadAreaData:function(a,
b){b.style.display="none";b.className="";var e=f.create("<div>");a.insertBefore(e,b);f.html(e,b.value,true)},_getThreshold:function(){var a=this.config.diff,b=f.viewportHeight();return a==="default"?2*b:b+a},_getItemsLength:function(){return this.images.length+this.areas.length},loadCustomLazyData:function(a,b){var e=this,d,i;c.isArray(a)||(a=[c.get(a)]);c.each(a,function(g){switch(b){case "img-src":i=g.nodeName==="IMG"?[g]:c.query("img",g);c.each(i,function(q){e._loadImgSrc(q,"data-ks-lazyload-custom")});
break;default:(d=c.get("textarea",g))&&f.hasClass(d,"ks-datalazyload-custom")&&e._loadAreaData(g,d)}})}});c.mix(h,h.prototype,true,["loadCustomLazyData","_loadImgSrc","_loadAreaData"]);c.DataLazyload=h},{requires:["core"]});
