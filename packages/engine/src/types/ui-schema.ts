export interface UiSchema extends UiSchemaProperties {
	[key: string]: UiFieldPrimitive | UiSchema | undefined;
}
type UiFieldPrimitive = boolean | string;
interface UiSchemaProperties {
	'ui:description'?: string;
	'ui:disabled'?: boolean;
	'ui:help'?: string;
	'ui:options'?: {
		inputType?: string;
	};
	'ui:placeholder'?: string;
	'ui:readonly'?: boolean;
	'ui:submitButtonOptions'?: {
		submitText: string;
	};
	'ui:title'?: string;
	'ui:widget'?:
		| 'Button'
		| 'Color'
		| 'Password'
		| 'Radio'
		| 'Range'
		| 'Rating'
		| 'Select'
		| 'Switch'
		| 'Textarea'
		// eslint-disable-next-line sonarjs/no-useless-intersection
		| (string & {});
}
