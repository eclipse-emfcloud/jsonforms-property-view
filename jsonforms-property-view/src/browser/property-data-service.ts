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
import { JsonSchema, UISchemaElement } from '@jsonforms/core';
import { PropertyDataService } from '@theia/property-view/lib/browser/property-data-service';

export interface JsonFormsPropertyDataService extends PropertyDataService {
    getSchema(selection: any, properties?: any): Promise<JsonSchema | undefined>;
    getUiSchema(selection: any, properties?: any): Promise<UISchemaElement | undefined>;
}

export namespace JsonFormsPropertyDataService {
    export function is(service: PropertyDataService): service is JsonFormsPropertyDataService {
        return !!service && 'getSchema' in service && 'getUiSchema' in service;
    }
}

