"use strict";(self.webpackChunkaptos_docs=self.webpackChunkaptos_docs||[]).push([[9857],{74747:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>r,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>c,toc:()=>l});var n=s(63159),o=s(83581);const a={title:"Blocks",id:"blocks"},i="Blocks",c={id:"concepts/blocks",title:"Blocks",description:"Aptos is a per-transaction versioned database. When transactions are executed, the resulting state of each transaction is stored separately and thus allows for more granular data access. This is different from other blockchains where only the resulting state of a block (a group of transactions) is stored.",source:"@site/i18n/ja/docusaurus-plugin-content-docs/current/concepts/blocks.md",sourceDirName:"concepts",slug:"/concepts/blocks",permalink:"/concepts/blocks",draft:!1,unlisted:!1,editUrl:"https://github.com/aptos-labs/developer-docs/edit/main/apps/docusaurus/docs/concepts/blocks.md",tags:[],version:"current",lastUpdatedAt:1713276994,formattedLastUpdatedAt:"2024\u5e744\u670816\u65e5",frontMatter:{title:"Blocks",id:"blocks"},sidebar:"aptosSidebar",previous:{title:"Computing Transaction Gas",permalink:"/concepts/base-gas"},next:{title:"Staking",permalink:"/concepts/staking"}},r={},l=[{value:"System transactions",id:"system-transactions",level:2},{value:"Epochs",id:"epochs",level:2}];function d(e){const t={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",...(0,o.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"blocks",children:"Blocks"}),"\n",(0,n.jsx)(t.p,{children:"Aptos is a per-transaction versioned database. When transactions are executed, the resulting state of each transaction is stored separately and thus allows for more granular data access. This is different from other blockchains where only the resulting state of a block (a group of transactions) is stored."}),"\n",(0,n.jsxs)(t.p,{children:["Blocks are still a fundamental unit within Aptos. Transactions are batched and executed together in a block. In addition, the ",(0,n.jsx)(t.a,{href:"/concepts/txns-states#proofs",children:"proofs"})," within storage are at the block-level granularity. The number of transactions within a block varies depending on network activity and a configurable maximum block size limit. As the blockchain becomes busier, blocks will likely contain more transactions."]}),"\n",(0,n.jsx)(t.h2,{id:"system-transactions",children:"System transactions"}),"\n",(0,n.jsxs)(t.p,{children:["Each Aptos block contains both user transactions and special system transactions to ",(0,n.jsx)(t.em,{children:"mark"})," the beginning and end of the transaction batch. Specifically, there are two system transactions:"]}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"BlockMetadataTransaction"})," - is inserted at the beginning of the block. A ",(0,n.jsx)(t.code,{children:"BlockMetadata"})," transaction can also mark the end of an ",(0,n.jsx)(t.a,{href:"#epochs",children:"epoch"})," and trigger reward distribution to validators."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"StateCheckpointTransaction"})," - is appended at the end of the block and is used as a checkpoint milestone."]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"epochs",children:"Epochs"}),"\n",(0,n.jsx)(t.p,{children:"In Aptos, epochs represent a longer period of time in order to safely synchronize major changes such as validator set additions/removals. An epoch is a fixed duration of time, currently defined as two hours on mainnet. The number of blocks in an epoch depends on how many blocks can execute within this period of time. It is only at the start of a new epoch that major changes such as a validator joining the validator set don't immediately take effect among the validators."})]})}function h(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},83581:(e,t,s)=>{s.d(t,{R:()=>i,x:()=>c});var n=s(11855);const o={},a=n.createContext(o);function i(e){const t=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),n.createElement(a.Provider,{value:t},e.children)}}}]);