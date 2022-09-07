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
import { DefaultPropertyViewWidgetProvider } from '@theia/property-view/lib/browser/property-view-widget-provider';
import { inject, injectable } from 'inversify';

import { JsonFormsPropertyDataService } from './property-data-service';
import { JsonFormsPropertyViewWidget } from './widget';

@injectable()
export abstract class JsonFormsPropertyViewWidgetProvider extends DefaultPropertyViewWidgetProvider {
    @inject(JsonFormsPropertyViewWidget) protected jsonFormsWidget: JsonFormsPropertyViewWidget;

    readonly id = 'jsonforms';
    readonly label = 'JsonFormsPropertyViewProvider';

    abstract canHandle(selection: Object | undefined): number;

    provideWidget(selection: Object | undefined): Promise<JsonFormsPropertyViewWidget> {
        return Promise.resolve(this.jsonFormsWidget);
    }

    protected async getJsonFormsPropertyDataService(selection: Object | undefined): Promise<JsonFormsPropertyDataService | undefined> {
        const dataService = (await this.prioritize(selection)) ?? this.propertyDataServices[0];
        if (dataService && JsonFormsPropertyDataService.is(dataService)) {
            return dataService as JsonFormsPropertyDataService;
        }
        return undefined;
    }

    updateContentWidget(selection: Object | undefined): void {
        this.getJsonFormsPropertyDataService(selection).then(service => this.jsonFormsWidget.updatePropertyViewContent(service, selection));
    }
}
