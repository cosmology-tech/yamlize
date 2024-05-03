# yamlize

<p align="center">
  <img src="https://user-images.githubusercontent.com/545047/188804067-28e67e5e-0214-4449-ab04-2e0c564a6885.svg" width="80"><br />
    Generate YAML
</p>

## install

```sh
npm install yamlize
```

## Table of contents

- [yamlize](#yamlize)
  - [Install](#install)
  - [Usage](#usage)
- [Developing](#developing)
- [Credits](#credits)

## Usage

Here is `meta.yaml`

```yaml
name: Build

on:
  workflow_dispatch:

jobs:
  build-artifacts: 
  - import-yaml: node/setup.yaml

  - import-yaml: git/configure.yaml

  - name: Install and Build 🚀
    run: |
      yarn
```

Here is `node/setup.yaml`

```yaml
name: Setup Node.js 🌐
uses: actions/setup-node@v4
with:
  node-version: ${{yamlize.NODE_VERSION}}
  cache: 'yarn'
```

Here is `git/configure.yaml`

```yaml
name: Configure Git 🛠
run: |
  git config user.name "${{yamlize.git.USER_NAME}}"
  git config user.email "${{yamlize.git.USER_EMAIL}}"
```

Now call `yamlize`, and provide a context

```js
    yamlize(metaYaml, outFile, {
        git: {
            USER_NAME: 'Cosmology',
            USER_EMAIL: 'developers@cosmology.zone',
        },
        EMSCRIPTEN_VERSION: '3.1.59',
        NODE_VERSION: '20.x' 
    });
```

Output:

```yaml
name: Build
on:
  workflow_dispatch: null
jobs:
  build-artifacts:
    - name: Setup Node.js 🌐
      uses: actions/setup-node@v4
      with:
        node-version: 20.x
        cache: yarn
    - name: Configure Git 🛠
      run: |
        git config user.name "Cosmology"
        git config user.email "developers@cosmology.zone"
    - name: Install and Build 🚀
      run: |
        yarn
```

## Developing

When first cloning the repo:

```
yarn
yarn build
```

## Related

Checkout these related projects:

* [@cosmology/telescope](https://github.com/cosmology-tech/telescope) Your Frontend Companion for Building with TypeScript with Cosmos SDK Modules.
* [@cosmwasm/ts-codegen](https://github.com/CosmWasm/ts-codegen) Convert your CosmWasm smart contracts into dev-friendly TypeScript classes.
* [chain-registry](https://github.com/cosmology-tech/chain-registry) Everything from token symbols, logos, and IBC denominations for all assets you want to support in your application.
* [cosmos-kit](https://github.com/cosmology-tech/cosmos-kit) Experience the convenience of connecting with a variety of web3 wallets through a single, streamlined interface.
* [create-cosmos-app](https://github.com/cosmology-tech/create-cosmos-app) Set up a modern Cosmos app by running one command.
* [interchain-ui](https://github.com/cosmology-tech/interchain-ui) The Interchain Design System, empowering developers with a flexible, easy-to-use UI kit.
* [starship](https://github.com/cosmology-tech/starship) Unified Testing and Development for the Interchain.

## Credits

🛠 Built by Cosmology — if you like our tools, please consider delegating to [our validator ⚛️](https://cosmology.zone/validator)


## Disclaimer

AS DESCRIBED IN THE LICENSES, THE SOFTWARE IS PROVIDED “AS IS”, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND.

No developer or entity involved in creating this software will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of the code, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value.
