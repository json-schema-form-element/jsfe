import type { JsonSchemaFormEngine } from '../engine.js';
import type { ReadonlyJSONSchema7 } from './schema.js';
import type { UiSchema } from './ui-schema.js';
import type { Widgets } from './widgets';

export type ArrayAttributes = BaseHtmlAttributes & {
	size?: number;
};

export interface ArrayChildWidgetOptions<
	Attributes extends HtmlAttributes = HtmlAttributes,
> extends CommonWidgetOptions<Attributes> {
	controls: ArrayChildControls;
}

export type ArrayPrimitiveAttributes = BaseHtmlAttributes & {
	element: 'select';
	size?: number;
};

export interface ArrayPrimitiveWidgetOptions<
	Attributes extends ArrayPrimitiveAttributes = ArrayPrimitiveAttributes,
> extends CommonWidgetOptions<Attributes> {
	enum?: number[] | string[] | undefined;
	size?: number | undefined;
	value: PrimitiveArray;
}

export interface ArrayWidgetOptions<
	Attributes extends HtmlAttributes = HtmlAttributes,
> extends CommonWidgetOptions<Attributes> {
	children: ArrayChildWidgetOptions[];
	controls: ArrayControls;
	// itemControlsLabel?: string | undefined;
	itemLabel: string;

	value: unknown[];
}

export interface BaseHtmlAttributes {
	'aria-describedby'?: string | undefined;
	'aria-description'?: string | undefined;
	ariaDescribedBy?: string;
	ariaDescription?: string;
	disabled?: boolean | undefined;
	id: string;
	name: string;
	readonly?: boolean | undefined;
	required?: boolean | undefined;
	// element: null;
}

export type BooleanInputAttributes = BaseHtmlAttributes & {
	checked?: boolean;

	element: 'input';
	type: 'checkbox' | 'radio' | null;
	value?: boolean | undefined;
};

export interface CommonWidgetOptions<
	Attributes extends BaseHtmlAttributes = BaseHtmlAttributes,
> {
	classes: {
		child?: string;
		childLabel?: string;
		children?: string;
		constraints?: string;
		helpText?: string;
		input?: string;
		inputChild?: string;
		label?: string;
		root?: string;
	};
	form: JsonSchemaFormEngine;
	helpText?: string | undefined;
	html: Attributes;
	label?: string | undefined;
	labelHidden?: boolean | undefined;
	level: number;
	path: PathArray;
	pathAsString: string;
	schema: ReadonlyJSONSchema7;

	widget: keyof Widgets | null;
}

export type DateInputAttributes = BaseHtmlAttributes & {
	element: 'input';

	// TODO: Date constraints
	// max?: string | undefined;
	// min?: string | undefined;
	type: 'date' | 'datetime-local' | 'month' | 'time' | 'week';
	value?: string | undefined;
};

export type EnumHtmlAttributes = BaseHtmlAttributes & {
	element: 'select';
	value?: number | string | undefined;
};
export interface EnumWidgetOptions<
	Attributes extends EnumHtmlAttributes = EnumHtmlAttributes,
> extends PrimitiveWidgetOptions<Attributes> {
	enum?: number[] | string[] | undefined;
	type?: 'integer' | 'number' | 'string' | undefined;
}

export interface FeatureFlags {
	additionalItems?: boolean;
	additionalProperties?: boolean;
	allOf?: boolean;
	oneOf?: boolean;
}

export type FormAssociatedElement =
	| HTMLButtonElement
	| HTMLFieldSetElement
	| HTMLInputElement
	| HTMLObjectElement
	| HTMLOutputElement
	| HTMLSelectElement
	| HTMLTextAreaElement;

export type FormFieldElement =
	| HTMLInputElement
	| HTMLSelectElement
	| HTMLTextAreaElement;

export type HtmlAttributes =
	| ArrayAttributes
	| BaseHtmlAttributes
	| BooleanInputAttributes
	| DateInputAttributes
	| EnumHtmlAttributes
	| NullHtmlAttributes
	| NumberInputAttributes
	| ObjectInputAttributes
	| StringInputAttributes;

export type NullHtmlAttributes = BaseHtmlAttributes & {
	element: null;
};
export type NumberInputAttributes = BaseHtmlAttributes & {
	element: 'input';

	max?: number | undefined;
	min?: number | undefined;
	step?: 'any' | number | undefined;
	type: 'number' | 'range';
	value?: number | undefined;
};

export type ObjectInputAttributes = BaseHtmlAttributes & {
	element: 'fieldset';
};

export interface ObjectWidgetOptions<
	Attributes extends ObjectInputAttributes = ObjectInputAttributes,
> extends CommonWidgetOptions<Attributes> {
	children: CommonWidgetOptions[];
}

export type PathArray = (number | string)[];
export type Primitive = boolean | number | string | undefined;

export type PrimitiveArray = boolean[] | number[] | string[] | undefined;

export interface PrimitiveWidgetOptions<
	Attributes extends HtmlAttributes = HtmlAttributes,
> extends CommonWidgetOptions<Attributes> {
	falseLabel?: string;
	trueLabel?: string;
	value?: Primitive;
}

export interface StringAttributes {
	maxLength?: number | undefined;

	minLength?: number | undefined;
	pattern?: string | undefined;
	placeholder?: string;
	value?: string | undefined;
}

export type StringInputAttributes = TextareaAttributes | TextInputAttributes;

export type TextareaAttributes = BaseHtmlAttributes &
	StringAttributes & {
		element: 'textarea';
		type: never;
	};

export type TextInputAttributes = BaseHtmlAttributes &
	StringAttributes & {
		element: 'input';
		type: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
	};

export interface WidgetTypeBaseParameters {
	data: unknown;
	form: JsonSchemaFormEngine;
	level: number;
	path: PathArray;
	pathAsString: string;
	required: boolean;
	schema: ReadonlyJSONSchema7;
	schemaPath: PathArray;
	uiSchema: UiSchema;
	// classes: Record<string, string>;
	// uiState: Record<string | number, unknown>;
}

interface ArrayChildControls {
	delete: {
		click: (_event: Event) => void;
	};
	down: {
		click: (_event: Event) => void;
		disabled: boolean;
	};
	handle: {
		dragstart: (event: DragEvent) => void;
		mousedown: (_event: MouseEvent) => void;
	};
	up: {
		click: (_event: Event) => void;
		disabled: boolean;
	};
	wrapper: {
		dragenter: (event: DragEvent) => void;
		dragleave: (event: DragEvent) => void;
		dragover: (event: DragEvent) => void;
		drop: (event: DragEvent) => void;
	};
}
interface ArrayControls {
	add: { click: (_event: Event) => void };
}
