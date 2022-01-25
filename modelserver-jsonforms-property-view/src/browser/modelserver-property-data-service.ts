/********************************************************************************
 * Copyright (c) 2021-2022 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0, or the MIT License which is
 * available at https://opensource.org/licenses/MIT.
 *
 * SPDX-License-Identifier: EPL-2.0 OR MIT
 ********************************************************************************/
import { JsonFormsPropertyDataService } from '@eclipse-emfcloud/jsonforms-property-view';
import { TheiaModelServerClient } from '@eclipse-emfcloud/modelserver-theia';
import { JsonSchema, UISchemaElement } from '@jsonforms/core';
import { inject, injectable } from 'inversify';

@injectable()
export abstract class ModelServerPropertyDataService implements JsonFormsPropertyDataService {

    @inject(TheiaModelServerClient) protected readonly modelServerClient: TheiaModelServerClient;

    readonly id: string;
    readonly label: string;

    abstract getSchema(selection: Object | undefined, properties?: Object | undefined): Promise<JsonSchema | undefined>;
    abstract getUiSchema(selection: Object | undefined, properties?: Object | undefined): Promise<UISchemaElement | undefined>;

    abstract canHandleSelection(selection: Object | undefined): number;
    abstract providePropertyData(selection: Object | undefined): Promise<Object | undefined>;

}

