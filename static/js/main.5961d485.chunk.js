(this["webpackJsonpreverse-geocoding-page"]=this["webpackJsonpreverse-geocoding-page"]||[]).push([[0],{60:function(e,t,n){},61:function(e,t,n){},85:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(9),i=n.n(c),s=(n(60),n(34)),o=n(33),l=(n(61),n(129)),d=n(128),j={API_KEY:"AIzaSyBGZ_POOVCGhxFo1olG8gBQKL6zYJNmVFc"},u=n(123),h=n(127),p=n(126),m=n(118),b=n(124),f=n(125),O=n(122),g=n(6),x=function(e){var t=e.header,n=void 0===t?[]:t,a=e.data,r=void 0===a?[]:a;return Object(g.jsx)(m.a,{component:O.a,children:Object(g.jsxs)(u.a,{"aria-label":"simple table",children:[Object(g.jsx)(b.a,{children:Object(g.jsx)(f.a,{children:n.map((function(e){return Object(g.jsx)(p.a,{children:e.name},"head_".concat(e.key))}))})}),Object(g.jsx)(h.a,{children:r.map((function(e,t){return Object(g.jsx)(f.a,{children:n.map((function(t,n){return Object(g.jsx)(p.a,{children:e[t.key]},n)}))},t)}))})]})})},v=n(66).default;var y=function(){var e=Object(a.useState)(""),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(null),i=Object(o.a)(c,2),u=i[0],h=i[1];return Object(g.jsx)("div",{className:"App",children:Object(g.jsxs)("header",{className:"App-header",children:[Object(g.jsx)("h1",{children:"\u7d93\u7def\u5ea6\u5730\u5740\u8f49\u63db\u5668"}),Object(g.jsxs)("section",{className:"action__bar",children:[Object(g.jsx)("p",{children:"\u8f38\u5165\u7d93\u7def\u5ea6\u6642\uff0c\u7d93\u5728\u524d\uff0c\u7def\u5728\u5f8c\uff0c\u4e2d\u9593\u8acb\u7a7a\u683c"}),Object(g.jsx)(l.a,{variant:"contained",color:"primary",style:{marginLeft:"20px"},onClick:function(){var e=n.trim().split("\n").map((function(e){return e.trim().split(" ").map((function(e){return e.trim()})).reverse().join(",")})),t=[];e.forEach((function(e){var n=v.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=".concat(e,"&language=zh-TW&result_type=street_address&location_type=ROOFTOP&key=").concat(j.API_KEY));t.push(n)})),Promise.all(t).then((function(e){var t=new Map;e.forEach((function(e){var n=e.config.url.split("?")[1].split("&")[0].slice(7).split(",").reverse().join(",");if(e&&e.data&&e.data.results&&e.data.results.length){var a=e.data.results[0];t.set(n,a.formatted_address)}else t.set(n,"-- error --")}));var a=n.trim().split("\n").map((function(e){var n=e.trim().split(" ").map((function(e){return e.trim()})).join(",");return{latlng:n.split(",").join(" "),address:t.get("".concat(n))}}));h(a)})).catch((function(e){window.alert(e),h(null)}))},disabled:!n,children:"\u8f49\u63db"})," ","|",Object(g.jsx)(l.a,{variant:"outlined",color:"primary",style:{marginLeft:"10px"},onClick:function(){r(""),h(null)},children:"\u6e05\u9664"})]}),Object(g.jsxs)("main",{className:"transformer",children:[Object(g.jsx)(d.a,{label:"\u8f38\u5165\u7d93\u7def\u5ea6\uff0c\u4e00\u7b46\u4e00\u884c",type:"text",variant:"outlined",value:n,onChange:function(e){return r(e.target.value)},multiline:!0,rows:10,placeholder:"121.721183 25.120552"}),Object(g.jsxs)("h3",{children:["\u8f49\u63db\u7d50\u679c",Object(g.jsx)("a",Object(s.a)(Object(s.a)({},function(){if(u){var e="ADDRESSES_".concat((new Date).toLocaleString(),".csv"),t="\u7d93,\u7def,\u5730\u5740\n";return u.forEach((function(e){var n="".concat(e.latlng.trim().split(" ").join(","),",").concat(e.address,"\n");t+=n})),{href:"data:text/csv;charset=utf-8,"+encodeURI(t),download:e}}return{href:""}}()),{},{style:{textDecoration:"none"},children:Object(g.jsx)(l.a,{variant:"contained",color:"primary",style:{marginLeft:"20px"},disabled:!u,children:"\u4e0b\u8f09 CSV"})}))]}),u?Object(g.jsx)(x,{header:[{key:"latlng",name:"\u7d93\u7def\u5ea6"},{key:"address",name:"\u5730\u5740"}],data:u}):Object(g.jsx)("p",{children:"-- no result --"})]})]})})},_=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,131)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))};i.a.render(Object(g.jsx)(r.a.StrictMode,{children:Object(g.jsx)(y,{})}),document.getElementById("root")),_()}},[[85,1,2]]]);
//# sourceMappingURL=main.5961d485.chunk.js.map