# yamlize

<p align="center">
  <img src="https://user-images.githubusercontent.com/545047/190171475-b416f99e-2831-4786-9ba3-a7ff4d95b0d3.svg" width="80"><br />
   <!-- <a href="https://www.npmjs.com/package/yamlize"><img height="20" src="https://img.shields.io/npm/dt/yamlize"></a> -->
   <!-- <a href="https://www.npmjs.com/package/yamlize"><img height="20" src="https://img.shields.io/npm/dw/yamlize"/></a> -->
   <a href="https://github.com/cosmology-tech/yamlize/blob/main/LICENSE-MIT"><img height="20" src="https://img.shields.io/badge/license-MIT-blue.svg"/></a>
   <a href="https://www.npmjs.com/package/yamlize"><img height="20" src="https://img.shields.io/github/package-json/v/cosmology-tech/yamlize?filename=packages%2Fyamlize%2Fpackage.json"/></a>
   <a href="https://github.com/cosmology-tech/yamlize/actions/workflows/run-tests.yml">
    <img height="20" src="https://github.com/cosmology-tech/yamlize/actions/workflows/run-tests.yml/badge.svg" />
   </a>
</p>


`yamlize` is a powerful tool designed to simplify the creation of YAML files by allowing dynamic generation based on predefined templates and contextual data. This tool is especially useful in environments where configurations need to be adjusted frequently, such as in CI/CD workflows. It provides flexibility in integrating changes seamlessly and ensures configurations are up-to-date with minimal manual intervention.

## install

```sh
npm install yamlize
```

For CI/CD and easier usage, use [our CLI](https://github.com/cosmology-tech/yamlize/tree/main/packages/cli):

```sh
npm install @yamlize/cli
```

or for your own use:

```sh
npm install -g @yamlize/cli
```

## Table of contents

- [yamlize](#yamlize)
  - [Install](#install)
  - [Usage](#usage)
- [Developing](#developing)
- [Credits](#credits)

## Usage

`yamlize` helps you dynamically generate YAML configurations using predefined templates and context. Here’s how to use it with example YAML templates and the corresponding JavaScript function call:

### Example 

**meta.yaml** - This is your main workflow template.

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

**node/setup.yaml** - Sets up your Node.js environment.

```yaml
name: Setup Node.js 🌐
uses: actions/setup-node@v4
with:
  node-version: ${{yamlize.NODE_VERSION}}
  cache: 'yarn'
```

**git/configure.yaml** - Configures Git with user information.

```yaml
name: Configure Git 🛠
run: |
  git config user.name "${{yamlize.git.USER_NAME}}"
  git config user.email "${{yamlize.git.USER_EMAIL}}"
```

### Invoking Yamlize

Provide the `meta.yaml` template and your specific context to generate the complete YAML configuration.

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

### Output Example

Here's the generated YAML configuration reflecting the provided context.

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
