import {
	type CommonWidgetOptions,
	JsonSchemaFormEngine,
	type Widgets,
} from '@jsfe/engine';
import { isDev, Logger } from '@jsfe/engine/logger';
import { html, SignalWatcher } from '@lit-labs/signals';
import { LitElement, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import * as widgets from './widgets/index.js';

const log = new Logger();

interface NativeForm {
	'accept-charset'?: string;
	action?: string;
	autocomplete?: 'off' | 'on';
	enctype?:
		| 'application/x-www-form-urlencoded'
		| 'multipart/form-data'
		| 'text/plain';
	method?: 'dialog' | 'get' | 'post';
	name?: string;
	novalidate?: boolean;
	target?: string;
}

export abstract class JsonSchemaFormElement
	extends SignalWatcher(LitElement)
	implements NativeForm
{
	static readonly tagName: `${string}-${string}` = 'json-schema-form';
	@property() acceptCharset?: string;
	@property() action?: string;

	@property() autocomplete?: 'off' | 'on';

	@property({ attribute: 'data', type: Object }) data = {};

	@property() enctype?:
		| 'application/x-www-form-urlencoded'
		| 'multipart/form-data'
		| 'text/plain';

	@property({ type: Object })
	form: JsonSchemaFormEngine | null = null;

	@property() method?: 'dialog' | 'get' | 'post';

	@property() name?: string;
	@property({ reflect: true, type: Boolean }) novalidate?: boolean;
	@property({ attribute: 'schema', type: Object }) schema = {};
	@property() target?: string;
	@property({ attribute: 'ui', type: Object }) ui = {};

	widgets: Partial<Widgets> = {} as never;

	static readonly Debugger = (form: JsonSchemaFormEngine) =>
		html` <div>
				${isDev ? 'Development mode' : null}
				<code>${this.tagName}</code>
			</div>
			<pre>${JSON.stringify(form.$data.get(), null, 2)}</pre>

			<details>
				<pre>${JSON.stringify(form.schema, null, 2)}</pre>
				<pre>${JSON.stringify(form.rootField, null, 2)}</pre>
			</details>`;

	static define(tagName?: string) {
		customElements.define(tagName ?? this.tagName, JsonSchemaFormGeneric);
	}

	render() {
		return html``;
	}

	willUpdate() {
		this.form ??= new JsonSchemaFormEngine(
			this.schema as never,
			this.ui,
			this.data,
		);
	}
}
// @customElement('jsfe-form-wa')
export class JsonSchemaFormGeneric extends JsonSchemaFormElement {
	// NOTE: Legitimate use case, so we can push style before instante creation
	// eslint-disable-next-line sonarjs/public-static-readonly
	static styles = [
		/* Empty */
	];

	static readonly tagName = 'jsf-generic';

	debug = isDev;

	widgets = widgets;

	render() {
		if (!this.form) {
			const message = 'Missing form instance';
			log.error(message);
			return html`${this.debug ? message : ''}`;
		}

		return html`
			${this.debug ? JsonSchemaFormGeneric.Debugger(this.form) : null}
			<!--  -->
			${Form({
				children: html` <!--  -->
					${WidgetTree({
						rootField: this.form.rootField,
						widgets: this.widgets,
					})}

					<!-- FIXME: Args -->
					${this.widgets.Submit({} as never)}`,
				form: this.form,
			})}

			<!--  -->
		`;
	}

	protected firstUpdated(_changedProperties: PropertyValues): void {
		this.form?.addEventListener('change', () => {
			log.debug('change');
			// this.requestUpdate();
		});
		this.form?.addEventListener('input', () => {
			log.debug('input');
			// this.requestUpdate();
		});
	}
}

export function Form(
	options: NativeForm & { children: unknown; form: JsonSchemaFormEngine },
) {
	return html`
		<form
			@submit=${(event: SubmitEvent) => {
				options.form.handleFormSubmit(event);
			}}
			@input=${(event: InputEvent) => {
				options.form.handleFormEvent(event);
			}}
			@change=${(event: InputEvent) => {
				options.form.handleFormEvent(event);
			}}
			@reset=${() => {
				/* TODO: options._onReset; */
			}}
			action=${ifDefined(options.action)}
			method=${ifDefined(options.method)}
			enctype=${ifDefined(options.enctype)}
			target=${ifDefined(options.target)}
			name=${ifDefined(options.name)}
			autocomplete=${ifDefined(options.autocomplete)}
			accept-charset=${
				ifDefined(
					options['accept-charset'],
				) /* TODO: Test Lit (?) case conversion */
			}
			?novalidate=${options.novalidate}
		>
			${options.children}
		</form>
	`;
}

export function WidgetTree({
	rootField,
	widgets,
}: {
	rootField: CommonWidgetOptions;
	widgets: Partial<Widgets>;
}): unknown {
	const widgetType = rootField.widget;

	if (widgetType && widgetType in widgets) {
		// @ts-expect-error Should be good.
		const fieldContent = widgets[widgetType](rootField);

		return fieldContent;
	}
	log.debug({ rootField, widgets, widgetType });

	return `Missing widget of type ${widgetType?.toString() ?? 'unknown'}`;
}

declare global {
	interface HTMLElementTagNameMap {
		'jsf-generic': JsonSchemaFormGeneric;
	}
}
