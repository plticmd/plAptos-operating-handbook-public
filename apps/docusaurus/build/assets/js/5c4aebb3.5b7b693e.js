"use strict";(self.webpackChunkaptos_docs=self.webpackChunkaptos_docs||[]).push([[374],{87977:(e,t,n)=>{n.d(t,{Ay:()=>i});var s=n(63159),r=n(83581);function o(e){const t={a:"a",admonition:"admonition",p:"p",...(0,r.R)(),...e.components};return(0,s.jsx)(t.admonition,{title:"Beta",type:"info",children:(0,s.jsxs)(t.p,{children:["\u30a4\u30f3\u30c7\u30af\u30b5\u30fcAPI\u3001\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u30b9\u30c8\u30ea\u30fc\u30e0\u30b5\u30fc\u30d3\u30b9\u3001\u30ab\u30b9\u30bf\u30e0\u30d7\u30ed\u30bb\u30c3\u30b5\u30fc\u306f\u73fe\u5728\u30d9\u30fc\u30bf\u7248\u3067\u3059\u3002\u767a\u751f\u3057\u305f\u554f\u984c\u306f\u3001",(0,s.jsx)(t.a,{href:"https://github.com/aptos-labs/aptos-indexer-processors/issues/new/choose",children:"aptos-indexer-processors"}),"\u30ea\u30dd\u30b8\u30c8\u30ea\u306bissue\u3092\u4f5c\u6210\u3057\u3066\u5831\u544a\u3057\u3066\u304f\u3060\u3055\u3044\u3002"]})})}function i(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},98865:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>a,default:()=>x,frontMatter:()=>i,metadata:()=>c,toc:()=>p});var s=n(63159),r=n(83581),o=n(87977);const i={title:"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u30b9\u30c8\u30ea\u30fc\u30e0\u30b5\u30fc\u30d3\u30b9"},a="\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u30b9\u30c8\u30ea\u30fc\u30e0\u30b5\u30fc\u30d3\u30b9",c={id:"indexer/txn-stream/index",title:"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u30b9\u30c8\u30ea\u30fc\u30e0\u30b5\u30fc\u30d3\u30b9",description:"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u30b9\u30c8\u30ea\u30fc\u30e0\u30b5\u30fc\u30d3\u30b9\u306f\u3001Aptos\u30d6\u30ed\u30c3\u30af\u30c1\u30a7\u30fc\u30f3\u306b\u6ce8\u76ee\u3057\u3001\u30d6\u30ed\u30c3\u30af\u30c1\u30a7\u30fc\u30f3\u51e6\u7406\u4e2d\u306b\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3092\u767a\u884c\u3059\u308b\u30b5\u30fc\u30d3\u30b9\u3067\u3059\u3002\u3053\u308c\u3089\u306e\u30c9\u30ad\u30e5\u30e1\u30f3\u30c8\u3067\u306f\u3001\u3053\u306e\u30b7\u30b9\u30c6\u30e0\u304c\u3069\u306e\u3088\u3046\u306b\u6a5f\u80fd\u3059\u308b\u304b\u3001Labs-Hosted\u30a4\u30f3\u30b9\u30bf\u30f3\u30b9\u306e\u4f7f\u7528\u65b9\u6cd5\u3001\u304a\u3088\u3073\u305d\u308c\u3092\u81ea\u5206\u3067\u30c7\u30d7\u30ed\u30a4\u3059\u308b\u65b9\u6cd5\u306b\u3064\u3044\u3066\u89e3\u8aac\u3057\u307e\u3059\u3002",source:"@site/i18n/ja/docusaurus-plugin-content-docs/current/indexer/txn-stream/index.md",sourceDirName:"indexer/txn-stream",slug:"/indexer/txn-stream/",permalink:"/indexer/txn-stream/",draft:!1,unlisted:!1,editUrl:"https://github.com/aptos-labs/developer-docs/edit/main/apps/docusaurus/docs/indexer/txn-stream/index.md",tags:[],version:"current",lastUpdatedAt:1713439719,formattedLastUpdatedAt:"2024\u5e744\u670818\u65e5",frontMatter:{title:"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u30b9\u30c8\u30ea\u30fc\u30e0\u30b5\u30fc\u30d3\u30b9"},sidebar:"appSidebar",previous:{title:"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306e\u89e3\u6790",permalink:"/indexer/custom-processors/parsing-txns"},next:{title:"\u30e9\u30dc\u304c\u30db\u30b9\u30c8\u3059\u308b\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3 \u30b9\u30c8\u30ea\u30fc\u30e0\u30b5\u30fc\u30d3\u30b9",permalink:"/indexer/txn-stream/labs-hosted"}},d={},p=[];function u(e){const t={h1:"h1",p:"p",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u30b9\u30c8\u30ea\u30fc\u30e0\u30b5\u30fc\u30d3\u30b9",children:"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u30b9\u30c8\u30ea\u30fc\u30e0\u30b5\u30fc\u30d3\u30b9"}),"\n","\n","\n",(0,s.jsx)(o.Ay,{}),"\n",(0,s.jsx)(t.p,{children:"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u30b9\u30c8\u30ea\u30fc\u30e0\u30b5\u30fc\u30d3\u30b9\u306f\u3001Aptos\u30d6\u30ed\u30c3\u30af\u30c1\u30a7\u30fc\u30f3\u306b\u6ce8\u76ee\u3057\u3001\u30d6\u30ed\u30c3\u30af\u30c1\u30a7\u30fc\u30f3\u51e6\u7406\u4e2d\u306b\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3092\u767a\u884c\u3059\u308b\u30b5\u30fc\u30d3\u30b9\u3067\u3059\u3002\u3053\u308c\u3089\u306e\u30c9\u30ad\u30e5\u30e1\u30f3\u30c8\u3067\u306f\u3001\u3053\u306e\u30b7\u30b9\u30c6\u30e0\u304c\u3069\u306e\u3088\u3046\u306b\u6a5f\u80fd\u3059\u308b\u304b\u3001Labs-Hosted\u30a4\u30f3\u30b9\u30bf\u30f3\u30b9\u306e\u4f7f\u7528\u65b9\u6cd5\u3001\u304a\u3088\u3073\u305d\u308c\u3092\u81ea\u5206\u3067\u30c7\u30d7\u30ed\u30a4\u3059\u308b\u65b9\u6cd5\u306b\u3064\u3044\u3066\u89e3\u8aac\u3057\u307e\u3059\u3002"})]})}function x(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},83581:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>a});var s=n(11855);const r={},o=s.createContext(r);function i(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);