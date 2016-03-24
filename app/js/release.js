/*! spa-plugin-webui v1.0.0 (webpack: v1.12.14) */
!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return e[i].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var i=n(1),o=n(5),s=n(7);s([function(e){i.once("load",function(){i.pages={init:n(8),main:n(11)},e()})},function(e){i.wamp=new o("ws://"+(i.query.wampHost||location.hostname)+":"+i.query.wampPort+"/client"),i.wamp.addListener("connection:open",function(){document.body.style.opacity=1}),i.wamp.addListener("connection:close",function(){document.body.style.opacity=.2}),i.wamp.once("connection:open",e)}],function(e){e&&debug.fail(e),i.route(i.pages.main)})},function(e,t,n){"use strict";function i(e,t){return e&&!e.active?(e.$node.classList.add("active"),e.active=!0,c.activePage=e,e.events.show&&e.emit("show",{page:e,data:t}),!0):!1}function o(e){return e&&e.active?(e.$node.classList.remove("active"),e.active=!1,c.activePage=null,e.events.hide&&e.emit("hide",{page:e}),!0):!1}var s=n(2),a=n(3).parse,c=new s;e.exports=c,c.query=a(document.location.search.substring(1)),c.config=n(4),c.activePage=null,c.route=function(e,t){var n=c.activePage;return e&&!e.active?(o(c.activePage),i(e,t),this.events.route&&this.emit("route",{from:n,to:e}),!0):!1},c.defaultEvents={DOMContentLoaded:function(e){c.events.dom&&c.emit("dom",e)},load:function(e){c.events[e.type]&&c.emit(e.type,e)},unload:function(e){c.events[e.type]&&c.emit(e.type,e)},error:function(e){},keydown:function(e){var t,n=c.activePage;t=n.activeComponent,t&&t!==n&&t.events[e.type]&&t.emit(e.type,e),e.stop||(n.events[e.type]&&n.emit(e.type,e),e.stop||c.events[e.type]&&c.emit(e.type,e))},keypress:function(e){var t=c.activePage;t.activeComponent&&t.activeComponent!==t&&t.activeComponent.events[e.type]&&t.activeComponent.emit(e.type,e)},click:function(e){},contextmenu:function(e){e.preventDefault()},mousewheel:function(e){var t=c.activePage;t.activeComponent&&t.activeComponent!==t&&t.activeComponent.events[e.type]&&t.activeComponent.emit(e.type,e),e.stop||t.events[e.type]&&t.emit(e.type,e)}},Object.keys(c.defaultEvents).forEach(function(e){window.addEventListener(e,c.defaultEvents[e])})},function(e,t,n){"use strict";function i(){this.events={}}i.prototype={addListener:function(e,t){this.events[e]=this.events[e]||[],this.events[e].push(t)},once:function(e,t){var n=this;this.events[e]=this.events[e]||[],this.events[e].push(function i(){t.apply(n,arguments),n.removeListener(e,i)})},addListeners:function(e){var t;for(t in e)e.hasOwnProperty(t)&&this.addListener(t,e[t])},removeListener:function(e,t){this.events[e]&&(this.events[e]=this.events[e].filter(function(e){return e!==t}),0===this.events[e].length&&(this.events[e]=void 0))},emit:function(e){var t,n=this.events[e];if(n)for(t=0;t<n.length;t++)n[t].apply(this,Array.prototype.slice.call(arguments,1))}},i.prototype.constructor=i,e.exports=i},function(e,t){"use strict";e.exports={parse:function(e){var t={};return e.split("&").forEach(function(e){e=e.split("="),2===e.length&&(t[e[0]]=decodeURIComponent(e[1]))}),t},stringify:function(e){var t=[];return Object.keys(e).forEach(function(n){t.push(n+"="+encodeURIComponent(e[n]))}),t.join("&")}}},function(e,t){"use strict";e.exports={}},function(e,t,n){"use strict";function i(e){function t(){var i=new WebSocket(e);return i.onopen=function(){n.events[a.open]&&n.emit(a.open),n.open=!0},i.onclose=function(){n.events[a.close]&&n.open&&n.emit(a.close),n.open=!1,setTimeout(function(){n.socket=t(),n.socket.onmessage=function(e){n.router(e.data)}},s)},i}var n=this;this.open=!1,o.call(this,t())}var o=n(6),s=5e3,a={open:"connection:open",close:"connection:close"};i.prototype=Object.create(o.prototype),i.prototype.constructor=i,e.exports=i},function(e,t,n){"use strict";function i(e){var t=this;s.call(this),this.socket=e,"on"in e?e.on("message",function(e){t.router(e)}):"onmessage"in e&&(e.onmessage=function(e){t.router(e.data)})}function o(e,t){1===e.readyState&&(t.jsonrpc="2.0",e.send(JSON.stringify(t)))}var s=n(2),a=0,c={};i.prototype=Object.create(s.prototype),i.prototype.constructor=i,i.prototype.router=function(e){var t,n=this;try{t=JSON.parse(e)}catch(i){return void o(this.socket,{error:{code:-32700,message:"Parse error"},id:null})}"id"in t&&!("method"in t)?t.id in c&&(c[t.id](t.error,t.result),delete c[t.id]):!("id"in t)&&"method"in t?this.events[t.method]&&this.emit(t.method,t.params):"id"in t&&"method"in t?this.events[t.method]?this.emit(t.method,t.params,function(e,i){o(n.socket,{error:e,result:i,id:t.id})}):o(this.socket,{error:{code:-32601,message:"Method not found"},id:t.id}):o(this.socket,{error:{code:-32600,message:"Invalid Request"},id:null})},i.prototype.call=function(e,t,n){var i={method:e,params:t};"function"==typeof n&&(i.id=++a,c[a]=n),o(this.socket,i)},e.exports=i},function(e,t){"use strict";e.exports=function(e,t){function n(n,c){var r=function(r,d){return r?(i=!0,void("function"==typeof t&&t(r))):(s[c]=d,n.name&&(a[n.name]=d),o++,void(o>=e.length&&"function"==typeof t&&t(null,s,a)))};i||(0===n.length?r(null,n()):n(r))}var i=!1,o=0,s=[],a={};e=Array.isArray(e)?e:[],0===e.length?"function"==typeof t&&t(null,s,a):e.forEach(n)}},function(e,t,n){"use strict";var i=n(9),o=new i({$node:window.pageInit});e.exports=o},function(e,t,n){"use strict";function i(e){e=e||{},this.active=!1,this.activeComponent=null,e.className="page "+(e.className||""),o.call(this,e),this.active=this.$node.classList.contains("active"),null===this.$node.parentNode&&document.body.appendChild(this.$node),this.page=this}var o=n(10);i.prototype=Object.create(o.prototype),i.prototype.constructor=i,e.exports=i},function(e,t,n){"use strict";function i(e){var t,n=this;if(e=e||{},this.visible=!0,this.focusable=!0,this.$node=null,this.$body=null,this.parent=null,this.children=[],this.propagate=!!e.propagate,s.call(this,e.data),this.$node=e.$node||document.createElement("div"),this.$body=e.$body||this.$node,this.$node.className+=" component "+(e.className||""),this.id=e.id||this.$node.id||"cid"+a++,e.parent&&e.parent.add(this),e.visible===!1&&this.hide(),e.focusable===!1&&(this.focusable=!1),this.defaultEvents){e.events=e.events||{};for(t in this.defaultEvents)e.events[t]=e.events[t]||this.defaultEvents[t]}e.events&&Object.keys(e.events).forEach(function(t){n.addListener(t,e.events[t])}),e.children&&this.add.apply(this,e.children),this.$node.addEventListener("click",function(e){0===e.button&&(n.focus(),n.events.click&&n.emit("click",{event:e})),e.stopPropagation()})}var o=n(1),s=n(2),a=0;i.prototype=Object.create(s.prototype),i.prototype.constructor=i,i.prototype.defaultEvents=null,i.prototype.add=function(e){var t;for(t=0;t<arguments.length;t++)e=arguments[t],this.children.push(e),e.parent=this,e.$node&&null===e.$node.parentNode&&this.$body.appendChild(e.$node),this.events.add&&this.emit("add",{item:e})},i.prototype.remove=function(){this.parent&&(o.activePage.activeComponent===this&&(this.blur(),this.parent.focus()),this.parent.children.splice(this.parent.children.indexOf(this),1)),this.children.forEach(function(e){e.remove()}),this.events={},this.$node.parentNode.removeChild(this.$node),this.events.remove&&this.emit("remove")},i.prototype.focus=function(e){var t=o.activePage,n=t.activeComponent;return this.focusable&&this!==n?(n&&n.blur(),t.activeComponent=n=this,n.$node.classList.add("focus"),n.events.focus&&n.emit("focus",e),!0):!1},i.prototype.blur=function(){var e=o.activePage,t=e.activeComponent;return this.$node.classList.remove("focus"),this===t?(e.activeComponent=null,this.events.blur&&this.emit("blur"),!0):!1},i.prototype.show=function(e){return this.visible?!0:(this.$node.classList.remove("hidden"),this.visible=!0,this.events.show&&this.emit("show",e),!0)},i.prototype.hide=function(){return this.visible?(this.$node.classList.add("hidden"),this.visible=!1,this.events.hide&&this.emit("hide"),!0):!0},e.exports=i},function(e,t,n){"use strict";var i=n(1),o=n(9),s=n(12),a=new o({$node:window.pageMain});i.addListener("load",function(){new s({$node:window.pageMainButtonSystem,value:"system",events:{click:function(){window.pageMainTabSystem.style.display="block",window.pageMainTabTarget.style.display="none"}}}),new s({$node:window.pageMainButtonTarget,value:"target",events:{click:function(){window.pageMainTabSystem.style.display="none",window.pageMainTabTarget.style.display="block"}}});window.pageMainHeaderLink.href=window.pageMainHeaderLink.innerText="http://192.168.1.57:8080/app/develop.html?wampPort=9000",i.wamp.once("connection:open",function(){i.wamp.call("getInfo",{},function(e,t){}),i.wamp.call("getMemoryUsage",{},function(e,t){}),i.wamp.call("getClients",{},function(e,t){}),i.wamp.call("getPlugins",{},function(e,t){}),i.wamp.addListener("eventTaskStart",function(e){window[e.id].classList.add("running")}),i.wamp.addListener("eventTaskFinish",function(e){window[e.id].classList.remove("running")}),i.wamp.addListener("eventTargetMessage",function(e){var t=document.createElement("div"),n=document.createElement("div");t.className="item",e.tags=e.tags||[],e.tags.forEach(function(e){var n=document.createElement("div");n.className="tag",n.innerText=e,t.appendChild(n),-1!==["info","warn","fail"].indexOf(e)&&t.classList.add(e)}),n.className="info",n.innerText=e.time+" :: "+e.info+(e.data?" :: "+JSON.stringify(e.data):""),t.appendChild(n),window.pageMainTabTargetList.appendChild(t)}),i.wamp.call("getTargets",{},function(e,t){Object.keys(t).forEach(function(e){t[e]})})}),i.wamp.addListener("eventTargetOnline",function(e){})}),a.addListener("show",function(){i.wamp.call("getTasks",{},function(e,t){var n={},o=[];Object.keys(t).forEach(function(e){var t=e.split(":");1===t.length?o.push(e):(n[t[0]]=n[t[0]]||[],n[t[0]].push(e))}),Object.keys(n).forEach(function(e){var o=document.createElement("div"),s=document.createElement("div"),a=document.createElement("div");s.innerText=e,o.className="group",s.className="title",a.className="tasks",window.pageMainTabSystem.appendChild(o),o.appendChild(s),o.appendChild(a),n[e].sort().forEach(function(e){var n=document.createElement("div"),o=e.split(":");n.id=e,n.innerText=o.slice(1).join(":"),n.className="button"+(t[e].running?" running":"")+(2===o.length?" main":"")+("develop"===o[2]?" develop":"")+("default"===o[2]?" default":""),n.addEventListener("click",function(){i.wamp.call("runTask",{id:n.id},function(e,t){})}),a.appendChild(n)})}),["general"].forEach(function(e){var n=document.createElement("div"),s=document.createElement("div"),a=document.createElement("div");s.innerText=e,n.className="group",s.className="title",a.className="tasks",window.pageMainTabSystem.appendChild(n),n.appendChild(s),n.appendChild(a),o.sort().forEach(function(e){var n=document.createElement("div");n.id=e,n.innerText=e,n.className="button"+(t[e].running?" running":""),n.addEventListener("click",function(){i.wamp.call("runTask",{id:n.id},function(e,t){})}),a.appendChild(n)})})})}),e.exports=a},function(e,t,n){"use strict";function i(e){e=e||{},e.className="button "+(e.className||""),o.call(this,e),e.icon&&(this.$icon=this.$body.appendChild(document.createElement("div")),this.$icon.className="icon "+e.icon),this.$text=this.$body.appendChild(document.createElement("div")),this.$text.classList.add("text"),e.value&&(this.$text.innerText=e.value)}var o=n(10);i.prototype=Object.create(o.prototype),i.prototype.constructor=i,i.prototype.clickDuration=200,i.prototype.defaultEvents={click:function(){var e=this;this.$node.classList.add("click"),setTimeout(function(){e.$node.classList.remove("click")},this.clickDuration)},keydown:function(e){13===e.keyCode&&this.events.click&&this.emit("click",{event:e})}},e.exports=i}]);
//# sourceMappingURL=release.map