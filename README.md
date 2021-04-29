# JSONForms property-view for Eclipse Theia applications ![build-status](https://img.shields.io/jenkins/build?jobUrl=https://ci.eclipse.org/emfcloud/job/eclipse-emfcloud/job/jsonforms-property-view/job/master/) 


[![License: EPL v2.0](https://img.shields.io/badge/License-EPL%20v2.0-yellow.svg)](https://www.eclipse.org/legal/epl-2.0/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Available via NPM ![build-status-server](https://img.shields.io/jenkins/build?jobUrl=https://ci.eclipse.org/emfcloud/job/deploy-jsonforms-property-view-npm/&label=publish)
- https://www.npmjs.com/package/@eclipse-emfcloud/jsonforms-property-view
- https://www.npmjs.com/package/@eclipse-emfcloud/modelserver-jsonforms-property-view

## Dependencies
[<img src="https://img.shields.io/badge/dynamic/json?color=blue&url=https://raw.githubusercontent.com/eclipse-emfcloud/theia-tree-editor/master/theia-tree-editor/package.json&query=$.dependencies%5B%27%40jsonforms%2Fcore%27%5D&label=JSONForms&logo=JSONForms" alt="JSONForms"/>](https://github.com/eclipsesource/jsonforms)
[<img src="https://img.shields.io/badge/dynamic/json?color=blue&url=https://raw.githubusercontent.com/eclipse-emfcloud/theia-tree-editor/master/theia-tree-editor/package.json&query=$.dependencies%5B%27%40theia%2Fcore%27%5D&label=Theia&logo=Theia" alt="Theia"/>](https://github.com/eclipse-theia/theia)

## Project structure

### [`@eclipse-emfcloud/jsonforms-property-view`](./jsonforms-property-view/README.md)
This package provides a framework to integrate a form-based property-view using JSONForms in an Eclipse Theia application.
For more details on the Eclipse Theia property-view please visit the `@theia/property-view` [documentation](https://github.com/eclipse-theia/theia/tree/master/packages/property-view).

### [`@eclipse-emfcloud/modelserver-jsonforms-property-view`](./modelserver-jsonforms-property-view/README.md)
This package provides a [Model Server](https://github.com/eclipse-emfcloud/emfcloud-modelserver) aware version of the jsonforms-property-view.

### [`example/person-detail-property-view`](./example/person-detail-property-view)
This basic development example uses the jsonforms-property-view in a minimal Eclipse Theia browser application.

For more information, please visit the [EMF.cloud Website](https://www.eclipse.org/emfcloud/).
If you have questions, contact us on our [spectrum chat](https://spectrum.chat/emfcloud/)
and have a look at our [communication and support options](https://www.eclipse.org/emfcloud/contact/).

## Getting started

Install [nvm](https://github.com/creationix/nvm#install-script).

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash

Install npm and node.

    nvm install 12.19.1
    nvm use 12.19.1

Install yarn.

    npm install -g yarn

Install dependencies and build framework and example

    yarn

## Run Example

    yarn start


The example browser app runs at [http://localhost:3000](http://localhost:3000).

## License

This program and the accompanying materials are made available under the
terms of the Eclipse Public License v. 2.0 which is available at
http://www.eclipse.org/legal/epl-2.0.

This Source Code may also be made available under the following Secondary
Licenses when the conditions for such availability set forth in the Eclipse
Public License v. 2.0 are satisfied: MIT.

SPDX-License-Identifier: EPL-2.0 OR MIT
