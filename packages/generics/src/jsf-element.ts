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

import { log } from './form.helpers.js';

/**
 * Base class for JSON Schema Form elements.
 * Implements native `form` attributes.
 * @tagName json-schema-form
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
	public static override properties: Record<
		'data' | 'form' | 'schema' | 'ui' | 'widgets' | keyof NativeFormAttributes,
		PropertyDeclaration
	> = {
		acceptCharset: { attribute: 'accept-charset', type: String },
		action: { type: String },
		autoComplete: { attribute: 'autocomplete', type: String },
		data: { attribute: true, type: Object },
		encType: { attribute: 'enctype', type: String },
		form: { type: Object },
		method: { type: String },
		name: { type: String },
		noValidate: { attribute: 'novalidate', reflect: true, type: Boolean },

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

	override connectedCallback(): void {
		super.connectedCallback();
		this.#listenFormEngine();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#aborter.abort();
	}

	/**
	 * Initialize the form engine with user provided attributes.
	 * This lifecycle hooks is fired with SSR, too, during the single render pass.
	 */
	protected override willUpdate(changed: PropertyValues<this>): void {
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
