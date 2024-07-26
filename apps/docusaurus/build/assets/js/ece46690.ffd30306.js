"use strict";(self.webpackChunkaptos_docs=self.webpackChunkaptos_docs||[]).push([[1399],{73796:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var t=s(63159),r=s(83581);const o={title:"Run a Local Multi-node Network",slug:"running-a-local-multi-node-network"},i="\u30ed\u30fc\u30ab\u30eb\u30de\u30eb\u30c1\u30ce\u30fc\u30c9\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3092\u5b9f\u884c\u3059\u308b",l={id:"guides/running-a-local-multi-node-network",title:"Run a Local Multi-node Network",description:"\u3053\u306e\u30ac\u30a4\u30c9\u3067\u306f\u3001\u8907\u6570\u306e\u30d0\u30ea\u30c7\u30fc\u30bf\u30ce\u30fc\u30c9\u3068\u30d0\u30ea\u30c7\u30fc\u30bf\u30d5\u30eb\u30ce\u30fc\u30c9\u3092\u4f7f\u7528\u3057\u3066\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3092\u5b9f\u884c\u3059\u308b\u65b9\u6cd5\u3092\u89e3\u8aac\u3057\u307e\u3059\u3002Aptos Forge CLI\u3092\u4f7f\u7528\u3057\u307e\u3059\u3002",source:"@site/i18n/ja/docusaurus-plugin-content-docs/current/guides/running-a-local-multi-node-network.md",sourceDirName:"guides",slug:"/guides/running-a-local-multi-node-network",permalink:"/guides/running-a-local-multi-node-network",draft:!1,unlisted:!1,editUrl:"https://github.com/aptos-labs/developer-docs/edit/main/apps/docusaurus/docs/guides/running-a-local-multi-node-network.md",tags:[],version:"current",lastUpdatedAt:1717324438,formattedLastUpdatedAt:"2024\u5e746\u67082\u65e5",frontMatter:{title:"Run a Local Multi-node Network",slug:"running-a-local-multi-node-network"},sidebar:"appSidebar",previous:{title:"Run a Localnet with Validator",permalink:"/nodes/localnet/run-a-localnet"},next:{title:"\u30b9\u30dd\u30f3\u30b5\u30fc\u30c9\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3",permalink:"/guides/sponsored-transactions"}},a={},c=[{value:"\u53d6\u308a\u304b\u304b\u308b\u524d\u306e\u6e96\u5099",id:"\u53d6\u308a\u304b\u304b\u308b\u524d\u306e\u6e96\u5099",level:2},{value:"\u8907\u6570\u306e\u30d0\u30ea\u30c7\u30fc\u30bf\u30fc\u3092\u5b9f\u884c\u3059\u308b",id:"\u8907\u6570\u306e\u30d0\u30ea\u30c7\u30fc\u30bf\u30fc\u3092\u5b9f\u884c\u3059\u308b",level:2},{value:"\u30d5\u30a9\u30fc\u30bb\u30c3\u30c8\u3068\u30df\u30f3\u30c8",id:"\u30d5\u30a9\u30fc\u30bb\u30c3\u30c8\u3068\u30df\u30f3\u30c8",level:2},{value:"\u30d0\u30ea\u30c7\u30fc\u30bf\u30fc\u30d5\u30eb\u30ce\u30fc\u30c9",id:"\u30d0\u30ea\u30c7\u30fc\u30bf\u30fc\u30d5\u30eb\u30ce\u30fc\u30c9",level:2},{value:"\u8ffd\u52a0\u306e\u4f7f\u7528\u6cd5",id:"\u8ffd\u52a0\u306e\u4f7f\u7528\u6cd5",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"\u30ed\u30fc\u30ab\u30eb\u30de\u30eb\u30c1\u30ce\u30fc\u30c9\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3092\u5b9f\u884c\u3059\u308b",children:"\u30ed\u30fc\u30ab\u30eb\u30de\u30eb\u30c1\u30ce\u30fc\u30c9\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3092\u5b9f\u884c\u3059\u308b"}),"\n",(0,t.jsxs)(n.p,{children:["\u3053\u306e\u30ac\u30a4\u30c9\u3067\u306f\u3001\u8907\u6570\u306e\u30d0\u30ea\u30c7\u30fc\u30bf\u30ce\u30fc\u30c9\u3068\u30d0\u30ea\u30c7\u30fc\u30bf\u30d5\u30eb\u30ce\u30fc\u30c9\u3092\u4f7f\u7528\u3057\u3066\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3092\u5b9f\u884c\u3059\u308b\u65b9\u6cd5\u3092\u89e3\u8aac\u3057\u307e\u3059\u3002",(0,t.jsx)(n.a,{href:"https://github.com/aptos-labs/aptos-core/tree/main/testsuite/forge-cli/src",children:"Aptos Forge CLI"}),"\u3092\u4f7f\u7528\u3057\u307e\u3059\u3002"]}),"\n",(0,t.jsxs)(n.admonition,{title:"\u30c6\u30b9\u30c8\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3067\u306e\u307f\u4f7f\u7528",type:"tip",children:[(0,t.jsx)(n.p,{children:"\u3053\u306e\u30ac\u30a4\u30c9\u3067\u89e3\u8aac\u3059\u308b\u65b9\u6cd5\u306f\u3001\u30de\u30eb\u30c1\u30ce\u30fc\u30c9\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u306e\u30c6\u30b9\u30c8\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3067\u306e\u307f\u4f7f\u7528\u3057\u3066\u4e0b\u3055\u3044\u3002\u3053\u306e\u30ac\u30a4\u30c9\u3092\u5b9f\u7a3c\u50cd\u74b0\u5883\u3078\u306e\u30c7\u30d7\u30ed\u30a4\u3067\u4f7f\u7528\u3057\u306a\u3044\u3067\u304f\u3060\u3055\u3044\u3002\u73fe\u5728\u3001\u30de\u30eb\u30c1\u30ce\u30fc\u30c9\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u5411\u3051\u306e\u30ac\u30a4\u30c9\u306f\u3053\u308c\u3060\u3051\u3067\u3059\u3002"}),(0,t.jsxs)(n.p,{children:["\u5358\u4e00\u30ce\u30fc\u30c9\u3067\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3092\u30c7\u30d7\u30ed\u30a4\u3059\u308b\u5834\u5408\u306f\u3001\u300cCLI \u3092\u4f7f\u7528\u3057\u3066\u30ed\u30fc\u30ab\u30eb\u958b\u767a\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3092\u5b9f\u884c\u3059\u308b\u300d\n",(0,t.jsx)(n.a,{href:"/guides/local-development-network",children:"CLI\u3092\u4f7f\u7528\u3057\u3066\u30ed\u30fc\u30ab\u30eb\u958b\u767a\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3092\u5b9f\u884c\u3059\u308b"}),"\u3092\u5fa1\u89a7\u4e0b\u3055\u3044\u3002"]})]}),"\n",(0,t.jsx)(n.h2,{id:"\u53d6\u308a\u304b\u304b\u308b\u524d\u306e\u6e96\u5099",children:"\u53d6\u308a\u304b\u304b\u308b\u524d\u306e\u6e96\u5099"}),"\n",(0,t.jsxs)(n.p,{children:["\u3053\u306e\u30ac\u30a4\u30c9\u306f",(0,t.jsx)(n.a,{href:"/guides/building-from-source",children:"\u30bd\u30fc\u30b9\u304b\u3089Aptos\u3092\u69cb\u7bc9\u3059\u308b"}),"\u624b\u9806\u3092\u5b8c\u4e86\u3057\u3066\u3044\u308b\u3053\u3068\u3092\u524d\u63d0\u3068\u3057\u3066\u3044\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(n.h2,{id:"\u8907\u6570\u306e\u30d0\u30ea\u30c7\u30fc\u30bf\u30fc\u3092\u5b9f\u884c\u3059\u308b",children:"\u8907\u6570\u306e\u30d0\u30ea\u30c7\u30fc\u30bf\u30fc\u3092\u5b9f\u884c\u3059\u308b"}),"\n",(0,t.jsx)(n.p,{children:"\u8907\u6570\u306e\u30ed\u30fc\u30ab\u30eb\u30d0\u30ea\u30c7\u30fc\u30bf\u30fc\u3092\u30c7\u30d7\u30ed\u30a4\u3059\u308b\u306b\u306f\u3001\u4ee5\u4e0b\u3092\u5b9f\u884c\u3057\u307e\u3059\u3002"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'cargo run -p aptos-forge-cli \\\n        -- \\\n        --suite "run_forever" \\\n        --num-validators 4 test local-swarm\n'})}),"\n",(0,t.jsx)(n.p,{children:"\u3053\u308c\u3067\u3001\u305d\u308c\u305e\u308c\u72ec\u81ea\u306e\u30d7\u30ed\u30bb\u30b9\u3067\u5b9f\u884c\u3055\u308c\u308b4\u3064\u306e\u30d0\u30ea\u30c7\u30fc\u30bf\u30fc\u306e\u30ed\u30fc\u30ab\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u304c\u958b\u59cb\u3055\u308c\u307e\u3059\u3002\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u306f\u3001\u624b\u52d5\u3067\u7d42\u4e86\u3057\u306a\u3044\u9650\u308a\u6c38\u4e45\u306b\u5b9f\u884c\u3055\u308c\u307e\u3059\u3002"}),"\n",(0,t.jsx)(n.p,{children:"\u30bf\u30fc\u30df\u30ca\u30eb\u51fa\u529b\u306b\u306f\u3001\u30d0\u30ea\u30c7\u30fc\u30bf\u30d5\u30a1\u30a4\u30eb(\u4f8b\u3048\u3070\u3001\u30b8\u30a7\u30cd\u30b7\u30b9\u30d5\u30a1\u30a4\u30eb\u3001\u30ed\u30b0\u3001\u30ce\u30fc\u30c9\u69cb\u6210\u306a\u3069)\u306e\u5834\u6240\u3068\u3001\u5404\u30ce\u30fc\u30c9\u306e\u8d77\u52d5\u306e\u305f\u3081\u5b9f\u884c\u3055\u308c\u305f\u30b3\u30de\u30f3\u30c9\u304c\u8868\u793a\u3055\u308c\u307e\u3059\u3002\u8d77\u52d5\u6642\u306f\u5404\u30ce\u30fc\u30c9\u306e\u30d7\u30ed\u30bb\u30b9ID(PID)\u3068\u30b5\u30fc\u30d0\u30fc\u30a2\u30c9\u30ec\u30b9(REST API\u7b49)\u3082\u8868\u793a\u3055\u308c\u307e\u3059\u3002\u4f8b\u3048\u3070\u3001\u4e0a\u8a18\u306e\u30b3\u30de\u30f3\u30c9\u3092\u5b9f\u884c\u3059\u308b\u3068\u3001\u4ee5\u4e0b\u306e\u69d8\u306b\u8868\u793a\u3055\u308c\u307e\u3059\u3002"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'...\n2022-09-01T15:41:27.228289Z [main] INFO crates/aptos-genesis/src/builder.rs:462 Building genesis with 4 validators. Directory of output: "/private/var/folders/dx/c0l2rrkn0656gfx6v5_dy_p80000gn/T/.tmpq9uPMJ"\n...\n2022-09-01T15:41:28.090606Z [main] INFO testsuite/forge/src/backend/local/swarm.rs:207 The root (or mint) key for the swarm is: 0xf9f...\n...\n2022-09-01T15:41:28.094800Z [main] INFO testsuite/forge/src/backend/local/node.rs:129 Started node 0 (PID: 78939) with command: ".../aptos-core/target/debug/aptos-node" "-f" "/private/var/folders/dx/c0l2rrkn0656gfx6v5_dy_p80000gn/T/.tmpq9uPMJ/0/node.yaml"\n2022-09-01T15:41:28.094825Z [main] INFO testsuite/forge/src/backend/local/node.rs:137 Node 0: REST API is listening at: http://127.0.0.1:64566\n2022-09-01T15:41:28.094838Z [main] INFO testsuite/forge/src/backend/local/node.rs:142 Node 0: Inspection service is listening at http://127.0.0.1:64568\n...\n'})}),"\n",(0,t.jsxs)(n.p,{children:["\u3053\u306e\u51fa\u529b\u306e\u60c5\u5831\u3092\u4f7f\u7528\u3057\u3066\u3001\u5358\u4e00\u306e\u30ce\u30fc\u30c9\u3092\u505c\u6b62\u3057\u3066\u518d\u8d77\u52d5\u3059\u308b\u3053\u3068\u304c\u3067\u304d\u307e\u3059\u3002\n\u4f8b\u3048\u3070\u3001\u30ce\u30fc\u30c9",(0,t.jsx)(n.code,{children:"0"}),"\u3092\u505c\u6b62\u3057\u3066\u518d\u8d77\u52d5\u3059\u308b\u306b\u306f\u3001\u4ee5\u4e0b\u306e\u30b3\u30de\u30f3\u30c9\u3092\u5b9f\u884c\u3057\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"kill -9 <Node 0 PID>\ncargo run -p aptos-node \\\n        -- \\\n        -f <Location to the node 0 configuration file displayed above>\n"})}),"\n",(0,t.jsx)(n.h2,{id:"\u30d5\u30a9\u30fc\u30bb\u30c3\u30c8\u3068\u30df\u30f3\u30c8",children:"\u30d5\u30a9\u30fc\u30bb\u30c3\u30c8\u3068\u30df\u30f3\u30c8"}),"\n",(0,t.jsx)(n.p,{children:"\u3053\u306e\u30c6\u30b9\u30c8\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3067\u30b3\u30a4\u30f3\u3092\u30df\u30f3\u30c8\u3059\u308b\u306b\u306f\u3001\u30d5\u30a9\u30fc\u30bb\u30c3\u30c8\u3092\u5b9f\u884c\u3059\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059\u3002\u4ee5\u4e0b\u306e\u30b3\u30de\u30f3\u30c9\u3067\u5b9f\u884c\u51fa\u6765\u307e\u3059\u3002"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cargo run -p aptos-faucet-service -- run-simple --key <key> --node-url <node_url>\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u4e0a\u8a18\u306e\u5024\u306f\u4ee5\u4e0b\u306e\u69d8\u306b\u53d6\u5f97\u3067\u304d\u307e\u3059\u3002"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"key"}),": swarm\u3092\u958b\u59cb\u3059\u308b\u3068\u3001\u6b21\u306e\u69d8\u306a\u51fa\u529b\u304c\u3042\u308a\u307e\u3057\u305f: ",(0,t.jsx)(n.code,{children:"The root (or mint) key for the swarm is: 0xf9f..."}),".\u3053\u308c\u304c",(0,t.jsx)(n.code,{children:"key"}),"\u3067\u3059\u3002"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"node_url"}),": swarm\u3092\u958b\u59cb\u3059\u308b\u3068\u3001\u6b21\u306e\u69d8\u306a\u51fa\u529b\u304c\u3042\u308a\u307e\u3057\u305f:",(0,t.jsx)(n.code,{children:"REST API is listening at: http://127.0.0.1:64566"}),". \u3053\u308c\u304c",(0,t.jsx)(n.code,{children:"node_url"}),"\u3067\u3059\u3002"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["\u4e0a\u8a18\u306e\u30b3\u30de\u30f3\u30c9\u306f\u3001\u30dd\u30fc\u30c8",(0,t.jsx)(n.code,{children:"8081"}),"\u3092\u30ea\u30c3\u30b9\u30f3\u3057\u3066\u30ed\u30fc\u30ab\u30eb\u3067\u30d5\u30a9\u30fc\u30bb\u30c3\u30c8\u3092\u5b9f\u884c\u3057\u307e\u3059\u3002\u3053\u306e\u30d5\u30a9\u30fc\u30bb\u30c3\u30c8\u3092\u4f7f\u7528\u3059\u308b\u3068\u3001\u30c6\u30b9\u30c8\u30a2\u30ab\u30a6\u30f3\u30c8\u3078\u30c8\u30fc\u30af\u30f3\u3092\u767a\u884c\u51fa\u6765\u307e\u3059\u3002\u4f8b\u3048\u3070\u3001"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"curl -X POST http://127.0.0.1:8081/mint?amount=<amount to mint>&pub_key=<public key to mint tokens to>\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u30d5\u30a9\u30fc\u30bb\u30c3\u30c8\u30b5\u30fc\u30d3\u30b9\u3092\u4f7f\u7528\u3059\u308b\u304b\u308f\u308a\u306b\u3001\u30d5\u30a9\u30fc\u30bb\u30c3\u30c8CLI\u3092\u76f4\u63a5\u4f7f\u7528\u3059\u308b\u4e8b\u3082\u51fa\u6765\u307e\u3059\u3002"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"cargo run -p aptos-faucet-cli -- --amount 10 --accounts <account_address> --key <private_key>\n"})}),"\n",(0,t.jsxs)(n.admonition,{title:"\u30d5\u30a9\u30fc\u30bb\u30c3\u30c8\u3068Aptos CLI",type:"tip",children:[(0,t.jsxs)(n.p,{children:["\u30d5\u30a9\u30fc\u30bb\u30c3\u30c8\u306e\u4ed5\u7d44\u307f\u306f",(0,t.jsx)(n.a,{href:"https://github.com/aptos-labs/aptos-core/tree/main/crates/aptos-faucet",children:"README"}),"\u3092\u5fa1\u89a7\u4e0b\u3055\u3044\u3002"]}),(0,t.jsxs)(n.p,{children:["\u65e2\u5b58\u306e",(0,t.jsx)(n.a,{href:"/tools/aptos-cli/use-cli/use-aptos-cli",children:"Aptos CLI"}),"\u3092\u4f7f\u7528\u3059\u308b\u65b9\u6cd5\u3082\u5fa1\u89a7\u4e0b\u3055\u3044\u3002"]})]}),"\n",(0,t.jsx)(n.h2,{id:"\u30d0\u30ea\u30c7\u30fc\u30bf\u30fc\u30d5\u30eb\u30ce\u30fc\u30c9",children:"\u30d0\u30ea\u30c7\u30fc\u30bf\u30fc\u30d5\u30eb\u30ce\u30fc\u30c9"}),"\n",(0,t.jsxs)(n.p,{children:["\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u5185\u3067\u30d0\u30ea\u30c7\u30fc\u30bf\u30d5\u30eb\u30ce\u30fc\u30c9\u3082\u5b9f\u884c\u3059\u308b\u306b\u306f\u3001",(0,t.jsx)(n.code,{children:"--num-validator-fullnodes"}),"\u30d5\u30e9\u30b0\u3092\u4f7f\u7528\u3057\u307e\u3059\u3002\u4f8b:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'cargo run -p aptos-forge-cli \\\n        -- \\\n        --suite "run_forever" \\\n        --num-validators 3 \\\n        --num-validator-fullnodes 1 test local-swarm\n'})}),"\n",(0,t.jsx)(n.h2,{id:"\u8ffd\u52a0\u306e\u4f7f\u7528\u6cd5",children:"\u8ffd\u52a0\u306e\u4f7f\u7528\u6cd5"}),"\n",(0,t.jsx)(n.p,{children:"\u30c4\u30fc\u30eb\u4f7f\u7528\u30aa\u30d7\u30b7\u30e7\u30f3\u5168\u90e8\u3092\u8868\u793a\u3059\u308b\u5834\u5408\u3001\u4ee5\u4e0b\u3092\u5b9f\u884c\u3002"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cargo run -p aptos-forge-cli --help\n"})})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},83581:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>l});var t=s(11855);const r={},o=t.createContext(r);function i(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);