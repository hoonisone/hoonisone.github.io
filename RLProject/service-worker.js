if(!self.define){let e,i={};const t=(t,s)=>(t=new URL(t+".js",s).href,i[t]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=i,document.head.appendChild(e)}else e=t,importScripts(t),i()})).then((()=>{let e=i[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(s,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const d=e=>t(e,r),c={module:{uri:r},exports:o,require:d};i[r]=Promise.all(s.map((e=>c[e]||d(e)))).then((e=>(n(...e),o)))}}define(["./workbox-d249b2c8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"index.html",revision:"f16731b151df966cd03f9d8fbc3c354d"},{url:"main.js",revision:"4427ed996274b6f89ca4be362c846b1a"},{url:"main.js.LICENSE.txt",revision:"1625e66d3282fd3aab807f2bf5b363d3"}],{})}));