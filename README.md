# Eclipse EMF Cloud JSONForms property-view for Eclipse Theia applications [![build-CI](https://img.shields.io/github/actions/workflow/status/eclipse-emfcloud/jsonforms-property-view/build-ci.yml?label=Build%20CI)](https://github.com/eclipse-emfcloud/jsonforms-property-view/actions/workflows/build-ci.yml)

[![Aim - Framework](https://img.shields.io/badge/Aim-Framework-brightgreen)](https://github.com/eclipsesource/.github/blob/main/repository-classification.md)
[![Project - Maintenance](https://img.shields.io/badge/Project-Maintenance-872ea4)](https://github.com/eclipsesource/.github/blob/main/repository-classification.md)
[![License: EPL v2.0](https://img.shields.io/badge/License-EPL%20v2.0-yellow.svg)](https://www.eclipse.org/legal/epl-2.0/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository contains a framework. It is meant as a library or platform for implementing certain features or types of products, or can be used as a product directly. It is designed to be reusable, customizable, and ready for production.

This repository is in maintenance mode. The maintainers will focus on issues relevant to their adoption use cases only.

For more information, please visit the [EMF Cloud Website](https://www.eclipse.org/emfcloud/).

If you are interested in adopting this framework for your product or enhancing its feature spectrum, please get in contact with us using the [discussions forum](https://github.com/eclipse-emfcloud/emfcloud/discussions) and have a look at our [support options](https://www.eclipse.org/emfcloud/contact/)!

## Available via NPM [![publish-CI](https://img.shields.io/github/actions/workflow/status/eclipse-emfcloud/jsonforms-property-view/publish-ci.yml?label=Publish%20CI)](https://github.com/eclipse-emfcloud/jsonforms-property-view/actions/workflows/publish-ci.yml)

- [`@eclipse-emfcloud/jsonforms-property-view`](https://www.npmjs.com/package/@eclipse-emfcloud/jsonforms-property-view)

## Project structure

### [`@eclipse-emfcloud/jsonforms-property-view`](./jsonforms-property-view/README.md)

This package provides a framework to integrate a form-based property-view using JSONForms in an Eclipse Theia application.
For more details on the Eclipse Theia property-view please visit the `@theia/property-view` [documentation](https://github.com/eclipse-theia/theia/tree/master/packages/property-view).

### [`example/person-detail-property-view`](./example/person-detail-property-view)

This basic development example uses the jsonforms-property-view in a minimal Eclipse Theia browser application.

### [`@eclipse-emfcloud/modelserver-jsonforms-property-view`](./modelserver-jsonforms-property-view/README.md)

#### :warning: **This package is a demo only.**

It is not part of the default workspace anymore and not built automatically anymore.

This package provides a [Model Server](https://github.com/eclipse-emfcloud/emfcloud-modelserver) aware version of the jsonforms-property-view.

## Preview

![Preview of jsonforms-property-view](./documentation/jsonforms-property-view-preview.gif)

## Getting started

Install [nvm](https://github.com/creationix/nvm#install-script).

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

Install npm and node.

    nvm install 20
    nvm use 20

Install yarn.

    npm install -g yarn

### Building and Linting

#### Install dependencies and build the framework and example

    yarn

#### Linting with ESLint

    yarn lint

#### Build and Lint Together

    yarn all

## Run Example

    yarn start

The example browser app runs at [http://localhost:3000](http://localhost:3000).

## License

This program and the accompanying materials are made available under the
terms of the Eclipse Public License v. 2.0 which is available at
<http://www.eclipse.org/legal/epl-2.0>.

This Source Code may also be made available under the following Secondary
Licenses when the conditions for such availability set forth in the Eclipse
Public License v. 2.0 are satisfied: MIT.

SPDX-License-Identifier: EPL-2.0 OR MIT
