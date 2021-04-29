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
import { JsonFormsCore, JsonSchema, UISchemaElement } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';
import {
    JsonFormsStyleContext,
    StyleContext,
    vanillaCells,
    vanillaRenderers,
    vanillaStyles
} from '@jsonforms/vanilla-renderers';
import { Message } from '@phosphor/messaging/lib';
import { Emitter, Event } from '@theia/core';
import { BaseWidget } from '@theia/core/lib/browser';
import { PropertyViewContentWidget } from '@theia/property-view/lib/browser/property-view-content-widget';
import { injectable, postConstruct } from 'inversify';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { JsonFormsPropertyDataService } from './property-data-service';

@injectable()
export class JsonFormsPropertyViewWidget extends BaseWidget implements PropertyViewContentWidget {

    protected widgetId = 'jsonforms-property-view';
    protected widgetLabel = 'Properties';

    protected jsonFormsChangeEmitter = new Emitter<Readonly<any>>();
    protected jsonFormsOnChange: (state: Pick<JsonFormsCore, 'data' | 'errors'>) => void;

    protected currentTypeSchema: any;
    protected currentUiSchema: any;

    @postConstruct()
    init(): void {
        this.id = this.widgetId;
        this.title.label = this.widgetLabel;
        this.title.caption = this.widgetLabel;
        this.title.iconClass = 'fa fa-table';
        this.title.closable = true;

        this.addClass('jsonforms-property-view');
        this.node.tabIndex = 0;

        this.toDispose.push(this.jsonFormsChangeEmitter);
        this.jsonFormsOnChange = (state: Pick<JsonFormsCore, 'data' | 'errors'>) => this.jsonFormsChangeEmitter.fire(state.data);
        this.renderEmptyForms();
    }

    protected onActivateRequest(msg: Message): void {
        super.onActivateRequest(msg);
        this.node.focus();
    }

    get onChange(): Event<Readonly<any>> {
        return this.jsonFormsChangeEmitter.event;
    }

    async updatePropertyViewContent(propertyDataService?: JsonFormsPropertyDataService, selection?: Object | undefined): Promise<void> {
        if (propertyDataService && selection && JsonFormsPropertyDataService.is(propertyDataService)) {
            const properties = await propertyDataService.providePropertyData(selection);
            this.currentTypeSchema = await propertyDataService.getSchema(selection, properties);
            this.currentUiSchema = await propertyDataService.getUiSchema(selection, properties);
            this.renderForms(properties, this.currentTypeSchema, this.currentUiSchema);
        } else {
            this.renderEmptyForms();
        }
    }

    updatePropertyViewData(updatedPropertyData: Object | undefined): void {
        if (updatedPropertyData) {
            this.renderForms(updatedPropertyData, this.currentTypeSchema, this.currentUiSchema);
        } else {
            this.renderEmptyForms();
        }
    }

    protected renderForms(properties: any, typeSchema: JsonSchema | undefined, uiSchema: UISchemaElement | undefined): void {
        ReactDOM.render(
            <JsonFormsStyleContext.Provider value={this.getStyleContext()}>
                <JsonForms
                    data={properties}
                    schema={typeSchema}
                    uischema={uiSchema}
                    cells={vanillaCells}
                    renderers={vanillaRenderers}
                    onChange={this.jsonFormsOnChange}
                    refParserOptions={{
                        dereference: { circular: 'ignore' }
                    }}
                />
            </JsonFormsStyleContext.Provider>,
            this.node
        );
    }

    protected renderEmptyForms(): void {
        ReactDOM.render(
            <div className="theia-widget-noInfo">{'No properties available.'}</div>,
            this.node
        );
    }

    protected getStyleContext(): StyleContext {
        // Extend default vanilla styles with theia-specific styling
        return {
            styles: [
                ...vanillaStyles,
                {
                    name: 'array.button',
                    classNames: ['theia-button']
                },
                {
                    name: 'array.table.button',
                    classNames: ['theia-button']
                },
                {
                    name: 'control.input',
                    classNames: ['theia-input']
                },
                {
                    name: 'control.select',
                    classNames: ['theia-select']
                }
            ]
        };
    }

}
