// NOTE: Unused.
// export type Theme =
// 	| 'system'
// 	| 'shoelace'
// 	| 'material'
// 	| 'carbon'
// 	| 'wired'
// 	| 'custom';

export type Path = (string | number)[];

// TODO: fix recursive type narrowing
export type UiSchema =
	| {
			'ui:help'?: string;
			'ui:placeholder'?: string;

			'ui:widget'?:
				| 'radio'
				| 'button'
				| 'textarea'
				| 'color'
				| 'range'
				| 'password'
				| 'rating'
				| 'switch';
	  }
	| { [key: string]: UiSchema };

export interface FeatureFlags {
	allOf?: boolean;
	oneOf?: boolean;
	additionalItems?: boolean;
	additionalProperties?: boolean;
}

export type OnDataChange = (
	newData: unknown,
	path: Path,
	value: unknown,
	schemaPath: Path,
) => void;

export type OnFormSubmit = (newData: unknown, valid: boolean) => void;
