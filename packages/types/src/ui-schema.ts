export type UiOptions = {
	'ui:help'?: string;
	'ui:placeholder'?: string;

	'ui:title'?: string;
	'ui:description'?: string;

	'ui:widget'?:
		| 'radio'
		| 'button'
		| 'textarea'
		| 'color'
		| 'range'
		| 'password'
		| 'rating'
		| 'select'
		| 'switch';
};

type PropertyLevel = {
	[propertyLevelChildKey: string]: UiOptions | PropertyLevel;
};

export type UiSchema = UiOptions | PropertyLevel;
