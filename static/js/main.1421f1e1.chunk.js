(this.webpackJsonproulette=this.webpackJsonproulette||[]).push([[0],{10:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(3),l=n.n(o),r=(n(9),n(1)),i=function(e){return c.a.createElement("div",{id:"inputbox",className:"component"},c.a.createElement("h2",null,"List of candidate items:"),c.a.createElement("textarea",{id:"inputarea",onChange:function(t){var n=function(e){return e.split(/\r\n|\r|\n/).filter((function(e){return!e.match(/^\s*$/)}))}(t.target.value);e.onChange(n)}}))},u=function(e){return c.a.createElement("div",{id:"control",className:"component"},c.a.createElement("button",{onClick:e.onStart},"Start"),c.a.createElement("button",{onClick:e.onStop},"Stop"))},s=function(e){var t=function(t){return t!==e.selected?"item-default":e.finished?"item-winner":"item-selected"};return e.itemList.map((function(e,n){return c.a.createElement(m,{key:n+"-"+e,itemLabel:e,select:t(n)})}))},m=function(e){return c.a.createElement("div",{className:"item ".concat(e.select)},e.itemLabel)},f=function(e){var t=e.itemList||[];return c.a.createElement("div",{className:"container component"},c.a.createElement(s,{itemList:t,selected:e.selected,finished:e.finished}))},d=function(){var e=Object(a.useState)([]),t=Object(r.a)(e,2),n=t[0],o=t[1],l=Object(a.useState)(-1),s=Object(r.a)(l,2),m=s[0],d=s[1],v=Object(a.useState)(null),h=Object(r.a)(v,2),p=h[0],b=h[1],g=Object(a.useState)(-1),E=Object(r.a)(g,2),S=E[0],j=E[1],O=Object(a.useState)(!1),L=Object(r.a)(O,2),I=L[0],k=L[1],C=function(e){var t=(e+1)%n.length;return console.log("Selected item: (".concat(t,", ").concat(n[t],")")),t},N=function(e){return clearInterval(e),null};return c.a.createElement("div",null,c.a.createElement(i,{onChange:function(e){o(e),d(-1),j(-1)}}),c.a.createElement(u,{onStart:function(){null===p?0!==n.length?(k(!0),b(setInterval((function(){d(C)}),100))):console.log("items are empty"):console.log("intervalId is not null: ".concat(p))},onStop:function(){if(console.log("onStop() called"),I){var e=Math.floor(Math.random()*n.length)+n.length;j(e>0?e:1),b((function(e){return clearInterval(e),setInterval((function(){j((function(e){var t=e-1;return console.log("count = ".concat(t)),d(C),0===t&&(b(N),k(!1)),t}))}),500)}))}else console.log("Roulette is not rolling.")}}),c.a.createElement(f,{itemList:n,selected:m,finished:0===S&&!I}))};l.a.render(c.a.createElement(d,null),document.getElementById("root"))},4:function(e,t,n){e.exports=n(10)},9:function(e,t,n){}},[[4,1,2]]]);
//# sourceMappingURL=main.1421f1e1.chunk.js.map