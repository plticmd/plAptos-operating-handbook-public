"use strict";(self.webpackChunkaptos_docs=self.webpackChunkaptos_docs||[]).push([[7196],{6060:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>d,frontMatter:()=>r,metadata:()=>c,toc:()=>l});var t=o(63159),i=o(83581);const r={title:"Configuration",id:"cli-configuration"},s=void 0,c={id:"tools/aptos-cli/use-cli/cli-configuration",title:"Configuration",description:"Configuration examples",source:"@site/i18n/ja/docusaurus-plugin-content-docs/current/tools/aptos-cli/use-cli/cli-configuration.md",sourceDirName:"tools/aptos-cli/use-cli",slug:"/tools/aptos-cli/use-cli/cli-configuration",permalink:"/tools/aptos-cli/use-cli/cli-configuration",draft:!1,unlisted:!1,editUrl:"https://github.com/aptos-labs/developer-docs/edit/main/apps/docusaurus/docs/tools/aptos-cli/use-cli/cli-configuration.md",tags:[],version:"current",lastUpdatedAt:1713276994,formattedLastUpdatedAt:"2024\u5e744\u670816\u65e5",frontMatter:{title:"Configuration",id:"cli-configuration"},sidebar:"appSidebar",previous:{title:"Use the Aptos CLI",permalink:"/tools/aptos-cli/use-cli/use-aptos-cli"},next:{title:"Account",permalink:"/tools/aptos-cli/use-cli/cli-account"}},a={},l=[{value:"Configuration examples",id:"configuration-examples",level:2},{value:"In the current working directory for local runs",id:"in-the-current-working-directory-for-local-runs",level:3},{value:"In the home directory for the global runs",id:"in-the-home-directory-for-the-global-runs",level:3},{value:"Setting up shell completion",id:"setting-up-shell-completion",level:3},{value:"Initialize local configuration and create an account",id:"initialize-local-configuration-and-create-an-account",level:2},{value:"Step 1: Run Aptos init",id:"step-1-run-aptos-init",level:3},{value:"Step 2: Changing the configuration",id:"step-2-changing-the-configuration",level:3},{value:"Creating other profiles",id:"creating-other-profiles",level:3}];function u(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"configuration-examples",children:"Configuration examples"}),"\n",(0,t.jsx)(n.p,{children:"Configuration for the CLI works like this:"}),"\n",(0,t.jsx)(n.h3,{id:"in-the-current-working-directory-for-local-runs",children:"In the current working directory for local runs"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["Your configurations are in a ",(0,t.jsx)(n.strong,{children:"local"})," YAML configuration file ",(0,t.jsx)(n.code,{children:".aptos/config.yaml"}),", i.e., located in the current working directory where you run the CLI. In this case you must run your CLI commands from this current working directory for this configuration to be used."]}),"\n",(0,t.jsx)(n.li,{children:"You can verify that the CLI is set to use this local configuration YAML file by running the command:"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"aptos config show-global-config\n"})}),"\n",(0,t.jsx)(n.p,{children:"You should see the below output:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'{\n  "Result": {\n    "config_type": "Workspace"\n  }\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"Workspace"})," value for the ",(0,t.jsx)(n.code,{children:"config_type"})," indicates that the ",(0,t.jsx)(n.code,{children:".aptos/config.yaml"})," file is used for the CLI configuration."]}),"\n",(0,t.jsx)(n.h3,{id:"in-the-home-directory-for-the-global-runs",children:"In the home directory for the global runs"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["Your configurations are in a ",(0,t.jsx)(n.strong,{children:"global"})," YAML configuration file ",(0,t.jsx)(n.code,{children:"~/.aptos/global_config.yaml"}),", i.e., located in your home directory."]}),"\n",(0,t.jsx)(n.li,{children:"Set the CLI to use this global configuration YAML file by running this command:"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"aptos config set-global-config --config-type global\n"})}),"\n",(0,t.jsx)(n.p,{children:"You will see the below output:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'{\n  "Result": {\n    "config_type": "Global"\n  }\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:["You can also show the global configuration with the ",(0,t.jsx)(n.code,{children:"show-global-config"})," command."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'$ aptos config show-global-config\n{\n  "Result": {\n    "config_type": "Global"\n  }\n}\n'})}),"\n",(0,t.jsx)(n.admonition,{title:"Default configuration",type:"tip",children:(0,t.jsxs)(n.p,{children:["If you did not set any global configuration, then the ",(0,t.jsx)(n.code,{children:"./.aptos/config.yaml"})," in the current working directory is used for configuration."]})}),"\n",(0,t.jsx)(n.h3,{id:"setting-up-shell-completion",children:"Setting up shell completion"}),"\n",(0,t.jsxs)(n.p,{children:["You can set up shell completions with the ",(0,t.jsx)(n.code,{children:"generate-shell-completions"})," command. You can look up configuration for your specific shell. The supported shells are ",(0,t.jsx)(n.code,{children:"[bash, zsh, fish, PowerShell, elvish]"}),". An example is below for ",(0,t.jsx)(n.a,{href:"https://ohmyz.sh/",children:(0,t.jsx)(n.code,{children:"oh my zsh"})}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"aptos config generate-shell-completions --shell zsh --output-file ~/.oh-my-zsh/completions/_aptos\n"})}),"\n",(0,t.jsx)(n.h2,{id:"initialize-local-configuration-and-create-an-account",children:"Initialize local configuration and create an account"}),"\n",(0,t.jsxs)(n.p,{children:["A local folder named ",(0,t.jsx)(n.code,{children:".aptos/"})," will be created with a configuration ",(0,t.jsx)(n.code,{children:"config.yaml"})," which can be used to store configuration between CLI runs. This is local to your run, so you will need to continue running CLI from this folder, or reinitialize in another folder."]}),"\n",(0,t.jsx)(n.h3,{id:"step-1-run-aptos-init",children:"Step 1: Run Aptos init"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"aptos init"})," command will initialize the configuration with the private key you provided.\nNote: If you would like to initialize a new profile from ledger, please refer to the ",(0,t.jsx)(n.a,{href:"/tools/aptos-cli/use-cli/use-aptos-ledger",children:"Ledger documentation"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'$ aptos init\nConfiguring for profile default\nEnter your rest endpoint [Current: None | No input: https://api.devnet.aptoslabs.com]\n\nNo rest url given, using https://api.devnet.aptoslabs.com...\nEnter your faucet endpoint [Current: None | No input: https://faucet.devnet.aptoslabs.com]\n\nNo faucet url given, using https://faucet.devnet.aptoslabs.com...\nEnter your private key as a hex literal (0x...) [Current: None | No input: Generate new key (or keep one if present)]\n\nNo key given, generating key...\nAccount 00f1f20ddd0b0dd2291b6e42c97274668c479bca70f07c6b6a80b99720779696 doesn\'t exist, creating it and funding it with 10000 coins\nAptos is now set up for account 00f1f20ddd0b0dd2291b6e42c97274668c479bca70f07c6b6a80b99720779696!  Run `aptos help` for more information about commands\n\n{\n  "Result": "Success"\n}\n'})}),"\n",(0,t.jsx)(n.h3,{id:"step-2-changing-the-configuration",children:"Step 2: Changing the configuration"}),"\n",(0,t.jsxs)(n.p,{children:["To change the configuration, you can either run the command ",(0,t.jsx)(n.code,{children:"aptos init"})," or you can manually edit the ",(0,t.jsx)(n.code,{children:".aptos/config.yaml"})," that is in your current working directory."]}),"\n",(0,t.jsx)(n.h3,{id:"creating-other-profiles",children:"Creating other profiles"}),"\n",(0,t.jsxs)(n.p,{children:["You can also create other profiles for different endpoints and different keys. These can be made by adding the ",(0,t.jsx)(n.code,{children:"--profile"})," argument, and can be used in most other commands to replace command line arguments."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'$ aptos init --profile superuser\nConfiguring for profile superuser\nEnter your rest endpoint [Current: None | No input: https://api.devnet.aptoslabs.com]\n\nNo rest url given, using https://api.devnet.aptoslabs.com...\nEnter your faucet endpoint [Current: None | No input: https://faucet.devnet.aptoslabs.com]\n\nNo faucet url given, using https://faucet.devnet.aptoslabs.com...\nEnter your private key as a hex literal (0x...) [Current: None | No input: Generate new key (or keep one if present)]\n\nNo key given, generating key...\nAccount 18B61497FD290B02BB0751F44381CADA1657C2B3AA6194A00D9BC9A85FAD3B04 doesn\'t exist, creating it and funding it with 10000 coins\nAptos is now set up for account 18B61497FD290B02BB0751F44381CADA1657C2B3AA6194A00D9BC9A85FAD3B04!  Run `aptos help` for more information about commands\n{\n  "Result": "Success"\n}\n'})})]})}function d(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},83581:(e,n,o)=>{o.d(n,{R:()=>s,x:()=>c});var t=o(11855);const i={},r=t.createContext(i);function s(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);