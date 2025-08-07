// import type { StandardSchemaV1 } from '@standard-schema/spec';

import { Logger } from '@jsfe/engine/logger';
import { Signal } from 'signal-polyfill';

import type {
	CommonWidgetOptions,
	FeatureFlags,
	FormFieldElement,
	GenericData,
	ObjectWidgetOptions,
	PathArray,
} from './types/form.js';
import type { UiSchema, Widgets } from './types/index.js';
import type { ReadonlyJSONSchema7 } from './types/index.js';
import type { FieldPathFromSchema } from './types/paths.js';

import { traverse } from './traverse.js';
import { setSafe } from './utils/object-paths.js';

const log = new Logger();

export class JsonSchemaFormEngine<
	Schema extends ReadonlyJSONSchema7 | undefined = undefined,
	Ui extends UiSchema = UiSchema,
	Data extends GenericData = GenericData,
	Path extends string = Schema extends ReadonlyJSONSchema7
		? FieldPathFromSchema<Schema>
		: string,
> extends EventTarget {
	public readonly $data = new Signal.State({} as Data);

	public readonly $rootField;

	public experimental: FeatureFlags = { allOf: false };

	public traverse = traverse;

	public get data(): Data {
		return this.$data.get();
	}

	public get field(): Record<Path, CommonWidgetOptions> {
		const fields: Record<string, CommonWidgetOptions> = {};

		function recurse(field: CommonWidgetOptions | ObjectWidgetOptions) {
			fields[field.pathAsString] = field;

			if ('fields' in field) for (const child of field.fields) recurse(child);
		}
		recurse(this.rootField);

		return fields;
	}

	public get rootField(): CommonWidgetOptions {
		return this.$rootField.get();
	}

	public constructor(
		public readonly schema: Schema = {} as Schema,
		public readonly ui: Ui = {} as Ui,
		/** Initial data */
		data: Data = {} as Data,
		public readonly widgets: Partial<Widgets> = {},
		public readonly name?: string,
	) {
		super();

		this.$data.set(data);

		this.$rootField = new Signal.Computed(() =>
			this.traverse({
				data: this.data,
				form: this,
				level: 0,
				path: [],
				pathAsString: '__root',
				required: false,
				schema: this.schema ?? {},
				schemaPath: [],
				uiSchema: this.ui,
			}),
		);
	}

	public handleChange(
		path: PathArray | string,
		value: unknown,
		// NOTE: Partially implemented
		_schemaPath?: PathArray,
	) {
		const updatedData = { ...this.data };
		setSafe(updatedData, path, value);

		this.$data.set(updatedData);

		this.dispatchEvent(new Event('change'));
		log.debug({ updatedData: this.$data.get() });
	}

	// TODO: Input/Change distinction.
	public handleFormEvent(event: Event | InputEvent /*  coerce = true */) {
		const fieldElement = event.target as FormFieldElement;

		const nameAttribute = fieldElement.getAttribute('name');
		if (!nameAttribute)
			throw new ReferenceError(
				`Missing name attribute for path "${fieldElement.name}".`,
			);

		const field =
			nameAttribute in this.field ? this.field[nameAttribute as Path] : null;

		if (!field)
			throw new ReferenceError(
				`Missing field for path "${fieldElement.name}".`,
			);

		let value: unknown = fieldElement.value;
		if (field.schema.type === 'boolean' && 'checked' in fieldElement) {
			value = fieldElement.checked;
		}

		// TODO: Extract coercion to helper
		if (
			// coerce &&
			field.schema.type === 'number' &&
			'valueAsNumber' in fieldElement
		)
			// if (fieldElement instanceof HTMLInputElement) {
			value = fieldElement.valueAsNumber;

		// TODO: Date…
		// console.debug({ field: field.path });
		// if (value === undefined) throw new Error('Unhandled type.');
		// event.target?.dispatchEvent(
		// 	new Event(event.type, { bubbles: true, composed: true }),
		// );

		this.handleChange(nameAttribute, value);
	}

	public handleFormSubmit(event: SubmitEvent) {
		const formElement = event.target as HTMLFormElement | null;
		if (!formElement) throw new ReferenceError('Missing form element.');

		// IDEA: Parametrize?
		event.preventDefault();

		let formData;
		try {
			formData = new FormData(formElement);
		} catch {
			log.warn('FormData not available in this environment');
		}

		// formElement.dispatchEvent(
		// 	new Event('submit', { bubbles: true, composed: true }),
		// );
		this.dispatchEvent(new Event('submit'));

		return { formData, json: this.data };
	}

	public submit() {
		this.dispatchEvent(new Event('submit'));
	}
}
