import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/search',
    component: ComponentCreator('/search', '4bd'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '64f'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '4bc'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '90f'),
            routes: [
              {
                path: '/apis/',
                component: ComponentCreator('/apis/', '026'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/apis/aptos-labs-developer-portal',
                component: ComponentCreator('/apis/aptos-labs-developer-portal', '97f'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/apis/fullnode-rest-api',
                component: ComponentCreator('/apis/fullnode-rest-api', 'e44'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/aptos-white-paper/',
                component: ComponentCreator('/aptos-white-paper/', '1bc'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/category/advanced-builders',
                component: ComponentCreator('/category/advanced-builders', '8ce'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/community/',
                component: ComponentCreator('/community/', 'fa3'),
                exact: true,
                sidebar: "comSidebar"
              },
              {
                path: '/community/aptos-style',
                component: ComponentCreator('/community/aptos-style', '39b'),
                exact: true,
                sidebar: "comSidebar"
              },
              {
                path: '/community/contributions/remix-ide-plugin',
                component: ComponentCreator('/community/contributions/remix-ide-plugin', 'c31'),
                exact: true
              },
              {
                path: '/community/contributors',
                component: ComponentCreator('/community/contributors', '959'),
                exact: true,
                sidebar: "comSidebar"
              },
              {
                path: '/community/external-resources',
                component: ComponentCreator('/community/external-resources', 'f09'),
                exact: true,
                sidebar: "comSidebar"
              },
              {
                path: '/community/site-updates',
                component: ComponentCreator('/community/site-updates', '02d'),
                exact: true,
                sidebar: "comSidebar"
              },
              {
                path: '/concepts/',
                component: ComponentCreator('/concepts/', 'd34'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/concepts/accounts',
                component: ComponentCreator('/concepts/accounts', '1ed'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/concepts/base-gas',
                component: ComponentCreator('/concepts/base-gas', '74b'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/concepts/blockchain',
                component: ComponentCreator('/concepts/blockchain', 'ba5'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/concepts/blocks',
                component: ComponentCreator('/concepts/blocks', '2f8'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/concepts/delegated-staking',
                component: ComponentCreator('/concepts/delegated-staking', '9b8'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/concepts/events',
                component: ComponentCreator('/concepts/events', '463'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/concepts/fullnodes',
                component: ComponentCreator('/concepts/fullnodes', '2b1'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/concepts/gas-txn-fee',
                component: ComponentCreator('/concepts/gas-txn-fee', 'c80'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/concepts/governance',
                component: ComponentCreator('/concepts/governance', 'd27'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/concepts/move-on-aptos',
                component: ComponentCreator('/concepts/move-on-aptos', '54f'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/concepts/node-networks-sync',
                component: ComponentCreator('/concepts/node-networks-sync', 'fd8'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/concepts/resources',
                component: ComponentCreator('/concepts/resources', '806'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/concepts/staking',
                component: ComponentCreator('/concepts/staking', '93a'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/concepts/txns-states',
                component: ComponentCreator('/concepts/txns-states', '82e'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/concepts/validator-nodes',
                component: ComponentCreator('/concepts/validator-nodes', 'c09'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/guides/account-management/key-rotation',
                component: ComponentCreator('/guides/account-management/key-rotation', '6ab'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/guides/building-from-source',
                component: ComponentCreator('/guides/building-from-source', 'c35'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/guides/data-pruning',
                component: ComponentCreator('/guides/data-pruning', '527'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/guides/explore-aptos',
                component: ComponentCreator('/guides/explore-aptos', '011'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/guides/keyless-accounts',
                component: ComponentCreator('/guides/keyless-accounts', '7a2'),
                exact: true
              },
              {
                path: '/guides/local-development-network',
                component: ComponentCreator('/guides/local-development-network', '6fd'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/guides/nfts/aptos-token-overview',
                component: ComponentCreator('/guides/nfts/aptos-token-overview', '776'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/guides/running-a-local-multi-node-network',
                component: ComponentCreator('/guides/running-a-local-multi-node-network', '16c'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/guides/sponsored-transactions',
                component: ComponentCreator('/guides/sponsored-transactions', '7f7'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/guides/state-sync',
                component: ComponentCreator('/guides/state-sync', '4be'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/guides/system-integrators-guide',
                component: ComponentCreator('/guides/system-integrators-guide', '10d'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/guides/transaction-management',
                component: ComponentCreator('/guides/transaction-management', '0fa'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/indexer/api/',
                component: ComponentCreator('/indexer/api/', '877'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/indexer/api/example-queries',
                component: ComponentCreator('/indexer/api/example-queries', '1e2'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/indexer/api/labs-hosted',
                component: ComponentCreator('/indexer/api/labs-hosted', 'ad5'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/indexer/api/self-hosted',
                component: ComponentCreator('/indexer/api/self-hosted', 'c3f'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/indexer/api/usage-guide',
                component: ComponentCreator('/indexer/api/usage-guide', 'ad0'),
                exact: true
              },
              {
                path: '/indexer/custom-processors/',
                component: ComponentCreator('/indexer/custom-processors/', 'b5b'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/indexer/custom-processors/e2e-tutorial',
                component: ComponentCreator('/indexer/custom-processors/e2e-tutorial', 'a11'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/indexer/custom-processors/parsing-txns',
                component: ComponentCreator('/indexer/custom-processors/parsing-txns', '098'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/indexer/indexer-landing',
                component: ComponentCreator('/indexer/indexer-landing', '5cd'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/indexer/legacy/',
                component: ComponentCreator('/indexer/legacy/', 'fc3'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/indexer/legacy/custom-data-model',
                component: ComponentCreator('/indexer/legacy/custom-data-model', '71a'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/indexer/legacy/indexer-fullnode',
                component: ComponentCreator('/indexer/legacy/indexer-fullnode', 'cb7'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/indexer/legacy/migration',
                component: ComponentCreator('/indexer/legacy/migration', 'c69'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/indexer/txn-stream/',
                component: ComponentCreator('/indexer/txn-stream/', '95b'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/indexer/txn-stream/labs-hosted',
                component: ComponentCreator('/indexer/txn-stream/labs-hosted', '305'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/indexer/txn-stream/local-development',
                component: ComponentCreator('/indexer/txn-stream/local-development', '34c'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/indexer/txn-stream/self-hosted',
                component: ComponentCreator('/indexer/txn-stream/self-hosted', '01d'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/integration/',
                component: ComponentCreator('/integration/', '315'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/integration/aptos-names-service-package',
                component: ComponentCreator('/integration/aptos-names-service-package', '069'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/integration/wallet-adapter-concept',
                component: ComponentCreator('/integration/wallet-adapter-concept', '144'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/integration/wallet-adapter-for-dapp',
                component: ComponentCreator('/integration/wallet-adapter-for-dapp', 'b1d'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/integration/wallet-adapter-for-wallets',
                component: ComponentCreator('/integration/wallet-adapter-for-wallets', '1ea'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/aptos-move',
                component: ComponentCreator('/move/aptos-move', '6dd'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/abilities',
                component: ComponentCreator('/move/book/abilities', 'e39'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/abort-and-assert',
                component: ComponentCreator('/move/book/abort-and-assert', '5c9'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/address',
                component: ComponentCreator('/move/book/address', '50c'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/bool',
                component: ComponentCreator('/move/book/bool', 'fb9'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/coding-conventions',
                component: ComponentCreator('/move/book/coding-conventions', 'e8a'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/conditionals',
                component: ComponentCreator('/move/book/conditionals', '0b6'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/constants',
                component: ComponentCreator('/move/book/constants', 'd5a'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/creating-coins',
                component: ComponentCreator('/move/book/creating-coins', '588'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/equality',
                component: ComponentCreator('/move/book/equality', 'd21'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/friends',
                component: ComponentCreator('/move/book/friends', 'cff'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/functions',
                component: ComponentCreator('/move/book/functions', 'f56'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/generics',
                component: ComponentCreator('/move/book/generics', 'b97'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/global-storage-operators',
                component: ComponentCreator('/move/book/global-storage-operators', '7f6'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/global-storage-structure',
                component: ComponentCreator('/move/book/global-storage-structure', '43e'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/integers',
                component: ComponentCreator('/move/book/integers', '9d9'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/introduction',
                component: ComponentCreator('/move/book/introduction', '307'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/loops',
                component: ComponentCreator('/move/book/loops', '8ea'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/modules-and-scripts',
                component: ComponentCreator('/move/book/modules-and-scripts', 'db8'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/package-upgrades',
                component: ComponentCreator('/move/book/package-upgrades', '00d'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/packages',
                component: ComponentCreator('/move/book/packages', '7df'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/references',
                component: ComponentCreator('/move/book/references', '673'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/signer',
                component: ComponentCreator('/move/book/signer', '3cb'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/standard-library',
                component: ComponentCreator('/move/book/standard-library', 'a49'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/structs-and-resources',
                component: ComponentCreator('/move/book/structs-and-resources', '812'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/SUMMARY',
                component: ComponentCreator('/move/book/SUMMARY', 'e36'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/tuples',
                component: ComponentCreator('/move/book/tuples', '8d1'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/unit-testing',
                component: ComponentCreator('/move/book/unit-testing', 'add'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/uses',
                component: ComponentCreator('/move/book/uses', '3ea'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/variables',
                component: ComponentCreator('/move/book/variables', 'a1b'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/book/vector',
                component: ComponentCreator('/move/book/vector', '722'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/move-on-aptos',
                component: ComponentCreator('/move/move-on-aptos', 'dd0'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/move-on-aptos/cli',
                component: ComponentCreator('/move/move-on-aptos/cli', '2dd'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/move-on-aptos/cryptography',
                component: ComponentCreator('/move/move-on-aptos/cryptography', '8d7'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/move-on-aptos/gas-profiling',
                component: ComponentCreator('/move/move-on-aptos/gas-profiling', '50e'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/move-on-aptos/modules-on-aptos',
                component: ComponentCreator('/move/move-on-aptos/modules-on-aptos', '95f'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/move-on-aptos/move-security-guidelines',
                component: ComponentCreator('/move/move-on-aptos/move-security-guidelines', 'fe4'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/move-on-aptos/objects/',
                component: ComponentCreator('/move/move-on-aptos/objects/', '627'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/move-on-aptos/objects/configuring-objects',
                component: ComponentCreator('/move/move-on-aptos/objects/configuring-objects', 'c68'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/move-on-aptos/objects/creating-objects',
                component: ComponentCreator('/move/move-on-aptos/objects/creating-objects', '28d'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/move-on-aptos/objects/using-objects',
                component: ComponentCreator('/move/move-on-aptos/objects/using-objects', '14e'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/move-on-aptos/resource-accounts',
                component: ComponentCreator('/move/move-on-aptos/resource-accounts', '2fc'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/move-on-aptos/scripts/',
                component: ComponentCreator('/move/move-on-aptos/scripts/', '866'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/move-on-aptos/scripts/compiling-scripts',
                component: ComponentCreator('/move/move-on-aptos/scripts/compiling-scripts', '39e'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/move-on-aptos/scripts/running-scripts',
                component: ComponentCreator('/move/move-on-aptos/scripts/running-scripts', 'dd7'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/move-on-aptos/scripts/script-tutorial',
                component: ComponentCreator('/move/move-on-aptos/scripts/script-tutorial', '101'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/move-on-aptos/scripts/writing-scripts',
                component: ComponentCreator('/move/move-on-aptos/scripts/writing-scripts', '062'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/prover/move-prover',
                component: ComponentCreator('/move/prover/move-prover', 'bcd'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/prover/prover-guide',
                component: ComponentCreator('/move/prover/prover-guide', '70f'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/prover/spec-lang',
                component: ComponentCreator('/move/prover/spec-lang', '0a5'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/move/prover/supporting-resources',
                component: ComponentCreator('/move/prover/supporting-resources', '6f8'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/nodes/aptos-api-spec',
                component: ComponentCreator('/nodes/aptos-api-spec', 'b99'),
                exact: true,
                sidebar: "refSidebar"
              },
              {
                path: '/nodes/configure/configure-index',
                component: ComponentCreator('/nodes/configure/configure-index', '08b'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/full-node/aptos-db-restore',
                component: ComponentCreator('/nodes/full-node/aptos-db-restore', '2ff'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/full-node/bootstrap-fullnode',
                component: ComponentCreator('/nodes/full-node/bootstrap-fullnode', '75f'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/full-node/deployments/deploy-a-pfn',
                component: ComponentCreator('/nodes/full-node/deployments/deploy-a-pfn', '835'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/full-node/deployments/deploy-a-pfn-docker',
                component: ComponentCreator('/nodes/full-node/deployments/deploy-a-pfn-docker', '455'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/full-node/deployments/deploy-a-pfn-gcp',
                component: ComponentCreator('/nodes/full-node/deployments/deploy-a-pfn-gcp', 'f8f'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/full-node/deployments/deploy-a-pfn-source-code',
                component: ComponentCreator('/nodes/full-node/deployments/deploy-a-pfn-source-code', '137'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/full-node/fullnode-network-connections',
                component: ComponentCreator('/nodes/full-node/fullnode-network-connections', '79d'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/full-node/fullnode-source-code-or-docker',
                component: ComponentCreator('/nodes/full-node/fullnode-source-code-or-docker', '0b0'),
                exact: true
              },
              {
                path: '/nodes/full-node/network-identity-fullnode',
                component: ComponentCreator('/nodes/full-node/network-identity-fullnode', '750'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/full-node/pfn-requirements',
                component: ComponentCreator('/nodes/full-node/pfn-requirements', '125'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/full-node/public-fullnode',
                component: ComponentCreator('/nodes/full-node/public-fullnode', '1de'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/full-node/update-fullnode-with-new-devnet-releases',
                component: ComponentCreator('/nodes/full-node/update-fullnode-with-new-devnet-releases', '825'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/full-node/verify-pfn',
                component: ComponentCreator('/nodes/full-node/verify-pfn', '556'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/identity-and-configuration',
                component: ComponentCreator('/nodes/identity-and-configuration', '224'),
                exact: true
              },
              {
                path: '/nodes/leaderboard-metrics',
                component: ComponentCreator('/nodes/leaderboard-metrics', '5eb'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/localnet/localnet-index',
                component: ComponentCreator('/nodes/localnet/localnet-index', '7c3'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/nodes/localnet/run-a-localnet',
                component: ComponentCreator('/nodes/localnet/run-a-localnet', 'f11'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/nodes/measure/important-metrics',
                component: ComponentCreator('/nodes/measure/important-metrics', '464'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/measure/measure-index',
                component: ComponentCreator('/nodes/measure/measure-index', 'acb'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/measure/node-health-checker',
                component: ComponentCreator('/nodes/measure/node-health-checker', 'e26'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/measure/node-health-checker-faq',
                component: ComponentCreator('/nodes/measure/node-health-checker-faq', '637'),
                exact: true
              },
              {
                path: '/nodes/measure/node-inspection-service',
                component: ComponentCreator('/nodes/measure/node-inspection-service', '7d7'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/modify/modify-index',
                component: ComponentCreator('/nodes/modify/modify-index', '8b5'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/networks',
                component: ComponentCreator('/nodes/networks', '7f4'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/nodes/node-files-all-networks/node-files',
                component: ComponentCreator('/nodes/node-files-all-networks/node-files', '4d0'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/node-files-all-networks/node-files-devnet',
                component: ComponentCreator('/nodes/node-files-all-networks/node-files-devnet', '5f9'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/node-files-all-networks/node-files-index',
                component: ComponentCreator('/nodes/node-files-all-networks/node-files-index', '66c'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/node-files-all-networks/node-files-testnet',
                component: ComponentCreator('/nodes/node-files-all-networks/node-files-testnet', '2ae'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/nodes-landing',
                component: ComponentCreator('/nodes/nodes-landing', '333'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/operations/operations-index',
                component: ComponentCreator('/nodes/operations/operations-index', 'c74'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/operator/connect-nodes/connect-validator-node',
                component: ComponentCreator('/nodes/validator-node/operator/connect-nodes/connect-validator-node', 'ae3'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/operator/connect-to-aptos-network',
                component: ComponentCreator('/nodes/validator-node/operator/connect-to-aptos-network', 'e5f'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/operator/delegation-pool-operations',
                component: ComponentCreator('/nodes/validator-node/operator/delegation-pool-operations', 'd48'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/operator/index',
                component: ComponentCreator('/nodes/validator-node/operator/index', '406'),
                exact: true
              },
              {
                path: '/nodes/validator-node/operator/modify-nodes/modify-validator-node',
                component: ComponentCreator('/nodes/validator-node/operator/modify-nodes/modify-validator-node', 'be9'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/operator/node-liveness-criteria',
                component: ComponentCreator('/nodes/validator-node/operator/node-liveness-criteria', 'cb2'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/operator/node-requirements',
                component: ComponentCreator('/nodes/validator-node/operator/node-requirements', '7c0'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/operator/running-validator-node/run-validator-node-using-aws',
                component: ComponentCreator('/nodes/validator-node/operator/running-validator-node/run-validator-node-using-aws', 'c86'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/operator/running-validator-node/run-validator-node-using-azure',
                component: ComponentCreator('/nodes/validator-node/operator/running-validator-node/run-validator-node-using-azure', 'e5a'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/operator/running-validator-node/run-validator-node-using-docker',
                component: ComponentCreator('/nodes/validator-node/operator/running-validator-node/run-validator-node-using-docker', '84c'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/operator/running-validator-node/run-validator-node-using-gcp',
                component: ComponentCreator('/nodes/validator-node/operator/running-validator-node/run-validator-node-using-gcp', 'cda'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/operator/running-validator-node/run-validator-node-using-source',
                component: ComponentCreator('/nodes/validator-node/operator/running-validator-node/run-validator-node-using-source', '5cc'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/operator/running-validator-node/running-validator-node',
                component: ComponentCreator('/nodes/validator-node/operator/running-validator-node/running-validator-node', '23c'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/operator/shutting-down-nodes',
                component: ComponentCreator('/nodes/validator-node/operator/shutting-down-nodes', 'bde'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/operator/staking-pool-operations',
                component: ComponentCreator('/nodes/validator-node/operator/staking-pool-operations', 'e18'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/operator/update-validator-node',
                component: ComponentCreator('/nodes/validator-node/operator/update-validator-node', '232'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/operator/verify-nodes/verify-validator-node',
                component: ComponentCreator('/nodes/validator-node/operator/verify-nodes/verify-validator-node', '8df'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/validators',
                component: ComponentCreator('/nodes/validator-node/validators', '49d'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/nodes/validator-node/voter/index',
                component: ComponentCreator('/nodes/validator-node/voter/index', '007'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/reference/error-codes',
                component: ComponentCreator('/reference/error-codes', 'a84'),
                exact: true,
                sidebar: "refSidebar"
              },
              {
                path: '/reference/glossary',
                component: ComponentCreator('/reference/glossary', '3f8'),
                exact: true,
                sidebar: "refSidebar"
              },
              {
                path: '/reference/move',
                component: ComponentCreator('/reference/move', '48b'),
                exact: true,
                sidebar: "refSidebar"
              },
              {
                path: '/reference/telemetry',
                component: ComponentCreator('/reference/telemetry', '264'),
                exact: true,
                sidebar: "nodeSidebar"
              },
              {
                path: '/releases/aptos-releases',
                component: ComponentCreator('/releases/aptos-releases', 'c88'),
                exact: true,
                sidebar: "aptosSidebar"
              },
              {
                path: '/sdks/index',
                component: ComponentCreator('/sdks/index', 'c41'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/legacy-ts-sdk/index',
                component: ComponentCreator('/sdks/legacy-ts-sdk/index', 'c45'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/legacy-ts-sdk/typescript-sdk-aptos-client-class',
                component: ComponentCreator('/sdks/legacy-ts-sdk/typescript-sdk-aptos-client-class', 'cd0'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/legacy-ts-sdk/typescript-sdk-client-layer',
                component: ComponentCreator('/sdks/legacy-ts-sdk/typescript-sdk-client-layer', '91d'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/legacy-ts-sdk/typescript-sdk-core-layer',
                component: ComponentCreator('/sdks/legacy-ts-sdk/typescript-sdk-core-layer', '8fc'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/legacy-ts-sdk/typescript-sdk-indexer-client-class',
                component: ComponentCreator('/sdks/legacy-ts-sdk/typescript-sdk-indexer-client-class', 'e2b'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/legacy-ts-sdk/typescript-sdk-overview',
                component: ComponentCreator('/sdks/legacy-ts-sdk/typescript-sdk-overview', '668'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/legacy-ts-sdk/typescript-sdk-plugins-layer',
                component: ComponentCreator('/sdks/legacy-ts-sdk/typescript-sdk-plugins-layer', '444'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/legacy-ts-sdk/typescript-sdk-tests',
                component: ComponentCreator('/sdks/legacy-ts-sdk/typescript-sdk-tests', '87c'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/python-sdk/',
                component: ComponentCreator('/sdks/python-sdk/', '339'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/rust-sdk/',
                component: ComponentCreator('/sdks/rust-sdk/', 'da7'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/ts-sdk/',
                component: ComponentCreator('/sdks/ts-sdk/', '419'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/ts-sdk/account',
                component: ComponentCreator('/sdks/ts-sdk/account', 'f4a'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/ts-sdk/fetch-data-from-chain',
                component: ComponentCreator('/sdks/ts-sdk/fetch-data-from-chain', 'b47'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/ts-sdk/http-client',
                component: ComponentCreator('/sdks/ts-sdk/http-client', 'dd0'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/ts-sdk/migration-guide',
                component: ComponentCreator('/sdks/ts-sdk/migration-guide', 'a22'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/ts-sdk/move-types',
                component: ComponentCreator('/sdks/ts-sdk/move-types', '5a8'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/ts-sdk/sdk-configuration',
                component: ComponentCreator('/sdks/ts-sdk/sdk-configuration', '98f'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/ts-sdk/testing',
                component: ComponentCreator('/sdks/ts-sdk/testing', 'b36'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/ts-sdk/transaction-builder',
                component: ComponentCreator('/sdks/ts-sdk/transaction-builder', '06f'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/ts-sdk/typescript',
                component: ComponentCreator('/sdks/ts-sdk/typescript', '8c9'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/sdks/unity-sdk/',
                component: ComponentCreator('/sdks/unity-sdk/', '88e'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/standards/',
                component: ComponentCreator('/standards/', 'efd'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/standards/aptos-coin',
                component: ComponentCreator('/standards/aptos-coin', '280'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/standards/aptos-object',
                component: ComponentCreator('/standards/aptos-object', '7f5'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/standards/aptos-token',
                component: ComponentCreator('/standards/aptos-token', 'd01'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/standards/digital-asset',
                component: ComponentCreator('/standards/digital-asset', 'a28'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/standards/fungible-asset',
                component: ComponentCreator('/standards/fungible-asset', '52f'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/standards/multisig-managed-fungible-asset',
                component: ComponentCreator('/standards/multisig-managed-fungible-asset', '63a'),
                exact: true
              },
              {
                path: '/standards/wallets',
                component: ComponentCreator('/standards/wallets', 'dfe'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/',
                component: ComponentCreator('/tools/aptos-cli/', '5e5'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/install-cli/',
                component: ComponentCreator('/tools/aptos-cli/install-cli/', 'e73'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/install-cli/automated-install',
                component: ComponentCreator('/tools/aptos-cli/install-cli/automated-install', '4bc'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/install-cli/build-from-source',
                component: ComponentCreator('/tools/aptos-cli/install-cli/build-from-source', '314'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/install-cli/download-cli-binaries',
                component: ComponentCreator('/tools/aptos-cli/install-cli/download-cli-binaries', '524'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/install-cli/install-from-brew',
                component: ComponentCreator('/tools/aptos-cli/install-cli/install-from-brew', '2e0'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/install-cli/install-move-prover',
                component: ComponentCreator('/tools/aptos-cli/install-cli/install-move-prover', 'df9'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/use-cli/cli-account',
                component: ComponentCreator('/tools/aptos-cli/use-cli/cli-account', 'ba1'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/use-cli/cli-configuration',
                component: ComponentCreator('/tools/aptos-cli/use-cli/cli-configuration', '188'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/use-cli/cli-genesis',
                component: ComponentCreator('/tools/aptos-cli/use-cli/cli-genesis', '1a4'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/use-cli/cli-key',
                component: ComponentCreator('/tools/aptos-cli/use-cli/cli-key', 'aaa'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/use-cli/cli-node',
                component: ComponentCreator('/tools/aptos-cli/use-cli/cli-node', '73c'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/use-cli/move-tutorials/arguments-in-json-tutorial',
                component: ComponentCreator('/tools/aptos-cli/use-cli/move-tutorials/arguments-in-json-tutorial', 'cec'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/use-cli/move-tutorials/multi-signature-tutorial',
                component: ComponentCreator('/tools/aptos-cli/use-cli/move-tutorials/multi-signature-tutorial', 'ad5'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/use-cli/public-network/run-public-network',
                component: ComponentCreator('/tools/aptos-cli/use-cli/public-network/run-public-network', '3f9'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/use-cli/running-a-local-network',
                component: ComponentCreator('/tools/aptos-cli/use-cli/running-a-local-network', 'c5f'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/use-cli/use-aptos-cli',
                component: ComponentCreator('/tools/aptos-cli/use-cli/use-aptos-cli', '52e'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/use-cli/use-aptos-ledger',
                component: ComponentCreator('/tools/aptos-cli/use-cli/use-aptos-ledger', '959'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tools/aptos-cli/use-cli/working-with-move-contracts',
                component: ComponentCreator('/tools/aptos-cli/use-cli/working-with-move-contracts', '2c3'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tutorials/',
                component: ComponentCreator('/tutorials/', 'b35'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tutorials/build-e2e-dapp/add-wallet-support',
                component: ComponentCreator('/tutorials/build-e2e-dapp/add-wallet-support', 'b91'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tutorials/build-e2e-dapp/create-a-smart-contract',
                component: ComponentCreator('/tutorials/build-e2e-dapp/create-a-smart-contract', '223'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tutorials/build-e2e-dapp/e2e-dapp-index',
                component: ComponentCreator('/tutorials/build-e2e-dapp/e2e-dapp-index', '76c'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tutorials/build-e2e-dapp/fetch-data-from-chain',
                component: ComponentCreator('/tutorials/build-e2e-dapp/fetch-data-from-chain', 'fa8'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tutorials/build-e2e-dapp/handle-tasks',
                component: ComponentCreator('/tutorials/build-e2e-dapp/handle-tasks', 'd0b'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tutorials/build-e2e-dapp/set-up-react-app',
                component: ComponentCreator('/tutorials/build-e2e-dapp/set-up-react-app', '7aa'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tutorials/build-e2e-dapp/submit-data-to-chain',
                component: ComponentCreator('/tutorials/build-e2e-dapp/submit-data-to-chain', '3c8'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tutorials/first-move-module',
                component: ComponentCreator('/tutorials/first-move-module', '841'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tutorials/programmatic-upgradeable-module',
                component: ComponentCreator('/tutorials/programmatic-upgradeable-module', 'bfb'),
                exact: true
              },
              {
                path: '/tutorials/your-first-coin',
                component: ComponentCreator('/tutorials/your-first-coin', '4de'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tutorials/your-first-fungible-asset',
                component: ComponentCreator('/tutorials/your-first-fungible-asset', '78f'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tutorials/your-first-multisig',
                component: ComponentCreator('/tutorials/your-first-multisig', '08f'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tutorials/your-first-nft',
                component: ComponentCreator('/tutorials/your-first-nft', '701'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/tutorials/your-first-transaction',
                component: ComponentCreator('/tutorials/your-first-transaction', '7b6'),
                exact: true,
                sidebar: "appSidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', 'dc5'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
