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
import { JsonFormsPropertyViewWidget, JsonFormsPropertyViewWidgetProvider } from '@eclipse-emfcloud/jsonforms-property-view';
import {
    CommandExecutionResult,
    ModelServerClient,
    ModelServerMessage,
    ModelServerSubscriptionService
} from '@eclipse-emfcloud/modelserver-theia/lib/common';
import { SelectionService } from '@theia/core/lib/common/selection-service';
import URI from '@theia/core/lib/common/uri';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { inject, injectable } from 'inversify';

@injectable()
export abstract class ModelserverAwareWidgetProvider extends JsonFormsPropertyViewWidgetProvider {

    @inject(ModelServerClient) protected readonly modelServerClient: ModelServerClient;
    @inject(WorkspaceService) readonly workspaceService: WorkspaceService;
    @inject(SelectionService) protected readonly selectionService: SelectionService;
    @inject(ModelServerSubscriptionService) protected readonly subscriptionService: ModelServerSubscriptionService;

    protected currentPropertyData: any;
    protected currentModelUri: string;

    protected abstract handleChanges(jsonFormsData: any): void;

    protected getRelativeModelUri(sourceUri: string): string {
        const workspaceUri = this.workspaceService.getWorkspaceRootUri(new URI(sourceUri));
        if (workspaceUri) {
            const workspaceString = workspaceUri.toString().replace('file://', '');
            const rootUriLength = workspaceString.length;
            return sourceUri.substring(rootUriLength + 1);
        }
        return '';
    }

    abstract updateContentWidget(selection: any): void;

    protected updateWidgetData(message: ModelServerMessage): void {
        if (message.type !== 'incrementalUpdate' && message.type !== 'fullUpdate') {
            return;
        }
        if (message.data instanceof CommandExecutionResult) {
            this.updateViaCommand(message.data, this.currentPropertyData.semanticUri);
        }
    }

    protected abstract updateViaCommand(commandResult: CommandExecutionResult, semanticUri: string): void;

    provideWidget(selection: Object | undefined): Promise<JsonFormsPropertyViewWidget> {
        return Promise.resolve(this.jsonFormsWidget);
    }

}
