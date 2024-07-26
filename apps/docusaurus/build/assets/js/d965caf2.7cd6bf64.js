"use strict";(self.webpackChunkaptos_docs=self.webpackChunkaptos_docs||[]).push([[4761],{29550:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>t,contentTitle:()=>c,default:()=>v,frontMatter:()=>l,metadata:()=>i,toc:()=>d});var o=r(63159),s=r(83581);const l={title:"Move Prover\u30e6\u30fc\u30b6\u30fc\u30ac\u30a4\u30c9"},c=void 0,i={id:"move/prover/prover-guide",title:"Move Prover\u30e6\u30fc\u30b6\u30fc\u30ac\u30a4\u30c9",description:"\u3053\u308c\u306fMove Prover\u306e\u30e6\u30fc\u30b6\u30fc\u30ac\u30a4\u30c9\u3067\u3059\u3002\u3053\u306e\u30c9\u30ad\u30e5\u30e1\u30f3\u30c8\u306b\u306f Move\u4ed5\u69d8\u8a00\u8a9e\u304c\u4ed8\u5c5e\u3057\u3066\u3044\u307e\u3059\u3002\u8a73\u7d30\u306f\u3001\u4ee5\u4e0b\u306e\u30bb\u30af\u30b7\u30e7\u30f3\u3092\u5fa1\u89a7\u4e0b\u3055\u3044\u3002",source:"@site/i18n/ja/docusaurus-plugin-content-docs/current/move/prover/prover-guide.md",sourceDirName:"move/prover",slug:"/move/prover/prover-guide",permalink:"/move/prover/prover-guide",draft:!1,unlisted:!1,editUrl:"https://github.com/aptos-labs/developer-docs/edit/main/apps/docusaurus/docs/move/prover/prover-guide.md",tags:[],version:"current",lastUpdatedAt:1721049661,formattedLastUpdatedAt:"2024\u5e747\u670815\u65e5",frontMatter:{title:"Move Prover\u30e6\u30fc\u30b6\u30fc\u30ac\u30a4\u30c9"},sidebar:"appSidebar",previous:{title:"Move Prover",permalink:"/move/prover/move-prover"},next:{title:"Move Specification Language",permalink:"/move/prover/spec-lang"}},t={},d=[{value:"Move Prover\u306e\u5b9f\u884c",id:"move-prover\u306e\u5b9f\u884c",level:2},{value:"\u30bf\u30fc\u30b2\u30c3\u30c8\u30d5\u30a3\u30eb\u30bf\u30ea\u30f3\u30b0",id:"\u30bf\u30fc\u30b2\u30c3\u30c8\u30d5\u30a3\u30eb\u30bf\u30ea\u30f3\u30b0",level:3},{value:"\u8a3c\u660e\u8005\u30aa\u30d7\u30b7\u30e7\u30f3",id:"\u8a3c\u660e\u8005\u30aa\u30d7\u30b7\u30e7\u30f3",level:3},{value:"Prover\u69cb\u6210\u30d5\u30a1\u30a4\u30eb",id:"prover\u69cb\u6210\u30d5\u30a1\u30a4\u30eb",level:3},{value:"Prover\u8a3a\u65ad",id:"prover\u8a3a\u65ad",level:2},{value:"\u4e88\u671f\u3057\u306a\u3044\u4e2d\u6b62",id:"\u4e88\u671f\u3057\u306a\u3044\u4e2d\u6b62",level:3},{value:"\u4e8b\u5f8c\u6761\u4ef6\u3067\u306e\u5931\u6557",id:"\u4e8b\u5f8c\u6761\u4ef6\u3067\u306e\u5931\u6557",level:3},{value:"Move Prover\u306e\u30c7\u30d0\u30c3\u30b0",id:"move-prover\u306e\u30c7\u30d0\u30c3\u30b0",level:2}];function a(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:["\u3053\u308c\u306fMove Prover\u306e\u30e6\u30fc\u30b6\u30fc\u30ac\u30a4\u30c9\u3067\u3059\u3002\u3053\u306e\u30c9\u30ad\u30e5\u30e1\u30f3\u30c8\u306b\u306f ",(0,o.jsx)(n.a,{href:"/move/prover/spec-lang",children:"Move\u4ed5\u69d8\u8a00\u8a9e"}),"\u304c\u4ed8\u5c5e\u3057\u3066\u3044\u307e\u3059\u3002\u8a73\u7d30\u306f\u3001\u4ee5\u4e0b\u306e\u30bb\u30af\u30b7\u30e7\u30f3\u3092\u5fa1\u89a7\u4e0b\u3055\u3044\u3002"]}),"\n",(0,o.jsx)(n.h2,{id:"move-prover\u306e\u5b9f\u884c",children:"Move Prover\u306e\u5b9f\u884c"}),"\n",(0,o.jsxs)(n.p,{children:["Move Prover\u306f",(0,o.jsx)(n.a,{href:"/tools/aptos-cli/use-cli/use-aptos-cli",children:"Aptos CLI"}),"\u3092\u4ecb\u3057\u3066\u547c\u3073\u51fa\u3055\u308c\u307e\u3059\u3002CLI\u3092\u547c\u3073\u51fa\u3059\u306b\u306f\u3001",(0,o.jsx)(n.a,{href:"/move/book/packages",children:(0,o.jsx)(n.em,{children:"Move \u30d1\u30c3\u30b1\u30fc\u30b8"})}),"\u304c\u914d\u7f6e\u3055\u308c\u3066\u3044\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059\u3002"]}),"\n",(0,o.jsxs)(n.p,{children:["\u6700\u3082\u5358\u7d14\u306a\u30b1\u30fc\u30b9\u3067\u306f\u3001Move\u30d1\u30c3\u30b1\u30fc\u30b8\u306f\u3001\u4e00\u9023\u306e",(0,o.jsx)(n.code,{children:".move"}),"\u30d5\u30a1\u30a4\u30eb\u3092\u542b\u3080\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u3068\u3001\u540d\u524d\u306e\u30de\u30cb\u30d5\u30a7\u30b9\u30c8",(0,o.jsx)(n.code,{children:"Move.toml"}),"\u306b\u3088\u3063\u3066\u5b9a\u7fa9\u3055\u308c\u307e\u3059\u3002",(0,o.jsx)(n.code,{children:"aptos move init --name <name>"}),"\u30b3\u30de\u30f3\u30c9\u3092\u5b9f\u884c\u3059\u308b\u3068\u3001\u7279\u5b9a\u306e\u5834\u6240\u3078\u65b0\u3057\u3044Move\u30d1\u30c3\u30b1\u30fc\u30b8\u3092\u4f5c\u6210\u51fa\u6765\u307e\u3059\u3002"]}),"\n",(0,o.jsxs)(n.p,{children:["\u30d1\u30c3\u30b1\u30fc\u30b8\u304c\u5b58\u5728\u3057\u305f\u3089\u3001\u30c6\u30b9\u30c8\u3059\u308b\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u304b\u3089\u3001\u307e\u305f\u306f\u305d\u306e\u30d1\u30b9\u3092",(0,o.jsx)(n.code,{children:"--package-dir"}),"\u5f15\u6570\u3078\u6307\u5b9a\u3057\u3066Move Prover \u3092\u547c\u3073\u51fa\u3057\u307e\u3059\u3002"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"\u73fe\u5728\u306e\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u5185\u306e\u30d1\u30c3\u30b1\u30fc\u30b8\u306e\u30bd\u30fc\u30b9\u3092\u8a3c\u660e\u3057\u307e\u3059\u3002"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"aptos move prove\n"})}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"\u30d1\u30c3\u30b1\u30fc\u30b8\u306e\u30bd\u30fc\u30b9\u3092\u7279\u5b9a\u3057\u3066\u76f4\u63a5\u8a3c\u660e\u3057\u307e\u3059\u3002"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"aptos move prove --package-dir <path>\n"})}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["\u300cAptos CLI\u306e\u4f7f\u7528\u300d\u306e",(0,o.jsx)(n.a,{href:"/move/move-on-aptos/cli#proving-move",children:"Move\u306e\u8a3c\u660e"})," \u30bb\u30af\u30b7\u30e7\u30f3\u3067\u3001\u51fa\u529b\u4f8b\u3068\u305d\u306e\u4ed6\u306e\u5229\u7528\u53ef\u80fd\u306a\u30aa\u30d7\u30b7\u30e7\u30f3\u3092\u5fa1\u89a7\u4e0b\u3055\u3044\u3002"]}),"\n",(0,o.jsx)(n.h3,{id:"\u30bf\u30fc\u30b2\u30c3\u30c8\u30d5\u30a3\u30eb\u30bf\u30ea\u30f3\u30b0",children:"\u30bf\u30fc\u30b2\u30c3\u30c8\u30d5\u30a3\u30eb\u30bf\u30ea\u30f3\u30b0"}),"\n",(0,o.jsxs)(n.p,{children:["\u30c7\u30d5\u30a9\u30eb\u30c8\u3067\u306f\u3001",(0,o.jsx)(n.code,{children:"aptos move prove"}),"\u30b3\u30de\u30f3\u30c9\u306f\u30d1\u30c3\u30b1\u30fc\u30b8\u306e\u5168\u3066\u306e\u30d5\u30a1\u30a4\u30eb\u3092\u691c\u8a3c\u3057\u307e\u3059\u3002\u5927\u898f\u6a21\u306a\u30d1\u30c3\u30b1\u30fc\u30b8\u306e\u53cd\u5fa9\u958b\u767a\u4e2d\u306f\u3001\u4ee5\u4e0b\u3088\u3046\u306a",(0,o.jsx)(n.code,{children:"-f"})," (",(0,o.jsx)(n.code,{children:"--filter"}),")\u30aa\u30d7\u30b7\u30e7\u30f3\u3092\u4f7f\u7528\u3057\u3066\u7279\u5b9a\u306e\u30d5\u30a1\u30a4\u30eb\u306e\u691c\u8a3c\u3078\u96c6\u4e2d\u3059\u308b\u3068\u52b9\u679c\u7684\u3067\u3059\u3002"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",metastring:"script",children:"aptos move prove -f coin\n"})}),"\n",(0,o.jsxs)(n.p,{children:["\u901a\u5e38\u3001",(0,o.jsx)(n.code,{children:"-f"}),"\u30aa\u30d7\u30b7\u30e7\u30f3\u3078\u63d0\u4f9b\u3055\u308c\u305f\u6587\u5b57\u5217\u304c\u30bd\u30fc\u30b9\u306e\u30d5\u30a1\u30a4\u30eb\u540d\u306e\u3069\u3053\u304b\u3078\u542b\u307e\u308c\u3066\u3044\u308b\u5834\u5408\u3001\u30bd\u30fc\u30b9\u306f\u691c\u8a3c\u3078\u542b\u3081\u3089\u308c\u307e\u3059\u3002"]}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsx)(n.p,{children:"\u6ce8: Move Prover\u306f\u3001\u30e2\u30b8\u30e5\u30fc\u30eb\u3092\u3072\u3068\u3064\u305a\u3064\u691c\u8a3c\u3059\u308b\u5834\u5408\u3068\u5168\u3066\u3092\u4e00\u5ea6\u3067\u691c\u8a3c\u3059\u308b\u5834\u5408\u3067\u610f\u5473\u4e0a\u306e\u9055\u3044\u304c\u7121\u3044\u3088\u3046\u306b\u3057\u307e\u3059\u3002"}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["\u305f\u3060\u3057\u3001\u5168\u3066\u306e\u30e2\u30b8\u30e5\u30fc\u30eb\u3092\u691c\u8a3c\u3059\u308b\u4e8b\u304c\u76ee\u7684\u3067\u3042\u308b\u5834\u5408\u306f\u3001\u9806\u6b21\u691c\u8a3c\u3059\u308b\u3088\u308a1\u56de\u306e",(0,o.jsx)(n.code,{children:"aptos move prove"}),"\u5b9f\u884c\u3067\u691c\u8a3c\u3059\u308b\u65b9\u304c\u3001\u8457\u3057\u304f\u9ad8\u901f\u3067\u3059\u3002"]}),"\n",(0,o.jsx)(n.h3,{id:"\u8a3c\u660e\u8005\u30aa\u30d7\u30b7\u30e7\u30f3",children:"\u8a3c\u660e\u8005\u30aa\u30d7\u30b7\u30e7\u30f3"}),"\n",(0,o.jsxs)(n.p,{children:["Move Prover\u306f\u3001",(0,o.jsx)(n.code,{children:"aptos move prove <options>"}),"\u306e\u547c\u3073\u51fa\u3057\u3067\u6e21\u3059\u30aa\u30d7\u30b7\u30e7\u30f3(\u4e0a\u8a18\u306e\u30d5\u30a3\u30eb\u30bf\u30fc\u30aa\u30d7\u30b7\u30e7\u30f3\u7b49)\u304c\u3044\u304f\u3064\u304b\u6709\u308a\u307e\u3059\u3002\u6700\u3082\u3088\u304f\u4f7f\u7528\u3055\u308c\u308b\u30aa\u30d7\u30b7\u30e7\u30f3\u306f",(0,o.jsx)(n.code,{children:"-t"}),"(",(0,o.jsx)(n.code,{children:"--trace"}),")\u30aa\u30d7\u30b7\u30e7\u30f3\u3067\u3001\u3053\u308c\u306b\u3088\u308a\u3001\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u305f\u6642Move Prover\u304c\u3088\u308a\u591a\u304f\u306e\u8a3a\u65ad\u3092\u751f\u6210\u3057\u307e\u3059\u3002"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",metastring:"script",children:"aptos move prove -f coin -t\n"})}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"aptos move prove --help"}),"\u306e\u5b9f\u884c\u3067\u3001\u5168\u3066\u306e\u30b3\u30de\u30f3\u30c9\u30e9\u30a4\u30f3\u30aa\u30d7\u30b7\u30e7\u30f3\u306e\u30ea\u30b9\u30c8\u3092\u8868\u793a\u51fa\u6765\u307e\u3059\u3002"]}),"\n",(0,o.jsx)(n.h3,{id:"prover\u69cb\u6210\u30d5\u30a1\u30a4\u30eb",children:"Prover\u69cb\u6210\u30d5\u30a1\u30a4\u30eb"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"Prover.toml"}),"\u3068\u3044\u3046\u540d\u524d\u306eMove Prover\u69cb\u6210\u30d5\u30a1\u30a4\u30eb\u3092\u4f5c\u6210\u3059\u308b\u4e8b\u3082\u51fa\u6765\u307e\u3059\u3002\u3053\u306e\u30d5\u30a1\u30a4\u30eb\u306f\u30d1\u30c3\u30b1\u30fc\u30b8\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u306e\u30eb\u30fc\u30c8\u306e\u30de\u30cb\u30d5\u30a7\u30b9\u30c8\u30d5\u30a1\u30a4\u30eb\u3068\u4e26\u884c\u3057\u3066\u5b58\u5728\u3057\u307e\u3059\u3002\u4f8b\u3048\u3070\u3001\u30d1\u30c3\u30b1\u30fc\u30b8\u306e\u30c8\u30ec\u30fc\u30b9\u3092\u30c7\u30d5\u30a9\u30eb\u30c8\u3067\u53ef\u80fd\u3068\u3059\u308b\u306b\u306f\u3001",(0,o.jsx)(n.code,{children:"Prover.toml"}),"\u30d5\u30a1\u30a4\u30eb\u3092\u4ee5\u4e0b\u306e\u69cb\u6210\u3078\u8ffd\u52a0\u3057\u307e\u3059\u3002"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-toml",children:'[prover]\nauto_trace_level = "VerifiedFunction"\n'})}),"\n",(0,o.jsxs)(n.p,{children:["\u4ee5\u4e0b\u306e\u4f8b",(0,o.jsx)(n.code,{children:".toml"}),"\u3067\u6700\u3082\u3088\u304f\u4f7f\u7528\u3055\u308c\u308b\u30aa\u30d7\u30b7\u30e7\u30f3\u3092\u898b\u3064\u3051\u3066\u4e0b\u3055\u3044\u3002\u3053\u308c\u3092\u5207\u308a\u53d6\u3063\u3066\u8cbc\u308a\u4ed8\u3051\u3001\u9069\u5b9c\u63a1\u7528\u51fa\u6765\u307e\u3059(\u9069\u5b9c\u3001\u8868\u793a\u3055\u308c\u305f\u5024\u306e\u30c7\u30d5\u30a9\u30eb\u30c8\u3092\u8abf\u6574\u3057\u307e\u3059)\u3002"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-toml",children:'# \u51e0\u9577\u30ec\u30d9\u30eb\n# \u53ef\u80fd\u306a\u5024: "ERROR", "WARN", "INFO", "DEBUG". \u5404\u30ec\u30d9\u30eb\u306f\u524d\u306e\u30ec\u30d9\u30eb\u306e\u51fa\u529b\u3092\u542b\u6709\u3057\u307e\u3059\u3002\nverbosity_level = "INFO"\n\n[prover]\n# \u81ea\u52d5\u30c8\u30ec\u30fc\u30b9\u30ec\u30d9\u30eb\u306e\u8a2d\u5b9a, Move Prover\u304c\u691c\u8a3c\u30a8\u30e9\u30fc\u306b\u5bfe\u3057\u751f\u6210\u3059\u308b\u5206\u6790\u3092\u5f37\u5316\u3059\u308b\u3002\n# \u53ef\u80fd\u306a\u5024: "Off", "VerifiedFunction", "AllFunctions"\nauto_trace_level = "Off"\n\n# \u5206\u6790\u3092\u5831\u544a\u3059\u308b\u305f\u3081\u306e\u6700\u5c0f\u9650\u306e\u53b3\u683c\u30ec\u30d9\u30eb\n# \u53ef\u80fd\u306a\u5024: "Error", "Warning", "Note"\nreport_severity = "Warning"\n\n[\u30d0\u30c3\u30af\u30a8\u30f3\u30c9]\n# \u30bd\u30eb\u30d0\u30fc\u30d0\u30c3\u30af\u30a8\u30f3\u30c9\u306e\u79d2\u5358\u4f4d\u30bf\u30a4\u30e0\u30a2\u30a6\u30c8\u3002\u6ce8\u610f: \u3053\u308c\u306f\u30bd\u30d5\u30c8\u30bf\u30a4\u30e0\u30a2\u30a6\u30c8\u3067\u3042\u308a\u5e38\u6642\u5c0a\u91cd\u3055\u308c\u308b\u3082\u306e\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3002 \nvc_timeout = 40\n\n# \u30bd\u30eb\u30d0\u30fc\u30d0\u30c3\u30af\u30a8\u30f3\u30c9\u306e\u30e9\u30f3\u30c0\u30e0\u30b7\u30fc\u30c9\u3002\u30bd\u30eb\u30d0\u30fc\u306f\u8a66\u884c\u932f\u8aa4\u3092\u884c\u3063\u3066\u3044\u308b\u305f\u3081\u3001\u7570\u306a\u308b\u30b7\u30fc\u30c9\u3067\u306f\u691c\u8a3c\u30e9\u30f3\u30bf\u30a4\u30e0\u304c\u7570\u306a\u308b\u5834\u5408\u304c\u3042\u308a\u307e\u3059\u3002 \nrandom_seed = 1\n\n# \u691c\u8a3c\u6761\u4ef6\u306e\u540c\u6642\u30c1\u30a7\u30c3\u30af\u3092\u4eee\u5b9a\u3059\u308b\u30d7\u30ed\u30bb\u30c3\u30b5\u30fc\u30b3\u30a2\u306e\u6570\u3002\nproc_cores = 4\n'})}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["\u30d2\u30f3\u30c8: \u30ed\u30fc\u30ab\u30eb\u691c\u8a3c\u306e\u5834\u5408\u3001\u30bf\u30fc\u30f3\u30a2\u30e9\u30a6\u30f3\u30c9 \u30b5\u30a4\u30af\u30eb\u3092\u9ad8\u901f\u5316\u3059\u308b\u305f\u3081\u3001\u7a4d\u6975\u7684\u306a\u6570(\u5b9f\u969b\u306e\u30b3\u30a2\u6570)\u3078",(0,o.jsx)(n.code,{children:"proc_cores"}),"\u3092\u8a2d\u5b9a\u3059\u308b\u4e8b\u3092\u304a\u52e7\u3081\u3057\u307e\u3059\u3002"]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"prover\u8a3a\u65ad",children:"Prover\u8a3a\u65ad"}),"\n",(0,o.jsx)(n.p,{children:"Move Prover\u304c\u691c\u8a3c\u30a8\u30e9\u30fc\u3092\u767a\u898b\u3059\u308b\u3068\u3001\u30b3\u30f3\u30d1\u30a4\u30e9\u3084\u30c7\u30d0\u30c3\u30ac\u3068\u540c\u69d8\u306e\u30b9\u30bf\u30a4\u30eb\u3067\u6a19\u6e96\u51fa\u529b\u3078\u8a3a\u65ad\u7d50\u679c\u3092\u51fa\u529b\u3057\u307e\u3059\u3002\u4ee5\u4e0b\u3067\u306f\u3001\u9032\u5316\u3059\u308b\u4f8b\u306b\u57fa\u3065\u3044\u3066\u3001\u7570\u306a\u308b\u7a2e\u985e\u306e\u8a3a\u65ad\u306e\u89e3\u8aac\u3092\u3057\u307e\u3059\u3002"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-move",children:"module 0x42::m {\n    struct Counter has key {\n        value: u8,\n    }\n\n    public fun increment(a: address) acquires Counter {\n        let r = borrow_global_mut<Counter>(a);\n        r.value = r.value + 1;\n    }\n\n    spec increment {\n        aborts_if !exists<Counter>(a);\n        ensures global<Counter>(a).value == old(global<Counter>(a)).value + 1;\n    }\n}\n"})}),"\n",(0,o.jsx)(n.p,{children:"\u7570\u306a\u308b\u7a2e\u985e\u306e\u8a3a\u65ad\u3092\u89e3\u8aac\u3059\u308b\u969b\u3001\u3053\u306e\u4f8b\u3092\u5909\u66f4\u3057\u307e\u3059\u3002\nWe will modify this example as we demonstrate different types of diagnoses."}),"\n",(0,o.jsx)(n.h3,{id:"\u4e88\u671f\u3057\u306a\u3044\u4e2d\u6b62",children:"\u4e88\u671f\u3057\u306a\u3044\u4e2d\u6b62"}),"\n",(0,o.jsx)(n.p,{children:"\u4e0a\u8a18\u306e\u4f8b\u3067\u6025\u306bMove Prover\u3092\u5b9f\u884c\u3059\u308b\u3068\u3001\u4ee5\u4e0b\u306e\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3059\u3002"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'error: abort not covered by any of the `aborts_if` clauses\n   \u250c\u2500 m.move:11:5\n   \u2502\n 8 \u2502           r.value = r.value + 1;\n   \u2502                             - abort happened here with execution failure\n   \xb7\n11 \u2502 \u256d     spec increment {\n12 \u2502 \u2502         aborts_if !exists<Counter>(a);\n13 \u2502 \u2502         ensures global<Counter>(a).value == old(global<Counter>(a)).value + 1;\n14 \u2502 \u2502     }\n   \u2502 \u2570\u2500\u2500\u2500\u2500\u2500^\n   \u2502\n   =     at m.move:6: increment\n   =         a = 0x29\n   =     at m.move:7: increment\n   =         r = &mmm.Counter{value = 255u8}\n   =     at m.move:8: increment\n   =         ABORTED\n\n{\n  "Error": "Move Prover failed: exiting with verification errors"\n}\n'})}),"\n",(0,o.jsxs)(n.p,{children:["Move Prover\u306f\u3001",(0,o.jsx)(n.code,{children:"u8"}),"\u306e\u5024255\u30781\u3092\u52a0\u7b97\u3059\u308b\u3068\u30aa\u30fc\u30d0\u30fc\u30d5\u30ed\u30fc\u304c\u767a\u751f\u3059\u308b\u30b5\u30f3\u30d7\u30eb\u30ab\u30a6\u30f3\u30bf\u3092\u751f\u6210\u3057\u307e\u3057\u305f\u3002\u3053\u306e\u30aa\u30fc\u30d0\u30fc\u30d5\u30ed\u30fc\u306f\u3001\u95a2\u6570\u306e\u4ed5\u69d8\u304c\u4e2d\u6b62\u52d5\u4f5c\u3092\u547c\u3073\u51fa\u3057\u3066\u3044\u308b\u3082\u306e\u306e\u3001\u95a2\u6570\u304c\u4e2d\u6b62\u3059\u308b\u6761\u4ef6\u304c\u4ed5\u69d8\u3067\u30ab\u30d0\u30fc\u3055\u308c\u3066\u3044\u306a\u3044\u5834\u5408\u767a\u751f\u3057\u307e\u3059\u3002"]}),"\n",(0,o.jsxs)(n.p,{children:["\u5b9f\u969b\u3001",(0,o.jsx)(n.code,{children:"aborts_if !exists<Counter>(a)"}),"\u3067\u306f\u30ea\u30bd\u30fc\u30b9\u304c\u5b58\u5728\u3057\u306a\u3044\u305f\u3081\u767a\u751f\u3059\u308b\u4e2d\u6b62\u306e\u307f\u3092\u30ab\u30d0\u30fc\u3057\u3001\u7b97\u8853\u30aa\u30fc\u30d0\u30fc\u30d5\u30ed\u30fc\u304c\u539f\u56e0\u3067\u767a\u751f\u3059\u308b\u4e2d\u6b62\u306f\u30ab\u30d0\u30fc\u3057\u307e\u305b\u3093\u3002"]}),"\n",(0,o.jsx)(n.p,{children:"\u4e0a\u8a18\u3092\u4fee\u6b63\u3057\u3066\u3001\u4ee5\u4e0b\u306e\u6761\u4ef6\u3092\u8ffd\u52a0\u3057\u3066\u307f\u307e\u3057\u3087\u3046\u3002"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-move",children:"module 0x42::m {\n  spec increment {\n      aborts_if global<Counter>(a).value == 255;\n      ...\n  }\n}\n"})}),"\n",(0,o.jsx)(n.p,{children:"\u3053\u308c\u3067\u3001Move Prover\u306f\u30a8\u30e9\u30fc\u7121\u3057\u3067\u6210\u529f\u3057\u307e\u3059\u3002"}),"\n",(0,o.jsx)(n.h3,{id:"\u4e8b\u5f8c\u6761\u4ef6\u3067\u306e\u5931\u6557",children:"\u4e8b\u5f8c\u6761\u4ef6\u3067\u306e\u5931\u6557"}),"\n",(0,o.jsxs)(n.p,{children:["\u4e0a\u8a18\u306e\u4f8b\u306e",(0,o.jsx)(n.code,{children:"ensures"}),"\u6761\u4ef6\u3078\u30a8\u30e9\u30fc\u3092\u6ce8\u5165\u3057\u3066\u307f\u307e\u3057\u3087\u3046\u3002"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-move",children:"module 0x42::m {\n  spec increment {\n      ensures global<Counter>(a).value == /*old*/(global<Counter>(a).value) + 1;\n  }\n}\n"})}),"\n",(0,o.jsx)(n.p,{children:"\u3053\u308c\u3067\u3001Move Prover\u306f\u6b21\u306e\u8a3a\u65ad\u3092\u751f\u6210\u3057\u307e\u3059\u3002"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'error: post-condition does not hold\n   \u250c\u2500 m.move:14:9\n   \u2502\n14 \u2502         ensures global<Counter>(a).value == /*old*/(global<Counter>(a).value) + 1;\n   \u2502         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n   \u2502\n   =     at m.move:6: increment\n   =         a = 0x29\n   =     at m.move:7: increment\n   =         r = &mmm.Counter{value = 0u8}\n   =     at m.move:8: increment\n   =     at m.move:9: increment\n   =     at m.move:12: increment (spec)\n   =     at m.move:15: increment (spec)\n   =     at m.move:13: increment (spec)\n   =     at m.move:14: increment (spec)\n\n{\n  "Error": "Move Prover failed: exiting with verification errors"\n}\n'})}),"\n",(0,o.jsxs)(n.p,{children:["\u30a8\u30e9\u30fc\u304c\u4f55\u3067\u3042\u308b\u304b\u306f\u5206\u304b\u3063\u3066\u3044\u307e\u3059\u304c(\u6ce8\u5165\u3057\u305f\u3070\u304b\u308a\u306a\u306e\u3067)\u51fa\u529b\u3067\u306f\u7279\u306b\u5206\u304b\u308a\u307e\u305b\u3093\u3002\u3053\u308c\u306f\u3001",(0,o.jsx)(n.code,{children:"ensures"}),"\u6761\u4ef6\u304c\u5b9f\u969b\u306f\u3069\u306e\u5024\u3067\u8a55\u4fa1\u3055\u308c\u305f\u306e\u304b\u76f4\u63a5\u78ba\u8a8d\u51fa\u6765\u306a\u3044\u305f\u3081\u3067\u3059\u3002\u3053\u308c\u3092\u78ba\u8a8d\u3059\u308b\u306b\u306f\u3001",(0,o.jsx)(n.code,{children:"-t( --trace)"}),"\u30aa\u30d7\u30b7\u30e7\u30f3\u3092\u4f7f\u7528\u3057\u307e\u3059\u3002\u3053\u306e\u30aa\u30d7\u30b7\u30e7\u30f3\u306f\u3001\u30bd\u30eb\u30d0\u30fc\u306b\u3068\u3063\u3066\u691c\u8a3c\u554f\u984c\u304c\u5c11\u3057\u96e3\u3057\u304f\u306a\u308b\u305f\u3081\u3001\u30c7\u30d5\u30a9\u30eb\u30c8\u3067\u306f\u6709\u52b9\u3068\u306a\u3063\u3066\u3044\u307e\u305b\u3093\u3002"]}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"--trace"}),"\u30aa\u30d7\u30b7\u30e7\u30f3\u306e\u4ee3\u308f\u308a\u3001\u3082\u3057\u304f\u306f",(0,o.jsx)(n.code,{children:"--trace"}),"\u30aa\u30d7\u30b7\u30e7\u30f3\u306b\u52a0\u3048\u3001\u6761\u4ef6\u3067\u7d44\u307f\u8fbc\u307f\u95a2\u6570",(0,o.jsx)(n.code,{children:"TRACE(exp)"}),"\u3092\u4f7f\u7528\u3057\u3066\u3001\u691c\u8a3c\u5931\u6557\u6642\u306b\u5024\u3092\u51fa\u529b\u3059\u308b\u5fc5\u8981\u304c\u3042\u308b\u5f0f\u3092\u660e\u793a\u7684\u306b\u30de\u30fc\u30af\u3059\u308b\u4e8b\u304c\u51fa\u6765\u307e\u3059\u3002"]}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsx)(n.p,{children:"\u6ce8\u610f: \u91cf\u5316\u8a18\u53f7\u306b\u4f9d\u5b58\u3059\u308b\u5f0f\u306f\u8ffd\u8de1\u51fa\u6765\u307e\u305b\u3093\u3002\u307e\u305f\u3001\u4ed5\u69d8\u95a2\u6570\u306b\u73fe\u308c\u308b\u5f0f\u3082\u73fe\u5728\u306f\u8ffd\u8de1\u51fa\u6765\u307e\u305b\u3093\u3002"}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"move-prover\u306e\u30c7\u30d0\u30c3\u30b0",children:"Move Prover\u306e\u30c7\u30d0\u30c3\u30b0"}),"\n",(0,o.jsxs)(n.p,{children:["Move Prover\u306f\u3001\u30d0\u30b0\u3084\u6b20\u9665\u306e\u3042\u308b\u9032\u5316\u3059\u308b\u30c4\u30fc\u30eb\u3067\u3059\u3002Move Prover\u304c\u57fa\u76e4\u3068\u306a\u308b\u30d0\u30c3\u30af\u30a8\u30f3\u30c9\u3078\u6e21\u3059\u51fa\u529b\u3078\u57fa\u3065\u3044\u3066\u3001\u554f\u984c\u3092\u30c7\u30d0\u30c3\u30b0\u3059\u308b\u5fc5\u8981\u304c\u3042\u308b\u5834\u5408\u304c\u3042\u308a\u307e\u3059\u3002\u30aa\u30d7\u30b7\u30e7\u30f3",(0,o.jsx)(n.code,{children:"--dump"}),"\u3092\u6e21\u3059\u3068Move Prover\u306f\u30b3\u30f3\u30d1\u30a4\u30eb\u4e2d\u3001\u524d\u8005\u304c\u5909\u63db\u3055\u308c\u308b\u305f\u3081\u30aa\u30ea\u30b8\u30ca\u30eb\u306eMove\u30d0\u30a4\u30c8\u30b3\u30fc\u30c9\u3068Move Prover\u30d0\u30a4\u30c8\u30b3\u30fc\u30c9\u3092\u51fa\u529b\u3057\u307e\u3059\u3002"]})]})}function v(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(a,{...e})}):a(e)}},83581:(e,n,r)=>{r.d(n,{R:()=>c,x:()=>i});var o=r(11855);const s={},l=o.createContext(s);function c(e){const n=o.useContext(l);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),o.createElement(l.Provider,{value:n},e.children)}}}]);