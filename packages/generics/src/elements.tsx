'use html-signal';
import type {
	EncType,
	GenericData,
	GenericFormProperties,
	NativeFormAttributes,
	ReadonlyJSONSchema7,
	TagName,
	Widgets,
} from '@jsfe/engine';
import type { UiSchema } from '@jsfe/engine';

import { JsonSchemaFormEngine } from '@jsfe/engine';
import { isDev } from '@jsfe/engine/logger';
import { SignalWatcher } from '@lit-labs/signals';
import { LitElement, type PropertyDeclaration, type PropertyValues } from 'lit';

import { FormGeneric } from './form-generic.jsx';
import { log } from './form.js';
import * as genericWidgets from './widgets/index.js';

/**
 * Base class for JSON Schema Form elements.
 * Implements native `form` attributes.
 *
 * @template Schema - The JSON Schema type
 * @template Path - The data paths union for form fields
 * @template Data - The data type for the whole form object
 */
export abstract class JsonSchemaFormElement<
	Schema extends ReadonlyJSONSchema7 | undefined = undefined,
	Ui extends UiSchema = UiSchema,
	Data extends GenericData = GenericData,
>
	extends SignalWatcher(LitElement)
	implements GenericFormProperties<Schema, Ui, Data>
{
	public static properties: Record<
		'data' | 'form' | 'schema' | 'ui' | 'widgets' | keyof NativeFormAttributes,
		PropertyDeclaration
	> = {
		acceptCharset: { attribute: 'accept-charset', type: String },
		action: { type: String },
		autoComplete: { type: String },
		data: { attribute: true, type: Object },
		encType: { type: String },
		form: { type: Object },
		method: { type: String },
		name: { type: String },
		noValidate: { reflect: true, type: Boolean },
		schema: { attribute: true, type: Object },
		target: { type: String },
		ui: { attribute: true, type: Object },
		widgets: { type: Object },
	};

	public static readonly tagName: TagName = 'json-schema-form';

	public acceptCharset?: string;
	public action?: string;
	public autoComplete?: 'off' | 'on';
	public data: Data = {} as Data;
	public debug = isDev;
	public encType?: EncType;
	public form: JsonSchemaFormEngine<Schema, Ui, Data> | undefined;
	public method?: 'dialog' | 'get' | 'post';
	public name?: string;
	public noValidate?: boolean;
	public schema: Schema = {} as Schema;
	public target?: string;
	public ui: Ui = {} as Ui;
	public widgets: Partial<Widgets> = {};

	#aborter = new AbortController();

	/**
	 * Wraps the native `customElements.define` with defaults, for convenience.
	 * @param tagName - The name of the custom element
	 * @param ctor - The constructor for the custom element
	 */
	public static define(tagName = this.tagName, ctor = this) {
		// @ts-expect-error Abstract class constructor
		customElements.define(tagName, ctor);
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.#listenFormEngine();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#aborter.abort();
	}

	protected firstUpdated(_changedProperties: PropertyValues): void {}

	/**
	 * Initialize the form engine with user provided attributes.
	 * This lifecycle hooks is fired with SSR, too, during the single render pass.
	 */
	protected willUpdate(changed: PropertyValues<this>): void {
		this.form ??= new JsonSchemaFormEngine(
			this.schema,
			this.ui,
			this.data,
			this.widgets,
		);

		if (changed.has('form')) {
			this.form = new JsonSchemaFormEngine(
				this.schema,
				this.ui,
				this.data,
				this.widgets,
			);
			this.#aborter.abort();
			this.#aborter = new AbortController();
			this.#listenFormEngine();
		}
	}

	#listenFormEngine() {
		const options = { signal: this.#aborter.signal };
		const init = { detail: { form: this.form } };

		this.form?.addEventListener(
			'change',
			() => {
				if (this.debug) log.debug('change');
				this.dispatchEvent(new CustomEvent('jsf-change', init));
			},
			options,
		);
		this.form?.addEventListener(
			'input',
			() => {
				if (this.debug) log.debug('input');

				this.dispatchEvent(new CustomEvent('jsf-input', init));
			},
			options,
		);
	}
}

/**
 * Generic implementation of the JSON Schema Form element
 */
export class JsonSchemaFormGeneric extends JsonSchemaFormElement {
	public static readonly tagName = 'jsf-generic';

	public widgets = genericWidgets;

	protected override render(): unknown {
		if (!this.form) {
			const message = 'Missing form instance';
			log.error(message);
			return this.debug ? message : '';
		}

		return <FormGeneric debug={this.debug} form={this.form} />;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'jsf-generic': JsonSchemaFormGeneric;
	}
}
