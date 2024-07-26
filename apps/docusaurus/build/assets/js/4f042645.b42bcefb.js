"use strict";(self.webpackChunkaptos_docs=self.webpackChunkaptos_docs||[]).push([[8972],{59450:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>r,contentTitle:()=>d,default:()=>o,frontMatter:()=>i,metadata:()=>t,toc:()=>l});var a=s(63159),c=s(83581);s(3688);const i={title:"Multisig Governance Tutorial"},d="\u30de\u30eb\u30c1\u30b7\u30b0\u30ac\u30d0\u30ca\u30f3\u30b9\u30c1\u30e5\u30fc\u30c8\u30ea\u30a2\u30eb",t={id:"tools/aptos-cli/use-cli/move-tutorials/multi-signature-tutorial",title:"Multisig Governance Tutorial",description:"\u80cc\u666f",source:"@site/i18n/ja/docusaurus-plugin-content-docs/current/tools/aptos-cli/use-cli/move-tutorials/multi-signature-tutorial.md",sourceDirName:"tools/aptos-cli/use-cli/move-tutorials",slug:"/tools/aptos-cli/use-cli/move-tutorials/multi-signature-tutorial",permalink:"/tools/aptos-cli/use-cli/move-tutorials/multi-signature-tutorial",draft:!1,unlisted:!1,editUrl:"https://github.com/aptos-labs/developer-docs/edit/main/apps/docusaurus/docs/tools/aptos-cli/use-cli/move-tutorials/multi-signature-tutorial.md",tags:[],version:"current",lastUpdatedAt:1718709339,formattedLastUpdatedAt:"2024\u5e746\u670818\u65e5",frontMatter:{title:"Multisig Governance Tutorial"},sidebar:"appSidebar",previous:{title:"Arguments in JSON Tutorial",permalink:"/tools/aptos-cli/use-cli/move-tutorials/arguments-in-json-tutorial"},next:{title:"Interact with Blockchain",permalink:"/integration/"}},r={},l=[{value:"\u80cc\u666f",id:"\u80cc\u666f",level:2},{value:"\u30a2\u30ab\u30a6\u30c8\u4f5c\u6210",id:"\u30a2\u30ab\u30a6\u30c8\u4f5c\u6210",level:2},{value:"\u30de\u30eb\u30c1\u30b7\u30b0\u3092\u691c\u67fb\u3059\u308b",id:"\u30de\u30eb\u30c1\u30b7\u30b0\u3092\u691c\u67fb\u3059\u308b",level:2},{value:"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u516c\u958b\u306eEnqueue",id:"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u516c\u958b\u306eenqueue",level:2},{value:"\u30ac\u30d0\u30ca\u30f3\u30b9\u30d1\u30e9\u30e1\u30fc\u30bf\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306eEnqueue",id:"\u30ac\u30d0\u30ca\u30f3\u30b9\u30d1\u30e9\u30e1\u30fc\u30bf\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306eenqueue",level:2},{value:"\u516c\u958b\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306e\u5b9f\u884c",id:"\u516c\u958b\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306e\u5b9f\u884c",level:2},{value:"\u30ac\u30d0\u30ca\u30f3\u30b9\u30d1\u30e9\u30e1\u30fc\u30bf\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306e\u5b9f\u884c",id:"\u30ac\u30d0\u30ca\u30f3\u30b9\u30d1\u30e9\u30e1\u30fc\u30bf\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306e\u5b9f\u884c",level:2}];function u(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,c.R)(),...e.components},{Details:s}=n;return s||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"\u30de\u30eb\u30c1\u30b7\u30b0\u30ac\u30d0\u30ca\u30f3\u30b9\u30c1\u30e5\u30fc\u30c8\u30ea\u30a2\u30eb",children:"\u30de\u30eb\u30c1\u30b7\u30b0\u30ac\u30d0\u30ca\u30f3\u30b9\u30c1\u30e5\u30fc\u30c8\u30ea\u30a2\u30eb"}),"\n",(0,a.jsx)(n.h2,{id:"\u80cc\u666f",children:"\u80cc\u666f"}),"\n",(0,a.jsxs)(n.p,{children:["\u3053\u306e\u30bb\u30af\u30b7\u30e7\u30f3\u306f",(0,a.jsx)(n.a,{href:"/tools/aptos-cli/use-cli/move-tutorials/arguments-in-json-tutorial",children:"JSON\u306e\u5f15\u6570\u30c1\u30e5\u30fc\u30c8\u30ea\u30a2\u30eb"}),"\u3078\u57fa\u3065\u3044\u3066\u69cb\u7bc9\u3057\u3066\u3044\u307e\u3059\u3002\u307e\u3060\u30c1\u30e5\u30fc\u30c8\u30ea\u30a2\u30eb\u3092\u5b8c\u4e86\u3057\u3066\u3044\u306a\u3044\u5834\u5408\u306f\u3001\u307e\u305a\u305d\u306e\u30c1\u30e5\u30fc\u30c8\u30ea\u30a2\u30eb\u3092\u5b8c\u4e86\u3057\u3066\u304f\u3060\u3055\u3044\u3002"]}),"\n",(0,a.jsxs)(n.p,{children:["\u3053\u306e\u30c1\u30e5\u30fc\u30c8\u30ea\u30a2\u30eb\u3067\u3082\u540c\u69d8\u306b",(0,a.jsxs)(n.a,{href:"https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/cli_args",children:[(0,a.jsx)(n.code,{children:"CliArgs"}),"\u30b5\u30f3\u30d7\u30eb\u30d1\u30c3\u30b1\u30fc\u30b8"]}),"\u3092\u53c2\u7167\u3057\u307e\u3059\u3002"]}),"\n",(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsxs)(n.p,{children:["\u30d5\u30a9\u30ed\u30fc\u3057\u305f\u3044\u5834\u5408\u306f\u307e\u305a",(0,a.jsx)(n.a,{href:"/tools/aptos-cli/use-cli/move-tutorials/arguments-in-json-tutorial",children:"JSON\u306e\u5f15\u6570"}),"\u306e\u30c1\u30e5\u30fc\u30c8\u30ea\u30a2\u30eb\u624b\u9806\u3092\u5b8c\u4e86\u3057\u3066\u304f\u3060\u3055\u3044\u3002"]})}),"\n",(0,a.jsxs)(n.p,{children:["\u3053\u306e\u4f8b\u3067\u306f\u3001Ace\u3068Bee\u306f2-of-2\u306e\u300c\u30de\u30eb\u30c1\u30b7\u30b0v2\u300d\u30a2\u30ab\u30a6\u30f3\u30c8(",(0,a.jsx)(n.a,{href:"https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/sources/multisig_account.move",children:(0,a.jsx)(n.code,{children:"multisig_account.move"})}),"\u3054\u3068\u306e1\u3064\u306e\u30aa\u30f3\u30c1\u30a7\u30fc\u30f3\u30de\u30eb\u30c1\u30b7\u30b0\u30a2\u30ab\u30a6\u30f3\u30c8)\u304b\u3089\u30ac\u30d0\u30ca\u30f3\u30b9\u64cd\u4f5c\u3092\u5b9f\u884c\u3057\u307e\u3059\u3002"]}),"\n",(0,a.jsx)(n.h2,{id:"\u30a2\u30ab\u30a6\u30c8\u4f5c\u6210",children:"\u30a2\u30ab\u30a6\u30c8\u4f5c\u6210"}),"\n",(0,a.jsxs)(n.p,{children:["Ace \u306e\u30a2\u30ab\u30a6\u30f3\u30c8\u306f",(0,a.jsx)(n.a,{href:"/tools/aptos-cli/use-cli/move-tutorials/arguments-in-json-tutorial",children:"JSON\u306e\u5f15\u6570"}),"\u306e\u30c1\u30e5\u30fc\u30c8\u30ea\u30a2\u30eb\u4e2d\u306b\u4f5c\u6210\u3055\u308c\u305f\u305f\u3081\u3001\u307e\u305a\u306fBee\u306e\u30d0\u30cb\u30c6\u30a3\u30a2\u30c9\u30ec\u30b9\u30a2\u30ab\u30a6\u30f3\u30c8\u306e\u30de\u30a4\u30cb\u30f3\u30b0\u304b\u3089\u59cb\u3081\u307e\u3059\u3002"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:"title=Command",children:"aptos key generate \\\n    --vanity-prefix 0xbee \\\n    --output-file bee.key\n"})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": {\n    "PublicKey Path": "bee.key.pub",\n    "PrivateKey Path": "bee.key",\n    "Account Address:": "0xbeec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc"\n  }\n}\n'})})]}),"\n",(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsx)(n.p,{children:"\u6b63\u78ba\u306a\u30a2\u30ab\u30a6\u30f3\u30c8\u30a2\u30c9\u30ec\u30b9\u306f\u5404\u5b9f\u884c\u3067\u5909\u5316\u3059\u308b\u306f\u305a\u3067\u3059\u304c\u3001\u30d0\u30cb\u30c6\u30a3\u30d7\u30ec\u30d5\u30a3\u30c3\u30af\u30b9\u306f\u5909\u5316\u3057\u306a\u3044\u306f\u305a\u3067\u3059\u3002"})}),"\n",(0,a.jsx)(n.p,{children:"Bee\u306e\u30a2\u30c9\u30ec\u30b9\u3092\u30b7\u30a7\u30eb\u5909\u6570\u306b\u4fdd\u5b58\u3057\u3066\u3001\u5f8c\u3067\u30a4\u30f3\u30e9\u30a4\u30f3\u3067\u547c\u3073\u51fa\u305b\u308b\u3088\u3046\u306b\u3057\u307e\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"# Your exact address should vary\nbee_addr=0xbeec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc\n"})}),"\n",(0,a.jsx)(n.p,{children:"\u30d5\u30a9\u30fc\u30bb\u30c3\u30c8\u3092\u4f7f\u7528\u3057\u3066Bee\u306e\u30a2\u30ab\u30a6\u30f3\u30c8\u3078\u8cc7\u91d1\u3092\u5165\u91d1\u3057\u307e\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:"title=Command",children:"aptos account fund-with-faucet --account $bee_addr\n"})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": "Added 100000000 Octas to account beec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc"\n}\n'})})]}),"\n",(0,a.jsx)(n.p,{children:"\u3053\u308c\u3067Ace\u306f\u30de\u30eb\u30c1\u30b7\u30b0\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u4f5c\u6210\u51fa\u6765\u307e\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:"title=Command",children:"aptos multisig create \\\n    --additional-owners $bee_addr \\\n    --num-signatures-required 2 \\\n    --private-key-file ace.key \\\n    --assume-yes\n"})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": {\n    "multisig_address": "57478da34604655c68b1dcb89e4f4a9124b6c0ecc1c59a0931d58cc4e60ac5c5",\n    "transaction_hash": "0x849cc756de2d3b57210f5d32ae4b5e7d1f80e5d376233885944b6f3cc2124a05",\n    "gas_used": 1524,\n    "gas_unit_price": 100,\n    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",\n    "sequence_number": 5,\n    "success": true,\n    "timestamp_us": 1685078644186194,\n    "version": 528428043,\n    "vm_status": "Executed successfully"\n  }\n}\n'})})]}),"\n",(0,a.jsx)(n.p,{children:"\u30de\u30eb\u30c1\u30b7\u30b0\u30a2\u30c9\u30ec\u30b9\u3092\u30b7\u30a7\u30eb\u5909\u6570\u3078\u4fdd\u5b58\u3057\u307e\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"# \u30a2\u30c9\u30ec\u30b9\u304c\u7570\u306a\u308b\u306f\u305a\u3067\u3059\u3002\nmultisig_addr=0x57478da34604655c68b1dcb89e4f4a9124b6c0ecc1c59a0931d58cc4e60ac5c5\n"})}),"\n",(0,a.jsx)(n.h2,{id:"\u30de\u30eb\u30c1\u30b7\u30b0\u3092\u691c\u67fb\u3059\u308b",children:"\u30de\u30eb\u30c1\u30b7\u30b0\u3092\u691c\u67fb\u3059\u308b"}),"\n",(0,a.jsxs)(n.p,{children:["\u7d44\u307f\u5408\u308f\u305b\u305f",(0,a.jsxs)(n.a,{href:"https://github.com/aptos-labs/aptos-core/blob/9fa0102c3e474d99ea35a0a85c6893604be41611/aptos-move/framework/aptos-framework/sources/multisig_account.move#L237",children:[(0,a.jsx)(n.code,{children:"multisig_account.move"}),"view\u95a2\u6570"]}),"\u3092\u4f7f\u7528\u3057\u3066\u30de\u30eb\u30c1\u30b7\u30b0\u3092\u691c\u67fb\u3057\u307e\u3059\u3002"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u5fc5\u8981\u306a\u7f72\u540d\u306e\u6570"',children:'aptos move view \\\n    --function-id 0x1::multisig_account::num_signatures_required \\\n    --args \\\n        address:"$multisig_addr"\n'})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": [\n    "2"\n  ]\n}\n'})})]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u6240\u6709\u8005"',children:'    --function-id 0x1::multisig_account::owners \\\n    --args \\\n        address:"$multisig_addr"\n'})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": [\n    [\n      "0xbeec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc",\n      "0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46"\n    ]\n  ]\n}\n'})})]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u6700\u5f8c\u306b\u89e3\u6c7a\u3055\u308c\u305f\u30b7\u30fc\u30b1\u30f3\u30b9No."',children:'aptos move view \\\n    --function-id 0x1::multisig_account::last_resolved_sequence_number \\\n    --args \\\n        address:"$multisig_addr"\n'})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": [\n    "0"\n  ]\n}\n'})})]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u6b21\u306e\u30b7\u30fc\u30b1\u30f3\u30b9No."',children:'aptos move view \\\n    --function-id 0x1::multisig_account::next_sequence_number \\\n    --args \\\n        address:"$multisig_addr"\n'})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": [\n    "1"\n  ]\n}\n'})})]}),"\n",(0,a.jsx)(n.h2,{id:"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u516c\u958b\u306eenqueue",children:"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u516c\u958b\u306eEnqueue"}),"\n",(0,a.jsxs)(n.p,{children:["\u30ad\u30e5\u30fc\u306b\u767b\u9332\u3055\u308c\u308b\u6700\u521d\u306e\u30de\u30eb\u30c1\u30b7\u30b0\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306f\u3001\n",(0,a.jsxs)(n.a,{href:"https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/cli_args",children:[(0,a.jsx)(n.code,{children:"CliArgs"}),"\u30b5\u30f3\u30d7\u30eb\u30d1\u30c3\u30b1\u30fc\u30b8"]}),"\u306e\u516c\u958b\u306e\u305f\u3081\u306e\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3068\u306a\u308a\u307e\u3059\u3002\u307e\u305a\u3001\u516c\u958b\u30da\u30a4\u30ed\u30fc\u30c9\u30a8\u30f3\u30c8\u30ea\u95a2\u6570JSON\u30d5\u30a1\u30a4\u30eb\u3092\u751f\u6210\u3057\u307e\u3059\u3002"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u30b3\u30de\u30f3\u30c9"',children:"aptos move build-publish-payload \\\n    --named-addresses test_account=$multisig_addr \\\n    --json-output-file publication.json \\\n    --assume-yes\n"})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": "Publication payload entry function JSON file saved to publication.json"\n}\n'})})]}),"\n",(0,a.jsx)(n.p,{children:"\u3053\u3053\u3067\u3001Ace\u3078\u30de\u30eb\u30c1\u30b7\u30b0\u30a2\u30ab\u30a6\u30f3\u30c8\u304b\u3089\u30d1\u30c3\u30b1\u30fc\u30b8\u306e\u516c\u958b\u3092\u63d0\u6848\u3055\u305b\u3001\u30da\u30a4\u30ed\u30fc\u30c9\u30cf\u30c3\u30b7\u30e5\u306e\u307f\u3092\u30aa\u30f3\u30c1\u30a7\u30fc\u30f3\u3078\u4fdd\u5b58\u3057\u307e\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="Command"',children:"aptos multisig create-transaction \\\n    --multisig-address $multisig_addr \\\n    --json-file publication.json \\\n    --store-hash-only \\\n    --private-key-file ace.key \\\n    --assume-yes\n"})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": {\n    "transaction_hash": "0x70c75903f8e1b1c0069f1e84ef9583ad8000f24124b33a746c88d2b031f7fe2c",\n    "gas_used": 510,\n    "gas_unit_price": 100,\n    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",\n    "sequence_number": 6,\n    "success": true,\n    "timestamp_us": 1685078836492390,\n    "version": 528429447,\n    "vm_status": "Executed successfully"\n  }\n}\n'})})]}),"\n",(0,a.jsx)(n.p,{children:"\u6ce8\u610f\uff1a\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u304c\u89e3\u6c7a\u3055\u308c\u3066\u3044\u306a\u3044\u305f\u3081\u3001\u6700\u5f8c\u306b\u89e3\u6c7a\u3055\u308c\u305f\u30b7\u30fc\u30b1\u30f3\u30b9\u756a\u53f7\u306f\u307e\u30600\u306e\u307e\u307e\u3067\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u6700\u5f8c\u306b\u89e3\u6c7a\u3055\u308c\u305f\u30b7\u30fc\u30b1\u30f3\u30b9No."',children:'aptos move view \\\n    --function-id 0x1::multisig_account::last_resolved_sequence_number \\\n    --args \\\n        address:"$multisig_addr"\n'})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": [\n    "0"\n  ]\n}\n'})})]}),"\n",(0,a.jsx)(n.p,{children:"\u305f\u3060\u3057\u3001\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u304c\u30ad\u30e5\u30fc\u306b\u767b\u9332\u3055\u308c\u305f\u305f\u3081\u3001\u6b21\u306e\u30b7\u30fc\u30b1\u30f3\u30b9No.\u304c\u5897\u52a0\u3057\u3066\u3044\u307e\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u6b21\u306e\u30b7\u30fc\u30b1\u30f3\u30b9No."',children:'aptos move view \\\n    --function-id 0x1::multisig_account::next_sequence_number \\\n    --args \\\n        address:"$multisig_addr"\n'})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": [\n    "2"\n  ]\n}\n'})})]}),"\n",(0,a.jsx)(n.p,{children:"\u3053\u308c\u3067\u3001\u30aa\u30f3\u30c1\u30a7\u30fc\u30f3\u3067\u30ad\u30e5\u30fc\u3078\u5165\u308c\u3089\u308c\u305f\u30de\u30eb\u30c1\u30b7\u30b0\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3092\u691c\u67fb\u3067\u304d\u307e\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3092\u53d6\u5f97"',children:'aptos move view \\\n    --function-id 0x1::multisig_account::get_transaction \\\n    --args \\\n        address:"$multisig_addr" \\\n        String:1\n'})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": [\n    {\n      "creation_time_secs": "1685078836",\n      "creator": "0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",\n      "payload": {\n        "vec": []\n      },\n      "payload_hash": {\n        "vec": [\n          "0x62b91159c1428c1ef488c7290771de458464bd665691d9653d195bc28e0d2080"\n        ]\n      },\n      "votes": {\n        "data": [\n          {\n            "key": "0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",\n            "value": true\n          }\n        ]\n      }\n    }\n  ]\n}\n'})})]}),"\n",(0,a.jsxs)(n.p,{children:["\u6ce8\u610f\uff1a\u4e0a\u8a18\u306e\u7d50\u679c\u304b\u3089\u3001\u30da\u30a4\u30ed\u30fc\u30c9\u306f\u30aa\u30f3\u30c1\u30a7\u30fc\u30f3\u306b\u4fdd\u5b58\u3055\u308c\u305a\u3001Ace\u306f\u63d0\u6848\u306e\u63d0\u51fa\u6642\u306b\u6697\u9ed9\u7684\u306b\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3092\u627f\u8a8d(\u6295\u7968",(0,a.jsx)(n.code,{children:"true"}),")\u3057\u307e\u3057\u305f\u3002"]}),"\n",(0,a.jsx)(n.h2,{id:"\u30ac\u30d0\u30ca\u30f3\u30b9\u30d1\u30e9\u30e1\u30fc\u30bf\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306eenqueue",children:"\u30ac\u30d0\u30ca\u30f3\u30b9\u30d1\u30e9\u30e1\u30fc\u30bf\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306eEnqueue"}),"\n",(0,a.jsx)(n.p,{children:"\u3053\u3053\u3067\u3001Bee\u3078\u30ac\u30d0\u30ca\u30f3\u30b9\u30d1\u30e9\u30e1\u30fc\u30bf\u30bb\u30c3\u30bf\u30fc\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3092\u30a8\u30f3\u30ad\u30e5\u30fc\u3055\u305b\u3001\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u30da\u30a4\u30ed\u30fc\u30c9\u5168\u4f53\u3092\u30aa\u30f3\u30c1\u30a7\u30fc\u30f3\u3078\u4fdd\u5b58\u3057\u307e\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u30b3\u30de\u30f3\u30c9"',children:'aptos multisig create-transaction \\\n    --multisig-address $multisig_addr \\\n    --function-id $multisig_addr::cli_args::set_vals \\\n    --type-args \\\n        0x1::account::Account \\\n        0x1::chain_id::ChainId \\\n    --args \\\n        u8:123 \\\n        "bool:[false, true, false, false]" \\\n        \'address:[["0xace", "0xbee"], ["0xcad"], []]\' \\\n    --private-key-file bee.key \\\n    --assume-yes\n'})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": {\n    "transaction_hash": "0xd0a348072d5bfc5a2e5d444f92f0ecc10b978dad720b174303bc6d91342f27ec",\n    "gas_used": 511,\n    "gas_unit_price": 100,\n    "sender": "beec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc",\n    "sequence_number": 0,\n    "success": true,\n    "timestamp_us": 1685078954841650,\n    "version": 528430315,\n    "vm_status": "Executed successfully"\n  }\n}\n'})})]}),"\n",(0,a.jsx)(n.p,{children:"\u6ce8\u610f\uff1a\u6b21\u306e\u30b7\u30fc\u30b1\u30f3\u30b9No.\u304c\u518d\u3073\u5897\u52a0\u3057\u3066\u3044\u307e\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u6b21\u306e\u30b7\u30fc\u30b1\u30f3\u30b9No."',children:'aptos move view \\\n    --function-id 0x1::multisig_account::next_sequence_number \\\n    --args \\\n        address:"$multisig_addr"\n'})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": [\n    "3"\n  ]\n}\n'})})]}),"\n",(0,a.jsx)(n.p,{children:"\u73fe\u5728\u3001\u516c\u958b\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3068\u30d1\u30e9\u30e1\u30fc\u30bf\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306e\u4e21\u65b9\u304c\u4fdd\u7559\u4e2d\u3067\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="G\u4fdd\u7559\u4e2d\u306e\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3092\u53d6\u5f97\u3059\u308b"',children:'aptos move view \\\n    --function-id 0x1::multisig_account::get_pending_transactions \\\n    --args \\\n        address:"$multisig_addr"\n'})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": [\n    [\n      {\n        "creation_time_secs": "1685078836",\n        "creator": "0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",\n        "payload": {\n          "vec": []\n        },\n        "payload_hash": {\n          "vec": [\n            "0x62b91159c1428c1ef488c7290771de458464bd665691d9653d195bc28e0d2080"\n          ]\n        },\n        "votes": {\n          "data": [\n            {\n              "key": "0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",\n              "value": true\n            }\n          ]\n        }\n      },\n      {\n        "creation_time_secs": "1685078954",\n        "creator": "0xbeec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc",\n        "payload": {\n          "vec": [\n            "0x0057478da34604655c68b1dcb89e4f4a9124b6c0ecc1c59a0931d58cc4e60ac5c508636c695f61726773087365745f76616c7302070000000000000000000000000000000000000000000000000000000000000001076163636f756e74074163636f756e740007000000000000000000000000000000000000000000000000000000000000000108636861696e5f696407436861696e49640003017b0504000100006403020000000000000000000000000000000000000000000000000000000000000ace0000000000000000000000000000000000000000000000000000000000000bee010000000000000000000000000000000000000000000000000000000000000cad00"\n          ]\n        },\n        "payload_hash": {\n          "vec": []\n        },\n        "votes": {\n          "data": [\n            {\n              "key": "0xbeec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc",\n              "value": true\n            }\n          ]\n        }\n      }\n    ]\n  ]\n}\n'})})]}),"\n",(0,a.jsx)(n.h2,{id:"\u516c\u958b\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306e\u5b9f\u884c",children:"\u516c\u958b\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306e\u5b9f\u884c"}),"\n",(0,a.jsx)(n.p,{children:"\u516c\u958b\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3078\u6295\u7968\u3057\u305f\u306e\u306fAce\u306e\u307f\u3067\u3042\u308b\u305f\u3081 (\u63d0\u6848\u6642\u3001\u6697\u9ed9\u7684\u306b\u627f\u8a8d\u3055\u308c\u305f\u305f\u3081)\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306f\u307e\u3060\u5b9f\u884c\u51fa\u6765\u307e\u305b\u3093\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u5b9f\u884c\u53ef\u80fd"',children:'aptos move view \\\n    --function-id 0x1::multisig_account::can_be_executed \\\n    --args \\\n        address:"$multisig_addr" \\\n        String:1\n'})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": [\n    false\n  ]\n}\n'})})]}),"\n",(0,a.jsx)(n.p,{children:"\u305f\u3060\u3057\u3001Bee\u306f\u6295\u7968\u3059\u308b\u524d\u3001\u30aa\u30f3\u30c1\u30a7\u30fc\u30f3\u3078\u4fdd\u5b58\u3055\u308c\u3066\u3044\u308b\u30da\u30a4\u30ed\u30fc\u30c9\u30cf\u30c3\u30b7\u30e5\u304c\u30d1\u30d6\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u30a8\u30f3\u30c8\u30ea\u95a2\u6570\u306eJSON\u30d5\u30a1\u30a4\u30eb\u3068\u4e00\u81f4\u3059\u308b\u4e8b\u3092\u78ba\u8a8d\u3057\u307e\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u63d0\u6848\u306e\u691c\u8a3c"',children:"aptos multisig verify-proposal \\\n    --multisig-address $multisig_addr \\\n    --json-file publication.json \\\n    --sequence-number 1\n"})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": {\n    "Status": "Transaction match",\n    "Multisig transaction": {\n      "creation_time_secs": "1685078836",\n      "creator": "0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",\n      "payload": {\n        "vec": []\n      },\n      "payload_hash": {\n        "vec": [\n          "0x62b91159c1428c1ef488c7290771de458464bd665691d9653d195bc28e0d2080"\n        ]\n      },\n      "votes": {\n        "data": [\n          {\n            "key": "0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",\n            "value": true\n          }\n        ]\n      }\n    }\n  }\n}\n'})})]}),"\n",(0,a.jsx)(n.p,{children:"Bee\u306f\u3001\u30aa\u30f3\u30c1\u30a7\u30fc\u30f3\u30da\u30a4\u30ed\u30fc\u30c9\u30cf\u30c3\u30b7\u30e5\u304c\u30ed\u30fc\u30ab\u30eb\u3067\u30b3\u30f3\u30d1\u30a4\u30eb\u3055\u308c\u305f\u30d1\u30c3\u30b1\u30fc\u30b8\u516c\u958bJSON\u30d5\u30a1\u30a4\u30eb\u306b\u5bfe\u3057\u3066\u30c1\u30a7\u30c3\u30af\u30a2\u30a6\u30c8\u3057\u305f\u306e\u3067\u3001\u306f\u3044\u3068\u6295\u7968\u3057\u307e\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3092\u627f\u8a8d\u3059\u308b"',children:"aptos multisig approve \\\n    --multisig-address $multisig_addr \\\n    --sequence-number 1 \\\n    --private-key-file bee.key \\\n    --assume-yes\n"})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": {\n    "transaction_hash": "0xa5fb49f1077de6aa6d976e6bcc05e4c50c6cd061f1c87e8f1ea74e7a04a06bd1",\n    "gas_used": 6,\n    "gas_unit_price": 100,\n    "sender": "beec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc",\n    "sequence_number": 1,\n    "success": true,\n    "timestamp_us": 1685079892130861,\n    "version": 528437204,\n    "vm_status": "Executed successfully"\n  }\n}\n'})})]}),"\n",(0,a.jsx)(n.p,{children:"\u3053\u308c\u3067\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3092\u5b9f\u884c\u51fa\u6765\u307e\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u5b9f\u884c\u53ef\u80fd"',children:'aptos move view \\\n    --function-id 0x1::multisig_account::can_be_executed \\\n    --args \\\n        address:"$multisig_addr" \\\n        String:1\n'})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": [\n    true\n  ]\n}\n'})})]}),"\n",(0,a.jsx)(n.p,{children:"\u3053\u308c\u3067\u3001Ace\u307e\u305f\u306fBee\u306e\u3069\u3061\u3089\u3082\u30cf\u30c3\u30b7\u30e5\u306e\u307f\u304c\u30c1\u30a7\u30fc\u30f3\u3078\u4fdd\u5b58\u3055\u308c\u3066\u3044\u308b\u305f\u3081\u3001\u5b8c\u5168\u306a\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u30da\u30a4\u30ed\u30fc\u30c9\u3092\u6e21\u3057\u3066\u3001\u30de\u30eb\u30c1\u30b7\u30b0\u30a2\u30ab\u30a6\u30f3\u30c8\u304b\u3089\u516c\u958b\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3092\u547c\u3073\u51fa\u3059\u4e8b\u304c\u51fa\u6765\u307e\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u516c\u958b"',children:"aptos multisig execute-with-payload \\\n    --multisig-address $multisig_addr \\\n    --json-file publication.json \\\n    --private-key-file bee.key \\\n    --max-gas 10000 \\\n    --assume-yes\n"})}),"\n",(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.a,{href:"https://github.com/aptos-labs/aptos-core/issues/8304",children:"#8304"}),"\u89e3\u6c7a\u304c\u4fdd\u7559\u4e2d\u3067\u3042\u308b\u305f\u3081\u3001\n\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u30b7\u30df\u30e5\u30ec\u30fc\u30bf\u30fc (\u30ac\u30b9\u30b3\u30b9\u30c8\u306e\u898b\u7a4d\u308a\u3067\u4f7f\u7528) \u306f\u30de\u30eb\u30c1\u30b7\u30b0 \u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3067\u306f\u58ca\u308c\u3066\u3044\u308b\u305f\u3081\u3001\u6700\u5927\u30ac\u30b9\u91cf\u3092\u624b\u52d5\u3067\u6307\u5b9a\u3059\u308b\u5fc5\u8981\u304c\u6709\u308a\u307e\u3059\u3002"]})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.a,{href:"https://github.com/aptos-labs/aptos-core/issues/8304",children:"#8304"}),"\u306e\u89e3\u6c7a\u304c\u4fdd\u7559\u4e2d\u3067\u3042\u308b\u305f\u3081\u3001\n\u30da\u30a4\u30ed\u30fc\u30c9\u30cf\u30c3\u30b7\u30e5\u306e\u307f\u304c\u30aa\u30f3\u30c1\u30a7\u30fc\u30f3\u306b\u4fdd\u5b58\u3055\u308c\u3066\u3044\u308b\u5834\u5408\u3001\u30de\u30eb\u30c1\u30b7\u30b0\u30d1\u30d6\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306e\u5b9f\u884c\u304c\u6210\u529f\u3057\u305f\u5834\u5408\u306eCLI\u51fa\u529b\u3067\u306fAPI\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3059\u3002\n\u304c\u3001\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306f\u30a8\u30af\u30b9\u30d7\u30ed\u30fc\u30e9\u30fc\u3092\u4f7f\u7528\u3057\u3066\u624b\u52d5\u3067\u691c\u8a3c\u51fa\u6765\u307e\u3059\u3002"]})]}),"\n",(0,a.jsx)(n.h2,{id:"\u30ac\u30d0\u30ca\u30f3\u30b9\u30d1\u30e9\u30e1\u30fc\u30bf\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306e\u5b9f\u884c",children:"\u30ac\u30d0\u30ca\u30f3\u30b9\u30d1\u30e9\u30e1\u30fc\u30bf\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306e\u5b9f\u884c"}),"\n",(0,a.jsx)(n.p,{children:"\u30ac\u30d0\u30ca\u30f3\u30b9\u30d1\u30e9\u30e1\u30fc\u30bf\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3078\u6295\u7968\u3057\u305f\u306e\u306f Bee\u306e\u307f\u3067\u3042\u308b\u305f\u3081(\u63d0\u6848\u6642\u3001\u6697\u9ed9\u7684\u306b\u627f\u8a8d\u3055\u308c\u305f\u305f\u3081)\u3001\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306f\u307e\u3060\u5b9f\u884c\u3067\u304d\u307e\u305b\u3093\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u5b9f\u884c\u53ef\u80fd"',children:'aptos move view \\\n    --function-id 0x1::multisig_account::can_be_executed \\\n    --args \\\n        address:"$multisig_addr" \\\n        String:2\n'})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": [\n    false\n  ]\n}\n'})})]}),"\n",(0,a.jsx)(n.p,{children:"Ace\u306f\u6295\u7968\u3059\u308b\u524d\u3001\u30aa\u30f3\u30c1\u30a7\u30fc\u30f3\u3078\u4fdd\u5b58\u3055\u308c\u3066\u3044\u308b\u30da\u30a4\u30ed\u30fc\u30c9\u304c\u4f7f\u3044\u305f\u3044\u5f15\u6570\u3068\u4e00\u81f4\u3059\u308b\u4e8b\u3092\u78ba\u8a8d\u3057\u307e\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u63d0\u6848\u306e\u691c\u8a3c"',children:'aptos multisig verify-proposal \\\n    --multisig-address $multisig_addr \\\n    --function-id $multisig_addr::cli_args::set_vals \\\n    --type-args \\\n        0x1::account::Account \\\n        0x1::chain_id::ChainId \\\n    --args \\\n        u8:123 \\\n        "bool:[false, true, false, false]" \\\n        \'address:[["0xace", "0xbee"], ["0xcad"], []]\' \\\n    --sequence-number 2\n'})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": {\n    "Status": "Transaction match",\n    "Multisig transaction": {\n      "creation_time_secs": "1685078954",\n      "creator": "0xbeec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc",\n      "payload": {\n        "vec": [\n          "0x0057478da34604655c68b1dcb89e4f4a9124b6c0ecc1c59a0931d58cc4e60ac5c508636c695f61726773087365745f76616c7302070000000000000000000000000000000000000000000000000000000000000001076163636f756e74074163636f756e740007000000000000000000000000000000000000000000000000000000000000000108636861696e5f696407436861696e49640003017b0504000100006403020000000000000000000000000000000000000000000000000000000000000ace0000000000000000000000000000000000000000000000000000000000000bee010000000000000000000000000000000000000000000000000000000000000cad00"\n        ]\n      },\n      "payload_hash": {\n        "vec": []\n      },\n      "votes": {\n        "data": [\n          {\n            "key": "0xbeec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc",\n            "value": true\n          }\n        ]\n      }\n    }\n  }\n}\n'})})]}),"\n",(0,a.jsx)(n.p,{children:"\u6ce8\u610f\uff1a\u5f15\u6570\u30921\u3064\u3067\u3082\u5909\u66f4\u3059\u308b\u3068\u691c\u8a3c\u304c\u5931\u6557\u3057\u307e\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="u8\u306e\u4fee\u6b63\u3067\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u691c\u8a3c\u304c\u5931\u6557\u3057\u307e\u3057\u305f"',children:'aptos multisig verify-proposal \\\n    --multisig-address $multisig_addr \\\n    --function-id $multisig_addr::cli_args::set_vals \\\n    --type-args \\\n        0x1::account::Account \\\n        0x1::chain_id::ChainId \\\n    --args \\\n        u8:200 \\\n        "bool:[false, true, false, false]" \\\n        \'address:[["0xace", "0xbee"], ["0xcad"], []]\' \\\n    --sequence-number 2\n'})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Error": "Unexpected error: Transaction mismatch: The transaction you provided has a payload hash of 0xe494b0072d6f940317344967cf0e818c80082375833708c773b0275f3ad07e51, but the on-chain transaction proposal you specified has a payload hash of 0x070ed7c3f812f25f585461305d507b96a4e756f784e01c8c59901871267a1580. For more info, see https://aptos.dev/move/move-on-aptos/cli#multisig-governance"\n}\n'})})]}),"\n",(0,a.jsx)(n.p,{children:"Ace\u306f\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3092\u627f\u8a8d\u3057\u307e\u3059"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3092\u627f\u8a8d\u3059\u308b"',children:"aptos multisig approve \\\n    --multisig-address $multisig_addr \\\n    --sequence-number 2 \\\n    --private-key-file ace.key \\\n    --assume-yes\n"})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": {\n    "transaction_hash": "0x233427d95832234fa13dddad5e0b225d40168b4c2c6b84f5255eecc3e68401bf",\n    "gas_used": 6,\n    "gas_unit_price": 100,\n    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",\n    "sequence_number": 7,\n    "success": true,\n    "timestamp_us": 1685080266378400,\n    "version": 528439883,\n    "vm_status": "Executed successfully"\n  }\n}\n'})})]}),"\n",(0,a.jsx)(n.p,{children:"\u30da\u30a4\u30ed\u30fc\u30c9\u306f\u30aa\u30f3\u30c1\u30a7\u30fc\u30f3\u3078\u4fdd\u5b58\u3055\u308c\u3066\u3044\u308b\u305f\u3081\u3001\u4fdd\u7559\u4e2d\u306e\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u3092\u5b9f\u884c\u3059\u308b\u5fc5\u8981\u306f\u6709\u308a\u307e\u305b\u3093\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",metastring:'title="\u5b9f\u884c"',children:"aptos multisig execute \\\n    --multisig-address $multisig_addr \\\n    --private-key-file ace.key \\\n    --max-gas 10000 \\\n    --assume-yes\n"})}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:"\u51fa\u529b"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": {\n    "transaction_hash": "0xbc99f929708a1058b223aa880d04607a78ebe503367ec4dab23af4a3bdb541b2",\n    "gas_used": 505,\n    "gas_unit_price": 100,\n    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",\n    "sequence_number": 8,\n    "success": true,\n    "timestamp_us": 1685080344045461,\n    "version": 528440423,\n    "vm_status": "Executed successfully"\n\n'})})]})]})}function o(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(u,{...e})}):u(e)}}}]);