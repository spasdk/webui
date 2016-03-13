/*! spa-plugin-webui v1.0.0 (webpack: v1.12.14) */
!function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return t[i].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var i=n(1),o=n(5);o([function(t){i.once("load",function(){i.pages={init:n(6),main:n(10)},t()})},function(t){n(12)(),i.once("wamp:open",t)}],function(t){i.route(i.pages.main)})},function(t,e,n){"use strict";function i(t,e){return t&&!t.active?(t.$node.classList.add("active"),t.active=!0,r.activePage=t,t.events.show&&t.emit("show",{page:t,data:e}),!0):!1}function o(t){return t&&t.active?(t.$node.classList.remove("active"),t.active=!1,r.activePage=null,t.events.hide&&t.emit("hide",{page:t}),!0):!1}var s=n(2),a=n(3),r=new s;t.exports=r,r.config=n(4),r.query=a(document.location.search.substring(1)),r.activePage=null,r.route=function(t,e){var n=r.activePage;return t&&!t.active?(o(r.activePage),i(t,e),this.events.route&&this.emit("route",{from:n,to:t}),!0):!1},r.defaultEvents={DOMContentLoaded:function(t){r.events.dom&&r.emit("dom",t)},load:function(t){r.events[t.type]&&r.emit(t.type,t)},unload:function(t){r.events[t.type]&&r.emit(t.type,t)},error:function(t){},keydown:function(t){var e,n=r.activePage;e=n.activeComponent,e&&e!==n&&(e.events[t.type]&&e.emit(t.type,t),!t.stop&&e.propagate&&e.parent&&e.parent.events[t.type]&&e.parent.emit(t.type,t)),t.stop||(n.events[t.type]&&n.emit(t.type,t),t.stop||r.events[t.type]&&r.emit(t.type,t))},keypress:function(t){var e=r.activePage;e.activeComponent&&e.activeComponent!==e&&e.activeComponent.events[t.type]&&e.activeComponent.emit(t.type,t)},click:function(t){},contextmenu:function(t){t.preventDefault()},mousewheel:function(t){var e=r.activePage;e.activeComponent&&e.activeComponent!==e&&e.activeComponent.events[t.type]&&e.activeComponent.emit(t.type,t),t.stop||e.events[t.type]&&e.emit(t.type,t)}},Object.keys(r.defaultEvents).forEach(function(t){window.addEventListener(t,r.defaultEvents[t])})},function(t,e,n){"use strict";function i(){this.events={}}i.prototype={addListener:function(t,e){this.events[t]=this.events[t]||[],this.events[t].push(e)},once:function(t,e){var n=this;this.events[t]=this.events[t]||[],this.events[t].push(function i(){e.apply(n,arguments),n.removeListener(t,i)})},addListeners:function(t){var e;for(e in t)t.hasOwnProperty(e)&&this.addListener(e,t[e])},removeListener:function(t,e){this.events[t]&&(this.events[t]=this.events[t].filter(function(t){return t!==e}),0===this.events[t].length&&(this.events[t]=void 0))},removeAllListeners:function(t){0===arguments.length?this.events={}:t&&(this.events[t]=void 0)},emit:function(t){var e,n=this.events[t];if(n)for(e=0;e<n.length;e++)n[e].apply(this,Array.prototype.slice.call(arguments,1))}},i.prototype.constructor=i,t.exports=i},function(t,e){"use strict";t.exports=function(t){var e={};return t.split("&").forEach(function(t){t=t.split("="),2===t.length&&(e[t[0]]=decodeURIComponent(t[1]))}),e}},function(t,e){"use strict";t.exports={}},function(t,e){"use strict";t.exports=function(t,e){function n(n,r){var c=function(c,d){return c?(i=!0,void("function"==typeof e&&e(c))):(s[r]=d,n.name&&(a[n.name]=d),o++,void(o>=t.length&&"function"==typeof e&&e(null,s,a)))};i||(0===n.length?c(null,n()):n(c))}var i=!1,o=0,s=[],a={};t=Array.isArray(t)?t:[],0===t.length?"function"==typeof e&&e(null,s,a):t.forEach(n)}},function(t,e,n){"use strict";var i=n(7),o=new i({$node:window.pageInit});t.exports=o},function(t,e,n){"use strict";function i(t){t=t||{},this.active=!1,this.activeComponent=null,t.className="page "+(t.className||""),o.call(this,t),this.active=this.$node.classList.contains("active"),null===this.$node.parentNode&&document.body.appendChild(this.$node),this.page=this}var o=n(8);i.prototype=Object.create(o.prototype),i.prototype.constructor=i,t.exports=i},function(t,e,n){"use strict";function i(t){var e,n=this;if(t=t||{},this.visible=!0,this.focusable=!0,this.$node=null,this.$body=null,this.parent=null,this.children=[],this.propagate=!!t.propagate,o.call(this,t.data),this.$node=t.$node||document.createElement("div"),this.$body=t.$body||this.$node,this.$node.className+=" component "+(t.className||""),this.id=t.id||this.$node.id||"cid"+a++,t.parent&&t.parent.add(this),t.visible===!1&&this.hide(),t.focusable===!1&&(this.focusable=!1),this.defaultEvents){t.events=t.events||{};for(e in this.defaultEvents)t.events[e]=t.events[e]||this.defaultEvents[e]}t.events&&this.addListeners(t.events),t.children&&this.add.apply(this,t.children),this.$node.addEventListener("click",function(t){0===t.button&&(n.focus(),n.events.click&&n.emit("click",{event:t})),t.stopPropagation()})}var o=n(2),s=n(9),a=0;i.prototype=Object.create(o.prototype),i.prototype.constructor=i,i.prototype.defaultEvents=null,i.prototype.add=function(t){var e;for(e=0;e<arguments.length;e++)t=arguments[e],this.children.push(t),t.parent=this,t.$node&&null===t.$node.parentNode&&this.$body.appendChild(t.$node),this.events.add&&this.emit("add",{item:t})},i.prototype.remove=function(){this.parent&&(s.current.activeComponent===this&&(this.blur(),this.parent.focus()),this.parent.children.splice(this.parent.children.indexOf(this),1)),this.children.forEach(function(t){t.remove()}),this.events={},this.$node.parentNode.removeChild(this.$node),this.events.remove&&this.emit("remove")},i.prototype.focus=function(t){var e=s.current,n=e.activeComponent;return this.focusable&&this!==n?(n&&n.blur(),e.activeComponent=n=this,n.$node.classList.add("focus"),n.events.focus&&n.emit("focus",t),!0):!1},i.prototype.blur=function(){var t=s.current,e=t.activeComponent;return this.$node.classList.remove("focus"),this===e?(t.activeComponent=null,this.events.blur&&this.emit("blur"),!0):!1},i.prototype.show=function(t){return this.visible?!0:(this.$node.classList.remove("hidden"),this.visible=!0,this.events.show&&this.emit("show",t),!0)},i.prototype.hide=function(){return this.visible?(this.$node.classList.add("hidden"),this.visible=!1,this.events.hide&&this.emit("hide"),!0):!0},t.exports=i},function(t,e,n){"use strict";var i=n(2),o=new i;o.current=null,o.history=[],o.pages=[],o.ids={},o.init=function(t){var e,n,i;if(t){for(this.pages=[],this.pages=t,e=0,n=t.length;n>e;e++)i=t[e],this.ids[i.id]=i,i.active&&(this.current=i);return this.events.init&&this.emit("init",{pages:t}),!0}return!1},o.parse=function(t){var e={name:"",data:[]};return e.data=t.split("/").map(decodeURIComponent),e.name=e.data.shift().slice(1),e},o.stringify=function(t,e){return e=Array.isArray(e)?e:[],t=encodeURIComponent(t),e=e.map(encodeURIComponent),e.unshift(t),e.join("/")},o.show=function(t,e){return t&&!t.active?(t.$node.classList.add("active"),t.active=!0,this.current=t,t.events.show&&t.emit("show",{page:t,data:e}),!0):!1},o.hide=function(t){return t&&t.active?(t.$node.classList.remove("active"),t.active=!1,this.current=null,t.events.hide&&t.emit("hide",{page:t}),!0):!1},o.navigate=function(t,e){var n=this.current,i=this.ids[t];return i&&!i.active?(location.hash=this.stringify(t,e),this.hide(this.current),this.show(i,e),this.events.navigate&&this.emit("navigate",{from:n,to:i}),this.history.push(i),!0):!1},o.back=function(){var t,e;return this.history.length>1&&(t=this.history.pop(),e=this.history[this.history.length-1],e&&!e.active)?(location.hash=e.id,this.hide(this.current),this.show(e),this.events.navigate&&this.emit("navigate",{from:t,to:e}),!0):!1},t.exports=o},function(t,e,n){"use strict";var i=n(1),o=n(7),s=n(11),a=new o({$node:window.pageMain});i.addListener("load",function(){var t=new s({value:"system"});window.pageMainHeader.appendChild(t.$node),window.pageMainHeaderLink.href=window.pageMainHeaderLink.innerText="http://192.168.1.57:8080/app/develop.html?wampPort=9000",i.once("wamp:open",function(){i.wamp.call("getTargets",{},function(t,e){Object.keys(e).forEach(function(t){var n=e[t];window.pageMainHeader.appendChild(new s({value:"target #"+t+" ("+n.host+")"}).$node)})})}),i.wamp.addListener("eventTargetOnline",function(t){window.pageMainHeader.appendChild(new s({value:"target #"+t.id+" ("+t.host+")"}).$node)})}),a.addListener("show",function(){i.wamp.call("getTasks",{},function(t,e){var n={},o=[];Object.keys(e).forEach(function(t){var e=t.split(":");1===e.length?o.push(t):(n[e[0]]=n[e[0]]||[],n[e[0]].push(t))}),Object.keys(n).forEach(function(t){var o=document.createElement("div"),s=document.createElement("div"),r=document.createElement("div");s.innerText=t,o.className="group",s.className="title",r.className="tasks",a.$body.appendChild(o),o.appendChild(s),o.appendChild(r),n[t].sort().forEach(function(t){var n=document.createElement("div"),o=t.split(":");n.id=t,n.innerText=o.slice(1).join(":"),n.className="button"+(e[t].running?" running":"")+(2===o.length?" main":"")+("develop"===o[2]?" develop":"")+("default"===o[2]?" default":""),n.addEventListener("click",function(){i.wamp.call("runTask",{id:n.id},function(t,e){})}),r.appendChild(n)})}),["general"].forEach(function(t){var n=document.createElement("div"),s=document.createElement("div"),r=document.createElement("div");s.innerText=t,n.className="group",s.className="title",r.className="tasks",a.$body.appendChild(n),n.appendChild(s),n.appendChild(r),o.sort().forEach(function(t){var n=document.createElement("div");n.id=t,n.innerText=t,n.className="button"+(e[t].running?" running":""),n.addEventListener("click",function(){i.wamp.call("runTask",{id:n.id},function(t,e){})}),r.appendChild(n)})})})}),t.exports=a},function(t,e,n){"use strict";function i(t){t=t||{},t.className="button "+(t.className||""),o.call(this,t),t.icon&&(this.$icon=this.$body.appendChild(document.createElement("div")),this.$icon.className="icon "+t.icon),this.$text=this.$body.appendChild(document.createElement("div")),this.$text.classList.add("text"),t.value&&(this.$text.innerText=t.value)}var o=n(8);i.prototype=Object.create(o.prototype),i.prototype.constructor=i,i.prototype.clickDuration=200,i.prototype.defaultEvents={click:function(){var t=this;this.$node.classList.add("click"),setTimeout(function(){t.$node.classList.remove("click")},this.clickDuration)},keydown:function(t){13===t.keyCode&&this.events.click&&this.emit("click",{event:t})}},t.exports=i},function(t,e,n){"use strict";function i(){o.wamp=new s(new WebSocket("ws://localhost:"+a(document.location.search.substring(1)).port+"/client")),o.wamp.socket.onopen=function(){document.body.style.opacity=1,o.wamp.call("getInfo",{},function(t,e){}),o.wamp.call("getMemoryUsage",{},function(t,e){}),o.wamp.call("getClients",{},function(t,e){}),o.wamp.call("getPlugins",{},function(t,e){}),o.wamp.addListener("eventTaskStart",function(t){window[t.id].classList.add("running")}),o.wamp.addListener("eventTaskFinish",function(t){window[t.id].classList.remove("running")}),o.wamp.addListener("message",function(t){}),o.emit("wamp:open")},o.wamp.socket.onclose=function(){document.body.style.opacity=.2,setTimeout(i,5e3)}}var o=n(1),s=n(13),a=n(3);t.exports=i},function(t,e,n){"use strict";function i(t){var e=this;s.call(this),this.socket=t,"on"in t?t.on("message",function(t){e.router(t)}):"onmessage"in t&&(t.onmessage=function(t){e.router(t.data)})}function o(t,e){1===t.readyState&&(e.jsonrpc="2.0",t.send(JSON.stringify(e)))}var s=n(2),a=0,r={};i.prototype=Object.create(s.prototype),i.prototype.constructor=i,i.prototype.router=function(t){var e,n=this;try{e=JSON.parse(t)}catch(i){return void o(this.socket,{error:{code:-32700,message:"Parse error"},id:null})}"id"in e&&!("method"in e)?e.id in r&&(r[e.id](e.error,e.result),delete r[e.id]):!("id"in e)&&"method"in e?this.events[e.method]&&this.emit(e.method,e.params):"id"in e&&"method"in e?this.events[e.method]?this.emit(e.method,e.params,function(t,i){o(n.socket,{error:t,result:i,id:e.id})}):o(this.socket,{error:{code:-32601,message:"Method not found"},id:e.id}):o(this.socket,{error:{code:-32600,message:"Invalid Request"},id:null})},i.prototype.call=function(t,e,n){var i={method:t,params:e};"function"==typeof n&&(i.id=++a,r[a]=n),o(this.socket,i)},t.exports=i}]);
//# sourceMappingURL=release.map