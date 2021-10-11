/********************************************************************************
 * Copyright (c) 2021 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0, or the MIT License which is
 * available at https://opensource.org/licenses/MIT.
 *
 * SPDX-License-Identifier: EPL-2.0 OR MIT
 ********************************************************************************/
import { JsonFormsPropertyDataService } from '@eclipse-emfcloud/jsonforms-property-view/lib/browser/property-data-service';
import { UISchemaElement } from '@jsonforms/core';
import { JsonSchema } from '@jsonforms/core/lib/models/jsonSchema';
import { LabelProvider, Navigatable } from '@theia/core/lib/browser';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { inject, injectable } from 'inversify';

import janePerson = require('./resources/Jane.person.json');
import johnPerson = require('./resources/John.person.json');
import typeSchema = require('./resources/typeschema.json');
import uiSchema = require('./resources/uischema.json');

@injectable()
export class JsonFormsResourcePropertyDataService implements JsonFormsPropertyDataService {

    readonly id = 'jsonforms-resources';
    readonly label = 'JsonFormsResourcePropertyDataService';

    @inject(FileService) protected readonly fileService: FileService;
    @inject(LabelProvider) protected readonly labelProvider: LabelProvider;

    canHandleSelection(selection: Object | undefined): number {
        return this.isPersonFileSelection(selection) ? 100 : 0;
    }

    protected isNavigatableSelection(selection: Object | undefined): boolean {
        return !!selection && Navigatable.is(selection);
    }

    protected isPersonFileSelection(selection: Object | undefined): boolean {
        if (this.isNavigatableSelection(selection)) {
            const navigatableUri = (selection as Navigatable).getResourceUri();
            if (navigatableUri) {
                return navigatableUri.path.toString().endsWith('.person');
            }
        }
        return false;
    }

    async providePropertyData(selection: Object): Promise<Object | undefined> {
        if (this.isNavigatableSelection(selection)) {
            const navigatableUri = (selection as Navigatable).getResourceUri();
            if (navigatableUri && navigatableUri.path.name === 'John') {
                return Promise.resolve(johnPerson);
            } else if (navigatableUri && navigatableUri.path.name === 'Jane') {
                return Promise.resolve(janePerson);
            }
        }
        return undefined;
    }

    getSchema(selection: Object, properties?: Object): Promise<JsonSchema | undefined> {
        return Promise.resolve({
            definitions: typeSchema.definitions,
            ...typeSchema.definitions['person']
        });
    }

    getUiSchema(selection: Object, properties?: Object): Promise<UISchemaElement | undefined> {
        return Promise.resolve(uiSchema);
    }

}

