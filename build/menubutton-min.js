/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Nov 18 17:23
*/
KISSY.add("menubutton/menubutton",function(f,h,j,e,i,o,n){var l=j.all,g=j.KeyCodes,b={points:["bl","tl"],overflow:{failX:1,failY:1,adjustX:1,adjustY:1}},d=h.create(e,[n.DecorateChild],{_hideMenu:function(){var a=this.get("menu");a&&a.hide()},_showMenu:function(){var a=this.get("el"),c=this.get("menu");if(c&&!c.get("visible")){c.set("align",f.merge({node:a},b,this.get("menuAlign")));c.show();a.attr("aria-haspopup",c.get("el").attr("id"))}},_uiSetCollapsed:function(a){a?this._hideMenu():this._showMenu()},
_reposition:function(){var a=this.get("menu"),c=this.get("el");a&&a.get("visible")&&a.set("align",f.mix({node:c},this.get("menuAlign")))},__bindMenu:function(){var a=this,c=this.get("menu");if(c){c.on("afterActiveItemChange",function(m){a.set("activeItem",m.newVal)});c.on("click",a._handleMenuClick,a);l(window).on("resize",a._reposition,a);a.__bindMenu=f.noop}},_handleMenuClick:function(a){this.fire("click",{target:a.target});this.set("collapsed",true)},bindUI:function(){this.__bindMenu()},_handleKeyEventInternal:function(a){var c=
this.get("menu");if(a.keyCode==g.SPACE){a.preventDefault();if(a.type!="keyup")return}else if(a.type!="keydown")return;if(c&&c.get("visible")){c=c._handleKeydown(a);if(a.keyCode==g.ESC){this.set("collapsed",true);return true}return c}if(a.keyCode==g.SPACE||a.keyCode==g.DOWN||a.keyCode==g.UP){this.set("collapsed",false);return true}},_performInternal:function(){var a=this.get("menu");if(a)a.get("visible")?this.set("collapsed",true):this.set("collapsed",false)},_handleBlur:function(a){d.superclass._handleBlur.call(this,
a);this.set("collapsed",true)},getMenu:function(){var a=this.get("menu");if(!a){a=new o.PopupMenu(f.mix({prefixCls:this.get("prefixCls")},this.get("menuCfg")));this.set("menu",a);this.__bindMenu()}return a},addItem:function(a,c){this.getMenu().addChild(a,c)},removeItem:function(a,c){this.get("menu")&&this.get("menu").removeChild(a,c)},removeItems:function(a){this.get("menu")&&this.get("menu").removeChildren(a)},getItemAt:function(a){return this.get("menu")&&this.get("menu").getChildAt(a)},_uiSetDisabled:function(a){d.superclass._uiSetDisabled.apply(this,
f.makeArray(arguments));!a&&this.set("collapsed",true)},decorateChildrenInternal:function(a,c,m){c.css("visibility","hidden");f.one(c[0].ownerDocument.body).prepend(c);this.set("menu",new a(f.mix({srcNode:c,prefixCls:m},this.get("menuCfg"))))},destructor:function(){var a=this.get("menu");l(window).detach("resize",this._reposition,this);a&&a.destroy()}},{ATTRS:{activeItem:{view:true},menuAlign:{value:{}},menuCfg:{},decorateChildCls:{value:"popupmenu"},menu:{setter:function(a){a.set("parent",this)}},
collapsed:{value:true,view:true}},DefaultRender:i});n.UIStore.setUIByClass("menu-button",{priority:n.UIStore.PRIORITY.LEVEL2,ui:d});return d},{requires:["uibase","node","button","./menubuttonrender","menu","component"]});
KISSY.add("menubutton/menubuttonrender",function(f,h,j){return h.create(j.Render,{createDom:function(){var e=this.get("innerEl"),i=f.substitute('<div class="{prefixCls}inline-block {prefixCls}menu-button-caption">{content}</div><div class="{prefixCls}inline-block {prefixCls}menu-button-dropdown">&nbsp;</div>',{content:this.get("content")||"",prefixCls:this.get("prefixCls")});e.html(i).attr("aria-haspopup",true)},_uiSetContent:function(e){var i=this.get("el").one("."+this.getCls("menu-button-caption"));
i.html("");e&&i.append(e)},_uiSetCollapsed:function(e){var i=this.get("el"),o=this.getCls("menu-button-open");i[e?"removeClass":"addClass"](o).attr("aria-expanded",!e)},_uiSetActiveItem:function(e){this.get("el").attr("aria-activedescendant",e&&e.get("el").attr("id")||"")}},{ATTRS:{activeItem:{},collapsed:{}}})},{requires:["uibase","button"]});
KISSY.add("menubutton/option",function(f,h,j,e){f=h.create(e.Item,{},{ATTRS:{selectable:{value:true}}});j.UIStore.setUIByClass("option",{priority:10,ui:f});return f},{requires:["uibase","component","menu"]});
KISSY.add("menubutton/select",function(f,h,j,e,i,o,n){function l(b){return b.get("menu")&&b.get("menu").get("children")||[]}var g=j.create(i,{__bindMenu:function(){var b=this.get("menu");g.superclass.__bindMenu.call(this);b&&b.on("show",this._handleMenuShow,this)},_handleMenuShow:function(){this.get("menu").set("highlightedItem",this.get("selectedItem")||this.get("menu").getChildAt(0))},_updateCaption:function(){var b=this.get("selectedItem");this.set("content",b?b.get("content"):this.get("defaultCaption"))},
_handleMenuClick:function(b){this.set("selectedItem",b.target);this.set("collapsed",true);g.superclass._handleMenuClick.call(this,b)},removeItems:function(){g.superclass.removeItems.apply(this,arguments);this.set("selectedItem",null)},removeItem:function(b){g.superclass.removeItem.apply(this,arguments);b==this.get("selectedItem")&&this.set("selectedItem",null)},_uiSetSelectedItem:function(b,d){d&&d.prevVal&&d.prevVal.set("selected",false);this._updateCaption()},_uiSetDefaultCaption:function(){this._updateCaption()}},
{ATTRS:{value:{getter:function(){var b=this.get("selectedItem");return b&&b.get("value")},setter:function(b){for(var d=l(this),a=0;a<d.length;a++){var c=d[a];if(c.get("value")==b){this.set("selectedItem",c);return}}this.set("selectedItem",null);return null}},selectedItem:{},selectedIndex:{setter:function(b){var d=l(this);if(b<0||b>=d.length)return-1;this.set("selectedItem",d[b])},getter:function(){return f.indexOf(this.get("selectedItem"),l(this))}},defaultCaption:{value:""}}});g.decorate=function(b,
d){b=f.one(b);d=d||{};d.elBefore=b;var a=new g(d),c,m,p=b.val();b.all("option").each(function(k){var q=new n({content:k.text(),prefixCls:d.prefixCls,elCls:k.attr("class"),value:k.val()});if(p==k.val())m=q;a.addItem(q)});a.set("selectedItem",m);a.render();if(c=b.attr("name")){var r=(new h("<input type='hidden' name='"+c+"' value='"+p+"'>")).insertBefore(b);a.on("afterSelectedItemChange",function(k){k.newVal?r.val(k.newVal.get("value")):r.val("")})}b.remove();return a};e.UIStore.setUIByClass("select",
{priority:e.UIStore.PRIORITY.LEVEL3,ui:g});return g},{requires:["node","uibase","component","./menubutton","menu","./option"]});KISSY.add("menubutton",function(f,h,j,e,i){h.Render=j;h.Select=e;h.Option=i;return h},{requires:["menubutton/menubutton","menubutton/menubuttonrender","menubutton/select","menubutton/option"]});
