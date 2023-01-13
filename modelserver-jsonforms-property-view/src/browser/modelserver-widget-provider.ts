/********************************************************************************
 * Copyright (c) 2021-2023 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0, or the MIT License which is
 * available at https://opensource.org/licenses/MIT.
 *
 * SPDX-License-Identifier: EPL-2.0 OR MIT
 ********************************************************************************/
import { JsonFormsPropertyViewWidget, JsonFormsPropertyViewWidgetProvider } from '@eclipse-emfcloud/jsonforms-property-view';
import { IncrementalUpdateNotificationV2, Operations } from '@eclipse-emfcloud/modelserver-client';
import { TheiaModelServerClientV2 } from '@eclipse-emfcloud/modelserver-theia';
import { ModelServerSubscriptionServiceV2 } from '@eclipse-emfcloud/modelserver-theia/lib/browser';
import { SelectionService } from '@theia/core/lib/common/selection-service';
import URI from '@theia/core/lib/common/uri';
import { inject, injectable, postConstruct } from 'inversify';
import { debounce } from 'lodash';

@injectable()
export abstract class ModelserverAwareWidgetProvider extends JsonFormsPropertyViewWidgetProvider {
    @inject(TheiaModelServerClientV2) protected readonly modelServerClient: TheiaModelServerClientV2;
    @inject(SelectionService) protected readonly selectionService: SelectionService;
    @inject(ModelServerSubscriptionServiceV2) protected readonly subscriptionService: ModelServerSubscriptionServiceV2;

    protected currentPropertyData: any;
    protected currentModelUri: URI | undefined;

    @postConstruct()
    init(): void {
        this.propertyDataServices = this.propertyDataServices.concat(this.contributions.getContributions());
        this.currentPropertyData = {};
        this.currentModelUri = undefined;

        this.registerWidgetChangeHandler();

        this.jsonFormsWidget.onAttach(() => this.doSubscribe());
        this.jsonFormsWidget.onDetach(() => this.doUnsubscribe());

        this.subscriptionService.onIncrementalUpdateListenerV2(incrementalUpdate => this.updateWidgetData(incrementalUpdate));
    }

    protected registerWidgetChangeHandler(): void {
        this.jsonFormsWidget.onChange(
            debounce((jsonFormsData: Object) => {
                this.handleChanges(jsonFormsData);
            }, 250)
        );
    }

    protected abstract doSubscribe(): void;

    protected abstract doUnsubscribe(): void;

    protected abstract handleChanges(jsonFormsData: Object | undefined): void;

    abstract updateContentWidget(selection: Object | undefined): void;

    protected updateWidgetData(notification: IncrementalUpdateNotificationV2): void {
        if (Operations.isPatch(notification.patch)) {
            this.handleModelUpdate(notification, this.currentPropertyData.semanticUri);
        }
    }

    /**
     * React to a notification from the _Model Server_ of an incremental update in the
     * model from which the _Property View_ currently shows a selection.
     *
     * @param modelUpdate the incremental model update notification
     * @param semanticUri the semantic URI of the object currently selected in the _Property View_
     */
    protected abstract handleModelUpdate(modelUpdate: IncrementalUpdateNotificationV2, semanticUri: string): void;

    provideWidget(selection: Object | undefined): Promise<JsonFormsPropertyViewWidget> {
        return Promise.resolve(this.jsonFormsWidget);
    }
}
