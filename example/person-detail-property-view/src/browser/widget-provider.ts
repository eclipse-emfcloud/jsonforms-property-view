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
import { JsonFormsPropertyViewWidgetProvider } from '@eclipse-emfcloud/jsonforms-property-view';
import { JsonFormsPropertyViewWidget } from '@eclipse-emfcloud/jsonforms-property-view/lib/browser/widget';
import { Navigatable } from '@theia/core/lib/browser';
import { inject, injectable } from 'inversify';

@injectable()
export class ResourcePropertyViewWidgetProvider extends JsonFormsPropertyViewWidgetProvider {

    @inject(JsonFormsPropertyViewWidget) protected jsonFormsWidget: JsonFormsPropertyViewWidget;

    readonly id = 'jsonforms';
    readonly label = 'JsonFormsPropertyViewProvider';

    canHandle(selection: Object | undefined): number {
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

}
