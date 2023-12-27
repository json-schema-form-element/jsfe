import type { TemplateResult } from 'lit';

export interface WidgetBaseParams<V = undefined> {
	id: string;
	required?: boolean;

	value?: V;
	label?: string;
	helpText?: string;
	placeholder?: string;

	valueChangedCallback?: (value?: V) => void;
	handleKeydown?: (event: KeyboardEvent) => void;
}

type Widget<T = undefined, V = null> = (
	args: WidgetBaseParams<V> & T,
) => TemplateResult<1>;

export interface Widgets {
	text?: Widget<
		{
			pattern?: string;
			maxLength?: number;
			minLength?: number;

			inputType: 'email' | 'password' | 'tel' | 'text' | 'url';
		},
		string
	>;

	textarea?: Widget<
		{
			maxLength?: number;
			minLength?: number;
		},
		string
	>;

	colorPicker?: Widget<
		{
			// pattern?: string;
		},
		string
	>;

	number?: Widget<
		{
			min?: number;
			max?: number;
			step?: number | 'any';
		},
		number
	>;

	date?: Widget<
		{
			type: 'date' | 'datetime-local' | 'time';
		},
		Date | string | undefined
	>;

	rating?: Widget<
		{
			min?: number;
			max?: number;
			step?: number | 'any';
		},
		number
	>;

	range?: Widget<
		{
			min?: number;
			max?: number;
			step?: number | 'any';
		},
		number
	>;

	checkbox?: Widget<undefined, boolean>;

	switch?: Widget<undefined, boolean>;

	radioGroupBoolean?: Widget<
		{
			trueLabel?: string;
			falseLabel?: string;
		},
		boolean
	>;

	buttonGroupBoolean?: Widget<
		{
			trueLabel?: string;
			falseLabel?: string;
		},
		boolean
	>;

	select?: Widget<
		{
			enum?: string[] | number[];
			type: 'number' | 'integer' | 'string';
		},
		string | number
	>;

	object?: Widget<
		{
			children: TemplateResult<1> | TemplateResult<1>[];
			level: number;
		},
		unknown
	>;

	radioGroup?: Widget<
		{
			type: 'string' | 'number';
			enum: string[] | number[];
		},
		string | number
	>;

	buttonGroup?: Widget<
		{
			type: 'string' | 'number';
			enum: string[] | number[];
		},
		string | number
	>;

	checkboxGroup?: Widget<
		{
			// type: 'string' | 'number';
			enum: (string | number)[];

			// items: (string[])
		},
		// [string | number, boolean]
		(string | number)[]
	>;

	callout?: Widget<{
		message: string;
		type?: 'tip' | 'warning' | 'danger';
	}>;

	submit?: Widget<{ id?: string; label?: string }>;
}
